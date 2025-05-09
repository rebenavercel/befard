import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { DEFAULT_LOCALE, locales, pathnames } from "@/navigation";

export const routing = defineRouting({
  locales,
  defaultLocale: DEFAULT_LOCALE,
  localeDetection: false,
  alternateLinks: false,
  localePrefix: "as-needed",
  pathnames: pathnames,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
