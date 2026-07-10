import { useEffect } from "react";

interface UseKeyboardNavigationOptions {
  onNext: () => void;
  onPrevious: () => void;
  disabled?: boolean;
}

export function useKeyboardNavigation({
  onNext,
  onPrevious,
  disabled = false,
}: UseKeyboardNavigationOptions) {
  useEffect(() => {
    if (disabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if user is typing in an input or textarea
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        (target as any).contentEditable === "true"
      ) {
        return;
      }

      // J key for next
      if (event.key.toLowerCase() === "j") {
        event.preventDefault();
        onNext();
      }

      // K key for previous
      if (event.key.toLowerCase() === "k") {
        event.preventDefault();
        onPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onNext, onPrevious, disabled]);
}
