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
