import { TLocale, locales, DEFAULT_LOCALE } from "@/navigation";
import { removeTrailingSlash } from "@/lib/uri";
import {
  getPageUrl,
  getProductPath,
  getCategoryPath,
  getPostUrl,
  getLocalizedPath,
} from "@/lib/paths";
import { Language, Translation } from "@/types/wp-graphql.types";

interface TranslatedContent {
  uri: string;
  language: Language;
  translations: Translation[];
}

export interface NavigationLink {
  locale: TLocale;
  url: string;
}

export interface AlternateLink {
  locale: TLocale;
  url: string;
}

type ContentType = "product" | "category" | "post" | "page";


/**
 * Generates alternate links for SEO and multilingual support
 *
 * Function is used to generate alternate links for dynamic subpages,
 * which is essential for proper SEO in multilingual websites.
 *
 * @param {TranslatedContent} content - The content object containing current language and translations
 * @param contentType
 * @returns {AlternateLink[]} Array of alternate links for each language version
 */
export function generateAlternateLinks(
  content: TranslatedContent,
  contentType: ContentType = "category",
): AlternateLink[] {
  const alternates: AlternateLink[] = [];

  let pathFunction;
  switch (contentType) {
    case "product":
      pathFunction = getProductPath;
      break;
    case "category":
      pathFunction = getCategoryPath;
      break;
    case "post":
      pathFunction = getPostUrl;
      break;
    case "page":
      pathFunction = getPageUrl;
      break;
    default:
      pathFunction = getCategoryPath;
  }

  // Add "x-default" language version
  alternates.push({
    locale: "x-default",
    url: pathFunction(content.uri, DEFAULT_LOCALE, true),
  });

  // Add current language version
  alternates.push({
    locale: content.language.slug,
    url: pathFunction(content.uri, content.language.slug, true),
  });

  // Add translations
  content.translations.forEach((translation) => {
    alternates.push({
      locale: translation.language.slug,
      url: pathFunction(translation.uri, translation.language.slug, true),
    });
  });

  return alternates;
}

/**
 * Generates navigation links for the language switcher UI
 *
 * @param {TranslatedContent} content - The content object containing current language and translations
 * @param {ContentType} contentType - Type of the content (product, category, post or page)
 * @return {NavigationLink[]} Array of navigation links for each language version
 */
export function generateNavigationLinks(
  content: TranslatedContent,
  contentType: ContentType = "category",
): NavigationLink[] {
  const navigationLinks: NavigationLink[] = [];

  let pathFunction;
  switch (contentType) {
    case "product":
      pathFunction = getProductPath;
      break;
    case "category":
      pathFunction = getCategoryPath;
      break;
    case "post":
      pathFunction = getPostUrl;
      break;
    case "page":
      pathFunction = getPageUrl;
      break;
    default:
      pathFunction = getCategoryPath;
  }

  // Add current language version
  navigationLinks.push({
    locale: content.language.slug,
    url: pathFunction(content.uri, content.language.slug, true),
  });

  // Prepare translations map
  const translationsMap = new Map<TLocale, Translation>();
  content.translations.forEach((translation) => {
    translationsMap.set(translation.language.slug, translation);
  });

  // For each available locale
  locales.forEach((locale) => {
    // Skip current language
    if (locale === content.language.slug) return;

    const translation = translationsMap.get(locale);
    if (translation) {
      // Use translation if available
      navigationLinks.push({
        locale,
        url: pathFunction(translation.uri, locale, true),
      });
    } else {
      // Redirect to homepage if no translation
      navigationLinks.push({
        locale,
        url: locale === "pl" ? "/" : `/${locale}`,
      });
    }
  });

  return navigationLinks;
}

/**
 * Get alternate links for static pages
 * This is used for SEO and multilingual support
 */
export function getAlternatesLinks(pageName: string) {
  let languages = [];

  locales.forEach((locale) => {
    const url = getLocalizedPath(pageName, locale, false);

    if (url) {
      languages.push({
        locale,
        url: removeTrailingSlash(
          `${locale === "pl" ? "" : `/${locale}`}${url}`,
        ),
      });
    }
  });

  const url = getLocalizedPath(pageName, DEFAULT_LOCALE, true);

  languages.push({
    locale: "x-default",
    url: removeTrailingSlash(url),
  });

  return languages;
}

/**
 * Get navigation links for static pages
 * This is used for language switcher UI
 */
export function getNavigationLinks(pageName: string) {
  return locales.map((locale) => {
    const url = getLocalizedPath(pageName, locale, true);

    return {
      locale,
      url,
    };
  });
}
