import { createImageData } from "@/shared/media";
import { getSingleProduct } from "../api";
import { WordpressImage } from "@/types/wordpress.types";

export const getDraws = async (locale: string, slug: string) => {
  const response = await getSingleProduct(locale, slug);

  const productData = response[0]?.acf?.technical_images;

  const data = productData && {
    prefix_title: productData?.prefix_title,
    images:
      productData?.images &&
      productData?.images?.map((image: WordpressImage) =>
        createImageData(image)
      ),
  };

  return data;
};
