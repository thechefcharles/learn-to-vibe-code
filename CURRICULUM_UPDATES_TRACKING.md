# Curriculum Update Tracking: Vibe Coding Workflows

**Status:** In Progress  
**Last Updated:** 2026-07-17  
**Total Work Items:** 28 (3 completed, 25 remaining)

---

## ✅ Completed

- [x] Add 4 lesson contents (Module 2.5, 5.7b, 6.4b, 12.5)
- [x] Add 16 quiz questions (8 adult + 8 kids)
- [x] Build passes with new content

---

## 🔴 Critical Path (Do First)

### High Priority: High Impact + Quick
- [ ] **Create project templates** (2 hours)
  - [ ] Module 2.5: Video → Transcript → Build (template: pick-video.md)
  - [ ] Module 5.7b: Voice-Driven Feature Build (template: voice-workflow-checklist.md)
  - [ ] Module 6.4b: Design Analysis Worksheet (template: competitor-analysis.md)
  - [ ] Module 12.5: Test-First Feature Scaffold (template: test-first-template.ts)

- [ ] **Add resource links** (30 min)
  - [ ] Module 2.5: Whisper, YouTube transcript tools, transcript services
  - [ ] Module 5.7b: SuperWhisper, alternatives, performance benchmarks
  - [ ] Module 6.4b: Design inspiration sources, UI kit repos
  - [ ] Module 12.5: Playwright docs, test examples, debugging

- [ ] **Test new quizzes in UI** (30 min)
  - [ ] Load Module 2 quiz, verify 2-6 and 2-7 appear
  - [ ] Load Module 5 quiz, verify 5-4 and 5-5 appear
  - [ ] Load Module 6 quiz, verify 6-5 and 6-6 appear
  - [ ] Load Module 12 quiz, verify 12-5 and 12-6 appear
  - [ ] Test kids versions (k2-4, k2-5, k5-4, k5-5, k6-4, k6-5, k12-4, k12-5)

---

## 🟠 Medium Priority: Nice to Have + Medium Effort

### Content Enhancements (4-6 hours)
- [ ] **Create video walkthroughs** (30 min per lesson = 2 hours)
  - [ ] Lesson 2.5: Watch video → extract transcript → prompt Claude → build feature
  - [ ] Lesson 5.7b: Voice-driven dev session with SuperWhisper
  - [ ] Lesson 6.4b: Screenshot competitor → analyze → prompt Claude
  - [ ] Lesson 12.5: Write test → prompt Claude Code → test passes
  
- [ ] **Add performance benchmarks** (1-2 hours)
  - [ ] Module 2.5: Learning time: video re-watch (20 min) vs. transcript import (3 min)
  - [ ] Module 5.7b: Speed comparison: voice prompting (3-5 min features) vs. typing (8-12 min)
  - [ ] Module 6.4b: Design time: reference learning vs. designing from scratch
  - [ ] Module 12.5: Defect rate: test-first vs. manual testing

- [ ] **Create design analysis checklist** (1 hour)
  - [ ] Printable/fillable worksheet for Lesson 6.4b
  - [ ] Hierarchy, spacing, typography, color evaluation form
  - [ ] Export as PDF for learners

### UI/UX Updates (1-2 hours)
- [ ] **Update course landing pages**
  - [ ] Add lesson tags: "Voice Workflows," "Playwright Automation," "Design Patterns"
  - [ ] Module sidebar: show new lessons (2.5, 5.7b, 6.4b, 12.5)
  - [ ] Course map: highlight new content

- [ ] **Update dashboard**
  - [ ] Show new lesson progress
  - [ ] Badge for "Multimodal Mastery" (completes all 4 new lessons)

---

## 🟡 Lower Priority: Nice to Have + Longer Effort

### Accreditation Documentation (1-2 hours)
- [ ] **Map lessons to learning objectives** (if pursuing CPD/IACET)
  - [ ] Lesson 2.5 → Objectives: Use transcripts as knowledge input (Bloom: Apply)
  - [ ] Lesson 5.7b → Objectives: Rapid iteration via voice (Bloom: Apply)
  - [ ] Lesson 6.4b → Objectives: Extract & adapt design patterns (Bloom: Analyze)
  - [ ] Lesson 12.5 → Objectives: Test-driven AI development (Bloom: Create)

- [ ] **Contact hours audit** (30 min)
  - [ ] Verify lessons stay within existing module hours
  - [ ] No CEU recalculation needed (lessons expand, don't extend)

### Community & Feedback (2+ hours)
- [ ] **Gather learner feedback** (post-launch)
  - [ ] Survey: Which new lesson was most useful?
  - [ ] Quiz difficulty: Are new questions appropriately challenging?
  - [ ] Time to complete: Do estimated durations match reality?

- [ ] **Create example projects**
  - [ ] Starter repo for Module 2.5 video project
  - [ ] Starter repo for Module 12.5 test-first feature
  - [ ] Link from lesson markdown

---

## 📊 Work Summary by Effort

| Category | Items | Time | Priority |
|----------|-------|------|----------|
| Templates | 4 | 2h | High |
| Resources | 4 | 0.5h | High |
| Quiz Testing | 1 | 0.5h | High |
| **Subtotal (Critical Path)** | **9** | **3h** | — |
| Video Walkthroughs | 4 | 2h | Medium |
| Benchmarks | 4 | 1.5h | Medium |
| Checklists & Forms | 1 | 1h | Medium |
| Landing Pages | 2 | 1.5h | Medium |
| Dashboard Updates | 1 | 0.5h | Medium |
| **Subtotal (Medium Priority)** | **12** | **6.5h** | — |
| Accreditation Docs | 2 | 2h | Low |
| Community Feedback | 2 | 2h | Low |
| Example Projects | 2 | 2h | Low |
| **Subtotal (Lower Priority)** | **6** | **6h** | — |
| **TOTAL** | **27** | **15.5h** | — |

---

## 🛣️ Recommended Execution Path

### Sprint 1 (Today, ~3 hours)
1. ✅ Build test (done)
2. Create 4 project templates
3. Add resource links
4. Test quizzes in UI
5. **Commit:** `feat: add project templates and resources for new lessons`

### Sprint 2 (Optional, ~2 hours)
6. Create video walkthroughs (1 or 2 to start)
7. Add performance benchmarks
8. **Commit:** `docs: add video walkthroughs and benchmarks`

### Sprint 3 (Post-Launch)
9. Gather learner feedback
10. Update landing pages based on analytics
11. Create accreditation documentation

---

## 📁 File Structure (To Create)

```
docs/
├── project-templates/
│   ├── module-2-5-video-transcript-project.md
│   ├── module-5-7b-voice-workflow-checklist.md
│   ├── module-6-4b-design-analysis.md
│   └── module-12-5-test-first-template.ts
├── resources/
│   ├── module-2-5-resources.md (Whisper links, YouTube tools)
│   ├── module-5-7b-resources.md (SuperWhisper, alternatives)
│   ├── module-6-4b-resources.md (Design inspiration, UI kits)
│   └── module-12-5-resources.md (Playwright, test examples)
└── benchmarks/
    ├── module-2-5-learning-speed.md
    ├── module-5-7b-voice-efficiency.md
    ├── module-6-4b-design-time.md
    └── module-12-5-test-coverage.md
```

---

## 🔗 Connected Docs

- `CURRICULUM_INTEGRATION_SUMMARY.md` — High-level overview
- `CURRICULUM_UPDATE_CHECKLIST.md` — Module-level impact assessment
- `CLAUDE.md` — Project governance

---

## Notes

- **No module-level breaking changes** — All work is additive
- **Quiz count verified** — Module counts unchanged (48 total, 3 per module structure maintained)
- **CEU calculation stable** — Lessons expand existing hours, no new contact hours
- **Build verified** — `npm run build` passes with all new content
- **Commit strategy** — Small, focused commits with clear messages

---

## Questions/Blockers

None currently. All critical path items are unblocked.

---

## Archive: Changes Made This Session

**Commits:**
1. `ba2b5be` — feat: add four vibe coding workflow lessons
2. `9bf4c4d` — docs: update curriculum checklist...
3. `ee20f85` — docs: add curriculum integration summary
4. `08f6817` — feat: add quiz questions for new lessons

**Files Modified:**
- `content/modules/module-02-prompt-engineering.md` (+105 lines)
- `content/modules/module-05-building-in-claude-code.md` (+101 lines)
- `content/modules/module-06-design-ux.md` (+101 lines)
- `content/modules/module-12-production-ready.md` (+124 lines)
- `lib/quizzes.ts` (+160 lines, 16 new questions)
- `CURRICULUM_UPDATE_CHECKLIST.md` (+19 lines)
- `CURRICULUM_INTEGRATION_SUMMARY.md` (new, +277 lines)

**Total:** 887 lines added across 7 files, 4 commits
