import { DEFAULT_LOCALE, PATHS, TLocale, locales, pathnames } from "@/navigation";
import { normalizeUri } from "@/lib/uri";


type PathRecord = Record<TLocale, string>;

/**
 * Gets localized path with proper locale prefix handling
 * @param pathKey - Path key from PATHS object to get localized version of
 * @param locale - Current locale
 * @param addLangPrefix
 * @returns Path with locale prefix (if not default locale)
 *
 * @example
 * getLocalizedPath("productCategories", "en")
 * // → "/en/products"
 *
 * getLocalizedPath("productCategories", "pl") // assuming pl is DEFAULT_LOCALE
 * // → "/produkty"
 */

export function getLocalizedPath(
  pathKey: string,
  locale: TLocale,
  addLangPrefix: boolean = false,
): string {
  const path = PATHS[pathKey as keyof typeof PATHS];
  const localizedPath = (pathnames[path] as PathRecord)[locale];
  return addLangPrefix && locale !== DEFAULT_LOCALE
    ? `/${locale}${localizedPath ?? ""}`
    : localizedPath;
}

/**
 * Normalizes product URLs from WordPress
 * @param uri - The URI from WordPress
 * @param locale - Current locale
 * @param withLocale
 * @returns Normalized URL for Next.js routing
 */
export function getProductPath(
  uri: string,
  locale: TLocale,
  withLocale: boolean = false,
): string {
  if (!uri) return "";

  // Remove domain and product category prefix
  const path = normalizeUri(uri, [
    process.env.NEXT_PUBLIC_BACKEND_URL!,
    "product-category",
    "products",
    "product",
    ...locales,
  ]);

  // Get localized path
  const localizedPath = getLocalizedPath("products", locale, withLocale);

  return `${localizedPath}${path}`;
}

/**
 * Normalizes category URLs from WordPress
 * @param uri - The URI from WordPress
 * @param locale - Current locale
 * @param withLocale
 * @returns Normalized URL for Next.js routing
 */
export function getCategoryPath(
  uri: string,
  locale: TLocale,
  withLocale: boolean = false,
): string {
  if (!uri) return "";

  // Remove domain and category prefix
  const path = normalizeUri(uri, [
    process.env.NEXT_PUBLIC_BACKEND_URL!,
    "product-category",
    "products",
    "product",
    "category",
    "categories",
    "category-slug",
    "category-slug-subcategory",
    "category-slug-subcategory-product",
    ...locales,
  ]);

  // Get localized path
  const localizedPath = getLocalizedPath("products", locale, withLocale);

  return `${localizedPath}${path}`;
}

/**
 * Normalizes post URLs from WordPress
 *
 * @param {string} slug
 * @param {TLocale} locale
 * @param withLocale
 * @return {string}
 */
export function getPostUrl(
  slug: string,
  locale: TLocale,
  withLocale: boolean = false,
): string {
  if (!slug) return "";

  const path = normalizeUri(slug, [
    process.env.NEXT_PUBLIC_BACKEND_URL!,
    "news",
    ...locales,
  ]);

  const localizedPath = getLocalizedPath("blog", locale, withLocale);

  return `${localizedPath}${path}`;
}

/**
 * Normalizes page URLs from WordPress
 * @param uri - The URI from WordPress
 * @param locale - Current locale
 * @param withLocale
 * @returns Normalized URL for Next.js routing
 */
export function getPageUrl(
  uri: string,
  locale: TLocale,
  withLocale: boolean = false,
): string {
  if (!uri) return "";

  return getLocalizedPath(uri, locale, withLocale);
}
