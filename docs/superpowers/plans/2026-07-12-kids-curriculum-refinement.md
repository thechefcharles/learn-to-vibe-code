# Kids Curriculum Refinement Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mirror all critical and important curriculum refinement changes to the kids curriculum (Modules 0-15), with age-appropriate language, simpler examples, and shorter time budgets.

**Architecture:** Parallel mirrors of intermediate curriculum fixes. Each kids module gets the same pedagogical improvements but with: (1) simpler language (8th-grade reading level), (2) concrete examples (pet tracker, homework app), (3) shorter lessons (20-30% less time), (4) metaphors/analogies for younger learners, (5) less business jargon.

**Tech Stack:** Markdown modules (module-0X-*-kids.md files), same git workflow, no code generation needed.

## Global Constraints

- All kids modules use simpler vocabulary than intermediate versions
- Time budgets for kids lessons are ~20-30% shorter than intermediate equivalents
- All examples reference the pet tracker app (kids' running project) or homework helper
- Quiz questions must be age-appropriate (avoid corporate/business scenarios)
- Metaphors should be relatable to 11-17 year olds
- Same technical concepts as intermediate; just explained differently
- Module 14 (Brownfield) not included (kids end after Module 13 + capstone)

---

## CRITICAL FIXES FOR KIDS (Tasks K1-K5)

### Task K1: Module 3→4-5 Bridge (Kids Version)

**Files:**
- Modify: `/content/modules-kids/module-03-planning-kids.md` (Lesson 3.5 outro)
- Modify: `/content/modules-kids/module-04-building-kids.md` (Lesson 4.4 opening)
- Modify: `/content/modules-kids/module-05-building-claude-code-kids.md` (Lesson 5.4 example)

**Context:** The intermediate version bridges planning to building using learner's own spec. Kids version does the same but with simpler framing ("your pet tracker project" instead of "your invoice app").

- [ ] **Step 1: Add callout to Module 3 Lesson 3.5**

At end of Lesson 3.5, add:

```markdown
## Next: Use Your Plan in Module 4

You now have a plan for your pet tracker (or homework helper). In Module 4, you'll actually build it using Cursor. Open your plan and use it—this proves that planning works.
```

- [ ] **Step 2: Update Module 4 Lesson 4.4 opening**

Replace opening with:

```markdown
## Lesson 4.4 — Small Prompts, Big Features (~45 min)

**Use your pet tracker plan.** Open the plan you wrote in Module 3. You're about to build real features from YOUR plan—not just follow along with an example. This is where planning pays off.

The key: ask Cursor to build one small piece at a time, then check that it works before asking for the next piece.
```

- [ ] **Step 3: Add concrete example to Module 4 Lesson 4.4**

Add after overview:

```markdown
### Example: Your First Cursor Prompt

If your Module 3 plan was about showing all pets, your first prompt might look like:

```
Based on my pet tracker plan, I need to show all pets on the main page.

My data has: pet name, breed, age, and favorite food.

My page should show:
- A list of all pets
- Each pet's name, breed, and age
- A button to add a new pet

Please create types/pet.ts with the Pet type, then build app/page.tsx to show the list.
```

Use YOUR plan. Cursor will build exactly what you need.
```

- [ ] **Step 4: Update Module 5 Lesson 5.4 example**

In the example prompt context, add:

```markdown
Context: I finished planning my pet tracker. My plan says:
- Core features: list pets, add pets, delete pets, mark favorites
- Data: pet name, breed, age, favorite_food
- Stack: Next.js, TypeScript, Tailwind

Now I'm building the pet list feature based on my plan.
```

- [ ] **Step 5: Add knowledge-check question**

In Module 5 knowledge checks, add:

```markdown
**Q5-k7:** You finished planning your app in Module 3. Now in Module 5, what should you do?

a) Ask Claude Code to build whatever sounds fun
b) Paste your plan into Claude Code and reference it in your prompt
c) Build a generic pet app first, then change it later
d) Skip the plan—Claude Code will figure it out

**Correct:** b) — Your plan is Claude Code's roadmap. Use it!
```

- [ ] **Step 6: Commit**

```bash
git add content/modules-kids/module-03-planning-kids.md \
        content/modules-kids/module-04-building-kids.md \
        content/modules-kids/module-05-building-claude-code-kids.md
git commit -m "fix(module-kids-03,04,05): bridge planning to building with pet tracker example"
```

---

### Task K2: Module 7 SQL Primer (Kids Version)

**Files:**
- Modify: `/content/modules-kids/module-07-supabase-kids.md` (insert new Lesson 7.0, renumber subsequent lessons)

**Context:** Kids need to understand what a database table is, just simpler. Use pet data as the example (instead of clients/invoices).

- [ ] **Step 1: Create Lesson 7.0 for kids**

Insert at beginning of Module 7:

```markdown
## Lesson 7.0 — What's a Database? (Tables, Keys, and Rules) (~25 min)

Before you set up Supabase, know what you're doing.

### What's a Table?

A table is like a spreadsheet. Each row is one record.

Example: a "pets" table:

| id  | name    | breed     | age | favorite_food |
|-----|---------|-----------|-----|---------------|
| 1   | Bella   | Labrador  | 3   | Chicken       |
| 2   | Max     | Poodle    | 5   | Treats        |
| 3   | Luna    | Husky     | 2   | Salmon        |

Each pet gets a unique number (id). You use that to find it later.

### Why Primary Key?

The `id` is the primary key. No two pets have the same id. So when you say "show pet 1," it's always Bella.

### Why User ID?

In a real app with multiple people, each pet has a user_id. This says "this pet belongs to this person."

If you have 100 users with 5 pets each, you have 500 pets. User IDs separate them: "show me all pets where user_id = 1" gets only MY pets.

### What's Row-Level Security (RLS)?

RLS is a security rule: "you can only see your own data."

Example: User 1 can only see pets where user_id = 1. User 2 can only see their own pets. No peeking at each other's data.

Supabase enforces this automatically.

### The Pattern

Every app table follows the same pattern:

1. **id:** unique identifier (every pet gets a number)
2. **user_id:** who owns this (so User 1 can't see User 2's pets)
3. **Data columns:** what you actually care about (name, breed, age, food)
4. **RLS rule:** "you can only see rows where user_id = your ID"

That's it. Same pattern in every module.

### Knowledge Check

1. **Q7-0a:** "Why does every pet need a user_id?"
   - a) Supabase requires it
   - b) So the RLS rule can say "you can only see YOUR pets"
   - c) To track when it was created
   - d) To make the database bigger

   **Correct:** b) — user_id is how RLS knows which data is yours.

2. **Q7-0b:** "What does RLS mean?"
   - a) Really long sentences
   - b) A security rule: "you can only read/write your own data"
   - c) Rust language something
   - d) Reverse lookup system

   **Correct:** b) — RLS is the security guard: "is this your data? Yes? You can see it. No? Blocked."
```

- [ ] **Step 2: Renumber all subsequent lessons**

In the file, rename all lesson headings:
- 7.1 → 7.2 (Why you need a backend)
- 7.2 → 7.3 (Create a project & connect)
- 7.3 → 7.4 (Model your data)
- 7.4 → 7.5 (Replace mock data)
- 7.5 → 7.6 (Authentication & RLS)
- 7.6 → 7.7 (Configuration vs. secrets)
- 7.7 → 7.8 (Supabase vs. alternatives)

- [ ] **Step 3: Update module metadata**

Increase Module 7 duration: if currently X hours, increase by 0.5 hours (25 min lesson).

- [ ] **Step 4: Commit**

```bash
git add content/modules-kids/module-07-supabase-kids.md
git commit -m "feat(module-07-kids): add database fundamentals lesson (simpler version for kids)"
```

---

### Task K3: Module 6 Before-Screenshot (Kids Version)

**Note:** This task likely already completed in earlier kids curriculum work. **Verify:** Does module-06-design-ux-kids.md have references to plain-UI before-state screenshots?

If yes: ✅ **SKIP** (already done)  
If no: Apply same Task 3 approach from intermediate curriculum but reference `/public/figures/module-06-before-plain-ui-*` that were already created.

- [ ] **Step 1: Verify if already done**

```bash
grep -c "before.*plain.*ui\|plain.*ui.*before" content/modules-kids/module-06-design-ux-kids.md
```

If output > 0: already done, move to Task K4  
If output = 0: Add before-screenshot section to Module 6 Lesson 6.1 (kids version), referencing the same figures created for intermediate.

---

### Task K4: Module 1 Quiz Alignment (Kids Version)

**Files:**
- Modify: `/content/modules-kids/module-01-mindset-kids.md` (Quiz section)

**Context:** Same three concepts (how LLMs work, trust vs verify, LLM limits) but with kid-friendly scenarios (homework helper, pet app, video game mod).

- [ ] **Step 1: Replace vague quiz section**

In the Quiz section of Module 1 (kids), replace with:

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add content/modules-kids/module-01-mindset-kids.md
git commit -m "fix(module-01-kids): clarify quiz with explicit questions and pet/game examples"
```

---

### Task K5: Module 11 Agent Testing (Kids Version)

**Files:**
- Modify: `/content/modules-kids/module-11-agents-kids.md` (insert new Lesson 11.5a, renumber subsequent)

**Context:** Kids need to know agents need testing too, but with simpler examples. No pytest—just pseudocode or simple test descriptions that show the concept.

- [ ] **Step 1: Add Lesson 11.5a (Kids Version)**

Insert between current Lesson 11.5 and 11.6:

```markdown
## Lesson 11.5a — Make Sure Your Agent Works (~30 min)

An agent that crashes is worse than no agent. You need to test it.

### What to Test

1. **Happy path:** Agent works, returns right answer
2. **Oops path:** Tool fails (API timeout), agent handles it
3. **Infinite loop catch:** Agent doesn't loop forever

### Example: Pet Tips Agent

Recall your pet tips agent (from Lesson 11.3). Before you use it, test:

**Test 1: It works**
- You ask: "How do I train a Labrador?"
- Agent calls tools (look up breed, get tips)
- Agent returns helpful tips
- ✅ PASS: Agent did what it should

**Test 2: Tool fails, agent doesn't crash**
- Imagine the "look up breed" tool fails (timeout)
- Agent should NOT crash
- Agent should say "I couldn't look that up, but here are general training tips"
- ✅ PASS: Agent recovered

**Test 3: Agent stops**
- Agent is configured to loop max 5 times
- You ask a weird question
- Agent loops 5 times, then stops (doesn't loop forever)
- ✅ PASS: Agent respected the limit

### How to Test

Write it out:

```
Test 1: Happy Path
- Setup: Agent ready, breed lookup works
- Action: Ask "How do I train a Labrador?"
- Expect: Agent returns training tips
- Result: ✅ PASS

Test 2: Tool Fails
- Setup: Agent ready, breed lookup times out
- Action: Ask "How do I train a Labrador?"
- Expect: Agent recovers with general tips (doesn't crash)
- Result: ✅ PASS

Test 3: Loop Limit
- Setup: Agent configured with max 5 loops
- Action: Ask a complex question that could loop forever
- Expect: Agent stops after 5 loops
- Result: ✅ PASS
```

Before you ship your agent, run these tests. If all pass, your agent is ready.

### Knowledge Check

**Q11-5a (kids):** Your pet tips agent stops responding after 10 requests. What happened?

a) It crashed
b) It hit the loop limit and stopped (as designed)
c) The database is broken
d) Claude Code quit

**Correct:** b) — Loop limits protect you. Agents stop automatically so they don't run forever.
```

- [ ] **Step 2: Renumber subsequent lessons**

Rename all lessons after 11.5:
- 11.5 → 11.6
- 11.6 → 11.7

- [ ] **Step 3: Commit**

```bash
git add content/modules-kids/module-11-agents-kids.md
git commit -m "feat(module-11-kids): add agent testing lesson (simplified test scenarios)"
```

---

## IMPORTANT FIXES FOR KIDS (Tasks K6-K13)

### Task K6: Module 2 Multimodal (Kids Version)

**Files:**
- Modify: `/content/modules-kids/module-02-prompting-kids.md` (add 6th weak/strong prompt pair)

- [ ] **Step 1: Add multimodal example to hands-on activity**

In the "Prompt rewrite gauntlet," add 6th pair:

```markdown
### Weak Prompt 6: "My form looks bad"

**Strong Prompt 6:** "Here's a screenshot of my form [paste image]. The text is tiny, buttons are far apart, and the error message is invisible. Make it look nice: bigger text, closer buttons, red error text. Use shadcn/ui."

**Why it works:** Screenshot shows exactly what "bad" means. Claude fixes the real problem, not a guess.
```

- [ ] **Step 2: Commit**

```bash
git add content/modules-kids/module-02-prompting-kids.md
git commit -m "feat(module-02-kids): add multimodal prompting example to hands-on"
```

---

### Task K7: Module 4-5 Tool Switching (Kids Version)

**Files:**
- Modify: `/content/modules-kids/module-04-building-kids.md` (add Lesson 4.7)
- Modify: `/content/modules-kids/module-05-building-claude-code-kids.md` (add opening callout)

- [ ] **Step 1: Add Lesson 4.7 to Module 4 (kids version)**

After current Lesson 4.6, add:

```markdown
## Lesson 4.7 — Two Helpers: Cursor vs Claude Code (~20 min)

You've used Cursor. Next module uses Claude Code. When should you use which?

### Simple Rule

**Cursor:** One small change (fix a typo, change colors, update one component)  
**Claude Code:** Big feature (add 5 new pages, refactor everything, build something complex)

**Real example:**
- Fix a button color = Cursor (5 minutes)
- Build the entire pet creation page = Claude Code (20 minutes)

### The Answer

Use both. A real project needs both. The skill is knowing which tool for which job.

### Practice

Pick one thing from Module 4 (like styling the pet list). Redo it with Claude Code. Did it feel faster or slower? Easier or harder? Now you know your preference.
```

- [ ] **Step 2: Add opening callout to Module 5 (kids)**

At very start of Module 5, add:

```markdown
## Recap: Tool Choice

Module 4 used Cursor (in-editor, small changes).  
This module uses Claude Code (big features, orchestration).

**Simple rule:** Local = Cursor. Big = Claude Code. You'll use both for real projects.
```

- [ ] **Step 3: Commit**

```bash
git add content/modules-kids/module-04-building-kids.md \
        content/modules-kids/module-05-building-claude-code-kids.md
git commit -m "feat(module-kids-04,05): add tool-switching reflection (Cursor vs Claude Code)"
```

---

### Task K8: Module 8 Debugging (Kids Version)

**Files:**
- Modify: `/content/modules-kids/module-08-debugging-kids.md` (add learner-first intro, update knowledge check)

- [ ] **Step 1: Add intro text**

At beginning of Module 8, add:

```markdown
## Debugging: YOU First, AI Second

You own this. Claude can help, but YOU fix bugs.

**Pattern: Read → Test → Debug → Fix → Test again**

1. Read the error (understand what went wrong)
2. Test: make it fail on purpose (reproduce it)
3. Debug: change one thing, test it
4. Fix it for real
5. Test: make sure it's fixed

If Claude helps, that's step 4.5—you still do steps 1-4 yourself.
```

- [ ] **Step 2: Add/update knowledge check**

Add question:

```markdown
**Q8-k1:** You see an error: "pet.name is undefined."

What do you do first?

a) Ask Claude what's wrong
b) Read the error and find the line where pet.name is used
c) Delete the code and start over
d) Restart the app

**Correct:** b) — Read first. Understand the error. THEN decide if you need help.
```

- [ ] **Step 3: Commit**

```bash
git add content/modules-kids/module-08-debugging-kids.md
git commit -m "fix(module-08-kids): emphasize learner-first debugging approach"
```

---

### Task K9: Module 9 Merge Conflicts (Kids Version) [OPTIONAL]

**Note:** Collaboration scenarios might be advanced for kids. **Decision:** Include simplified version OR skip.

**Recommendation:** SKIP for MVP (kids version ends with Module 13, single-learner focus). Can add post-launch if kids take courses in groups.

---

### Task K10: Module 10 Auth Config (Kids Version)

**Files:**
- Modify: `/content/modules-kids/module-10-deploying-kids.md` (Lesson 10.5 auth section)

- [ ] **Step 1: Simplify walkthrough**

Replace vague auth instructions with 6-step walkthrough (simplified from 8-step intermediate):

```markdown
### Step 5: Tell Supabase Where Your App Lives

When you sign in, Supabase sends a link back to your app. If Supabase doesn't know your live URL, sign-in breaks.

1. Open your Supabase dashboard
2. Click **Authentication** on the left
3. Click **URL Configuration**
4. In **Site URL**, paste your Vercel URL (find it in your Vercel dashboard)
   - Example: `https://pet-tracker-abc123.vercel.app`
5. In **Redirect URLs**, add: `https://pet-tracker-abc123.vercel.app/auth/callback`
6. Click Save

Test: Go to your live URL, sign in, and it should work.

If it doesn't work:
- Check your Vercel URL matches the one you pasted
- Check the redirect URL ends with `/auth/callback`
```

- [ ] **Step 2: Commit**

```bash
git add content/modules-kids/module-10-deploying-kids.md
git commit -m "fix(module-10-kids): simplify Supabase auth walkthrough"
```

---

### Task K11: Module 12 Streamline (Kids Version)

**Files:**
- Modify: `/content/modules-kids/module-12-production-kids.md` (same streamline as intermediate)

**Context:** Kids version should focus on same 5-6 core production items (tests, error states, security, a11y, perf).

- [ ] **Step 1: Apply same streamline as intermediate**

Refer to Task 11 (intermediate). Apply same cuts to kids version:
- Remove academic patterns (Golden Fixtures, Tool Contracts)
- Consolidate to 5-6 core lessons
- Reduce from 8 hours to 6 hours
- Update metadata

- [ ] **Step 2: Commit**

```bash
git add content/modules-kids/module-12-production-kids.md
git commit -m "fix(module-12-kids): streamline to 6 hours, core production items only"
```

---

### Task K12: Module 13 Optional (Kids Version)

**Files:**
- Modify: `/content/modules-kids/module-13-automating-kids.md` (mark as optional)
- Modify: `/content/modules-kids/module-16-capstone-kids.md` (update rubric)

- [ ] **Step 1: Add framing to Module 13**

At top of module, add:

```markdown
## Module 13: Automation (Optional, After Capstone)

This module is **optional**. It's about automating your workflow with Claude Code.

**Why optional?** Your capstone doesn't need it. Ship first, automate later, is the right order.

**When to take it:** After your capstone, if you're building a lot and want to move faster.

**For now:** Focus on shipping your capstone. Come back to this module later if you want to level up.
```

- [ ] **Step 2: Update capstone rubric (kids version)**

Mark automation as optional/bonus in rubric (same as intermediate).

- [ ] **Step 3: Commit**

```bash
git add content/modules-kids/module-13-automating-kids.md \
        content/modules-kids/module-16-capstone-kids.md
git commit -m "refactor(module-13-kids): mark automation as optional, post-capstone"
```

---

### Task K13: Module 15 Reframe (Kids Version)

**Files:**
- Modify: `/content/modules-kids/module-15-tooling-kids.md` (add reassuring opening)

- [ ] **Step 1: Add reassurance opening**

At start of Module 15, add:

```markdown
## Module 15: Other Choices in Tech (Reinforcement, Not Doubt)

You've learned Next.js, Supabase, Tailwind, TypeScript, Vercel.

This module isn't saying "you chose wrong." It's saying "you chose well. Here's why, and what other choices exist for different problems."

### Your Stack

The stack you learned is **professional-grade**:
- ✅ Used by real companies
- ✅ Good for learning and shipping
- ✅ Scalable (from pet project to millions of users)
- ✅ Lots of tutorials and help

For your capstone: **stick with what you learned.** Don't second-guess.

If someday a project needs something else, you'll know what to look for. But for now, what you learned is solid.
```

- [ ] **Step 2: Reduce scenario alternatives**

If Module 15 has 5+ comparison scenarios, cut to 2-3:
- Example 1: "I need real-time collaboration" (Firebase alternative)
- Example 2: "I need a super simple site" (HTML/CSS/JS)

- [ ] **Step 3: Add reassuring knowledge check**

```markdown
**Q15-k1:** A friend says "You should have used Vue instead of React."

You:

a) Panic—you chose wrong
b) Agree, both work, but you'll stick with React for consistency
c) Rewrite everything in Vue
d) Give up on programming

**Correct:** b) — Both languages work. You chose React and learned it well. That's solid.
```

- [ ] **Step 4: Commit**

```bash
git add content/modules-kids/module-15-tooling-kids.md
git commit -m "fix(module-15-kids): reinforce confidence in learned stack, reduce doubt"
```

---

## Summary

**Total: 13 tasks** (5 critical + 8 important)  
**Note:** Task K9 (merge conflicts) marked SKIP for MVP (can add post-launch)

**Estimated effort:** 13-16 hours of focused work

**Commits:** ~13 focused, atomic commits (one per task)

**Outcome:** Kids curriculum fully aligned with intermediate refinements, age-appropriate language and examples, ready for launch.

---

## Execution Strategy

**Recommended:** Subagent-driven development (one agent per task, parallel where independent).

**Alternative:** Inline execution if preferred to stay in session.

---

## Next Steps

1. **Save this plan** to repository ✅ (already done)
2. **Execute tasks in order** (critical K1-K5, then important K6-K13)
3. **Use subagent-driven-development** for speed and quality gates
4. **Track progress** in SDD progress ledger
5. **Final whole-branch review** across all kids modules
6. **Merge to main** when all tasks complete and verified
