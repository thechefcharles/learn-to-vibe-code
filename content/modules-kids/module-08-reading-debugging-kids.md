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

**Bug 1: Variable typo (easy to catch)**
```javascript
const newPet = { name };
petList.push(newPet);  // ❌ Wrong! It's "pets" not "petList"
// FIX:
pets.push(newPet);  // ✅ Right
```

**Bug 2: Forgot to await (Supabase returns a promise)**
```javascript
const data = supabase.from("pets").select();  // ❌ Missing await!
console.log(data);  // Will be { then: ... } (a promise, not data)

// FIX:
const data = await supabase.from("pets").select();  // ✅ Now data is the actual array
console.log(data);  // [{ id: 1, name: "Buddy" }, ...]
```

**Bug 3: State update doesn't refresh React**
```javascript
// ❌ WRONG — direct mutation, React doesn't know to re-render
pets.push(newPet);

// ✅ RIGHT — use setState so React knows to update the display
setPets([...pets, newPet]);
```

**Bug 4: Can't explain AI code (sanity check)**
```javascript
// AI gave you this. You can't explain what it does. DON'T SHIP IT.
const result = data.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

// FIX: Ask AI to simplify, or get a version you understand:
const petMap = {};
pets.forEach(pet => {
  petMap[pet.id] = pet;
});
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

You'll debug real code and practice the diagnosis loop: read error → reproduce → find the root cause → fix it.

### Step-by-step bug hunting:

#### Bug #1: Missing `await`

**Code:**
```javascript
async function loadPets() {
  const pets = supabase.from("pets").select();
  console.log(pets);  // What will this show?
}
```

**Step 1 — Read the error (1 min)**
- Run this code
- Check the browser console
- Notice: `pets` is not an array. It's a Promise object with `{ then: ... }`

**Step 2 — Diagnose (2 min)**
- The error: `select()` returns a Promise, but you didn't wait for it
- Root cause: missing `await`

**Step 3 — Fix (1 min)**
```javascript
async function loadPets() {
  const pets = await supabase.from("pets").select();  // ✅ Added await
  console.log(pets);  // Now shows the real array
}
```

**Step 4 — Explanation (1 min)**
- Write: "Supabase queries return Promises. I forgot `await`, so I got a Promise object instead of the data. Added `await` and now it works."

---

#### Bug #2: Typo in variable name

**Code:**
```javascript
export default function PetsPage() {
  const petList = [  // Define as "petList"
    { id: 1, name: "Buddy" },
    { id: 2, name: "Luna" }
  ];

  return (
    <div>
      {pets.map(pet => (  // But use as "pets" — typo!
        <div key={pet.id}>{pet.name}</div>
      ))}
    </div>
  );
}
```

**Step 1 — Read the error (1 min)**
- Browser shows: "pets is not defined"

**Step 2 — Find the bug (2 min)**
- Search for where `pets` is defined
- Notice: it's defined as `petList`, not `pets`
- Typo!

**Step 3 — Fix (1 min)**
```javascript
const pets = [  // ✅ Changed to "pets"
  { id: 1, name: "Buddy" },
  { id: 2, name: "Luna" }
];
```

**Step 4 — Explanation (1 min)**
- Write: "Variable was defined as `petList` but used as `pets`. Changed the definition to `pets`."

---

#### Bug #3: Direct mutation (React doesn't update)

**Code:**
```javascript
function AddPetButton() {
  const [pets, setPets] = useState([
    { id: 1, name: "Buddy" }
  ]);

  function addPet() {
    pets.push({ id: 2, name: "Luna" });  // ❌ Direct mutation
    // The page doesn't update!
  }

  return (
    <div>
      <button onClick={addPet}>Add Pet</button>
      {pets.map(pet => <div key={pet.id}>{pet.name}</div>)}
    </div>
  );
}
```

**Step 1 — Reproduce (2 min)**
- Click the button
- "Luna" doesn't appear
- But if you console.log(pets), Luna is in the array!
- Bug: React didn't re-render

**Step 2 — Diagnose (2 min)**
- Direct mutation (`.push()`) changes the array, but React doesn't see the change
- React only updates when you call `setPets()` with a NEW array

**Step 3 — Fix (1 min)**
```javascript
function addPet() {
  setPets([...pets, { id: 2, name: "Luna" }]);  // ✅ Create new array
}
```

**Step 4 — Explanation (1 min)**
- Write: "React only updates the display when state changes via `setState`. Direct mutation doesn't trigger a re-render. Fixed by using `setPets()` with a new array."

---

### Deliverable:
- Fix all three bugs
- For each bug: write the root cause (one sentence)
- Example:
  1. "Missing `await` on Supabase query"
  2. "Variable typo: defined as `petList`, used as `pets`"
  3. "Direct array mutation doesn't trigger React re-render; need `setState`"

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

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **Read this code and explain what it does (2-3 sentences):**
   ```javascript
   export default function PetCard({ pet }) {
     return (
       <div className="pet-card">
         <h2>{pet.name}</h2>
         <p>{pet.breed}</p>
       </div>
     );
   }
   ```
   - *Example answer:* "This is a React component that displays a single pet. It takes a pet object as a prop and shows the pet's name as a heading and breed as text. It's a simple card that probably displays in a list."

2. **You got an error "Cannot read properties of undefined (reading 'name')". What are two possible causes?**
   - *Example answer:* "Either the pet prop is undefined, or the pet object doesn't have a name field. Check: is the pet being passed in? Console.log(pet) to see what it actually is."

3. **List 3 common bugs in JavaScript/React and how to fix each.**
   - *Example answer:* "1. Forgot `await`: add await to async Supabase calls. 2. Variable typo: check variable name spelling. 3. Direct mutation: use `setState` instead of `.push()`."

### Scenario-based judgment checks:

*For each scenario, explain what went wrong.*

- **(a) "undefined is not a function":** You called something that doesn't exist or has the wrong name.
  - ✅ **Fix:** Check the exact name. Is it `getPets()` or `getPet()`? Check the docs or where it's defined.
  - ❌ **Avoid:** Guessing. The error tells you the exact line—read it!

- **(b) The page doesn't update after you add data:** You added the data to the array, but it doesn't show.
  - ✅ **Fix:** Are you using `setState` (e.g., `setPets()`), not direct mutation?
  - ❌ **Avoid:** Thinking the code is broken. React just doesn't know to re-render.

- **(c) Code runs but shows weird results:** The function runs, no error, but the output is wrong.
  - ✅ **Fix:** Add `console.log()` at each step to see what's happening. Trace the data.
  - ❌ **Avoid:** Staring at code. Logging is faster.

- **(d) You can't explain AI-generated code:** It's 10 lines of `.reduce()` and you have no idea what it does.
  - ✅ **Fix:** Ask the AI to simplify it, or write your own version you understand. Don't ship what you don't understand!
  - ❌ **Avoid:** Shipping it anyway and hoping. That's risky.

- **(e) Error appears but no line number:** The error says something failed, but doesn't tell you where.
  - ✅ **Fix:** Check the Network tab (Supabase call failed?) or try adding `console.log()` to narrow down the location.
  - ❌ **Avoid:** Guessing. Investigate systematically.

---

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | Fixed Bug #1 (await): query now returns data, not Promise |
| ✅ | Fixed Bug #2 (typo): variable names consistent |
| ✅ | Fixed Bug #3 (mutation): using `setState`, not `.push()` |
| ✅ | All three bugs fixed: code runs without errors |
| ✅ | Root cause named: one sentence per bug explaining the real problem |
| ✅ | Explanations show understanding: not just "fixed the typo" but "why" it was a problem |
| ✅ | Can explain any AI code: if still confused about a piece, asked for a simpler version |

*Pass mark: 80% and all three bugs fixed with explanations submitted.*

---

## Key Takeaways

- Read code top-to-bottom, ask what each line does 📖
- Error messages tell you what went wrong
- Test one change at a time
- Console logs help you see what's happening
- Ask AI to fix bugs (give it the error)

**Next:** Module 9 — Git & GitHub!
