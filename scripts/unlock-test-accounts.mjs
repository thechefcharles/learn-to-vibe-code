import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function unlockAccounts() {
  try {
    // Get test users
    const { data: users, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .in('email', ['kid@test.com', 'adult@test.com']);

    if (userError) {
      console.error('Error fetching users:', userError);
      return;
    }

    if (!users || users.length === 0) {
      console.log('No test users found');
      return;
    }

    console.log(`Found ${users.length} test users`);

    // Create quiz attempts for all modules (0-15)
    const quizAttempts = [];
    for (const user of users) {
      for (let module = 0; module < 16; module++) {
        quizAttempts.push({
          user_id: user.id,
          module_id: module,
          score: 100,
          passed: true,
          attempt_no: 1,
          taken_at: new Date().toISOString(),
        });
      }
    }

    if (quizAttempts.length > 0) {
      const { error: quizError } = await supabase
        .from('quiz_attempts')
        .upsert(quizAttempts, { onConflict: 'user_id,module_id,attempt_no' });
      
      if (quizError) {
        console.error('Error upserting quiz attempts:', quizError);
      } else {
        console.log(`✅ Created ${quizAttempts.length} quiz attempt records`);
      }
    }

    // Create deliverables for all modules (0-15)
    const deliverables = [];
    for (const user of users) {
      for (let module = 0; module < 16; module++) {
        deliverables.push({
          user_id: user.id,
          module_id: module,
          repo_url: 'https://github.com/test/repo',
          live_url: 'https://test-deployment.vercel.app',
          status: 'approved',
          submitted_at: new Date().toISOString(),
        });
      }
    }

    if (deliverables.length > 0) {
      const { error: deliverableError } = await supabase
        .from('deliverables')
        .upsert(deliverables, { onConflict: 'user_id,module_id' });
      
      if (deliverableError) {
        console.error('Error upserting deliverables:', deliverableError);
      } else {
        console.log(`✅ Created ${deliverables.length} deliverable records`);
      }
    }

    console.log('✅ All modules unlocked for test accounts!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

unlockAccounts();
