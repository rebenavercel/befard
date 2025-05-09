import { IImage } from "./next.types";
import { WordpressImage } from "./wordpress.types";

interface IContentList {
  acf_fc_layout: "content_list";
  title: string[];
}

interface ITextField {
  acf_fc_layout: "text_field";
  content: string;
}

interface IGallery {
  acf_fc_layout: "gallery";
  gallery: WordpressImage[];
}

interface IRedText {
  acf_fc_layout: "red_text";
  title: string;
  content: string;
}

interface IBigImage {
  acf_fc_layout: "big_image";
  image: WordpressImage;
}

export type TAllBlogPage = {
  result: {
    id: number;
    date: string;
    title: {
      rendered: string;
    };
    slug: string;
    link: string;
    acf: {
      content: (IContentList | ITextField | IGallery | IRedText | IBigImage)[];
      thumbnail?: WordpressImage;
      post_image?: WordpressImage;
    };
  }[];
  total?: string;
};

export type TSingleBlogPage = {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  slug: string;
  acf: {
    content: (IContentList | ITextField | IGallery | IRedText | IBigImage)[];
    thumbnail?: WordpressImage;
    post_image?: WordpressImage;
  };
};

export interface IAllBlogPageDTO {
  totalPages?: string;
  posts: {
    id: number;
    slug: string;
    date: string;
    title: string;
    description: string;
    thumbnail?: IImage;
    readMore: boolean;
  }[];
}

export interface ISingleBlogPageDTO {
  id: number;
  slug: string;
  date: string;
  title: string;
  description: string;
  thumbnail?: IImage;
  readMore: boolean;
}
