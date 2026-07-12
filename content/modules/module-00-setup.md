# Module 0: Setup & Accounts

**Stage:** Onboarding · **Level:** Beginner / All · **Duration:** ~2 contact hours (0.2 CEU)

**Prerequisites:** None — this comes before Module 1. A computer and an internet connection are all that's assumed.

> Setup friction is where beginners quietly give up. This module installs and *verifies* every account and tool once, up front, so no later lesson stalls on "it won't install." It also gives learners the map of the whole stack before they touch any of it.

## Learning objectives

By the end of this module, the learner can:

1. **Set up** all required accounts and tools for the course. *(Apply)*
2. **Explain** what each tool in the stack is for and how the pieces connect. *(Understand)*
3. **Verify** the full toolchain works with a hello-world check. *(Apply)*

---

## Lesson 0.1 — The stack, before you touch it (~20 min)

Give learners the whole map first, so every tool has a place to land. Each maps to a later module:

| Tool | What it's for | First used in… |
| --- | --- | --- |
| Node.js | Runtime that executes JavaScript code on your computer | Module 4 |
| Cursor | AI code editor — you write code, AI autocompletes/suggests as you type (real-time, in-editor) | Module 4 |
| Claude Code | AI terminal agent — you ask it complex tasks, it runs commands and writes multi-file projects (command-line, agentic) | Module 5 |
| Supabase | Backend database + authentication + storage (your app's brain) | Module 7 |
| GitHub | Version control + code hosting (saves your work, enables teamwork) | Module 9 |
| Vercel | One-click deployment (shares your app on the internet with a public URL) | Module 10 |

**In-editor flow vs. agentic flow — what's the difference?**
- **Cursor (in-editor):** You open a file, start typing, and AI suggests completions line-by-line. You're driving; AI is the copilot.
- **Claude Code (agentic):** You describe what you want ("build me a login form"), and AI writes entire functions/files for you. AI is driving; you review.

**The one-sentence flow:** you *write* code in Cursor/Claude Code, make it *look good* (Module 6), *power* it with Supabase, *store* it on GitHub, and *ship* it on Vercel — with Node running it locally along the way.

---

## Lesson 0.2 — Set up your environment with Claude Code (~30 min)

### What is a terminal?

Before you start: a **terminal** is a text-based interface to your computer. Instead of clicking buttons, you type commands. Don't worry — Claude Code will orchestrate most of the work for you.

- **Mac:** Open Spotlight (Cmd+Space), type "Terminal", press Enter.
- **Windows:** Press Win+R, type "powershell", press Enter.

---

### The automation-first approach

Instead of manually navigating websites and running installers, you'll **prompt Claude Code to set up your development environment**. Claude Code knows the latest versions, compatible configurations, and verification steps — and it can walk you through them step by step.

**Your job:** describe what you want to set up, review Claude Code's recommendations, and follow the steps it provides. You're still in control (you approve each step), but Claude Code does the research and orchestration.

### Setting up Node.js, Cursor, and Claude Code

**Step 1:** Open a terminal (Mac: Cmd+Space → "Terminal"; Windows: Win+R → "powershell").

**Step 2:** Prompt Claude Code to guide your setup:

```bash
claude
```

Then in Claude Code, write:

```
Help me set up my development environment for Next.js. I need:
1. Node.js LTS (latest stable version)
2. Cursor installed and signed in
3. Claude Code installed and verified

Tell me the exact steps for my OS [Mac/Windows], the version numbers to expect, 
and the commands to verify everything works. I'll follow your guidance.
```

**Step 3:** Claude Code will provide:
- The exact Node.js version to install (e.g., v22 LTS)
- Download links tailored to your OS
- Setup instructions for Cursor
- Verification commands (e.g., `node --version`, `npm --version`)
- Confirmation that you're logged in

**Step 4:** Follow Claude Code's step-by-step guidance. After each step, run the verification commands it suggests. If something doesn't work, tell Claude Code — it can troubleshoot based on the error.

---

**[SCREENSHOT PLACEHOLDER: Claude Code Terminal Session]**

**What this screenshot should show:**
- Terminal window with Claude Code running
- A conversation where you ask Claude Code to help set up the environment
- Claude Code's response showing install steps, version numbers, and verification commands
- Terminal showing successful version checks (e.g., `node v22.0.0`, `npm v10.5.0`)

---

### Quick manual reference (if you prefer self-service)

If you'd rather not use Claude Code for this step, here's the manual path (though we recommend the automation above):

**Node.js:** Go to [https://nodejs.org](https://nodejs.org), download LTS, run the installer.
**Cursor:** Go to [https://cursor.com](https://cursor.com), download for your OS, install and sign in.
**Claude Code:** Go to [https://claude.com/download](https://claude.com/download), install, run `claude login`.

But honestly? Prompting Claude Code is faster and more reliable — it knows the current versions and catches common mistakes automatically.

---

## Lesson 0.3 — Create your accounts (~30 min)

Sign up for all three **using the same email address** for consistency. This makes it easier to keep track of your accounts.

### GitHub ([github.com](https://github.com))

GitHub is where you'll save your code. It's like Google Drive for developers — it tracks changes and lets you collaborate.

**Step 1:** Go to [https://github.com/signup](https://github.com/signup)

**Step 2:** Enter your email, create a password, and choose a username. (Your username will be visible — keep it professional.)

**Step 3:** Verify your email — GitHub will send you a confirmation link. Click it.

**Step 4:** You're done. You'll create your first repo (project folder) in Module 9, so don't worry about that now.

### Supabase ([supabase.com](https://supabase.com))

Supabase is your database — where your app stores data (user logins, posts, etc.).

**Step 1:** Go to [https://supabase.com](https://supabase.com) and click "Sign up".

**Step 2:** You can sign up with GitHub (easier) or email. If using GitHub, click "Continue with GitHub" and authorize.

**Step 3:** Verify your email.

**Step 4:** You're done. You'll create a Supabase project in Module 7.

### Vercel ([vercel.com](https://vercel.com))

Vercel is where you'll deploy your app — it makes it live on the internet.

**Step 1:** Go to [https://vercel.com/signup](https://vercel.com/signup)

**Step 2:** Sign up with GitHub (recommended). Click "Continue with GitHub" and authorize.

**Step 3:** **Important:** After sign-up, go to your account settings and connect your GitHub account. Vercel needs permission to access your GitHub repos. (If you signed up with GitHub, this is already done — verify in Settings.)

**Step 4:** You're done.

---

## Lesson 0.4 — Costs & free tiers (~15 min)

Set expectations honestly so nobody is surprised by a bill:

**Free tiers that cover this course:**
- Node.js — always free
- GitHub — free tier is generous; unlimited public/private repos
- Supabase — free tier includes 500MB database + 5GB storage (plenty for this course)
- Vercel — free tier includes unlimited deployments; only pay for extras (bandwidth beyond free quota)

**AI editors (freemium):**
- **Cursor** — free tier: 2 slow requests/day; paid: $20/month for unlimited fast requests
- **Claude Code** — free trial; after, pay by token usage (typically $5-50/month for moderate use)

You can **complete the entire course on free tiers**. AI editor usage depends on how much you experiment; most learners stay under $10-20/month if they're not running heavy builds constantly.

**To avoid unexpected bills:**
1. Use the free tiers first — don't upgrade unless you hit limits
2. Check your usage dashboard on each tool's account settings weekly (takes 2 minutes)
3. Set spending alerts if available (Vercel and others offer this)

---

## Lesson 0.5 — Verify your complete toolchain (~25 min)

Use Claude Code to orchestrate and verify every part of your setup before Module 1. This is faster than manual verification and catches issues automatically.

### The automated verification flow

**Step 1:** Open a terminal and prompt Claude Code:

```bash
claude
```

Then ask:

```
I've installed Node.js, Cursor, and Claude Code. 
Create a verification checklist and walk me through it:
1. Check Node.js and npm versions
2. Verify I can create and run a Next.js app
3. Test that Cursor can open the project
4. Confirm Claude Code is working
5. Verify I'm logged into GitHub, Supabase, and Vercel

Run the commands for me and interpret the results. 
Tell me if anything is missing or broken.
```

**Step 2:** Claude Code will:
- Provide the exact verification commands for your OS
- Run them and check the output
- Flag any version mismatches or missing tools
- Guide you through fixes if needed
- Confirm when everything is ready

---

**[SCREENSHOT PLACEHOLDER: Claude Code Verification Session]**

**What this screenshot should show:**
- Terminal window with Claude Code running a verification session
- Claude Code running commands like `node --version`, `npm --version`
- Output showing successful version checks
- Claude Code's summary: "All checks passed, you're ready for Module 1"

---

### What happens in the verification

Claude Code will orchestrate:
1. **Version checks** — confirming Node.js LTS, npm, Cursor, and Claude Code versions
2. **A test project** — creating a temporary Next.js app to ensure the full pipeline works
3. **Tool integration** — verifying Cursor can open the project and Claude Code can read the files
4. **Account checks** — confirming you're logged into GitHub, Supabase, and Vercel (it won't have direct access, but it can walk you through confirming each)

After the checks pass, Claude Code will clean up the temporary project for you.

### If Claude Code finds a problem

Claude Code will tell you exactly:
- What failed (e.g., "npm not in PATH")
- Why it happened (e.g., "Terminal needs to be restarted after Node install")
- How to fix it (e.g., "Close this terminal completely, open a new one, and try again")

This is actually better than manual troubleshooting — Claude Code will verify the fix worked before you move on.

### Quick manual reference (if Claude Code isn't working)

If Claude Code itself isn't installed yet, you can verify manually:

1. **Terminal:** open one (Mac: Cmd+Space → "Terminal"; Windows: Win+R → "powershell")
2. **Run these commands:**
   ```bash
   node --version    # Should print v18.0.0 or higher
   npm --version     # Should print 10.0.0 or higher
   claude --version  # Should print a version number
   ```
3. **Create and test the app:**
   ```bash
   npx create-next-app@latest hello-check
   cd hello-check
   npm run dev
   ```
4. **Open in browser:** Go to http://localhost:3000 — you should see the Next.js starter page
5. **Open in Cursor:** File → Open Folder → select `hello-check` folder
6. **Check your logins:** Visit github.com, supabase.com, and vercel.com to verify you're signed in
7. **Clean up:** Stop the app (Ctrl+C) and delete the `hello-check` folder

### Troubleshooting the verification

- **`claude` command not found** — Close the terminal and reopen it; PATH updates need a restart.
- **Node version is too old** — Reinstall Node from nodejs.org (LTS version, v18+).
- **Port 3000 already in use** — Another app is using it. Run `npm run dev -- -p 3001` instead.
- **Next.js app creation fails** — Make sure you're in an empty folder. If you see ".DS_Store" errors (Mac), delete it with `rm .DS_Store` and try again.
- **`localhost:3000` shows "Cannot connect"** — Wait 10 seconds for the app to start, then refresh your browser. Check the terminal for error messages.

---

## Lesson 0.6 — Project governance: How to govern your own projects (~20 min)

Before you start building, know that every real project — even your first capstone — needs **three simple rules documents** to stay coherent as it grows. You won't use these in Module 0, but you'll create them for your capstone in Module 16. This lesson introduces the pattern.

### Three governance documents

Every ambitious project benefits from three lightweight documents:

**1. CLAUDE.md — Your project's constitution**

A file named `CLAUDE.md` in your project root that lists non-negotiable rules. Examples:
- "Secrets never go in git" (put .env in .gitignore)
- "All data changes must be migrations" (never hand-edit the database)
- "Commit messages must be clear" ("add invoice filter" not "stuff")
- "All new functions must have tests"

**Why it matters:** When you (or a teammate, or Claude Code) make decisions fast, CLAUDE.md is the single source of truth. It prevents drift and keeps the team aligned.

**For kids:** Write 3–5 simple rules for your capstone. Example:
```
# My Invoice Tracker — Rules

1. Never commit API keys (.env stays in .gitignore)
2. If you change the database, write it down in migrations/
3. Commit messages must describe what changed ("fix typo" or "add filter")
4. Before pushing, run tests and make sure they pass
```

**For adults:** Include sections for project pitch, non-negotiable rules, source-of-truth model (what the repo owns vs. what Notion/external tools own), and Definition of Done (when is a task really complete?).

---

**2. decisions.md — A record of important choices**

An append-only log of every decision your team makes. Examples:
- "We chose Supabase because it has built-in auth and RLS"
- "We use Tailwind CSS because the team already knows it"
- "We deploy to Vercel because it's fast and free for our scale"

**Why it matters:** A month from now, you'll ask "why did we pick this?" Reading decisions.md saves you from re-deciding.

**For kids:** Keep a simple list as you build:
```
## Decisions

- Used Supabase for database (has auth built-in)
- Used Vercel for deployment (one-click deploy from GitHub)
- Picked Tailwind for styling (fast, learner-friendly)
```

**For adults:** Use a timestamp, reason, and decision-maker for each entry. Make it append-only (never edit history). Example:
```
### 2026-01-15 — Chose Supabase over Firebase
Firebase has great mobile SDKs, but Supabase gives us SQL and RLS (row-level security) with standard Postgres. For a data-heavy invoice tracker, SQL wins. — @charlie
```

---

**3. .mcp.json — Team configuration for Claude Code**

When you use Claude Code to automate your pipeline (Module 13), you'll wire it to GitHub, Supabase, Vercel, and Notion. The `.mcp.json` file in your project root tells Claude Code which systems to connect to — so all your teammates (or future-you) see the same configuration.

**Why it matters:** Instead of each teammate remembering "oh, I need to `claude mcp add github` and `claude mcp add supabase`," they just clone your repo and Claude Code reads .mcp.json and connects automatically.

**For kids:** Don't worry about this yet (you'll do it in Module 13). Just know it exists.

**For adults:** You'll create this in Module 13. Preview:
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@github-mcp-server", "--token", "${GITHUB_TOKEN}"]
    },
    "supabase": {
      "command": "npx",
      "args": ["@supabase/mcp-server", "--project-ref", "YOUR_REF"]
    }
  }
}
```

---

### Your job in Module 0

Nothing yet. But starting in Module 1, keep these three documents in mind. You'll create them for your capstone project in Module 16. For now, just know:

- **CLAUDE.md** = rules that govern how you work
- **decisions.md** = why you made important choices (updated as you build)
- **.mcp.json** = configuration for Claude Code automation (Module 13+)

These three documents scale from a solo project to a team of 10 without any overhead — and they're the difference between "it works on my computer" and "it's a maintainable, shareable project."

---

## Readiness checklist

Tick every box before starting Module 1. If any are unchecked, go back to the lesson that covers it.

| Item | Done when… |
| --- | --- |
| Node.js | Terminal shows version: `node --version` prints `v18.0.0` or higher |
| npm | Terminal shows version: `npm --version` prints `10.0.0` or higher |
| Cursor | Installed and you can sign in |
| Claude Code | Terminal shows version: `claude --version` works |
| GitHub | Account created at github.com, you can log in |
| Supabase | Account created at supabase.com, you can log in |
| Vercel | Account created at vercel.com, GitHub connected |
| Hello-world | Ran `create-next-app`, saw the starter page at localhost:3000 |

---

## How to submit your work for Module 0

Module 0 is a **checklist submission** (not a quiz). Here's how to complete it:

**For the readiness checklist:**
1. Go through the checklist above
2. For each item, take a screenshot showing it's done:
   - Node.js: Screenshot of terminal showing version
   - Cursor: Screenshot of Cursor open and signed in
   - Claude Code: Screenshot of terminal showing `claude --version` output
   - GitHub/Supabase/Vercel: Screenshot showing you're logged in
   - Hello-world: Screenshot of http://localhost:3000 in your browser showing the Next.js page

3. **Go back to this module page on the platform** and click "Submit Deliverable"
4. Upload your screenshots or paste a link to a folder with all of them
5. Write a brief note: "All tools installed and verified"

**For the knowledge check:**
1. Answer in a text file or document:
   - "In one sentence each, what do Cursor, GitHub, Supabase, and Vercel do?"
   - "Show a screenshot of your hello-world app running at localhost:3000"

2. Upload the file when you submit

**This module is pass/complete:** You don't get a grade. You pass when all checklist items are ticked and you submit screenshots. It gates entry to Module 1.

---

## Troubleshooting (common blockers)

- **`command not found` after install** — Close the terminal completely and reopen it. PATH updates on restart. If it still fails, reinstall the tool.
- **`create-next-app` fails** — Usually an old Node version. Run `node --version` and verify you have v18+. If not, install the current LTS.
- **`create-next-app` refuses to run in a non-empty folder** — Hidden files (like `.DS_Store` on Mac) block it. Start in an empty folder or let it create a subfolder.
- **Port 3000 is in use** — Stop the other process, or run `npm run dev -- -p 3001` to use port 3001.
- **Can't sign in to a tool** — Double-check you're using the correct email. If sign-in pages show "email not found", create a new account. Check that pop-ups aren't blocked in your browser (GitHub OAuth needs them).
- **`npm install` is slow** — Normal on first run; can take 1-2 minutes. If it hangs for >5 minutes, press Ctrl+C and try again.

---

## Tools & alternatives (this module)

These are the course defaults. Alternatives (VS Code + Copilot, other editors, etc.) are discussed in later modules and consolidated in Module 15 (Landscape). 

**For beginners:** Stick with the defaults (Cursor + Claude Code) to avoid confusion with different screenshots and workflows. You can switch tools in later modules once you understand the concepts.

---

## Key takeaways

- **Set up and verify everything once, up front** — don't let install friction derail Module 1.
- **Know the stack map:** write code (Cursor/Claude Code) → design it (Module 6) → power it (Supabase) → store it (GitHub) → ship it (Vercel).
- **Free tiers cover this course** — no credit card needed to start.
- **You're ready for Module 1 when every box on the readiness checklist is ticked.**
- **Stuck?** Go to the troubleshooting section above. If it's not listed, ask for help in the support chat.

---

## Next: Module 1

Once you've ticked the readiness checklist and submitted your screenshots, you're ready for **Module 1: AI Fundamentals** — where we'll explore how AI coding actually works, and you'll write your first prompt.
