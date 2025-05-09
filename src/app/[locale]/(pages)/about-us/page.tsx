import { Skeleton } from "@/components/Skeleton";
import { AboutUsHero } from "@/modules/AboutUs";
import {
  AboutUsSection,
  ContactSection,
  ImageTextBlock,
  Reviews,
} from "@/modules/Common";
import { setRequestLocale } from "next-intl/server";
import { Suspense, lazy } from "react";
import { TPageParams } from "@/types/next.types";
import { getPage } from "@/lib/api/get-page";
import { getPageMetadata } from "@/lib/seo";

const TranslationLinks = lazy(() => import("@/components/Translation"));

export async function generateMetadata({ params }: TPageParams) {
  const { locale } = await params;
  const data = await getPage("about-us", locale);

  return getPageMetadata(data, "about-us", locale);
}

export default async function AboutUs({ params }: TPageParams) {
  const { locale } = await params;
  const data = await getPage("about-us", locale);

  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={null}>
        <TranslationLinks translationLinks={data.translations} />
      </Suspense>
      <div className="pt-[60px] pb-12 lg:pt-[110px] lg:pb-24 bg-black">
        <Suspense
          fallback={<Skeleton className="w-full h-[730px] lg:h-[640px]" />}
        >
          <AboutUsHero slug={"about-us"} />
        </Suspense>

        <Suspense
          fallback={<Skeleton className="w-full h-[1152px] lg:h-[746px]" />}
        >
          <AboutUsSection slug={"about-us"} />
        </Suspense>
        <Suspense
          fallback={<Skeleton className="w-full h-[1114x] lg:h-[1083px]" />}
        >
          <ImageTextBlock slug={locale} locale={locale} />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-full h-[450px]" />}>
          <Reviews />
        </Suspense>
        <ContactSection />
      </div>
    </>
  );
}
