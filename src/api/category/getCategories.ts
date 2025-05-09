import { getTopLevelCategories } from "../api";
import { createImageData } from "@/shared/media";
import { TCategories } from "@/types/categories.types";
import { getLocale } from "next-intl/server";
import { getCategoryPath } from "@/lib/paths";

export const getCategories = async (locale: string) => {
  let lang = locale || (await getLocale());

  const response: TCategories[] = await getTopLevelCategories(lang);

  const categoriesData = response;

  const categories = categoriesData
    ?.map((category, index) => {
      return {
        id: index,
        title: category?.name,
        name: category?.name,
        description: category?.acf?.description,
        image: category?.acf?.image && createImageData(category?.acf?.image),
        slug: category?.slug,
        link: getCategoryPath(category?.link, locale),
        order: category?.acf?.order
          ? parseInt(category?.acf?.order, 10)
          : 99999,
      };
    })
    ?.sort((a, b) => {
      return a.order - b.order;
    });

  return categoriesData && categories;
};
