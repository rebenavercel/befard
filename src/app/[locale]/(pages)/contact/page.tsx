import { Skeleton } from "@/components/Skeleton";
import { ContactHeader, Team } from "@/modules/Contact";
import { setRequestLocale } from "next-intl/server";
import { Suspense, lazy } from "react";
import { TPageParams } from "@/types/next.types";
import { getPage } from "@/lib/api/get-page";
import { getPageMetadata } from "@/lib/seo";

const TranslationLinks = lazy(() => import("@/components/Translation"));

export async function generateMetadata({ params }: TPageParams) {
  const { locale } = await params;
  const data = await getPage("contact", locale);

  return getPageMetadata(data, "contact", locale);
}

export default async function ContactPage({ params }: TPageParams) {
  const { locale } = await params;
  const data = await getPage("contact", locale);

  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={null}>
        <TranslationLinks translationLinks={data.translations} />
      </Suspense>
      <div className="py-10 md:pt-20 bg-black">
        <Suspense fallback={<Skeleton className="w-full h-[700px]" />}>
          <ContactHeader />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
          <Team />
        </Suspense>
      </div>
    </>
  );
}
