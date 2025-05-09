import { cn } from "@/lib/utils";
import React, { ElementType, HTMLAttributes, PropsWithChildren } from "react";

type HeadingVariant =
  | "default"
  | "hero"
  | "hero-title"
  | "title"
  | "72"
  | "28"
  | "30"
  | "44"
  | "50";

type HeadingProps = PropsWithChildren<
  {
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    variant?: HeadingVariant;
    className?: string;
  } & HTMLAttributes<HTMLHeadingElement>
>;

export default function Heading({
  tag = "h2",
  variant = "default",
  className,
  ...props
}: HeadingProps) {
  const Component = tag as ElementType<{ ref?: React.Ref<HTMLHeadingElement> }>;

  const variants: Record<HeadingVariant, string> = {
    "hero-title":
      "text-2xl/[1.1] sm:text-3xl/[1.1] lg:text-4xl/[1.1] 2xl:text-[50px]/[1.1]",
    default:
      "text-2xl/[1.1] sm:text-3xl/[1.1] lg:text-4xl/[1.1] 2xl:text-[44px]/[1.1]",
    title:
      "text-xl/[24px] md:text-2xl/[26px] xl:text-[28px]/[35px] font-normal font-rubik-font",
    hero: "text-[36px]/[1.1] lg:text-7xl/[1.15]",
    "72": "text-[72px]/[1.1] lg:text-[72px]/[1.15]",
    "28": "text-xl/[24px] md:text-2xl/[26px] xl:text-[28px]/[32px]",
    "30": "text-xl/[24px] md:text-2xl/[26px] xl:text-[28px]/[32px]",
    "44": "text-2xl/[1.1] sm:text-3xl/[1.1] lg:text-4xl/[1.1] xl:text-[44px]/[1.1]",
    "50": "text-2xl/[1.1] sm:text-3xl/[1.1] lg:text-4xl/[1.1] xl:text-[50px]/[1.1]",
  };

  return (
    <Component
      className={cn(
        "font-light font-rubik-font text-white antialiased",
        variants[variant],
        className,
        "text-balance",
      )}
      {...props}
    />
  );
}
