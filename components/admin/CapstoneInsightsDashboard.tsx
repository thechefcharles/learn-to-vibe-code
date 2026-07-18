'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react';
import type { CapstoneSuccessInsights, CapstoneSuccessFactor } from '@/lib/capstone-success-factors';

interface DashboardData {
  timestamp: string;
  data: CapstoneSuccessInsights;
}

function MetricBadge({ value, label, color }: { value: number; label: string; color: string }) {
  const colorClasses = {
    green: 'bg-green-500/20 text-green-700',
    yellow: 'bg-yellow-500/20 text-yellow-700',
    red: 'bg-red-500/20 text-red-700',
    gray: 'bg-slate-500/20 text-slate-700',
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${colorClasses[color as keyof typeof colorClasses]}`}>
      <span>{value.toFixed(1)}%</span>
      <span className="text-xs">{label}</span>
    </div>
  );
}

function SuccessPredictorCard({ factor }: { factor: CapstoneSuccessFactor }) {
  return (
    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-6">
      <div className="mb-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-lg font-semibold text-white mb-1">{factor.moduleName}</h4>
            <p className="text-sm text-slate-400">Strong predictor of capstone success</p>
          </div>
          <div className="flex items-center gap-1 bg-green-500/20 text-green-300 px-3 py-1 rounded-full">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-semibold">{(Math.abs(factor.pearsonCorrelation) * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <MetricBadge value={factor.quizPassRate} label="Quiz Pass Rate" color="green" />
        <MetricBadge value={factor.deliverableApprovalRate} label="Deliverable Approval" color="green" />
        <MetricBadge value={factor.capstonePassRateForCompleters} label="Capstone Pass Rate" color="green" />
      </div>

      <div className="mt-4 pt-4 border-t border-green-500/20">
        <p className="text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Sample size:</span> {factor.sampleSize} learners
        </p>
      </div>
    </div>
  );
}

function AtRiskModuleCard({ factor }: { factor: CapstoneSuccessFactor }) {
  const quizPassColor = factor.quizPassRate < 70 ? 'red' : 'yellow';
  const delivPassColor = factor.deliverableApprovalRate < 70 ? 'red' : 'yellow';

  return (
    <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-6">
      <div className="mb-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-lg font-semibold text-white mb-1">{factor.moduleName}</h4>
            <p className="text-sm text-slate-400">Learners commonly struggle here</p>
          </div>
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <MetricBadge value={factor.quizPassRate} label="Quiz Pass Rate" color={quizPassColor} />
        <MetricBadge value={factor.deliverableApprovalRate} label="Deliverable Approval" color={delivPassColor} />
        <MetricBadge value={factor.capstonePassRateForCompleters} label="Capstone Pass Rate" color="yellow" />
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
        <p className="text-xs text-yellow-700 leading-relaxed">
          <strong>Recommendation:</strong> Review content clarity or difficulty. Consider adding worked examples or
          additional practice scenarios.
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-yellow-500/20">
        <p className="text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Sample size:</span> {factor.sampleSize} learners
        </p>
      </div>
    </div>
  );
}

function WeakPredictorCard({ factor }: { factor: CapstoneSuccessFactor }) {
  return (
    <div className="bg-slate-500/10 border border-slate-500/30 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-lg font-semibold text-white mb-1">{factor.moduleName}</h4>
          <p className="text-sm text-slate-400">Weak predictor of capstone success</p>
        </div>
        <div className="flex items-center gap-1 bg-slate-500/20 text-slate-300 px-3 py-1 rounded-full">
          <BarChart3 className="w-4 h-4" />
          <span className="text-xs font-semibold">{(Math.abs(factor.pearsonCorrelation) * 100).toFixed(0)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <MetricBadge value={factor.quizPassRate} label="Quiz Pass Rate" color="gray" />
        <MetricBadge value={factor.deliverableApprovalRate} label="Deliverable Approval" color="gray" />
        <MetricBadge value={factor.capstonePassRateForCompleters} label="Capstone Pass Rate" color="gray" />
      </div>

      <div className="mt-4 pt-4 border-t border-slate-500/20">
        <p className="text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Sample size:</span> {factor.sampleSize} learners
        </p>
      </div>
    </div>
  );
}

export function CapstoneInsightsDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/insights/capstone');

      if (!response.ok) {
        throw new Error(`Failed to fetch insights: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      console.error('Failed to fetch capstone insights:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="mb-4 inline-block">
            <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-400">Loading capstone insights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-red-300 mb-1">Error Loading Insights</h3>
            <p className="text-sm text-red-200">{error}</p>
            <button
              onClick={fetchInsights}
              className="mt-3 text-xs font-semibold text-red-300 hover:text-red-200 underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No capstone data available yet. Learners need to submit capstone projects.</p>
      </div>
    );
  }

  const { strongCorrelations, lowestPassRateModules, weakCorrelations } = data.data;

  return (
    <div className="space-y-8">
      {/* Strong Success Predictors */}
      {strongCorrelations.length > 0 && (
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-400" />
              Strong Success Predictors
            </h2>
            <p className="text-slate-400">Modules where strong performance = capstone success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strongCorrelations.map((factor) => (
              <SuccessPredictorCard key={factor.moduleId} factor={factor} />
            ))}
          </div>
        </section>
      )}

      {/* At-Risk Modules */}
      {lowestPassRateModules.length > 0 && (
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              At-Risk Modules
            </h2>
            <p className="text-slate-400">Modules where learners commonly struggle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lowestPassRateModules.map((factor) => (
              <AtRiskModuleCard key={factor.moduleId} factor={factor} />
            ))}
          </div>
        </section>
      )}

      {/* Weak Predictor Modules */}
      {weakCorrelations.length > 0 && (
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-slate-400" />
              Weak Predictors
            </h2>
            <p className="text-slate-400">Modules where performance doesn't strongly predict capstone outcome</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weakCorrelations.map((factor) => (
              <WeakPredictorCard key={factor.moduleId} factor={factor} />
            ))}
          </div>
        </section>
      )}

      {/* Last Updated */}
      <div className="text-xs text-slate-500 text-center pt-8 border-t border-slate-700">
        Last updated: {new Date(data.timestamp).toLocaleString()}
      </div>
    </div>
  );
}
