import { Skeleton } from "@/components/Skeleton";
import {
  AboutUsSection,
  ContactSection,
  ImageTextBlock,
} from "@/modules/Common";
import { CategoryList, DiscoverProducts, Header, News } from "@/modules/Home";
import { setRequestLocale } from "next-intl/server";
import { getPage } from "@/lib/api/get-page";
import { getPageMetadata } from "@/lib/seo";
import { TPageParams } from "@/types/next.types";
import { Suspense, lazy } from "react";

const TranslationLinks = lazy(() => import("../../../components/Translation"));

export async function generateStaticParams() {
  const supportedLocales = ["pl"];
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: TPageParams) {
  const { locale } = await params;
  const data = await getPage(locale, locale);

  return getPageMetadata(data, "home", locale);
}

export default async function HomePage({ params }: TPageParams) {
  const { locale } = await params;
  const data = await getPage("", locale);

  setRequestLocale(locale);

  return (
    <div className="bg-black">
      <Suspense fallback={null}>
        <TranslationLinks translationLinks={data.translations} />
      </Suspense>
      <Suspense
        fallback={<Skeleton className="w-full h-[640px] lg:h-[900px]" />}
      >
        <Header />
      </Suspense>
      <Suspense
        fallback={<Skeleton className="w-full h-[880px] lg:h-[754px]" />}
      >
        <CategoryList />
      </Suspense>
      <Suspense
        fallback={<Skeleton className="w-full h-[1152px] lg:h-[746px]" />}
      >
        <AboutUsSection slug={locale} />
      </Suspense>
      <Suspense
        fallback={<Skeleton className="w-full h-[556px] lg:h-[634px]" />}
      >
        <DiscoverProducts />
      </Suspense>
      <Suspense
        fallback={<Skeleton className="w-full h-[1114x] lg:h-[1083px]" />}
      >
        <ImageTextBlock slug={locale} locale={locale} />
      </Suspense>
      {/* <Suspense
        fallback={<Skeleton className="w-full h-[658px] lg:h-[721px]" />}
      >
        <News />
      </Suspense> */}
      <ContactSection />
    </div>
  );
}
