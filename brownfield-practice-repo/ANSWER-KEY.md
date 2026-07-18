# Answer Key (instructor / self-check)

> Try the tickets before reading this. Grading is about *process and restraint*, not just a green result.

## BUG-101 — root cause & fix

**Root cause:** `searchBooks()` in `lib/books.ts` builds a regex directly from raw user input:

```ts
const pattern = new RegExp(query, "i");
```

When the query contains a regex metacharacter (`(`, `[`, `*`, `+`, `?`, `\`), the `RegExp` constructor throws `SyntaxError: Invalid regular expression`, which crashes the render in `app/page.tsx`.

**Blast radius:** small and contained. `searchBooks` has exactly one caller (`app/page.tsx`). No database, auth, or other feature touches it. A fix here cannot regress anything outside search.

**Minimal fix (preferred):** the feature only needs a substring match, so drop the regex entirely:

```ts
export function searchBooks(list: Book[], query: string): Book[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter(
    (book) =>
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q)
  );
}
```

(An acceptable alternative is escaping the query before `new RegExp`, but that's more code for no benefit — substring match matches the intent and is simpler. Choosing the simpler fix is the point.)

**Test that would have caught it** (add to `lib/books.test.ts`):

```ts
it("does not throw on regex metacharacters", () => {
  expect(() => searchBooks(books, "(")).not.toThrow();
  expect(searchBooks(books, "(")).toEqual([]);
});
```

**Red flags (dock points):** rewriting the whole search UI, "improving" unrelated code while here, or a fix with no test.

## FEAT-102 — genre filter

**Good approach (additive, composes):** add a pure helper alongside `searchBooks`, and apply it together with search in `page.tsx`. Don't fold genre into `searchBooks` — keep the two concerns separate.

```ts
// lib/books.ts
export type GenreFilter = Book["genre"] | "all";

export function filterByGenre(list: Book[], genre: GenreFilter): Book[] {
  if (genre === "all") return list;
  return list.filter((book) => book.genre === genre);
}
```

```tsx
// app/page.tsx — compose both, don't touch searchBooks behavior
const results = filterByGenre(searchBooks(books, query), genre);
```

Plus a `<select>` for genre (matching the existing `SearchBar` style) and a test for `filterByGenre` (including `"all"` returns everything, and that it composes with search).

**Grading against the rubric:** architecture summarized; BUG-101 reproduced + root cause named + blast radius assessed; both changes scoped, tested, style-matched; one focused PR with no unrelated reformatting; scope creep (refactoring debt found along the way) correctly deferred to a separate PR.
