# Module 3: Prompt Engineering for Developers

**Stage:** Foundations · **Level:** Beginner · **Duration:** ~6 contact hours (0.6 CEU)

**Prerequisites:** Module 2 (learners must understand that models predict *likely* text and that context shapes output).

> Module 2 taught *why* context matters. This module teaches the skill of supplying it. Prompt engineering is the highest-leverage beginner skill in the course — prompt well and you get correct code on the first pass; prompt poorly and you fight the tool all day. Everything from Module 5 on assumes this.
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

Tie back to Module 2: because the model outputs the *most likely* completion given your prompt plus context, a vague prompt yields a vague, generic, often-wrong answer, while a precise prompt narrows the model toward exactly what you need. Prompting isn't "chatting" — it's specifying a task precisely enough that the *likely* answer is also the *correct* one.

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

---

**[SCREENSHOT PLACEHOLDER: Weak vs. Strong Prompt Outputs]**

**What this screenshot should show:**
- Left panel: Claude/ChatGPT with weak prompt "make a login form"
  - Shows the generated output (likely missing framework, validation, styling specifics)
- Right panel: Same tools with strong five-ingredient prompt specifying Next.js, TypeScript, Tailwind, Supabase, validation rules
  - Shows the generated output (correctly uses specified tools and includes all constraints)
- Side-by-side comparison makes the difference visceral
- Proves: precision in prompt structure directly improves code quality

---

---

## Lesson 2.3 — Decomposing a task into promptable steps (~60 min)

This delivers Objective 2. Beginners ask the AI to "build the whole app" in one prompt and get an unmaintainable, half-broken result. The fix is decomposition: break a big goal into small, ordered, individually-promptable steps.

**Why smaller is better:** each step is easier to specify, easier to verify (test before moving on), and easier to fix. It's the same skill as planning software (Module 4), applied at the prompt level.

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

---

**[SCREENSHOT PLACEHOLDER: Refinement Loop Exchange]**

**What this screenshot should show:**
- Panel 1: Initial AI response (e.g., a function using Pages Router when the app uses App Router)
  - Visible code mistake or framework mismatch
- Panel 2: User's refinement prompt (specific feedback naming the gap)
  - Example: "We're using Next.js App Router, not Pages Router. Rewrite this as a server component with data fetch outside the component."
- Panel 3: AI's corrected response (now uses correct framework and structure)
- Shows: how precise feedback leads to immediate, correct fixes
- Demonstrates: the iterative loop and when it converges vs. when to re-scope

---

---

## Lesson 2.5 — Prompting across the default stack (~30 min)

Connect prompting to the tools you'll use, concept-first:

- **In-editor (Cursor, Module 5):** prompts operate on open files; the tool pulls in surrounding code as context. You'll lean on this for focused, in-place changes.
- **Agentic (Claude Code, Module 6):** prompts describe a larger goal and the agent plans and edits across the whole repo. Higher-level, plan-style prompts.

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

**Why it's powerful:** the model reads visual structure directly, so it's far faster and more accurate than translating a design into text. Then iterate: "compare your result to the mockup and fix the differences." You'll use this hard in Module 7 (match a design) and Module 9 (debug from a screenshot).

> **Aside — voice / dictation:** you can also *speak* your prompts. Built-in dictation (macOS) or a tool like Whisper turns talk into text — handy for long, exploratory prompts where typing is the bottleneck. Same prompt-engineering rules apply; you're just inputting faster.
> 

---

**[SCREENSHOT PLACEHOLDER: Multimodal Prompt (Mockup → Generated UI)]**

**What this screenshot should show:**
- Left panel: A design mockup or wireframe pasted into Claude Code/Cursor
  - Shows a simple UI layout (e.g., a card-based dashboard with a header, sidebar, content area)
  - Image is clearly visible in the chat
- Right panel (or below): The AI's generated React/UI code response
  - Generated code reflects the layout structure, spacing, and hierarchy from the mockup
  - Prompt was simply: "Build this UI based on the mockup I just pasted"
- Shows: how an image eliminates 100 lines of text description
- Demonstrates: multimodal prompting is faster and more accurate than text-only

---

---

## Hands-on activity (~40 min, folded in)

**"Prompt rewrite gauntlet."** Learners rewrite five weak prompts using the five-ingredient anatomy, run both (weak and strong), and compare outputs. For each, they submit: rewritten prompt, before/after outputs, and one sentence on what improved. Rehearses Objectives 1 and 3.

### Five weak prompts to rewrite:

**WEAK PROMPT 1:** "make a chart"

**Rewrite with five ingredients:**
```
Create a bar chart component in React using the Recharts library. 
It should display monthly sales data (months on x-axis, revenue in USD on y-axis). 
Use TypeScript and style with Tailwind CSS. 
The data prop should accept: [{month: "Jan", revenue: 15000}, {month: "Feb", revenue: 18000}, ...]. 
Handle the case where data is empty (show a "No data" message). 
Return only the component with no explanations.
```

**What improved:** specifics on library (Recharts), data structure, styling, edge cases, and exact output format.

---

**WEAK PROMPT 2:** "fix my code"

**Rewrite with five ingredients:**
```
I have a React component that's supposed to fetch user data from a Supabase table called "users" and display it in a list. 
The code currently has a bug: it's fetching on every render instead of just once. 
Stack: Next.js App Router, TypeScript, React Hooks.
Fix the code by adding useEffect with the correct dependency array.
Context: we use async/await and handle errors with try/catch.
Return only the corrected component, no explanation.
```

**What improved:** named the exact bug ("fetching on every render"), gave context (Supabase, Next.js), specified the fix strategy (useEffect dependency), and set expectations for format.

---

**WEAK PROMPT 3:** "add auth"

**Rewrite with five ingredients:**
```
I'm building a Next.js + TypeScript app. 
I need a protected route that only logged-in users can access. 
Use Supabase for authentication (email/password). 
Create: 1) A middleware that checks if the user is authenticated, 2) A login page at /auth/login, 3) A protected page at /dashboard that redirects to /auth/login if not authenticated.
Use the Supabase client library.
Return the three files: middleware.ts, auth/login/page.tsx, dashboard/page.tsx.
```

**What improved:** named the exact stack, broke down what "add auth" means (3 specific pieces), specified the library, and listed exact files to create.

---

**WEAK PROMPT 4:** "build a dashboard"

**Rewrite with five ingredients:**
```
Build a user dashboard in React (Next.js App Router, TypeScript, Tailwind CSS).
It should display:
- A greeting card with the user's name (fetched from Supabase)
- A stats card showing total posts (count)
- A recent posts list (title, date, preview text)
Data comes from a Supabase table "posts" where each row has: id, user_id, title, body, created_at.
Show a loading state while fetching.
If the user has no posts, show "No posts yet."
Return only the component code with comments.
```

**What improved:** named stack, listed exact UI elements, specified data source and schema, covered edge cases (empty, loading), and set output expectations.

---

**WEAK PROMPT 5:** "make it faster"

**Rewrite with five ingredients:**
```
My Next.js page is slow. It fetches a list of 1000 products from Supabase on every page load.
I want to:
1) Cache the data server-side for 1 hour (using Next.js revalidation).
2) Show a loading skeleton while the data fetches.
3) Use React's Suspense boundary if applicable.
Stack: Next.js App Router, TypeScript, React Server Components.
The current data fetch is: const { data } = await supabase.from('products').select('*').
Rewrite it with caching and show the component using the cached data.
Return the updated code only.
```

**What improved:** identified the exact bottleneck (fetch on every load), named the constraints (1000 rows, 1-hour cache), specified the solution (Next.js revalidation + Suspense), and gave context (RSC, SSR patterns).

---

**WEAK PROMPT 6:** "fix my UI. It's weird."

**Rewrite with multimodal:**
```
Here's a screenshot of my form [paste image]. The labels are stacked on top of the inputs with no space, the button is tiny, and the error message color is hard to see. Make it clean: add space between label and input, make the button bigger, use a red error color for readability. Use shadcn/ui if you have it.
```

**What improved:** By pasting the screenshot, Claude can see the exact visual problem instead of guessing from vague text. The strong prompt names specific problems (stacked labels, tiny button, hard-to-see error color) that Claude now verifies directly in the image. This is 10x faster than a text-only description.

---

### Activity instructions for learners:

1. **For each of the six weak prompts above:**
   - Paste the weak prompt into Claude Code or ChatGPT
   - Run it and note what the output is missing or gets wrong
   - Now paste the rewritten prompt
   - Run it and compare
   - Write one sentence: "What was better in the strong version?"

2. **Submit:**
   - Your rewritten version of at least 4 of the 6 prompts (including Prompt 6, the multimodal one)
   - Side-by-side before/after outputs for at least one pair
   - For each rewrite, one sentence on the improvement
   - **Bonus:** For Prompt 6 (multimodal), actually capture a screenshot of a UI and rewrite it following the strong prompt format

---

## Lesson 2.5 — Multimodal input: Video transcripts as knowledge imports (~45 min)

So far, your prompts have used text and screenshots. But there's a third powerful input type: **transcribed knowledge from external video sources**. This lesson teaches you to take videos (YouTube tutorials, conference talks, your own screen recordings, demo videos from competitors), transcribe them with tools like Whisper or YouTube's captions, and feed that knowledge *directly into Claude* to accelerate learning or inform code design.

Why this matters: Watching a 20-minute video to learn one concept takes 20 minutes. Extracting the transcript takes 2 minutes. Copying key points into a Claude prompt takes 1 minute. You've learned 20x faster, and Claude now has the exact context it needs to write code that matches what you learned.

### 2.5.1 — Extracting transcripts from any video

Three methods, ordered by speed:

1. **YouTube auto-captions** (free, instant): Open any YouTube video → click "CC" button → click the three-dot menu on the player → select "Show transcript". Copy the full text (click "Show more" if needed). Paste directly into Claude.

2. **Whisper transcription** (free, local or cloud): Use OpenAI's Whisper model to transcribe any audio file or video. If using Claude Code, you can run:
   ```bash
   ! npx whisper-cli https://youtube-url-here
   ```
   Whisper outputs a `.txt` file with the full transcript.

3. **Browser captions + Claude**: Some videos (tutorials, podcasts) already have captions. Screenshot the caption section, or copy the text from the video player's transcript pane.

### 2.5.2 — Feeding transcripts into prompts (the five ingredients revisited)

Once you have a transcript, the prompt structure is the same as before, but richer:

```
I just watched a video on [topic], and here's the transcript (or key excerpt):

[paste transcript excerpt or full transcript]

Now I need to build [specific thing] in [tech stack].
Based on the video, I want to:
1) [specific requirement]
2) [specific requirement]

Here's what I don't understand from the video: [confusion].

Please write [code/explanation] that implements what the video showed, and clarify the confusing part.
Return [format].
```

**Example: Learning state management from a video tutorial:**

```
I watched "Redux for Beginners" and want to understand how to connect components to the store.

Key excerpt from the video:
"To connect a component, you use the connect() function from react-redux. Connect takes two arguments: mapStateToProps and mapDispatchToProps. mapStateToProps returns an object of props you want from the store..."

I'm building a React + Redux app (TypeScript) and I need to:
1) Create a counter component that reads the counter value from Redux store
2) Create an increment button that dispatches a SET_COUNTER action

The video showed a class component. I want a functional component using hooks instead.

Please write the store setup, the action, the reducer, and the component using useSelector and useDispatch.
Return only the code, with comments.
```

This prompt is *much* stronger because Claude now understands not just what you want, but what the conceptual model is (from the video). It can fill gaps (class → hooks) because it grasps the underlying pattern.

### 2.5.3 — Competitive learning: Extracting features from competitor videos

A powerful vibe-coding workflow: watch a competitor's product demo video, transcribe it, ask Claude to identify the features shown, and then build similar features yourself.

**Example workflow:**

1. Watch competitor's demo video (5–10 min)
2. Transcribe it (2 min)
3. Screenshot key UI moments (1 min each)
4. Prompt Claude:
   ```
   I watched a demo of [competitor product].
   
   Video transcript (key section):
   [paste relevant excerpt about the feature]
   
   I also captured these screenshots of the UI:
   [paste 2–3 screenshots]
   
   I want to build a similar feature in my Next.js + Supabase app.
   The feature should:
   1) [what the video showed you]
   2) [what the screenshot shows]
   
   Please design the data model, write the component, and explain the logic.
   ```

This combines three inputs (transcript, screenshots, your context) into a single powerful prompt. Claude can now infer not just what to build, but *why* it's valuable (context from the transcript) and *how it looks* (from the screenshots).

### 2.5.4 — Hands-on: Transcript → Code practice

Pick any tutorial video on a topic you're curious about (AI, design, database design, etc.):

1. Transcribe it (Whisper or YouTube captions) — 2 minutes
2. Identify 1–2 key concepts from the transcript
3. Write a prompt using the five ingredients + transcript excerpt
4. Ask Claude to explain the concept AND show an example in your tech stack (Next.js + TypeScript)
5. Build it

Document:
- The original video title and link
- The transcript excerpt you used
- The prompt you wrote
- The code Claude generated
- One sentence: "How did the transcript accelerate your learning vs. re-watching the video?"

---

## Knowledge check (mapped to objectives)

**Objective 1 — Write context-rich prompts (Quiz Q2-1, Q2-2):**
- Q2-1: "Which is NOT one of the five ingredients?" ✅ Tests knowledge of the five-ingredient model
- Q2-2: "A strong prompt is better mainly because..." ✅ Tests understanding of why precision matters
- *Written check:* Given "build a signup form," write a complete prompt using all five ingredients (task, context, constraints, examples, output format) for a Next.js + Supabase app.

**Objective 2 — Decompose tasks (Quiz Q2-5):**
- Q2-5: "Which is the correct order to build a blog?" ✅ Tests dependency ordering
- *Written check:* Break "build a simple blog with posts and comments" into an ordered list of 5–7 promptable steps. For each step, name its dependency (what must exist first).

**Objective 3 — Critique & refine (Quiz Q2-3):**
- Q2-3: "The right way to iterate when output is wrong..." ✅ Tests refinement strategy
- *Written check:* Given a flawed prompt output (e.g., wrong framework, missing constraint), write the specific feedback prompt that fixes it.

**Objective 4 — Prompt with images (Quiz Q2-4):**
- Q2-4: "When building a complex UI, which approach is fastest?" ✅ Tests knowledge of multimodal prompting
- *Written check:* Describe a scenario where an image/mockup is more efficient than a text description. Why?

---

**Scenario-based judgment checks (all objectives):**

For each scenario, decide which approach is best and explain why in one sentence:

- (a) You're building a form component. Do you: write a detailed text description of layout, or paste a mockup screenshot? Why?
- (b) You want the AI to write a complex feature. Do you: ask in one huge prompt, or break it into 5 smaller prompts? Why?
- (c) The AI's code uses an outdated library version. Do you: say "that's wrong, fix it" or write specific feedback naming the library and version? Why?
- (d) The AI's output is close but has one small bug. Do you: re-scope the whole task or give targeted feedback on the bug? Why?

*Pass mark: 80%. Gates progress to Module 4.*

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