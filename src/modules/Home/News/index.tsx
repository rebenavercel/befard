import { Container } from "@/components";
import NewsSlider from "./NewsSlider";
import CompanyText from "@/components/CompanyText";
import { getNews } from "@/api/news";
import { getLocale, getTranslations } from "next-intl/server";

import ArrowIcon from "@/components/Icons/Arrow";
import { Link } from "@/i18n/routing";
import Heading from "@/components/Heading";

const News = async () => {
  const locale = await getLocale();
  const [t, data] = await Promise.all([
    getTranslations("HomePage.News"),
    getNews(locale, 1),
  ]);

  if (!data || data?.posts?.length === 0) return null;

  return (
    <div className="pt-10 bg-black">
      <Container variant="2xl" className="z-10">
        <CompanyText
          tag="h2"
          text={t("blog")}
          classNameText="text-red-own"
          classNameBorder="border-red-own"
        />
        <div className="flex justify-between items-center mb-[50px] mt-5">
          <Heading
            dangerouslySetInnerHTML={{
              __html: t.markup("header", {
                red: (chunks) => `<span class="text-red-own">${chunks}</span>`,
              }),
            }}
          />
          {/*<div*/}
          {/*  className="text-2xl sm:text-3xl xl:text-4xl text-white font-light"*/}
          {/*  dangerouslySetInnerHTML={{*/}
          {/*      __html: t.markup("header", {*/}
          {/*      red: (chunks) => `<span class="text-red-own">${chunks}</span>`,*/}
          {/*    }),*/}
          {/*  }}*/}
          {/*/>*/}
          <Link
            href="/blog"
            className="hidden xl:flex uppercase font-bold font-manrope-font text-white gap-2.5"
          >
            <ArrowIcon className="w-5" />
            {t("allNews")}
          </Link>
        </div>
        <NewsSlider posts={data?.posts} />
      </Container>
    </div>
  );
};

export default News;
