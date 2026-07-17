# Module 2.5 Resources: Video Transcription & Knowledge Import

Tools, links, and references for extracting video transcripts and feeding knowledge into Claude prompts.

---

## Transcript Extraction Tools

### YouTube (Easiest, Free)
- **YouTube Auto-Captions**
  - How: Open any YouTube video → Click CC button → Click three-dot menu → "Show transcript"
  - Cost: Free
  - No installation needed
  - Works for any video with captions

### Whisper (OpenAI, Free, Local or API)
- **GitHub:** github.com/openai/whisper
- **Installation:**
  ```bash
  pip install openai-whisper
  whisper <audio-file>
  ```
- **Cost:** Free (local) or $0.006 per minute (API)
- **Supports:** Audio files, video files, YouTube URLs
- **Language:** 99 languages
- **Example:**
  ```bash
  whisper https://youtube.com/watch?v=... --model base
  # Outputs: <video-name>.txt
  ```

### Spokenly (Web-Based, Free)
- **Website:** www.spokenly.com
- **How:** Click "Record" → Speak → Transcribe
- **Cost:** Free
- **No installation needed**
- **Use for:** Short clips or manual notes

### Google Recorder (Android, Free)
- **Download:** Google Play Store
- **Cost:** Free
- **Real-time transcription**
- **Supports:** Multiple languages

### Rev (Paid, High Quality)
- **Website:** www.rev.com
- **Cost:** ~$1.50/minute
- **Human review:** Available
- **Turnaround:** Hours to days
- **Best for:** Important, long videos where accuracy matters

### Otter.ai (Freemium)
- **Website:** www.otter.ai
- **Cost:** Free tier (~600 minutes/month), Premium $10+/month
- **Features:** Real-time transcription, speaker identification
- **Supports:** Audio, video, live calls

---

## Video Learning Platforms

### YouTube
- **URL:** www.youtube.com
- **Best for:** Tutorials, conferences, talks
- **Transcript access:** CC button → Show transcript
- **Discovery:** Search "[topic] tutorial" or "[topic] conference 2025"

### Skillshare
- **URL:** skillshare.com
- **Cost:** Subscription (~$35/year)
- **Focus:** Design, business, coding, creative skills
- **Transcripts:** Available for most classes

### Udemy
- **URL:** udemy.com
- **Cost:** $10–50 per course
- **Focus:** Structured learning paths
- **Captions:** Most courses have them

### Coursera
- **URL:** coursera.org
- **Cost:** Free audit or $30–50/month subscription
- **Academic content:** University-level courses
- **Transcripts:** Available

### Conference Talks
- **JSConf (JavaScript):** jsconf.com
- **ReactConf:** reactconf.com
- **PyCon (Python):** pycon.org
- **Search:** "[conference name] videos YouTube"

---

## Transcript-to-Prompt Workflow

### Step 1: Extract Transcript
```bash
# Using Whisper
whisper video.mp4 --model base

# Output: video.txt (transcript)
```

### Step 2: Copy Relevant Section
```
# From transcript, find 2–3 key paragraphs
"The state management pattern works by centralizing data in a store.
The component subscribes to the store and re-renders when state changes.
This prevents prop drilling and makes code more predictable."
```

### Step 3: Write 5-Ingredient Prompt
```
I watched [video] about [topic].

Key excerpt:
"[transcript snippet]"

I'm building [tech stack].
I need to [specific requirement based on video].

Please write [what you want: code/explanation].
Return [format].
```

### Step 4: Paste Into Claude Code
```bash
claude
[Paste your prompt]
```

---

## Competitive Learning Workflow

### Step 1: Watch Competitor Demo
- Product demo on YouTube, website, or conference talk
- Screen recording of their UI in action

### Step 2: Transcribe the Demo
- Use Whisper or YouTube captions
- Extract key features mentioned

### Step 3: Screenshot Key UI Moments
- Screenshot the UI showing what you want to replicate
- 2–3 screenshots of different states

### Step 4: Analyze What You Learned
- Hierarchy: What's prominent?
- Features: What specific things did they show?
- Workflow: What's the user journey?

### Step 5: Prompt Claude Code
```
I watched [competitor] demo and want to build something similar.

Video excerpt:
"[key feature description from transcript]"

Screenshots: [attached]

I want to build [your version].
Please design [components needed].
```

---

## Best Practices

### Transcript Quality
- Longer videos → more comprehensive but noisier
- Pull **key excerpts** (2–5 sentences) not entire transcripts
- If auto-transcript is garbled, manually clean up or re-record

### Prompt Clarity
- Name the video + what you learned
- Transcripts give context; you still need to be specific
- "Based on this video, I want to…" is stronger than "I watched a video"

### Iterate on Results
- Transcript gave you knowledge; Claude needs your intent
- If Claude's output doesn't match the video's approach:
  - "The video showed [pattern]. Implement that, not [other pattern]."
  - "Use [architecture] like the video did, but for Next.js."

### Respect Copyright
- Transcripts are for personal learning, not commercial use without permission
- Citing the video (including URL) is good practice
- Don't republish transcripts commercially

---

## Example: Complete Workflow

**Goal:** Learn how to build a real-time collaboration feature

**Video:** "Building Real-Time Features with Supabase" (30 min YouTube)

**Step 1: Extract Transcript**
- YouTube CC → Show transcript → Copy full text to `transcript.txt`

**Step 2: Find Key Section**
```
"Supabase Realtime uses WebSocket connections to broadcast changes.
You subscribe to a table with `on('*', callback)`.
When any row changes, your callback fires and re-renders your component.
This is how collaborative apps stay synchronized in real-time."
```

**Step 3: Screenshot UI**
- Screenshot showing Supabase Realtime dashboard
- Screenshot showing code example

**Step 4: Prompt Claude**
```
I watched "Building Real-Time Features with Supabase" on YouTube.

Key excerpt:
"Supabase Realtime uses WebSocket connections to broadcast changes.
You subscribe to a table with `on('*', callback)`.
When any row changes, your callback fires and re-renders your component."

I'm building a Next.js app with Supabase. I want to:
1) Subscribe to invoice changes in real-time
2) Show live updates when other users create/edit invoices
3) Highlight rows that changed in the last 5 seconds

Please build the React hook and component.
Use TypeScript. Return only the code.
```

**Result:** Working real-time feature, inspired by the video, adapted to your app.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Transcript is full of errors | Try different video/tool, or manually note key points |
| Whisper not installed | `pip install openai-whisper` (requires Python) |
| Claude doesn't follow the video's pattern | Be explicit: "Use the pattern from the video where [pattern]" |
| Transcript too long | Extract just the relevant section (2–5 min chunk) |
| Video is long, transcript is huge | Use browser search to find keywords, extract that section |
| YouTube transcript not available | Use Whisper or Spokenly instead |

---

## When to Use Each Tool

| Tool | Best For | Time | Cost |
|------|----------|------|------|
| **YouTube CC** | Public videos, immediate | 5 min | Free |
| **Whisper** | Any audio/video, offline | 10 min | Free |
| **Spokenly** | Manual recording/short clips | 5 min | Free |
| **Otter.ai** | High-volume transcription | 5 min | Free/paid |
| **Rev** | Critical transcripts, accuracy needed | Hours | $$ |

---

## Further Reading

- **Whisper Documentation:** github.com/openai/whisper
- **YouTube Features:** support.google.com/youtube/answer/100078
- **Supabase Realtime:** supabase.com/docs/guides/realtime
- **Transcript-Based Learning:** Medium article on learning from video transcripts

---

## Your Takeaway

**Video transcripts are a fast, scalable way to learn from external knowledge.** Pair transcripts with Claude prompts, and you can build features faster than re-watching videos or trial-and-error coding.

**Time to learn feature from video:**
- Re-watch (traditional): 20 min
- Transcript + Claude: 3–5 min
- **Speedup: 4–6x faster**
