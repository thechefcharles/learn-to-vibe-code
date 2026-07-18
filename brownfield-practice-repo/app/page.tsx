"use client";

import { useState } from "react";
import { books, searchBooks } from "@/lib/books";
import { SearchBar } from "@/components/SearchBar";
import { BookCard } from "@/components/BookCard";

export default function Home() {
  const [query, setQuery] = useState("");

  // BUG-101 surfaces here: when the query contains a regex metacharacter,
  // searchBooks() throws and this whole view crashes.
  const results = searchBooks(books, query);

  return (
    <main className="container">
      <h1>📚 Reading List</h1>
      <p className="subtitle">
        {books.length} books · {books.filter((b) => b.read).length} read
      </p>

      <SearchBar value={query} onChange={setQuery} />

      <ul className="book-list">
        {results.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </ul>

      {results.length === 0 && (
        <p className="empty">No books match &ldquo;{query}&rdquo;.</p>
      )}
    </main>
  );
}
