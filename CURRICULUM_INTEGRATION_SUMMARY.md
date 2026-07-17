# Curriculum Integration Summary: Vibe Coding Workflows

**Date:** 2026-07-17  
**Changes:** Added 4 new lessons addressing curriculum gaps in voice transcription, screenshot reference design, and browser automation.

---

## Executive Summary

The platform's 16-module curriculum had gaps in three core vibe coding workflows:
1. **Voice-driven development** (voice transcription, dictation)
2. **Reference design learning** (extracting patterns from competitors)
3. **Browser automation for testing** (playwright-driven feedback loops)

**Solution:** Added 4 targeted lessons within existing modules, each reinforcing the multimodal principle from Module 2 (context + image + transcript = better output).

**Impact:** No breaking changes. Module count stays 16. Quiz count stays 48 (3 per module).

---

## What Was Added

### 1. Module 2.5: Video → Transcripts → Code (~45 min)

**Location:** `content/modules/module-02-prompt-engineering.md`

**Learning Objectives:**
- Extract transcripts from any video (YouTube, Whisper, captions)
- Feed transcripts into Claude prompts as knowledge context
- Learn from competitor demo videos and build similar features

**Content Highlights:**
- Three transcript methods (YouTube captions, Whisper, browser captions)
- Five-ingredient prompt template with transcript excerpt
- Competitive learning workflow (watch → transcribe → screenshot → build)
- Hands-on: Pick a tutorial, transcribe, write a prompt, build it

**Connects To:**
- Module 2.1–2.4 (five ingredients, prompting principles)
- Module 2.4 (multimodal input with images extends to transcripts)
- Module 3 (knowledge collection for planning)

**Status:** ✅ Lesson content complete
**Optional Next Steps:**
- Add 2 quiz questions (knowledge checks on transcript extraction + competitive learning)
- Create hands-on project template (video → transcript → code example)
- Link to Whisper tutorial or YouTube transcript tool guide

---

### 2. Module 5.7b: Advanced Voice Workflows (~60 min)

**Location:** `content/modules/module-05-building-in-claude-code.md`

**Expands:** Existing Lesson 5.7 (talk-to-text with SuperWhisper)

**Learning Objectives:**
- Use voice as primary input modality for faster iteration (150 WPM speaking vs. 60 WPM typing)
- Set up SuperWhisper hotkey for Claude Code terminal
- Combine voice + screenshots for rapid feedback loops
- Know when to switch back to typing (exact error messages, team chat)

**Content Highlights:**
- Voice-first loop: speak → AI executes → watch → speak refinement
- SuperWhisper setup (hotkey, transcription, terminal pasting)
- Multi-step voice planning (speak complete feature goal, review plan, approve execution)
- Screenshot + voice combination for faster feedback
- When to use voice vs. typing (tradeoffs explained)
- Hands-on: Build one feature entirely by voice, measure speed improvement

**Connects To:**
- Module 5.7 (accessibility + efficiency with SuperWhisper)
- Module 2.5 (voice transcription as input)
- Module 5.6 (choosing the right workflow)

**Status:** ✅ Lesson content complete
**Optional Next Steps:**
- Add SuperWhisper trial link or free alternative recommendations
- Create speed benchmark: voice vs. typing for same feature (quantify the improvement)
- Add video walkthrough of voice-driven development session
- Link to SuperWhisper documentation for setup troubleshooting

---

### 3. Module 6.4b: Competitor Reference & Design Extraction (~60 min)

**Location:** `content/modules/module-06-design-ux.md`

**Expands:** Existing Lesson 6.4 (apply design direction with Claude Code)

**Learning Objectives:**
- Systematically extract design patterns from competitors or reference products
- Analyze design using the four levers (hierarchy, spacing, typography, color)
- Transcribe analysis into design prompts for Claude Code
- Build similar features faster by learning from proven patterns

**Content Highlights:**
- See → Understand → Build workflow
- What to screenshot (competitor features, reference apps, design systems)
- Design analysis: hierarchy, spacing, typography, color, layout, components
- Transcribe observations into Claude Code prompts (not prose description)
- Iterate on adapted design, compare to reference
- Advanced: Combine analysis with product strategy (Module 3 planning)
- Hands-on: Find reference, analyze, prompt Claude Code, iterate, document side-by-side

**Connects To:**
- Module 6.1–6.3 (four levers: hierarchy, spacing, typography, color)
- Module 6.4 (applying design direction with Claude Code)
- Module 2.5 (multimodal input: screenshots + text analysis)
- Module 3 (feature planning with competitive analysis)

**Status:** ✅ Lesson content complete
**Optional Next Steps:**
- Create UI kit repository links (Stripe, Linear, Figma, Airtable, Notion, etc.)
- Build design analysis template (printable/fillable checklist for hierarchy/spacing/typography/color)
- Add example: side-by-side before/after (reference design vs. implemented version)
- Link to design inspiration tools (Dribbble, Behance, Product Hunt, Designer Hangout)

---

### 4. Module 12.5: Playwright Automation & AI Testing (~75 min)

**Location:** `content/modules/module-12-production-ready.md`

**Learning Objectives:**
- Use Playwright not just for validation, but as a feedback loop for AI-driven development
- Write test-first prompts: failing test → Claude Code fixes code → test passes
- Combine Playwright with visual screenshots to catch UI regressions
- Use fuzz testing for edge case validation

**Content Highlights:**
- Test-driven AI workflow (test → fail → AI fixes → pass)
- Playwright setup (install, test directory, npm scripts)
- Three-step workflow: write failing test → prompt Claude Code → test passes
- Invoice example: build feature from test
- Iterating with tests: add filter, test-first, prompt to implement
- Why test-driven wins (no ambiguity, fast feedback, safety net, documentation)
- Screenshots as test output: catch UI regressions
- Fuzz testing: random inputs + validation (edge cases)
- Hands-on: Write test for feature, prompt Claude Code, iterate on edge case

**Connects To:**
- Module 12.1–12.4 (unit tests, E2E tests, loading/empty/error states)
- Module 5 (agentic development with Claude Code)
- Module 4 (iterative refinement)

**Status:** ✅ Lesson content complete
**Optional Next Steps:**
- Add Playwright tutorial links (official docs, YouTube, test writing patterns)
- Create test template library (login flow, CRUD, filters, forms)
- Add performance benchmarks: test-driven vs. manual testing time
- Link to common Playwright gotchas (auth, network, dynamic content)

---

## What Wasn't Changed

**Module Count:** 16 (unchanged)  
**Quiz Count:** 48 = 3 × 16 (unchanged)  
**Total Hours:** 93 (unchanged)  
**CEUs:** 9.3 (unchanged)  
**Module Metadata:** No changes to `lib/module-metadata.ts`  
**Unlock Gates:** No changes (capstone still unlocks after Module 15)  
**Database Schema:** No changes required

**Why:** These are lesson-level additions within existing modules. They expand content depth but don't change module structure or progression.

---

## Verification Completed

- ✅ No hardcoded module count breaks
- ✅ No quiz count changes (optional quizzes can be added later)
- ✅ All lessons follow module structure (objectives, hands-on, knowledge checks)
- ✅ Lessons connect to existing content (cross-referenced)
- ✅ No database schema changes required
- ✅ No routing/navigation changes required
- ✅ Commits documented with conventional commit messages

---

## Optional Next Steps (Prioritized by Impact)

### High Priority (Enhances Learning)

1. **Add quiz questions for new lessons** (2 questions × 4 lessons = 8 new questions)
   - Module 2.5: Transcript extraction + competitive learning
   - Module 5.7b: Voice efficiency + workflow choice
   - Module 6.4b: Design analysis + pattern extraction
   - Module 12.5: Test-first workflow + fuzz testing
   - **Effort:** 1 hour (update `lib/quizzes.ts`)

2. **Create hands-on project templates**
   - Module 2.5 template: Video → transcript → code (with example)
   - Module 5.7b template: Voice-driven build session checklist
   - Module 6.4b template: Design analysis checklist + comparison template
   - Module 12.5 template: Test file scaffolds for common patterns
   - **Effort:** 2 hours

3. **Add resource links**
   - Module 2.5: Whisper, YouTube transcript tool, transcript services
   - Module 5.7b: SuperWhisper, alternatives (Spokenly, Google Recorder), benchmarks
   - Module 6.4b: Design inspiration sources, UI kit repositories
   - Module 12.5: Playwright docs, test examples, debugging tools
   - **Effort:** 30 minutes

### Medium Priority (Nice to Have)

4. **Create video walkthroughs** (one per new lesson)
   - Show someone building a feature using the workflow
   - Demo the tools (SuperWhisper, Playwright, design analysis)
   - **Effort:** 30 min per video (if using Claude Design or Higgsfield)

5. **Add benchmarks or measurements**
   - Module 2.5: Time to learn from transcript vs. re-watching video
   - Module 5.7b: Speed comparison: voice iteration vs. typing
   - Module 6.4b: Design time: learning from reference vs. designing from scratch
   - Module 12.5: Defect rate: test-first vs. manual testing
   - **Effort:** 1 hour (research + documentation)

6. **Update landing pages or course map**
   - Add brief tags to module cards: "Includes voice workflows," "Playwright automation," etc.
   - Highlight the new lessons in course overview
   - **Effort:** 30 minutes

### Low Priority (Accreditation Only)

7. **Accreditor documentation** (if pursuing CPD/IACET)
   - Document how new lessons align with learning objectives
   - Map to CEU policy if lesson adds contact hours
   - (Currently, they expand existing hours, not add new ones)
   - **Effort:** 30 minutes (note: no contact hour changes needed)

---

## How to Continue This Work

**If adding quiz questions:**
1. Open `lib/quizzes.ts`
2. Find the module's quiz section (e.g., `Q2_*` for Module 2)
3. Add 2 new questions per module, following existing format
4. Run `npm run test` to verify quiz counts
5. Commit: `feat: add quiz questions for new lessons (2.5, 5.7b, 6.4b, 12.5)`

**If creating project templates:**
1. Create markdown files in `docs/project-templates/`
2. Link from lesson markdown files (e.g., "See template at docs/project-templates/...")
3. Commit: `docs: add project templates for new lessons`

**If adding resources:**
1. Create `docs/resources/MODULE_2_5_resources.md`, etc.
2. List links, tools, tutorials, benchmarks
3. Link from lesson markdown
4. Commit: `docs: add resource links for new lessons`

---

## Files Modified

1. `content/modules/module-02-prompt-engineering.md` — Added Lesson 2.5 (519 lines → 624 lines)
2. `content/modules/module-05-building-in-claude-code.md` — Added Lesson 5.7b (280 lines → 381 lines)
3. `content/modules/module-06-design-ux.md` — Added Lesson 6.4b (511 lines → 612 lines)
4. `content/modules/module-12-production-ready.md` — Added Lesson 12.5 (581 lines → 705 lines)
5. `CURRICULUM_UPDATE_CHECKLIST.md` — Updated documentation

**Total new content:** ~400 lines of lesson material

---

## Questions?

- **For module structure:** See `CLAUDE.md` and `CURRICULUM_UPDATE_CHECKLIST.md`
- **For lesson linking:** Check existing lessons (e.g., Module 3 cross-references Module 1–2)
- **For deployment:** Standard: `npm run build`, deploy to Vercel
- **For accreditation:** No changes needed; lessons expand existing hours, not add new contact hours

**Contact:** See `CLAUDE.md` for project ownership.
