# Tickets

## BUG-101 — Search crashes on special characters

**Reported by:** a user
**Severity:** high (crashes the page)

**Steps to reproduce:**
1. Run the app (`npm run dev`) and open the reading list.
2. Type an opening parenthesis `(` into the search box (or `[`, `*`, `+`).
3. The list disappears / the page throws an error.

**Expected:** searching for a special character should just match books that contain that character in the title or author (or match nothing) — it must **not** crash.

**Your job:** reproduce it, find the root cause, and fix it with the **smallest** change that solves the problem. Add a test that would have caught it. Don't redesign search.

---

## FEAT-102 — Filter by genre

**Requested by:** product

Add a way to filter the reading list by **genre** (fiction, nonfiction, sci-fi, biography, fantasy).

**Acceptance criteria:**
- A control (e.g. a dropdown) lets the user pick a genre, plus an "All" option.
- The genre filter **composes** with the existing text search (both apply together).
- Selecting "All" shows everything.
- Matches the existing code style and structure. No unrelated refactoring.
- Include a test for the new filtering logic.

**Scope note:** keep the text-search behavior as-is. This is an *additive* feature, not a rewrite.
