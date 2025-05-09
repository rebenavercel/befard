import { getNews } from "@/api/news";
import Container from "@/components/Container";
import { BlogHeader, NewsList } from "@/modules/News";
import { Suspense, lazy } from "react";
import { getPage } from "@/lib/api/get-page";
import { getPageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

const TranslationLinks = lazy(() => import("@/components/Translation"));

export const runtime = "edge";

type Params = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page: string }>;
};

export async function generateMetadata({ params, searchParams }: Params) {
  const [{ locale }, { page }] = await Promise.all([params, searchParams]);
  const data = await getPage("blog", locale);
  const t = await getTranslations("News");

  data.seo.title = data.seo.title + (page ? ` - ${t("page")} ${page}` : "");

  return getPageMetadata(data, "blog", locale);
}

export default async function BlogPage({ params, searchParams }: Params) {
  const [{ locale }, { page }] = await Promise.all([params, searchParams]);
  const currentPage = (page && parseInt(page)) || 1;

  const data = await getNews(locale, 1);
  const pageData = await getPage("blog", locale);

  setRequestLocale(locale);

  if (!data) {
    notFound();
  }

  return (
    <div className="">
      <Suspense fallback={null}>
        <TranslationLinks translationLinks={pageData.translations} />
      </Suspense>
      <Suspense
        fallback={
          <Container variant="2xl" className="z-10 pt-16">
            <div className="flex flex-col sm:flex-row gap-[30px] md:gap-[80px]">
              <div className="relative w-full sm:w-2/3 inline-block">
                <div className="bg-grey-light-own animate-pulse w-full h-[300px] sm:h-[600px]" />
                <div className="absolute bottom-6 lg:bottom-[50px] left-5 lg:left-10 space-y-5 w-full max-w-[500px]">
                  <div className="h-8 sm:h-12 bg-grey-light-own animate-pulse w-5/6" />
                  <div className="h-4 sm:h-5 bg-grey-light-own animate-pulse w-1/3" />
                  <div className="h-4 bg-grey-light-own animate-pulse w-1/4 mt-5" />
                </div>
              </div>

              <div className="w-full sm:w-1/3 flex flex-col gap-10 self-center">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="border-b-[1px] border-grey-2-own pb-5 space-y-5"
                  >
                    <div className="h-5 bg-grey-light-own animate-pulse w-full" />
                    <div className="h-4 bg-grey-light-own animate-pulse w-1/2" />
                    <div className="h-4 bg-grey-light-own animate-pulse w-1/3 mt-5" />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        }
      >
        {(!page || page == "1") && <BlogHeader posts={data?.posts} />}
      </Suspense>

      <Suspense
        fallback={
          <Container variant="2xl">
            <div className="grid md:grid-cols-3 xl:grid-cols-4 py-20 gap-x-5 gap-y-10">
              {Array.from({ length: 8 }).map((_, index) => (
                <div className="space-y-5" key={index}>
                  <div className="max-h-[260px] aspect-[330/260] lg:max-h-[346px] h-auto lg:aspect-[380/360] overflow-hidden relative bg-grey-light-own animate-pulse" />
                  <div className="h-5 bg-grey-light-own animate-pulse w-1/2" />
                  <div className="space-y-2">
                    <div className="h-5 bg-grey-light-own animate-pulse w-5/6" />
                    <div className="h-5 bg-grey-light-own animate-pulse w-4/5" />
                  </div>
                  <div className="h-5 w-1/3 bg-grey-light-own animate-pulse" />
                </div>
              ))}
            </div>
          </Container>
        }
      >
        <NewsList
          locale={locale}
          page={currentPage}
          currentPage={currentPage}
        />
      </Suspense>
    </div>
  );
}
