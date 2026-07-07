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

**Concrete examples — before and after:**

```tsx
// ❌ BEFORE — boring, cramped, no style
export default function PetCard({ pet }) {
  return (
    <div style={{ border: '1px solid gray', padding: '5px' }}>
      <h3>{pet.name}</h3>
      <p>{pet.breed}</p>
      <button>View</button>
    </div>
  );
}

// ✅ AFTER — colorful, spacious, styled with Tailwind
export default function PetCard({ pet }) {
  return (
    <div className="border-2 border-blue-300 rounded-lg p-6 bg-blue-50 hover:shadow-lg transition">
      <h3 className="text-xl font-bold text-blue-900">{pet.name}</h3>
      <p className="text-sm text-slate-600 mt-2">{pet.breed}</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        View
      </button>
    </div>
  );
}
```

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

Pick one page from your pet tracker and redesign it. Here's the step-by-step:

### Step 1: Capture a "before" screenshot (5 min)
1. Run your app: `npm run dev`
2. Open `http://localhost:3000/pets` (or your pet list page)
3. Take a screenshot of how it looks RIGHT NOW (boring!)
4. Save it — you'll show this as your "before"

### Step 2: Pick a color palette (5 min)

**Option A:** Visit [Coolors.co](https://coolors.co/), click "Generate," and pick a palette you like.

**Option B:** Use AI. Ask Claude Code:
```
Suggest a fun color palette for a pet tracker (3-4 colors).
Include hex codes. Make it playful and kid-friendly.
```

Example palette:
- Primary: `#FF6B9D` (pink) → use for buttons, headings
- Accent: `#4ECDC4` (teal) → use for hover states
- Neutral: `#F7F7F7` (light gray) → use for backgrounds

### Step 3: Restyle one component (20 min)

Use **Cursor** with this prompt:

```
Redesign the PetCard component using Tailwind CSS:
- Use a blue/teal color scheme (bg-blue-50, text-blue-900, bg-blue-500 for buttons)
- Add spacing (p-6 for padding, mt-4 for gaps between elements)
- Make it look modern and clean
- Add hover effects (hover:shadow-lg, hover:bg-blue-600)
- Keep it simple and readable
- Use large font sizes (text-lg, text-xl for titles)
```

Review the diff:
- ✅ Does it use Tailwind classes? (`p-6`, `text-xl`, `bg-blue-500`, etc.)
- ✅ Does the color scheme feel consistent?
- ✅ Is there enough spacing (no cramped look)?
- ✅ Are buttons big and clickable?

### Step 4: Test accessibility (5 min)
1. Open your app in the browser
2. Check:
   - Can you read all text clearly? (contrast is good)
   - Are buttons big enough to click? (~44px tall)
   - Do hover states work? (buttons change color when you hover)

### Step 5: Take an "after" screenshot (5 min)
Same page, same view. Now compare!

### Step 6: Optional — style another page
- Repeat steps 3-5 for `/clients` or your invoices page
- Keep using the same colors (consistency!)

### Deliverable:
- Before screenshot (boring/plain)
- After screenshot (styled with Tailwind)
- 2-3 sentence explanation of what you changed
  - *Example:* "I added padding (p-6) for breathing room, used blue colors for hierarchy, and made buttons bigger with hover effects. The app looks modern now instead of plain."*

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
