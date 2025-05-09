import { THomePage } from "@/types/homepage.types";
import { getPageData } from "../api";
import { createImageData, createVideoData } from "@/shared/media";

export const getHeader = async (slug: string, locale: string) => {
  const response: THomePage[] = await getPageData(slug, locale);

  const headerPageDataACF = response?.[0]?.acf;

  return {
    header: {
      images: headerPageDataACF?.header?.images?.map((image, index) => ({
        id: index,
        header_title: image.header_title,
        description: image.description,
        button: {
          button_text: image.button?.button_text,
          url_address: image.button?.url_address,
        },
        image: image?.image && createImageData(image?.image),
        video: image?.video && createVideoData(image?.video),
        videoPoster: image?.video && image?.video?.sizes?.large,
      })),
    },
  };
};
