import { getPageData } from "../api";
import { Metadata } from "next"


export const getSeo = async (slug: string, locale: string): Promise<Metadata> => {
  const response = await getPageData(slug, locale);

  const yoastFields = response?.[0]?.yoast_head_json;

  return yoastFields && {
    title: yoastFields?.title,
    description: yoastFields?.description,
    robots: {...yoastFields?.robots, canonical: yoastFields?.canonical},
    openGraph: {
      title: yoastFields?.title,
      description: yoastFields?.description,
      url: yoastFields?.canonical,
      locale,
      images: {
        url: (yoastFields?.og_image && yoastFields?.og_image[0]?.url) || "",
      },
    },
  };
};
