# Module 5.7b Project: Voice-Driven Feature Build

**Objective:** Build one complete feature using only voice input (no typing the prompts).

**Time:** 30–45 minutes  
**Deliverable:** Completed feature + reflection on speed vs. typing

**Requirements:** Mic-to-text tool (SuperWhisper or Spokenly recommended)

---

## Pre-Project Setup (5 min)

### Install SuperWhisper (Recommended)
1. Download from www.superwhisper.com (~$10, or free trial)
2. Install and launch
3. Set a hotkey (default: Option+Space on Mac, Ctrl+Space on Windows)
4. Test: Press hotkey → say "hello" → it types "hello" in any text field

### Alternatives (Free)
- **Spokenly** (web-based): www.spokenly.com — click "Start Recording," speaks → transcribes
- **Google Recorder** (Android): Built-in voice typing
- **Windows Speech-to-Text** (built-in): Settings → Ease of Access → Speech Recognition

### Verify Your Setup
- [ ] Hotkey set and tested
- [ ] Mic working (test with simple phrase)
- [ ] Claude Code open and ready (`claude` in terminal)

---

## The Challenge

**Build one feature ENTIRELY BY VOICE.** No typing the prompts. Only voice input.

**Example features:**
- Add a "favorites" button to existing items
- Create a settings page with theme toggle
- Add search/filter to a list
- Build a comments section

**Pick your feature:** ___________________________________________________________

---

## Step 1: State Your Goal (Voice Only)

Open Claude Code:
```bash
cd your-project
claude
```

**Press your hotkey and speak your goal:**

```
[Hotkey pressed]

"I want to build a [feature name]. 
It should do [what it does].
Use [tech stack: Next.js, TypeScript, Tailwind].
Show me a plan first."

[Release hotkey — text appears in terminal]
```

**Example voice prompt:**
```
"Add a favorites button to my invoice list. 
When clicked, it toggles a star icon and saves to localStorage. 
Use Next.js, TypeScript, and Tailwind. 
Show me a plan first."
```

**What you said:**
___________________________________________________________

**What Claude Code responded:**
```
[Paste Claude's plan here]
```

---

## Step 2: Review the Plan (Optional Voice Approval)

Claude Code shows a plan. Do you like it?

**Option A: Speak approval**
```
[Hotkey]
"Looks good. Execute."
[Release]
```

**Option B: Request changes (voice)**
```
[Hotkey]
"Good plan, but also add TypeScript types for the data structure."
[Release]
```

**Your response:**
___________________________________________________________

---

## Step 3: Let Claude Code Execute (No Voice Needed)

Claude Code builds the feature. Watch the diff scroll past.

**Time spent watching:** _____ seconds

---

## Step 4: Review the Diff (Optional Voice Feedback)

Claude Code shows what it changed. Read it.

**Do you see issues?** (e.g., missing validation, wrong path)

**If YES, speak a refinement:**
```
[Hotkey]
"The favorites state should persist across page reloads. Use localStorage. 
Also add error handling if localStorage is full."
[Release]
```

**Your feedback:**
___________________________________________________________

---

## Step 5: Test Locally (No Voice Needed)

```bash
npm run dev
```

Visit your app → test the feature manually in the browser.

**Does it work?** 
- [ ] Yes, feature complete
- [ ] Partially (describe what's wrong)
- [ ] No (describe issue)

**If broken, speak a fix:**
```
[Hotkey]
"The favorites button didn't save. Check if localStorage is being used. 
Also verify the click handler is attached to the button."
[Release]
```

---

## Step 6: Commit (Optional Voice, Usually Typing)

Once working, commit to git:

```bash
git add .
git commit -m "feat: add favorites button with localStorage persistence"
git push -u origin feat/favorites
```

**Or commit by voice:**
```
[Hotkey]
"Commit this. Message: Add favorites button feature with localStorage."
[Release]

(Note: Claude Code might need to confirm the exact commit message)
```

---

## Step 7: Measure & Reflect (5 min)

**How long did it take?**
- Planning (voice): _____ min
- Execution (Claude): _____ min
- Testing (you): _____ min
- **Total: _____ min**

**Compare to typing:**
- If you'd typed the same prompts: estimate _____ min
- Time saved by voice: _____ min

**What felt different?**
- Faster: [ ]
- More natural: [ ]
- Less interruptions: [ ]
- Harder to be precise: [ ]
- Other: ___________________________

**Would you use voice-driven dev again?**
- [ ] Yes, for all features
- [ ] Yes, for big multi-step features
- [ ] No, I prefer typing
- [ ] Depends on the task

---

## Deliverable Checklist

- [ ] SuperWhisper (or alt) installed and hotkey tested
- [ ] Feature specified by voice
- [ ] Plan reviewed (voice or text)
- [ ] Claude Code executed the build
- [ ] Feature tested locally and works
- [ ] Committed to git
- [ ] Time measured (voice vs. typing estimate)
- [ ] Reflection written

---

## Advanced: Multi-Step Voice Build

**Challenge:** Build a feature with multiple dependent steps, all by voice.

Example: "Build a todo app with add, complete, and delete buttons"

```
[Hotkey]
"Build a todo app. 
Users can add todos (input + button), 
mark them complete (checkbox + strikethrough), 
and delete (trash icon).
Use Next.js, TypeScript, Tailwind, and localStorage.
Show me the plan."

[Wait for plan → approve by voice]

"Execute and add error handling for localStorage failures."

[Wait for build]

"Test it locally. It works! Commit with message: Add todo app with localStorage."
```

**Total time:** 10–15 minutes for a full feature with voice.

---

## Tips for Voice-Driven Development

1. **Speak clearly** — Enunciate, no mumbling
2. **Phrase as instructions, not questions** — "Add a button" not "Can you add a button?"
3. **Use technical terms confidently** — "localStorage," "TypeScript," "async/await"
4. **Pause between clauses** — "I want to [pause] add a login form. [pause] Use email and password."
5. **Say punctuation if needed** — "function name colon equals function open paren"
6. **Keep goals focused** — One feature per prompt, not "build the whole app"
7. **Iterate with specific feedback** — "The button is too small" not "Make it better"

---

## Common Issues

| Problem | Solution |
|---------|----------|
| Transcription errors (words misheard) | Speak more clearly; use technical terms written out |
| Claude Code confused by rambling | Break into sentences; give one goal per prompt |
| localStorage not working | Ask Claude specifically: "Persist data to localStorage with error handling" |
| Feature half-built | Ask for specific next step: "Add validation for empty inputs" |
| Hotkey not working | Check tool settings; test with simple phrase first |

---

## Next Steps

1. **Try a second feature** — Build something else, measure speed improvement
2. **Mix voice + screenshots** — Screenshot your app, describe goal → Claude sees both
3. **Teach it to a friend** — Show them voice-driven development
4. **Compare workflows** — When do you use voice vs. typing vs. in-editor?

---

## Resources

- **SuperWhisper:** www.superwhisper.com (macOS/Windows)
- **Spokenly:** www.spokenly.com (web-based, free)
- **Google Recorder:** (Android, free)
- **Claude Code:** claude.ai or `npm install -g claude`

---

**Questions?** See Module 5.7b lesson for deeper dive into voice workflows.
