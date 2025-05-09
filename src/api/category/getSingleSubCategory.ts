import { createImageData } from "@/shared/media";
import {
  getProductsFromCustomProductCategory,
  getSingleCategoryData,
  getSubCategoriesFromCategory,
  getSubCategoryParent,
} from "../api";
import { getCategoryPath, getProductPath } from "@/lib/paths";
import { getLocale } from "next-intl/server";

export const getSingleSubCategory = async (
  slug: string,
  locale: string,
  currentSubcategory: string
) => {
  let lang = locale || (await getLocale());

  const response = await getSingleCategoryData(lang, slug);
  const categoriesData = response && response[0];

  if (!categoriesData) {
    return null;
  }

  const subCategories = await getSubCategoriesFromCategory(categoriesData.id);

  const currentSubCategory = subCategories.find(
    (subcategory: any) => subcategory?.slug === currentSubcategory
  );

  if (!currentSubCategory) {
    return null;
  }

  const parent = await getSubCategoryParent(currentSubCategory.parent);

  // Get products assigned to this subcategory
  const products = await getProductsFromCustomProductCategory(
    currentSubCategory.id
  );

  return {
    id: currentSubCategory.id,
    title: currentSubCategory.name,
    name: currentSubCategory.name,
    description: currentSubCategory.acf?.description,
    long_description: currentSubCategory.acf?.long_description,
    text_under_category: currentSubCategory?.acf?.text_under_category,
    content: currentSubCategory.content?.rendered,
    image:
      currentSubCategory.acf?.image &&
      createImageData(currentSubCategory.acf?.image),
    slug: currentSubCategory.slug,
    link: getCategoryPath(currentSubCategory.link, lang),
    parent: {
      name: parent?.name,
      link: getCategoryPath(parent?.link, lang),
    },
    products: products?.map((product: any) => ({
      id: product.id,
      slug: product.slug,
      title: product.title?.rendered,
      name: product.name,
      description: product.acf?.description,
      content: product.content?.rendered,
      image: product.acf?.thumbnail && createImageData(product.acf?.thumbnail),
      etiquette: product.acf?.etiquette,
      link: getProductPath(product.link, lang),
      header: product.acf?.header,
    })),
  };
};
