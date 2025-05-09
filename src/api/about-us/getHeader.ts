import { createImageData } from "@/shared/media";
import { getPageData } from "../api";


export const getHeader = async (slug: string = "about-us", locale: string) => {
  const response = await getPageData(slug, locale);

  const headerPageDataACF = response?.[0]?.acf;

  return {
    header: {
      header: headerPageDataACF?.header?.Header,
      description: headerPageDataACF?.header?.description,
      image:
        headerPageDataACF?.header?.image &&
        createImageData(headerPageDataACF?.header?.image),
    },
    text_section: headerPageDataACF?.text_section,
  };
};
