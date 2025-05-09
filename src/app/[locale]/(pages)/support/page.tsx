import { Skeleton } from "@/components/Skeleton";
import { TPageParams } from "@/types/next.types";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense, lazy } from "react";
import PageHeader from "@/components/PageHeader";
import { getPage } from "@/lib/api/get-page";
import { getPageMetadata } from "@/lib/seo";
import SupportView from "@/views/support";

const TranslationLinks = lazy(() => import("@/components/Translation"));

export async function generateMetadata({ params }: TPageParams) {
  const { locale } = await params;
  const data = await getPage("support", locale);

  return getPageMetadata(data, "support", locale);
}

export default async function SupportPage({ params }: TPageParams) {
  const { locale } = await params;
  const data = await getPage("support", locale);

  setRequestLocale(locale);

  const t = await getTranslations("Support");
  const tCommon = await getTranslations("Common");

  return (
    <>
      <Suspense fallback={null}>
        <TranslationLinks translationLinks={data.translations} />
      </Suspense>
      <div className="py-20 pt-[110px]">
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
          <SupportView endpoint="support" locale={locale} />
        </Suspense>
      </div>
    </>
  );
}
