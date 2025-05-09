import { getPageData } from "../api";
import { createImageData } from "@/shared/media";
import { getLocale } from "next-intl/server";


export const getAboutSection = async (slug: string) => {
  const locale = await getLocale();
  const response = await getPageData(slug ?? locale, locale);

  const aboutPageDataACF = response?.[0]?.acf?.about_us;

  return {
    header: aboutPageDataACF?.header,
    header_title: aboutPageDataACF?.header_title,
    image: aboutPageDataACF?.image && createImageData(aboutPageDataACF?.image),
    description: aboutPageDataACF?.description,
    button: aboutPageDataACF?.button,
    tiles:
      aboutPageDataACF?.tiles &&
      aboutPageDataACF?.tiles?.map(
        (tile: { title: string; description: string }, index: number) => ({
          id: index,
          title: tile?.title,
          description: tile?.description,
        }),
      ),
  };
};
