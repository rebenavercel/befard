import Navigation from "@/components/Navigation";

import { routing } from "@/i18n/routing";
import { Footer } from "@/modules/Layout";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { type ReactNode, lazy, Suspense } from "react";

const Providers = lazy(() => import("./providers"));

export async function generateStaticParams() {
  return [{ locale: "pl" }];
}

interface IRootLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

const RootLayout = async ({ children, params }: IRootLayoutProps) => {
  const { locale } = await params;
  if (!routing.locales.includes(locale as string)) notFound();
  setRequestLocale(locale);

  return (
    <Providers>
      <Navigation locale={locale} />
      <main className="bg-black">{children}</main>
      <Suspense fallback={<div>footer loading...</div>}>
        <Footer locale={locale} />
      </Suspense>
    </Providers>
  );
};

export default RootLayout;
