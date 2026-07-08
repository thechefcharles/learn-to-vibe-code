'use client';

import { useEffect } from 'react';
import { preloadSounds } from '@/lib/sounds';
import { KIDS_LANDING_CONTENT } from '@/lib/kids-landing/content';

/**
 * Kids Landing Page
 * Loads sound system and renders content sections
 *
 * Section components are imported as stubs; they'll be built in subsequent tasks
 */

export default function KidsLandingPage() {
  // Preload sounds on mount
  useEffect(() => {
    preloadSounds();
  }, []);

  return (
    <main className="w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Concepts Section */}
      <ConceptsSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Game Section */}
      <GameSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Footer Section */}
      <FooterSection />
    </main>
  );
}

/**
 * Section Component Stubs
 * These will be replaced with full implementations in Task 2+
 */

function HeroSection() {
  const { headline, subheadline, cta } = KIDS_LANDING_CONTENT.hero;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
          {headline}
        </h1>
        <p className="text-xl md:text-2xl text-blue-200 mb-8 leading-relaxed">{subheadline}</p>
        <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-950 font-bold rounded-lg transition-all transform hover:scale-105">
          {cta}
        </button>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const projects = KIDS_LANDING_CONTENT.projects;

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-12 text-center">
          What You'll Build
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-lg border border-purple-500/20 hover:border-cyan-500/50 bg-slate-900/50 backdrop-blur transition-all"
            >
              <div className="text-4xl mb-4">{project.icon}</div>
              <h3 className="text-2xl font-bold text-cyan-300 mb-2">{project.title}</h3>
              <p className="text-sm text-purple-300 mb-3">{project.tagline}</p>
              <p className="text-blue-200">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConceptsSection() {
  const concepts = KIDS_LANDING_CONTENT.concepts;

  return (
    <section className="py-20 px-4 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-12 text-center">
          You'll Learn How To
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {concepts.map((concept) => (
            <div
              key={concept.id}
              className="p-6 rounded-lg bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-cyan-500/20 hover:border-pink-500/50 transition-all"
            >
              <div className="text-4xl mb-4">{concept.icon}</div>
              <h3 className="text-xl font-bold text-pink-300 mb-3">{concept.title}</h3>
              <p className="text-blue-100 leading-relaxed">{concept.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = KIDS_LANDING_CONTENT.features;

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-12 text-center">
          Why This Course Slaps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="p-6 rounded-lg border border-pink-500/20 bg-slate-900/50 hover:bg-slate-800/50 transition-all"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-bold text-cyan-300 mb-2">{feature.title}</h3>
              <p className="text-blue-200 mb-2">{feature.description}</p>
              {feature.highlight && <p className="text-xs text-purple-400 font-semibold">{feature.highlight}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = KIDS_LANDING_CONTENT.testimonials;

  return (
    <section className="py-20 px-4 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-12 text-center">
          What Other Learners Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 rounded-lg bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-pink-500/20"
            >
              <p className="text-blue-100 italic mb-4">"{testimonial.quote}"</p>
              <p className="font-bold text-cyan-300">{testimonial.author}</p>
              <p className="text-sm text-purple-300">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GameSection() {
  const game = KIDS_LANDING_CONTENT.game;

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg bg-gradient-to-br from-pink-900/40 to-purple-900/40 border border-cyan-500/30 p-8 text-center">
          <div className="text-5xl mb-4">🎮</div>
          <h2 className="text-3xl font-bold text-pink-300 mb-3">{game.title}</h2>
          <p className="text-blue-200 mb-6">{game.description}</p>
          <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-slate-950 font-bold rounded-lg transition-all transform hover:scale-105">
            Play Game
          </button>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const faq = KIDS_LANDING_CONTENT.faq;

  return (
    <section className="py-20 px-4 bg-slate-900/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-12 text-center">
          Quick Questions
        </h2>
        <div className="space-y-6">
          {faq.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg border border-purple-500/20 bg-slate-900/50 hover:bg-slate-800/50 transition-all"
            >
              <h3 className="text-lg font-bold text-cyan-300 mb-2">{item.question}</h3>
              <p className="text-blue-200">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  const footer = KIDS_LANDING_CONTENT.footer;

  return (
    <footer className="py-12 px-4 border-t border-purple-500/20 bg-slate-950/50">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center gap-8 mb-6 flex-wrap">
          {footer.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-blue-300 hover:text-cyan-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-purple-400 text-sm">{footer.copyright}</p>
      </div>
    </footer>
  );
}
