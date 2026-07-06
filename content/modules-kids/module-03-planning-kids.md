# Module 3: Plan Before You Code! 📋

**Stage:** Foundations · **Level:** Beginner · **Duration:** ~4 hours · **XP:** 400

**What you need:** Modules 1-2 (know how AI thinks, know how to prompt)

> **Why this matters:** Coding fast is fun, but coding *without a plan* is chaos. This teaches you to plan *with* AI — use it as a thinking partner to figure out what you're building before you build it. A good plan saves you from writing code that doesn't fit together.

## What You'll Learn

By the end of this module, you'll be able to:

1. **Write** a spec for your app (what it does, who uses it, what's MVP)
2. **Turn** your spec into a technical plan (data model, screens, tasks)
3. **Order** your tasks so you build things in the right sequence

---

## Lesson 3.1 — Why Plan When AI Is So Fast? ⚡ (~30 min)

Sounds backwards, right? "But the AI can write code in seconds, why plan?"

Here's the thing: the faster you can code, the more it costs when you code the wrong thing.

The AI can make a screen in 10 seconds. But if you haven't thought about what data it needs, where it connects, or what "done" means, you'll end up with 10 screens that don't fit together. Then you spend hours fixing it.

**Planning isn't slowing you down — it's the context you'll give the AI later.** A good plan = good prompts = good code.

The rule: **Decide what you're building and in what order BEFORE you ask the AI to build it.**

---

## Lesson 3.2 — Build a Spec (What You're Making) (~60 min)

A spec is just a written description of what your app should do. You don't need fancy templates, just clarity.

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

---

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

---

**Watch out:** The AI will suggest features. It sounds smart. But *you* decide what's in the MVP, not the AI. You're the boss.

---

## Lesson 3.3 — Turn Your Spec Into a Technical Plan (~60 min)

Now you know *what* you're building. Time to figure out *how*.

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

---

## Lesson 3.4 — Order Your Tasks (Dependencies) (~45 min)

You can't build everything at once. Some tasks depend on others.

**Example order for homework tracker:**

1. ✅ Set up the database (can't save homework without this)
2. ✅ Build the form (can't add homework without this)
3. ✅ Build the list view (can't see homework without this)
4. ✅ Wire up the save button
5. ✅ Wire up done/delete buttons
6. ✅ Add reminders

Do them in order. Each one feeds into the next.

**Question:** Why not build step 4 before step 3? (Answer: because you need the list to see if saving worked!)

---

## Lesson 3.5 — Writing Your Plan as a Prompt (~45 min)

After all this planning, you have a document. That document becomes your AI prompt!

When you ask the AI to build something, hand it your spec and plan:

*"Build a homework tracker. Here's the spec [paste spec]. Start with task 1: set up a Supabase table with these fields: [list]. Return the SQL."*

Boom. The AI has all the context it needs. You get the right code first time because you told it exactly what you want.

---

## Activity: Plan Your Own Project 🎨

Pick a small idea (not huge):
- Pet tracker
- Book list
- Recipe saver
- Game idea tracker

Write a spec (answer the 5 questions). Then break it into 5-6 tasks in order. Submit both.

---

## Knowledge Check (Quiz)

1. **Why does planning matter when AI can code fast?** (Answer in your own words.)
2. **Write a 5-question spec for: "An app to track video games you want to play."**
3. **Break your app idea into tasks and put them in order. Why is the order important?**

---

## Key Takeaways

- Planning is the context you'll feed the AI later 📝
- A spec answers: problem, users, MVP, out-of-scope, success
- A technical plan shows: data, screens, tasks
- Order matters — some tasks depend on others
- Good plan + good prompt = good code first time 🎉

**Next:** Module 4 — Building in Cursor (Your First Real Project!)
