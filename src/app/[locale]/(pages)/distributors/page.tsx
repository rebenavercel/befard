import { Skeleton } from "@/components/Skeleton";
import DistributorsView from "@/views/distributors";
import { setRequestLocale } from "next-intl/server";
import { Suspense, lazy } from "react";
import { TPageParams } from "@/types/next.types";
import { getPage } from "@/lib/api/get-page";
import { getPageMetadata } from "@/lib/seo";

const TranslationLinks = lazy(() => import("@/components/Translation"));

export async function generateMetadata({params}: TPageParams) {
  const {locale} = await params;
  const data = await getPage("distributors", locale);
  
  return getPageMetadata(data, "distributors", locale);
}

export default async function DistributorsPage({params}: TPageParams) {
  const {locale} = await params;
  const data = await getPage("distributors", locale);
  
  setRequestLocale(locale);
  
  return (
    <>
      <Suspense fallback={null}>
        <TranslationLinks translationLinks={data.translations} />
      </Suspense>
      <div className="py-16 md:pt-[110px] bg-black">
        <Suspense fallback={<Skeleton className="h-[1500px] lg:h-[1200px]" />}>
          <DistributorsView />
        </Suspense>
      </div>
    </>
  );
}
