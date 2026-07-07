# Module 8: Reading & Debugging Code 🐛

**Stage:** Production · **Level:** Intermediate · **Duration:** ~5 hours · **XP:** 500

**What you need:** Modules 0-7

> **Why this matters:** AI writes code, but you still need to understand it. Bugs happen. This module teaches you to read code (even if someone else or AI wrote it) and debug when things break.

## What You'll Learn

By the end of this module, you'll be able to:

1. **Read code** written by AI and understand it
2. **Spot bugs** by reading code carefully
3. **Use error messages** to find and fix problems

---

## Lesson 8.1 — Reading Code Like a Programmer (~60 min)

Code is instructions. Read it top-to-bottom:

```javascript
function addPet(name, breed) {
  const newPet = { name, breed, id: Math.random() };
  pets.push(newPet);
  return newPet;
}
```

*What does this do?*
- Line 2: Create a new pet object with name, breed, and random ID
- Line 3: Add it to the pets list
- Line 4: Send back the new pet

**Ask yourself:**
- What inputs does this take?
- What does it return?
- What could go wrong?

---

## Lesson 8.2 — Error Messages Are Your Friends (~45 min)

When your app breaks, you get an error message in the console (browser developer tools).

Example error:
```
Uncaught TypeError: pets.push is not a function
```

This tells you:
- WHERE it broke: `pets.push`
- WHAT went wrong: `pets` is not a function (you probably meant an array, not a function)

**Pro move:** Copy the error and ask Claude Code: *"I got this error: [paste]. Fix it."*

Claude Code reads your code + the error and fixes it.

---

## Lesson 8.3 — Common Bugs (~60 min)

**Bug: Variable typo**
```javascript
const newPet = { name };
petList.push(newPet);  // Wrong! It's "pets" not "petList"
```

**Bug: Forgot to await**
```javascript
const data = supabase.from("pets").select();  // Missing await!
console.log(data);  // Will be undefined
```

**Bug: State update doesn't refresh the page**
```javascript
pets.push(newPet);  // Wrong! In React, you need setState
setPets([...pets, newPet]);  // Right!
```

---

## Lesson 8.4 — Debugging Strategies (~45 min)

**Strategy 1: Console logs**

Add `console.log()` before and after suspicious code:

```javascript
console.log("About to add pet:", newPet);
addPet(newPet);
console.log("Pet added!");
```

Check the browser console (F12) to see what's happening.

**Strategy 2: Read the code line-by-line**

Ask: "Does this line do what I think it does?"

**Strategy 3: Test one thing at a time**

Don't change five things and hope. Change one, test, then next.

---

## Activity: Spot the Bug 🐛

I'll give you code with a bug. Find it and fix it. Submit the corrected code.

---

## Quiz Questions (Preview)

Here are your three quiz questions. Study these!

**Q8-k1:** When your code breaks, the first thing to do is:
- (a) Ask the AI to fix it immediately
- (b) **Read the error message (it tells you what went wrong!)** ✓
- (c) Rewrite everything
- (d) Restart your computer

*Why:* Error messages are GOLD! They tell you exactly what's broken and where. The error message is your best friend. Always read it first!

**Q8-k2:** If you can't explain a line of AI code after reading it carefully, you should:
- (a) Ship it anyway
- (b) **Don't ship it yet — simplify it or ask for a version you understand** ✓
- (c) Delete the whole file
- (d) Ignore it

*Why:* You're responsible for every line of code in your app. If you don't understand it, you can't maintain it, and you can't defend it (that's what the capstone tests!). Never ship code you don't understand.

**Q8-k3:** If the AI "fixes" a problem by removing security (like RLS), that's:
- (a) A good fix
- (b) **Dangerous (it hides the real problem)** ✓
- (c) The only way
- (d) Fine

*Why:* That's a band-aid, not a real fix! Removing security to make an error disappear treats the symptom, not the root cause. Find what's REALLY wrong.

---

## Knowledge Check (Quiz)

1. **Read this code and explain what it does.**
2. **You got an error. Explain what the error means.**
3. **List 3 common bugs and how to fix them.**

---

## Key Takeaways

- Read code top-to-bottom, ask what each line does 📖
- Error messages tell you what went wrong
- Test one change at a time
- Console logs help you see what's happening
- Ask AI to fix bugs (give it the error)

**Next:** Module 9 — Git & GitHub!
