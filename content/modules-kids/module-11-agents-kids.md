# Module 11: AI Agents & Workflows 🤖

**Stage:** Advanced · **Level:** Intermediate/Advanced · **Duration:** ~5 hours · **XP:** 500

**What you need:** Modules 0-10

> **Why this matters:** You can use AI to automate parts of your app. Agents are AI that can do multi-step tasks by themselves. Workflows are sequences of tasks. This module teaches you to think in terms of automation.

## What You'll Learn

By the end of this module, you'll be able to:

1. **Understand AI agents** (AI that makes decisions)
2. **Build workflows** (multi-step processes automated)
3. **Automate repetitive tasks** with AI

---

## Lesson 11.1 — What's an Agent? (~30 min)

An agent is AI that can think through steps:

*"User wants to add a pet. Agent: 1) validate the input, 2) save to database, 3) send a notification."*

Instead of you coding each step, the agent figures it out.

In Claude Code, when you describe a complex goal and it figures out the steps to build it — that's agentic behavior.

---

## Lesson 11.2 — Agents in Your App (~45 min)

Example: Auto-generate pet care tips.

Agent: "User has a golden retriever. Based on that breed, AI generates: exercise recommendations, grooming tips, health checks."

Prompt Claude Code:

*"Add an 'AI Tips' feature. When a user views a pet, show AI-generated care tips based on the breed. Use Claude API to generate the tips."*

Claude Code builds it. The AI agent runs whenever needed.

---

## Lesson 11.3 — Workflows (~60 min)

A workflow is a series of steps that run in order:

1. User uploads a pet photo
2. AI recognizes the breed
3. App saves the pet
4. AI generates tips
5. Send email notification

Each step depends on the previous one.

Prompt Claude Code to build workflows. It handles the complexity.

---

## Activity: Add an Automated Feature 🤖

Add one of these to your pet tracker:

- Auto-generate care tips (AI based on breed)
- Weekly reminder emails
- Birthday notifications
- Auto-categorize by breed

---

## Quiz Questions (Preview)

Here are your three quiz questions. Study these!

**Q11-k1:** An AI agent is different from a function because:
- (a) It's Python
- (b) **The agent decides which steps to take (within a goal)** ✓
- (c) It never fails
- (d) It needs no code

*Why:* A function does exactly what you tell it to do (step 1, step 2, step 3 — always in the same order). An agent is smarter: you give it a goal and tools, and it decides the best steps to reach that goal. That's the power of agents!

**Q11-k2:** Why put AI calls behind a stable interface?
- (a) Make it slower
- (b) **Test it without real AI, swap models later without changing the app** ✓
- (c) Skip the AI
- (d) Avoid coding

*Why:* Behind an interface (like `generateTips()`), you can swap the AI implementation without breaking the rest of your app. In tests, you can use a fake version; in production, use the real AI. The app doesn't care—it just calls the interface!

**Q11-k3:** Before a big action (send money, delete data), the safest thing is:
- (a) Use more agents
- (b) **Have a human check/approve it first** ✓
- (c) Use a bigger AI model
- (d) Run it faster

*Why:* No guardrail beats human approval! If your agent is about to send an email, charge a card, or delete data, a human should review it first. AI can make mistakes—you're the final check.

---

## Knowledge Check (Quiz)

1. **What's the difference between a function and an agent?**
2. **Describe a workflow in your app.**
3. **How could automation improve your pet tracker?**

---

## Key Takeaways

- Agents = AI that makes decisions 🤖
- Workflows = multi-step processes
- Automation = faster, smarter apps
- Use Claude Code to build agentic features

**Next:** Module 12 — Production-Ready Code!
