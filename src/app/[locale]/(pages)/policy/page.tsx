import { Skeleton } from "@/components/Skeleton";
import { TPageParams } from "@/types/next.types";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense, lazy } from "react";
import PageHeader from "@/components/PageHeader";
import { getPageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/api/get-page";
import PolicyView from "@/views/privacy-policy";

const TranslationLinks = lazy(() => import("@/components/Translation"));

export async function generateMetadata({ params }: TPageParams) {
  const { locale } = await params;
  const data = await getPage("privacy", locale);

  return getPageMetadata(data, "policy", locale);
}

export default async function Service({ params }: TPageParams) {
  const { locale } = await params;
  const data = await getPage("privacy", locale);

  const t = await getTranslations("Common");

  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={null}>
        <TranslationLinks translationLinks={data.translations} />
      </Suspense>
      <div className="py-20 md:pt-[110px]">
        <PageHeader
          title={t("privacyAndCookies")}
          badge="Befard"
          breadcrumbs={[
            {
              label: t("homepage"),
              href: locale !== "pl" ? `/${locale}` : "/",
            },
            {
              label: t("privacyAndCookies"),
              href: "/policy",
            },
          ]}
        />

        <Suspense fallback={<Skeleton className="w-full h-[900px]" />}>
          <PolicyView slug="privacy" locale={locale} />
        </Suspense>
      </div>
    </>
  );
}
