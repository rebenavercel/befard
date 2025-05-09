import { createImageData } from "@/shared/media";
import {
  getTopLevelCategories,
  getProductsFromCustomProductCategory,
  getSubCategoriesFromCategory,
} from "../api";
import { getCategoryPath, getProductPath } from "@/lib/paths";
import { getLocale } from "next-intl/server";

export const getMenuCategories = async (locale: string) => {
  // Get root categories
  let lang = locale || (await getLocale());

  const categories = await getTopLevelCategories(lang);

  if (!categories || categories.length === 0) {
    return { categories: [] };
  }

  const categoriesData = await Promise.all(
    categories.map(async (category: any) => {
      // Get subcategories for this category
      const subcategories = await getSubCategoriesFromCategory(category.id);

      // Get products directly assigned to this category
      const products = await getProductsFromCustomProductCategory(category.id);

      return {
        id: category.id,
        title: category.name,
        slug: category.slug,
        link: getCategoryPath(category.link, lang),
        image: category.acf?.image && createImageData(category.acf?.image),
        subcategories:
          subcategories?.map((subcat: any) => ({
            id: subcat.id,
            title: subcat.name,
            name: subcat.name,
            slug: subcat.slug,
            link: getCategoryPath(subcat.link, lang),
            image: subcat.acf?.image && createImageData(subcat.acf?.image),
          })) || [],
        products:
          products?.map((product: any) => ({
            id: product.id,
            title: product.title?.rendered,
            slug: product.slug,
            link: getProductPath(product.link, lang),
            categorySlug: category.slug,
            categoryId: category.id,
            image:
              product.acf?.thumbnail && createImageData(product.acf?.thumbnail),
          })) || [],
      };
    }),
  );

  return { categories: categoriesData };
};
