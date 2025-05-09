import "server-only";

import { cache } from "react";
import { fetcher } from "../fetcher";
import { GET_MENU_CATEGORIES_QUERY } from "../graphql/get-menu-categories";
import { getProductPath, getCategoryPath } from "@/lib/paths";

interface MediaDetails {
  id: string;
  title: string;
  alt: string;
  src: string;
}

interface ThumbnailNode {
  id: string;
  title: string;
  alt: string;
  src: string;
}

interface AcfProduct {
  thumbnail: {
    node: ThumbnailNode;
  };
}

interface Product {
  id: string;
  title: string;
  slug: string;
  link: string;
  acfProduct: AcfProduct;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  link: string;
  acfKategorieProduktow: {
    image: {
      node: MediaDetails;
    };
    kolejnosc: number;
  };
  children: {
    nodes: Category[];
  };
  products: {
    nodes: Product[];
  };
}

interface GraphQLResponse {
  customProductCategories: {
    nodes: Category[];
  };
}

export const getMenu = cache(async (locale: string) => {
  const data = await fetcher<GraphQLResponse>({
    query: GET_MENU_CATEGORIES_QUERY,
    variables: {
      language: locale.toUpperCase(),
    },
  });

  const categoriesData = data?.customProductCategories?.nodes
    .map((category) => ({
      id: category.id,
      title: category.name,
      slug: category.slug,
      link: getCategoryPath(category.link, locale),
      image: category.acfKategorieProduktow?.image?.node,
      order: category?.acfKategorieProduktow?.kolejnosc || 9999999,
      subcategories: category.children.nodes
        .map((subcat) => ({
          id: subcat.id,
          title: subcat.name,
          name: subcat.name,
          slug: subcat.slug,
          link: getCategoryPath(subcat.link, locale),
          image: subcat.acfKategorieProduktow?.image?.node,
          order: subcat?.acfKategorieProduktow?.kolejnosc || 9999999,
        }))
        ?.sort((a, b) => {
          return a.order - b.order;
        }),
      products: category.products.nodes.map((product) => ({
        id: product.id,
        title: product.title,
        slug: product.slug,
        link: getProductPath(product.link, locale),
        categorySlug: category.slug,
        categoryId: category.id,
        image: product.acfProduct?.thumbnail?.node,
      })),
    }))
    ?.sort((a, b) => {
      return a.order - b.order;
    });

  return { categories: categoriesData };
});
