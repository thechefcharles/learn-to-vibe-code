# Module 1: Setup & Accounts

**Stage:** Onboarding · **Level:** Beginner / All · **Duration:** ~2 contact hours (0.2 CEU)

**Prerequisites:** None — this comes before Module 2. A computer and an internet connection are all that's assumed.

> Setup friction is where beginners quietly give up. This module installs and *verifies* every account and tool once, up front, so no later lesson stalls on "it won't install." It also gives learners the map of the whole stack before they touch any of it.
> 

> **📸 Screenshots:** Items marked *[SCREENSHOT: …]* are placeholders — capture them live when recording (install screens, dashboards, the hello-world app running).
> 

## Learning objectives

By the end of this module, the learner can:

1. **Set up** all required accounts and tools for the course. *(Apply)*
2. **Explain** what each tool in the stack is for and how the pieces connect. *(Understand)*
5. **Protect** secrets and API keys using `.gitignore`, environment variables, and pre-commit hooks. *(Apply)*
3. **Verify** the full toolchain works with a hello-world check. *(Apply)*
4. **Arrange** their workspace for multi-screen workflow efficiency. *(Apply)*

---

## Lesson 0.1 — The stack, before you touch it (~20 min)

Give learners the whole map first, so every tool has a place to land. Each maps to a later module:

| Tool | What it's for | First used in… |
| --- | --- | --- |
| Node.js | Runs your app locally | Module 5 |
| Cursor | AI code editor (in-editor flow) | Module 5 |
| Claude Code | Terminal AI agent (agentic flow) | Module 6 |
| Supabase | Database + auth + security | Module 8 |
| GitHub | Version control + code hosting | Module 20 |
| Vercel | Deploys your app to a public URL | Module 21 |

**The one-sentence flow:** you *write* code in Cursor/Claude Code, make it *look good* (Module 7), *power* it with Supabase, *store* it on GitHub, and *ship* it on Vercel — with Node running it locally along the way.

---

## Lesson 0.2 — Install the editors and runtime (~30 min)

- **Node.js** — install the LTS version from [nodejs.org](http://nodejs.org). Verify in a terminal:

```bash
node --version
npm --version
```

- **Cursor** — download from [cursor.com](http://cursor.com), install, and sign in. (It's a VS Code fork, so it'll feel familiar if you've used VS Code.)
- **Claude Code** — install and sign in per the current instructions, then confirm it launches:

```bash
claude --version
```

*[SCREENSHOT: a terminal showing successful node, npm, and claude version checks.]*

**⚠️ Troubleshooting tip:** If any version checks fail or show "command not found", it usually means a PATH issue. Take time to verify each command works before moving on — this is the #1 setup blocker.
> 

---

## Lesson 0.3 — Create your accounts (~30 min)

Sign up for all three now so nothing blocks you later. Use the same email for consistency.

- **GitHub** — [github.com](http://github.com) (you'll create your first repo in Module 20).
- **Supabase** — [supabase.com](http://supabase.com) (you'll create a project in Module 8).
- **Vercel** — [vercel.com](http://vercel.com), and connect it to your GitHub account (this link enables auto-deploy in Module 21).

*[SCREENSHOT: the Vercel sign-up connecting to a GitHub account.]*

---

## Lesson 0.4 — Costs & free tiers (~15 min)

Set expectations honestly so nobody is surprised by a bill:

- **Node.js, GitHub, Supabase, Vercel** — all have free tiers that comfortably cover this course.
- **Cursor & Claude Code** — free/trial tiers, with paid plans (commonly around $20/month each) for heavier use. Learners can complete the course on modest usage.

> Pricing changes often — point learners to each tool's current pricing page rather than memorizing numbers.
> 

**Managing spend (so the bill doesn't surprise you):** AI coding tools bill by usage/credits, and heavy agentic runs (big multi-file builds, long sessions) burn faster than in-editor autocomplete. Habits: start on free/trial tiers; prefer scoped, specific prompts over "rebuild everything"; use `/compact` and fresh sessions to avoid paying for bloated context; and check your usage dashboard weekly at first to learn your own burn rate.

---

## Lesson 0.5 — Verify everything works (~25 min)

Prove the whole toolchain runs *before* Module 2. Create a throwaway hello-world Next.js app:

```bash
npx create-next-app@latest hello-check
cd hello-check
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — if the starter page loads, Node + npm + your editor work. Then confirm you can sign in to Cursor, launch Claude Code in that folder, and that you're logged in to GitHub, Supabase, and Vercel. Delete the `hello-check` folder afterward.

*[SCREENSHOT: the Next.js starter page running at [localhost:3000](http://localhost:3000).]*

> **Version note (pin + concept):** the course's reference build uses **Next.js 16 + Tailwind v4** (Tailwind v4 has **no `tailwind.config.js`** — config lives in CSS via `@import "tailwindcss"` + `@theme`). These tools move fast: pin your project's versions, learn the concept, and check current docs.
> 

---

## Readiness checklist

Tick every box before starting Module 2:

| Item | Done when… |
| --- | --- |
| Node.js | `node --version` prints a version |
| Cursor | Installed and signed in |
| Claude Code | Launches from the terminal |
| GitHub | Account created, logged in |
| Supabase | Account created, logged in |
| Vercel | Account created, connected to GitHub |
| Hello-world | A create-next-app ran at [localhost:3000](http://localhost:3000) |
| **Secrets setup** | `.env.local` created, `.gitignore` includes it, no secrets in git status |

---

## Troubleshooting (common blockers)

- **`command not found` after install** — close and reopen the terminal (PATH updates on restart); reinstall if it persists.
- **`create-next-app` fails** — usually an old Node version; install the current LTS.
- **`create-next-app` refuses to run in a non-empty folder** — even one stray file (or a hidden `.DS_Store`) blocks it. Start in an empty folder, or let it create a fresh subfolder.
- **Port 3000 in use** — stop the other process or let Next.js use the next port it offers.
- **Can't sign in to a tool** — check you're using the same email and that pop-ups/OAuth aren't blocked.

---

## Knowledge check (mapped to objectives)

**Objective 1 — Set up tools/accounts:** submit your completed readiness checklist (screenshots of each).

**Objective 2 — Explain the stack:** in one sentence each, say what Cursor, GitHub, Supabase, and Vercel do.

**Objective 3 — Verify the toolchain:** show a screenshot of a create-next-app running at [localhost:3000](http://localhost:3000).

*This module is pass/complete (checklist done) rather than quiz-graded — it gates entry to Module 2.*

---

## Tools & alternatives (this module)

These are the course defaults; alternatives are discussed in their modules and consolidated in Module 26 (Landscape). A learner already on an alternative editor (VS Code + Copilot) can follow along, but the step-by-step screenshots assume the defaults — recommend beginners use them to avoid divergence.

---

## Key takeaways

- Set up and verify everything once, up front — don't let install friction derail a later lesson.
- Know the stack map: write (Cursor/Claude Code) → design (Module 7) → power (Supabase) → store (GitHub) → ship (Vercel).
- Free tiers cover the course; AI tools are metered, so heavy use costs more.
- You're ready for Module 2 when every box on the readiness checklist is ticked.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)
---

## Lesson 0.6 — Multi-screen workflow & window management (~20 min)

The course requires juggling multiple apps simultaneously: the course (lesson + quiz), terminal (Claude Code), editor (Cursor), and often a browser (Supabase console, GitHub, documentation). Small screens or poor window arrangement will slow you down. This lesson shows how to arrange your workspace efficiently on both Mac and Windows.

### The typical layout

Arrange your screen into 2-4 zones:

| Left | Right | Background |
| --- | --- | --- |
| **Course page** (lesson + quiz) | **Terminal** (Claude Code running) | Browser (docs / GitHub / Supabase) |
| OR **Editor** (Cursor for code review) | **Dev preview** (localhost:3000) | Course page (reference) |

The goal: see your work and the instruction/reference side-by-side without tab-switching.

### macOS: Window management tricks

**Split View (built-in, easiest)**

1. Open two apps (e.g., course + terminal).
2. Swipe up with **4 fingers** to open Mission Control.
3. Click-and-drag one app to the top-left corner — it snaps to fill left half.
4. Click another app to fill the right half.
5. Both apps run full-height, split 50/50.

Shortcut: Hold the green maximize button in the top-left of any window → macOS shows split-view options.

**Multiple Desktops / Spaces (advanced)**

1. Swipe up with **4 fingers** to open Mission Control.
2. Move your cursor to the top edge and move right — you'll see space thumbnails.
3. Click the "+" to create a new desktop.
4. Swipe left/right with **4 fingers** to switch between desktops.
5. Put "persistent" apps (Cursor, terminal) on Desktop 1, and the course on Desktop 2. Swipe to focus.

**Example flow:**
- **Desktop 1:** Cursor (left half) + Terminal (right half) — your build environment.
- **Desktop 2:** Course (full screen) — distraction-free reading.
- **Desktop 3:** Browser tabs (Supabase, GitHub, docs) — reference layer.

Swipe 4 fingers horizontally to jump between them in seconds.

---

### Windows: Window management tricks

**Snap Assist (built-in, easiest)**

1. Open two apps.
2. Drag one window to the **left edge** of the screen — it snaps to fill the left half.
3. Click another app (or window) to fill the right half.
4. Both run full-height, split 50/50.

Shortcut: Click-drag the window title bar to the left edge, or use **Win + Left Arrow** to snap the active window to the left half.

**Virtual Desktops (advanced)**

1. Press **Win + Tab** to open Task View.
2. Click "+ New Desktop" (bottom-right).
3. Create 2-3 desktops.
4. Drag windows into each desktop (or open apps directly in a specific desktop).
5. Press **Win + Ctrl + Left/Right** to switch desktops.

**Example flow:**
- **Desktop 1:** Cursor (left half) + Terminal (right half) — your build environment.
- **Desktop 2:** Course (full screen) + browser pinned to taskbar — distraction-free learning.
- **Desktop 3:** GitHub / Supabase console — reference.

Switch with **Win + Ctrl + Left/Right**.

---

### Linux (GNOME, Wayland, etc.)

**GNOME Workspaces**

1. Super key (Windows key) to open Activities.
2. Move cursor to the top-right corner — workspace thumbnails appear.
3. Click "+ Workspace" to create a new one.
4. Click a workspace to switch.
5. Use **Super + Page Down / Page Up** to navigate workspaces.

**Tiling Window Manager Alternative**

If you're using a tiling WM (i3, sway, etc.), you likely manage windows via keyboard — no special setup needed. Configure your usual splits and workspaces.

---

### Recommended screen setup by device

**Laptop (single screen)**

Split into 2 halves:
- **Left:** Cursor (or course text)
- **Right:** Terminal or browser

OR use virtual desktops to separate concerns:
- Desktop 1: Editor + Terminal
- Desktop 2: Course + Browser

**Dual monitor**

- **Main screen (primary):** Cursor + Terminal (split vertically)
- **Secondary screen:** Course full-screen + browser tabs in background

OR:
- **Main screen:** Course full-screen
- **Secondary screen:** Editor + Terminal (split)

**Ultra-wide (≥3440px)**

Arrange 3 windows side-by-side:
- **Left third:** Cursor code
- **Middle third:** Terminal + dev preview stacked
- **Right third:** Course + browser tabs

---

### Pro tips

- **Pin your course/docs:** Use browser pinning or split-view to keep reference always visible.
- **Fullscreen terminal:** When debugging, expand the terminal to fullscreen temporarily (then return to split).
- **Zoom in if needed:** Course text, terminal, and code can all be zoomed (browser zoom, Cursor font size, terminal size) — don't strain.
- **Accessibility:** If you have visual or motor challenges, use your OS's accessibility features (zoom, text enlargement, voice control) — they work across all these tools.

---

## Updated Readiness checklist

| Item | Done when… |
| --- | --- |
| Node.js | `node --version` prints a version |
| Cursor | Installed and signed in |
| Claude Code | Launches from the terminal |
| GitHub | Account created, logged in |
| Supabase | Account created, logged in |
| Vercel | Account created, connected to GitHub |
| Hello-world | A create-next-app ran at [localhost:3000](http://localhost:3000) |
| **Secrets setup** | `.env.local` created, `.gitignore` includes it, no secrets in git status |
| **Window setup** | **You can split two windows side-by-side on your OS** |


---

## Lesson 0.7 — Secrets, APIs & Never Leaking Your Keys (~60 min)

**What happens if you don't learn this:** You commit an API key to GitHub. GitHub detects it and alerts you. An attacker uses your exposed key to make API calls (or charge your credit card). You spend hours revoking the key and rotating credentials. Future employers see this in your GitHub profile. You learn the hard way.

**What you'll learn:** The systems and habits that keep secrets safe, from development to production, so you never expose credentials publicly.

---

### Why This Matters (The Reality)

Every company with a GitHub repo has a `.env` file (local environment variables with secrets). The file exists so developers can test locally without committing secrets to version control.

**The rule:** `.env` files are **never, ever committed to GitHub**. Not for a second. Not "just for this test." Not "I'll delete it later." Never.

When a secret is committed:
1. **GitHub detects it** (automated scanning) and sends you an alert
2. **The internet is permanent** — even if you delete the file later, git history keeps it forever
3. **Attackers find it** within minutes (there are bots that scan public repos for leaked keys)
4. **You get charged** — if it's a Stripe API key, someone can make charges. If it's an AWS key, your bill skyrockets.
5. **Your professional reputation** takes a hit — employers see this in code reviews and interviews.

**Real example:** A developer commits a Supabase key with full database access. An attacker uses it to dump the entire user table (20k emails + hashed passwords). The company spends weeks in incident response mode.

This lesson teaches you to *never* be that developer.

---

### Part 1: Understanding Environment Variables

**What's an environment variable?**

A variable that lives *outside* your code. Examples:
- `SUPABASE_URL` — the database server address
- `SUPABASE_ANON_KEY` — the public key for browser access
- `DATABASE_PASSWORD` — the admin password (private!)
- `STRIPE_SECRET_KEY` — Stripe's secret (private!)
- `NODE_ENV` — "development" or "production" (public)

**Why separate from code?**

Because the **same code runs in three places with different secrets:**

```
Development (your computer)
├─ .env.local (gitignored — never uploaded)
├─ SUPABASE_URL=http://localhost:5432
├─ SUPABASE_KEY=test-key-123
└─ STRIPE_SECRET_KEY=sk_test_xxx

Staging (test server)
├─ Env vars in hosting dashboard (Vercel, etc.)
├─ SUPABASE_URL=https://staging.supabase.co
├─ SUPABASE_KEY=staging-key
└─ STRIPE_SECRET_KEY=sk_test_yyy

Production (live app)
├─ Env vars in hosting dashboard (Vercel, etc.)
├─ SUPABASE_URL=https://prod.supabase.co
├─ SUPABASE_KEY=prod-key (different!)
└─ STRIPE_SECRET_KEY=sk_live_zzz (REAL money!)
```

Same code, different secrets at each stage. This is why environment variables exist.

---

### Part 2: Local Development Setup (`.env.local`)

**Step 1: Create a `.env.local` file**

In the root of your project:

```bash
# .env.local (this file is NEVER committed)

# Supabase
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Stripe (development mode)
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_123456
STRIPE_SECRET_KEY=sk_test_abcdef

# Your app's secrets
DATABASE_PASSWORD=dev-password-only
API_SECRET=dev-secret-only
```

**Step 2: In your code, access variables**

```typescript
// Next.js: access env vars server-side
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const stripeSecret = process.env.STRIPE_SECRET_KEY; // Only server-side!

// Next.js: access in client components (must start with NEXT_PUBLIC_)
const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY; // ✅ Safe
const secret = process.env.STRIPE_SECRET_KEY; // ❌ Won't work in browser
```

**Critical rule:** Variables starting with `NEXT_PUBLIC_` are visible to the browser. Never put secrets there.

```typescript
// ❌ WRONG — this will be visible in the browser
NEXT_PUBLIC_DATABASE_PASSWORD=my-secret-password

// ✅ RIGHT — only server-side
DATABASE_PASSWORD=my-secret-password
```

---

### Part 3: The `.gitignore` File (Your Safety Net)

**What's `.gitignore`?**

A file that tells git "never commit these files or folders." It's your last line of defense against accidentally uploading secrets.

**Your `.gitignore` should include (at minimum):**

```gitignore
# Environment variables (CRITICAL — never commit these)
.env
.env.local
.env.*.local
.env.production.local

# Dependencies
node_modules/
.pnp
.pnp.js

# Build outputs
.next/
dist/
build/
out/

# IDE settings (optional but recommended)
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*

# Testing
.coverage
.nyc_output

# Misc secrets
private/
secrets/
*.key
*.pem
```

**To verify `.gitignore` works:**

```bash
# See what git will commit
git status

# If .env.local appears in "Changes to be committed", YOU HAVEN'T SET .gitignore!
# Fix it immediately before pushing.
```

---

### Part 4: Common Third-Party APIs (And How NOT to Leak Them)

#### Supabase (Database & Auth)

```typescript
// .env.local
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...  // OK for browser
SUPABASE_SERVICE_ROLE_KEY=eyJ...      // NEVER send to browser

// server-side only
const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY  // ✅ Server-only
);
```

#### Stripe (Payments)

```typescript
// .env.local
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxx  // Safe for browser (test mode)
STRIPE_SECRET_KEY=sk_test_yyy               // NEVER send to browser

// Client-side (safe — public key only)
const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

// Server-side API route (private key)
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // ✅ Server-only
```

#### SendGrid / Twilio / Custom APIs

```typescript
// .env.local
SENDGRID_API_KEY=SG.xxx...  // NEVER visible to browser
TWILIO_AUTH_TOKEN=xxx...    // NEVER visible to browser

// ✅ CORRECT: call from server-side API route
// /app/api/send-email/route.ts
export async function POST(req: Request) {
  const { email } = await req.json();
  
  // Use secret key on server
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ to: email, ... }),
  });
  
  return response;
}

// ❌ WRONG: never do this in client-side code
// This exposes your API key to everyone!
const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
  headers: {
    'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`, // ❌ LEAKED!
  },
});
```

---

### Part 5: If You Accidentally Commit a Secret

**This will happen to someone.** Here's what to do:

#### Step 1: Recognize it
- GitHub sends an email: "Secret scanning detected a secret"
- OR you realize "Oh no, I just pushed `.env`"

#### Step 2: Rotate the key IMMEDIATELY
- Go to Supabase → Settings → API Keys → Regenerate
- Go to Stripe → Dashboard → API Keys → Revoke
- Go to SendGrid → Settings → API Keys → Delete
- Every service has a way to invalidate the old key

**Do not panic. Do not wait.** Rotation takes 5 minutes and makes the leaked key useless.

#### Step 3: Remove from git history (advanced)

The file is gone from your working directory, but the git history still contains it. Use:

```bash
# Install BFG (a tool to rewrite git history)
brew install bfg  # macOS
# or on Windows/Linux, download from https://rtyley.github.io/bfg-repo-cleaner/

# Clean the history
bfg --delete-files .env.local

# Force-push (only if you haven't shared this commit with others)
git reflog expire --expire=now --all
git gc --prune=now
git push --force-with-lease
```

**Warning:** Force-pushing rewrites history. Only do this on your own branches before merging to main.

#### Step 4: Prevention going forward
- Add a pre-commit hook (see Part 6)
- Double-check `.gitignore` before your first push
- Never ignore the GitHub secret scanning alert

---

### Part 6: Prevention: Pre-Commit Hooks

**What's a pre-commit hook?**

A script that runs *before* you commit, checking for common mistakes (like `.env` files or API keys).

**Setup (macOS/Linux):**

```bash
# Install git-secrets (catches accidental commits)
brew install git-secrets

# Enable it globally
git secrets --install ~/.git-templates/hooks
git config --global init.templatedir ~/.git-templates

# Add patterns to search for
git secrets --register-aws
git secrets --add-provider 'echo $HOME/.aws/credentials'
```

**Now, if you try to commit a file containing `sk_test_`, `pk_test_`, or AWS patterns, git will reject the commit:**

```bash
git add .env.local
git commit -m "Add env"

# Output:
# ❌ [ERROR] Matched one or more blacklisted patterns
# secret_key=sk_test_xxx  <-- Detected!
```

**Alternative on Windows:** Use GitHub's CodeQL or Dependabot secret scanning (built-in).

---

### Part 7: Production Environment Variables (Vercel)

**Local development:** You use `.env.local`  
**Production:** You use Vercel's dashboard

**How to set them in Vercel:**

1. Go to Vercel dashboard → Your project → Settings → Environment Variables
2. Add each variable:
   - Name: `SUPABASE_URL`
   - Value: `https://prod.supabase.co`
   - Environments: Production, Preview, Development
3. Click Save

**Three environments:**
- **Development** — secrets for local work
- **Preview** — secrets for preview deployments (feature branches)
- **Production** — live app secrets (real database, real Stripe account)

**Never paste secrets into git. Always use the dashboard.**

---

### Part 8: Validation (Ensure Secrets Are Present Before Running)

**Problem:** You deploy to production without setting env vars → app crashes with "undefined is not a function"

**Solution:** Validate on startup

```typescript
// lib/env.ts
export function validateEnv() {
  const required = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'STRIPE_SECRET_KEY',
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing environment variables: ${missing.join(', ')}`
    );
  }
}

// app/layout.tsx or _app.tsx
import { validateEnv } from '@/lib/env';

validateEnv(); // Fails immediately if vars are missing

export default function RootLayout({ children }) {
  return <html>{children}</html>;
}
```

---

### Part 9: API Design (Not Leaking Secrets Through APIs)

**Bad:** Building an API that requires the client to send your secret

```typescript
// ❌ DON'T DO THIS
// Client-side
const response = await fetch('/api/send-email', {
  method: 'POST',
  body: JSON.stringify({
    email: 'user@example.com',
    apiKey: process.env.SENDGRID_API_KEY, // ❌ EXPOSED!
  }),
});
```

**Good:** Client sends data, server uses its own secrets

```typescript
// ✅ DO THIS
// Client-side
const response = await fetch('/api/send-email', {
  method: 'POST',
  body: JSON.stringify({
    email: 'user@example.com',
    // No secret! Server already has it.
  }),
});

// Server-side (/api/send-email)
export async function POST(req: Request) {
  const { email } = await req.json();
  
  // Server uses its own secret (not from client)
  const result = await sendEmail(email, process.env.SENDGRID_API_KEY);
  return result;
}
```

**Pattern:** Client → Server (public request) → Third-party API (using server's secret)

---

### Part 10: Checklist Before You Push Code

- [ ] `.env.local` is in `.gitignore`
- [ ] No `.env` file in git status
- [ ] No hardcoded API keys in your code
- [ ] `NEXT_PUBLIC_*` variables only contain public keys (test mode Stripe, anonymous Supabase, etc.)
- [ ] Private API calls are server-side only (API routes, server actions)
- [ ] Pre-commit hook is installed and catching secrets
- [ ] Production environment variables are set in Vercel dashboard (not in code)

**Before first push:**
```bash
git status  # Make sure .env.local is NOT listed
git log -p --all -S 'sk_test_' # Make sure no Stripe keys in history
git log -p --all -S 'SUPABASE_KEY' # Make sure no Supabase keys in history
```

---

### Key Takeaways

- **`.gitignore` is your safety net** — list `.env.local` and never commit it
- **Environment variables separate secrets from code** — development, staging, and production each have their own
- **`NEXT_PUBLIC_*` is visible to browsers** — only put public keys there
- **Private API keys stay server-side only** — use API routes to call external services
- **If you leak a secret, rotate it immediately** — the old key becomes useless
- **Pre-commit hooks catch mistakes** — install git-secrets to prevent accidental commits
- **Set production secrets in Vercel** — never paste them into code or git

---

### Tools & References

- **git-secrets** — https://github.com/awslabs/git-secrets (pre-commit hook to catch secrets)
- **BFG Repo-Cleaner** — https://rtyley.github.io/bfg-repo-cleaner/ (remove secrets from git history)
- **GitHub Secret Scanning** — Built into all public repos; free for private repos too
- **Vercel Environment Variables** — https://vercel.com/docs/concepts/projects/environment-variables

