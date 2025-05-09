import { getAboutSection } from "@/api/common";
import { Container, GrayBlur } from "@/components";
import Button from "@/components/Button";
import CompanyText from "@/components/CompanyText";
import Image from "next/image";
import ArrowIcon from "@/components/Icons/Arrow";


export default async function AboutUsSection({ slug }: { slug: string }) {
  const data = await getAboutSection(slug);

  if (!data) return null;

  const { header, header_title, image, description, button, tiles } = data;

  return (
    <div className="relative">
      <GrayBlur className="top-[10px] right-0" />
      <div className="pt-10 md:pt-[100px] bg-black">
        <Container variant="2xl" className="z-10">
          {header && (
            <CompanyText
              text={header}
              classNameText="text-red-own"
              classNameBorder="border-red-own"
            />
          )}

          <div className="flex flex-col xl:flex-row gap-5 md:gap-10 xl:gap-[80px] mt-5">
            <div className="w-full xl:w-1/2">
              <div>
                <h2
                  className="text-2xl sm:text-3xl xl:text-4xl text-white font-light"
                  dangerouslySetInnerHTML={{
                    __html: header_title || "",
                  }}
                />
              </div>
              <div className="flex md:hidden xl:flex">
                {image && (
                  <Image
                    {...image}
                    className="!relative mt-5 xx xl:mt-[50px]"
                    fill
                    sizes="600px"
                  />
                )}
              </div>
            </div>
            <div className="w-full xl:w-1/2 flex flex-col gap-[50px] justify-between">
              <div>
                {description && (
                  <div
                    className="text-white font-manrope-font text-sm md:text-base [&_p]:mb-6 font-light"
                    dangerouslySetInnerHTML={{
                      __html: description || "",
                    }}
                  />
                )}
                {button?.button_title && (
                  <Button
                    href={button?.address_url}
                    className="inline-flex text-base mt-5 lg:mt-[30px] gap-2.5 items-center"
                  >
                    <ArrowIcon className="h-5 w-5" />
                    {button?.button_title}
                  </Button>
                )}
              </div>
              {tiles && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-[50px] mb-5">
                  {tiles?.map(
                    (tile: {
                      title: string;
                      description: string;
                      id: number;
                    }) => (
                      <div
                        className="relative after:absolute after:border-b-[1px] after:w-[20px] after:border-red-own after:bottom-[-20px] after:left-0"
                        key={tile.id}
                      >
                        <p className="text-3xl lg:text-[50px] text-red-own font-light mb-2 lg:mb-4">
                          {tile?.title}
                        </p>
                        <p className="font-manrope-font text-white font-semibold">
                          {tile?.description}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
