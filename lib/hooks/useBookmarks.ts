'use client';

import { useEffect, useState } from 'react';

export interface Bookmark {
  moduleId: number;
  stepIndex: number;
  stepTitle: string;
  savedAt: string;
}

export interface BookmarksState {
  bookmarks: Record<string, Bookmark>;
  isLoading: boolean;
}

export function useBookmarks(): BookmarksState {
  const [bookmarks, setBookmarks] = useState<Record<string, Bookmark>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load bookmarks from localStorage
    const saved = localStorage.getItem('bookmarks');
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse bookmarks:', error);
      }
    }
    setIsLoading(false);
  }, []);

  return {
    bookmarks,
    isLoading,
  };
}
