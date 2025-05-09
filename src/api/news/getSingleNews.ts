import { TSingleBlogPage } from "@/types/blog.types";
import { getBlogData } from "../api";
import { createImageData } from "@/shared/media";


export const getSingleNews = async (slug: string, locale: string) => {
  const response: TSingleBlogPage[] = await getBlogData(slug, locale);

  const blogPost = response[0];
  const postDate = blogPost?.date && new Date(blogPost?.date);

  const formattedDate = new Date(postDate).toLocaleDateString(locale, {
    month: "2-digit",
    year: "numeric",
    day: "2-digit",
  });

  return {
    id: blogPost.id,
    date: formattedDate,
    title: blogPost?.title?.rendered,
    post_image:
      blogPost?.acf?.post_image && createImageData(blogPost?.acf?.post_image),
    content: blogPost?.acf?.content
      ? blogPost?.acf?.content?.map((content) => {
        if (content?.acf_fc_layout === "content_list") {
          return {
            layout: "content_list",
            content: content?.title?.map((item, index) => ({
              id: index + 1,
              title: item,
            })),
          };
        }
        if (content?.acf_fc_layout === "big_image") {
          return {
            layout: "big_image",
            image: content?.image && createImageData(content?.image),
          };
        }
        if (content?.acf_fc_layout === "text_field") {
          return {
            layout: "text_field",
            content: content?.content,
          };
        }
        if (content?.acf_fc_layout === "gallery") {
          return {
            layout: "gallery",
            gallery: content?.gallery?.map((image, index) => ({
              id: index,
              image: image && createImageData(image),
            })),
          };
        }
        if (content?.acf_fc_layout === "red_text") {
          return {
            layout: "red_text",
            title: content?.title,
            content: content?.content,
          };
        }
      })
      : [],
  };
};
