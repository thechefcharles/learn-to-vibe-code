import type { Version } from "@/lib/VersionContext";

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // 0-3 index
  explanation?: string;
}

export interface ModuleQuiz {
  moduleId: number;
  questions: QuizQuestion[];
}

// Quiz data for all 16 modules (multiple choice questions only)
// NOTE: Module 0 is checklist-only (no quiz) — gate is completion verification, not quiz score
export const quizzes: Record<number, ModuleQuiz> = {
  2: {
    moduleId: 2,
    questions: [
      {
        id: "1-1",
        text: "Fundamentally, an LLM generates code by:",
        options: [
          "looking it up in a database",
          "predicting the most likely next tokens",
          "reasoning like a human",
          "copying your files",
        ],
        correctAnswer: 1,
        explanation:
          "LLMs work by statistical prediction of the next most probable token.",
      },
      {
        id: "1-2",
        text: '"Hallucination" means:',
        options: [
          "it runs slowly",
          "it invents things that look right but aren't, confidently",
          "it refuses to answer",
          "it forgets your prompt",
        ],
        correctAnswer: 1,
        explanation:
          "Hallucination is when an AI confidently generates plausible-sounding but false information.",
      },
      {
        id: "1-3",
        text: '"Vibe coding done well" means:',
        options: [
          "never read the code",
          "move fast with AI while staying in control and understanding what you ship",
          "only use one tool",
          "skip testing",
        ],
        correctAnswer: 1,
        explanation:
          "Vibe coding is about using AI as a tool while maintaining understanding and control.",
      },
      {
        id: "1-4",
        text: "Which task requires the most careful verification of AI output?",
        options: [
          "drafting a project spec",
          "writing authentication logic for production",
          "explaining an unfamiliar code concept",
          "generating boilerplate for a form",
        ],
        correctAnswer: 1,
        explanation:
          "Security and production code have the highest stakes — always verify thoroughly. Specs and boilerplate are lower-risk and can be reviewed more lightly.",
      },
      {
        id: "2-e1",
        text: "You ask a raw LLM (no tools connected) to use a library feature that shipped last month. It confidently gives you an older, outdated API. Why?",
        options: [
          "The library doesn't actually exist",
          "The base model's training has a cutoff date, so on its own it doesn't know changes made after that",
          "The model is broken and needs reinstalling",
          "Your prompt was too short to trigger the new version",
        ],
        correctAnswer: 1,
        explanation: "This is the outdated-knowledge failure mode: a base model's knowledge is frozen at its training cutoff, which is why agentic tools offset it by retrieving current docs — and why you still verify.",
      },
    ],
  },
  3: {
    moduleId: 3,
    questions: [
      {
        id: "2-1",
        text: "Which is NOT one of the five ingredients of a strong prompt?",
        options: ["task", "context", "the model's temperature", "constraints"],
        correctAnswer: 2,
        explanation:
          "The five ingredients are: task, context, constraints, tone, and examples. Temperature is a model parameter, not a prompt ingredient.",
      },
      {
        id: "2-2",
        text: "A strong prompt is better mainly because:",
        options: [
          "it's longer",
          "each clause removes a wrong guess",
          "it uses fancy words",
          "it repeats the request",
        ],
        correctAnswer: 1,
        explanation:
          "Each constraint and example in the prompt narrows the solution space, reducing mistakes.",
      },
      {
        id: "2-3",
        text: "The right way to iterate when output is wrong:",
        options: [
          "say 'try again'",
          "give specific feedback naming the exact gap",
          "start a new chat every time",
          "accept it anyway",
        ],
        correctAnswer: 1,
        explanation:
          "Specific feedback (what was wrong, what you expected) leads to better outputs than vague retries.",
      },
      {
        id: "2-4",
        text: "When building a complex UI, which approach is fastest?",
        options: [
          "write a 500-word description of the layout",
          "paste a mockup image and ask the AI to build it",
          "tell the AI 'make it look professional'",
          "describe colors and fonts in detail",
        ],
        correctAnswer: 1,
        explanation:
          "Multimodal prompting (image input) is faster and more accurate than text descriptions. The AI reads visual structure directly.",
      },
      {
        id: "2-5",
        text: "Which is the correct order to build a blog (post data model → users → posts)?",
        options: [
          "1) Allow users to create posts, 2) Build a post table, 3) Build user auth",
          "1) Build user auth, 2) Build a post table, 3) Allow users to create posts",
          "1) Allow users to create posts, 2) Build user auth, 3) Build a post table",
          "All orders work equally well",
        ],
        correctAnswer: 1,
        explanation:
          "Decompose by dependencies: auth must exist before posts (users login first), posts table must exist before the form to create them. Dependencies define the sequence.",
      },
      {
        id: "2-6",
        text: "When importing knowledge from a video transcript into a Claude prompt, what is the primary benefit?",
        options: [
          "it makes the prompt longer and more impressive",
          "Claude can understand the conceptual model from the video, filling gaps and matching patterns better",
          "you don't need to understand the video content yourself",
          "it guarantees the output will be correct",
        ],
        correctAnswer: 1,
        explanation:
          "Video transcripts give Claude context about not just what to build, but the underlying conceptual model and intent—enabling better code generation and pattern matching.",
      },
      {
        id: "2-7",
        text: "Which workflow best combines competitor learning with your own development?",
        options: [
          "watch competitor demo → try to remember it → build from memory",
          "watch demo → transcribe → screenshot UI → analyze design → prompt Claude → build similar feature",
          "copy competitor code directly",
          "ignore competitors and design everything from scratch",
        ],
        correctAnswer: 1,
        explanation:
          "Systematic competitor analysis (watch → transcribe → screenshot → analyze → build) accelerates learning and produces better features than guessing or direct copying.",
      },
    ],
  },
  4: {
    moduleId: 4,
    questions: [
      {
        id: "3-1",
        text: "Why plan when AI writes code fast?",
        options: [
          "it's legally required",
          "the faster the tool, the more a bad plan costs",
          "it slows you down on purpose",
          "AI can't code without a plan",
        ],
        correctAnswer: 1,
        explanation:
          "Fast tools amplify bad planning—a 30-min mistaken direction coded in minutes is costly.",
      },
      {
        id: "3-2",
        text: "A lightweight spec should include all EXCEPT:",
        options: [
          "problem and users",
          "core features",
          "exact final pixel colors",
          "what's out of scope",
        ],
        correctAnswer: 2,
        explanation:
          "A spec guides direction, not pixel-perfect design details. Design comes after the spec.",
      },
      {
        id: "3-3",
        text: "A 'dependency' in sequencing means:",
        options: [
          "an npm package",
          "something that must exist before another task works",
          "a bug",
          "a teammate",
        ],
        correctAnswer: 1,
        explanation:
          "Dependencies define the order of tasks: you can't build 'show bookings' before 'save bookings' exists.",
      },
      {
        id: "3-4",
        text: "For a note-taking app (users create notes), what should you plan first?",
        options: [
          "the 'edit note' screen — users want to change notes",
          "the data model (users, notes) — everything else depends on it",
          "the dashboard view — that's what users see first",
          "authentication UI — it's the first screen",
        ],
        correctAnswer: 1,
        explanation:
          "Translate spec to technical plan by starting with the data model — it's the foundation. Screens and features all depend on knowing what data exists.",
      },
      {
        id: "4-e1",
        text: "Using the repo-vs-Notion split, which item belongs in your Git repo rather than in Notion?",
        options: [
          "A design-research note: \"users want an offline-first app\"",
          "The product roadmap of phases and priorities",
          "decisions.md logging \"chose Supabase for its RLS\"",
          "An architecture diagram sketching how the services connect",
        ],
        correctAnswer: 2,
        explanation: "Versioned config that lives with the code — like decisions.md — goes in the repo; architectural thinking, research, and the roadmap span all phases and live in Notion.",
      },
    ],
  },
  5: {
    moduleId: 5,
    questions: [
      {
        id: "4-1",
        text: "Which Cursor mode is best for a change spanning multiple files?",
        options: ["Tab", "Cmd+K inline edit", "Composer/Agent", "find-and-replace"],
        correctAnswer: 2,
        explanation:
          "Composer/Agent mode handles multi-file changes and cross-file context.",
      },
      {
        id: "4-2",
        text: "What does a project rules file (e.g. `AGENTS.md`) do?",
        options: [
          "formats code",
          "injects persistent project context into every AI interaction",
          "deploys the app",
          "runs tests",
        ],
        correctAnswer: 1,
        explanation:
          "Rules files become system prompts for the AI, setting project norms and conventions.",
      },
      {
        id: "4-3",
        text: "`@`-mentions are used to:",
        options: [
          "tag teammates",
          "pin specific context (files/docs/web) into the model's window",
          "comment code",
          "undo changes",
        ],
        correctAnswer: 1,
        explanation:
          "@-mentions let you include specific files or web pages as context for the AI.",
      },
      {
        id: "4-4",
        text: "You're building a React list component that fetches data from an API. Which Cursor mode is best?",
        options: [
          "Tab autocomplete (just keep typing)",
          "Cmd+K inline edit (describe changes to a block)",
          "Cmd+L chat (ask questions about the code)",
          "Cmd+I Composer (build the whole component)",
        ],
        correctAnswer: 3,
        explanation:
          "Composer (Cmd+I) is best for building a complete feature—it orchestrates the component, imports, and wiring together.",
      },
      {
        id: "5-e1",
        text: "In Cursor, what distinguishes Agent from Composer?",
        options: [
          "Agent only autocompletes single lines; Composer writes whole files",
          "Agent runs commands, reads the output, and fixes errors until the task works; Composer applies a change you've specified in one pass",
          "Agent formats your code while Composer deploys it to production",
          "They are two names for the exact same feature",
        ],
        correctAnswer: 1,
        explanation: "Composer applies a specified change in a single pass; Agent adds autonomy — it runs terminal commands, reacts to errors, and iterates until the task actually works.",
      },
    ],
  },
  6: {
    moduleId: 6,
    questions: [
      {
        id: "5-1",
        text: "The key mindset shift from Cursor to Claude Code is thinking in:",
        options: ["edits → goals", "goals → edits", "files → folders", "tests → bugs"],
        correctAnswer: 0,
        explanation:
          "Cursor is edit-focused; Claude Code is goal-focused—you describe the outcome, the agent plans.",
      },
      {
        id: "5-2",
        text: "`CLAUDE.md` is the agentic equivalent of:",
        options: ["package.json", "a Cursor rules file", ".gitignore", "README"],
        correctAnswer: 1,
        explanation:
          "CLAUDE.md serves the same role as Cursor's AGENTS.md—persistent project context.",
      },
      {
        id: "5-3",
        text: "Why use plan mode before a big change?",
        options: [
          "it's faster",
          "so the agent proposes an approach you can review before it edits anything",
          "it saves tokens",
          "it's required",
        ],
        correctAnswer: 1,
        explanation:
          "Plan mode lets you review the approach and approve before the agent modifies files.",
      },
      {
        id: "5-4",
        text: "Voice-driven development (e.g., SuperWhisper) is fastest when:",
        options: [
          "typing is just as fast for everyone",
          "iterating rapidly with clear intent (150 WPM speaking vs. 60 WPM typing)",
          "describing exact error messages or code patterns",
          "working in open offices with others around",
        ],
        correctAnswer: 1,
        explanation:
          "Voice input is fastest for high-level prompting and rapid iteration. Use typing for precise details (errors, code patterns) and team collaboration.",
      },
      {
        id: "5-5",
        text: "When combining voice prompts with screenshots in Claude Code, what's the main benefit?",
        options: [
          "screenshots replace the need for voice",
          "visual context + spoken goal = faster, unambiguous feedback without typing",
          "you must use screenshots if you use voice",
          "neither screenshots nor voice make a difference",
        ],
        correctAnswer: 1,
        explanation:
          "Screenshots show the current state; voice describes the goal. Together they eliminate ambiguity and reduce typing burden.",
      },
    ],
  },
  7: {
    moduleId: 7,
    questions: [
      {
        id: "6-1",
        text: "Why do AI-generated UIs look generic?",
        options: [
          "the model outputs the most common markup",
          "AI dislikes design",
          "Tailwind is ugly",
          "they're always broken",
        ],
        correctAnswer: 0,
        explanation:
          "AI models trained on web data default to common patterns. Specific design direction is needed.",
      },
      {
        id: "6-2",
        text: "Which is NOT one of the four design levers?",
        options: ["hierarchy", "spacing", "database indexing", "typography"],
        correctAnswer: 2,
        explanation:
          "The four design levers are hierarchy, spacing, typography, and color.",
      },
      {
        id: "6-3",
        text: "shadcn/ui is notable because:",
        options: [
          "it's a paid black box",
          "it installs component code into your own repo that you own",
          "it replaces Next.js",
          "it's backend-only",
        ],
        correctAnswer: 1,
        explanation:
          "shadcn/ui copies component code into your repo, giving you full ownership and control.",
      },
      {
        id: "6-4",
        text: "What's the benefit of design-first prototyping (e.g. Claude Design) before coding?",
        options: [
          "it's faster than coding",
          "the AI can't make mistakes in design",
          "you see the visual intent *before* writing code, avoiding re-layout later",
          "it replaces the need for CSS",
        ],
        correctAnswer: 2,
        explanation:
          "Design-first prototyping locks down layout and visual hierarchy before code, saving rework when you build.",
      },
      {
        id: "6-5",
        text: "When extracting design patterns from a competitor, which analysis comes first?",
        options: [
          "immediately start coding the feature",
          "hierarchy, spacing, typography, color (using the four levers)",
          "ask the competitor how they built it",
          "change colors randomly",
        ],
        correctAnswer: 1,
        explanation:
          "Systematically analyze hierarchy, spacing, typography, and color from the reference. This analysis guides your Claude Code prompt.",
      },
      {
        id: "6-6",
        text: "Why is screenshot + design analysis better than prose description?",
        options: [
          "prose is always wrong",
          "screenshots show exact visual intent; analysis explains the principles; Claude Code can match both",
          "screenshots don't need analysis",
          "prose and screenshots are the same",
        ],
        correctAnswer: 1,
        explanation:
          "Visual reference + principle analysis gives Claude Code the intent (why) and the target (what it should look like), enabling faster, higher-fidelity adaptation.",
      },
    ],
  },
  8: {
    moduleId: 8,
    questions: [
      {
        id: "7-1",
        text: "A backend provides all EXCEPT:",
        options: ["persistence", "accounts", "authorization", "faster typing"],
        correctAnswer: 3,
        explanation:
          "Backends provide data storage, authentication, and access control, not faster coding.",
      },
      {
        id: "7-2",
        text: "With RLS enabled and no policy, how many rows are returned?",
        options: ["all", "zero — it's default-deny", "only the newest", "an error"],
        correctAnswer: 1,
        explanation:
          "RLS is default-deny: without explicit allow policies, users see zero rows.",
      },
      {
        id: "7-3",
        text: "In a policy, `auth.uid()` gives you:",
        options: [
          "a random id",
          "the logged-in user's id from their session",
          "the table name",
          "the API key",
        ],
        correctAnswer: 1,
        explanation:
          "`auth.uid()` returns the ID of the currently authenticated user.",
      },
      {
        id: "8-e1",
        text: "In server code, why check the user with supabase.auth.getUser() instead of getSession()?",
        options: [
          "getUser() is faster because it never touches the network",
          "getUser() revalidates the token with the Supabase Auth server, so a tampered or stale cookie can't be trusted",
          "getSession() only works inside client components",
          "They are aliases — there is no difference",
        ],
        correctAnswer: 1,
        explanation: "On the server, getUser() sends the token to the Auth server to verify it; getSession() only reads the cookie without checking it, so a forged cookie would pass.",
      },
      {
        id: "8-e2",
        text: "You wrote SELECT and INSERT policies for a table but forgot the `alter table ... enable row level security` line. What's the result?",
        options: [
          "The policies still protect the table",
          "The table stays wide open — policies are inert until RLS is enabled",
          "The table returns zero rows to everyone",
          "Supabase throws an error the first time you query it",
        ],
        correctAnswer: 1,
        explanation: "Enabling RLS is the switch; policies are the rules. Until you enable RLS the policies do nothing and the table has no protection.",
      },
    ],
  },
  9: {
    moduleId: 9,
    questions: [
      {
        id: "8-1",
        text: "The best first move when something breaks:",
        options: [
          "paste code at the AI and say 'fix it'",
          "read the actual error message",
          "rewrite everything",
          "restart the computer",
        ],
        correctAnswer: 1,
        explanation:
          "Error messages tell you exactly what failed. Read them first, always.",
      },
      {
        id: "8-2",
        text: "If you can't explain a block of AI-generated code after reading it, you should:",
        options: [
          "ship it anyway",
          "not ship it — simplify or get a version you understand",
          "delete the whole file",
          "hide it",
        ],
        correctAnswer: 1,
        explanation:
          "You own and maintain the code. Never ship what you don't understand.",
      },
      {
        id: "8-3",
        text: "An AI 'fix' that disables RLS to solve an empty list is:",
        options: [
          "a good fix",
          "a dangerous fix that removes security (symptom, not root cause)",
          "the only option",
          "fine",
        ],
        correctAnswer: 1,
        explanation:
          "Disabling RLS treats the symptom (empty rows) but removes security. Find the real cause.",
      },
      {
        id: "8-4",
        text: "Before applying an AI-proposed fix, you should:",
        options: [
          "just apply it — the AI knows what it's doing",
          "read the code, understand what it changes, ask the AI to explain any unclear lines, confirm against the bug",
          "skip it if it's too long to read",
          "apply it to production first to test",
        ],
        correctAnswer: 1,
        explanation:
          "Always review: read → understand → verify against the actual bug → then apply. You own what ships (Module 1).",
      },
      {
        id: "9-e1",
        text: "Reading a stack trace top-down, which frame tells you where to start fixing?",
        options: [
          "The deepest frame, inside node_modules/react-dom internals",
          "The first frame that lands in your own files",
          "The very last line, regardless of which file it names",
          "It doesn't matter — any frame works",
        ],
        correctAnswer: 1,
        explanation: "The top line says what failed; the first frame pointing into your own code says where to fix it. Deeper framework frames are usually noise.",
      },
    ],
  },
  10: {
    moduleId: 10,
    questions: [
      {
        id: "9-1",
        text: "A commit is best described as:",
        options: [
          "a deployed app",
          "a saved snapshot of changes with a message",
          "a branch",
          "a backup server",
        ],
        correctAnswer: 1,
        explanation:
          "A commit is a saved snapshot: a group of changes with a message explaining why.",
      },
      {
        id: "9-2",
        text: "Why work on branches + pull requests even solo?",
        options: [
          "required",
          "`main` stays working and each change is isolated and reviewable",
          "faster typing",
          "it deletes old code",
        ],
        correctAnswer: 1,
        explanation:
          "Branches isolate work; PRs let you review before merging. `main` stays stable.",
      },
      {
        id: "9-3",
        text: "A merge conflict is:",
        options: [
          "an unfixable error",
          "Git asking you to choose between two changes to the same lines",
          "a deploy failure",
          "a virus",
        ],
        correctAnswer: 1,
        explanation:
          "A merge conflict is Git asking for your decision when two branches edit the same lines.",
      },
      {
        id: "10-e1",
        text: "When does Git actually raise a merge conflict?",
        options: [
          "Any time you merge two branches together",
          "When two branches change the same lines after diverging, so Git can't pick a winner",
          "Whenever your branch is behind main",
          "When you forget to commit before merging",
        ],
        correctAnswer: 1,
        explanation: "A conflict only happens when both sides edited the same lines after splitting from a common point; if changes don't overlap, Git merges them automatically.",
      },
      {
        id: "10-e2",
        text: "You see conflict markers (<<<<<<<, =======, >>>>>>>) in a file. What resolves the conflict correctly?",
        options: [
          "Run `git merge --abort` and never merge that branch",
          "Edit the file to the version you want, delete all three marker lines, then stage and commit",
          "Delete the whole file so the conflict disappears",
          "Leave the markers in and push — Git cleans them up on the server",
        ],
        correctAnswer: 1,
        explanation: "You choose the intended result, remove every conflict marker, then `git add` and commit the resolution — the markers must never remain in the file.",
      },
    ],
  },
  11: {
    moduleId: 11,
    questions: [
      {
        id: "10-1",
        text: "CI/CD here means:",
        options: [
          "manual uploads",
          "pushing to GitHub auto-builds and deploys",
          "copying files to a server",
          "emailing code",
        ],
        correctAnswer: 1,
        explanation:
          "CI/CD automatically builds and deploys when you push code to the main branch.",
      },
      {
        id: "10-2",
        text: "Your app worked locally but breaks on Vercel until you:",
        options: [
          "restart your laptop",
          "add the env vars to Vercel",
          "rewrite it",
          "buy a domain",
        ],
        correctAnswer: 1,
        explanation:
          "Environment variables (API keys, secrets) must be added to Vercel separately.",
      },
      {
        id: "10-3",
        text: "A preview deploy is:",
        options: [
          "the production site",
          "a live URL for a branch/PR to test before merging",
          "a screenshot",
          "a local server",
        ],
        correctAnswer: 1,
        explanation:
          "Preview deploys give you a live URL for every PR, letting you test before merging.",
      },
      {
        id: "11-e1",
        text: "Why must NEXT_PUBLIC_ variables exist in Vercel BEFORE the build runs?",
        options: [
          "Vercel emails them to you after the build",
          "They are inlined into the bundle at build time, so a missing value bakes in as undefined",
          "They are only read when a user visits the page, not at build",
          "They are stored in the repo, so pushing again fixes them",
        ],
        correctAnswer: 1,
        explanation: "NEXT_PUBLIC_ values are baked into the build output, so if they aren't set when Vercel builds, the deploy ships with undefined values — the classic 'works locally, breaks in prod' trap.",
      },
      {
        id: "11-e2",
        text: "Env vars are set in Vercel and the app loads, but sign-in fails on the live site (it works locally). The most likely fix is:",
        options: [
          "Re-add the same env vars and redeploy",
          "Set Supabase's Site URL and Redirect URLs to your production Vercel URL",
          "Buy a custom domain",
          "Downgrade to a previous deployment",
        ],
        correctAnswer: 1,
        explanation: "Supabase sends its post-login redirect to whatever Site URL / Redirect URLs it knows; until those point at your Vercel URL, production sign-in redirects wrong and fails.",
      },
    ],
  },
  12: {
    moduleId: 12,
    questions: [
      {
        id: "11-1",
        text: "An agent workflow differs from a normal function because:",
        options: [
          "it's Python",
          "the agent decides which tools to use within the goal",
          "it never fails",
          "it needs no code",
        ],
        correctAnswer: 1,
        explanation:
          "Agents choose their own tools to reach a goal, versus functions that have fixed logic.",
      },
      {
        id: "11-2",
        text: "Putting the AI call behind a stable interface lets you:",
        options: [
          "make it slower",
          "stub it in tests and swap models later without changing the UI",
          "skip the AI",
          "avoid writing code",
        ],
        correctAnswer: 1,
        explanation:
          "An interface isolates the AI call, so you can test without it or swap implementations.",
      },
      {
        id: "11-3",
        text: "The single most important safeguard before a consequential action (send/spend/delete):",
        options: [
          "more agents",
          "a human-in-the-loop approval",
          "a bigger model",
          "faster hardware",
        ],
        correctAnswer: 1,
        explanation:
          "Always require human approval before AI takes consequential actions.",
      },
      {
        id: "11-4",
        text: "Your workflow calls an external API that fails 10% of the time. What do you add?",
        options: [
          "nothing — accept the 10% failure rate",
          "retry logic + logging so failures are detectable and the loop can recover",
          "delete the workflow — it's unreliable",
          "a prayer",
        ],
        correctAnswer: 1,
        explanation:
          "Assess failure modes and add defensive patterns: retries, logging, fallbacks. Build workflows that degrade gracefully.",
      },
      {
        id: "12-e1",
        text: "In the Vercel AI SDK, what does `stopWhen: stepCountIs(6)` do in a generateText agent call?",
        options: [
          "Sets the model's temperature to 6",
          "Lets the agent loop through reason-act-observe steps, but caps it at 6 so a stuck agent stops",
          "Retries the request 6 times if the API errors",
          "Limits each reply to 6 tokens",
        ],
        correctAnswer: 1,
        explanation: "Without a stop condition a single generateText call runs one turn and stops; stopWhen turns it into a bounded loop across multiple tool calls so a looping or stuck agent can't run forever.",
      },
    ],
  },
  13: {
    moduleId: 13,
    questions: [
      {
        id: "12-1",
        text: "The pillars of production-ready are tested, resilient, secure, maintainable, and:",
        options: ["colorful", "accessible & performant", "cheap", "fast to type"],
        correctAnswer: 1,
        explanation:
          "The five pillars are: tested, resilient, secure, maintainable, and accessible/performant.",
      },
      {
        id: "12-2",
        text: "The caveat when AI writes your tests:",
        options: [
          "they're always perfect",
          "review them — a test can pass while checking the wrong thing",
          "never run them",
          "delete them",
        ],
        correctAnswer: 1,
        explanation:
          "AI tests can pass for the wrong reasons. Review them to ensure they validate correctly.",
      },
      {
        id: "12-3",
        text: "Which production qualities does AI usually skip unless you ask?",
        options: [
          "variable names",
          "accessibility and performance",
          "syntax",
          "comments",
        ],
        correctAnswer: 1,
        explanation:
          "AI skips accessibility, performance optimization, and non-functional polish unless prompted.",
      },
      {
        id: "12-4",
        text: "Before shipping, your code review checklist should verify all EXCEPT:",
        options: [
          "tests pass and error handling is in place",
          "secrets aren't hardcoded",
          "the variable names are the longest possible",
          "SQL injection and XSS are mitigated",
        ],
        correctAnswer: 2,
        explanation:
          "Long variable names don't improve security or quality; focus on testing, error handling, secrets management, and injection protection.",
      },
      {
        id: "12-5",
        text: "In test-driven AI development, why write the test BEFORE the code?",
        options: [
          "tests are faster than code",
          "the test documents intent; Claude Code reads it and knows exactly what to fix",
          "you can skip the code",
          "tests never fail",
        ],
        correctAnswer: 1,
        explanation:
          "A failing test is unambiguous: it states the expected behavior. Claude Code can read it and implement code to make it pass.",
      },
      {
        id: "12-6",
        text: "When combining Playwright screenshots with test-driven AI development, you can:",
        options: [
          "only test user interactions, never visuals",
          "catch UI regressions: take screenshots during tests, compare against baseline, detect visual changes",
          "replace all unit tests with screenshot tests",
          "screenshots aren't useful in tests",
        ],
        correctAnswer: 1,
        explanation:
          "Screenshot tests capture visual state. Comparing new screenshots to baseline images detects unintended visual changes—regression prevention.",
      },
    ],
  },
  14: {
    moduleId: 14,
    questions: [
      {
        id: "13-1",
        text: "A pipeline automates all EXCEPT:",
        options: [
          "running tests",
          "deploying",
          "understanding the business need",
          "linting code",
        ],
        correctAnswer: 2,
        explanation:
          "Pipelines automate technical tasks, not understanding what to build.",
      },
      {
        id: "13-2",
        text: "GitHub Actions runs on:",
        options: ["your laptop", "GitHub's servers", "your database", "Vercel"],
        correctAnswer: 1,
        explanation:
          "GitHub Actions runs workflows on GitHub's infrastructure, triggered by events.",
      },
      {
        id: "13-3",
        text: "A pipeline failing before deploy is:",
        options: [
          "a disaster",
          "good — it prevented pushing broken code",
          "slow",
          "expensive",
        ],
        correctAnswer: 1,
        explanation:
          "Pipelines fail fast to catch issues before they reach production—that's their job.",
      },
      {
        id: "13-4",
        text: "You want Claude Code to export GitHub data on every build. You should use:",
        options: [
          "a CLAUDE.md instruction",
          "a skill (reusable, needs testing)",
          "an MCP server (connects Claude to GitHub's API)",
          "a GitHub Action (different tool entirely)",
        ],
        correctAnswer: 2,
        explanation:
          "MCPs are the way to connect Claude Code to external APIs/tools. Skills are for reusable logic; CLAUDE.md for project context.",
      },
      {
        id: "14-e1",
        text: "In the automated pipeline, which step should stay on the \"ask\" (require-approval) list rather than being auto-allowed?",
        options: [
          "Running npm run test",
          "Reading the Vercel build logs",
          "Merging the PR to main",
          "Running the linter",
        ],
        correctAnswer: 2,
        explanation: "Automate the reversible (tests, reading logs, lint) and gate the irreversible — merging to main and applying prod migrations must ask for approval.",
      },
    ],
  },
  15: {
    moduleId: 15,
    questions: [
      {
        id: "14-1",
        text: "Brownfield development means:",
        options: [
          "building in dirt",
          "working on an existing codebase with constraints",
          "always starting fresh",
          "removing features",
        ],
        correctAnswer: 1,
        explanation:
          "Brownfield is building on existing systems with legacy constraints (vs. greenfield = fresh).",
      },
      {
        id: "14-2",
        text: "When reading unfamiliar code, start with:",
        options: [
          "deleting it",
          "the README or entry point",
          "asking for a rewrite",
          "guessing",
        ],
        correctAnswer: 1,
        explanation:
          "README and entry points give you the architecture and purpose before diving into details.",
      },
      {
        id: "14-3",
        text: "Refactoring during brownfield work:",
        options: [
          "always necessary",
          "only touch what you need to change",
          "delete everything first",
          "optional if it works",
        ],
        correctAnswer: 1,
        explanation:
          "Brownfield refactoring should be minimal: change only what you must, leave the rest stable.",
      },
      {
        id: "15-e1",
        text: "Before editing searchBooks() in an unfamiliar repo, the highest-value first move is to:",
        options: [
          "Rewrite it in your preferred style so it's easier to work with",
          "grep for every caller to trace its blast radius before you touch it",
          "Increase the line count so the change is easier to spot in review",
          "Skip tracing since it's only one function",
        ],
        correctAnswer: 1,
        explanation: "Blast radius lives in the dependencies, not the line count — grepping the callers (one production caller here) tells you what a change can break before you make it.",
      },
      {
        id: "15-e2",
        text: "FEAT-102 asks for a genre filter in a repo built from small pure functions. The best approach is to:",
        options: [
          "Add a new pure filterByGenre() helper and compose it with searchBooks, leaving searchBooks untouched",
          "Refactor searchBooks into a BookQuery class with chained .search().byGenre() methods",
          "Fold genre handling into searchBooks and change its signature",
          "Reformat the surrounding files to a cleaner style while you're in there",
        ],
        correctAnswer: 0,
        explanation: "Match the existing convention: an additive pure helper keeps the change small, leaves searchBooks's one caller and tests untouched, and avoids expanding the blast radius.",
      },
    ],
  },
  16: {
    moduleId: 16,
    questions: [
      {
        id: "15-1",
        text: "The purpose of learning the tooling landscape is:",
        options: [
          "to memorize every tool",
          "to understand which tool solves which problem",
          "to pick one and ignore others",
          "tools don't matter",
        ],
        correctAnswer: 1,
        explanation:
          "Understanding the landscape lets you pick the right tool for the right job.",
      },
      {
        id: "15-2",
        text: "Which is NOT a reason to pick a tool?",
        options: [
          "it solves your problem",
          "your team knows it",
          "everyone else uses it",
          "it's free",
        ],
        correctAnswer: 2,
        explanation:
          "Popularity isn't a reason; solve your problem, use team expertise, and consider cost.",
      },
      {
        id: "15-3",
        text: "After this course, the best way to stay current is:",
        options: [
          "stop learning",
          "follow release notes and communities for tools you use",
          "memorize docs",
          "use only old tools",
        ],
        correctAnswer: 1,
        explanation:
          "Stay current by following the tools you actually use, not trying to know everything.",
      },
      {
        id: "16-e1",
        text: "When choosing the model (LLM) layer for a feature, the most common way teams overspend is:",
        options: [
          "Streaming responses to the UI",
          "Capping the maximum output length",
          "Defaulting every call to the largest flagship model instead of matching the model to the job",
          "Using prompt caching for a repeated system prompt",
        ],
        correctAnswer: 2,
        explanation: "Match the model to the task — reserve the flagship for hard reasoning and use the small/fast tier for bulk classification or extraction; output tokens cost several times more than input.",
      },
      {
        id: "16-e2",
        text: "Using the six-criterion framework, a live multiplayer collaboration app might justify Firebase over the default Supabase because:",
        options: [
          "Lock-in (criterion 3) is no longer a downside for Firebase",
          "Performance for high-fanout realtime (criterion 4) dominates and outweighs relational fit and lock-in",
          "Firebase always scores higher across all six criteria",
          "Relational fit (criterion 1) favors Firebase's document model",
        ],
        correctAnswer: 1,
        explanation: "Same six criteria, different weights: when high-fanout realtime dominates, criterion 4 can flip the choice — you accept more lock-in in exchange for realtime performance.",
      },
    ],
  },
};

// Kids version quizzes (simplified language, same learning objectives)
export const kidsQuizzes: Record<number, ModuleQuiz> = {
  1: {
    moduleId: 1,
    questions: [
      {
        id: "k0-1",
        text: "What does Vercel do?",
        options: ["Edits your code", "Stores your database", "Shows your app to the world (on the internet!)", "Saves your code on GitHub"],
        correctAnswer: 2,
        explanation: "Vercel puts your app online so anyone can use it!",
      },
      {
        id: "k0-2",
        text: "Which tool runs your app on your computer while you're building it?",
        options: ["GitHub", "Node.js", "Supabase", "Cursor"],
        correctAnswer: 1,
        explanation: "Node.js is the engine that runs your code locally.",
      },
      {
        id: "k0-3",
        text: "Which pairing is correct?",
        options: ["Supabase = puts your app on the internet", "GitHub = stores your code and backs it up", "Cursor = database", "Vercel = version control"],
        correctAnswer: 1,
        explanation: "GitHub is where you save and backup your code!",
      },
      {
        id: "1-ke1",
        text: "Where should you put secret API keys so they never get uploaded to GitHub?",
        options: [
          "Right inside your code files",
          "In a `.env.local` file that's listed in `.gitignore`",
          "In a screenshot you post online",
          "In your commit message",
        ],
        correctAnswer: 1,
        explanation: "Secrets go in `.env.local`, and `.gitignore` makes sure that file is never uploaded to GitHub.",
      },
      {
        id: "1-ke2",
        text: "What's the simple rule for deciding if something goes in your repo or in Notion?",
        options: [
          "Ask \"Is it colorful?\"",
          "Ask \"If I change this, will my app break or stop working?\" — YES means repo, NO means Notion",
          "Ask \"Is it a long document?\"",
          "Ask \"Did Claude write it?\"",
        ],
        correctAnswer: 1,
        explanation: "Things that would break your app if changed (code and rules) get locked down in the repo; helpful info that won't break anything goes in Notion.",
      },
    ],
  },
  2: {
    moduleId: 2,
    questions: [
      {
        id: "k1-1",
        text: "What is an AI model really doing when it writes code?",
        options: ["Copying it from the internet", "Guessing the next word/token over and over (like autocomplete!)", "Thinking like a human engineer", "Looking it up in a book"],
        correctAnswer: 1,
        explanation: "AI works by predicting what comes next, one piece at a time!",
      },
      {
        id: "k1-2",
        text: "What's 'hallucination' in AI?",
        options: ["The AI sees things that aren't there on screen", "The AI makes up code that sounds real but doesn't exist (confidently!)", "The AI refuses to work", "The AI forgets your question"],
        correctAnswer: 1,
        explanation: "Hallucination means the AI invents things that seem real but aren't!",
      },
      {
        id: "k1-3",
        text: "'Vibe coding done right' means:",
        options: ["Never read the code, just vibes", "Use AI to code fast, BUT understand everything before it goes live", "Only use one tool", "Skip testing"],
        correctAnswer: 1,
        explanation: "You're the boss—use AI to code fast, but always check your work!",
      },
      {
        id: "2-ke1",
        text: "Why does telling the AI \"I'm using React and TypeScript\" make its code better?",
        options: [
          "It makes the AI type faster",
          "Context is everything — the more the AI knows about your project, the better it guesses",
          "It doesn't change anything",
          "It makes the AI show off",
        ],
        correctAnswer: 1,
        explanation: "The AI only knows what you tell it plus what it learned in training, so good context leads to way better answers.",
      },
      {
        id: "2-ke2",
        text: "For which task should you check the AI's code the MOST carefully?",
        options: [
          "A fun throwaway script that doesn't really matter",
          "Code that handles passwords or money (high stakes!)",
          "A quick note you're writing to yourself",
          "Picking a name for a variable",
        ],
        correctAnswer: 1,
        explanation: "The higher the stakes, the more you verify — passwords and money need careful line-by-line checking.",
      },
    ],
  },
  3: {
    moduleId: 3,
    questions: [
      {
        id: "k2-1",
        text: "The five ingredients of a strong prompt are: task, context, constraints, examples, and...?",
        options: ["The AI's temperature setting", "Output format", "Emojis", "Your mood"],
        correctAnswer: 1,
        explanation: "Output format tells the AI how you want the answer.",
      },
      {
        id: "k2-2",
        text: "Why does a strong prompt work better?",
        options: ["It's longer (more words = better)", "It removes guessing — tells the AI exactly what you want", "It uses big fancy words", "It repeats the same thing multiple times"],
        correctAnswer: 1,
        explanation: "Be specific! The clearer you are, the better the AI does.",
      },
      {
        id: "k2-3",
        text: "Your AI code is wrong. What's the best way to fix it?",
        options: ["Say 'try again'", "Tell it specifically what's wrong and what you want instead", "Start a completely new conversation", "Give up"],
        correctAnswer: 1,
        explanation: "Specific feedback gets specific fixes!",
      },
      {
        id: "k2-4",
        text: "You watched a video about making games. You want to build something similar. What's the best way to use that knowledge?",
        options: ["Try to remember it from memory", "Write down what you learned, then tell Claude (or Cursor) about it—let the AI help you build it faster", "Immediately start coding alone", "Never use other people's ideas"],
        correctAnswer: 1,
        explanation: "Learning from videos is fast—share what you learned with your AI assistant, and it helps you build even faster!",
      },
      {
        id: "k2-5",
        text: "You see a cool website design you like. How can you learn from it to build something similar?",
        options: ["Ignore it and only copy exactly", "Take a screenshot of it, describe what you like, and ask Claude to help you build something inspired by it", "Never look at other websites", "Only use official design templates"],
        correctAnswer: 1,
        explanation: "Learn from designs you admire—then ask Claude to help you adapt the ideas to your own project!",
      },
    ],
  },
  4: {
    moduleId: 4,
    questions: [
      {
        id: "k3-1",
        text: "Why should you plan before building, even with super-fast AI?",
        options: ["It's the law", "The faster you can build, the worse a bad plan hurts", "It slows you down intentionally", "AI can't code without a plan"],
        correctAnswer: 1,
        explanation: "A bad plan leads to more fixing later—plan first!",
      },
      {
        id: "k3-2",
        text: "What should a plan NOT include?",
        options: ["The problem you're solving", "The exact color of every button pixel-perfect", "Your core features", "What features are coming later (not now)"],
        correctAnswer: 1,
        explanation: "Don't get stuck on pixel-perfect details—focus on functionality!",
      },
      {
        id: "k3-3",
        text: "A 'dependency' means:",
        options: ["An npm package", "Something that has to exist before another thing can work", "A bug", "A team member"],
        correctAnswer: 1,
        explanation: "A dependency is when one task needs another task done first.",
      },
      {
        id: "4-ke1",
        text: "What is the `decisions.md` file for?",
        options: [
          "A to-do list of features left to build",
          "A record of WHY you made each choice, so future-you (or a teammate) remembers",
          "A list of bugs to fix",
          "A place to store your app's passwords",
        ],
        correctAnswer: 1,
        explanation: "decisions.md is a notebook of your thinking — it records the reasoning behind your choices so they make sense months later.",
      },
      {
        id: "4-ke2",
        text: "You're building an app where users log in and save data. Which part should you build FIRST?",
        options: [
          "The fancy homepage design",
          "The database and login — everything else depends on them",
          "The settings page",
          "The share-with-friends feature",
        ],
        correctAnswer: 1,
        explanation: "Build the foundation first: the database and login. You can't show or save a user's data until those exist.",
      },
    ],
  },
  5: {
    moduleId: 5,
    questions: [
      {
        id: "k4-1",
        text: "Cursor is best at:",
        options: ["Making changes to many files at once", "Small tweaks to one file (editing what you can see)", "Deploying your app", "Finding bugs in other people's code"],
        correctAnswer: 1,
        explanation: "Cursor works in the editor for quick, focused fixes.",
      },
      {
        id: "k4-2",
        text: "What does a `.cursorrules` file do?",
        options: ["Formats your code automatically", "Tells the AI about your project so it remembers on every chat", "Deploys your app", "Runs your tests"],
        correctAnswer: 1,
        explanation: "Rules files give the AI context about your project!",
      },
      {
        id: "k4-3",
        text: "The `@` symbol in Cursor lets you:",
        options: ["Tag teammates", "Pin specific files/links into the AI's memory", "Add comments", "Undo changes"],
        correctAnswer: 1,
        explanation: "@-mentions pin context so the AI doesn't forget it.",
      },
      {
        id: "5-ke1",
        text: "You want to add a new feature that changes several files at once. Which Cursor mode is best?",
        options: [
          "Tab (autocomplete)",
          "Cmd+I Composer — it edits multiple files and shows all the changes in one combined diff",
          "Retype everything by hand",
          "Cmd+K on a single line",
        ],
        correctAnswer: 1,
        explanation: "Composer (Cmd+I) is the power move for multi-file changes — it updates every file and shows one unified diff to review.",
      },
      {
        id: "5-ke2",
        text: "Your delete button doesn't work. What's the BEST thing to tell Cursor?",
        options: [
          "\"Fix it.\"",
          "\"The delete button doesn't work — the pet stays in the list. Here's the error: [paste it]. What's wrong?\"",
          "\"This is broken, ugh.\"",
          "Nothing — just run the same prompt again",
        ],
        correctAnswer: 1,
        explanation: "Telling Cursor what went wrong, what you expected, and the actual error message gets a much better fix than a vague \"fix it.\"",
      },
    ],
  },
  6: {
    moduleId: 6,
    questions: [
      {
        id: "k5-1",
        text: "Claude Code works differently from Cursor because it thinks in:",
        options: ["Edits first, goals second", "Goals first, then figures out the edits", "Files first, folders second", "Tests first"],
        correctAnswer: 1,
        explanation: "Claude Code is agentic—you describe the goal, it figures out the steps.",
      },
      {
        id: "k5-2",
        text: "`CLAUDE.md` in Claude Code is like:",
        options: ["package.json", "A Cursor rules file", ".gitignore", "A comment"],
        correctAnswer: 1,
        explanation: "CLAUDE.md gives Claude Code context about your project.",
      },
      {
        id: "k5-3",
        text: "Why use plan mode?",
        options: ["It's faster", "So the AI shows you its plan before changing code (you can say yes/no)", "It saves tokens", "It's required by law"],
        correctAnswer: 1,
        explanation: "Plan mode lets you review before the AI makes changes!",
      },
      {
        id: "k5-4",
        text: "Speaking into Claude Code (with a tool like SuperWhisper) is faster than typing because:",
        options: ["Everyone talks faster than they type", "You can build features without interruption—just speak your goal", "Typing is never useful", "Voice replaces all coding"],
        correctAnswer: 1,
        explanation: "Voice-driven development keeps you in flow—no switching between keyboard and code!",
      },
      {
        id: "k5-5",
        text: "When you combine a screenshot of your app with a voice prompt to Claude Code, you're giving it:",
        options: ["Too much information", "Two forms of context—visual (what it looks like now) + spoken goal (what you want). More context = better results", "Information it doesn't need", "Conflicting instructions"],
        correctAnswer: 1,
        explanation: "Screenshot + voice description = clear intent. Claude Code can see what you mean!",
      },
    ],
  },
  7: {
    moduleId: 7,
    questions: [
      {
        id: "k6-1",
        text: "Why do AI-designed UIs often look boring?",
        options: ["The AI picks the most common designs from its training", "AI doesn't like design", "Tailwind CSS is ugly", "They're always broken"],
        correctAnswer: 0,
        explanation: "AI learns from common patterns—you have to ask for cool design!",
      },
      {
        id: "k6-2",
        text: "Which is NOT a design principle?",
        options: ["Hierarchy (what's most important?)", "Spacing (breathing room)", "Database indexing", "Color palette (colors that work together)"],
        correctAnswer: 2,
        explanation: "Database indexing is a backend concept, not design!",
      },
      {
        id: "k6-3",
        text: "Tailwind CSS is useful because:",
        options: ["It replaces Next.js", "You add classes to HTML instead of writing CSS from scratch", "It's only for designers", "It works on the backend"],
        correctAnswer: 1,
        explanation: "Tailwind lets you style with classes—no CSS file needed!",
      },
      {
        id: "k6-4",
        text: "You see a cool app design you like. How do you learn from it to improve your own design?",
        options: ["Ignore it—only design alone", "Screenshot it, look at what makes it look cool (colors, spacing, etc.), then ask Claude to help you make your app look similar", "Copy it exactly", "Never look at other apps"],
        correctAnswer: 1,
        explanation: "Study designs you admire, understand the principles, and adapt them to your project!",
      },
      {
        id: "k6-5",
        text: "When analyzing a competitor's design, what's the most helpful thing to check first?",
        options: ["The exact color code (hex number)", "Hierarchy, spacing, typography, and color—what makes it look professional and easy to use", "Whether they used Tailwind CSS", "How much it probably cost them"],
        correctAnswer: 1,
        explanation: "Focus on design principles (why it looks good), not implementation details (how it was built)!",
      },
    ],
  },
  8: {
    moduleId: 8,
    questions: [
      {
        id: "k7-1",
        text: "A backend database does everything EXCEPT:",
        options: ["Save your data permanently", "Create user accounts", "Control who can see what data", "Make your typing faster"],
        correctAnswer: 3,
        explanation: "Databases don't speed up typing—they store data!",
      },
      {
        id: "k7-2",
        text: "With RLS security on and NO rules set, what happens?",
        options: ["Everyone can see everything", "Nobody can see anything (locked by default, safe!)", "Only new data shows", "You get an error"],
        correctAnswer: 1,
        explanation: "RLS defaults to denying access—super safe!",
      },
      {
        id: "k7-3",
        text: "In a security rule, `auth.uid()` gives you:",
        options: ["A random ID", "The logged-in user's unique ID", "The table name", "The API key"],
        correctAnswer: 1,
        explanation: "auth.uid() tells you who's logged in!",
      },
      {
        id: "8-ke1",
        text: "Why does every table need a `user_id` column?",
        options: [
          "To make the database bigger",
          "So the security rule (RLS) can say 'you can only see YOUR rows'",
          "To store the user's password",
          "Because Supabase won't run without it",
        ],
        correctAnswer: 1,
        explanation: "user_id marks who owns each row, so RLS can keep your data separate from everyone else's.",
      },
      {
        id: "8-ke2",
        text: "Where is the SAFEST place to enforce 'users can only see their own data'?",
        options: [
          "In your app code, by filtering the list before you show it",
          "In the database, with an RLS policy",
          "In the web browser",
          "You don't need to — it happens automatically",
        ],
        correctAnswer: 1,
        explanation: "If security lives only in your app code, someone can skip the app and query the database directly. An RLS policy in the database blocks them no matter what.",
      },
    ],
  },
  9: {
    moduleId: 9,
    questions: [
      {
        id: "k8-1",
        text: "When your code breaks, the first thing to do is:",
        options: ["Ask the AI to fix it immediately", "Read the error message (it tells you what went wrong!)", "Rewrite everything", "Restart your computer"],
        correctAnswer: 1,
        explanation: "Error messages are your best friend!",
      },
      {
        id: "k8-2",
        text: "If you can't explain a line of AI code after reading it carefully, you should:",
        options: ["Ship it anyway", "Don't ship it yet — simplify it or ask for a version you understand", "Delete the whole file", "Ignore it"],
        correctAnswer: 1,
        explanation: "Never ship code you don't understand!",
      },
      {
        id: "k8-3",
        text: "If the AI 'fixes' a problem by removing security (like RLS), that's:",
        options: ["A good fix", "Dangerous (it hides the real problem)", "The only way", "Fine"],
        correctAnswer: 1,
        explanation: "That's a band-aid, not a real fix!",
      },
      {
        id: "9-ke1",
        text: "You wrote `const pets = supabase.from('pets').select()` and printed it, but got `{ then: ... }` instead of your pets. What went wrong?",
        options: [
          "The pets table is empty",
          "You forgot `await` — the query returns a Promise you have to wait for",
          "Supabase is broken",
          "You need to restart your computer",
        ],
        correctAnswer: 1,
        explanation: "Supabase queries return a Promise. Without `await` you get the Promise object instead of the real data — add `await`.",
      },
      {
        id: "9-ke2",
        text: "You add a pet with `pets.push(newPet)` but the page doesn't update. What's the fix?",
        options: [
          "Refresh the whole website every time",
          "Use `setPets([...pets, newPet])` so React knows to re-render",
          "Delete the pets list and start over",
          "Nothing — React will update on its own eventually",
        ],
        correctAnswer: 1,
        explanation: "React only re-renders when you update state with setState. Changing the array directly with `.push()` doesn't tell React to redraw.",
      },
    ],
  },
  10: {
    moduleId: 10,
    questions: [
      {
        id: "k9-1",
        text: "A commit is best described as:",
        options: ["A deployed app", "A save point with a message (checkpoint in a game!)", "A branch", "A backup server"],
        correctAnswer: 1,
        explanation: "Commits are like game save points!",
      },
      {
        id: "k9-2",
        text: "Why use branches even when coding solo?",
        options: ["Required", "So main stays working, and each change is safe and reviewable", "Faster typing", "It deletes old code"],
        correctAnswer: 1,
        explanation: "Branches protect your working code!",
      },
      {
        id: "k9-3",
        text: "A merge conflict is:",
        options: ["Unfixable", "Git asking you to choose between two changes", "A deployment failure", "A virus"],
        correctAnswer: 1,
        explanation: "Merge conflicts just need you to pick which change to keep!",
      },
      {
        id: "10-ke1",
        text: "When does Git give you a 'merge conflict'?",
        options: [
          "Every single time you merge two branches",
          "When two branches changed the SAME line differently, so Git can't tell which one you want",
          "When your code has a bug in it",
          "When you close your laptop before saving",
        ],
        correctAnswer: 1,
        explanation: "A conflict just means two versions of the same line disagree — Git is asking you to pick, not showing an error.",
      },
      {
        id: "10-ke2",
        text: "Oops! You accidentally pushed your secret keys (.env.local) to GitHub. What should you do?",
        options: [
          "Nothing — nobody will notice",
          "Treat the keys as leaked: get new keys right away, then remove the file from Git",
          "Delete your whole GitHub account",
          "Rename the file and push again",
        ],
        correctAnswer: 1,
        explanation: "Once a secret is public, assume it's stolen — make new keys immediately, then stop tracking the file so it's never committed again.",
      },
    ],
  },
  11: {
    moduleId: 11,
    questions: [
      {
        id: "k10-1",
        text: "What does 'CI/CD' mean here?",
        options: ["Manual uploads", "Push to GitHub → auto-build and auto-deploy", "Copying files manually", "Email code to a server"],
        correctAnswer: 1,
        explanation: "CI/CD automates testing and deployment!",
      },
      {
        id: "k10-2",
        text: "Your app works at home but breaks on Vercel because:",
        options: ["Restart your laptop", "You forgot to set environment variables on Vercel", "Rewrite it", "Buy a domain"],
        correctAnswer: 1,
        explanation: "Env vars tell Vercel about your secrets!",
      },
      {
        id: "k10-3",
        text: "A 'preview deploy' is:",
        options: ["The live production app", "A test version of a branch/PR before merging", "A screenshot", "Your local computer"],
        correctAnswer: 1,
        explanation: "Preview deploys let you test before going live!",
      },
      {
        id: "11-ke1",
        text: "Your Vercel deploy failed and shows a red X. What's the smartest first move?",
        options: [
          "Guess and change random code",
          "Open the deployment and read the Build Logs — they say exactly what broke",
          "Delete the project and start over",
          "Restart your computer",
        ],
        correctAnswer: 1,
        explanation: "The build logs name the exact problem (a typo, a missing import) — read them first instead of guessing.",
      },
      {
        id: "11-ke2",
        text: "Your app is live and env vars are set, but logging in doesn't work on the real site (it works at home). Why?",
        options: [
          "You need a faster internet connection",
          "Supabase still thinks your app lives at localhost — you must tell it your new live web address",
          "Vercel is broken",
          "You need to buy a domain name",
        ],
        correctAnswer: 1,
        explanation: "Supabase sends you back to the address it knows after login; update its Site URL / Redirect URLs to your live Vercel link so sign-in lands in the right place.",
      },
    ],
  },
  12: {
    moduleId: 12,
    questions: [
      {
        id: "k11-1",
        text: "An AI agent is different from a function because:",
        options: ["It's Python", "The agent decides which steps to take (within a goal)", "It never fails", "It needs no code"],
        correctAnswer: 1,
        explanation: "Agents are AI that figures out the steps themselves!",
      },
      {
        id: "k11-2",
        text: "Why put AI calls behind a stable interface?",
        options: ["Make it slower", "Test it without real AI, swap models later without changing the app", "Skip the AI", "Avoid coding"],
        correctAnswer: 1,
        explanation: "A stable interface lets you swap tools later!",
      },
      {
        id: "k11-3",
        text: "Before a big action (send money, delete data), the safest thing is:",
        options: ["Use more agents", "Have a human check/approve it first", "Use a bigger AI model", "Run it faster"],
        correctAnswer: 1,
        explanation: "Human approval is the best safety net!",
      },
      {
        id: "12-ke1",
        text: "Why does an AI agent loop need a 'stop rule' (like 'up to 6 steps')?",
        options: [
          "To make the AI answer in a funny voice",
          "So a confused agent can't loop forever or get stuck — it has to stop",
          "To make it run faster than other apps",
          "Because rules are just for grownups",
        ],
        correctAnswer: 1,
        explanation: "Without a stop rule an agent could keep calling tools endlessly; a step limit makes a stuck agent give up safely.",
      },
      {
        id: "12-ke2",
        text: "In the invoice reminder helper, which tool should the AI agent NOT be allowed to use on its own?",
        options: [
          "Looking up which invoices are overdue",
          "Writing a draft reminder email",
          "Actually SENDING the email — a human should approve first",
          "Reading a customer's name",
        ],
        correctAnswer: 2,
        explanation: "Reading and drafting are safe and undoable, but sending is the real, hard-to-undo action — a person approves it, and the agent never holds the send tool.",
      },
    ],
  },
  13: {
    moduleId: 13,
    questions: [
      {
        id: "k12-1",
        text: "Production-ready code means tested, resilient, secure, maintainable, and:",
        options: ["Colorful", "Accessible (everyone can use it) & fast", "Cheap", "Quick to type"],
        correctAnswer: 1,
        explanation: "Production code must work for everyone!",
      },
      {
        id: "k12-2",
        text: "When AI writes tests, what should you do?",
        options: ["Run them blindly", "Review them — they can pass while checking the wrong thing", "Never run them", "Delete them"],
        correctAnswer: 1,
        explanation: "Check the tests—they can be wrong too!",
      },
      {
        id: "k12-3",
        text: "What does AI usually skip unless you ask?",
        options: ["Variable names", "Accessibility & performance", "Syntax", "Comments"],
        correctAnswer: 1,
        explanation: "AI forgets accessibility and performance—you have to ask!",
      },
      {
        id: "k12-4",
        text: "Test-driven development means:",
        options: ["Only test after you ship", "Write the test first (so it fails), then write code to make it pass", "Tests are optional", "Testing is for professionals only"],
        correctAnswer: 1,
        explanation: "Test-first tells Claude exactly what to build. The test describes success!",
      },
      {
        id: "k12-5",
        text: "Using Playwright screenshots in tests helps catch:",
        options: ["Compile errors only", "Visual regressions—when you accidentally broke the design", "Only spelling mistakes", "Nothing useful"],
        correctAnswer: 1,
        explanation: "Screenshot tests compare how the UI looks—they catch design breakage!",
      },
    ],
  },
  14: {
    moduleId: 14,
    questions: [
      {
        id: "k13-1",
        text: "What do GitHub Actions do?",
        options: ["Run automated tests and deploy when code is pushed", "Manually deploy code to Vercel", "Manage git branches", "Write code documentation"],
        correctAnswer: 0,
        explanation: "GitHub Actions automatically tests and deploys your code when you push!",
      },
      {
        id: "k13-2",
        text: "When should you use auto-deploy to production?",
        options: ["Only after tests pass", "Immediately on every commit", "Only on Friday afternoons", "Never—deploy manually"],
        correctAnswer: 0,
        explanation: "Deploy to production only after tests pass—it keeps your app safe!",
      },
      {
        id: "k13-3",
        text: "The safe rule for automation is:",
        options: ["Automate everything", "Automate the reversible, protect the irreversible", "Never automate", "Skip permissions"],
        correctAnswer: 1,
        explanation: "Automate safe stuff, gate the dangerous stuff!",
      },
      {
        id: "14-ke1",
        text: "Your pipeline runs your tests and one test FAILS. What happens next?",
        options: [
          "It deploys anyway and hopes for the best",
          "It stops and does NOT deploy, so broken code never reaches your users",
          "It deletes your code",
          "It skips the test and keeps going",
        ],
        correctAnswer: 1,
        explanation: "A failing test stops the pipeline before deploy — that's the whole point: catch the bug before it ships.",
      },
      {
        id: "14-ke2",
        text: "Why turn on 'require status checks to pass' (branch protection) on main?",
        options: [
          "To make your repo look official",
          "So you CAN'T merge to main until the tests are green — no broken code sneaks in",
          "To slow everyone down on purpose",
          "So only the owner can push code",
        ],
        correctAnswer: 1,
        explanation: "Branch protection blocks merging until GitHub Actions passes, so broken code can't reach production.",
      },
    ],
  },
  15: {
    moduleId: 15,
    questions: [
      {
        id: "k14-1",
        text: "The brownfield golden rule is:",
        options: ["Rewrite it all your way", "Change minimum, match the code around it, prove you didn't break anything", "Never use tests", "Don't read the code"],
        correctAnswer: 1,
        explanation: "Respect existing code—make minimal, safe changes!",
      },
      {
        id: "k14-2",
        text: "Before changing existing code, assess:",
        options: ["Its color scheme", "The blast radius (what depends on it)", "File size only", "Who wrote it"],
        correctAnswer: 1,
        explanation: "Know what could break before you change anything!",
      },
      {
        id: "k14-3",
        text: "If an AI tries to reformat 40 files for a one-line fix, you should:",
        options: ["Accept it", "Reject scope creep — keep the change tiny", "Delete the repo", "Disable tests"],
        correctAnswer: 1,
        explanation: "One-line fixes shouldn't touch 40 files!",
      },
      {
        id: "15-ke1",
        text: "You open a codebase you've never seen before. Where do you start reading?",
        options: [
          "Read every file top to bottom",
          "Find the entry point (the file that runs first) and follow its imports",
          "Start with the biggest file",
          "Change something and see what breaks",
        ],
        correctAnswer: 1,
        explanation: "Start at the entry point and trace outward through its imports — that maps the structure before you dive into details.",
      },
      {
        id: "15-ke2",
        text: "Claude Code says the delete button calls deletePet(), but your manual trace said removeItem(). What should you do?",
        options: [
          "Trust Claude Code — it's always right",
          "Trust yourself — you're always right",
          "Open the code and find the truth; a disagreement is a signal to investigate",
          "Ignore it, both are probably fine",
        ],
        correctAnswer: 2,
        explanation: "A disagreement means someone misread — go to the actual code and check. Learning happens at the disagreements.",
      },
    ],
  },
  16: {
    moduleId: 16,
    questions: [
      {
        id: "k15-1",
        text: "Why tools don't define your skill:",
        options: ["All tools are the same", "Skills last forever; tools come and go", "You only need one tool", "Tools never change"],
        correctAnswer: 1,
        explanation: "The skills you learn transfer to any tool!",
      },
      {
        id: "k15-2",
        text: "A real criterion to evaluate tools:",
        options: ["Its logo color", "How trapped you are (can you switch later?)", "Founder's name", "Release date only"],
        correctAnswer: 1,
        explanation: "Avoid getting locked into one tool!",
      },
      {
        id: "k15-3",
        text: "'It depends' is a good answer when:",
        options: ["You stop there", "You name what it depends on AND decide", "You pick randomly", "You avoid choosing"],
        correctAnswer: 1,
        explanation: "After 'it depends', explain what it depends on!",
      },
      {
        id: "16-ke1",
        text: "A friend says 'You should have used Vue instead of React.' The smart move is to:",
        options: [
          "Panic — you picked the wrong tool",
          "Agree both work well, but stick with what you learned for consistency",
          "Rewrite your whole project in Vue",
          "Quit and start over",
        ],
        correctAnswer: 1,
        explanation: "Both tools work. You learned yours deeply — consistency and depth beat switching tools and second-guessing.",
      },
      {
        id: "16-ke2",
        text: "You need an app that runs on iPhone AND Android. Should you use the course's Next.js stack?",
        options: [
          "Yes, Next.js is the best tool for every project",
          "No — a mobile app needs a mobile framework like React Native or Flutter, but your skills still transfer",
          "No, it's impossible to build mobile apps",
          "Yes, just add more Tailwind",
        ],
        correctAnswer: 1,
        explanation: "Match the tool to the job: native mobile calls for React Native or Flutter, but the skills you built carry over.",
      },
    ],
  },
};

export function getModuleQuiz(moduleId: number): ModuleQuiz | null {
  return quizzes[moduleId] || null;
}

export function scoreQuiz(
  responses: Record<string, number>,
  quiz: ModuleQuiz
): { score: number; percentage: number; passed: boolean } {
  const questionCount = quiz.questions.length;
  let correct = 0;

  quiz.questions.forEach((q) => {
    if (responses[q.id] === q.correctAnswer) {
      correct++;
    }
  });

  const percentage = Math.round((correct / questionCount) * 100);
  const passed = percentage >= 80;

  return {
    score: correct,
    percentage,
    passed,
  };
}

// Version-aware quiz loader
export function getModuleQuizByVersion(
  moduleId: number,
  version: Version = "adult"
): ModuleQuiz | null {
  if (version === "kids") {
    return kidsQuizzes[moduleId] || null;
  }
  return quizzes[moduleId] || null;
}

// Client-safe quiz loader (strips correctAnswer field)
export function getModuleQuizForClient(
  moduleId: number,
  version: Version = "adult"
): ModuleQuiz | null {
  const quiz = getModuleQuizByVersion(moduleId, version);
  if (!quiz) return null;

  // Remove correctAnswer from each question before sending to client
  return {
    moduleId: quiz.moduleId,
    questions: quiz.questions.map((q) => ({
      id: q.id,
      text: q.text,
      options: q.options,
      explanation: q.explanation,
    })),
  } as ModuleQuiz;
}

// Scoring utilities
export function calculateQuizScore(answers: boolean[]): number {
  if (answers.length === 0) return 0;
  const correct = answers.filter(a => a).length;
  return Math.round((correct / answers.length) * 100);
}

export function isQuizPassed(score: number): boolean {
  return score >= 80;
}

export function canRetake(lastAttemptDate: Date): boolean {
  const now = new Date();
  const diffMs = now.getTime() - lastAttemptDate.getTime();
  const diff24hMs = 24 * 60 * 60 * 1000;
  return diffMs >= diff24hMs;
}
