# Kids Landing Page Redesign Specification

**Date:** 2026-07-08  
**Target Audience:** 10-15 year olds  
**Primary Goals:** (1) Excitement/FOMO that makes kids want to learn vibe coding, (2) Easy & natural signup conversion  
**Design Inspiration:** Interactive micro-experiences (Zalak Patel portfolio approach): every element has unexpected hover effects, draggable/rotatable elements, sound design, scroll-triggered reveals

---

## 1. Page Flow & Structure

### Hero Section
- **Headline:** "Build Real Apps. With AI. In Weeks."
- **Subheadline:** "See what vibe coding looks like →"
- **Interactive Element:** Cursor morphs into "code wand" ✨ as you move it; code blocks materialize and cascade on screen
- **Background:** Midjourney abstract tech landscape (geometric shapes, data streams, glowing nodes on dark navy)
- **Purpose:** Immediate "wow" moment; invites interaction with the arrow cue
- **Tone:** Confident, achievable, exciting (not corporate)

### Interactive Course Module Arc Section
- **Headline:** "Your Learning Path: 16 Modules, 93 Hours"
- **Interactive Element:** Cursor-tracked progress arc (inspired by Zalak Patel's work hours arc)
  - Arc displays 0-16 modules as you move cursor across the arc
  - Center displays current module number + label (e.g., "Module 7: Databases")
  - Arc fills with gradient color (cyan → purple) proportional to module position
  - Smooth, real-time tracking with no lag
  - **Fallback:** Displays all 16 modules in a static list with descriptions for accessibility
- **Module Tiers** (displayed alongside or below arc):
  - **Tier 1: Foundations** (Modules 0-3) — Setup, HTML/CSS, JavaScript basics, AI collaboration
  - **Tier 2: Building** (Modules 4-9) — React, databases, full-stack, APIs, deployment, security
  - **Tier 3: Production** (Modules 10-12) — Design/UX, testing, production-ready code
  - **Tier 4: Landscape** (Modules 13-15) — Industry tools, frameworks, future of coding
  - **Capstone:** Defense + credential issuance
- **Copy Block:** "93 hours of real learning. From zero to shipping. Self-paced. Accredited."
- **Purpose:** Describes course depth and structure; sets realistic expectations
- **Tone:** Clear, specific, emphasizes comprehensiveness

### Course Structure Overview Section
- **Three Key Stats (card-based or grid):**
  1. **"16 Modules"** — Progressive skill building from fundamentals to production
  2. **"93 Contact Hours"** — Accredited depth (not a quick tutorial)
  3. **"Capstone Project"** — Build something real, defend it, earn your certificate
- **Optional Module Spotlight:** Rotate through 3-4 example modules with 1-line descriptions:
  - "Module 4: React Basics — Learn the framework used by 90% of modern apps"
  - "Module 8: Deployment — Put your code live on the internet"
  - "Module 12: Production-Ready — Write code teams actually trust"
- **Purpose:** Gives concrete sense of *what* is taught, not just *why it matters*
- **Tone:** Specific, honest about scope and commitment

### Feature Deep-Dive Section (Key Course Benefits)
- **Feature 1: "Free Forever"**
  - Copy: "No credit card. No surprise charges. Just learning."
  - Hover Interaction: Dollar signs animate away, check mark appears
- **Feature 2: "Self-Paced"**
  - Copy: "Work at your speed. Pause anytime. No deadlines, no pressure."
  - Hover Interaction: Timeline animates with flexible markers
- **Feature 3: "Capstone + Defense"**
  - Copy: "You build something real. You present it. You own it."
  - Hover Interaction: Trophy icon animates, project showcase expands
- **Feature 4: "Accredited Certificate"**
  - Copy: "CPD/IACET accreditation. Employers and universities recognize it."
  - Hover Interaction: Certificate preview slides in, seal animates
- **Purpose:** Describes *how* the course works and what you get
- **Tone:** Confident, specific, removes objections

### Interactive Challenge CTA Section
- **Challenge Intro:** "Quick test: Can you think like a coder in 30 seconds?"
- **Game Mechanic:** Drag code blocks to sort them in the right order (3 blocks, simple logic)
- **Success State:** Confetti + celebratory message: "You got it! 🎉"
- **Post-Game Copy:** "Imagine what you'll build in 16 weeks."
- **Final CTA Button:** "Enroll Free" (glowing, prominent)
- **Purpose:** Low-stakes confidence boost; leads naturally to signup
- **Tone:** Celebratory, not pressuring; feels like a game, not school

---

## 2. Interactive Mechanics & Design Language

### Interactive Patterns

**1. Cursor as Tool**
- Morphs into "code wand" 🪄 in hero section
- Glitchy but smooth animation: code blocks appear in cascading layers
- Visual payoff: Something materializes on screen (UI frame, rocket, AI assistant icon)

**2. Drag & Rotate 3D Cards**
- Project cards respond to click + drag
- Rotation reveals different sides with project details
- Sound: Subtle "whoosh" or "click" on successful rotate
- Fallback: Keyboard arrows for accessibility

**3. Hover Reveals with Micro-Animations**
- Icon grows + rotates + color shifts on hover
- Detail text fades in (300-500ms ease-in-out)
- Particles burst subtly (magical, not overdone)
- Interactive words: Hover over highlighted text → color gradient highlight

**4. Scroll-Triggered Reveals**
- Elements fade in + slide up as they enter viewport
- Staggered cascade: If section has 3 items, each appears 100-200ms apart
- Code blocks appear letter-by-letter (typing effect) on scroll
- Creates sense of building/revealing in real-time

**5. Interactive Code Blocks**
- Scattered throughout page: Small code snippets
- On hover: Code highlights, runs simulation, or animates
- Example: `const build = () => {}` → hover shows particle effect inside braces

**6. Sound Design (Optional, Crucial)**
- Hover sounds: Soft "bleep" or "ping" (8-bit aesthetic, not annoying)
- Click sounds: Satisfying "whoosh" or "ding"
- Sound toggle in top-right (like game UI)
- Frequency: Only on key moments (first interaction, success moments)
- Volume & Tone: Kid-friendly, not jarring; respect `prefers-reduced-motion`

### Visual Design Language

**Color Palette**
- **Primary Background:** Deep navy/black (#0f0f1e or similar)
- **Accent Colors:** Neon cyan, hot pink, electric purple (used sparingly)
- **Supporting:** Neutral grays for text, softer blues for secondary elements
- **Gradients:** Cyan → Purple, Pink → Purple (hover states, CTAs, reveals)
- **Feeling:** Dark + neon (cyberpunk-adjacent, but clean, not overwhelming)

**Typography**
- **Headlines:** Bold, geometric sans-serif (IBM Plex Mono or Space Mono) — futuristic
- **Body Text:** Clean sans-serif (Inter, Poppins) — readable, friendly
- **Code Text:** Monospace (JetBrains Mono, Courier Prime) — authentic tech feel

**Motion Principles**
- **Easing:** Ease-in-out for enters, ease-out for exits (smooth, intentional)
- **Speed:** Most interactions 300-600ms (not too fast, not sluggish)
- **Choreography:** Elements stagger reveals (creates progression)
- **Performance:** GPU-accelerated (transform/opacity, not position changes)

**Midjourney Imagery Strategy**
- **Hero Background:** Abstract tech landscape—geometric shapes, data streams, glowing nodes (dark, sleek)
- **Section Breaks:** Subtle code patterns, digital grids, particle clouds
- **Project Cards Backdrop:** Subtle glow/bloom around each card (makes them pop)
- **Feature Icons:** Generated but kept simple—abstract representations of "code," "ship," "learn"
- **Style Prompt:** "Cyberpunk-inspired but clean, neon accents on dark backgrounds, geometric, futuristic, educational"

---

## 3. Copy Tone & Messaging Strategy

**Guiding Principle:** Speak like a cool peer, not a teacher. Create FOMO without pressure. Show possibility, not obligation.

**Tone Rules (Across Entire Page)**
- ✅ Honest ("not as hard as I thought")
- ✅ Specific (names, numbers, real outcomes)
- ✅ Conversational (no corporate jargon)
- ✅ Empowering (you can, you will, you're a builder)
- ✅ FOMO-light (other kids did it, you can too—not "you'll miss out")
- ❌ Avoid: "Revolutionize," "cutting-edge," "industry-leading" (corporate speak)
- ❌ Avoid: Fake testimonials or generic praise ("10/10, changed my life!")
- ❌ Avoid: Pressure language ("Limited spots," "Act now," "Only X left")

**Key Copy Blocks**

| Section | Copy | Why This Works |
|---------|------|---|
| Hero Headline | "Build Real Apps. With AI. In Weeks." | "Real Apps" = credibility; "With AI" = differentiator; "Weeks" = urgency + achievability |
| Hero Subheadline | "See what vibe coding looks like →" | Arrow invites interaction; question triggers curiosity |
| Project Card | "Maya, 13 → Built a drawing app in 3 weeks" | Names + ages = "people like me"; Specific details = proof |
| Concept 1 | "You sit down. You write. AI watches your back." | Second person = personal; Active verbs = agency |
| Concept 2 | "Stuck? AI suggests. You decide. You learn." | Relatable struggle; Emphasizes learner control |
| Concept 3 | "It works. You deploy. You're a builder." | "You're a builder" = identity shift (not "you learned to code") |
| Testimonial | "I didn't think I could build something real. Then I did." | Relatable doubt → achievement arc |
| Feature 1 | "No credit card. No surprise charges. Just learning." | Removes objection; Straightforward |
| Feature 2 | "From zero to shipping. A real journey, not a 2-hour tutorial." | Sets expectations; Emphasizes depth |
| Feature 3 | "You build something real. You defend it. You own it." | Emphasizes ownership; Authentic capstone |
| Feature 4 | "Employers recognize it. Universities recognize it. You earned it." | Credibility; Multiple stakeholders matter to kids |
| CTA Challenge | "Quick test: Can you think like a coder in 30 seconds?" | Low stakes; Playful; Invitation to participate |
| CTA Success | "You got it! 🎉 Imagine what you'll build in 16 weeks." | Celebratory; Aspirational; Leads naturally to signup |
| Final Button | "Enroll Free" | Removes objection (free); Clear action |

---

## 4. Technical Approach & Implementation Strategy

### Tech Stack & Principles
- **Framework:** Next.js (App Router) + TypeScript (existing tech stack)
- **Animation:** Framer Motion for scroll triggers + interactive animations
- **Styling:** Tailwind v4 + CSS for micro-interactions
- **Sound:** Web Audio API (toggle in header, sounds in `/public/sounds/`)
- **Performance:** GPU-accelerated transforms, lazy-loaded images, code splitting
- **Accessibility:** Keyboard nav, reduced-motion respected, ARIA labels on interactive elements

### Components to Build (Claude)

| Component | Purpose | Complexity |
|-----------|---------|-----------|
| **CodeWandCursor** | Hero cursor morphs into wand + materializes code blocks | High |
| **CursorTrackedModuleArc** | Interactive arc showing modules 0-16, tracks cursor position, updates center label | High |
| **ScrollRevealSection** | Wrapper that fades/slides elements in on scroll | Medium |
| **InteractiveFeatureCard** | Hover animations, micro-interactions, particles | Medium |
| **MiniGameCTA** | Drag-to-sort code blocks challenge → unlock signup | High |
| **SoundToggle** | Header toggle to enable/disable all sound effects | Low |
| **ParticleEffect** | Subtle particle bursts on hover/click | Medium |
| **ModuleGrid** | Static fallback for module display (accessibility) | Low |

### What You Can Do (User)

1. **Midjourney Prompts** (Do independently)
   - Hero background, feature icons, section dividers
   - Export 4-6 images at 2x resolution to `/public/midjourney-drafts/`

2. **Copy Refinement** (Adjust tone/voice)
   - Review Section 3 copy, tighten for your voice
   - Add personality touches (puns, emojis if they fit)
   - Confirm final copy before integration

3. **Project Showcase Content** (Real builds)
   - Choose 4 kids' projects with names, ages, outcomes
   - Provide as JSON/list: project name, description, tech stack, link

4. **Sound Assets** (Optional)
   - Source from Freesound/Zapsplat or commission
   - Hover bleep (~200ms), click ding (~300ms), success chime (~500ms)
   - Save to `/public/sounds/` folder

### Implementation Phases

| Phase | Owner | Work | Estimate |
|-------|-------|------|----------|
| A: Foundation | Claude | Scaffold page, ScrollRevealSection, SoundToggle, audio system | 45 min |
| B: Hero + Module Arc | Claude | CodeWandCursor + CursorTrackedModuleArc (cursor-tracked, real-time module display) | 1.5 hours |
| C: Course Structure | Claude | Module Grid layout, course overview cards, feature cards | 1 hour |
| D: Game & CTA | Claude | MiniGameCTA, glowing button, enrollment link | 1.5 hours |
| E: Polish & Test | Both | Sound integration, a11y audit (arc fallback), mobile responsive, Core Web Vitals | 1-2 hours |

**Total Estimate:** 4-6 hours to full interactive page (shift from social proof to content description)

### File Structure
```
app/
  landing-kids/
    page.tsx (main page)
components/
  kids-landing/
    CodeWandCursor.tsx
    RotatableProjectCard.tsx
    ScrollRevealSection.tsx
    InteractiveFeatureCard.tsx
    MiniGameCTA.tsx
    SoundToggle.tsx
    ParticleEffect.tsx
public/
  midjourney-drafts/ (user provides images here)
  sounds/ (user provides audio here)
  figures/ (existing screenshot management)
```

---

## 5. Success Criteria

- ✅ Hero cursor interaction works smoothly (no jank, 60 FPS)
- ✅ Project cards rotate/drag without accessibility issues
- ✅ Scroll reveals create sense of progression (staggered, smooth)
- ✅ Hover animations delight without overwhelming
- ✅ Sound design enhances (not distracts) from experience
- ✅ Copy resonates with 10-15 year olds (tested with real feedback if possible)
- ✅ Signup conversion is clear and easy (single CTA, no friction)
- ✅ Mobile responsive (touch interactions adapted)
- ✅ WCAG AA compliant (keyboard nav, reduced-motion safe, alt text)
- ✅ Core Web Vitals: FCP < 2s, LCP < 2.5s, CLS < 0.1
- ✅ Page feels "wow" (unexpected delights, not corporate)

---

## 6. Dependencies & Assumptions

- User provides Midjourney images at 2x resolution by Phase C
- User provides final copy refinements by Phase A
- User provides real project showcase data (4 projects) by Phase C
- Sound assets optional; omit if unavailable (graceful degradation)
- Existing `/app` structure supports new `/landing-kids/` route
- Supabase enrollment already wired (just link to signup)

---

## 7. Out of Scope

- Actual lesson content (existing modules/quizzes handle this)
- Payment/monetization (Phase 9, separate from landing)
- Admin tools or instructor features
- Multi-language support (MVP is English only)
- PWA or offline functionality
