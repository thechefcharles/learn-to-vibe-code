import { useState, useEffect } from 'react';

interface UseKeyboardShortcutsReturn {
  shortcutsOpen: boolean;
  setShortcutsOpen: (open: boolean) => void;
}

export function useKeyboardShortcuts(): UseKeyboardShortcutsReturn {
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if user is typing in an input or textarea
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        (target as any).contentEditable === 'true'
      ) {
        return;
      }

      // Cmd+? (Mac) or Ctrl+? (Windows) to open shortcuts panel
      if (
        event.key === '?' &&
        (event.metaKey || event.ctrlKey) &&
        !event.shiftKey
      ) {
        event.preventDefault();
        setShortcutsOpen(true);
      }

      // Escape to close shortcuts panel
      if (event.key === 'Escape' && shortcutsOpen) {
        event.preventDefault();
        setShortcutsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcutsOpen]);

  return { shortcutsOpen, setShortcutsOpen };
}
