import { getSingleNews } from "@/api/news";
import { Skeleton } from "@/components/Skeleton";
import { Content, Header } from "@/modules/News/NewsItem";
import { setRequestLocale } from "next-intl/server";
import { Suspense, lazy } from "react";
import { notFound } from "next/navigation";
import { getPostMetadata } from "@/lib/seo";
import { getPost } from "@/lib/api/get-post";
import { Container } from "@/components";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPostBreadcrumbs } from "@/lib/breadcrumbs";


const TranslationLinks = lazy(() => import("@/components/Translation"));

type TParams = {
  params: Promise<{ slug: string; locale: string }>;
};


export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: TParams) {
  const { slug, locale } = await params;
  const data = await getPost(slug, locale);

  return getPostMetadata(data, locale);
}

export default async function SingleNewsPage({ params }: TParams) {
  const { slug, locale } = await params;
  const data = await getSingleNews(slug, locale);
  const post = await getPost(slug, locale);

  setRequestLocale(locale);

  if (!data) notFound();

  const { id, title, date, post_image, content } = data;
  const breadcrumbs = await getPostBreadcrumbs(locale, slug, title);

  return (
    <>
      <Suspense fallback={null}>
        <TranslationLinks translationLinks={post.translations} />
      </Suspense>
      <Container variant="2xl" className="mt-5 z-10">
        <Breadcrumbs items={breadcrumbs} />
      </Container>
      <Header title={title} date={date} post_image={post_image} />
      <Suspense
        fallback={<Skeleton className="w-full h-[600px] lg:h-[800px]" />}
      >
        <Content id={id} content={content} locale={locale} />
      </Suspense>
    </>
  );
}
