# Module 2: Prompt Engineering for Developers

**Stage:** Foundations · **Level:** Beginner · **Duration:** ~6 contact hours (0.6 CEU)

**Prerequisites:** Module 1 (learners must understand that models predict *likely* text and that context shapes output).

> Module 1 taught *why* context matters. This module teaches the skill of supplying it. Prompt engineering is the highest-leverage beginner skill in the course — prompt well and you get correct code on the first pass; prompt poorly and you fight the tool all day. Everything from Module 4 on assumes this.
> 

> **📸 Screenshots:** Items marked *[SCREENSHOT: …]* are placeholders — capture from a live AI session (manual).
> 

## Learning objectives

By the end of this module, the learner can:

1. **Write** clear, context-rich prompts that produce correct code on the first pass. *(Apply)*
2. **Decompose** a coding task into a sequence of promptable steps. *(Apply)*
3. **Critique and refine** a prompt iteratively based on the output it produces. *(Evaluate)*
4. **Prompt with images** — use screenshots and mockups as input to guide the AI. *(Apply)*

---

## Lesson 2.1 — Why the prompt is your primary tool (~30 min)

In traditional coding you type the exact instructions the computer follows. In AI-assisted coding you *describe* what you want and the model produces the instructions. The prompt is now your main tool, and its quality determines the quality of the code you get back.

Tie back to Module 1: because the model outputs the *most likely* completion given your prompt plus context, a vague prompt yields a vague, generic, often-wrong answer, while a precise prompt narrows the model toward exactly what you need. Prompting isn't "chatting" — it's specifying a task precisely enough that the *likely* answer is also the *correct* one.

**Beginner reframe:** treat the AI like a brilliant but literal new teammate who has never seen your project. It knows general programming, but nothing about *your* app, stack, or intent unless you tell it.

---

## Lesson 2.2 — The anatomy of a good prompt (~60 min)

Teach the five ingredients of a strong coding prompt:

1. **Task** — what you want, as a clear instruction. ("Write a function that…")
2. **Context** — language, framework, versions, relevant existing code. ("In a Next.js + TypeScript app using Supabase…")
3. **Constraints** — rules the solution must follow. ("Use async/await, no external libraries, handle empty input.")
4. **Examples** — a sample input and expected output when behavior is specific. ("For [3,1,2] return [1,2,3].")
5. **Output format** — how you want the answer. ("Return only the function, with brief comments.")

Contrast weak vs. strong so the difference is visceral:

- **Weak:** "make a login form" → the model guesses stack, styling, validation, and is probably wrong on all three.
- **Strong:** "Create a login form component in Next.js (App Router) + TypeScript using Tailwind. Fields: email, password. Validate email format and require a non-empty password. On submit, call `signInWithPassword` from our Supabase client. Show inline errors. Return only the component."

The strong prompt isn't longer for its own sake — every clause removes a wrong guess.

> **Instructor demo:** Run the weak and strong prompts live, side by side. The output gap sells the lesson in two minutes.
> 

*[SCREENSHOT: side-by-side outputs from the weak "make a login form" prompt vs. the strong five-ingredient prompt.]*

---

## Lesson 2.3 — Decomposing a task into promptable steps (~60 min)

This delivers Objective 2. Beginners ask the AI to "build the whole app" in one prompt and get an unmaintainable, half-broken result. The fix is decomposition: break a big goal into small, ordered, individually-promptable steps.

**Why smaller is better:** each step is easier to specify, easier to verify (test before moving on), and easier to fix. It's the same skill as planning software (Module 3), applied at the prompt level.

**Worked example — "build a to-do app" becomes:**

1. Set up the data model (a `todos` table: id, text, done, created_at).
2. A component that displays a list of to-dos.
3. A form to create a new to-do.
4. Wire the form to save to the database.
5. Mark a to-do done.
6. Delete.

Each line is a focused prompt you complete and confirm before the next. Teach the habit: **prompt → verify → next**, never **prompt once → hope**.

---

## Lesson 2.4 — Iterating: critique and refine (~60 min)

This delivers Objective 3. The first response is rarely perfect — that's normal. Skilled prompting is a loop:

1. Read the output critically (don't just paste it in). Does it do what you asked? Match your context and constraints?
2. Identify the specific gap. Wrong library? Missed edge case? Ignored your framework?
3. Refine the prompt — add the missing context or constraint rather than "that's wrong, try again." Precise feedback gets precise fixes.
4. Repeat until it meets the bar.

**Effective vs. ineffective feedback:** ineffective — "that didn't work, fix it." Effective — "That uses the Pages Router, but we're on the App Router — rewrite it as a server component and move the data fetch out of the client."

Also teach *when to stop and re-scope*: if three rounds haven't converged, the prompt was under-specified or the task too big — go back to decomposition (Lesson 2.3) instead of piling on patches.

*[SCREENSHOT: a refinement exchange — the flawed first output, a specific feedback prompt, and the corrected result.]*

---

## Lesson 2.5 — Prompting across the default stack (~30 min)

Connect prompting to the tools you'll use, concept-first:

- **In-editor (Cursor, Module 4):** prompts operate on open files; the tool pulls in surrounding code as context. You'll lean on this for focused, in-place changes.
- **Agentic (Claude Code, Module 5):** prompts describe a larger goal and the agent plans and edits across the whole repo. Higher-level, plan-style prompts.

Same five ingredients for both — the difference is scope, not technique.

---

## Lesson 2.6 — Prompting with images (multimodal) (~45 min)

This delivers Objective 4 and unlocks a faster path than describing everything in words. Modern AI coding tools are **multimodal** — they can read images — so a picture often beats a paragraph.

**What you can hand the AI:**

- A **design mockup or screenshot** of a UI you want built ("build this") — it infers layout, spacing, hierarchy.
- A **screenshot of a broken screen** or an error ("why does this look wrong / fix it").
- A **diagram or whiteboard photo** of a data model or flow.
- A **competitor/app screenshot** as a style reference ("match this look").

**How (as of 2026 — check current docs):** in **Claude Code**, paste a screenshot with Ctrl+V (Mac), drag-and-drop in the desktop app, or give a file path; in **Cursor**, drag the image into the agent/chat.

**Why it's powerful:** the model reads visual structure directly, so it's far faster and more accurate than translating a design into text. Then iterate: "compare your result to the mockup and fix the differences." You'll use this hard in Module 6 (match a design) and Module 8 (debug from a screenshot).

> **Aside — voice / dictation:** you can also *speak* your prompts. Built-in dictation (macOS) or a tool like Whisper turns talk into text — handy for long, exploratory prompts where typing is the bottleneck. Same prompt-engineering rules apply; you're just inputting faster.
> 

*[SCREENSHOT: a mockup pasted into Claude Code/Cursor next to the generated UI.]*

---

## Hands-on activity (~40 min, folded in)

**"Prompt rewrite gauntlet."** Learners get five weak prompts ("make a chart," "fix my code," "add auth," "build a dashboard," "make it faster"). For each, they rewrite it with the five-ingredient anatomy, run it, and compare against the original. Submit before/after prompts plus a one-line note on what improved. Rehearses Objectives 1 and 3.

---

## Knowledge check (mapped to objectives)

**Objective 1 — Context-rich prompts:** given "build a signup form," write a complete prompt using all five ingredients for a Next.js + Supabase app.

**Objective 2 — Decompose:** break "build a simple blog with posts and comments" into an ordered list of promptable steps.

**Objective 3 — Critique & refine:** given a prompt and the flawed code it produced (nonexistent function, wrong framework), write the refinement prompt that fixes it, with specific feedback.

*Pass mark: 80%. Gates progress to Module 3.*

---

## Tools & alternatives (this module)

Tool-agnostic — the five ingredients, decomposition, and the refine loop work in **any** assistant (Cursor, Claude Code, Copilot, ChatGPT). Some tools add conveniences (Cursor's automatic file context, Claude Code's repo-wide awareness) that reduce how much context you type by hand — they don't change the underlying skill.

---

## Key takeaways

- The prompt is your primary tool; precision in equals quality out.
- A strong prompt has five parts: task, context, constraints, examples, output format.
- Decompose big goals into small, ordered, verifiable steps: prompt → verify → next.
- Refine with specific feedback, not "try again"; re-scope if it won't converge.
- The skill transfers across every AI tool — scope changes, technique doesn't.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)