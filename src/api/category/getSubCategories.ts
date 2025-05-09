import { createImageData } from "@/shared/media";
import { getSingleCategoryData, getSubCategoriesFromCategory } from "../api";
import { getLocale } from 'next-intl/server';
import { getCategoryPath } from '@/lib/paths';


export const getSubCategories = async (slug: string, locale?: string) => {
  let lang = locale || (await getLocale());

  const response = await getSingleCategoryData(lang, slug);
  const categoriesData = response && response[0];

  if (!categoriesData) {
    return null;
  }

  const subCategories = await getSubCategoriesFromCategory(categoriesData.id);

  return subCategories && {
    subcategories: subCategories?.map((category: any) => ({
      id: category.id,
      title: category?.name,
      name: category?.name,
      image: category?.acf?.image && createImageData(category?.acf?.image),
      slug: category?.slug,
      link: getCategoryPath(category?.link, lang),
    })),
  };
};
