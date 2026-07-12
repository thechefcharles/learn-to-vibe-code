# Module 2: Talking to AI Like a Pro 💬

**Stage:** Foundations · **Level:** Beginner · **Duration:** ~6 hours · **XP:** 600

**What you need:** Module 1 (you gotta know how AI thinks first)

> **Why this matters:** If Module 1 taught you *why* context matters, this module teaches you *how to give it*. The better you ask questions, the better answers you get. It's like the difference between asking a friend "make me something" vs. "make me a pizza with pepperoni and no olives" — be specific!

## What You'll Learn

By the end of this module, you'll be able to:

1. **Write** killer prompts that get you perfect code first time
2. **Break** big projects into small, doable steps
3. **Fix** your prompts when the AI doesn't get it right
4. **Show** the AI pictures instead of just typing

---

## Lesson 2.1 — Your Prompt Is Your Superpower 🦸 (~30 min)

In regular coding, you type exact commands. In AI coding, you *describe* what you want, and the AI writes the instructions. Your prompt is now your main tool.

Here's the truth: **vague prompt = vague code. Specific prompt = perfect code.**

Think of the AI like a brilliant new teammate who's never seen your project before. It knows how to code in general, but nothing about *your* app unless you tell it.

---

## Lesson 2.2 — The Five-Ingredient Secret Sauce (~60 min)

Every good prompt has these five things:

1. **Task** — What do you want? (Be super clear!)
   - "Write a function that…"
   - "Create a component that…"

2. **Context** — What's your setup?
   - "I'm using React + TypeScript"
   - "I have a Supabase database with a `users` table"

3. **Constraints** — What are the rules?
   - "Use only the standard library"
   - "Make it work on mobile"
   - "Handle when the data is empty"

4. **Examples** — Show, don't tell
   - If input is `[3, 1, 2]`, output should be `[1, 2, 3]`
   - If the user is not logged in, redirect to `/login`

5. **Output format** — How should I return it?
   - "Just the code, no explanation"
   - "Explain each line as you go"

**Weak prompt:** "Make a login form"
- Vague. The AI has to guess: What framework? What styles? What validation?

**Strong prompt:** "Create a login form component in React using TypeScript and Tailwind. It should have email and password fields. Validate that email looks like an email and password isn't empty. When clicked, call the `logIn` function from our API. If there's an error, show it under the button. Return only the component code."

See the difference? The strong prompt removes all the guessing.

---

**[SCREENSHOT PLACEHOLDER: Weak vs. Strong Prompt Outputs]**

**What this screenshot should show:**
- Left panel: Claude/ChatGPT with weak prompt "make a login form"
  - Shows the generated output (likely missing framework details, validation, styling)
- Right panel: Same tools with strong five-ingredient prompt specifying React, TypeScript, Tailwind, validation, error handling
  - Shows the generated output (correctly uses all specified tools and constraints)
- Side-by-side comparison makes the difference clear
- **Proves:** precision in your prompt = way better code ✨

---

## Lesson 2.3 — Break Big Stuff Into Small Pieces (~60 min)

Beginners ask AI to "build the whole app" in one prompt. Mistake! You get spaghetti code.

Instead, break it into small steps, do one at a time:

**"Build a To-Do app" becomes:**

1. Create a database table for to-dos (with id, text, done, created_at)
2. Make a component that shows all the to-dos
3. Make a form to add a new to-do
4. Connect the form to save to the database
5. Add a button to mark a to-do done
6. Add a button to delete a to-do

Do step 1, test it, move to step 2. Don't do all 6 at once!

**The habit:** Prompt → Test → Next. Never Prompt Once → Hope.

---

## Lesson 2.4 — Iterate and Fix Your Prompts (~60 min)

The first answer is usually *not* perfect. That's normal.

**The fix loop:**

1. Read the code critically. Does it do what you asked?
2. Spot the problem. Wrong tool? Ignored your constraint? Missed something?
3. Tell the AI *specifically* what to fix (not just "try again")
   - Bad: "That's wrong, fix it."
   - Good: "That uses the old Login Router, but I need the new App Router — rewrite it as a server component."
4. Repeat until it's good.

**Also:** If you've told the AI the same thing 3 times and it's still wrong, stop. The prompt is broken, not the AI. Go back to decomposition (break it into smaller pieces) instead of hammering the same prompt.

---

**[SCREENSHOT PLACEHOLDER: Refinement Loop Exchange]**

**What this screenshot should show:**
- Panel 1: Initial AI response (e.g., code using React Class Components when you want Hooks)
  - Shows a clear framework mismatch or missing constraint
- Panel 2: User's refinement prompt with specific feedback
  - Example: "I need functional components with Hooks, not class components. Rewrite using useState for the form state."
- Panel 3: AI's corrected response (now uses Hooks correctly)
- **Shows:** how specific feedback leads to immediate fixes
- **Demonstrates:** the iteration loop working in action 🔄

---

## Lesson 2.5 — Prompting in Your Tools (~30 min)

The technique is the same everywhere, but the scope changes:

**In Cursor (editor mode):** 
- Your prompt works on the file you have open
- The AI sees the code around your cursor
- Good for: small fixes, adding functions to existing files

**In Claude Code (terminal mode):**
- Your prompt describes the whole goal
- The AI plans changes across your entire project
- Good for: building whole features, refactoring

Same five ingredients, different scope.

---

## Lesson 2.6 — Show, Don't Tell (Pictures!) (~45 min)

Here's a hack: modern AI can *see*. You can show it pictures!

**What you can screenshot and show the AI:**

- A design mockup of a UI you want built ("build this exact design")
- A broken website screenshot ("why does this look wrong?")
- A drawing on a whiteboard of how data flows
- Another app's design ("copy this style")

**How to do it:**

- In **Claude Code:** paste an image with Ctrl+V (Mac)
- In **Cursor:** drag the image into the chat

**Why it's powerful:** The AI reads the visual structure, so it's faster and more accurate than describing everything in words.

---

**[SCREENSHOT PLACEHOLDER: Multimodal Prompt (Mockup → Generated UI)]**

**What this screenshot should show:**
- Left panel: A design mockup or wireframe pasted into Claude Code
  - Shows a simple UI layout (e.g., a dashboard card with header, sidebar, content)
  - Image is clearly visible in the chat
- Right panel (or below): The AI's generated React/UI code response
  - Generated code matches the layout, spacing, and hierarchy from the mockup
  - Prompt was simply: "Build this UI based on the mockup"
- **Shows:** how an image eliminates 100 lines of text description
- **Demonstrates:** pictures are faster and more accurate than words 📸

---

## Activity: The Prompt Gauntlet 🎮

Here are five bad prompts. For each one, I'll show you how to rewrite it strong, then you try on your own!

---

### WEAK PROMPT 1: "Make a chart"

**Rewritten (using five ingredients):**
```
Create a bar chart in React using the Recharts library. 
It shows monthly sales data (months on x-axis, USD revenue on y-axis). 
Use TypeScript and Tailwind CSS. 
Data prop accepts: [{month: "Jan", revenue: 15000}, {month: "Feb", revenue: 18000}].
If there's no data, show "No data yet."
Return only the component code.
```

**What got better?** Specified library (Recharts), data structure, styling (Tailwind), edge cases (empty state), exact output format. The AI knows exactly what to build.

---

### WEAK PROMPT 2: "Fix my code"

**Rewritten (using five ingredients):**
```
My React component fetches user data from a Supabase table called "users" on every render.
Stack: Next.js, TypeScript, React Hooks.
Bug: it should fetch ONCE on page load, not every render.
Fix it by adding useEffect with the correct dependency array.
Use async/await and handle errors with try/catch.
Return only the corrected component, no explanation.
```

**What got better?** Named the exact bug ("fetches every render"), gave context (Supabase, Next.js, Hooks), specified the fix (useEffect with deps), and set output format.

---

### WEAK PROMPT 3: "Add auth"

**Rewritten (using five ingredients):**
```
Build a Next.js + TypeScript app with login protection.
Create: 
1) A login page at /auth/login (email/password form)
2) A protected page at /dashboard (only logged-in users can see)
3) A middleware that redirects logged-out users to /auth/login
Use Supabase for auth (email/password).
Return the three files: middleware.ts, auth/login/page.tsx, dashboard/page.tsx.
```

**What got better?** Named the exact stack, broke "add auth" into 3 specific pieces, specified the library (Supabase), and listed exact files needed.

---

### WEAK PROMPT 4: "Build a dashboard"

**Rewritten (using five ingredients):**
```
Build a user dashboard in React (Next.js, TypeScript, Tailwind).
Show:
- A greeting card with the user's name (from Supabase)
- A stats card with total posts (count)
- A list of recent posts (title, date, preview)
Data from Supabase "posts" table: id, user_id, title, body, created_at.
While loading, show a loading spinner.
If no posts, show "No posts yet."
Return the component code with comments.
```

**What got better?** Named the stack, listed exact UI elements, specified the data source and schema, covered edge cases (empty, loading), and set output format.

---

### WEAK PROMPT 5: "Make it faster"

**Rewritten (using five ingredients):**
```
My Next.js page loads 1000 products from Supabase on every page load. It's slow.
I need:
1) Cache the data server-side for 1 hour (using Next.js revalidation)
2) Show a loading skeleton while fetching
3) Use React Suspense if applicable
Stack: Next.js App Router, TypeScript, React Server Components.
Current fetch: const { data } = await supabase.from('products').select('*')
Rewrite it with caching.
Return the updated code only.
```

**What got better?** Named the bottleneck (1000 rows fetched every time), constraints (1-hour cache), solution (revalidation + Suspense), and gave exact context (RSC, App Router).

---

### WEAK PROMPT 6: "My form looks bad"

**Rewritten (using pictures):**
```
Here's a screenshot of my login form [paste image]. 
The text is tiny, buttons are far apart, and the error message is invisible.
I need:
1) Make text bigger and easier to read
2) Move buttons closer together
3) Change error messages to red so they stand out
Use Tailwind CSS and shadcn/ui components.
Return the updated component code.
```

**What got better?** Instead of describing "looks bad," you showed the AI exactly what's wrong using a picture. The AI sees the real problem and fixes it, not a guess. This is 100x faster than trying to describe it in words!

---

## Activity Instructions 🎯

**For each of the five weak prompts above:**
1. Paste the weak prompt into Claude Code or ChatGPT
2. Run it and see what's missing or wrong
3. Paste the rewritten prompt
4. Run it and compare
5. Write one sentence: "What was better in the strong version?"

**Try on your own:** rewrite at least 3 of the 5 prompts in your own words using the five ingredients. The exact wording doesn't matter — just make sure all five ingredients are there!

---

## Knowledge Check (Mapped to Your Objectives)

**Objective 1 — Write killer prompts (Quiz Q2-k1, Q2-k2):**
- Q2-k1: "Which of these is NOT one of the five ingredients?" ✅ Tests the five-part model
- Q2-k2: "A strong prompt is better mainly because..." ✅ Tests why precision matters
- **Written check:** Take "Build a signup form" and rewrite it using all five ingredients for a React + TypeScript app.

**Objective 2 — Break things into small steps (Quiz Q2-k5):**
- Q2-k5: "Which order makes sense for building a blog?" ✅ Tests decomposition logic
- **Written check:** Break "build a blog with posts and comments" into 5-7 promptable steps. For each, what needs to exist first?

**Objective 3 — Iterate and refine (Quiz Q2-k3):**
- Q2-k3: "When AI output is wrong, you should..." ✅ Tests feedback strategy
- **Written check:** AI made code using old React patterns, but you need Hooks. Write the specific feedback prompt.

**Objective 4 — Prompt with pictures (Quiz Q2-k4):**
- Q2-k4: "When building a complex UI, which is fastest?" ✅ Tests multimodal knowledge
- **Written check:** When is showing a picture better than describing in words? Why?

**Scenario-based judgment checks (all objectives):**

For each, pick the best approach and explain why in one sentence:

- (a) Building a form UI — do you write a detailed text description, or paste a mockup? Why?
- (b) Complex feature — ask in one giant prompt, or break it into smaller ones? Why?
- (c) AI used an old library version — say "fix it," or write specific feedback? Why?
- (d) AI's code is close but has one small bug — re-ask the whole thing, or give targeted feedback? Why?

---

## Tools & Alternatives (This Module)

**This skill works everywhere.** Whether you use Cursor, Claude Code, ChatGPT, or another tool — the five ingredients, decomposition, and refinement loop are the same.

Some tools add nice extras (Cursor auto-includes file context, Claude Code reads your whole repo) that save you from typing context by hand. But the underlying skill? Always the same. That's why it transfers.

---

## Key Takeaways

- Your prompt is your primary tool. Better prompt = better code. 📝
- Use the five ingredients: task, context, constraints, examples, output format
- Break big goals into small, testable steps
- When something's wrong, give *specific* feedback, not "try again"
- The AI can see pictures — use it! 📸

**Next:** Module 3 — Planning Like a Pro (Think Before You Code!)
