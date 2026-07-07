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

**Node.js:** The engine that runs your code.
- Go to [nodejs.org](https://nodejs.org), download the LTS version (it's the safe one)
- Open your Terminal (Mac) or PowerShell (Windows)
- Paste this to check it worked:

```bash
node --version
npm --version
```

You should see version numbers. Boom! 🎉

**Cursor:** Your first AI coding buddy.
- Download from [cursor.com](https://cursor.com)
- Install it like any app
- Sign in and take it for a spin

**Claude Code:** Your second AI buddy (works in the terminal).
- Install it and sign in
- Check it's working:

```bash
claude --version
```

You should see a version number!

---

## Lesson 0.3 — Create Your Accounts (~30 min)

Sign up for these three. Use the same email for all of them so you don't lose track:

- **GitHub** at [github.com](https://github.com) — your code's home
- **Supabase** at [supabase.com](https://supabase.com) — your app's power-up
- **Vercel** at [vercel.com](https://vercel.com) — your deployment launchpad
  - When you sign up for Vercel, connect it to GitHub (it makes things super easy later)

That's it! All free. 🎁

---

## Lesson 0.4 — About Costs (~15 min)

Good news: **everything you need is free!**

- Node.js, GitHub, Supabase, Vercel = all free for this course
- Cursor & Claude Code = free tier exists, paid tiers ($20/month) if you want more after the course

**Pro tip:** These tools track how much you use them. Check your usage dashboard every week so there are no surprises. (Usually there won't be!)

---

## Lesson 0.5 — Test Drive Everything (~25 min)

Let's make sure everything works together. You're gonna create a tiny "Hello, World!" app, then delete it. Just proving the chain works.

```bash
npx create-next-app@latest my-test-app
cd my-test-app
npm run dev
```

Open your browser to [http://localhost:3000](http://localhost:3000) — you should see a page! 🚀

Then sign in to Cursor, launch Claude Code in that folder, and check that you're logged into GitHub, Supabase, and Vercel.

Finally, close the terminal and delete the `my-test-app` folder. You're done with the test!

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
