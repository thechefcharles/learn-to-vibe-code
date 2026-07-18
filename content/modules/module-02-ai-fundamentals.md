# Module 2: AI Fundamentals & How Models Actually Work

**Stage:** Foundations · **Level:** Beginner · **Duration:** ~4 contact hours (0.4 CEU)

**Prerequisites:** None. This is the entry point — no coding experience assumed.

> This module builds the mental model everything else rests on. Learners who skip "how the model actually works" over-trust AI output later and get stuck. The goal isn't to code yet — it's to understand the tool well enough to use it wisely.
> 

## Learning objectives

By the end of this module, the learner can:

1. **Explain** in plain terms how LLMs generate code and where they fail (hallucination, context limits, outdated knowledge). *(Understand)*
2. **Describe** the capabilities and limits of AI coding assistants across the development lifecycle. *(Understand)*
3. **Judge** when to rely on AI output vs. verify it manually for a given task. *(Evaluate)*

---

## Lesson 2.0 — What "vibe coding" really means (done well) (~15 min)

Open by reclaiming the term. "Vibe coding" was originally coined for a hands-off style — accept whatever the AI produces, don't read the code, just go with the vibes. That's fine for a throwaway toy, but it's the *opposite* of what this course teaches, and it's exactly why skeptics dismiss AI coding.

**This course teaches vibe coding done well:** move fast with AI *and* stay in control. You direct, the AI drafts, and you read, test, and understand everything before it ships. Same speed, none of the recklessness. The single rule that separates the two, and runs through every module: **you are the engineer; the AI is the assistant — never ship what you can't explain.**

---

## Lesson 2.1 — What an LLM actually is (~45 min)

A large language model (LLM) is a program trained on an enormous amount of text — books, websites, documentation, and billions of lines of code. From all that text it learned one core skill: **given some text, predict what comes next.**

That's it. It's a very sophisticated autocomplete. When you ask it to "write a function that sorts a list," it isn't looking the answer up or reasoning like a human engineer — it's predicting, one piece at a time, the sequence most likely to follow your request, based on patterns it saw in training.

**Why this matters:** the model produces the *most likely* answer, not the *verified correct* one. For common problems, likely and correct usually match — which is why it feels magical. But they're not guaranteed to, and knowing the difference is the single most important idea in the course.

**Key terms (plain-English glossary):**

- **Token** — the small chunk of text the model reads and writes (roughly a word or part of one).
- **Prompt** — the input you give the model (your request plus any context).
- **Context window** — the model's working memory, measured as a token budget (prompt + response). It's large — modern models hold hundreds of thousands of tokens, enough for many files at once — but finite, and everything outside it is invisible. More tokens in the window also means more cost per request, so it's a budget you spend, not free space.
- **Training data** — the text the model learned from. It has a cutoff date; the base model doesn't inherently *know* anything newer. (Agentic tools like Claude Code and Cursor get around this by retrieving current info through tools — more on that in Lesson 2.3.)

**Quick check:** In your own words, what is the one thing an LLM is fundamentally doing when it writes code?

---

## Lesson 2.2 — How an LLM generates code (~45 min)

Walk through what happens when you ask for something:

1. **You write a prompt** — e.g. "Write a Python function that checks if an email is valid."
2. **The model reads it as tokens** and predicts the next token, then the next — building the answer left to right.
3. **Each prediction is shaped by** the patterns it learned *and* everything currently in the context window (your prompt, the conversation, any code you shared).
4. **It stops** when it predicts the response is complete.

Two consequences fall out of this mechanism:

- **Context is everything.** The model only knows its training + what's in the context window right now. If you don't tell it your app uses Next.js and Supabase, it guesses — often wrongly. Good context is why prompt engineering (Module 3) is a real skill.
- **It's probabilistic, not deterministic.** Ask twice, get two different answers. At each step the model picks from a range of likely next tokens rather than always the single most likely one — a randomness controlled by a setting called *temperature* (higher temperature = more varied, "creative" output; lower = more predictable). That sampling is why neither response is "the" answer; both are plausible completions. A feature (creativity) and a risk (inconsistency).

---

[SCREENSHOT: The same email-validation prompt run three times — twice unchanged (two different outputs), then once with "We're using TypeScript and Next.js" added, showing how context reshapes the answer.]

---

## Lesson 2.3 — Where LLMs fail (~60 min)

The most important lesson in the module. Because the model outputs *likely* text, it fails in specific, predictable ways — teach learners to name each:

- **Hallucination** — invents things that look right but aren't: a function or library that doesn't exist, a made-up parameter, a plausible-but-false explanation, stated with total confidence. *Confidence is not correctness.*
- **Outdated knowledge** — the base model's training has a cutoff, so on its own it may not know a library's newest version or a breaking change, and will present an older approach as if current. Agentic tools (Claude Code, Cursor) can offset this by reading current docs, files, and the web through tools — but only when you prompt them to; left to the raw model, assume its knowledge is frozen at the cutoff.
- **Context limits** — anything outside the window is invisible; in a big codebase it may reinvent what already exists.
- **Lost detail in long chats** — earlier instructions fall out of view; it "forgets" a constraint you set 30 messages ago.
- **Confident wrong answers** — the through-line: the model has no built-in sense of certainty and rarely says "I'm not sure" unless asked.

**The takeaway:** these aren't bugs to fix — they're inherent to how the technology works. A skilled AI-assisted developer *expects* them and has habits to catch them. That habit is verification (Lesson 2.5).

---

[SCREENSHOT: An AI confidently calling a made-up library (e.g. fancyString.validate()) beside an npm search returning no such package — hallucination caught in the act.]

---

## Lesson 2.4 — AI across the development lifecycle (~45 min)

AI helps at every stage — but how much you should trust it varies. Introduce this map (used in every later module):

| Stage | How AI helps | Trust level |
| --- | --- | --- |
| Planning & specs | Brainstorm, draft specs, break work into tasks | High — easy to review, low risk |
| Writing code | Generate functions, components, boilerplate | Medium — must read and test it |
| Debugging | Explain errors, suggest fixes | Medium — verify the fix is correct |
| Learning / explaining | Explain unfamiliar code or concepts | Medium — cross-check facts |
| Security & production | Suggest hardening, spot issues | Low — always verify; stakes are high |

The pattern: **the higher the stakes and the harder it is to eyeball correctness, the more you verify.** Drafting a spec? Skim and move on. Deploying auth to production? Check everything.

---

## Lesson 2.5 — When to trust vs. verify (~45 min)

This delivers Objective 3 — judgment. A simple framework for any AI output:

**Trust more freely when:** the task is common and well-documented; you can immediately test it; the cost of being wrong is low (a throwaway script).

**Verify carefully when:** it involves a specific/newer tool or version (outdated-knowledge risk); it references a library/function you can't confirm exists (hallucination risk); the output is long or spans many files (context-limit risk); the stakes are high (security, payments, data, production).

**How to verify (the beginner's toolkit):** run the code; read it line by line and ask the AI to explain anything unclear; confirm referenced libraries/functions exist in the official docs; test edge cases, not just the happy path.

> **Guiding principle for the whole course:** *You are the engineer; the AI is the assistant.* You stay accountable for every line you ship, whether you typed it or the model did.
> 

---

## Hands-on activity (~30 min, folded in)

**"Catch the hallucination."** Learners get three AI-generated snippets (instructor-provided): one works, one references a nonexistent library, one uses an outdated approach. They decide for each: *trust, or verify further — and why?*, then check the answer key. Rehearses Objective 3.

**Snippet 1 (CORRECT):**
```javascript
// Request: "Validate an email using regex"
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```
**Verdict:** TRUST — standard regex pattern, widely used, easy to test locally.

**Snippet 2 (HALLUCINATION):**
```javascript
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
```
**Verdict:** VERIFY FIRST — 'passwordStrength-pro' doesn't exist on npm. AI hallucinated a plausible library name.

**Snippet 3 (OUTDATED):**
```javascript
// Request: "Create a React component using Hooks"
import React from 'react';

class UserProfile extends React.Component {
  render() {
    return <div>User Profile</div>;
  }
}

export default UserProfile;
```
**Verdict:** VERIFY — Works, but non-idiomatic. Modern React has favored functional components + Hooks since around 2019; class components still run but are no longer the pattern new code is written in. The request even asked for Hooks, which class components can't use — so the AI returned an outdated style that doesn't match what was asked.

---

**Learner Task:** For each snippet, decide: **TRUST** (use as-is) or **VERIFY** (check first) — and one sentence why.

**Answer Key (after learners attempt):**
1. TRUST — standard pattern, testable, no exotic dependencies
2. VERIFY — library doesn't exist (hallucination risk)
3. VERIFY — works but outdated (outdated-knowledge risk)

---

## Quiz: Judgment About AI

**Learning Objective Alignment:** Each question tests one objective. Pass = all 3 correct.

### Q2-1: How LLMs Work (Objective 1 — Explain how LLMs generate output and where they fail)

You ask Claude: "List 5 dog breeds." Claude returns: Labrador, Golden Retriever, Beagle, Dachshund, Poodle.

How did Claude generate this list?

a) It looked up a database of dog breeds and selected 5 random ones
b) It predicted the most likely next words based on patterns in training data, one word at a time
c) It retrieved the answer from the internet
d) It used a pre-written list of dog breeds

**Correct answer:** b) — Claude predicts next words sequentially. It's not looking up facts; it's guessing what words usually follow "dog breeds" based on statistical patterns in training data. This is why Claude can *sound* confident but be wrong.

---

### Q2-2: When to Trust vs. Verify (Objective 3 — Judge when to rely on AI output vs. verify it)

You ask Claude to write a SQL query to count users created in the last 7 days. Claude returns:

```sql
SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '7 days';
```

Should you:

a) Trust it and ship it—Claude knows SQL
b) Test the query on your database to verify it works on your actual data
c) Assume it's wrong because Claude sometimes makes mistakes
d) Rewrite it from scratch to be safe

**Correct answer:** b) — SQL is concrete (either works or doesn't). Test it. Verification is fast and proves it's correct. Don't blindly trust; don't blindly distrust. Test.

---

### Q2-3: LLM Limits & Trade-offs (Objective 2 — Describe the capabilities and limits of AI assistants)

You're building an app that imports CSV files and parses them. The CSV format varies by client (different columns, different orders). You ask Claude to build a parser that handles any CSV.

Claude writes a parser that handles the common cases but fails on edge cases (empty rows, quoted commas, Unicode).

What's the problem?

a) Claude is bad at programming
b) Claude did its best, but parsing arbitrary CSVs is a hard problem with lots of edge cases. No single "smart" parser handles all formats.
c) You should use a different AI model
d) CSV parsing is too easy—Claude shouldn't have failed

**Correct answer:** b) — Claude can generate *usable* code, but perfect code for ambiguous problems (like "parse any CSV") is unrealistic. The edge cases are real. Your job is to recognize that, test the parser, find the edge cases, and fix them. Claude's not magic; it's a tool with limits.

---

**Verification note:** Before shipping, learners should be able to explain: (1) how Claude generates output (tokens, patterns, not facts), (2) when to verify vs. trust (concrete outputs: verify; creative outputs: evaluate for quality), (3) the base model's limits and how tools change them — the raw model can't handle every edge case perfectly, doesn't *know* facts past its training cutoff, and doesn't learn from one conversation to the next; agentic tools (Claude Code, Cursor) can pull in current info by reading the web, files, and docs, so freshness comes from *retrieval*, which is exactly why you still verify what it pulled.

**What counts as passing:** All 3 questions correct. If a learner gets 2/3, they haven't internalized judgment yet—they should revisit the module before moving on.

---

## Tools & alternatives (this module)

Tool-agnostic on purpose — the concepts apply to **any** AI coding assistant (Cursor, Claude Code, GitHub Copilot, and others). Learners install nothing yet; the default stack goes hands-on in Module 5. The same model can power different tools, so what you learn here about *how models behave* transfers everywhere.

---

## Key takeaways

- Vibe coding done well = fast *and* in control; never ship what you can't explain.
- An LLM predicts likely text; likely ≠ guaranteed-correct.
- Context is everything; the model only knows its training + the context window.
- Failures (hallucination, outdated knowledge, context limits, confident wrong answers) are inherent — expect them.
- Match verification effort to the stakes and how well-trodden the task is.