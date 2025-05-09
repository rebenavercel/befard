import {
  getCategoryPath,
  getPageUrl,
  getPostUrl,
  getProductPath,
} from "@/lib/paths";
import { TLocale } from "@/navigation";
import { BaseSEO, PostTypeSEO, TermSEO } from "@/types/seo.types";
import { Metadata } from "next";
import type { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";
import type { AlternateLink } from "./translations";
import { getAbsoluteUrl } from "@/lib/uri";
import { DEFAULT_IMAGE } from "@/shared/placeholder";

/**
 * Content information needed for URL formatting
 */
interface ContentInfo {
  type: "product" | "category" | "post" | "page";
  uri: string;
  slug?: string;
}

/**
 * Maps WordPress OpenGraph type to Next.js OpenGraph type
 */
function mapOpenGraphType(wpType?: string): OpenGraphType {
  if (!wpType) return "website";

  // Map WordPress types to valid Next.js OpenGraph types
  switch (wpType.toLowerCase()) {
    case "article":
      return "article";
    case "book":
      return "book";
    case "profile":
      return "profile";
    // Add more mappings as needed
    default:
      return "website";
  }
}

/**
 * Transforms WordPress SEO data into Next.js Metadata format
 *
 * @param seoData - SEO data from WordPress GraphQL
 * @param contentInfo - Information about the content type and URI
 * @param locale - Current locale
 * @param featuredImage - Optional featured image from ACF fields
 * @param alternateLinks - Optional alternate links for languages
 * @returns Next.js compatible Metadata object
 */
export function transformSeoToMetadata(
  seoData: BaseSEO | PostTypeSEO | TermSEO,
  contentInfo: ContentInfo,
  locale: TLocale,
  featuredImage?: string,
  alternateLinks?: AlternateLink[],
): Metadata {
  if (!seoData) {
    return {};
  }

  // Format canonical URL based on content type
  let canonical: string | undefined = undefined;
  if (seoData.canonical) {
    switch (contentInfo.type) {
      case "product":
        canonical = getProductPath(contentInfo.uri, locale, true);
        break;
      case "category":
        canonical = getCategoryPath(contentInfo.uri, locale, true);
        break;
      case "post":
        canonical = getPostUrl(contentInfo.slug || "", locale, true);
        break;
      case "page":
        canonical = getPageUrl(contentInfo.uri, locale, true);
        break;
    }
  }

  // Get the best available image (OpenGraph > Twitter > Featured > Default)
  const imageUrl =
    seoData.opengraphImage?.mediaItemUrl ||
    seoData.twitterImage?.mediaItemUrl ||
    featuredImage ||
    DEFAULT_IMAGE;

  // Build the metadata object
  const metadata: Metadata = {
    title: seoData.title || undefined,
    description: seoData.metaDesc || undefined,
  };

  // Set alternates/canonical if available
  if (canonical || alternateLinks?.length) {
    metadata.alternates = {
      canonical: canonical,
      ...(alternateLinks?.length && {
        languages: alternateLinks.reduce(
          (acc, link) => {
            if (link.locale && link.url) {
              acc[link.locale] = link.url;
            }
            return acc;
          },
          {} as Record<string, string>,
        ),
      }),
    };
  }

  // Handle robots meta
  if (seoData.metaRobotsNoindex || seoData.metaRobotsNofollow) {
    metadata.robots = {
      index: seoData.metaRobotsNoindex === "index",
      follow: seoData.metaRobotsNofollow === "follow",
    };
  }

  // Handle keywords
  if (seoData.metaKeywords) {
    metadata.keywords = seoData.metaKeywords
      ? seoData.metaKeywords.split(",").map((k) => k.trim())
      : undefined;
  }

  // Set OpenGraph data if any OG field is available or we have an image
  if (
    seoData.opengraphTitle ||
    seoData.opengraphDescription ||
    seoData.opengraphUrl ||
    seoData.opengraphType ||
    imageUrl
  ) {
    // Map WordPress OpenGraph type to valid Next.js type
    const ogType = mapOpenGraphType(seoData.opengraphType);

    metadata.openGraph = {
      title: seoData.opengraphTitle || seoData.title,
      description: seoData.opengraphDescription || seoData.metaDesc,
      url: getAbsoluteUrl(canonical as string),
      siteName: seoData.opengraphSiteName,
      type: ogType,
      // Only add publishedTime and modifiedTime for articles
      ...(ogType === "article" && {
        publishedTime: seoData.opengraphPublishedTime || undefined,
        modifiedTime: seoData.opengraphModifiedTime || undefined,
        authors: seoData.opengraphAuthor
          ? [seoData.opengraphAuthor]
          : undefined,
      }),
      // Always include images if we have any
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt:
                seoData.opengraphImage?.altText ||
                seoData.twitterImage?.altText ||
                "",
            },
          ]
        : undefined,
    };
  }

  // Set Twitter data if any Twitter field is available
  // Note: If we set openGraph.images but not twitter.images, Next.js will use OG images for Twitter
  if (
    seoData.twitterTitle ||
    seoData.twitterDescription ||
    seoData.twitterImage?.mediaItemUrl
  ) {
    metadata.twitter = {
      title: seoData.twitterTitle || seoData.title,
      description: seoData.twitterDescription || seoData.metaDesc,
      // Default to summary_large_image when we have an image
      card: "summary_large_image",
      // Only set explicit Twitter images if they exist in Twitter data
      ...(seoData.twitterImage?.mediaItemUrl && {
        images: [
          {
            url: seoData.twitterImage.mediaItemUrl,
            alt: seoData.twitterImage.altText || "",
          },
        ],
      }),
    };
  }

  return metadata;
}

/**
 * Helper function for extracting data from WordPress product GraphQL result
 * Works with both raw product data and the enhanced product from getCategoryOrProduct
 */
export function getProductMetadata(
  productData: any,
  locale: TLocale,
): Metadata {
  if (!productData) return {};

  const featuredImage = productData?.mediaItemUrl || DEFAULT_IMAGE;

  const alternateLinks =
    productData.alternateLinks.length > 2 ? productData.alternateLinks : [];

  return transformSeoToMetadata(
    productData.seo,
    {
      type: "product",
      uri: productData.uri,
      slug: productData.slug,
    },
    locale,
    featuredImage,
    alternateLinks,
  );
}

/**
 * Helper function for extracting data from WordPress category GraphQL result
 * Works with both raw category data and the enhanced category from getCategoryOrProduct
 */
export function getCategoryMetadata(
  categoryData: any,
  locale: TLocale,
): Metadata {
  if (!categoryData) return {};

  const featuredImage = categoryData?.mediaItemUrl || DEFAULT_IMAGE;

  const alternateLinks =
    categoryData.alternateLinks.length > 2 ? categoryData.alternateLinks : [];

  return transformSeoToMetadata(
    categoryData.seo,
    {
      type: "category",
      uri: categoryData.uri,
      slug: categoryData.slug,
    },
    locale,
    featuredImage,
    alternateLinks,
  );
}

/**
 * Helper function for extracting data from WordPress post GraphQL result
 */
export function getPostMetadata(postData: any, locale: TLocale): Metadata {
  if (!postData) return {};

  const featuredImage =
    postData.acfPost?.thumbnail?.node?.mediaItemUrl || DEFAULT_IMAGE;

  const alternateLinks =
    postData.alternateLinks.length > 2 ? postData.alternateLinks : [];

  return transformSeoToMetadata(
    postData.seo,
    {
      type: "post",
      uri: postData.uri,
      slug: postData.slug,
    },
    locale,
    featuredImage,
    alternateLinks,
  );
}

/**
 * Helper function for extracting data from WordPress page GraphQL result
 */
export function getPageMetadata(
  pageData: any,
  pagePath: string,
  locale: TLocale,
): Metadata {
  if (!pageData) return {};

  const featuredImage =
    pageData?.featuredImage?.node?.mediaItemUrl || DEFAULT_IMAGE;

  return transformSeoToMetadata(
    pageData.seo,
    {
      type: "page",
      uri: pagePath,
      slug: pageData.slug,
    },
    locale,
    featuredImage,
    pageData.alternateLinks,
  );
}

/**
 * Helper function for handling the response from getCategoryOrProduct
 * Automatically determines if the data is a product or category and applies
 * the appropriate metadata function
 */
export function getCategoryOrProductMetadata(
  data: any,
  locale: TLocale,
): Metadata {
  if (!data) return {};

  // Check if this is a product
  if (data.contentTypeName === "products" || data.type === "product") {
    return getProductMetadata(data, locale);
  }

  // Check if this is a category
  if (data.taxonomyName === "product-category" || data.type === "category") {
    return getCategoryMetadata(data, locale);
  }

  // Fallback to just returning the data we have
  return {};
}
