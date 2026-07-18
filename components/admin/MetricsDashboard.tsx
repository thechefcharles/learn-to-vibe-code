'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

interface MetricsData {
  errorRate: {
    errorRate: number;
    totalErrors: number;
  };
  activeUsers: {
    activeUsers: number;
  };
  quizPassRate: {
    passRate: number;
    total: number;
  };
  pendingDeliverables: {
    pendingCount: number;
    submissions: any[];
  };
  versionComparison: {
    kidsCompletion: number;
    adultCompletion: number;
    divergence: number;
  };
  capstoneSuccess: {
    passRate: number;
    total: number;
  };
  timestamp: string;
}

type HealthStatus = 'healthy' | 'warning' | 'critical';

interface MetricCardProps {
  title: string;
  value: string | number;
  label: string;
  status: HealthStatus;
  subtext?: string;
}

function MetricCard({ title, value, label, status, subtext }: MetricCardProps) {
  const statusStyles = {
    healthy: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      icon: CheckCircle2,
      iconColor: 'text-green-500',
      badge: 'bg-green-500/20 text-green-700',
    },
    warning: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
      badge: 'bg-yellow-500/20 text-yellow-700',
    },
    critical: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      icon: AlertCircle,
      iconColor: 'text-red-500',
      badge: 'bg-red-500/20 text-red-700',
    },
  };

  const styles = statusStyles[status];
  const IconComponent = styles.icon;

  return (
    <div className={`${styles.bg} border ${styles.border} rounded-lg p-6`}>
      <div className="flex items-start justify-between mb-3 pb-3">
        <h3 className="text-sm font-medium text-slate-300">{title}</h3>
        <IconComponent className={`w-4 h-4 ${styles.iconColor}`} />
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-bold text-white">{value}</div>
          <span className={`text-xs font-semibold px-2 py-1 rounded ${styles.badge}`}>
            {status === 'healthy' ? '✓ Healthy' : status === 'warning' ? '⚠️ Warning' : '🔴 Critical'}
          </span>
        </div>
        <p className="text-xs text-slate-400">{label}</p>
        {subtext && <p className="text-xs text-slate-500">{subtext}</p>}
      </div>
    </div>
  );
}

export function MetricsDashboard() {
  const [data, setData] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/admin/analytics?metric=all');

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
      console.error('Metrics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchMetrics();
  }, []);

  // Auto-refresh every 5 minutes (300 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('[Analytics] Auto-refreshing metrics...');
      fetchMetrics();
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <div>
            <p className="font-medium text-red-700">Error loading analytics</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div className="text-center text-slate-400">No data available</div>;
  }

  // Determine health status for each metric
  const errorRateStatus: HealthStatus = data.errorRate.errorRate > 5 ? 'critical' : data.errorRate.errorRate > 2 ? 'warning' : 'healthy';
  const activeUsersStatus: HealthStatus = data.activeUsers.activeUsers < 5 ? 'warning' : 'healthy';
  const quizPassRateStatus: HealthStatus = data.quizPassRate.passRate < 60 ? 'critical' : data.quizPassRate.passRate < 70 ? 'warning' : 'healthy';
  const pendingReviewsStatus: HealthStatus = data.pendingDeliverables.pendingCount > 20 ? 'warning' : 'healthy';
  const capstoneStatus: HealthStatus = data.capstoneSuccess.passRate < 70 ? 'warning' : 'healthy';

  return (
    <div className="space-y-8">
      {/* Last refresh indicator */}
      {lastRefresh && (
        <div className="text-xs text-slate-500 text-right">
          Last updated: {lastRefresh.toLocaleTimeString()} · Auto-refreshes every 5 minutes
        </div>
      )}

      {/* Daily Metrics Section */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Daily Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Error Rate"
            value={`${data.errorRate.errorRate}%`}
            label={`${data.errorRate.totalErrors} errors in 24h`}
            status={errorRateStatus}
            subtext="Critical if >5%"
          />
          <MetricCard
            title="Active Users"
            value={data.activeUsers.activeUsers}
            label="Users in last 24h"
            status={activeUsersStatus}
            subtext="Healthy if ≥5"
          />
          <MetricCard
            title="Quiz Pass Rate"
            value={`${data.quizPassRate.passRate}%`}
            label={`${data.quizPassRate.total} attempts`}
            status={quizPassRateStatus}
            subtext="Target: ≥70%"
          />
          <MetricCard
            title="Pending Reviews"
            value={data.pendingDeliverables.pendingCount}
            label="Deliverables awaiting approval"
            status={pendingReviewsStatus}
            subtext="Alert if >20"
          />
        </div>
      </div>

      {/* Version Parity Section */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Version Parity</h2>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
          <div className="pb-3 mb-3 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-1">Kids vs Adult Completion Comparison</h3>
            <div>
              {data.versionComparison.divergence > 20 ? (
                <span className="text-red-400">High divergence detected (&gt;20%)</span>
              ) : (
                <span className="text-slate-400">Versions tracking closely</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-slate-400">Kids Version</p>
              <p className="text-2xl font-bold text-blue-400">{data.versionComparison.kidsCompletion}%</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-400">Adult Version</p>
              <p className="text-2xl font-bold text-purple-400">{data.versionComparison.adultCompletion}%</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Divergence</p>
              <p className={`text-lg font-semibold ${data.versionComparison.divergence > 20 ? 'text-red-400' : 'text-green-400'}`}>
                {data.versionComparison.divergence}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Capstone Performance Section */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Capstone Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MetricCard
            title="Capstone Pass Rate"
            value={`${data.capstoneSuccess.passRate}%`}
            label={`${data.capstoneSuccess.total} submissions this month`}
            status={capstoneStatus}
            subtext="Target: ≥70%"
          />
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
            <div className="pb-3 mb-3 border-b border-slate-700">
              <h3 className="text-sm font-medium text-slate-300">Submission Status</h3>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-white">{data.capstoneSuccess.total}</p>
              <p className="text-xs text-slate-400">Total submissions this month</p>
              <p className="text-xs text-slate-500 mt-2">
                {data.capstoneSuccess.total > 0
                  ? `${Math.round((data.capstoneSuccess.passRate / 100) * data.capstoneSuccess.total)} passed`
                  : 'No submissions yet'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Error indicator */}
      {error && (
        <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/30 p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <p className="text-sm text-yellow-600">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
