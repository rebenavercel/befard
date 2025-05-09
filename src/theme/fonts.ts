import localFont from "next/font/local";

const manropeDisplayFont = localFont({
  src: [
    {
      path: "../../public/fonts/Manrope-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Manrope-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Manrope-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Manrope-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-manrope-display",
  display: "swap",
});

const rubikDisplayFont = localFont({
  src: [
    {
      path: "../../public/fonts/Rubik-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Rubik-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Rubik-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-rubik-display",
  display: "swap",
});

const fonts = `${manropeDisplayFont.variable} ${rubikDisplayFont.variable}`;

export { fonts };
