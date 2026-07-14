# Screenshot Capture Guide

**Goal:** Capture remaining 14 manual screenshots and complete the figures manifest.

**Status:** 54/57 manifest entries done. 14 screenshots still needed.

**Time estimate:** 45 minutes total (20-30 min captures + 10 min manifest updates + 5 min testing)

---

## Part 1: Capture the Screenshots

### Setup

1. **Open the app/repo where you'll capture:**
   - For terminal/Claude Code: open the invoice-tracker app (or any Next.js project)
   - For Cursor: same project
   - For live debugging: have an error ready or create one

2. **Screenshot tool:**
   - **macOS:** `Cmd+Shift+4`, then tap `Space`, then click the window → captures single window
   - **Windows:** `Win+Shift+S` → draw rectangle
   - **Linux:** `Print` or `gnome-screenshot` → select window

3. **Save location:** `/Users/admin/Charlie Foreman/My Projects/learn-to-vibe-code/public/figures/screenshots/[module-folder]/`

4. **Naming:** `m[##]-[description].png` (exactly as listed below)

---

## Part 2: Screenshot Checklist

### Terminal / Claude Code (4 screenshots)

#### 1. `m05/m05-claude-permission.png`
**What to capture:** Claude Code asking for permission (allow/deny prompt)

**How to trigger:**
```bash
cd invoice-tracker
claude
# In Claude Code, ask it to: "Delete the app.tsx file"
# It will ask for permission to run destructive commands
```

**Screenshot tips:**
- Capture just the permission prompt dialog
- Show: `[Allow] [Deny]` buttons clearly
- Include the command/description text above the buttons

**Alt text:** "Claude Code permission prompt asking user to approve destructive command"

---

#### 2. `m05/m05-claude-multifile-diff.png`
**What to capture:** Multi-file edit diff from Claude Code

**How to trigger:**
```bash
claude
# Ask it: "Add a dark mode toggle to the dashboard. Save preference in localStorage."
# Wait for it to show the diff
```

**Screenshot tips:**
- Capture the full diff output (all files modified)
- Show file paths, added/removed lines
- Include color coding (red=removed, green=added)
- Show the summary line (e.g., "3 files changed")

**Alt text:** "Claude Code multi-file diff showing changes across dashboard, theme context, and localStorage functions"

---

#### 3. `m13/m13-skill-install.png`
**What to capture:** Installing a skill (or a SKILL.md file open in the editor)

**How to trigger:**
```bash
# Run Claude Code with a skill command (e.g., /run)
claude
# Then type a command that uses a skill, or manually open a SKILL.md file in Cursor
```

**Screenshot tips:**
- Show the terminal output mentioning "Skill" or "installing"
- OR show a SKILL.md file open in an editor with [SKILL] frontmatter visible
- Either works; simpler = open SKILL.md in Cursor and screenshot that

**Alt text:** "SKILL.md file open in Cursor showing skill configuration with name, description, and instructions"

---

#### 4. `m13/m13-plugin-install.png`
**What to capture:** The `/plugin install` UI or terminal output

**How to trigger:**
```bash
claude
# Type: /plugin install [name]
# Or just type `/plugin` to see the menu
```

**Screenshot tips:**
- Show the interactive menu/prompt for plugin installation
- Include the available options/list if shown
- Or the confirmation after successful install

**Alt text:** "Claude Code plugin install prompt showing available plugins and installation options"

---

### Cursor (Editor App) (5 screenshots)

#### 5. `m00/m00-cursor-welcome.png`
**What to capture:** Cursor welcome screen (shown on first sign-in)

**How to trigger:**
- Open Cursor for the first time, or sign out and sign back in
- The welcome screen appears
- OR just open Cursor with a fresh project

**Screenshot tips:**
- Full Cursor window
- Show the "Welcome to Cursor" message
- Show the sign-in or getting-started prompt

**Alt text:** "Cursor welcome screen after sign-in showing getting-started options"

---

#### 6. `m04/m04-cursor-cmdk-diff.png`
**What to capture:** Cursor Cmd+K inline diff (edit a line, see the diff preview)

**How to trigger:**
1. Open a file in Cursor
2. Select a line of code (e.g., a button's text)
3. Press `Cmd+K` (on Mac) or `Ctrl+K` (Windows/Linux)
4. Type: "Change this button text to 'Continue Learning'"
5. Cursor shows the diff in-line

**Screenshot tips:**
- Show the selected code highlighted
- Show the diff side-by-side or inline (red strikethrough old, green added new)
- Include the prompt you typed in the Cmd+K box

**Alt text:** "Cursor Cmd+K inline diff showing button text change with old code struck and new code highlighted in green"

---

#### 7. `m04/m04-cursor-at-mention.png`
**What to capture:** Cursor @mention menu (for adding context)

**How to trigger:**
1. Open Cursor chat or Cmd+K
2. Type `@`
3. The mention menu appears (showing @files, @codebase, @web, etc.)

**Screenshot tips:**
- Show the dropdown menu with options
- Include at least 3-4 options visible (@files, @codebase, @web, @docs, etc.)
- Show the input field with `@` typed

**Alt text:** "Cursor @mention menu showing available context sources including files, codebase, web, and documentation"

---

#### 8. `m04/m04-cursor-composer-diff.png`
**What to capture:** Cursor Composer (Cmd+I) multi-file diff

**How to trigger:**
1. Open a file (or any file in a project)
2. Press `Cmd+I` (or Ctrl+I)
3. Type: "Add a signup page with email and password fields"
4. Cursor shows multi-file changes in the diff

**Screenshot tips:**
- Show the Composer interface (right side panel typically)
- Show the file list with changes (multiple files highlighted)
- Show the diff preview
- Include the prompt you typed

**Alt text:** "Cursor Composer multi-file diff showing new signup page component, types, and routing changes across 3 files"

---

#### 9. `m05/m05-claude-md.png`
**What to capture:** A CLAUDE.md file open in the editor

**How to trigger:**
1. Open any project that has a CLAUDE.md file
2. Open the CLAUDE.md file in Cursor
3. Show the content (project context file)

**Screenshot tips:**
- Full editor window showing CLAUDE.md
- Include the file path in the tab
- Show the content (project description, conventions, stack info)
- Ideally show syntax highlighting on markdown

**Alt text:** "CLAUDE.md file open in Cursor showing project conventions and AI assistant context for a Next.js invoice app"

---

### Git / Merge Conflict (1 screenshot)

#### 10. `m09/m09-merge-conflict.png`
**What to capture:** A merge conflict open in the editor

**How to trigger:**
1. Create a local merge conflict (easiest: two branches editing the same line)
2. Try to merge and let it fail
3. Open the conflicted file in Cursor

**Or simulate:**
```bash
# Create a conflict scenario:
git checkout -b branch-a
# Edit a line in app.tsx
git commit -am "Change button text"
git checkout main
# Edit the SAME line differently
git commit -am "Different button text"
git merge branch-a  # Conflict!
# Open the conflicted file in Cursor
```

**Screenshot tips:**
- Show the conflict markers (<<<<<<, ======, >>>>>>>)
- Show both versions side-by-side if the editor displays them
- Show colors (red for one version, green for other)
- Include the file path in the editor tab

**Alt text:** "Merge conflict in app.tsx showing conflicting button text with VS Code conflict resolution buttons"

---

### Cursor Agent Mode (1 screenshot)

#### 11. `m04/m04-cursor-agent-mode.png`
**What to capture:** Cursor Agent mode running, OR the destructive-command approval prompt

**How to trigger:**

**Option A (Agent mode):**
1. Open Cursor Settings → Features → Agent Mode
2. Enable Agent Mode
3. Open a chat and ask it to "Add a login form to the app"
4. Show it executing/planning

**Option B (Destructive command approval)** — easier:
1. Open Cursor chat
2. Ask it to: "Delete the public folder"
3. When it tries to run a destructive command, Cursor shows an approval prompt
4. Screenshot the prompt

**Screenshot tips:**
- Show the Agent mode running with visible execution steps
- OR show the destructive-command approval dialog with [Approve] [Deny] buttons
- Include the command description

**Alt text:** "Cursor Agent mode showing destructive command approval prompt with user confirmation required"

---

### Live AI Session / Debugging (1 screenshot)

#### 12. `m08/m08-debugging-chat.png`
**What to capture:** Pasting an error into Claude Code/Cursor and getting AI explanation

**How to trigger:**
1. Create or find a JavaScript error (e.g., TypeError, ReferenceError)
2. Copy the error message
3. Open Claude Code or Cursor
4. Paste the error: "Debug this: [error message]"
5. AI explains/fixes it

**Screenshot tips:**
- Show the error pasted in the chat
- Show the AI's response explaining the issue
- Include the fix or explanation text
- Show the chat interface clearly

**Alt text:** "Claude Code chat showing TypeError explanation with root cause and suggested fix"

---

### Performance / Accessibility Tooling (1 screenshot)

#### 13. `m12/m12-lighthouse.png`
**What to capture:** Lighthouse or axe accessibility/performance report

**How to trigger:**
1. Open a Next.js app in the browser
2. Open Chrome DevTools (F12)
3. Go to the **Lighthouse** tab
4. Click "Analyze page load"
5. Wait for the report
6. Screenshot the results

**Screenshot tips:**
- Show the Lighthouse score summary (Performance, Accessibility, Best Practices, SEO)
- Show the colored rings (green = good, yellow = fair, red = poor)
- Include the page URL at the top
- Optional: expand one section to show details

**Alt text:** "Lighthouse performance audit showing scores for Performance (92), Accessibility (88), Best Practices (95), and SEO (100)"

---

### Brownfield / Architecture (1 screenshot)

#### 14. `m14/m14-architecture-summary.png`
**What to capture:** AI architecture summary + file tree of a brownfield repo

**How to trigger:**
1. Open an existing repo in Claude Code (something with 5+ files)
2. Type: "Summarize this project's architecture and structure"
3. Claude Code responds with a summary + file tree
4. Screenshot the output

**Screenshot tips:**
- Show the AI's text summary at the top
- Show the file tree below (indented folder structure)
- Show file counts, key files, technologies mentioned
- Make sure the text is readable

**Alt text:** "Claude Code architecture analysis showing project structure, key files, and technology stack for an existing codebase"

---

## Part 3: Update the Manifest

After capturing all screenshots, add entries to `figures-manifest.json`:

### Template

```json
"m##-description": {
  "path": "/figures/m##/m##-filename.png",
  "alt": "Descriptive alt text for accessibility (50-120 chars)"
}
```

### Entries to add

```json
"m00-cursor-welcome": {
  "path": "/figures/m00/m00-cursor-welcome.png",
  "alt": "Cursor welcome screen after sign-in showing getting-started options"
},
"m04-cursor-cmdk-diff": {
  "path": "/figures/m04/m04-cursor-cmdk-diff.png",
  "alt": "Cursor Cmd+K inline diff showing button text change"
},
"m04-cursor-at-mention": {
  "path": "/figures/m04/m04-cursor-at-mention.png",
  "alt": "Cursor @mention menu showing available context sources"
},
"m04-cursor-composer-diff": {
  "path": "/figures/m04/m04-cursor-composer-diff.png",
  "alt": "Cursor Composer multi-file diff for signup page feature"
},
"m04-cursor-agent-mode": {
  "path": "/figures/m04/m04-cursor-agent-mode.png",
  "alt": "Cursor Agent mode destructive command approval prompt"
},
"m05-claude-md": {
  "path": "/figures/m05/m05-claude-md.png",
  "alt": "CLAUDE.md file open in Cursor showing project context"
},
"m05-claude-permission": {
  "path": "/figures/m05/m05-claude-permission.png",
  "alt": "Claude Code permission prompt asking user to approve destructive command"
},
"m05-claude-multifile-diff": {
  "path": "/figures/m05/m05-claude-multifile-diff.png",
  "alt": "Claude Code multi-file diff showing changes across 3 files"
},
"m08-debugging-chat": {
  "path": "/figures/m08/m08-debugging-chat.png",
  "alt": "Claude Code debugging chat showing error explanation and fix"
},
"m09-merge-conflict": {
  "path": "/figures/m09/m09-merge-conflict.png",
  "alt": "Merge conflict in editor showing conflicting code versions"
},
"m12-lighthouse": {
  "path": "/figures/m12/m12-lighthouse.png",
  "alt": "Lighthouse performance audit results showing scores across categories"
},
"m13-skill-install": {
  "path": "/figures/m13/m13-skill-install.png",
  "alt": "SKILL.md file open in Cursor showing skill configuration"
},
"m13-plugin-install": {
  "path": "/figures/m13/m13-plugin-install.png",
  "alt": "Claude Code plugin install prompt with available options"
},
"m14-architecture-summary": {
  "path": "/figures/m14/m14-architecture-summary.png",
  "alt": "Claude Code architecture analysis with file tree and tech stack"
}
```

### How to add them

1. Open `/public/figures-manifest.json`
2. Find the `"screenshots": {` section
3. Copy-paste the new entries above (keep JSON syntax valid)
4. Verify: `npm run build` should pass without errors

---

## Part 4: Verification

### Test the renderings

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Visit a lesson with screenshots:**
   - Go to http://localhost:3000/course/04 (Module 4, should show Cursor screenshots)
   - Go to http://localhost:3000/course/05 (Module 5, should show Claude Code screenshots)

3. **Verify each screenshot:**
   - Image loads (not a broken link)
   - Alt text shows on hover
   - Image size/aspect looks right
   - Captions/context in lesson match the image

4. **Check console** for any manifest errors:
   - Open browser DevTools (F12)
   - Console tab — should be no errors about missing screenshots

### Test missing gracefully

If a [SCREENSHOT:] placeholder has no manifest entry:
- MarkdownRenderer shows a styled callout: `[SCREENSHOT: needed]`
- No broken images
- Lesson still reads fine

---

## Part 5: Quick checklist

- [ ] 14 screenshots captured and saved to correct folders
- [ ] Each filename matches the format: `m##-description.png`
- [ ] 14 manifest entries added to `figures-manifest.json`
- [ ] JSON syntax is valid (no missing commas/braces)
- [ ] `npm run build` passes
- [ ] Dev server runs: `npm run dev`
- [ ] Visited 2-3 modules with screenshots
- [ ] All images load correctly
- [ ] Alt text is descriptive (50-120 characters)
- [ ] No console errors

---

## Part 6: Commit

Once verified:

```bash
cd /Users/admin/Charlie\ Foreman/My\ Projects/learn-to-vibe-code

git add public/figures/screenshots/

git add public/figures-manifest.json

git commit -m "feat: add remaining 14 manual screenshots to course figures

Captured:
- Terminal/Claude Code: permissions, multi-file diff, skill/plugin install
- Cursor: welcome, Cmd+K diff, @mention, Composer, CLAUDE.md
- Debugging: error explanation chat
- Git: merge conflict
- Performance: Lighthouse audit
- Architecture: brownfield summary + file tree

All 57 [SCREENSHOT:] placeholders now have corresponding manifest entries.
Verified: images load, alt text present, no console errors.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

## Notes

- **Platform-specific differences:** macOS/Windows/Linux screenshots may look slightly different. Capture on your dev machine; learners will recognize their own OS.
- **Version changes:** If Cursor/Claude Code UI updates, screenshots become outdated. CLAUDE.md recommends teaching concepts over UI specifics.
- **Archive extras:** If you capture multiple angles of the same scene, save extras to `/public/figures/screenshots/_alt/` (already done for plan-mode captures).

Good luck! Let me know when you've captured them or if you hit any blockers. 🚀

