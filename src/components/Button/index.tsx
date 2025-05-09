import {
  type ButtonHTMLAttributes,
  type HTMLAttributeAnchorTarget,
  type ReactNode,
  forwardRef,
} from "react";

import { Slot } from "@radix-ui/react-slot";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export type TButtonType = "default" | "text" | "iconOnly";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  buttonType?: TButtonType;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  isLoading?: boolean;
  download?: boolean;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      children,
      startIcon,
      endIcon,
      href,
      target,
      className,
      asChild = false,
      isLoading,
      disabled,
      download,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    if (href) {
      return (
        <Link
          className={cn(
            "text-sm lg:text-base font-manrope-font text-white bg-red-own px-5 py-3 uppercase font-bold hover:bg-dark-red-own",
            className
          )}
          href={href}
          target={target}
          download={download}
        >
          {startIcon}
          {children}
          {endIcon}
        </Link>
      );
    }

    return (
      <Comp
        className={cn(
          "text-sm lg:text-base font-manrope-font text-white bg-red-own px-5 py-3 uppercase font-bold hover:bg-dark-red-own",
          className
        )}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {startIcon}
        {children}
        {endIcon}
      </Comp>
    );
  }
);

export default Button;
