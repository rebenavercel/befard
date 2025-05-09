import { useCallback, useRef } from 'react';

export const useDebouncedCallback = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  delay: number,
) => {
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay],
  );
};
