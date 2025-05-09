import { useEffect, useState } from "react";

import { useDebouncedCallback } from "./useDebounceCallback";

type TScrollDirection = "up" | "down";

export const useScrollStatus = (debounce: number = 0) => {
  const [scrollDirection, setScrollDirection] =
    useState<TScrollDirection>("up");
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = useDebouncedCallback(() => {
    const currentScrollPos = window.scrollY;
    setScrollDirection(currentScrollPos > scrollPosition ? "down" : "up");
    setScrollPosition((prev) => {
      if (prev !== currentScrollPos) {
        return currentScrollPos;
      }
      return prev;
    });
  }, debounce);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (window !== undefined && window.scrollY > 0) {
      setScrollPosition(window.scrollY);
    }
  }, []);

  return { scrollDirection, scrollPosition };
};
