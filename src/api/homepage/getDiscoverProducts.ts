import { getProductPath } from "@/lib/paths";
import { createImageData } from "@/shared/media";
import {
  getProductsFromCustomProductCategory,
  getSubCategoriesFromCategory,
  getTopLevelCategories,
} from "../api";

export const getDiscoverProducts = async (locale: string) => {
  const categories = await getTopLevelCategories(locale);

  let products = [];

  for (const category of categories) {
    const subcategories = await getSubCategoriesFromCategory(category?.id);

    if (subcategories?.length) {
      for (const subcategory of subcategories) {
        const items = await getProductsFromCustomProductCategory(
          subcategory?.id,
          2
        );

        const mappedItems = items.map((item: any) => ({
          id: item.id,
          thumbnail:
            item.acf?.thumbnail && createImageData(item.acf?.thumbnail),
          etiquette: item.acf?.etiquette || "",
          slug: item.slug,
          title: item.title?.rendered || "",
          link: getProductPath(item.link, locale),
          categorySlug: subcategory.slug,
        }));

        products.push(...mappedItems);
      }
    } else {
      continue;
    }

    const items = await getProductsFromCustomProductCategory(category?.id, 2);

    const mappedItems = items.map((item: any) => ({
      id: item.id,
      thumbnail: item.acf?.thumbnail && createImageData(item.acf?.thumbnail),
      etiquette: item.acf?.etiquette || "",
      slug: item.slug,
      title: item.title?.rendered || "",
      link: getProductPath(item.link, locale),
      categorySlug: category.slug,
    }));

    products.push(...mappedItems);
  }
  
  const uniqueProducts = products.filter((product, index) => {
    return products.findIndex((p) => p.id === product.id) === index;
  });
  
  return {
    products: uniqueProducts,
  };
};
