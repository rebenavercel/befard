import { createImageData } from "@/shared/media";
import { getPageData } from "../api";
import { WordpressImage } from "@/types/wordpress.types";


export const getService = async (slug: string = "service", locale: string) => {
  const response = await getPageData(slug, locale);

  const servicePageDataACF = response?.[0]?.acf;

  return {
    text: servicePageDataACF?.text,
    faq:
      servicePageDataACF?.faq &&
      servicePageDataACF?.faq?.map(
        (item: { question: string; answer: string }, index: number) => ({
          id: index,
          question: item?.question,
          answer: item?.answer,
        }),
      ),
    gallery:
      servicePageDataACF?.gallery &&
      servicePageDataACF?.gallery?.map((item: WordpressImage) =>
        createImageData(item),
      ),
  };
};
