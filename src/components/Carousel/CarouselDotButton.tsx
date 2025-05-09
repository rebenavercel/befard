import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";

import s from "./CarouselDotButton.module.css";
import { cn } from "@/lib/utils";

type TDotButtonProps = PropsWithChildren<
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    isActive: boolean;
    className?: string;
  }
>;

export const DotButton = ({ children, isActive, ...rest }: TDotButtonProps) => {
  return (
    <button
      type="button"
      className={cn(s["dot"], isActive && s["dot-active"])}
      {...rest}
    >
      <div
        className={cn(s["dot-inner"], isActive && s["dot-inner-active"])}
      ></div>
      {children}
    </button>
  );
};
