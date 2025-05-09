import { getCategories } from "@/api/category";
import { Container } from "@/components";
import CategorySlide from "@/components/CategorySlide";
import CompanyText from "@/components/CompanyText";
import Heading from "@/components/Heading";
import { getLocale, getTranslations } from "next-intl/server";
import Breadcrumbs from "@/components/Breadcrumbs";
import { DEFAULT_LOCALE } from "@/navigation";

export default async function CategoriesListView() {
  const locale = await getLocale();
  const [t, tCategories, data] = await Promise.all([
    getTranslations("Common"),
    getTranslations("Categories"),
    getCategories(locale),
  ]);

  if (!data) return null;

  return (
    <div className="py-20 md:pt-[110px]">
      <Container variant="2xl" className="z-10 mt-5">
        <Breadcrumbs
          items={[
            {
              label: t("homepage"),
              href: locale !== DEFAULT_LOCALE ? `/${locale}` : "/",
            },
            {
              label: t("products"),
              href: "/products",
            },
          ]}
        />
      </Container>

      <Container variant="2xl" className="mt-8">
        <CompanyText
          text={t("categories")}
          classNameText="text-red-own"
          classNameBorder="border-red-own"
        />

        <Heading tag="h1" variant="50" className="mt-5">
          {tCategories("header_text")}
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-[50px]">
          {data?.map((category) => (
            <CategorySlide
              {...category}
              key={category.id}
              link={category.link}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
