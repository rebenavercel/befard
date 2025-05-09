import BlogPostCard from "@/components/BlogPostCard/Card";
import { Carousel, CarouselItem } from "@/components/Carousel";
import { IImage } from "@/types/next.types";
import { Suspense } from "react";

interface INewsSlider {
  posts: {
    id: number;
    slug: string;
    date: string;
    thumbnail?: IImage;
    title: string;
  }[];
}

const NewsSlider = ({ posts }: INewsSlider) => {
  return (
    <Carousel
      opts={{
        //containScroll: false,
        skipSnaps: true,
        align: "center",
        breakpoints: {
          "(min-width: 640px)": {
            align: "start",
          },
        },
      }}
      showNav={false}
      showDots={true}
      dotsStyle="bottom-0 justify-center"
      className="pb-16 !gap-0"
      contentStyle="gap-4 ml-0"
      containerContentStyle="md:pl-0"
    >
      {posts?.map((post) => (
        <CarouselItem
          className="max-w-[330px] basis-full 2xl:basis-1/4 pl-0 md:max-w-[360px]"
          key={post.id}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <BlogPostCard {...post} />
          </Suspense>
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default NewsSlider;
