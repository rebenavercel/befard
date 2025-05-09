import { createImageData } from "@/shared/media";
import {
  getCategoryProductData,
  getProductsFromCustomProductCategory,
} from "../api";
import { getProductPath, getCategoryPath } from "@/lib/paths";
import { getLocale } from "next-intl/server";

export const getCategoryProducts = async (slug: string, locale?: string) => {
  let lang = locale || (await getLocale());
  // Get category data
  const response = await getCategoryProductData(lang, slug);
  const category = response[0];

  if (!category) {
    return null;
  }

  // Get products assigned to this category
  const products = await getProductsFromCustomProductCategory(category.id);

  return {
    categories: [
      {
        id: category.id,
        title: category?.name,
        description: category?.acf?.description,
        long_description: category?.acf?.long_description,
        text_under_category: category?.acf?.text_under_category,
        image: category.acf?.image && createImageData(category.acf?.image),
        slug: category.slug,
        link: getCategoryPath(category.link, lang),
        products: products?.map((product: any) => {
          return {
            id: product.id,
            etiquette: product.acf?.etiquette,
            thumbnail:
              product.acf?.thumbnail && createImageData(product.acf?.thumbnail),
            title: product.title?.rendered,
            name: product.name,
            description: product.acf?.description,
            content: product.content?.rendered,
            slug: product.slug,
            link: getProductPath(product.link, lang),
            image: product.acf?.image && createImageData(product.acf?.image),
            header: product.acf?.header,
          };
        }),
      },
    ],
  };
};
