import type { Version } from "./VersionContext";
import type { LessonSection } from "@/lib/types/lesson-section";

export interface ModuleStep {
  id: number;
  title: string;
  type: "lesson" | "quiz" | "checkpoint" | "challenge";
  duration: number; // minutes
  difficulty: "easy" | "medium" | "hard"; // step difficulty
  xpReward: number; // XP for completing step

  // NEW: optional sections for multi-section lessons
  sections?: LessonSection[];

  // Legacy fields (used when sections is absent)
  content?: string;
  codeBlock?: {
    language: string;
    code: string;
  };
  tip?: string;
  keyPoint?: string;
  hints?: string[]; // Hints for challenges
  resources?: {
    title: string;
    url: string;
    type: "docs" | "video" | "article"; // resource type
  }[];
  challenge?: {
    description: string;
    action: string;
    successCriteria: string;
  };
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
}

export interface StepMilestone {
  milestone: "25%" | "50%" | "75%" | "100%";
  celebration: string;
  xpBonus: number;
}

export interface ModuleStepSequence {
  moduleId: number;
  moduleName: string;
  totalDuration: number; // minutes
  steps: ModuleStep[];
}

// Module 1: Setup & Accounts - Step-based structure (renumbered from 0-15 to 1-16)
export const module0Steps: Record<Version, ModuleStepSequence> = {
  adult: {
    moduleId: 1,
    moduleName: "Module 1: Setup & Accounts",
    totalDuration: 120,
    steps: [
      {
        id: 0,
        title: "Walkthrough Overview",
        type: "lesson",
        duration: 5,
        difficulty: "easy",
        xpReward: 50,
        content: `This module sets up your development environment **once, up front**. Setup friction is where beginners quietly give up.

By the end, you'll have:
- ✅ Node.js installed (JavaScript runtime)
- ✅ Cursor installed (AI code editor)
- ✅ Claude Code installed (terminal AI agent)
- ✅ Accounts on GitHub, Supabase, Vercel
- ✅ All tools verified working

**Estimated time:** 2 hours
**Prerequisites:** A computer, internet connection, and nothing else.

Let's get started.`,
        keyPoint: "This module prevents setup failures later — we verify everything works before moving forward.",
      },
      {
        id: 1,
        title: "The Stack Map",
        type: "lesson",
        duration: 15,
        difficulty: "easy",
        xpReward: 75,
        content: `Before you install anything, let's see the full picture. Each tool has a place in the stack:

| Tool | What it does | First used |
|------|-------------|-----------|
| **Node.js** | Runtime that runs JavaScript on your computer | Module 4 |
| **Cursor** | AI code editor (real-time in-editor suggestions) | Module 4 |
| **Claude Code** | Terminal AI agent (agentic — you describe, it builds) | Module 5 |
| **GitHub** | Version control + code hosting | Module 9 |
| **Supabase** | Database + auth + storage (your app's brain) | Module 7 |
| **Vercel** | Deploy your app to the internet (one-click) | Module 10 |

### In-Editor vs. Agentic

**Cursor (in-editor flow):**
- You open a file, start typing
- AI suggests completions line-by-line
- You're driving; AI is copilot

**Claude Code (agentic flow):**
- You describe: "build me a login form"
- AI writes entire functions/files
- AI is driving; you review

### The One-Sentence Flow

You *write* code in Cursor/Claude Code → *design* it (Module 6) → *power* it with Supabase → *store* it on GitHub → *ship* it on Vercel.`,
        keyPoint: "Each tool serves a specific purpose. Cursor is for coding; Claude Code is for complex builds.",
      },
      {
        id: 2,
        title: "What is a Terminal?",
        type: "lesson",
        duration: 5,
        difficulty: "easy",
        xpReward: 50,
        content: `A **terminal** (or command line) is a text-based interface to your computer. Instead of clicking buttons, you type commands.

### Opening a Terminal

**Mac:**
1. Press Cmd+Space (Spotlight search)
2. Type "Terminal"
3. Press Enter

**Windows:**
1. Press Win+R
2. Type "powershell"
3. Press Enter

### Commands We'll Use

All the commands in this course are **copy-paste**. You don't need to memorize them. Just copy, paste, and press Enter.

You'll see a prompt (like \`$\` or \`>\`) which means the terminal is ready for the next command.`,
        keyPoint: "Don't worry about memorizing commands — we'll use copy-paste for everything.",
      },
      {
        id: 3,
        title: "Install Node.js",
        type: "checkpoint",
        duration: 10,
        difficulty: "easy",
        xpReward: 100,
        content: `Node.js is the runtime that runs JavaScript on your computer (not just in a browser).

### Steps

**Step 1:** Go to [https://nodejs.org](https://nodejs.org)

**Step 2:** Download the **LTS version** (Long-Term Support). Click the big green button.

**Step 3:** Run the installer and follow the prompts. Accept defaults.

**Step 4:** Open a terminal and verify it installed:`,
        codeBlock: {
          language: "bash",
          code: "node --version\nnpm --version",
        },
        keyPoint: 'You should see two version numbers (e.g., v22.12.0 and 10.5.0). If "command not found", close the terminal completely and reopen it.',
        hints: [
          "Make sure you're downloading the LTS version, not the latest version",
          "If 'command not found' appears, the terminal cache hasn't updated — close and reopen it",
          "On Windows, you may need to restart your computer for PATH changes to take effect",
        ],
        resources: [
          {
            title: "Node.js Official Documentation",
            url: "https://nodejs.org/en/docs/",
            type: "docs",
          },
          {
            title: "Node.js Installation Guide (Video)",
            url: "https://www.youtube.com/watch?v=DYR0qP5H2Ac",
            type: "video",
          },
        ],
        challenge: {
          description: "Verify Node.js is installed on your computer",
          action: "Open a terminal and run the commands above",
          successCriteria: "You see two version numbers (e.g., v22.12.0 and 10.5.0)",
        },
        quiz: {
          question: "What does Node.js do?",
          options: [
            "Runs JavaScript on your computer",
            "Manages your database",
            "Deploys your app to the internet",
            "Edits your code",
          ],
          correctAnswer: 0,
          explanation: "Node.js is the runtime that executes JavaScript code outside of a web browser, typically on your computer or server.",
        },
      },
      {
        id: 4,
        title: "Install Cursor",
        type: "checkpoint",
        duration: 10,
        difficulty: "easy",
        xpReward: 75,
        content: `Cursor is your AI code editor. It's built on VS Code, so it'll feel familiar if you've used it before.

### Steps

**Step 1:** Go to [https://cursor.com](https://cursor.com)

**Step 2:** Click "Download" and choose your OS (Mac or Windows)

**Step 3:** Run the installer and follow the prompts

**Step 4:** Open Cursor and sign in (GitHub or email — we'll set up GitHub next)

**Step 5:** You're done! Cursor is ready to use.`,
        keyPoint: "Cursor will be your primary code editor for this course. Spend a moment exploring the welcome screen.",
        challenge: {
          description: "Install Cursor and open it",
          action: "Download and install from cursor.com, then open the app",
          successCriteria: "Cursor opens and shows the welcome screen",
        },
        quiz: {
          question: "What's the main difference between Cursor and Claude Code?",
          options: [
            "Cursor is an editor; Claude Code is a terminal agent",
            "Cursor is free; Claude Code costs money",
            "Claude Code is for beginners; Cursor is for advanced developers",
            "There is no difference—they're the same tool",
          ],
          correctAnswer: 0,
          explanation: "Cursor is an AI-powered code editor where you write code directly. Claude Code is a terminal agent where you describe tasks and it builds for you.",
        },
      },
      {
        id: 5,
        title: "Install Claude Code",
        type: "checkpoint",
        duration: 10,
        difficulty: "easy",
        xpReward: 75,
        content: `Claude Code is the terminal AI agent. You'll use it from the terminal to ask for help with complex tasks.

### Steps

**Step 1:** Go to [https://claude.com/download](https://claude.com/download) and follow the install instructions

**Step 2:** Open a terminal and verify:`,
        codeBlock: {
          language: "bash",
          code: "claude --version",
        },
        keyPoint: "You'll need an API token from your Claude account. Follow the link in the terminal.",
      },
      {
        id: 6,
        title: "Sign Up for GitHub",
        type: "checkpoint",
        duration: 10,
        difficulty: "easy",
        xpReward: 75,
        content: `## Create Your Accounts

You'll need accounts on three platforms. **Use the same email for all three.**

### GitHub

GitHub is where you'll save your code. It's like Google Drive for developers.

**Step 1:** Go to [https://github.com/signup](https://github.com/signup)

**Step 2:** Enter email, create password, choose username (keep it professional — it's public)

**Step 3:** Verify your email (GitHub sends a confirmation link)

**Step 4:** Done! You'll create your first repo in Module 9.`,
        keyPoint: "Your GitHub username will be visible to others. Keep it professional.",
      },
      {
        id: 7,
        title: "Sign Up for Supabase",
        type: "checkpoint",
        duration: 8,
        difficulty: "easy",
        xpReward: 50,
        content: `Supabase is your database — where your app stores data (logins, posts, etc.).

**Step 1:** Go to [https://supabase.com](https://supabase.com) and click "Sign up"

**Step 2:** Sign up with GitHub (easier) or email

**Step 3:** Verify your email

**Step 4:** Done! You'll create your first Supabase project in Module 7.`,
        keyPoint: "Supabase manages your data. We'll dive deep into it later.",
      },
      {
        id: 8,
        title: "Sign Up for Vercel",
        type: "checkpoint",
        duration: 8,
        difficulty: "easy",
        xpReward: 50,
        content: `Vercel is where you'll deploy your app — makes it live on the internet.

**Step 1:** Go to [https://vercel.com/signup](https://vercel.com/signup)

**Step 2:** Sign up with GitHub (recommended)

**Step 3:** **Important:** Go to account settings and verify GitHub is connected (Vercel needs access to your repos)

**Step 4:** Done! You'll deploy your first app in Module 10.`,
        keyPoint: "Vercel is the easiest way to get your code on the internet. One-click deployment.",
      },
      {
        id: 9,
        title: "Free Tiers & Costs",
        type: "lesson",
        duration: 10,
        difficulty: "easy",
        xpReward: 50,
        sections: [
          {
            id: 0,
            heading: "What's Free",
            content: `Set expectations now so you're not surprised by a bill later.

| Tool | Free Tier | Cost If You Upgrade |
|------|----------|-------------------|
| Node.js | Always free | N/A |
| GitHub | Unlimited repos | N/A (always free) |
| Supabase | 500MB database | $50+/month |
| Vercel | Unlimited deployments | Only bandwidth |
| Cursor | 2 slow requests/day | $20/month |
| Claude Code | Free trial | Pay by token |`,
            keyPoint: "Every tool has a free tier that covers this course.",
          },
          {
            id: 1,
            heading: "You Can Complete This Course Free",
            content: `All tools have free tiers. AI editor usage depends on how much you experiment — most learners stay under $10-20/month.

No tool requires payment to complete this course.`,
            keyPoint: "Nothing in this course requires payment.",
          },
          {
            id: 2,
            heading: "Avoid Surprise Bills",
            content: `1. Use free tiers first — don't upgrade unless you hit limits
2. Check usage dashboards weekly (2 minutes)
3. Set spending alerts if available`,
            keyPoint: "Budget for $0-20/month if you experiment. Nothing is required.",
            challenge: {
              description: "Set a spending alert on one tool",
              action: "Open Cursor or Claude billing and set a monthly cap",
              successCriteria: "You see a spend limit configured",
            },
          },
        ],
      },
      {
        id: 10,
        title: "Final Verification",
        type: "checkpoint",
        duration: 15,
        difficulty: "medium",
        xpReward: 100,
        content: `Let's verify everything works with a hello-world check.

### Step 1: Create a folder

Open a terminal and run:`,
        codeBlock: {
          language: "bash",
          code: "mkdir vibe-hello-world\ncd vibe-hello-world",
        },
        keyPoint: "You just ran your first terminal commands! You can create folders and navigate with the terminal.",
      },
      {
        id: 11,
        title: "Checkpoint: Module Complete",
        type: "quiz",
        duration: 5,
        difficulty: "easy",
        xpReward: 150,
        content: `## You Did It! 🎉

You've completed Module 1. You now have:

✅ Node.js installed (runtime)
✅ Cursor installed (editor)
✅ Claude Code installed (agent)
✅ GitHub account
✅ Supabase account
✅ Vercel account
✅ Everything verified working

### What's Next?

Module 1 starts with **AI Fundamentals** — understanding how LLMs and AI tools work before you start coding.

Ready to continue?`,
        keyPoint: "You've built your complete development environment. From here, it's all about learning to code.",
      },
    ],
  },
  kids: {
    moduleId: 1,
    moduleName: "Module 1: Setup & Accounts",
    totalDuration: 120,
    steps: [
      {
        id: 0,
        title: "Walkthrough Overview",
        type: "lesson",
        duration: 5,
        difficulty: "easy",
        xpReward: 50,
        content: `You're about to level up your coding skills! But first, we need to set up your **development environment** — think of it like getting your character's gear before the game starts.

By the end of this module, you'll have:
- ✅ Node.js (the engine that runs your code)
- ✅ Cursor (your AI-powered code editor)
- ✅ Claude Code (your AI assistant for building)
- ✅ GitHub (where you save your code)
- ✅ Supabase (your app's database)
- ✅ Vercel (to share your app online)

**Time estimate:** 2 hours
**Difficulty:** 🟢 Easy (lots of copy-paste, mostly clicking)

Let's gear up! 🚀`,
        keyPoint: "Setup can feel boring, but it's the difference between 'ready to code' and 'stuck troubleshooting.' We got this!",
      },
      {
        id: 1,
        title: "The Toolbelt Map 🛠️",
        type: "lesson",
        duration: 15,
        difficulty: "easy",
        xpReward: 75,
        content: `Here's all the tools you'll use, what they do, and when you'll use them:

| Tool | What it does | First used |
|------|-------------|-----------|
| **Node.js** | Runs JavaScript code on your computer | Module 4 |
| **Cursor** | AI code editor with real-time suggestions | Module 4 |
| **Claude Code** | Ask it to build stuff, it writes code for you | Module 5 |
| **GitHub** | Saves your code (like Google Drive for devs) | Module 9 |
| **Supabase** | Your app's database (where data lives) | Module 7 |
| **Vercel** | Puts your app on the internet for everyone | Module 10 |

### Two Ways to Build Code

**Cursor (typing):**
- You write some code
- AI suggests what comes next (like autocomplete on steroids)
- You're the driver

**Claude Code (talking):**
- You say: "Make me a login form"
- AI writes the whole thing
- You review and customize
- AI is the driver

### The Big Picture

Write code (Cursor) → Make it look good → Add a database (Supabase) → Save on GitHub → Deploy on Vercel 🚀`,
        keyPoint: "You're going to use all these tools by Module 10. Each one has a specific job.",
      },
      {
        id: 2,
        title: "Terminal 101 💻",
        type: "lesson",
        duration: 5,
        difficulty: "easy",
        xpReward: 50,
        content: `## What's a Terminal?

A **terminal** is like a text-based version of your computer. Instead of clicking buttons, you type commands.

Don't worry — all commands in this course are **copy-paste**. No memorizing!

### Opening a Terminal

**On Mac:**
1. Press Cmd+Space (Spotlight)
2. Type "Terminal"
3. Press Enter

**On Windows:**
1. Press Win+R
2. Type "powershell"
3. Press Enter

You'll see a prompt (\`$\` or \`>\`) which means: "I'm ready for your command!"

### That's It!

The terminal is just another way to talk to your computer. We'll only use a few simple commands, all copy-paste.`,
        keyPoint: "The terminal looks scary but it's just text. Copy-paste the commands, press Enter, done.",
      },
      {
        id: 3,
        title: "Install Node.js ⚙️",
        type: "checkpoint",
        duration: 10,
        difficulty: "easy",
        xpReward: 100,
        content: `Node.js is the engine that runs JavaScript on your computer (not just in a web browser).

### Follow Along

**1. Go to** [https://nodejs.org](https://nodejs.org)

**2. Click the big green "LTS" button**
(LTS = "Long-Term Support" = the stable, safe version)

**3. Run the installer**
Follow the prompts. Accept all the defaults.

**4. Verify it worked**
Open a terminal and copy-paste this:`,
        codeBlock: {
          language: "bash",
          code: "node --version\nnpm --version",
        },
        keyPoint: "Node.js is like the engine for your car — you need it before anything else works.",
        challenge: {
          description: "Verify Node.js installed ✓",
          action: "Open terminal + run: node --version",
          successCriteria: "See a version number like v22.12.0",
        },
        quiz: {
          question: "🎯 Node.js is...",
          options: [
            "A JavaScript engine that runs on your computer",
            "A video game",
            "A website builder",
            "A database",
          ],
          correctAnswer: 0,
          explanation: "Exactly! Node.js lets you run JavaScript anywhere, not just in web browsers. That's your superpower for this course! 🚀",
        },
      },
      {
        id: 4,
        title: "Install Cursor 🎨",
        type: "checkpoint",
        duration: 10,
        difficulty: "easy",
        xpReward: 75,
        content: `Cursor is your **AI-powered code editor**. It's like VS Code but with AI built in.

### Follow Along

**1. Go to** [https://cursor.com](https://cursor.com)

**2. Click "Download"** and pick your OS (Mac or Windows)

**3. Run the installer** and follow the prompts

**4. Open Cursor and sign in** (use GitHub or email — we're setting up GitHub next!)

**5. Explore the welcome screen**
This is where you'll spend most of your time coding.

You're done! Cursor is ready to go. ✅`,
        keyPoint: "Cursor is your main tool for writing code. You'll spend a lot of time in here.",
      },
      {
        id: 5,
        title: "Install Claude Code 🤖",
        type: "checkpoint",
        duration: 10,
        difficulty: "easy",
        xpReward: 75,
        content: `Claude Code is your **terminal AI assistant**. Ask it complex tasks, and it builds them for you.

### Follow Along

**1. Go to** [https://claude.com/download](https://claude.com/download)

**2. Follow the install instructions** for your OS

**3. Verify it installed**
Open a terminal and copy-paste:`,
        codeBlock: {
          language: "bash",
          code: "claude --version",
        },
        keyPoint: "Claude Code is like having an expert developer on call. We'll use it starting in Module 5.",
      },
      {
        id: 6,
        title: "GitHub: Save Your Code 💾",
        type: "checkpoint",
        duration: 10,
        difficulty: "easy",
        xpReward: 75,
        content: `## Create Your Accounts

You need three accounts. **Use the same email for all three** to keep things organized.

### GitHub ([github.com](https://github.com))

GitHub is like Google Drive for code. It saves your work and lets you share it.

**1. Go to** [https://github.com/signup](https://github.com/signup)

**2. Enter your email** and create a password

**3. Choose a username** (it's public, so keep it professional — like "alex-coder" not "xXswag420Xx")

**4. Verify your email** (GitHub sends a confirmation link)

**Done!** You'll use GitHub starting in Module 9. ✅`,
        keyPoint: "Your GitHub username is like your developer portfolio. Make it something you'd be proud to show to employers.",
      },
      {
        id: 7,
        title: "Supabase: Your Database 🗄️",
        type: "checkpoint",
        duration: 8,
        difficulty: "easy",
        xpReward: 50,
        content: `Supabase is your app's database — where all the data lives (user accounts, posts, scores, etc.).

**1. Go to** [https://supabase.com](https://supabase.com)

**2. Click "Sign up"**

**3. Sign up with GitHub** (easiest) or email

**4. Verify your email**

**Done!** We'll dive into Supabase in Module 7. ✅`,
        keyPoint: "Supabase is where your app's data lives. Think of it as the 'brain' of your app.",
      },
      {
        id: 8,
        title: "Vercel: Deploy Online 🚀",
        type: "checkpoint",
        duration: 8,
        difficulty: "easy",
        xpReward: 50,
        content: `Vercel is how you put your app on the internet. One button, and boom — everyone can see your app!

**1. Go to** [https://vercel.com/signup](https://vercel.com/signup)

**2. Sign up with GitHub** (recommended)

**3. Go to settings** and verify GitHub is connected
(Vercel needs permission to access your code)

**Done!** Your app will live on the internet thanks to Vercel. ✅`,
        keyPoint: "Vercel makes deploying as easy as clicking a button. No complicated servers to manage.",
      },
      {
        id: 9,
        title: "The Budget: Free vs. Paid 💰",
        type: "lesson",
        duration: 10,
        difficulty: "easy",
        xpReward: 50,
        content: `Here's the real talk: what's free, and when does it cost money?

### What's Free (All You Need)

| Tool | Free Tier | Upgrade Cost |
|------|----------|-------------|
| Node.js | Always free | N/A |
| GitHub | Unlimited repos | N/A |
| Supabase | 500MB database | $50+/month (you won't hit this) |
| Vercel | Unlimited deployments | Only extra bandwidth |
| Cursor | 2 AI suggestions/day | $20/month for unlimited |
| Claude Code | Free trial | $5-20/month (depends on usage) |

### You Can Complete This ENTIRE Course for FREE

Seriously. All free tiers are generous enough. AI editors cost a bit if you use them a ton, but most learners stay under $10/month.

### How to Avoid Surprise Bills

1. ✅ Start with free tiers (don't upgrade)
2. ✅ Check your usage weekly (takes 2 min)
3. ✅ Set spending alerts if the tool offers them

That's it!`,
        keyPoint: "This course is genuinely free. You don't need to pay anything to learn everything.",
      },
      {
        id: 10,
        title: "Final Boss: Verification ✨",
        type: "checkpoint",
        duration: 15,
        difficulty: "medium",
        xpReward: 100,
        content: `Let's make sure everything actually works with a quick hello-world test.

### Step 1: Create a folder

Open a terminal and copy-paste:`,
        codeBlock: {
          language: "bash",
          code: "mkdir vibe-hello-world\ncd vibe-hello-world",
        },
        keyPoint: "You just used your first terminal commands! You can create folders and navigate like a pro.",
      },
      {
        id: 11,
        title: "Level Complete! 🎉",
        type: "quiz",
        duration: 5,
        difficulty: "easy",
        xpReward: 150,
        content: `## Congratulations! You've Unlocked Module 1!

You now have your full development environment set up:

✅ Node.js (the engine)
✅ Cursor (code editor)
✅ Claude Code (AI assistant)
✅ GitHub account (code storage)
✅ Supabase account (database)
✅ Vercel account (deployment)

**You're officially ready to start coding!**

### What's Next?

Module 1: **AI Fundamentals**
Learn how LLMs and AI actually work before you start building.

**Let's go level up!** 🚀`,
        keyPoint: "You've built your entire development environment. That's the hardest part. Everything from here is about learning to code!",
      },
    ],
  },
};

export const module1Steps: Record<Version, ModuleStepSequence> = {
  adult: {
    moduleId: 2,
    moduleName: "Module 1: AI Fundamentals & How Models Actually Work",
    totalDuration: 420,
    steps: [
      {
        id: 0,
        title: "What \"vibe coding\" really means (done well)",
        type: "lesson",
        duration: 15,
        difficulty: "easy",
        xpReward: 50,
        content: `Open by reclaiming the term. "Vibe coding" was originally coined for a hands-off style — accept whatever the AI produces, don't read the code, just go with the vibes. That's fine for a throwaway toy, but it's the *opposite* of what this course teaches, and it's exactly why skeptics dismiss AI coding.

**This course teaches vibe coding done well:** move fast with AI *and* stay in control. You direct, the AI drafts, and you read, test, and understand everything before it ships. Same speed, none of the recklessness. The single rule that separates the two, and runs through every module: **you are the engineer; the AI is the assistant — never ship what you can't explain.**

---`,
      },
      {
        id: 1,
        title: "What an LLM actually is",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `A large language model (LLM) is a program trained on an enormous amount of text — books, websites, documentation, and billions of lines of code. From all that text it learned one core skill: **given some text, predict what comes next.**

That's it. It's a very sophisticated autocomplete. When you ask it to "write a function that sorts a list," it isn't looking the answer up or reasoning like a human engineer — it's predicting, one piece at a time, the sequence most likely to follow your request, based on patterns it saw in training.

**Why this matters:** the model produces the *most likely* answer, not the *verified correct* one. For common problems, likely and correct usually match — which is why it feels magical. But they're not guaranteed to, and knowing the difference is the single most important idea in the course.

**Key terms (plain-English glossary):**

- **Token** — the small chunk of text the model reads and writes (roughly a word or part of one).
- **Prompt** — the input you give the model (your request plus any context).
- **Context window** — the maximum text (prompt + response) the model can "see" at once. Everything outside it is invisible.
- **Training data** — the text the model learned from. It has a cutoff date; the model doesn't inherently know anything newer.

**Quick check:** In your own words, what is the one thing an LLM is fundamentally doing when it writes code?

---`,
      },
      {
        id: 2,
        title: "How an LLM generates code",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Walk through what happens when you ask for something:

1. **You write a prompt** — e.g. "Write a Python function that checks if an email is valid."
2. **The model reads it as tokens** and predicts the next token, then the next — building the answer left to right.
3. **Each prediction is shaped by** the patterns it learned *and* everything currently in the context window (your prompt, the conversation, any code you shared).
4. **It stops** when it predicts the response is complete.

Two consequences fall out of this mechanism:

- **Context is everything.** The model only knows its training + what's in the context window right now. If you don't tell it your app uses Next.js and Supabase, it guesses — often wrongly. Good context is why prompt engineering (Module 2) is a real skill.
- **It's probabilistic, not deterministic.** Ask twice, get two different answers. Neither is "the" answer; both are plausible completions. A feature (creativity) and a risk (inconsistency).

> **Instructor demo:** Run the same request twice and show the two outputs; then add one line of context ("we're using TypeScript") and show how the answer changes. Makes "context is everything" concrete in three minutes.
> 

**[SCREENSHOT PLACEHOLDER: Prompt Context Effect]**

**What this screenshot should show:**
- Left side: A prompt like "Write a function to validate email" run in Claude/ChatGPT
- Middle: The same prompt run again, showing a **different output** (different implementation)
- Right side: The prompt run a third time with one line added: "We're using TypeScript and Next.js"
  - Shows how the output **changes significantly** based on context
- All three outputs visible for comparison
- Proves: context is everything; same prompt + different context = different output

---`,
      },
      {
        id: 3,
        title: "Where LLMs fail",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `The most important lesson in the module. Because the model outputs *likely* text, it fails in specific, predictable ways — teach learners to name each:

- **Hallucination** — invents things that look right but aren't: a function or library that doesn't exist, a made-up parameter, a plausible-but-false explanation, stated with total confidence. *Confidence is not correctness.*
- **Outdated knowledge** — training has a cutoff; it may not know a library's newest version or a breaking change, and will give last year's approach as if current.
- **Context limits** — anything outside the window is invisible; in a big codebase it may reinvent what already exists.
- **Lost detail in long chats** — earlier instructions fall out of view; it "forgets" a constraint you set 30 messages ago.
- **Confident wrong answers** — the through-line: the model has no built-in sense of certainty and rarely says "I'm not sure" unless asked.

**The takeaway:** these aren't bugs to fix — they're inherent to how the technology works. A skilled AI-assisted developer *expects* them and has habits to catch them. That habit is verification (Lesson 1.5).

**[SCREENSHOT PLACEHOLDER: Hallucination Example]**

**What this screenshot should show:**
- A prompt asking to use a specific library (e.g., "Use the 'fancyString' library to validate email")
- AI response that confidently uses \`fancyString.validate()\` or similar
- **Key proof:** Show that 'fancyString' library does NOT actually exist
  - Screenshot of npm.org search or GitHub showing no results
  - OR a terminal showing "npm install fancyString" → "404 not found"
- Shows: AI invented a plausible library that doesn't exist, with full confidence
- Demonstrates: hallucination in action

---`,
      },
      {
        id: 4,
        title: "AI across the development lifecycle",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `AI helps at every stage — but how much you should trust it varies. Introduce this map (used in every later module):

| Stage | How AI helps | Trust level |
| --- | --- | --- |
| Planning & specs | Brainstorm, draft specs, break work into tasks | High — easy to review, low risk |
| Writing code | Generate functions, components, boilerplate | Medium — must read and test it |
| Debugging | Explain errors, suggest fixes | Medium — verify the fix is correct |
| Learning / explaining | Explain unfamiliar code or concepts | Medium — cross-check facts |
| Security & production | Suggest hardening, spot issues | Low — always verify; stakes are high |

The pattern: **the higher the stakes and the harder it is to eyeball correctness, the more you verify.** Drafting a spec? Skim and move on. Deploying auth to production? Check everything.

---`,
      },
      {
        id: 5,
        title: "When to trust vs. verify",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 3 — judgment. A simple framework for any AI output:

**Trust more freely when:** the task is common and well-documented; you can immediately test it; the cost of being wrong is low (a throwaway script).

**Verify carefully when:** it involves a specific/newer tool or version (outdated-knowledge risk); it references a library/function you can't confirm exists (hallucination risk); the output is long or spans many files (context-limit risk); the stakes are high (security, payments, data, production).

**How to verify (the beginner's toolkit):** run the code; read it line by line and ask the AI to explain anything unclear; confirm referenced libraries/functions exist in the official docs; test edge cases, not just the happy path.

> **Guiding principle for the whole course:** *You are the engineer; the AI is the assistant.* You stay accountable for every line you ship, whether you typed it or the model did.
> 

## Hands-on activity (~30 min, folded in)

**"Catch the hallucination."** Learners get three AI-generated snippets (instructor-provided): one works, one references a nonexistent library, one uses an outdated approach. They decide for each: *trust, or verify further — and why?*, then check the answer key. Rehearses Objective 3.

**Snippet 1 (CORRECT):**
\`\`\`javascript
// Request: "Validate an email using regex"
function isValidEmail(email) {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}
\`\`\`
**Verdict:** ✅ TRUST — standard regex pattern, widely used, easy to test locally.

**Snippet 2 (HALLUCINATION):**
\`\`\`javascript
// Request: "Check if a password is strong using a library"
const PasswordValidator = require('passwordStrength-pro');

const validator = new PasswordValidator({
  minLength: 12,
  requireSymbols: true,
  requireNumbers: true,
});

function checkPassword(pwd) {
  return validator.isStrong(pwd);
}
\`\`\`
**Verdict:** ❌ VERIFY FIRST — 'passwordStrength-pro' doesn't exist on npm. AI hallucinated a plausible library name.

**Snippet 3 (OUTDATED):**
\`\`\`javascript
// Request: "Create a React component using Hooks"
import React from 'react';

class UserProfile extends React.Component {
  render() {
    return <div>User Profile</div>;
  }
}

export default UserProfile;
\`\`\`
**Verdict:** ⚠️ VERIFY — Works, but outdated. Modern React uses functional components + Hooks, not class components. AI gave last year's pattern.

**Learner Task:** For each snippet, decide: **TRUST** (use as-is) or **VERIFY** (check first) — and one sentence why.

**Answer Key (after learners attempt):**
1. TRUST — standard pattern, testable, no exotic dependencies
2. VERIFY — library doesn't exist (hallucination risk)
3. VERIFY — works but outdated (outdated-knowledge risk)

## Knowledge check (mapped to objectives)

**Objective 1 — Explain how LLMs work & fail (Quiz Q1-Q2):**
- Q1: "Fundamentally, an LLM generates code by..." ✅ Testing token prediction
- Q2: "Hallucination" means..." ✅ Testing failure mode understanding
- *Short written check (if not fully covered by quiz):* In 2–3 sentences explain to a non-technical friend how an AI writes code; name three failure modes with a one-line example each.

**Objective 2 — Capabilities/limits across the lifecycle (Quiz Q4):**
- Q4: "Which task requires the most careful verification?" ✅ Testing trust matrix understanding
- *Short written check (if not fully covered by quiz):* List three stages from the trust matrix (planning, writing code, debugging, learning, security/production) and whether each needs light or heavy verification.

**Objective 3 — Trust vs. verify (Quiz Q3 + Activity):**
- Q3: "Vibe coding done well" means..." ✅ Philosophy understanding
- Activity: "Catch the hallucination" ✅ Hands-on judgment calls
- *Scenario-based check:* For each scenario, decide *TRUST* or *VERIFY* and justify in one sentence:
  - (a) Asking AI to write a quick file-rename script for local use
  - (b) Asking AI to write code handling user login and password storage
  - (c) Asking AI to generate a function using a brand-new library released last month
  - (d) Asking AI to generate boilerplate for a standard login form (common task)

*Pass mark: 80%. Gates progress to Module 2.*

## Tools & alternatives (this module)

Tool-agnostic on purpose — the concepts apply to **any** AI coding assistant (Cursor, Claude Code, GitHub Copilot, and others). Learners install nothing yet; the default stack goes hands-on in Module 4. The same model can power different tools, so what you learn here about *how models behave* transfers everywhere.

## Key takeaways

- Vibe coding done well = fast *and* in control; never ship what you can't explain.
- An LLM predicts likely text; likely ≠ guaranteed-correct.
- Context is everything; the model only knows its training + the context window.
- Failures (hallucination, outdated knowledge, context limits, confident wrong answers) are inherent — expect them.
- Match verification effort to the stakes and how well-trodden the task is.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)`,
      },
    ]
  },
  kids: {
    moduleId: 2,
    moduleName: "Module 1: AI Fundamentals & How Models Actually Work",
    totalDuration: 420,
    steps: [
      {
        id: 0,
        title: "\"Vibe Coding\" Done Right 🎯",
        type: "lesson",
        duration: 15,
        difficulty: "easy",
        xpReward: 50,
        content: `You've probably heard the term "vibe coding" — it means using AI to code without really understanding what you're building. Just vibes. No checking. 

**That's the wrong way to do it.** 

In THIS course, we do "vibe coding done right": use AI to code *fast*, but stay in charge the whole time. You're the boss, the AI is your assistant. You tell it what to do, it suggests code, and then *you* read it and make sure it's good before it goes live.

**Golden Rule:** Never ship code you can't explain.

---`,
      },
      {
        id: 1,
        title: "What an AI Model Really Is",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Imagine this: you've read **millions** of books, seen **millions** of code examples, and learned one skill: *what word comes next?*

That's basically what AI is. It's a super-smart autocomplete. You ask it something, and it predicts, one piece at a time, the answer that matches your question best.

**Example:** If you say "Write a function that adds two numbers," the AI doesn't look up the answer or think it through like a human would. It predicts: "Hmm, after 'function,' people usually write a name... then parameters... then the logic." And it pieces it together word by word.

**Why you need to know this:** The AI gives you the most *likely* answer based on patterns it learned. Most of the time, likely = correct. But not always. And knowing the difference? That's your superpower.

**Quick terms:**

- **Token** — a tiny piece of text (like a word or part of a word)
- **Prompt** — what you ask the AI (your message)
- **Context window** — how much text the AI can "see" at once (everything else is invisible)
- **Training data** — the millions of texts it learned from (it has a cutoff date; it doesn't know stuff after that date)

**Your turn:** In your own words, what's the ONE thing an AI does when writing code?

---`,
      },
      {
        id: 2,
        title: "How AI Writes Code",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Here's the step-by-step:

1. **You type a prompt** — like "Write a function that checks if an email is valid"
2. **The AI reads your prompt** and predicts the next piece, then the next, then the next
3. **Each prediction depends on** what it learned *and* everything you just told it (your prompt, your conversation so far, any code you showed it)
4. **It stops** when it thinks the answer is done

**Two big takeaways:**

1. **Context is EVERYTHING.** If you don't tell the AI "I'm using React," it might guess wrong. Tell the AI *exactly* what you're working with, and it gets WAY better.

2. **It's random-ish.** Ask the AI the same question twice, you get two different answers. Both might be right, or one might be off. This is a feature (creativity!) and a bug (inconsistency!).

**Try this:** Ask an AI the same question twice and compare. Then tell it "I'm using TypeScript" and ask again. Watch how different the answers become. 🤯

**[SCREENSHOT PLACEHOLDER: Prompt Context Effect]**

**What this screenshot should show:**
- Left: A prompt like "Write a function to validate email" run in Claude/ChatGPT
- Middle: The same prompt run again, showing a **different output** (different code implementation)
- Right: The prompt run a third time with one added line: "We're using TypeScript and Next.js"
  - Shows how the output **changes significantly** based on context
- All three outputs visible for comparison
- **Proves:** context is everything; same question + different context = wildly different answers 🤯

---`,
      },
      {
        id: 3,
        title: "Where AI Gets Confused",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `This is the **most important lesson** because the AI fails in predictable ways. Know these, and you'll never get stuck:

**Hallucination:** The AI makes stuff up that sounds real.
- Example: "Use the \`superSort()\` function" — but \`superSort()\` doesn't exist. The AI sounds confident anyway.
- **Fix:** Always check that functions/libraries actually exist in the docs.

**Outdated knowledge:** The AI's training has a cutoff date. It doesn't know new stuff.
- Example: "Here's how you did X in React v16" — but you're using React v19, which works differently.
- **Fix:** Tell the AI your versions upfront.

**Forgot the prompt:** In long conversations, the AI forgets what you said earlier.
- Example: You said "make it pink" five messages ago, but it forgot and made it blue.
- **Fix:** Remind it or start a fresh conversation.

**Too much code:** When your file is HUGE, the AI can't see all of it.
- Example: The AI reinvents something that already exists in your code because it didn't "see" it.
- **Fix:** Show the AI the relevant part, not the whole file.

**Overconfident:** The AI never says "I don't know" unless you ask.
- Example: It gives you wrong code with TOTAL confidence. No hesitation.
- **Fix:** Always verify, especially on stuff you're unsure about.

**The truth:** These aren't bugs to fix. They're just how AI works. Skilled coders expect them and check their work. That's your job.

**[SCREENSHOT PLACEHOLDER: Hallucination Example]**

**What this screenshot should show:**
- A prompt asking to use a specific library (e.g., "Use the 'fancyString' library to validate email")
- AI response that confidently uses \`fancyString.validate()\` or similar
- **Key proof:** Show that 'fancyString' library does NOT actually exist
  - Screenshot of npm.org search showing no results
  - OR a terminal showing "npm install fancyString" → "404 not found"
- **Shows:** AI invented a plausible library that doesn't exist, with TOTAL confidence
- **Lesson:** Even when AI sounds 100% sure, it might be hallucinating 🚨

---`,
      },
      {
        id: 4,
        title: "What AI Is Good At vs. Bad At",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Not all coding tasks are equal. Some are perfect for AI, some need more of your brain:

| Task | How AI Helps | How Much to Trust |
| --- | --- | --- |
| Planning (breaking a project into steps) | Brainstorm with you, organize tasks | HIGH — easy to check |
| Writing code | Generate functions, boilerplate, components | MEDIUM — you gotta read it |
| Debugging (fixing broken code) | Suggest what's wrong, try fixes | MEDIUM — check if it works |
| Learning (explaining something) | Explain code or concepts | MEDIUM — double-check facts |
| Security & passwords | Spot vulnerabilities, secure stuff | LOW — always check, big stakes! |

**The pattern:** Harder to check = more you should verify.

Drafting a plan? Skim it and move on. Handling passwords? Read every line. 🔒

---`,
      },
      {
        id: 5,
        title: "Trust or Verify? (Making the Call)",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `This is the real skill: knowing when to trust AI and when to double-check.

**Trust the AI more when:**
- The task is super common (everyone does this)
- You can test it immediately
- It doesn't matter much if it's wrong (it's just for fun)

**Verify carefully when:**
- It uses a tool you're not familiar with (hallucination risk!)
- The task is new or the tool is brand new (outdated knowledge risk)
- It's a lot of code (might miss something)
- **The stakes are HIGH** (money, passwords, real users, anything important)

**How to verify:**
1. Run the code
2. Read it line by line (ask the AI to explain anything weird)
3. Check that functions/libraries actually exist in the official docs
4. Test it, not just once but with different inputs
5. If it feels fishy, ask the AI questions

**Golden Rule (seriously, tattoo this):** *You are the coder; the AI is your assistant.* You're responsible for every line you ship, whether you typed it or the AI did.

## Activity: Spot the AI Mistake! 🎯

Here are 3 code snippets an AI gave me. For each one, decide:
- ✅ **TRUST** — use it as-is
- ⚠️ **VERIFY** — check this first
- 🚨 **WRONG** — don't use this

Then check the answer key below!

**Snippet 1** — Request: "Validate an email using regex"

\`\`\`javascript
function isValidEmail(email) {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}
\`\`\`

**Your call:** ✅ TRUST / ⚠️ VERIFY / 🚨 WRONG?

**Snippet 2** — Request: "Check if a password is strong using a library"

\`\`\`javascript
const PasswordValidator = require('passwordStrength-pro');

const validator = new PasswordValidator({
  minLength: 12,
  requireSymbols: true,
  requireNumbers: true,
});

function checkPassword(pwd) {
  return validator.isStrong(pwd);
}
\`\`\`

**Your call:** ✅ TRUST / ⚠️ VERIFY / 🚨 WRONG?

**Snippet 3** — Request: "Create a React component using Hooks"

\`\`\`javascript
import React from 'react';

class UserProfile extends React.Component {
  render() {
    return <div>User Profile</div>;
  }
}

export default UserProfile;
\`\`\`

**Your call:** ✅ TRUST / ⚠️ VERIFY / 🚨 WRONG?

### Answer Key 🔑

**Snippet 1:** ✅ **TRUST** — standard regex pattern, widely used, easy to test locally. Confidence: HIGH.

**Snippet 2:** ⚠️ **VERIFY** — the library \`passwordStrength-pro\` **doesn't exist on npm**. The AI hallucinated a plausible library name! When you try to \`npm install\` it, you get "404 not found." **This is the hallucination failure mode in action.** Confidence: NONE until verified.

**Snippet 3:** ⚠️ **VERIFY** — it works, but it's outdated. Modern React uses **functional components + Hooks**, not class components. This is the "outdated knowledge" failure mode. The AI gave you last year's pattern. Confidence: MEDIUM, but needs modernization.

**The lesson:** AI sounds confident about all three. But Snippet 2 is invented, and Snippet 3 is old. **Your job is to catch this, not the AI's job to warn you.** That's why you verify. 🔍 

## Knowledge Check (Mapped to Your Learning Objectives)

**Objective 1 — Explain how AI works & fails:**
- Quiz questions Q1-k1-2 test this
- **Written check:** In 2–3 sentences, explain to a 10-year-old how an AI writes code. Then name 3 failure modes (hallucination, outdated knowledge, forgot your prompt) with one-line examples.

**Objective 2 — What AI is good/bad at:**
- Quiz question Q1-k1-4 tests this
- **Written check:** For each stage below, should you trust the AI a lot or verify carefully?
  - Planning what to build
  - Writing code
  - Fixing broken code
  - Handling passwords/security

**Objective 3 — Trust vs. verify:**
- Quiz question Q1-k1-3 tests this
- Activity "Spot the AI Mistake!" gives you practice
- **Scenario check:** For each, decide **TRUST** or **VERIFY** in one sentence why:
  - (a) Quick script to rename files on your computer
  - (b) Code that handles user login and password storage
  - (c) A function using a brand-new library from last month
  - (d) Boilerplate for a normal login form (everyone builds these)

## Tools & Alternatives (This Module)

**This module is tool-agnostic on purpose.** The concepts (how LLMs work, why they fail, when to trust/verify) apply to **any** AI coding assistant — Cursor, Claude Code, GitHub Copilot, ChatGPT, and others.

You haven't installed anything yet. That happens in Module 4. The goal here: understand *how AI thinks* so you can use it wisely, no matter which tool you pick later.

**Key idea:** the same mental model works everywhere. Once you get hallucination, you spot it in any tool.

## Key Takeaways

- AI is super-smart autocomplete, not magic 🤖
- It predicts likely text, but likely ≠ always correct
- It messes up in predictable ways (hallucination, outdated knowledge, forgetfulness)
- Match how much you verify to how risky the task is
- **You're the coder. AI is your sidekick.**

**Next:** Module 2 — Talking to AI Like a Pro (Prompt Engineering!)`,
      },
    ]
  },
};

export const module2Steps: Record<Version, ModuleStepSequence> = {
  adult: {
    moduleId: 3,
    moduleName: "Module 2: Prompt Engineering for Developers",
    totalDuration: 480,
    steps: [
      {
        id: 1,
        title: "Why the prompt is your primary tool",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `In traditional coding you type the exact instructions the computer follows. In AI-assisted coding you *describe* what you want and the model produces the instructions. The prompt is now your main tool, and its quality determines the quality of the code you get back.

Tie back to Module 1: because the model outputs the *most likely* completion given your prompt plus context, a vague prompt yields a vague, generic, often-wrong answer, while a precise prompt narrows the model toward exactly what you need. Prompting isn't "chatting" — it's specifying a task precisely enough that the *likely* answer is also the *correct* one.

**Beginner reframe:** treat the AI like a brilliant but literal new teammate who has never seen your project. It knows general programming, but nothing about *your* app, stack, or intent unless you tell it.

---`,
      },
      {
        id: 2,
        title: "The anatomy of a good prompt",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `Teach the five ingredients of a strong coding prompt:

1. **Task** — what you want, as a clear instruction. ("Write a function that…")
2. **Context** — language, framework, versions, relevant existing code. ("In a Next.js + TypeScript app using Supabase…")
3. **Constraints** — rules the solution must follow. ("Use async/await, no external libraries, handle empty input.")
4. **Examples** — a sample input and expected output when behavior is specific. ("For [3,1,2] return [1,2,3].")
5. **Output format** — how you want the answer. ("Return only the function, with brief comments.")

Contrast weak vs. strong so the difference is visceral:

- **Weak:** "make a login form" → the model guesses stack, styling, validation, and is probably wrong on all three.
- **Strong:** "Create a login form component in Next.js (App Router) + TypeScript using Tailwind. Fields: email, password. Validate email format and require a non-empty password. On submit, call \`signInWithPassword\` from our Supabase client. Show inline errors. Return only the component."

The strong prompt isn't longer for its own sake — every clause removes a wrong guess.

> **Instructor demo:** Run the weak and strong prompts live, side by side. The output gap sells the lesson in two minutes.
> 

**[SCREENSHOT PLACEHOLDER: Weak vs. Strong Prompt Outputs]**

**What this screenshot should show:**
- Left panel: Claude/ChatGPT with weak prompt "make a login form"
  - Shows the generated output (likely missing framework, validation, styling specifics)
- Right panel: Same tools with strong five-ingredient prompt specifying Next.js, TypeScript, Tailwind, Supabase, validation rules
  - Shows the generated output (correctly uses specified tools and includes all constraints)
- Side-by-side comparison makes the difference visceral
- Proves: precision in prompt structure directly improves code quality

---`,
      },
      {
        id: 3,
        title: "Decomposing a task into promptable steps",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 2. Beginners ask the AI to "build the whole app" in one prompt and get an unmaintainable, half-broken result. The fix is decomposition: break a big goal into small, ordered, individually-promptable steps.

**Why smaller is better:** each step is easier to specify, easier to verify (test before moving on), and easier to fix. It's the same skill as planning software (Module 3), applied at the prompt level.

**Worked example — "build a to-do app" becomes:**

1. Set up the data model (a \`todos\` table: id, text, done, created_at).
2. A component that displays a list of to-dos.
3. A form to create a new to-do.
4. Wire the form to save to the database.
5. Mark a to-do done.
6. Delete.

Each line is a focused prompt you complete and confirm before the next. Teach the habit: **prompt → verify → next**, never **prompt once → hope**.

---`,
      },
      {
        id: 4,
        title: "Iterating: critique and refine",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 3. The first response is rarely perfect — that's normal. Skilled prompting is a loop:

1. Read the output critically (don't just paste it in). Does it do what you asked? Match your context and constraints?
2. Identify the specific gap. Wrong library? Missed edge case? Ignored your framework?
3. Refine the prompt — add the missing context or constraint rather than "that's wrong, try again." Precise feedback gets precise fixes.
4. Repeat until it meets the bar.

**Effective vs. ineffective feedback:** ineffective — "that didn't work, fix it." Effective — "That uses the Pages Router, but we're on the App Router — rewrite it as a server component and move the data fetch out of the client."

Also teach *when to stop and re-scope*: if three rounds haven't converged, the prompt was under-specified or the task too big — go back to decomposition (Lesson 2.3) instead of piling on patches.

**[SCREENSHOT PLACEHOLDER: Refinement Loop Exchange]**

**What this screenshot should show:**
- Panel 1: Initial AI response (e.g., a function using Pages Router when the app uses App Router)
  - Visible code mistake or framework mismatch
- Panel 2: User's refinement prompt (specific feedback naming the gap)
  - Example: "We're using Next.js App Router, not Pages Router. Rewrite this as a server component with data fetch outside the component."
- Panel 3: AI's corrected response (now uses correct framework and structure)
- Shows: how precise feedback leads to immediate, correct fixes
- Demonstrates: the iterative loop and when it converges vs. when to re-scope

---`,
      },
      {
        id: 5,
        title: "Prompting across the default stack",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Connect prompting to the tools you'll use, concept-first:

- **In-editor (Cursor, Module 4):** prompts operate on open files; the tool pulls in surrounding code as context. You'll lean on this for focused, in-place changes.
- **Agentic (Claude Code, Module 5):** prompts describe a larger goal and the agent plans and edits across the whole repo. Higher-level, plan-style prompts.

Same five ingredients for both — the difference is scope, not technique.

---`,
      },
      {
        id: 6,
        title: "Prompting with images (multimodal)",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 4 and unlocks a faster path than describing everything in words. Modern AI coding tools are **multimodal** — they can read images — so a picture often beats a paragraph.

**What you can hand the AI:**

- A **design mockup or screenshot** of a UI you want built ("build this") — it infers layout, spacing, hierarchy.
- A **screenshot of a broken screen** or an error ("why does this look wrong / fix it").
- A **diagram or whiteboard photo** of a data model or flow.
- A **competitor/app screenshot** as a style reference ("match this look").

**How (as of 2026 — check current docs):** in **Claude Code**, paste a screenshot with Ctrl+V (Mac), drag-and-drop in the desktop app, or give a file path; in **Cursor**, drag the image into the agent/chat.

**Why it's powerful:** the model reads visual structure directly, so it's far faster and more accurate than translating a design into text. Then iterate: "compare your result to the mockup and fix the differences." You'll use this hard in Module 6 (match a design) and Module 8 (debug from a screenshot).

> **Aside — voice / dictation:** you can also *speak* your prompts. Built-in dictation (macOS) or a tool like Whisper turns talk into text — handy for long, exploratory prompts where typing is the bottleneck. Same prompt-engineering rules apply; you're just inputting faster.
> 

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

## Hands-on activity (~40 min, folded in)

**"Prompt rewrite gauntlet."** Learners rewrite five weak prompts using the five-ingredient anatomy, run both (weak and strong), and compare outputs. For each, they submit: rewritten prompt, before/after outputs, and one sentence on what improved. Rehearses Objectives 1 and 3.

### Five weak prompts to rewrite:

**WEAK PROMPT 1:** "make a chart"

**Rewrite with five ingredients:**
\`\`\`
Create a bar chart component in React using the Recharts library. 
It should display monthly sales data (months on x-axis, revenue in USD on y-axis). 
Use TypeScript and style with Tailwind CSS. 
The data prop should accept: [{month: "Jan", revenue: 15000}, {month: "Feb", revenue: 18000}, ...]. 
Handle the case where data is empty (show a "No data" message). 
Return only the component with no explanations.
\`\`\`

**What improved:** specifics on library (Recharts), data structure, styling, edge cases, and exact output format.

**WEAK PROMPT 2:** "fix my code"

**Rewrite with five ingredients:**
\`\`\`
I have a React component that's supposed to fetch user data from a Supabase table called "users" and display it in a list. 
The code currently has a bug: it's fetching on every render instead of just once. 
Stack: Next.js App Router, TypeScript, React Hooks.
Fix the code by adding useEffect with the correct dependency array.
Context: we use async/await and handle errors with try/catch.
Return only the corrected component, no explanation.
\`\`\`

**What improved:** named the exact bug ("fetching on every render"), gave context (Supabase, Next.js), specified the fix strategy (useEffect dependency), and set expectations for format.

**WEAK PROMPT 3:** "add auth"

**Rewrite with five ingredients:**
\`\`\`
I'm building a Next.js + TypeScript app. 
I need a protected route that only logged-in users can access. 
Use Supabase for authentication (email/password). 
Create: 1) A middleware that checks if the user is authenticated, 2) A login page at /auth/login, 3) A protected page at /dashboard that redirects to /auth/login if not authenticated.
Use the Supabase client library.
Return the three files: middleware.ts, auth/login/page.tsx, dashboard/page.tsx.
\`\`\`

**What improved:** named the exact stack, broke down what "add auth" means (3 specific pieces), specified the library, and listed exact files to create.

**WEAK PROMPT 4:** "build a dashboard"

**Rewrite with five ingredients:**
\`\`\`
Build a user dashboard in React (Next.js App Router, TypeScript, Tailwind CSS).
It should display:
- A greeting card with the user's name (fetched from Supabase)
- A stats card showing total posts (count)
- A recent posts list (title, date, preview text)
Data comes from a Supabase table "posts" where each row has: id, user_id, title, body, created_at.
Show a loading state while fetching.
If the user has no posts, show "No posts yet."
Return only the component code with comments.
\`\`\`

**What improved:** named stack, listed exact UI elements, specified data source and schema, covered edge cases (empty, loading), and set output expectations.

**WEAK PROMPT 5:** "make it faster"

**Rewrite with five ingredients:**
\`\`\`
My Next.js page is slow. It fetches a list of 1000 products from Supabase on every page load.
I want to:
1) Cache the data server-side for 1 hour (using Next.js revalidation).
2) Show a loading skeleton while the data fetches.
3) Use React's Suspense boundary if applicable.
Stack: Next.js App Router, TypeScript, React Server Components.
The current data fetch is: const { data } = await supabase.from('products').select('*').
Rewrite it with caching and show the component using the cached data.
Return the updated code only.
\`\`\`

**What improved:** identified the exact bottleneck (fetch on every load), named the constraints (1000 rows, 1-hour cache), specified the solution (Next.js revalidation + Suspense), and gave context (RSC, SSR patterns).

### Activity instructions for learners:

1. **For each of the five weak prompts above:**
   - Paste the weak prompt into Claude Code or ChatGPT
   - Run it and note what the output is missing or gets wrong
   - Now paste the rewritten prompt
   - Run it and compare
   - Write one sentence: "What was better in the strong version?"

2. **Submit:**
   - Your rewritten version of at least 3 of the 5 prompts
   - Side-by-side before/after outputs for at least one pair
   - For each rewrite, one sentence on the improvement

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

**Scenario-based judgment checks (all objectives):**

For each scenario, decide which approach is best and explain why in one sentence:

- (a) You're building a form component. Do you: write a detailed text description of layout, or paste a mockup screenshot? Why?
- (b) You want the AI to write a complex feature. Do you: ask in one huge prompt, or break it into 5 smaller prompts? Why?
- (c) The AI's code uses an outdated library version. Do you: say "that's wrong, fix it" or write specific feedback naming the library and version? Why?
- (d) The AI's output is close but has one small bug. Do you: re-scope the whole task or give targeted feedback on the bug? Why?

*Pass mark: 80%. Gates progress to Module 3.*

## Tools & alternatives (this module)

Tool-agnostic — the five ingredients, decomposition, and the refine loop work in **any** assistant (Cursor, Claude Code, Copilot, ChatGPT). Some tools add conveniences (Cursor's automatic file context, Claude Code's repo-wide awareness) that reduce how much context you type by hand — they don't change the underlying skill.

## Key takeaways

- The prompt is your primary tool; precision in equals quality out.
- A strong prompt has five parts: task, context, constraints, examples, output format.
- Decompose big goals into small, ordered, verifiable steps: prompt → verify → next.
- Refine with specific feedback, not "try again"; re-scope if it won't converge.
- The skill transfers across every AI tool — scope changes, technique doesn't.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)`,
      },
    ]
  },
  kids: {
    moduleId: 3,
    moduleName: "Module 2: Prompt Engineering for Developers",
    totalDuration: 480,
    steps: [
      {
        id: 1,
        title: "Your Prompt Is Your Superpower 🦸",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `In regular coding, you type exact commands. In AI coding, you *describe* what you want, and the AI writes the instructions. Your prompt is now your main tool.

Here's the truth: **vague prompt = vague code. Specific prompt = perfect code.**

Think of the AI like a brilliant new teammate who's never seen your project before. It knows how to code in general, but nothing about *your* app unless you tell it.

---`,
      },
      {
        id: 2,
        title: "The Five-Ingredient Secret Sauce",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `Every good prompt has these five things:

1. **Task** — What do you want? (Be super clear!)
   - "Write a function that…"
   - "Create a component that…"

2. **Context** — What's your setup?
   - "I'm using React + TypeScript"
   - "I have a Supabase database with a \`users\` table"

3. **Constraints** — What are the rules?
   - "Use only the standard library"
   - "Make it work on mobile"
   - "Handle when the data is empty"

4. **Examples** — Show, don't tell
   - If input is \`[3, 1, 2]\`, output should be \`[1, 2, 3]\`
   - If the user is not logged in, redirect to \`/login\`

5. **Output format** — How should I return it?
   - "Just the code, no explanation"
   - "Explain each line as you go"

**Weak prompt:** "Make a login form"
- Vague. The AI has to guess: What framework? What styles? What validation?

**Strong prompt:** "Create a login form component in React using TypeScript and Tailwind. It should have email and password fields. Validate that email looks like an email and password isn't empty. When clicked, call the \`logIn\` function from our API. If there's an error, show it under the button. Return only the component code."

See the difference? The strong prompt removes all the guessing.

**[SCREENSHOT PLACEHOLDER: Weak vs. Strong Prompt Outputs]**

**What this screenshot should show:**
- Left panel: Claude/ChatGPT with weak prompt "make a login form"
  - Shows the generated output (likely missing framework details, validation, styling)
- Right panel: Same tools with strong five-ingredient prompt specifying React, TypeScript, Tailwind, validation, error handling
  - Shows the generated output (correctly uses all specified tools and constraints)
- Side-by-side comparison makes the difference clear
- **Proves:** precision in your prompt = way better code ✨

---`,
      },
      {
        id: 3,
        title: "Break Big Stuff Into Small Pieces",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `Beginners ask AI to "build the whole app" in one prompt. Mistake! You get spaghetti code.

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

---`,
      },
      {
        id: 4,
        title: "Iterate and Fix Your Prompts",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `The first answer is usually *not* perfect. That's normal.

**The fix loop:**

1. Read the code critically. Does it do what you asked?
2. Spot the problem. Wrong tool? Ignored your constraint? Missed something?
3. Tell the AI *specifically* what to fix (not just "try again")
   - Bad: "That's wrong, fix it."
   - Good: "That uses the old Login Router, but I need the new App Router — rewrite it as a server component."
4. Repeat until it's good.

**Also:** If you've told the AI the same thing 3 times and it's still wrong, stop. The prompt is broken, not the AI. Go back to decomposition (break it into smaller pieces) instead of hammering the same prompt.

**[SCREENSHOT PLACEHOLDER: Refinement Loop Exchange]**

**What this screenshot should show:**
- Panel 1: Initial AI response (e.g., code using React Class Components when you want Hooks)
  - Shows a clear framework mismatch or missing constraint
- Panel 2: User's refinement prompt with specific feedback
  - Example: "I need functional components with Hooks, not class components. Rewrite using useState for the form state."
- Panel 3: AI's corrected response (now uses Hooks correctly)
- **Shows:** how specific feedback leads to immediate fixes
- **Demonstrates:** the iteration loop working in action 🔄

---`,
      },
      {
        id: 5,
        title: "Prompting in Your Tools",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `The technique is the same everywhere, but the scope changes:

**In Cursor (editor mode):** 
- Your prompt works on the file you have open
- The AI sees the code around your cursor
- Good for: small fixes, adding functions to existing files

**In Claude Code (terminal mode):**
- Your prompt describes the whole goal
- The AI plans changes across your entire project
- Good for: building whole features, refactoring

Same five ingredients, different scope.

---`,
      },
      {
        id: 6,
        title: "Show, Don't Tell (Pictures!)",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Here's a hack: modern AI can *see*. You can show it pictures!

**What you can screenshot and show the AI:**

- A design mockup of a UI you want built ("build this exact design")
- A broken website screenshot ("why does this look wrong?")
- A drawing on a whiteboard of how data flows
- Another app's design ("copy this style")

**How to do it:**

- In **Claude Code:** paste an image with Ctrl+V (Mac)
- In **Cursor:** drag the image into the chat

**Why it's powerful:** The AI reads the visual structure, so it's faster and more accurate than describing everything in words.

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

## Activity: The Prompt Gauntlet 🎮

Here are five bad prompts. For each one, I'll show you how to rewrite it strong, then you try on your own!

### WEAK PROMPT 1: "Make a chart"

**Rewritten (using five ingredients):**
\`\`\`
Create a bar chart in React using the Recharts library. 
It shows monthly sales data (months on x-axis, USD revenue on y-axis). 
Use TypeScript and Tailwind CSS. 
Data prop accepts: [{month: "Jan", revenue: 15000}, {month: "Feb", revenue: 18000}].
If there's no data, show "No data yet."
Return only the component code.
\`\`\`

**What got better?** Specified library (Recharts), data structure, styling (Tailwind), edge cases (empty state), exact output format. The AI knows exactly what to build.

### WEAK PROMPT 2: "Fix my code"

**Rewritten (using five ingredients):**
\`\`\`
My React component fetches user data from a Supabase table called "users" on every render.
Stack: Next.js, TypeScript, React Hooks.
Bug: it should fetch ONCE on page load, not every render.
Fix it by adding useEffect with the correct dependency array.
Use async/await and handle errors with try/catch.
Return only the corrected component, no explanation.
\`\`\`

**What got better?** Named the exact bug ("fetches every render"), gave context (Supabase, Next.js, Hooks), specified the fix (useEffect with deps), and set output format.

### WEAK PROMPT 3: "Add auth"

**Rewritten (using five ingredients):**
\`\`\`
Build a Next.js + TypeScript app with login protection.
Create: 
1) A login page at /auth/login (email/password form)
2) A protected page at /dashboard (only logged-in users can see)
3) A middleware that redirects logged-out users to /auth/login
Use Supabase for auth (email/password).
Return the three files: middleware.ts, auth/login/page.tsx, dashboard/page.tsx.
\`\`\`

**What got better?** Named the exact stack, broke "add auth" into 3 specific pieces, specified the library (Supabase), and listed exact files needed.

### WEAK PROMPT 4: "Build a dashboard"

**Rewritten (using five ingredients):**
\`\`\`
Build a user dashboard in React (Next.js, TypeScript, Tailwind).
Show:
- A greeting card with the user's name (from Supabase)
- A stats card with total posts (count)
- A list of recent posts (title, date, preview)
Data from Supabase "posts" table: id, user_id, title, body, created_at.
While loading, show a loading spinner.
If no posts, show "No posts yet."
Return the component code with comments.
\`\`\`

**What got better?** Named the stack, listed exact UI elements, specified the data source and schema, covered edge cases (empty, loading), and set output format.

### WEAK PROMPT 5: "Make it faster"

**Rewritten (using five ingredients):**
\`\`\`
My Next.js page loads 1000 products from Supabase on every page load. It's slow.
I need:
1) Cache the data server-side for 1 hour (using Next.js revalidation)
2) Show a loading skeleton while fetching
3) Use React Suspense if applicable
Stack: Next.js App Router, TypeScript, React Server Components.
Current fetch: const { data } = await supabase.from('products').select('*')
Rewrite it with caching.
Return the updated code only.
\`\`\`

**What got better?** Named the bottleneck (1000 rows fetched every time), constraints (1-hour cache), solution (revalidation + Suspense), and gave exact context (RSC, App Router).

## Activity Instructions 🎯

**For each of the five weak prompts above:**
1. Paste the weak prompt into Claude Code or ChatGPT
2. Run it and see what's missing or wrong
3. Paste the rewritten prompt
4. Run it and compare
5. Write one sentence: "What was better in the strong version?"

**Try on your own:** rewrite at least 3 of the 5 prompts in your own words using the five ingredients. The exact wording doesn't matter — just make sure all five ingredients are there!

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

## Tools & Alternatives (This Module)

**This skill works everywhere.** Whether you use Cursor, Claude Code, ChatGPT, or another tool — the five ingredients, decomposition, and refinement loop are the same.

Some tools add nice extras (Cursor auto-includes file context, Claude Code reads your whole repo) that save you from typing context by hand. But the underlying skill? Always the same. That's why it transfers.

## Key Takeaways

- Your prompt is your primary tool. Better prompt = better code. 📝
- Use the five ingredients: task, context, constraints, examples, output format
- Break big goals into small, testable steps
- When something's wrong, give *specific* feedback, not "try again"
- The AI can see pictures — use it! 📸

**Next:** Module 3 — Planning Like a Pro (Think Before You Code!)`,
      },
    ]
  },
};

export const module3Steps: Record<Version, ModuleStepSequence> = {
  adult: {
    moduleId: 4,
    moduleName: "Module 3: Planning Software with AI",
    totalDuration: 390,
    steps: [
      {
        id: 1,
        title: "Why plan when AI writes code so fast?",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `The faster the tool, the more a bad plan costs. AI can generate a screen in seconds — but if you haven't decided what data it needs, how it connects to the next screen, or what "done" means, you'll generate ten screens that don't fit together and spend far longer untangling them than planning would have taken.

Reframe planning for the AI era: it's not overhead, it's **the context you'll feed the model.** A clear spec and task list *is* the high-quality context from Module 2, written once and reused across every build prompt. Skipping planning doesn't save time — it moves the thinking into the middle of the build, where it's more expensive.

**The core idea:** decide *what* you're building and *in what order* before you ask AI to build any of it.

---`,
      },
      {
        id: 2,
        title: "From raw idea to a spec, with AI",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 1. A spec is a short written description of what the software should do — you don't need a formal template, you need clarity. Use AI as a thinking partner.

**A lightweight spec answers:**

- **Problem** — what pain does this solve, and for whom?
- **Users** — who uses it, and what are they trying to accomplish?
- **Core features** — the handful of things it must do (the MVP).
- **Out of scope** — what you're deliberately *not* building yet (as important as what you are).
- **Success** — how you'll know it works.

**Using AI to build the spec:** describe your rough idea and ask the model to interview you — e.g. "I want an app that helps freelancers track invoices. Ask me the questions you'd need to write a clear MVP spec." Answer, then ask it to draft the spec. This turns a vague idea into a concrete document fast, and surfaces gaps you'd have missed.

> **Instructor demo:** Take a one-sentence app idea from the class and have the AI interview-then-draft a spec live. Show how the questions expose hidden assumptions.
> 

**[SCREENSHOT PLACEHOLDER: AI Interview + Drafted Spec]**

**What this screenshot should show:**
- Left panel: Claude/ChatGPT asked to interview the user
  - AI prompt: "I want an app that helps freelancers track invoices. Ask me the questions you'd need to write a clear MVP spec."
  - Visible questions: "Who is your primary user? How many invoices per month? Do clients have different rates? What's your timeline?"
  - User's answers visible below each question
- Right panel: AI's drafted MVP spec response
  - Shows 5 sections: Problem, Users, Core Features, Out of Scope, Success Criteria
  - Real example content (not placeholder)
- Shows: how interviewing surfaces hidden assumptions and turns vague ideas into clarity

**Watch-out (Module 1):** the AI will confidently suggest features and scope. Treat its output as a draft to edit, not gospel — *you* own the scope decisions.

---`,
      },
      {
        id: 3,
        title: "Translating the spec into a technical plan",
        type: "checkpoint",
        duration: 60,
        difficulty: "medium",
        xpReward: 100,
        content: `This delivers Objective 2. A spec says *what*; a technical plan says *how*. Translate each feature into three things:

- **Data model** — what the app stores. For the invoice tracker: \`clients\` (name, email), \`invoices\` (client, amount, due date, status). This previews Module 7 (Supabase/Postgres).
- **Screens / views** — what the user sees: a client list, an invoice list, a "new invoice" form, a dashboard. Each maps to features in the spec.
- **Milestones** — checkpoints where you have something that works: "v0: add and list clients," "v1: create invoices," "v2: mark paid and see totals."

Prompt the AI for a first draft of each ("Given this spec, propose a simple data model and the screens needed"), then critique it (Module 2 skill) against your intent.

**[SCREENSHOT PLACEHOLDER: Technical Plan (Data Model + Screens)]**

**What this screenshot should show:**
- Top section: AI's proposed data model
  - Table 1: \`users\` (id, name, email, created_at)
  - Table 2: \`invoices\` (id, user_id, client_id, amount, due_date, status)
  - Table 3: \`clients\` (id, user_id, name, email, phone)
  - Clear relationships shown (user_id foreign keys)
- Middle section: Proposed screens/views
  - Screen 1: Dashboard (total invoices, revenue, overdue count)
  - Screen 2: Clients list (add, edit, delete)
  - Screen 3: Invoices list (filter by status, action links)
  - Screen 4: New invoice form
  - Screen 5: Invoice detail view (mark paid, edit, delete)
- Bottom section: Milestones
  - v0: Auth + clients CRUD
  - v1: Invoices CRUD
  - v2: Dashboard with analytics
- Shows: how to translate spec into concrete technical plan with data, UI, and sequencing

---`,
      },
      {
        id: 4,
        title: "Sequencing: dependencies and build order",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 3. Not all tasks are equal — some must come before others. Teach learners to spot **dependencies** and order work so they're never blocked.

**Rule of thumb:** build foundations before the things that rely on them. You can't display invoices before you can store one; you can't store one before the data model exists; a per-user app needs auth before user-owned data.

**Worked example — ordering the invoice tracker:**

1. Data model (clients, invoices) — everything depends on this.
2. Auth / users — so data can belong to someone.
3. Create + list clients — invoices reference clients, so clients first.
4. Create + list invoices.
5. Mark invoice paid / status changes.
6. Dashboard with totals — depends on invoices existing.

Ask, for each task, "what must already exist for this to work?" That question *is* dependency analysis. The result feeds directly into the decomposed prompting from Module 2 — each step becomes a focused prompt in the Building stage (Modules 4–13).

## Hands-on activity (~40 min, folded in)

**"Plan a real app end to end."** Choose one of the provided project ideas (or use your own). Using AI as an interview partner, produce: (1) a one-page spec, (2) a data model + screen list, and (3) an ordered build plan. This artifact exercises all three objectives and becomes your starting point for the Building stage (Modules 4–13).

### Three project ideas to choose from:

**PROJECT 1: Habit tracker**
*One-sentence idea:* An app where users can log daily habits and see streaks (e.g., "workout," "read," "meditate").

**SAMPLE SPEC (what good looks like):**
\`\`\`
PROBLEM & USERS
Users want to build good habits but lose motivation without feedback. 
Users: individuals (age 18+) using mobile or desktop.

CORE FEATURES (MVP)
1. Sign up and log in
2. Create a habit (name, description, category)
3. Check off a habit each day
4. See current streak (consecutive days completed)
5. View all habits and their streaks

OUT OF SCOPE
- Social sharing (v2)
- Analytics/graphs (v2)
- Recurring reminders/notifications (future)
- Multiple habit categories/tags (v2)

SUCCESS
Users can log in, create 3 habits, check them off daily, and see their streaks growing.
\`\`\`

**SAMPLE DATA MODEL:**
\`\`\`
users
  - id (uuid, primary key)
  - email (unique)
  - created_at

habits
  - id (uuid)
  - user_id (foreign key → users)
  - name (e.g., "workout")
  - description
  - created_at

completions
  - id (uuid)
  - habit_id (foreign key → habits)
  - date (yyyy-mm-dd)
  - created_at
\`\`\`

**SAMPLE SCREENS:**
1. Auth: Sign up, Login
2. Dashboard: List of habits with current streak for each
3. Add Habit form: Name, description input, create button
4. Daily log: Checkboxes for today's habits, confirm button
5. Habit detail: Past completions, current streak, edit/delete

**SAMPLE BUILD ORDER:**
1. Auth (users table, sign up/login screens)
2. Create habit (habits table, form UI)
3. List habits (dashboard, fetch and display)
4. Mark complete (completions table, add-to-log UI)
5. Display streaks (calculate consecutive days, show on dashboard)

**PROJECT 2: Homework organizer for students**
*One-sentence idea:* A class schedule + assignment tracker. Students enter their classes, add due dates, get a dashboard of what's due.

**SAMPLE SPEC:**
\`\`\`
PROBLEM & USERS
Students juggle multiple classes and forget due dates.
Users: high school / college students.

CORE FEATURES (MVP)
1. Sign up, log in
2. Create classes (name, professor, schedule)
3. Add assignments to a class (name, due date, description)
4. Dashboard showing assignments sorted by due date
5. Mark assignment complete (strikethrough)

OUT OF SCOPE
- Grade tracking (v2)
- Reminders / notifications (future)
- Calendar view (v2)
- Collaboration / shared assignments (future)

SUCCESS
A student can enter their 4 classes, add 10 assignments across them, and see all due dates in order.
\`\`\`

**SAMPLE DATA MODEL:**
\`\`\`
users
  - id, email, created_at

classes
  - id, user_id, name, professor, day_time (e.g., "MWF 10am")

assignments
  - id, class_id, title, due_date, description, completed, created_at
\`\`\`

**SAMPLE SCREENS:**
1. Classes list: Add, view, edit class
2. Dashboard: All assignments sorted by due date (color-coded by class)
3. Add assignment form: Class (dropdown), title, due date, description
4. Assignment detail: Full details, toggle complete, edit/delete

**SAMPLE BUILD ORDER:**
1. Auth + classes CRUD
2. Assignments table and CRUD forms
3. Dashboard sorting by due date
4. Mark complete / completion toggling

**PROJECT 3: Simple poll/survey tool**
*One-sentence idea:* Create polls, share links, collect votes, see results live.

**SAMPLE SPEC:**
\`\`\`
PROBLEM & USERS
Event planners, teachers, teams want quick feedback without setup overhead.
Users: anyone organizing a group decision.

CORE FEATURES (MVP)
1. Create a poll (question + options)
2. Share a public link (no login needed to vote)
3. Vote on a poll (click an option)
4. See live results (vote counts, percentages)
5. Creator can view their polls and results

OUT OF SCOPE
- Custom branding (v2)
- Time limits / poll closing (v2)
- Multiple questions per poll (stay simple)
- Email notifications (future)

SUCCESS
Creator makes a poll, shares the link, 20 people vote, creator sees live vote counts.
\`\`\`

**SAMPLE DATA MODEL:**
\`\`\`
users
  - id, email, created_at (creators only)

polls
  - id, creator_id, question, created_at, closed (boolean)

options
  - id, poll_id, text, vote_count

votes
  - id, option_id, voted_at (no user tracking; public voting)
\`\`\`

**SAMPLE SCREENS:**
1. Create poll: Question input, option fields (dynamic), create button
2. Vote page (public, no auth): Question, radio buttons, vote button
3. Results page: Question, option names with vote counts and percentage bars
4. Creator dashboard: List of their polls, link to share, view results

**SAMPLE BUILD ORDER:**
1. Auth (creators only for login)
2. Create + list polls (creator dashboard)
3. Public vote page (no auth required)
4. Results page with live vote counts

### Activity instructions for learners:

1. **Pick one of the three projects above** (or propose your own simple idea)

2. **Use AI as an interview partner:**
   - Paste the one-sentence idea into Claude Code or ChatGPT
   - Ask: "I want to build [idea]. What questions would you ask me to write a clear spec?"
   - Answer the AI's questions honestly
   - Ask: "Now draft an MVP spec based on our conversation"

3. **Create a technical plan:**
   - Ask the AI: "Based on this spec, propose a data model (tables and fields) and a list of screens"
   - Critique the output: does it match your vision? Is anything missing or over-scoped?
   - Ask for refinements if needed

4. **Sequence the work:**
   - Ask the AI: "In what order should I build these features? For each, what must already exist?"
   - Review the order: does each item have its dependencies met before it?

5. **Submit:**
   - Your final spec (1 page, 5 sections: problem, users, core features, out-of-scope, success)
   - Your data model (table names, key fields, relationships)
   - Your screen list (5-7 screens)
   - Your build order (10–15 tasks with dependencies noted for at least 3 tasks)

## Knowledge check (mapped to objectives)

**Objective 1 — Produce a spec (Quiz Q3-1, Q3-2):**
- Q3-1: "Why plan when AI writes code fast?" ✅ Tests value of planning
- Q3-2: "A lightweight spec should include all EXCEPT:" ✅ Tests spec content
- *Written check:* From the scenario "a small gym wants an app to book classes," write a one-page MVP spec with: problem statement, target users, 4–5 core features, explicit out-of-scope items, and success criteria.
  - **SAMPLE OUTPUT (what good looks like):**
    \`\`\`
    PROBLEM: Gym members waste time calling or emailing to book classes. Classes fill up and members don't know.
    USERS: Gym members (age 18–65) who take regular classes.
    CORE FEATURES:
    1. View available classes (day, time, capacity)
    2. Book a class (one-click reservation)
    3. Cancel a booking
    4. See personal schedule (my booked classes)
    5. Get notified when a class is full
    OUT OF SCOPE:
    - Payment / billing (member already has gym membership)
    - Trainer profiles (v2)
    - Class ratings / reviews (v2)
    SUCCESS: Members book 80% of their classes through the app within first week.
    \`\`\`

**Objective 2 — Translate to technical plan (Quiz Q3-4):**
- Q3-4: "For a note-taking app, what should you plan first?" ✅ Tests technical planning order
- *Written check:* For the gym booking app above, propose: (1) a data model (table names, key fields, relationships), (2) a screen list (5–7 screens), and (3) three milestones.
  - **SAMPLE DATA MODEL:**
    \`\`\`
    users (id, email, name, created_at)
    classes (id, name, description, day_time, max_capacity, created_at)
    bookings (id, user_id, class_id, booked_at, cancelled_at)
    \`\`\`
  - **SAMPLE SCREEN LIST:**
    1. Login / sign up
    2. Class browser (list/calendar view, filters)
    3. Class detail (description, time, capacity, book button)
    4. My bookings (upcoming classes, cancel button)
    5. Confirmation (booking successful or error)
  - **SAMPLE MILESTONES:**
    - v0: Auth + classes list
    - v1: Book class + my bookings
    - v2: Notifications + capacity alerts

**Objective 3 — Sequence with dependencies (Quiz Q3-3):**
- Q3-3: "A dependency means:" ✅ Tests dependency understanding
- *Written check:* For the gym booking app, list the build tasks in order (8–10 tasks) and for at least 3 tasks, state what must exist first.
  - **SAMPLE BUILD ORDER:**
    \`\`\`
    1. Auth (users table, sign up/login) — FOUNDATION
    2. Classes table & list screen (fetch & display) — depends on: auth (know which user is logged in)
    3. Book class form & logic (add to bookings table) — depends on: auth + classes (need both to create a booking)
    4. My bookings screen (query user's bookings, show schedule) — depends on: auth + classes + bookings tables
    5. Cancel booking (delete from bookings) — depends on: bookings table exists
    6. Capacity check (count bookings per class, disable if full) — depends on: bookings table populated
    7. Notifications / alerts (send email when class full) — depends on: capacity logic working
    8. Calendar view of classes (visual layout) — depends on: classes list working
    \`\`\`

**Scenario-based judgment checks (all objectives):**

For each scenario, decide what's wrong with the plan and explain how to fix it:

- (a) Your spec says "Users can create an account, upload a profile picture, and join groups." One sentence: which of these is scope creep, and why?
- (b) Your data model has \`users\`, \`posts\`, and \`comments\` tables, but no way to link comments back to users. What's missing?
- (c) You want to build: 1) Create post, 2) List posts, 3) Add comment, 4) Delete comment. What's the dependency issue?
- (d) Your spec says "The app should be fast and scalable." Is this a good spec? Why or why not, in one sentence?

*Pass mark: 80%. Completing this gates entry to Stage 2 (Building).*

## Tools & alternatives (this module)

Planning is tool-agnostic — any capable assistant (Claude Code, Cursor's chat, ChatGPT, Claude) works as a planning partner. The default is **Claude Code**, so you can keep the spec and plan as files alongside the code you'll build next. Alternatives (a chat window, a Notion doc, a text file) are fine — the deliverable is the *thinking*, not the tool that holds it.

**Tip:** keep the spec *and a feature checklist* in **Notion** as your project's source of truth — and in Module 13 you'll connect Notion to Claude Code (via MCP) so the AI can read the checklist and tick items off as it ships them.

## Key takeaways

- The faster the tool, the more a bad plan costs — plan *with* AI, don't skip it.
- A good spec states the problem, users, core features, out-of-scope, and success.
- Translate the spec into a data model, screens, and milestones before building.
- Order work by dependencies: build what other things rely on first.
- The plan you produce becomes the reusable context and the decomposed prompt list for the Building stage.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)`,
      },
    ]
  },
  kids: {
    moduleId: 4,
    moduleName: "Module 3: Planning Software with AI",
    totalDuration: 390,
    steps: [
      {
        id: 1,
        title: "Why Plan When AI Is So Fast? ⚡",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Sounds backwards, right? "But the AI can write code in seconds, why plan?"

Here's the thing: the faster you can code, the more it costs when you code the wrong thing.

The AI can make a screen in 10 seconds. But if you haven't thought about what data it needs, where it connects, or what "done" means, you'll end up with 10 screens that don't fit together. Then you spend hours fixing it.

**Planning isn't slowing you down — it's the context you'll give the AI later.** A good plan = good prompts = good code.

The rule: **Decide what you're building and in what order BEFORE you ask the AI to build it.**

---`,
      },
      {
        id: 2,
        title: "Build a Spec (What You're Making)",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `A spec is just a written description of what your app should do. You don't need fancy templates, just clarity.

**Your spec answers these questions:**

1. **What problem does it solve?** (Who's stuck and why?)
2. **Who uses it?** (What are they trying to do?)
3. **What's the MVP?** (What's the bare minimum to ship?)
4. **What's NOT in the MVP?** (What cool stuff are you saving for later?)
5. **How do you know it works?** (What does success look like?)

**The hack:** Use AI to help you write the spec! Describe your rough idea and ask: "Ask me questions to understand what I'm building, then draft a spec." Answer the questions, and boom — instant spec. 🎯

**Example:** 

*Your idea:* "I want an app where kids can track their homework and get reminders."

*AI asks:* 
- What homework? (Just due dates or full descriptions?)
- Who sends reminders? (Email? App notification?)
- Can your parents see it?
- What about past homework? (Archive or delete?)

*After you answer, AI writes:*

**Homework Tracker Spec**

**Problem:** Kids forget homework and miss deadlines.

**Users:** Middle/high school students who want to remember assignments and stay on top of deadlines.

**MVP:**
- Add a homework assignment (subject, due date, description)
- View all homework
- Mark homework done
- Get a reminder the day before due date

**Not in MVP:**
- Parent/teacher access
- Grade tracking
- Collaboration

**Success:** User doesn't miss a single assignment deadline.

**Watch out:** The AI will suggest features. It sounds smart. But *you* decide what's in the MVP, not the AI. You're the boss.

**[SCREENSHOT PLACEHOLDER: AI Interview + Drafted Spec]**

**What this screenshot should show:**
- Left panel: Claude/ChatGPT asked to interview the user
  - Prompt: "I want an app to track video games I want to play. Ask me questions to understand what to build."
  - AI questions visible: "How many games per list? Do you rate games? Can friends see your list?"
  - User answers visible below
- Right panel: AI's drafted MVP spec
  - Shows sections: Problem, Users, Core Features, Out of Scope, Success Criteria
  - Real example spec with details
- **Shows:** how interviewing reveals hidden assumptions and turns vague ideas into clarity 💡

---`,
      },
      {
        id: 3,
        title: "Turn Your Spec Into a Technical Plan",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `Now you know *what* you're building. Time to figure out *how*.

For every feature, write:

1. **Data** — what you're storing
   - Homework: subject, description, dueDate, done (yes/no), createdDate
   
2. **Screens** — what the user sees
   - Home page: List of all homework
   - Add screen: Form to create homework
   - Detail screen: View one homework assignment
   
3. **Tasks** — the code you need to write
   - Database setup
   - Create form component
   - Show homework list component
   - Wire up save/delete buttons

---`,
      },
      {
        id: 4,
        title: "Order Your Tasks (Dependencies)",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `You can't build everything at once. Some tasks depend on others.

**Example order for homework tracker:**

1. ✅ Set up the database (can't save homework without this)
2. ✅ Build the form (can't add homework without this)
3. ✅ Build the list view (can't see homework without this)
4. ✅ Wire up the save button
5. ✅ Wire up done/delete buttons
6. ✅ Add reminders

Do them in order. Each one feeds into the next.

**Question:** Why not build step 4 before step 3? (Answer: because you need the list to see if saving worked!)

**[SCREENSHOT PLACEHOLDER: Technical Plan (Data Model + Screens)]**

**What this screenshot should show:**
- Top section: AI's proposed data model for homework tracker
  - Table 1: \`users\` (id, name, email)
  - Table 2: \`homework\` (id, user_id, subject, description, due_date, done)
  - Table 3: \`reminders\` (id, homework_id, sent_date)
  - Clear relationships shown (user_id foreign keys)
- Middle section: Proposed screens
  - Screen 1: Dashboard (list all homework, sorted by due date)
  - Screen 2: Add homework form (subject, due date, description)
  - Screen 3: Homework detail (view, mark done, delete)
  - Screen 4: Settings (reminder preferences)
- Bottom section: Milestones
  - v0: Auth + homework CRUD
  - v1: Reminders working
- **Shows:** how to translate spec into concrete tables, screens, and milestones 📋

---`,
      },
      {
        id: 5,
        title: "Writing Your Plan as a Prompt",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `After all this planning, you have a document. That document becomes your AI prompt!

When you ask the AI to build something, hand it your spec and plan:

*"Build a homework tracker. Here's the spec [paste spec]. Start with task 1: set up a Supabase table with these fields: [list]. Return the SQL."*

Boom. The AI has all the context it needs. You get the right code first time because you told it exactly what you want.

## Activity: Plan Your Own Project 🎨

Pick one of these three projects (or use your own small idea). For EACH, you'll create: a spec, a data model, a screen list, and a build order.

### PROJECT 1: Habit Tracker 🎯

**Idea:** An app where you log daily habits and watch your streaks grow (e.g., "workout," "read," "meditate").

**SAMPLE SPEC (what good looks like):**
\`\`\`
PROBLEM & USERS
Kids want to build good habits but lose motivation without feedback.
Users: kids and teens (age 10+) on any device.

CORE FEATURES (MVP)
1. Sign up and log in
2. Create a habit (name, description)
3. Check off a habit each day
4. See your current streak (consecutive days completed)
5. View all habits and their streaks

OUT OF SCOPE
- Social features (showing friends)
- Rewards or badges (v2)
- Reminders / notifications (future)

SUCCESS
A user creates 3 habits, checks them daily, and sees their streaks growing.
\`\`\`

**SAMPLE DATA MODEL:**
\`\`\`
users: id, name, email, created_at
habits: id, user_id, name, description, created_at
completions: id, habit_id, date (yyyy-mm-dd), created_at
\`\`\`

**SAMPLE SCREENS:**
1. Login / Sign up
2. Dashboard: List of habits with current streak for each
3. Add Habit: Form to create a new habit
4. Habit Detail: View streak, past completions, edit/delete buttons
5. Daily Check-in: Checkboxes for today's habits

**SAMPLE BUILD ORDER:**
1. Auth (sign up/login, users table)
2. Create habit (habits table + form)
3. List habits (show on dashboard)
4. Mark habit done (add to completions table)
5. Display streaks (count consecutive days, show on dashboard)

### PROJECT 2: Video Game Wishlist 🎮

**Idea:** An app to track games you want to play. Mark them done when you finish them.

**SAMPLE SPEC:**
\`\`\`
PROBLEM & USERS
Gamers have tons of games on their wishlist but forget which ones they wanted to play.
Users: gamers (age 13+) who play video games.

CORE FEATURES (MVP)
1. Sign up and log in
2. Add a game to your wishlist (name, platform, rating)
3. View all games on your wishlist
4. Mark a game as played/completed
5. See how many games you've completed

OUT OF SCOPE
- Game reviews or descriptions (v2)
- Multiplayer/sharing lists (future)
- Game recommendations (v2)

SUCCESS
User adds 10 games, plays 3, and can see which ones are done.
\`\`\`

**SAMPLE DATA MODEL:**
\`\`\`
users: id, name, email, created_at
games: id, user_id, title, platform, rating, completed, completed_date, created_at
\`\`\`

**SAMPLE SCREENS:**
1. Login / Sign up
2. Wishlist: List of all games (show which are completed)
3. Add Game: Form to add a new game
4. Game Detail: Full details, mark as played, edit/delete
5. Stats: "You've completed X of Y games"

**SAMPLE BUILD ORDER:**
1. Auth (users table, sign up/login)
2. Add game (games table + form to create)
3. List games (show on dashboard)
4. Mark game complete (update completed status)
5. Show stats (count completed games)

### PROJECT 3: Poll Tool 📊

**Idea:** Create quick polls and share them. Anyone can vote. See results live.

**SAMPLE SPEC:**
\`\`\`
PROBLEM & USERS
Event planners, teachers, and friends want quick feedback without complicated setup.
Users: anyone organizing a quick group decision.

CORE FEATURES (MVP)
1. Create a poll (question + options, like "Pizza or tacos?")
2. Share a public link (no login needed to vote)
3. Vote on a poll (click your choice)
4. See live results (vote counts and percentages)
5. Creator can view their polls and results

OUT OF SCOPE
- Timed polls that close automatically (v2)
- Multiple questions per poll (keep it simple)
- Email notifications (future)

SUCCESS
Creator makes a poll, shares the link, 10 people vote, creator sees results.
\`\`\`

**SAMPLE DATA MODEL:**
\`\`\`
users: id, name, email, created_at
polls: id, creator_id, question, created_at
options: id, poll_id, text, vote_count
\`\`\`

**SAMPLE SCREENS:**
1. Create Poll: Question input, add options (buttons to add more), create button
2. Vote Page (public): Question, radio buttons or buttons for each option, vote button
3. Results: Question, options with vote counts and percentage bars
4. My Polls: List of polls I created, view results button, share link

**SAMPLE BUILD ORDER:**
1. Auth (creators sign up/login)
2. Create poll (polls table + form)
3. Public vote page (no auth needed)
4. Results page (count votes, show percentages)
5. My polls dashboard (list creator's polls)

### Activity Instructions 🎯

**Step 1: Pick one of the three projects** (or propose your own small idea)

**Step 2: Use AI as an interview partner:**
- Paste your one-sentence idea into Claude Code or ChatGPT
- Ask: "I want to build [idea]. What questions would you ask me to clarify what I'm building?"
- Answer the AI's questions honestly
- Ask: "Now draft a complete spec based on our conversation"

**Step 3: Create a technical plan:**
- Ask the AI: "Based on this spec, propose: (1) a data model (tables and fields), (2) a list of screens, (3) a build order with dependencies"
- Review the output: does it match your vision? Fix anything that's off.

**Step 4: Submit:**
- Your final spec (answer the 5 questions: problem, users, MVP, out-of-scope, success)
- Your data model (table names, fields, relationships)
- Your screen list (5-7 screens)
- Your build order (6-8 tasks with dependencies explained)

## Knowledge Check (Mapped to Your Objectives)

**Objective 1 — Produce a spec (Quiz Q3-k1, Q3-k2):**
- Q3-k1: "Why does planning matter when AI codes fast?" ✅ Tests value of planning
- Q3-k2: "A lightweight spec must include all EXCEPT:" ✅ Tests spec content
- **Written check:** For "an app to organize school supplies," write a one-page MVP spec with: problem, users, 4-5 core features, out-of-scope, success criteria.

**Objective 2 — Translate to technical plan (Quiz Q3-k4):**
- Q3-k4: "When planning an app, what should you design first?" ✅ Tests planning order
- **Written check:** For the "school supplies" app, propose: (1) a data model (table names + fields), (2) a screen list (5-7 screens), (3) build milestones.

**Objective 3 — Sequence with dependencies (Quiz Q3-k3):**
- Q3-k3: "A dependency means:" ✅ Tests dependency understanding
- **Written check:** For the "school supplies" app, list 6-8 build tasks in order. For at least 3, explain what must exist first.

**Scenario-based judgment checks (all objectives):**

For each scenario, identify what's wrong and how to fix it:

- (a) Your spec says "Users can create an account, upload a profile picture, and join groups." Which is too ambitious for MVP, and why?
- (b) Your data model has \`users\` and \`posts\` tables, but no way to know which user wrote each post. What's missing?
- (c) You want to build: 1) Create post, 2) List posts, 3) Add comment, 4) Delete comment. What's the dependency problem?
- (d) Your spec says "The app should be fast and easy to use." Is this a good spec? Why or why not?

## Tools & Alternatives (This Module)

**Planning works everywhere.** Any AI tool (Claude Code, ChatGPT, Cursor's chat) can be your thinking partner. The default is **Claude Code**, so you can save your spec and plan as files next to your code. But a text file, a note-taking app, or even a Google Doc works fine — the thinking matters more than the tool.

**Pro tip:** keep your spec in a shared document (Google Docs, Notion) so if you're working with others, everyone sees the same plan. In Module 13, you'll connect Notion to Claude Code so the AI can check off your tasks as it builds them!

## Key Takeaways

- Planning is the context you'll feed the AI later 📝
- A spec answers: problem, users, MVP, out-of-scope, success
- A technical plan shows: data model, screens, build order
- Order matters — some tasks depend on others
- Good plan + good prompt = good code first time 🎉

**Next:** Module 4 — Building in Cursor (Your First Real Project!)`,
      },
    ]
  },
};

export const module4Steps: Record<Version, ModuleStepSequence> = {
  adult: {
    moduleId: 5,
    moduleName: "Module 4: Building Apps in Cursor (In-Editor Flow)",
    totalDuration: 420,
    steps: [
      {
        id: 1,
        title: "Setup: Cursor + a Next.js project",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `**Step 1 — Install Cursor** from [cursor.com](http://cursor.com) and sign in. It's a VS Code fork, so extensions/keybindings carry over.

**Step 2 — Install Node.js** (LTS).

**Step 3 — Create the project** in Cursor's built-in terminal:

\`\`\`bash
npx create-next-app@latest invoice-tracker
# TypeScript = yes, App Router = yes, Tailwind = yes
cd invoice-tracker
npm run dev
\`\`\`

**Step 4 — Open** [http://localhost:3000](http://localhost:3000) to confirm the starter app runs.

**[SCREENSHOT PLACEHOLDER: Next.js Starter Page]**

**What this screenshot should show:**
- Browser window at http://localhost:3000
- Default Next.js starter page visible (logo, "Get started by editing..." text, links to documentation)
- Proof that Node, npm, and Cursor are all working together
- No errors in the page or terminal visible

> **Instructor note:** Get everyone to a running [localhost](http://localhost) before moving on — setup failures here derail the module.
> 

---`,
      },
      {
        id: 2,
        title: "The four ways to work with Cursor",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `- **Tab (autocomplete)** — predicts your next edit; press Tab to accept. Best for small in-flow completions.
- **Cmd+K (inline edit)** — select a block, describe a change in plain English, get a color-coded diff to accept/reject. Best for focused edits.
- **Cmd+L (chat)** — a sidebar chat that understands your indexed project. Best for questions and planning.
- **Cmd+I (Composer / Agent)** — describe a larger change. **Composer** makes a multi-file edit in one pass; **Agent** goes further — it runs commands, reads the output, and fixes errors until it works. Best for multi-file features and open-ended tasks (Lesson 4.5).

**Mental model:** Tab for keystrokes, Cmd+K for a block, Chat for thinking, Composer for a whole feature.

**[SCREENSHOT PLACEHOLDER: Cmd+K Inline Edit Diff]**

**What this screenshot should show:**
- A code block is selected in Cursor editor
- The Cmd+K dialog is open with a prompt (e.g., "Add error handling and return type annotation")
- Below the prompt: a unified diff showing:
  - Red lines (removed code)
  - Green lines (added code)
  - Accept button (checkmark)
  - Reject button (X)
- Shows the diff clearly so user can review before accepting
- Proves: Cmd+K shows changes visually before applying them

---`,
      },
      {
        id: 3,
        title: "Giving Cursor context",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Module 1's "context is everything," made concrete:

- **@-mentions** — type \`@\` to pin context: \`@filename\`, \`@folder\`, \`@Docs\`, \`@Web\`. Puts exactly what you want into the model's window.
- **\`.cursorrules\`** — a project-root file of persistent instructions (stack, conventions) injected into every interaction. Example:

\`\`\`
# .cursorrules
This is a Next.js (App Router) + TypeScript + Tailwind app.
Use server components by default; only "use client" when needed.
Keep components small and typed.
\`\`\`

**[SCREENSHOT PLACEHOLDER: @-Mention Menu]**

**What this screenshot should show:**
- Cursor chat panel is open (Cmd+L)
- User has typed "@" in the chat input
- A dropdown menu appears showing options:
  - @filename (specific file suggestions like \`app/layout.tsx\`, \`lib/utils.ts\`)
  - @folder (folder suggestions like \`app/\`, \`lib/\`, \`components/\`)
  - @Docs (link to documentation)
  - @Web (web search)
- One mention is being selected/highlighted
- Shows: how @-mentions let you pin specific context without typing full paths

> **Cross-tool note ([AGENTS.md](http://AGENTS.md)):** \`.cursorrules\` is Cursor's file; there's also an emerging vendor-neutral convention, **\`AGENTS.md\`**, that many AI tools read (create-next-app now scaffolds one). Same idea, different filename per tool. You'll meet Claude Code's counterpart, \`CLAUDE.md\`, in Module 5.
> 

---`,
      },
      {
        id: 4,
        title: "Build a feature end to end",
        type: "lesson",
        duration: 90,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 1. Follow the Module 3 plan for the "clients" slice: a type, a list view, a create form. Mock data now; wired to Supabase in Module 7.

**Step 1 — Define the data shape** (\`types/client.ts\`):

\`\`\`tsx
export type Client = { id: string; name: string; email: string };
\`\`\`

**Step 2 — Build the list view.** In chat (Cmd+L), prompt five-ingredient style: "Create a server component at \`app/clients/page.tsx\` that renders a list of clients from a mock array, showing name and email in a Tailwind table. Use the \`Client\` type from \`@types/client.ts\`." Review the diff, accept.

**Step 3 — Add a create form** — a client component with name/email fields and basic validation. Verify it renders and validates before moving on — **prompt → verify → next** (Module 2).

At each step: read the generated code, run it, use Cmd+K to fix anything off. You are the engineer (Module 1).

**[SCREENSHOT PLACEHOLDER: /Clients Page with Table]**

**What this screenshot should show:**
- Browser at http://localhost:3000/clients
- A Tailwind-styled table is visible with:
  - Header row: "Name" and "Email" columns
  - 3–5 sample rows with mock client data (e.g., "Acme Corp", "acme@example.com")
  - Clean, readable table styling (no generic AI look)
- Proof that: prompt → ran → works

---`,
      },
      {
        id: 5,
        title: "Multi-file editing with Composer",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 2. Real features touch multiple files. Composer (Cmd+I) handles it: describe the change, it edits every relevant file and shows one unified diff.

**Worked example:** "Add a nav link to \`/clients\` in the site header, create the header component if it doesn't exist, and include it in the root layout." Add \`@\` context (e.g. \`@app/layout.tsx\`). **Step through the diff file by file** and accept deliberately — never blind-accept.

**[SCREENSHOT PLACEHOLDER: Composer Unified Diff (Multi-File)]**

**What this screenshot should show:**
- Composer panel is open (after pressing Cmd+I and entering a multi-file prompt)
- A unified diff displays changes across multiple files:
  - File 1: \`app/components/Header.tsx\` (created or modified)
    - Shows new \`<nav>\` with link to \`/clients\`
  - File 2: \`app/layout.tsx\` (modified)
    - Shows \`<Header />\` component imported and rendered
- Red lines (removed), green lines (added)
- Accept/Reject buttons at the bottom
- Shows: Composer groups changes across files into one coherent diff
- Proves: step-through-the-diff workflow prevents blind-accepting

**When to use which:** Cmd+K for one block, Composer for a change spanning files.

**Composer vs. Agent vs. Background (2026):** *Composer* applies a change you've specified; *Agent* adds autonomy — it runs terminal commands, reacts to errors, and iterates until tests pass (use it when the task has no obvious end state). **Background Agents** run in the cloud on a branch and return a pull request (queue a task, close your laptop). **Subagents** run several in parallel for big refactors. Turn on Settings → Agent → *require approval for destructive commands* so \`rm -rf\` / \`DROP TABLE\` / force-push need a click. These are the same agentic ideas the course teaches for Claude Code (Modules 5, 11, 13) — Cursor just brings them into the editor. (Fast-moving — check current docs.)

---`,
      },
      {
        id: 6,
        title: "Cursor vs. the alternatives",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 3.

| Option | What it is | Best when |
| --- | --- | --- |
| **Cursor** (default) | AI-native IDE (VS Code fork) with Tab, inline edit, chat, multi-file agent | You want the most integrated AI coding experience |
| VS Code + GitHub Copilot | Standard editor plus an AI plugin | You won't switch editors / team standardizes on VS Code |
| Zed | Very fast native editor with AI features | You prioritize editor speed |
| Windsurf / others | Alternative AI-native IDEs | Worth trying if Cursor's pricing/feel doesn't fit |

**Why Cursor is the default:** tightest integration of the four modes in one beginner-friendly tool. **Trade-off:** Cursor's credit-based pricing can get expensive with heavy use; VS Code + Copilot is lower-friction if you won't leave VS Code; Zed wins on speed. The skills (autocomplete, inline edit, context, multi-file changes) exist in all of them.

## Hands-on activity (~60 min, folded in)

**"Ship the clients feature."** Build the invoice tracker's clients slice using Cursor's editing modes and multi-file workflow.

### Step-by-step instructions:

1. **Create \`.cursorrules\`** at the project root:
   \`\`\`
   # .cursorrules
   This is a Next.js App Router + TypeScript + Tailwind app.
   Use server components by default.
   Components go in app/components/.
   Mock data in lib/mockData.ts.
   Keep components small and focused.
   \`\`\`

2. **Define the Client type** (use Cmd+L to ask: "Create a Client type in types/client.ts with fields: id, name, email")

3. **Build the list page** (use Cmd+L with \`@types/client.ts\` context):
   \`\`\`
   Create a server component at app/clients/page.tsx that:
   - Imports the Client type
   - Creates a mock array of 5 clients
   - Renders them in a Tailwind table
   - Shows name and email columns
   \`\`\`

4. **Add a create form** (use Cmd+K inline edit on a selected component block):
   - Select a placeholder \`{/* form goes here */}\` comment
   - Cmd+K: "Add a form with name and email inputs, basic validation, a submit button"
   - Review the diff and accept

5. **Use Composer for multi-file header** (Cmd+I):
   \`\`\`
   Add a header with a nav link to /clients.
   Create a Header component in app/components/Header.tsx.
   Import and render it in app/layout.tsx.
   \`\`\`

6. **Test everything:**
   - \`npm run dev\` and visit http://localhost:3000/clients
   - Verify the table shows mock clients
   - Verify the form validates input (try submitting empty)
   - Verify the nav link is in the header

### Submission:
- Provide a screenshot or recording of the /clients page showing the working list + form
- Paste the prompts you used for steps 2, 3, 4, 5
- In 2 sentences, explain which Cursor mode (Tab, Cmd+K, Chat, Composer) was most useful and why

## Quiz questions (preview)

These are the four questions you'll see on the quiz. Study these to prepare:

**Q4-1:** Which Cursor mode is best for a change spanning multiple files?
- (a) Tab
- (b) Cmd+K inline edit
- (c) **Composer/Agent** ✓
- (d) find-and-replace

*Why:* Composer/Agent mode handles multi-file changes and cross-file context. Cmd+K is for single blocks; Tab is autocomplete; find-and-replace is a last resort.

**Q4-2:** What does a project rules file (e.g. \`AGENTS.md\`) do?
- (a) Formats code
- (b) **Injects persistent project context into every AI interaction** ✓
- (c) Deploys the app
- (d) Runs tests

*Why:* Rules files become system prompts for the AI, setting project norms and conventions. This is exactly the \`.cursorrules\` pattern from Lesson 4.3.

**Q4-3:** \`@\`-mentions are used to:
- (a) Tag teammates
- (b) **Pin specific context (files/docs/web) into the model's window** ✓
- (c) Comment code
- (d) Undo changes

*Why:* @-mentions let you include specific files or web pages as context for the AI, reducing the need to repeat yourself.

**Q4-4:** You're building a React list component that fetches data from an API. Which Cursor mode is best?
- (a) Tab autocomplete (just keep typing)
- (b) Cmd+K inline edit (describe changes to a block)
- (c) Cmd+L chat (ask questions about the code)
- (d) **Cmd+I Composer (build the whole component)** ✓

*Why:* Composer (Cmd+I) is best for building a complete feature—it orchestrates the component, imports, and wiring together. This is a feature-level task, not an edit.

## Knowledge check (mapped to objectives)

**Objective 1 — Build a working feature (Quiz Q4-4):**
- Q4-4: "You're building a React list component that fetches from an API. Which mode is best?" ✅ Tests feature-building judgment
- *Practical check:* Screenshot of the working /clients page (table + form) + the Cursor chat/Composer prompts you used

**Objective 2 — Multi-file editing & context (Quiz Q4-1, Q4-2, Q4-3):**
- Q4-1: "Which mode is best for multi-file changes?" ✅ Tests Composer knowledge
- Q4-2: "What does \`AGENTS.md\` do?" ✅ Tests context/rules understanding
- Q4-3: "\`@\`-mentions are used to:" ✅ Tests context-pinning knowledge
- *Practical check:* Describe a Composer change spanning 2+ files. Example:
  - "I used Composer to add a sidebar to the layout. It created \`app/components/Sidebar.tsx\`, imported it in \`app/layout.tsx\`, and styled both with Tailwind. I reviewed the diff file-by-file before accepting."

**Objective 3 — Compare alternatives (Lesson 4.6 knowledge):**
- *Practical check:* For a scenario—"Your team standardizes on VS Code for backend. You're joining to build a frontend. Which editor?"—write a 3-sentence recommendation (Cursor, VS Code + Copilot, or Zed) with trade-offs.
  - **SAMPLE ANSWER:** "I'd recommend VS Code + Copilot for consistency with the backend team—no editor switching tax. Trade-off: Copilot's autocomplete is more limited than Cursor's Composer for multi-file refactors. However, if full-stack AI coding matters more than team standardization, Cursor's superior context-handling wins."

**Scenario-based judgment checks:**

For each, decide which Cursor mode fits best and explain in one sentence why:

- (a) You need to refactor a function signature across 8 files. Tab? Cmd+K? Chat? Composer?
- (b) You're unsure how your auth library works. What mode would you use to ask?
- (c) You notice a typo in a variable name on the current screen. Tab or Cmd+K?
- (d) A feature works but feels slow. Which mode to investigate why?

*Pass mark: 80% and a working feature submitted.*

## Tools & alternatives (this module)

Default: **Cursor** on a **Next.js** app. Editor alternatives compared in Lesson 4.6. The framework layer (Next.js vs. Remix, Astro, SvelteKit) is covered in Module 15 (Landscape); Next.js is used here for its zero-config path to Vercel later (Module 10).

## Key takeaways

- Cursor gives four modes — Tab, Cmd+K, Chat, Composer — matched to the size of the change.
- Steer the model with \`@\`-mentions and a \`.cursorrules\` file (\`AGENTS.md\` is the cross-tool equivalent).
- Build step by step: prompt → read → run → fix → next.
- Composer handles multi-file changes; step through the diff, never blind-accept.
- The core skills transfer to VS Code + Copilot, Zed, and others.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)`,
      },
    ]
  },
  kids: {
    moduleId: 5,
    moduleName: "Module 4: Building Apps in Cursor (In-Editor Flow)",
    totalDuration: 420,
    steps: [
      {
        id: 1,
        title: "Cursor: Your In-Editor AI Buddy",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Cursor is VS Code + AI built in. It's a code editor that can suggest code, explain code, and fix code right there in the editor.

**Key features:**
- Type your prompt in the Cursor chat (bottom right)
- The AI reads your open file and surrounding context automatically
- It suggests edits directly in the file
- You approve or reject each change

**Different from Claude Code:** Cursor works *within a single file or folder*, while Claude Code works *at a terminal level on the whole project*.

**Four ways to use Cursor:**

| Mode | What you do | Best for |
| --- | --- | --- |
| **Tab** | Type code, AI autocompletes your next line | Small quick completions |
| **Cmd+K** (Mac) or Ctrl+K (Windows) | Select a block, describe a change, get a diff | Fixing one section of code |
| **Cmd+L** (Chat) | Ask the AI questions in a sidebar | Planning, debugging, asking why |
| **Cmd+I** (Composer) | Describe a change that touches many files, AI does them all | Building multi-file features |

**Mental model:** Tab for quick stuff, Cmd+K for one block, Chat for thinking, Composer for whole features.

**[SCREENSHOT PLACEHOLDER: Next.js Starter Page]**

**What this screenshot should show:**
- Browser window at http://localhost:3000
- Default Next.js starter page visible (logo, "Get started by editing..." text)
- Proof that Node, npm, and Cursor are all working together
- No errors visible

---`,
      },
      {
        id: 2,
        title: "Your First Project Setup",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Let's build a **Pet Tracker** app (simple, visual, real):

**Features:**
- Add a pet (name, breed, photo)
- View all pets
- Click a pet to see details
- Delete a pet

**Stack:** Next.js, TypeScript, Tailwind CSS, Supabase

**Step 1: Create the project**

\`\`\`bash
npx create-next-app@latest pet-tracker
\`\`\`

Choose: App Router, TypeScript, Tailwind, ESLint. Yes to all.

\`\`\`bash
cd pet-tracker
npm run dev
\`\`\`

You should see the starter page at localhost:3000. That's your baseline.

## Lesson 4.2b — Setting Up Context with .cursorrules (~20 min)

Create a file called \`.cursorrules\` at the root of your project. This file tells Cursor "remember these rules for every prompt."

\`\`\`
# .cursorrules
This is a Next.js app using the App Router.
Use TypeScript for all new files.
Use Tailwind CSS for styling.
Keep components small and focused.
\`\`\`

Now whenever you ask Cursor a question, it reads this file first. No more repeating "I'm using Next.js and TypeScript" every time!

**Pro tip:** \`.cursorrules\` is like permanent context. It saves you typing.

**[SCREENSHOT PLACEHOLDER: Cmd+K Inline Edit]**

**What this screenshot should show:**
- A code block is selected in Cursor
- The Cmd+K dialog is open with a prompt
- Below: a unified diff showing:
  - Red lines (code being removed)
  - Green lines (new code added)
  - Accept button (checkmark)
  - Reject button (X)
- Shows the changes clearly before accepting
- **Proves:** Cmd+K lets you see changes before you accept them ✓

---`,
      },
      {
        id: 3,
        title: "Prompting in Cursor",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Open \`app/page.tsx\` and delete everything. This is where we'll build.

**Your first prompt in Cursor:**

*"Create a Next.js page component that shows a pet tracker app. It should have a form to add a pet (name, breed, photo URL). Below the form, show a grid of all pets added. Each pet card shows the name, breed, and photo. Add a delete button on each card. Use TypeScript, Tailwind for styling, and store pets in React state (not a database yet). Return only the component code."*

Cursor will suggest the code. Read it. If it looks good, accept it. If something's wrong, ask:

*"The photo input should be a URL text field. Add a button to delete pets that actually removes them from the list."*

This is the in-editor flow: prompt → read → verify → refine.

---`,
      },
      {
        id: 4,
        title: "Testing Your Code",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `After each change:

1. Save the file
2. Look at your app (it hot-reloads)
3. Test it: add a pet, delete a pet, etc.
4. If it breaks, ask Cursor: *"I got this error: [paste error]. Fix it."*

Error messages are your friend. They tell you exactly what's wrong.

---`,
      },
      {
        id: 5,
        title: "Debugging With AI",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Bugs happen. Here's how to use Cursor to fix them:

**The breakdown:** *"The delete button doesn't work. Here's the error: [paste full error]. The pet stays in the list. What's wrong?"*

Cursor reads your code + your error and suggests a fix.

**The key:** Don't say "fix it." Tell Cursor *what went wrong* and *what you expected*.

## Lesson 4.5b — Using @-Mentions for Context (~20 min)

In Cursor chat, you can type \`@\` to pin specific files or folders. Example:

\`\`\`
@app/page.tsx add a heading to this page
@components make all components export TypeScript interfaces
\`\`\`

This tells Cursor "here's the exact file I'm talking about" without having to explain the path.

**Pro tip:** Use \`@filename\` to be super specific. It helps Cursor understand your project better.

**[SCREENSHOT PLACEHOLDER: @-Mention Menu in Cursor Chat]**

**What this screenshot should show:**
- Cursor chat panel is open (Cmd+L)
- User typed "@" in the chat input
- A dropdown menu appears showing:
  - File suggestions (app/page.tsx, components/PetCard.tsx, etc.)
  - Folder suggestions (app/, components/, lib/)
- One file is being selected/highlighted
- **Shows:** how @-mentions let you pin specific context 📌

---`,
      },
      {
        id: 6,
        title: "Using Composer for Multi-File Changes",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `For bigger changes that touch multiple files, use **Composer (Cmd+I)** instead of Cmd+K.

**Example:** "Add a header with a nav link to the app. Create a Header component. Import it in the main layout."

Composer will:
1. Create the header component
2. Update the main layout
3. Show you ALL changes in one diff
4. Let you review each file before accepting

**This is powerful** because one prompt can fix multiple files at once. No more "oh, I also need to update this file too."

**[SCREENSHOT PLACEHOLDER: Composer Multi-File Diff]**

**What this screenshot should show:**
- Composer panel after entering a multi-file prompt
- A unified diff showing changes across 2+ files:
  - File 1: New \`app/components/Header.tsx\` with nav link
  - File 2: \`app/layout.tsx\` with Header imported and rendered
- Red lines (removed), green lines (added)
- Clear file separation showing what changes in each
- **Shows:** Composer groups changes across files into one coherent view 📄

---`,
      },
      {
        id: 7,
        title: "Next Steps: Add a Database",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `Once your app works in memory (in React state), it's time to save pets permanently.

You'd prompt: *"Connect this component to Supabase. Create a \`pets\` table with columns: id, name, breed, photoUrl, createdAt. Save pets to Supabase. Load pets on page load. Keep the delete button wired to Supabase delete."*

Cursor would guide you through the changes. This is still Modules 4-5 territory.

## Activity: Build the Pet Tracker 🐕

Follow the lessons step by step and build the pet tracker.

### Step-by-step instructions:

**Step 1: Create \`.cursorrules\`** at the root of your project with:
\`\`\`
# .cursorrules
This is a Next.js App Router + TypeScript + Tailwind app.
Use server components by default.
Keep components small and focused.
Mock data goes in lib/mockData.ts.
\`\`\`

**Step 2: Open \`app/page.tsx\` and clear it.** Use Cmd+L chat to ask:
\`\`\`
Create a page component for a pet tracker with:
- A form to add a pet (name, breed, photo URL)
- A grid showing all pets
- Each pet card has: photo, name, breed, delete button
Use TypeScript, Tailwind CSS, React state for now (no database yet).
\`\`\`

**Step 3: Review the code** Cursor generates. Read it carefully. Does it look good?

**Step 4: Test it** — save, look at localhost:3000, try adding a pet.

**Step 5: If something's wrong**, use Cmd+L to ask:
\`\`\`
The delete button doesn't work. Here's the error: [paste error].
The pet stays in the list. What's wrong?
\`\`\`

**Step 6: Iterate** — keep refining with Cmd+K and Cmd+L until it works perfectly.

### Submission:
- Screenshot of your working pet tracker showing:
  - The add form visible
  - At least 2 pets in the grid
  - Running at localhost:3000
- List 2 prompts you used (and what they fixed)
- Which Cursor mode (Tab, Cmd+K, Chat, Composer) was most useful?

## Knowledge Check (Mapped to Your Objectives)

**Objective 1 — Build with Cursor:**
- **Quiz Q4-k1:** "What's the difference between Cursor and Claude Code?" ✅
- **Quiz Q4-k2:** "Cmd+K is best for..." ✅
- **Written check:** Show your working pet tracker and explain one prompt you used.

**Objective 2 — Use context and @-mentions:**
- **Quiz Q4-k3:** "What should you put in \`.cursorrules\`?" ✅
- **Written check:** Write a \`.cursorrules\` file for a Next.js + Tailwind app you're building.

**Objective 3 — Debug and iterate:**
- **Quiz Q4-k4:** "When you get an error, you should..." ✅
- **Written check:** Write a prompt asking Cursor to fix a specific error (include the error message).

**Scenario-based checks:**
- (a) You're building a form. Should you use Cmd+K or Composer? Why?
- (b) You want to add a header component to multiple files. What Cursor mode is best?
- (c) You keep forgetting to tell Cursor your tech stack. What's the solution?
- (d) Cursor's suggestion looks wrong. What should you do before accepting it?

## Tools & Alternatives (This Module)

**Cursor is the default**, but there are alternatives:

| Tool | Best when |
| --- | --- |
| **Cursor** (what we use) | You want the most integrated AI in your editor |
| VS Code + GitHub Copilot | You won't switch editors / team uses VS Code |
| Zed | You want a fast editor |

The skills (prompting, testing, debugging) work in all of them. You're learning the *technique*, not just the tool.

## Key Takeaways

- Cursor is AI in your editor — use all four modes (Tab, Cmd+K, Chat, Composer) 💻
- Set up \`.cursorrules\` once, save yourself from repeating context
- The flow: prompt → read → test → refine
- Use Cmd+K for one block, Composer for multi-file changes
- Test after every change; use errors to debug
- You build incrementally, one verified step at a time

**Next:** Module 5 — Building in Claude Code (The Agentic Flow!)`,
      },
    ]
  },
};

export const module5Steps: Record<Version, ModuleStepSequence> = {
  adult: {
    moduleId: 6,
    moduleName: "Module 5: Building Apps in Claude Code (Agentic)",
    totalDuration: 390,
    steps: [
      {
        id: 1,
        title: "Setup & the agentic mindset",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `**Step 1 — Install Claude Code** and sign in; open your terminal in the \`invoice-tracker\` folder from Module 4.

**Step 2 — Start it** by running \`claude\`. You now have an agent that can read your whole repo, propose changes, run commands, and edit files — from the terminal.

\`\`\`bash
cd invoice-tracker
claude
\`\`\`

**[SCREENSHOT PLACEHOLDER: Claude Code Welcome]**

**What this screenshot should show:**
- Terminal window with \`claude\` command output
- Welcome message from Claude Code (version, session start)
- Cursor ready for user input (e.g., \`You:\`)
- Proof that Claude Code is installed and running

**The mindset shift:** in Cursor you think in *edits*; in Claude Code you think in *goals*. Instead of "change this line," you say "add an invoices feature that lists and creates invoices tied to clients." The agent figures out which files to touch. Your job moves up a level: describe intent clearly, then review what it did.

---`,
      },
      {
        id: 2,
        title: "[CLAUDE.md](http://CLAUDE.md): persistent project context",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `The agentic equivalent of Cursor's \`.cursorrules\` (Module 4) — and the same Module 1 principle: context = quality. \`CLAUDE.md\` is a file the agent reads at the start of every session. Generate a starter with \`/init\`, then edit it:

\`\`\`
# CLAUDE.md
This is a Next.js (App Router) + TypeScript + Tailwind app: an invoice tracker.
Data is mock/in-memory for now (Supabase comes in Module 7).
Use server components by default; keep components small and typed.
Follow the existing patterns in app/clients for new features.
\`\`\`

Pointing the agent at existing code (\`app/clients\`) makes new features match what you built. Maintain [CLAUDE.md](http://CLAUDE.md) as the project grows — it's the memory that keeps the agent consistent.

> **Cross-tool note ([AGENTS.md](http://AGENTS.md)):** \`CLAUDE.md\` is Claude Code's file; \`.cursorrules\` (Module 4) is Cursor's. There's also a vendor-neutral standard, **\`AGENTS.md\`**, that many tools read (create-next-app scaffolds both). Keep them consistent, or treat \`AGENTS.md\` as the shared source.
> 

**[SCREENSHOT PLACEHOLDER: CLAUDE.md File]**

**What this screenshot should show:**
- Editor window with CLAUDE.md open
- 5-10 lines of project conventions (framework, language, patterns, style)
- Example content: "Next.js App Router, TypeScript, Tailwind CSS, follow patterns in app/clients"
- Proof: persistent context file is created and editable

---`,
      },
      {
        id: 3,
        title: "Plan mode: propose before doing",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `The single most important agentic habit for beginners. Before a big change, use plan mode (\`/plan\`) so the agent proposes an approach *before* editing anything. You review, correct, then let it execute — preventing the classic failure where the agent confidently does the wrong thing across ten files.

**Flow:** describe the goal → agent returns a plan (files it will create/change, in order) → you check it against your intent and the Module 3 build order → approve or refine (Module 2's critique-and-refine, applied to a plan) → agent executes.

**[SCREENSHOT PLACEHOLDER: Plan Mode Output]**

**What this screenshot should show:**
- Terminal showing Claude Code's response to \`/plan\` command
- Numbered list of steps (e.g., "1. Create types/invoice.ts", "2. Create app/invoices/page.tsx", etc.)
- Each step describes a file and its purpose
- No changes have been made yet (just a proposal)
- Proof: agent proposes before executing

> **Instructor note:** Show a plan you *reject* and refine, not just a happy path. Steering the plan is the skill.
> 

---`,
      },
      {
        id: 4,
        title: "Orchestrate a multi-file build end to end",
        type: "lesson",
        duration: 90,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 1. Build the **invoices** feature agentically — it spans several files, where agentic flow shines.

**Step 1 — State the goal** (feature-level five-ingredient prompt): "Add an invoices feature. Create an \`Invoice\` type (id, clientId, amount, dueDate, status). Add a page at \`app/invoices\` that lists invoices in a Tailwind table, and a form to create one referencing an existing client. Use mock data and follow the patterns in \`app/clients\`. Show me a plan first."

Here's what a strong prompt looks like (five ingredients: task, context, constraints, tone, examples):

\`\`\`
Task: Add an invoices feature to the invoice-tracker.
Context: The app has a clients feature (app/clients) with mock data. I've built it with Next.js App Router, TypeScript, and Tailwind.
Constraints: Mock data (no database yet—that's Module 7). Follow the folder structure and patterns of app/clients. Each invoice references a clientId.
Tone: Be professional and skip explanations—I'll review the plan first.
Examples: Invoice type should have fields: id (uuid), clientId (string), amount (number), dueDate (Date), status ('draft' | 'sent' | 'paid').
Plan first, then execute.
\`\`\`

**Step 2 — Review the plan**; confirm it creates:
- \`types/invoice.ts\` (the \`Invoice\` type)
- \`app/invoices/page.tsx\` (list page with Tailwind table)
- \`app/invoices/form.tsx\` (create form, reusing clients patterns)
- Mock data in \`lib/mock-invoices.ts\`

**Step 3 — Let it execute**, then review the diff across files. Run \`npm run dev\` and confirm \`/invoices\` works. The diff should show files added/modified, with green (new code) and red (removed code) clearly visible. Check:
- Type matches your spec
- Form has proper client dropdown
- List page shows all invoices
- No console errors in the browser

**Step 4 — Iterate** with follow-ups (add filtering, sorting, etc.). The habit is unchanged: **goal → plan → execute → verify → next.**

**Concrete code example** — what the Invoice type might look like after Claude Code generates it:

\`\`\`typescript
// types/invoice.ts
export interface Invoice {
  id: string;
  clientId: string;
  amount: number;
  dueDate: Date;
  status: 'draft' | 'sent' | 'paid';
  createdAt: Date;
}
\`\`\`

And a stub for the form component:

\`\`\`tsx
// app/invoices/form.tsx
'use client';
import { useState } from 'react';
import { Invoice } from '@/types/invoice';

export default function InvoiceForm() {
  const [formData, setFormData] = useState({
    clientId: '',
    amount: '',
    dueDate: '',
    status: 'draft',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Claude Code will add: create invoice, redirect, etc.
    console.log('Submit:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Client</label>
        <select value={formData.clientId} onChange={(e) => setFormData({ ...formData, clientId: e.target.value })} />
      </div>
      {/* Amount, Due Date, Status fields */}
      <button type="submit">Create Invoice</button>
    </form>
  );
}
\`\`\`

**[SCREENSHOT PLACEHOLDER: Multi-File Diff]**

**What this screenshot should show:**
- Terminal showing Claude Code's diff output
- Multiple files listed (e.g., \`types/invoice.ts\`, \`app/invoices/page.tsx\`, \`app/invoices/form.tsx\`)
- For each file: red lines (removed), green lines (added)
- Accept/reject prompt at the end
- Proof: agent changed multiple files coherently in one operation

The payoff vs. Module 4: you described one feature and the agent handled the whole set of files.

---`,
      },
      {
        id: 5,
        title: "Directing and reviewing safely",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 2. Two habits:

- **Direct with a written plan.** Clear goal and constraints → better plan. Reuse [CLAUDE.md](http://CLAUDE.md) so you don't repeat context.
- **Review every diff before accepting.** The agent shows what it changed — read it. You own every line, even the ones an agent wrote (Module 1). Never blind-accept a multi-file change.

**Permissions:** Claude Code asks before sensitive actions (running commands, editing files); control the rules with \`/permissions\`. For beginners, keep approvals on. Useful: \`/context\` (see the window) and \`/compact\` (summarize a long session so the agent doesn't lose earlier detail — the Module 1 "lost detail" risk).

**[SCREENSHOT PLACEHOLDER: Permission Prompt]**

**What this screenshot should show:**
- Terminal showing Claude Code asking for permission
- Prompt: "I will run \`npm install\`. Approve? (yes/no)"
- Or: "I will edit 3 files. Review the diff first? (yes/no)"
- Shows the safeguard mechanism at work
- User is in control (can deny or require review)

---`,
      },
      {
        id: 6,
        title: "Cursor vs. Claude Code: which for which task",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 3. Not competitors — complementary; skilled builders use both.

| Reach for… | When the task is… | Examples |
| --- | --- | --- |
| **Cursor** (in-editor) | Focused, local, watch each edit | Tweak a component, fix one function, style a page |
| **Claude Code** (agentic) | Large, multi-file, or repetitive | Add a whole feature, rename a concept everywhere, big refactor |

**Rule of thumb:** small/local → in-editor; large/cross-cutting → agentic. Many run both (the 2026 solo stack is Cursor + Claude Code). **Alternatives:** Codex CLI, Copilot agent mode, open-source Cline/Continue — the skill (goal → plan → review) transfers; Claude Code is the default for its repo-wide performance and terminal-native fit.

## Hands-on activity (~60 min, folded in)

**"Ship the invoices feature agentically."** Using Claude Code with a maintained [CLAUDE.md](http://CLAUDE.md), add the invoices feature. Here's the step-by-step:

### Step-by-step walkthrough:

1. **Start Claude Code** in your \`invoice-tracker\` folder:
   \`\`\`bash
   claude
   \`\`\`

2. **Paste the goal** (from Lesson 5.4; include the five-ingredient format for best results):
   \`\`\`
   Add an invoices feature. Create an Invoice type (id, clientId, amount, dueDate, status). 
   Add a page at app/invoices that lists invoices in a Tailwind table, and a form to create 
   one referencing an existing client. Use mock data and follow the patterns in app/clients. 
   Show me a plan first.
   \`\`\`

3. **Review the plan** Claude Code returns. It should list:
   - \`types/invoice.ts\` (type definition)
   - \`app/invoices/page.tsx\` (list view)
   - \`app/invoices/form.tsx\` (form component)
   - \`lib/mock-invoices.ts\` (mock data)
   
   **If the plan is off**, refine it: "Don't create a separate form component—put it on the same page for now" or "Add a delete button in the table."

4. **Approve execution** after reviewing. Claude Code will show a diff. Check:
   - New files are TypeScript-correct (no syntax errors)
   - Form has a client dropdown (not hardcoded)
   - Table displays all invoice fields
   - Mock data has 3–5 sample invoices

5. **Run the app** locally:
   \`\`\`bash
   npm run dev
   \`\`\`
   Visit \`http://localhost:3000/invoices\` and test: create an invoice, see it in the list, refresh and it's still there (mock data persists during the session).

6. **Iterate** (optional):
   - "Add a status badge (Tailwind colors: draft=gray, sent=blue, paid=green)"
   - "Sort invoices by dueDate descending"
   - "Add a search filter by client name"

### Deliverable:
- A running \`/invoices\` page with list + create form, tied to clients
- Screenshot of the working page
- One sentence on which task you'd have done in Cursor instead, and why
  - *Example:* "If the form styling was off, I'd use Cursor to adjust the Tailwind classes interactively, not re-generate the whole component."

## Quiz questions (preview)

These are the three questions you'll see on the quiz. Study these to prepare:

**Q5-1:** The key mindset shift from Cursor to Claude Code is thinking in:
- (a) **edits → goals** ✓
- (b) goals → edits
- (c) files → folders
- (d) tests → bugs

*Why:* Cursor is edit-focused ("change this line"); Claude Code is goal-focused ("add an invoices feature"). You describe the outcome, the agent plans the steps.

**Q5-2:** \`CLAUDE.md\` is the agentic equivalent of:
- (a) package.json
- (b) **a Cursor rules file** ✓
- (c) .gitignore
- (d) README

*Why:* CLAUDE.md serves the same role as Cursor's \`.cursorrules\` (or \`AGENTS.md\`)—persistent project context that the agent reads on every session.

**Q5-3:** Why use plan mode before a big change?
- (a) it's faster
- (b) **so the agent proposes an approach you can review before it edits anything** ✓
- (c) it saves tokens
- (d) it's required

*Why:* Plan mode (\`/plan\`) lets you review the agent's proposed approach and approve before it modifies files. This prevents the agent from confidently doing the wrong thing across many files.

## Knowledge check (mapped to objectives)

**Objective 1 — Orchestrate (Quiz Q5-1):**
- Q5-1: "The key mindset shift from Cursor to Claude Code is thinking in:" ✅ edits → goals
- *Practical check:* Submit the goal prompt you used + screenshot of the working \`/invoices\` page (proof of multi-file orchestration)

**Objective 2 — Direct & review (Quiz Q5-2, Q5-3):**
- Q5-2: Test understanding of CLAUDE.md
- Q5-3: Test understanding of plan mode and review discipline
- *Practical check:* Show a plan the agent proposed for a feature, your refinement (if any), and one thing you caught reviewing the diff.
  - **SAMPLE:** "Agent proposed renaming \`client_id\` to \`clientId\` everywhere. I refined it to only rename in new code (types/invoice.ts) to avoid breaking old clients table. Reviewing the diff, I caught that it missed updating the validation schema — I asked it to add that before accepting."

**Objective 3 — Choose workflow (Lesson 5.6 knowledge):**
- *Practical check:* For four tasks, label Cursor or Claude Code and justify:
  - (a) Rename \`Invoice\` to \`Payment\` everywhere (Cursor? Claude Code?) → **Claude Code** (cross-cutting, affects many files)
  - (b) Adjust one button's color (Cursor? Claude Code?) → **Cursor** (local, focused change)
  - (c) Add a whole notification system feature (Cursor? Claude Code?) → **Claude Code** (large, multi-file)
  - (d) Fix a typo in one component (Cursor? Claude Code?) → **Cursor** (micro-task)

**Scenario-based judgment checks:**

*For each scenario, state your action and reasoning.*

- **(a) Confusing plan:** You ask Claude Code to add a feature, it proposes a 10-file plan. You don't understand step 3. What do you do?
  - ✅ **Correct:** Ask Claude Code: "Explain step 3 in more detail. Why are you creating that file and what does it do?" This is refining the plan (Module 2 critique-and-refine).
  - ❌ **Avoid:** Just approving and hoping it works, or rejecting the whole plan and starting over.

- **(b) Verification:** The agent's diff looks good but renamed 50 variables from camelCase to snake_case everywhere. How do you verify it didn't miss any?
  - ✅ **Correct:** Ask Claude Code: "Search the codebase for any remaining camelCase versions of these variable names. Did I miss any references?" Then review the grep results.
  - ❌ **Avoid:** Accepting the diff without checking for missed references (could break the app).

- **(c) Tool choice:** You want to try two different UI approaches to the invoice form (side-by-side layout vs. stacked). Which tool would you use to test both quickly?
  - ✅ **Correct:** Cursor. You can toggle between the two approaches locally, see them in the browser immediately, without multi-file coordination.
  - ❌ **Avoid:** Claude Code for this — it's a single-file, visual iteration; agentic overkill.

- **(d) Error handling:** The agent creates a form but doesn't validate that amount > 0. You catch this in the review. Do you:
  - ✅ **Correct:** Reject the diff, ask Claude Code: "Add validation: amount must be positive, dueDate must be in the future." Then review the next diff.
  - ❌ **Avoid:** Accepting and adding validation later (you want validation in place before shipping).

**Rubric checklist (self-review before submission):**

| Criterion | Evidence |
|-----------|----------|
| **Goal clarity** | You wrote a five-ingredient prompt (task, context, constraints, tone, examples) |
| **Plan review** | You reviewed the agent's plan and refined it at least once (e.g., "Don't do X, do Y instead") |
| **Diff inspection** | You read the full diff before accepting (no blind accepts) |
| **Working app** | \`/invoices\` page loads, you can create + list invoices, form ties to clients |
| **Pattern reuse** | New code follows the same style/structure as \`app/clients\` |
| **Judgment call** | You identified one small task you'd do in Cursor instead, with reasoning |

*Pass mark: 80% and a working agentic feature submitted.*

## Tools & alternatives (this module)

Default: **Claude Code** on the **Next.js** app. Alternatives compared in Lesson 5.6 (Codex CLI, Copilot agent mode, Cline/Continue). These pair with, not replace, the in-editor tool from Module 4 — real workflows use both.

## Key takeaways

- Agentic flow means describing a *goal*; the agent plans and edits across the repo. You move up to intent + review.
- \`CLAUDE.md\` is persistent project context (the agentic \`.cursorrules\`; \`AGENTS.md\` is the cross-tool equivalent).
- Always plan before executing a big change; refine the plan, then let it run.
- Review every diff and keep permissions on — you own every line.
- Small/local → Cursor; large/cross-cutting → Claude Code. Use both.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)`,
      },
    ]
  },
  kids: {
    moduleId: 6,
    moduleName: "Module 5: Building Apps in Claude Code (Agentic)",
    totalDuration: 390,
    steps: [
      {
        id: 1,
        title: "Claude Code: The Terminal AI",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Claude Code is an AI that runs in your terminal. You open it in your project folder, describe what you want built, and it makes changes across your whole project automatically.

**How to use it:**

\`\`\`bash
cd your-project
claude
\`\`\`

Then describe your goal at a high level:

*"Add a login page to my app. Users sign up with email/password, and it saves to Supabase. After login, redirect to the home page."*

Claude Code reads your entire project, makes all the changes needed (new files, updates to existing files), and explains what it did.

**In-editor (Cursor) vs. Agentic (Claude Code):**

| Cursor | Claude Code |
| --- | --- |
| Works in one file | Works across whole project |
| Good for: tweaks, small fixes | Good for: new features, big changes |
| You guide every edit | AI plans the whole feature |
| Slower but more control | Faster but less control |

Use Cursor for edits, Claude Code for building new features.

---`,
      },
      {
        id: 2,
        title: "CLAUDE.md: Your Project Memory",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Just like \`.cursorrules\` in Cursor (Module 4), Claude Code reads a file called **CLAUDE.md** at the start of every session. This tells the AI your project's rules and conventions.

**Create a CLAUDE.md file at your project root:**

\`\`\`markdown
# CLAUDE.md

This is a Next.js (App Router) + TypeScript + Tailwind app.
Use server components by default.
Keep components small and focused.
Follow the existing patterns in app/components/ for new code.
\`\`\`

Now the AI always remembers your stack and patterns. No more repeating "I'm using Next.js and TypeScript!"

**Pro tip:** Update CLAUDE.md as your project grows. It's the AI's memory.

---`,
      },
      {
        id: 3,
        title: "Plan Mode: Propose Before Doing",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Before Claude Code makes big changes, use **Plan mode** to see what it *plans* to do before it does it.

Type \`/plan\` and describe your goal:

*"/plan Add a favorites system to the pet tracker. Users click a heart to favorite pets. Show favorite count on each card. Sort favorites first."*

Claude Code responds with a numbered plan:

\`\`\`
1. Add a "favorite" field to the Pet type
2. Create a FavoriteButton component  
3. Update the list to sort by favorite status
4. Wire up the click handler
\`\`\`

**Review the plan.** Does it make sense? If not, say so and it refines it.

Only after you approve does it actually make the changes!

---`,
      },
      {
        id: 4,
        title: "The Agentic Workflow",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `The pattern:

1. **Describe your goal** at a high level (not step-by-step)
2. **Claude Code reads your project**, understands the structure
3. **It plans the changes** across files
4. **It makes the changes** automatically
5. **It explains what it did**
6. **You review and test**

Example goal: *"Add dark mode toggle to the dashboard. Store preference in localStorage."*

Claude Code would:
- Find your layout component
- Add a ThemeContext
- Create a toggle button
- Wire up localStorage persistence
- All in one go.

**Key difference from Module 4 (Cursor):** In Cursor, you guide every edit. In Claude Code, you describe the end goal and the AI figures out all the steps across multiple files.

The agentic flow:
1. Describe your goal (high-level, not step-by-step)
2. Claude Code reads your whole project
3. Use \`/plan\` to see what it proposes
4. Approve the plan (or refine it)
5. It makes all the changes
6. Review the diffs and test

---`,
      },
      {
        id: 5,
        title: "Prompting for Claude Code",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `The prompts are different from Cursor. They're higher-level, more about goals than implementation.

**Good Claude Code prompt:**

*"Add a comment system to the blog posts. Users can leave comments on each post. Comments appear below the post. Save to Supabase. Show comment count on the post list page."*

**Bad Claude Code prompt:**

*"Create a new file called comments.tsx. Import React. Make a component..."*

(Too detailed! Let the AI figure out the structure.)

---`,
      },
      {
        id: 6,
        title: "Build a Feature With Claude Code",
        type: "lesson",
        duration: 90,
        difficulty: "easy",
        xpReward: 50,
        content: `Let's upgrade your pet tracker with Claude Code.

**Your goal:**

*"Add a favorite system to the pet tracker. Users can click a heart icon to mark pets as favorites. Show a count of favorites on each pet card. Sort the list so favorites appear first. Persist to Supabase."*

Run:

\`\`\`bash
claude
\`\`\`

Paste that goal. Claude Code will:
- Add a \`favorite\` column to your Supabase table
- Create components for the heart icon
- Update your list to sort favorites first
- Wire it all together

Then review the changes, test, and if something's off:

*"The favorites aren't staying after refresh. Debug it."*

Claude Code fixes it.

---`,
      },
      {
        id: 7,
        title: "Debugging at Scale",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `With a whole project changing, things can break. When they do:

1. **Describe the problem** with the full context
   - *"The comment section won't load. Here's the error in the console: [paste]"*

2. **Claude Code reads your whole project**, spots the issue
3. **It fixes it across all files**

---`,
      },
      {
        id: 8,
        title: "Cursor vs Claude Code: Which Tool for Which Task?",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Don't think of Cursor and Claude Code as competitors — use both for different jobs:

| Use Cursor... | Use Claude Code... |
| --- | --- |
| Tweaking one component | Adding a whole feature |
| Fixing one function | Renaming a concept everywhere |
| Styling a page | Big refactors |
| Local, focused changes | Cross-file, large changes |

**Rule of thumb:** Small and local → Cursor. Large and spread out → Claude Code.

**Alternatives:** VS Code + Copilot Agent, Zed with AI, Windsurf. They all have agentic modes. The skill (goal → plan → review) works everywhere.

## Activity: Upgrade Your Pet Tracker 🐕

Use Claude Code with a CLAUDE.md file to add a new feature (pick one):

- Favorite system (heart to mark favorites)
- Categories (group pets by type)
- Birthday reminders
- Photo gallery (multiple photos per pet)

### Concrete example: Favorite system

Here's what a good goal prompt looks like:

*"Add a favorite system to the pet tracker. Users can click a heart icon to mark pets as favorites. Show a count of favorites on each pet card. Sort the list so favorites appear first. Store favorite status in mock data (Supabase later). Follow the patterns in app/pets."*

**What code looks like after Claude Code generates it:**

\`\`\`typescript
// types/pet.ts (updated)
export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  favorite: boolean;  // NEW
  createdAt: Date;
}
\`\`\`

\`\`\`tsx
// app/pets/pet-card.tsx (updated)
'use client';
import { useState } from 'react';

export default function PetCard({ pet }: { pet: Pet }) {
  const [isFavorite, setIsFavorite] = useState(pet.favorite);

  return (
    <div className="border rounded p-4">
      <h3>{pet.name}</h3>
      <p>{pet.breed}, {pet.age} years old</p>
      <button onClick={() => setIsFavorite(!isFavorite)}>
        {isFavorite ? '❤️' : '🤍'} {pet.favorites || 0}
      </button>
    </div>
  );
}
\`\`\`

### Step-by-step walkthrough:

1. **Create CLAUDE.md** at your project root:
   \`\`\`markdown
   # CLAUDE.md
   
   This is a Next.js App Router app built with TypeScript and Tailwind.
   It's a pet tracker with mock data.
   Use server components by default.
   Follow the patterns in app/pets.
   \`\`\`

2. **Run Claude Code:**
   \`\`\`bash
   cd your-project
   claude
   \`\`\`

3. **Use \`/plan\` first:**
   \`\`\`
   /plan Add a favorite system...
   \`\`\`
   Claude Code responds with a plan. Read it and ask questions if anything is unclear.

4. **Approve and execute** (after reviewing the plan):
   \`\`\`
   /plan output looks good. Execute it.
   \`\`\`

5. **Review the diff** — Claude Code shows what files changed. Check:
   - New favorite field added to Pet type
   - Heart button appears on each card
   - Favorites are sorted to the top
   - No red error squiggles in your editor

6. **Test it:**
   \`\`\`bash
   npm run dev
   \`\`\`
   Click hearts, refresh, see favorites persist (during the session, with mock data).

7. **Iterate** if needed:
   \`\`\`
   The favorites aren't persisting after a page reload. Debug it.
   \`\`\`

### Deliverable:
- Screenshot of your new feature working
- Your CLAUDE.md file
- One example of a plan you refined before executing
- One sentence on which small task you'd do in Cursor instead (e.g., "Adjusting the button color")

## Quiz Questions (Preview)

These are the three questions on your quiz. Study these first!

**Q5-k1:** Claude Code works differently from Cursor because it thinks in:
- (a) Edits first, goals second
- (b) **Goals first, then figures out the edits** ✓
- (c) Files first, folders second
- (d) Tests first

*Why:* Claude Code is agentic — you describe the GOAL (like "add a favorites feature"), and it figures out all the steps and files needed. Cursor makes you guide every edit manually.

**Q5-k2:** \`CLAUDE.md\` in Claude Code is like:
- (a) package.json
- (b) **A Cursor rules file** ✓
- (c) .gitignore
- (d) A comment

*Why:* CLAUDE.md tells Claude Code your project's rules and conventions, just like \`.cursorrules\` does in Cursor. It's the AI's memory of your stack and patterns.

**Q5-k3:** Why use plan mode?
- (a) It's faster
- (b) **So the AI shows you its plan before changing code (you can say yes/no)** ✓
- (c) It saves tokens
- (d) It's required by law

*Why:* Plan mode (\`/plan\`) is your safety net! The AI proposes what it will do, you review it, and only THEN does it make changes. No more surprises!

## Knowledge Check (Mapped to Your Objectives)

**Objective 1 — Orchestrate multi-file features (Quiz Q5-k1):**
- Q5-k1: "The mindset shift from Cursor to Claude Code is thinking in:" ✅ edits vs. goals
- **Written check:** Submit your goal prompt for adding a feature + screenshot of it working

**Objective 2 — Use CLAUDE.md and Plan mode (Quiz Q5-k2, Q5-k3):**
- Q5-k2: "What should go in CLAUDE.md?" ✅ Tests understanding of persistent context
- Q5-k3: "What does \`/plan\` do?" ✅ Tests understanding of plan mode
- **Written check:** Show a plan Claude Code proposed, any refinement you made, and why

**Objective 3 — Choose the right tool (Lesson 5.8 knowledge):**
- **Practical check:** For four tasks, pick Cursor or Claude Code and explain:
  - (a) Rename a type everywhere (Cursor? Claude Code?)
  - (b) Adjust one button's color (Cursor? Claude Code?)
  - (c) Add a whole new feature (Cursor? Claude Code?)
  - (d) Fix a typo in one file (Cursor? Claude Code?)

**Scenario-based judgment checks:**

*For each scenario, explain what you'd do.*

- **(a) Confusing plan:** Claude Code proposes a 5-step plan you don't fully understand. What do you do?
  - ✅ **Right:** Ask it to explain step 3 in more detail before you approve.
  - ❌ **Wrong:** Just approve and hope it works, or reject and start over.

- **(b) One prompt vs. many edits:** Which is better for adding a whole new feature — one Claude Code prompt or multiple Cursor edits?
  - ✅ **Right:** One Claude Code prompt. It figures out all the files at once. Faster, less mistake-prone.
  - ❌ **Wrong:** Multiple Cursor edits. You'd have to remember what to edit in each file.

- **(c) Which tool?** You want to tweak a button's color. Cursor or Claude Code?
  - ✅ **Right:** Cursor. You see the color change instantly in one file. Fast and focused.
  - ❌ **Wrong:** Claude Code. Overkill for one color tweak.

- **(d) Multiple tools:** You're adding a new feature. Which tool do you start with, and when do you switch?
  - ✅ **Right:** Start with Claude Code to build the whole feature. Then switch to Cursor if you need to tweak the styling or fix a small bug.
  - ❌ **Wrong:** Use only Cursor for everything, or only Claude Code.

- **(e) Code you don't understand:** Claude Code creates a file you don't understand. Do you:
  - ✅ **Right:** Ask it to explain the file, and only accept after you understand it (Module 1).
  - ❌ **Wrong:** Accept it blindly because "the AI knows what it's doing."

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | You wrote a high-level goal (not step-by-step) |
| ✅ | You reviewed the \`/plan\` output and refined it at least once |
| ✅ | You reviewed the diff (changed files) before accepting |
| ✅ | The feature works on your local app (\`npm run dev\`) |
| ✅ | New code follows the patterns from existing files (same style, naming, structure) |
| ✅ | You identified one small task you'd use Cursor for instead, with a reason |
| ✅ | Your CLAUDE.md file is created and has your stack info |

*Pass mark: 80% and a working feature with CLAUDE.md submitted.*

## Tools & Alternatives (This Module)

**Claude Code is the default agentic tool**, but alternatives exist:

| Tool | Best when |
| --- | --- |
| **Claude Code** (what we use) | You want terminal-native, repo-wide automation |
| VS Code + GitHub Copilot Agent | You won't switch editors / team uses VS Code |
| Zed (agentic mode) | You prioritize editor speed |
| Windsurf | You like another AI-native interface |

The skill transfers: write a clear goal, let the agent propose a plan, review before accepting. You're learning the *technique*, not just one tool.

## Key Takeaways

- Claude Code is an agentic AI that plans across your whole project 🤖
- Create CLAUDE.md to give the AI persistent context about your project
- Use \`/plan\` to see what Claude Code will do before it does it
- Prompts are high-level goals, not step-by-step
- Use Cursor for small edits, Claude Code for new features
- Review every diff before accepting — you own all the code

**Next:** Module 6 — Design & UX (Make It Look Cool!)`,
      },
    ]
  },
};

export const module6Steps: Record<Version, ModuleStepSequence> = {
  adult: {
    moduleId: 7,
    moduleName: "Module 6: Design & UX (Make It Not Look AI-Generated)",
    totalDuration: 445,
    steps: [
      {
        id: 1,
        title: "Why AI UIs look generic",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Show the tells: default system fonts, everything the same size and weight, no breathing room, inconsistent spacing, harsh default colors, no focal point, and layouts that break on a phone. The model outputs the *most common* markup (Module 1), and common = generic. The fix isn't more AI — it's giving the AI *design direction* and knowing good from bad when you see it.

> **Aside — developing taste:** the fastest way to get a designer's eye is to study products you admire (Linear, Stripe, Notion) and notice their restraint: generous spacing, few font sizes, a tiny color palette. Copy the *principles*, not the pixels.
> 

**[SCREENSHOT PLACEHOLDER: Plain UI ("Before")]**

Browser at \`/clients\`: bare table, default fonts, cramped spacing, no visual hierarchy. Shows what "AI-generated" looks like.

---`,
      },
      {
        id: 2,
        title: "The four levers: hierarchy, spacing, typography, color",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `This begins Objective 1. The small set of principles that fixes most ugly UIs:

- **Hierarchy** — the most important thing is biggest/boldest. Vary size and weight so the eye knows where to go.
- **Spacing** — generous, *consistent* whitespace (use a scale, e.g. Tailwind's 4/8/12/16). Cramped = amateur.
- **Typography** — one good font, a clear size scale, readable line-height. Limit to 2–3 sizes per screen.
- **Color** — a restrained palette: one neutral base, one accent, semantic colors for success/error. Avoid pure black on pure white.

Teach these as *prompt direction*: "apply a consistent 8px spacing scale, one accent color, and clear type hierarchy" beats "make it look nice."

**Concrete examples — bad vs. good:**

\`\`\`tsx
// ❌ BAD — cramped, no hierarchy, too many colors
export default function Clients() {
  return (
    <div>
      <h1 style={{ fontSize: '12px', color: '#000' }}>Clients</h1>
      <table style={{ width: '100%', border: '1px solid #ccc' }}>
        <tr>
          <td style={{ padding: '2px', color: '#0066ff' }}>Name</td>
          <td style={{ padding: '2px', color: '#ff0000' }}>Email</td>
          <td style={{ padding: '2px', color: '#00aa00' }}>Status</td>
        </tr>
        {/* rows... */}
      </table>
    </div>
  );
}

// ✅ GOOD — hierarchy, consistent spacing, restrained palette
export default function Clients() {
  return (
    <div className="space-y-8 px-6 py-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Clients</h1>
        <p className="text-sm text-slate-500 mt-2">Manage your client list</p>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        {/* rows using consistent spacing and semantic colors */}
      </Table>
    </div>
  );
}
\`\`\`

**The levers in action:**
- **Hierarchy:** h1 is large and bold; column headers smaller; body text smallest
- **Spacing:** \`space-y-8\` (consistent vertical gaps), \`px-6 py-8\` (generous padding)
- **Typography:** one font family, three clear sizes (h1, h2, body)
- **Color:** slate palette (neutral), no accent needed here (save accent for actions)

---`,
      },
      {
        id: 3,
        title: "Component libraries: shadcn/ui",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 2. The fastest path to a polished, consistent look is a good component library. The default is **shadcn/ui** — accessible, themeable components you install into your own repo (you own the code). Install the CLI, add components (button, input, table, card, dialog), and rebuild the clients/invoices UI with them.

\`\`\`bash
# representative — check current shadcn docs
npx shadcn@latest init
npx shadcn@latest add button input table card
\`\`\`

Why a library beats hand-styling for beginners: consistency for free, accessibility built in (previews Module 12), a professional baseline you can theme, and it drops real code into your repo — so it pairs with Cursor/Claude Code editing. (Theming/dark mode is a natural next step shadcn supports.)

**[SCREENSHOT PLACEHOLDER: shadcn/ui Components]**

Components from shadcn/ui rendered: Button, Input, Table, Card in context of the invoice tracker. Shows polished, accessible baseline.

---`,
      },
      {
        id: 4,
        title: "Restyle the invoice tracker",
        type: "lesson",
        duration: 75,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 1 end-to-end. Take the plain clients + invoices pages and make them look professional: swap raw tables for styled components, apply the spacing scale, add hierarchy (page title, section headers), a header/nav, and an accent color. Still mock data — purely the visual layer.

Do it AI-assisted but *directed*: give Cursor/Claude Code the design direction from 6.2, review each change against the principles, iterate. **prompt → look critically → refine** — the same loop as code, for design.

**Tip (multimodal, Module 2):** paste a screenshot of a design you like (or a competitor's UI) and ask the AI to match it — a picture guides the styling far better than words.

**[SCREENSHOT PLACEHOLDER: Restyled UI ("After")]**

Side-by-side: plain \`/clients\` (left) and restyled version (right). Shows hierarchy, consistent spacing, professional typography, accent color. Desktop view.

---`,
      },
      {
        id: 5,
        title: "Responsive: does it work on a phone?",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `This completes Objective 1 and fixes one of the clearest "AI-generated" tells. AI usually generates **desktop-first** layouts that break on small screens — horizontal scroll, tiny tap targets, columns that don't stack. Professional UI works on any screen.

The essentials:

- **Mobile-first mindset** — design for a narrow screen first, then scale up. In Tailwind, base classes are mobile; \`sm:\` / \`md:\` / \`lg:\` prefixes add larger-screen overrides.
- **Stack on small, spread on large** — e.g. \`flex-col md:flex-row\`. Tables often need a card layout on mobile.
- **No fixed widths** that overflow; use \`max-w-*\` and fluid containers.
- **Tap targets** — buttons/links big enough to tap (~44px), not desktop-tiny.

Test by resizing the browser or using DevTools device mode at ~375px. And **prompt for it explicitly**: "make this responsive — stack columns on mobile, readable tap targets, no horizontal scroll," because the AI usually won't unless asked. shadcn/Tailwind make this straightforward.

**[SCREENSHOT PLACEHOLDER: Responsive Mobile View]**

Side-by-side: restyled \`/clients\` at desktop width (left) and ~375px mobile width (right). Shows table stacking to card layout, readable tap targets, no horizontal scroll. Proves responsiveness works.

---`,
      },
      {
        id: 6,
        title: "Critique and fix \"AI-looking\" UI",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 3. Give learners a checklist to audit any screen: Is there a clear focal point? Is spacing consistent? Too many font sizes/colors? Breathing room? Interactive state (hover/focus/disabled) styled? **Does it work on a phone (no horizontal scroll, columns stack)?** Then critique a deliberately generic screen and fix three specific issues.

> **Instructor note:** Put a "before" (raw AI output) and "after" (10 minutes of the levers + a responsive pass) side by side, and resize both to phone width. The gap sells the whole module.
> 

---`,
      },
      {
        id: 7,
        title: "Design-first AI tools (e.g. Claude Design)",
        type: "lesson",
        duration: 40,
        difficulty: "easy",
        xpReward: 50,
        content: `Everything above is *code-first*: you style in the editor with Tailwind/shadcn, which stays the course's default. There's also a *design-first* path worth knowing — sketch and prototype the UI in an AI design tool, then hand it to code. One notable option is **Claude Design** (Anthropic's AI design tool); it's a tool in your kit, not a required part of the workflow.

**What it does:** describe what you want and it generates prototypes, wireframes, slides, or full screens (production-ready HTML/CSS/JS). It can **build a design system from your codebase** so every screen uses your colors, type, and components, and you refine by chatting, editing on the canvas, or adjusting sliders.

**Why it matters here:** it's a natural front-end to Claude Code. A common pro workflow: **prototype the screen or flow in Claude Design → hand it to Claude Code to implement** in your real Next.js app. You can also export a design system for consistency, or export decks/one-pagers (PDF/PPTX).

**When to use which:**

- *Code-first (shadcn in the editor):* you're building the real app and want the code directly.
- *Design-first (Claude Design):* you want to explore layout/flow fast, get stakeholder buy-in, or produce a prototype before writing app code.

Both end in the same place — a styled, real app; a design-first tool just lets you think visually first.

**Alternatives:** other design-first / AI-UI tools include v0, Lovable, and Figma's AI features. The transferable idea is the *approach* (prototype visually, then hand to code) — the specific tool is your choice, and code-first with shadcn remains a perfectly complete path on its own.

> **Version note:** Claude Design is in beta and moving fast; features (design-system import, Claude Code hand-off, exports) evolve — check current docs.
> 

**[SCREENSHOT PLACEHOLDER: Claude Design Prototype]**

Screen 1: Claude Design home with prompt "What will you design today?" visible.
Screen 2: Claude Design canvas showing a generated UI prototype (dashboard, form, or flow). Shows design-first workflow output.

---

## Hands-on activity (~50 min, folded in)

**"Glow-up."** Each learner restyles their invoice-tracker with a component library and the four levers, makes it **responsive** (works at phone width), then writes a 3-point critique of their own before/after. Deliverable: before/after screenshots (desktop + mobile) + the critique.

### Step-by-step walkthrough:

**Phase 1: Capture a "before" screenshot (5 min)**
1. Run your app: \`npm run dev\`
2. Open \`http://localhost:3000/clients\` in your browser
3. Take a screenshot (desktop view)
4. Resize the browser to ~375px mobile width and take a second screenshot
5. Save both — you'll use them in your final critique

**Phase 2: Install shadcn/ui (10 min)**
1. In your terminal: \`npx shadcn@latest init\`
2. Follow the prompts (use defaults)
3. Add components: \`npx shadcn@latest add button input table card badge\`

**Phase 3: Restyle the \`/clients\` page (25 min)**

Use Cursor with this design direction prompt:

\`\`\`
Restyle the /clients page using shadcn/ui components and apply the four design levers:
1. Hierarchy: make the page title (h1) large and bold, section headers medium, body text small
2. Spacing: use consistent gap/padding (8px scale), with at least 24px between sections
3. Typography: use the Inter font (or system default), limit to 3 sizes
4. Color: use a neutral base (slate-900 for text, slate-50 for background), blue as accent for buttons

Specific changes:
- Replace the raw <table> with shadcn Table component
- Add a header with "Clients" title + "Manage your clients" subtitle
- Wrap in a Card with consistent padding
- Make buttons (add client, etc.) use the Button component with blue accent
- NO horizontal scroll, NO cramped spacing
- Test responsiveness: columns stack on small screens
\`\`\`

Then review the diff:
- ✅ Check that \`<Table>\`, \`<Button>\`, \`<Card>\` are used
- ✅ Check for consistent spacing classes (\`gap-4\`, \`p-6\`, \`space-y-8\`)
- ✅ Check that colors are consistent (no random colors)
- ✅ Check that heading sizes vary (h1 larger than body)

**Phase 4: Test responsive (mobile) view (5 min)**
1. Keep your app running
2. Open DevTools (F12)
3. Click the device toolbar icon (or Ctrl+Shift+M)
4. Set it to \`iPhone 12\` or a 375px-width preset
5. Scroll and test:
   - ✅ Table columns stack into cards (not a horizontal scrollbar)
   - ✅ Buttons are big enough to tap (~44px)
   - ✅ Text is readable (no tiny font)
6. Take a screenshot

**Phase 5: Critique your own work (5 min)**

Compare before/after. List 3 specific changes you made and why:

\`\`\`
1. Increased h1 font size from 16px to 32px → improved visual hierarchy
2. Added 24px gap between sections → more breathing room (Tailwind space-y-6)
3. Changed button colors from gray to blue accent → clear call-to-action
\`\`\`

### Deliverable:
- Before screenshot (desktop + mobile)
- After screenshot (desktop + mobile)
- 3-point critique (specific changes + reasoning)
- Optional: screenshot of your \`/invoices\` page restyled the same way

## Quiz questions (preview)

These are the four questions you'll see on the quiz. Study these to prepare:

**Q6-1:** Why do AI-generated UIs look generic?
- (a) **the model outputs the most common markup** ✓
- (b) AI dislikes design
- (c) Tailwind is ugly
- (d) they're always broken

*Why:* AI models trained on web data default to common patterns (Module 1's principle). The fix isn't better AI—it's **you** providing specific design direction (hierarchy, spacing, typography, color).

**Q6-2:** Which is NOT one of the four design levers?
- (a) hierarchy
- (b) spacing
- (c) **database indexing** ✓
- (d) typography

*Why:* The four design levers are hierarchy (what's most important?), spacing (breathing room), typography (fonts and sizes), and color (palette). Database indexing is backend, not design.

**Q6-3:** shadcn/ui is notable because:
- (a) it's a paid black box
- (b) **it installs component code into your own repo that you own** ✓
- (c) it replaces Next.js
- (d) it's backend-only

*Why:* shadcn/ui copies component code into your repo, giving you full ownership and control. You can modify, theme, and maintain it yourself—not locked into a vendor.

**Q6-4:** What's the benefit of design-first prototyping (e.g. Claude Design) before coding?
- (a) it's faster than coding
- (b) the AI can't make mistakes in design
- (c) **you see the visual intent *before* writing code, avoiding re-layout later** ✓
- (d) it replaces the need for CSS

*Why:* Design-first prototyping locks down layout and visual hierarchy before code, saving you from building the wrong layout and having to rework it all later. It's a planning tool (Module 3's principle, applied to design).

## Knowledge check (mapped to objectives)

**Objective 1 — Apply design principles (Quiz Q6-1, Q6-2):**
- Q6-1: Tests hierarchy/spacing/typography knowledge
- Q6-2: Tests responsive design understanding
- *Practical check:* Submit before/after screenshots of \`/clients\` page. For the "after," name 4 changes (e.g., "Increased heading size for hierarchy, added 16px gap between sections, used single font Geist, applied blue accent to action buttons").

**Objective 2 — Use component library (Quiz Q6-3):**
- Q6-3: "shadcn/ui installs component code..." ✅ Tests library understanding
- *Practical check:* Show the restyled screen built with shadcn/ui components. List which components you used (Button, Input, Table, Card, etc.).

**Objective 3 — Critique & fix (Lesson 6.6 knowledge):**
- *Practical check:* Given a generic screenshot, identify 3 problems and fixes:
  - **SAMPLE ANSWER:**
    1. Problem: "No focal point" → Fix: "Make the page title larger (h1) and give it color"
    2. Problem: "Cramped spacing on mobile" → Fix: "Increase padding from 4px to 12px, stack columns vertically below 768px"
    3. Problem: "Too many link colors" → Fix: "Limit to one accent color for all links and buttons"

**Objective 4 — Design-first tools (Q6-4):**
- Q6-4: "What's the benefit of design-first prototyping?" ✅ Tests Claude Design/design-first approach understanding
- *Practical check:* Describe a scenario where design-first (Claude Design) would help vs. code-first (Cursor/Claude Code). Example: "Using Claude Design for a complex dashboard layout helps me see the flow before coding. Once stakeholders approve, I hand the prototype to Claude Code to implement."

**Scenario-based judgment checks:**

*For each scenario, explain the problem and how to fix it.*

- **(a) Desktop looks pro, mobile is broken:** Your page looks professional on desktop but text overlaps on phones. What did you miss?
  - ✅ **Correct:** Responsive design (mobile-first). Fix: Add responsive classes to stack columns on mobile (\`flex-col md:flex-row\`), increase tap targets, test at 375px width.
  - ❌ **Avoid:** Ignoring mobile and hoping desktop CSS works everywhere.

- **(b) Prototype vs. code:** You're building a complex settings page with multiple sections. Would you prototype in Claude Design or code directly in Cursor? Why?
  - ✅ **Correct:** Claude Design first. Complex layouts benefit from visual prototyping before code. Once approved, hand to Claude Code to implement.
  - ❌ **Avoid:** Guessing the layout in code, building it, then realizing mid-way it needs restructuring.

- **(c) Contrast passes, colors feel jarring:** Your colors pass contrast checks but the page feels chaotic. What principle might help?
  - ✅ **Correct:** Restrain your palette. Pick 1 neutral base + 1 accent + semantic colors (success/error). Fix: swap multiple bright colors for a cohesive scheme.
  - ❌ **Avoid:** Adding more colors to differentiate things. Restraint, not variety, makes design feel intentional.

- **(d) Spacing feels cramped:** You restyled with shadcn, but the layout feels cramped even on desktop. What's wrong?
  - ✅ **Correct:** Spacing isn't consistent or generous enough. Fix: use Tailwind's spacing scale (e.g., \`gap-8 p-6\`) and check that gaps between sections are ≥ 24px.
  - ❌ **Avoid:** Adding more content. The problem is space, not information.

- **(e) Hierarchy is unclear:** Users don't know where to look on the page. The design is colorful but confusing. What's missing?
  - ✅ **Correct:** Visual hierarchy. Fix: make the primary action (e.g., "Create Invoice" button) largest and most prominent; de-emphasize secondary info.
  - ❌ **Avoid:** Making everything bold/big. Hierarchy comes from *contrast*, not volume.

**Rubric checklist (self-review before submission):**

| Criterion | Check (✅ = pass) |
|-----------|-------------|
| **Hierarchy** | Page title (h1) is clearly the most prominent; section headers and body text scale down clearly |
| **Spacing** | Consistent gaps between elements (no cramped areas); at least 24px between major sections |
| **Typography** | Single font family; 3 clear sizes (h1, body, small); readable line-height (1.5+) |
| **Color** | Restrained palette (neutral base + 1 accent + semantic colors); no pure black on white |
| **Responsive** | Works at 375px width; columns stack on mobile; no horizontal scroll; tap targets ≥ 44px |
| **Component library** | Uses shadcn/ui Button, Input, Table, Card (not raw HTML/divs) |
| **Before/after screenshots** | Desktop view + mobile view (375px) for both versions |
| **Critique** | 3 specific design changes named with reasoning (e.g., "increased h1 from 16px to 32px for hierarchy") |

*Pass mark: 80% and a restyled, responsive screen submitted.*

## Tools & alternatives (this module)

Default: **shadcn/ui** on **Tailwind**. **Alternatives:** Tailwind UI (paid), DaisyUI, Radix UI (primitives), MUI / Chakra (full systems). The *principles* (hierarchy, spacing, typography, consistency, responsive) are universal and transfer to any library or framework.

## Key takeaways

- AI UIs look generic because the model outputs the most common markup; you supply the design direction.
- Four levers fix most of it: hierarchy, consistent spacing, restrained typography, a small color palette.
- Responsive matters — awkward mobile layout is a classic AI tell; design mobile-first and test at phone width.
- A component library (shadcn/ui) gives a polished, consistent, accessible baseline fast — and you own the code.
- Direct the AI with specific design language (including "make it responsive"), then critique and refine.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)`,
      },
    ]
  },
  kids: {
    moduleId: 7,
    moduleName: "Module 6: Design & UX (Make It Not Look AI-Generated)",
    totalDuration: 445,
    steps: [
      {
        id: 1,
        title: "Design Principles",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Good design isn't magic. It's rules:

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

---`,
      },
      {
        id: 2,
        title: "Tailwind CSS (Your Design Superpower)",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `Tailwind CSS is a CSS library that's already in your Next.js app. It's classes that control how things look:

\`\`\`
className="text-xl font-bold text-blue-600"
\`\`\`

Means: big text, bold, blue.

Instead of writing CSS, you add classes.

**Common classes:**

- \`text-lg\`, \`text-xl\`, \`text-2xl\` = font sizes
- \`font-bold\`, \`font-semibold\` = boldness
- \`bg-blue-500\`, \`bg-red-600\` = background colors
- \`p-4\`, \`m-8\` = padding & margins (spacing)
- \`rounded-lg\`, \`rounded-full\` = rounded corners

**Concrete examples — before and after:**

\`\`\`tsx
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
\`\`\`

**The hack:** Ask Cursor or Claude Code: *"Make this button look better with Tailwind. Use blue colors, add padding, round the corners, and center the text."*

It applies Tailwind classes.

---`,
      },
      {
        id: 3,
        title: "Color Palette",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Don't pick colors randomly. Pick 3-5 colors that work together:

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

---`,
      },
      {
        id: 4,
        title: "Accessibility Basics",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Accessibility means people with disabilities can use your app.

**Key rules:**

1. **Text contrast** — dark text on light, or light text on dark (use WebAIM to check)
2. **Font sizes** — not too small (min 14px for body text)
3. **Color alone** — don't rely on color to communicate (add icons/text too)
   - Bad: "Red = error, green = success"
   - Good: "❌ Error" and "✅ Success"
4. **Keyboard nav** — users can tab through buttons (mostly automatic in React)
5. **Alt text on images** — describe what you see
   \`\`\`
   <img src="photo.jpg" alt="A golden retriever playing fetch" />
   \`\`\`

---`,
      },
      {
        id: 5,
        title: "Using AI to Design",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `Here's where it gets fun: show the AI a design you like, and it builds your UI to match.

1. Screenshot a design you like (from another app, website, etc.)
2. Paste it into Cursor
3. Prompt: *"Build a component that looks like this screenshot. Use Tailwind CSS and match the colors/layout/spacing as closely as you can."*

AI builds it. You test. You adjust:

*"Make the buttons bigger and the spacing tighter."*

AI adjusts.

**This is Objective 4 from Module 2:** multimodal prompting! Show, don't tell.

## Activity: Redesign Your App 🎨

Pick one page from your pet tracker and redesign it. Here's the step-by-step:

### Step 1: Capture a "before" screenshot (5 min)
1. Run your app: \`npm run dev\`
2. Open \`http://localhost:3000/pets\` (or your pet list page)
3. Take a screenshot of how it looks RIGHT NOW (boring!)
4. Save it — you'll show this as your "before"

### Step 2: Pick a color palette (5 min)

**Option A:** Visit [Coolors.co](https://coolors.co/), click "Generate," and pick a palette you like.

**Option B:** Use AI. Ask Claude Code:
\`\`\`
Suggest a fun color palette for a pet tracker (3-4 colors).
Include hex codes. Make it playful and kid-friendly.
\`\`\`

Example palette:
- Primary: \`#FF6B9D\` (pink) → use for buttons, headings
- Accent: \`#4ECDC4\` (teal) → use for hover states
- Neutral: \`#F7F7F7\` (light gray) → use for backgrounds

### Step 3: Restyle one component (20 min)

Use **Cursor** with this prompt:

\`\`\`
Redesign the PetCard component using Tailwind CSS:
- Use a blue/teal color scheme (bg-blue-50, text-blue-900, bg-blue-500 for buttons)
- Add spacing (p-6 for padding, mt-4 for gaps between elements)
- Make it look modern and clean
- Add hover effects (hover:shadow-lg, hover:bg-blue-600)
- Keep it simple and readable
- Use large font sizes (text-lg, text-xl for titles)
\`\`\`

Review the diff:
- ✅ Does it use Tailwind classes? (\`p-6\`, \`text-xl\`, \`bg-blue-500\`, etc.)
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
- Repeat steps 3-5 for \`/clients\` or your invoices page
- Keep using the same colors (consistency!)

### Deliverable:
- Before screenshot (boring/plain)
- After screenshot (styled with Tailwind)
- 2-3 sentence explanation of what you changed
  - *Example:* "I added padding (p-6) for breathing room, used blue colors for hierarchy, and made buttons bigger with hover effects. The app looks modern now instead of plain."*

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

*Why:* Instead of writing tons of CSS code, you just add classes like \`text-xl\`, \`bg-blue-500\`, \`p-4\`. Way faster and easier!

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **List 3 design principles and give an example of each.**
   - *Example answer:* "Hierarchy: make the title (h1) bigger than the description. Spacing: add p-6 padding around content. Color: use one main color (blue) + neutral (gray)."

2. **Why does contrast matter? What happens with low contrast?**
   - *Example answer:* "Low contrast makes text hard to read. Light gray text on white = you can't see it. High contrast (dark text on light background) = easy to read and accessible to everyone."

3. **Write a Tailwind class list to make a button: blue, bold, big padding, rounded.**
   - *Example answer:* \`className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"\`

### Scenario-based judgment checks:

*For each scenario, explain what's wrong and how to fix it.*

- **(a) Colors everywhere:** Your page has 8 different colors (purple, orange, pink, green, red, yellow, blue, gray). It looks chaotic.
  - ✅ **Fix:** Restrain your palette. Pick 1 main color + 1 accent + 1 neutral. Change: Use only \`bg-blue-500\` for buttons, \`text-slate-900\` for text, and \`bg-slate-100\` for backgrounds.
  - ❌ **Avoid:** Adding more colors to make it "fun." Too many colors = confusing.

- **(b) No breathing room:** Your cards have \`p-1\` (1px padding) and feel cramped even on a big screen.
  - ✅ **Fix:** Add spacing. Change: \`p-1\` to \`p-6\` (24px padding). Add gaps: \`gap-4\` between elements.
  - ❌ **Avoid:** Cramped = unprofessional. Generous spacing = better!

- **(c) Text is too small:** Your body text is \`text-xs\` and people say it hurts their eyes.
  - ✅ **Fix:** Increase font size. Change: \`text-xs\` to \`text-base\` or \`text-lg\`. Check contrast (dark text on light background).
  - ❌ **Avoid:** Making it smaller to "save space." Readability > compactness.

- **(d) No hierarchy:** All headings, text, and buttons are the same size (text-base). People don't know where to look.
  - ✅ **Fix:** Vary sizes and boldness. Change: Title to \`text-3xl font-bold\`, section headers to \`text-xl font-semibold\`, body to \`text-base\`.
  - ❌ **Avoid:** Making everything the same. Hierarchy = bigger/bolder for important stuff.

- **(e) Button is hard to click:** Your button is \`px-2 py-1\` (tiny). People miss it on phones.
  - ✅ **Fix:** Make it bigger. Change: \`px-2 py-1\` to \`px-4 py-2\` or \`px-6 py-3\`. Aim for ~44px tall.
  - ❌ **Avoid:** Small buttons. They're frustrating!

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | Before screenshot shows plain/boring styling |
| ✅ | After screenshot shows Tailwind classes applied (colors, spacing, rounded corners) |
| ✅ | Color palette is consistent (1 main color, 1 accent, 1 neutral) |
| ✅ | Spacing is generous (at least \`p-4\` or \`p-6\`, gaps between elements) |
| ✅ | Text is readable (good contrast, not too small) |
| ✅ | Buttons are big and easy to click (~44px) |
| ✅ | Page has clear hierarchy (headings are bigger/bolder than body text) |
| ✅ | You can explain 2-3 changes you made and why |

*Pass mark: 80% and before/after screenshots with explanation submitted.*

## Key Takeaways

- Good design follows rules (hierarchy, spacing, alignment, color) 🎨
- Tailwind CSS makes design easy (no writing CSS from scratch)
- Accessibility helps everyone
- Show the AI a screenshot and it can build to match
- Color palettes = consistency

**Next:** Module 7 — Supabase (The Database!)`,
      },
    ]
  },
};

export const module7Steps: Record<Version, ModuleStepSequence> = {
  adult: {
    moduleId: 8,
    moduleName: "Module 7: Data, Auth & Backend (Supabase)",
    totalDuration: 390,
    steps: [
      {
        id: 1,
        title: "Why you need a backend",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Mock data lives in your code, so it resets every reload and every user sees the same thing. A real app needs three things a backend provides: **persistence** (data survives), **accounts** (users log in), and **authorization** (each user sees only what they should).

Supabase bundles all three: a **Postgres database**, **Auth**, and **Row Level Security** — with a generous free tier and native Vercel integration for later. It's real Postgres, so the SQL and data-modeling skills transfer to any database job.

---`,
      },
      {
        id: 2,
        title: "Create a project & connect Next.js",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `This begins Objective 1.

**Step 1 — Create a Supabase project** at [supabase.com](http://supabase.com). Copy your project URL and **publishable key** from API settings.

**[SCREENSHOT PLACEHOLDER: Supabase API Settings]**

Dashboard showing: Project URL, Publishable API Key, Secret Key. Proof: credentials are visible and copyable.

**Step 2 — Store them in \`.env.local\`** (never hard-code keys — previews Module 10's env handling):

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
\`\`\`

**Step 3 — Install the SDK and create clients** with \`@supabase/ssr\` (sessions must work in server components for RLS to know the user):

\`\`\`bash
npm install @supabase/supabase-js @supabase/ssr
\`\`\`

**Browser client** (for client components & auth):
\`\`\`tsx
// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
\`\`\`

**Server client** (for server components, reads RLS-protected data):
\`\`\`tsx
// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies(); // ⚠️ async in Next 15+
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
};
\`\`\`

The **key difference:** browser clients are used in \`"use client"\` components and handle auth state; server clients run on the server and attach the user session to queries, so RLS can filter rows.

> **Tip:** a perfect agentic task (Module 5) — ask Claude Code to "set up Supabase browser and server clients using @supabase/ssr, with async cookies handling for Next.js 15+" and review the diff. The boilerplate is complex; let the agent handle it, but verify the structure.
> 

---`,
      },
      {
        id: 3,
        title: "Model your data in Postgres",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `The modeling half of Objective 1. Turn the Module 3 data model into real tables. Each gets a primary key (\`id\`) and a \`user_id\` linking rows to the logged-in user. Run in the Supabase SQL editor:

\`\`\`sql
create table clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id),
  name text not null,
  email text,
  created_at timestamptz default now()
);

create table invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id),
  client_id uuid not null references clients(id),
  amount numeric not null,
  due_date date,
  status text default 'unpaid',
  created_at timestamptz default now()
);
\`\`\`

Note \`user_id ... default auth.uid()\` so inserts populate ownership automatically. The relationships mirror the Module 3 build order.

**[SCREENSHOT PLACEHOLDER: Tables in Supabase Editor]**

Table Editor showing: clients and invoices tables with columns (id, user_id, name, email, amount, due_date, status, created_at). Proof: schema is created and visible.

---`,
      },
      {
        id: 4,
        title: "Replace mock data with real queries",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `This completes Objective 1. Swap the hard-coded arrays for live reads/writes.

\`\`\`tsx
// app/clients/page.tsx
import { createClient } from "@/lib/supabase/server";
export default async function ClientsPage() {
  const supabase = await createClient();
  const { data: clients } = await supabase.from("clients").select();
  return (
    <table className="w-full text-left">
      <thead><tr><th>Name</th><th>Email</th></tr></thead>
      <tbody>{clients?.map((c) => (<tr key={c.id}><td>{c.name}</td><td>{c.email}</td></tr>))}</tbody>
    </table>
  );
}
\`\`\`

**Write** happens in a form action calling \`supabase.from("clients").insert({ name, email })\`. Wire both, then confirm data survives a refresh — the moment the app feels real.

**Concrete example — form action:**

\`\`\`tsx
// app/clients/actions.ts (server action)
"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addClient(name: string, email: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("clients")
    .insert({ name, email }); // user_id auto-filled by auth.uid() in SQL
  
  if (error) throw error;
  revalidatePath("/clients"); // refresh the page
}
\`\`\`

\`\`\`tsx
// app/clients/form.tsx (client component)
"use client";
import { addClient } from "./actions";
import { useState } from "react";

export default function ClientForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await addClient(name, email);
      setName("");
      setEmail("");
    } catch (err) {
      alert("Error adding client: " + err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Client name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Add Client</button>
    </form>
  );
}
\`\`\`

**Verify:** add a record via the form, reload the page, and check the row in Supabase Table Editor. It's still there. The app feels real.

---`,
      },
      {
        id: 5,
        title: "Authentication: user accounts",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `This begins Objective 2. Supabase Auth handles sign-up/sign-in. Enable email/password in the dashboard, then:

\`\`\`tsx
"use client";
import { createClient } from "@/lib/supabase/client";
async function signIn(email: string, password: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) alert(error.message);
}
\`\`\`

Once signed in, Supabase stores the session in a cookie (why \`@supabase/ssr\` matters) and every request carries *who* is making it. That identity is the key to the next lesson.

*[SCREENSHOT: the Supabase Auth users list after a test signup.]*

---`,
      },
      {
        id: 6,
        title: "Authorization with Row Level Security",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Completes Objective 2 and is the most important security concept in the course. **RLS** is a per-table rule deciding which rows a user may see or change. In Supabase it's **default-deny**: turn it on with no policy and *nobody* reads anything — safe by default.

\`\`\`sql
alter table clients enable row level security;

create policy "users manage own clients"
  on clients for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
\`\`\`

\`using\` controls readable/updatable rows; \`with check\` controls what can be inserted or reassigned (without it, a user could set a row's \`user_id\` to someone else). Repeat for \`invoices\`. Now the same query from 7.4 returns only the current user's rows — the database enforces security, not your app code. (Note: RLS controls *rows*; make sure the table is also exposed to the Data API via \`anon\`/\`authenticated\` grants — that controls *table access*.)

> **Watch-out:** an AI will happily write app code that forgets RLS. Confirm it's enabled and test with two accounts — log in as A, then B, and verify they can't see each other's data.
> 

*[SCREENSHOT: an RLS policy on the clients table.]*

---`,
      },
      {
        id: 7,
        title: "Supabase vs. the alternatives",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 3.

| Option | What it is | Best when |
| --- | --- | --- |
| **Supabase** (default) | Postgres + Auth + RLS + storage, managed | Real SQL, built-in auth/security, fast setup, free tier |
| Firebase | Google's NoSQL backend + auth | Realtime/mobile-first; you prefer documents over SQL |
| Postgres + Prisma | Your own DB + typed ORM | Full control, comfortable managing the DB |
| Neon / PlanetScale | Managed serverless SQL | You need the DB only and add auth separately |

**Why Supabase is the default:** database, auth, and authorization in one beginner-friendly tool, on real Postgres, with a native Vercel path (Module 10). **Trade-offs:** Firebase is simpler for realtime/mobile but locks you into NoSQL/Google; Postgres + Prisma gives control at the cost of wiring auth/security yourself.

## Hands-on activity (~60 min, folded in)

**"Make it real."** Follow these steps to wire Supabase fully into your invoice tracker.

### Step 1: Create a Supabase project and get credentials (5 min)
1. Go to [supabase.com](https://supabase.com) and sign in
2. Create a new project (give it a name, set a password)
3. Wait for it to spin up
4. In the project dashboard, go to **Settings → API**
5. Copy your **Project URL** and **Publishable API Key**
6. Add them to \`.env.local\`:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_pub_xxx
   \`\`\`
7. Save and restart your dev server (\`npm run dev\`)

### Step 2: Install Supabase SDK (2 min)
\`\`\`bash
npm install @supabase/supabase-js @supabase/ssr
\`\`\`

### Step 3: Create Supabase client files (5 min)
Create two files in \`lib/supabase/\`:
- \`client.ts\` (browser client, from the snippet above)
- \`server.ts\` (server client, from the snippet above)

Tip: This is perfect for Claude Code (Module 5). Prompt: "Set up Supabase browser and server clients using @supabase/ssr with async cookies for Next.js 15+"

### Step 4: Create database tables (5 min)
1. In Supabase dashboard, go to **SQL Editor**
2. Create a new query and paste:
   \`\`\`sql
   create table clients (
     id uuid primary key default gen_random_uuid(),
     user_id uuid not null default auth.uid() references auth.users(id),
     name text not null,
     email text,
     created_at timestamptz default now()
   );

   create table invoices (
     id uuid primary key default gen_random_uuid(),
     user_id uuid not null default auth.uid() references auth.users(id),
     client_id uuid not null references clients(id),
     amount numeric not null,
     due_date date,
     status text default 'unpaid',
     created_at timestamptz default now()
   );
   \`\`\`
3. Click **Run** and confirm both tables exist in the **Table Editor**

### Step 5: Replace mock data with live reads (10 min)
1. Update \`app/clients/page.tsx\` to query Supabase:
   \`\`\`tsx
   import { createClient } from "@/lib/supabase/server";
   
   export default async function ClientsPage() {
     const supabase = await createClient();
     const { data: clients } = await supabase.from("clients").select();
     
     return (
       <table className="w-full">
         <thead><tr><th>Name</th><th>Email</th></tr></thead>
         <tbody>
           {clients?.map((c) => (
             <tr key={c.id}><td>{c.name}</td><td>{c.email}</td></tr>
           ))}
         </tbody>
       </table>
     );
   }
   \`\`\`
2. Create a form action for writing (see "Write" example above)
3. Test: add a client via the form, refresh the page—it's still there!

### Step 6: Enable authentication (5 min)
1. In Supabase dashboard, go to **Authentication → Providers**
2. Ensure **Email** is enabled
3. Go to **Authentication → Auth Policies → Email Templates**
4. For a course/demo, toggle **Enable Auto Confirm** so new users don't need email verification
5. Create a sign-in page using \`supabase.auth.signInWithPassword({ email, password })\`

### Step 7: Enable Row Level Security (10 min)
1. Go to **SQL Editor** and run:
   \`\`\`sql
   alter table clients enable row level security;
   
   create policy "users manage own clients"
     on clients for all
     using (auth.uid() = user_id)
     with check (auth.uid() = user_id);
   
   alter table invoices enable row level security;
   
   create policy "users manage own invoices"
     on invoices for all
     using (auth.uid() = user_id)
     with check (auth.uid() = user_id);
   \`\`\`
2. Verify in the **Table Editor**: policies are listed under each table

### Step 8: Test isolation with two accounts (10 min)
1. Sign up as **User A** (email: alice@example.com)
2. Add a client as User A
3. Sign out
4. Sign up as **User B** (email: bob@example.com)
5. Check the clients list—User A's client is NOT visible
6. Add a client as User B
7. Sign in again as User A—you see only your client
8. ✅ Isolation works!

### Deliverable:
- Screenshots showing:
  - User A's clients list (only their data)
  - User B's clients list (only their data, different from A)
  - Supabase Table Editor showing all rows (proof both exist in DB)

## Quiz questions (preview)

These are the three questions you'll see on the quiz. Study these to prepare:

**Q7-1:** A backend provides all EXCEPT:
- (a) persistence
- (b) accounts
- (c) authorization
- (d) **faster typing** ✓

*Why:* Backends solve three real problems: data persists, users log in, and access is controlled. Typing speed has nothing to do with it. (That's an IDE/editor job.)

**Q7-2:** With RLS enabled and no policy, how many rows are returned?
- (a) all
- (b) **zero — it's default-deny** ✓
- (c) only the newest
- (d) an error

*Why:* This is the critical security principle: RLS defaults to **deny everything unless you explicitly allow it**. No policy = nobody reads anything. Safe by default.

**Q7-3:** In a policy, \`auth.uid()\` gives you:
- (a) a random id
- (b) **the logged-in user's id from their session** ✓
- (c) the table name
- (d) the API key

*Why:* \`auth.uid()\` is how you identify the current user in your RLS policy. It's the bridge between "who's logged in" and "what rows can they see."

## Knowledge check (mapped to objectives)

**Objective 1 — Model & connect:** show your schema and a working query reading real data into a page.
- *Practical evidence:* Screenshot of Supabase Table Editor showing \`clients\` and \`invoices\` tables with columns; screenshot of your \`/clients\` page displaying real data (not mock).

**Objective 2 — Auth & RLS:** demonstrate sign-in and show your RLS policy plus two-account evidence of isolation.
- *Practical evidence:* Screenshots of User A's view and User B's view showing different data; SQL query of your RLS policy (\`using (auth.uid() = user_id)\`); Supabase Table Editor showing all rows exist but queries return only each user's.

**Objective 3 — Compare:** recommend Supabase, Firebase, or Postgres + Prisma for a given scenario and justify in 3–4 sentences.
- *Example scenario:* "You're building a real-time collaborative whiteboard app with mobile clients."
  - ✅ **Correct:** Firebase. You need real-time data sync and mobile SDKs; Firestore's document model is natural for collaborative edits; you trade SQL expertise for simplicity.
  - ❌ **Avoid:** Supabase here (no native mobile real-time). Postgres + Prisma (no out-of-box real-time).

**Scenario-based judgment checks:**

- **(a) Silent empty data:** User logs in and their \`/clients\` page shows an empty table. You added 3 clients via the form. What went wrong?
  - ✅ **Likely cause:** RLS is on but the policy is wrong or missing. Fix: Check that \`auth.uid() = user_id\` is in the policy's \`using\` clause. Test with two accounts.
  - ❌ **Avoid:** Assuming your code is wrong before checking RLS.

- **(b) Security oops:** You write a query like \`supabase.from("clients").select().eq("user_id", userId)\` to filter by user in your app code.
  - ✅ **Better approach:** Rely on RLS. Query \`select()\` with no filter; let the database enforce \`auth.uid() = user_id\` in the policy. It's safer (can't be bypassed).
  - ❌ **Avoid:** App-level filtering. The database must be the source of truth.

- **(c) Relationship broken:** You try to add an invoice with a \`client_id\` from a different user. The insert fails. Why?
  - ✅ **Correct:** RLS on the \`invoices\` table checks \`auth.uid() = user_id\`. You're trying to write a row owned by someone else. That's the security working as designed.
  - ❌ **Avoid:** Removing RLS to make it work. The error is catching a real threat.

- **(d) Data model:** You're modeling a multi-user expense app. Each user has expenses; each expense has tags. Where do you put \`user_id\`?
  - ✅ **Correct:** On \`expenses\` and \`tags\`. Each row is owned by a user; RLS protects both tables independently.
  - ❌ **Avoid:** Putting \`user_id\` only on expenses and leaving tags unprotected. A user could see other users' tags if you forget the policy.

- **(e) Env vars:** You hard-code your Supabase URL in \`client.ts\` instead of using \`.env.local\`.
  - ✅ **Fix:** Use \`process.env.NEXT_PUBLIC_SUPABASE_URL!\` and restart dev server. It reads from \`.env.local\`.
  - ❌ **Avoid:** Hard-coding. Makes it easy to leak (or change) by accident, and doesn't scale to production.

**Rubric checklist (self-review before submission):**

| Criterion | Check (✅ = pass) |
|-----------|-------------|
| **Tables created** | \`clients\` and \`invoices\` tables exist in Supabase with correct columns (id, user_id, name, email, amount, etc.) |
| **Foreign keys** | \`invoices.client_id\` references \`clients.id\`; both have \`user_id\` foreign key to \`auth.users(id)\` |
| **Live queries** | App reads from \`supabase.from("clients").select()\` (not mock data) |
| **Write path** | Form creates new clients via \`supabase.from("clients").insert({ name, email })\` |
| **Auth enabled** | Users can sign up/sign in; session is stored in cookies |
| **RLS enabled** | Both tables have \`enable row level security\` and \`auth.uid() = user_id\` policies |
| **Isolation tested** | Two accounts show different data; screenshots prove isolation |
| **Env vars used** | Credentials in \`.env.local\`, not hard-coded in code |

*Pass mark: 80% and a working app with auth + RLS submitted.*

## Tools & alternatives (this module)

Default: **Supabase** on **Next.js**, using \`@supabase/ssr\`. Alternatives in Lesson 7.7. Great module to build partly with Claude Code (Module 5) — the client/server boilerplate is agent-friendly, while *you* own the data model and RLS policies.

## Key takeaways

- A backend gives persistence, accounts, and authorization; Supabase bundles all three on real Postgres.
- Model data as tables with keys and relationships; \`user_id default auth.uid()\` ties rows to users.
- Connect with \`@supabase/ssr\` (async \`cookies()\`) so sessions work server-side — required for RLS.
- Auth identifies the user; RLS (default-deny, \`auth.uid()\`, \`with check\`) enforces who sees what — in the database.
- Always verify RLS with two accounts; watch for IPv6 DB connections and email-confirm defaults.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)`,
      },
    ]
  },
  kids: {
    moduleId: 8,
    moduleName: "Module 7: Data, Auth & Backend (Supabase)",
    totalDuration: 390,
    steps: [
      {
        id: 1,
        title: "What's a Database?",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `A database is just a fancy spreadsheet in the cloud. It stores your data.

**Example: Pet Tracker Database**

| id | name | breed | photoUrl | created_at |
| --- | --- | --- | --- | --- |
| 1 | Buddy | Golden Retriever | photo1.jpg | 2024-01-15 |
| 2 | Luna | Cat | photo2.jpg | 2024-01-20 |

- Each row = one pet
- Each column = a property (name, breed, photo, etc.)
- Database is online, so any device can access it

**Supabase:** A company that hosts databases. It's free for learning.

---`,
      },
      {
        id: 2,
        title: "Set Up Supabase",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Go to supabase.com and sign up (free).

1. Create a new project
2. Wait for it to spin up
3. Go to SQL Editor
4. Run this command to create a pets table:

\`\`\`sql
CREATE TABLE pets (
  id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name TEXT NOT NULL,
  breed TEXT,
  photoUrl TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

Hit "Run." Boom! You have a database table.

---`,
      },
      {
        id: 3,
        title: "Connect Your App to Supabase",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `Your Next.js app needs to talk to Supabase.

**What you need to do:**

1. Copy your Supabase URL and Publishable Key from the API settings
2. Add them to \`.env.local\`:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_pub_xxx
   \`\`\`
3. Restart your dev server: \`npm run dev\`

**Prompt Claude Code:**

*"Connect this Next.js app to Supabase. Install @supabase/supabase-js. Create a browser client file (lib/supabase/client.ts) and a server client file (lib/supabase/server.ts). Update the pet tracker so it loads pets from the \`pets\` table on page load and saves new pets via a form action."*

Claude Code will:
- Install the Supabase library
- Create browser and server clients
- Update your component to save/load from the database

**What this looks like:**

\`\`\`tsx
// lib/supabase/client.ts (simplified)
import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);
\`\`\`

Then on your page:

\`\`\`tsx
// app/pets/page.tsx
import { supabase } from "@/lib/supabase/client";

export default async function PetsPage() {
  // Load from database instead of mock data
  const { data: pets } = await supabase.from("pets").select();

  return (
    <div>
      {pets?.map((pet) => (
        <div key={pet.id}>{pet.name}</div>
      ))}
    </div>
  );
}
\`\`\`

No more mock data! Real data from Supabase.

---`,
      },
      {
        id: 4,
        title: "Read, Write, Delete",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `Three operations:

**Write (Save):**
\`\`\`javascript
supabase.from("pets").insert({ name: "Buddy", breed: "Retriever" })
\`\`\`

**Read (Load):**
\`\`\`javascript
const { data } = await supabase.from("pets").select()
\`\`\`

**Delete:**
\`\`\`javascript
supabase.from("pets").delete().eq("id", petId)
\`\`\`

You don't write these yourself — Cursor/Claude Code does. You just understand what they do.

---`,
      },
      {
        id: 5,
        title: "Security & Auth",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Supabase has security rules (RLS = Row-Level Security).

By default, it blocks everything. You have to allow:
- Who can read data?
- Who can write data?
- Who can delete data?

For a pet tracker, you'd say: *"Users can only see/edit their own pets."*

Supabase has a built-in auth system (email/password). You can use it.

## Activity: Make Your App Cloud-Based ☁️

Follow these steps to move from local (mock) data to real cloud data!

### Step 1: Create a Supabase account (5 min)
1. Go to [supabase.com](https://supabase.com)
2. Sign up with your email
3. Create a new project (give it a name like "pet-tracker")
4. Wait for it to be ready (30 seconds or so)

### Step 2: Get your credentials (3 min)
1. In the Supabase dashboard, go to **Settings → API**
2. Copy your **Project URL** (looks like: \`https://xxx.supabase.co\`)
3. Copy your **Publishable Key** (starts with \`sb_pub_\`)
4. Open your \`.env.local\` file in your code editor
5. Add these lines:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_pub_xxx
   \`\`\`
6. Save and restart your dev server: \`npm run dev\`

### Step 3: Create your database table (5 min)
1. In Supabase, go to **SQL Editor**
2. Create a new query and paste this:
   \`\`\`sql
   CREATE TABLE pets (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name TEXT NOT NULL,
     breed TEXT,
     age INT,
     created_at TIMESTAMPTZ DEFAULT now()
   );
   \`\`\`
3. Click **Run**
4. Go to **Table Editor** and confirm the \`pets\` table exists

### Step 4: Connect your app (10 min)
1. Run this command:
   \`\`\`bash
   npm install @supabase/supabase-js @supabase/ssr
   \`\`\`

2. Prompt Claude Code:
   \`\`\`
   Connect this Next.js app to Supabase.
   Install @supabase/ssr.
   Create a browser client in lib/supabase/client.ts
   Update the pets page to load from the \`pets\` table instead of mock data.
   Add a form to save new pets to Supabase.
   \`\`\`

3. Review Claude Code's changes and accept them

### Step 5: Test it! (5 min)
1. Open your app: \`http://localhost:3000\`
2. Add a new pet via the form
3. **Refresh the page** — the pet is still there! (It's saved in Supabase)
4. Open Supabase **Table Editor**, click the \`pets\` table
5. You'll see your pet in the database!

### Step 6: Optional — test on two devices (5 min)
1. Add a pet on one device
2. Open your app on a different device (phone, tablet, or another browser)
3. The new pet appears! (It's coming from the same Supabase database)

### Deliverable:
- Screenshot of your Supabase \`pets\` table showing your data
- Screenshot of your pet tracker app showing the same pets
- Proof that data persists after refresh

## Quiz Questions (Preview)

Here are your three quiz questions. Study them now!

**Q7-k1:** A database does everything EXCEPT:
- (a) Save your data permanently
- (b) Create user accounts
- (c) Control who can see what data
- (d) **Make your typing faster** ✓

*Why:* Databases store data, manage users, and control access. But they don't make you type faster—that's your editor's job! This is about what databases DO vs don't do.

**Q7-k2:** With RLS security on and NO rules set, what happens?
- (a) Everyone can see everything
- (b) **Nobody can see anything (locked by default, safe!)** ✓
- (c) Only new data shows
- (d) You get an error

*Why:* RLS defaults to LOCKED. Super safe! Nothing works until you say "allow this." You can't accidentally expose data.

**Q7-k3:** In a security rule, \`auth.uid()\` gives you:
- (a) A random ID
- (b) **The logged-in user's unique ID** ✓
- (c) The table name
- (d) The API key

*Why:* \`auth.uid()\` is the magic function that says "who's logged in right now?" That's how Supabase knows which user should see which data.

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **What's a database? How is it like a spreadsheet?**
   - *Example answer:* "A database is an organized collection of data stored in tables. Each table has rows (records) and columns (fields), just like a spreadsheet. The difference: databases are on a server, so multiple people can access them, and data persists forever (not just in a file)."

2. **Write the three operations: write, read, delete.**
   - *Example answer:*
     - Read: \`supabase.from("pets").select()\` — get all pets
     - Write: \`supabase.from("pets").insert({ name: "Buddy" })\` — add a new pet
     - Delete: \`supabase.from("pets").delete().eq("id", petId)\` — remove a pet

3. **Why do we need security rules?**
   - *Example answer:* "Security rules (RLS) make sure each user can only see and edit their own data. Without them, User A could see (or delete!) User B's pets, which is bad!"

### Scenario-based judgment checks:

*For each scenario, explain what's wrong and how to fix it.*

- **(a) Data disappeared after refresh:** You add a pet, refresh the page, and it's gone. But it WAS there a second ago.
  - ✅ **Fix:** Make sure you're loading from Supabase, not mock data. Update your page to use \`supabase.from("pets").select()\` instead of a hardcoded array.
  - ❌ **Avoid:** Mock data resets every time you refresh. Real databases remember.

- **(b) Two users see the same data:** You and your friend both have the app. You add a pet, and they see it too (without you sharing it).
  - ✅ **Likely issue:** RLS (security rules) aren't set up. Each user should only see their own data.
  - ❌ **Avoid:** Leaving the database open to everyone.

- **(c) Can't add a pet:** You submit the form but nothing happens. No error, nothing in the table.
  - ✅ **Likely issue:** The form isn't connected to Supabase, or you forgot the \`.insert()\` call. Check that your form action calls \`supabase.from("pets").insert(...)\`.
  - ❌ **Avoid:** Assuming the form is "broken." Debug by checking the code and looking for the insert call.

- **(d) Env vars problem:** You added your Supabase URL to the code but got an error about "undefined".
  - ✅ **Fix:** Use \`.env.local\` instead. Add your URL to \`.env.local\` and use \`process.env.NEXT_PUBLIC_SUPABASE_URL\` in your code. Restart your dev server.
  - ❌ **Avoid:** Hard-coding credentials. They should be in \`.env.local\`, never in your code.

- **(e) Seeing someone else's data:** You sign in and can see all pets from all users, not just yours.
  - ✅ **Fix:** This is a security problem! Enable RLS and set policies so users can only see their own rows. This is critical!
  - ❌ **Avoid:** Ignoring this. Everyone's data is exposed!

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | Created a Supabase project and have credentials (URL + key) |
| ✅ | Added credentials to \`.env.local\` (not hard-coded in code) |
| ✅ | Created a \`pets\` table with columns (id, name, breed, age, created_at) |
| ✅ | App loads pets from Supabase (not mock data) |
| ✅ | Form saves new pets to Supabase database |
| ✅ | Data persists after page refresh |
| ✅ | Screenshot of Supabase Table Editor showing your data |
| ✅ | Screenshot of app showing the same pets |

*Pass mark: 80% and working cloud-based app submitted.*

## Key Takeaways

- Database = cloud storage for your data 📦
- Supabase is an online database (free!)
- Tables have rows (data) and columns (properties)
- Save/load from cloud, not just your computer
- Security rules control who sees what

**Next:** Module 8 — Reading & Debugging Code!`,
      },
    ]
  },
};

export const module8Steps: Record<Version, ModuleStepSequence> = {
  adult: {
    moduleId: 9,
    moduleName: "Module 8: Reading & Debugging AI-Generated Code",
    totalDuration: 405,
    steps: [
      {
        id: 1,
        title: "Reading code you didn't write",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 1 — the skill the whole course's "don't ship what you can't explain" rule depends on. AI generates code faster than you can comfortably read it; the discipline is reading it *efficiently*. You can't debug — or defend at the capstone — code you can't read.

**A repeatable way to read unfamiliar (AI-generated) code:**

1. **Get the one-sentence purpose first.** What does this file/function do overall? Read the *names* before the logic.
2. **Follow the data.** Where does input come from, how is it transformed, what's returned? Trace one realistic path, not every branch.
3. **Have the AI explain it — then verify.** Ask "explain this line by line, and why." Useful, but the AI can be wrong about its own output; check against the code.
4. **Read the risky parts closely.** Anything touching auth, data, money, or external calls gets line-level attention (the Module 1 trust dial).
5. **Confirm intent.** Does it do what you asked, or something plausible-but-different?

**Concrete example — reading unfamiliar code:**

\`\`\`tsx
// AI generated this. Can you explain it line by line?
export async function updateInvoiceStatus(invoiceId: string, status: string) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  
  if (!user) return { error: "Unauthorized" };
  
  const { data, error } = await supabase
    .from("invoices")
    .update({ status })
    .eq("id", invoiceId)
    .eq("user_id", user.data.user?.id)
    .select();
  
  return { data, error };
}
\`\`\`

**Reading it systematically:**

1. **Purpose (line 1):** Updates an invoice's status. Takes \`invoiceId\` and \`status\`.
2. **Data flow:** Gets the current user → checks if authenticated → updates the invoice → returns result.
3. **Risky parts (lines 6-7):** Auth check is good. BUT line 11: does \`.eq("user_id", user.data.user?.id)\` work? Check: yes, filters to the current user's invoice only (security ✓).
4. **Trace one path:** Invoice 123 owned by Alice → Alice calls with \`status: "paid"\` → row found and updated → returns updated row.
5. **Intent match:** Does it do what you asked ("let users update their own invoice status")? Yes. ✅

**Habits:** rename unclear variables as you read; drop a one-line comment capturing the *why*; and if you still can't explain a block, **don't ship it** — simplify or ask for a version you understand. This is exactly what the capstone oral defense tests.

---`,
      },
      {
        id: 2,
        title: "The debugging mindset",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Reframe bugs: they're the normal state of building software. Expert code breaks; AI code breaks *more*, because the model produces likely-looking code that may not fit your situation (Module 1). The goal isn't to avoid bugs — it's a calm, repeatable way to find and fix them.

**The debugging loop (the spine of the rest of this module):** Read → Reproduce → Isolate → Fix → Verify.

---`,
      },
      {
        id: 3,
        title: "Read the error first",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `This begins Objective 2. Beginners paste code at the AI and say "fix it." The better first move is to *read the error* — it usually names the problem and points near the line. Three places errors show up in our stack:

- **Terminal** — where \`npm run dev\` runs; server-side errors and build failures.
- **Browser console** — (Inspect → Console) client-side JS errors.
- **Network tab** — failed requests (e.g. a Supabase call) with status codes.

A stack trace reads top-down: the top line is usually *what* went wrong, and the file:line tells you *where*. Extract those two facts first.

**[SCREENSHOT PLACEHOLDER: Next.js Error Overlay]**

Browser error overlay: red error message, file name and line number highlighted, stack trace below. Shows exactly where and what went wrong.

---`,
      },
      {
        id: 4,
        title: "Reproduce and isolate",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Continues Objective 2. A bug you can't reproduce, you can't fix. Pin the exact trigger: *what did you click, with what input, and what happened vs. expected?* Then **isolate**: every user or one? On load or on submit? Logged in or out? A quick tool: add a \`console.log\` (or ask AI to) to check what a value actually is.

> **Worked example — the RLS "empty list" bug (from Module 7):** the clients page shows nothing, but there are rows in the Table Editor. No error. Reproduce: empty when logged out (or RLS is on and the query runs without a session). Isolate: log the query result — an empty array, not an error. Root cause: RLS is default-deny and the request carried no authenticated user. A bug with *no error message but a clear root cause* — it rewards understanding over pasting code at the AI.
> 

---`,
      },
      {
        id: 5,
        title: "Debugging with AI: give it what it needs",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 3. AI is excellent at debugging — *if* you give it context (Module 1). The anatomy of a good debugging prompt:

1. **The error message** — paste the actual text/stack trace.
2. **The relevant code** — the file/function (in Cursor \`@\`-mention it; Claude Code reads the repo).
3. **Expected vs. actual.**
4. **What you've already tried.**

**Weak:** "my page is broken, help." **Strong:** "My \`/clients\` page renders an empty table. Expected: my saved clients. The query is \`supabase.from('clients').select()\`. No error. RLS is enabled. Here's the component: [@app/clients/page.tsx]. What could cause zero rows?" The strong prompt often gets the exact root cause in one shot.

**Multimodal tip (Module 2):** you can also *paste a screenshot* of the broken screen or the error overlay — the AI reads the visual directly, which is often faster than describing what's wrong.

**[SCREENSHOT PLACEHOLDER: Debugging Chat]**

Claude Code or Cursor chat: user pastes error message and mentions @app/clients/page.tsx, asks "why are clients empty?" → AI response identifies root cause ("RLS is on but no authenticated session").

---`,
      },
      {
        id: 6,
        title: "Common bug classes in our stack",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `A field guide so learners recognize patterns and diagnose quickly:

**1. Server vs. client component errors (Next.js)**
- **Symptom:** Error like "localStorage is not defined" or "click handler not firing"
- **Root cause:** Tried to use browser-only features (event handlers, localStorage, window) in a server component
- **Fix:** Add \`"use client"\` at the top of the file, OR move the logic to a child component marked \`"use client"\`
- **Example:**
  \`\`\`tsx
  // ❌ WRONG — server component, can't use onClick
  export default function Page() {
    return <button onClick={() => alert("clicked")}>Click me</button>;
  }
  
  // ✅ CORRECT — client component
  "use client";
  export default function Page() {
    return <button onClick={() => alert("clicked")}>Click me</button>;
  }
  \`\`\`

**2. Silent empty data (Supabase RLS)**
- **Symptom:** Query returns zero rows, no error message, but rows exist in the Table Editor
- **Root cause:** RLS is enabled, but the user is unauthenticated or the policy is missing
- **Fix:** Check RLS policies in Supabase; add \`using (auth.uid() = user_id)\` to your policy
- **Example:** You query \`supabase.from("clients").select()\` but get \`[]\`. Check: is RLS on? Do you have a policy? Are you logged in?

**3. Env var problems**
- **Symptom:** \`undefined\` values or "Cannot read properties of undefined"
- **Root cause:** \`.env.local\` is missing a value, or you didn't restart the dev server after adding it
- **Fix:** Check \`.env.local\`, ensure the key is spelled exactly right, and run \`npm run dev\` again
- **Example:** Used \`process.env.NEXT_PUBLIC_SUPABASE_URL\` but it's undefined → check \`.env.local\` has it → restart dev server

**4. Type errors (TypeScript)**
- **Symptom:** Red squiggly lines or "Property 'X' does not exist on type 'Y'"
- **Root cause:** The code assumes the data has a shape it doesn't actually have (e.g., assumes \`client.name\` exists, but it might be \`client.clientName\`)
- **Fix:** Read the error, check the actual data shape, fix the property name
- **Example:** \`client.name\` but the API returns \`client.firstName\` → error immediately catches it

**5. Hallucinated APIs (Module 1)**
- **Symptom:** "supabase.auth.getUserAsync is not a function" or similar
- **Root cause:** The AI made up a function that doesn't exist in the SDK
- **Fix:** Check the real docs; the correct function is usually similar but slightly different (e.g., \`getUser()\` not \`getUserAsync()\`)

**6. Framework version deprecations**
- **Symptom:** Warning like "middleware.ts is deprecated; use proxy.ts instead"
- **Root cause:** The AI generated code for an older Next.js version
- **Fix:** Read the warning, check the changelog for the current version, rename/move the file

**Recognizing the *class* of bug is most of diagnosing it.** If you see "undefined," think "env var or missing property." If you see no error but no data, think "RLS." If you see a function doesn't exist, think "hallucination — check the docs."

---`,
      },
      {
        id: 7,
        title: "Assess the fix before applying it",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 4 — the safety net. An AI fix can be wrong, incomplete, or *make the symptom disappear while hiding the real problem*. Before accepting, ask:

- **Root cause or symptom?** (Disabling RLS "fixes" the empty list — by removing your security. Wrong fix.)
- **Do I understand why it works?** If not, ask for an explanation first.
- **What could it break?**
- **Does it match our stack and conventions?** ([CLAUDE.md](http://CLAUDE.md) / .cursorrules help.)

Then **verify**: reproduce the original trigger and confirm it's gone; check the happy path still works.

> **Instructor note:** Show an AI fix that removes RLS to "solve" the empty list. Ask why it's terrible. Teaches root-cause vs. symptom better than any lecture.
> 

## Hands-on activity (~60 min, folded in)

**"Bug hunt."** You'll debug three real bugs that commonly appear when AI generates code. The goal: read the error (or lack thereof), pinpoint the root cause, and fix it safely.

### Three planted bugs:

#### Bug 1: Server/Client Component Error
**What you'll see:** Error in the browser: "addEventListener is not a function" or click handler doesn't fire

**Step 1 — Read the error (2 min)**
- Open your browser console (F12 → Console tab)
- Find the error message and the file:line it points to

**Step 2 — Reproduce (2 min)**
- Try the action that caused the error (click a button, submit a form)
- Confirm it happens every time

**Step 3 — Isolate (3 min)**
- Look at the file from the error
- Check if it has \`"use client"\` at the top
- If not, that's likely the issue

**Step 4 — Fix (2 min)**
- Add \`"use client";\` at the very top of the file
- Save and check the browser—error gone

**Step 5 — Root cause (1 min)**
- Write: "The component tried to use a click handler (browser-only feature) in a server component. Added \`"use client"\` to make it a client component."

#### Bug 2: Silent Empty Data (RLS)
**What you'll see:** The \`/clients\` page shows an empty table, but you added clients. No error in console.

**Step 1 — Read the error (1 min)**
- No error message. That's the clue.
- Empty data + no error = likely RLS

**Step 2 — Reproduce (2 min)**
- Go to \`/clients\`
- Confirm it's empty
- Open Supabase Table Editor and confirm rows exist

**Step 3 — Isolate (3 min)**
- Check: are you logged in? (If you're logged out, RLS blocks everything)
- Check Supabase dashboard: is RLS enabled on the \`clients\` table? (Look under **SQL Editor** → run \`SELECT * FROM clients;\` — do you get rows?)

**Step 4 — Check the policy (3 min)**
- Go to Supabase **Table Editor** → click \`clients\` table → scroll right to **Policies**
- Do you see a policy? Is it correct? (Should say \`auth.uid() = user_id\`)
- If missing, add it:
  \`\`\`sql
  create policy "users manage own clients"
    on clients for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);
  \`\`\`

**Step 5 — Fix (2 min)**
- Refresh the page
- Clients now appear

**Step 6 — Root cause (1 min)**
- Write: "RLS was enabled but the policy was missing. Without a policy, RLS default-denies all reads. Added the policy so authenticated users can see their own clients."

#### Bug 3: Hallucinated API Call
**What you'll see:** Error like "supabase.auth.getCurrentUserAsync is not a function"

**Step 1 — Read the error (2 min)**
- Error says the function doesn't exist
- Note the function name

**Step 2 — Find the bug (2 min)**
- Search your code for the function name (Ctrl+Shift+F)
- Find the file that calls it

**Step 3 — Check the docs (3 min)**
- Open Supabase docs for \`supabase-js\`
- Search for the function the AI called
- It doesn't exist
- Look for similar names — usually the correct one is close (e.g., \`getUser()\` instead of \`getCurrentUserAsync()\`)

**Step 4 — Fix (2 min)**
- Replace the hallucinated function with the real one
- Test — no more error

**Step 5 — Root cause (1 min)**
- Write: "The AI generated a function name that doesn't exist in the Supabase SDK. Replaced it with the correct function from the official docs."

### Deliverable:
- Screenshot or description of each bug
- For each: one sentence naming the root cause
- Example:
  1. "Bug 1: Server component using click handler. Fix: added \`"use client"\`."
  2. "Bug 2: RLS policy missing. Fix: added policy with \`auth.uid() = user_id\`."
  3. "Bug 3: AI hallucinated function name. Fix: replaced with real SDK function from docs."

## Quiz questions (preview)

These are the four questions you'll see on the quiz. Study these to prepare:

**Q8-1:** The best first move when something breaks:
- (a) paste code at the AI and say 'fix it'
- (b) **read the actual error message** ✓
- (c) rewrite everything
- (d) restart the computer

*Why:* Error messages tell you exactly what failed and where. They're your best diagnostic tool. A stack trace reads top-down: top line = what went wrong, file:line = where. Always start there.

**Q8-2:** If you can't explain a block of AI-generated code after reading it, you should:
- (a) ship it anyway
- (b) **not ship it — simplify or get a version you understand** ✓
- (c) delete the whole file
- (d) hide it

*Why:* This is the capstone defense principle (Module 1). You own and maintain the code. Never ship what you don't understand. If you can't explain it, it's not ready.

**Q8-3:** An AI "fix" that disables RLS to solve an empty list is:
- (a) a good fix
- (b) **a dangerous fix that removes security (symptom, not root cause)** ✓
- (c) the only option
- (d) fine

*Why:* Disabling RLS treats the *symptom* (empty rows) but removes *security*. The real cause is usually unauthenticated request or missing policy. Distinguish root-cause from symptom every time.

**Q8-4:** Before applying an AI-proposed fix, you should:
- (a) just apply it — the AI knows what it's doing
- (b) **read the code, understand what it changes, ask the AI to explain any unclear lines, confirm against the bug** ✓
- (c) skip it if it's too long to read
- (d) apply it to production first to test

*Why:* You own what ships (Module 1). Loop: read → understand → verify it solves the actual bug → then apply. Never blind-accept AI code.

## Knowledge check (mapped to objectives)

**Objective 1 — Read & explain (Quiz Q8-1):**
- Q8-1: Tests understanding of reading code you don't own
- *Practical:* Given an AI function, explain in 3 sentences + flag one risky line (auth, data, external call)

**Objective 2 — Diagnose (Quiz Q8-2):**
- Q8-2: "An AI 'fix' that disables RLS..." ✅ Tests root-cause vs. symptom understanding
- *Practical:* Given an error + code snippet, state root cause + file:line

**Objective 3 — Use AI to debug (Quiz Q8-3):**
- Q8-3: "Before applying an AI-proposed fix..." ✅ Tests verification discipline
- *Practical:* Write a strong debugging prompt with all 4 parts: error message, code (@-mention), expected vs. actual, what you tried
  - **SAMPLE:** "My /clients page shows empty table. Expected: my saved clients. Query: \`supabase.from('clients').select()\`. No error. RLS is on. Code: @app/clients/page.tsx. I tried refreshing and logging in/out — same empty result. What's the root cause?"

**Objective 4 — Assess fix safety (Q8-4):**
- Q8-4: Tests evaluating fix correctness
- *Practical:* Given a bug + two fixes (one correct, one hides symptom), pick the right one + explain why the other is dangerous
  - **SAMPLE:** "Bug: empty client list. Fix A: add RLS policy so authenticated users see their clients. Fix B: set RLS to off. Answer: Fix A (correct). Fix B is dangerous because it removes security and exposes all users' data."

**Scenario-based judgment checks:**

*For each scenario, explain what's wrong and how you'd diagnose it.*

- **(a) "Cannot read properties of undefined":** Your page crashes with this error. What are three possible root causes?
  - ✅ **Correct answers:** (1) Missing env var (\`process.env.X\` is undefined), (2) Data shape mismatch (assumed \`user.id\` but it's \`user?.id\`), (3) Forgot to await an async call (value is promise, not data)
  - ❌ **Avoid:** Guessing. Read the stack trace — it points to the exact line that failed.

- **(b) Blank table, no error:** Your \`/invoices\` page renders an empty table, no console errors, but invoices exist in Supabase.
  - ✅ **Diagnosis:** Check RLS. Is the policy on? Are you logged in? Log the query result in the browser console to confirm it returns \`[]\`.
  - ❌ **Avoid:** Assuming the code is wrong. Check infrastructure (auth, RLS) first.

- **(c) AI gave you a function that doesn't exist:** You got "is not a function" error. How do you find the real function?
  - ✅ **Correct:** Search the official SDK docs for similar names. The real function is usually 90% the same name but slightly different.
  - ❌ **Avoid:** Asking the AI to fix it blindly. It might halluci again. Read the real docs yourself.

- **(d) You understand the fix, but it feels wrong:** AI proposes removing a security rule to "fix" an empty list bug.
  - ✅ **Correct:** Reject it. It treats the symptom, not the root cause. The real cause is a missing RLS policy, not "too much security."
  - ❌ **Avoid:** Accepting the shortcut. Security is not the problem; misunderstanding the data model is.

- **(e) You fixed the bug, but now something else broke:** After applying the fix, a different page now shows an error.
  - ✅ **Correct:** Revert, investigate. The fix might have broken something else (e.g., a shared function). Re-apply with more surgical precision.
  - ❌ **Avoid:** Applying the fix and shipping without testing the full app.

**Rubric checklist (self-review before submission):**

| Criterion | Check (✅ = pass) |
|-----------|-------------|
| **Bug 1 diagnosis** | Identified as server/client component error; fixed by adding \`"use client"\` |
| **Bug 1 explanation** | Root cause: browser-only feature in server component |
| **Bug 2 diagnosis** | Identified as RLS (no error, but no data); checked policies |
| **Bug 2 fix** | Added or verified RLS policy with \`auth.uid() = user_id\` |
| **Bug 2 explanation** | Root cause: RLS policy was missing or incorrect |
| **Bug 3 diagnosis** | Identified hallucinated function; checked real SDK docs |
| **Bug 3 fix** | Replaced with correct SDK function |
| **Bug 3 explanation** | Root cause: AI generated non-existent function name |
| **All bugs fixed** | The app runs without errors; all three issues resolved |
| **Root causes named** | For each bug: wrote one clear sentence explaining the real problem (not the symptom) |

*Pass mark: 80% and bug hunt completed.*

## Tools & alternatives (this module)

Reading and debugging are tool-agnostic — the loops (read; reproduce → isolate → fix → verify) work anywhere. Defaults: **Cursor** for local reading/bugs (\`@\`-context, select-and-Cmd+K), **Claude Code** for repo-wide investigation. Browser DevTools and the terminal are your non-AI instruments and remain essential.

## Key takeaways

- Read and understand AI-generated code before you ship or debug it — the capstone defense tests exactly this.
- Bugs are normal; AI code breaks more. Loop: read → reproduce → isolate → fix → verify.
- Read the error first (terminal, console, network); a stack trace names the what and where.
- Give AI real context to debug: actual error, relevant code, expected vs. actual, what you tried.
- Assess every fix for root-cause vs. symptom before applying; then verify.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)`,
      },
    ]
  },
  kids: {
    moduleId: 9,
    moduleName: "Module 8: Reading & Debugging AI-Generated Code",
    totalDuration: 405,
    steps: [
      {
        id: 1,
        title: "Reading Code Like a Programmer",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `Code is instructions. Read it top-to-bottom:

\`\`\`javascript
function addPet(name, breed) {
  const newPet = { name, breed, id: Math.random() };
  pets.push(newPet);
  return newPet;
}
\`\`\`

*What does this do?*
- Line 2: Create a new pet object with name, breed, and random ID
- Line 3: Add it to the pets list
- Line 4: Send back the new pet

**Ask yourself:**
- What inputs does this take?
- What does it return?
- What could go wrong?

---`,
      },
      {
        id: 2,
        title: "Error Messages Are Your Friends",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `When your app breaks, you get an error message in the console (browser developer tools).

Example error:
\`\`\`
Uncaught TypeError: pets.push is not a function
\`\`\`

This tells you:
- WHERE it broke: \`pets.push\`
- WHAT went wrong: \`pets\` is not a function (you probably meant an array, not a function)

**Pro move:** Copy the error and ask Claude Code: *"I got this error: [paste]. Fix it."*

Claude Code reads your code + the error and fixes it.

---`,
      },
      {
        id: 3,
        title: "Common Bugs",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `**Bug 1: Variable typo (easy to catch)**
\`\`\`javascript
const newPet = { name };
petList.push(newPet);  // ❌ Wrong! It's "pets" not "petList"
// FIX:
pets.push(newPet);  // ✅ Right
\`\`\`

**Bug 2: Forgot to await (Supabase returns a promise)**
\`\`\`javascript
const data = supabase.from("pets").select();  // ❌ Missing await!
console.log(data);  // Will be { then: ... } (a promise, not data)

// FIX:
const data = await supabase.from("pets").select();  // ✅ Now data is the actual array
console.log(data);  // [{ id: 1, name: "Buddy" }, ...]
\`\`\`

**Bug 3: State update doesn't refresh React**
\`\`\`javascript
// ❌ WRONG — direct mutation, React doesn't know to re-render
pets.push(newPet);

// ✅ RIGHT — use setState so React knows to update the display
setPets([...pets, newPet]);
\`\`\`

**Bug 4: Can't explain AI code (sanity check)**
\`\`\`javascript
// AI gave you this. You can't explain what it does. DON'T SHIP IT.
const result = data.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

// FIX: Ask AI to simplify, or get a version you understand:
const petMap = {};
pets.forEach(pet => {
  petMap[pet.id] = pet;
});
\`\`\`

---`,
      },
      {
        id: 4,
        title: "Debugging Strategies",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `**Strategy 1: Console logs**

Add \`console.log()\` before and after suspicious code:

\`\`\`javascript
console.log("About to add pet:", newPet);
addPet(newPet);
console.log("Pet added!");
\`\`\`

Check the browser console (F12) to see what's happening.

**Strategy 2: Read the code line-by-line**

Ask: "Does this line do what I think it does?"

**Strategy 3: Test one thing at a time**

Don't change five things and hope. Change one, test, then next.

## Activity: Spot the Bug 🐛

You'll debug real code and practice the diagnosis loop: read error → reproduce → find the root cause → fix it.

### Step-by-step bug hunting:

#### Bug #1: Missing \`await\`

**Code:**
\`\`\`javascript
async function loadPets() {
  const pets = supabase.from("pets").select();
  console.log(pets);  // What will this show?
}
\`\`\`

**Step 1 — Read the error (1 min)**
- Run this code
- Check the browser console
- Notice: \`pets\` is not an array. It's a Promise object with \`{ then: ... }\`

**Step 2 — Diagnose (2 min)**
- The error: \`select()\` returns a Promise, but you didn't wait for it
- Root cause: missing \`await\`

**Step 3 — Fix (1 min)**
\`\`\`javascript
async function loadPets() {
  const pets = await supabase.from("pets").select();  // ✅ Added await
  console.log(pets);  // Now shows the real array
}
\`\`\`

**Step 4 — Explanation (1 min)**
- Write: "Supabase queries return Promises. I forgot \`await\`, so I got a Promise object instead of the data. Added \`await\` and now it works."

#### Bug #2: Typo in variable name

**Code:**
\`\`\`javascript
export default function PetsPage() {
  const petList = [  // Define as "petList"
    { id: 1, name: "Buddy" },
    { id: 2, name: "Luna" }
  ];

  return (
    <div>
      {pets.map(pet => (  // But use as "pets" — typo!
        <div key={pet.id}>{pet.name}</div>
      ))}
    </div>
  );
}
\`\`\`

**Step 1 — Read the error (1 min)**
- Browser shows: "pets is not defined"

**Step 2 — Find the bug (2 min)**
- Search for where \`pets\` is defined
- Notice: it's defined as \`petList\`, not \`pets\`
- Typo!

**Step 3 — Fix (1 min)**
\`\`\`javascript
const pets = [  // ✅ Changed to "pets"
  { id: 1, name: "Buddy" },
  { id: 2, name: "Luna" }
];
\`\`\`

**Step 4 — Explanation (1 min)**
- Write: "Variable was defined as \`petList\` but used as \`pets\`. Changed the definition to \`pets\`."

#### Bug #3: Direct mutation (React doesn't update)

**Code:**
\`\`\`javascript
function AddPetButton() {
  const [pets, setPets] = useState([
    { id: 1, name: "Buddy" }
  ]);

  function addPet() {
    pets.push({ id: 2, name: "Luna" });  // ❌ Direct mutation
    // The page doesn't update!
  }

  return (
    <div>
      <button onClick={addPet}>Add Pet</button>
      {pets.map(pet => <div key={pet.id}>{pet.name}</div>)}
    </div>
  );
}
\`\`\`

**Step 1 — Reproduce (2 min)**
- Click the button
- "Luna" doesn't appear
- But if you console.log(pets), Luna is in the array!
- Bug: React didn't re-render

**Step 2 — Diagnose (2 min)**
- Direct mutation (\`.push()\`) changes the array, but React doesn't see the change
- React only updates when you call \`setPets()\` with a NEW array

**Step 3 — Fix (1 min)**
\`\`\`javascript
function addPet() {
  setPets([...pets, { id: 2, name: "Luna" }]);  // ✅ Create new array
}
\`\`\`

**Step 4 — Explanation (1 min)**
- Write: "React only updates the display when state changes via \`setState\`. Direct mutation doesn't trigger a re-render. Fixed by using \`setPets()\` with a new array."

### Deliverable:
- Fix all three bugs
- For each bug: write the root cause (one sentence)
- Example:
  1. "Missing \`await\` on Supabase query"
  2. "Variable typo: defined as \`petList\`, used as \`pets\`"
  3. "Direct array mutation doesn't trigger React re-render; need \`setState\`"

## Quiz Questions (Preview)

Here are your three quiz questions. Study these!

**Q8-k1:** When your code breaks, the first thing to do is:
- (a) Ask the AI to fix it immediately
- (b) **Read the error message (it tells you what went wrong!)** ✓
- (c) Rewrite everything
- (d) Restart your computer

*Why:* Error messages are GOLD! They tell you exactly what's broken and where. The error message is your best friend. Always read it first!

**Q8-k2:** If you can't explain a line of AI code after reading it carefully, you should:
- (a) Ship it anyway
- (b) **Don't ship it yet — simplify it or ask for a version you understand** ✓
- (c) Delete the whole file
- (d) Ignore it

*Why:* You're responsible for every line of code in your app. If you don't understand it, you can't maintain it, and you can't defend it (that's what the capstone tests!). Never ship code you don't understand.

**Q8-k3:** If the AI "fixes" a problem by removing security (like RLS), that's:
- (a) A good fix
- (b) **Dangerous (it hides the real problem)** ✓
- (c) The only way
- (d) Fine

*Why:* That's a band-aid, not a real fix! Removing security to make an error disappear treats the symptom, not the root cause. Find what's REALLY wrong.

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **Read this code and explain what it does (2-3 sentences):**
   \`\`\`javascript
   export default function PetCard({ pet }) {
     return (
       <div className="pet-card">
         <h2>{pet.name}</h2>
         <p>{pet.breed}</p>
       </div>
     );
   }
   \`\`\`
   - *Example answer:* "This is a React component that displays a single pet. It takes a pet object as a prop and shows the pet's name as a heading and breed as text. It's a simple card that probably displays in a list."

2. **You got an error "Cannot read properties of undefined (reading 'name')". What are two possible causes?**
   - *Example answer:* "Either the pet prop is undefined, or the pet object doesn't have a name field. Check: is the pet being passed in? Console.log(pet) to see what it actually is."

3. **List 3 common bugs in JavaScript/React and how to fix each.**
   - *Example answer:* "1. Forgot \`await\`: add await to async Supabase calls. 2. Variable typo: check variable name spelling. 3. Direct mutation: use \`setState\` instead of \`.push()\`."

### Scenario-based judgment checks:

*For each scenario, explain what went wrong.*

- **(a) "undefined is not a function":** You called something that doesn't exist or has the wrong name.
  - ✅ **Fix:** Check the exact name. Is it \`getPets()\` or \`getPet()\`? Check the docs or where it's defined.
  - ❌ **Avoid:** Guessing. The error tells you the exact line—read it!

- **(b) The page doesn't update after you add data:** You added the data to the array, but it doesn't show.
  - ✅ **Fix:** Are you using \`setState\` (e.g., \`setPets()\`), not direct mutation?
  - ❌ **Avoid:** Thinking the code is broken. React just doesn't know to re-render.

- **(c) Code runs but shows weird results:** The function runs, no error, but the output is wrong.
  - ✅ **Fix:** Add \`console.log()\` at each step to see what's happening. Trace the data.
  - ❌ **Avoid:** Staring at code. Logging is faster.

- **(d) You can't explain AI-generated code:** It's 10 lines of \`.reduce()\` and you have no idea what it does.
  - ✅ **Fix:** Ask the AI to simplify it, or write your own version you understand. Don't ship what you don't understand!
  - ❌ **Avoid:** Shipping it anyway and hoping. That's risky.

- **(e) Error appears but no line number:** The error says something failed, but doesn't tell you where.
  - ✅ **Fix:** Check the Network tab (Supabase call failed?) or try adding \`console.log()\` to narrow down the location.
  - ❌ **Avoid:** Guessing. Investigate systematically.

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | Fixed Bug #1 (await): query now returns data, not Promise |
| ✅ | Fixed Bug #2 (typo): variable names consistent |
| ✅ | Fixed Bug #3 (mutation): using \`setState\`, not \`.push()\` |
| ✅ | All three bugs fixed: code runs without errors |
| ✅ | Root cause named: one sentence per bug explaining the real problem |
| ✅ | Explanations show understanding: not just "fixed the typo" but "why" it was a problem |
| ✅ | Can explain any AI code: if still confused about a piece, asked for a simpler version |

*Pass mark: 80% and all three bugs fixed with explanations submitted.*

## Key Takeaways

- Read code top-to-bottom, ask what each line does 📖
- Error messages tell you what went wrong
- Test one change at a time
- Console logs help you see what's happening
- Ask AI to fix bugs (give it the error)

**Next:** Module 9 — Git & GitHub!`,
      },
    ]
  },
};

export const module9Steps: Record<Version, ModuleStepSequence> = {
  adult: {
    moduleId: 10,
    moduleName: "Module 9: Git & Version Control (GitHub)",
    totalDuration: 410,
    steps: [
      {
        id: 1,
        title: "Why version control",
        type: "lesson",
        duration: 40,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 1. Version control records the history of your project so you can see what changed, when, and why — and undo anything. Git is the tool; GitHub hosts your Git repositories online. Vocabulary:

- **Repository (repo)** — your project plus its entire history.
- **Commit** — a saved snapshot with a message. Like a save point.
- **History** — the ordered list of commits; view or revert to any.
- **Branch** — a parallel line of work, so you can build without touching the working version.
- **Remote** — the copy on GitHub, shared and backed up.

**Why it matters:** experiment fearlessly (revert if it breaks), off-machine backup, collaboration, and — next module — pushing to GitHub triggers deployment.

---`,
      },
      {
        id: 2,
        title: "Git basics: commit and push to GitHub",
        type: "lesson",
        duration: 50,
        difficulty: "easy",
        xpReward: 50,
        content: `Begins Objective 2.

**Step 1 — Protect your secrets first.** Confirm \`.env.local\` is in \`.gitignore\` (create-next-app adds it). Never commit API keys (your Supabase keys from Module 7).

\`\`\`
# .gitignore (already includes)
.env*.local
node_modules
.next
\`\`\`

**Step 2 — Initialize and commit:**

\`\`\`bash
git init
git add .
git commit -m "Initial commit: invoice tracker with clients, invoices, auth"
\`\`\`

**What you'll see:**
\`\`\`
[main (root-commit) a1b2c3d] Initial commit: invoice tracker with clients, invoices, auth
 15 files changed, 450 insertions(+)
 create mode 100644 app/clients/page.tsx
 create mode 100644 app/invoices/page.tsx
 ...
\`\`\`

**Step 3 — Create a repo on GitHub and push:**

1. Go to [github.com/new](https://github.com/new) and create a repo (name: \`invoice-tracker\`, no README)
2. Copy the commands GitHub shows
3. Run them in your terminal:
   \`\`\`bash
   git remote add origin https://github.com/YOU/invoice-tracker.git
   git branch -M main
   git push -u origin main
   \`\`\`

**What you'll see:**
\`\`\`
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
...
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
\`\`\`

Then on GitHub, refresh the repo page—your code is there! ✅

**[SCREENSHOT PLACEHOLDER: GitHub Repo Page]**

GitHub showing: repo name, file tree (app/, lib/, package.json, etc.), commit history on the left. Proof: code is pushed and visible on GitHub.

Commit small, logical chunks with clear messages ("Add invoice status filter," not "stuff"). Good history is a capstone rubric criterion.

---`,
      },
      {
        id: 3,
        title: "Branches and pull requests",
        type: "lesson",
        duration: 50,
        difficulty: "easy",
        xpReward: 50,
        content: `Completes Objective 2 — the professional workflow. Instead of editing \`main\` directly, make a **branch** per change, then open a **pull request (PR)** to merge it back.

\`\`\`bash
git checkout -b add-invoice-filter
# ...changes, commits...
git push -u origin add-invoice-filter
\`\`\`

On GitHub, open a PR from that branch into \`main\`. The PR shows the diff, lets you (or a teammate) review, and merges when approved. This is where Vercel posts preview deploys (Module 10).

*[SCREENSHOT: a GitHub pull request showing the diff and merge button.]*

**Why branches + PRs even solo:** \`main\` stays working, each change is isolated and reviewable, and you build the exact habit employers expect.

---`,
      },
      {
        id: 4,
        title: "Merge conflicts and collaboration",
        type: "lesson",
        duration: 40,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 3. A **merge conflict** happens when two changes touch the same lines and Git can't decide. Not an error — Git asking you to choose. Routine, not scary.

**Concrete example — a conflict:**

You're on \`main\` and it has:
\`\`\`javascript
const status = "unpaid";
\`\`\`

You create a branch \`add-filter\` and change it to:
\`\`\`javascript
const status = "pending";
\`\`\`

Meanwhile, on \`main\`, someone else also changed it to:
\`\`\`javascript
const status = "overdue";
\`\`\`

When you try to merge \`add-filter\` into \`main\`, Git says "I don't know which version you want!" and marks it:

\`\`\`
<<<<<<< HEAD
const status = "overdue";
=======
const status = "pending";
>>>>>>> add-filter
\`\`\`

**Resolve it:**

1. Open the file and look at the markers
2. Decide which version you want (or combine them)
3. Edit to your choice:
   \`\`\`javascript
   const status = "overdue";  // You chose the main version
   \`\`\`
4. Remove the conflict markers (\`<<<<<<<\`, \`=======\`, \`>>>>>>>\`)
5. Save the file
6. Commit: \`git add . && git commit -m "Resolve conflict: keep overdue status from main"\`

Now the merge is complete! ✅

**Using AI to help (safely):** You can paste the conflict and ask the AI to explain both sides—but *you* decide which version is correct, since only you know the intended behavior.

**Collaboration basics:** pull others' changes before starting (\`git pull\`), work on your own branch, open a PR, resolve conflicts if they arise.

---`,
      },
      {
        id: 5,
        title: "Git with AI, safely",
        type: "lesson",
        duration: 20,
        difficulty: "easy",
        xpReward: 50,
        content: `- **Commit messages & PR descriptions** — AI writes good ones from your diff.
- **Explaining history** — ask AI what a commit or diff changed.
- **Conflict help** — AI can propose resolutions (Lesson 9.4).
- **The one hard rule:** never let any tool commit secrets. Double-check \`.gitignore\` and scan diffs for keys before pushing. If a secret is ever committed, rotate it — assume it's compromised. (Reinforced in Module 10 and Module 12's security pass.)

## Hands-on activity (~50 min, folded in)

**"Ship a change the professional way."** Follow these steps to practice the full Git/GitHub workflow.

### Step 1: Check \`.gitignore\` (2 min)
Confirm secrets won't be committed:

1. Open \`.gitignore\` in your editor
2. Verify it has:
   \`\`\`
   .env*.local
   node_modules
   .next
   \`\`\`
3. If missing, add them

### Step 2: Initialize Git and push to GitHub (10 min)

**2a. Create a repo on GitHub:**
1. Go to [github.com/new](https://github.com/new)
2. Name it \`invoice-tracker\`
3. Leave "Initialize with README" unchecked
4. Click "Create Repository"
5. Copy the commands GitHub shows (you'll need them in 2b)

**2b. Initialize locally and push:**
\`\`\`bash
cd invoice-tracker  # your local project
git init
git add .
git commit -m "Initial commit: invoice tracker with clients, invoices, auth, Supabase"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/invoice-tracker.git
git push -u origin main
\`\`\`

Check GitHub—your code is there! ✅

### Step 3: Create a branch and make a change (8 min)

**3a. Create a feature branch:**
\`\`\`bash
git checkout -b add-invoice-sort
\`\`\`

**3b. Make a small improvement:**
- Open \`/invoices\` page
- Add sorting by due date
- Test it works locally

**3c. Commit the change:**
\`\`\`bash
git add app/invoices/page.tsx
git commit -m "Add sorting by due date on invoices list"
\`\`\`

**3d. Push the branch:**
\`\`\`bash
git push -u origin add-invoice-sort
\`\`\`

### Step 4: Open and merge a PR (10 min)

**4a. Open a PR on GitHub:**
1. Go to your repo on GitHub
2. You'll see a banner: "Your recently pushed branches" with a green "Compare & pull request" button
3. Click it
4. Add a description: "Sorts invoices by due date for easier tracking"
5. Click "Create Pull Request"

**4b. Merge the PR:**
1. Look for the green "Merge pull request" button
2. Click it
3. Click "Confirm merge"
4. Click "Delete branch" (clean up)

You've shipped a change the professional way! ✅

### Step 5: Create and resolve a merge conflict (10 min)

**5a. Create a conflict intentionally:**

1. On \`main\`, go to \`/clients\` page and change the title from "Clients" to "Client List"
2. Commit: \`git add app/clients/page.tsx && git commit -m "Rename to Client List"\`
3. Create a branch: \`git checkout -b improve-clients\`
4. On the branch, change the same title to "All Clients"
5. Commit: \`git add app/clients/page.tsx && git commit -m "Improve label for clarity"\`
6. Try to merge back to main: \`git checkout main && git merge improve-clients\`

Git will say: **CONFLICT!**

**5b. Resolve it:**
1. Open \`/clients/page.tsx\` in your editor
2. Find the conflict markers (<<<<<<, =======, >>>>>>>)
3. Decide which version you want (or combine: "Clients - View All")
4. Delete the markers
5. Save
6. Commit: \`git add app/clients/page.tsx && git commit -m "Resolve conflict: use 'Clients' title"\`

Conflict resolved! ✅

### Deliverable:
- GitHub repo link with your code
- Screenshot showing a merged PR
- Screenshot of your commit history (at least 3-4 commits)
- One-sentence explanation of what you learned about conflicts

## Quiz questions (preview)

These are the three questions you'll see on the quiz. Study these to prepare:

**Q9-1:** A commit is best described as:
- (a) a deployed app
- (b) **a saved snapshot of changes with a message** ✓
- (c) a branch
- (d) a backup server

*Why:* A commit is exactly this: you select which files changed, write a message explaining WHY you changed them (not what—the diff shows that), and save the snapshot. Each commit is a save point you can revert to.

**Q9-2:** Why work on branches + pull requests even solo?
- (a) required
- (b) **\`main\` stays working and each change is isolated and reviewable** ✓
- (c) faster typing
- (d) it deletes old code

*Why:* Branches protect your production code (\`main\`); PRs let you review your own changes (and practice the habit for when you collaborate). This is the professional workflow—build it now.

**Q9-3:** A merge conflict is:
- (a) an unfixable error
- (b) **Git asking you to choose between two changes to the same lines** ✓
- (c) a deploy failure
- (d) a virus

*Why:* Conflicts are routine, not errors. Git sees two versions of the same line and can't decide—you edit the file, choose which version to keep, remove the markers, and commit. Not scary.

## Knowledge check (mapped to objectives)

**Objective 1 — Explain:** define repo, commit, branch, and PR, and give one reason version control matters even solo.

**Objective 2 — Manage:** show a repo with a feature branch, meaningful commits, and a merged PR.

**Objective 3 — Resolve a conflict:** given a file with conflict markers, produce the correctly resolved file and explain your choice.

**Scenario-based judgment checks:**

*For each scenario, explain what you'd do.*

- **(a) You committed \`.env.local\` and pushed.** You realize you pushed secrets to GitHub. What's your next step?
  - ✅ **Correct:** Rotate your Supabase keys immediately (assume they're compromised). Then use \`git rm --cached .env.local\`, commit, and push again to remove it from history. Treat as a real incident.
  - ❌ **Avoid:** Ignoring it. Secrets in public repos are a real risk.

- **(b) You're on \`main\` and want to make a small fix.** What's the professional workflow?
  - ✅ **Correct:** Create a branch (\`git checkout -b fix-typo\`), make the change, commit, push, open a PR, review it, merge it.
  - ❌ **Avoid:** Committing directly to \`main\`. Branches protect \`main\` from half-baked changes.

- **(c) You have uncommitted changes and want to switch branches.** What happens if you just switch?
  - ✅ **Correct:** Git may warn or refuse (if changes conflict with the other branch). Safe: commit first or \`git stash\` to save changes, then switch.
  - ❌ **Avoid:** Forcing a switch and losing work. Be deliberate.

- **(d) You see a merge conflict marker.** You don't understand which version is right. What do you do?
  - ✅ **Correct:** Don't guess. Ask a teammate or read the context. Understanding the conflict is half the fix.
  - ❌ **Avoid:** Picking randomly. You might break logic or lose important code.

- **(e) Your commit history is messy: "wip", "asdf", "fix", "fix 2", "fix 3".** The capstone rubric looks for clean history. How do you avoid this?
  - ✅ **Correct:** Commit frequently with meaningful messages ("Add filter dropdown", "Fix auth bug on sign-in"). Aim for ~1 commit per logical change.
  - ❌ **Avoid:** Lazy commit messages. They matter. Future-you and reviewers will read them.

**Rubric checklist (self-review before submission):**

| Criterion | Check (✅ = pass) |
|-----------|-------------|
| **Secrets protected** | \`.gitignore\` includes \`.env*.local\` and \`.env.local\` is never in commit history |
| **Initial commit** | Repo created on GitHub; all code pushed with clean initial commit |
| **Feature branch** | Created a branch (not working on \`main\`); named descriptively (e.g., \`add-invoice-sort\`) |
| **Commits are meaningful** | Each commit message describes what changed and why (not "fix", not "asdf") |
| **PR opened** | Branch pushed; PR created with a description explaining the change |
| **PR merged** | PR reviewed (even if self-reviewed) and merged; branch deleted after merge |
| **Conflict resolved** | Deliberately created a conflict, resolved it, committed the resolution |
| **Commit history is clean** | 4+ commits visible; messages are clear; no "wip" or throwaway commits |
| **No secrets in repo** | Verify: run \`git log -p\` and grep for NEXT_PUBLIC or sensitive strings—should be none |

*Pass mark: 80% and a GitHub repo with clean history, merged PR, and resolved conflict submitted.*

## Tools & alternatives (this module)

Default: **GitHub** (industry-standard host, best Vercel integration). **Alternatives:** GitLab, Bitbucket — same Git workflow, different hosting/CI. Run Git from the terminal, Cursor's source-control panel, or Claude Code.

## Key takeaways

- Version control records history so you can experiment fearlessly and always revert.
- Core concepts: repo, commit, branch, remote, pull request.
- Work on branches, merge via PRs — \`main\` stays working, changes stay reviewable.
- Merge conflicts are routine: edit to the version you want, remove markers, commit.
- Never commit secrets — keep \`.env.local\` gitignored and scan diffs before pushing.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)`,
      },
    ]
  },
  kids: {
    moduleId: 10,
    moduleName: "Module 9: Git & Version Control (GitHub)",
    totalDuration: 410,
    steps: [
      {
        id: 1,
        title: "Git & GitHub Basics",
        type: "checkpoint",
        duration: 30,
        difficulty: "medium",
        xpReward: 100,
        content: `**Git:** A tool that tracks changes to your code (like "Track Changes" in Google Docs).

**GitHub:** A website where you store your Git projects online.

**Commit:** A save point. Every commit has a message: "Added pet delete button", "Fixed bug in auth", etc.

Think of commits like checkpoints in a video game. You save progress, then if something breaks, you can go back.

---`,
      },
      {
        id: 2,
        title: "Create a GitHub Repo",
        type: "lesson",
        duration: 20,
        difficulty: "easy",
        xpReward: 50,
        content: `Go to github.com and click "New Repository":

1. Name it \`pet-tracker\`
2. Add a description: "A fun app to track your pets!"
3. Make it public (everyone can see it, not secret)
4. Click "Create Repository"

GitHub gives you instructions. Copy them and run in your terminal:

\`\`\`bash
git init
git add .
git commit -m "First version of pet tracker"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/pet-tracker.git
git push -u origin main
\`\`\`

**What you'll see:**
\`\`\`
Enumerating objects: 20, done.
...
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main'
\`\`\`

Boom! Your code is on GitHub now. 🚀

---`,
      },
      {
        id: 3,
        title: "Commits",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `A commit is a snapshot of your code at one moment.

**How to make commits:**

\`\`\`bash
git add .
git commit -m "Added pet delete button"
git push
\`\`\`

- \`git add .\` = "I'm ready to save these changes"
- \`git commit -m "..."\` = "Save it with this message"
- \`git push\` = "Send it to GitHub"

**Good commit messages:**
- ✅ "Added delete button"
- ✅ "Fixed bug where pets weren't loading"
- ✅ "Updated color scheme to blue"

Bad:
- ❌ "stuff"
- ❌ "changes"
- ❌ "ahhhhh"

---`,
      },
      {
        id: 4,
        title: "Branches",
        type: "checkpoint",
        duration: 45,
        difficulty: "medium",
        xpReward: 100,
        content: `Branches are like alternate timelines. You make changes on a branch, test them, then merge back to main.

\`\`\`bash
git branch my-feature
git checkout my-feature
\`\`\`

Now you're on \`my-feature\` branch. Make changes, commit, then:

\`\`\`bash
git checkout main
git merge my-feature
\`\`\`

Now those changes are in main.

Why? So you don't accidentally break the working version.

## Activity: Push Your Project to GitHub 🚀

Follow these steps to get your pet tracker on GitHub!

### Step 1: Create a GitHub repo (2 min)
1. Go to [github.com/new](https://github.com/new)
2. Name it \`pet-tracker\`
3. Click "Create Repository"
4. Copy the commands GitHub shows (you'll use them below)

### Step 2: Push your code (5 min)
1. Open your terminal in your pet tracker folder
2. Run:
   \`\`\`bash
   git init
   git add .
   git commit -m "First version of pet tracker"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/pet-tracker.git
   git push -u origin main
   \`\`\`
3. Wait for it to finish
4. Go back to GitHub and refresh—your code is there! ✅

### Step 3: Make a change on a branch (5 min)

**3a. Create a new branch:**
\`\`\`bash
git checkout -b add-pet-delete-button
\`\`\`

**3b. Make a small change:**
- Add a delete button to your pet cards
- Test it works

**3c. Commit and push:**
\`\`\`bash
git add .
git commit -m "Add delete button to pet cards"
git push -u origin add-pet-delete-button
\`\`\`

### Step 4: Open a PR (3 min)
1. Go to your GitHub repo
2. You'll see a green "Compare & pull request" button
3. Click it
4. Add a description: "Let users delete pets from their list"
5. Click "Create Pull Request"
6. Click the green "Merge pull request" button to merge it
7. Click "Delete branch"

You've shipped a change! 🚀

### Deliverable:
- Your GitHub repo link
- Screenshot of your repo page (showing commits)
- Screenshot of your merged PR

## Quiz Questions (Preview)

Here are your three quiz questions. Study these!

**Q9-k1:** A commit is best described as:
- (a) A deployed app
- (b) **A save point with a message (checkpoint in a game!)** ✓
- (c) A branch
- (d) A backup server

*Why:* Commits are like game save points! You save your progress with a message explaining what you did. Later, if you mess up, you can revert to an earlier checkpoint.

**Q9-k2:** Why use branches even when coding solo?
- (a) Required
- (b) **So main stays working, and each change is safe and reviewable** ✓
- (c) Faster typing
- (d) It deletes old code

*Why:* Branches protect your working code! You can experiment on a branch without breaking your main app. Then you review the changes before bringing them in.

**Q9-k3:** A merge conflict is:
- (a) Unfixable
- (b) **Git asking you to choose between two changes** ✓
- (c) A deployment failure
- (d) A virus

*Why:* Merge conflicts just need you to pick which change to keep! It's not an error—Git just can't decide when two changes touch the same line. You edit the file and choose.

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **What's the difference between Git and GitHub?**
   - *Example answer:* "Git is the tool that tracks changes to your code. GitHub is the website where you store your Git projects online. Git is on your computer; GitHub is in the cloud."

2. **Write a good commit message for: "You added a favorite button"**
   - *Example answer:* "Add favorite button to pet cards" (or "Add heart icon to mark pets as favorites"). NOT "stuff" or "update" or "fix".

3. **What's a branch? Why use branches?**
   - *Example answer:* "A branch is a copy of your code where you can make changes without affecting main. You use branches so you can work safely and review changes before merging them in."

### Scenario-based judgment checks:

*For each scenario, explain what you'd do.*

- **(a) You committed your \`.env.local\` file and pushed to GitHub.** What should you do?
  - ✅ **Critical:** Your secrets are exposed! Delete them from GitHub, rotate your keys, and add \`.env.local\` to \`.gitignore\`.
  - ❌ **Avoid:** Leaving secrets on GitHub. That's a real security risk!

- **(b) You want to add a new feature but don't want to risk breaking main.** What do you do?
  - ✅ **Correct:** Create a branch (\`git checkout -b feature-name\`), make changes, commit, push, open a PR, and merge when done.
  - ❌ **Avoid:** Committing directly to main. Branches protect your working code.

- **(c) You see a merge conflict.** You don't know which version to keep. What's your next move?
  - ✅ **Correct:** Read the conflict markers (<<<, ===, >>>). Think about which version makes sense. Edit the file to keep what you want. Remove the markers. Commit.
  - ❌ **Avoid:** Panicking. Conflicts are normal and fixable!

- **(d) Your commit messages are "wip", "fix", "fix 2", "asdf".** Is this good practice?
  - ✅ **Correct:** No! Write clear messages like "Add delete button", "Fix pet sorting", "Update styles". Future-you will thank you.
  - ❌ **Avoid:** Lazy messages. They make history hard to read.

- **(e) You want to ship a new feature.** What's the professional workflow?
  - ✅ **Correct:** Branch → commit with good messages → push → open PR → review → merge. This is how real developers work!
  - ❌ **Avoid:** Pushing straight to main without branches/PRs.

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | Repo created on GitHub and code is pushed |
| ✅ | \`.env.local\` is in \`.gitignore\` (NOT committed) |
| ✅ | First commit message is clear (not "stuff" or "asdf") |
| ✅ | Created a feature branch (not working on main) |
| ✅ | Made a change on the branch, committed with good message |
| ✅ | Pushed branch to GitHub |
| ✅ | Opened a PR on GitHub |
| ✅ | Merged the PR successfully |
| ✅ | Commit history is clean (3+ commits with good messages) |

*Pass mark: 80% and a GitHub repo with merged PR submitted.*

## Key Takeaways

- Git tracks changes to your code 📝
- GitHub stores your code online
- Commits are save points with messages
- Push = send to GitHub
- Branches = safe experimentation

**Next:** Module 10 — Deploying (Show the World!)`,
      },
    ]
  },
};

export const module10Steps: Record<Version, ModuleStepSequence> = {
  adult: {
    moduleId: 11,
    moduleName: "Module 10: Deploying Applications (Vercel + GitHub)",
    totalDuration: 420,
    steps: [
      {
        id: 1,
        title: "What deployment (and CI/CD) means",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Deployment puts your app on a server so anyone can reach it at a URL. **CI/CD** means this happens automatically: push to GitHub → it's built and deployed for you. That's the payoff of Module 9's GitHub setup: **push to \`main\` → Vercel builds and deploys.** Your repo is the source of truth; Vercel keeps the live site in sync.

---`,
      },
      {
        id: 2,
        title: "Deploy to Vercel from GitHub",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `Begins Objective 1.

**Step 1 — Sign up at [vercel.com](http://vercel.com)** with GitHub.

**Step 2 — Import your repo.** Vercel detects Next.js and configures the build — no config files (why Next.js + Vercel is the default).

On the import page, you'll see:
- Your GitHub username and repo list
- Your repo name (\`invoice-tracker\`)
- Vercel detects: **Next.js** ✓
- Build command: \`npm run build\` (auto-filled)
- Install command: \`npm ci\` (auto-filled)
- Output directory: \`.next\` (auto-filled)

Click **Import** and watch the magic happen.

**[SCREENSHOT PLACEHOLDER: Vercel Import Project]**

Vercel dashboard showing: import flow detecting Next.js repo, configuration preview, deploy button. Proof: Vercel auto-detected framework.

**Step 3 — Deploy.** In a minute or two you get a live URL like \`invoice-tracker-abc123.vercel.app\`. The build succeeds but the app won't fully work yet — no database keys in production. Deliberate teaching moment: **your local \`.env.local\` did not go to Vercel** (gitignored in Module 9), so production has no secrets until you add them.

You'll see:
- Deployment status: **Ready** ✓
- Live URL: \`https://invoice-tracker-abc123.vercel.app\`
- But click it—the \`/clients\` page shows an empty table (RLS + missing env vars)

This is the "works locally, breaks in prod" moment that builds confidence.

---`,
      },
      {
        id: 3,
        title: "Environment variables in production",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Begins Objective 2 and explains the "worked locally, broke deployed" mystery. Your Supabase keys live in \`.env.local\`, which is *not* in Git and *not* on Vercel. Add them in **Vercel → Project → Settings → Environment Variables** (same keys from Module 7):

**Concrete steps:**

1. Go to your Vercel project
2. Click **Settings** (top right)
3. Click **Environment Variables** (left sidebar)
4. Add two variables:
   \`\`\`
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://YOUR-PROJECT.supabase.co
   \`\`\`
   \`\`\`
   Name: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
   Value: sb_publishable_xxx
   \`\`\`
5. Click "Save"

**Then redeploy:**
1. Go to **Deployments** (left sidebar)
2. Click the three dots on the latest deployment
3. Click **Redeploy**
4. Wait ~1 minute for the new build

Now your app can talk to Supabase in production!

**Principle:** secrets live in the platform, never in the repo. Same value, two homes — \`.env.local\` for local, Vercel's settings for production.

> **Build-verified note:** \`NEXT_PUBLIC_*\` variables are **inlined at build time**, so they must exist in Vercel *before* the deploy that uses them — add them first, then trigger a fresh deploy, or the built app breaks in production with no error locally.
> 

**[SCREENSHOT PLACEHOLDER: Vercel Env Vars Settings]**

Settings page showing: Environment Variables section with key-value pairs (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY). Proof: secrets are configured for production.

---`,
      },
      {
        id: 4,
        title: "Preview deploys & the CI/CD workflow",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Completes the CI/CD half of Objectives 1–2 and pays off Module 9's branch/PR habit. Vercel deploys *every branch and PR* to its own **preview URL** — a live copy you can test and share before it reaches production. The full loop:

1. Branch and make a change (Module 9).
2. Open a PR → Vercel posts a **preview URL** on the PR.
3. Test the preview; merge when good.
4. Merge to \`main\` → Vercel deploys to **production** automatically.

**[SCREENSHOT PLACEHOLDER: GitHub PR with Preview Link]**

GitHub PR page showing: Vercel bot comment with "Preview Ready" and link to live preview URL. Proof: PR has a testable preview deploy.

You never test experiments in production, and every change is verifiable in a real environment first — the Module 1 verification principle at deployment scale.

---`,
      },
      {
        id: 5,
        title: "Custom domain & production config",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Completes Objective 2. Two things turn the deploy into a real product:

**Custom domain** — in Vercel → Settings → Domains, add a domain you own and follow the DNS steps. Your app lives at \`yourname.com\`.

**Production auth config (the step beginners miss)** — Supabase Auth needs your production URL or logins/redirects fail on the live site even though they worked locally. In the Supabase dashboard, set the **Site URL** and add your domain to the **redirect URLs**. A classic "works on [localhost](http://localhost), breaks in prod" trap.

*[SCREENSHOT: the Supabase Auth URL configuration with the production Site URL and redirect URLs.]*

> **Beyond the basics (awareness — not required for the capstone):** as a project grows you'll meet a few more Vercel features. (1) **Per-environment env vars** — Vercel scopes variables to Production / Preview / Development separately, so preview deploys can point at a *separate* Supabase project instead of touching real data. (2) **Instant rollback** — the Deployments list can promote a previous build back to production in one click when a deploy breaks. (3) **Staging branch → its own domain** — map a long-lived branch (e.g. \`staging\`) to a fixed URL for a stable pre-prod environment. (4) **Preview protection** — password-protect or auth-gate preview URLs so they aren't public. You don't need these to pass — just know they exist for when an app outgrows one-env-one-database.
> 

---`,
      },
      {
        id: 6,
        title: "Vercel vs. the alternatives",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 3.

| Option | What it is | Best when |
| --- | --- | --- |
| **Vercel** (default) | Deployment platform built by the Next.js team | Next.js — zero-config deploys, previews, great DX |
| Netlify | Similar frontend/JAMstack platform | Static/frontend sites; you prefer its ecosystem |
| Railway / Render | General app hosting (backends, containers, cron, DBs) | Long-running servers or non-Next.js backends |
| Cloudflare / AWS | Broader cloud platforms | Advanced scale/control; more setup |

**Why Vercel is the default:** made by the Next.js team — zero-config, automatic previews, seamless GitHub integration. **Trade-offs:** Netlify comparable for frontends; Railway/Render better for always-on backends or hosting DB + app together; big clouds trade simplicity for control.

## Hands-on activity (~60 min, folded in)

**"Go live."** Follow these steps to deploy your invoice-tracker to the real internet!

### Step 1: Sign up for Vercel (2 min)
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up"
3. Choose "GitHub" and authorize it

### Step 2: Import your GitHub repo (5 min)
1. Click "New Project"
2. Find your \`invoice-tracker\` repo in the list
3. Click "Import"
4. Vercel auto-detects Next.js ✓
5. Click "Deploy"
6. Wait for the build to complete (~2 min)
7. You get a live URL! (e.g., \`invoice-tracker-abc123.vercel.app\`)

### Step 3: Test it and see the issue (2 min)
1. Click the live URL
2. Try to view \`/clients\`
3. Empty table — this is expected! Your Supabase keys aren't on Vercel yet.

### Step 4: Add environment variables (5 min)
1. In Vercel, go to **Settings → Environment Variables**
2. Add your Supabase credentials (from Module 7):
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL = https://YOUR-PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = sb_pub_xxx
   \`\`\`
3. Click "Save"

### Step 5: Redeploy (5 min)
1. Go to **Deployments**
2. Click the three dots on the latest deployment
3. Click "Redeploy"
4. Wait ~1 min for the build
5. Visit the live URL again—your data appears! ✅

### Step 6: Test with a PR preview (5 min)
1. On your local machine, create a branch: \`git checkout -b add-sort-feature\`
2. Make a small change (add a comment, update a style)
3. Commit and push: \`git add . && git commit -m "Add feature" && git push -u origin add-sort-feature\`
4. Go to GitHub, open a PR
5. Vercel posts a preview URL on the PR (watch for "Preview Ready")
6. Click the preview URL—you see your change live!

### Step 7: Test auth in production (3 min)
1. On your live site, try to sign up with a new email
2. You might see an error (auth not configured for production)
3. This is normal — need to configure Supabase auth URLs (see Lesson 10.5)

### Step 8: Configure Supabase Auth for production (5 min)
1. In Supabase dashboard, go to **Authentication → URL Configuration**
2. Set **Site URL** to your Vercel URL (e.g., \`https://invoice-tracker-abc123.vercel.app\`)
3. Add your Vercel URL to **Redirect URLs** (same URL)
4. Click "Save"

### Step 9: Test auth again (2 min)
1. Back on your live site, try to sign up
2. Should work now! ✅
3. Sign in and confirm you see only your own data

### Deliverable:
- Your live Vercel URL (screenshot showing it works)
- Screenshot of a preview URL from a PR
- Evidence that auth works in production (screenshot of sign-in → logged-in state)

## Quiz questions (preview)

These are the three questions you'll see on the quiz. Study these to prepare:

**Q10-1:** CI/CD here means:
- (a) manual uploads
- (b) **pushing to GitHub auto-builds and deploys** ✓
- (c) copying files to a server
- (d) emailing code

*Why:* CI/CD automates the entire build-and-deploy cycle: push to \`main\` → GitHub triggers a build → Vercel deploys the result. That's the payoff of the workflow you built in Modules 9–10.

**Q10-2:** Your app worked locally but breaks on Vercel until you:
- (a) restart your laptop
- (b) **add the env vars to Vercel** ✓
- (c) rewrite it
- (d) buy a domain

*Why:* The \`NEXT_PUBLIC_*\` variables are inlined at build time, so they must exist in Vercel before the deploy. This is the classic "works locally, breaks in prod" trap — your \`.env.local\` never made it to Vercel.

**Q10-3:** A preview deploy is:
- (a) the production site
- (b) **a live URL for a branch/PR to test before merging** ✓
- (c) a screenshot
- (d) a local server

*Why:* Every branch and PR gets its own preview URL (a real, live deployment). Test there, merge to \`main\` when confident, and production auto-deploys. No guessing — you've seen it working.

## Knowledge check (mapped to objectives)

**Objective 1 — Deploy with CI/CD:** submit your live production URL and explain, step by step, what happens when you push to \`main\`.

**Objective 2 — Configure env/previews/domain:** explain why it worked locally but not on Vercel until you added env vars, and show a preview URL from a PR.

**Objective 3 — Compare:** recommend Vercel, Netlify, or Railway/Render for a given app and justify in 3–4 sentences.

**Scenario-based judgment checks:**

*For each scenario, explain what's happening and what to do.*

- **(a) Build succeeded but the app shows an error "Cannot read properties of undefined":** You deployed but didn't set env vars.
  - ✅ **Root cause:** Supabase URL/key are undefined in production. Fix: Add env vars in Vercel Settings, redeploy.
  - ❌ **Avoid:** Thinking the code is broken. The code is fine; the config is missing.

- **(b) Env vars are in Vercel, but auth still fails on the live site.** Users can't log in even though it works locally.
  - ✅ **Root cause:** Supabase Auth isn't configured for your production URL. Fix: Set Site URL and Redirect URLs in Supabase Dashboard.
  - ❌ **Avoid:** Re-adding env vars (they're fine). The problem is Supabase auth config.

- **(c) You opened a PR and no preview URL appeared.** You're waiting for Vercel to post a comment.
  - ✅ **Likely issue:** Vercel integration isn't connected to your GitHub repo, or the build failed. Check Vercel Deployments tab.
  - ❌ **Avoid:** Waiting forever. Investigate if the build even ran.

- **(d) You want to roll back after a bad deploy.** The latest production deploy has a bug.
  - ✅ **Fix:** Go to Vercel → Deployments, find the previous good deployment, click three dots, click "Promote to Production".
  - ❌ **Avoid:** Trying to fix it via code; rollback is instant.

- **(e) Preview URL doesn't match production behavior.** Code works in preview but breaks on production main.
  - ✅ **Diagnose:** Different env vars? (per-environment config?) Different Supabase project? Check Settings → Environment Variables and filter by deployment environment.
  - ❌ **Avoid:** Assuming they're the same. They might not be configured the same way.

**Rubric checklist (self-review before submission):**

| Criterion | Check (✅ = pass) |
|-----------|-------------|
| **Repo imported** | Vercel project created, GitHub repo connected |
| **Deployed successfully** | Live URL generated (e.g., \`invoice-tracker-xxx.vercel.app\`) |
| **Env vars added** | NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in Vercel Settings |
| **Redeployed** | After adding env vars, redeploy triggered and build succeeded |
| **App works live** | Visit the URL, \`/clients\` page loads with data (not empty) |
| **Auth configured** | Supabase Site URL and Redirect URLs set to production URL |
| **Auth works in production** | Can sign up / sign in on live site |
| **Data isolation verified** | Two accounts: sign up as User A, see User A's data; sign out, sign up as User B, see only User B's data |
| **Preview URL tested** | Opened a PR, Vercel posted a preview URL, clicked it and saw the preview |
| **Live URL shared** | Submitted your live Vercel URL for grading |

*Pass mark: 80% and a live, working deployed URL submitted.*

## Tools & alternatives (this module)

Default: **Vercel** from **GitHub**, with **Supabase** as the production backend. Alternatives in Lesson 10.6. Deployment is a great agentic task — Claude Code can configure build settings or debug a failed deploy from logs — but *you* own env-var and auth config (secrets and production URLs).

## Key takeaways

- Deployment puts your app at a public URL; CI/CD means pushing to GitHub auto-builds and deploys it.
- Vercel auto-detects Next.js — import the repo and deploy with zero config.
- Secrets live in the platform (Vercel env vars), never in the repo; \`NEXT_PUBLIC_*\` are inlined at build time, so set them before deploying.
- Every PR gets a preview URL; test there, then merge to \`main\` for production.
- Set Supabase's production Site URL / redirect URLs, or auth breaks live.

[Accredited Vibe Coding Course](https://app.notion.com/p/Accredited-Vibe-Coding-Course-391f6ea84e41819a8ac3c38ebdb12d04?pvs=21)`,
      },
    ]
  },
  kids: {
    moduleId: 11,
    moduleName: "Module 10: Deploying Applications (Vercel + GitHub)",
    totalDuration: 420,
    steps: [
      {
        id: 1,
        title: "What's Deployment?",
        type: "lesson",
        duration: 20,
        difficulty: "easy",
        xpReward: 50,
        content: `Deployment = putting your app on the internet.

Your computer: Only you can access your app.
Vercel: Everyone can access your app via a URL.

Example: Your pet tracker at \`my-pet-tracker.vercel.app\` (or your own domain).

---`,
      },
      {
        id: 2,
        title: "Vercel Basics",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Vercel is a platform that hosts Next.js apps (perfect for us!).

**What you do:**
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up" and choose GitHub
3. Authorize it to see your repos

**What Vercel does:**
- Watches your GitHub repo
- When you push, Vercel automatically builds and deploys it
- Your app lives at a URL like \`pet-tracker-abc123.vercel.app\`

That's the whole concept! Really.

---`,
      },
      {
        id: 3,
        title: "Deploy in One Click",
        type: "lesson",
        duration: 20,
        difficulty: "easy",
        xpReward: 50,
        content: `1. Go to vercel.com
2. Click "Import Project"
3. Find your GitHub repo (pet-tracker)
4. Click "Deploy"
5. Wait 30 seconds
6. You get a live URL!

Vercel automatically:
- Watches your GitHub repo
- Deploys when you push changes
- Gives you a public URL
- Handles all the server stuff

---`,
      },
      {
        id: 4,
        title: "Your Own Domain (Optional)",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `You can use \`my-pet-tracker.vercel.app\` OR buy a custom domain like \`mypetracker.com\`.

Domains cost ~$10/year. Optional for this course.

---`,
      },
      {
        id: 5,
        title: "Environment Variables",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Your Supabase keys are secret (don't share them!).

On your computer, they live in \`.env.local\` (gitignored).

On Vercel, they go in Settings → Environment Variables.

Prompt Claude Code: *"Set up environment variables for Supabase on Vercel."*

It'll guide you.

## Activity: Deploy Your App 🚀

Follow these steps to put your pet tracker on the real internet!

### Step 1: Sign up for Vercel (2 min)
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up"
3. Choose "GitHub" and click "Authorize"
4. Done!

### Step 2: Import your repo (3 min)
1. Click "New Project"
2. Find your \`pet-tracker\` repo
3. Click "Import"
4. Vercel detects it's a Next.js app ✓
5. Click "Deploy"

### Step 3: Wait for the build (2 min)
Vercel builds and deploys your app. You'll see:
- Building... (spinning)
- Ready! (green checkmark)
- Your live URL: \`pet-tracker-abc123.vercel.app\`

### Step 4: Test it! (2 min)
1. Click the live URL
2. Your pet tracker is on the internet! 🌍
3. Add a pet, refresh—it's still there!

### Step 5: Add environment variables (3 min)
If you set up Supabase in your app:

1. In Vercel, go to **Settings → Environment Variables**
2. Add your Supabase URL and key (from Module 7):
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
   \`\`\`
3. Click "Save"
4. Go back to **Deployments** and click "Redeploy" on the latest build
5. Wait ~1 min for the new build
6. Your live app now works with Supabase!

### Step 6: Share it! (1 min)
Send your live URL to a friend and have them try it!
\`\`\`
https://pet-tracker-abc123.vercel.app
\`\`\`

### Deliverable:
- Your live Vercel URL (screenshot showing it works)
- Screenshot of your pet tracker running on the internet

## Quiz Questions (Preview)

Here are your three quiz questions. Study these!

**Q10-k1:** What does 'CI/CD' mean here?
- (a) Manual uploads
- (b) **Push to GitHub → auto-build and auto-deploy** ✓
- (c) Copying files manually
- (d) Email code to a server

*Why:* CI/CD is automation magic! You push code to GitHub, and Vercel automatically builds and deploys it. No manual steps. That's the whole point of using GitHub + Vercel together!

**Q10-k2:** Your app works at home but breaks on Vercel because:
- (a) Restart your laptop
- (b) **You forgot to set environment variables on Vercel** ✓
- (c) Rewrite it
- (d) Buy a domain

*Why:* Your Supabase secrets live in \`.env.local\` at home (safe, never pushed to GitHub). On Vercel, you have to tell it those secrets via Settings → Environment Variables. Without them, your app doesn't know how to connect to the database!

**Q10-k3:** A 'preview deploy' is:
- (a) The live production app
- (b) **A test version of a branch/PR before merging** ✓
- (c) A screenshot
- (d) Your local computer

*Why:* Every PR gets a live preview URL! You can test your changes on a real server before merging to \`main\`. If something's broken, you fix it. If it looks good, you merge and it auto-deploys to production.

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **What's the difference between development and deployment?**
   - *Example answer:* "Development is building on your computer. Deployment is putting your app on the internet where everyone can use it. Development = localhost; Deployment = live URL."

2. **How does Vercel auto-deploy?**
   - *Example answer:* "When you push code to GitHub, Vercel automatically builds your app and puts it online. You don't have to click anything—it's automatic!"

3. **Why are environment variables secret?**
   - *Example answer:* "Environment variables like Supabase keys are like passwords. If someone sees them, they can access your database. So they go in Vercel Settings, not in your code on GitHub."

### Scenario-based judgment checks:

*For each scenario, explain what's happening and what to do.*

- **(a) You deployed but the app shows an empty page or an error.** Everything was working locally!
  - ✅ **Likely cause:** Supabase keys aren't set up on Vercel. Fix: Add env vars in Vercel Settings, redeploy.
  - ❌ **Avoid:** Thinking something is broken. The code is fine; the config is missing.

- **(b) You're waiting for Vercel to deploy but it's been 10+ minutes.** Normally it's fast.
  - ✅ **Check:** Go to Vercel → Deployments. Did the build actually start? If it failed, click it to see the error.
  - ❌ **Avoid:** Giving up. There's a reason it's slow—diagnose it.

- **(c) You added a new feature locally, pushed to GitHub, but the live site didn't update.** Should auto-deploy!
  - ✅ **Check:** Did you push to the right branch (usually \`main\`)? Check Vercel → Deployments to see if a new build started.
  - ❌ **Avoid:** Assuming Vercel is broken. Usually it's a git push issue.

- **(d) You shared your live URL but your friend can't access it.** Says "Connection refused" or similar.
  - ✅ **Likely:** Your app crashed or the URL is wrong. Check Vercel → Deployments. Is there a green checkmark? Is the URL correct?
  - ❌ **Avoid:** Blaming their internet. Diagnose your deploy first.

- **(e) You forgot to add env vars and the app doesn't work.** Now you added them—does the old deploy magically work?
  - ✅ **No!** Old builds are already built. You must **Redeploy** in Vercel so it rebuilds with the new vars.
  - ❌ **Avoid:** Waiting and hoping. You have to redeploy.

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | Vercel account created, GitHub repo connected |
| ✅ | Repo imported into Vercel successfully |
| ✅ | Deployment finished (status shows \\"Ready\\") |
| ✅ | Live URL generated and accessible |
| ✅ | Live app works (pet tracker is functional on the internet) |
| ✅ | Added environment variables (if using Supabase) |
| ✅ | Redeployed after adding env vars |
| ✅ | Live app works with Supabase (data persists, isn't broken) |
| ✅ | Shared URL with someone and they can access it |

*Pass mark: 80% and a live, working app on the internet submitted.*

## Key Takeaways

- Deployment = putting your app online ☁️
- Vercel auto-deploys from GitHub
- One click and you're live!
- Keep secrets in environment variables
- Anyone can visit your live URL

**Next:** Module 11 — AI Agents & Workflows!`,
      },
    ]
  },
};

export const module11Steps: Record<Version, ModuleStepSequence> = {
  adult: {
    moduleId: 12,
    moduleName: "Module 11: AI Agent Workflows",
    totalDuration: 390,
    steps: [
      {
        id: 1,
        title: "What is an agent workflow?",
        type: "lesson",
        duration: 40,
        difficulty: "easy",
        xpReward: 50,
        content: `An **agent** is an LLM given a goal plus **tools** it can call to act (query a database, send an email, call an API). An **agent workflow** chains these into a multi-step process — the model decides which tools to use, in what order, reacting to results.

Contrast: a normal function does exactly what you coded; an agent *decides* within the goal and tools you gave it. That flexibility is the power (handles messy inputs) and the risk (it can decide wrong) — which is why reliability (Lesson 11.5) is half this module.

---`,
      },
      {
        id: 2,
        title: "The building blocks",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `- **Tools (function calling)** — functions you define and describe so the model can request a call with arguments; your code runs it and returns the result. Example tools: \`getOverdueInvoices()\`, \`draftReminderEmail(invoice)\`, \`sendEmail(draft)\`.
- **The agent loop** — the model reasons, optionally calls a tool, reads the result, repeats until done (ReAct-style: reason → act → observe).
- **MCP (Model Context Protocol)** — a standard way to give agents access to tools/data, so you can plug in capabilities (and swap models) without rewiring. You met MCP-style tools in Claude Code.

Keep it concrete: an agent is a loop of *decide → call a tool → look at the result → decide again*.

---`,
      },
      {
        id: 3,
        title: "Orchestration patterns",
        type: "checkpoint",
        duration: 45,
        difficulty: "medium",
        xpReward: 100,
        content: `Begins Objective 2. Three patterns learners choose between:

| Pattern | Shape | Use when |
| --- | --- | --- |
| **Single-agent tool loop** | One agent, several tools, looping | Most tasks — start here; simplest, most reliable |
| **Supervisor / foreman** | One orchestrator delegates to specialists | Distinct sub-tasks benefit from focused agents |
| **Graph / workflow** | Explicit steps (nodes) + paths (edges), with checkpoints | You need predictable, inspectable, resumable flows |

**Beginner advice:** start with the single-agent tool loop. Reach for multi-agent/graph only when a single agent genuinely struggles — more agents means more ways to fail. Simplicity is a reliability feature.

---`,
      },
      {
        id: 4,
        title: "Break a workflow into parts",
        type: "lesson",
        duration: 40,
        difficulty: "easy",
        xpReward: 50,
        content: `Completes Objective 2. Before building, decompose (the Module 3 habit, for agents). For each workflow define **responsibilities** (what the agent decides vs. what your code decides), **tools** (specific actions with clear I/O), and **hand-offs** (agent → tool → agent, and crucially agent → **human** for approval).

**Worked breakdown — the overdue-invoice reminder assistant:**

1. Tool \`getOverdueInvoices()\` → overdue invoices from Supabase.
2. Agent drafts a personalized reminder per invoice.
3. **Hand-off to human**: show drafts for review/approval.
4. Tool \`sendEmail(draft)\` → sends only approved ones.

**[SCREENSHOT PLACEHOLDER: Workflow Diagram]**

Diagram showing: getOverdueInvoices → Agent → Draft Reminders → Human Approval Queue → SendEmail. Flowchart proves sequence and hand-offs.

---`,
      },
      {
        id: 5,
        title: "Build it + the stable-interface pattern",
        type: "checkpoint",
        duration: 75,
        difficulty: "medium",
        xpReward: 100,
        content: `This delivers Objectives 1 and 3. Implement the reminder assistant in the invoice-tracker.

**Step 1 — Define the tools** (functions + descriptions the model can call): \`getOverdueInvoices\`, \`draftReminderEmail\`, \`sendEmail\`.

**Concrete tool definitions:**

\`\`\`typescript
// lib/ai/tools.ts
export const remoteInvoiceTools = [
  {
    name: "getOverdueInvoices",
    description: "Retrieve all invoices with due date >= 30 days past due",
    inputSchema: { type: "object", properties: {} },
    execute: async () => {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();
      const { data } = await supabase
        .from("invoices")
        .select("id, client_name, client_email, amount, due_date, days_overdue")
        .lt("due_date", thirtyDaysAgo)
        .eq("status", "unpaid");
      return data || [];
    }
  },
  {
    name: "draftReminderEmail",
    description: "Compose a personalized reminder email for one overdue invoice",
    inputSchema: {
      type: "object",
      properties: {
        invoiceId: { type: "string" },
        clientName: { type: "string" },
        amount: { type: "number" },
        daysOverdue: { type: "number" }
      },
      required: ["invoiceId", "clientName", "amount", "daysOverdue"]
    },
    execute: async ({ clientName, amount, daysOverdue }) => ({
      subject: \`Payment Reminder: Invoice $\${amount} now \${daysOverdue} days overdue\`,
      body: \`Hi \${clientName},\\n\\nThis is a friendly reminder that your invoice for $\${amount} is now \${daysOverdue} days overdue.\\n\\nPlease arrange payment at your earliest convenience.\\n\\nThank you,\\nAccounting Team\`
    })
  },
  {
    name: "sendEmail",
    description: "Send an approved reminder email (ONLY call after human approval in queue)",
    inputSchema: {
      type: "object",
      properties: {
        clientEmail: { type: "string" },
        subject: { type: "string" },
        body: { type: "string" }
      },
      required: ["clientEmail", "subject", "body"]
    },
    execute: async ({ clientEmail, subject, body }) => {
      // Mock: in production, call Resend or SendGrid
      console.log(\`[EMAIL] To: \${clientEmail}, Subject: \${subject}\`);
      return { sent: true, timestamp: new Date() };
    }
  }
];
\`\`\`

**Step 2 — Structure the AI call behind a stable interface (Objective 3).** Put the actual model call behind an interface so the rest of your app (and tests) never touches the AI SDK directly:

\`\`\`tsx
// lib/ai/draftReminder.ts
export interface ReminderDrafter {
  draft(invoices: Invoice[]): Promise<DraftEmail[]>;
}

export interface DraftEmail {
  invoiceId: string;
  subject: string;
  body: string;
  clientEmail: string;
}

// Production: call Claude with tools
const productionDrafter: ReminderDrafter = {
  draft: async (invoices) => {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "content-type": "application/json",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-opus-4-1",
        max_tokens: 2048,
        tools: remoteInvoiceTools,
        messages: [{
          role: "user",
          content: \`You are an accounting assistant. Draft personalized reminder emails for these \${invoices.length} overdue invoices. For each, call draftReminderEmail with the invoice details.\`
        }]
      })
    }).then(r => r.json());
    
    // Extract draft emails from tool use responses
    return extractDraftsFromResponse(response, invoices);
  }
};

// Test stub: deterministic, no live AI calls
const testStub: ReminderDrafter = {
  draft: async (invoices) => invoices.map(inv => ({
    invoiceId: inv.id,
    clientEmail: inv.client_email,
    subject: \`Payment reminder: \${inv.amount}\`,
    body: "Test reminder"
  }))
};

// Swap: tests use stub, prod uses real model
export const draftReminder: ReminderDrafter =
  process.env.NODE_ENV === "test" ? testStub : productionDrafter;
\`\`\`

Why: you can **stub** it for tests (no live AI calls, deterministic), and **swap** models/APIs later without touching the UI. This is the pattern that makes agent features testable and maintainable.

**Step 3 — Run the agent loop:** call the AI with the goal and tool definitions; it reasons, calls tools, and returns drafts:

\`\`\`tsx
// lib/ai/runReminderWorkflow.ts
export async function runReminderWorkflow() {
  const overdue = await getOverdueInvoices();
  if (overdue.length === 0) return [];
  
  const drafts = await draftReminder.draft(overdue);
  return drafts;
}
\`\`\`

**Step 4 — Insert the human checkpoint:** render drafts with Approve/Edit/Reject buttons. **Never let the agent send email autonomously**:

\`\`\`tsx
// app/admin/reminders/page.tsx
export default async function ReminderQueuePage() {
  const drafts = await runReminderWorkflow();
  
  return (
    <div className="space-y-4 p-6">
      <h1>Email Draft Approval Queue ({drafts.length})</h1>
      {drafts.map(draft => (
        <div key={draft.invoiceId} className="border rounded p-4">
          <p className="text-sm text-gray-600">Invoice ID: {draft.invoiceId}</p>
          <h3 className="font-bold">{draft.subject}</h3>
          <pre className="text-sm p-2 bg-gray-100 rounded mt-2">{draft.body}</pre>
          
          <form className="flex gap-2 mt-4">
            <input type="hidden" name="invoiceId" value={draft.invoiceId} />
            <button formAction={approveDraftAction} name="action" value="approve" className="px-4 py-2 bg-green-600 text-white rounded">
              Approve & Send
            </button>
            <button formAction={approveDraftAction} name="action" value="edit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Edit
            </button>
            <button formAction={approveDraftAction} name="action" value="reject" className="px-4 py-2 bg-red-600 text-white rounded">
              Reject
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
\`\`\`

**Step 5 — Send approved drafts** via \`sendEmail\`:

\`\`\`tsx
// app/admin/actions.ts
"use server"

export async function approveDraftAction(formData: FormData) {
  const invoiceId = formData.get("invoiceId") as string;
  const action = formData.get("action") as string;
  
  if (action === "approve") {
    // Fetch the draft (already approved in queue)
    const draft = await db.draftEmails.findUnique({ where: { invoiceId } });
    
    // Send via email service
    const result = await sendEmail(draft.clientEmail, draft.subject, draft.body);
    
    // Mark invoice as reminder sent
    if (result.sent) {
      await db.invoices.update({
        where: { id: invoiceId },
        data: { reminderSentAt: new Date(), reminderCount: { increment: 1 } }
      });
    }
  } else if (action === "edit") {
    // Allow manual editing before approval
    redirect(\`/admin/reminders/\${invoiceId}/edit\`);
  } else if (action === "reject") {
    // Delete the draft
    await db.draftEmails.delete({ where: { invoiceId } });
  }
}
\`\`\`

**[SCREENSHOT PLACEHOLDER: Approval Queue UI]**

App showing: 3 AI-drafted reminder emails with Approve/Edit/Reject buttons. Each draft shows the generated subject and body text. Proof of human-in-the-loop checkpoint working.

---`,
      },
      {
        id: 6,
        title: "Reliability & failure modes",
        type: "checkpoint",
        duration: 55,
        difficulty: "medium",
        xpReward: 100,
        content: `Delivers Objective 4 — what separates a demo from a product. Anticipate each failure:

- **Hallucination** — invents data or calls a tool with wrong arguments.
- **Loops** — repeats a step without progressing.
- **Tool misuse** — wrong tool, or the right tool at the wrong time (e.g. sending before approval).
- **Cascading errors** — one bad step feeds the next; failures compound in multi-agent setups.

**Guardrails:** human-in-the-loop for anything consequential (send/spend/delete) — the single most important safeguard; **limits** on steps/loops so a stuck agent stops; **validation** of tool inputs/outputs in your code; **least privilege** (a reminder agent can't delete invoices); **logging** so you can debug and audit (previews Module 12).

> **Instructor note:** ask "what's the worst thing this agent could do if it went wrong?" for the learner's own workflow. That question drives every guardrail.
> 

## Hands-on activity (~60 min, folded in)

**"Automate a real task."** Design and build a small agent workflow (the reminder assistant or your own) with the following steps:

### Step 1: Design the workflow (5 min)
1. Pick a task that takes multiple decisions + actions (e.g., classify support emails, generate invoice summaries, categorize expenses)
2. List the **responsibilities** (what agent decides vs. what your code decides)
3. List the **tools** (specific functions the agent can call)
4. Draw the hand-off flow (agent → tool → agent → human approval → action)
5. Pick an orchestration pattern (single-agent is safer; use it)

### Step 2: Define tools (10 min)
1. Write the tool definitions with clear descriptions and input schemas
2. Implement each tool's \`execute\` function
3. Example: if you pick email triage, write \`fetchEmails()\`, \`classifyEmail()\`, \`draftReply()\`, \`markProcessed()\`

### Step 3: Create the stable interface (10 min)
1. Define an interface for your workflow (e.g., \`EmailTriage { triage(...): Promise<...> }\`)
2. Write the production implementation that calls the AI
3. Write a test stub that returns deterministic results
4. Export the right one based on \`NODE_ENV\`

### Step 4: Build the human checkpoint (10 min)
1. Create a page that shows drafts/recommendations (e.g., \`/admin/triage-queue\`)
2. Add Approve/Edit/Reject buttons (form buttons, no JavaScript required)
3. Route to a server action that handles the user's choice

### Step 5: Identify guardrails (10 min)
1. Ask: "What's the worst this could do?"
2. List ≥2 guardrails (input validation, loop limits, retry logic, logging, least privilege)
3. Implement them in code (not just in docs)

### Step 6: Test end-to-end (15 min)
1. Run locally: \`npm run dev\`
2. Trigger the workflow (e.g., visit \`/admin/triage-queue\`)
3. Verify: fetch → agent loop → queue render → approval → action all work
4. Test the guardrails (e.g., try to bypass approval, or send invalid input to a tool)

### Deliverable:
- A working workflow in your invoice-tracker (or new Next.js app)
- Workflow design doc: responsibilities/tools/hand-offs/pattern choice + justification
- Code: tools, interface, production + stub implementations, checkpoint UI, guardrails
- Write-up (1 page): failure modes and how each guardrail mitigates them

## Quiz questions (preview)

These are the four questions you'll see on the quiz. Study these to prepare:

**Q11-1:** An agent workflow differs from a normal function because:
- (a) it's Python
- (b) **the agent decides which tools to use within the goal** ✓
- (c) it never fails
- (d) it needs no code

*Why:* A function does exactly what you coded. An agent receives a goal and tools, then *decides* which tools to call and in what order. That autonomy is the power (handles messy inputs) and the risk (it can decide wrong) — which is why reliability matters.

**Q11-2:** Putting the AI call behind a stable interface lets you:
- (a) make it slower
- (b) **stub it in tests and swap models later without changing the UI** ✓
- (c) skip the AI
- (d) avoid writing code

*Why:* When the AI call is behind an interface (like \`draftReminder(...)\`), tests can stub it (no live model), and you can swap models/implementations without touching the UI. Testability and maintainability.

**Q11-3:** The single most important safeguard before a consequential action (send/spend/delete):
- (a) more agents
- (b) **a human-in-the-loop approval** ✓
- (c) a bigger model
- (d) faster hardware

*Why:* No guardrail beats human review before the agent sends an email, charges a card, or deletes data. Always require approval for the irreversible.

**Q11-4:** Your workflow calls an external API that fails 10% of the time. What do you add?
- (a) nothing — accept the 10% failure rate
- (b) **retry logic + logging so failures are detectable and the loop can recover** ✓
- (c) delete the workflow — it's unreliable
- (d) a prayer

*Why:* Build workflows that degrade gracefully. Assess failure modes (API down, timeouts, wrong responses) and add defensive patterns: retries, exponential backoff, circuit breakers, logging so you can debug and audit. A 90% reliable workflow is only 90% reliable if you can recover.

## Knowledge check (mapped to objectives)

### Written checks:

**Objective 1 — Build a workflow:** Demonstrate a multi-step agent workflow with its tools and the human checkpoint.
- *Example answer:* "My workflow fetches overdue invoices, calls the AI to draft reminder emails for each, displays them in an approval queue where I can approve/edit/reject them, then sends approved ones. Tools: \`getOverdueInvoices()\`, \`draftEmail()\`, \`sendEmail()\`. Checkpoint: humans must approve before send."

**Objective 2 — Break it down:** For "triage incoming support emails," list responsibilities, tools, hand-offs, and pick an orchestration pattern with justification.
- *Example answer:*
  - **Responsibilities:** AI reads emails and assigns urgency/category; human decides which to reply to.
  - **Tools:** \`fetchSupportEmails()\`, \`classifyEmail()\`, \`draftResponse()\`, \`markAsTriaged()\`.
  - **Hand-offs:** Agent → Triage Queue → Human → Send.
  - **Pattern:** Single-agent loop (simpler); start here, escalate to multi-agent if different email types need different workflows.

**Objective 3 — Stable interface:** Show your AI call behind an interface and the test stub that replaces it.
- *Example answer:*
  \`\`\`typescript
  interface EmailTriage { triage(emails: Email[]): Promise<Triage[]>; }
  const triageService = process.env.NODE_ENV === "test" ? testStub : productionService;
  \`\`\`

**Objective 4 — Reliability:** Name three ways your workflow could fail and the guardrail for each.
- *Example answer:*
  1. **Agent hallucination:** Invents a customer name. **Guardrail:** Validate tool inputs (e.g., client must exist in DB).
  2. **Sends before approval:** Agent tries to call sendEmail without human check. **Guardrail:** Only allow send after user clicks Approve button.
  3. **External API down:** Email service timeout. **Guardrail:** Add retry logic with exponential backoff + logging.

### Scenario-based judgment checks:

*For each scenario, explain what went wrong and what to do.*

- **(a) Your agent keeps calling the same tool over and over.** It's stuck in a loop, getting the same response each time.
  - ✅ **Root cause:** No loop limit. Agent doesn't know when to stop. **Fix:** Add \`maxSteps: 10\` to the agent call. If it hits 10 steps, stop and return "incomplete."
  - ❌ **Avoid:** Leaving it running. Looping agents waste API credits and block your workflow.

- **(b) The AI drafts an email with a client name that doesn't match the invoice.** It hallucinated a name.
  - ✅ **Root cause:** The tool's output wasn't validated. **Fix:** Before storing the draft, verify the client exists in the DB. Reject if not found.
  - ❌ **Avoid:** Sending it anyway. The email would be confusing to the client.

- **(c) A user clicks "Approve" but the email never sends.** The tool executed but silently failed.
  - ✅ **Root cause:** No logging or error handling on \`sendEmail()\`. **Fix:** Log every attempt (success/failure), return an error object, and show the user the result.
  - ❌ **Avoid:** Assuming it worked. Always log and verify.

- **(d) Your workflow works perfectly in tests but fails in production.** Different behavior between environments.
  - ✅ **Diagnose:** Check env vars (API key, database URL). Test stub works everywhere; real calls need real credentials. **Fix:** Verify \`.env\` in production (Vercel settings).
  - ❌ **Avoid:** Shipping without testing with real Supabase/email service. Stubs hide integration bugs.

- **(e) You need to swap the AI model from Claude to GPT-4.** Agents often get vendor-locked.
  - ✅ **If you have a stable interface:** Swap the implementation behind the interface. One line change, UI untouched.
  - ❌ **If AI calls are scattered:** You have to rewrite everywhere. This is why stable interfaces matter.

**Rubric checklist (self-review before submission):**

| Criterion | Check (✅ = pass) |
|-----------|-------------|
| **Workflow designed** | Clear breakdown: responsibilities, tools, hand-offs documented |
| **Tools defined** | At least 2 tools with clear I/O and descriptions for the model |
| **AI call structured** | Behind an interface (e.g., \`ReminderDrafter\`); not scattered in components |
| **Test stub included** | Stub implements the same interface; tests use it (no live API) |
| **Human checkpoint** | Drafts shown to human before any consequential action (send/spend/delete) |
| **Guardrails named** | ≥2 identified (e.g., input validation, loop limits, retry logic, logging) |
| **Guardrails implemented** | Each guardrail is in code (not just in write-up) |
| **Failure modes documented** | Short write-up: "If X fails, we do Y because Z" |
| **Workflow tested end-to-end** | Runs locally; fetch → agent loop → approval queue → action all work |

*Pass mark: 80% and a working, guard-railed workflow submitted.*

## Tools & alternatives (this module)

The patterns are framework-agnostic. Build a simple agent loop directly against a model's tool-use/function-calling API, or use an orchestration framework for graph-based, checkpointed workflows when complexity grows. MCP is the emerging standard for connecting tools/data and swapping models. Default: start simple (single-agent loop, direct tool calls); adopt a framework only when the workflow demands it.

## Key takeaways

- An agent = LLM + goal + tools; a workflow chains tool calls into a multi-step automation.
- Building blocks: tools (function calling), the reason→act→observe loop, MCP for connecting tools/models.
- Design before building: responsibilities, tools, hand-offs; start with a single-agent loop.
- Put the AI call behind a stable interface so it's testable (stub) and swappable.
- Always human-in-the-loop before consequential actions; reliability (limits, validation, least privilege, logging) is the real work.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)`,
      },
    ]
  },
  kids: {
    moduleId: 12,
    moduleName: "Module 11: AI Agent Workflows",
    totalDuration: 390,
    steps: [
      {
        id: 1,
        title: "What's an Agent?",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `An agent is AI that can think through steps and make decisions:

**Function (you tell it every step):**
\`\`\`javascript
function addPet(name, breed) {
  validate(name);      // Step 1
  saveToDB(name);      // Step 2
  sendNotification();   // Step 3
}
\`\`\`

**Agent (you give it a goal, it figures out steps):**
\`\`\`
Goal: "Help users manage their pets"
Tools: database, email, notifications
AI figures out: validate → save → notify (and more!)
\`\`\`

**Real example:** You have a golden retriever named Buddy. An agent can:
1. Look up golden retriever facts
2. Generate personalized care tips
3. Suggest health reminders
4. Send you updates

All without you coding each step!

---`,
      },
      {
        id: 2,
        title: "Agents in Your Pet Tracker",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Example: Auto-generate pet care tips.

**What happens:**
1. User views their golden retriever "Buddy"
2. AI sees: breed = "golden retriever"
3. AI generates: exercise (60 min/day), grooming (2x/week), diet (2-3 cups/day)
4. Show tips on the pet detail page

**Code example (the agent interface):**

\`\`\`typescript
// lib/ai/generateTips.ts
export interface TipsGenerator {
  generate(petBreed: string, petName: string): Promise<string>;
}

// Production: calls Claude AI
const productionGenerator: TipsGenerator = {
  generate: async (breed, name) => {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": process.env.ANTHROPIC_API_KEY! },
      body: JSON.stringify({
        model: "claude-opus-4-1",
        max_tokens: 512,
        messages: [{
          role: "user",
          content: \`Generate 3 personalized pet care tips for a \${breed} named \${name}. Be fun and friendly!\`
        }]
      })
    }).then(r => r.json());
    return extractTextFromResponse(response);
  }
};

// Test: returns fake but realistic tips (no AI needed)
const testStub: TipsGenerator = {
  generate: async (breed) => \`1. Exercise daily\\n2. Groom often\\n3. Love unconditionally!\`
};

// Use test in tests, real AI in production
export const tipsGenerator = process.env.NODE_ENV === "test" ? testStub : productionGenerator;
\`\`\`

**In your pet detail page:**

\`\`\`tsx
// app/pets/[id]/page.tsx
export default async function PetDetailPage({ params }) {
  const pet = await getPet(params.id);
  const tips = await tipsGenerator.generate(pet.breed, pet.name);
  
  return (
    <div>
      <h1>{pet.name}</h1>
      <p>{pet.breed}</p>
      <div className="bg-blue-100 p-4 rounded">
        <h2>AI Care Tips 💡</h2>
        <pre>{tips}</pre>
      </div>
    </div>
  );
}
\`\`\`

---`,
      },
      {
        id: 3,
        title: "Workflows",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `A workflow is a series of steps that run in order. Each step depends on the previous one.

**Example workflow: Birthday reminder automation**

1. **Fetch** all pets with birthdays coming up
2. **Generate** personalized birthday messages
3. **Show human** the messages for approval (queue)
4. **Send** approved messages to owners
5. **Log** which ones were sent

**Why workflows matter:** Instead of building this manually (5 separate features), AI orchestrates it as one smooth process.

**Real code (simplified):**

\`\`\`typescript
// lib/ai/birthdayWorkflow.ts
export async function runBirthdayWorkflow() {
  // Step 1: Fetch
  const upcomingBirthdays = await supabase
    .from("pets")
    .select("id, name, owner_email")
    .gte("birthday", today())
    .lt("birthday", nextWeek());
  
  // Step 2: Generate (call AI for each)
  const messages = await Promise.all(
    upcomingBirthdays.map(pet =>
      tipsGenerator.generate(\`It's \${pet.name}'s birthday!\`, pet.name)
    )
  );
  
  // Step 3: Show queue (human approves/edits)
  // Step 4: Send (only after approval)
  // Step 5: Log
  return { sent: messages.length, timestamp: new Date() };
}
\`\`\`

## Activity: Build an Automated Feature 🤖

Pick one feature to build and automate with AI. Follow these steps:

### Step 1: Choose your feature (2 min)
Pick one:
- **Care tips:** AI generates personalized tips when user views a pet
- **Birthday reminders:** AI drafts birthday messages for the queue
- **Weekly digest:** AI summarizes all pets' activities in an email
- **Breed info:** AI adds fun facts about breeds automatically

### Step 2: Design the workflow (5 min)
Write down:
1. **When it runs:** (every time user views pet? once a week? when user clicks a button?)
2. **AI input:** (breed name? pet details?)
3. **AI output:** (tips? messages? facts?)
4. **Human approval?** (do we show drafts for approval, or send automatically?)

### Step 3: Create the AI interface (10 min)
1. Write the interface (like \`TipsGenerator\` from above)
2. Write the test stub (returns fake but realistic results)
3. Write the production version (calls Claude)
4. Test: run locally, see it work with the stub

### Step 4: Add to your app (15 min)
1. Create a page or component that uses your AI feature
2. Call it from your pet detail page, dashboard, or a new admin page
3. Test: does it show the AI output?

### Step 5: Add a human approval queue (if needed) (15 min)
If your feature sends emails/notifications:
1. Create an approval page (e.g., \`/admin/queue\`)
2. Show drafts (what the AI generated)
3. Add Approve/Skip/Edit buttons
4. Only send after human approval

### Step 6: Test the guardrails (8 min)
1. **Test the AI:** What if it generates something weird? Show the weird output and handle it gracefully
2. **Test approval:** If you skip approval, does it still send? It shouldn't!
3. **Test logs:** Did you log what happened? (helpful for debugging later)

### Deliverable:
- Working AI feature in your pet tracker
- Screenshot showing the AI output (tips/message/fact)
- Screenshot of the approval queue (if you built one)
- One-paragraph write-up: "How could this break? What guardrails protect it?"

## Quiz Questions (Preview)

Here are your three quiz questions. Study these!

**Q11-k1:** An AI agent is different from a function because:
- (a) It's Python
- (b) **The agent decides which steps to take (within a goal)** ✓
- (c) It never fails
- (d) It needs no code

*Why:* A function does exactly what you tell it to do (step 1, step 2, step 3 — always in the same order). An agent is smarter: you give it a goal and tools, and it decides the best steps to reach that goal. That's the power of agents!

**Q11-k2:** Why put AI calls behind a stable interface?
- (a) Make it slower
- (b) **Test it without real AI, swap models later without changing the app** ✓
- (c) Skip the AI
- (d) Avoid coding

*Why:* Behind an interface (like \`generateTips()\`), you can swap the AI implementation without breaking the rest of your app. In tests, you can use a fake version; in production, use the real AI. The app doesn't care—it just calls the interface!

**Q11-k3:** Before a big action (send money, delete data), the safest thing is:
- (a) Use more agents
- (b) **Have a human check/approve it first** ✓
- (c) Use a bigger AI model
- (d) Run it faster

*Why:* No guardrail beats human approval! If your agent is about to send an email, charge a card, or delete data, a human should review it first. AI can make mistakes—you're the final check.

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **What's the difference between a function and an agent?**
   - *Example answer:* "A function does exactly what you code (step 1, step 2, step 3 — always the same order). An agent is smarter—you give it a goal and tools, and it figures out the best steps to reach that goal. Agents can handle messy inputs and make decisions."

2. **Describe a workflow in your app.**
   - *Example answer:* "My birthday reminder workflow: 1) fetch all pets with upcoming birthdays, 2) use AI to generate birthday messages, 3) show them to me for approval, 4) send the approved messages to owners. Each step depends on the previous one."

3. **How could automation improve your pet tracker?**
   - *Example answer:* "Instead of manually writing care tips for each breed, AI generates them. Instead of manually sending reminders, AI drafts them and I approve them. Same result, way faster."

### Scenario-based judgment checks:

*For each scenario, explain what went wrong.*

- **(a) You built an AI feature that sends emails automatically.** No approval queue. It sent 50 weird emails before you noticed.
  - ✅ **Fix:** Always add a human approval step before sending/spending/deleting. Show drafts for review first!
  - ❌ **Avoid:** Trusting AI alone. AI makes mistakes. You're the backup.

- **(b) Your care tips feature works sometimes but sometimes returns weird, unhelpful tips.**
  - ✅ **Root cause:** AI is unpredictable (hallucination). **Fix:** Add a fallback—if tips look bad, show a default message or ask user to regenerate.
  - ❌ **Avoid:** Showing weird tips to users. Test the AI output first!

- **(c) You tested with the stub, but it breaks in production with real AI.** The stub was too simple and hid bugs.
  - ✅ **Root cause:** Testing only with stubs isn't enough. **Fix:** Also test with real AI (at least once) before shipping.
  - ❌ **Avoid:** Assuming stubs catch all bugs. Stubs are helpful but not perfect.

- **(d) You need to swap AI from Claude to GPT-4 but the code is everywhere.** AI calls are scattered.
  - ✅ **If you used an interface:** One line change, done!
  - ❌ **If AI calls are everywhere:** You have to rewrite lots of code. This is why interfaces matter!

- **(e) Your AI queue shows 100 drafts but you approve just the first 5.** The rest don't send because you abandoned the queue.
  - ✅ **Expected behavior:** Drafts only send after approval. That's safe!
  - ✅ **Better:** Mark unapproved drafts as "expired" or delete them after a time limit.

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | Feature designed: when it runs, what it does, what AI generates |
| ✅ | Workflow broken down: fetch → AI → queue (if needed) → action |
| ✅ | AI interface created: production + test stub both work |
| ✅ | Test stub realistic: returns believable fake results, no API calls |
| ✅ | Feature added to app: runs on pet page / admin page / dashboard |
| ✅ | AI output visible: screenshot showing generated tips/messages/facts |
| ✅ | Approval queue (if needed): shows drafts, Approve/Skip buttons work |
| ✅ | Guardrails identified: ≥2 ways it could break + how to fix |
| ✅ | Tested end-to-end: stub works, real AI works, approval works |

*Pass mark: 80% and a working AI feature with guardrails submitted.*

## Key Takeaways

- Agents = AI that makes decisions 🤖
- Workflows = multi-step processes
- Automation = faster, smarter apps
- Use Claude Code to build agentic features

**Next:** Module 12 — Production-Ready Code!`,
      },
    ]
  },
};

export const module12Steps: Record<Version, ModuleStepSequence> = {
  adult: {
    moduleId: 13,
    moduleName: "Module 12: Building Production-Ready Software",
    totalDuration: 480,
    steps: [
      {
        id: 1,
        title: "What \"production-ready\" means",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Production-ready means the app holds up when real people use it in unexpected ways. Five pillars, each a lesson below: **tested**, **resilient** (handles errors/empty/loading), **secure**, **accessible & performant**, and **maintainable**.

Reframe for AI builders: AI helps you *reach* production-ready faster (it writes tests, adds error handling, spots issues), but *you* set the bar and verify — the Module 1 principle at its highest stakes.

---`,
      },
      {
        id: 2,
        title: "Testing with AI",
        type: "lesson",
        duration: 75,
        difficulty: "easy",
        xpReward: 50,
        content: `Begins Objective 2. Tests are code that checks your code, so you can change things confidently. Three levels:

- **Unit tests** — one function in isolation (e.g. "an invoice past its due date is flagged overdue"). Tools: Vitest or Jest.
- **Integration tests** — pieces together (saving a client actually writes to the DB).
- **E2E tests** — drive the real app like a user, in a browser. Tool: Playwright.

**Concrete unit test example (Vitest):**

\`\`\`typescript
// lib/invoiceStatus.ts
export function isOverdue(invoice: Invoice): boolean {
  const daysOverdue = Math.floor(
    (Date.now() - new Date(invoice.dueDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysOverdue > 0;
}

// lib/__tests__/invoiceStatus.test.ts
import { describe, it, expect } from "vitest";
import { isOverdue } from "../invoiceStatus";

describe("isOverdue", () => {
  it("returns true for invoices past due", () => {
    const pastDue = { dueDate: new Date(Date.now() - 5 * 86400000).toISOString() };
    expect(isOverdue(pastDue as any)).toBe(true);
  });

  it("returns false for invoices not yet due", () => {
    const future = { dueDate: new Date(Date.now() + 5 * 86400000).toISOString() };
    expect(isOverdue(future as any)).toBe(false);
  });

  it("handles edge case: due today", () => {
    const today = { dueDate: new Date().toISOString() };
    expect(isOverdue(today as any)).toBe(false);
  });
});
\`\`\`

**Concrete E2E test example (Playwright):**

\`\`\`typescript
// e2e/invoices.spec.ts
import { test, expect } from "@playwright/test";

test("user can view and filter invoices", async ({ page }) => {
  // Sign in (seed a demo user first)
  await page.goto("/login");
  await page.fill("input[type=email]", "demo@example.com");
  await page.fill("input[type=password]", "demo-password");
  await page.click("button:has-text('Sign In')");

  // Navigate to invoices
  await page.goto("/invoices");
  
  // Verify invoices list loads
  await expect(page.locator("h1")).toContainText("Invoices");
  const rows = page.locator("table tbody tr");
  await expect(rows).toBeTruthy();
  
  // Filter to unpaid
  await page.selectOption("[name=status]", "unpaid");
  
  // Verify results updated
  await expect(page.locator("text=No unpaid invoices")).toBeHidden();
});
\`\`\`

AI writes tests well — give it a function and ask for unit tests covering normal *and* edge cases. **But review the tests:** an AI can write a test that passes but checks the wrong thing, giving false confidence. For example:

\`\`\`typescript
// ❌ BAD TEST: passes but checks nothing
it("invokes the function", () => {
  isOverdue(someInvoice);
  expect(true).toBe(true); // Always true!
});

// ✅ GOOD TEST: checks the actual return value
it("returns true for overdue invoices", () => {
  const overdue = { dueDate: new Date(Date.now() - 10000).toISOString() };
  expect(isOverdue(overdue as any)).toBe(true);
});
\`\`\`

Run tests locally and on CI:

\`\`\`bash
npm run test           # Unit + integration
npm run test:e2e       # Playwright E2E
\`\`\`

**[SCREENSHOT PLACEHOLDER: Test Run Output]**

Terminal showing: \`npm run test\` output with 25 unit tests passing; \`npm run test:e2e\` showing 5 E2E tests passing. Proof: tests run and pass.

> **Common gotchas (build-verified):** (1) \`@playwright/test\` (runner) ≠ \`playwright\` (library) — install the right one. (2) Vitest and Playwright **double-collect** each other's specs unless you scope \`include\`/\`testDir\` — keep them in separate folders. (3) Once auth gates routes, **E2E/screenshot scripts must sign in first**, or every test hits a 302 to login. Seed a demo user and log in at the start. (4) Review AI-written tests critically — a passing test doesn't prove code correctness, only that the assertion passes. Check: does the test verify what you intended?
> 

---`,
      },
      {
        id: 3,
        title: "Error handling & resilient UX",
        type: "lesson",
        duration: 50,
        difficulty: "easy",
        xpReward: 50,
        content: `Continues Objective 2. Real apps hit failures. Every data-driven screen needs three states: **Loading** (spinner/skeleton), **Empty** ("No invoices yet — create your first," not a blank table), **Error** (friendly message + retry, never a raw stack trace).

**Concrete example — loading/empty/error states in a component:**

\`\`\`tsx
// app/invoices/page.tsx
"use client"

import { useEffect, useState } from "react";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/invoices");
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setInvoices(data);
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, []);

  // Loading state
  if (invoices === null && !error) {
    return <div className="p-4"><div className="animate-pulse bg-gray-200 h-10 rounded" /></div>;
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <h2 className="font-bold text-red-800">Failed to load invoices</h2>
        <p className="text-red-700">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-2 px-4 py-2 bg-red-600 text-white rounded">
          Try Again
        </button>
      </div>
    );
  }

  // Empty state
  if (invoices.length === 0) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-lg font-bold">No invoices yet</h2>
        <p>Create your first invoice to get started.</p>
        <a href="/invoices/new" className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded">
          Create Invoice
        </a>
      </div>
    );
  }

  // Happy path
  return (
    <div>
      <h1>Invoices</h1>
      <table>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td>{inv.clientName}</td>
              <td>\${inv.amount}</td>
              <td>{inv.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
\`\`\`

In code: wrap risky operations (DB calls, the agent workflow) in try/catch, handle the error path, never show raw errors to users. In Next.js, use error boundaries and loading files. Ask AI to "add loading, empty, and error states to this component" — then verify each state by testing:

\`\`\`bash
# Test loading: intercept network requests
# Test empty: mock API to return []
# Test error: mock API to throw
\`\`\`

**[SCREENSHOT PLACEHOLDER: Empty & Error States]**

Three screenshots: (1) Loading state with spinner, (2) Empty state with "No invoices yet" message and Create button, (3) Error state with friendly error + Retry button. Proof: UX handles all states gracefully.

---`,
      },
      {
        id: 4,
        title: "Security hardening",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `Completes Objective 2 and is non-negotiable. Pull together the course's security threads:

- **Authorization on every path** — RLS (Module 7) enforces data access in the DB; confirm it's on for *every* table, tested with two accounts. Gate protected pages so logged-out users can't reach them.
- **Input validation** — never trust user input; validate on the server, not just the browser.
- **Secrets** — env vars only, never in the repo (Modules 9–10); server-only keys for privileged operations.
- **Least privilege** — code and agents get only the access they need (Module 11).
- **Dependencies** — keep packages updated; AI can flag known-vulnerable ones.

**Concrete security fixes:**

**Bad: No input validation (SSRF/XSS risk)**
\`\`\`typescript
// ❌ DANGEROUS: trusts user input directly
export async function saveInvoice(clientEmail: string) {
  const client = await supabase
    .from("clients")
    .insert({ email: clientEmail });
  return client;
}
\`\`\`

**Good: Validate on server**
\`\`\`typescript
// ✅ SAFE: validates before using
export async function saveInvoice(clientEmail: string) {
  // Validate format
  if (!clientEmail.includes("@") || clientEmail.length > 255) {
    throw new Error("Invalid email");
  }
  
  // Sanitize (remove extra whitespace)
  const clean = clientEmail.trim().toLowerCase();
  
  const client = await supabase
    .from("clients")
    .insert({ email: clean });
  return client;
}
\`\`\`

**Bad: Missing RLS check (data exposure)**
\`\`\`sql
-- ❌ DANGEROUS: anyone can read anyone's data
CREATE TABLE invoices (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  amount INT NOT NULL
);
-- No RLS enabled!
\`\`\`

**Good: RLS on every table**
\`\`\`sql
-- ✅ SAFE: data access controlled by RLS
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users read own invoices" ON invoices
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "users update own invoices" ON invoices
  FOR UPDATE USING (auth.uid() = user_id);
\`\`\`

**Test with two accounts:** sign in as User A, confirm you see only User A's data. Sign in as User B, confirm you see only User B's data (and can't access User A's via API).

**Bad: Secrets in code**
\`\`\`typescript
// ❌ DANGEROUS: API key in the repo!
const STRIPE_SECRET = "sk_live_abc123";
\`\`\`

**Good: Secrets in env vars**
\`\`\`typescript
// ✅ SAFE: loaded from env at runtime
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET) throw new Error("Missing STRIPE_SECRET_KEY");
\`\`\`

**AI + security caveat:** AI will happily write insecure code — skip validation, over-expose data, leave RLS off. Security is where you verify *hardest*. Ask AI to review specifically for security issues, then confirm its findings by:
1. Reading the code yourself
2. Testing with two accounts
3. Checking \`.gitignore\` for secrets
4. Running a dependency audit: \`npm audit\`

---`,
      },
      {
        id: 5,
        title: "Accessibility & performance",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 3 — the two production qualities beginners most often skip.

**Accessibility (a11y)** — real users include people using keyboards and screen readers, and it's often a legal requirement. The basics that cover most of it:

- **Semantic HTML** — real \`<button>\`, \`<label>\`, headings in order (not \`<div>\` soup).
- **Keyboard nav** — everything usable without a mouse; visible focus states.
- **Contrast** — text meets WCAG contrast ratios.
- **Labels & alt text** — form inputs have labels; images have alt.

Run a quick audit (browser Lighthouse / axe) and fix the top issues. A component library like shadcn/ui (Module 6) gives you a lot of this for free.

**Performance (Core Web Vitals)** — measure before optimizing. Watch **LCP** (load speed), **INP** (responsiveness), **CLS** (layout stability) via Lighthouse. Common wins: don't fetch everything client-side (use server components), paginate large lists, and size images. Set a simple budget and check it.

**[SCREENSHOT PLACEHOLDER: Lighthouse Report]**

Lighthouse audit showing: Accessibility score (e.g., 85+), Performance score (LCP, INP, CLS metrics). Proof: quality metrics meet production bar.

> **AI caveat:** AI rarely adds a11y or thinks about performance unless you ask. Prompt for them explicitly ("make this accessible: labels, keyboard, contrast") and verify with a real audit.
> 

---`,
      },
      {
        id: 6,
        title: "Maintainability",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `The maintainability half of Objective 1. Code is read far more than written — and with AI generating lots of it, keeping it understandable is a real skill:

- **Clear names** — \`getOverdueInvoices\` beats \`doStuff\`.
- **Small, focused pieces** — components/functions that do one thing.
- **Consistent structure** — follow the project's patterns (encode them in \`.cursorrules\`/[CLAUDE.md](http://CLAUDE.md)).
- **Light docs** — a README (what it is, how to run it); comments only where the *why* isn't obvious.
- **Don't ship what you don't understand** — the course throughline (Module 8's reading skill).

A maintainable codebase is also AI-friendly: clean code gives the model better context. Quality compounds.

---`,
      },
      {
        id: 7,
        title: "Reviewing against a checklist",
        type: "lesson",
        duration: 40,
        difficulty: "easy",
        xpReward: 50,
        content: `Delivers Objective 4 — and mirrors the capstone rubric. Self-review before calling anything done:

| Area | Check |
| --- | --- |
| Functionality | Core features work; happy path and edge cases handled |
| Tests | Key logic has tests; they pass; they check the right things |
| Errors/UX | Loading, empty, and error states on every data screen |
| Security | RLS on all tables (tested w/ 2 accounts); server-side validation; no secrets in repo |
| Accessibility | Semantic HTML, keyboard nav, contrast, labels/alt |
| Performance | Core Web Vitals measured; obvious wins done |
| Maintainability | Clear names, small pieces, consistent structure, README |
| Deployment | Deployed, env vars set, production auth URLs configured |
| Understanding | You can explain every part you're shipping |

Run it against the invoice-tracker and fix each gap. This checklist *is* the capstone rubric in checklist form.

## Hands-on activity (~90 min, folded in)

**"Harden the invoice tracker to production-ready."** Follow these steps:

### Step 1: Add unit tests (15 min)
1. Create \`lib/__tests__/\` folder
2. Pick one core function (e.g., \`isOverdue\`, \`calculateTax\`, \`validateEmail\`)
3. Ask AI: "Write Vitest unit tests for this function covering normal cases and edge cases"
4. Review the tests (do they check what you care about?)
5. Run: \`npm run test\` → all tests pass

### Step 2: Add one E2E test (15 min)
1. Create \`e2e/invoices.spec.ts\`
2. Write a test that: logs in → navigates → performs an action → verifies result
3. Seed a demo user in your Supabase project first
4. Run: \`npm run test:e2e\` → test passes

### Step 3: Add loading/empty/error states (15 min)
1. Pick a data-driven page (e.g., \`/invoices\`, \`/clients\`)
2. Ask AI: "Add loading, empty, and error states to this page"
3. Test each state by mocking different API responses (use Playwright intercept or modify the component locally)
4. Verify: loading spinner shows, empty message shows, error message shows

### Step 4: Run security checklist (15 min)
1. For every table in your database:
   - [ ] RLS is enabled
   - [ ] Policies exist for SELECT, INSERT, UPDATE, DELETE
   - Test with two accounts (User A sees only User A's data)

2. For every form/API route:
   - [ ] Input validated on server (not just browser)
   - [ ] Secrets are env vars, not in code

3. Check \`.gitignore\`:
   - [ ] \`.env.local\` is listed
   - [ ] \`node_modules\`, \`.next\` are listed

4. Run: \`npm audit\` → no critical vulnerabilities

### Step 5: Run a11y + performance audit (15 min)
1. Deploy to Vercel or run locally
2. Open in Chrome, press F12, go to Lighthouse
3. Run: Accessibility audit → note score
4. Run: Performance audit → note LCP, INP, CLS
5. Fix the top 2-3 issues:
   - Missing alt text? Add it
   - Low contrast? Increase it
   - Large images? Compress/size them
   - Missing labels? Add them
6. Re-run Lighthouse → verify scores improved

### Step 6: Self-review against checklist (15 min)
1. Go through the 9-point checklist in Lesson 12.7
2. For each item: does your app pass?
3. List: ✅ (passes) or ❌ (needs work)
4. For each ❌, write what you'd fix

### Deliverable:
- Passing unit test + E2E test (screenshot or test output)
- Screenshots of loading/empty/error states
- Screenshot of Lighthouse audit (before & after)
- Completed 9-point checklist (with ✅ or ❌ for each)
- Write-up: one paragraph on what hardening taught you

## Quiz questions (preview)

These are the three questions you'll see on the quiz. Study these to prepare:

**Q12-1:** The pillars of production-ready are tested, resilient, secure, maintainable, and:
- (a) colorful
- (b) **accessible & performant** ✓
- (c) cheap
- (d) fast to type

*Why:* Production-ready has five pillars: tested, resilient (handles errors/empty/loading), secure (RLS/validation/env vars), accessible (WCAG, keyboard, labels), and performant (Core Web Vitals). Real users depend on all five.

**Q12-2:** The caveat when AI writes your tests:
- (a) they're always perfect
- (b) **review them — a test can pass while checking the wrong thing** ✓
- (c) never run them
- (d) delete them

*Why:* A test can pass and still not validate what you care about. The test passes because the assertion is wrong, not because the code works. Review the test logic — does it check what you intended?

**Q12-3:** Which production qualities does AI usually skip unless you ask?
- (a) Variable names
- (b) **Accessibility & performance** ✓
- (c) Syntax
- (d) Comments

*Why:* AI excels at logic and structure. It rarely thinks about a11y (labels, keyboard, contrast) or performance (bundle size, Core Web Vitals) unless you explicitly prompt for them. Ask. Verify. Measure.

## Knowledge check (mapped to objectives)

### Written checks:

**Objective 1 — Deliver production-ready:** Describe what "production-ready" means and how it differs from "it works on my screen."
- *Example answer:* "Production-ready means the app holds up when real people use it unexpectedly. It's tested (unit/E2E), resilient (handles errors/loading/empty), secure (RLS/validation/env vars), accessible (keyboard/contrast/labels), performant (Core Web Vitals), and maintainable (clear names, documented). 'It works on my screen' is just the happy path."

**Objective 2 — Tests/errors/hardening:** Explain why a test can pass but be wrong, and give an example.
- *Example answer:* "A test can pass but check the wrong thing. Example: \`it("function exists", () => { expect(true).toBe(true); })\` passes but doesn't verify the function's behavior. Better: \`it("returns true for overdue invoices", () => { expect(isOverdue(pastDue)).toBe(true); })\` checks what we care about."

**Objective 3 — A11y & performance:** Name three WCAG basics and one Core Web Vital, then explain how you'd measure them.
- *Example answer:* "WCAG basics: semantic HTML (real buttons), keyboard navigation (Tab key works), contrast (text meets ratio), alt text (images described). Core Web Vital: LCP (time to largest paint). Measure with Chrome Lighthouse (F12 → Lighthouse tab)."

**Objective 4 — Review:** Use the 9-point checklist to review your app and identify one gap and how to fix it.
- *Example answer:* "My app fails Accessibility (missing form labels). Fix: add \`<label htmlFor="email">\` to the input field and aria attributes. Verified with Lighthouse that the score improved."

### Scenario-based judgment checks:

*For each scenario, explain what's the problem and what to do.*

- **(a) All your tests pass, but your app crashes in production.** Tests passed but didn't catch the bug.
  - ✅ **Root cause:** Tests only checked the happy path, not edge cases or integration. **Fix:** Add tests for error states (invalid input, network failure), test with real DB (not mocks), test with two accounts.
  - ❌ **Avoid:** Trusting tests alone. Tests catch bugs you think to test for; they don't catch everything.

- **(b) You deployed but users with screen readers can't use your app.** No a11y testing.
  - ✅ **Root cause:** AI generated HTML without labels/alt/semantic structure. **Fix:** Run Lighthouse a11y audit, add labels to forms, add alt text to images, use semantic HTML (\`<button>\` not \`<div>\`).
  - ❌ **Avoid:** Skipping a11y because "most users don't need it." Some do. It's a legal requirement in many places.

- **(c) Your app is slow (Lighthouse: LCP = 5s).** Performance not measured.
  - ✅ **Root cause:** Probably fetching all data client-side. **Fix:** Use server components (don't fetch on client), paginate large lists, size images properly, check Core Web Vitals.
  - ❌ **Avoid:** Hoping it's fast. Measure with Lighthouse. Optimize what's slow.

- **(d) A user from a different team can see another team's invoices.** RLS not tested.
  - ✅ **Critical:** Test with two accounts! User A signs in → sees only User A's data. User B signs in → sees only User B's data. **Fix:** Check RLS policies in Supabase; verify both SELECT and UPDATE policies exist.
  - ❌ **Avoid:** Assuming RLS works without testing. This is a real data breach.

- **(e) You need to add a feature but the code is a mess and you're terrified to change it.** Non-maintainable code.
  - ✅ **Root cause:** Function names are unclear, no tests, inconsistent patterns. **Fix:** Add tests first (safety net for refactoring), rename functions clearly, extract small pieces, document the pattern in CLAUDE.md.
  - ❌ **Avoid:** Shipping unmaintainable code. Technical debt compounds. Harder to ship later.

**Rubric checklist (self-review before submission):**

| Criterion | Check (✅ = pass) |
|-----------|-------------|
| **Unit tests** | At least 1 unit test written, covers normal + edge case, passes |
| **E2E test** | At least 1 E2E test (real browser, real login, real action), passes |
| **Loading state** | Data-driven page shows loading spinner/skeleton while fetching |
| **Empty state** | Page shows friendly "No items yet" message, not blank table |
| **Error state** | Page shows friendly error + retry button, never raw error message |
| **RLS verified** | Enabled on all tables; tested with 2 accounts (A sees only A's data) |
| **Input validation** | Server-side validation on forms (not just browser) |
| **Secrets safe** | \`.env.local\` in \`.gitignore\`; no API keys in code |
| **A11y checked** | Lighthouse a11y audit run; score ≥85; semantic HTML, labels, alt text |
| **Performance checked** | Lighthouse performance audit run; LCP, INP, CLS measured; obvious wins done (images sized, data paginated) |
| **Tests reviewed** | You read your own tests; each one checks what you intended (not just passing) |
| **App deployable** | Deploys without errors; env vars configured; auth URLs set |
| **README exists** | One-page README: what it is, how to run it, how to test it |
| **Checklist completed** | 9-point production-readiness checklist filled out; each item ✅ or ❌ with notes |
| **Understanding** | You can explain every part you're shipping; no "I don't know why this works" |

*Pass mark: 80% and a hardened app with test output, audit screenshots, and completed checklist submitted.*

## Tools & alternatives (this module)

Defaults: **Vitest/Jest** (unit/integration), **Playwright** (E2E), **Lighthouse/axe** (a11y + perf). Alternatives: Cypress for E2E; other assertion libraries. The concepts are universal. AI accelerates all of it — but this is the module where you verify its output most rigorously, because the stakes are real users.

## Key takeaways

- Production-ready = tested, resilient, secure, accessible, performant, and maintainable — a higher bar than "it works."
- Test at three levels; AI writes tests well, but review that they check the right thing (and watch the runner/glob/auth gotchas).
- Every data screen needs loading, empty, and error states.
- Accessibility and performance are the qualities AI skips — prompt for them explicitly and verify with a real audit.
- Self-review against the checklist before shipping — it's the capstone rubric; don't ship what you can't explain.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)`,
      },
    ]
  },
  kids: {
    moduleId: 13,
    moduleName: "Module 12: Building Production-Ready Software",
    totalDuration: 480,
    steps: [
      {
        id: 1,
        title: "Testing",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Testing = checking that your code works.

**Manual testing:** You click buttons, see if they work. ✓ But time-consuming.

**Automated testing:** Write code that tests your code. ✓ Runs automatically. Catches regressions.

**Concrete test example:**

\`\`\`javascript
// lib/addPet.ts
export function addPet(name: string, breed: string) {
  if (!name || !breed) throw new Error("Missing name or breed");
  return { id: Math.random(), name, breed };
}

// lib/__tests__/addPet.test.ts
import { describe, it, expect } from "vitest";
import { addPet } from "../addPet";

describe("addPet", () => {
  // Happy path
  it("adds a pet with name and breed", () => {
    const pet = addPet("Buddy", "Retriever");
    expect(pet.name).toBe("Buddy");
    expect(pet.breed).toBe("Retriever");
  });

  // Edge cases
  it("throws if name is missing", () => {
    expect(() => addPet("", "Retriever")).toThrow();
  });

  it("throws if breed is missing", () => {
    expect(() => addPet("Buddy", "")).toThrow();
  });
});
\`\`\`

Run tests: \`npm run test\` → all pass ✅

Prompt Claude Code: *"Write Vitest tests for the addPet function covering normal cases and edge cases."*

Claude writes them. You review (does each test check what you care about?). Then run them.

---`,
      },
      {
        id: 2,
        title: "Error Handling",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Real apps hit failures. Handle it gracefully so the app doesn't crash.

**Bad: No error handling (crashes!)**
\`\`\`javascript
async function loadPets() {
  const pets = await supabase.from("pets").select(); // If this fails → app crashes
  return pets;
}
\`\`\`

**Good: Try/catch + friendly message**
\`\`\`javascript
async function loadPets() {
  try {
    const pets = await supabase.from("pets").select();
    if (!pets.length) return { message: "No pets yet! Add your first one." };
    return pets;
  } catch (error) {
    return { error: "Couldn't load pets. Try again later." };
  }
}
\`\`\`

**Three states your pages need:**

1. **Loading** — "Loading your pets... ⏳" (spinner while fetching)
2. **Empty** — "No pets yet 🐾 Add your first pet!" (when list is empty)
3. **Error** — "Oops! Something broke. Try again." (when fetch fails)

In React:
\`\`\`javascript
export function PetsPage() {
  const [pets, setPets] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPets()
      .then(data => setPets(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div>❌ {error} — <button>Try again</button></div>;
  if (pets === null) return <div>⏳ Loading...</div>;
  if (pets.length === 0) return <div>🐾 No pets yet!</div>;

  return <div>{pets.map(p => <PetCard pet={p} key={p.id} />)}</div>;
}
\`\`\`

---`,
      },
      {
        id: 3,
        title: "Performance & Accessibility",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `**Performance = speed.** Slow apps = users leave.

**Check with Lighthouse:**
1. Open your app in Chrome
2. Press F12 (open DevTools)
3. Go to "Lighthouse" tab
4. Click "Analyze page load"
5. Look at LCP (time to see content), INP (responsiveness), CLS (layout shifts)

**Quick wins:**
- Don't load ALL pets at once (paginate)
- Compress images (make file sizes smaller)
- Use server components (load data on server, not in browser)

**Accessibility = everyone can use it.** That means:
- Keyboard nav (Tab works everywhere)
- Labels on forms (screen readers can read them)
- Good contrast (text dark enough to read)
- Alt text on images (describe what you see)

Prompt Claude Code: *"Make this page accessible: add form labels, use semantic HTML, check contrast, add alt text to images."*

---`,
      },
      {
        id: 4,
        title: "Security",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Keep user data safe! This is serious.

**Rule 1: Never put secrets in code**
\`\`\`javascript
// ❌ BAD: API key in code!
const SUPABASE_KEY = "eyJhbGciOi...";

// ✅ GOOD: Load from env
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
\`\`\`

**Rule 2: Validate user input on server**
\`\`\`javascript
// ❌ BAD: Trust user input
function savePet(name: string) {
  db.pets.insert({ name }); // What if name is 10,000 characters?
}

// ✅ GOOD: Validate first
function savePet(name: string) {
  if (!name || name.length > 100) throw new Error("Invalid");
  db.pets.insert({ name });
}
\`\`\`

**Rule 3: RLS (Row Level Security) = each user sees only their data**
\`\`\`sql
-- ✅ SECURE: User A sees only User A's pets
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users see own pets" ON pets
  FOR SELECT USING (auth.uid() = user_id);
\`\`\`

Test this by:
1. Log in as User A → see their pets
2. Log out
3. Log in as User B → see ONLY their pets (not User A's!)

**Rule 4: Use HTTPS** — Vercel does this automatically. ✓

## Activity: Make Your Pet Tracker Production-Ready 🏭

Follow these steps:

### Step 1: Write a test (10 min)
1. Pick a simple function (e.g., \`addPet\`, \`deletePet\`, \`validateEmail\`)
2. Prompt Claude Code: *"Write Vitest tests for this function. Test the happy path and edge cases."*
3. Review the tests (does each one check what you care about?)
4. Run: \`npm run test\`
5. All tests pass? ✓

### Step 2: Add error handling (10 min)
1. Pick a page that loads data (e.g., \`/pets\`, \`/dashboard\`)
2. Add try/catch around the data fetch
3. Add three states: loading (⏳), empty (🐾), error (❌)
4. Test: slow down your internet (DevTools → Network → slow 3G) to see loading state
5. Test: break the API endpoint to see error state

### Step 3: Run a Lighthouse audit (10 min)
1. Open your pet tracker
2. F12 → Lighthouse tab
3. Click "Analyze page load"
4. Check three things:
   - **Performance:** LCP (time to see content), INP (responsiveness)
   - **Accessibility:** Are form inputs labeled? Is text readable?
   - **Best Practices:** Any security issues?
5. Fix the easiest win (e.g., add missing alt text on an image)

### Step 4: Check security (5 min)
1. **Secrets:** Check \`.env.local\` is in \`.gitignore\`
2. **RLS:** In Supabase, click a table → check RLS is enabled
3. **Test isolation:** Log in as one user → see your pets. Log out → log in as different user → see ONLY their pets
4. **Auth:** Users can't access \`/dashboard\` if they're not logged in

### Step 5: Review your app (10 min)
1. Go through this checklist:
   - [ ] Has tests (unit or E2E)
   - [ ] Has loading state
   - [ ] Has empty state  
   - [ ] Has error state
   - [ ] Lighthouse performance ≥70
   - [ ] Lighthouse accessibility ≥85
   - [ ] RLS enabled on all tables
   - [ ] No secrets in code
   - [ ] Can explain every part

2. For each item: ✅ (yes) or ❌ (needs work)

### Deliverable:
- Screenshot of passing tests (terminal output)
- Screenshots of loading/empty/error states
- Screenshot of Lighthouse audit scores
- Completed checklist with ✅ or ❌ for each item

## Quiz Questions (Preview)

Here are your three quiz questions. Study these!

**Q12-k1:** Production-ready code means tested, resilient, secure, maintainable, and:
- (a) Colorful
- (b) **Accessible (everyone can use it) & fast** ✓
- (c) Cheap
- (d) Quick to type

*Why:* Production code isn't just for you—it's for real users. Everyone means people using keyboards or screen readers, people on slow internet, people using different devices. Plus it has to be fast or users leave!

**Q12-k2:** When AI writes tests, what should you do?
- (a) Run them blindly (it knows what it's doing)
- (b) **Review them — they can pass while checking the wrong thing** ✓
- (c) Never run them
- (d) Delete them

*Why:* A test can be WRONG but still pass! Maybe it checks the wrong thing, or it's too easy to pass. Always review tests to make sure they actually test what you care about.

**Q12-k3:** What does AI usually skip unless you ask?
- (a) Variable names
- (b) **Accessibility & performance** ✓
- (c) Syntax
- (d) Spacing

*Why:* AI is great at logic. But it forgets to ask: "Can this work with a keyboard?" "Is it fast?" "Can someone with bad vision read it?" You have to ask for these things, then check!

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **Why test your code?**
   - *Example answer:* "Tests check that your code works. When you change something later, tests catch if you broke it. It's like a safety net—you can refactor confidently."

2. **Write a try/catch block for saving a pet.**
   - *Example answer:*
   \`\`\`javascript
   try {
     const result = await savePet(petData);
     console.log("Pet saved!");
   } catch (error) {
     console.log("Oops! Couldn't save. Try again.");
   }
   \`\`\`

3. **What's HTTPS and why does it matter?**
   - *Example answer:* "HTTPS encrypts data between your browser and the server so hackers can't see it. It's like sending a letter in a locked box instead of a postcard. Vercel uses HTTPS automatically."

### Scenario-based judgment checks:

*For each scenario, explain what went wrong.*

- **(a) Your test passes but your app still crashes in production.** Tests aren't catching everything.
  - ✅ **Root cause:** You only tested the happy path (when everything works). **Fix:** Test edge cases (empty input, network failure, missing data).
  - ❌ **Avoid:** Only testing what you think will work.

- **(b) Your app works on your computer but crashes when your friend visits.** Your friend has different browser/internet.
  - ✅ **Root cause:** You only tested on one device/network. **Fix:** Test on slow internet (DevTools → Network → Slow 3G), test on phone, ask friends to test.
  - ❌ **Avoid:** Assuming "if it works for me, it works for everyone."

- **(c) Your page shows a blank screen while loading. No spinner, no message.** Bad loading state.
  - ✅ **Fix:** Add a loading message or spinner while fetching data. Users think it's broken if there's nothing to see.
  - ❌ **Avoid:** Blank screens. Always show what's happening!

- **(d) Your app is slow (takes 5 seconds to load). Users are leaving.** Performance not checked.
  - ✅ **Root cause:** Probably loading too much data at once. **Fix:** Use Lighthouse (F12 → Lighthouse) to find what's slow. Paginate data, compress images.
  - ❌ **Avoid:** Shipping slow code. Speed matters!

- **(e) You see a secret API key in your git history.** Secrets committed to repo.
  - ✅ **Critical:** Rotate that key immediately (it's compromised). **Fix:** Add \`.env.local\` to \`.gitignore\` so it never gets committed.
  - ❌ **Avoid:** Leaving secrets in the repo. This is a real security issue!

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | Tests written: at least 1 unit test, covers happy path + edge case |
| ✅ | Tests pass: \`npm run test\` shows green checkmarks |
| ✅ | Loading state: page shows spinner/message while fetching |
| ✅ | Empty state: page shows friendly message when no data ("No pets yet!") |
| ✅ | Error state: page shows friendly error + retry button, not crash |
| ✅ | Lighthouse performance: ≥70 score (check LCP, INP, CLS) |
| ✅ | Lighthouse accessibility: ≥85 score (labels, contrast, alt text) |
| ✅ | RLS enabled: on all tables, tested with 2 accounts |
| ✅ | Secrets safe: \`.env.local\` in \`.gitignore\`, no keys in code |
| ✅ | Auth working: can't access protected pages without login |

*Pass mark: 80% and a production-ready app with tests + audit screenshot submitted.*

## Key Takeaways

- Tests catch bugs before users do 🧪
- Error handling = graceful failures
- Performance matters (users leave if it's slow)
- Security = user trust
- Production code is rock-solid

**Next:** Module 13 — Automating Your Dev Pipeline!`,
      },
    ]
  },
};

export const module13Steps: Record<Version, ModuleStepSequence> = {
  adult: {
    moduleId: 14,
    moduleName: "Module 13: Automating Your Dev Pipeline with Claude Code",
    totalDuration: 490,
    steps: [
      {
        id: 1,
        title: "The extension mental model",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Delivers Objective 4 — and prevents the #1 confusion here. Five ways to extend Claude Code, each for a different job:

| Extension | What it's for | Use when… |
| --- | --- | --- |
| [**CLAUDE.md**](http://CLAUDE.md) | Always-on project rules/context | A rule applies to almost every task ("use conventional commits") |
| **Skill** | On-demand procedural know-how, activates by context | A specific workflow only matters sometimes (PR-review checklist) |
| **MCP** | Access to external systems (read + act) | You need to query/fetch/act on GitHub, a DB, Vercel, an API |
| **Subagent** | A specialist with its own context + tool permissions | You need isolation or parallel work (a dedicated reviewer) |
| **Plugin** | A bundle of the above, installable in one command | You want to package and share a whole setup |

**One-line test:** rules → [CLAUDE.md](http://CLAUDE.md); how-to → skill; access/actions → MCP; isolated specialist → subagent; share-the-bundle → plugin. Most real setups use several. (Hooks, in 13.7, automate the session.)

> **Cross-tool note:** \`CLAUDE.md\` is Claude Code's project-instructions file; **\`AGENTS.md\`** is the vendor-neutral equivalent many tools (and create-next-app) now use. Working across tools, keep an \`AGENTS.md\` as the shared source and let tool-specific files point to it.
> 

---`,
      },
      {
        id: 2,
        title: "MCP setup: give Claude Code hands",
        type: "lesson",
        duration: 75,
        difficulty: "easy",
        xpReward: 50,
        content: `Delivers Objective 1 — the core of "control everything." MCP servers let Claude Code *act* on external systems. Add servers via the CLI (or a project \`.mcp.json\` so the team shares them):

\`\`\`bash
# Supabase (schema, queries, auth) — scoped access token
claude mcp add supabase -- npx -y @supabase/mcp-server-supabase@latest --project-ref=YOUR_REF
# GitHub (issues, PRs, repo actions)
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
# Vercel (deploys, build status, envs, domains)
claude mcp add --transport http vercel https://mcp.vercel.com
# Notion (your specs, feature checklists, docs — read + write)
claude mcp add --transport http --scope user notion https://mcp.notion.com/mcp
\`\`\`

Confirm with \`claude mcp list\`.

**Notion as your project's source of truth:** after connecting Notion (run \`/mcp\` for the OAuth flow, then share the pages you want Claude to access), Claude Code can **read a feature checklist, tick items off as it ships them, and write specs/decisions back** — so your plan (Module 3) and your automation live in one place. Great for a solo builder keeping a living TODO the agent actually maintains.

**[SCREENSHOT PLACEHOLDER: MCP List Output]**

Terminal showing: \`claude mcp list\` with three connected servers: supabase (schema access), github (PR/issues), vercel (deploys). Proof: Claude Code can act on all systems.

**MCP vs. CLI — both matter:** MCP for interactive read/act (inspect a schema, check a deploy, comment on a PR); the matching **CLIs** (\`gh\`, \`supabase\`, \`vercel\`) for versioned, scripted operations, which Claude Code runs via its shell. Rule: **MCP for current-state, CLI for migrations/history.** Teach both; they're complementary.

> **Build-verified fallback (important):** MCP OAuth can fail for a given provider — in the reference build the Supabase MCP returned "Unrecognized client_id" and we fell back to the CLI. Teach the **CLI + personal-access-token** path (\`supabase login --token\`, \`gh auth login\`, a Vercel token) as the reliable default; treat MCP OAuth as the convenience when it works.
> 

> **Security first (Module 12):** give MCP servers scoped, least-privilege tokens, start read-only, and never paste tokens into the repo — use environment variables.
> 

---`,
      },
      {
        id: 3,
        title: "Skills: reusable know-how (incl. from GitHub)",
        type: "lesson",
        duration: 50,
        difficulty: "easy",
        xpReward: 50,
        content: `Begins Objective 2. A **skill** is a folder with a \`SKILL.md\` describing a task Claude should know; it loads automatically when context matches.

**Concrete skill example:**

\`\`\`
.claude/skills/ship-feature/SKILL.md
name: ship-feature
description: Standard workflow to ship a feature safely
## Workflow: Ship a Feature

Use this workflow when shipping a new feature or fix. It ensures testing and good history.

1. **Create a branch:** \`git checkout -b <feature-name>\` (use kebab-case, e.g., \`add-invoice-filter\`)
2. **Make changes** and commit incrementally with conventional messages:
   - \`feat: add invoice status filter\`
   - \`fix: resolve RLS policy for clients table\`
3. **Run tests:** \`npm run test && npm run test:e2e\` — do NOT proceed if tests fail
4. **Open a PR:** use \`gh pr create\` with a summary linking to any issue
5. **Wait for review:** if the \`reviewer\` subagent finds issues, fix them; re-run tests; push
6. **Merge:** \`gh pr merge --squash\` (clean history)
7. **Verify deploy:** wait for Vercel to deploy, spot-check the live site

### When NOT to use this:
- Emergency hotfixes: follow this but notify #oncall
- Schema changes: add a migration step before step 1
\`\`\`

**Installing skills from GitHub:** skills are portable, shared as repos. Install via a skills CLI or plugin marketplace — e.g. \`npx skills add owner/repo\` — to adopt vetted workflows without writing them. 

**Skill vs. [CLAUDE.md](http://CLAUDE.md):** applies to nearly every task → [CLAUDE.md](http://CLAUDE.md); occasional workflow → skill.

**[SCREENSHOT PLACEHOLDER: Skill Install]**

Left: \`.claude/skills/ship-feature/SKILL.md\` file open with detailed workflow steps. Right: Terminal showing \`npx skills add owner/repo\` and skill loaded. Proof: skills automate known workflows.

---`,
      },
      {
        id: 4,
        title: "Subagents: isolated specialists",
        type: "lesson",
        duration: 40,
        difficulty: "easy",
        xpReward: 50,
        content: `Continues Objective 2. A **subagent** is a separate Claude session with its own context and tool permissions, for a focused job — to keep heavy work from polluting your main context and to run specialists in parallel.

**Concrete subagent example:**

\`\`\`
.claude/agents/reviewer.md
name: reviewer
description: Reviews code diffs for bugs, security, and style violations. Read-only, strict.
tools: Read, Grep, Glob
effort: high
You are a strict security and code-quality reviewer. Your job: examine a code diff
and report issues by severity (HIGH/MEDIUM/LOW) with file:line references.

**Always check for:**
- Security: RLS on tables, validation on inputs, secrets in code, SQL injection risk
- Logic: off-by-one errors, null checks, race conditions
- Style: naming clarity, function size, type safety

**Format your report as:**
\`\`\`
HIGH: [filename:line] SQL injection risk in query construction
MEDIUM: [filename:line] Missing null check on user_id
\`\`\`

**Do not:**
- Suggest trivial style changes (semicolons, spacing)
- Modify any files (read-only)
- Approve broken code even if it's "clever"
\`\`\`

Claude Code can hand a finished change to \`reviewer\` before you merge — the capstone review gate, automated. Note the **least-privilege** \`tools:\` list — the reviewer can't edit, only report.

**Invoking a subagent in the pipeline:**

\`\`\`typescript
// When you're ready to merge, but want a final check:
const reviewResult = await subagent("reviewer", {
  diff: gitDiff,
  context: "Adding new invoice endpoint with RLS policies"
});

// If HIGH issues, ask Claude to fix them; if only MEDIUM/LOW, you can approve
if (reviewResult.includes("HIGH:")) {
  // Loop back, fix issues, re-run
} else {
  // Ready to merge
}
\`\`\`

---`,
      },
      {
        id: 5,
        title: "Plugins: bundle and share",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Completes Objective 2. A **plugin** packages skills + MCP + subagents + commands + hooks into one installable unit.

\`\`\`bash
/plugin marketplace add anthropics/claude-plugins-official
/plugin install <plugin-name>
\`\`\`

You can also *author* a plugin (a repo with a \`.claude-plugin/marketplace.json\` manifest) to standardize your team's setup — everyone installs one plugin and gets the same skills, subagents, and MCP config. The endgame: your automated pipeline, packaged.

*[SCREENSHOT: \`/plugin install\` adding a plugin.]*

---`,
      },
      {
        id: 6,
        title: "The automated pipeline, end to end",
        type: "lesson",
        duration: 90,
        difficulty: "easy",
        xpReward: 50,
        content: `Delivers Objective 3 — the payoff. Have Claude Code take a feature from idea to deployed, with you approving the risky steps.

**Worked example — "Add a \`paid_at\` timestamp to invoices and ship it":**

1. **Plan** (Module 5 plan mode) — Claude proposes migration, code change, tests, PR, deploy.
2. **Migrate** — Claude generates a Supabase migration via the CLI (versioned); you **approve** applying it. Inspect via the Supabase MCP.
3. **Code + test** — updates the app; a **hook** runs the tests (13.7).
4. **Commit + PR** — conventional commit, PR via GitHub MCP / \`gh\`; the \`reviewer\` subagent checks the diff.
5. **Deploy** — merge triggers the Vercel deploy (Module 10); Claude monitors build status via the Vercel MCP.
6. **Debug** — if it fails, Claude reads Vercel/Supabase logs via MCP and loops — the Module 8 debugging loop, automated.

*[SCREENSHOT: Claude Code opening a PR and reporting a successful deploy from the terminal.]*

One instruction, a full pipeline — but you stayed in control at the migration and merge gates. That balance is the whole skill.

---`,
      },
      {
        id: 7,
        title: "Guardrails: permissions & hooks",
        type: "lesson",
        duration: 40,
        difficulty: "easy",
        xpReward: 50,
        content: `Secures Objective 3. Automation without guardrails is how you drop a production table at 2 a.m.

**Permissions** (\`/permissions\`) — allow/ask/deny list. Auto-allow safe, reversible actions (run tests, read logs); **always require approval** for destructive ones (prod migration, merge to main, delete data, spend money). The Module 11 human-in-the-loop principle, configured.

**Concrete permissions config:**

\`\`\`json
// .claude/settings.json
{
  "permissions": {
    "allow": [
      "Bash(npm run test)",
      "Bash(npm run lint)",
      "Read(*)",
      "Grep(*)",
      "Bash(git status)",
      "Bash(git log *)"
    ],
    "ask": [
      "Bash(git commit *)",
      "Bash(git push *)",
      "Bash(supabase db push)",
      "Bash(gh pr create)",
      "Bash(npm install)",
      "Bash(git rebase *)"
    ],
    "deny": [
      "Bash(git reset --hard)",
      "Bash(rm -rf *)",
      "Bash(supabase db reset)",
      "Bash(npx stripe *)"
    ]
  }
}
\`\`\`

**Hooks** — scripts that run at points in the session. For example, run tests before committing, or block a commit if it contains secrets:

**Concrete hooks config:**

\`\`\`json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(git commit*)",
        "command": "npm run test && npm run lint && ./scripts/check-secrets.sh",
        "failureAction": "block"
      },
      {
        "matcher": "Bash(git push*)",
        "command": "echo 'Pushing to remote. Verify the PR will pass CI.'",
        "failureAction": "warn"
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Bash(supabase db push)",
        "command": "echo 'Migration applied. Verify in Supabase dashboard: https://app.supabase.com/project/YOUR_REF/sql/migrations'",
        "failureAction": "log"
      }
    ]
  }
}
\`\`\`

**The rule:** automate the reversible, gate the irreversible. Everything about security and "you own every line" (Modules 1, 7, 12) applies double when an agent has hands on your infrastructure.

Concretely:
- ✅ **Auto-allow:** reading files, running tests, checking status (reversible)
- ✅ **Ask:** committing, pushing, opening PRs (reversible but important to review)
- ✅ **Deny or ask:** database migrations, merging to main, spending money (irreversible)

## Hands-on activity (~90 min, folded in)

**"Wire up and ship, hands-off (almost)."** Follow these steps to automate the full pipeline:

### Step 1: Connect MCPs (15 min)
1. Connect GitHub: \`claude mcp add --transport http github https://api.githubcopilot.com/mcp/\` (or use \`gh auth login\`)
2. Connect Supabase: \`claude mcp add supabase -- npx -y @supabase/mcp-server-supabase@latest --project-ref=YOUR_REF\`
3. Connect Vercel: \`claude mcp add --transport http vercel https://mcp.vercel.com\`
4. Verify: \`claude mcp list\` → all three show connected ✓

### Step 2: Write a skill (15 min)
1. Create \`.claude/skills/ship-feature/SKILL.md\`
2. Write a step-by-step workflow for shipping a feature (branch → test → commit → PR → merge)
3. Include: what to do, what NOT to do, when to use this skill
4. Test: prompt Claude Code: *"I want to ship a new feature. Walk me through the workflow."* → it should cite your skill

### Step 3: Write a subagent (15 min)
1. Create \`.claude/agents/reviewer.md\`
2. Define a read-only reviewer with \`tools: Read, Grep, Glob\`
3. Instruct it to check for: security issues (RLS, validation, secrets), logic bugs, style
4. Include: format for reporting (HIGH/MEDIUM/LOW with file:line)

### Step 4: Set permissions & hooks (15 min)
1. Create \`.claude/settings.json\`
2. Allow: tests, reading, git status (safe)
3. Ask: commit, push, PR, migration (important)
4. Deny: reset --hard, rm -rf, db reset (destructive)
5. Add hook: Pre-commit runs \`npm test && npm run lint\` (blocks if fail)

### Step 5: Ship a small feature (30 min)
1. Pick a small feature: e.g., "Add \`updated_at\` timestamp to invoices table"
2. Prompt Claude Code: *"Ship this feature end-to-end: migrate schema, update app, test, open PR, merge. Use the skills and reviewer."*
3. Approve at the gated steps (migrations, merge to main)
4. Watch the pipeline run: branch → migrate → code → test → PR → deploy

### Deliverable:
- Screenshots of \`claude mcp list\` (three connected servers)
- Your \`.claude/skills/ship-feature/SKILL.md\` (describe your workflow)
- Your \`.claude/agents/reviewer.md\` (define your reviewer)
- Your \`.claude/settings.json\` (permissions + hooks)
- Screenshot of the merged PR from the pipeline
- Screenshot of the live deploy from Vercel

## Quiz questions (preview)

These are the four questions you'll see on the quiz. Study these to prepare:

**Q13-1:** A pipeline automates all EXCEPT:
- (a) running tests
- (b) deploying
- (c) **understanding the business need** ✓
- (d) linting code

*Why:* Pipelines are for technical automation: test runs, lints, builds, migrations, deploys. Understanding *why* you're building something is a human job — no tool can do that for you.

**Q13-2:** GitHub Actions runs on:
- (a) your laptop
- (b) **GitHub's servers** ✓
- (c) your database
- (d) Vercel

*Why:* GitHub Actions (and CI/CD in general) run on remote infrastructure, triggered by events (push, PR). Your laptop just kicks it off. That's why you can walk away and the build finishes without your machine being on.

**Q13-3:** A pipeline failing before deploy is:
- (a) a disaster
- (b) **good — it prevented pushing broken code** ✓
- (c) slow
- (d) expensive

*Why:* Pipeline failures are *success*. The whole point is to catch bugs before they ship. A failure that stops a broken deploy to production is exactly what you want.

**Q13-4:** You want Claude Code to export GitHub data on every build. You should use:
- (a) a CLAUDE.md instruction
- (b) a skill (reusable, needs testing)
- (c) **an MCP server (connects Claude to GitHub's API)** ✓
- (d) a GitHub Action (different tool entirely)

*Why:* MCPs give Claude Code hands-on access to external systems. CLAUDE.md is for project rules, skills for reusable know-how. MCP is the right tool for "connect to a system's API."

## Knowledge check (mapped to objectives)

### Written checks:

**Objective 1 — Configure:** Show \`claude mcp list\` with all three connected, and explain when you'd use each server's MCP vs. its CLI.
- *Example answer:* "MCP: interactive queries (inspect schema, check current deploy status, read logs). CLI: versioned, scripted operations (migrations, git history, deployments that need to be repeatable). MCP for now, CLI for records."

**Objective 2 — Build/install extensions:** Submit a skill you wrote, explain what a skill installed from GitHub would do, define a subagent, and describe what a plugin bundles.
- *Example answer:* "Skill I wrote: ship-feature workflow (branch → test → commit → PR). Skill from GitHub: team's PR review checklist. Subagent: \`reviewer\` (read-only, checks for security/bugs). Plugin: all of the above + MCP config + permissions, packaged and installable."

**Objective 3 — Orchestrate:** Demonstrate the pipeline producing a merged PR and a deploy. Show: which steps require approval, what hooks ran, and what the reviewer checked.
- *Example answer:* "Pipeline: \`migrate → code → test (auto-allowed) → commit (asked) → PR (asked) → merge (asked) → deploy (monitored)\`. Hooks: pre-commit ran tests (passed). Reviewer: checked for RLS, SQL injection, secrets. Approved merge and deployed."

**Objective 4 — Choose:** For each need, pick the right extension and justify:
- *"Enforce conventional commits across the team"* → **CLAUDE.md** (rule applies to every commit)
- *"Check if a deploy succeeded"* → **MCP** (read-only access to Vercel's current state)
- *"Isolated security audit of a diff"* → **Subagent** (separate context, read-only permissions, parallel)
- *"Share our whole automation setup with a new team member"* → **Plugin** (one install, everything configured)

### Scenario-based judgment checks:

*For each scenario, explain what went wrong and what to do.*

- **(a) Claude Code committed secrets to main without asking.** Permissions were too loose.
  - ✅ **Root cause:** Commit was in "allow" list, no hook scanned for secrets. **Fix:** Move commit to "ask" list; add hook to run \`check-secrets.sh\` before commit.
  - ❌ **Avoid:** Auto-allowing destructive actions. Everything that produces history should ask.

- **(b) You had to manually review every commit because the \`reviewer\` subagent was too slow.** Bottleneck in the pipeline.
  - ✅ **Root cause:** Subagent took 5 min per diff. **Fix:** Run subagent in parallel with human approval, or scope it to HIGH severity only (MEDIUM/LOW can be reviewed later).
  - ❌ **Avoid:** Letting the pipeline slow you down. Automation should save time.

- **(c) The reviewer subagent approved code with an SQL injection bug.** Reviewer failed at its job.
  - ✅ **Root cause:** Subagent wasn't trained on your patterns or the bug was subtle. **Fix:** Update the reviewer prompt to include "check for SQL injection specifically"; add an example of a past bug you want to catch.
  - ❌ **Avoid:** Trusting the reviewer blindly. Periodically audit its findings; improve its prompt.

- **(d) You gated merge-to-main but forgot to gate the migration.** Inconsistent guardrails.
  - ✅ **Root cause:** Migration wasn't in permissions. **Fix:** Add migrations to "ask" list; gate before code changes (schema → app).
  - ❌ **Avoid:** Partial gates. If one is destructible, gate it; don't rely on reviewing later.

- **(e) The MCP failed but the CLI works.** OAuth vs. token fallback.
  - ✅ **Root cause:** Supabase MCP OAuth failed (client_id issue). **Fix:** Fall back to CLI with a personal access token (\`supabase login --token\`). Gate the token in env vars, not in scripts.
  - ❌ **Avoid:** Hardcoding tokens or trusting only MCP. Have a CLI fallback for reliability.

**Rubric checklist (self-review before submission):**

| Criterion | Check (✅ = pass) |
|-----------|-------------|
| **MCP connected** | \`claude mcp list\` shows 3+ servers (GitHub, Supabase, Vercel) |
| **MCP fallback** | You know the CLI equivalent for each MCP (gh, supabase, vercel) |
| **Skill written** | \`.claude/skills/ship-feature/SKILL.md\` describes a workflow with steps |
| **Skill tested** | Claude Code cites your skill when given a task that matches |
| **Subagent defined** | \`.claude/agents/reviewer.md\` exists; read-only; checks security + logic |
| **Subagent invoked** | You can prompt Claude Code to run the reviewer on a diff |
| **Permissions set** | Allow (safe), Ask (important), Deny (destructive) configured |
| **Hooks working** | Pre-commit hook runs tests; they block if fail |
| **Pipeline end-to-end** | Feature shipped: migrate → code → test → PR → merge → deploy (all steps visible) |
| **Gated steps** | You approved only the destructible steps (migration, merge) |
| **PR merged** | GitHub shows PR merged from the pipeline |
| **Deploy live** | Vercel shows deployment successful; live site works |

*Pass mark: 80% and a full pipeline run (MCP list + PR + deploy + config files) submitted.*

## Tools & alternatives (this module)

Portable pattern: **MCP** is the emerging open standard for tool/data access, **CLIs** (\`gh\`, \`supabase\`, \`vercel\`) are the scriptable complement, and **skills/subagents/plugins** are Claude Code's extension model with analogues in other agentic tools. The durable skill — connect systems, automate the reversible, gate the irreversible — transfers to any toolchain.

## Key takeaways

- Five extensions, five jobs: [CLAUDE.md](http://CLAUDE.md) (rules), skills (how-to), MCP (access/actions), subagents (specialists), plugins (bundles).
- MCP gives Claude Code hands on GitHub/Supabase/Vercel; CLIs complement it (and are the reliable fallback when OAuth fails).
- Skills install from GitHub; subagents run isolated specialists; plugins package it all.
- You can automate the full pipeline: migrate → commit → PR → deploy → debug, from one instruction.
- Guardrails are non-negotiable: permissions + hooks. Automate the reversible; gate the irreversible.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)`,
      },
    ]
  },
  kids: {
    moduleId: 14,
    moduleName: "Module 13: Automating Your Dev Pipeline with Claude Code",
    totalDuration: 490,
    steps: [
      {
        id: 1,
        title: "CI/CD Concepts",
        type: "lesson",
        duration: 20,
        difficulty: "easy",
        xpReward: 50,
        content: `**CI/CD = Continuous Integration / Continuous Deployment**

**The flow:**
\`\`\`
You push code to GitHub
  ↓
Tests run automatically
  ↓
If tests pass → Deploy
If tests fail → Stop (don't break production)
  ↓
Live app updates
\`\`\`

**Why it matters:**
- Tests catch bugs before they ship ✓
- No manual deploys (less human error) ✓
- You can ship faster (automation does the work) ✓

---`,
      },
      {
        id: 2,
        title: "GitHub Actions (Continuous Integration)",
        type: "lesson",
        duration: 40,
        difficulty: "easy",
        xpReward: 50,
        content: `GitHub Actions are automated workflows that run when you push.

**Concrete workflow example:**

Create \`.github/workflows/test.yml\`:

\`\`\`yaml
name: Run Tests
on: [push]  # Run on every push

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3        # Download your code
      - uses: actions/setup-node@v3      # Set up Node
      - run: npm install                 # Install packages
      - run: npm run test                 # Run tests
      - run: npm run lint                 # Check code style
\`\`\`

**What happens:**
1. You \`git push\` to GitHub
2. GitHub detects the \`.github/workflows/test.yml\` file
3. Spins up a virtual machine (ubuntu-latest)
4. Runs \`npm install\` → \`npm test\` → \`npm lint\` automatically
5. Shows a ✅ (passed) or ❌ (failed) badge on your PR

**To see it working:**
1. Commit and push this file: \`git add . && git commit -m "Add CI workflow" && git push\`
2. Go to GitHub → Actions tab
3. Watch your workflow run! ⏳

Prompt Claude Code: *"Create a GitHub Actions workflow that runs tests and linting on every push."*

---`,
      },
      {
        id: 3,
        title: "Vercel Auto-Deploy (Continuous Deployment)",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Vercel already auto-deploys when you push! Here's how:

**The chain:**
\`\`\`
Push to main
  ↓
GitHub Actions runs tests
  ↓
If tests pass → Vercel sees the push
  ↓
Vercel builds your app
  ↓
Live at your URL
\`\`\`

**To prevent broken deploys:**
1. Make sure GitHub Actions passes tests FIRST
2. Then merge to main (which triggers Vercel)
3. Vercel deploys only if your code made it past GitHub Actions

**Monitor the deploy:**
- Go to Vercel dashboard → Deployments tab
- See all your deploys with their status (✅ ready, ❌ failed)
- Click a deploy to see build logs

---`,
      },
      {
        id: 4,
        title: "Monitoring & Safety",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `After your app deploys, monitor it:

**Check:**
- **Is it running?** Vercel shows status (Ready = 🟢)
- **Is it fast?** Vercel shows deployment time (should be <1 min)
- **Are there errors?** Check Supabase dashboard for logs

**Safety guardrail:**
- GitHub Actions tests MUST pass before you can merge to main
- This prevents deploying broken code to production
- No bad deploy = happy users!

## Activity: Set Up Automation 🤖

### Step 1: Create the workflow file (5 min)
1. In your pet tracker, create \`.github/workflows/test.yml\`
2. Copy the workflow code from Lesson 13.2
3. Commit: \`git add .github/workflows/test.yml && git commit -m "Add CI workflow"\`
4. Push: \`git push\`

### Step 2: Watch it run (5 min)
1. Go to GitHub → your repo → Actions tab
2. You should see your workflow running!
3. Wait for it to complete (⏳ → ✅ or ❌)
4. Click the workflow run to see the logs

### Step 3: Test the guardrail (5 min)
1. Make a small change to your code that breaks a test (e.g., change a function name)
2. Push: \`git add . && git commit -m "Test broken code" && git push\`
3. GitHub Actions runs and FAILS (❌)
4. Go to GitHub → PRs → your PR shows "Checks failed"
5. You CAN'T merge until you fix it ✓

### Step 4: Fix it and merge (5 min)
1. Revert the breaking change
2. Push again: \`git add . && git commit -m "Fix: restore function" && git push\`
3. GitHub Actions runs again and PASSES (✅)
4. Now you CAN merge to main
5. Merge on GitHub → Vercel auto-deploys

### Step 5: Watch the deploy (5 min)
1. Go to Vercel → your project → Deployments
2. See the deployment running (building...)
3. When it's done → status = Ready (🟢)
4. Your live app has your latest code!

### Deliverable:
- Screenshot of GitHub Actions workflow passing ✅
- Screenshot of GitHub Actions workflow failing ❌ (showing the test failure)
- Screenshot of Vercel deployment successful (Ready status)
- Your \`.github/workflows/test.yml\` file

## Quiz Questions (Preview)

Here are your three quiz questions. Study these!

**Q13-k1:** What lets Claude Code act on GitHub/Supabase/Vercel?
- (a) CLAUDE.md
- (b) A skill
- (c) **MCP (tool connectors)** ✓
- (d) A comment

*Why:* MCPs are special connectors that let Claude Code talk to external systems (GitHub, Supabase, Vercel, etc.). Think of them as bridges—Claude Code on one side, the service on the other.

**Q13-k2:** A skill is best for:
- (a) Storing secrets
- (b) **Procedural know-how that kicks in by context** ✓
- (c) Hosting
- (d) Database queries

*Why:* Skills are step-by-step instructions for how to do things. When Claude Code sees you need those steps, it loads the skill automatically. Like having a recipe book it can pull from!

**Q13-k3:** The safe rule for automation is:
- (a) Automate everything
- (b) **Automate the reversible, protect the irreversible** ✓
- (c) Never automate
- (d) Skip permissions

*Why:* Automate things you can undo (run tests, format code, build). Gate things you can't (deploying to production, deleting data, spending money). You always review the dangerous stuff before it happens.

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **What's CI/CD? Explain in your own words.**
   - *Example answer:* "CI = continuous integration: tests run automatically when you push. CD = continuous deployment: if tests pass, it deploys automatically. So: push → test (auto) → deploy (auto). No manual work!"

2. **What happens when you push code with GitHub Actions set up?**
   - *Example answer:* "GitHub Actions sees the push, starts the workflow, installs packages, runs tests and linting. If everything passes ✅, I can merge to main. If it fails ❌, I fix it and push again."

3. **Why auto-deploy instead of manual?**
   - *Example answer:* "Manual is slow and error-prone (I might forget to deploy). Automation: faster, consistent, no human mistakes. Plus it's reversible—if something breaks on live, I can roll back."

### Scenario-based judgment checks:

*For each scenario, explain what's happening.*

- **(a) You pushed code, GitHub Actions passed ✅, but Vercel deployment failed ❌.** Tests passed but production broke.
  - ✅ **Root cause:** Tests didn't catch the deployment issue (e.g., env vars missing on Vercel). **Fix:** Check Vercel build logs; add tests for deployment (e.g., check env vars exist).
  - ❌ **Avoid:** Thinking tests are perfect. They catch logic bugs, not all deployment issues.

- **(b) Your workflow tests run, but then you manually deployed anyway.** Didn't trust the automation.
  - ✅ **Safer approach:** Let Vercel deploy automatically when your code hits main. You control this via branch protection (can't merge without green ✅).
  - ❌ **Avoid:** Mixing automated + manual deploys. Pick one and stick with it.

- **(c) You broke a test but the PR still says "Ready to merge."** Failed test not blocking.
  - ✅ **Fix:** Go to GitHub repo Settings → Branches → main → require status checks to pass (GitHub Actions must pass before merge).
  - ❌ **Avoid:** Merging with failed tests. That defeats the whole point of CI.

- **(d) You want to add linting (code style checks) to your workflow.** Expanding CI.
  - ✅ **How:** Add \`- run: npm run lint\` to your \`.github/workflows/test.yml\`. Push. Now linting runs with tests.
  - ✅ **Why:** Catch style issues early, keep code consistent.

- **(e) The workflow takes 10 minutes to run. Too slow.** CI is a bottleneck.
  - ✅ **Fix:** Check what's slow (probably \`npm install\`). Cache node_modules or use a faster CI provider. Optimize tests to run only changed files.
  - ✅ **Why:** Fast feedback loop = better developer experience.

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | \`.github/workflows/test.yml\` created with npm test + lint |
| ✅ | Workflow passes on valid code (green ✅) |
| ✅ | Workflow fails on broken code (red ❌) |
| ✅ | GitHub Actions tab shows workflow history |
| ✅ | Can't merge to main if workflow fails (branch protection) |
| ✅ | Vercel auto-deploys when code merged to main |
| ✅ | Vercel deployment succeeds (status = Ready) |
| ✅ | Can see live app with deployed code |

*Pass mark: 80% and workflow + deploy screenshots submitted.*

## Key Takeaways

- CI/CD = tests + deployment automation ✅
- GitHub Actions run workflows automatically
- Vercel auto-deploys from GitHub
- Automation = fewer mistakes, faster shipping

**Next:** Module 14 — Brownfield Coding!`,
      },
    ]
  },
};

export const module14Steps: Record<Version, ModuleStepSequence> = {
  adult: {
    moduleId: 15,
    moduleName: "Module 14: Working in Existing Codebases (Brownfield)",
    totalDuration: 410,
    steps: [
      {
        id: 1,
        title: "Greenfield vs. brownfield: the real-job reality",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `Greenfield lets you choose everything; brownfield means living with others' choices, conventions, and tech debt. The skills flip — less "generate lots of code," more "understand before you touch, and change the minimum." The danger is different too: in a big codebase, a small change can break something far away.

---`,
      },
      {
        id: 2,
        title: "Orienting in an unknown repo",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 1. A repeatable way to map an unfamiliar codebase, using AI as a guide (Module 8's reading skill at repo scale):

- **Start at the edges:** README, \`package.json\`/dependencies, folder structure, entry points. What kind of app is this?
- **Ask the agent to map it:** "Summarize this repo's architecture, main modules, and how a request flows through it." Then verify against the actual files (the AI can be wrong).
- **Find the seams:** where's the data layer, routing, auth, tests? Trace one real feature end to end.
- **Note the conventions:** naming, folder patterns, state management — you'll match them, not fight them.

**[SCREENSHOT PLACEHOLDER: Repo Architecture Summary]**

Left: File tree of brownfield-practice-repo (app/, lib/, components/, pages/). Right: Claude Code output: "This is a Next.js Reading List app. Main layers: auth (Supabase), data (Postgres), UI (React + Tailwind)..." Proof: AI can map unfamiliar repos.

---`,
      },
      {
        id: 3,
        title: "Reproduce before you fix (debugging someone else's code)",
        type: "lesson",
        duration: 50,
        difficulty: "easy",
        xpReward: 50,
        content: `This strengthens Objectives 2 & 3 and applies Module 8's debugging loop to code you didn't write — where it's harder, because you don't know the *intended* behavior. The rule: **never fix what you can't reproduce.**

1. **Establish a baseline** — run the app and the existing tests. Know what "working" looks like before you touch anything.
2. **Reproduce the reported behavior** — trigger the exact bug from the ticket; confirm you see it.
3. **Trace it with the reading skill (Module 8)** — follow the data to the line that breaks; confirm the *root cause*, not the symptom.
4. **Only then change** — and re-run to confirm the reproduction is gone and the baseline still passes.

**Concrete example (practice repo, BUG-101):** the search box crashes with "Cannot read properties of undefined (reading 'toLowerCase')."

**Step 1 — Establish baseline:**
\`\`\`bash
npm test  # All tests pass ✓
npm run dev  # App loads ✓
\`\`\`

**Step 2 — Reproduce the bug:**
1. Open the app
2. Type a letter in the search box
3. Crash: "Cannot read properties of undefined (reading 'toLowerCase')"

**Step 3 — Trace with Module 8 reading skill:**
\`\`\`typescript
// app/search/page.tsx (where the crash happens)
const filtered = books.filter(b => b.author.toLowerCase().includes(query));
// ↑ CRASH HERE: b.author is undefined for some books

// Check the data: lib/books.ts
const books = [
  { id: 1, title: "Book A", author: "Alice" },  // Has author
  { id: 2, title: "Book B" },                    // ❌ Missing author!
  { id: 3, title: "Book C", author: "Charlie" }
];
\`\`\`

**Step 4 — Identify the root cause:**
- One book has no \`author\` field
- \`.toLowerCase()\` on undefined crashes
- The \`any\` type cast hid the type error (no TypeScript safety)

**Root-cause fix (not: "delete that book" or "remove author search"):**
\`\`\`typescript
// ✅ SAFE: guard the optional field + type it
const filtered = books.filter(b =>
  (b.author?.toLowerCase() ?? "").includes(query)  // Safe optional chaining
);

// Better: fix the type definition
interface Book {
  id: number;
  title: string;
  author?: string;  // Explicit optional
}
\`\`\`

**Step 5 — Verify the fix:**
\`\`\`bash
npm test  # Still pass ✓
# Type the search input again → no crash ✓
# All books (even no-author) appear in results ✓
\`\`\`



---`,
      },
      {
        id: 4,
        title: "Making a scoped change safely",
        type: "lesson",
        duration: 75,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 2. The brownfield golden rule: **change the minimum, match the surroundings, and prove you didn't break anything.**

1. Reproduce current behavior first (Lesson 14.3) and run existing tests.
2. Make the smallest change that achieves the goal; follow the repo's existing patterns (feed them to the AI via context).
3. Keep tests green; add a test for your change.
4. Review the diff narrowly — did anything unrelated change? (AI agents love to "helpfully" refactor; don't let them.)
5. Open a small, focused PR (Module 9) that's easy to review.

> **Instructor note:** Demo an agent that tries to reformat 40 files while making a one-line fix. Teaching learners to *reject* scope creep is half this lesson.
> 

---`,
      },
      {
        id: 5,
        title: "Assessing risk before you change",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `This delivers Objective 3. Before editing, ask: what depends on this code? Search for usages; understand the "blast radius." High-risk zones (auth, data models, shared utilities, payment) demand extra care, tests, and review. Low-risk, leaf-level changes are safe to move faster. This is the Module 1 trust dial applied to *someone else's* code, where a wrong assumption costs more.

---`,
      },
      {
        id: 6,
        title: "Legacy patterns & tech debt",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Real repos have old patterns, inconsistencies, and debt. Teach judgment: match the existing style even if you'd do it differently (consistency > preference), resist rewriting everything, and separate "the change I was asked for" from "cleanup I think it needs" (propose the latter separately). AI makes rewrites tempting and cheap — which is why restraint is the skill.

## Hands-on activity (~60 min, folded in)

**"Join the codebase."** Using the **\`brownfield-practice-repo/\`** and its \`TICKET.md\`, each learner: (1) produces a short architecture summary, (2) reproduces BUG-101 and identifies its root cause and blast radius, (3) fixes the bug and implements FEAT-102 as scoped changes with a test, and (4) opens a focused PR. Deliverable: the PR + a one-paragraph "how I oriented and what I was careful about." (Graded against \`ANSWER-KEY.md\`.)

## Quiz questions (preview)

These are the three questions you'll see on the quiz. Study these to prepare:

**Q14-1:** Brownfield development means:
- (a) building in dirt
- (b) **working on an existing codebase with constraints** ✓
- (c) always starting fresh
- (d) removing features

*Why:* Greenfield = build from scratch, choose everything. Brownfield = inherit an existing system with its history, conventions, and tech debt. Most real jobs are brownfield.

**Q14-2:** When reading unfamiliar code, start with:
- (a) deleting it
- (b) **the README or entry point** ✓
- (c) asking for a rewrite
- (d) guessing

*Why:* The README and entry points tell you what the app does and how it's organized — the architecture. With that foundation, the details make sense. Never read a codebase bottom-up; start at the top.

**Q14-3:** Refactoring during brownfield work:
- (a) always necessary
- (b) **only touch what you need to change** ✓
- (c) delete everything first
- (d) optional if it works

*Why:* Restraint is a skill. Match existing patterns, not your preferences. Resist rewrites; scope creep is how you introduce bugs. Change the minimum needed, add a test, prove it works, ship it.

## Knowledge check (mapped to objectives)

### Written checks:

**Objective 1 — Orient:** Summarize the practice repo's architecture and trace how the search feature flows through it.
- *Example answer:* "Next.js app with React components + TypeScript. Data layer: lib/books.ts. UI: app/search/page.tsx displays books and filters by search query. Auth: optional (Supabase). Flow: user types → filter() runs on books array → display results."

**Objective 2 — Scoped change:** Show a small, focused PR fixing BUG-101 (with a test) and adding FEAT-102, with no unrelated reformatting.
- *Example answer:* "PR shows only the changed lines (optional chaining guard + type fix). Added a test: \`it('handles missing author gracefully')\`. No reformatting. Diff is tight and reviewable."

**Objective 3 — Assess risk:** For your change, identify what depends on the affected code and rate the risk.
- *Example answer:* "Changing the search filter affects: the search page (direct), book list (if shared), maybe export features. Risk: MEDIUM (search is important but not payment/auth critical). Mitigation: test the change, run full suite, keep the diff small."

### Scenario-based judgment checks:

*For each scenario, explain what's the better approach.*

- **(a) You found tech debt while fixing BUG-101. You refactor it while you're there.** Scope creep.
  - ✅ **Better:** Separate concerns. Fix the bug in one PR (tight, reviewable). Propose cleanup separately with justification.
  - ❌ **Avoid:** Mixing bug fixes and refactors. It's harder to review and easier to introduce regressions.

- **(b) The code uses a pattern you'd never write. You rewrite it to "modern" style.** Preference over consistency.
  - ✅ **Better:** Match the existing pattern. Consistency > personal preference. Write new code in your style; refactor old code only if necessary.
  - ❌ **Avoid:** "Improving" code unnecessarily. This is how you break things.

- **(c) AI offers to fix 10 related issues while making your one-line change.** AI overstepping.
  - ✅ **Better:** Reject the extra changes. Say: "Let's focus on the ticket scope. I'll open separate PRs for the others."
  - ❌ **Avoid:** Accepting helpful rewrites. Scope creep introduces bugs.

- **(d) You're not sure what the code does. You change it anyway.** Guessing.
  - ✅ **Better:** Read it (Module 8). Ask AI to explain it. Trace through with print statements. Understand before you change.
  - ❌ **Avoid:** "It probably doesn't matter." Guessing in brownfield is expensive.

- **(e) Your change works locally but breaks in CI.** Missed a dependency.
  - ✅ **Diagnose:** Check the CI logs. Find what's different (env vars, full test suite, different Node version). Fix it. Re-run locally mimicking CI if possible.
  - ❌ **Avoid:** Shipping "it works on my machine." Always run the full test suite before pushing.

**Rubric checklist (self-review before submission):**

| Criterion | Check (✅ = pass) |
|-----------|-------------|
| **Architecture understood** | Can summarize the repo in 3-4 sentences; traced one feature end-to-end |
| **Bug reproduced** | Can trigger BUG-101 consistently; know the exact error |
| **Root cause identified** | Traced to the line that fails; understand *why* (not just the symptom) |
| **Blast radius assessed** | Listed what depends on the affected code; rated risk (LOW/MEDIUM/HIGH) |
| **Minimal fix applied** | Only changed what's needed; no reformatting or unrelated refactors |
| **Tests still pass** | \`npm test\` green ✅; no regressions |
| **New test added** | One test covering the bug fix or new feature |
| **Type safety checked** | No \`any\` casts; types are explicit |
| **PR is focused** | Diff is tight and reviewable; one feature/fix per PR |
| **Conventions matched** | Naming, folder structure, patterns match the repo's style |

*Pass mark: 80% and a focused, tested PR to the practice repo submitted.*

## Tools & alternatives (this module)

The skill is tool-agnostic. **Claude Code** shines here (repo-wide reading and search from the terminal), **Cursor** for targeted edits. The durable technique — orient → reproduce → assess blast radius → change the minimum → prove it with tests — transfers to any tool, language, or repo. (Instructors can swap the practice repo for a real open-source one once learners are ready.)

## Key takeaways

- Real jobs are brownfield: understand before you touch, and change the minimum.
- Map an unknown repo from the edges in; have AI summarize the architecture, then verify.
- Never fix what you can't reproduce — establish a baseline, reproduce, trace to root cause, then change.
- Assess the blast radius before editing; high-risk zones (auth/data/shared) demand extra care.
- Match existing conventions over preference; resist AI-tempting rewrites and scope creep; ship small, tested, focused PRs.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)`,
      },
    ]
  },
  kids: {
    moduleId: 15,
    moduleName: "Module 14: Working in Existing Codebases (Brownfield)",
    totalDuration: 410,
    steps: [
      {
        id: 1,
        title: "Understanding Someone Else's Code",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `Reading existing code is hard. Start by:

1. **Find the entry point** — what runs first? (Usually \`index.tsx\` or \`app.tsx\`)
2. **Trace the flow** — follow the data/logic through the app
3. **Identify patterns** — how does this codebase organize things?
4. **Ask the AI** — *"Explain the architecture of this codebase. Where would I add a new feature?"*

AI reads the whole project and tells you how it's organized.

---`,
      },
      {
        id: 2,
        title: "Making Changes Safely",
        type: "lesson",
        duration: 60,
        difficulty: "easy",
        xpReward: 50,
        content: `**Golden rule:** Make small changes, test after each one.

1. Create a branch: \`git branch my-feature\`
2. Make one change
3. Test it
4. Commit: \`git commit -m "Added new feature"\`
5. Push: \`git push\`

Don't change ten things and hope.

---`,
      },
      {
        id: 3,
        title: "Using AI to Help",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `AI is amazing at understanding existing code:

*"I need to add a new feature (export pets as CSV). Here's my codebase. Where would I add this? What files need to change? What data does it need?"*

Claude Code reads the whole project and tells you:
- Exactly which files to modify
- What new code to add
- How it integrates with existing code

Then it helps you add the feature without breaking anything.

## Activity: Add a Feature to Existing Code 🏗️

### Step 1: Pick a feature (2 min)
Choose from your pet tracker:
- Export pets as CSV
- Search by pet name  
- Sort by breed
- Add age calculator

### Step 2: Understand the codebase (10 min)
Prompt Claude Code: *"Explain the architecture of my pet tracker. Where would I add an export-to-CSV feature?"*

Claude reads the whole project and tells you what files change.

### Step 3: Add the feature (15 min)
1. Create a branch: \`git checkout -b add-export-csv\`
2. Ask Claude Code: *"Add export-to-CSV button to my pet list."*
3. Test it: button appears, click it, file downloads ✓

### Step 4: Test and push (8 min)
1. \`npm test\` (still passes ✓)
2. \`git commit -m "Add pet export to CSV" && git push\`
3. Open a PR on GitHub

### Deliverable:
- Screenshot of the feature working
- GitHub PR screenshot  
- Commit message shown

## Quiz Questions (Preview)

Here are your three quiz questions. Study these!

**Q14-k1:** The brownfield golden rule is:
- (a) Rewrite it all your way
- (b) **Change minimum, match the code around it, prove you didn't break anything** ✓
- (c) Never use tests
- (d) Don't read the code

*Why:* Someone built this code before you. Respect their work. Change only what you need to, write it the way they did, and test that you didn't break anything. Small, careful changes beat big rewrites.

**Q14-k2:** Before changing existing code, assess:
- (a) Its color scheme
- (b) **The blast radius (what depends on it)** ✓
- (c) File size only
- (d) Who wrote it

*Why:* One line can break something far away if other code depends on it. Ask: "If I change this, what breaks?" Know the risk before you act.

**Q14-k3:** If an AI tries to reformat 40 files for a one-line fix, you should:
- (a) Accept it
- (b) **Reject scope creep — keep the change tiny** ✓
- (c) Delete the repo
- (d) Disable tests

*Why:* AI loves to "helpfully" refactor everything. But that's scope creep! A one-line bug fix should touch one file, maybe two. Reject the extra changes. Scope creep = more chances to break stuff.

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **How do you start understanding an existing codebase?**
   - *Example answer:* "Find the entry point (App.tsx), trace data flow, ask AI to summarize architecture, follow one feature end-to-end."

2. **Why work on a branch when adding features?**
   - *Example answer:* "Branches keep main safe. You can test, commit multiple times, fix mistakes. If something breaks, main is still working."

3. **How can AI help you understand foreign code?**
   - *Example answer:* "Ask it to explain architecture, find where to add features, show data flow, identify patterns. AI reads faster than you."

### Scenario checks:

- **(a) AI wants to reformat the whole codebase while adding your feature.**
  - ✅ **Say:** "Focus on the feature. Refactoring is a separate PR."

- **(b) You changed a function, and a feature in another file broke.**
  - ✅ **Check:** Who uses this function? Is there a test? Fix carefully.
  - ❌ **Avoid:** Shipping without testing.

- **(c) You don't understand the existing code.**
  - ✅ **Do:** Read it, ask AI, add comments, trace it. Understand before changing.

**Rubric:**
| ✅ | Check |
|----|---|
| ✅ | Asked AI or read docs to understand codebase |
| ✅ | Worked on a branch |
| ✅ | Tested locally |
| ✅ | Tests pass (no broken code) |
| ✅ | PR is focused (only your changes) |
| ✅ | Feature works |

*Pass mark: 80% and a working feature PR submitted.*

## Key Takeaways

- Find the entry point and trace the flow 🔍
- Make small changes, test after each
- Use branches for safety
- AI can understand and modify existing code
- "Brownfield" = real-world coding

**Next:** Module 15 — The Tooling Landscape!`,
      },
    ]
  },
};

export const module15Steps: Record<Version, ModuleStepSequence> = {
  adult: {
    moduleId: 16,
    moduleName: "Module 15: The Tooling Landscape & How to Choose",
    totalDuration: 270,
    steps: [
      {
        id: 1,
        title: "Why tools change and skills don't",
        type: "lesson",
        duration: 20,
        difficulty: "easy",
        xpReward: 50,
        content: `Return to the course's founding idea (Module 1): tools are *vehicles*; the durable skills are prompting, planning, building, designing, debugging, securing, shipping, and working in real codebases. The AI tooling landscape in 2026 changes monthly — tools merge, rebrand, get acquired, shift pricing. Tie your competence to skills, not tools, and you can adopt whatever's best at any moment. So this module isn't "memorize the options" — it's "learn to evaluate options."

---`,
      },
      {
        id: 2,
        title: "The landscape, layer by layer",
        type: "lesson",
        duration: 50,
        difficulty: "easy",
        xpReward: 50,
        content: `Supports Objective 1 — the consolidated version of the per-module callouts:

| Layer | Course default | Notable alternatives |
| --- | --- | --- |
| In-editor AI | Cursor | VS Code + Copilot, Zed, Windsurf, JetBrains AI |
| Agentic / terminal | Claude Code | Codex CLI, Copilot agent mode, Cline, [Continue.dev](http://Continue.dev) |
| App framework | Next.js | Remix, Astro, SvelteKit, React + Vite |
| UI / components | shadcn/ui + Tailwind | Tailwind UI, DaisyUI, Radix, MUI, Chakra |
| Backend / DB / auth | Supabase | Firebase, Postgres + Prisma, Neon, PlanetScale, Appwrite |
| Version control host | GitHub | GitLab, Bitbucket |
| Deployment | Vercel | Netlify, Railway, Render, Cloudflare, AWS |
| Agent orchestration | Direct tool-use / MCP | Graph/workflow frameworks (adopt when complex) |
| Testing | Vitest/Jest + Playwright | Cypress, other runners |

For a beginner or a fast MVP, the course default stack is genuinely strong at every layer — alternatives matter when a project's specific needs pull you elsewhere.

---`,
      },
      {
        id: 3,
        title: "How to evaluate a tool",
        type: "lesson",
        duration: 40,
        difficulty: "easy",
        xpReward: 50,
        content: `Delivers Objective 1. A repeatable set of criteria for any option:

- **Fit for the task** — does it match what this project needs? (Biggest factor.)
- **Cost** — pricing model and how it scales (Cursor's credits; Supabase's free tier; LLM usage costs).
- **Lock-in** — how hard is it to leave? (Real Postgres exports easily; some platforms trap data.)
- **Performance** — speed/scalability for your case.
- **Ecosystem & community** — docs, tutorials, integrations, hiring pool (why Next.js/GitHub are safe defaults).
- **Learning curve** — how fast can you (or your team) be productive?

Meta-lesson: there's no "best" tool, only the best *fit* for a project and team — weighted differently for a weekend prototype vs. a funded startup.

---`,
      },
      {
        id: 4,
        title: "Choosing a stack for a scenario",
        type: "lesson",
        duration: 40,
        difficulty: "easy",
        xpReward: 50,
        content: `Delivers Objective 2 — the course's top skill. Work scenarios where the default may or may not be the answer:

- **Realtime / mobile-first app** → Firebase's realtime + mobile SDKs may beat Supabase; weigh NoSQL/lock-in.
- **SQL-heavy internal tool, team already on VS Code** → keep Postgres; VS Code + Copilot over Cursor to match the team.
- **Python API with a long-running worker** → Railway/Render over Vercel.
- **Cost-sensitive solo MVP** → the default stack is close to ideal; consider free/open-source (Cline) to cut cost.
- **Enterprise with strict compliance** → more control (self-managed Postgres, AWS/Cloudflare).

For each, state a recommendation *and the reasons*, referencing the 15.3 criteria. "It depends" is only good followed by "...on these factors, so I'd choose X."

## Hands-on activity (~40 min, folded in)

**"Stack pitch."** Each learner gets (or picks) a project brief different from the invoice tracker — a booking app, a realtime dashboard, a mobile-first social app. They choose a full stack layer by layer and write a one-paragraph justification per layer using the 15.3 criteria, noting where and why they deviate from the default. Direct practice for the capstone's "defend your decisions" criterion.

## Quiz questions (preview)

These are the three questions you'll see on the quiz. Study these to prepare:

**Q15-1:** The purpose of learning the tooling landscape is:
- (a) to memorize every tool
- (b) **to understand which tool solves which problem** ✓
- (c) to pick one and ignore others
- (d) tools don't matter

*Why:* You're not memorizing a static list — you're learning to think. "Which tool fits this project?" beats "know all tools." The landscape changes; judgment transfers.

**Q15-2:** Which is NOT a reason to pick a tool?
- (a) it solves your problem
- (b) your team knows it
- (c) **everyone else uses it** ✓
- (d) it's free

*Why:* Popularity is not a reason. Real reasons: it solves your actual problem, your team can use it, the cost is right, and you can adopt it fast. "Everyone uses it" is herd mentality, not strategy.

**Q15-3:** After this course, the best way to stay current is:
- (a) stop learning
- (b) **follow release notes and communities for tools you use** ✓
- (c) memorize docs
- (d) use only old tools

*Why:* You'll use a tool stack; stay tuned to its evolution (GitHub, Vercel, Supabase news, their communities). You can't stay current on *everything* — that's exhausting and pointless. Stay current on what you ship with.

## Knowledge check (mapped to objectives)

### Written checks:

**Objective 1 — Analyze:** Compare Supabase vs. Firebase across cost, lock-in, performance, and ecosystem.
- *Example answer:* "Supabase: Postgres-based, lower cost at scale, easy to export (low lock-in). Firebase: NoSQL, realtime-first, vendor lock-in higher. Choose Supabase for SQL-heavy apps, Firebase for mobile + realtime."

**Objective 2 — Recommend & defend:** Given a realtime collaboration app brief, recommend a full stack with justifications and one deviation from default.
- *Example answer:* 
  - In-editor: Cursor (default, good)
  - Framework: **SvelteKit** (not Next.js — better reactivity for realtime, lower JS overhead)
  - Database: **Firebase** (not Supabase — realtime is built-in, essential for collaboration)
  - Deployment: Vercel (default — works with SvelteKit)
  - Justification: Realtime is the constraint; Firebase + SvelteKit fit better than default stack.

### Scenario-based judgment checks:

- **(a) You have Django expertise. Should you use the course stack?**
  - ✅ **Depends:** For a quick MVP, yes (learn Next.js). For production with deep Django needs, your team's expertise wins — use Django + Postgres.

- **(b) Cost is the primary constraint.** Student project, $0 budget.
  - ✅ **Recommend:** VS Code + Copilot (free), Vite + React (free), Firebase free tier (free), GitHub (free), Netlify free (free).

- **(c) Your company already uses AWS and is risk-averse about vendors.**
  - ✅ **Recommend:** AWS EC2 / ECS for the app, RDS for Postgres, Amplify or custom deploy, GitHub (industry standard).

**Rubric:**

| Criterion | Check (✅ = pass) |
|-----------|-------------|
| **Understands trade-offs** | Can name cost/lock-in/performance for ≥2 layers |
| **Evaluates, doesn't memorize** | Reasons through fit for a project, not "best tool" |
| **Defends a recommendation** | Stack choice + 1-2 sentence justification per layer |
| **Acknowledges context** | "It depends on X" + names what X is |
| **One deliberate deviation** | Chose non-default for valid reason |
| **Feasible stack** | Tools actually work together |

*Pass mark: 80% and a defensible stack recommendation with justifications submitted.*

## Tools & alternatives (this module)

This module *is* the tools-and-alternatives capstone — every layer at once. The durable takeaway: you have both a proven default stack and a method for choosing differently when a project demands it.

## Key takeaways

- Tools are vehicles; your skills are the asset — the landscape changes monthly, judgment doesn't.
- Know the main options at each layer, but don't memorize — learn to evaluate.
- Weigh tools on fit, cost, lock-in, performance, ecosystem, and learning curve.
- There's no best tool, only the best fit for a given project and team.
- "It depends" is useful only when you can name what it depends on and then decide.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)`,
      },
    ]
  },
  kids: {
    moduleId: 16,
    moduleName: "Module 15: The Tooling Landscape & How to Choose",
    totalDuration: 270,
    steps: [
      {
        id: 1,
        title: "Our Stack Recap",
        type: "lesson",
        duration: 20,
        difficulty: "easy",
        xpReward: 50,
        content: `You just learned this stack:

| Layer | Tool | Why |
| --- | --- | --- |
| **Frontend** | Next.js + React | Fast, SEO-friendly, full-stack |
| **Backend** | Supabase + Postgres | Database with auth built-in |
| **Styling** | Tailwind CSS | Classes = fast, flexible styling |
| **Version Control** | GitHub | Industry standard |
| **Deploy** | Vercel | Auto-deploy, serverless, fast |
| **Editor** | Cursor + Claude Code | AI-assisted coding |

This stack is production-ready and used by real companies. You can build anything with it.

---`,
      },
      {
        id: 2,
        title: "Other Frontend Frameworks",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `**Next.js (what you learned):**
- Pros: Full-stack, SEO, flexible
- Cons: Lots of features, steeper curve

**React.js (just the frontend):**
- Pros: Lightweight, very popular
- Cons: Need separate backend

**Vue.js:**
- Pros: Easier than React, good docs
- Cons: Smaller community

**Svelte:**
- Pros: Less boilerplate, super fast
- Cons: Smaller ecosystem

**Astro:**
- Pros: Insanely fast for static content
- Cons: Different paradigm

**Bottom line:** Next.js is a great choice for beginners. You learn the others later if needed.

---`,
      },
      {
        id: 3,
        title: "Other Databases",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `**Supabase (what you learned):**
- Pros: Postgres + auth + real-time
- Cons: Can be overkill for small projects

**Firebase (Google):**
- Pros: Real-time, serverless, easy
- Cons: Expensive, less control

**MongoDB:**
- Pros: Flexible, document-based
- Cons: Requires backend code

**SQL vs. NoSQL:**
- **SQL (Postgres):** Tables with rows/columns (what you learned)
- **NoSQL (MongoDB):** Documents (more flexible, less structured)

**Bottom line:** Supabase is perfect for learning. Firebase is easier but pricier.

---`,
      },
      {
        id: 4,
        title: "Other Deployment Platforms",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `**Vercel (what you learned):**
- Pros: Next.js-optimized, easy, free tier
- Cons: Expensive at scale

**Netlify:**
- Pros: Great for static sites, good UX
- Cons: Serverless functions are clunky

**AWS / Google Cloud:**
- Pros: Powerful, cheaper at scale
- Cons: Steep learning curve

**Heroku:**
- Pros: Easy, good for beginners
- Cons: Expensive, slower

**Bottom line:** Vercel is unbeatable for Next.js. Start there.

---`,
      },
      {
        id: 5,
        title: "When to Use Different Stacks",
        type: "lesson",
        duration: 45,
        difficulty: "easy",
        xpReward: 50,
        content: `**Use our stack (Next.js + Supabase + Vercel) for:**
- Web apps (pet tracker, blogging, dashboards)
- First projects
- Rapid prototyping
- Learning

**Use different stacks for:**

- **Mobile apps (iOS/Android):** React Native, Flutter, Swift
- **Static blogs:** Hugo, Jekyll, Astro
- **High-performance:** C++, Rust, Go
- **Real-time games:** Unity, Unreal Engine
- **Machine learning:** Python (TensorFlow, PyTorch)
- **Massive scale:** AWS, Kubernetes, microservices

---`,
      },
      {
        id: 6,
        title: "Evaluation Framework",
        type: "lesson",
        duration: 30,
        difficulty: "easy",
        xpReward: 50,
        content: `When picking a tool, ask:

1. **Community** — Is it popular? Can you find help?
2. **Learning curve** — Can a beginner use it?
3. **Cost** — Free tier? Or expensive?
4. **Speed** — Is it fast enough?
5. **Scalability** — Does it grow with you?
6. **Documentation** — Are there good tutorials?

Our stack scores high on all these for beginners.

## Activity: Evaluate a Different Stack 🛠️

Pick a different stack (e.g., React + Firebase + Netlify) and evaluate it against our stack. What are the tradeoffs? When would you use it?

Submit a comparison (1-2 pages).

## Quiz Questions (Preview)

Here are your three quiz questions. Study these!

**Q15-k1:** Why tools don't define your skill:
- (a) All tools are the same
- (b) **Skills last forever; tools come and go** ✓
- (c) You only need one tool
- (d) Tools never change

*Why:* Tools get replaced, rebrand, get bought, or fade. But the skills—planning, reading code, debugging, testing, securing—those last your whole career. Learn the skills; tools will follow.

**Q15-k2:** A real criterion to evaluate tools:
- (a) Its logo color
- (b) **How trapped you are (can you switch later?)** ✓
- (c) Founder's name
- (d) Release date only

*Why:* "Lock-in" is huge! If you use it and want to switch, can you? Is your data stuck in it forever? A tool that lets you leave is safer than one that traps you.

**Q15-k3:** 'It depends' is a good answer when:
- (a) You stop there
- (b) **You name what it depends on AND decide** ✓
- (c) You pick randomly
- (d) You avoid choosing

*Why:* "It depends" without deciding is lazy. "It depends on whether you need real-time data (use Firebase) or can use a regular DB (use Supabase)—for this project, I'd choose Supabase" is *smart*. Always back it up with a choice.

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **List the tools in our stack and why each one.**
   - *Example answer:* "Next.js (full-stack, fast), Supabase (database + auth), Tailwind (styling), GitHub (version control), Vercel (deployment), Cursor (AI coding)."

2. **Name two alternatives to Next.js and when you'd use them.**
   - *Example answer:* "React (if you want just frontend); Vue (if you want simpler syntax). React is lighter but needs separate backend."

3. **When would you use a different database than Supabase?**
   - *Example answer:* "Firebase if you need realtime collaboration (like Google Docs); MongoDB if your data is really flexible."

4. **What makes a good programming tool?**
   - *Example answer:* "Good community (help when stuck), easy to learn, free or cheap, fast, good docs, and you're not trapped."

### Scenario checks:

- **(a) You need a real-time multiplayer game.**
  - ✅ **Better stack:** Unity (engine) + Firebase (realtime), not Next.js + Supabase.

- **(b) You're building a static blog (no database needed).**
  - ✅ **Better stack:** Astro + Vercel (faster than Next.js for static).

- **(c) You're a complete beginner.**
  - ✅ **Use our stack:** It's simple, well-documented, and complete.

- **(d) Cost is zero (student with no money).**
  - ✅ **Options:** VS Code (free), React (free), Firebase free tier, GitHub free, Netlify free.

- **(e) You need an app for iPhone and Android.**
  - ✅ **Better:** React Native or Flutter (mobile frameworks), not Next.js.

**Rubric:**
| ✅ | Check |
|----|---|
| ✅ | Can name the tools in your stack |
| ✅ | Understand pros/cons of each layer |
| ✅ | Know when to use alternatives |
| ✅ | Can evaluate tools (community, cost, etc.) |
| ✅ | Understand "it depends" means you decide what |

*Pass mark: 80% and a thoughtful tool comparison submitted.*

## Key Takeaways

- Our stack is production-ready and beginner-friendly 🚀
- Lots of tools exist; pick the right one for your project
- Community, docs, cost, and speed all matter
- What you learned transfers to other stacks
- Evaluation framework helps you decide

## Congratulations! 🎉

You've learned:
- How AI works and how to use it
- How to plan, prompt, and code
- Databases, security, testing
- Deployment and automation
- The full-stack development lifecycle

You're ready to build real projects!

**Next:** Capstone Project (Put It All Together!)`,
      },
    ]
  },
};


// Helper to get steps for a module (1-based indexing: modules 1-16)
export function getModuleSteps(
  moduleId: number,
  version: Version
): ModuleStepSequence | null {
  switch (moduleId) {
    case 1: return module0Steps[version];  // Module 1 = Setup & Accounts
    case 2: return module1Steps[version];  // Module 2 = AI Fundamentals
    case 3: return module2Steps[version];  // Module 3 = Prompt Engineering
    case 4: return module3Steps[version];  // Module 4 = JavaScript Intro
    case 5: return module4Steps[version];  // Module 5 = React Basics
    case 6: return module5Steps[version];  // Module 6 = Components & State
    case 7: return module6Steps[version];  // Module 7 = Design & UX
    case 8: return module7Steps[version];  // Module 8 = Databases
    case 9: return module8Steps[version];  // Module 9 = Full Stack
    case 10: return module9Steps[version]; // Module 10 = APIs & Integration
    case 11: return module10Steps[version]; // Module 11 = Deployment
    case 12: return module11Steps[version]; // Module 12 = Security & Auth
    case 13: return module12Steps[version]; // Module 13 = Production Ready
    case 14: return module13Steps[version]; // Module 14 = Testing
    case 15: return module14Steps[version]; // Module 15 = Frameworks
    case 16: return module15Steps[version]; // Module 16 = Future of Coding
    default: return null;
  }
}

// Check if a module has steps (new format) or uses markdown (old format)
export function hasModuleSteps(moduleId: number): boolean {
  return moduleId >= 1 && moduleId <= 16;
}
