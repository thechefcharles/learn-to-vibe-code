'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseSessionTimerReturn {
  elapsed: number;
  reset: () => void;
}

/**
 * Hook to track elapsed time in a session
 * @returns Object with elapsed time (in seconds) and reset function
 */
export function useSessionTimer(): UseSessionTimerReturn {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const reset = useCallback(() => {
    setElapsed(0);
  }, []);

  return { elapsed, reset };
}
