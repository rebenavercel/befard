import { useScrollStatus } from "@/hooks/useScrollStatus";
import { useEffect, useState } from "react";

const HIDE_SCROLL_POSITION = 120;

export const useNavbarStatus = () => {
  const [isBackground, setIsBackground] = useState(false);

  const { scrollPosition, scrollDirection } = useScrollStatus();

  useEffect(() => {
    setIsBackground(scrollPosition > HIDE_SCROLL_POSITION);
  }, [scrollPosition, scrollDirection]);

  return {
    isBackground,
  };
};
