import { getCategoryProducts, getSubCategories } from "@/api/category";
import { Container } from "@/components";
import CategorySlide from "@/components/CategorySlide";
import PageHeader from "@/components/PageHeader";
import { IImage } from "@/types/next.types";
import { getTranslations } from "next-intl/server";
import { Key } from "react";

export default async function CategoryView({
  locale,
  slug,
  breadcrumbs,
}: {
  locale: string;
  slug: string;
  breadcrumbs?: any[];
}) {
  const [t, data, subCategories] = await Promise.all([
    getTranslations("Common"),
    getCategoryProducts(slug, locale),
    getSubCategories(slug, locale),
  ]);

  if (!data?.categories?.length && subCategories?.length) return null;

  const categoryDetails = data?.categories[0];

  return (
    <div className="">
      <PageHeader
        badge={t("categories")}
        badgeHref="/products"
        title={categoryDetails?.title}
        description={categoryDetails?.description}
        breadcrumbs={breadcrumbs as any}
      />

      <div className="space-y-20 pt-20 pb-24">
        <Container>
          <div className="w-full text-white">
            <div
              className="text-base lg:text-lg antialiased space-y-6"
              dangerouslySetInnerHTML={{
                __html: categoryDetails?.long_description || "",
              }}
            />
          </div>
        </Container>

        <Container variant="2xl" className="">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {subCategories?.subcategories?.map(
              (subcategory: {
                link: any;
                slug: Key | null | undefined;
                title: string;
                image: IImage;
              }) => {
                return (
                  <CategorySlide
                    key={subcategory.link}
                    link={subcategory.link}
                    title={subcategory.title}
                    image={subcategory.image}
                  />
                );
              }
            )}
            {categoryDetails?.products?.map((product: any) => {
              return (
                <CategorySlide
                  key={product.link}
                  link={product.link}
                  title={product.title}
                  image={product.thumbnail}
                />
              );
            })}
          </div>
        </Container>
        <Container>
          <div className="w-full text-white">
            <div
              className="text-base lg:text-lg antialiased space-y-6"
              dangerouslySetInnerHTML={{
                __html: categoryDetails?.text_under_category || "",
              }}
            />
          </div>
        </Container>
      </div>
    </div>
  );
}
