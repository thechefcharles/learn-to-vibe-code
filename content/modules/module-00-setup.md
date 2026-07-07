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

## Lesson 0.2 — Install the editors and runtime (~30 min)

### What is a terminal?

Before you start: a **terminal** is a text-based interface to your computer. Instead of clicking buttons, you type commands. Don't worry — we'll only use a few simple commands, and they're copy-paste.

- **Mac:** Open Spotlight (Cmd+Space), type "Terminal", press Enter.
- **Windows:** Press Win+R, type "powershell", press Enter.

---

**[SCREENSHOT PLACEHOLDER: Terminal Windows]**

**What this screenshot should show:**
- Left side: Mac Terminal window open (showing the black/white terminal with a command prompt, after searching "Terminal" in Spotlight)
- Right side: Windows PowerShell window open (showing the blue PowerShell interface after typing "powershell" in Win+R)
- Both should show the terminal is ready for commands (prompt visible, no errors)

---

### Installing Node.js

Node.js is the runtime that runs JavaScript on your computer (instead of just in a browser).

**Step 1:** Go to [https://nodejs.org](https://nodejs.org)

**Step 2:** Download the **LTS version** (Long-Term Support — the stable one). Click the big green button labeled "LTS".

**Step 3:** Run the installer and follow the prompts. Accept defaults.

**Step 4:** Open a terminal and verify it installed:

```bash
node --version
npm --version
```

You should see two version numbers (e.g., `v22.12.0` and `10.5.0`). If you see them, you're done — Node works.

---

**[SCREENSHOT PLACEHOLDER: Node.js Version Output]**

**What this screenshot should show:**
- Terminal window (Mac or Windows)
- Visible commands: `node --version` and `npm --version`
- Output showing version numbers (e.g., `v22.12.0` and `10.5.0`)
- Proof that both commands ran successfully with no errors
- The terminal prompt ready for the next command

---

**If you see `command not found`:** Close the terminal window completely and reopen it. Sometimes PATH updates need a fresh terminal. If it still fails, reinstall Node.

### Installing Cursor

Cursor is your AI code editor. It's built on VS Code, so if you've used VS Code before, it'll feel familiar.

**Step 1:** Go to [https://cursor.com](https://cursor.com)

**Step 2:** Click "Download" and choose your operating system (Mac or Windows).

**Step 3:** Run the installer and follow the prompts.

**Step 4:** Open Cursor. You'll see a welcome screen. Click "Sign in with GitHub" (or email — we'll set up GitHub next).

**Step 5:** Follow the sign-in flow. After you sign in, you're done.

![Screenshot: Cursor welcome screen with "Sign in with GitHub" button]

### Installing Claude Code

Claude Code is the terminal AI agent. You'll use it from the terminal to ask for help with complex tasks.

**Step 1:** Go to [https://claude.com/download](https://claude.com/download) and follow the install instructions for your OS (Mac or Windows).

**Step 2:** Open a terminal and verify it installed:

```bash
claude --version
```

You should see a version number (e.g., `0.5.2`). If yes, you're done.

**Step 3:** Sign in for the first time by running:

```bash
claude login
```

You'll be asked to paste an API token from Claude. Follow the link, log in to your Claude account, and copy the token. Paste it into the terminal.

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

## Lesson 0.5 — Verify everything works (~25 min)

Prove the whole toolchain runs before Module 1. You'll create a throwaway hello-world app, verify it works, then delete it.

### Step 1: Open a terminal

- **Mac:** Cmd+Space, type "Terminal", press Enter
- **Windows:** Win+R, type "powershell", press Enter

### Step 2: Create the hello-world app

Copy and paste this command into your terminal:

```bash
npx create-next-app@latest hello-check
```

You'll be asked questions. Answer as follows:
- "Would you like to use TypeScript?" → `No`
- "Would you like to use ESLint?" → `No`
- "Would you like to use Tailwind CSS?" → `Yes`
- Accept defaults for everything else

This will take 2-3 minutes. Wait for it to finish.

---

**[SCREENSHOT PLACEHOLDER: create-next-app Running]**

**What this screenshot should show:**
- Terminal window showing the output of `npx create-next-app@latest hello-check`
- Visible prompts and user responses (the questions asked, and `No`/`Yes` answers)
- Bottom of output showing "✓ Created hello-check" or similar success message
- The folder was created and dependencies are installed
- The prompt is ready for the next command (`cd hello-check`)

---

### Step 3: Start the app

Run these commands in the terminal:

```bash
cd hello-check
npm run dev
```

You'll see:
```
▲ Next.js 16.2.10
- Local:         http://localhost:3000
```

### Step 4: Open it in your browser

Open a web browser (Chrome, Safari, Firefox, Edge). Go to:

```
http://localhost:3000
```

**You should see:** A Next.js starter page with a logo and a "Get started" button.

If you see this, your Node + npm + editor setup works. Congratulations!

### Step 5: Test the tools are connected

**In Cursor:**
1. Open Cursor
2. Go to File → Open Folder
3. Navigate to and select the `hello-check` folder
4. You should see the project files on the left side

---

**[SCREENSHOT PLACEHOLDER: Cursor with Project Open]**

**What this screenshot should show:**
- Cursor window is open
- Left sidebar shows the file tree of the hello-check project (folders: `app`, `node_modules`, `public`, etc.)
- Main editor area is visible (even if no file is open, just the sidebar is key)
- Cursor is signed in (no sign-in prompt visible)
- Title bar shows "hello-check" or the project path
- Proof that Cursor can open and work with the project

---

**Claude Code in Terminal:**
1. In the same terminal (or a new one), navigate to `hello-check` and run:
   ```bash
   claude --version
   ```
2. You should see the version number — this proves it's installed

**Verify you're logged into:**
- GitHub: Go to github.com, you should be logged in
- Supabase: Go to supabase.com, you should be logged in
- Vercel: Go to vercel.com, you should be logged in

### Step 6: Stop the app and clean up

In the terminal, press **Ctrl+C** to stop the app.

Then delete the `hello-check` folder:

- **Mac:** Type `rm -rf hello-check` in the terminal
- **Windows:** Type `rmdir /s hello-check` in the terminal and press `y` to confirm

(Or just drag the folder to Trash/Recycle Bin — either works.)

### Troubleshooting the hello-world test

- **`command not found: npx`** — Node didn't install properly. Close the terminal and try reinstalling Node.
- **`create-next-app` fails to run** — Usually an old Node version. Run `node --version` and verify you have v18+. If not, reinstall the LTS version.
- **`create-next-app` refuses to run (error about folder not empty)** — The folder has a hidden file (like `.DS_Store` on Mac). Use an empty folder or let it create a subfolder by running `npx create-next-app@latest my-app` instead.
- **Port 3000 is already in use** — Another app is using it. Either close that app or run `npm run dev -- -p 3001` to use port 3001 instead.
- **Browser shows "Cannot connect" at localhost:3000** — Make sure the terminal says "Local: http://localhost:3000" (no errors). If yes, wait 10 seconds and refresh the browser.

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
