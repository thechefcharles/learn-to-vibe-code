# Curriculum Refinement Plan: Fix Critical & Important Issues

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 5 critical issues and 10 important issues from the comprehensive curriculum audit to bring the intermediate course to 95/100 launch-readiness.

**Architecture:** Fixes organized by module and severity. Critical issues fixed first (unblock launch), then important issues (polish before release). Each task is one self-contained module update with clear entry/exit criteria.

**Tech Stack:** Markdown modules (module-NN-*.md), git commits, no code generation needed (content-only fixes).

## Global Constraints

- All fixes in `/content/modules/module-NN-*.md` (intermediate version only)
- Preserve existing lesson numbers and learning objectives unless explicitly reordering
- Each commit must be atomic (one logical fix per commit)
- No changes to quiz answer keys (server-side only) — only quiz preview text in modules
- Maintain consistency with Module 0.7 (repo vs Notion) and the automation-first pedagogy
- All cross-module links must be updated if lessons are renumbered or moved
- Estimated total: 15 tasks, 15-20 hours, ~15 commits

---

## CRITICAL FIXES (Blocks Launch)

### Task 1: Fix Module 3 → 4-5 Connection (Spec → Build Loop)

**Files:**
- Modify: `/content/modules/module-04-building-in-cursor.md` (Lesson 4.4 intro)
- Modify: `/content/modules/module-05-building-in-claude-code.md` (Lesson 5.4 intro + example)
- Modify: `/content/modules/module-03-planning-with-ai.md` (Lesson 3.5 outro, link to 4-5)

**Interfaces:**
- Consumes: Module 3 outputs (spec.md, data-model.md, build-order.md from learner's project)
- Produces: Explicit prompt templates in Modules 4-5 that reference Module 3 artifacts

**Context:** The course teaches "plan before you build" but doesn't prove it by having learners use their own plans. This task adds explicit references to Module 3 spec in Modules 4-5 so the loop closes.

- [ ] **Step 1: Read Module 3 Lesson 3.5 current ending**

Navigate to `/content/modules/module-03-planning-with-ai.md` and find Lesson 3.5. Note the current conclusion.

- [ ] **Step 2: Add callout to Module 3 Lesson 3.5 linking to Module 4**

At the end of Lesson 3.5, add:

```markdown
## Next: Use Your Plan in Module 4

You now have a spec, data model, screens, and build order. In Module 4, you'll use these directly. When Module 4 asks you to build features, you'll open your spec and reference it—this is the proof that planning works.
```

- [ ] **Step 3: Read Module 4 Lesson 4.4 current opening**

Navigate to `/content/modules/module-04-building-in-cursor.md`, find Lesson 4.4 ("Incremental prompts for cohesive edits"). Read the current opening paragraphs.

- [ ] **Step 4: Update Module 4 Lesson 4.4 opening to reference Module 3 spec**

Replace the opening paragraph with:

```markdown
## Lesson 4.4 — Incremental Prompts for Cohesive Edits (~45 min)

**Use your Module 3 spec.** Open the spec.md and screens.md you created in Module 3. You're about to build real features from your own plan—not a generic example. This proves that planning works.

The key: break a feature into small, focused prompts. Instead of "build the clients feature all at once," you'll ask Cursor to:
1. Create the types
2. Create the list view
3. Create the detail view
4. Wire it together

This is incremental building: each prompt is focused, and you review the diff between prompts.
```

- [ ] **Step 5: Add concrete example referencing learner's own plan**

In Lesson 4.4, after the overview, add a callout:

```markdown
### Example: Your First Cursor Prompt (Based on Your Plan)

If your Module 3 plan has a "clients" feature, your first Cursor prompt might look like:

```
Based on my spec (your project brief), I need to build a clients management page.

From my data model, clients have: id, name, email, phone, created_at, user_id.
From my screens, the clients page should show:
- A table of all clients
- A button to create a new client
- Options to edit/delete each client

Please create types/client.ts with the Client type, then build app/clients/page.tsx as a table using shadcn/ui and TypeScript.
```

Use your *own* spec, data model, and screen descriptions. Cursor will build to your requirements, not a generic example.
```

- [ ] **Step 6: Read Module 5 Lesson 5.4 current opening**

Navigate to `/content/modules/module-05-building-in-claude-code.md`, find Lesson 5.4 ("Orchestrate a multi-file build end to end"). Read the current example.

- [ ] **Step 7: Update Module 5 Lesson 5.4 example to explicitly reference Module 3**

In the "Context:" section of the example prompt, add:

```markdown
Context: I completed Module 3 planning. My spec says the app is [your app name], built on [your stack choice], with these core features: [your features from your feature list]. My data model includes [your tables]. My build order is [your sequence].

Now I'm building the [next feature] feature based on my plan.
```

- [ ] **Step 8: Add knowledge-check question linking Modules 3-5**

In the knowledge checks section of Module 5, add a new question:

```markdown
**Q5-7 (Module 3 → 5 connection):**
You finished Module 3 planning and created spec.md. You're starting Module 5. 
What should you do first?

a) Ask Claude Code to build whatever sounds interesting
b) Paste your spec.md into Claude Code and reference it in your prompt
c) Build a generic invoice app first, then customize later
d) Skip the spec—Claude Code doesn't need context

**Correct:** b) — your spec is Claude Code's context. Use it.
```

- [ ] **Step 9: Commit**

```bash
git add content/modules/module-03-planning-with-ai.md \
        content/modules/module-04-building-in-cursor.md \
        content/modules/module-05-building-in-claude-code.md
git commit -m "fix(module-03,04,05): bridge planning to building—use Module 3 spec in Modules 4-5 prompts"
```

---

### Task 2: Add SQL/Postgres Primer Before Module 7

**Files:**
- Modify: `/content/modules/module-07-supabase-data.md` (insert new Lesson 7.0)
- Renumber subsequent lessons: 7.1→7.2, 7.2→7.3, 7.3→7.4, 7.4→7.5, 7.5→7.6, 7.6→7.7

**Interfaces:**
- Produces: Clear definitions of table, primary key, foreign key, row-level security (RLS)
- Consumes: Nothing new; sets up knowledge for Lessons 7.2-7.7

**Context:** Module 7 jumps straight to migrations and RLS policies without teaching what a table or key is. Learners can paste SQL but can't debug or adapt it. This lesson teaches the concepts first.

- [ ] **Step 1: Read current Module 7 Lesson 7.1**

Navigate to `/content/modules/module-07-supabase-data.md`. Note the current Lesson 7.1 ("Why Supabase?" or whatever it is).

- [ ] **Step 2: Create Lesson 7.0: "Database Tables, Keys, and Security" (~30 min)**

At the beginning of Module 7, before the current Lesson 7.1, insert:

```markdown
## Lesson 7.0 — Database Tables, Keys, and Security (~30 min)

Before you write SQL or see RLS policies, understand the pieces.

### What's a Table?

A table is an ordered collection of rows. Each row is a record. Think: a spreadsheet where each row is an entry.

Example: a "clients" table might look like:

| id  | name       | email            | user_id |
|-----|------------|------------------|---------|
| 1   | Alice Corp | alice@example.com | uuid-1  |
| 2   | Bob Inc    | bob@example.com  | uuid-2  |
| 3   | Charlie Co | charlie@...      | uuid-1  |

Each column has a type: `id` is a number (integer), `name` is text, `email` is text, `user_id` is a UUID.

### What's a Primary Key?

A primary key is a column (or columns) that uniquely identifies each row. No two rows can have the same primary key.

In the example above, `id` is the primary key. Alice's record has `id=1`, Bob's has `id=2`, etc. You never have two `id=1` rows.

**Why?** So you can say "give me row 1" and get exactly one answer. Without a primary key, "row 1" might be ambiguous.

### What's a Foreign Key?

A foreign key is a column in one table that references the primary key of another table. It's how tables relate.

Example: an "invoices" table might have:

| id  | client_id | amount | user_id |
|-----|-----------|--------|---------|
| 1   | 1         | $100   | uuid-1  |
| 2   | 1         | $200   | uuid-1  |
| 3   | 2         | $50    | uuid-2  |

`client_id` is a foreign key—it references the `id` in the clients table. Invoice 1 belongs to client 1 (Alice Corp).

**Why?** So you can link data across tables. Instead of repeating "Alice Corp" in every invoice, you store client_id=1 and say "look up client 1 to find the name."

### What's Row-Level Security (RLS)?

RLS is a default-deny policy: no one can read or write to a table unless a policy explicitly allows it.

**Without RLS:** If your app has users, they can see each other's data by default. User 2 can read User 1's invoices just by changing the URL.

**With RLS:** Each row has a `user_id`. A policy says "you can only read rows where user_id = your logged-in user_id." So User 2 can only read their own invoices.

Example RLS policy:

```sql
CREATE POLICY "users can read their own invoices"
ON invoices
FOR SELECT
USING (auth.uid() = user_id);
```

This means: "Allow SELECT on invoices only if the current logged-in user's ID matches the row's user_id."

**Why?** Security. Without it, one user could read/write/delete other users' data. RLS is the enforcement mechanism—the database itself refuses to return rows that don't pass the policy.

### The Pattern

Every data table in your app should follow this pattern:

1. **Primary key** (`id`): unique identifier for the row
2. **Foreign keys** (e.g., `user_id`): links to other tables
3. **RLS policy**: "you can only read/write your own rows"

Example: A "todos" table for a multi-user app:

```sql
CREATE TABLE todos (
  id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE POLICY "users can read their own todos"
ON todos
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "users can create their own todos"
ON todos
FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

Translation:
- `id`: unique todo identifier
- `user_id`: who owns this todo
- `title`, `completed`, `created_at`: todo data
- First policy: you can only SELECT (read) todos where user_id = your ID
- Second policy: you can only INSERT (create) todos where user_id = your ID

### Knowledge Check

1. **Q7-0a:** "Why do we use `user_id` in every table?"
   - a) To make the table longer
   - b) To identify who owns each row (so RLS can enforce "you can only read your own rows")
   - c) Just because Supabase requires it
   - d) To track when data was created

   **Correct:** b) — `user_id` is the bridge between rows and users. RLS uses it to enforce security.

2. **Q7-0b:** "What does an RLS policy do?"
   - a) Encrypts data in the database
   - b) Prevents SQL errors
   - c) Enforces default-deny access control—blocks all access unless a policy says "yes"
   - d) Makes queries faster

   **Correct:** c) — RLS is the security enforcement layer. Without it, any logged-in user can read/write any row.

---

Then renumber all subsequent lessons: Lesson 7.1 → 7.2, Lesson 7.2 → 7.3, etc.

- [ ] **Step 3: Update Module 7 learning objectives to include Lesson 7.0**

At the top of Module 7, add a new objective:

```markdown
- **Objective 1:** Understand database fundamentals: tables, primary keys, foreign keys, and row-level security (Lesson 7.0)
```

- [ ] **Step 4: Update Module 7 duration and XP**

Increase Module 7 contact hours by 0.5 (30 min lesson). Update the module header:

```markdown
**Level:** Intermediate (8.5 contact hours, 850 XP)
```

- [ ] **Step 5: Commit**

```bash
git add content/modules/module-07-supabase-data.md
git commit -m "feat(module-07): add database fundamentals lesson before Supabase config"
```

---

### Task 3: Add "Before" Screenshot to Module 6 (Design Motivation)

**Files:**
- Create: `/public/figures/module-06-before-plain-ui.png` (screenshot)
- Modify: `/public/figures-manifest.json` (add entry for new screenshot)
- Modify: `/content/modules/module-06-design-ux.md` (reference the screenshot)

**Interfaces:**
- Consumes: A deliberately plain version of the invoice app UI (needs to be created/screenshotted)
- Produces: Before-state visual for Lesson 6.1 motivation

**Context:** Module 6 describes generic AI UI but doesn't show it. The transformation (before→after) is the most motivating moment; it's invisible without the screenshot.

- [ ] **Step 1: Create plain-UI version of invoice app locally (in staging branch)**

Assuming you have the reference app running locally, create a temporary version where:
- All pages use system default font (no custom typeface)
- All text is the same size (no hierarchy)
- No padding/spacing (text edge-to-edge)
- No colors (black text, white background)
- No borders, shadows, or visual distinction

Example: a plain `/clients` page would look like:

```
CLIENTS
New Client
Alice Corp alice@example.com Delete Edit
Bob Inc bob@example.com Delete Edit
Charlie Co charlie@example.com Delete Edit
```

(All in default sans-serif, no spacing, no design.)

- [ ] **Step 2: Screenshot the plain-UI version**

Screenshot the plain `/clients` page and the plain `/invoices` page. Save as:
- `/public/figures/module-06-before-plain-ui-clients.png`
- `/public/figures/module-06-before-plain-ui-invoices.png`

(Or combined if they fit in one image; use your judgment for clarity.)

- [ ] **Step 3: Update figures-manifest.json**

Add entries to `/public/figures-manifest.json`:

```json
{
  "placeholder": "[SCREENSHOT: Module 6 Plain UI—Clients Page (Before)]",
  "src": "/figures/module-06-before-plain-ui-clients.png",
  "altText": "A screenshot of the invoice app's clients page with no design applied: default system font, no hierarchy, no spacing, no colors. Shows how AI-generated UIs look without refinement."
},
{
  "placeholder": "[SCREENSHOT: Module 6 Plain UI—Invoices Page (Before)]",
  "src": "/figures/module-06-before-plain-ui-invoices.png",
  "altText": "A screenshot of the invoice app's invoices page with no design applied: generic, cramped, hard to use. Motivates why design matters."
}
```

- [ ] **Step 4: Update Module 6 Lesson 6.1 to reference the before screenshot**

In Lesson 6.1, update the description:

```markdown
### What Bad Design Looks Like

AI generates working code, but it looks generic. Here's what that means:

[SCREENSHOT: Module 6 Plain UI—Clients Page (Before)]

Notice:
- **Font:** Default system font (no personality)
- **Spacing:** Text is crammed together; hard to scan
- **Hierarchy:** All text is the same size (heading = field label = button text)
- **Color:** Black and white; no visual guide
- **Contrast:** Text is readable but ugly

This is what Cursor generates without design direction. It works. It's just not good to look at—or use.

Compare to the designed version:

[SCREENSHOT: Designed invoice app clients page]

Same structure, same data, but:
- Clean typeface (Geist)
- Breathing room (8px spacing scale)
- Clear hierarchy (page title > section headers > data)
- Color & contrast (accent color guides attention)
- Professional

**Your job in this module:** Take the "plain" version and make it "designed" using the four levers: hierarchy, spacing, typography, color.
```

- [ ] **Step 5: Commit**

```bash
git add public/figures/module-06-before-plain-ui-clients.png \
        public/figures/module-06-before-plain-ui-invoices.png \
        public/figures-manifest.json \
        content/modules/module-06-design-ux.md
git commit -m "feat(module-06): add before-state screenshot showing plain AI-generated UI for design motivation"
```

---

### Task 4: Clarify Module 1 Quiz Alignment

**Files:**
- Modify: `/content/modules/module-01-mindset.md` (Quiz section)

**Interfaces:**
- Produces: Explicit mapping of 3 MC questions to learning objectives

**Context:** Module 1's quiz preview doesn't show the actual questions or map them to lessons. No way to verify alignment.

- [ ] **Step 1: Read current Module 1 quiz section**

Navigate to `/content/modules/module-01-mindset.md` and find the "Quiz" section. Note what's currently shown.

- [ ] **Step 2: Replace with explicit quiz preview**

Replace the quiz section with:

```markdown
## Quiz: Judgment About AI

**Learning Objective Alignment:** Each question tests one objective. Pass = all 3 correct.

### Q1-1: How LLMs Work (Objective 1 — Understand how LLMs generate output)

You ask Claude: "List 5 dog breeds." Claude returns: Labrador, Golden Retriever, Beagle, Dachshund, Poodle.

How did Claude generate this list?

a) It looked up a database of dog breeds and selected 5 random ones
b) It predicted the most likely next words based on patterns in training data, one word at a time
c) It retrieved the answer from the internet
d) It used a pre-written list of dog breeds

**Correct answer:** b) — Claude predicts next words sequentially. It's not looking up facts; it's guessing what words usually follow "dog breeds" based on statistical patterns in training data. This is why Claude can *sound* confident but be wrong.

---

### Q1-2: When to Trust vs. Verify (Objective 2 — Judge when to trust AI output vs. verify it)

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

### Q1-3: LLM Limits & Trade-offs (Objective 3 — Recognize LLM limitations and when they matter)

You're building an app that imports CSV files and parses them. The CSV format varies by client (different columns, different orders). You ask Claude to build a parser that handles any CSV.

Claude writes a parser that handles the common cases but fails on edge cases (empty rows, quoted commas, Unicode).

What's the problem?

a) Claude is bad at programming
b) Claude did its best, but parsing arbitrary CSVs is a hard problem with lots of edge cases. No single "smart" parser handles all formats.
c) You should use a different AI model
d) CSV parsing is too easy—Claude shouldn't have failed

**Correct answer:** b) — Claude can generate *usable* code, but perfect code for ambiguous problems (like "parse any CSV") is unrealistic. The edge cases are real. Your job is to recognize that, test the parser, find the edge cases, and fix them. Claude's not magic; it's a tool with limits.

---

**Verification note:** Before shipping, learners should be able to explain: (1) how Claude generates output (tokens, patterns, not facts), (2) when to verify vs. trust (concrete outputs: verify; creative outputs: evaluate for quality), (3) what Claude can't do (handle arbitrary edge cases perfectly, access the internet in real-time, learn during a conversation).

**What counts as passing:** All 3 questions correct. If a learner gets 2/3, they haven't internalized judgment yet—they should revisit the module before moving on.
```

- [ ] **Step 3: Commit**

```bash
git add content/modules/module-01-mindset.md
git commit -m "fix(module-01): clarify quiz alignment with explicit questions and objective mapping"
```

---

### Task 5: Add Testing Examples for Agentic Workflows (Module 11)

**Files:**
- Modify: `/content/modules/module-11-agents.md` (insert new Lesson 11.5a)
- Renumber subsequent lessons: 11.5 → 11.6, 11.6 → 11.7

**Interfaces:**
- Consumes: Lesson 11.4 (agent interface design)
- Produces: Concrete Vitest examples for testing agents

**Context:** Module 11 teaches agent design but not agent testing. Learners can build workflows but can't prove they're reliable.

- [ ] **Step 1: Read current Module 11 Lessons 11.5-11.6**

Navigate to `/content/modules/module-11-agents.md`. Note the current structure of Lesson 11.5 (interface/stable) and 11.6 (reliability/guardrails).

- [ ] **Step 2: Insert new Lesson 11.5a: "Test Your Agent"**

Between current 11.5 and 11.6, insert:

```markdown
## Lesson 11.5a — Test Your Agent (~45 min)

An agent that crashes is worse than no agent. Testing proves reliability.

### Why Test Agents?

Agents loop. Each loop calls tools, which might fail (API timeout, invalid input, permission denied). A loop that doesn't handle failure will:
- Retry forever (infinite loop)
- Return garbage (wrong result, no error)
- Crash the system (unhandled exception)

Tests catch these before production.

### What to Test

Three things:

1. **Happy path:** Agent succeeds, returns correct result
2. **Tool failure:** Agent handles a tool failing gracefully
3. **Loop limits:** Agent stops before hitting token limits or max iterations

### Example: Pet Tips Agent (From Lesson 11.3)

Recall the agent:

```python
# Simplified agent from Lesson 11.3
agent = Agent(
    tools=[lookup_pet_breed, fetch_training_tips],
    system_prompt="You are a helpful pet advisor...",
    max_iterations=5,
    max_tokens=1000
)
```

#### Test 1: Happy Path — Agent Succeeds

```python
# tests/agents/test_pet_advisor.py

import pytest
from unittest.mock import Mock, patch
from app.agents.pet_advisor import PetAdvisorAgent

@pytest.fixture
def agent():
    return PetAdvisorAgent()

def test_pet_advisor_happy_path(agent):
    # Mock tool responses
    mock_breed_lookup = Mock(return_value={
        "breed": "Golden Retriever",
        "size": "large",
        "temperament": "friendly"
    })
    mock_tips = Mock(return_value=[
        "Start training at 8 weeks",
        "Use positive reinforcement"
    ])
    
    # Patch the agent's tools
    with patch.object(agent, 'lookup_pet_breed', mock_breed_lookup):
        with patch.object(agent, 'fetch_training_tips', mock_tips):
            # Ask the agent
            result = agent.run("How do I train a Golden Retriever?")
            
            # Verify
            assert result is not None
            assert "training" in result.lower()
            mock_breed_lookup.assert_called_once()
            mock_tips.assert_called_once()
```

**What this tests:**
- Agent runs without crashing
- Agent calls the right tools
- Agent returns a meaningful result

#### Test 2: Tool Failure — Agent Handles Gracefully

```python
def test_pet_advisor_tool_fails(agent):
    # Simulate tool failure (API timeout)
    mock_breed_lookup = Mock(side_effect=TimeoutError("API timeout"))
    mock_tips = Mock(return_value=["Fallback tip"])
    
    with patch.object(agent, 'lookup_pet_breed', mock_breed_lookup):
        with patch.object(agent, 'fetch_training_tips', mock_tips):
            # Agent should not crash; should handle gracefully
            result = agent.run("How do I train a Golden Retriever?")
            
            # Verify
            assert result is not None  # Agent recovers
            assert "fallback" in result.lower() or "sorry" in result.lower()
            # Agent logged the error (check logs)
```

**What this tests:**
- Agent doesn't crash when a tool fails
- Agent has a fallback (fallback response, second tool, etc.)
- Error is logged for debugging

#### Test 3: Loop Limit — Agent Stops

```python
def test_pet_advisor_loop_limit(agent):
    # Mock tools that always trigger another loop
    # (simulate an agent that wants to call tools infinitely)
    mock_breed_lookup = Mock(return_value={"breed": "Unknown"})
    mock_tips = Mock(return_value=[])
    
    with patch.object(agent, 'lookup_pet_breed', mock_breed_lookup):
        with patch.object(agent, 'fetch_training_tips', mock_tips):
            with patch.object(agent, 'max_iterations', 5):
                result = agent.run("Tell me everything about every dog breed")
                
                # Verify
                assert result is not None
                # Check loop didn't exceed limit
                assert agent.iteration_count <= 5
                assert mock_breed_lookup.call_count <= 5
```

**What this tests:**
- Agent respects max_iterations (doesn't loop forever)
- Agent returns a result even if incomplete
- Telemetry captured (iteration count, tool calls)

### How to Run These Tests

```bash
pytest tests/agents/test_pet_advisor.py -v
```

Expected output:

```
tests/agents/test_pet_advisor.py::test_pet_advisor_happy_path PASSED
tests/agents/test_pet_advisor.py::test_pet_advisor_tool_fails PASSED
tests/agents/test_pet_advisor.py::test_pet_advisor_loop_limit PASSED

===== 3 passed in 0.45s =====
```

### Hands-On Activity Addition

**Update Module 11 hands-on activity to require:**

Step 1: Design the agent (as before)
Step 2: Build the agent (as before)
Step 3: Test the agent — write at least one test covering happy path + one covering tool failure

This ensures learners ship tested agents, not untested workflows.

### Knowledge Check

**Q11-5a:** "Your pet advisor agent calls a tool that times out. The agent should:"

a) Crash and log an error
b) Retry the tool infinitely
c) Catch the error, log it, and continue with a fallback
d) Return null

**Correct:** c) — Agents must handle tool failures gracefully. Crashing or retrying forever are both bad. Fallbacks and error logging are good.

---

Then renumber Lesson 11.5 → 11.6, 11.6 → 11.7.
```

- [ ] **Step 3: Update Module 11 learning objectives**

Add a new objective:

```markdown
- **Objective 5:** Test agentic workflows for reliability—happy path, tool failure recovery, loop limits (Lesson 11.5a)
```

- [ ] **Step 4: Update Module 11 hands-on activity**

Update the activity deliverable checklist to include:

```markdown
- [ ] Step 3: Write 2 tests for your agent: happy path (agent succeeds) + tool failure (agent recovers gracefully)
- [ ] Verify tests pass: `pytest tests/agents/test_your_agent.py -v`
- [ ] Submit: agent code + test file + test output screenshot
```

- [ ] **Step 5: Commit**

```bash
git add content/modules/module-11-agents.md
git commit -m "feat(module-11): add agent testing lesson with Vitest examples for reliability"
```

---

## IMPORTANT FIXES (Should Fix Before Launch)

### Task 6: Add Multimodal Prompting Example to Module 2

**Files:**
- Modify: `/content/modules/module-02-prompting.md` (Lesson 2.6 hands-on activity)

- [ ] **Step 1: Read current Module 2 Lesson 2.6**

Navigate to `/content/modules/module-02-prompting.md`, find Lesson 2.6 ("Multimodal prompting"). Read the current content.

- [ ] **Step 2: Update hands-on activity to include multimodal step**

In the hands-on activity (e.g., "Prompt rewrite gauntlet"), add a 6th weak/strong prompt pair:

```markdown
### Weak Prompt 6: Multimodal (Describe a bad UI)

"Fix my UI. It's weird."

**Strong Prompt 6: Paste the screenshot, describe the problem**

"Here's a screenshot of my form [paste image]. The labels are stacked on top of the inputs with no space, the button is tiny, and the error message color is hard to see. Make it clean: add space between label and input, make the button bigger, use a red error color for readability. Use shadcn/ui if you have it."

**Comparison:**
- Weak: Claude doesn't know what you're seeing. Generates vague fixes.
- Strong: Claude sees the exact problem, generates targeted fixes.

**Takeaway:** For visual problems, screenshots are worth a thousand words.
```

- [ ] **Step 3: Commit**

```bash
git add content/modules/module-02-prompting.md
git commit -m "feat(module-02): add multimodal prompting example to hands-on activity"
```

---

### Task 7: Add Tool-Switching Reflection to Module 4-5 Boundary

**Files:**
- Modify: `/content/modules/module-04-building-in-cursor.md` (add Lesson 4.7)
- Modify: `/content/modules/module-05-building-in-claude-code.md` (add intro link)

- [ ] **Step 1: Add Lesson 4.7 at end of Module 4**

After the current final lesson in Module 4, add:

```markdown
## Lesson 4.7 — Pause and Reflect: Cursor vs. Claude Code (~30 min)

You've spent ~3 hours in Cursor (Modules 4). You're about to enter Claude Code (Module 5). Before you do, reflect: which tool for which task?

### Decision Tree

**Is the change local and focused?** (e.g., "fix this component", "update this test")
→ Use Cursor. Fast feedback loop, easy to verify each small change.

**Is the change multi-file and cross-cutting?** (e.g., "add a new feature across 5 files", "refactor the auth layer")
→ Use Claude Code. Orchestrates multiple files, reviews the full diff.

**Do you need to see the code changing in real-time?**
→ Use Cursor. You watch autocomplete suggest lines, accept/reject in-editor.

**Do you prefer to describe the goal and see the full result?**
→ Use Claude Code. You prompt "build X", it builds, you review the diff.

**Are you debugging and need to iterate fast?**
→ Use Cursor. Quick tests, quick fixes, quick feedback.

**Are you on a feature branch with a complex sequence of steps?**
→ Use Claude Code. It can manage the full sequence, write commit messages, show you the diff.

### The Real Answer

Use both. Most projects need both:
- Cursor for tweaks and quick fixes
- Claude Code for features and orchestration

The skill is knowing when to switch. Don't spend 30 minutes in Cursor when Claude Code could do it in 5. Don't spend 30 minutes in Claude Code when a quick Cursor fix is simpler.

### Practice: Redo Module 4 in Claude Code

Pick one of the Module 4 tasks (e.g., "style the clients page") and redo it in Claude Code. Compare:
- How long did each take?
- Which felt more natural to you?
- Did you prefer seeing the changes in-editor (Cursor) or reviewing diffs (Claude Code)?

Your preference + the task characteristics should guide your choice going forward.

### Knowledge Check

**Q4-7:** "You need to fix a typo in one component and add error states to five components. What's your strategy?"

a) Use Cursor for both—it's simpler
b) Use Claude Code for both—it's faster
c) Use Cursor for the typo (focused), Claude Code for the error states (multi-file)
d) Ask a teammate

**Correct:** c) — Match the tool to the scope. Local = Cursor. Cross-cutting = Claude Code.
```

- [ ] **Step 2: Add opening callout to Module 5**

At the very beginning of Module 5 (before Lesson 5.1), add:

```markdown
## Recap: Tool Choice

Module 4 taught in-editor (Cursor). Module 4.7 asked you to reflect on when to use Cursor vs. Claude Code.

Here's the TL;DR: **Use Cursor for focused edits, Claude Code for orchestration.**

Module 5 teaches orchestration—multi-file builds, sequencing, reviewing diffs. You'll use Claude Code heavily here. But you'll still use Cursor (from Module 4) in real projects. The skill is knowing which one to reach for.
```

- [ ] **Step 3: Commit**

```bash
git add content/modules/module-04-building-in-cursor.md \
        content/modules/module-05-building-in-claude-code.md
git commit -m "feat(module-04,05): add tool-switching reflection at Cursor→Claude Code boundary"
```

---

### Task 8: Reframe Module 8 Debugging (Learner-First, Not AI-First)

**Files:**
- Modify: `/content/modules/module-08-reading-debugging.md` (reorder lessons 8.1-8.3)

- [ ] **Step 1: Read current Module 8 structure**

Navigate to `/content/modules/module-08-reading-debugging.md`. Note the current order of lessons.

- [ ] **Step 2: Reorder to prioritize learner debugging**

If the current structure is "Use AI to debug", restructure to:

**Old structure (AI-first):**
- 8.1: Error messages
- 8.2: Isolate/reproduce
- 8.3: Paste to Claude
- ...

**New structure (learner-first):**
- 8.1: Read the error message yourself (terminal, browser console, network tab)
- 8.2: Isolate and reproduce (write a minimal test case)
- 8.3: Debug step-by-step (add console.log, check variables, trace execution)
- 8.4: Optionally use AI to verify (paste error + context to Claude, let it suggest next steps)
- 8.5-8.7: Advanced debugging (race conditions, performance, security)

Add introductory text to Module 8:

```markdown
## Debugging: You First, AI Second

The course teaches "you are the engineer; AI is the tool." This module emphasizes it: **you debug first, using your own skills. AI helps verify, not replace.**

Why? Because:
1. You learn debugging skills that outlast any AI tool
2. You'll hit bugs that AI can't solve
3. Understanding the root cause (not just the fix) makes you better at preventing future bugs
4. In team settings, you need to communicate the bug to others

The pattern: **Read → Isolate → Reproduce → Debug → Verify (optionally with AI) → Fix → Test**

Each step uses your own judgment. AI is your verification partner, not your debugging proxy.
```

- [ ] **Step 3: Add knowledge check on learner-first approach**

Add a question:

```markdown
**Q8-1:** "You see an error: 'Cannot read property "email" of undefined.' What's your first step?"

a) Copy the error and paste it to Claude
b) Read the stack trace and find the line where "email" is being accessed
c) Restart the app and hope it goes away
d) Add random null checks until it stops failing

**Correct:** b) — Read the stack trace. Find the exact line. Understand what's undefined. *Then* decide if you need help.
```

- [ ] **Step 4: Commit**

```bash
git add content/modules/module-08-reading-debugging.md
git commit -m "fix(module-08): reorder debugging to prioritize learner skills over AI assistance"
```

---

### Task 9: Add Merge Conflict Collaboration Scenario to Module 9

**Files:**
- Modify: `/content/modules/module-09-git-github.md` (add optional Lesson 9.4b)

- [ ] **Step 1: Add Lesson 9.4b after current Lesson 9.4**

```markdown
## Lesson 9.4b (Optional) — Collaborating on a Shared Branch (~30 min)

Module 9.4 covered merge conflicts in a solo scenario (you edit the same file twice, create a conflict). This lesson is a step up: **what if two teammates edit the same file?**

### Scenario: Two Developers, One Branch

Branch: `add-user-roles` (implementing role-based access)

Developer A edits `/src/roles/admin.ts`:
```typescript
export const AdminRole = {
  permissions: ["read:users", "write:users", "delete:users"],
  name: "Admin"
};
```

Developer B edits the same file `/src/roles/admin.ts`, adding:
```typescript
export const AdminRole = {
  permissions: ["read:users", "write:users"],
  name: "Administrator",
  description: "Full access"
};
```

Both push to the same branch. Conflict!

### Resolution Workflow

1. **Developer A** commits and pushes first (no conflict)
2. **Developer B** tries to push, gets: "rejected — remote has changes"
3. **Developer B** pulls locally: `git pull`
4. Git shows a conflict:

```
<<<<<<< HEAD (Developer B's version)
export const AdminRole = {
  permissions: ["read:users", "write:users"],
  name: "Administrator",
  description: "Full access"
};
=======
export const AdminRole = {
  permissions: ["read:users", "write:users", "delete:users"],
  name: "Admin"
};
>>>>>>> origin/add-user-roles (Developer A's version)
```

5. **Developer B** must decide: which version is right? Or merge both?

In this case, the versions disagree on:
- Permissions: A added `delete:users`, B didn't
- Name: A says "Admin", B says "Administrator"
- Description: A has none, B added one

6. **Developer B** resolves by **talking to Developer A** (or reading the commit message). They decide:
   - Use B's name and description (better UX)
   - Use A's permissions (more permissive, as intended)
   - Result:

```typescript
export const AdminRole = {
  permissions: ["read:users", "write:users", "delete:users"],
  name: "Administrator",
  description: "Full access"
};
```

7. **Developer B** marks resolved: `git add src/roles/admin.ts`
8. **Developer B** completes the merge: `git commit -m "Merge add-user-roles: resolve role definitions"`
9. **Developer B** pushes: `git push`

### Key Lesson

Conflicts in team settings require **communication**. The code conflict is mechanical (git can't merge); the business logic conflict is human (which version is correct?). In a real team, you'd:
- Chat on Slack: "Hey, I'm rebasing add-user-roles, there's a conflict in roles/admin.ts. Did you intend to remove delete:users?"
- Read commit messages carefully
- Ask the other developer

### Knowledge Check

**Q9-4b:** "You and a teammate both edited `/config/api.ts`. Git shows a conflict. Your version sets timeout=30, their version sets timeout=60. What should you do?"

a) Always pick your version (you wrote it first)
b) Always pick their version (they pushed last)
c) Talk to your teammate and decide together based on the reason for the change
d) Just pick one at random

**Correct:** c) — Conflicts require judgment. Understand why each of you made the change, then decide together.
```

- [ ] **Step 2: Commit**

```bash
git add content/modules/module-09-git-github.md
git commit -m "feat(module-09): add multi-developer merge conflict scenario (optional lesson)"
```

---

### Task 10: Clarify Module 10 Auth Config (Add Walkthrough)

**Files:**
- Modify: `/content/modules/module-10-deploying.md` (Lesson 10.5 auth section)

- [ ] **Step 1: Find Module 10 Lesson 10.5 auth section**

Navigate to `/content/modules/module-10-deploying.md`, find the section on Supabase auth configuration.

- [ ] **Step 2: Expand with detailed walkthrough**

Replace vague instructions with:

```markdown
### Step 5: Configure Supabase for Production Auth

When you deploy to Vercel, auth breaks if Supabase doesn't know your production URL.

**Why?** Supabase sends a redirect link after you sign in. If that link goes to localhost:3000 instead of your Vercel URL, sign-in fails silently (or redirects to the wrong place).

**What to do:**

1. Go to your Supabase dashboard: https://supabase.com/dashboard/
2. Select your project
3. Navigate to **Authentication** → **URL Configuration** (left sidebar)
4. You'll see two fields:
   - **Site URL** — where your app is hosted
   - **Redirect URLs** — where Supabase sends users after sign-in

5. In **Site URL**, enter your Vercel deployment URL:

```
https://your-app-name.vercel.app
```

(If you don't know your Vercel URL, go to your Vercel dashboard and copy it.)

6. In **Redirect URLs**, add two entries:
   - `https://your-app-name.vercel.app/auth/callback`
   - `https://your-app-name.vercel.app` (the root)

   (These should match the redirect URLs in your `/app/auth/callback/route.ts` file. If you're not sure, check.)

7. Click **Save**

8. Test: Visit your live Vercel URL, click "Sign In", enter an email/password, and verify you're redirected to the dashboard.

**If it doesn't work:**
- Check the Supabase URL and API key in your Vercel env vars (they should match your Supabase project)
- Check the Redirect URLs — they must exactly match your Vercel URL + `/auth/callback`
- Check your `/app/auth/callback/route.ts` — it should have `getURL()` returning the correct origin

**Screenshot example:**

[SCREENSHOT: Supabase URL Configuration page, showing Site URL and Redirect URLs filled in]
```

- [ ] **Step 3: Commit**

```bash
git add content/modules/module-10-deploying.md
git commit -m "fix(module-10): clarify Supabase auth configuration walkthrough with exact steps"
```

---

### Task 11: Streamline Module 12 (Prioritize Core Production Items)

**Files:**
- Modify: `/content/modules/module-12-production-ready.md` (refactor lessons, reduce scope)

- [ ] **Step 1: Read current Module 12 structure**

Navigate to `/content/modules/module-12-production-ready.md`. Count the lessons and contact hours.

- [ ] **Step 2: Identify and cut non-essential lessons**

If Module 12 currently covers: tests, error handling, security, a11y, perf, "Golden Fixtures", "Tool Contracts", etc., remove the academic patterns ("Golden Fixtures", "Tool Contracts"). These are patterns, not requirements.

New Module 12 focuses on: Tests (Vitest + Playwright), Error states, Security (RLS check, env vars), A11y (keyboard), Perf (quick audit).

- [ ] **Step 3: Reduce to 6 contact hours (instead of 8)**

Consolidate lessons to 5-6 core lessons:
- 12.1: Write tests (unit + E2E)
- 12.2: Add error states (loading, empty, error)
- 12.3: Audit security (RLS, env vars, input validation)
- 12.4: Test accessibility (keyboard nav, color contrast)
- 12.5: Run Lighthouse (performance audit)

Each lesson ~60 min, not 90+.

- [ ] **Step 4: Add callout at top of Module 12**

```markdown
## Module 12: Production-Ready (Essentials Only)

This module covers the non-negotiable checks before shipping. It's streamlined: 6 hours, not 8. Focus: tests, error handling, security, accessibility, performance.

**Not covered:** advanced patterns (golden fixtures, tool contracts). Those are next-level; learn them after shipping your capstone.

**Goal:** By end of Module 12, you have a checklist. Complete it, you're ready to ship.
```

- [ ] **Step 5: Update module metadata**

Update Module 12 header:

```markdown
**Level:** Intermediate (6 contact hours, 600 XP)
```

- [ ] **Step 6: Commit**

```bash
git add content/modules/module-12-production-ready.md
git commit -m "fix(module-12): streamline to 6 hours, focus on core production requirements"
```

---

### Task 12: Make Module 13 Optional (Automation as Post-Capstone Elective)

**Files:**
- Modify: `/content/modules/module-13-automating-pipeline.md` (reframe as optional)
- Modify: `/content/modules/module-16-capstone.md` (update rubric to mark automation as bonus)

- [ ] **Step 1: Add framing to top of Module 13**

```markdown
## Module 13: Automating Your Dev Pipeline (Optional, Post-Capstone)

This module is **optional**. It covers advanced automation with MCP servers, skills, subagents, and plugins.

**Why optional?** The capstone (Module 16) doesn't require it. Many projects are polished and shipped without automation. Learning to ship first, automate later, is wise.

**When to take this module:**
- After you've shipped your capstone
- If you're building frequently and want to reduce repetitive work
- If you want to explore Claude Code's advanced features

**For now:** Focus on shipping your capstone (Modules 1-12 + 14-16). Come back to Module 13 after graduation if you want to level up.

---
```

- [ ] **Step 2: Update capstone rubric**

In Module 16, update the rubric to clarify automation is bonus:

```markdown
| Criterion | Does Not Meet (0) | Approaching (1) | Meets (2) | Exceeds (3) |
| --- | --- | --- | --- | --- |
| **[Bonus] Automation Setup** | N/A | No MCP/automation attempted | Attempted MCP server or automation, partially working | Automated pipeline with MCP servers, working reliably (bonus points: +0.5 modifier) |
```

- [ ] **Step 3: Commit**

```bash
git add content/modules/module-13-automating-pipeline.md \
        content/modules/module-16-capstone.md
git commit -m "refactor(module-13): make automation optional, post-capstone elective"
```

---

### Task 13: Reframe Module 15 (Reinforce Default Stack)

**Files:**
- Modify: `/content/modules/module-15-tooling-landscape.md` (update tone, reduce alternatives)

- [ ] **Step 1: Read Module 15 current opening**

Navigate to `/content/modules/module-15-tooling-landscape.md`. Note the current framing.

- [ ] **Step 2: Add reassuring opening**

At the very start of Module 15, add:

```markdown
## Module 15: The Tooling Landscape (Reinforcement, Not Doubt)

You've spent 93 hours learning one stack: **Next.js, Supabase, Tailwind, TypeScript, Vercel**.

This module isn't saying "you might have chosen wrong." It's saying "you chose well. Here's why, and what other choices exist for different constraints."

### The Default Stack You Learned

- **Frontend:** Next.js + React (App Router, full-stack capability, production-ready)
- **Database:** Supabase (PostgreSQL with RLS, auth built-in, no vendor lock-in)
- **Styling:** Tailwind + shadcn/ui (utility-first, accessible components, professional look)
- **Language:** TypeScript (type safety, better developer experience, scales to teams)
- **Deployment:** Vercel (zero-config Next.js, fast CDN, excellent DX)

This stack is:
- ✅ Used by professional teams (not a learning toy)
- ✅ Production-ready (powers real SaaS apps)
- ✅ Scalable (from side project to millions of users)
- ✅ Well-documented (huge community)
- ✅ Economical (free tier to start, pay as you grow)

**For your capstone, this stack is the safe choice.** Don't second-guess it.

This module is for *after* your capstone: if you hit a constraint this stack doesn't handle well, here's what to consider instead.
```

- [ ] **Step 3: Reduce alternative scenarios**

If Module 15 currently has 5-6 comparison tables ("should I use Vue instead of React?", "should I use MongoDB instead of Postgres?", etc.), cut it to 2-3 key scenarios:

- Scenario 1: "I need real-time collaboration" (Firebase Realtime DB or similar)
- Scenario 2: "I need to deploy to AWS with specific compliance" (different stack)
- Scenario 3: "I need a simpler stack for a static site" (plain HTML/CSS/JS)

For each, say: "In this case, consider X. Otherwise, the default stack you learned is solid."

- [ ] **Step 4: Update knowledge check**

Add a question:

```markdown
**Q15-1:** "You finished the course with Next.js + Supabase. A friend says 'You should have used Vue + Firebase instead.' You should:"

a) Panic—you chose the wrong stack
b) Acknowledge both work, but stick with your choice for consistency
c) Rewrite everything in Vue
d) Ask which is objectively better

**Correct:** b) — Professional judgment means: the stack you chose is solid. Yes, alternatives exist. For your capstone, consistency and depth > switching tools.
```

- [ ] **Step 5: Commit**

```bash
git add content/modules/module-15-tooling-landscape.md
git commit -m "fix(module-15): reframe as reinforcement, not doubt—reassert default stack strength"
```

---

### Task 14: Move Module 0.6-0.7 Deep-Dive Content

**Files:**
- Modify: `/content/modules/module-00-setup.md` (shorten 0.6-0.7)
- Modify: `/content/modules/module-13-automating-pipeline.md` (add detailed governance section)
- OR `/content/modules/module-16-capstone.md` (add before capstone brief)

- [ ] **Step 1: Shorten Module 0.6-0.7 to awareness level**

In Module 0, replace the long 0.6-0.7 lessons with brief callouts:

```markdown
## Lesson 0.6 — Quick Intro: CLAUDE.md & Decisions (10 min)

You'll document your project later. Know these two files:

- **CLAUDE.md:** Project rules (testing expectations, deployment gates, AI workflow guardrails)
- **decisions.md:** Why you chose what (this stack, this architecture, these tradeoffs)

You'll create both in your capstone (Module 16). For now, just know they exist.

## Lesson 0.7 — Repository vs. Notion (5 min)

Repository = versioned artifacts (code, config, decisions, tests)  
Notion = high-level context (architecture, design, roadmap, team processes)

You'll use both in your project. Details in Module 16.
```

- [ ] **Step 2: Add Module 0 link to Module 16**

In Module 16 capstone brief, add a reference to Module 0:

```markdown
Recall Module 0.6-0.7: CLAUDE.md and Notion are two halves of project ownership. You'll create both here.
```

- [ ] **Step 3: Reduce Module 0 duration**

Update Module 0 header:

```markdown
**Level:** Beginner (3.5 contact hours, 350 XP)
```

(Reduce by 0.5 hour for the shorter governance lessons.)

- [ ] **Step 4: Commit**

```bash
git add content/modules/module-00-setup.md
git commit -m "fix(module-0): shorten governance lessons to awareness-level (details in Module 16)"
```

---

### Task 15: Add Learner Personas Section to Course Intro

**Files:**
- Create or Modify: `/content/modules/module-00-setup.md` (add new section at the very top)

- [ ] **Step 1: Add personas section to Module 0 opening**

At the very top of Module 0 (before Lesson 0.1), add:

```markdown
# Module 0: Setup & Accounts

## Who This Course Is For

This course teaches full-stack development with AI assistance. It's designed for ages 14+. Here's how we adapt:

### If You're Under 18 ("Kids" Content)

The "kids" version of lessons uses simpler language and metaphors. Examples focus on personal projects (pet tracker, homework helper). Concepts are identical to the adult version; the presentation is clearer for younger learners.

You can read either version (kids is clearer; adult is more business-focused). Pick what resonates.

**Your goal:** Ship a capstone project that proves you can build, ship, and explain production code.

### If You're an Adult or Career-Changer ("Adult" Content)

The "adult" version includes business context (SaaS, product, team workflows). Examples assume some work experience. Concepts apply directly to real job scenarios.

**Your goal:** Same: ship a capstone that proves you can handle real projects.

### Bottom Line

Age or background doesn't matter. What matters: curiosity, willingness to learn, and commitment to shipping something.

---
```

- [ ] **Step 2: Commit**

```bash
git add content/modules/module-00-setup.md
git commit -m "feat(module-0): add learner personas section for clarity on audience"
```

---

## Summary

**Total: 15 tasks** (5 critical + 10 important)

**Estimated effort:** 15-20 hours of focused work

**Commits:** ~15 focused, atomic commits (one per task, sometimes grouped by module)

**Outcome:** 95/100 launch-ready curriculum

---

## Next Steps

1. **Save this plan** to the repository (already done)
2. **Execute tasks in order:**
   - Critical fixes first (Tasks 1-5) — unblock launch
   - Important fixes second (Tasks 6-15) — polish
3. **Use subagent-driven-development or executing-plans** to run tasks in parallel where possible
4. **Review and test** each commit before moving to the next
5. **Track progress** in this file or via git commits

---

## Execution Strategy

**Recommended approach:** Subagent-driven development (one agent per task, review after each).

**Why:** Each task is independent, touches different modules, and produces a testable commit. Subagents can work in parallel on unrelated modules (e.g., Module 1 quiz alignment + Module 6 before-screenshot can happen simultaneously).

**Alternative:** Inline execution if you prefer to stay in this session and iterate.
