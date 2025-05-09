import { useEffect, useState } from "react";

import { useDebouncedCallback } from "./useDebounceCallback";
import { screens } from "@/theme/breakpoints";

export const useBreakpoint = (
  value?: number | keyof typeof screens,
  debounce: number = 300
) => {
  const [isMatch, setIsMatch] = useState(false);
  const [pageWidth, setPageWidth] = useState<number>();

  const handleResize = useDebouncedCallback(() => {
    setPageWidth(window.innerWidth);
  }, debounce);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (!value) return () => {};

    const breakpointValue =
      typeof value === "number" ? value : screens[value].replace("px", "");
    const mediaQueryList = window.matchMedia(
      `(min-width: ${breakpointValue}px)`
    );

    const handleMatchChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMatch(event.matches);
    };

    handleMatchChange(mediaQueryList);
    mediaQueryList.addEventListener("change", handleMatchChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleMatchChange);
    };
  }, [value]);

  return { isMatch, pageWidth };
};
