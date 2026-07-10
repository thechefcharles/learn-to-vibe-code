import { useEffect } from "react";

interface UseSwipeNavigationOptions {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  disabled?: boolean;
}

const SWIPE_THRESHOLD = 50;

export function useSwipeNavigation({
  onSwipeLeft,
  onSwipeRight,
  disabled = false,
}: UseSwipeNavigationOptions) {
  useEffect(() => {
    if (disabled) return;

    const container = document.querySelector("[data-step-container]");
    if (!container) return;

    let touchStartX = 0;

    const handleTouchStart = (event: Event) => {
      const touchEvent = event as TouchEvent;
      touchStartX = touchEvent.touches[0].clientX;
    };

    const handleTouchEnd = (event: Event) => {
      const touchEvent = event as TouchEvent;
      const touchEndX = touchEvent.changedTouches[0].clientX;
      const swipeDistance = touchStartX - touchEndX;

      if (Math.abs(swipeDistance) < SWIPE_THRESHOLD) {
        return;
      }

      if (swipeDistance < -SWIPE_THRESHOLD) {
        onSwipeRight();
      } else if (swipeDistance > SWIPE_THRESHOLD) {
        onSwipeLeft();
      }
    };

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, disabled]);
}
