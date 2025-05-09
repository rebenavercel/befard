import { createImageData } from "@/shared/media";
import { getAllBlogData } from "../api";
import { TAllBlogPage } from "@/types/blog.types";
import { getPostUrl } from "@/lib/paths";
import { cache } from "react";


export const getNews = cache(
  async (locale: string, page: number, exclude?: number) => {
    const response: TAllBlogPage = await getAllBlogData(
      locale,
      page,
      exclude?.toString(),
    );

    const posts = response?.result?.map((post) => {
      const postDate = post?.date && new Date(post?.date);

      const formattedDate = new Date(postDate).toLocaleDateString(locale, {
        month: "2-digit",
        year: "numeric",
        day: "2-digit",
      });

      return {
        id: post.id,
        slug: getPostUrl(post.slug, locale),
        date: formattedDate,
        link: getPostUrl(post.link, locale),
        title: post?.title?.rendered,
        thumbnail:
          post?.acf?.thumbnail && createImageData(post?.acf?.thumbnail),
        post_image:
          post?.acf?.post_image && createImageData(post?.acf?.post_image),
      };
    });

    return {
      totalPages: response?.total,
      posts,
    };
  },
);
