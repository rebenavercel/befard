import { Container } from "@/components";
import { Carousel, CarouselItem } from "@/components/Carousel";
import CompanyText from "@/components/CompanyText";
import QuoteIcon from "@/components/Icons/Quote";
import { getLocale, getTranslations } from "next-intl/server";
import Heading from "@/components/Heading";
import { getReviews } from "@/api/common";

const Reviews = async () => {
  const locale = await getLocale();
  const [t, data] = await Promise.all([
    getTranslations("Reviews"),
    getReviews("opinie", locale),
  ]);

  if (!data?.reviews) return null;
  const { reviews } = data;

  return (
    <Container variant="2xl" className="mt-[100px]">
      <div>
        <CompanyText
          text="Befard"
          classNameText="text-red-own"
          classNameBorder="border-red-own"
        />
        <Heading tag="h2" variant="44" className="mt-4">
          {t("header")}
        </Heading>
      </div>
      <div className="mt-[30px]">
        <Carousel
          showNav={false}
          showDots={true}
          dotsStyle="bottom-[-30px] justify-center"
          contentStyle="ml-0"
        >
          {reviews &&
            reviews?.map(
              (review: { person: string; description: string; id: number }) => (
                <CarouselItem
                  key={review.id}
                  className="border-[1px] border-dark-grey-own p-5 pb-7 max-w-[415px] mr-4"
                >
                  <div className="flex flex-col justify-between h-full gap-5">
                    <div
                      className="antialiased text-sm lg:text-base/[20px] font-manrope-font font-medium text-white space-y-6"
                      dangerouslySetInnerHTML={{
                        __html: review?.description || "",
                      }}
                    />

                    <div className="flex items-end justify-between">
                      <p className="text-red-own">{review.person}</p>
                      <QuoteIcon className="w-[65px]" />
                    </div>
                  </div>
                </CarouselItem>
              )
            )}
        </Carousel>
      </div>
    </Container>
  );
};

export default Reviews;
