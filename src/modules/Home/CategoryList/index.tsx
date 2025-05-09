import { Container, GrayBlur } from "@/components";
import CategorySlider from "./CategorySlider";
import CompanyText from "@/components/CompanyText";
import { getLocale, getTranslations } from "next-intl/server";
import { getCategories } from "@/api/category";

import ArrowIcon from "@/components/Icons/Arrow";
import { Link } from "@/i18n/routing";
import Heading from "@/components/Heading";

const CategoryList = async () => {
  const locale = await getLocale();

  const [t, data] = await Promise.all([
    getTranslations("HomePage.Category"),
    getCategories(locale),
  ]);

  if (!data) return null;

  return (
    <div className="relative">
      <GrayBlur />
      <div className="pt-[100px] bg-black ">
        <Container variant="2xl" className="z-10">
          <CompanyText
            text={t("categories")}
            classNameText="text-red-own"
            classNameBorder="border-red-own"
          />
          <div className="flex justify-between items-center mb-[50px] pt-5">
            <Heading
              dangerouslySetInnerHTML={{
                __html: t.markup("header", {
                  red: (chunks) =>
                    `<span class="text-red-own">${chunks}</span>`,
                }),
              }}
            />

            <Link
              href="/products"
              className="hidden xl:flex uppercase font-bold font-manrope-font text-white gap-2.5"
            >
              <ArrowIcon className="w-5" />
              {t("checkAll")}
            </Link>
          </div>
        </Container>

        <div className="z-10 w-full max-w-full px-0 mx-auto xl:max-w-screen-2xl 2xl:px-5">
          <CategorySlider categories={data || []} />
        </div>
        <Container variant="2xl" className="z-10">
          <div className="mt-20 flex justify-center md:hidden">
            <Link
              href="/products"
              className="uppercase font-bold font-manrope-font text-white flex gap-2.5"
            >
              <ArrowIcon className="w-5" />
              {t("checkAll")}
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CategoryList;
