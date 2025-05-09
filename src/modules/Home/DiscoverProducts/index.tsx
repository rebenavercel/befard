import { Container, GrayBlur } from "@/components";
import CompanyText from "@/components/CompanyText";
import DiscoverSlider from "./DiscoverSlider";

import ArrowIcon from "@/components/Icons/Arrow";
import { Link } from "@/i18n/routing";
import { getFeaturedProducts } from "@/lib/api/get-featured-products";
import { getLocale, getTranslations } from "next-intl/server";

const DiscoverProducts = async () => {
  const locale = await getLocale();

  const [t, data] = await Promise.all([
    getTranslations("HomePage.Products"),
    getFeaturedProducts(locale),
  ]);

  if (!data) return null;
  const products = data?.products?.slice(0, 10) || [];

  return (
    <div className="relative">
      <GrayBlur />
      <div className="pt-[100px] bg-black">
        <Container variant="2xl" className="z-10">
          <CompanyText
            text={t("categories")}
            classNameText="text-red-own"
            classNameBorder="border-red-own"
          />
          <div className="flex justify-between items-center mb-[50px] mt-5">
            <p className="text-2xl sm:text-3xl xl:text-4xl text-white font-light">
              {t("discover")}
            </p>
            <Link
              href="/products"
              className="hidden xl:flex uppercase font-bold font-manrope-font text-white gap-2.5"
            >
              <ArrowIcon className="w-5" />
              {t("checkAll")}
            </Link>
          </div>
        </Container>
        <DiscoverSlider products={products} />
      </div>
    </div>
  );
};

export default DiscoverProducts;
