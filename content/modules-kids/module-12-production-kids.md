# Module 12: Production-Ready Code 🏭

**Stage:** Advanced · **Level:** Intermediate/Advanced · **Duration:** ~5 hours · **XP:** 500

**What you need:** Modules 0-11

> **Why this matters:** Your app works, but is it solid? Production = real users using it unexpectedly. This module teaches testing, error handling, security, and performance so your app doesn't break.

## What You'll Learn

By the end of this module, you'll be able to:

1. **Write tests** so you know your code works (even after changes)
2. **Handle errors gracefully** (friendly messages, not crashes)
3. **Make your app fast** (Core Web Vitals)
4. **Keep user data safe** (auth, validation, no secrets in code)

---

## Lesson 12.1 — Automated Testing with Claude Code (~30 min)

Testing = checking that your code works (now and in the future!).

**Manual testing:** You click buttons, see if they work. ✓ But tedious.

**Automated testing:** Write code that tests your code. ✓ Runs automatically. Catches bugs!

### Let Claude Code Write Tests For You

Open Claude Code:

```bash
claude
```

Paste:

```
Write automated tests for my pet tracker.

I need tests for:
1. Adding a pet (happy path + error cases)
2. Deleting a pet
3. Displaying all pets

Use Vitest for unit tests.
Include edge cases like:
- Empty name or breed
- Deleting a pet that doesn't exist
- Loading with no pets

Generate test files and show me how to run them.
```

Claude Code will:
- Generate test files ✅
- Cover happy paths + edge cases ✅
- Show you how to run them ✅

**Your job:** Review the tests (do they make sense?), then run them!

**Example test:**
```javascript
it("throws error if name is empty", () => {
  expect(() => addPet("", "Retriever")).toThrow();
});
```

This checks: "If I try to add a pet with no name, does it throw an error?" ✅

---

## Lesson 12.2 — Error Handling (~30 min)

Real apps hit failures. Handle it gracefully so the app doesn't crash.

**Bad: No error handling (crashes!)**
```javascript
async function loadPets() {
  const pets = await supabase.from("pets").select(); // If this fails → app crashes
  return pets;
}
```

**Good: Try/catch + friendly message**
```javascript
async function loadPets() {
  try {
    const pets = await supabase.from("pets").select();
    if (!pets.length) return { message: "No pets yet! Add your first one." };
    return pets;
  } catch (error) {
    return { error: "Couldn't load pets. Try again later." };
  }
}
```

**Three states your pages need:**

1. **Loading** — "Loading your pets... ⏳" (spinner while fetching)
2. **Empty** — "No pets yet 🐾 Add your first pet!" (when list is empty)
3. **Error** — "Oops! Something broke. Try again." (when fetch fails)

In React:
```javascript
export function PetsPage() {
  const [pets, setPets] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPets()
      .then(data => setPets(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div>❌ {error} — <button>Try again</button></div>;
  if (pets === null) return <div>⏳ Loading...</div>;
  if (pets.length === 0) return <div>🐾 No pets yet!</div>;

  return <div>{pets.map(p => <PetCard pet={p} key={p.id} />)}</div>;
}
```

---

## Lesson 12.3 — Performance & Accessibility Audits (~45 min)

**Performance = speed.** Slow apps = users leave.

**Accessibility = everyone can use it.** Blind users, keyboard-only users, slow internet — your app should work for everyone.

### Let Claude Code Audit Your App

Open Claude Code:

```bash
claude
```

Paste:

```
Audit my pet tracker app for production readiness.

Check these:
1. Performance:
   - Is loading slow?
   - Are images optimized?
   - Are there unnecessary re-renders?

2. Accessibility:
   - Are form fields labeled?
   - Is text readable (good contrast)?
   - Can I navigate with Tab key?
   - Do images have alt text?

3. Error handling:
   - Does the app show loading states?
   - Does it show friendly error messages?
   - Is there a "no pets yet" message?

Review my app code and tell me:
- What's production-ready ✅
- What needs fixing ⚠️
- How to fix it

Show me specific code changes if needed!
```

Claude Code will:
- Review your code ✅
- Find issues ✅
- Suggest fixes ✅
- Even write code for you ✅

**Key things to fix:**
- Add alt text to images (describe what you see)
- Add labels to form inputs (so screen readers work)
- Show "Loading..." spinners while fetching
- Show friendly error messages if something breaks
- Make sure you can use Tab to navigate

---

## Lesson 12.4 — Security (~30 min)

Keep user data safe! This is serious.

**Rule 1: Never put secrets in code**
```javascript
// ❌ BAD: API key in code!
const SUPABASE_KEY = "eyJhbGciOi...";

// ✅ GOOD: Load from env
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
```

**Rule 2: Validate user input on server**
```javascript
// ❌ BAD: Trust user input
function savePet(name: string) {
  db.pets.insert({ name }); // What if name is 10,000 characters?
}

// ✅ GOOD: Validate first
function savePet(name: string) {
  if (!name || name.length > 100) throw new Error("Invalid");
  db.pets.insert({ name });
}
```

**Rule 3: RLS (Row Level Security) = each user sees only their data**
```sql
-- ✅ SECURE: User A sees only User A's pets
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users see own pets" ON pets
  FOR SELECT USING (auth.uid() = user_id);
```

Test this by:
1. Log in as User A → see their pets
2. Log out
3. Log in as User B → see ONLY their pets (not User A's!)

**Rule 4: Use HTTPS** — Vercel does this automatically. ✓

---

## Activity: Make Your Pet Tracker Production-Ready 🏭

Follow these steps:

### Step 1: Write a test (10 min)
1. Pick a simple function (e.g., `addPet`, `deletePet`, `validateEmail`)
2. Prompt Claude Code: *"Write Vitest tests for this function. Test the happy path and edge cases."*
3. Review the tests (does each one check what you care about?)
4. Run: `npm run test`
5. All tests pass? ✓

### Step 2: Add error handling (10 min)
1. Pick a page that loads data (e.g., `/pets`, `/dashboard`)
2. Add try/catch around the data fetch
3. Add three states: loading (⏳), empty (🐾), error (❌)
4. Test: slow down your internet (DevTools → Network → slow 3G) to see loading state
5. Test: break the API endpoint to see error state

### Step 3: Run a Lighthouse audit (10 min)
1. Open your pet tracker
2. F12 → Lighthouse tab
3. Click "Analyze page load"
4. Check three things:
   - **Performance:** LCP (time to see content), INP (responsiveness)
   - **Accessibility:** Are form inputs labeled? Is text readable?
   - **Best Practices:** Any security issues?
5. Fix the easiest win (e.g., add missing alt text on an image)

### Step 4: Check security (5 min)
1. **Secrets:** Check `.env.local` is in `.gitignore`
2. **RLS:** In Supabase, click a table → check RLS is enabled
3. **Test isolation:** Log in as one user → see your pets. Log out → log in as different user → see ONLY their pets
4. **Auth:** Users can't access `/dashboard` if they're not logged in

### Step 5: Review your app (10 min)
1. Go through this checklist:
   - [ ] Has tests (unit or E2E)
   - [ ] Has loading state
   - [ ] Has empty state  
   - [ ] Has error state
   - [ ] Lighthouse performance ≥70
   - [ ] Lighthouse accessibility ≥85
   - [ ] RLS enabled on all tables
   - [ ] No secrets in code
   - [ ] Can explain every part

2. For each item: ✅ (yes) or ❌ (needs work)

### Deliverable:
- Screenshot of passing tests (terminal output)
- Screenshots of loading/empty/error states
- Screenshot of Lighthouse audit scores
- Completed checklist with ✅ or ❌ for each item

---

## Quiz Questions (Preview)

Here are your three quiz questions. Study these!

**Q12-k1:** Production-ready code means tested, resilient, secure, maintainable, and:
- (a) Colorful
- (b) **Accessible (everyone can use it) & fast** ✓
- (c) Cheap
- (d) Quick to type

*Why:* Production code isn't just for you—it's for real users. Everyone means people using keyboards or screen readers, people on slow internet, people using different devices. Plus it has to be fast or users leave!

**Q12-k2:** When AI writes tests, what should you do?
- (a) Run them blindly (it knows what it's doing)
- (b) **Review them — they can pass while checking the wrong thing** ✓
- (c) Never run them
- (d) Delete them

*Why:* A test can be WRONG but still pass! Maybe it checks the wrong thing, or it's too easy to pass. Always review tests to make sure they actually test what you care about.

**Q12-k3:** What does AI usually skip unless you ask?
- (a) Variable names
- (b) **Accessibility & performance** ✓
- (c) Syntax
- (d) Spacing

*Why:* AI is great at logic. But it forgets to ask: "Can this work with a keyboard?" "Is it fast?" "Can someone with bad vision read it?" You have to ask for these things, then check!

---

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **Why test your code?**
   - *Example answer:* "Tests check that your code works. When you change something later, tests catch if you broke it. It's like a safety net—you can refactor confidently."

2. **Write a try/catch block for saving a pet.**
   - *Example answer:*
   ```javascript
   try {
     const result = await savePet(petData);
     console.log("Pet saved!");
   } catch (error) {
     console.log("Oops! Couldn't save. Try again.");
   }
   ```

3. **What's HTTPS and why does it matter?**
   - *Example answer:* "HTTPS encrypts data between your browser and the server so hackers can't see it. It's like sending a letter in a locked box instead of a postcard. Vercel uses HTTPS automatically."

### Scenario-based judgment checks:

*For each scenario, explain what went wrong.*

- **(a) Your test passes but your app still crashes in production.** Tests aren't catching everything.
  - ✅ **Root cause:** You only tested the happy path (when everything works). **Fix:** Test edge cases (empty input, network failure, missing data).
  - ❌ **Avoid:** Only testing what you think will work.

- **(b) Your app works on your computer but crashes when your friend visits.** Your friend has different browser/internet.
  - ✅ **Root cause:** You only tested on one device/network. **Fix:** Test on slow internet (DevTools → Network → Slow 3G), test on phone, ask friends to test.
  - ❌ **Avoid:** Assuming "if it works for me, it works for everyone."

- **(c) Your page shows a blank screen while loading. No spinner, no message.** Bad loading state.
  - ✅ **Fix:** Add a loading message or spinner while fetching data. Users think it's broken if there's nothing to see.
  - ❌ **Avoid:** Blank screens. Always show what's happening!

- **(d) Your app is slow (takes 5 seconds to load). Users are leaving.** Performance not checked.
  - ✅ **Root cause:** Probably loading too much data at once. **Fix:** Use Lighthouse (F12 → Lighthouse) to find what's slow. Paginate data, compress images.
  - ❌ **Avoid:** Shipping slow code. Speed matters!

- **(e) You see a secret API key in your git history.** Secrets committed to repo.
  - ✅ **Critical:** Rotate that key immediately (it's compromised). **Fix:** Add `.env.local` to `.gitignore` so it never gets committed.
  - ❌ **Avoid:** Leaving secrets in the repo. This is a real security issue!

---

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | Tests written: at least 1 unit test, covers happy path + edge case |
| ✅ | Tests pass: `npm run test` shows green checkmarks |
| ✅ | Loading state: page shows spinner/message while fetching |
| ✅ | Empty state: page shows friendly message when no data ("No pets yet!") |
| ✅ | Error state: page shows friendly error + retry button, not crash |
| ✅ | Lighthouse performance: ≥70 score (check LCP, INP, CLS) |
| ✅ | Lighthouse accessibility: ≥85 score (labels, contrast, alt text) |
| ✅ | RLS enabled: on all tables, tested with 2 accounts |
| ✅ | Secrets safe: `.env.local` in `.gitignore`, no keys in code |
| ✅ | Auth working: can't access protected pages without login |

*Pass mark: 80% and a production-ready app with tests + audit screenshot submitted.*

---

## Key Takeaways

- Tests catch bugs before users do 🧪
- Error handling = graceful failures
- Performance matters (users leave if it's slow)
- Security = user trust
- Production code is rock-solid

**Next:** Module 13 — Automating Your Dev Pipeline!
