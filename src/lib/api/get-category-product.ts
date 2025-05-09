import "server-only";

import { getWordpPressUri } from "@/lib/uri";
import { notFound } from "next/navigation";
import {
  generateProductBreadcrumbs,
  getCategoryBreadcrumbs,
} from "../breadcrumbs";
import { fetcher } from "../fetcher";
import { GET_CATEGORY_OR_PRODUCT_QUERY } from "../graphql/content-or-term";
import {
  AlternateLink,
  generateAlternateLinks,
  generateNavigationLinks,
  NavigationLink,
} from "../translations";
import { PostTypeSEO, TermSEO } from "@/types/seo.types";
import { Language, Translation } from "@/types/wp-graphql.types";

interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  uri: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  uri: string;
  seo: PostTypeSEO;
  contentTypeName: string;
  language: Language;
  translations: Translation[];
  customProductCategories: {
    nodes: ProductCategory[];
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  uri: string;
  seo: TermSEO;
  parentDatabaseId?: number;
  taxonomyName: string;
  language: Language;
  translations: Translation[];
}

interface WPGraphQLCategoryResponse extends Category {
  acfKategorieProduktow: {
    image: {
      node: {
        mediaItemUrl: string;
      };
    };
  };
}

interface WpGraphQLProductResponse extends Product {
  acfProduct: {
    thumbnail: {
      node: {
        mediaItemUrl: string;
      };
    };
  };
}

// Main response type
interface GraphQLResponse {
  product: WpGraphQLProductResponse | null;
  category: WPGraphQLCategoryResponse | null;
}

interface Breadcrumb {
  label: string;
  href?: string;
}

interface ProductResponse extends Product {
  breadcrumbs: Breadcrumb[];
  alternateLinks: AlternateLink[];
  navigationLinks: NavigationLink[];
  mediaItemUrl: string;
}

interface CategoryResponse extends Category {
  breadcrumbs: Breadcrumb[];
  alternateLinks: AlternateLink[];
  navigationLinks: NavigationLink[];
  mediaItemUrl: string;
}

type FullResponse = (ProductResponse | CategoryResponse) & {
  type: "product" | "category";
};

export const getCategoryOrProduct = async (
  locale: string,
  slug: string[],
): Promise<FullResponse | undefined> => {
  const categoryUri = getWordpPressUri(locale, slug, "product-category");
  const productUri = getWordpPressUri(locale, slug, "products");

  const data = await fetcher<GraphQLResponse>({
    query: GET_CATEGORY_OR_PRODUCT_QUERY,
    variables: {
      productUri,
      categoryUri,
    },
    cache: "force-cache",
  });

  const product = data?.product;
  const category = data?.category;

  if (!product && !category) {
    return undefined;
  }

  if (product) {
    if (product.uri !== productUri) {
      notFound();
    }

    const breadcrumbs = await generateProductBreadcrumbs(slug, product, locale);

    const alternateLinks = generateAlternateLinks(product, "product");
    const navigationLinks = generateNavigationLinks(product, "product");

    return {
      ...product,
      breadcrumbs,
      alternateLinks,
      navigationLinks,
      type: "product",
      mediaItemUrl: product.acfProduct?.thumbnail?.node.mediaItemUrl,
    };
  }

  if (category) {
    if (category.uri !== categoryUri) {
      notFound();
    }

    const breadcrumbs = await getCategoryBreadcrumbs(
      category.seo.breadcrumbs,
      locale,
    );

    const alternateLinks = generateAlternateLinks(category, "category");
    const navigationLinks = generateNavigationLinks(category, "category");

    return {
      ...category,
      breadcrumbs,
      alternateLinks,
      navigationLinks,
      type: "category",
      mediaItemUrl: category?.acfKategorieProduktow?.image?.node.mediaItemUrl,
    };
  }
};

export enum ViewType {
  PRODUCT = "PRODUCT",
  CATEGORY = "CATEGORY",
  SUB_CATEGORY = "SUB_CATEGORY",
  NOT_FOUND = "NOT_FOUND",
}

export function determineViewType(data: FullResponse | undefined): ViewType {
  if (!data) return ViewType.NOT_FOUND;

  if (data?.type === "product") {
    return ViewType.PRODUCT;
  }

  if (data?.type === "category") {
    return (data as CategoryResponse).parentDatabaseId
      ? ViewType.SUB_CATEGORY
      : ViewType.CATEGORY;
  }

  return ViewType.NOT_FOUND;
}
