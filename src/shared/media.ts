import { IImage, IVideo } from "@/types/next.types";
import { WordpressImage, WordpressVideo } from "@/types/wordpress.types";

export const createImageData = (image: WordpressImage): IImage => {
  const { id, alt, title, url } = image;

  return {
    id: id.toString(),
    src: url,
    alt,
    caption: title,
  };
};

export const createVideoData = (video: WordpressVideo): IVideo => {
  const src = video.url;
  const alt = video.alt || "video";
  const type = video.mime_type;
  const id = video.id.toString();

  return {
    id,
    src,
    alt,
    type,
  };
};
