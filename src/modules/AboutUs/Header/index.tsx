import { Container } from "@/components";
import Button from "@/components/Button";
import CompanyText from "@/components/CompanyText";
import ArrowIcon from "@/components/Icons/Arrow";
import { getLocale, getTranslations } from "next-intl/server";
import { getHeader } from "@/api/about-us";
import Image from "next/image";
import Heading from "@/components/Heading";
import { IMAGE_PLACEHOLDER, BLUR_PLACEHOLDER } from "@/shared/placeholder";


type TProps = {
  slug: string;
};

export default async function AboutUsHero({ slug = "about-us" }: TProps) {
  const locale = await getLocale();
  const [t, data] = await Promise.all([
    getTranslations("AboutUs"),
    getHeader(slug, locale),
  ]);

  if (!data) return null;

  const { header, text_section } = data;

  return (
    <div
      className="relative"
      style={{
        backgroundImage: `url('/images/about-us-lines.svg')`,
        //background: `linear-gradient(0deg, #3D3D3D 0%, #1E1E1E 100%);`,
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <Container
        variant="2xl"
        className="mt-16 flex flex-col-reverse md:flex-row gap-10 md:gap-20 xl:gap-[100px] z-10"
      >
        <div className="w-full md:w-1/2 xl:w-1/3 flex flex-col justify-center">
          <CompanyText
            text="Befard"
            classNameText="text-red-own"
            classNameBorder="border-red-own"
          />

          <Heading tag="h1" variant="50" className="mt-5">
            {header?.header}
          </Heading>

          <div
            className="text-sm md:text-base text-white mt-[30px] space-y-6"
            dangerouslySetInnerHTML={{
              __html: header?.description || "",
            }}
          />

          <Button
            className="mt-8 text-sm lg:text-base inline-flex gap-2.5 items-center w-fit"
            href="/products"
          >
            <ArrowIcon className="w-5" /> {t("ourProducts")}
          </Button>
        </div>
        <div className="w-full md:w-1/2 xl:w-2/3 mt-5 md:mt-10">
          <Image
            alt={header?.image?.alt || ""}
            src={header?.image?.src || IMAGE_PLACEHOLDER}
            className="!relative object-cover max-h-[600px]"
            width={930}
            height={600}
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            sizes="800px"
          />
        </div>
      </Container>

      <Container variant="2xl" className="mt-10 md:mt-32">
        <div className="border-x border-dark-grey-own">
          <Container className="z-10">
            <div
              className="text-sm md:text-[30px] text-white leading-[24px] md:leading-[40px]"
              dangerouslySetInnerHTML={{
                __html: text_section || "",
              }}
            />
          </Container>
        </div>
      </Container>
    </div>
  );
}
