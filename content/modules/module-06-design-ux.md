# Module 6: Design & UX (Make It Not Look AI-Generated)

**Stage:** Building · **Level:** Intermediate · **Duration:** ~6 contact hours (0.6 CEU)

**Prerequisites:** Modules 4–5. Learners have the invoice-tracker's clients + invoices UI built (mock data) — functional but plain. This module makes it look professional before the backend goes in (Module 7).

> AI produces *functional* UIs that all look the same: default fonts, cramped spacing, no hierarchy, awkward on mobile — instantly recognizable as "AI-generated." Making software look intentional is the single biggest differentiator between a hobby project and something people trust. This is a real, learnable skill, and it's where many AI builders stop short.
> 

> **📸 Screenshots:** the styled app-UI and the **mobile (375px)** shots are auto-capturable with Playwright from the reference app — and the mobile shots are the real new Module 6 figures. Note: the reference app is styled from the start, so it has no genuine plain "before"; a true styled-vs-plain before/after needs a plain-UI variant captured separately (or done live while recording).
> 

## Learning objectives

By the end of this module, the learner can:

1. **Apply** visual hierarchy, spacing, typography, and responsive layout to make a UI look professional on any screen. *(Apply)*
2. **Use** a component library (e.g. shadcn/ui) to build consistent, polished components. *(Apply)*
3. **Critique and fix** generic "AI-looking" UI against basic design principles. *(Evaluate)*
4. **Prototype design-first** with an AI design tool (e.g. Claude Design) and hand the result off to code. *(Apply)*

> **Version note (pin + concept):** component libraries evolve (shadcn/ui installs components into your repo via its CLI; Tailwind v4 changes some setup). Pin versions, learn the *principles* — taste outlives any library.
> 

---

## Lesson 6.1 — Why AI UIs look generic (~30 min)

Show the tells: default system fonts, everything the same size and weight, no breathing room, inconsistent spacing, harsh default colors, no focal point, and layouts that break on a phone. The model outputs the *most common* markup (Module 1), and common = generic. The fix isn't more AI — it's giving the AI *design direction* and knowing good from bad when you see it.

> **Aside — developing taste:** the fastest way to get a designer's eye is to study products you admire (Linear, Stripe, Notion) and notice their restraint: generous spacing, few font sizes, a tiny color palette. Copy the *principles*, not the pixels.
> 

---

**[SCREENSHOT PLACEHOLDER: Plain UI ("Before")]**

Browser at `/clients`: bare table, default fonts, cramped spacing, no visual hierarchy. Shows what "AI-generated" looks like.

---

## Lesson 6.2 — The four levers: hierarchy, spacing, typography, color (~60 min)

This begins Objective 1. The small set of principles that fixes most ugly UIs:

- **Hierarchy** — the most important thing is biggest/boldest. Vary size and weight so the eye knows where to go.
- **Spacing** — generous, *consistent* whitespace (use a scale, e.g. Tailwind's 4/8/12/16). Cramped = amateur.
- **Typography** — one good font, a clear size scale, readable line-height. Limit to 2–3 sizes per screen.
- **Color** — a restrained palette: one neutral base, one accent, semantic colors for success/error. Avoid pure black on pure white.

Teach these as *prompt direction*: "apply a consistent 8px spacing scale, one accent color, and clear type hierarchy" beats "make it look nice."

---

## Lesson 6.3 — Component libraries: shadcn/ui (~60 min)

This delivers Objective 2. The fastest path to a polished, consistent look is a good component library. The default is **shadcn/ui** — accessible, themeable components you install into your own repo (you own the code). Install the CLI, add components (button, input, table, card, dialog), and rebuild the clients/invoices UI with them.

```bash
# representative — check current shadcn docs
npx shadcn@latest init
npx shadcn@latest add button input table card
```

Why a library beats hand-styling for beginners: consistency for free, accessibility built in (previews Module 12), a professional baseline you can theme, and it drops real code into your repo — so it pairs with Cursor/Claude Code editing. (Theming/dark mode is a natural next step shadcn supports.)

---

**[SCREENSHOT PLACEHOLDER: shadcn/ui Components]**

Components from shadcn/ui rendered: Button, Input, Table, Card in context of the invoice tracker. Shows polished, accessible baseline.

---

---

## Lesson 6.4 — Restyle the invoice tracker (~75 min)

This delivers Objective 1 end-to-end. Take the plain clients + invoices pages and make them look professional: swap raw tables for styled components, apply the spacing scale, add hierarchy (page title, section headers), a header/nav, and an accent color. Still mock data — purely the visual layer.

Do it AI-assisted but *directed*: give Cursor/Claude Code the design direction from 6.2, review each change against the principles, iterate. **prompt → look critically → refine** — the same loop as code, for design.

**Tip (multimodal, Module 2):** paste a screenshot of a design you like (or a competitor's UI) and ask the AI to match it — a picture guides the styling far better than words.

---

**[SCREENSHOT PLACEHOLDER: Restyled UI ("After")]**

Side-by-side: plain `/clients` (left) and restyled version (right). Shows hierarchy, consistent spacing, professional typography, accent color. Desktop view.

---

---

## Lesson 6.5 — Responsive: does it work on a phone? (~30 min)

This completes Objective 1 and fixes one of the clearest "AI-generated" tells. AI usually generates **desktop-first** layouts that break on small screens — horizontal scroll, tiny tap targets, columns that don't stack. Professional UI works on any screen.

The essentials:

- **Mobile-first mindset** — design for a narrow screen first, then scale up. In Tailwind, base classes are mobile; `sm:` / `md:` / `lg:` prefixes add larger-screen overrides.
- **Stack on small, spread on large** — e.g. `flex-col md:flex-row`. Tables often need a card layout on mobile.
- **No fixed widths** that overflow; use `max-w-*` and fluid containers.
- **Tap targets** — buttons/links big enough to tap (~44px), not desktop-tiny.

Test by resizing the browser or using DevTools device mode at ~375px. And **prompt for it explicitly**: "make this responsive — stack columns on mobile, readable tap targets, no horizontal scroll," because the AI usually won't unless asked. shadcn/Tailwind make this straightforward.

---

**[SCREENSHOT PLACEHOLDER: Responsive Mobile View]**

Side-by-side: restyled `/clients` at desktop width (left) and ~375px mobile width (right). Shows table stacking to card layout, readable tap targets, no horizontal scroll. Proves responsiveness works.

---

---

## Lesson 6.6 — Critique and fix "AI-looking" UI (~45 min)

This delivers Objective 3. Give learners a checklist to audit any screen: Is there a clear focal point? Is spacing consistent? Too many font sizes/colors? Breathing room? Interactive state (hover/focus/disabled) styled? **Does it work on a phone (no horizontal scroll, columns stack)?** Then critique a deliberately generic screen and fix three specific issues.

> **Instructor note:** Put a "before" (raw AI output) and "after" (10 minutes of the levers + a responsive pass) side by side, and resize both to phone width. The gap sells the whole module.
> 

---

## Lesson 6.7 — Design-first AI tools (e.g. Claude Design) (~40 min)

Everything above is *code-first*: you style in the editor with Tailwind/shadcn, which stays the course's default. There's also a *design-first* path worth knowing — sketch and prototype the UI in an AI design tool, then hand it to code. One notable option is **Claude Design** (Anthropic's AI design tool); it's a tool in your kit, not a required part of the workflow.

**What it does:** describe what you want and it generates prototypes, wireframes, slides, or full screens (production-ready HTML/CSS/JS). It can **build a design system from your codebase** so every screen uses your colors, type, and components, and you refine by chatting, editing on the canvas, or adjusting sliders.

**Why it matters here:** it's a natural front-end to Claude Code. A common pro workflow: **prototype the screen or flow in Claude Design → hand it to Claude Code to implement** in your real Next.js app. You can also export a design system for consistency, or export decks/one-pagers (PDF/PPTX).

**When to use which:**

- *Code-first (shadcn in the editor):* you're building the real app and want the code directly.
- *Design-first (Claude Design):* you want to explore layout/flow fast, get stakeholder buy-in, or produce a prototype before writing app code.

Both end in the same place — a styled, real app; a design-first tool just lets you think visually first.

**Alternatives:** other design-first / AI-UI tools include v0, Lovable, and Figma's AI features. The transferable idea is the *approach* (prototype visually, then hand to code) — the specific tool is your choice, and code-first with shadcn remains a perfectly complete path on its own.

> **Version note:** Claude Design is in beta and moving fast; features (design-system import, Claude Code hand-off, exports) evolve — check current docs.
> 

---

**[SCREENSHOT PLACEHOLDER: Claude Design Prototype]**

Screen 1: Claude Design home with prompt "What will you design today?" visible.
Screen 2: Claude Design canvas showing a generated UI prototype (dashboard, form, or flow). Shows design-first workflow output.

---

---

## Hands-on activity (~50 min, folded in)

**"Glow-up."** Each learner restyles their invoice-tracker with a component library and the four levers, makes it **responsive** (works at phone width), then writes a 3-point critique of their own before/after. Deliverable: before/after screenshots (desktop + mobile) + the critique.

---

## Knowledge check (mapped to objectives)

**Objective 1 — Apply design principles (Quiz Q6-1, Q6-2):**
- Q6-1: Tests hierarchy/spacing/typography knowledge
- Q6-2: Tests responsive design understanding
- *Practical check:* Submit before/after screenshots of `/clients` page. For the "after," name 4 changes (e.g., "Increased heading size for hierarchy, added 16px gap between sections, used single font Geist, applied blue accent to action buttons").

**Objective 2 — Use component library (Quiz Q6-3):**
- Q6-3: "shadcn/ui installs component code..." ✅ Tests library understanding
- *Practical check:* Show the restyled screen built with shadcn/ui components. List which components you used (Button, Input, Table, Card, etc.).

**Objective 3 — Critique & fix (Lesson 6.6 knowledge):**
- *Practical check:* Given a generic screenshot, identify 3 problems and fixes:
  - **SAMPLE ANSWER:**
    1. Problem: "No focal point" → Fix: "Make the page title larger (h1) and give it color"
    2. Problem: "Cramped spacing on mobile" → Fix: "Increase padding from 4px to 12px, stack columns vertically below 768px"
    3. Problem: "Too many link colors" → Fix: "Limit to one accent color for all links and buttons"

**Objective 4 — Design-first tools (Q6-4):**
- Q6-4: "What's the benefit of design-first prototyping?" ✅ Tests Claude Design/design-first approach understanding
- *Practical check:* Describe a scenario where design-first (Claude Design) would help vs. code-first (Cursor/Claude Code). Example: "Using Claude Design for a complex dashboard layout helps me see the flow before coding. Once stakeholders approve, I hand the prototype to Claude Code to implement."

---

**Scenario-based judgment checks:**

- (a) Your page looks professional on desktop but text overlaps on phones. What did you miss?
- (b) You're building a settings page. Would you prototype in Claude Design or code directly in Cursor? Why?
- (c) Your colors pass contrast checks but feel jarring. What principle might help?

*Pass mark: 80% and a restyled, responsive screen submitted.*

---

## Tools & alternatives (this module)

Default: **shadcn/ui** on **Tailwind**. **Alternatives:** Tailwind UI (paid), DaisyUI, Radix UI (primitives), MUI / Chakra (full systems). The *principles* (hierarchy, spacing, typography, consistency, responsive) are universal and transfer to any library or framework.

---

## Key takeaways

- AI UIs look generic because the model outputs the most common markup; you supply the design direction.
- Four levers fix most of it: hierarchy, consistent spacing, restrained typography, a small color palette.
- Responsive matters — awkward mobile layout is a classic AI tell; design mobile-first and test at phone width.
- A component library (shadcn/ui) gives a polished, consistent, accessible baseline fast — and you own the code.
- Direct the AI with specific design language (including "make it responsive"), then critique and refine.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)