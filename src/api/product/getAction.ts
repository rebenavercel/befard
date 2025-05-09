import { getSingleProduct } from "../api";

export const getAction = async (locale: string, slug: string) => {
  const response = await getSingleProduct(locale, slug);

  const productData = response[0]?.acf?.in_action;

  const data = productData && {
    header: productData.header,
    prefix_title: productData?.prefix_title,
    videos:
      productData?.videos &&
      productData?.videos?.map(
        (video: { video_url: string }, index: number) => ({
          url: video.video_url,
          id: index,
        })
      ),
  };

  return data;
};
