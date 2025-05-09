import "@/theme/globals.css";
import { fonts } from "@/theme/fonts";
import { ReactNode } from "react";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { GoogleTagManager } from "@next/third-parties/google";

interface IRootLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function RootLayout({
  children,
  params,
}: IRootLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as string)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <GoogleTagManager gtmId="GTM-PTBQZD" />
      <body className={cn(fonts, "antialiased")}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
