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
  0: {
    moduleId: 0,
    questions: [
      {
        id: "0-1",
        text: "What does Vercel do?",
        options: ["Edits your code", "Stores your database", "Shows your app to the world (on the internet)", "Saves your code on GitHub"],
        correctAnswer: 2,
        explanation: "Vercel deploys and hosts your app so anyone can access it online.",
      },
      {
        id: "0-2",
        text: "Which tool runs your app locally while you're developing?",
        options: ["GitHub", "Node.js", "Supabase", "Cursor"],
        correctAnswer: 1,
        explanation: "Node.js is the JavaScript runtime that executes your code on your computer.",
      },
      {
        id: "0-3",
        text: "What is the primary purpose of this module?",
        options: ["Learn advanced TypeScript", "Set up your development environment", "Build a production app", "Deploy to AWS"],
        correctAnswer: 1,
        explanation: "Module 0 is about setting up all the tools you need before starting to code.",
      },
    ],
  },
  1: {
    moduleId: 1,
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
    ],
  },
  2: {
    moduleId: 2,
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
  3: {
    moduleId: 3,
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
    ],
  },
  4: {
    moduleId: 4,
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
    ],
  },
  5: {
    moduleId: 5,
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
  6: {
    moduleId: 6,
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
  7: {
    moduleId: 7,
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
    ],
  },
  8: {
    moduleId: 8,
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
    ],
  },
  9: {
    moduleId: 9,
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
    ],
  },
  10: {
    moduleId: 10,
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
    ],
  },
  11: {
    moduleId: 11,
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
    ],
  },
  12: {
    moduleId: 12,
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
  13: {
    moduleId: 13,
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
    ],
  },
  14: {
    moduleId: 14,
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
    ],
  },
  15: {
    moduleId: 15,
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
    ],
  },
};

// Kids version quizzes (simplified language, same learning objectives)
export const kidsQuizzes: Record<number, ModuleQuiz> = {
  0: {
    moduleId: 0,
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
    ],
  },
  1: {
    moduleId: 1,
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
    ],
  },
  2: {
    moduleId: 2,
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
  3: {
    moduleId: 3,
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
    ],
  },
  4: {
    moduleId: 4,
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
    ],
  },
  5: {
    moduleId: 5,
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
  6: {
    moduleId: 6,
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
  7: {
    moduleId: 7,
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
    ],
  },
  8: {
    moduleId: 8,
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
    ],
  },
  9: {
    moduleId: 9,
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
    ],
  },
  10: {
    moduleId: 10,
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
    ],
  },
  11: {
    moduleId: 11,
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
    ],
  },
  12: {
    moduleId: 12,
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
  13: {
    moduleId: 13,
    questions: [
      {
        id: "k13-1",
        text: "What lets Claude Code act on GitHub/Supabase/Vercel?",
        options: ["CLAUDE.md", "A skill", "MCP (tool connectors)", "A comment"],
        correctAnswer: 2,
        explanation: "MCPs are connectors to external tools!",
      },
      {
        id: "k13-2",
        text: "A skill is best for:",
        options: ["Storing secrets", "Procedural know-how that kicks in by context", "Hosting", "Database queries"],
        correctAnswer: 1,
        explanation: "Skills are on-demand procedural help!",
      },
      {
        id: "k13-3",
        text: "The safe rule for automation is:",
        options: ["Automate everything", "Automate the reversible, protect the irreversible", "Never automate", "Skip permissions"],
        correctAnswer: 1,
        explanation: "Automate safe stuff, gate the dangerous stuff!",
      },
    ],
  },
  14: {
    moduleId: 14,
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
    ],
  },
  15: {
    moduleId: 15,
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
