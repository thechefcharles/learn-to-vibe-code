import type { Version } from "./VersionContext";

export interface ModuleStep {
  id: number;
  title: string;
  type: "lesson" | "quiz" | "checkpoint" | "exercise";
  duration: number; // minutes
  content: string;
  codeBlock?: {
    language: string;
    code: string;
  };
  tip?: string;
  keyPoint?: string;
}

export interface ModuleStepSequence {
  moduleId: number;
  moduleName: string;
  totalDuration: number; // minutes
  steps: ModuleStep[];
}

// Module 0: Setup & Accounts - Step-based structure
export const module0Steps: Record<Version, ModuleStepSequence> = {
  adult: {
    moduleId: 0,
    moduleName: "Module 0: Setup & Accounts",
    totalDuration: 120,
    steps: [
      {
        id: 0,
        title: "Welcome & Overview",
        type: "lesson",
        duration: 5,
        content: `# Module 0: Setup & Accounts

This module sets up your development environment **once, up front**. Setup friction is where beginners quietly give up.

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
        content: `## The Stack Map

Before you install anything, let's see the full picture. Each tool has a place in the stack:

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
        content: `## What is a Terminal?

A **terminal** (or command line) is a text-based interface to your computer. Instead of clicking buttons, you type commands.

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
        content: `## Install Node.js

Node.js is the runtime that runs JavaScript on your computer (not just in a browser).

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
      },
      {
        id: 4,
        title: "Install Cursor",
        type: "checkpoint",
        duration: 10,
        content: `## Install Cursor

Cursor is your AI code editor. It's built on VS Code, so it'll feel familiar if you've used it before.

### Steps

**Step 1:** Go to [https://cursor.com](https://cursor.com)

**Step 2:** Click "Download" and choose your OS (Mac or Windows)

**Step 3:** Run the installer and follow the prompts

**Step 4:** Open Cursor and sign in (GitHub or email — we'll set up GitHub next)

**Step 5:** You're done! Cursor is ready to use.`,
        keyPoint: "Cursor will be your primary code editor for this course. Spend a moment exploring the welcome screen.",
      },
      {
        id: 5,
        title: "Install Claude Code",
        type: "checkpoint",
        duration: 10,
        content: `## Install Claude Code

Claude Code is the terminal AI agent. You'll use it from the terminal to ask for help with complex tasks.

### Steps

**Step 1:** Go to [https://claude.com/download](https://claude.com/download) and follow the install instructions

**Step 2:** Open a terminal and verify:`,
        codeBlock: {
          language: "bash",
          code: "claude --version",
        },
        content: `You should see a version number (e.g., 0.5.2).

**Step 3:** Sign in for the first time:`,
        keyPoint: "You'll need an API token from your Claude account. Follow the link in the terminal.",
      },
      {
        id: 6,
        title: "Sign Up for GitHub",
        type: "checkpoint",
        duration: 10,
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
        content: `## Sign Up for Supabase

Supabase is your database — where your app stores data (logins, posts, etc.).

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
        content: `## Sign Up for Vercel

Vercel is where you'll deploy your app — makes it live on the internet.

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
        content: `## Free Tiers & Costs

Set expectations now so you're not surprised by a bill later.

### What's Free

| Tool | Free Tier | Cost If You Upgrade |
|------|----------|-------------------|
| Node.js | Always free | N/A |
| GitHub | Unlimited repos | N/A (always free) |
| Supabase | 500MB database | $50+/month (rarely needed) |
| Vercel | Unlimited deployments | Only extra bandwidth |
| Cursor | 2 slow requests/day | $20/month for unlimited |
| Claude Code | Free trial | Pay by token ($5-50/month) |

### You Can Complete This Course Free

All tools have free tiers that cover this course. AI editor usage depends on how much you experiment — most learners stay under $10-20/month.

### Avoid Surprise Bills

1. Use free tiers first — don't upgrade unless you hit limits
2. Check usage dashboards weekly (takes 2 minutes)
3. Set spending alerts if available`,
        keyPoint: "Plan on $0-20/month if you experiment with AI editors. Nothing is required.",
      },
      {
        id: 10,
        title: "Final Verification",
        type: "checkpoint",
        duration: 15,
        content: `## Final Verification

Let's verify everything works with a hello-world check.

### Step 1: Create a folder

Open a terminal and run:`,
        codeBlock: {
          language: "bash",
          code: "mkdir vibe-hello-world\ncd vibe-hello-world",
        },
        content: `### Step 2: Create a simple file

Create a file called \`hello.js\`:`,
        keyPoint: "You just ran your first terminal commands! You can create folders and navigate with the terminal.",
      },
      {
        id: 11,
        title: "Checkpoint: Module Complete",
        type: "quiz",
        duration: 5,
        content: `## You Did It! 🎉

You've completed Module 0. You now have:

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
    moduleId: 0,
    moduleName: "Module 0: Setup & Accounts",
    totalDuration: 120,
    steps: [
      {
        id: 0,
        title: "Welcome to Vibe Code! 🎮",
        type: "lesson",
        duration: 5,
        content: `# Module 0: Setup & Accounts

You're about to level up your coding skills! But first, we need to set up your **development environment** — think of it like getting your character's gear before the game starts.

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
        content: `## The Toolbelt Map

Here's all the tools you'll use, what they do, and when you'll use them:

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
        content: `## Install Node.js

Node.js is the engine that runs JavaScript on your computer (not just in a web browser).

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
        content: `If you see version numbers (like \`v22.12.0\`), you're done! 🎉

**If you see "command not found":** Close the terminal completely and reopen it. Then try again.`,
        keyPoint: "Node.js is like the engine for your car — you need it before anything else works.",
      },
      {
        id: 4,
        title: "Install Cursor 🎨",
        type: "checkpoint",
        duration: 10,
        content: `## Install Cursor

Cursor is your **AI-powered code editor**. It's like VS Code but with AI built in.

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
        content: `## Install Claude Code

Claude Code is your **terminal AI assistant**. Ask it complex tasks, and it builds them for you.

### Follow Along

**1. Go to** [https://claude.com/download](https://claude.com/download)

**2. Follow the install instructions** for your OS

**3. Verify it installed**
Open a terminal and copy-paste:`,
        codeBlock: {
          language: "bash",
          code: "claude --version",
        },
        content: `You should see a version number. If yes, you're done! ✅

**4. Sign in** by running:`,
        keyPoint: "Claude Code is like having an expert developer on call. We'll use it starting in Module 5.",
      },
      {
        id: 6,
        title: "GitHub: Save Your Code 💾",
        type: "checkpoint",
        duration: 10,
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
        content: `## Supabase ([supabase.com](https://supabase.com))

Supabase is your app's database — where all the data lives (user accounts, posts, scores, etc.).

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
        content: `## Vercel ([vercel.com](https://vercel.com))

Vercel is how you put your app on the internet. One button, and boom — everyone can see your app!

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
        content: `## Free Tiers & Costs

Here's the real talk: what's free, and when does it cost money?

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
        content: `## Final Verification

Let's make sure everything actually works with a quick hello-world test.

### Step 1: Create a folder

Open a terminal and copy-paste:`,
        codeBlock: {
          language: "bash",
          code: "mkdir vibe-hello-world\ncd vibe-hello-world",
        },
        content: `### Step 2: Create a file

This command creates a simple JavaScript file:`,
        keyPoint: "You just used your first terminal commands! You can create folders and navigate like a pro.",
      },
      {
        id: 11,
        title: "Level Complete! 🎉",
        type: "quiz",
        duration: 5,
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

// Helper to get steps for a module
export function getModuleSteps(
  moduleId: number,
  version: Version
): ModuleStepSequence | null {
  if (moduleId === 0) {
    return module0Steps[version];
  }
  return null; // Other modules coming later
}

// Check if a module has steps (new format) or uses markdown (old format)
export function hasModuleSteps(moduleId: number): boolean {
  return moduleId === 0;
}
