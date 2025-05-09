import { getSingleSubCategory } from "@/api/category";
import { Container } from "@/components";
import DiscoverSlide from "@/components/DiscoverSlide";
import PageHeader from "@/components/PageHeader";
import { getTranslations } from "next-intl/server";

export default async function SubCategoryView({
  locale,
  slug,
  subcategory,
  breadcrumbs,
}: {
  locale: string;
  slug: string;
  subcategory: string;
  breadcrumbs?: any[];
}) {
  const [t, data] = await Promise.all([
    getTranslations("Common"),
    getSingleSubCategory(slug, locale, subcategory),
  ]);

  return (
    <div className="">
      <PageHeader
        title={data?.name}
        description={data?.description}
        badge={data?.parent.name ?? t("categories")}
        badgeHref={data?.parent?.link}
        breadcrumbs={breadcrumbs as any}
      />
      <div className="space-y-20 pt-20 pb-24">
        <Container>
          <div className="w-full text-white">
            <div
              className="text-base lg:text-lg"
              dangerouslySetInnerHTML={{
                __html: data?.long_description || "",
              }}
            />
          </div>
        </Container>

        <Container variant="2xl" className="">
          <div className="grid md:grid-cols-2 xl:grid-cols-3">
            {data?.products?.map((product: any) => {
              return (
                <DiscoverSlide
                  key={product?.slug}
                  //slug={`${subcategory}/product/${product?.slug}`}
                  link={product?.link}
                  slug={product?.link}
                  title={product?.title}
                  thumbnail={product?.image}
                  etiquette={product?.etiquette}
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
                __html: data?.text_under_category || "",
              }}
            />
          </div>
        </Container>
      </div>
    </div>
  );
}
