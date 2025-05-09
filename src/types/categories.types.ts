import { IACFData, WordpressImage } from "./wordpress.types";

export type TCategories = IACFData<{
  description: string;
  long_description: string;
  image: WordpressImage;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  products: any;
  order?: any;
}>;
