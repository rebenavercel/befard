import React, { lazy, Suspense } from "react";

const TranslationLinksProvider = lazy(
  () => import("@/components/Translation/TranslationsContext"),
);

const WhatsAppWidget = lazy(() =>
  import("@/modules/Layout").then((res) => ({
    default: res.WhatsAppWidget,
  })),
);

const Cookies = lazy(() => import("@/modules/Layout/Footer/Cookies"));

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Suspense fallback={null}>
        <TranslationLinksProvider>{children}</TranslationLinksProvider>
      </Suspense>
      <Suspense fallback={null}>
        <Cookies />
      </Suspense>
      <Suspense fallback={null}>
        <WhatsAppWidget />
      </Suspense>
    </div>
  );
}
