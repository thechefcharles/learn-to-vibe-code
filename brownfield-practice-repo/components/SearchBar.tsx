"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="search"
      className="search-bar"
      placeholder="Search by title or author…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search books"
    />
  );
}
