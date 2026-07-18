# Reading List — Brownfield Practice Repo

A small, deliberately-imperfect **Next.js + TypeScript** app used in **Module 15: Working in Existing Codebases (Brownfield)**. You did not write this code. Your job is to orient yourself in it, fix a seeded bug, and add a small feature — *without breaking anything or rewriting things you weren't asked to*.

## What the app does

A personal reading list. It shows books, marks which are read, and lets you search by title or author.

## Run it

```bash
npm install
npm run dev
# open http://localhost:3000
```

No database or credentials needed — the book data is seeded locally in `lib/books.ts`. (Auth is stubbed in `lib/supabase.ts`; in a real deployment the list would be per-user via Supabase + RLS.)

## Architecture (the 30-second map)

```
app/
  layout.tsx      — root layout
  page.tsx        — the Reading List page (holds search state, renders results)
  globals.css     — styling
components/
  SearchBar.tsx   — controlled search input
  BookCard.tsx    — one book row
lib/
  books.ts        — Book type, seed data, and searchBooks() [data layer]
  supabase.ts     — auth seam (stubbed)
```

Data flows: `page.tsx` holds the query → calls `searchBooks(books, query)` in `lib/books.ts` → renders `BookCard`s.

## Your work

See **`TICKET.md`** for the two tickets:
- **BUG-101** — search crashes on certain input.
- **FEAT-102** — add a genre filter.

Work each as a scoped change with a test, then open a focused PR. Your work is graded against **`ANSWER-KEY.md`** (don't peek until you've tried).
