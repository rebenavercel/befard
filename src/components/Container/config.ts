import { cva } from "class-variance-authority";

export const containerVariants = cva("container", {
  variants: {
    variant: {
      sm: "max-w-screen-sm px-4",
      md: "max-w-screen-md px-5",
      lg: "max-w-screen-lg px-5",
      xl: "max-w-screen-xl px-5",
      "2xl": "max-w-screen-2xl px-5 md:px-10 2xl:px-5",
      "3xl": "max-w-screen-3xl px-5 md:px-10 2xl:px-20",
    },
  },
  defaultVariants: {
    variant: "2xl",
  },
});
