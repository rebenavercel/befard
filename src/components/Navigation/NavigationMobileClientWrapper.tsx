"use client";

import { cn } from "@/lib/utils";
import { useNavbarStatus } from "@/components/Navigation/useNavbarStatus";

export default function NavigationMobileClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isBackground } = useNavbarStatus();

  return (
    <div
      className={cn(
        "h-[60px] flex items-center text-white fixed top-0 w-full transition-colors duration-200 z-20",
        isBackground && "bg-black transition-colors duration-200",
      )}
    >
      {children}
    </div>
  );
}
