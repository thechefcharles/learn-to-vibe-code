# Module 1: How AI Actually Works (It's Simpler Than You Think!) 🤖

**Stage:** Foundations · **Level:** Beginner · **Duration:** ~4 hours · **XP:** 400

**What you need:** None yet — just your brain. We're learning how the magic actually works.

> **Why this matters:** AI is gonna be your coding buddy, so understanding how it thinks (and when it messes up) is huge. A lot of people think AI just "knows everything" — it doesn't! Understanding the real deal makes you way better at using it.

## What You'll Learn

By the end of this module, you'll be able to:

1. **Explain** how AI works and where it gets confused (even to your friends)
2. **Describe** what AI is good at and what it's bad at for coding
3. **Decide** when to trust AI vs. double-check it

---

## Lesson 1.0 — "Vibe Coding" Done Right 🎯 (~15 min)

You've probably heard the term "vibe coding" — it means using AI to code without really understanding what you're building. Just vibes. No checking. 

**That's the wrong way to do it.** 

In THIS course, we do "vibe coding done right": use AI to code *fast*, but stay in charge the whole time. You're the boss, the AI is your assistant. You tell it what to do, it suggests code, and then *you* read it and make sure it's good before it goes live.

**Golden Rule:** Never ship code you can't explain.

---

## Lesson 1.1 — What an AI Model Really Is (~45 min)

Imagine this: you've read **millions** of books, seen **millions** of code examples, and learned one skill: *what word comes next?*

That's basically what AI is. It's a super-smart autocomplete. You ask it something, and it predicts, one piece at a time, the answer that matches your question best.

**Example:** If you say "Write a function that adds two numbers," the AI doesn't look up the answer or think it through like a human would. It predicts: "Hmm, after 'function,' people usually write a name... then parameters... then the logic." And it pieces it together word by word.

**Why you need to know this:** The AI gives you the most *likely* answer based on patterns it learned. Most of the time, likely = correct. But not always. And knowing the difference? That's your superpower.

**Quick terms:**

- **Token** — a tiny piece of text (like a word or part of a word)
- **Prompt** — what you ask the AI (your message)
- **Context window** — how much text the AI can "see" at once (everything else is invisible)
- **Training data** — the millions of texts it learned from (it has a cutoff date; it doesn't know stuff after that date)

**Your turn:** In your own words, what's the ONE thing an AI does when writing code?

---

## Lesson 1.2 — How AI Writes Code (~45 min)

Here's the step-by-step:

1. **You type a prompt** — like "Write a function that checks if an email is valid"
2. **The AI reads your prompt** and predicts the next piece, then the next, then the next
3. **Each prediction depends on** what it learned *and* everything you just told it (your prompt, your conversation so far, any code you showed it)
4. **It stops** when it thinks the answer is done

**Two big takeaways:**

1. **Context is EVERYTHING.** If you don't tell the AI "I'm using React," it might guess wrong. Tell the AI *exactly* what you're working with, and it gets WAY better.

2. **It's random-ish.** Ask the AI the same question twice, you get two different answers. Both might be right, or one might be off. This is a feature (creativity!) and a bug (inconsistency!).

**Try this:** Ask an AI the same question twice and compare. Then tell it "I'm using TypeScript" and ask again. Watch how different the answers become. 🤯

---

**[SCREENSHOT PLACEHOLDER: Prompt Context Effect]**

**What this screenshot should show:**
- Left: A prompt like "Write a function to validate email" run in Claude/ChatGPT
- Middle: The same prompt run again, showing a **different output** (different code implementation)
- Right: The prompt run a third time with one added line: "We're using TypeScript and Next.js"
  - Shows how the output **changes significantly** based on context
- All three outputs visible for comparison
- **Proves:** context is everything; same question + different context = wildly different answers 🤯

---

## Lesson 1.3 — Where AI Gets Confused (~60 min)

This is the **most important lesson** because the AI fails in predictable ways. Know these, and you'll never get stuck:

**Hallucination:** The AI makes stuff up that sounds real.
- Example: "Use the `superSort()` function" — but `superSort()` doesn't exist. The AI sounds confident anyway.
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

---

**[SCREENSHOT PLACEHOLDER: Hallucination Example]**

**What this screenshot should show:**
- A prompt asking to use a specific library (e.g., "Use the 'fancyString' library to validate email")
- AI response that confidently uses `fancyString.validate()` or similar
- **Key proof:** Show that 'fancyString' library does NOT actually exist
  - Screenshot of npm.org search showing no results
  - OR a terminal showing "npm install fancyString" → "404 not found"
- **Shows:** AI invented a plausible library that doesn't exist, with TOTAL confidence
- **Lesson:** Even when AI sounds 100% sure, it might be hallucinating 🚨

---

## Lesson 1.4 — What AI Is Good At vs. Bad At (~45 min)

Not all coding tasks are equal. Some are perfect for AI, some need more of your brain:

| Task | How AI Helps | How Much to Trust |
| --- | --- | --- |
| Planning (breaking a project into steps) | Brainstorm with you, organize tasks | HIGH — easy to check |
| Writing code | Generate functions, boilerplate, components | MEDIUM — you gotta read it |
| Debugging (fixing broken code) | Suggest what's wrong, try fixes | MEDIUM — check if it works |
| Learning (explaining something) | Explain code or concepts | MEDIUM — double-check facts |
| Security & passwords | Spot vulnerabilities, secure stuff | LOW — always check, big stakes! |

**The pattern:** Harder to check = more you should verify.

Drafting a plan? Skim it and move on. Handling passwords? Read every line. 🔒

---

## Lesson 1.5 — Trust or Verify? (Making the Call) (~45 min)

This is the real skill: knowing when to trust AI and when to double-check.

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

---

## Activity: Spot the AI Mistake! 🎯

Here are 3 code snippets an AI gave me. For each one, decide:
- ✅ **TRUST** — use it as-is
- ⚠️ **VERIFY** — check this first
- 🚨 **WRONG** — don't use this

Then check the answer key below!

---

**Snippet 1** — Request: "Validate an email using regex"

```javascript
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

**Your call:** ✅ TRUST / ⚠️ VERIFY / 🚨 WRONG?

---

**Snippet 2** — Request: "Check if a password is strong using a library"

```javascript
const PasswordValidator = require('passwordStrength-pro');

const validator = new PasswordValidator({
  minLength: 12,
  requireSymbols: true,
  requireNumbers: true,
});

function checkPassword(pwd) {
  return validator.isStrong(pwd);
}
```

**Your call:** ✅ TRUST / ⚠️ VERIFY / 🚨 WRONG?

---

**Snippet 3** — Request: "Create a React component using Hooks"

```javascript
import React from 'react';

class UserProfile extends React.Component {
  render() {
    return <div>User Profile</div>;
  }
}

export default UserProfile;
```

**Your call:** ✅ TRUST / ⚠️ VERIFY / 🚨 WRONG?

---

### Answer Key 🔑

**Snippet 1:** ✅ **TRUST** — standard regex pattern, widely used, easy to test locally. Confidence: HIGH.

**Snippet 2:** ⚠️ **VERIFY** — the library `passwordStrength-pro` **doesn't exist on npm**. The AI hallucinated a plausible library name! When you try to `npm install` it, you get "404 not found." **This is the hallucination failure mode in action.** Confidence: NONE until verified.

**Snippet 3:** ⚠️ **VERIFY** — it works, but it's outdated. Modern React uses **functional components + Hooks**, not class components. This is the "outdated knowledge" failure mode. The AI gave you last year's pattern. Confidence: MEDIUM, but needs modernization.

---

**The lesson:** AI sounds confident about all three. But Snippet 2 is invented, and Snippet 3 is old. **Your job is to catch this, not the AI's job to warn you.** That's why you verify. 🔍 

---

## Quiz: What You Should Know About AI

**Learning Objective Alignment:** 3 questions, one per objective. Pass = all 3 correct.

### Q1-k1: How AI Actually Works (Objective 1)

You ask Claude: "What's my favorite pet's name?"

Claude doesn't look up your pet. Claude guesses the next word based on patterns it learned from training. So Claude might say "Fluffy" because that's a common pet name.

How did Claude decide to say "Fluffy"?

a) It looked it up in a database
b) It predicted the most likely next word based on patterns, one word at a time
c) It read your mind
d) It asked the internet

**Correct:** b) — Claude predicts next words. It doesn't know YOUR pet, but it knows "Fluffy" is a common pet name, so it guesses that.

---

### Q1-k2: Trust or Test? (Objective 2)

You ask Claude: "Write code to add two numbers."

Claude returns:
```python
def add(a, b):
    return a + b
```

Should you:

a) Trust it and use it—Claude knows Python
b) Test it by running it to make sure it works
c) Assume it's wrong because AI makes mistakes
d) Rewrite it from scratch

**Correct:** b) — Code is concrete (works or doesn't). Test it. Takes 10 seconds and proves it's right.

---

### Q1-k3: What AI Can't Do (Objective 3)

You ask Claude: "Write code to detect if a photo is a dog or cat."

Claude writes code. But it fails sometimes—sometimes it says "dog" when it's a cat, and vice versa.

Why did Claude fail?

a) Claude is bad at programming
b) Telling AI to do something hard (recognizing animals) is tough. It will make mistakes on edge cases.
c) You should use a different AI
d) AI is useless

**Correct:** b) — Some problems are hard. AI can write code that works 90% of the time, but edge cases exist. Your job is to test it and improve it.

---

**Passing:** All 3 correct. If you get 2/3, revisit the module before moving on.

---

## Tools & Alternatives (This Module)

**This module is tool-agnostic on purpose.** The concepts (how LLMs work, why they fail, when to trust/verify) apply to **any** AI coding assistant — Cursor, Claude Code, GitHub Copilot, ChatGPT, and others.

You haven't installed anything yet. That happens in Module 4. The goal here: understand *how AI thinks* so you can use it wisely, no matter which tool you pick later.

**Key idea:** the same mental model works everywhere. Once you get hallucination, you spot it in any tool.

---

## Key Takeaways

- AI is super-smart autocomplete, not magic 🤖
- It predicts likely text, but likely ≠ always correct
- It messes up in predictable ways (hallucination, outdated knowledge, forgetfulness)
- Match how much you verify to how risky the task is
- **You're the coder. AI is your sidekick.**

**Next:** Module 2 — Talking to AI Like a Pro (Prompt Engineering!)
