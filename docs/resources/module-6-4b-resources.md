# Module 6.4b Resources: Design Inspiration & UI Kits

Reference designs, inspiration sources, and UI kits for learning and building with competitor design patterns.

---

## Design Inspiration Websites

### Dribbble (Design Portfolio Community)
- **Website:** dribbble.com
- **Best for:** Browse real designs, see what's trending
- **Search:** Filter by category (UI/UX, Web Design, Mobile)
- **Free account:** View designs (no download)
- **Pro account:** Download design files, feedback
- **How to use:** Find a design you like → Screenshot → Analyze with four levers

### Behance (Adobe Portfolio Platform)
- **Website:** behance.net
- **Best for:** High-quality case studies, complete projects
- **Search:** Filter by industry, tool used
- **Free:** View all projects
- **How to use:** Read the project brief → Study the visuals → Learn the principles

### Product Hunt (New Products Daily)
- **Website:** producthunt.com
- **Best for:** See what's launching, read user feedback
- **Daily:** Featured products show latest design trends
- **Free:** View all products, read comments
- **How to use:** Click "Visit" on products → See live UI → Take screenshots

### Designer Hangout (Slack Community)
- **Website:** www.designerhangout.co
- **Cost:** Paid membership (~$99/year)
- **Best for:** Discuss design, get feedback, learn from experienced designers
- **How to use:** Share your analysis, get design critique

### Mobbin (Mobile UI Patterns)
- **Website:** mobbin.com
- **Best for:** Mobile app UI patterns, screenshots from real apps
- **Cost:** Free with limited views, Pro $9/month
- **How to use:** Search "invoicing" → See how different apps solve it → Screenshot and analyze

### Lapa.Ninja (Landing Page Inspiration)
- **Website:** lapa.ninja
- **Best for:** Landing page, form, and section design
- **Search:** Filter by industry, component type
- **Free:** View all
- **How to use:** Find similar landing page → Analyze layout, copy, CTA placement

### UI Movement (Daily Motion Design)
- **Website:** uimovement.com
- **Best for:** Motion and micro-interactions
- **Daily:** Featured interactions showcased
- **How to use:** See how animation enhances UX → Replicate in your design

---

## UI Component Libraries & Design Systems

### shadcn/ui (Free, Open Source, Highly Recommended)
- **Website:** ui.shadcn.com
- **Cost:** Free, open source
- **Components:** 40+ production-ready components
- **Framework:** React + Tailwind CSS
- **Best for:** Learning professional design, copying components
- **How to use:** Browse components → Copy code → Study the design choices
- **Example:** Look at the Button component → See all variants (primary, secondary, outline)

### Stripe Design System (Free to Browse)
- **Website:** stripe.com/design
- **Cost:** Free (reference only)
- **Best for:** Enterprise-grade design, premium aesthetic
- **Components:** Color palette, typography, spacing system
- **Learn:** Restraint, consistency, focus on clarity
- **How to use:** Study colors, spacing, typography → Apply principles to your project

### Linear Design System (Free to Browse)
- **Website:** linear.app or linear.design
- **Cost:** Free (reference only)
- **Best for:** Minimalist, high-performance design
- **Components:** Clean navigation, minimal UI, fast interactions
- **Learn:** Simplicity over decoration, responsive design
- **How to use:** Screenshot their dashboard → Analyze → Adapt

### Material Design (Google, Free)
- **Website:** material.io
- **Cost:** Free
- **Components:** 100+ components with guidelines
- **Best for:** Understanding design systems at scale
- **Learn:** Accessibility, responsive, consistent structure
- **How to use:** Component guidelines → Build similar components

### Ant Design (Alibaba, Free, Open Source)
- **Website:** ant.design
- **Cost:** Free, open source
- **Components:** 60+ components
- **Framework:** React (also Vue, Angular versions)
- **Best for:** Enterprise dashboards, data-heavy interfaces
- **How to use:** Explore components → Study data table, form patterns

### Tailwind UI (Paid, High Quality)
- **Website:** tailwindui.com
- **Cost:** $299 one-time license
- **Components:** 500+ components and templates
- **Best for:** Professional, production-ready designs
- **Why it costs:** Includes complete templates, themes, design files

### Chakra UI (Free, Open Source)
- **Website:** chakra-ui.com
- **Cost:** Free, open source
- **Components:** 40+ accessible components
- **Best for:** Accessible, keyboard-friendly designs
- **How to use:** Component stories → Copy → Adapt

---

## Design Analysis Resources

### Color Palette Tools

**Color Picker:**
- Chrome DevTools (right-click → Inspect → Color picker)
- www.htmlcolorcodes.com (identify hex colors)
- www.canva.com/colors/color-meanings (color psychology)

**Color Schemes:**
- www.coolors.co (generate palettes, explore trending)
- www.colorhexa.com (color info and combinations)
- www.paletton.com (create harmonious palettes)

**Contrast Checker:**
- www.webaim.org/contrast/checker (verify WCAG compliance)
- www.colourcontrast.cc (quick contrast check)

### Typography Analysis
- **Browser DevTools:** Right-click → Inspect → Find `<p>`, `<h1>`, etc. → See font-family, font-size
- **whatfontis.com:** Drag screenshot → Identify fonts
- **fontpair.co:** See matching font combinations

### Spacing & Layout
- **Browser DevTools:** Inspect element → See padding, margin in Computed styles
- **Figma:** Measure tool (if design file is shared)
- **Manual:** Estimate based on visual proportion

---

## Design System Documentation

### How to Read a Design System

1. **Colors:** Palette, usage rules, contrast
2. **Typography:** Font family, sizes, weights, line height
3. **Spacing:** Base unit (usually 8px or 4px), rules
4. **Components:** Button, input, card, modal, navigation, etc.
5. **Patterns:** Forms, tables, layouts, modals
6. **Accessibility:** WCAG compliance, keyboard nav, semantic HTML

### Examples to Study

- Stripe Design System: stripe.com/design (cards, payment forms)
- GitHub Primer: primer.style (clean, minimal)
- IBM Carbon: carbondesignsystem.com (enterprise, detailed)
- Microsoft Fluent: fluent2.microsoft.design (modern, accessible)

---

## Screenshot-to-Code Workflow

### Tools
- **Figma:** Import screenshot → Trace design
- **Locofy:** Screenshot → Auto-generate React code
- **Galileo AI:** Screenshot → Generate design + code (coming soon)

### Manual Workflow (Recommended)
1. Screenshot competitor UI
2. Analyze with four levers (hierarchy, spacing, typography, color)
3. Prompt Claude Code: "Build this design using [tech stack]"
4. Claude generates code
5. Compare and iterate

---

## Analyzing Competitor Features

### Questions to Ask

1. **Hierarchy:** What's the user supposed to do first? Where's the call-to-action?
2. **Spacing:** Is the design relaxed (premium) or tight (dense)?
3. **Typography:** How many font sizes? Bold/regular/light variations?
4. **Color:** One main color? Accent colors? Semantic colors (success/error)?
5. **Layout:** Fixed width? Full width? Responsive?
6. **Interaction:** Hover states? Loading states? Empty states?
7. **Accessibility:** Labels on inputs? Alt text on images? High contrast?

### Documentation Template

```markdown
# Design Analysis: [Competitor Name]

## Screenshot
[Paste screenshot]

## Hierarchy
[What's prominent? Primary action?]

## Spacing
[Gaps between elements: tight/normal/generous]

## Typography
[Font family, sizes, weights]

## Color Palette
[List colors with hex codes]

## Why It Works
[1–2 sentences on overall aesthetic]

## How I'll Adapt It
[What I'll keep, what I'll change for my product]
```

---

## Resources by Design Aspect

### Hierarchy Learning
- Nielsen Norman: "Visual Hierarchy" (article)
- Interaction Design Foundation: hierarchy course
- Study: Stripe, Linear, Apple

### Spacing Learning
- 8px grid system: Medium articles on designing with grids
- Material Design spacing guide: material.io/design/space
- Tailwind spacing scale: tailwindcss.com/docs/space

### Typography Learning
- Typography in Web Design: webdesign.tutsplus.com/articles/typography
- Font pairing: fontpair.co, typewolf.com
- Line height & readability: smashingmagazine.com articles

### Color Theory
- Color Psychology: 99designs.com/blog/tips/color-psychology
- Accessible Colors: webaim.org/articles/contrast/
- Stripe's color system: stripe.com/design/colors

---

## When to Copy vs. Adapt

### Copy (Verbatim) When:
- ❌ It's copyrighted design (don't)
- ✅ It's an established pattern (button style, form layout)
- ✅ It's an industry standard (invoice table format)

### Adapt When:
- ✅ You want similar *feel*, different context
- ✅ Different brand/colors but same layout
- ✅ Same principle, different technology

### Inspired by (Recommended)
- ✅ Study competitor
- ✅ Extract principles (spacing, hierarchy, color)
- ✅ Apply to your design with your brand
- ✅ Credit source in documentation

---

## Your Design Analysis Checklist

- [ ] Choose reference product
- [ ] Screenshot 3–4 key screens
- [ ] Analyze with four levers (hierarchy, spacing, typography, color)
- [ ] Write synthesis (why it works)
- [ ] Create design direction prompt
- [ ] Prompt Claude Code for implementation
- [ ] Compare your result to reference
- [ ] Iterate if needed
- [ ] Document your learning
- [ ] Commit to version control

---

## Next Steps

1. **This week:** Study 2 products you admire
2. **Pick one:** Screenshot and analyze with four levers
3. **Build:** Prompt Claude Code with design direction
4. **Compare:** Side-by-side screenshots (reference vs. yours)
5. **Reflect:** What principles did you learn? What will you use again?

---

## Resources Summary

| Resource | Type | Cost | Best For |
|----------|------|------|----------|
| Dribbble | Community | Free | Browse designs |
| Behance | Portfolio | Free | Study case studies |
| Product Hunt | Products | Free | See live UIs |
| shadcn/ui | Components | Free | Learn + copy |
| Stripe Design | System | Free | Enterprise style |
| Material Design | System | Free | Large systems |
| Figma | Design tool | Free/$ | Measure & trace |

---

**Questions?** See Module 6.4b lesson for deeper dive on design extraction and analysis.
