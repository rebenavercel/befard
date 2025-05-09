import { getSingleProduct } from "../api";

export const getProductSpecification = async (locale: string, slug: string) => {
  const response = await getSingleProduct(locale, slug);

  const productData = response[0]?.acf?.specification;

  const data = productData && {
    tiles: productData?.tiles,
    prefix_title: productData?.prefix_title,
    relation_items:
      productData?.relation_products &&
      productData?.relation_products?.map(
        (item: { tile_title: string; address_url: string }, index: number) => ({
          id: index,
          title: item?.tile_title,
          address_url: item?.address_url,
        })
      ),
  };

  return data;
};
