# Module 11: AI Agent Workflows

**Stage:** Production · **Level:** Advanced · **Duration:** ~7 contact hours (0.7 CEU)

**Prerequisites:** Modules 5, 7 & 10. Learners can build agentically (5), have a real database (7), and a deployed app (10). Now they build agentic behavior *into* a product.

> Important distinction up front: Module 5 was **using an agent to build your app**. This module is **building an agent workflow as a feature** — software that uses an LLM plus tools to automate a real, multi-step task on its own. This is where "AI app developer" becomes "AI automation engineer." The running example: an assistant that drafts reminder emails for overdue invoices, with a human approving before anything sends.
> 

> **📸 Screenshots:** Items marked *[SCREENSHOT: …]* — the approval-queue UI is auto-capturable; a live workflow run is manual.
> 

## Learning objectives

By the end of this module, the learner can:

1. **Design and build** a multi-step agent/tool workflow that automates a real task. *(Create)*
2. **Break down** a workflow into agent responsibilities, tools, and hand-offs. *(Analyze)*
3. **Structure** an AI call behind a stable interface so it is testable and swappable. *(Apply)*
4. **Assess** the reliability and failure modes of an agentic workflow. *(Evaluate)*

> **Version note:** agent frameworks and APIs change fast. Teach the durable patterns — tools, orchestration, hand-offs, human-in-the-loop, failure handling — so the skill outlives any framework.
> 

---

## Lesson 11.1 — What is an agent workflow? (~40 min)

An **agent** is an LLM given a goal plus **tools** it can call to act (query a database, send an email, call an API). An **agent workflow** chains these into a multi-step process — the model decides which tools to use, in what order, reacting to results.

Contrast: a normal function does exactly what you coded; an agent *decides* within the goal and tools you gave it. That flexibility is the power (handles messy inputs) and the risk (it can decide wrong) — which is why reliability (Lesson 11.5) is half this module.

---

## Lesson 11.2 — The building blocks (~45 min)

- **Tools (function calling)** — functions you define and describe so the model can request a call with arguments; your code runs it and returns the result. Example tools: `getOverdueInvoices()`, `draftReminderEmail(invoice)`, `sendEmail(draft)`.
- **The agent loop** — the model reasons, optionally calls a tool, reads the result, repeats until done (ReAct-style: reason → act → observe).
- **MCP (Model Context Protocol)** — a standard way to give agents access to tools/data, so you can plug in capabilities (and swap models) without rewiring. You met MCP-style tools in Claude Code.

Keep it concrete: an agent is a loop of *decide → call a tool → look at the result → decide again*.

---

## Lesson 11.3 — Orchestration patterns (~45 min)

Begins Objective 2. Three patterns learners choose between:

| Pattern | Shape | Use when |
| --- | --- | --- |
| **Single-agent tool loop** | One agent, several tools, looping | Most tasks — start here; simplest, most reliable |
| **Supervisor / foreman** | One orchestrator delegates to specialists | Distinct sub-tasks benefit from focused agents |
| **Graph / workflow** | Explicit steps (nodes) + paths (edges), with checkpoints | You need predictable, inspectable, resumable flows |

**Beginner advice:** start with the single-agent tool loop. Reach for multi-agent/graph only when a single agent genuinely struggles — more agents means more ways to fail. Simplicity is a reliability feature.

---

## Lesson 11.4 — Break a workflow into parts (~40 min)

Completes Objective 2. Before building, decompose (the Module 3 habit, for agents). For each workflow define **responsibilities** (what the agent decides vs. what your code decides), **tools** (specific actions with clear I/O), and **hand-offs** (agent → tool → agent, and crucially agent → **human** for approval).

**Worked breakdown — the overdue-invoice reminder assistant:**

1. Tool `getOverdueInvoices()` → overdue invoices from Supabase.
2. Agent drafts a personalized reminder per invoice.
3. **Hand-off to human**: show drafts for review/approval.
4. Tool `sendEmail(draft)` → sends only approved ones.

---

**[SCREENSHOT PLACEHOLDER: Workflow Diagram]**

Diagram showing: getOverdueInvoices → Agent → Draft Reminders → Human Approval Queue → SendEmail. Flowchart proves sequence and hand-offs.

---

---

## Lesson 11.5 — Build it + the stable-interface pattern (~75 min)

This delivers Objectives 1 and 3. Implement the reminder assistant in the invoice-tracker.

**Step 1 — Define the tools** (functions + descriptions the model can call): `getOverdueInvoices`, `draftReminderEmail`, `sendEmail`.

**Concrete tool definitions:**

```typescript
// lib/ai/tools.ts
export const remoteInvoiceTools = [
  {
    name: "getOverdueInvoices",
    description: "Retrieve all invoices with due date >= 30 days past due",
    inputSchema: { type: "object", properties: {} },
    execute: async () => {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();
      const { data } = await supabase
        .from("invoices")
        .select("id, client_name, client_email, amount, due_date, days_overdue")
        .lt("due_date", thirtyDaysAgo)
        .eq("status", "unpaid");
      return data || [];
    }
  },
  {
    name: "draftReminderEmail",
    description: "Compose a personalized reminder email for one overdue invoice",
    inputSchema: {
      type: "object",
      properties: {
        invoiceId: { type: "string" },
        clientName: { type: "string" },
        amount: { type: "number" },
        daysOverdue: { type: "number" }
      },
      required: ["invoiceId", "clientName", "amount", "daysOverdue"]
    },
    execute: async ({ clientName, amount, daysOverdue }) => ({
      subject: `Payment Reminder: Invoice $${amount} now ${daysOverdue} days overdue`,
      body: `Hi ${clientName},\n\nThis is a friendly reminder that your invoice for $${amount} is now ${daysOverdue} days overdue.\n\nPlease arrange payment at your earliest convenience.\n\nThank you,\nAccounting Team`
    })
  },
  {
    name: "sendEmail",
    description: "Send an approved reminder email (ONLY call after human approval in queue)",
    inputSchema: {
      type: "object",
      properties: {
        clientEmail: { type: "string" },
        subject: { type: "string" },
        body: { type: "string" }
      },
      required: ["clientEmail", "subject", "body"]
    },
    execute: async ({ clientEmail, subject, body }) => {
      // Mock: in production, call Resend or SendGrid
      console.log(`[EMAIL] To: ${clientEmail}, Subject: ${subject}`);
      return { sent: true, timestamp: new Date() };
    }
  }
];
```

**Step 2 — Structure the AI call behind a stable interface (Objective 3).** Put the actual model call behind an interface so the rest of your app (and tests) never touches the AI SDK directly:

```tsx
// lib/ai/draftReminder.ts
export interface ReminderDrafter {
  draft(invoices: Invoice[]): Promise<DraftEmail[]>;
}

export interface DraftEmail {
  invoiceId: string;
  subject: string;
  body: string;
  clientEmail: string;
}

// Production: call Claude with tools
const productionDrafter: ReminderDrafter = {
  draft: async (invoices) => {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "content-type": "application/json",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-opus-4-1",
        max_tokens: 2048,
        tools: remoteInvoiceTools,
        messages: [{
          role: "user",
          content: `You are an accounting assistant. Draft personalized reminder emails for these ${invoices.length} overdue invoices. For each, call draftReminderEmail with the invoice details.`
        }]
      })
    }).then(r => r.json());
    
    // Extract draft emails from tool use responses
    return extractDraftsFromResponse(response, invoices);
  }
};

// Test stub: deterministic, no live AI calls
const testStub: ReminderDrafter = {
  draft: async (invoices) => invoices.map(inv => ({
    invoiceId: inv.id,
    clientEmail: inv.client_email,
    subject: `Payment reminder: ${inv.amount}`,
    body: "Test reminder"
  }))
};

// Swap: tests use stub, prod uses real model
export const draftReminder: ReminderDrafter =
  process.env.NODE_ENV === "test" ? testStub : productionDrafter;
```

Why: you can **stub** it for tests (no live AI calls, deterministic), and **swap** models/APIs later without touching the UI. This is the pattern that makes agent features testable and maintainable.

**Step 3 — Run the agent loop:** call the AI with the goal and tool definitions; it reasons, calls tools, and returns drafts:

```tsx
// lib/ai/runReminderWorkflow.ts
export async function runReminderWorkflow() {
  const overdue = await getOverdueInvoices();
  if (overdue.length === 0) return [];
  
  const drafts = await draftReminder.draft(overdue);
  return drafts;
}
```

**Step 4 — Insert the human checkpoint:** render drafts with Approve/Edit/Reject buttons. **Never let the agent send email autonomously**:

```tsx
// app/admin/reminders/page.tsx
export default async function ReminderQueuePage() {
  const drafts = await runReminderWorkflow();
  
  return (
    <div className="space-y-4 p-6">
      <h1>Email Draft Approval Queue ({drafts.length})</h1>
      {drafts.map(draft => (
        <div key={draft.invoiceId} className="border rounded p-4">
          <p className="text-sm text-gray-600">Invoice ID: {draft.invoiceId}</p>
          <h3 className="font-bold">{draft.subject}</h3>
          <pre className="text-sm p-2 bg-gray-100 rounded mt-2">{draft.body}</pre>
          
          <form className="flex gap-2 mt-4">
            <input type="hidden" name="invoiceId" value={draft.invoiceId} />
            <button formAction={approveDraftAction} name="action" value="approve" className="px-4 py-2 bg-green-600 text-white rounded">
              Approve & Send
            </button>
            <button formAction={approveDraftAction} name="action" value="edit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Edit
            </button>
            <button formAction={approveDraftAction} name="action" value="reject" className="px-4 py-2 bg-red-600 text-white rounded">
              Reject
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
```

**Step 5 — Send approved drafts** via `sendEmail`:

```tsx
// app/admin/actions.ts
"use server"

export async function approveDraftAction(formData: FormData) {
  const invoiceId = formData.get("invoiceId") as string;
  const action = formData.get("action") as string;
  
  if (action === "approve") {
    // Fetch the draft (already approved in queue)
    const draft = await db.draftEmails.findUnique({ where: { invoiceId } });
    
    // Send via email service
    const result = await sendEmail(draft.clientEmail, draft.subject, draft.body);
    
    // Mark invoice as reminder sent
    if (result.sent) {
      await db.invoices.update({
        where: { id: invoiceId },
        data: { reminderSentAt: new Date(), reminderCount: { increment: 1 } }
      });
    }
  } else if (action === "edit") {
    // Allow manual editing before approval
    redirect(`/admin/reminders/${invoiceId}/edit`);
  } else if (action === "reject") {
    // Delete the draft
    await db.draftEmails.delete({ where: { invoiceId } });
  }
}
```

---

**[SCREENSHOT PLACEHOLDER: Approval Queue UI]**

App showing: 3 AI-drafted reminder emails with Approve/Edit/Reject buttons. Each draft shows the generated subject and body text. Proof of human-in-the-loop checkpoint working.

---

---

## Lesson 11.6 — Reliability & failure modes (~55 min)

Delivers Objective 4 — what separates a demo from a product. Anticipate each failure:

- **Hallucination** — invents data or calls a tool with wrong arguments.
- **Loops** — repeats a step without progressing.
- **Tool misuse** — wrong tool, or the right tool at the wrong time (e.g. sending before approval).
- **Cascading errors** — one bad step feeds the next; failures compound in multi-agent setups.

**Guardrails:** human-in-the-loop for anything consequential (send/spend/delete) — the single most important safeguard; **limits** on steps/loops so a stuck agent stops; **validation** of tool inputs/outputs in your code; **least privilege** (a reminder agent can't delete invoices); **logging** so you can debug and audit (previews Module 12).

> **Instructor note:** ask "what's the worst thing this agent could do if it went wrong?" for the learner's own workflow. That question drives every guardrail.
> 

---

## Hands-on activity (~60 min, folded in)

**"Automate a real task."** Design and build a small agent workflow (the reminder assistant or your own) with the following steps:

### Step 1: Design the workflow (5 min)
1. Pick a task that takes multiple decisions + actions (e.g., classify support emails, generate invoice summaries, categorize expenses)
2. List the **responsibilities** (what agent decides vs. what your code decides)
3. List the **tools** (specific functions the agent can call)
4. Draw the hand-off flow (agent → tool → agent → human approval → action)
5. Pick an orchestration pattern (single-agent is safer; use it)

### Step 2: Define tools (10 min)
1. Write the tool definitions with clear descriptions and input schemas
2. Implement each tool's `execute` function
3. Example: if you pick email triage, write `fetchEmails()`, `classifyEmail()`, `draftReply()`, `markProcessed()`

### Step 3: Create the stable interface (10 min)
1. Define an interface for your workflow (e.g., `EmailTriage { triage(...): Promise<...> }`)
2. Write the production implementation that calls the AI
3. Write a test stub that returns deterministic results
4. Export the right one based on `NODE_ENV`

### Step 4: Build the human checkpoint (10 min)
1. Create a page that shows drafts/recommendations (e.g., `/admin/triage-queue`)
2. Add Approve/Edit/Reject buttons (form buttons, no JavaScript required)
3. Route to a server action that handles the user's choice

### Step 5: Identify guardrails (10 min)
1. Ask: "What's the worst this could do?"
2. List ≥2 guardrails (input validation, loop limits, retry logic, logging, least privilege)
3. Implement them in code (not just in docs)

### Step 6: Test end-to-end (15 min)
1. Run locally: `npm run dev`
2. Trigger the workflow (e.g., visit `/admin/triage-queue`)
3. Verify: fetch → agent loop → queue render → approval → action all work
4. Test the guardrails (e.g., try to bypass approval, or send invalid input to a tool)

### Deliverable:
- A working workflow in your invoice-tracker (or new Next.js app)
- Workflow design doc: responsibilities/tools/hand-offs/pattern choice + justification
- Code: tools, interface, production + stub implementations, checkpoint UI, guardrails
- Write-up (1 page): failure modes and how each guardrail mitigates them

---

## Quiz questions (preview)

These are the four questions you'll see on the quiz. Study these to prepare:

**Q11-1:** An agent workflow differs from a normal function because:
- (a) it's Python
- (b) **the agent decides which tools to use within the goal** ✓
- (c) it never fails
- (d) it needs no code

*Why:* A function does exactly what you coded. An agent receives a goal and tools, then *decides* which tools to call and in what order. That autonomy is the power (handles messy inputs) and the risk (it can decide wrong) — which is why reliability matters.

**Q11-2:** Putting the AI call behind a stable interface lets you:
- (a) make it slower
- (b) **stub it in tests and swap models later without changing the UI** ✓
- (c) skip the AI
- (d) avoid writing code

*Why:* When the AI call is behind an interface (like `draftReminder(...)`), tests can stub it (no live model), and you can swap models/implementations without touching the UI. Testability and maintainability.

**Q11-3:** The single most important safeguard before a consequential action (send/spend/delete):
- (a) more agents
- (b) **a human-in-the-loop approval** ✓
- (c) a bigger model
- (d) faster hardware

*Why:* No guardrail beats human review before the agent sends an email, charges a card, or deletes data. Always require approval for the irreversible.

**Q11-4:** Your workflow calls an external API that fails 10% of the time. What do you add?
- (a) nothing — accept the 10% failure rate
- (b) **retry logic + logging so failures are detectable and the loop can recover** ✓
- (c) delete the workflow — it's unreliable
- (d) a prayer

*Why:* Build workflows that degrade gracefully. Assess failure modes (API down, timeouts, wrong responses) and add defensive patterns: retries, exponential backoff, circuit breakers, logging so you can debug and audit. A 90% reliable workflow is only 90% reliable if you can recover.

---

## Knowledge check (mapped to objectives)

### Written checks:

**Objective 1 — Build a workflow:** Demonstrate a multi-step agent workflow with its tools and the human checkpoint.
- *Example answer:* "My workflow fetches overdue invoices, calls the AI to draft reminder emails for each, displays them in an approval queue where I can approve/edit/reject them, then sends approved ones. Tools: `getOverdueInvoices()`, `draftEmail()`, `sendEmail()`. Checkpoint: humans must approve before send."

**Objective 2 — Break it down:** For "triage incoming support emails," list responsibilities, tools, hand-offs, and pick an orchestration pattern with justification.
- *Example answer:*
  - **Responsibilities:** AI reads emails and assigns urgency/category; human decides which to reply to.
  - **Tools:** `fetchSupportEmails()`, `classifyEmail()`, `draftResponse()`, `markAsTriaged()`.
  - **Hand-offs:** Agent → Triage Queue → Human → Send.
  - **Pattern:** Single-agent loop (simpler); start here, escalate to multi-agent if different email types need different workflows.

**Objective 3 — Stable interface:** Show your AI call behind an interface and the test stub that replaces it.
- *Example answer:*
  ```typescript
  interface EmailTriage { triage(emails: Email[]): Promise<Triage[]>; }
  const triageService = process.env.NODE_ENV === "test" ? testStub : productionService;
  ```

**Objective 4 — Reliability:** Name three ways your workflow could fail and the guardrail for each.
- *Example answer:*
  1. **Agent hallucination:** Invents a customer name. **Guardrail:** Validate tool inputs (e.g., client must exist in DB).
  2. **Sends before approval:** Agent tries to call sendEmail without human check. **Guardrail:** Only allow send after user clicks Approve button.
  3. **External API down:** Email service timeout. **Guardrail:** Add retry logic with exponential backoff + logging.

### Scenario-based judgment checks:

*For each scenario, explain what went wrong and what to do.*

- **(a) Your agent keeps calling the same tool over and over.** It's stuck in a loop, getting the same response each time.
  - ✅ **Root cause:** No loop limit. Agent doesn't know when to stop. **Fix:** Add `maxSteps: 10` to the agent call. If it hits 10 steps, stop and return "incomplete."
  - ❌ **Avoid:** Leaving it running. Looping agents waste API credits and block your workflow.

- **(b) The AI drafts an email with a client name that doesn't match the invoice.** It hallucinated a name.
  - ✅ **Root cause:** The tool's output wasn't validated. **Fix:** Before storing the draft, verify the client exists in the DB. Reject if not found.
  - ❌ **Avoid:** Sending it anyway. The email would be confusing to the client.

- **(c) A user clicks "Approve" but the email never sends.** The tool executed but silently failed.
  - ✅ **Root cause:** No logging or error handling on `sendEmail()`. **Fix:** Log every attempt (success/failure), return an error object, and show the user the result.
  - ❌ **Avoid:** Assuming it worked. Always log and verify.

- **(d) Your workflow works perfectly in tests but fails in production.** Different behavior between environments.
  - ✅ **Diagnose:** Check env vars (API key, database URL). Test stub works everywhere; real calls need real credentials. **Fix:** Verify `.env` in production (Vercel settings).
  - ❌ **Avoid:** Shipping without testing with real Supabase/email service. Stubs hide integration bugs.

- **(e) You need to swap the AI model from Claude to GPT-4.** Agents often get vendor-locked.
  - ✅ **If you have a stable interface:** Swap the implementation behind the interface. One line change, UI untouched.
  - ❌ **If AI calls are scattered:** You have to rewrite everywhere. This is why stable interfaces matter.

---

**Rubric checklist (self-review before submission):**

| Criterion | Check (✅ = pass) |
|-----------|-------------|
| **Workflow designed** | Clear breakdown: responsibilities, tools, hand-offs documented |
| **Tools defined** | At least 2 tools with clear I/O and descriptions for the model |
| **AI call structured** | Behind an interface (e.g., `ReminderDrafter`); not scattered in components |
| **Test stub included** | Stub implements the same interface; tests use it (no live API) |
| **Human checkpoint** | Drafts shown to human before any consequential action (send/spend/delete) |
| **Guardrails named** | ≥2 identified (e.g., input validation, loop limits, retry logic, logging) |
| **Guardrails implemented** | Each guardrail is in code (not just in write-up) |
| **Failure modes documented** | Short write-up: "If X fails, we do Y because Z" |
| **Workflow tested end-to-end** | Runs locally; fetch → agent loop → approval queue → action all work |

*Pass mark: 80% and a working, guard-railed workflow submitted.*

---

## Tools & alternatives (this module)

The patterns are framework-agnostic. Build a simple agent loop directly against a model's tool-use/function-calling API, or use an orchestration framework for graph-based, checkpointed workflows when complexity grows. MCP is the emerging standard for connecting tools/data and swapping models. Default: start simple (single-agent loop, direct tool calls); adopt a framework only when the workflow demands it.

---

## Key takeaways

- An agent = LLM + goal + tools; a workflow chains tool calls into a multi-step automation.
- Building blocks: tools (function calling), the reason→act→observe loop, MCP for connecting tools/models.
- Design before building: responsibilities, tools, hand-offs; start with a single-agent loop.
- Put the AI call behind a stable interface so it's testable (stub) and swappable.
- Always human-in-the-loop before consequential actions; reliability (limits, validation, least privilege, logging) is the real work.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)