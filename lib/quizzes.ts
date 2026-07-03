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
export const quizzes: Record<number, ModuleQuiz> = {
  0: {
    moduleId: 0,
    questions: [
      {
        id: "0-1",
        text: "In the stack, what is Vercel's job?",
        options: [
          "editing code",
          "storing the database",
          "deploying the app to a public URL",
          "version control",
        ],
        correctAnswer: 2,
        explanation: "Vercel is a deployment platform that publishes your app.",
      },
      {
        id: "0-2",
        text: "Which tool runs your Next.js app locally?",
        options: ["GitHub", "Node.js", "Supabase", "Cursor"],
        correctAnswer: 1,
        explanation:
          "Node.js is the JavaScript runtime that executes your code locally.",
      },
      {
        id: "0-3",
        text: "Which pairing is correct?",
        options: [
          "Supabase = deployment",
          "GitHub = database",
          "Cursor = AI code editor",
          "Vercel = version control",
        ],
        correctAnswer: 2,
        explanation: "Cursor is an AI-powered code editor built on VS Code.",
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
