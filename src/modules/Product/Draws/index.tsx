import { getDraws } from "@/api/product";
import { Container } from "@/components";
import { Carousel, CarouselItem } from "@/components/Carousel";
import CompanyText from "@/components/CompanyText";
import { IImage } from "@/types/next.types";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Heading from "@/components/Heading";

import { Dialog } from "@/components/Modal/Dialog";

interface IDraws {
  locale: string;
  slug: string;
}

const Draws = async ({ locale, slug }: IDraws) => {
  const [data, t] = await Promise.all([
    getDraws(locale, slug),
    getTranslations("Product"),
  ]);

  if (!data) return null;
  const { images, prefix_title } = data;
  if (!images?.length) return null;
  return (
    <Container variant="2xl" className="mt-10 md:mt-[100px]">
      <div>
        <CompanyText
          text={prefix_title}
          classNameText="text-red-own"
          classNameBorder="border-red-own"
        />
        {/*<p className="text-2xl lg:text-4xl text-white mt-5">*/}
        {/*  {t("technicalImages")}*/}
        {/*</p>*/}

        <Heading tag="h2" variant="44" className="mt-5">
          {t("technicalImages")}
        </Heading>
      </div>

      <div className="mt-[30px]">
        <Carousel
          showNav={false}
          showDots={true}
          dotsStyle="bottom-[-30px] justify-center"
          contentStyle="ml-0"
        >
          {images &&
            images?.map((image: IImage, index: number) => (
              <CarouselItem
                className="max-w-[200px] md:max-w-[270px] pl-0 pr-4 "
                key={index}
              >
                <Dialog
                  trigger={
                    <Image
                      {...image}
                      fill
                      className="!relative !w-[200px] !h-[200px] md:!w-[270px] md:!h-[270px] object-cover cursor-pointer"
                      sizes="300px"
                    />
                  }
                >
                  <Image {...image} fill className="!relative  object-cover" />
                </Dialog>
              </CarouselItem>
            ))}
        </Carousel>
      </div>
    </Container>
  );
};

export default Draws;
