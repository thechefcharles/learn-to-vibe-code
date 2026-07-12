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

## Lesson 6.2 — Apply Design with Tailwind by Hand (~30 min)

Before you ask Claude Code to style everything, let's write some Tailwind classes ourselves. This isn't hard — you're just combining predefined class names.

### What is Tailwind?

Tailwind is a library of CSS classes that do one thing each:
- `text-2xl` = make text bigger
- `font-bold` = make text thicker
- `p-6` = add padding (space inside)
- `bg-blue-500` = blue background
- `rounded-lg` = rounded corners
- `shadow-lg` = drop shadow

You combine them like: `<button class="bg-blue-500 text-white p-4 rounded-lg">Click me</button>`

The browser reads these class names and applies the styles automatically. That's the whole magic.

### Practice: Style a Pet Card

Here's HTML for a pet card (from Module 4, remember?):

```jsx
<div>
  <img src="fluffy.jpg" alt="Fluffy" />
  <h3>Fluffy</h3>
  <p>A golden retriever who loves swimming</p>
  <button>Delete</button>
</div>
```

This is ugly (plain). Let's style it with Tailwind:

**Goal 1: Add padding and a border**
```jsx
<div className="border rounded-lg p-6">
  {/* content */}
</div>
```
- `border` = adds a thin line around the card
- `rounded-lg` = makes corners rounded
- `p-6` = adds padding inside (space around content)

**Try it:** If you're following along, add these classes. See your card get prettier? That's styling.

**Goal 2: Make the image fill the card width**
```jsx
<img src="fluffy.jpg" alt="Fluffy" className="w-full h-48 object-cover rounded-t-lg" />
```
- `w-full` = width: 100% (take full width of parent)
- `h-48` = height: fixed height (so photos don't stretch weirdly)
- `object-cover` = crop the photo to fit (like Instagram)
- `rounded-t-lg` = round the TOP corners (top of image)

**Goal 3: Style the heading and description**
```jsx
<h3 className="text-2xl font-bold mt-3">Fluffy</h3>
<p className="text-gray-600 text-sm mt-2">A golden retriever who loves swimming</p>
```
- `text-2xl` = make heading bigger
- `font-bold` = make text thicker
- `mt-3` = margin-top (space above, separates from image)
- `text-gray-600` = gray text (less important than heading)
- `text-sm` = smaller text for description

**Goal 4: Style the delete button**
```jsx
<button className="bg-red-500 text-white px-4 py-2 rounded mt-3 hover:bg-red-600">Delete</button>
```
- `bg-red-500` = red background (warning color for delete)
- `text-white` = white text
- `px-4 py-2` = padding left/right + top/bottom (makes button bigger and easier to click)
- `rounded` = rounded corners
- `hover:bg-red-600` = when you hover, make it darker red (shows it's clickable)

**What you just did:** You styled an entire card with Tailwind classes. No CSS files, no magic—just class names. This is how ALL styling works in modern web dev.

### Practice Challenge

**Challenge:** Style a pet list item (like this):
```jsx
<li>
  <span>Fluffy (Golden Retriever)</span>
  <button>Delete</button>
</li>
```

**Your job:** Add Tailwind classes to make it look like:
- Pet name is bold and bigger
- Delete button is small and red
- Add padding and a subtle border
- Add spacing between items

Write your own HTML with classes (or copy-paste the above and add classes). Then compare to the solution in the dropdown.

**Solution hint:**
```jsx
<li className="flex justify-between items-center border-b pb-3 mb-3">
  <span className="font-bold text-lg">Fluffy (Golden Retriever)</span>
  <button className="bg-red-500 text-white text-xs px-2 py-1 rounded">Delete</button>
</li>
```

(If you don't recognize `flex`, `justify-between`, etc., that's OK—we'll cover layout next. For now, just see how we combine classes to style components.)

---

## Key Takeaway

**Tailwind is just class names.** You don't write CSS; you write class names. Once you understand the patterns (`p-` = padding, `m-` = margin, `text-` = font size, `bg-` = background), you can style anything.

**Next step:** Claude Code knows ALL these class names and combines them automatically. But now you understand what it's doing.

---

## Lesson 6.3 — shadcn/ui (Pre-Built Pretty Components) (~40 min)

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

## Lesson 6.4 — Design Direction (Tell Claude Code How to Make It Look) (~45 min)

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

## Lesson 6.5 — Accessibility Basics (~45 min)

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

## Lesson 6.6 — Claude Code Applies Your Design Direction at Scale (~60 min)

Now you understand Tailwind classes and design principles. You could write them all by hand, but that's slow for a big app. Here's where Claude Code helps:

**You describe the design direction → Claude Code writes 100+ Tailwind classes for every component.**

Why does this work?
- You know what good design looks like (hierarchy, spacing, color, responsive)
- You've written Tailwind classes by hand, so you understand what Claude Code is creating
- Claude Code is fast at pattern-matching: "This heading should be bigger" → `text-3xl font-bold`

**Bottom line:** Claude Code does 90% of the mechanical work (writing classes). YOU owned the thinking (design principles). Now you verify it looks good.

### How It Works

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

## Activity: Style Your Pet Tracker — Manual First, Then Claude Code! 🎨

You're going to style your pet tracker in two stages: first, apply Tailwind manually to 3 key elements. Then, ask Claude Code to apply consistent design everywhere.

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

### Step 3: Manually apply 3 Tailwind changes (15 min)

Your pet tracker is unstyled. Let's make 3 manual improvements first:

**3a: Make the title bigger and bold**
   - Find the `<h1>` or main title line in your page
   - Add class: `className="text-4xl font-bold mb-6"`

**3b: Add a border and padding to the pet list**
   - Find the `<div>` wrapping the pets
   - Add class: `className="border rounded-lg p-6 bg-white"`

**3c: Style the "Add pet" button**
   - Find the button
   - Add class: `className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"`

Run `npm run dev` and check: Does it look better? You're styling!

### Step 4: Verify your manual changes (5 min)

Look at your app. Answer:
- Is the title noticeably bigger?
- Does the pet list have a border and padding?
- Is the button blue and clickable-looking?

If yes to all three, great! You've applied design manually. Now you understand what Tailwind does.

### Step 5: Ask Claude Code to apply design everywhere (10 min)

Now that you've done the work manually, Claude Code can do it at scale.

Open Claude Code:
```bash
claude
```

Write something like:

```
I've started styling my pet tracker with Tailwind. I've made:
- Title: text-4xl font-bold mb-6
- Pet list: border rounded-lg p-6 bg-white
- Add button: bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600

Now I want you to apply consistent design to the ENTIRE app:
1. Consistent heading styles (h1 = text-4xl, h2 = text-2xl, etc.)
2. Consistent spacing (p-6 for sections, mb-3 for small spacing)
3. Consistent colors (blue for primary actions, red for delete, gray for secondary)
4. Make it responsive (mobile: smaller, desktop: bigger)

Apply to: all pages, all components, all buttons.
```

Claude Code will:
- Read your existing Tailwind
- Match your patterns
- Apply them everywhere
- Suggest responsive improvements

### Step 6: Review Claude Code's changes (10 min)

Claude Code will show you the diffs. **Read them carefully:**
- Does every heading have consistent size?
- Is the color scheme consistent (blue, red, gray)?
- Does the responsive layout make sense (check on phone-sized screen)?

If something looks off, ask Claude Code: *"The delete button is too small on mobile. Make it bigger on small screens with `sm:text-base`"*

### Step 7: Test on a phone! (5 min)

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
  - Which 3 Tailwind classes you applied manually
  - How Claude Code applied design to your entire app
  - What looks better now
  - *Example:* "I manually added text-4xl to the title, rounded-lg to the card, and bg-blue-500 to the button. Then Claude Code applied these patterns everywhere, so all headings match, all spacing is consistent, and the color scheme is blue/gray/red. The app looks professional and works great on phones!"*

---

## Quiz Questions (Preview)

Here are the three questions on your quiz. Study these first!

**Q6-k1:** You're designing a pet card. Which Tailwind classes would you use to make the heading bigger and bold?
- (a) `text-2xl font-bold`
- (b) `big bold`
- (c) `large weight-heavy`
- (d) `fontSize bigger`

*Answer: A* — `text-2xl` makes text bigger, `font-bold` makes it thicker. B, C, D are not real Tailwind classes. This is what you learned in Lesson 6.2!

**Q6-k2:** You asked Claude Code to restyle your app, and it added `sm:text-base md:text-lg` to a button. What does this mean?
- (a) The button text is different on small vs medium screens
- (b) Claude Code made an error
- (c) It means "sometimes text-base, sometimes text-lg"
- (d) It's a math equation

*Answer: A* — `sm:` = small screen, `md:` = medium screen. The text changes size based on screen width. This is "responsive design."

**Q6-k3:** You wrote `className="bg-blue-500 text-white p-4 rounded"` for a button. What will this button look like?
- (a) **Blue background, white text, padding inside, rounded corners** ✓
- (b) Just a text label
- (c) A blue circle
- (d) An error

*Why:* Breaking it down: `bg-blue-500` (blue), `text-white` (white text), `p-4` (padding), `rounded` (rounded corners). This is combining Tailwind classes!

---

## Knowledge Check (Understanding & Scenarios)

### Written checks:

1. **You manually add `className="text-2xl font-bold p-6 rounded-lg"` to a card. What does each class do?**
   - *Example answer:* "text-2xl makes the text bigger, font-bold makes it thicker, p-6 adds padding (space inside), and rounded-lg rounds the corners. Together they make a styled card."

2. **Why should you manually write a few Tailwind classes BEFORE asking Claude Code to style your whole app?**
   - *Example answer:* "Because it helps me understand how Tailwind works. When Claude Code applies it everywhere, I know what it's doing. I can also verify that its changes match my design direction."

3. **You asked Claude Code to style your app. It added `sm:text-lg md:text-xl lg:text-2xl` to your heading. Should you accept this, or question it?**
   - *Example answer:* "I should verify by testing on different screen sizes. The heading should get bigger as the screen gets bigger. This looks right for responsive design."

### Scenario-based judgment checks:

*For each scenario, explain what's wrong and how to fix it.*

- **(a) Colors everywhere:** Your page has 8 different colors. It looks chaotic.
  - ✅ **Fix:** Restrain your palette. Pick 1 main color + 1 accent + 1 neutral. Use `bg-blue-500` for buttons, `text-gray-900` for text, `bg-gray-100` for backgrounds.
  - ❌ **Avoid:** Adding more colors to make it "fun." Too many colors = confusing.

- **(b) No breathing room:** Your cards have `p-1` (tiny padding) and feel cramped.
  - ✅ **Fix:** Add spacing. Change: `p-1` to `p-6` (24px padding). Add gaps: `gap-4` between elements.
  - ❌ **Avoid:** Cramped = unprofessional. Generous spacing = better!

- **(c) Text is too small:** Your body text is `text-xs` and people say it hurts their eyes.
  - ✅ **Fix:** Increase font size. Change: `text-xs` to `text-base` or `text-lg`. Check contrast (dark text on light background).
  - ❌ **Avoid:** Making it smaller to "save space." Readability > compactness.

- **(d) No hierarchy:** All headings, text, and buttons are the same size (text-base). People don't know where to look.
  - ✅ **Fix:** Vary sizes and boldness. Change: Title to `text-3xl font-bold`, headers to `text-xl font-semibold`, body to `text-base`.
  - ❌ **Avoid:** Making everything the same. Hierarchy = bigger/bolder for important stuff.

- **(e) Claude Code's responsive classes look wrong:** It added `sm:p-2 md:p-4 lg:p-6` to a card, but you expected `sm:p-4 md:p-6 lg:p-8`.
  - ✅ **Fix:** Question it and test on real screen sizes. If the padding looks too tight on mobile, ask Claude Code: "Make mobile padding larger: `sm:p-4`"
  - ❌ **Avoid:** Accepting Claude Code's output without verifying. Always test responsive design!

---

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | Before screenshot shows plain/boring styling |
| ✅ | Step 3 completed: You manually added 3 Tailwind classes (title, list, button) |
| ✅ | Step 4 verified: Manual changes are visible (title bigger, list has border, button is blue) |
| ✅ | After screenshot shows full design applied (colors, spacing, rounded corners everywhere) |
| ✅ | Color palette is consistent (1 main color, 1 accent, 1 neutral) |
| ✅ | Spacing is generous (at least `p-4` or `p-6`, gaps between elements) |
| ✅ | Text is readable (good contrast, not too small) |
| ✅ | Buttons are big and easy to click (~44px) |
| ✅ | Page has clear hierarchy (headings are bigger/bolder than body text) |
| ✅ | Explanation mentions: (1) the 3 manual classes you added, (2) how Claude Code applied them everywhere, (3) what looks better |

*Pass mark: You did manual styling first (Steps 1-4), then Claude Code (Steps 5-7), and can explain what you did.*

---

## Key Takeaways

- Good design follows rules (hierarchy, spacing, alignment, color) 🎨
- Tailwind CSS makes design easy (no writing CSS from scratch)
- Accessibility helps everyone
- Show the AI a screenshot and it can build to match
- Color palettes = consistency

**Next:** Module 7 — Supabase (The Database!)
