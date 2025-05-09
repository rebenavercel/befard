import { Skeleton } from "@/components/Skeleton";
import CategoriesListView from "@/views/category-list";
import { setRequestLocale } from "next-intl/server";
import { Suspense, lazy } from "react";
import { TPageParams } from "@/types/next.types";
import { getPage } from "@/lib/api/get-page";
import { getPageMetadata } from "@/lib/seo";

const TranslationLinks = lazy(() => import("@/components/Translation"));

export async function generateMetadata({ params }: TPageParams) {
  const { locale } = await params;
  const data = await getPage("products", locale);

  return getPageMetadata(data, "products", locale);
}

export default async function CategoriesPage({ params }: TPageParams) {
  const { locale } = await params;
  const data = await getPage("products", locale);

  setRequestLocale(locale);

  return (
    <div>
      <Suspense fallback={null}>
        <TranslationLinks translationLinks={data.translations} />
      </Suspense>
      <Suspense
        fallback={<Skeleton className="w-full h-[1800px] md:h-[1400px]" />}
      >
        <CategoriesListView />
      </Suspense>
    </div>
  );
}
