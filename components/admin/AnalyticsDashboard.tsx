'use client';

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface AnalyticsData {
  summary: {
    totalUsers: number;
    totalEvents: number;
  };
  topModules: Array<{ moduleId: number; views: number }>;
  quizStats: Record<string, { attempts: number; correct: number }>;
  topSkips: Array<[string, number]>;
  completions: Record<string, number>;
}

interface AnalyticsDashboardProps {
  data: AnalyticsData;
}

export function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  const moduleNames: Record<number, string> = {
    0: 'Setup & Accounts',
    1: 'AI Fundamentals',
    2: 'Prompt Engineering',
    3: 'Planning with AI',
    4: 'Building in Cursor',
    5: 'Building in Claude Code',
    6: 'Design & UX',
    7: 'Databases',
    8: 'Debugging',
    9: 'APIs',
    10: 'Authentication',
    11: 'Testing',
    12: 'Production Ready',
    13: 'Optional Topics',
    14: 'Capstone Intro',
    15: 'Tooling Landscape',
  };

  const topModulesData = data.topModules.map(({ moduleId, views }) => ({
    name: `Module ${moduleId}: ${moduleNames[moduleId] || 'Unknown'}`,
    views,
  }));

  const quizStatsData = Object.entries(data.quizStats).map(([moduleId, stats]) => ({
    name: `Module ${moduleId}`,
    attempts: stats.attempts,
    correct: stats.correct,
    passRate: stats.attempts > 0 ? Math.round((stats.correct / stats.attempts) * 100) : 0,
  }));

  const completionData = Object.entries(data.completions).map(([moduleId, count]) => ({
    name: `Module ${moduleId}`,
    completions: count,
  }));

  const COLORS = ['#06b6d4', '#a855f7', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Summary Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur">
          <p className="text-slate-400 text-sm mb-1">Total Users</p>
          <p className="text-4xl font-bold text-white">{data.summary.totalUsers}</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur">
          <p className="text-slate-400 text-sm mb-1">Total Events</p>
          <p className="text-4xl font-bold text-white">{data.summary.totalEvents}</p>
        </div>
      </motion.div>

      {/* Top Modules */}
      {topModulesData.length > 0 && (
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur">
          <h2 className="text-xl font-bold text-white mb-4">Most Visited Modules</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topModulesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              <Bar dataKey="views" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Quiz Statistics */}
      {quizStatsData.length > 0 && (
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur">
          <h2 className="text-xl font-bold text-white mb-4">Quiz Performance by Module</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={quizStatsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              <Legend />
              <Line type="monotone" dataKey="attempts" stroke="#a855f7" strokeWidth={2} name="Attempts" />
              <Line type="monotone" dataKey="correct" stroke="#10b981" strokeWidth={2} name="Passed" />
              <Line type="monotone" dataKey="passRate" stroke="#f59e0b" strokeWidth={2} name="Pass Rate %" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Completion Rates */}
      {completionData.length > 0 && (
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur">
          <h2 className="text-xl font-bold text-white mb-4">Module Completions</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={completionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              <Bar dataKey="completions" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Top Skips */}
      {data.topSkips.length > 0 && (
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur">
          <h2 className="text-xl font-bold text-white mb-4">Most Common Lesson Skips</h2>
          <div className="space-y-3">
            {data.topSkips.map(([pattern, count], index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/20 rounded-lg">
                <span className="text-slate-300">{pattern}</span>
                <span className="text-white font-bold bg-slate-700/50 px-3 py-1 rounded">{count}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
