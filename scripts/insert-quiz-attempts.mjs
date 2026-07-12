import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertQuizAttempts() {
  try {
    // Get test users
    const { data: users } = await supabase
      .from('profiles')
      .select('id')
      .in('email', ['kid@test.com', 'adult@test.com']);

    if (!users || users.length === 0) {
      console.log('No test users found');
      return;
    }

    let count = 0;
    for (const user of users) {
      for (let module = 0; module < 16; module++) {
        const { error } = await supabase
          .from('quiz_attempts')
          .insert({
            user_id: user.id,
            module_id: module,
            score: 100,
            passed: true,
            attempt_no: 1,
            taken_at: new Date().toISOString(),
          });
        
        if (!error) count++;
      }
    }

    console.log(`✅ Inserted ${count} quiz attempt records`);
  } catch (error) {
    console.error('Error:', error);
  }
}

insertQuizAttempts();
