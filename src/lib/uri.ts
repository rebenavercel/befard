/**
 * Creates an absolute URL based on the provided relative path
 *
 * @param path - Relative path to transform into an absolute URL
 * @returns Absolute URL
 *
 * @example
 * getAbsoluteUrl('/products/bikes')
 * // → 'http://localhost:3000/products/bikes'
 */
export function getAbsoluteUrl(path: string): string {
  // Get the site URL from environment variables
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Remove any trailing slashes from the site URL
  const baseUrl = siteUrl.replace(/\/+$/, "");

  // Remove any leading slashes from the path
  const normalizedPath = path.replace(/^\/+/, "");

  // Join the site URL with the path
  return `${baseUrl}/${normalizedPath}`;
}

/**
 * This function is used to create a WordPress URI that will be used to query/find products or custom-product-category.
 * @param locale - The locale of the URI
 * @param slug - The slug of the URI
 * @param prefix - The prefix of the URI
 * @returns The WordPress URI
 */
export function getWordpPressUri(
  locale: string,
  slug: string[] | string,
  prefix: string = "",
) {
  if (!slug) return "";

  const uri = [locale, prefix, ...slug].filter(Boolean).join("/");

  return `/${uri}/`;
}

/**
 * Removes trailing slash from a URL if it exists
 *
 * @param {string} url
 * @return {string}
 */
export function removeTrailingSlash(url: string): string {
  if (url.length === 1) return url;
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

/**
 * Helper function to normalize URIs by replacing parts and managing slashes
 * @param uri - Original URI to normalize
 * @param search - String or array of strings to search for and remove
 * @param replace - String to replace with (optional)
 * @returns Normalized URI with proper slash handling
 *
 * @example
 * // Remove prefix between slashes
 * normalizeUri("/products/same-name/product-same-slug-name", "products")
 * // → "/same-name/product-same-slug-name"
 *
 * // Don't remove if not between slashes
 * normalizeUri("/same-name/product-same-slug-name", "product")
 * // → "/same-name/product-same-slug-name"
 *
 * // Handle full URLs
 * normalizeUri("https://example.com/products/path", "products")
 * // → "/path"
 */
export function normalizeUri(
  uri: string,
  search: string | string[],
  replace: string = "",
): string {
  if (!uri) return "";

  // Convert single search string to array
  const searchTerms = Array.isArray(search) ? search : [search];

  // Remove leading/trailing slashes first
  let normalized = uri.replace(/^\/+|\/+$/g, "");

  // Handle full URLs first
  if (normalized.startsWith("http")) {
    const url = new URL(normalized);
    normalized = url.pathname.replace(/^\/+|\/+$/g, "");
  }

  // Separate terms into special cases (locales, domains) and regular terms
  const startPrefixes = searchTerms.filter(
    (term) => term.length <= 2 || term.startsWith("http") || term.includes("."),
  );
  const regularTerms = searchTerms.filter(
    (term) =>
      term.length > 2 && !term.startsWith("http") && !term.includes("."),
  );

  // Remove start prefixes only from the beginning
  startPrefixes.forEach((term) => {
    const cleanTerm = term.replace(/^\/+|\/+$/g, "");
    const pattern = new RegExp(`^${cleanTerm}(?=/|$)`);
    normalized = normalized.replace(pattern, "");
  });

  // Remove regular terms only when they're between slashes or at start/end
  regularTerms.forEach((term) => {
    const cleanTerm = term.replace(/^\/+|\/+$/g, "");
    // Match term only when it's:
    // 1. At the start of the string and followed by a slash
    // 2. Between slashes
    // 3. At the end of the string and preceded by a slash
    const pattern = new RegExp(
      `(?:^${cleanTerm}(?=/)|(?<=/)${cleanTerm}(?=/)|(?<=/)${cleanTerm}$)`,
      "g",
    );
    normalized = normalized.replace(pattern, "");
  });

  // Add replacement if provided
  if (replace) {
    const cleanReplace = replace.replace(/^\/+|\/+$/g, "");
    normalized = cleanReplace + (normalized ? "/" + normalized : "");
  }

  // Handle empty result
  if (!normalized) return "/";

  // Ensure proper slash formatting
  return (
    "/" +
    normalized
      .replace(/\/+/g, "/") // replace multiple slashes with single one
      .replace(/^\/+/, "") // remove leading slashes (as we already added one at the beginning)
      .replace(/\/+$/, "")
  ); // remove trailing slashes
}
