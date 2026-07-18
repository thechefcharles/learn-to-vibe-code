// Data layer for the Reading List app.
//
// In a real deployment the reading list would be fetched per-user from
// Supabase (see lib/supabase.ts). For this practice repo the data is seeded
// locally so the app runs offline — the point of this repo is reading and
// changing an unfamiliar codebase, not wiring up a database.

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: "fiction" | "nonfiction" | "sci-fi" | "biography" | "fantasy";
  year: number;
  read: boolean;
}

export const books: Book[] = [
  { id: "1", title: "The Pragmatic Programmer", author: "Hunt & Thomas", genre: "nonfiction", year: 1999, read: true },
  { id: "2", title: "Dune", author: "Frank Herbert", genre: "sci-fi", year: 1965, read: true },
  { id: "3", title: "Project Hail Mary", author: "Andy Weir", genre: "sci-fi", year: 2021, read: false },
  { id: "4", title: "Educated", author: "Tara Westover", genre: "biography", year: 2018, read: false },
  { id: "5", title: "The Name of the Wind", author: "Patrick Rothfuss", genre: "fantasy", year: 2007, read: true },
  { id: "6", title: "Sapiens", author: "Yuval Noah Harari", genre: "nonfiction", year: 2011, read: false },
  { id: "7", title: "Mistborn: The Final Empire", author: "Brandon Sanderson", genre: "fantasy", year: 2006, read: false },
  { id: "8", title: "Steve Jobs", author: "Walter Isaacson", genre: "biography", year: 2011, read: true },
];

/**
 * Filter the reading list by a free-text query, matching title or author.
 *
 * NOTE (BUG-101): this function builds a RegExp directly from the raw user
 * query. Reproduce the bug and find the root cause before you change anything.
 */
export function searchBooks(list: Book[], query: string): Book[] {
  if (!query.trim()) return list;

  const pattern = new RegExp(query, "i");
  return list.filter(
    (book) => pattern.test(book.title) || pattern.test(book.author)
  );
}
