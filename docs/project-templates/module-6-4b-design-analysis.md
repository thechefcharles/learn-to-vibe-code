# Module 6.4b Project: Competitor Design Analysis & Adaptation

**Objective:** Study a competitor or reference product, analyze its design, and build something inspired by it.

**Time:** 45–60 minutes  
**Deliverable:** Screenshot comparison + design analysis + adapted code

---

## Step 1: Choose Your Reference (5 min)

Pick a product with great design that does something similar to what you want to build.

**By Category:**
- **Invoicing:** Stripe Invoicing, FreshBooks, Wave
- **Projects/Tasks:** Linear, Asana, Notion
- **Analytics:** Plausible, Mixpanel, Amplitude
- **E-commerce:** Shopify, Big Cartel, Squarespace
- **Payments:** Lemonsqueezy, Gumroad, Paddle
- **Social:** Twitter/X, Product Hunt, Discord
- **Your idea:** [anything with UX you admire]

**Your reference:** ___________________________________________________________

**URL/link:** ___________________________________________________________

---

## Step 2: Screenshot the Feature (5 min)

Visit the reference product and screenshot the specific feature/page you want to learn from.

**Examples:**
- Dashboard overview
- List view (table, grid, or feed)
- Form (signup, settings, checkout)
- Card component (invoice, project, user)
- Navigation/header
- Sidebar
- Modal or dialog

**Feature you're analyzing:** ___________________________________________________________

**Screenshot saved as:** ___________________________________________________________

---

## Step 3: Analyze the Design (15 min)

Use the **four levers** from Module 6 to analyze the reference design.

### Lever 1: Hierarchy
**What draws the eye first?**

Look at your screenshot. What's the biggest, most prominent element?
- Primary action (main button): ___________________________________________________________
- Page title/heading: ___________________________________________________________
- Secondary content: ___________________________________________________________

**Why is hierarchy important here?**
- [ ] Guides users to the most important action
- [ ] Shows what information is critical
- [ ] Reduces cognitive load

**Observations:**
___________________________________________________________

---

### Lever 2: Spacing
**How much breathing room?**

Measure visual gaps (rough estimate in pixels or relative sizes):
- Gap between header and main content: _____ (tight / normal / generous)
- Gap between sections: _____ (tight / normal / generous)
- Padding inside cards/containers: _____ (tight / normal / generous)

**Is spacing consistent?**
- [ ] All gaps are roughly equal
- [ ] Gaps vary intentionally (large for section breaks, small for related items)

**Observations:**
___________________________________________________________

---

### Lever 3: Typography
**How many font sizes?**

List the different text sizes you see:
- Page title (h1): _____ px / weight: bold / color: ___________
- Section header (h2): _____ px / weight: _____ / color: ___________
- Body text: _____ px / weight: regular / color: ___________
- Small text (labels, captions): _____ px / weight: _____ / color: ___________

**Font family used:** ___________________________________________________________

**Is there a clear hierarchy?** (e.g., Title is 2x body size)
- [ ] Yes, clear progression
- [ ] Sort of, some inconsistency
- [ ] No, too many different sizes

**Observations:**
___________________________________________________________

---

### Lever 4: Color Palette
**What colors are used?**

List the distinct colors (be specific):
- Neutral/background: ___________________________________________________________
- Primary/accent (CTA buttons): ___________________________________________________________
- Secondary: ___________________________________________________________
- Success/warning/error: ___________________________________________________________

**How restrained is the palette?**
- [ ] 2–3 colors (very restrained, premium feel)
- [ ] 4–5 colors (balanced)
- [ ] 6+ colors (colorful, can feel chaotic)

**Observations:**
___________________________________________________________

---

## Step 4: Synthesize Your Analysis (5 min)

**Why does this design work?** (Write 2–3 sentences)

Example: "The Stripe dashboard uses a clear hierarchy with the main graph at the top (draws attention), generous spacing around sections (feels premium), exactly 4 font sizes (easy to scan), and a minimal blue + gray palette (professional, not cluttered)."

**Your synthesis:**
___________________________________________________________

---

## Step 5: Create Your Design Direction Prompt (10 min)

Translate your analysis into a **design direction prompt** for Claude Code.

**Template:**

```
Here's a screenshot of [competitor name] [screenshot description].

Design analysis:
- **Hierarchy:** [what's prominent, why] The [primary element] is [large/bold/centered]. [Secondary elements] are [smaller/muted].
- **Spacing:** [gaps are tight/normal/generous]. [x]px between sections, [y]px padding in cards.
- **Typography:** [x] font sizes: [h1 description], [body description], [small text description]. Font is [family].
- **Color palette:** [Count] colors: [primary], [secondary], [accent]. Very [restrained/balanced/colorful].

I want to build [your feature] with a similar design approach. Apply this design language to my app's [page/component name].
Use shadcn/ui components. Make it responsive (mobile-first).

Return the component code with Tailwind classes.
```

**Your Prompt:**

---

## Step 6: Get Claude's Adaptation (5 min)

Paste your prompt into Claude Code or Cursor:

```bash
claude
[Paste your design direction prompt]
```

**Claude's response (component code):**
```
[Paste the code here]
```

---

## Step 7: Build & Compare (15 min)

1. **Integrate the code** into your project
2. **Screenshot your result** at the same view as the reference
3. **Compare side-by-side:**
   - [ ] Hierarchy similar? (primary action obvious)
   - [ ] Spacing similar? (breathing room matches)
   - [ ] Typography similar? (font sizes/weights match spirit)
   - [ ] Color palette similar? (same feeling, even if different colors)

---

## Step 8: Iterate (5–10 min)

**Does your version capture the reference's essence?**

- [ ] Yes, looks great!
- [ ] Close, but needs tweaks (go to Step 8a)
- [ ] No, very different (go to Step 8b)

### Step 8a: Fine-Tune (Minor Issues)
```
The [element] doesn't stand out enough. 
Make the [component] [larger/bolder/more colorful].
Also, [specific feedback about spacing/color/typography].
```

### Step 8b: Redesign (Major Rework)
```
This doesn't match the reference's feel.
The reference has [key characteristic]. 
I want to:
1) [Change spacing/color/hierarchy]
2) [Change something else]

Rebuild it with this approach.
```

**Your iteration prompt:**
___________________________________________________________

---

## Step 9: Finalize & Document (5 min)

Once you're happy with your design:

1. **Commit to git:**
   ```bash
   git add .
   git commit -m "feat: adapt [feature name] design from [competitor]"
   ```

2. **Document your learning:**

**What I learned from this reference:**
- Design principle 1: ___________________________________________________________
- Design principle 2: ___________________________________________________________

**How I adapted it to my product:**
___________________________________________________________

**What I'd change next time:**
___________________________________________________________

---

## Deliverable Checklist

- [ ] Reference product chosen
- [ ] Screenshot captured
- [ ] Four-lever analysis completed
- [ ] Design synthesis written (why it works)
- [ ] Design direction prompt created
- [ ] Claude Code generated component
- [ ] Component integrated into project
- [ ] Your version screenshots side-by-side with reference
- [ ] Hierarchy, spacing, typography, color checked
- [ ] Iterations completed (if needed)
- [ ] Committed to git
- [ ] Learning documented

---

## Example: Complete Workflow

### Reference: Stripe Invoicing Dashboard

**Screenshot:** [Stripe dashboard with list of invoices]

**Analysis:**
- **Hierarchy:** Page title "Invoices" is large at top. "Create Invoice" button is blue, prominent (draws attention). List of invoices below is secondary (smaller text, muted gray).
- **Spacing:** 32px gap between header and table, 16px padding in each row, 24px between sections.
- **Typography:** Title 28px bold, body 14px regular, labels 12px gray. 
- **Color:** Blue (#0066FF) for actions, gray (#6B7280) for secondary text, white background, light gray (#F3F4F6) for row backgrounds.

**Design Direction Prompt:**
```
Here's Stripe's invoice dashboard.

Design analysis:
- Hierarchy: Large "Invoices" title, prominent blue "Create" button, secondary list below.
- Spacing: 32px between sections, 16px inside rows, generous breathing room.
- Typography: Title 28px, body 14px, labels 12px gray.
- Color: Blue accent, gray secondary, white + light gray rows.

I want to build an invoice dashboard with similar design.
Use Next.js, TypeScript, Tailwind, and shadcn/ui.
Make it responsive and show loading/empty states.

Return only the component code.
```

**Claude's Response:**
```typescript
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus } from 'lucide-react';

export default function InvoicesDashboard() {
  // ... component code
}
```

**Your Result:**
- Looks similar to Stripe
- Users immediately see "Create Invoice" button
- Table is clean, readable, professional

**Committed:** ✅

---

## Advanced: Design System Extraction

**Challenge:** Analyze a design system (Stripe, Linear, Figma, Ant Design) and document its principles.

1. Visit the design system website
2. Note the colors, typography, spacing, component styles
3. Extract the "design language" (what makes it unique)
4. Adapt that language to your project

Example: "Linear's design uses a neutral gray palette with an electric blue accent, tight spacing (8px grid), and sans-serif typography. I'll apply the same principles to my app."

---

## Tips for Success

1. **Study products you actually like** — Taste comes from exposure
2. **Analyze, don't copy** — Learn principles, adapt to your context
3. **Compare at same zoom level** — Mobile vs. desktop or both
4. **Check multiple pages** — Is the design consistent?
5. **Note why it works** — "Premium because spacing is generous," not just "it looks good"
6. **Iterate** — First version rarely matches perfectly

---

## Common Issues

| Problem | Solution |
|---------|----------|
| "My design looks nothing like the reference" | Go back to Step 3: Did you analyze hierarchy/spacing/typography? |
| "Claude's code has different colors" | Adjust your prompt: "Use this exact color palette: [colors]" |
| "Spacing doesn't match" | Ask Claude: "Increase gap between sections to 32px. Use Tailwind spacing scale." |
| "Typography feels wrong" | Specify: "Title 28px bold, body 14px regular, labels 12px gray." |
| "On mobile it breaks" | Tell Claude: "Make it mobile-first: single column on mobile, full width on desktop." |

---

## Resources

- **Design Inspiration:**
  - Dribbble.com (browse real designs)
  - Behance.net (portfolios)
  - Product Hunt (new products, often well-designed)
  - Designer Hangout Slack community
  - Your favorite apps (study them!)

- **Design Systems (Free to Explore):**
  - stripe.com/design (Stripe's design system)
  - linear.app (Linear's clean design)
  - getfoundry.app (design system reference)
  - ui.shadcn.com (component library with great design)

- **Tools:**
  - Figma (design mockups before coding)
  - Claude Design (AI-powered prototyping)
  - Tailwind CSS (utility-first styling)

---

**Questions?** See Module 6.4b lesson for deeper dive into competitor analysis and design extraction.
