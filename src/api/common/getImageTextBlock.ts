import { getPageData } from "../api";
import { createImageData } from "@/shared/media";


export const getImageTextBlock = async (slug: string, locale: string) => {
  const response = await getPageData(slug, locale);

  const imageTextBlockDataACF = response[0]?.acf?.describe_section;

  return {
    header: imageTextBlockDataACF?.header,
    header_title: imageTextBlockDataACF?.header_title,
    image:
      imageTextBlockDataACF?.image &&
      createImageData(imageTextBlockDataACF?.image),
    description: imageTextBlockDataACF?.description,
    button: imageTextBlockDataACF?.button && {
      button_title: imageTextBlockDataACF?.button?.button_title,
      address_url: imageTextBlockDataACF?.button?.address_url,
    },
  };
};
