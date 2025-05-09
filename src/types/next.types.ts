import type { ImageProps } from "next/image";

export interface IImage {
  id?: ImageProps["id"];
  src: ImageProps["src"];
  alt: ImageProps["alt"];
  blurDataURL?: ImageProps["blurDataURL"];
  placeholder?: ImageProps["placeholder"];
  type?: string;
  caption?: string;
}

export type TPageParams = {
  params: Promise<{
    locale: string;
  }>;
};

export type TPageParamsWithSearch = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

export interface IVideoData {
  file: IVideo;
}

export interface IVideo {
  id?: string;
  src: string;
  alt: string;
  type: string;
  poster?: string;
  blurDataURL?: ImageProps["blurDataURL"];
  placeholder?: ImageProps["placeholder"];
}

export interface ImageWPGraphQL {
  id: string;
  title: string;
  altText: string;
  mediaItemUrl: string;
}
