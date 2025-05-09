import { Carousel, CarouselItem } from "@/components/Carousel";
import DiscoverSlide from "@/components/DiscoverSlide";
import { Suspense } from "react";

interface IDiscoverSlider {
  products: {
    thumbnail?: { alt: string; src: string };
    etiquette: string;
    slug: string;
    title: string;
    link: string;
  }[];
}

const DiscoverSlider = ({ products }: IDiscoverSlider) => {
  return (
    <Carousel
      showNav={false}
      showDots={true}
      dotsStyle="bottom-[-30px] justify-center"
      containerContentStyle="scroll-pl-20"
      contentStyle="ml-0"
      opts={{
        loop: true,
        align: "center",
        //breakpoints: {
        //  "(min-width: 768px)": {
        //    align: "start",
        //  },
        //},
      }}
    >
      {products?.map((product, index) => (
        <CarouselItem
          key={`${product.link}-${index}`}
          className="basis-[calc(100%-40px)] md:basis-[calc((100%-80px)/2)] sm:basis-[calc((100%-32px)/1.5)] lg:basis-[calc((100%-64px)/2.5)] xl:basis-[calc((100%-80px)/3)] 2xl:max-w-[573px] 2xl:basis-[calc(1496px/3)] pl-0"
        >
          <Suspense
            fallback={
              <div className="h-[400px] w-full bg-gray-200 animate-pulse" />
            }
          >
            <DiscoverSlide {...product} />
          </Suspense>
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default DiscoverSlider;
