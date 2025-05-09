"use client";
import { Container, Video } from "@/components";
import Button from "@/components/Button";
import { Carousel, CarouselItem } from "@/components/Carousel";
import CompanyText from "@/components/CompanyText";
import { IImage, IVideo } from "@/types/next.types";
import Image from "next/image";
import ArrowIcon from "@/components/Icons/Arrow";
import { useCarouselSlidesInView } from "@/components/Carousel/useCarouselSlidesInView";
import { Skeleton } from "@/components/Skeleton";

interface IHeaderSlider {
  images: {
    id: number;
    header_title: string;
    description: string;
    button: {
      button_text: string;
      url_address: string;
    };
    image?: IImage;
    video?: IVideo;
    videoPoster?: string;
  }[];
}

const HeaderSlider = ({ images }: IHeaderSlider) => {
  const { setApi, slidesInView } = useCarouselSlidesInView();

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      className="z-10"
      showNav={false}
      showDots={true}
      setApi={(api) => setApi(api)}
    >
      {images?.map((item, index) => {
        const inView = slidesInView.indexOf(index) > -1;
        return (
          <CarouselItem key={item.id}>
            {inView ? (
              <>
                {item?.video && (
                  <Video
                    file={item?.video}
                    className="!relative w-full !h-[640px] lg:!h-[900px] object-cover"
                    poster={item?.videoPoster}
                  />
                )}
                {!item?.video && item?.image && (
                  <Image
                    className="!relative w-full !h-[640px] lg:!h-[900px] object-cover"
                    {...item?.image}
                    fill
                    priority
                    fetchPriority="high"
                    loading="eager"
                    sizes="(max-width: 500px) 400px, (max-width: 767px) 750px, (max-width: 1024px) 950px, 1100px"
                  />
                )}

                <div
                  className="absolute top-0 h-full w-full"
                  style={{
                    background:
                      "linear-gradient(244.35deg, rgba(44, 44, 44, 0.36) 45.5%, #020202 137.01%)",
                  }}
                ></div>
                <Container
                  className="pt-[180px] lg:pt-[260px] absolute top-0"
                  variant="2xl"
                >
                  <CompanyText text={item?.header_title} />

                  <div
                    className="font-light text-white text-[36px]/[1.1] lg:text-7xl/[1.15] pt-5"
                    dangerouslySetInnerHTML={{
                      __html: item?.description || "",
                    }}
                  />
                  {item?.button && (
                    <Button
                      className="mt-[60px] lg:mt-[30px] text-sm lg:text-base  inline-flex gap-2.5"
                      href={item?.button?.url_address}
                    >
                      <ArrowIcon className="w-5" />
                      {item?.button?.button_text}
                    </Button>
                  )}
                </Container>
              </>
            ) : (
              <Skeleton className="w-full !h-[640px] lg:!h-[900px]" />
            )}
          </CarouselItem>
        );
      })}
    </Carousel>
  );
};

export default HeaderSlider;
