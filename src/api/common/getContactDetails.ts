import { createImageData } from "@/shared/media";
import { getPageData } from "../api";

export const getContactDetails = async (slug: string, locale: string) => {
  const response = await getPageData(slug, locale);

  const generalDataACF = response[0]?.acf;

  return {
    image: generalDataACF?.image && createImageData(generalDataACF?.image),
    text: generalDataACF?.text,
  };
};
