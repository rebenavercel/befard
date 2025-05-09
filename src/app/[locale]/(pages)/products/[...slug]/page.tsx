import { determineViewType, getCategoryOrProduct, ViewType } from "@/lib/api/get-category-product";
import { getCategoryOrProductMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { lazy, Suspense } from "react";

const CategoryView = lazy(() => import("@/views/category"));
const ProductView = lazy(() => import("@/views/product"));
const SubCategoryView = lazy(() => import("@/views/sub-category"));
const TranslationLinks = lazy(() => import("@/components/Translation"));

type Params = { params: Promise<{ locale: string; slug: string[] }> };

export async function generateStaticParams() {
  return [
    { locale: "pl", slug: ["chwytaki-prozniowe"] },
    { locale: "en", slug: ["chwytaki-angielskie"] },
  ];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = await getCategoryOrProduct(locale, slug);

  return getCategoryOrProductMetadata(data, locale);
}

export default async function Page({ params }: Params) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const data = await getCategoryOrProduct(locale, slug);

  const viewType = determineViewType(data);

  switch (viewType) {
    case ViewType.PRODUCT:
      return (
        <Suspense fallback={null}>
          <TranslationLinks translationLinks={data!.navigationLinks} />
          <ProductView
            locale={locale}
            product={slug[slug.length - 1]}
            breadcrumbs={data?.breadcrumbs}
          />
        </Suspense>
      );

    case ViewType.CATEGORY:
      return (
        <Suspense fallback={null}>
          <TranslationLinks translationLinks={data!.navigationLinks} />
          <CategoryView
            breadcrumbs={data?.breadcrumbs}
            locale={locale}
            slug={slug[0]}
          />
        </Suspense>
      );

    case ViewType.SUB_CATEGORY:
      const [categorySlug, subCategorySlug] = slug;
      return (
        <Suspense fallback={null}>
          <TranslationLinks translationLinks={data!.navigationLinks} />
          <SubCategoryView
            breadcrumbs={data?.breadcrumbs}
            locale={locale}
            slug={categorySlug}
            subcategory={subCategorySlug}
          />
        </Suspense>
      );

    case ViewType.NOT_FOUND:
  }
}
