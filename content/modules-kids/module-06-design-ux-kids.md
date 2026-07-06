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

## Lesson 6.2 — Tailwind CSS (Your Design Superpower) (~60 min)

Tailwind CSS is a CSS library that's already in your Next.js app. It's classes that control how things look:

```
className="text-xl font-bold text-blue-600"
```

Means: big text, bold, blue.

Instead of writing CSS, you add classes.

**Common classes:**

- `text-lg`, `text-xl`, `text-2xl` = font sizes
- `font-bold`, `font-semibold` = boldness
- `bg-blue-500`, `bg-red-600` = background colors
- `p-4`, `m-8` = padding & margins (spacing)
- `rounded-lg`, `rounded-full` = rounded corners

**The hack:** Ask Cursor or Claude Code: *"Make this button look better with Tailwind. Use blue colors, add padding, round the corners, and center the text."*

It applies Tailwind classes.

---

## Lesson 6.3 — Color Palette (~30 min)

Don't pick colors randomly. Pick 3-5 colors that work together:

**Option 1: Use a tool** (try Coolors.co or a color palette website)

**Option 2: Ask AI:** *"Suggest a color palette for a pet tracker app (warm, playful, kid-friendly). Give me hex codes."*

AI suggests something like:
- Primary: #FF6B9D (pink)
- Accent: #4ECDC4 (teal)
- Neutral: #F0F0F0 (light gray)

Then use them consistently:
- Buttons = primary color
- Hover states = accent color
- Backgrounds = neutral color

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

## Lesson 6.5 — Using AI to Design (~60 min)

Here's where it gets fun: show the AI a design you like, and it builds your UI to match.

1. Screenshot a design you like (from another app, website, etc.)
2. Paste it into Cursor
3. Prompt: *"Build a component that looks like this screenshot. Use Tailwind CSS and match the colors/layout/spacing as closely as you can."*

AI builds it. You test. You adjust:

*"Make the buttons bigger and the spacing tighter."*

AI adjusts.

**This is Objective 4 from Module 2:** multimodal prompting! Show, don't tell.

---

## Activity: Redesign Your App 🎨

Pick one page from your pet tracker and redesign it:
- Pick a color palette (Coolors.co or ask AI)
- Apply Tailwind classes to make it look modern
- Check accessibility (high contrast, readable fonts)
- Submit a before/after screenshot

---

## Knowledge Check (Quiz)

1. **List 3 design principles and give an example of each.**
2. **Why does contrast matter? What happens with low contrast?**
3. **Write a Tailwind class list to make a button: blue, bold, big padding, rounded.**

---

## Key Takeaways

- Good design follows rules (hierarchy, spacing, alignment, color) 🎨
- Tailwind CSS makes design easy (no writing CSS from scratch)
- Accessibility helps everyone
- Show the AI a screenshot and it can build to match
- Color palettes = consistency

**Next:** Module 7 — Supabase (The Database!)
