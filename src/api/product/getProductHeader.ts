import { createImageData } from "@/shared/media";
import { getSingleProduct } from "../api";
import { WordpressImage } from "@/types/wordpress.types";
import { IImage } from "@/types/next.types";

export const getProductHeader = async (locale: string, slug: string) => {
  const response = await getSingleProduct(locale, slug);

  const productData = response[0]?.acf?.header;

  const gallery: IImage[] = [];

  const galleryImages =
    productData?.gallery &&
    productData.gallery.map((item: WordpressImage) => createImageData(item));

  if (galleryImages) {
    gallery.push(...galleryImages);
  }

  return (
    productData && {
      header_prefix: productData?.header_prefix,
      product_title: productData?.product_title,
      description: productData?.description,
      file: productData?.file && {
        url: productData?.file.url,
      },
      gallery,
    }
  );
};
