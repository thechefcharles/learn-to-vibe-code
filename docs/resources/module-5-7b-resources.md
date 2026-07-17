# Module 5.7b Resources: Advanced Voice Workflows

Tools and references for voice-driven development with Claude Code and SuperWhisper.

---

## Voice Input Tools

### SuperWhisper (Recommended, $10)
- **Website:** www.superwhisper.com
- **Cost:** ~$10 one-time (macOS/Windows)
- **Setup:** Download → Install → Set hotkey (default: Option+Space)
- **Features:** Real-time transcription, pastes directly into any app
- **Accuracy:** Very high (OpenAI Whisper-based)
- **Why:** Fastest, most reliable, works offline
- **Video tutorial:** superwhisper.com/tutorial

### Spokenly (Free, Web-Based)
- **Website:** www.spokenly.com
- **Cost:** Free
- **Setup:** No installation
- **How:** Click "Record" → Speak → Click "Stop" → Copy text
- **Accuracy:** Good (depends on background noise)
- **Best for:** Quick clips, remote workers, no-install option

### Google Recorder (Free, Android)
- **Download:** Google Play Store
- **Cost:** Free
- **Real-time transcription:** Yes
- **Languages:** 100+
- **Best for:** Mobile voice-to-text

### Windows Speech-to-Text (Built-in, Free)
- **Settings:** Settings → Ease of Access → Speech Recognition
- **Cost:** Free (built-in to Windows)
- **Works with:** Any text field, native Windows apps
- **Setup:** No additional installation

### Whisper API (OpenAI, Pay-per-use)
- **Cost:** $0.006 per minute
- **Use:** In custom applications
- **Documentation:** platform.openai.com/docs/guides/speech-to-text

---

## Voice-First Development Workflow

### Setup Checklist
- [ ] Install SuperWhisper or alternative
- [ ] Set hotkey (test with simple phrase)
- [ ] Open Claude Code in terminal
- [ ] Mic working and clear
- [ ] Ready to speak!

### Voice Prompting Tips

**Speak clearly:** Enunciate, slow pace, no background noise
```
[Good] "Add a login form with email and password fields"
[Bad] "addalogininform..." (mumbled, hard to parse)
```

**Use technical terms:** Models understand "useState," "async/await," "TypeScript"
```
[Good] "Use the useReducer hook instead of useState"
[Bad] "Use that other hook thing"
```

**Phrase as commands, not questions:**
```
[Good] "Add a loading spinner while fetching data"
[Bad] "Can you maybe add a loading thing?"
```

**One goal per prompt:**
```
[Good] "Add form validation for email addresses"
[Bad] "Add validation, also fix the button color, and maybe add a loading state"
```

### Example Voice Sessions

**Session 1: Simple Feature**
```
[Hotkey] "Build a counter component with increment and decrement buttons."
[Wait for Claude Code plan]
[Hotkey] "Looks good. Execute."
[Wait 30 seconds, feature done]
Result: 2 min total
```

**Session 2: Complex Feature with Iteration**
```
[Hotkey] "Add a user profile page. Show name, email, profile picture. 
Let me edit these fields."
[Review plan, approve]
[Hotkey] "Add validation to the email field. Also add a cancel button."
[Claude Code iterates]
[Test locally]
Result: 10 min total
```

---

## Speed Benchmarks

### Voice vs. Typing Comparison

| Task | Typing | Voice | Speedup |
|------|--------|-------|---------|
| Simple prompt (1–2 sentences) | 45 sec | 15 sec | 3x |
| Medium prompt (3–5 sentences) | 2 min | 30 sec | 4x |
| Complex prompt with details | 5 min | 1.5 min | 3.3x |
| Iteration/refinement | 1 min per cycle | 20 sec per cycle | 3x |

**Average speedup: 3–4x faster with voice**

### Real-World Example

**Feature: Add favorites button to invoices**

**Typing approach:**
- Open terminal
- Type: "Add a favorites button to the invoice list" (30 sec)
- Wait for plan (20 sec)
- Type approval (5 sec)
- Wait for execution (45 sec)
- **Total: ~2 min**

**Voice approach:**
- Open terminal (already running)
- Press hotkey (1 sec)
- Speak goal (15 sec)
- Release hotkey (text pastes)
- Wait for plan (20 sec)
- Press hotkey (1 sec)
- Speak approval (5 sec)
- Release hotkey
- Wait for execution (45 sec)
- **Total: ~1.5 min (20% faster)**

**Plus:** Less context switching, more flow state, natural thinking process

---

## Best Practices for Voice-Driven Dev

### Do
- ✅ Speak clearly, one thought at a time
- ✅ Use technical terminology confidently
- ✅ Pause between clauses for transcription clarity
- ✅ Give specific feedback ("Make the button 44px tall")
- ✅ Iterate with voice (refinement → re-execute)
- ✅ Test locally after builds

### Don't
- ❌ Mumble or speak too fast
- ✗ Ramble or give multiple conflicting goals
- ❌ Expect perfect first-time output
- ❌ Ignore the transcription (review it on screen)
- ❌ Build complex features in one massive prompt
- ❌ Use voice for describing exact error messages

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| SuperWhisper mishears technical terms | Speak clearly, repeat if needed, or type that specific term |
| Transcription appears but Claude Code ignores it | Hotkey didn't register; check settings |
| Feature isn't built correctly | Voice feedback too vague; be specific: "Add validation for empty inputs" |
| Mic cuts out mid-sentence | Pause, take a breath, resume speaking |
| Hotkey conflicts with another app | Change SuperWhisper hotkey in settings |

---

## Alternatives to SuperWhisper

### Command-Line Tools
```bash
# Whisper CLI (local)
whisper your-audio.mp3

# Google Cloud Speech-to-Text (API)
gcloud ml speech recognize gs://audio.wav

# Amazon Transcribe (API)
aws transcribe start-transcription-job --media gs://audio.wav
```

### IDE Integration
- **VS Code:** Extension "Voice In" or "Codeium Voice"
- **Cursor:** Built-in voice mode
- **JetBrains:** "Copilot for JetBrains" with voice (coming soon)

---

## Remote Work & Accessibility

### Voice-First for Accessibility
- **RSI (Repetitive Strain Injury):** Voice reduces keyboard usage
- **Dyslexia:** Speaking is often more natural than typing
- **ADHD:** Voice keeps you in flow (less friction)
- **Neurodivergent-friendly:** Less context switching

### For Remote Teams
- Use Spokenly (no installation)
- Share your screen while building (so teammates see voice-driven workflow)
- Record sessions to show best practices

---

## Combining Voice + Multimodal Input

### Voice + Screenshot
```
[Hotkey] "Here's my current UI [screenshot]. I want to make the button bigger."
[Wait for execution]
```

### Voice + Video Demo
```
[Hotkey] "I watched a Stripe demo [describe 10 seconds]. 
Build this pattern for my app: [specific feature]."
```

### Voice + Transcript
```
[Hotkey] "I read that you should use React.useCallback for optimization. 
Show me how to apply it to my dashboard component."
```

**Result: 3x speedup with multimodal + voice**

---

## When to Switch Back to Typing

### Situations Where Typing is Better
- **Exact error messages:** Paste the error → Claude fixes it (voice can mishear)
- **Code examples from docs:** Paste, don't dictate
- **Team communication:** Slack, emails (async, not voice)
- **Silent environments:** Library, open office, noisy setting
- **Precision details:** "Use hex color #0066FF" (easier to type)

### Hybrid Workflow (Recommended)
```
[Voice] "Build the invoice form."
[Paste error] "Here's the error: TypeError: Cannot read..."
[Voice] "Fix this error and add validation."
[Type] git commit -m "feat: add invoice form with validation"
```

---

## Gamifying Voice-Driven Development

### Challenge Ideas
1. **Build 3 features entirely by voice** — Measure time vs. typing
2. **Pair programming with voice** — One person voices, one watches
3. **Speed run:** Build a feature as fast as possible using voice
4. **Silence mode:** Use voice in silent environments (library, etc.)

---

## Learning Resources

- **SuperWhisper:** superwhisper.com/tutorial
- **Voice UX:** Nielsen Norman Group articles on voice interfaces
- **Accessibility:** www.w3.org/WAI/WCAG21/Understanding/audio-description
- **Speech Recognition:** developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

---

## Your Voice-First Checklist

- [ ] Tool installed (SuperWhisper, Spokenly, or built-in)
- [ ] Hotkey configured and tested
- [ ] First feature built entirely by voice
- [ ] Time measured (compared to typing estimate)
- [ ] Reflection written ("Would I use this again?")
- [ ] Second feature attempted
- [ ] Shared experience with teammate

---

## Next Steps

1. **Today:** Install tool, build one feature by voice
2. **This week:** Compare 3 features (voice vs. typing time)
3. **Going forward:** Decide when voice helps, when typing is better

**Your expected outcome:** 20–30% faster development + better flow state
