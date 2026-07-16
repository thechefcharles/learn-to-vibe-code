'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';

function isValidHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

interface ShowcaseProject {
  id: string;
  studentName: string;
  liveUrl: string;
  repoUrl: string;
  description: string;
  upvotes: number;
  userUpvoted?: boolean;
  imageUrl?: string;
  completedAt: string;
}

export default function ShowcasePage() {
  const [projects, setProjects] = useState<ShowcaseProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');

  useEffect(() => {
    fetchProjects();
  }, [sortBy]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/capstone/showcase?sort=${sortBy}`);
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching showcase projects:', error);
    }
    setLoading(false);
  };

  const handleUpvote = async (projectId: string) => {
    try {
      const res = await fetch(`/api/capstone/showcase/${projectId}/upvote`, {
        method: 'POST',
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === projectId
              ? { ...p, upvotes: p.upvotes + 1, userUpvoted: true }
              : p
          )
        );
      }
    } catch (error) {
      console.error('Error upvoting project:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            🚀 CAPSTONE SHOWCASE
          </h1>
          <p className="text-xl text-cyan-400">
            Live projects by Accredited Vibe Coding Course graduates
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setSortBy('recent')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              sortBy === 'recent'
                ? 'bg-cyan-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Most Recent
          </button>
          <button
            onClick={() => setSortBy('popular')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              sortBy === 'popular'
                ? 'bg-cyan-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Most Popular ⭐
          </button>
        </div>

        {/* Projects grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading showcase projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            className="text-center py-12 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-400 text-lg">
              No capstone projects yet. Be the first to deploy! 🎉
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                {/* Project header */}
                <div className="p-6 pb-4 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {project.studentName}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Completed: {new Date(project.completedAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Project body */}
                <div className="p-6 space-y-4">
                  <p className="text-gray-300">{project.description}</p>

                  {/* Links */}
                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    {isValidHttpUrl(project.liveUrl) && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/50 text-cyan-400 rounded-lg text-center font-semibold transition-all text-sm"
                      >
                        🔗 Live Site
                      </a>
                    )}
                    {isValidHttpUrl(project.repoUrl) && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-300 rounded-lg text-center font-semibold transition-all text-sm"
                      >
                        📦 Repo
                      </a>
                    )}
                  </div>

                  {/* Upvote */}
                  <button
                    onClick={() => handleUpvote(project.id)}
                    disabled={project.userUpvoted}
                    className={`w-full py-2 rounded-lg font-semibold transition-all text-sm ${
                      project.userUpvoted
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : 'bg-amber-500/20 hover:bg-amber-500/40 text-amber-400 border border-amber-500/50'
                    }`}
                  >
                    ⭐ {project.upvotes} {project.upvotes === 1 ? 'Star' : 'Stars'}
                    {project.userUpvoted && ' (Upvoted)'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        {projects.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-400 mb-4">
              Want to see your project here?
            </p>
            <Link
              href="/capstone"
              className="inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition-all"
            >
              Complete Capstone → Deploy Live
            </Link>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
