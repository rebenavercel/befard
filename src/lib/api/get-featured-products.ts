import { getCategoryPath } from "@/lib/paths";
import { fetcher } from "../fetcher";
import { GET_DISCOVERED_PRODUCTS } from "../graphql/get-featured-products";
import { cache } from "react";

interface ProductNode {
  uri: string;
  title: string;
  link: string;
  acfProduct: {
    etiquette?: string;
    kolejnosc?: number;
    thumbnail?: {
      node: {
        altText: string;
        mediaItemUrl: string;
      };
    };
  };
}

interface FeaturedProduct {
  id: string;
  slug: string;
  title: string;
  link: string;
  etiquette: string;
  thumbnail?: {
    alt: string;
    src: string;
  };
  order: number;
}

export const getFeaturedProducts = cache(async (locale: string) => {
  const { customProductCategories } = await fetcher<{
    customProductCategories: {
      nodes: Array<{
        products: {
          nodes: ProductNode[];
        };
      }>;
    };
  }>({
    query: GET_DISCOVERED_PRODUCTS,
    variables: {
      language: locale.toUpperCase(),
    },
  });

  const products = customProductCategories?.nodes
    .flatMap((category) => {
      return category.products.nodes.map(
        (product: ProductNode): FeaturedProduct => {
          return {
            id: product.uri,
            slug: product.uri,
            title: product.title,
            link: getCategoryPath(product.link, locale),
            order: product?.acfProduct?.kolejnosc || 999999,
            etiquette: product.acfProduct.etiquette || "",
            thumbnail: product?.acfProduct?.thumbnail?.node
              ? {
                  alt: product.acfProduct.thumbnail.node.altText,
                  src: product.acfProduct.thumbnail.node.mediaItemUrl,
                }
              : undefined,
          };
        }
      );
    })
    .filter(
      (product, index, array) =>
        array.findIndex((p) => p.id === product.id) === index
    )
    ?.sort((a, b) => {
      return a.order - b.order;
    });

  return { products };
});
