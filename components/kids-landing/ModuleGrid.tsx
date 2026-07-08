'use client';

const MODULES = [
  { id: 0, name: 'Setup', tier: 'Foundations', desc: 'Environment & tools' },
  { id: 1, name: 'HTML & CSS', tier: 'Foundations', desc: 'Web structure & style' },
  { id: 2, name: 'JavaScript', tier: 'Foundations', desc: 'Programming basics' },
  { id: 3, name: 'AI Collaboration', tier: 'Foundations', desc: 'Working with Claude' },
  { id: 4, name: 'React Basics', tier: 'Building', desc: 'Modern UI library' },
  { id: 5, name: 'Components & State', tier: 'Building', desc: 'Building blocks' },
  { id: 6, name: 'Design & UX', tier: 'Building', desc: 'User experience' },
  { id: 7, name: 'Databases', tier: 'Building', desc: 'Data storage' },
  { id: 8, name: 'Full Stack', tier: 'Building', desc: 'Frontend + backend' },
  { id: 9, name: 'APIs & Integration', tier: 'Building', desc: 'Connecting systems' },
  { id: 10, name: 'Deployment', tier: 'Production', desc: 'Going live' },
  { id: 11, name: 'Security & Auth', tier: 'Production', desc: 'Protecting users' },
  { id: 12, name: 'Production Ready', tier: 'Production', desc: 'Professional code' },
  { id: 13, name: 'Testing', tier: 'Landscape', desc: 'Quality assurance' },
  { id: 14, name: 'Frameworks', tier: 'Landscape', desc: 'Next.js, beyond' },
  { id: 15, name: 'Future of Coding', tier: 'Landscape', desc: 'What\'s next?' },
];

export function ModuleGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {MODULES.map((mod) => (
        <div
          key={mod.id}
          tabIndex={0}
          className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-cyan-500 hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <div className="text-lg font-bold text-cyan-400">{mod.id}</div>
          <div className="text-xs text-gray-300 mt-1">{mod.name}</div>
          <div className="text-xs text-gray-500 mt-2">{mod.tier}</div>
        </div>
      ))}
    </div>
  );
}
