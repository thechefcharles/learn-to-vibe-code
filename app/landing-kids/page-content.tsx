

import { useEffect } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import Link from 'next/link';
import { preloadSounds } from '@/lib/sounds';
import { KIDS_LANDING_CONTENT } from '@/lib/kids-landing/content';

// Import all built components
import CodeWandCursor from '@/components/kids-landing/CodeWandCursor';
import RotatableProjectCard from '@/components/kids-landing/RotatableProjectCard';
import ScrollRevealSection from '@/components/kids-landing/ScrollRevealSection';
import InteractiveFeatureCard from '@/components/kids-landing/InteractiveFeatureCard';
import MiniGameCTA from '@/components/kids-landing/MiniGameCTA';
import SoundToggle from '@/components/kids-landing/SoundToggle';

/**
 * Kids Landing Page Content
 * Full interactive page with all 8 built components wired together
 */

export default function PageContent() {
  // Preload sounds on mount
  useEffect(() => {
    preloadSounds();
  }, []);

  return (
    <>
      {/* Sound Toggle (fixed position at top) */}
      <SoundToggle />

      <main className="w-full">
        {/* Hero Section - CodeWandCursor with background */}
        <HeroSection />

        {/* Projects Section - RotatableProjectCard + ScrollRevealSection */}
        <ProjectsSection />

        {/* Concepts Section - Animated cards with different animation types */}
        <ConceptsSection />

        {/* Features Section - InteractiveFeatureCard + ScrollRevealSection with stagger */}
        <FeaturesSection />

        {/* Testimonials Section - Testimonial cards */}
        <TestimonialsSection />

        {/* Game Section - MiniGameCTA */}
        <GameSection />

        {/* FAQ Section */}
        <FaqSection />

        {/* Footer Section */}
        <FooterSection />
      </main>
    </>
  );
}

/**
 * HERO SECTION
 * Uses CodeWandCursor with background image
 */
function HeroSection() {
  return (
    <CodeWandCursor bgImage={KIDS_LANDING_CONTENT.hero.backgroundImage} />
  );
}

/**
 * PROJECTS SECTION
 * Uses RotatableProjectCard + ScrollRevealSection
 */
function ProjectsSection() {
  const projects = KIDS_LANDING_CONTENT.projects;

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollRevealSection delay={0.2}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-12 text-center"
          >
            What You'll Build
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project) => (
              <div key={project.id} className="flex justify-center">
                <RotatableProjectCard project={project} />
              </div>
            ))}
          </div>
        </ScrollRevealSection>
      </div>
    </section>
  );
}

/**
 * CONCEPTS SECTION
 * Uses animated concept cards with different animation types per concept
 */
function ConceptsSection() {
  const concepts = KIDS_LANDING_CONTENT.concepts;

  const animationVariants = {
    bounce: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
      },
      hover: {
        y: -10,
        transition: { duration: 0.3 },
      },
    },
    slide: {
      hidden: { opacity: 0, x: -20 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6 },
      },
      hover: {
        x: 10,
        transition: { duration: 0.3 },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6 },
      },
      hover: {
        scale: 1.05,
        transition: { duration: 0.3 },
      },
    },
  };

  return (
    <section className="py-20 px-4 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <ScrollRevealSection delay={0.2}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-12 text-center"
          >
            You'll Learn How To
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {concepts.map((concept) => {
              const animType = animationVariants[concept.animationType as keyof typeof animationVariants];

              return (
                <motion.div
                  key={concept.id}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  variants={animType}
                  className="p-6 rounded-lg bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-cyan-500/20 hover:border-pink-500/50 transition-all cursor-pointer"
                >
                  <div className="text-4xl mb-4">{concept.icon}</div>
                  <h3 className="text-xl font-bold text-pink-300 mb-3">{concept.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{concept.explanation}</p>
                </motion.div>
              );
            })}
          </div>
        </ScrollRevealSection>
      </div>
    </section>
  );
}

/**
 * FEATURES SECTION
 * Uses InteractiveFeatureCard + ScrollRevealSection with stagger
 */
function FeaturesSection() {
  const features = KIDS_LANDING_CONTENT.features;

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollRevealSection delay={0.2} stagger>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-12 text-center"
          >
            Why This Course Slaps
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {features.map((feature) => (
              <InteractiveFeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </ScrollRevealSection>
      </div>
    </section>
  );
}

/**
 * TESTIMONIALS SECTION
 * Uses testimonial cards with video overlay placeholders
 */
function TestimonialsSection() {
  const testimonials = KIDS_LANDING_CONTENT.testimonials;

  return (
    <section className="py-20 px-4 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <ScrollRevealSection delay={0.2}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-12 text-center"
          >
            What Other Learners Say
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="relative p-6 rounded-lg bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-pink-500/20 hover:border-pink-500/50 transition-all overflow-hidden group"
              >
                {/* Video overlay placeholder */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg pointer-events-none" />

                {/* Testimonial content */}
                <div className="relative z-10">
                  <p className="text-blue-100 italic mb-4">"{testimonial.quote}"</p>
                  <p className="font-bold text-cyan-300">{testimonial.author}</p>
                  <p className="text-sm text-purple-300 mb-3">{testimonial.role}</p>

                  {/* Play button overlay (for video) */}
                  <div className="mt-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-sm font-semibold hover:bg-cyan-500/30 transition-colors">
                      ▶ Watch Video
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollRevealSection>
      </div>
    </section>
  );
}

/**
 * GAME SECTION
 * Uses MiniGameCTA (self-contained with all game logic)
 */
function GameSection() {
  const game = KIDS_LANDING_CONTENT.game;

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollRevealSection delay={0.2}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4">
              {game.title}
            </h2>
            <p className="text-lg text-blue-200">{game.description}</p>
          </motion.div>

          {/* Mini Game CTA - self-contained component */}
          <MiniGameCTA />
        </ScrollRevealSection>
      </div>
    </section>
  );
}

/**
 * FAQ SECTION
 * Simple Q&A cards with reveal animation
 */
function FaqSection() {
  const faq = KIDS_LANDING_CONTENT.faq;

  return (
    <section className="py-20 px-4 bg-slate-900/30">
      <div className="max-w-4xl mx-auto">
        <ScrollRevealSection delay={0.2}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-12 text-center"
          >
            Quick Questions
          </motion.h2>

          <div className="space-y-6">
            {faq.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.6 }}
                className="p-6 rounded-lg border border-purple-500/20 bg-slate-900/50 hover:bg-slate-800/50 hover:border-cyan-500/50 transition-all"
              >
                <h3 className="text-lg font-bold text-cyan-300 mb-2">{item.question}</h3>
                <p className="text-blue-200">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </ScrollRevealSection>
      </div>
    </section>
  );
}

/**
 * FOOTER SECTION
 * Navigation links and copyright
 */
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
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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
