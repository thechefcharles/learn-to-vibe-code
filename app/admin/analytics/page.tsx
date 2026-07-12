import { getAnalyticsSummary } from '@/lib/actions/analytics';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard';

export const metadata = {
  title: 'Analytics — Learn to Vibe Code',
  description: 'User analytics and insights',
};

export default async function AnalyticsPage() {
  const user = await getUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  // TODO: Check if user is admin role
  // For now, allow access (will add role check later)

  const analyticsData = await getAnalyticsSummary();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-slate-400">Track user engagement and course progress</p>
        </div>

        {analyticsData ? (
          <AnalyticsDashboard data={analyticsData} />
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400">Failed to load analytics data</p>
          </div>
        )}
      </div>
    </div>
  );
}
