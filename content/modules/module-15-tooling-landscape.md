# Module 15: The Tooling Landscape & How to Choose

**Stage:** Landscape · **Level:** All levels · **Duration:** ~3 contact hours (0.3 CEU)

**Prerequisites:** Modules 1–14. Learners have built a full app on the default stack and seen the per-module "alternatives" callouts. This module consolidates them into one comparative view and a repeatable way to choose.

> The whole course taught one opinionated stack so learners could go deep without decision paralysis. This final module zooms out: it gathers every alternative named along the way, teaches *how* to evaluate tools, and has learners defend stack choices for scenarios other than the invoice tracker. The point is transfer — walk into any project and pick sensibly. This is the course's highest-order skill: judgment.
> 

## Learning objectives

By the end of this module, the learner can:

1. **Analyze** trade-offs (cost, lock-in, performance, ecosystem) among alternatives at each layer. *(Analyze)*
2. **Recommend** an appropriate stack for a given scenario and defend the recommendation. *(Evaluate)*

---

## Lesson 15.1 — Why tools change and skills don't (~20 min)

Return to the course's founding idea (Module 1): tools are *vehicles*; the durable skills are prompting, planning, building, designing, debugging, securing, shipping, and working in real codebases. The AI tooling landscape in 2026 changes monthly — tools merge, rebrand, get acquired, shift pricing. Tie your competence to skills, not tools, and you can adopt whatever's best at any moment. So this module isn't "memorize the options" — it's "learn to evaluate options."

---

## Lesson 15.2 — The landscape, layer by layer (~50 min)

Supports Objective 1 — the consolidated version of the per-module callouts:

| Layer | Course default | Notable alternatives |
| --- | --- | --- |
| In-editor AI | Cursor | VS Code + Copilot, Zed, Windsurf, JetBrains AI |
| Agentic / terminal | Claude Code | Codex CLI, Copilot agent mode, Cline, [Continue.dev](http://Continue.dev) |
| App framework | Next.js | Remix, Astro, SvelteKit, React + Vite |
| UI / components | shadcn/ui + Tailwind | Tailwind UI, DaisyUI, Radix, MUI, Chakra |
| Backend / DB / auth | Supabase | Firebase, Postgres + Prisma, Neon, PlanetScale, Appwrite |
| Version control host | GitHub | GitLab, Bitbucket |
| Deployment | Vercel | Netlify, Railway, Render, Cloudflare, AWS |
| Agent orchestration | Direct tool-use / MCP | Graph/workflow frameworks (adopt when complex) |
| Testing | Vitest/Jest + Playwright | Cypress, other runners |

For a beginner or a fast MVP, the course default stack is genuinely strong at every layer — alternatives matter when a project's specific needs pull you elsewhere.

---

## Lesson 15.3 — How to evaluate a tool (~40 min)

Delivers Objective 1. A repeatable set of criteria for any option:

- **Fit for the task** — does it match what this project needs? (Biggest factor.)
- **Cost** — pricing model and how it scales (Cursor's credits; Supabase's free tier; LLM usage costs).
- **Lock-in** — how hard is it to leave? (Real Postgres exports easily; some platforms trap data.)
- **Performance** — speed/scalability for your case.
- **Ecosystem & community** — docs, tutorials, integrations, hiring pool (why Next.js/GitHub are safe defaults).
- **Learning curve** — how fast can you (or your team) be productive?

Meta-lesson: there's no "best" tool, only the best *fit* for a project and team — weighted differently for a weekend prototype vs. a funded startup.

---

## Lesson 15.4 — Choosing a stack for a scenario (~40 min)

Delivers Objective 2 — the course's top skill. Work scenarios where the default may or may not be the answer:

- **Realtime / mobile-first app** → Firebase's realtime + mobile SDKs may beat Supabase; weigh NoSQL/lock-in.
- **SQL-heavy internal tool, team already on VS Code** → keep Postgres; VS Code + Copilot over Cursor to match the team.
- **Python API with a long-running worker** → Railway/Render over Vercel.
- **Cost-sensitive solo MVP** → the default stack is close to ideal; consider free/open-source (Cline) to cut cost.
- **Enterprise with strict compliance** → more control (self-managed Postgres, AWS/Cloudflare).

For each, state a recommendation *and the reasons*, referencing the 15.3 criteria. "It depends" is only good followed by "...on these factors, so I'd choose X."

---

## Hands-on activity (~40 min, folded in)

**"Stack pitch."** Each learner gets (or picks) a project brief different from the invoice tracker — a booking app, a realtime dashboard, a mobile-first social app. They choose a full stack layer by layer and write a one-paragraph justification per layer using the 15.3 criteria, noting where and why they deviate from the default. Direct practice for the capstone's "defend your decisions" criterion.

---

## Quiz questions (preview)

These are the three questions you'll see on the quiz. Study these to prepare:

**Q15-1:** The purpose of learning the tooling landscape is:
- (a) to memorize every tool
- (b) **to understand which tool solves which problem** ✓
- (c) to pick one and ignore others
- (d) tools don't matter

*Why:* You're not memorizing a static list — you're learning to think. "Which tool fits this project?" beats "know all tools." The landscape changes; judgment transfers.

**Q15-2:** Which is NOT a reason to pick a tool?
- (a) it solves your problem
- (b) your team knows it
- (c) **everyone else uses it** ✓
- (d) it's free

*Why:* Popularity is not a reason. Real reasons: it solves your actual problem, your team can use it, the cost is right, and you can adopt it fast. "Everyone uses it" is herd mentality, not strategy.

**Q15-3:** After this course, the best way to stay current is:
- (a) stop learning
- (b) **follow release notes and communities for tools you use** ✓
- (c) memorize docs
- (d) use only old tools

*Why:* You'll use a tool stack; stay tuned to its evolution (GitHub, Vercel, Supabase news, their communities). You can't stay current on *everything* — that's exhausting and pointless. Stay current on what you ship with.

---

## Knowledge check (mapped to objectives)

**Objective 1 — Analyze:** for two options at one layer (e.g. Supabase vs. Firebase), compare across cost, lock-in, performance, ecosystem.

**Objective 2 — Recommend & defend:** given a project brief, recommend a full stack and justify each layer, with at least one deliberate deviation from the default and why.

*Pass mark: 80% and a defensible stack recommendation submitted.*

---

## Tools & alternatives (this module)

This module *is* the tools-and-alternatives capstone — every layer at once. The durable takeaway: you have both a proven default stack and a method for choosing differently when a project demands it.

---

## Key takeaways

- Tools are vehicles; your skills are the asset — the landscape changes monthly, judgment doesn't.
- Know the main options at each layer, but don't memorize — learn to evaluate.
- Weigh tools on fit, cost, lock-in, performance, ecosystem, and learning curve.
- There's no best tool, only the best fit for a given project and team.
- "It depends" is useful only when you can name what it depends on and then decide.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)