# Module 7: Design & UX (Make It Not Look AI-Generated)

**Stage:** Building · **Level:** Intermediate · **Duration:** ~6 contact hours (0.6 CEU)

**Prerequisites:** Modules 4–5. Learners have the invoice-tracker's clients + invoices UI built (mock data) — functional but plain. This module makes it look professional before the backend goes in (Module 8).

> AI produces *functional* UIs that all look the same: default fonts, cramped spacing, no hierarchy, awkward on mobile — instantly recognizable as "AI-generated." Making software look intentional is the single biggest differentiator between a hobby project and something people trust. This is a real, learnable skill, and it's where many AI builders stop short.
> 

> **📸 Screenshots:** the styled app-UI and the **mobile (375px)** shots are auto-capturable with Playwright from the reference app — and the mobile shots are the real new Module 7 figures. Note: the reference app is styled from the start, so it has no genuine plain "before"; a true styled-vs-plain before/after needs a plain-UI variant captured separately (or done live while recording).
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

Show the tells: default system fonts, everything the same size and weight, no breathing room, inconsistent spacing, harsh default colors, no focal point, and layouts that break on a phone. The model outputs the *most common* markup (Module 2), and common = generic. The fix isn't more AI — it's giving the AI *design direction* and knowing good from bad when you see it.

> **Aside — developing taste:** the fastest way to get a designer's eye is to study products you admire (Linear, Stripe, Notion) and notice their restraint: generous spacing, few font sizes, a tiny color palette. Copy the *principles*, not the pixels.
> 

---

### What Plain AI-Generated UI Looks Like

Here's what your app looks like when Cursor or Claude Code builds it without any design direction:

![m06-before-clients]

![m06-before-invoices]

**Notice:**
- **Font:** Default system font (Arial, no personality, no brand)
- **Spacing:** Text is crammed together; hard to scan at a glance
- **Hierarchy:** All text is the same size and weight (heading = field label = button text)
- **Color:** Black text, white background; no accent color to guide attention
- **Visual distinction:** No borders, shadows, or visual cues (status badges look identical)

This is *functional*. It works. Data is there. But it looks like something from 1995 — or worse, it screams "I used AI" in the worst way.

### Why It Happens

AI models (like Claude, and the language models inside Cursor) produce the *statistically most common* markup. On the internet, that's:
- Default sans-serif fonts (Arial, Helvetica)
- Minimal spacing (to fit more on screen)
- Flat hierarchy (no size variation)
- No custom colors (saves bandwidth)

The model isn't being lazy—it's being statistically accurate. But accuracy ≠ good design.

### Your Job

You're going to learn the four levers that transform "plain" into "professional" (Lesson 6.2). Then you'll apply them using a component library and Claude Code (Lesson 6.4).

The transformation is the most motivating moment in the course. Same data, same structure, completely different vibe.

---

## Lesson 6.2 — The four levers: hierarchy, spacing, typography, color (~60 min)

This begins Objective 1. The small set of principles that fixes most ugly UIs:

- **Hierarchy** — the most important thing is biggest/boldest. Vary size and weight so the eye knows where to go.
- **Spacing** — generous, *consistent* whitespace (use a scale, e.g. Tailwind's 4/8/12/16). Cramped = amateur.
- **Typography** — one good font, a clear size scale, readable line-height. Limit to 2–3 sizes per screen.
- **Color** — a restrained palette: one neutral base, one accent, semantic colors for success/error. Avoid pure black on pure white.

Teach these as *prompt direction*: "apply a consistent 8px spacing scale, one accent color, and clear type hierarchy" beats "make it look nice."

**Concrete examples — bad vs. good:**

```tsx
// ❌ BAD — cramped, no hierarchy, too many colors
export default function Clients() {
  return (
    <div>
      <h1 style={{ fontSize: '12px', color: '#000' }}>Clients</h1>
      <table style={{ width: '100%', border: '1px solid #ccc' }}>
        <tr>
          <td style={{ padding: '2px', color: '#0066ff' }}>Name</td>
          <td style={{ padding: '2px', color: '#ff0000' }}>Email</td>
          <td style={{ padding: '2px', color: '#00aa00' }}>Status</td>
        </tr>
        {/* rows... */}
      </table>
    </div>
  );
}

// ✅ GOOD — hierarchy, consistent spacing, restrained palette
export default function Clients() {
  return (
    <div className="space-y-8 px-6 py-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Clients</h1>
        <p className="text-sm text-slate-500 mt-2">Manage your client list</p>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        {/* rows using consistent spacing and semantic colors */}
      </Table>
    </div>
  );
}
```

**The levers in action:**
- **Hierarchy:** h1 is large and bold; column headers smaller; body text smallest
- **Spacing:** `space-y-8` (consistent vertical gaps), `px-6 py-8` (generous padding)
- **Typography:** one font family, three clear sizes (h1, h2, body)
- **Color:** slate palette (neutral), no accent needed here (save accent for actions)

---

## Lesson 6.3 — Component libraries: shadcn/ui (~60 min)

This delivers Objective 2. The fastest path to a polished, consistent look is a good component library. The default is **shadcn/ui** — accessible, themeable components you install into your own repo (you own the code). Install the CLI, add components (button, input, table, card, dialog), and rebuild the clients/invoices UI with them.

```bash
# representative — check current shadcn docs
npx shadcn@latest init
npx shadcn@latest add button input table card
```

Why a library beats hand-styling for beginners: consistency for free, accessibility built in (previews Module 23), a professional baseline you can theme, and it drops real code into your repo — so it pairs with Cursor/Claude Code editing. (Theming/dark mode is a natural next step shadcn supports.)

---

**[SCREENSHOT PLACEHOLDER: shadcn/ui Components]**

Components from shadcn/ui rendered: Button, Input, Table, Card in context of the invoice tracker. Shows polished, accessible baseline.

---

---

## Lesson 6.4 — Apply design direction with Claude Code (~75 min)

This delivers Objective 1 end-to-end. Take the plain clients + invoices pages and make them look professional: swap raw tables for styled components, apply the spacing scale, add hierarchy (page title, section headers), a header/nav, and an accent color. Still mock data — purely the visual layer.

### The automation-first approach: Claude Code applies design direction

Instead of manually tweaking CSS/Tailwind classes line by line, **prompt Claude Code to apply your design direction to the entire app:**

**Step 1 — Ensure shadcn/ui is installed:**

```bash
npx shadcn@latest init
npx shadcn@latest add button input table card badge
```

**Step 2 — Open Claude Code and give it design direction:**

```bash
claude
```

Then write:

```
I'm applying the four design levers (hierarchy, spacing, typography, color) 
to my invoice tracker. Current state: plain pages with raw HTML tables and no styling.

Please restyle these pages using shadcn/ui components:
1. app/clients/page.tsx
2. app/invoices/page.tsx  
3. Create an app/components/Header.tsx with nav

Design direction:
- Hierarchy: Page title (h1) 32px bold, section headers 20px, body 14px
- Spacing: Consistent 8px scale, minimum 24px between sections, 6px internal padding
- Typography: Use Inter font (system default), 3 size tiers max
- Color: Slate neutral palette (text: slate-900, bg: slate-50), blue accent (#2563eb) for CTAs

Specific requirements:
- Use shadcn <Table>, <Button>, <Card>, <Input> components
- Add a header with "Clients"/"Invoices" title + subtitle
- Wrap pages in Card with consistent padding
- Responsive: columns stack on mobile (no horizontal scroll)
- Buttons use accent blue for primary actions
- Include hover/focus states where shadcn provides them
- Add a header navigation bar linking to /clients and /invoices

Please apply this to all pages, creating a cohesive design.
I'll review each file and iterate if needed.
```

**Step 3 — Review Claude Code's output.** Claude Code will propose styling changes across multiple files. Step through:
- Does the hierarchy match (larger titles, smaller body)?
- Is spacing consistent (check gap/p-* classes)?
- Are shadcn components used consistently?
- Is the color palette restrained (no random colors)?
- Do the pages respond to mobile resize (test in DevTools)?

**Step 4 — Accept or refine.** If something's off:
- Tell Claude Code: "The accent blue is too bright; use slate-500 for secondary buttons instead"
- Or: "The spacing between sections feels cramped; increase to 32px"
- Claude Code iterates until you're satisfied

**Step 5 — Test responsively.** Run the app and resize to mobile (375px). Verify:
- Tables stack into readable layouts (not horizontal scroll)
- Buttons are large enough to tap (~44px)
- Text is readable (no font < 12px on mobile)

**Why Claude Code for styling?**

- **End-to-end consistency:** Claude Code applies the design direction to all pages at once, so nothing is missed
- **Component-aware:** it uses shadcn/ui everywhere, avoiding inconsistent ad-hoc styling
- **Responsive-first:** it handles mobile breakpoints as part of the design direction, not an afterthought
- **Iteration-friendly:** you refine once, and it propagates across all pages

**Tip (multimodal, Module 3):** if you have a reference design you like (Linear, Stripe, your competitor), describe or paste a screenshot. Tell Claude Code: "Make it feel like [company]'s UI" — a picture guides styling far better than words.

---

**[SCREENSHOT PLACEHOLDER: Restyled UI ("After")]**

Side-by-side: plain `/clients` (left) and restyled version (right). Shows hierarchy, consistent spacing, professional typography, accent color. Desktop view. And resized to mobile (375px) on the right, showing responsive stacking.

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

**Exercise:** Take a raw AI-generated screen and spend 10 minutes applying the design levers (focal point, spacing, fonts, breathing room, interactive states) and making it phone-responsive. Compare the before (AI raw) and after (your polish) side by side at phone width. That gap between raw and polished is what you're building toward in production work.
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

### Step-by-step walkthrough:

**Phase 1: Capture a "before" screenshot (5 min)**
1. Run your app: `npm run dev`
2. Open `http://localhost:3000/clients` in your browser
3. Take a screenshot (desktop view)
4. Resize the browser to ~375px mobile width and take a second screenshot
5. Save both — you'll use them in your final critique

**Phase 2: Install shadcn/ui (10 min)**
1. In your terminal: `npx shadcn@latest init`
2. Follow the prompts (use defaults)
3. Add components: `npx shadcn@latest add button input table card badge`

**Phase 3: Use Claude Code to apply design direction (25 min)**

Open Claude Code:

```bash
claude
```

Send this prompt:

```
Apply the four design levers to my invoice-tracker app using shadcn/ui:

DESIGN DIRECTION:
- Hierarchy: h1=32px bold, headers=20px, body=14px
- Spacing: 8px scale, 24px between sections, 6px internal padding
- Typography: Inter font, 3 sizes max
- Color: slate palette (text: slate-900, bg: slate-50), blue accent for buttons

PAGES TO RESTYLE:
1. app/clients/page.tsx — use shadcn Table, add page header, wrap in Card
2. app/invoices/page.tsx — same treatment
3. app/components/Header.tsx — create with nav links

REQUIREMENTS:
- Replace raw <table> with shadcn <Table>
- Use <Button>, <Card>, <Input> components
- NO horizontal scroll on any page
- Responsive: columns stack on mobile
- Hover/focus states included (shadcn provides them)

Apply this design to all pages for consistency. I'll iterate if needed.
```

Claude Code will restyle all pages. Review:
- ✅ shadcn components used consistently (`<Table>`, `<Button>`, `<Card>`)
- ✅ Spacing classes consistent (`gap-*`, `p-*`, `space-y-*`)
- ✅ Color palette restrained (slate + blue only)
- ✅ Heading sizes vary (h1 > h2 > body)

**Phase 4: Test responsive (mobile) view (5 min)**
1. Keep your app running
2. Open DevTools (F12)
3. Click the device toolbar icon (or Ctrl+Shift+M)
4. Set it to `iPhone 12` or a 375px-width preset
5. Scroll and test:
   - ✅ Table columns stack into cards (not a horizontal scrollbar)
   - ✅ Buttons are big enough to tap (~44px)
   - ✅ Text is readable (no tiny font)
6. Take a screenshot

**Phase 5: Critique your own work (5 min)**

Compare before/after. List 3 specific changes you made and why:

```
1. Increased h1 font size from 16px to 32px → improved visual hierarchy
2. Added 24px gap between sections → more breathing room (Tailwind space-y-6)
3. Changed button colors from gray to blue accent → clear call-to-action
```

### Deliverable:
- Before screenshot (desktop + mobile)
- After screenshot (desktop + mobile)
- 3-point critique (specific changes + reasoning)
- Optional: screenshot of your `/invoices` page restyled the same way

---

## Quiz questions (preview)

These are the four questions you'll see on the quiz. Study these to prepare:

**Q6-1:** Why do AI-generated UIs look generic?
- (a) **the model outputs the most common markup** ✓
- (b) AI dislikes design
- (c) Tailwind is ugly
- (d) they're always broken

*Why:* AI models trained on web data default to common patterns (Module 2's principle). The fix isn't better AI—it's **you** providing specific design direction (hierarchy, spacing, typography, color).

**Q6-2:** Which is NOT one of the four design levers?
- (a) hierarchy
- (b) spacing
- (c) **database indexing** ✓
- (d) typography

*Why:* The four design levers are hierarchy (what's most important?), spacing (breathing room), typography (fonts and sizes), and color (palette). Database indexing is backend, not design.

**Q6-3:** shadcn/ui is notable because:
- (a) it's a paid black box
- (b) **it installs component code into your own repo that you own** ✓
- (c) it replaces Next.js
- (d) it's backend-only

*Why:* shadcn/ui copies component code into your repo, giving you full ownership and control. You can modify, theme, and maintain it yourself—not locked into a vendor.

**Q6-4:** What's the benefit of design-first prototyping (e.g. Claude Design) before coding?
- (a) it's faster than coding
- (b) the AI can't make mistakes in design
- (c) **you see the visual intent *before* writing code, avoiding re-layout later** ✓
- (d) it replaces the need for CSS

*Why:* Design-first prototyping locks down layout and visual hierarchy before code, saving you from building the wrong layout and having to rework it all later. It's a planning tool (Module 4's principle, applied to design).

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

*For each scenario, explain the problem and how to fix it.*

- **(a) Desktop looks pro, mobile is broken:** Your page looks professional on desktop but text overlaps on phones. What did you miss?
  - ✅ **Correct:** Responsive design (mobile-first). Fix: Add responsive classes to stack columns on mobile (`flex-col md:flex-row`), increase tap targets, test at 375px width.
  - ❌ **Avoid:** Ignoring mobile and hoping desktop CSS works everywhere.

- **(b) Prototype vs. code:** You're building a complex settings page with multiple sections. Would you prototype in Claude Design or code directly in Cursor? Why?
  - ✅ **Correct:** Claude Design first. Complex layouts benefit from visual prototyping before code. Once approved, hand to Claude Code to implement.
  - ❌ **Avoid:** Guessing the layout in code, building it, then realizing mid-way it needs restructuring.

- **(c) Contrast passes, colors feel jarring:** Your colors pass contrast checks but the page feels chaotic. What principle might help?
  - ✅ **Correct:** Restrain your palette. Pick 1 neutral base + 1 accent + semantic colors (success/error). Fix: swap multiple bright colors for a cohesive scheme.
  - ❌ **Avoid:** Adding more colors to differentiate things. Restraint, not variety, makes design feel intentional.

- **(d) Spacing feels cramped:** You restyled with shadcn, but the layout feels cramped even on desktop. What's wrong?
  - ✅ **Correct:** Spacing isn't consistent or generous enough. Fix: use Tailwind's spacing scale (e.g., `gap-8 p-6`) and check that gaps between sections are ≥ 24px.
  - ❌ **Avoid:** Adding more content. The problem is space, not information.

- **(e) Hierarchy is unclear:** Users don't know where to look on the page. The design is colorful but confusing. What's missing?
  - ✅ **Correct:** Visual hierarchy. Fix: make the primary action (e.g., "Create Invoice" button) largest and most prominent; de-emphasize secondary info.
  - ❌ **Avoid:** Making everything bold/big. Hierarchy comes from *contrast*, not volume.

---

**Rubric checklist (self-review before submission):**

| Criterion | Check (✅ = pass) |
|-----------|-------------|
| **Hierarchy** | Page title (h1) is clearly the most prominent; section headers and body text scale down clearly |
| **Spacing** | Consistent gaps between elements (no cramped areas); at least 24px between major sections |
| **Typography** | Single font family; 3 clear sizes (h1, body, small); readable line-height (1.5+) |
| **Color** | Restrained palette (neutral base + 1 accent + semantic colors); no pure black on white |
| **Responsive** | Works at 375px width; columns stack on mobile; no horizontal scroll; tap targets ≥ 44px |
| **Component library** | Uses shadcn/ui Button, Input, Table, Card (not raw HTML/divs) |
| **Before/after screenshots** | Desktop view + mobile view (375px) for both versions |
| **Critique** | 3 specific design changes named with reasoning (e.g., "increased h1 from 16px to 32px for hierarchy") |

*Pass mark: 80% and a restyled, responsive screen submitted.*

---

## Lesson 6.4b — Learning from competitors: Screenshot reference design extraction (~60 min)

**The challenge:** "How do I get taste?" The fastest way is to study products you admire and learn *why* they work. This lesson teaches you to systematically extract design patterns from competitor or reference apps, then adapt them to your own.

### The workflow: See → Understand → Build

1. **See** — Screenshot a competitor or reference feature
2. **Understand** — Identify the design principles at work (hierarchy, color, spacing, typography)
3. **Build** — Ask Claude Code to adapt the pattern to your app

### Step 1: Capture reference designs

**What to screenshot:**
- Competitor product features you want to match (e.g., Stripe's dashboard layout, Figma's toolbar, Linear's issue sidebar)
- Reference apps in your market that have great UX (e.g., if you're building invoicing, screenshot FreshBooks, Wave, or Stripe Invoicing)
- Design system examples (e.g., shadcn/ui demos, Ant Design components, MUI showcase)

**How to capture:**
- Use your OS screenshot tool (Cmd+Shift+4 on Mac, Win+Shift+S on Windows)
- Or use browser DevTools to take element screenshots
- Save to a folder for reference

**Example:** Stripe's invoice page has a great design. Screenshot its layout, buttons, colors, and spacing. That's your reference.

### Step 2: Analyze the design

Before asking Claude to build it, you analyze what you see. Look for:

**Hierarchy:** Which elements draw the eye first? (Usually title, then primary action button, then supporting info)

**Spacing:** How much whitespace? Dense or relaxed? (Generous spacing = premium feel)

**Typography:** How many font sizes? Colors? Weights? (Usually 3–4 sizes, not 10)

**Color:** How many colors in the palette? Accent color? Neutral base? (Restrained = professional)

**Layout:** Grid or custom? Rows/columns? Responsive or fixed-width?

**Components:** What UI parts do you see? (Buttons, cards, badges, modals, etc.)

### Step 3: Transcribe your observations into a prompt

Once you've analyzed, turn it into a design prompt for Claude Code. **Don't describe it in prose — use the pattern from Lesson 6.4 (design direction).**

**Example:**

```
Here's a screenshot of [competitor app] [screenshot attached].

Design analysis:
- Hierarchy: The "Create Invoice" button is large and prominent (40px, blue). The invoice list below is secondary (smaller text, muted gray).
- Spacing: 32px gap between the header and the table, 16px padding inside cards.
- Typography: Headings are large (28px), body text is 14px, labels are 12px and gray.
- Color palette: Blue (#0066FF) for actions, gray (#6B7280) for secondary, white background, light gray (#F3F4F6) for rows.
- Layout: Full-width on desktop, single-column on mobile.

I want to build a similar invoice page for my app. Apply this design pattern to my dashboard. Use shadcn/ui components. Keep the responsive structure (full-width desktop, single-column mobile).

Show me the design direction you'd apply.
```

Claude Code reads this, sees the screenshots, understands your intent, and generates a design that matches the pattern you identified.

### Step 4: Iterate on the adapted design

After Claude Code applies the pattern to your app, screenshot your result and compare:

```
Here's my adapted design [your screenshot].
Compare it to the reference [competitor screenshot].

The [feature name] doesn't stand out enough. Make the button 40px like the reference.
Also, the spacing between the table rows should be larger — use 16px padding like the reference.
```

Iterate until your version captures the essence of the reference without copying it exactly.

### Advanced: Combining competitor analysis with product strategy

This technique pairs with Module 4 (planning). When planning a feature, research how competitors solved the same problem, extract the pattern, and build on it. This is faster than inventing from scratch and guarantees your users will recognize the pattern (good UX convention).

**Example workflow:**

1. **Feature:** "I need to add a payments page"
2. **Competitors:** Screenshot Stripe's payment settings, Lemonsqueezy, Gumroad
3. **Analysis:** All three show a list of payment methods with an "Add" button, past transactions below, and a status badge (Active/Inactive)
4. **Build:** Describe this pattern to Claude Code with a screenshot of one reference
5. **Result:** You ship a payments page faster and it *feels* familiar to users because they've seen this pattern before

### Hands-on: Find a pattern, adapt it

1. **Pick a feature** you're building (e.g., settings page, user profile, dashboard, list page)
2. **Find a reference** (competitor, design system, or reference app that does it well)
3. **Screenshot** the reference
4. **Analyze** hierarchy, spacing, typography, color (write 1–2 sentences per principle)
5. **Prompt Claude Code** with your analysis + screenshot
6. **Iterate** until your version matches the quality of the reference
7. **Document:** Save a side-by-side screenshot (reference on left, your result on right) with your analysis

This technique, practiced regularly, trains your design eye and accelerates your development speed. You're not copying; you're learning patterns and adapting them thoughtfully.

---



Default: **shadcn/ui** on **Tailwind**. **Alternatives:** Tailwind UI (paid), DaisyUI, Radix UI (primitives), MUI / Chakra (full systems). The *principles* (hierarchy, spacing, typography, consistency, responsive) are universal and transfer to any library or framework.

---

## Key takeaways

- AI UIs look generic because the model outputs the most common markup; you supply the design direction.
- Four levers fix most of it: hierarchy, consistent spacing, restrained typography, a small color palette.
- Responsive matters — awkward mobile layout is a classic AI tell; design mobile-first and test at phone width.
- A component library (shadcn/ui) gives a polished, consistent, accessible baseline fast — and you own the code.
- Direct the AI with specific design language (including "make it responsive"), then critique and refine.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)