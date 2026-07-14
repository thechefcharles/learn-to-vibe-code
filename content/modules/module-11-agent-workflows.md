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

*[SCREENSHOT: a diagram of the reminder-assistant workflow (tool → agent → human approval → tool).]*

---

## Lesson 11.5 — Build it + the stable-interface pattern (~75 min)

This delivers Objectives 1 and 3. Implement the reminder assistant in the invoice-tracker.

**Step 1 — Define the tools** (functions + descriptions the model can call): `getOverdueInvoices`, `draftReminderEmail`, `sendEmail`.

**Step 2 — Structure the AI call behind a stable interface (Objective 3).** Put the actual model call behind a function like `draftReminder(invoice): Promise<Draft>` so the rest of your app (and your tests) never touches the AI SDK directly:

```tsx
// lib/ai/draftReminder.ts
export interface ReminderDrafter { draft(invoice: Invoice): Promise<Draft>; }
// swap a stub in tests; swap the real model in prod — the UI never changes
export const draftReminder: ReminderDrafter = realOrStubDrafter();
```

Why: you can **stub** it for tests (no live AI calls, deterministic), and **swap** models later without touching the UI. This is the pattern that makes agent features testable and maintainable.

**Step 3 — Run the agent loop:** give the model the goal and tools; it calls `getOverdueInvoices`, then `draftReminderEmail` for each.

**Step 4 — Insert the human checkpoint:** render drafts with Approve/Edit/Reject before anything sends. **Never let the agent send email autonomously** — Module 1's trust principle at production stakes.

**Step 5 — Send approved drafts** via `sendEmail` (mock or real). Verify end to end.

*[SCREENSHOT: the app showing AI-drafted reminders in an approval queue.]*

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

**"Automate a real task."** Design and build a small agent workflow (the reminder assistant or your own) that: (1) uses at least two tools, (2) has a documented responsibilities/tools/hand-offs breakdown, (3) puts the AI call behind a stable interface with a test stub, (4) includes a human-approval checkpoint before any consequential action, and (5) names two guardrails. Deliverable: a working workflow + a short write-up of its failure modes and mitigations.

---

## Knowledge check (mapped to objectives)

**Objective 1 — Build a workflow:** demonstrate a multi-step agent workflow with its tools and the human checkpoint.

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
- Design before building: responsibilities, tools, hand-offs; start with a single-agent loop.
- Put the AI call behind a stable interface so it's testable (stub) and swappable.
- Always human-in-the-loop before consequential actions; reliability (limits, validation, least privilege, logging) is the real work.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)
---

## Lesson 11.7 — Agent Frameworks & Production Patterns (~60 min)

**What you'll learn:** The frameworks and libraries you'll actually use in production, when to reach for each, and how they compare. The patterns from Lessons 11.1–11.6 work with any of these; this lesson shows you the ecosystem.

---

### The Landscape: Four Approaches

| Approach | Best For | Complexity | Dependencies |
|----------|----------|-----------|--------------|
| **Direct API** | Simple agents, prototypes, learning | Low | Zero |
| **Vercel AI SDK** | Next.js apps, streaming, default stack | Low-Medium | Lightweight |
| **LangChain** | Complex multi-step workflows, RAG | Medium-High | Heavy (50MB+) |
| **CrewAI** | Multi-agent orchestration | High | Medium |

---

### Approach 1: Direct API

You've already learned this: call the Claude API directly with tool definitions. No dependencies, full control, best for understanding.

---

### Approach 2: Vercel AI SDK (🎯 **Recommended for your stack**)

**Why it's a great fit:**
- Built by Vercel (your deployment platform)
- Native support for Claude
- Designed for Next.js server actions and API routes
- Excellent streaming support
- No bloat (30KB gzipped)
- TypeScript-first

**Installation:**
```bash
npm install ai @ai-sdk/anthropic
```

**Basic agent example:**

```typescript
import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

const result = await generateText({
  model: anthropic('claude-3-5-sonnet-20241022'),
  tools: {
    getInvoices: {
      description: 'Get invoices for a customer',
      parameters: {
        type: 'object',
        properties: {
          customerId: { type: 'string' },
          status: { type: 'string', enum: ['paid', 'unpaid'] },
        },
        required: ['customerId'],
      },
      execute: async ({ customerId, status }) => {
        return await fetchInvoices(customerId, status);
      },
    },
  },
  system: 'You are a helpful invoice assistant.',
  prompt: 'Show me unpaid invoices for customer ABC123.',
});

console.log(result.text);
```

**Pros:** Lightweight, streaming-friendly, perfect for Next.js, excellent TypeScript support, no lock-in.  
**Cons:** Simpler than LangChain, fewer Stack Overflow examples.

---

### Approach 3: LangChain (Industry Standard)

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

---

### Approach 4: CrewAI (Multi-Agent Orchestration)

**When to use:** You need multiple independent agents working together, delegating tasks, specialized roles.

**Note:** CrewAI is Python-first. For Node.js multi-agent, use LangGraph or build your own orchestration.

**Pros:** Agents have distinct roles, natural delegation, great for complex problems.  
**Cons:** Python-based, more overhead for simple tasks.

---

### Decision Tree

**Start here:**
```
Do you need Next.js/streaming?
├─ Yes → Use Vercel AI SDK (recommended)
└─ No → Do you need complex workflows or RAG?
   ├─ Yes → Use LangChain
   └─ No → Use Direct API
```

---

### Real Example: Invoice Agent (Vercel AI SDK)

```typescript
// lib/invoice-agent.ts
import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function runInvoiceAgent(customerId: string) {
  const result = await generateText({
    model: anthropic('claude-3-5-sonnet-20241022'),
    tools: {
      getOverdueInvoices: {
        description: 'Get invoices overdue more than 30 days',
        parameters: {
          type: 'object',
          properties: { customerId: { type: 'string' } },
          required: ['customerId'],
        },
        execute: async ({ customerId }) => {
          return await db.findOverdueInvoices(customerId, 30);
        },
      },
      sendReminder: {
        description: 'Send payment reminder email',
        parameters: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            invoiceId: { type: 'string' },
          },
          required: ['email', 'invoiceId'],
        },
        execute: async ({ email, invoiceId }) => {
          await sendReminderEmail(email, invoiceId);
          return { status: 'sent', email, invoiceId };
        },
      },
    },
    system: 'You are a payment reminder assistant. Be friendly and helpful.',
    prompt: `Handle payment reminders for customer ${customerId}.`,
  });

  return result.text;
}
```

---

### Key Takeaways

- **Direct API:** Best for learning and simple cases. Write the loop yourself.
- **Vercel AI SDK:** Best for Next.js. Lightweight, streaming-friendly, perfect for your stack.
- **LangChain:** Best for complex workflows and RAG. Accept the 50MB dependency.
- **CrewAI:** Best for multi-agent collaboration (Python-first).
- **Pick the simplest tool for your job.** Complexity earns its weight.

---

### Tools & References

- **Vercel AI SDK** — https://sdk.vercel.ai (recommended for your stack)
- **LangChain** — https://langchain.com (complex workflows, RAG)
- **CrewAI** — https://crewai.com (Python multi-agent)
- **LangGraph** — https://langchain.com/langgraph (Node.js alternative to CrewAI)

