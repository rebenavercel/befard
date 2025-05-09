import { Carousel, CarouselItem } from "@/components/Carousel";
import CategorySlide from "@/components/CategorySlide";
import { IImage } from "@/types/next.types";

interface ICategorySlider {
  categories: {
    id: number;
    title: string;
    description: string;
    image: IImage;
    slug: string;
    link: string;
  }[];
}

const CategorySlider = ({ categories }: ICategorySlider) => {
  return (
    <Carousel
      opts={{
        breakpoints: {
          "(min-width: 992px)": {
            align: "start",
          },
        },
      }}
      showNav={false}
      showDots={true}
      dotsStyle="bottom-0 justify-center h-auto"
      className="pb-16 !gap-0"
      contentStyle="gap-4 ml-0 2xl:ml-1"
      containerContentStyle="md:pl-0"
    >
      {categories?.map((category) => (
        <CarouselItem
          className="max-w-[275px] basis-full 2xl:basis-[calc((100%-48px)/4)] pl-0 md:max-w-[415px]"
          key={category.id}
        >
          <CategorySlide {...category} link={category.link} />
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default CategorySlider;
