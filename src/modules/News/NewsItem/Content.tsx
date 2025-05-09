import { Container, GrayBlur } from "@/components";
import { IImage } from "@/types/next.types";
import Image from "next/image";

import ArrowIcon from "@/components/Icons/Arrow";
import { getNews } from "@/api/news";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";


interface IContentList {
  layout?: "content_list";
  title?: string[];
}

interface ITextField {
  layout?: "text_field";
  content?: string;
}

interface IGallery {
  layout?: "gallery";
  gallery?: IImage[];
}

interface IRedText {
  layout?: "red_text";
  title?: string;
  content?: string;
}

interface IBigImage {
  layout?: "big_image";
  image?: IImage;
}

interface IContent {
  id: number;
  content: (
    | IContentList
    | ITextField
    | IGallery
    | IRedText
    | IBigImage
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    | any
  )[];
  locale: string;
}

const Content = async ({ id, content, locale }: IContent) => {
  const posts = await getNews(locale, 1, id);

  const restPosts = posts?.posts && posts?.posts?.slice(1, 4);
  const t = await getTranslations("News");

  return (
    <div className="relative">
      <GrayBlur />
      <GrayBlur className="right-0 top-[50%] translate-y-[-50%]" />
      <Container
        variant="2xl"
        className="flex md:flex-row flex-col pt-[30px] xl:pt-[100px] gap-[50px] md:gap-[70px] xl:gap-[130px] z-10"
      >
        <div className="w-full md:w-2/3">
          <div>
            {content?.map((item, index) => {
              if (item.layout === "content_list") {
                return (
                  <div
                    className="border-b-[1px] border-grey-2-own pb-10"
                    key={index}
                  >
                    <p className="text-white text-xl md:text-[30px]">
                      {t("contentText")}
                    </p>
                    <div className="flex flex-col gap-8 mt-[30px]">
                      {item?.content?.map(
                        (item: { id: number; title: { content: string } }) => (
                          <div key={item.id} className="flex gap-5">
                            <div className="flex-none text-white font-manrope-font border-[1px] border-white rounded-full h-[25px] w-[25px] text-center">
                              {item.id}
                            </div>
                            <div className="text-white text-sm md:text-base">
                              {item?.title?.content}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                );
              }

              if (item.layout === "text_field") {
                return (
                  <div className="mt-10 md:mt-16" key={index}>
                    <div
                      className="text-white blog-content"
                      dangerouslySetInnerHTML={{
                        __html: item?.content || "",
                      }}
                    />
                  </div>
                );
              }

              if (item.layout === "gallery") {
                return (
                  <div
                    className="grid grid-cols-2 md:grid-cols-3 gap-5"
                    key={index}
                  >
                    {item?.gallery?.map(
                      (item: { id: number; image: IImage }) => (
                        <div key={item.id}>
                          <Image
                            {...item.image}
                            fill
                            className="!relative object-cover w-full h-full"
                            sizes="300px"
                          />
                        </div>
                      ),
                    )}
                  </div>
                );
              }

              if (item.layout === "red_text") {
                return (
                  <div className="mt-[50px]" key={index}>
                    <p className="text-white text-xl md:text-[30px]">
                      {item?.title}
                    </p>
                    <p className="bg-red-own p-[33px] md:p-[44px] text-white mt-[30px]">
                      {item?.content}
                    </p>
                  </div>
                );
              }

              if (item.layout === "big_image") {
                return (
                  <div className="mt-[50px]" key={index}>
                    {item?.image && (
                      <Image
                        fill
                        {...item?.image}
                        className="!relative object-cover max-h-[700px]"
                        sizes="800px"
                      />
                    )}
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <p className="text-white text-xl md:text-[30px]">{t("seeMore")}</p>
          <div className="w-full flex flex-col gap-10 self-center mt-[30px]">
            {restPosts?.map((post) => (
              <Link
                href={post.slug || "#"}
                className="border-b-[1px] border-grey-2-own pb-5 group"
                key={post.id}
              >
                <p className="font-manrope-font text-white line-clamp-2 font-semibold">
                  {post.title}
                </p>
                <p className="w-fit relative mt-5 font-manrope-font text-grey-2-own uppercase flex font-bold gap-5 text-sm">
                  <span className="after:absolute after:w-1 after:rounded-full after:bg-grey-2-own after:h-1 after:ml-2 after:top-[50%] after:translate-y-[-50%]">
                    {post.date}
                  </span>
                  <span>Befard</span>
                </p>
                <p className="group-hover:text-red-own text-sm uppercase font-bold font-manrope-font text-white pt-5 flex gap-2.5">
                  <ArrowIcon className="w-5" /> {t("readMore")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Content;
