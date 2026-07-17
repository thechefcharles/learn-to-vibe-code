# Module 2.5 Project: Video → Transcript → Code

**Objective:** Learn a concept from a video, extract its knowledge, and ask Claude to implement it in your tech stack.

**Time:** 30–45 minutes  
**Deliverable:** Screenshot of working code + documented transcript → code workflow

---

## Step 1: Pick a Video (5 min)

Choose **one** tutorial video on a topic relevant to your current project or interest:

- **AI/Coding:** "How to build with Claude API," "React Hooks explained," "State management in Next.js"
- **Design:** "Figma tutorial," "UI design principles," "Tailwind CSS crash course"
- **Tools:** "Git workflow for teams," "Docker basics," "GitHub Actions tutorial"
- **Your choice:** Any tutorial that teaches something you want to implement

**Examples:**
- YouTube: Search "[your topic] tutorial" → pick one 5–20 minutes
- Conference talk: YouTube → search "[topic] conference 2025"
- Your own: Screen recording of your process

**Write down:**
- Video title: ___________________________
- URL/link: ___________________________
- Topic: ___________________________

---

## Step 2: Extract the Transcript (5 min)

**Option A: YouTube Auto-Captions (Easiest)**
1. Open video on YouTube
2. Click CC (closed captions) button
3. Click three-dot menu → "Show transcript"
4. Copy the full transcript (click "Show more" to expand)
5. Paste into a text editor or directly into your Claude prompt

**Option B: Whisper Transcription**
1. Use OpenAI's Whisper (free, open-source)
2. Command: `npx whisper-cli <video-url>` or upload audio file
3. Outputs `.txt` file with transcript

**Option C: Manual Notes**
1. Watch video, take notes on key concepts
2. Write 3–5 bullet points of core ideas
3. Use those in your prompt

**Copy/paste the transcript or key excerpt here:**
```
[Transcript excerpt or key points]
```

---

## Step 3: Identify Key Concepts (5 min)

Read through the transcript and highlight 1–2 core concepts you want to implement.

**Examples:**
- "The video explains how Redux stores state in a single source of truth"
- "The video shows how to use React hooks instead of class components"
- "The video demonstrates pagination pattern: request data by page number"

**Concept 1:** ___________________________________________________________

**Concept 2:** ___________________________________________________________

---

## Step 4: Write Your Claude Prompt (10 min)

Use the **five-ingredient prompt format** + transcript:

```
I just watched "[Video Title]" and want to understand [concept].

Key excerpt from the video:
"[Paste 2–3 relevant sentences from transcript]"

I'm building a [tech stack: React/Next.js/Node.js/etc.] app and I need to:
1) [Specific requirement based on what the video showed]
2) [Another requirement]

The video showed [technology/pattern], but I want to [your variation: different framework, simpler version, etc.].

Please write [code/explanation] that implements what the video showed.
Return [format: only the code, with comments / explanation + code / etc.].
```

**Your Prompt:**

---

## Step 5: Get Claude's Response (5 min)

**Where to paste:**
- Claude Code: Paste your prompt in the terminal
- Cursor: Paste your prompt in the chat sidebar
- Claude Web (claude.ai): Paste in the chat

**Example:**

```
I watched "Understanding Redux" and want to know how actions, reducers, and store work.

Key excerpt:
"An action is a plain object that describes what happened. The reducer is a function that takes the current state and an action, and returns the new state. The store holds the entire state tree."

I'm building a Next.js + TypeScript app and I need to:
1) Understand how to connect a React component to Redux
2) Dispatch actions from a button click

The video showed Redux with class components. I want to use functional components with hooks.

Please write the store setup, reducer, and component using useSelector and useDispatch.
Return only the code with comments explaining each part.
```

---

## Step 6: Review and Iterate (5–10 min)

Claude returns code. Now:

1. **Read the code** — Do you understand what it does?
2. **Ask follow-up questions** if anything is unclear:
   - "Why does this use useSelector instead of connect()?"
   - "How would I add error handling here?"
   - "Can you show me how to test this?"
3. **Iterate** — Refine the code with specific feedback

---

## Step 7: Build It (10–20 min)

Integrate Claude's code into your actual project:

1. Create a new feature branch: `git checkout -b feat/video-learner-[topic]`
2. Add the code to your project
3. Test it locally: `npm run dev`
4. Commit: `feat: implement [concept] from [video title]`

---

## Step 8: Document Your Learning (5 min)

Write a short reflection:

**What I learned from the video:**
- Concept 1: ___________________________________________
- Concept 2: ___________________________________________

**How the transcript helped:**
- Without watching: ___ minutes
- With transcript: ___ minutes
- Time saved: ___________

**What I'd do differently next time:**
___________________________________________________________

---

## Deliverable Checklist

- [ ] Video title and link documented
- [ ] Transcript extracted (copied or summarized)
- [ ] 5-ingredient prompt written with transcript excerpt
- [ ] Claude's response reviewed and understood
- [ ] Code integrated into your project
- [ ] Feature tested locally (works as expected)
- [ ] Branch committed with clear message
- [ ] Learning reflection written

---

## Example: Complete Workflow

**Video:** "React Hooks Explained" (10 min YouTube video)

**Transcript excerpt:**
```
"useState is a hook that lets you add state to a functional component. 
You call useState with an initial value, and it returns an array with the current 
state and a function to update it. When you call the update function, React re-renders 
the component with the new state."
```

**Prompt:**
```
I watched "React Hooks Explained" and want to build a counter component.

Key excerpt:
"useState returns an array with the current state and a function to update it. 
When you call the update function, React re-renders the component with the new state."

I'm building a Next.js + TypeScript counter app and I need:
1) A counter component that increments and decrements
2) Display the current count
3) Use useState hook

Please write only the component code with TypeScript types.
```

**Claude's Response:**
```typescript
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
```

**Result:** You understand useState, built a working component, and learned by doing.

---

## Tips for Success

1. **Pick a video you're genuinely curious about** — motivation matters
2. **Use transcripts when available** — 10x faster than re-watching
3. **Pair with your tech stack** — "I want to build this in Next.js" matters
4. **Don't just copy** — Understand why each line exists
5. **Test locally** — Make sure the code works before moving on

---

## Resources

- **YouTube Transcripts:** www.youtube.com (CC button → Show transcript)
- **Whisper Transcription:** github.com/openai/whisper
- **Claude Code:** claude.ai or install `npm install -g claude`
- **Cursor:** cursor.sh

---

## Next Steps

Once you complete this project:
1. Share your learning in the course community (optional)
2. Apply the concept to your main project
3. Teach it to a friend or teammate (best way to cement learning)
4. Move to the next lesson

---

**Questions?** See Module 2.5 lesson for more details on transcript extraction and competitive learning.
