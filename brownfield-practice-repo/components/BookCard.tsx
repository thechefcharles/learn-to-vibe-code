import type { Book } from "@/lib/books";

export function BookCard({ book }: { book: Book }) {
  return (
    <li className="book-card">
      <div>
        <span className="book-title">{book.title}</span>
        <span className="book-author"> — {book.author}</span>
      </div>
      <div className="book-meta">
        <span className={`badge badge-${book.genre}`}>{book.genre}</span>
        <span className="book-year">{book.year}</span>
        {book.read && <span className="badge badge-read">✓ read</span>}
      </div>
    </li>
  );
}
