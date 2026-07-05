# Learn To Vibe Code — Brand Kit

The single source of truth for how the product looks and sounds. When building UI, pull colors, type, and voice from here. The guiding tension: **fun and gamified, but credible and accredited.** The energy of Duolingo wearing a certification body's suit.

- **Product name:** Learn To Vibe Code
- **Short mark / spoken:** Vibe Code
- **Tagline:** Hard to start. Impossible to stop.

---

## 1. Logo assets

All assets live in `public/brand/`. They use live text with web fonts (Space Grotesk + Inter) plus system fallbacks.

| File | What it is | Where to use it |
|------|------------|-----------------|
| `logo-primary.svg` | Mark + "Learn To Vibe Code" wordmark on transparent bg | Default. Site header, nav, marketing pages, docs — anything on a light background. |
| `logo-tagline.svg` | Primary logo with the tagline underneath | Hero sections, the landing page above the fold, the login screen, email headers, the certificate. Use when there's room to sell. |
| `logo-reverse.svg` | Light version of the wordmark for dark backgrounds | Footer, dark hero bands, anything sitting on indigo or a dark surface. |
| `logo-mark.svg` | Just the soundwave bars on an indigo tile | Favicon, app icon, avatar, loading states, compact nav, social profile. This is the shorthand people will remember. |

**The mark:** a rising equalizer/soundwave — the literal "vibe" — that doubles as a filling progress bar and lands on the lime accent at its peak. It previews the whole product: momentum, learning, and the reward hit.

### Logo usage rules
- **Clearspace:** keep padding around the logo equal to the height of one bar. Don't crowd it.
- **Minimum size:** primary wordmark no smaller than ~120px wide; the mark no smaller than 24px.
- **Don't:** recolor the wordmark, stretch it, add shadows/gradients, put the light `logo-reverse` on a light background (or vice versa), or move the lime onto a non-peak bar.
- **Production note:** for pixel-perfect rendering independent of font loading, self-host Space Grotesk + Inter (or outline the wordmark to paths) before launch. The current SVGs rely on the Google Fonts `@import`.

---

## 2. Color palette

Deep, trustworthy base + one high-energy accent that is **rationed to reward moments only.**

| Name | Hex | Role |
|------|-----|------|
| Indigo | `#1E1B4B` | Base / brand anchor. Dark surfaces, the mark tile, headers. Reads serious and credible. |
| Electric Violet | `#7C3AED` | Primary interactive. Buttons, links, focus, active states, the "Code" in the wordmark. |
| Violet Light | `#A78BFA` | Secondary/hover tint, illustrations, the reversed mark. |
| **Vibe Lime** | `#C4F542` | **Reward accent — use sparingly.** Progress-bar fills, XP pops, level-ups, streak flames, "complete" checks. Its scarcity is what makes the dopamine land. Never use it for ordinary UI chrome. |
| Ink | `#12121A` | Primary text. |
| Slate | `#5F5E5A` | Secondary text, captions, muted labels. |
| Paper | `#F5F5F8` | Light surface / page background. |
| Success | `#22C55E` | Correct answers, passed gates. |
| Warning | `#F59E0B` | Nearly-there, retry warnings. |
| Danger | `#EF4444` | Wrong answers, destructive actions, errors. |

**The lime rule (most important):** lime = a win. Progress fills, celebrations, and completion only. If lime shows up on a nav bar or a plain card, it's wrong. Calm chrome, loud celebration — that's how the product stays credible while feeling great.

---

## 3. Typography

Three roles. The code face matters — this is a coding course, so monospace shows up as a first-class citizen.

| Role | Font | Fallback | Used for |
|------|------|----------|----------|
| Display / headings | Space Grotesk (500, 700) | `system-ui, sans-serif` | Wordmark, page titles, section headers, big numbers. |
| Body / UI | Inter (400, 500) | `system-ui, sans-serif` | Everything else — paragraphs, labels, buttons, form fields. Boring on purpose, maximally readable. |
| Code | JetBrains Mono (500, 700) | `ui-monospace, Menlo, monospace` | Code blocks, terminal snippets, inline `code`, and anywhere the "this is real engineering" signal helps. |

Two weights per face (regular + bold). Sentence case everywhere except the proper noun "Learn To Vibe Code" and "Vibe Code."

---

## 4. Voice & tone

Encouraging mentor — your smartest friend explaining something in plain terms. Specifically:

- **Plain-spoken, zero gatekeeping.** No jargon walls. Assume the learner is smart but new.
- **Honest about verification.** The course's core ethos is "don't trust it, verify it." The product voice mirrors that — never overpromise, never hype. This is what earns the accredited-certificate trust.
- **Warm, not cutesy.** Celebrate wins genuinely; don't baby-talk. Contractions yes, exclamation-mark spam no.
- **Never condescend.** Cut "simply," "just," "easy" — they presume.
- Errors say what happened, then what to do. Empty states are invitations, not apologies. CTAs are verb-first ("Start Module 1," "Submit for grading").

---

## 5. Gamification visual language

The fun layer — kept credible by restraint.

- **Progress bars** fill with lime, animate smoothly, and pair with a short, satisfying sound on completion.
- **XP / points** count up with a quick tick animation; level-ups get a brief lime burst.
- **Badges** share one geometric family (rounded, flat, from the palette) — earned = full color, locked = grayscale.
- **Streaks** use a flame motif in lime/amber; show the count, don't nag.
- **Sound** cues are short and pleasant — but **off by default** with an easy toggle, and **never** for errors in a punishing way.

### Accessibility (non-negotiable)
- All motion respects `prefers-reduced-motion` — celebrations degrade to a simple state change, no bursts.
- Sound is opt-in, never required to understand state.
- Never rely on color alone (lime = done) — pair with an icon or label (a check, "Complete").
- Maintain WCAG AA contrast: violet and lime both need dark text/ink on top, never white on lime.

---

## 6. Implementation notes (for Claude Code)

Drop these tokens into the global stylesheet (or Tailwind v4 `@theme`) and reference them everywhere — no hardcoded hex in components.

```css
:root {
  --color-indigo: #1E1B4B;
  --color-violet: #7C3AED;
  --color-violet-light: #A78BFA;
  --color-lime: #C4F542;      /* reward moments only */
  --color-ink: #12121A;
  --color-slate: #5F5E5A;
  --color-paper: #F5F5F8;
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-danger: #EF4444;

  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;

  --radius: 12px;
}
```

- **Favicon / app icon:** wire `public/brand/logo-mark.svg`.
- **Header:** `logo-primary.svg`. **Footer / dark bands:** `logo-reverse.svg`. **Landing hero + certificate:** `logo-tagline.svg`.
- **Fonts:** load Space Grotesk, Inter, and JetBrains Mono via `next/font` and self-host for production (don't ship the runtime Google Fonts `@import` that's baked into the SVGs).
- Keep the lime rule enforced in components: it appears in the progress/XP/completion components and nowhere else.
