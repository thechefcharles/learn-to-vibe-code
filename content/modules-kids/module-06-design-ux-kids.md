# Module 6: Design & UX (Make It Look Cool!) 🎨

**Stage:** Building · **Level:** Intermediate · **Duration:** ~5 hours · **XP:** 500

**What you need:** Modules 0-5 (you've built something, now make it pretty)

> **Why this matters:** Your app works but looks boring. This module teaches design basics: layout, spacing, color, and accessibility. Your app will still run on any computer, and people will actually want to use it.

## What You'll Learn

By the end of this module, you'll be able to:

1. **Use design principles** to make your app look good
2. **Pick colors and fonts** that work together
3. **Make your app accessible** to everyone

---

## Lesson 6.1 — Design Principles (~45 min)

Good design isn't magic. It's rules:

**Hierarchy:** What's most important? Make it bigger/bolder.
- Title > description > details

**Spacing:** Breathing room makes things feel less cramped.
- Don't pack everything together

**Alignment:** Line things up (left, center, or right — not all three).
- Random = messy

**Color:** Use a main color + neutrals (white, gray, black).
- Too many colors = chaos

**Contrast:** Text must be readable on its background.
- Black text on white = easy to read
- Light gray text on white = you can't see it!

---

## Lesson 6.2 — shadcn/ui (Pre-Built Pretty Components) (~40 min)

Instead of styling everything from scratch, you can use **shadcn/ui** — a library of beautiful, ready-made components. Think of it like getting free furniture that already matches!

**What you get:**
- Buttons that look professional
- Inputs that work great
- Cards, tables, dialogs (popups) — all styled and ready
- Everything is accessible (works for everyone)
- Everything uses Tailwind underneath, so you can customize

**How to install:**

```bash
npx shadcn@latest init
npx shadcn@latest add button input card table
```

That's it! Now you have beautiful components.

**Before and After:**

```tsx
// ❌ BEFORE — basic, unstyled
<button>View</button>

// ✅ AFTER — with shadcn button component
import { Button } from "@/components/ui/button"

<Button variant="default">View</Button>
```

The shadcn button looks polished, has hover effects, accessibility built-in, and way more!

**The hack:** Use shadcn components instead of plain HTML tags. Your app looks professional without extra work. 🎉

---

## Lesson 6.3 — Design Direction (Tell Claude Code How to Make It Look) (~45 min)

Here's the superpower: instead of manually tweaking every component, you **tell Claude Code your design vision, and it applies it to your whole app at once!**

Design direction is three things:
1. **Hierarchy** — What's most important? Make titles big, details small.
2. **Spacing** — Breathing room between things. Don't cram everything together.
3. **Color** — A simple palette: one main color, neutral background, one accent for buttons.

**Example design direction:**
- Titles should be 28px, bold, dark
- Body text should be 14px, gray
- Buttons should be blue with white text
- Everything should have breathing room

---

## Lesson 6.4 — Accessibility Basics (~45 min)

Accessibility means people with disabilities can use your app.

**Key rules:**

1. **Text contrast** — dark text on light, or light text on dark (use WebAIM to check)
2. **Font sizes** — not too small (min 14px for body text)
3. **Color alone** — don't rely on color to communicate (add icons/text too)
   - Bad: "Red = error, green = success"
   - Good: "❌ Error" and "✅ Success"
4. **Keyboard nav** — users can tab through buttons (mostly automatic in React)
5. **Alt text on images** — describe what you see
   ```
   <img src="photo.jpg" alt="A golden retriever playing fetch" />
   ```

---

## Lesson 6.4 — Claude Code Applies Your Design Direction (~60 min)

This is the automation-first approach: instead of manually tweaking every color, spacing, and component, **you tell Claude Code your design direction, and it applies it to your entire app!** ✨

**Step 1: Tell Claude Code your design vision**

Open Claude Code:

```bash
claude
```

Then paste something like this:

```
I'm styling my pet tracker app with these design rules:

Hierarchy:
- Titles should be 28px, bold, dark gray
- Subtitles should be 16px, lighter gray
- Body text should be 14px, dark gray

Spacing:
- Between sections: 24px gap
- Inside cards: 16px padding
- Between buttons: 8px

Color Palette:
- Main color: blue (#3b82f6)
- Background: light gray (#f9fafb)
- Text: dark gray (#1f2937)
- Buttons: blue text on light blue background, darker blue on hover

Please restyle my pet tracker using shadcn/ui components:
1. Apply these design rules to all pages
2. Use shadcn buttons, inputs, cards
3. Make sure it looks good on phones too

Show me what it looks like and I'll tell you if I want to adjust.
```

**Step 2: Claude Code applies it to your whole app** — not one piece at a time, but everything at once! 🎯

**Step 3: Review the changes** in your browser. Does it look good?

**Step 4: Ask for adjustments:**
- *"The blue is too bright, make it a softer blue"*
- *"The spacing between cards is too tight, make it wider"*
- *"Make the buttons bigger"*

Claude Code adjusts the whole app to match.

**Why this is amazing:**
- One prompt applies your design everywhere (consistent!)
- You don't have to manually edit each component
- Changes propagate across your entire app
- Faster than tweaking manually

---

## Activity: Restyle Your Entire App with Claude Code! 🎨

Use Claude Code to apply a complete design direction to your entire pet tracker app at once. This is automation-first design!

### Step 1: Capture "before" (2 min)
1. Run your app: `npm run dev`
2. Screenshot your page at http://localhost:3000 (looks plain, right?)
3. Save it as your "before" screenshot

### Step 2: Install shadcn/ui (2 min)

In your terminal:
```bash
npx shadcn@latest init
npx shadcn@latest add button card input
```

Now you have beautiful components ready to use!

### Step 3: Write your design direction (5 min)

Think about:
- **Colors:** Pick a main color (blue? green? purple?) and stick with it
- **Spacing:** Should things be tight or spacious?
- **Fonts:** Big titles, medium text, small details

Example:
- Main color: blue
- Background: light gray
- Spacing: medium (16px padding, 8px gaps)
- Titles: big and bold
- Text: readable gray

### Step 4: Let Claude Code restyle your entire app! (15 min)

Open Claude Code:
```bash
claude
```

Paste something like this:

```
Please restyle my entire pet tracker app with this design direction:

Color Palette:
- Main color: Blue (#3b82f6)
- Background: Light gray (#f9fafb)
- Text: Dark gray (#1f2937)
- Buttons: Blue background with white text

Hierarchy:
- Page title: 28px, bold, dark gray
- Section headers: 20px, bold, dark gray
- Body text: 14px, gray

Spacing:
- Between major sections: 24px gap
- Card padding: 16px
- Between inline elements: 8px

Requirements:
- Use shadcn/ui Button, Card, and Input components
- Make sure it looks good on phones too (responsive)
- Add hover effects to buttons
- Keep everything consistent

Apply this to all pages of my pet tracker.
Show me the changes!
```

### Step 5: Review the changes (5 min)
- Does your app look better?
- Are colors consistent?
- Is spacing generous?
- Do buttons look clickable?

### Step 6: Ask for adjustments (5 min)

If something's not quite right, ask Claude Code:
- *"Make the blue lighter"*
- *"Add more spacing between cards"*
- *"Make buttons bigger"*

Claude Code adjusts and shows you the result!

### Step 7: Test on a phone! (3 min)

This is important: does your app work on a small screen?
1. Resize your browser to 375px width (use DevTools)
2. Check:
   - Can you read everything?
   - Are buttons big enough to tap?
   - No horizontal scroll (everything visible)?
3. If something breaks, tell Claude Code: *"Make the layout responsive for phones"*

### Step 8: Capture "after" (2 min)
Screenshot your styled app at desktop size AND phone size!

### Deliverable:
- Before screenshot (plain)
- After screenshot (styled) at desktop
- After screenshot (styled) at phone size (~375px)
- 3-4 sentences explaining:
  - What design direction you chose
  - How Claude Code applied it to your entire app
  - What looks better now
  - *Example:* "I chose a blue and gray color scheme with generous spacing. Claude Code applied it to all pages at once, so everything is consistent. The app looks professional now, and it works great on phones too!"*

---

## Quiz Questions (Preview)

Here are the three questions on your quiz. Study these first!

**Q6-k1:** Why do AI-designed UIs often look boring?
- (a) **The AI picks the most common designs from its training** ✓
- (b) AI doesn't like design
- (c) Tailwind CSS is ugly
- (d) They're always broken

*Why:* AI learns patterns from tons of code and websites. Most websites look similar, so AI copies that default pattern. YOU have to ask for something different!

**Q6-k2:** Which is NOT a design principle?
- (a) Hierarchy (what's most important?)
- (b) Spacing (breathing room)
- (c) **Database indexing** ✓
- (d) Color palette (colors that work together)

*Why:* Hierarchy, spacing, alignment, and color are all design principles. Database indexing is a backend programming thing—totally different!

**Q6-k3:** Tailwind CSS is useful because:
- (a) It replaces Next.js
- (b) **You add classes to HTML instead of writing CSS from scratch** ✓
- (c) It's only for designers
- (d) It works on the backend

*Why:* Instead of writing tons of CSS code, you just add classes like `text-xl`, `bg-blue-500`, `p-4`. Way faster and easier!

---

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **List 3 design principles and give an example of each.**
   - *Example answer:* "Hierarchy: make the title (h1) bigger than the description. Spacing: add p-6 padding around content. Color: use one main color (blue) + neutral (gray)."

2. **Why does contrast matter? What happens with low contrast?**
   - *Example answer:* "Low contrast makes text hard to read. Light gray text on white = you can't see it. High contrast (dark text on light background) = easy to read and accessible to everyone."

3. **Write a Tailwind class list to make a button: blue, bold, big padding, rounded.**
   - *Example answer:* `className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"`

### Scenario-based judgment checks:

*For each scenario, explain what's wrong and how to fix it.*

- **(a) Colors everywhere:** Your page has 8 different colors (purple, orange, pink, green, red, yellow, blue, gray). It looks chaotic.
  - ✅ **Fix:** Restrain your palette. Pick 1 main color + 1 accent + 1 neutral. Change: Use only `bg-blue-500` for buttons, `text-slate-900` for text, and `bg-slate-100` for backgrounds.
  - ❌ **Avoid:** Adding more colors to make it "fun." Too many colors = confusing.

- **(b) No breathing room:** Your cards have `p-1` (1px padding) and feel cramped even on a big screen.
  - ✅ **Fix:** Add spacing. Change: `p-1` to `p-6` (24px padding). Add gaps: `gap-4` between elements.
  - ❌ **Avoid:** Cramped = unprofessional. Generous spacing = better!

- **(c) Text is too small:** Your body text is `text-xs` and people say it hurts their eyes.
  - ✅ **Fix:** Increase font size. Change: `text-xs` to `text-base` or `text-lg`. Check contrast (dark text on light background).
  - ❌ **Avoid:** Making it smaller to "save space." Readability > compactness.

- **(d) No hierarchy:** All headings, text, and buttons are the same size (text-base). People don't know where to look.
  - ✅ **Fix:** Vary sizes and boldness. Change: Title to `text-3xl font-bold`, section headers to `text-xl font-semibold`, body to `text-base`.
  - ❌ **Avoid:** Making everything the same. Hierarchy = bigger/bolder for important stuff.

- **(e) Button is hard to click:** Your button is `px-2 py-1` (tiny). People miss it on phones.
  - ✅ **Fix:** Make it bigger. Change: `px-2 py-1` to `px-4 py-2` or `px-6 py-3`. Aim for ~44px tall.
  - ❌ **Avoid:** Small buttons. They're frustrating!

---

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | Before screenshot shows plain/boring styling |
| ✅ | After screenshot shows Tailwind classes applied (colors, spacing, rounded corners) |
| ✅ | Color palette is consistent (1 main color, 1 accent, 1 neutral) |
| ✅ | Spacing is generous (at least `p-4` or `p-6`, gaps between elements) |
| ✅ | Text is readable (good contrast, not too small) |
| ✅ | Buttons are big and easy to click (~44px) |
| ✅ | Page has clear hierarchy (headings are bigger/bolder than body text) |
| ✅ | You can explain 2-3 changes you made and why |

*Pass mark: 80% and before/after screenshots with explanation submitted.*

---

## Key Takeaways

- Good design follows rules (hierarchy, spacing, alignment, color) 🎨
- Tailwind CSS makes design easy (no writing CSS from scratch)
- Accessibility helps everyone
- Show the AI a screenshot and it can build to match
- Color palettes = consistency

**Next:** Module 7 — Supabase (The Database!)
