# Module 11: AI Agents & Workflows 🤖

**Stage:** Advanced · **Level:** Intermediate/Advanced · **Duration:** ~5 hours · **XP:** 500

**What you need:** Modules 0-10

> **Why this matters:** You can use AI to automate parts of your app. Agents are AI that can do multi-step tasks by themselves. Workflows are sequences of tasks. This module teaches you to think in terms of automation — instead of coding every detail, you give AI a goal and it figures out the steps.

## What You'll Learn

By the end of this module, you'll be able to:

1. **Understand AI agents** (AI that makes decisions and takes actions)
2. **Build workflows** (multi-step processes that run automatically)
3. **Use tools** (let AI interact with your database and API)
4. **Automate safely** (human approval before big actions)

---

## Lesson 11.1 — What's an Agent? (~30 min)

An agent is AI that can think through steps and make decisions:

**Function (you tell it every step):**
```javascript
function addPet(name, breed) {
  validate(name);      // Step 1
  saveToDB(name);      // Step 2
  sendNotification();   // Step 3
}
```

**Agent (you give it a goal, it figures out steps):**
```
Goal: "Help users manage their pets"
Tools: database, email, notifications
AI figures out: validate → save → notify (and more!)
```

**Real example:** You have a golden retriever named Buddy. An agent can:
1. Look up golden retriever facts
2. Generate personalized care tips
3. Suggest health reminders
4. Send you updates

All without you coding each step!

---

## Lesson 11.2 — Design an Agent by Hand (~45 min)

Before you ask Claude Code to build a workflow, let's design the agent itself. This is where the real thinking happens.

### What Makes an Agent Useful?

An agent isn't magic. It's three things:

**1. Tools** — What can the agent do?
- Examples: "get pet data from database," "send email," "log to file"
- Without tools, the agent is just a chatbot

**2. System prompt** — What's the agent's job?
- Examples: "You're a pet care expert. Generate 3 actionable tips." or "You're a data analyst. Find patterns in invoice trends."
- The prompt controls the agent's behavior

**3. Error handling** — What if something breaks?
- Agent calls a tool and gets an error
- Agent hallucinates (makes up data)
- Agent gets stuck in a loop
- You need a fallback strategy

### Practice: Design a Pet Tips Agent

**Feature:** "Generate pet care tips based on breed"

**Step 1: Specify the tools**

Your agent needs to DO something. What tools?

```
Tool 1: getBreedInfo
  - Input: breed name (text)
  - Output: breed characteristics (aggressive? energetic? needs exercise?)
  - Purpose: agent looks up breed info to write relevant tips

Tool 2: logTip
  - Input: tip text (text)
  - Output: success/error
  - Purpose: agent saves tips to a database
```

(In code, each tool becomes a function. Claude Code writes the functions, but YOU decide what tools to create.)

**Step 2: Write the system prompt**

This is the agent's instructions. It controls what the agent does.

```
You are a certified pet care expert. When asked for breed care tips:

1. Use the getBreedInfo tool to understand the breed's characteristics
2. Generate exactly 3 actionable tips based on that breed
3. Tips should be specific to the breed (not generic)
4. Use the logTip tool to save each tip

Example:
  User: "Golden Retriever"
  You: [calls getBreedInfo("Golden Retriever")]
  Result: "Energetic, friendly, loves water"
  You: Generate 3 tips based on this info
  You: [calls logTip for each tip]
  Done
```

This prompt tells the agent:
- Use these specific tools
- Do these exact steps
- In this order

**Step 3: Plan error handling**

What if things go wrong?

```
Failure mode 1: Agent hallucinates (makes up breed info)
  - Prevention: Always call getBreedInfo first, don't guess
  - Fallback: If user enters unknown breed, return "Unknown breed, try Labrador/Golden Retriever"

Failure mode 2: logTip fails (database is down)
  - Prevention: Catch the error from logTip
  - Fallback: Return tips but don't save (warn user: "Tips generated but not saved")

Failure mode 3: Agent gets stuck (calls getBreedInfo 10 times in a row)
  - Prevention: System prompt says "call getBreedInfo once per request"
  - Fallback: Timeout after 5 tool calls; if more than that, return partial results
```

**Why this matters:**
- **Tool design:** Agent can only do what tools let it do
- **Prompt design:** Agent behaves how the prompt tells it to
- **Error handling:** Agent is reliable only if you planned for failure

### Practice Challenge

Design an agent for a different task. Sketch:

1. **Tools needed** (name, input, output, purpose)
2. **System prompt** (how should the agent behave?)
3. **Error handling** (what can go wrong? fallbacks?)

Example: "Invoice analyzer agent"
```
Tools:
  1. fetchInvoices (input: date range, output: list of invoices)
  2. summarizeInvoice (input: invoice, output: summary + total)
  3. logAnalysis (input: analysis text, output: success/error)

System prompt:
You are a financial analyst. Summarize invoices:
1. Fetch invoices for the date range
2. Summarize each one (total, key items)
3. Log your analysis
Don't guess; always fetch first.

Error handling:
- If fetchInvoices fails: return "No invoices found"
- If summarizeInvoice errors: skip that invoice, continue
- If timeout (>10 calls): return partial analysis + warning
```

### Key Takeaway

**An agent is only as good as its tools, prompt, and error handling.** 

- Bad tools → agent can't do anything
- Bad prompt → agent does the wrong thing  
- No error handling → agent breaks silently

Claude Code implements these. But YOU design them. This is where the engineering happens.

---

## Lesson 11.3 — Agents in Your Pet Tracker (~45 min)

Example: Auto-generate pet care tips.

**What happens:**
1. User views their golden retriever "Buddy"
2. AI sees: breed = "golden retriever"
3. AI generates: exercise (60 min/day), grooming (2x/week), diet (2-3 cups/day)
4. Show tips on the pet detail page

**Code example (the agent interface):**

```typescript
// lib/ai/generateTips.ts
export interface TipsGenerator {
  generate(petBreed: string, petName: string): Promise<string>;
}

// Production: calls Claude AI
const productionGenerator: TipsGenerator = {
  generate: async (breed, name) => {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": process.env.ANTHROPIC_API_KEY! },
      body: JSON.stringify({
        model: "claude-opus-4-1",
        max_tokens: 512,
        messages: [{
          role: "user",
          content: `Generate 3 personalized pet care tips for a ${breed} named ${name}. Be fun and friendly!`
        }]
      })
    }).then(r => r.json());
    return extractTextFromResponse(response);
  }
};

// Test: returns fake but realistic tips (no AI needed)
const testStub: TipsGenerator = {
  generate: async (breed) => `1. Exercise daily\n2. Groom often\n3. Love unconditionally!`
};

// Use test in tests, real AI in production
export const tipsGenerator = process.env.NODE_ENV === "test" ? testStub : productionGenerator;
```

**In your pet detail page:**

```tsx
// app/pets/[id]/page.tsx
export default async function PetDetailPage({ params }) {
  const pet = await getPet(params.id);
  const tips = await tipsGenerator.generate(pet.breed, pet.name);
  
  return (
    <div>
      <h1>{pet.name}</h1>
      <p>{pet.breed}</p>
      <div className="bg-blue-100 p-4 rounded">
        <h2>AI Care Tips 💡</h2>
        <pre>{tips}</pre>
      </div>
    </div>
  );
}
```

---

### Why This Works

You've designed the agent (tools, prompt, error handling). Now Claude Code implements it.

**Why this works:**
- You've specified exactly what tools the agent needs (Claude Code creates them)
- You've written the system prompt (Claude Code refines it)
- You've planned error handling (Claude Code codes the fallbacks)

**What you're doing:** Design + verification + debugging.
**What Claude Code is doing:** Coding + boilerplate + orchestration.

You own the hard part (thinking). Claude Code owns the tedious part (typing).

---

## Lesson 11.4 — Workflows (~60 min)

A workflow is a series of steps that run in order. Each step depends on the previous one.

**Example workflow: Birthday reminder automation**

1. **Fetch** all pets with birthdays coming up
2. **Generate** personalized birthday messages
3. **Show human** the messages for approval (queue)
4. **Send** approved messages to owners
5. **Log** which ones were sent

**Why workflows matter:** Instead of building this manually (5 separate features), AI orchestrates it as one smooth process.

**Real code (simplified):**

```typescript
// lib/ai/birthdayWorkflow.ts
export async function runBirthdayWorkflow() {
  // Step 1: Fetch
  const upcomingBirthdays = await supabase
    .from("pets")
    .select("id, name, owner_email")
    .gte("birthday", today())
    .lt("birthday", nextWeek());
  
  // Step 2: Generate (call AI for each)
  const messages = await Promise.all(
    upcomingBirthdays.map(pet =>
      tipsGenerator.generate(`It's ${pet.name}'s birthday!`, pet.name)
    )
  );
  
  // Step 3: Show queue (human approves/edits)
  // Step 4: Send (only after approval)
  // Step 5: Log
  return { sent: messages.length, timestamp: new Date() };
}
```

---

## Activity: Build a Pet Tips Agent

### Step 1: Design the agent by hand (25 min)

**Your goal:** Generate pet care tips based on breed.

Answer these design questions:

**A. What tools does your agent need?** (minimum 2)
- Tool 1: name, input, output, why agent needs it
- Tool 2: name, input, output, why agent needs it

Example:
```
Tool 1: getBreedInfo
  Input: breed name
  Output: breed characteristics
  Why: agent needs to know the breed before writing tips

Tool 2: logTip  
  Input: tip text
  Output: success/error
  Why: agent saves tips so they persist
```

**B. Write the system prompt** (3-5 sentences, explain the agent's job)

Example:
```
You are a certified pet care expert. Your job:
1. Get breed information using getBreedInfo
2. Generate 3 specific, actionable care tips
3. Save each tip using logTip
Always fetch breed info first; don't guess.
```

**C. Plan error handling** (2-3 failure modes + fallbacks)

Example:
```
If getBreedInfo fails (unknown breed):
  → Return "Unknown breed" + suggest common breeds

If logTip fails (database down):
  → Generate tips but warn user: "Tips created but not saved"

If agent gets stuck (calls tools 10+ times):
  → Timeout, return what we have
```

Write all three (tools, prompt, error handling). Save this document—you'll hand it to Claude Code.

### Step 2: Ask Claude Code to implement (10 min)

Open Claude Code:

```
I want to build a pet tips agent. Here's my design:

**Tools:**
[paste your tool specs from Step 1A]

**System Prompt:**
[paste your prompt from Step 1B]

**Error Handling:**
[paste your error plans from Step 1C]

Please implement this agent. Create the functions, wire them together, and handle the errors I specified.
```

Claude Code will:
- Create the tool functions
- Set up the agent with your system prompt
- Add error handling as specified

### Step 3: Review the implementation (10 min)

Claude Code shows you the code. Check:
- ✓ Are the tools implemented as you specified?
- ✓ Is the system prompt exactly what you wrote?
- ✓ Are the error-handling fallbacks in place?

If no to any, ask Claude Code to fix it.

### Step 4: Test edge cases (15 min)

Run the agent with edge cases:

**Test 1: Normal case (common breed)**
- "Golden Retriever" → Should work, generate 3 tips, save them

**Test 2: Unknown breed (error case)**
- "FictionalBreedXYZ" → Should handle gracefully (return fallback message)

**Test 3: Stress test (many calls)**
- Ask for 5 different breeds rapid-fire → Should not timeout

If it breaks, debug with Claude Code: "The agent failed on [scenario]. Why? How do I fix the prompt?"

### Step 5: Iterate (10 min)

Based on tests, ask Claude Code: "The system prompt needs to [change]. Update it and retest."

Iterate until the agent is reliable across all cases.

**Deliverable:** 
- Your design document (tools, prompt, error handling)
- Screenshot of agent working on normal case
- Screenshot of agent handling an edge case gracefully
- Notes on what you learned (was the prompt right? Did error handling work?)

---

## Knowledge Check

**Q1: Before asking Claude Code to build an agent, what should you do?**
- A) Just describe the goal and let Claude Code figure it out
- B) Design the agent: tools, system prompt, error handling
- C) Write all the code by hand
- D) Ask for suggestions

**Answer: B** — Design comes first. Claude Code implements your design.

---

**Q2: You're designing an agent to analyze invoices. Which of these is a TOOL?**
- A) "Analyze invoices and find trends"
- B) fetchInvoices(dateRange) — returns list of invoices
- C) "Be helpful and friendly"
- D) "Use machine learning"

**Answer: B** — Tools are specific functions the agent can call. A, C, D are prompts/instructions, not tools.

---

**Q3: Your system prompt says "Always check the database first." Why?**
- A) To make the code run faster
- B) To prevent the agent from hallucinating (making up data)
- C) Because databases are required
- D) Just a good practice

**Answer: B** — A good system prompt prevents hallucinations by telling the agent to use real data first, not guess.

---

**Q4: Your agent got stuck calling the same tool 20 times. What should you do?**
- A) Delete the agent
- B) Check the system prompt (is it looping?) and add an error handler (timeout after N calls)
- C) Add more tools
- D) Ask Claude Code to fix it

**Answer: B** — The prompt is probably wrong. Error handling (timeout) catches this. Both are YOUR designs, not Claude Code's.

---

**Q5: Your agent works great on "Golden Retriever" but crashes on "UnknownBreed123". What's the problem?**
- A) The agent is broken
- B) Your error handling didn't plan for unknown breeds
- C) You need more tools
- D) Claude Code made a mistake

**Answer: B** — Testing edge cases finds design gaps. Add error handling for unknown breeds (fallback: "I only know common breeds").

---

## Design Verification Checklist

Before you submit your agent, verify:

1. **Tools are specific** (not vague)
   - ✓ Each tool has a clear input type and output type
   - ✓ You can explain WHY the agent needs this tool
   - ❌ Avoid: vague tools like "data" or "info"

2. **System prompt is concrete** (not wishy-washy)
   - ✓ Prompt tells the agent exactly what to do (steps 1, 2, 3)
   - ✓ Prompt says how to use each tool
   - ❌ Avoid: fluffy prompt like "be helpful and smart"

3. **Error handling covers real failures**
   - ✓ You identified 2-3 things that could go wrong
   - ✓ Each failure has a fallback strategy
   - ✓ Fallbacks are realistic (not "never fail")
   - ❌ Avoid: imaginary failures or no fallbacks

4. **Implementation matches design**
   - ✓ Tools in code match your tool specs
   - ✓ System prompt in code matches what you wrote
   - ✓ Error handlers match your plans

5. **Tested edge cases**
   - ✓ Normal case works (golden retriever)
   - ✓ Error case handled (unknown breed)
   - ✓ Stress case handled (many requests)

### Scenario-based learning:

*For each scenario, what went wrong with the design?*

- **(a) Your agent hallucinates breed info.** It makes up facts instead of looking them up.
  - ✅ **Fix:** System prompt should say "Always call getBreedInfo first. Never make up breed facts."
  - ❌ **Root cause:** Weak prompt. The agent did what the prompt allowed.

- **(b) Your error handling says "return error" but no fallback.** When the database is down, users get nothing.
  - ✅ **Fix:** Add a fallback strategy. Example: "If database fails, return default tips + warning message."
  - ❌ **Avoid:** Planning errors without fallbacks.

- **(c) You designed 10 tools but the agent only needs 2.** Over-engineering.
  - ✅ **Better:** Minimal tools = simpler agent. Start with 2-3 tools. Add more only if needed.
  - ❌ **Avoid:** Tool bloat. More tools = more ways to break.

- **(d) Your system prompt is 50 lines long.** The agent gets confused.
  - ✅ **Better:** Short, clear prompt (5-10 sentences). One tool per paragraph.
  - ❌ **Avoid:** Rambling prompts. AI works better with concise instructions.

- **(e) You tested only the happy path.** Edge cases broke in production.
  - ✅ **Better:** Design edge cases into error handling BEFORE implementation. Then test them.
  - ❌ **Avoid:** "It works in my test!"—no, you didn't test the bad cases.

---

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | **Design document created:** Tools, system prompt, error handling all written |
| ✅ | **Tools specified:** ≥2 tools, each with input, output, and purpose |
| ✅ | **System prompt written:** 3-5 sentences, tells agent what to do and how to use tools |
| ✅ | **Error handling planned:** ≥2 failure modes + fallback strategies for each |
| ✅ | **Implementation matches design:** Code tools/prompt/errors match your design doc |
| ✅ | **Normal case works:** Agent generates tips for common breed (Golden Retriever) |
| ✅ | **Edge case handled:** Agent gracefully handles unknown breed (doesn't crash) |
| ✅ | **Stress case handled:** Agent handles multiple requests without timeout/loop |
| ✅ | **Screenshots provided:** One normal case, one edge case |
| ✅ | **Notes on learning:** What did you learn? Was the prompt right? Did error handling work? |

*Pass mark: 80% and a working agent with design doc + all test cases submitted.*

---

## Key Takeaways

- **Design first:** Tools, prompts, error handling → THEN code
- **Agents = tools + prompt + error handling:** No tool → can't do. Bad prompt → wrong behavior. No error handling → breaks.
- **Prompts control behavior:** A good prompt prevents hallucinations and guides the agent step-by-step
- **Error handling is design:** Plan what breaks and how to fallback BEFORE Claude Code builds it
- **Claude Code implements your thinking:** You design. Claude Code codes. You own the hard part.

**Next:** Module 12 — Production-Ready Code!
