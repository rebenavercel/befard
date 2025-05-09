import { getImageTextBlock } from "@/api/common";
import { Container, GrayBlur } from "@/components";
import Button from "@/components/Button";
import CompanyText from "@/components/CompanyText";
import ArrowIcon from "@/components/Icons/Arrow";
import Image from "next/image";

interface IImageTextBlock {
  locale: string;
  slug: string;
}

const ImageTextBlock = async ({ locale, slug }: IImageTextBlock) => {
  const data = await getImageTextBlock(slug, locale);

  if (!data) return null;

  const { header, header_title, image, description, button } = data;

  return (
    <div
      className="mt-16 pt-20 md:pt-[140px] bg-black relative"
      style={{
        background:
          "url('/images/bg-line.svg'); linear-gradient(0deg, #3D3D3D 0%, #1E1E1E 100%)",
        //background: `linear-gradient(0deg, #3D3D3D 0%, #1E1E1E 100%);`,
        backgroundPosition: "left 100px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <GrayBlur className="top-[23%] right-[20%]" />

      <Container
        variant="2xl"
        className="flex flex-col-reverse lg:flex-row gap-5 md:gap-10 xl:gap-[80px] z-10"
      >
        <div className="w-full lg:w-1/2 content-center">
          {header && (
            <CompanyText
              text={header}
              classNameText="text-red-own"
              classNameBorder="border-red-own"
            />
          )}

          {header_title && (
            <div
              className="text-2xl sm:text-3xl xl:text-4xl text-white font-light mt-5"
              dangerouslySetInnerHTML={{
                __html: header_title || "",
              }}
            />
          )}

          <div
            className="text-white pt-[30px] font-manrope-font font-light"
            dangerouslySetInnerHTML={{
              __html: description || "",
            }}
          />
          {button?.button_title && (
            <Button
              href={button?.address_url}
              className="inline-flex antialiased items-center mt-5 lg:mt-[30px] gap-2.5"
            >
              <ArrowIcon className="w-5" /> {button?.button_title}
            </Button>
          )}
        </div>
        <div className="w-full lg:w-1/2 flex md:hidden lg:flex">
          {image && (
            <Image {...image} className="!relative" fill sizes="600px" />
          )}
        </div>
      </Container>
    </div>
  );
};

export default ImageTextBlock;
