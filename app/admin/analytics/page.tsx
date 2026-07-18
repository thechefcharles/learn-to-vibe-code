import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { MetricsDashboard } from '@/components/admin/MetricsDashboard';

export const metadata = {
  title: 'Analytics — Learn to Vibe Code',
  description: 'Real-time monitoring metrics and analytics',
};

export default async function AnalyticsPage() {
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
          <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-slate-400">Real-time monitoring metrics and performance insights</p>
        </div>

        <MetricsDashboard />
      </div>
    </div>
  );
}
