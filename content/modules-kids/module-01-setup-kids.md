# Module 0: Get Your Coding Gear Ready! 🎮

**Stage:** Getting Started · **Level:** Total Beginner · **Duration:** ~2 hours · **XP:** 100

**What you'll need:** A computer and internet connection. That's it!

> **Why this matters:** Setup is where people give up. We're gonna install everything once, test it all, and then you're ready to actually build stuff. Think of this like collecting all your gear before an adventure!

## What You'll Learn

By the end of this module, you'll be able to:

1. **Set up** all your coding tools (like getting your equipment ready for a quest)
2. **Understand** what each tool does and how they work together
3. **Protect** your API keys and secrets using environment variables and `.gitignore`
4. **Test** everything to make sure it's working

---

## Lesson 0.1 — Your Coding Toolkit 🛠️ (~20 min)

Every coder has tools, just like every gamer has gear. Here's yours, and which "level" (module) you'll use each one:

| Tool | What It Does | First Used |
| --- | --- | --- |
| **Node.js** | Runs your code on your computer | Module 4 |
| **Cursor** | AI helper that's built into your code editor | Module 4 |
| **Claude Code** | AI helper you talk to from your terminal | Module 5 |
| **Supabase** | Your app's brain (database + storage) | Module 7 |
| **GitHub** | Where you save your code online | Module 9 |
| **Vercel** | One-click button to show your app to the world | Module 10 |

**The flow:** You write code → Make it look cool → Add superpowers (database) → Save it → Ship it to the internet.

---

## Lesson 0.2 — Install the Tools with Claude Code (~30 min)

### What is a Terminal? 💻

First things first: a **terminal** is a text-based way to talk to your computer. Instead of clicking buttons, you type commands. But here's the cool part — **Claude Code will help you do it!** Instead of you hunting down downloads and clicking installers, you just ask Claude Code, and it tells you exactly what to do.

**Mac:** Open Spotlight (Cmd+Space), type "Terminal", press Enter.
**Windows:** Press Win+R, type "powershell", press Enter.

---

### The Smart Setup: Let Claude Code Guide You

Instead of manually visiting websites and downloading software, you'll **ask Claude Code to orchestrate your setup**. Claude Code knows the latest versions, what works best, and how to verify everything — it's like having a setup wizard that actually knows what it's doing! 🧙‍♂️

**Your job:** describe what you need, follow Claude Code's step-by-step guidance, and answer a few questions. Claude Code handles the research and troubleshooting.

### Setting up Node.js, Cursor, and Claude Code

**Step 1:** Open a terminal (Mac: Cmd+Space → "Terminal"; Windows: Win+R → "powershell").

**Step 2:** Start Claude Code:

```bash
claude
```

**Step 3:** Copy this and paste it into Claude Code:

```
Help me set up my development environment for Next.js. I need:
1. Node.js LTS (latest stable version)
2. Cursor installed and signed in
3. Claude Code installed and verified

Tell me the exact steps for my OS [Mac/Windows], the version numbers I should see, 
and the commands to check everything works. I'll follow your guidance step by step!
```

**Step 4:** Claude Code will give you:
- Exact download links for your computer
- Step-by-step install instructions
- Verification commands to run
- What version numbers you should see

**Step 5:** Follow Claude Code's steps. If something doesn't work, tell Claude Code the error — it can troubleshoot on the spot! 🛠️

---

**[SCREENSHOT PLACEHOLDER: Claude Code Setup Guide]**
Terminal window showing Claude Code responding to a setup request with install steps, version numbers, and verification commands.

---

## Lesson 0.3 — Create Your Accounts (~30 min)

Sign up for these three. Use the same email for all of them so you don't lose track:

- **GitHub** at [github.com](https://github.com) — your code's home
- **Supabase** at [supabase.com](https://supabase.com) — your app's power-up
- **Vercel** at [vercel.com](https://vercel.com) — your deployment launchpad
  - When you sign up for Vercel, connect it to GitHub (it makes things super easy later)

That's it! All free. 🎁

---

## Lesson 0.4 — Costs & Free Tiers (~15 min)

Great news: **you can complete the entire course on free tiers!** Here's the breakdown:

**Always free:**
- Node.js — free forever
- GitHub — unlimited repos on free tier
- Supabase — 500MB database + 5GB storage (plenty for this course)
- Vercel — unlimited deployments for free

**Freemium (free tier exists, paid optional):**
- **Cursor** — 2 slow requests/day free; $20/month for unlimited fast requests
- **Claude Code** — free trial; then ~$5-50/month depending on how much you use it

**How to avoid surprise bills:**
1. **Use free tiers first** — don't upgrade unless you hit limits
2. **Check your usage weekly** — takes 2 minutes, just go to account settings on each tool
3. **Set spending alerts** if available (Vercel has them)

Most learners stay under $10-20/month total for AI helpers if they're just learning. You're good! 💰

---

## Lesson 0.5 — Verify Everything Works with Claude Code (~25 min)

Time to prove everything works together! Instead of you doing each test manually, **Claude Code will create a verification checklist and walk you through it**. It's like having a safety inspector check all your gear before the adventure! ✅

**Step 1:** Start Claude Code in your terminal:

```bash
claude
```

**Step 2:** Paste this into Claude Code:

```
I've installed Node.js, Cursor, and Claude Code. 
Create a verification checklist and walk me through it:
1. Check Node.js and npm versions
2. Verify I can create and run a Next.js app
3. Test that Cursor can open the project
4. Confirm Claude Code is working
5. Verify I'm logged into GitHub, Supabase, and Vercel

Run the commands for me and tell me if everything passed. 
If anything is missing or broken, help me fix it!
```

**Step 3:** Claude Code will:
- Run verification commands for your computer
- Show you the version numbers
- Create a temporary test app
- Check that Cursor can open it
- Ask you to confirm you're logged into GitHub, Supabase, and Vercel
- Tell you if anything is broken
- Clean up the test app for you

---

**[SCREENSHOT PLACEHOLDER: Claude Code Verification Checklist]**
Terminal showing Claude Code running verification commands and providing a summary like "✅ All checks passed! You're ready for Module 1!"

---

**Step 4:** Read Claude Code's summary. If all checks say ✅, you're ready to roll! 🚀

If Claude Code finds a problem, it will:
- Tell you exactly what failed (like "npm not found")
- Explain why it happened
- Show you how to fix it
- Re-check after you fix it to make sure it worked

### If You Prefer Manual Verification

If Claude Code isn't working yet, you can check things manually:

**In your terminal, run these:**
```bash
node --version    # Should show v18 or higher
npm --version     # Should show 10.0.0 or higher
claude --version  # Should show a version number
```

**Then create a quick test app:**
```bash
npx create-next-app@latest hello-check
cd hello-check
npm run dev
```

**Open http://localhost:3000 in your browser** — you should see the Next.js starter page.

**In Cursor:** File → Open Folder → select the `hello-check` folder.

**When done:** Press Ctrl+C in the terminal to stop the app, then delete the `hello-check` folder.

### Troubleshooting 🔧

**`claude` command not found** — Close the terminal completely and reopen it. Sometimes PATH needs a restart.

**`command not found: npx`** — Node didn't install properly. Reinstall Node.js from nodejs.org, close the terminal, then reopen it.

**Port 3000 already in use** — Run: `npm run dev -- -p 3001` instead.

**Browser shows "Cannot connect"** — Wait 10 seconds and refresh. Check the terminal for any error messages.

---

## Lesson 0.7 — Secrets, APIs & Never Leaking Your Keys 🔐 (~45 min)

**What happens if you don't learn this:** You accidentally commit a password or API key to GitHub. A bot finds it within minutes. Attackers use your exposed key to charge your credit card or steal data. You spend hours cleaning it up. It shows up on your GitHub profile forever. You learn the hard way — publicly.

**What you'll learn:** How to keep secrets safe, so this *never* happens to you.

---

### Why Secrets Matter (The Real Deal)

Every app you build will use **API keys** — secret passwords that let your app talk to Supabase, Stripe, or other services. These keys are like the keys to your house. If someone gets them, they can:
- Drain your Stripe account (make fake charges)
- Read all your database (user emails, passwords, private data)
- Impersonate your app and trick users
- Get you sued if you expose customer data

**Real example:** A developer accidentally commits a Supabase key to GitHub. An attacker finds it, accesses the database, and steals 50,000 users' email addresses. The company spends weeks fixing it, and the developer's first job experience becomes a scandal.

This lesson teaches you to *never* be that developer.

---

### Part 1: What Are API Keys?

An **API key** is a secret password your code uses to authenticate to a service. Examples:

- `STRIPE_SECRET_KEY` — Lets your code process payments (private! real money!)
- `SUPABASE_ANON_KEY` — Lets your app read/write data (usually safe for browser)
- `SUPABASE_SERVICE_ROLE_KEY` — Admin access to your entire database (VERY private!)
- `SENDGRID_API_KEY` — Lets your code send emails

**The rule:** Never hardcode these into your code. Never commit them to GitHub. Never show them in screenshots or share them in Slack.

---

### Part 2: Environment Variables — Keeping Secrets Out of Code

An **environment variable** is a value that lives *outside* your code, not inside it.

**Why?** Because the same code runs in three different places with *different* secrets:

```
Your Computer (Development)
├─ STRIPE_SECRET_KEY=sk_test_xxx (test mode)
├─ SUPABASE_URL=http://localhost:5432

Production (Live Website)
├─ STRIPE_SECRET_KEY=sk_live_zzz (real money!)
├─ SUPABASE_URL=https://prod.supabase.co
```

Same code. Different secrets. Environment variables make this possible without changing the code.

---

### Part 3: The `.env.local` File (Local Setup)

**Step 1: Create a `.env.local` file**

In the root of your project, create a file called `.env.local` (note the dot at the start). Add your secrets:

```bash
# .env.local (THIS FILE IS NEVER COMMITTED TO GITHUB)

# Supabase
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=your-secret-key-here

# Stripe (development mode)
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_123456
STRIPE_SECRET_KEY=sk_test_abcdef
```

**Step 2: Use these secrets in your code**

```typescript
// In Next.js, access environment variables with process.env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const stripeSecret = process.env.STRIPE_SECRET_KEY; // Only works on server!
```

**Critical rule:** Only variables starting with `NEXT_PUBLIC_` show up in the browser. Everything else stays server-side only.

```typescript
// ✅ SAFE — this is visible to the browser (public key, test mode only)
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxx

// ❌ WRONG — never do this! This will leak the secret!
NEXT_PUBLIC_STRIPE_SECRET_KEY=sk_test_xxx
```

---

### Part 4: The `.gitignore` File (Your Safety Net)

**What's `.gitignore`?**

A file that tells git "never commit these files." It's your last line of defense against accidentally uploading secrets.

**Your `.gitignore` should include (at minimum):**

```gitignore
# Environment variables — CRITICAL! Never commit these!
.env
.env.local
.env.*.local
.env.production.local

# Other stuff git should ignore
node_modules/
.next/
.DS_Store
*.log
```

**To check if it's working:**

```bash
git status
```

If `.env.local` doesn't appear in the list, you're good! If it does, fix `.gitignore` immediately before pushing.

---

### Part 5: What Happens If You Leak a Secret (Accident Recovery)

**If you commit a secret to GitHub:**

**Step 1: Don't panic.** It happens to everyone. GitHub detects it automatically and sends you an alert.

**Step 2: Rotate the key immediately** (takes 5 minutes).
- Go to Supabase → Settings → API Keys → Regenerate
- Go to Stripe → Dashboard → API Keys → Revoke
- Every service has a way to make the old key useless

**Step 3: Delete the file** from your local code and commit a fix.

**Step 4: Check git history** to make sure it's really gone:
```bash
git log --oneline  # See your commits
git show HEAD  # See the latest commit's files
```

**The hardest part:** The internet is permanent. Even after you delete the file, git history keeps it forever. Future employers can see this. That's why prevention (step 0) is way better than recovery.

---

### Part 6: Real-World Examples

**Supabase (Database)**

```typescript
// .env.local
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...  // OK for browser
SUPABASE_SERVICE_ROLE_KEY=eyJ...      // NEVER send to browser

// Your code (server-side)
const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY  // ✅ Safe — server only
);
```

**Stripe (Payments)**

```typescript
// .env.local
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxx  // Safe (public)
STRIPE_SECRET_KEY=sk_test_yyy              // NEVER send to browser

// Client-side (safe)
const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

// Server API route (private key used here)
export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // ✅ Server only
  // Process payment...
}
```

---

### Part 7: The Checklist Before You Push Code

Before you ever `git push`:

- [ ] `.env.local` exists in your `.gitignore`
- [ ] No `.env` file shows up in `git status`
- [ ] No hardcoded API keys in your code
- [ ] `NEXT_PUBLIC_*` variables only contain public keys (test Stripe, public Supabase keys)
- [ ] Private API calls happen server-side only (in API routes)
- [ ] Production secrets will be set in Vercel (not in code)

**Quick verification:**
```bash
git status  # .env.local should NOT be listed
grep -r "sk_test_" .  # Make sure no Stripe keys in your files
grep -r "sk_live_" .  # Make sure no REAL Stripe keys!
```

---

### Key Takeaways

- **Secrets go in `.env.local`, never in code** — separation keeps you safe
- **`.gitignore` prevents accidents** — add `.env.local` to it immediately
- **`NEXT_PUBLIC_*` is visible to browsers** — only use it for public keys
- **If you leak a key, rotate it immediately** — the old key becomes useless
- **Prevent first, recover second** — good habits save you hours later

---

## Lesson 0.8 — Project Rules: Keeping Your Code Organized 📋

Before you start building, every good project needs **a few simple rules** to stay clean and organized. Think of these like the rules of a game — they keep everything running smoothly!

### The Three Rules Documents

Every app you build will have three lightweight rule files:

**1. CLAUDE.md — Your Project's Rulebook** 📖

This is a file that lives in your project and lists the non-negotiable rules. Examples:
- "Never save passwords or API keys in the code (they go in a special .env file)"
- "Before pushing code to GitHub, always run the safety checks"
- "Write clear commit messages like 'add login page' instead of 'stuff'"

**Why it matters:** It keeps you and Claude Code on the same page. When you ask Claude Code to help you build, it reads CLAUDE.md and follows your rules automatically!

**For your capstone project**, you'll write 3-5 simple rules. Example:
```
# My App — Rules

1. Never save API keys in code (use .env instead)
2. Write clear commit messages
3. Run tests before pushing to GitHub
4. Keep the database clean (use migrations)
```

---

**2. decisions.md — Why You Made Choices** 🤔

This is a simple list of important decisions you made while building. Examples:
- "We picked Supabase because it has login built-in"
- "We used Vercel because it's free and super fast"
- "We chose Tailwind for styling because it's easy to learn"

**Why it matters:** A month from now, you'll ask "why did we do this?" decisions.md is your answer sheet!

**For your capstone**, keep it simple:
```
## Decisions

- Used Supabase (it has login and database in one place)
- Used Vercel (one-click deploy from GitHub)
- Picked Tailwind (fast and easy to style)
```

---

**3. .mcp.json — Claude Code's Configuration** ⚙️

This is a super advanced file that tells Claude Code which tools to connect to (GitHub, Supabase, etc.). **Don't worry about this yet!** You'll learn about it in Module 13. Just know it exists.

---

### Your Job Right Now

Nothing! You'll create these files for your capstone project (Module 16). Just remember:
- **CLAUDE.md** = your project's rules
- **decisions.md** = why you made choices
- **.mcp.json** = Claude Code's connections (later)

These three documents are like a game manual — they help you stay organized and help Claude Code help you better!

---

## Lesson 0.9 — Where Does Your Project's Brain Live? (Repo vs. Notion) 🧠

You learned that some documentation (CLAUDE.md, decisions.md) lives in your project repository. But here's a secret: **not all documentation belongs in the same place!**

Real teams split their documentation into two homes, each with a special job. Let's learn why.

### Two homes for documentation

**The Repository = Your Project's Rulebook 📖**

Think of your repo like a game's official rulebook. It's written down, stamped, and never changes unless everyone agrees.

**What goes here:**
- CLAUDE.md (your rules)
- decisions.md (why you chose Supabase, Vercel, etc.)
- Code, tests, and database changes
- Configuration files

**Why:** These things directly affect how your code works. If you change them, your app might break! So they're locked down, versioned, and reviewed before anyone changes them.

---

**Notion = Your Team's Encyclopedia 📚**

Think of Notion like Wikipedia. It's updated all the time, it's helpful for learning, but it's not official rules. It evolves as you learn new things.

**What goes here:**
- "How to set up your computer for coding" (evolves as you find easier ways)
- "Why we built this feature" (design research, user feedback)
- "What do I do if the database crashes?" (quick-reference runbooks)
- Architecture diagrams (visual, easier to sketch in Notion than markdown)
- FAQs (questions people ask a lot)

**Why:** These are super helpful but don't affect whether your code runs. They can change anytime without breaking anything. Notion is perfect for this — fast updates, no need to review changes.

---

### The Simple Rule 🎯

**Ask yourself:** *"If I change this, will my app break or stop working?"*

- **YES** → Repo (it's important, lock it down)
- **NO** → Notion (it's helpful, keep it flexible)

---

### Real examples

**CLAUDE.md** — "Never save passwords in the code" → Repo (your code *will* break if someone ignores this!)

**Onboarding guide** — "Here's how to install Node.js" → Notion (helpful, but your app doesn't care where it lives)

**decisions.md** — "We chose Supabase because it has login built-in" → Repo (explains important choices, versioned)

**Architecture diagram** — "Here's how all our pieces connect" → Notion (super helpful for learning, but your app doesn't care)

**Database migration** — "Add a `users` table" → Repo (changes your database, must be versioned)

**FAQ** — "Why does signup take 10 seconds?" → Notion (answers questions, pure info)

---

### Why this matters as you grow

**Right now (solo):** You barely need either! Just keep a note of important stuff.

**With a small team (2–3 friends):** Your repo gets the rules and code. Notion holds the helpful guides. Keeps things clean.

**With a bigger team (5+ people):** This split is *gold*. Without it, your repo fills up with 100 helpful pages (nightmare to navigate), or Notion fills up with outdated info (nobody knows what's true). With clear boundaries, everyone knows where to look.

---

### Your job in Module 0

Nothing new! Just remember: **Rules and code go in the repo. Helpful info goes in Notion.**

When you build your capstone project (Module 16), you might create:
- `CLAUDE.md` in your repo (your rules)
- `decisions.md` in your repo (why you chose stuff)
- Maybe a Notion page for architecture diagrams or onboarding (if you're working with friends!)

This split is just like organizing your room: tools and books in one place, daily stuff in another. Makes everything easier to find! 🎮

---

## Activity: The Setup Scavenger Hunt 🔍

Check off each one (you already did most of them):

- ✅ Node.js installed & version check passed
- ✅ Cursor installed & signed in
- ✅ Claude Code installed & version check passed
- ✅ GitHub account created
- ✅ Supabase account created
- ✅ Vercel account created (linked to GitHub)
- ✅ Hello-world test app ran on your computer
- ✅ All three AI accounts logged in

All done? You're ready for Module 1! 🎮

---

## Knowledge Check 🎯

**Objective 1 — Set up tools:**
- Quiz Q0-1, Q0-2, Q0-3 test your setup knowledge
- *Practical:* Show all 8 checkboxes ticked ✅ and your test app running at localhost:3000

**Objective 2 — Understand the toolkit:**
- *Practical:* In your own words, explain 2 tools and how they fit together. Example: "Node.js runs my code, Cursor is my AI helper inside the code editor"

**Objective 3 — Protect secrets and API keys:**
- *Practical:* Create a `.env.local` file with example Supabase and Stripe keys, verify `.gitignore` contains `.env.local`, run `git status` to confirm the file is ignored
- *Short answer:* Explain in 2-3 sentences: Why shouldn't you commit API keys to GitHub? What should you do if you accidentally leak a secret?

**Objective 4 — Verify everything works:**
- *Practical:* Screenshot of terminal showing all version checks passed (node, npm, claude). Screenshot of localhost:3000 showing Next.js starter page

---

## Key Takeaways

- You now have your full coding toolkit installed ✅
- Each tool has a job (some you'll use soon, some later)
- You tested everything and it all works 🎉
- You're ready to start building!

**Next:** Module 1 — How AI Actually Works (spoiler: it's simpler than you think!)
