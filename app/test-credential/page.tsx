import { CredentialPreviewWidget } from "@/components/CredentialPreviewWidget";

export default function TestCredentialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold font-display text-white mb-2 text-center">
          Credential Preview Widget Test
        </h1>
        <p className="text-slate/70 text-center mb-12">
          Test the 3D flip effect and share functionality
        </p>

        <div className="bg-white/5 backdrop-blur rounded-2xl p-12 border border-white/10">
          <CredentialPreviewWidget />
        </div>

        <div className="mt-12 bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-4">Test Checklist</h2>
          <ul className="space-y-2 text-sm text-slate/80">
            <li className="flex items-start gap-2">
              <span className="text-lime-400">✓</span>
              <span>3D flip animation on hover/click (600ms duration)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lime-400">✓</span>
              <span>Front side shows Trophy, "Accredited", course name, certificate text</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lime-400">✓</span>
              <span>Back side shows Credential ID, issue date, verification URL</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lime-400">✓</span>
              <span>Card uses yellow gradient background with yellow border</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lime-400">✓</span>
              <span>Share button copies credential details to clipboard</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lime-400">✓</span>
              <span>Respects prefers-reduced-motion preference</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lime-400">✓</span>
              <span>Named export available</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
