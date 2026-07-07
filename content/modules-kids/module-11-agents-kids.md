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

## Lesson 11.2 — Agents in Your Pet Tracker (~45 min)

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

## Lesson 11.3 — Workflows (~60 min)

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

## Activity: Build an Automated Feature 🤖

Pick one feature to build and automate with AI. Follow these steps:

### Step 1: Choose your feature (2 min)
Pick one:
- **Care tips:** AI generates personalized tips when user views a pet
- **Birthday reminders:** AI drafts birthday messages for the queue
- **Weekly digest:** AI summarizes all pets' activities in an email
- **Breed info:** AI adds fun facts about breeds automatically

### Step 2: Design the workflow (5 min)
Write down:
1. **When it runs:** (every time user views pet? once a week? when user clicks a button?)
2. **AI input:** (breed name? pet details?)
3. **AI output:** (tips? messages? facts?)
4. **Human approval?** (do we show drafts for approval, or send automatically?)

### Step 3: Create the AI interface (10 min)
1. Write the interface (like `TipsGenerator` from above)
2. Write the test stub (returns fake but realistic results)
3. Write the production version (calls Claude)
4. Test: run locally, see it work with the stub

### Step 4: Add to your app (15 min)
1. Create a page or component that uses your AI feature
2. Call it from your pet detail page, dashboard, or a new admin page
3. Test: does it show the AI output?

### Step 5: Add a human approval queue (if needed) (15 min)
If your feature sends emails/notifications:
1. Create an approval page (e.g., `/admin/queue`)
2. Show drafts (what the AI generated)
3. Add Approve/Skip/Edit buttons
4. Only send after human approval

### Step 6: Test the guardrails (8 min)
1. **Test the AI:** What if it generates something weird? Show the weird output and handle it gracefully
2. **Test approval:** If you skip approval, does it still send? It shouldn't!
3. **Test logs:** Did you log what happened? (helpful for debugging later)

### Deliverable:
- Working AI feature in your pet tracker
- Screenshot showing the AI output (tips/message/fact)
- Screenshot of the approval queue (if you built one)
- One-paragraph write-up: "How could this break? What guardrails protect it?"

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

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **What's the difference between a function and an agent?**
   - *Example answer:* "A function does exactly what you code (step 1, step 2, step 3 — always the same order). An agent is smarter—you give it a goal and tools, and it figures out the best steps to reach that goal. Agents can handle messy inputs and make decisions."

2. **Describe a workflow in your app.**
   - *Example answer:* "My birthday reminder workflow: 1) fetch all pets with upcoming birthdays, 2) use AI to generate birthday messages, 3) show them to me for approval, 4) send the approved messages to owners. Each step depends on the previous one."

3. **How could automation improve your pet tracker?**
   - *Example answer:* "Instead of manually writing care tips for each breed, AI generates them. Instead of manually sending reminders, AI drafts them and I approve them. Same result, way faster."

### Scenario-based judgment checks:

*For each scenario, explain what went wrong.*

- **(a) You built an AI feature that sends emails automatically.** No approval queue. It sent 50 weird emails before you noticed.
  - ✅ **Fix:** Always add a human approval step before sending/spending/deleting. Show drafts for review first!
  - ❌ **Avoid:** Trusting AI alone. AI makes mistakes. You're the backup.

- **(b) Your care tips feature works sometimes but sometimes returns weird, unhelpful tips.**
  - ✅ **Root cause:** AI is unpredictable (hallucination). **Fix:** Add a fallback—if tips look bad, show a default message or ask user to regenerate.
  - ❌ **Avoid:** Showing weird tips to users. Test the AI output first!

- **(c) You tested with the stub, but it breaks in production with real AI.** The stub was too simple and hid bugs.
  - ✅ **Root cause:** Testing only with stubs isn't enough. **Fix:** Also test with real AI (at least once) before shipping.
  - ❌ **Avoid:** Assuming stubs catch all bugs. Stubs are helpful but not perfect.

- **(d) You need to swap AI from Claude to GPT-4 but the code is everywhere.** AI calls are scattered.
  - ✅ **If you used an interface:** One line change, done!
  - ❌ **If AI calls are everywhere:** You have to rewrite lots of code. This is why interfaces matter!

- **(e) Your AI queue shows 100 drafts but you approve just the first 5.** The rest don't send because you abandoned the queue.
  - ✅ **Expected behavior:** Drafts only send after approval. That's safe!
  - ✅ **Better:** Mark unapproved drafts as "expired" or delete them after a time limit.

---

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | Feature designed: when it runs, what it does, what AI generates |
| ✅ | Workflow broken down: fetch → AI → queue (if needed) → action |
| ✅ | AI interface created: production + test stub both work |
| ✅ | Test stub realistic: returns believable fake results, no API calls |
| ✅ | Feature added to app: runs on pet page / admin page / dashboard |
| ✅ | AI output visible: screenshot showing generated tips/messages/facts |
| ✅ | Approval queue (if needed): shows drafts, Approve/Skip buttons work |
| ✅ | Guardrails identified: ≥2 ways it could break + how to fix |
| ✅ | Tested end-to-end: stub works, real AI works, approval works |

*Pass mark: 80% and a working AI feature with guardrails submitted.*

---

## Key Takeaways

- Agents = AI that makes decisions 🤖
- Workflows = multi-step processes
- Automation = faster, smarter apps
- Use Claude Code to build agentic features

**Next:** Module 12 — Production-Ready Code!
