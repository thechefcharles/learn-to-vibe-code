# Module 12: Production-Ready Code 🏭

**Stage:** Advanced · **Level:** Intermediate/Advanced · **Duration:** ~5 hours · **XP:** 500

**What you need:** Modules 0-11

> **Why this matters:** Your app works, but is it solid? This module teaches testing, error handling, and making code that doesn't break. Production = real users, real expectations.

## What You'll Learn

By the end of this module, you'll be able to:

1. **Write tests** so you know your code works
2. **Handle errors gracefully** when things go wrong
3. **Make performant code** (fast apps)
4. **Secure your app** (keep user data safe)

---

## Lesson 12.1 — Testing (~60 min)

Testing = checking that your code works.

**Manual testing:** Click buttons, see if they work.

**Automated testing:** Write code that tests your code.

```javascript
test("adding a pet works", () => {
  const result = addPet("Buddy", "Retriever");
  expect(result.name).toBe("Buddy");
});
```

Prompt Claude Code: *"Write tests for the add pet function using Vitest."*

It creates test files. Tests run automatically. If something breaks, tests catch it.

---

## Lesson 12.2 — Error Handling (~30 min)

Apps crash. Handle it gracefully:

```javascript
try {
  const data = await savePetToDatabase(pet);
} catch (error) {
  console.log("Oops! Couldn't save pet. Try again.");
}
```

Instead of crashing, show a friendly message.

---

## Lesson 12.3 — Performance (~45 min)

Slow apps = users leave.

**Optimization tips:**

1. **Lazy load** — don't load everything at once
2. **Cache data** — save stuff locally so you don't fetch twice
3. **Optimize images** — resize them for the web
4. **Minimize code** — remove unused stuff

Prompt Claude Code: *"Optimize this app for performance. Add lazy loading, caching, and image optimization."*

---

## Lesson 12.4 — Security (~45 min)

Keep user data safe:

1. **Use HTTPS** (Vercel does this automatically)
2. **Never expose secrets** (API keys, database passwords)
3. **Validate user input** (don't trust what users type)
4. **Use auth** (users log in before accessing their data)

Supabase has built-in auth and security (RLS). Use it.

---

## Activity: Make Your App Production-Ready 🏭

1. Write tests for a feature
2. Add error handling (try/catch)
3. Run a performance check (Chrome DevTools → Lighthouse)
4. Ensure auth is set up (users log in)

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

## Knowledge Check (Quiz)

1. **Why test your code?**
2. **Write a try/catch block for saving a pet.**
3. **What's HTTPS and why does it matter?**

---

## Key Takeaways

- Tests catch bugs before users do 🧪
- Error handling = graceful failures
- Performance matters (users leave if it's slow)
- Security = user trust
- Production code is rock-solid

**Next:** Module 13 — Automating Your Dev Pipeline!
