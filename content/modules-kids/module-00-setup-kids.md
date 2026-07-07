# Module 0: Get Your Coding Gear Ready! 🎮

**Stage:** Getting Started · **Level:** Total Beginner · **Duration:** ~2 hours · **XP:** 100

**What you'll need:** A computer and internet connection. That's it!

> **Why this matters:** Setup is where people give up. We're gonna install everything once, test it all, and then you're ready to actually build stuff. Think of this like collecting all your gear before an adventure!

## What You'll Learn

By the end of this module, you'll be able to:

1. **Set up** all your coding tools (like getting your equipment ready for a quest)
2. **Understand** what each tool does and how they work together
3. **Test** everything to make sure it's working

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

## Lesson 0.2 — Install the Tools (~30 min)

### What is a Terminal? 💻

First things first: a **terminal** is a text-based way to talk to your computer. Instead of clicking buttons, you type commands. It's easier than it sounds — we'll just copy-paste commands.

**Mac:** Open Spotlight (Cmd+Space), type "Terminal", press Enter.
**Windows:** Press Win+R, type "powershell", press Enter.

---

**[SCREENSHOT PLACEHOLDER: Terminal Windows]**
Left: Mac Terminal open. Right: Windows PowerShell open. Both showing a command prompt ready for input.

---

### Installing Node.js

Node.js is the engine that runs your code on your computer.

**Step 1:** Go to [https://nodejs.org](https://nodejs.org)

**Step 2:** Download the **LTS version** (it's the safe, stable one). Click the big green button.

**Step 3:** Run the installer. Accept all the defaults.

**Step 4:** Open your Terminal (Mac) or PowerShell (Windows) and run:

```bash
node --version
npm --version
```

**You should see version numbers like `v22.12.0` and `10.5.0`.** If you see them, you're done! 🎉

**Troubleshooting:** If you see `command not found`, close the terminal completely and reopen it. If it still doesn't work, reinstall Node.

---

**[SCREENSHOT PLACEHOLDER: Node.js Version Output]**
Terminal showing `node --version` and `npm --version` commands with version numbers displayed.

---

### Installing Cursor

Cursor is your AI code editor. It's based on VS Code and super friendly.

**Step 1:** Go to [https://cursor.com](https://cursor.com)

**Step 2:** Click "Download" and pick your operating system (Mac or Windows).

**Step 3:** Run the installer. Follow the prompts.

**Step 4:** Open Cursor. You'll see a welcome screen. Click "Sign in with GitHub" (we'll set up GitHub next).

**Step 5:** Follow the sign-in flow. Done! ✅

### Installing Claude Code

Claude Code is your second AI buddy — it works in the terminal to help with bigger tasks.

**Step 1:** Go to [https://claude.com/download](https://claude.com/download) and follow the install for your OS (Mac or Windows).

**Step 2:** Open your Terminal/PowerShell and run:

```bash
claude --version
```

**You should see a version number like `0.5.2`.** If yes, you're done with this part.

**Step 3:** Sign in by running:

```bash
claude login
```

Follow the link, copy your API token from your Claude account, and paste it into the terminal. Now you're connected! 🔗

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

## Lesson 0.5 — Verify Everything Works (~25 min)

Time to prove everything works together! We're gonna create a tiny test app, verify it runs, then delete it. This proves the whole chain works.

**Step 1:** Open a Terminal/PowerShell and run:

```bash
npx create-next-app@latest my-test-app
```

Answer the prompts:
- "Would you like to use TypeScript?" → `No`
- "Would you like to use ESLint?" → `No`
- "Would you like to use Tailwind CSS?" → `Yes`
- Accept defaults for everything else

This takes 2-3 minutes. Wait for it to finish.

---

**[SCREENSHOT PLACEHOLDER: create-next-app Running]**
Terminal showing the `npx create-next-app@latest my-test-app` command with prompts and responses, ending with "✓ Created my-test-app" or similar success message.

---

**Step 2:** Start the app:

```bash
cd my-test-app
npm run dev
```

**You should see:**
```
▲ Next.js 16.2.10
- Local:         http://localhost:3000
```

**Step 3:** Open your browser and go to [http://localhost:3000](http://localhost:3000)

**You should see a Next.js starter page with a logo.** If yes, your setup works! 🚀

---

**[SCREENSHOT PLACEHOLDER: Cursor with Project Open]**
Cursor window showing the my-test-app project: left sidebar displays the file tree (app/, node_modules/, public/, etc.), main editor area visible, window title shows "my-test-app".

---

**Step 4:** Test the AI helpers:
- Open Cursor and click File → Open Folder → select `my-test-app`
- In Terminal, run `claude --version` — should show a version number
- Check that you're logged into GitHub, Supabase, and Vercel (just go to their websites)

**Step 5:** Clean up:
- Close the terminal (Ctrl+C to stop the app first)
- Delete the `my-test-app` folder (drag it to Trash)

**You're done!** 🎉

### Troubleshooting 🔧

**`command not found: npx`** — Node didn't install properly. Close terminal, reinstall Node, then reopen terminal.

**`create-next-app` takes forever** — It's slow on first run. That's normal. Give it 3-5 minutes.

**Port 3000 already in use** — Another app is using it. Either close that app or run:
```bash
npm run dev -- -p 3001
```

**Browser shows "Cannot connect"** — Make sure the terminal says "Local: http://localhost:3000" with no errors. Wait 10 seconds and refresh.

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

**Objective 3 — Verify everything works:**
- *Practical:* Screenshot of terminal showing all version checks passed (node, npm, claude). Screenshot of localhost:3000 showing Next.js starter page

---

## Key Takeaways

- You now have your full coding toolkit installed ✅
- Each tool has a job (some you'll use soon, some later)
- You tested everything and it all works 🎉
- You're ready to start building!

**Next:** Module 1 — How AI Actually Works (spoiler: it's simpler than you think!)
