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

## Lesson 12.1a — Write One Test by Hand (~30 min)

Before Claude Code generates 100 tests, let's write ONE test ourselves. This teaches what a good test actually IS.

### What Makes a Good Test?

A test answers one question: "Does this code do what I expect?"

**Bad test:**
```javascript
it("adds a pet", () => {
  const result = addPet({ name: "Fluffy" });
  expect(result).toBeDefined(); // ✗ This always passes (result exists but might be wrong)
});
```

**Good test:**
```javascript
it("addPet returns a pet with the correct name", () => {
  const result = addPet({ name: "Fluffy" });
  expect(result.name).toBe("Fluffy"); // ✓ This checks the actual result
  expect(result.id).toBeDefined(); // ✓ ID was created
});
```

Difference: Bad test doesn't verify anything. Good test checks the actual behavior.

### Practice: Write a Test

Pick a simple function from your pet tracker. Example: `formatDate(date)` should turn `new Date("2024-01-15")` into `"Jan 15, 2024"`.

**Step 1: Write the test**
```javascript
it("formatDate returns readable date", () => {
  const result = formatDate(new Date("2024-01-15"));
  expect(result).toBe("Jan 15, 2024");
});
```

**Step 2: Run the test**
- If the code already works: test passes ✓
- If the code is broken: test fails ✗ (which is good—the test caught the bug!)

**Step 3: Understand what you verified**
You checked: "formatDate correctly converts dates to readable strings."

If the test passes, you know the function works. If it fails, you know it doesn't.

### Why Manual Testing Matters

Writing one test teaches:
- What makes a good assertion (checks actual behavior, not "it exists")
- What edge cases matter (empty string? null date? future date?)
- How to think like a skeptic ("What could go wrong here?")

Claude Code generates tests fast, but if you've never written one, you can't judge if the generated tests are actually good.

**Next:** Claude Code will generate many tests. You'll know good ones when you see them.

---

## Lesson 12.1 — Automated Testing with Claude Code (~30 min)

Now that you understand what a good test looks like, let's scale it up.

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

**Your job:** Review the tests (do they make sense? Do they check actual behavior like you learned?), then run them!

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

## Lesson 12.3a — Diagnose Performance by Hand (~30 min)

Before Claude Code audits everything, let's diagnose ONE slow function manually. This teaches how to think like a performance engineer.

### How to Find Slow Code

**Symptom:** Your pet tracker takes 5 seconds to load the pet list. That's slow.

**Investigation:**
1. Open DevTools (F12 in browser)
2. Go to "Network" tab
3. Reload the page
4. Look at request times — which took the longest?

Example:
```
GET /api/pets → 4.8 seconds ✗ (slow!)
GET /api/user → 0.2 seconds ✓
GET /styles.css → 0.1 seconds ✓
```

The `/api/pets` call is slow. Why?

**Diagnosis:**
Open your `actions/fetchPets.ts` file. Read it:

```typescript
export async function fetchPets() {
  const pets = await supabase.from("pets").select("*").eq("user_id", userId);
  
  // This loop is the problem:
  for (let pet of pets) {
    const breed = await supabase.from("breeds").select("*").eq("id", pet.breed_id);
    // ^ This queries the database ONCE PER PET. If you have 100 pets, that's 100 queries!
  }
  
  return pets;
}
```

**The problem:** "N+1 query" — you fetch pets (1 query), then fetch breed info for each pet (N more queries). Total: 1 + N queries.

**The fix:** Fetch all breeds in one query, then match them in JavaScript:

```typescript
const breeds = await supabase.from("breeds").select("*");
const pets = await supabase.from("pets").select("*").eq("user_id", userId);
const petsWithBreeds = pets.map(pet => ({
  ...pet,
  breed: breeds.find(b => b.id === pet.breed_id)
}));
return petsWithBreeds;
```

Now: 2 queries total (no matter how many pets).

### Why Manual Diagnosis Matters

You learned:
- How to identify the slow code (DevTools)
- How to read the code and spot the pattern (N+1 queries)
- How to think about optimization (fewer database calls)

Claude Code's audit will flag this same issue, but if you understand WHY it's slow, you can fix it confidently.

### Practice Challenge

Look at a function in your app. Use DevTools to time it. If it's slow (>1 second):
1. Read the code
2. Count the database calls
3. Spot the pattern (repetition? nested loops?)
4. Propose ONE fix

Don't implement the fix yet — just understand the problem.

---

## Lesson 12.3 — Performance Audits with Claude Code (~30 min)

**Performance = speed.** Slow apps = users leave.

Now that you've manually diagnosed one slow function, let's use Claude Code to find them everywhere.

### Let Claude Code Audit Performance

Open Claude Code:

```bash
claude
```

Paste:

```
Audit my pet tracker app for performance issues.

Check these:
1. Database queries:
   - Any N+1 query patterns?
   - Are queries optimized?
   - Any unnecessary loops fetching data?

2. Frontend:
   - Is loading slow?
   - Are images optimized?
   - Are there unnecessary re-renders?

3. Error handling:
   - Does the app show loading states?
   - Does it show friendly error messages?

Review my app code and tell me:
- What's production-ready ✅
- What needs fixing ⚠️ (prioritize by speed impact)
- How to fix it

Show me specific code changes if needed!
```

Claude Code will:
- Review your code ✅
- Find performance issues ✅
- Suggest fixes ✅
- Even write code for you ✅

**Key things to look for:**
- Show "Loading..." spinners while fetching
- Show friendly error messages if something breaks
- Optimize images (compress, use correct format)
- Reduce database calls (N+1 patterns)

---

## Lesson 12.4a — Test Accessibility by Hand (~30 min)

Before automated tools check a11y, let's verify accessibility manually. This teaches why a11y matters.

### Why Accessibility Matters

Not everyone uses a mouse + eyes. Some users:
- Use keyboards only (can't use a mouse)
- Use screen readers (can't see the screen)
- Are colorblind (can't distinguish red from green)
- Have slow internet (big images time out)

Accessibility = your app works for everyone.

### Test 1: Keyboard Navigation

Can users navigate your app without a mouse?

**Test it:** Unplug your mouse (or cover it). Use only Tab key to navigate.

```
Press Tab → Does a button highlight?
Press Enter → Does it click?
Press Tab again → Does focus move to the next element?
Press Shift+Tab → Can you go backwards?
```

If any element doesn't highlight or respond to Tab, it's not keyboard-accessible.

**Example:** Your pet tracker has a "Delete" button but no `id`, no `aria-label`, and no keyboard focus. Screenreader user can't find it.

**Fix:** Add `id` and `aria-label`:
```jsx
<button id="delete-pet" aria-label="Delete this pet">Delete</button>
```

Now screen reader users know what the button does.

### Test 2: Color Contrast

Can users with low vision read your text?

**Check:** Open DevTools → Inspect a text element → Look at computed styles.

Is the text dark enough on the background? 

**Rule:** Text should be at least 4.5:1 contrast ratio (dark text on light background, or vice versa).

**Example:**
- ✓ Black text on white = high contrast (good)
- ✗ Light gray text on white = low contrast (bad, hard to read)

If your app uses light gray text, colorblind users might not see it.

**Fix:** Use darker text or lighter background.

### Test 3: Alt Text on Images

Can screen readers understand your images?

**Check:** Inspect each image. Does it have `alt="..."`?

```jsx
<img src="fluffy.jpg" alt="Golden retriever running in grass" />  ✓
<img src="fluffy.jpg" alt="Image" />  ✗ (too generic)
<img src="fluffy.jpg" />  ✗ (no alt at all)
```

**Why:** Screen readers read alt text aloud. Users who can't see the image still know what it is.

### Why Manual Testing Matters

You learned:
- Keyboard users exist (Tab key test)
- Colorblind users exist (contrast test)
- Blind users exist (alt text test)
- Real harms happen when a11y is missing

Claude Code's audit will flag these issues, but if you understand the human impact, you'll take accessibility seriously.

---

## Lesson 12.4 — Accessibility Audits with Claude Code (~30 min)

**Accessibility = everyone can use it.** Blind users, keyboard-only users, slow internet — your app should work for everyone.

Now that you've manually tested keyboard, contrast, and alt text, let's use Claude Code to check everything.

### Let Claude Code Audit Accessibility

Open Claude Code:

```bash
claude
```

Paste:

```
Audit my pet tracker app for accessibility issues.

Check these:
1. Keyboard navigation:
   - Can I Tab through all interactive elements?
   - Do buttons have focus indicators?

2. Visual accessibility:
   - Are form fields labeled?
   - Is text readable (good contrast)?
   - Do images have alt text?

3. Screen readers:
   - Do buttons have aria-label?
   - Are lists properly marked up?

Review my app code and tell me:
- What's accessible ✅
- What needs fixing ⚠️
- How to fix it (with code)

Show me specific code changes if needed!
```

Claude Code will:
- Review your code ✅
- Find a11y issues ✅
- Suggest fixes ✅
- Even write code for you ✅

**Key things to fix:**
- Add alt text to images (describe what you see)
- Add labels to form inputs (so screen readers work)
- Make sure you can use Tab to navigate
- Check text contrast is dark enough

---

## Lesson 12.5a — Understand Security by Hand (~20 min)

Before tools check security, let's understand why each rule matters. This teaches security thinking, not just checklists.

### Security Rules & Why They Exist

**Rule 1: Never hardcode secrets in code**

Bad:
```javascript
const SUPABASE_KEY = "sb_anon_xxx123"; // ✗ Hardcoded in source code
```

Why it's dangerous:
- You push to GitHub (public)
- Anyone can see the key
- They can impersonate your app and steal data

Good:
```javascript
const SUPABASE_KEY = process.env.SUPABASE_KEY; // ✓ Loaded from environment
```

Why it works:
- Secret lives in Vercel (not in code)
- Only the deployed app can access it
- GitHub shows no secret

**Rule 2: Always validate user input**

Bad:
```javascript
const userId = request.params.id; // ✗ Trust user input
const user = await db.getUser(userId); // Attacker: /user/999 → I see someone else's data!
```

Why it's dangerous:
- User submits `id=999` when their own ID is `1`
- If you don't check, they see User 999's data (privacy breach)

Good:
```javascript
const userId = request.params.id;
if (userId !== currentUser.id) {
  throw new Error("Not authorized"); // ✓ Verify they own this data
}
const user = await db.getUser(userId);
```

Why it works:
- You check: "Does this user own this ID?"
- If not, you refuse access
- Attacker can't see other people's data

**Rule 3: Enable RLS (Row-Level Security)**

Bad:
```sql
CREATE TABLE pets (
  id uuid,
  user_id uuid,
  name text
);
-- No RLS policy
-- Any logged-in user can read/write any pet
```

Why it's dangerous:
- User A logs in
- User A queries "SELECT * FROM pets"
- Gets all pets (User A's + User B's + User C's)
- Security is enforced only in your app code
- If your app has a bug, data leaks

Good:
```sql
CREATE TABLE pets (
  id uuid,
  user_id uuid,
  name text
);

CREATE POLICY "Users can only see their own pets" ON pets
  FOR SELECT USING (auth.uid() = user_id);
```

Why it works:
- Database enforces security
- Even if your app is buggy, RLS blocks bad queries
- Defense in depth: database + app both protect data

### Why Manual Security Thinking Matters

You learned:
- Secrets belong in environment, not code (why: GitHub is public)
- Input validation prevents data leaks (why: attackers can ask for other users' data)
- RLS protects at the database layer (why: defense in depth)

Claude Code's audit will flag missing security, but if you understand the HARMS, you'll build securely.

---

## Lesson 12.5 — Security (~30 min)

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

### Step 1: Manual Testing (15 min)

**A. Write one test by hand**
1. Pick a simple function from your app (e.g., `formatDate`, `validateEmail`, `calculateAge`)
2. Write ONE test that checks actual behavior (not just "it exists")
3. Run the test: does it pass?
4. Screenshot: your test code + passing test result

**B. Test error handling manually**
1. Open DevTools (F12)
2. Go to Network tab → Throttling → select "Slow 3G"
3. Reload your app
4. Does it show a loading state (spinner or message)?
5. Screenshot: loading state visible

### Step 2: Manual Performance Diagnosis (15 min)

1. Open DevTools → Network tab (reset throttling to Normal)
2. Reload your pet tracker
3. Which request takes the longest? (look at the request times)
4. Open the code for that slow request (in your editor)
5. Count how many database queries it makes
6. Write down: "This function does X queries. It could be faster by Y"
7. Screenshot: DevTools showing slow request + your notes about the pattern

(Don't fix it yet—just understand the problem!)

### Step 3: Manual Accessibility Testing (15 min)

**A. Keyboard navigation test**
1. Put your mouse aside
2. Press Tab repeatedly through your app
3. Can you reach every interactive element (buttons, links, inputs)?
4. Do they highlight when focused?
5. Screenshot: a button with visible focus indicator

**B. Image alt text check**
1. Find one image in your app
2. Right-click → Inspect
3. Does it have `alt="..."`? 
4. Is the alt text descriptive?
5. Screenshot: your image element with alt text

**C. Contrast check**
1. Pick one text element
2. Look at the text color vs background
3. Is it dark enough to read easily?
4. Notes: "Text is [color] on [background]. Readable? YES/NO"

### Step 4: Manual Security Review (10 min)

**A. Secrets check**
1. Look at your `.env.local` file
2. Is it listed in `.gitignore`? (if not, you exposed secrets!)
3. Are any secrets in your code files? (search for "key", "secret", "token")

**B. Validation check**
1. Find one database write (e.g., creating a pet)
2. Read the code: does it check ownership? (e.g., is `user_id` verified?)
3. Notes: "This function validates: [yes/no]. If not, attacker could [vulnerability]"

**C. RLS check**
1. Open Supabase dashboard
2. Click on one table
3. Look for RLS policies
4. Screenshot: RLS policy that restricts data per user

### Step 5: Ask Claude Code to Scale Up (20 min)

Now Claude Code can do these things everywhere:

Open Claude Code:

```bash
claude
```

Paste:

```
I've manually tested my app for:
1. One test case (checking function behavior)
2. One slow query (diagnosed in DevTools)
3. Keyboard navigation + alt text + contrast (a11y checks)
4. Secret management + validation + RLS (security)

Now I want Claude Code to:
- Generate tests for ALL functions (following my pattern)
- Audit performance (find all slow queries)
- Check all a11y issues (and help fix top 3)
- Verify all security rules are enforced

Show me what needs fixing, prioritized by severity.
```

Claude Code will:
- Generate comprehensive tests
- Run audits
- List issues with severity (critical/high/medium)

### Step 6: Review & Fix (20 min)

1. **Critical issues:** Fix immediately (security breaches, data loss)
2. **High issues:** Fix in this session (major performance, broken keyboard nav)
3. **Medium issues:** Plan to fix later

For each issue:
- Ask Claude Code to fix it
- Verify the fix manually (test it works)
- Screenshot: the fix applied + verified

### Deliverable:
- Screenshots of manual test (code + passing result)
- DevTools screenshot showing slow query
- Performance diagnosis notes (query count, pattern identified)
- Screenshot of keyboard navigation test (focused button)
- Screenshot of image with alt text
- Screenshot of RLS policy in Supabase
- Before/after screenshots of fixes (if any applied)
- Completed checklist (see below)

---

## Quiz Questions (Preview)

Here are your three quiz questions. Study these!

**Q12-k1:** A test says `expect(pet).toBeDefined()`. Why is this a bad test?
- (a) It's a good test
- (b) **It only checks that the result exists, not that it's correct** ✓
- (c) It's too long
- (d) Tests aren't useful

*Why:* A good test checks actual behavior (pet.name is correct), not just "something was returned." A bad test can pass even if your code is wrong!

**Q12-k2:** Your DevTools show `/api/pets` takes 5 seconds. You read the code and see a loop that queries the database once per pet. What's the pattern called?
- (a) Good performance
- (b) **N+1 query problem** ✓
- (c) Caching
- (d) Optimization

*Why:* You query once (N), then once more for each result (+1). If you have 100 pets, that's 1 + 100 = 101 queries! Slow.

**Q12-k3:** You're testing accessibility. You unplug your mouse and use Tab to navigate. A button doesn't highlight. Why is this a problem?
- (a) It's fine, just a visual glitch
- (b) **Users who can't use a mouse can't click that button** ✓
- (c) Buttons don't need to be accessible
- (d) Only for blind users

*Why:* Keyboard-only users (motor disabilities) rely on Tab to navigate. If a button doesn't respond to Tab, they can't click it. That's excluding real users!

**Q12-k4:** You hardcode `SUPABASE_KEY = "sb_anon_xxx"` in your code. Why is this dangerous?
- (a) It's fine, it's in your private repo
- (b) **Anyone who sees your code (GitHub, etc.) can use your app as you and steal data** ✓
- (c) It's more secure than environment variables
- (d) It won't affect security

*Why:* GitHub is public. Hardcoded secrets = breached. Use environment variables so secrets never touch code.

**Q12-k5:** Your RLS policy says `allow select if auth.uid() = user_id`. What does this protect?
- (a) It doesn't protect anything
- (b) **It prevents users from seeing other users' rows** ✓
- (c) It's only for the app layer
- (d) It's optional

*Why:* RLS (Row-Level Security) is database-enforced. User A can only see rows where user_id = User A's ID. Even if your app is buggy, the database blocks bad queries.

---

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **You write this test:**
   ```javascript
   it("saves a pet", () => {
     const result = savePet({ name: "Fluffy" });
     expect(result).toBeDefined();
   });
   ```
   **Question:** What's wrong with this test? How would you fix it?
   - *Example answer:* "This test only checks that SOMETHING was returned, not that it's correct. A good test checks actual behavior: `expect(result.name).toBe("Fluffy")` and `expect(result.id).toBeDefined()`. That way, if savePet is broken, the test catches it."

2. **You see a query taking 3 seconds. Write down the steps to diagnose why.**
   - *Example answer:* 
     1. Open DevTools Network tab
     2. Reload the page and find the slow request
     3. Open the code that makes that request
     4. Count how many database calls it makes
     5. Look for patterns (loops? nested queries?)
     6. Propose ONE optimization

3. **Test accessibility by hand: Tab through your app. A button doesn't highlight. What does this mean?**
   - *Example answer:* "It means keyboard-only users can't click that button. I need to fix it by making sure the button responds to Tab and has a visible focus indicator (outline or background change)."

4. **Why does RLS matter more than just checking ownership in your code?**
   - *Example answer:* "RLS is database-enforced. Even if your app code has a bug, the database won't let users see data they don't own. Code can have bugs, but the database is a second line of defense."

### Scenario-based judgment checks:

*For each scenario, explain what went wrong and how to fix it.*

- **(a) Your test passes but your app still crashes in production.** Tests aren't catching everything.
  - ✅ **Root cause:** You only tested the happy path (when everything works). **Fix:** Test edge cases (empty input, network failure, missing data).
  - ❌ **Avoid:** Only testing what you think will work.

- **(b) Your app works on your computer but crashes when your friend visits.** Your friend has different browser/internet.
  - ✅ **Root cause:** You only tested on one device/network. **Fix:** Test on slow internet (DevTools → Network → Slow 3G), test on phone, ask friends to test.
  - ❌ **Avoid:** Assuming "if it works for me, it works for everyone."

- **(c) DevTools shows your `/api/pets` endpoint takes 4 seconds. You read the code and see a loop fetching breed info for each pet.**
  - ✅ **Pattern:** N+1 queries (1 to get pets, N more to fetch breeds). **Fix:** Fetch all breeds in one query, then match them in JavaScript. Now it's 2 queries total.
  - ❌ **Avoid:** Shipping N+1 patterns. They're often the reason apps are slow!

- **(d) Your page shows a blank screen while loading. No spinner, no message.**
  - ✅ **Fix:** Add a loading message or spinner while fetching data. Users think it's broken if there's nothing to see.
  - ❌ **Avoid:** Blank screens. Always show what's happening!

- **(e) You unplug your mouse and try to use Tab to navigate. A button doesn't highlight when focused.**
  - ✅ **Problem:** Keyboard-only users can't click that button. **Fix:** Add keyboard focus styling (outline or background change) and ensure the button is in the tab order.
  - ❌ **Avoid:** Testing only with a mouse. Real users use keyboards!

- **(f) You see a secret API key in your git history.**
  - ✅ **Critical:** Rotate that key immediately (it's compromised). **Fix:** Add `.env.local` to `.gitignore` so it never gets committed.
  - ❌ **Avoid:** Leaving secrets in the repo. This is a real security issue!

- **(g) User A logs in, sees their pets. User B logs in, also sees User A's pets!**
  - ✅ **Problem:** RLS is not enabled or misconfigured. **Fix:** Add RLS policy: `allow select if auth.uid() = user_id`. Test with 2 accounts to verify isolation works.
  - ❌ **Avoid:** Skipping RLS. It's your strongest defense against data leaks!

---

**Rubric checklist (before you submit):**

| Checkmark | What to check | Evidence |
|-----------|---------------|----------|
| ✅ | **Manual test written by hand:** checks actual behavior (not just "it exists") | Screenshot: test code + passing result |
| ✅ | **Manual performance diagnosis:** identified one slow query + pattern (N+1, loop, etc.) | Screenshot: DevTools + notes on pattern |
| ✅ | **Manual a11y testing:** Tab test + alt text check + contrast review completed | Screenshots: focused button, alt text in code |
| ✅ | **Manual security review:** checked secrets in `.gitignore`, validated one query, verified RLS | Screenshot: `.gitignore` + RLS policy |
| ✅ | **Claude Code audit run:** asked for tests, performance audit, a11y audit, security audit | Screenshot: Claude Code response showing issues |
| ✅ | **Tests pass:** `npm run test` shows green checkmarks | Screenshot: terminal output |
| ✅ | **Loading state:** page shows spinner/message while fetching | Screenshot: loading UI visible |
| ✅ | **Error state:** page shows friendly error message, not crash | Screenshot: error message visible |
| ✅ | **Keyboard accessible:** all buttons/inputs reachable via Tab | Screenshot: focused element highlighted |
| ✅ | **Images have alt text:** spot-checked at least 3 images | Notes: alt text descriptions |
| ✅ | **RLS enabled:** verified in Supabase dashboard + tested with 2 accounts | Screenshot: RLS policy + test results |
| ✅ | **Secrets safe:** no keys in code, `.env.local` in `.gitignore` | Screenshot: `.gitignore` file |
| ✅ | **Fixes applied:** at least 1 critical/high issue fixed from audit | Screenshots: before + after |

*Pass mark: 80% (10/13 items checked) AND demonstrated manual understanding BEFORE using Claude Code.*

---

## Key Takeaways

- **Manual first:** Write one test, diagnose one slow query, test keyboard access, understand security rules
- **Then scale:** Let Claude Code do it everywhere (tests, audits, fixes)
- **Tests catch bugs before users do** 🧪 — but only if you write good ones
- **Performance matters** — slow apps = users leaving. DevTools helps you spot the culprits
- **Accessibility matters** — real users can't use your app if it's keyboard-hostile or hard to read
- **Security = user trust** — RLS + validation + no hardcoded secrets protect user data
- **Production code is rock-solid** because you understand the WHY, not just the HOW

**Next:** Module 13 — Automating Your Dev Pipeline!
