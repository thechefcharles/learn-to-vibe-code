import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import the page content to avoid SSR issues with browser APIs
const PageContent = dynamic(() => import('./page-content'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center">
        <div className="text-4xl mb-4">🌀</div>
        <p className="text-white/70">Loading...</p>
      </div>
    </div>
  ),
});

export default async function KidsLandingPage() {
  const user = await getUser();

  // If user is already logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard');
  }

  return <PageContent />;
}
