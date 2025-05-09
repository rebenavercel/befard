import { DEFAULT_LOCALE, TLocale } from "@/navigation";
import { getTranslations } from "next-intl/server";
import { Product } from "./api/get-category-product";
import { getCategoryPath, getLocalizedPath, getPostUrl } from "@/lib/paths";
import { normalizeUri, removeTrailingSlash } from "@/lib/uri";
import { BreadcrumbItems } from "@/components/Breadcrumbs";

interface Breadcrumb {
  label: string;
  href: string;
}

export async function generateProductBreadcrumbs(
  slug: string[],
  product: Product,
  locale: TLocale,
): Promise<Breadcrumb[]> {
  const t = await getTranslations("Common");
  const breadcrumbs: Breadcrumb[] = [];

  // Home
  const homeUrl = locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
  breadcrumbs.push({
    href: homeUrl,
    label: t("homepage"),
  });
  
  const productsUrl = getLocalizedPath("products", locale, true);

  breadcrumbs.push({
    href: productsUrl,
    label: t("products"),
  });

  // Generate paths from slug array (without the last element - product)
  const paths = [...slug];
  paths.pop(); // remove product slug

  // Create full paths for each level
  const fullPaths = paths.map((_, index) => {
    return "/" + paths.slice(0, index + 1).join("/") + "/";
  });

  // For each path, look for an exact match in customProductCategories
  for (const pathFragment of fullPaths) {
    const matchingCategory = product.customProductCategories.nodes.find(
      (cat) => {
        const normalizedCatPath = normalizeUri(cat.uri, [
          "product-category",
          "products",
          "category",
          locale,
        ]);
        
        return normalizedCatPath.endsWith(removeTrailingSlash(pathFragment));
      },
    );

    if (matchingCategory) {
      breadcrumbs.push({
        href: getCategoryPath(matchingCategory.uri, locale, true),
        label: matchingCategory.name,
      });
    }
  }

  // Product
  breadcrumbs.push({
    href: getCategoryPath(product.uri, locale, true),
    label: product.title,
  });

  return breadcrumbs;
}

interface Breadcrumb {
  href: string;
  label: string;
}

interface SEOWordPressBreadcrumb {
  text: string;
  url: string;
}

export async function getCategoryBreadcrumbs(
  breadcrumbs: SEOWordPressBreadcrumb[],
  locale: string,
): Promise<Breadcrumb[]> {
  const t = await getTranslations("Common");
  const productsPath = getLocalizedPath("products", locale, true);

  return [
    {
      href: locale === DEFAULT_LOCALE ? "/" : `/${locale}`,
      label: t("homepage"),
    },
    {
      href: productsPath,
      label: t("products"),
    },
    ...breadcrumbs.slice(1).map((item) => ({
      href: getCategoryPath(item.url, locale, true),
      label: item.text,
    })),
  ];
}

export async function getPostBreadcrumbs(
  locale: string,
  slug: string,
  title: string,
): Promise<BreadcrumbItems> {
  const t = await getTranslations("Common");

  return [
    {
      href: locale === DEFAULT_LOCALE ? "/" : `/${locale}`,
      label: t("homepage"),
    },
    {
      href: locale === DEFAULT_LOCALE ? "/blog" : `/${locale}/blog`,
      label: "Blog",
    },
    {
      href: getPostUrl(slug, locale, true),
      label: title,
    },
  ];
}
