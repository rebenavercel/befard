import { Skeleton } from "@/components/Skeleton";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense, lazy } from "react";
import PageHeader from "@/components/PageHeader";
import { TPageParams } from "@/types/next.types";
import { getPage } from "@/lib/api/get-page";
import { getPageMetadata } from "@/lib/seo";
import ServiceView from "@/views/service";

const TranslationLinks = lazy(() => import("@/components/Translation"));


export async function generateMetadata({ params }: TPageParams) {
  const { locale } = await params;
  const data = await getPage("service", locale);

  return getPageMetadata(data, "service", locale);
}

export default async function ServicePage({ params }: TPageParams) {
  const { locale } = await params;
  const data = await getPage("service", locale);

  setRequestLocale(locale);

  const t = await getTranslations("Service");
  const tCommon = await getTranslations("Common");

  return (
    <>
      <Suspense fallback={null}>
        <TranslationLinks translationLinks={data.translations} />
      </Suspense>
      <div className="py-20 md:py-[110px]">
        <PageHeader
          title={t("header")}
          badge={t("prefix")}
          breadcrumbs={[
            {
              label: tCommon("homepage"),
              href: locale !== "pl" ? `/${locale}` : "/",
            },
            {
              label: t("header"),
              href: "/service",
            },
          ]}
        />

        <Suspense fallback={<Skeleton className="w-full h-[900px]" />}>
          <ServiceView />
        </Suspense>
      </div>
    </>
  );
}
