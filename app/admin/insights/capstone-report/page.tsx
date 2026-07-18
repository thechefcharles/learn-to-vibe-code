import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { CapstoneInsightsDashboard } from '@/components/admin/CapstoneInsightsDashboard';

export const metadata = {
  title: 'Capstone Success Analysis — Learn to Vibe Code',
  description: 'Analyze which modules best predict capstone success and identify at-risk modules',
};

export default async function CapstoneReportPage() {
  const user = await getUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  // Verify instructor role
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'instructor') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Capstone Success Analysis</h1>
          <p className="text-slate-400">Identify which modules best predict capstone success</p>
        </div>

        <CapstoneInsightsDashboard />
      </div>
    </div>
  );
}
