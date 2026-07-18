'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SettingsFormProps {
  userName: string;
  userEmail: string;
  onSave: (name: string, email: string) => Promise<void>;
}

export function SettingsForm({ userName, userEmail, onSave }: SettingsFormProps) {
  const prefersReducedMotion = useReducedMotion();
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await onSave(name, email);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.form
      initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : undefined}
      animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
      transition={!prefersReducedMotion ? { duration: 0.5 } : undefined}
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 w-full max-w-2xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">
        Profile Settings
      </h2>

      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="display-name" className="block text-sm font-semibold text-gray-300 mb-2">Display Name</label>
          <input
            id="display-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="user-email" className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
          <input
            id="user-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
            placeholder="your@email.com"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-400 rounded-lg px-4 py-3 mb-4 text-red-300 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/20 border border-green-400 rounded-lg px-4 py-3 mb-4 text-green-300 text-sm">
          Settings saved successfully!
        </div>
      )}

      <button
        type="submit"
        disabled={isSaving}
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-all shadow-lg"
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </motion.form>
  );
}
