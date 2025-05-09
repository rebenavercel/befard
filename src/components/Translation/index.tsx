"use client";

import { NavigationLink } from "@/lib/translations";
import { useEffect } from "react";
import { useTranslationLinks } from "./TranslationsContext";

export default function TranslationLinks({
  translationLinks,
}: {
  translationLinks: NavigationLink[];
}) {
  const { setTranslationLinks } = useTranslationLinks();

  useEffect(() => {
    setTranslationLinks(translationLinks);
  }, [translationLinks, setTranslationLinks]);

  return <></>;
}
