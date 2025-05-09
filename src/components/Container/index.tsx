import { type HTMLAttributes, forwardRef } from "react";

import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { containerVariants } from "./config";

export interface IContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  containerStyle?: string;
}

const Container = forwardRef<HTMLDivElement, IContainerProps>(
  ({ variant = "xl", className, containerStyle, ...props }, ref) => {
    const Comp = "div";

    return (
      <div
        className={cn("flex justify-center w-full", containerStyle)}
        ref={ref}
      >
        <Comp
          className={cn(containerVariants({ variant, className }))}
          {...props}
        />
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;
