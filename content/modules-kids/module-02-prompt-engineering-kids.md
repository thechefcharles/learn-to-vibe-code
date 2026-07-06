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

## Activity: The Prompt Gauntlet 🎮

You get five bad prompts:
1. "Make a chart"
2. "Fix my code"
3. "Add auth"
4. "Build a dashboard"
5. "Make it faster"

For each one, rewrite it using the five-ingredient recipe, run it against an AI, and compare. What got better? Submit your before/after prompts.

---

## Knowledge Check (Quiz)

1. **Take this weak prompt and rewrite it strong:** "Build a signup form." (Use all five ingredients!)
2. **Break this into promptable steps:** "Build a simple blog with posts and comments."
3. **Your prompt made code that uses the old framework, but you need the new one. Write the feedback prompt that fixes it specifically.**

---

## Key Takeaways

- Your prompt is your primary tool. Better prompt = better code. 📝
- Use the five ingredients: task, context, constraints, examples, output format
- Break big goals into small, testable steps
- When something's wrong, give *specific* feedback, not "try again"
- The AI can see pictures — use it! 📸

**Next:** Module 3 — Planning Like a Pro (Think Before You Code!)
