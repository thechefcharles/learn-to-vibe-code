# Module 12: AI Agent Workflows

**Stage:** Production · **Level:** Advanced · **Duration:** ~7 contact hours (0.7 CEU)

**Prerequisites:** Modules 5, 7 & 10. Learners can build agentically (5), have a real database (7), and a deployed app (10). Now they build agentic behavior *into* a product.

> Important distinction up front: Module 6 was **using an agent to build your app**. This module is **building an agent workflow as a feature** — software that uses an LLM plus tools to automate a real, multi-step task on its own. This is where "AI app developer" becomes "AI automation engineer." The running example: an assistant that drafts reminder emails for overdue invoices, with a human approving before anything sends.

> **📸 Screenshots:** Items marked *[SCREENSHOT: …]* — the approval-queue UI is auto-capturable; a live workflow run is manual.

## Learning objectives

By the end of this module, the learner can:

1. **Design and build** a multi-step agent/tool workflow that automates a real task. *(Create)*
2. **Break down** a workflow into agent responsibilities, tools, and hand-offs. *(Analyze)*
3. **Structure** an AI call behind a stable interface so it is testable and swappable. *(Apply)*
4. **Assess** the reliability and failure modes of an agentic workflow. *(Evaluate)*

> **Version note:** agent frameworks and APIs change fast. Teach the durable patterns — tools, orchestration, hand-offs, human-in-the-loop, failure handling — so the skill outlives any framework. Treat every model ID and SDK signature in this module as a placeholder: pin the current model and check the provider docs before you ship.

---

## Lesson 12.1 — What is an agent workflow? (~40 min)

An **agent** is an LLM given a goal plus **tools** it can call to act (query a database, send an email, call an API). An **agent workflow** chains these into a multi-step process — the model decides which tools to use, in what order, reacting to results.

Contrast: a normal function does exactly what you coded; an agent *decides* within the goal and tools you gave it. That flexibility is the power (handles messy inputs) and the risk (it can decide wrong) — which is why reliability (Lesson 12.5) is half this module.

---

## Lesson 12.2 — The building blocks (~45 min)

- **Tools (function calling)** — functions you define and describe so the model can request a call with arguments; your code runs it and returns the result. Example tools: `getOverdueInvoices()`, `draftReminderEmail(invoice)`, `sendEmail(draft)`.
- **The agent loop** — the model reasons, optionally calls a tool, reads the result, repeats until done (ReAct-style: reason → act → observe). Critically, this loop only happens if you *ask for it*: a single model call runs one turn and stops. You give it a stop condition — "keep going for up to N steps, or until you stop calling tools" — and the SDK runs the reason→act→observe cycle for you.
- **MCP (Model Context Protocol)** — a standard way to give agents access to tools/data, so you can plug in capabilities (and swap models) without rewiring. You met MCP-style tools in Claude Code.

Keep it concrete: an agent is a loop of *decide → call a tool → look at the result → decide again*, bounded by a step limit you set.

---

## Lesson 12.3 — Orchestration patterns (~45 min)

Begins Objective 2. Three patterns learners choose between:

| Pattern | Shape | Use when |
| --- | --- | --- |
| **Single-agent tool loop** | One agent, several tools, looping | Most tasks — start here; simplest, most reliable |
| **Supervisor / foreman** | One orchestrator delegates to specialists | Distinct sub-tasks benefit from focused agents |
| **Graph / workflow** | Explicit steps (nodes) + paths (edges), with checkpoints | You need predictable, inspectable, resumable flows |

**Beginner advice:** start with the single-agent tool loop. Reach for multi-agent/graph only when a single agent genuinely struggles — more agents means more ways to fail. Simplicity is a reliability feature.

---

## Lesson 12.4 — Break a workflow into parts (~40 min)

**In this lesson:** Before you build an agent workflow, decompose it (using the Module 4 habit). For each workflow, define three critical things: **responsibilities** (what does the agent decide vs. your code), **tools** (specific actions with clear input/output), and **hand-offs** (how the agent hands off to tools, and crucially back to humans for approval — never let an agent act alone).

**Worked breakdown — the overdue-invoice reminder assistant:**

1. Tool `getOverdueInvoices()` → overdue invoices from Supabase.
2. Agent drafts a personalized reminder per invoice.
3. **Hand-off to human**: show drafts for review/approval.
4. Tool `sendEmail(draft)` → sends only approved ones. Notice: this tool is **not** handed to the agent — your code calls it, only after a human clicks Approve.

*[SCREENSHOT: a diagram of the reminder-assistant workflow — tool to agent to human approval to tool.]*

---

## Lesson 12.5 — Build it + the stable-interface pattern (~75 min)

This delivers Objectives 1 and 3. Implement the reminder assistant in the invoice-tracker.

**Step 1 — Define the tools** the agent may call. The agent gets only the *safe, reversible* tools: fetching data and drafting text. The irreversible action (sending) stays out of the agent's hands.

**Step 2 — Structure the AI call behind a stable interface (Objective 3).** Put the actual model call behind a function like `draftReminder(invoice): Promise<Draft>` so the rest of your app (and your tests) never touches the AI SDK directly:

```ts
// lib/ai/draftReminder.ts
export interface ReminderDrafter { draft(invoice: Invoice): Promise<Draft>; }
// swap a stub in tests; swap the real model in prod — the UI never changes
export const draftReminder: ReminderDrafter = realOrStubDrafter();
```

Why: you can **stub** it for tests (no live AI calls, deterministic), and **swap** models later without touching the UI. This is the pattern that makes agent features testable and maintainable.

**Step 3 — Run the agent loop:** give the model the goal and its tools, and a **stop condition**. Without one, the model calls a tool once and stops — you never get the multi-step loop.

**Step 4 — Insert the human checkpoint:** render the drafts the agent produced with Approve/Edit/Reject before anything sends. **Never let the agent send email autonomously** — Module 2's trust principle at production stakes.

**Step 5 — Send approved drafts** via `sendEmail` (mock or real), from your own code, only for drafts a human approved.

*[SCREENSHOT: the app showing AI-drafted reminders in an approval queue.]*

### A full, runnable worked example

Below is the whole round-trip end to end, using the Vercel AI SDK (our default stack). Two tools are defined with the `tool()` helper and a Zod `inputSchema`; the agent loop is bounded with `stopWhen: stepCountIs(...)`; and the irreversible send happens **after** a human approves — outside the agent loop.

```ts
// lib/ai/reminderAgent.ts
import { generateText, tool, stepCountIs } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';

// Pin the current model ID — model names and SDK signatures change.
// Check the provider docs before shipping.
const MODEL = anthropic('claude-sonnet-4-5');

// --- Tool 1: fetch overdue invoices (read-only, safe to let the agent call) ---
const getOverdueInvoices = tool({
  description: 'Fetch invoices that are overdue as of a given date.',
  inputSchema: z.object({
    before: z.string().describe('ISO date; invoices due before this are overdue'),
  }),
  execute: async ({ before }) => {
    // Real code: query Supabase. Mocked here for the example.
    return [
      { id: 'inv_1021', customer: 'Acme Co', email: 'ap@acme.example', amount: 4200, dueDate: '2026-06-30' },
      { id: 'inv_1044', customer: 'Globex',  email: 'billing@globex.example', amount: 900, dueDate: '2026-07-02' },
    ];
  },
});

// --- Tool 2: draft a reminder (produces text only — reversible, safe) ---
const draftReminderEmail = tool({
  description: 'Compose a friendly, professional payment-reminder email for one invoice.',
  inputSchema: z.object({
    invoiceId: z.string(),
    customer: z.string(),
    email: z.string(),
    amount: z.number(),
    dueDate: z.string(),
  }),
  execute: async ({ invoiceId, customer, email, amount, dueDate }) => {
    // The draft is returned to the agent; nothing is sent here.
    return {
      invoiceId,
      to: email,
      subject: `Friendly reminder: invoice ${invoiceId} is overdue`,
      body: `Hi ${customer}, our records show invoice ${invoiceId} for $${amount} `
          + `(due ${dueDate}) is now overdue. Could you take a look when you get a chance? Thank you!`,
    };
  },
});

// Run the agent LOOP: it fetches invoices, then drafts one email per invoice.
// stopWhen makes it loop across multiple tool calls instead of stopping after one.
export async function draftAllReminders() {
  const result = await generateText({
    model: MODEL,
    tools: { getOverdueInvoices, draftReminderEmail },
    stopWhen: stepCountIs(6), // bound the loop — a stuck agent stops
    system:
      'You are a billing assistant. First fetch overdue invoices, then draft one '
      + 'reminder email for each. Do not send anything — only draft.',
    prompt: 'Prepare overdue-invoice reminders as of 2026-07-18.',
  });

  // Collect the drafts the agent produced across all steps.
  const drafts = result.toolResults
    .filter((r) => r.toolName === 'draftReminderEmail')
    .map((r) => r.result);

  return drafts; // hand these to the human approval queue — see below
}
```

The **human-approval gate** and the irreversible send live *outside* the loop. `sendEmail` was never given to the agent:

```ts
// app/reminders/actions.ts
import { draftAllReminders } from '@/lib/ai/reminderAgent';
import { sendEmail } from '@/lib/email'; // irreversible — humans gate this, not the agent

// 1) Agent drafts; UI shows the queue.
export async function loadDraftQueue() {
  return draftAllReminders();
}

// 2) A human clicks Approve on a specific draft; only then do WE send it.
export async function approveAndSend(draft: { to: string; subject: string; body: string }) {
  await sendEmail(draft); // runs only for human-approved drafts
  return { status: 'sent', to: draft.to };
}
```

**Sample round-trip** (what actually happens when you run it):

```text
step 1  agent → tool  getOverdueInvoices({ before: "2026-07-18" })
        tool  → agent  [inv_1021 Acme Co $4200, inv_1044 Globex $900]
step 2  agent → tool  draftReminderEmail({ invoiceId: "inv_1021", customer: "Acme Co", ... })
        tool  → agent  { subject: "Friendly reminder: invoice inv_1021 is overdue", body: "Hi Acme Co, ..." }
step 3  agent → tool  draftReminderEmail({ invoiceId: "inv_1044", customer: "Globex", ... })
        tool  → agent  { subject: "Friendly reminder: invoice inv_1044 is overdue", body: "Hi Globex, ..." }
step 4  agent → text  "Drafted 2 reminder emails. Ready for your review."
        loop stops (no more tool calls)

--- HUMAN APPROVAL GATE (in the UI) ---
  inv_1021  Acme Co   [Approve] [Edit] [Reject]   → Approved
  inv_1044  Globex    [Approve] [Edit] [Reject]   → Rejected

approveAndSend(draft for inv_1021)  →  sendEmail(...)  →  { status: "sent", to: "ap@acme.example" }
inv_1044 is never sent.
```

Read the shape: **tool → agent → approval → tool**. The agent loops over the safe tools; the human is the switch on the one irreversible action.

---

## Lesson 12.6 — Reliability & failure modes (~55 min)

Delivers Objective 4 — what separates a demo from a product. Anticipate each failure:

- **Hallucination** — invents data or calls a tool with wrong arguments.
- **Loops** — repeats a step without progressing (this is why `stopWhen`/`maxSteps` is not optional).
- **Tool misuse** — wrong tool, or the right tool at the wrong time (e.g. sending before approval).
- **Cascading errors** — one bad step feeds the next; failures compound in multi-agent setups.

**Guardrails:** human-in-the-loop for anything consequential (send/spend/delete) — the single most important safeguard; **limits** on steps/loops (`stopWhen: stepCountIs(N)`) so a stuck agent stops; **validation** of tool inputs/outputs in your code (a Zod `inputSchema` gives you this for free); **least privilege** (a reminder agent can't delete invoices — and never holds the `sendEmail` tool); **logging** so you can debug and audit (previews Module 13).

**Critical thinking exercise:** For your own workflow, ask: **"What's the worst thing this agent could do if it went wrong?"** That question should drive every guardrail you build. If the answer is "delete all user data," you need human approval on every action. If it's "send a malformed email," logging and validation are critical.

---

## Lesson 12.7 — Agent frameworks & production patterns (~60 min)

**What you'll learn:** the frameworks and libraries you'll actually use in production, when to reach for each, and how they compare. The patterns from Lessons 12.1–12.6 work with any of these; this lesson shows you the ecosystem.

### The landscape: four approaches

| Approach | Best For | Complexity | Dependencies |
|----------|----------|-----------|--------------|
| **Direct API** | Simple agents, prototypes, learning | Low | Zero |
| **Vercel AI SDK** | Next.js apps, streaming, default stack | Low-Medium | Lightweight |
| **LangChain** | Complex multi-step workflows, RAG | Medium-High | Heavy (50MB+) |
| **CrewAI** | Multi-agent orchestration | High | Medium |

### Approach 1: Direct API

You've already learned this: call the Claude API directly with tool definitions and write the reason→act→observe loop yourself. No dependencies, full control, best for understanding what the higher-level libraries are doing under the hood.

### Approach 2: Vercel AI SDK (🎯 recommended for your stack)

**Why it's a great fit:**
- Built by Vercel (your deployment platform)
- Native support for Claude
- Designed for Next.js server actions and API routes
- Excellent streaming support
- No bloat (lightweight)
- TypeScript-first

**Installation:**
```bash
npm install ai @ai-sdk/anthropic zod
```

**Basic agent loop:** note the `tool()` helper with a Zod `inputSchema`, and `stopWhen` — without a stop condition this runs one turn and stops instead of looping.

```typescript
import { generateText, tool, stepCountIs } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';

const result = await generateText({
  // Pin the current model ID — model names and APIs change; check the provider docs.
  model: anthropic('claude-sonnet-4-5'),
  tools: {
    getInvoices: tool({
      description: 'Get invoices for a customer',
      inputSchema: z.object({
        customerId: z.string(),
        status: z.enum(['paid', 'unpaid']).optional(),
      }),
      execute: async ({ customerId, status }) => {
        return await fetchInvoices(customerId, status);
      },
    }),
  },
  stopWhen: stepCountIs(5), // makes it an actual agent loop, not a single call
  system: 'You are a helpful invoice assistant.',
  prompt: 'Show me unpaid invoices for customer ABC123.',
});

console.log(result.text);
```

**Pros:** Lightweight, streaming-friendly, perfect for Next.js, excellent TypeScript support, no lock-in.
**Cons:** Simpler than LangChain, fewer Stack Overflow examples.

### Approach 3: LangChain (industry standard)

**Why it's popular:**
- Most mature agent framework
- Huge ecosystem (200+ integrations)
- Great for RAG, document processing
- Strong community

**Why it's heavy:**
- 50MB+ of dependencies
- Frequent breaking changes
- Steep learning curve

**Installation:**
```bash
npm install langchain @langchain/anthropic
```

**Pros:** Handles complex workflows, great for RAG, huge community.
**Cons:** Overkill for simple agents, heavy dependencies, steep learning curve.

### Approach 4: CrewAI (multi-agent orchestration)

**When to use:** you need multiple independent agents working together, delegating tasks, specialized roles.

**Note:** CrewAI is Python-first. For Node.js multi-agent, use LangGraph or build your own orchestration.

**Pros:** Agents have distinct roles, natural delegation, great for complex problems.
**Cons:** Python-based, more overhead for simple tasks.

### Decision tree

```
Do you need Next.js/streaming?
├─ Yes → Use Vercel AI SDK (recommended)
└─ No → Do you need complex workflows or RAG?
   ├─ Yes → Use LangChain
   └─ No → Use Direct API
```

### Real example: invoice reminder agent (Vercel AI SDK)

The same principle as Lesson 12.5 carries over to any framework: the agent gets the safe drafting tool; **sending stays behind the human approval gate and is never an agent tool.**

```typescript
// lib/invoice-agent.ts
import { generateText, tool, stepCountIs } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';

export async function draftReminders(customerId: string) {
  const result = await generateText({
    // Pin the current model ID; check the provider docs.
    model: anthropic('claude-sonnet-4-5'),
    tools: {
      getOverdueInvoices: tool({
        description: 'Get invoices overdue more than 30 days',
        inputSchema: z.object({ customerId: z.string() }),
        execute: async ({ customerId }) => db.findOverdueInvoices(customerId, 30),
      }),
      draftReminder: tool({
        description: 'Draft a payment-reminder email (does not send it)',
        inputSchema: z.object({
          email: z.string(),
          invoiceId: z.string(),
        }),
        execute: async ({ email, invoiceId }) => {
          // Returns a draft only. sendEmail() is NOT a tool here —
          // your code sends it after a human approves (see Lesson 12.5).
          return { to: email, invoiceId, body: await composeReminder(invoiceId) };
        },
      }),
    },
    stopWhen: stepCountIs(6),
    system: 'You are a payment reminder assistant. Draft reminders; never send them.',
    prompt: `Prepare overdue-invoice reminders for customer ${customerId}.`,
  });

  return result.toolResults
    .filter((r) => r.toolName === 'draftReminder')
    .map((r) => r.result);
}
```

### Tools & references

- **Vercel AI SDK** (sdk.vercel.ai) — recommended for your stack
- **LangChain** (langchain.com) — complex workflows, RAG
- **CrewAI** (crewai.com) — Python multi-agent
- **LangGraph** (langchain.com/langgraph) — Node.js alternative to CrewAI

---

## Hands-on activity (~60 min, folded in)

**"Automate a real task."** Design and build a small agent workflow (the reminder assistant or your own) that: (1) uses at least two tools defined with `tool()` + a Zod `inputSchema`, (2) runs an actual agent loop with a `stopWhen`/step limit, (3) has a documented responsibilities/tools/hand-offs breakdown, (4) puts the AI call behind a stable interface with a test stub, (5) includes a human-approval checkpoint before any consequential action (which is *not* an agent tool), and (6) names two guardrails. Deliverable: a working workflow + a short write-up of its failure modes and mitigations.

---

## Knowledge check (mapped to objectives)

**Objective 1 — Build a workflow:** demonstrate a multi-step agent workflow with its tools, its loop/stop condition, and the human checkpoint.

**Objective 2 — Break it down:** for "triage incoming support emails," list responsibilities, tools, hand-offs, and pick an orchestration pattern with justification.

**Objective 3 — Stable interface:** show your AI call behind an interface and the test stub that replaces it.

**Objective 4 — Reliability:** name three ways your workflow could fail and the guardrail for each.

*Pass mark: 80% and a working, guard-railed workflow submitted.*

---

## Tools & alternatives (this module)

The patterns are framework-agnostic. Build a simple agent loop directly against a model's tool-use/function-calling API, or use an orchestration framework for graph-based, checkpointed workflows when complexity grows. MCP is the emerging standard for connecting tools/data and swapping models. Default: start simple (single-agent loop, direct tool calls); adopt a framework only when the workflow demands it.

---

## Key takeaways

- An agent = LLM + goal + tools; a workflow chains tool calls into a multi-step automation.
- Building blocks: tools (function calling), the reason→act→observe loop, MCP for connecting tools/models.
- The agent loop needs an explicit stop condition (`stopWhen`/`maxSteps`) — a bare `generateText` call runs one turn and does not loop through multiple tool calls.
- Define tools with the `tool()` helper and a Zod `inputSchema` — that also validates the agent's arguments for you.
- Design before building: responsibilities, tools, hand-offs; start with a single-agent loop.
- Put the AI call behind a stable interface so it's testable (stub) and swappable.
- Always human-in-the-loop before consequential actions — keep the irreversible action (send/spend/delete) *out* of the agent's toolset; your code performs it only after approval.
- Reliability (step limits, input validation, least privilege, logging) is the real work.
- Frameworks: Direct API for learning, Vercel AI SDK for the Next.js stack, LangChain for heavy RAG/workflows, CrewAI/LangGraph for multi-agent. Pick the simplest tool for the job — complexity earns its weight.
