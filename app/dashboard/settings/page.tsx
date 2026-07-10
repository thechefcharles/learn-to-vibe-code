'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateUserProfile, deleteUserAccount } from '@/lib/actions/profile';
import { SettingsForm } from '@/components/dashboard/SettingsForm';
import { ThemeSelector } from '@/components/dashboard/ThemeSelector';
import { Header } from '@/components/kids-landing/Header';
import { Footer } from '@/components/Footer';
import { DashboardBackground } from '@/components/dashboard/DashboardBackground';
import { useTheme } from '@/lib/ThemeContext';
import Link from 'next/link';

const THEMES = [
  { name: 'Violet', key: 'violet', color: 'from-violet-500 to-purple-600' },
  { name: 'Sage', key: 'sage', color: 'from-green-500 to-teal-600' },
  { name: 'Sunset', key: 'sunset', color: 'from-orange-500 to-red-600' },
  { name: 'Dark', key: 'dark', color: 'from-slate-600 to-slate-800' },
  { name: 'Ocean', key: 'ocean', color: 'from-cyan-500 to-blue-600' },
];

export default function SettingsPage() {
  const router = useRouter();
  const { currentTheme, setTheme } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/auth/user');
        if (!response.ok) {
          router.push('/auth/sign-in');
          return;
        }
        const userData = await response.json();
        setUser(userData);
      } catch {
        router.push('/auth/sign-in');
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const handleSave = async (name: string, email: string) => {
    await updateUserProfile(name, email);
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteUserAccount();
      router.push('/');
    } catch (error) {
      alert('Failed to delete account');
      setIsDeleting(false);
    }
  };

  if (loading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <DashboardBackground />
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8">
          <Link href="/dashboard" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide">
            Settings
          </h1>
          <p className="text-gray-400 mt-2">Manage your profile and preferences</p>
        </div>

        <div className="space-y-8 max-w-2xl">
          <SettingsForm
            userName={user.user_metadata?.name || ''}
            userEmail={user.email || ''}
            onSave={handleSave}
          />

          <ThemeSelector
            currentTheme={currentTheme}
            onThemeChange={(theme) => setTheme(theme as any)}
            themes={THEMES}
          />

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 w-full">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide">Account</h3>

            <div className="space-y-4">
              <button
                onClick={() => {
                  window.location.href = '/api/auth/logout';
                }}
                className="w-full bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 text-white font-bold py-3 rounded-lg transition-all"
              >
                Sign Out
              </button>

              <div>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-400/50 hover:border-red-400 text-red-300 font-bold py-3 rounded-lg transition-all"
                >
                  Delete Account
                </button>
                <p className="text-xs text-gray-500 mt-2">This action is permanent and cannot be undone.</p>
              </div>
            </div>
          </div>

          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-slate-900 border border-white/20 rounded-2xl p-6 max-w-md">
                <h3 className="text-xl font-bold text-white mb-3">Delete Account?</h3>
                <p className="text-gray-300 mb-6">
                  This will permanently delete your account and all associated data. This cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                    className="flex-1 bg-white/10 hover:bg-white/15 text-white font-bold py-2 rounded-lg transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition-all disabled:opacity-50"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
