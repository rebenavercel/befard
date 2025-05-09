"use client";

import { NavigationLink } from "@/lib/translations";
import React, { createContext, useContext, useState } from "react";

type TranslationLinksContextType = {
  translationLinks: NavigationLink[];
  setTranslationLinks: (translationLinks: NavigationLink[]) => void;
};

export const TranslationsContext = createContext<TranslationLinksContextType>({
  translationLinks: [],
  setTranslationLinks: () => {},
});

export const useTranslationLinks = () => {
  return useContext(TranslationsContext);
};

export default function TranslationLinksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [translationLinks, setTranslationLinks] = useState<NavigationLink[]>(
    [],
  );

  return (
    <TranslationsContext.Provider
      value={{ translationLinks, setTranslationLinks }}
    >
      {children}
    </TranslationsContext.Provider>
  );
}
