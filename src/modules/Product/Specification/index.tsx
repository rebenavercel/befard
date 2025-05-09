import { getProductSpecification } from "@/api/product";
import { Container, GrayBlur } from "@/components";
import CompanyText from "@/components/CompanyText";
import { Link } from "@/i18n/routing";
import ArrowIcon from "@/components/Icons/Arrow";
import { getTranslations } from "next-intl/server";
import Heading from "@/components/Heading";
import Message from "@/components/Icons/Message";
import Contact from "@/components/Icons/Contact";
import { getGlobalSettings } from "@/lib/api/get-general-settings";

interface ISpecification {
  locale: string;
  slug: string;
}

const Specification = async ({ locale, slug }: ISpecification) => {
  const [t, data, generalContent] = await Promise.all([
    getTranslations("Product"),
    getProductSpecification(locale, slug),
    getGlobalSettings(locale),
  ]);

  if (!data) return null;

  const { tiles, relation_items, prefix_title } = data;

  return (
    <div className="relative">
      <GrayBlur className="top-[230px] right-0" />
      <Container
        variant="2xl"
        className="mt-20 md:mt-[100px] gap-[50px] md:gap-[100px] flex flex-col md:flex-row z-10"
      >
        <div className="w-full md:w-1/2 lg:w-2/3">
          <CompanyText
            text={prefix_title}
            classNameText="text-red-own"
            classNameBorder="border-red-own"
          />

          <Heading className="mt-5">{t("specification")}</Heading>

          <div className="text-white mt-[30px]">
            <div
              className="blog-content overflow-auto"
              dangerouslySetInnerHTML={{
                __html: tiles || "",
              }}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <Heading className="mt-5">{t("seeAlso")}</Heading>

          <div className="mt-[30px] flex flex-col gap-10">
            {relation_items &&
              relation_items?.map(
                (item: { id: number; title: string; address_url: string }) => (
                  <Link
                    key={item.id}
                    href={item?.address_url}
                    className="border-b-[1px] border-grey-2-own pb-5 group"
                  >
                    <p className="font-manrope-font text-white line-clamp-2 font-semibold text-lg lg:text-2xl">
                      {item?.title}
                    </p>
                    <p className="group-hover:text-red-own text-sm uppercase font-bold font-manrope-font text-white pt-5 flex gap-2.5">
                      <ArrowIcon className="w-5" /> {t("readMore")}
                    </p>
                  </Link>
                )
              )}
          </div>
          <div className="mt-5 md:mt-[50px] text-white text-lg lg:text-xl 2xl:text-2xl">
            <p className="text-white ">
              {t("moreQuestions")} <br />
              {t("contactNow")}
            </p>
            <div className="mt-5 space-y-5 font-manrope">
              <div className="flex gap-x-2 items-center">
                <Contact className="size-[18px] text-red-own" />
                <p className="text-sm md:text-base leading-none">
                  {generalContent?.telephone_number}
                </p>
              </div>
              <div className="flex gap-x-2 items-center">
                <Message className="size-[18px] text-red-own" />
                <p className="text-sm md:text-base leading-none">
                  {generalContent?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Specification;
