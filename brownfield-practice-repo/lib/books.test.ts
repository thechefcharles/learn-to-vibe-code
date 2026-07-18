import { describe, it, expect } from "vitest";
import { books, searchBooks } from "./books";

// Baseline tests that pass on a fresh clone — proof your test setup works.
// BUG-101 and FEAT-102 ask you to ADD tests here (see TICKET.md / ANSWER-KEY.md).
describe("searchBooks", () => {
  it("returns all books for an empty query", () => {
    expect(searchBooks(books, "")).toHaveLength(books.length);
  });

  it("matches on title (case-insensitive)", () => {
    const results = searchBooks(books, "dune");
    expect(results).toHaveLength(1);
    expect(results[0].title).toBe("Dune");
  });

  it("matches on author", () => {
    const results = searchBooks(books, "Sanderson");
    expect(results.map((b) => b.title)).toContain("Mistborn: The Final Empire");
  });

  // TODO(BUG-101): add a test asserting searchBooks does not throw on "(".
});
