import { Container, GrayBlur } from "@/components";

import { Link } from "@/i18n/routing";
import { IImage } from "@/types/next.types";
import Image from "next/image";
import ArrowIcon from "@/components/Icons/Arrow";
import TimeIcon from "@/components/Icons/Time";
import { useTranslations } from "next-intl";
import { IMAGE_PLACEHOLDER, BLUR_PLACEHOLDER } from "@/shared/placeholder";


interface IHeader {
  posts: {
    id: number;
    post_image?: IImage;
    title?: string;
    date?: string;
    slug?: string;
  }[];
}

const BlogHeader = ({ posts }: IHeader) => {
  const firstPost = posts[0];
  const restPosts = posts?.slice(1, 4);
  const t = useTranslations("Common");

  return (
    <div className="bg-black mt-16 relative">
      <GrayBlur className="right-0 top-[50%] translate-y-[-50%]" />
      <Container variant="2xl" className="z-10">
        <div className="flex flex-col sm:flex-row gap-[30px] md:gap-[80px]">
          <Link
            href={firstPost?.slug || "#"}
            className="relative w-full sm:w-2/3 inline-block group"
          >
            {/*{firstPost?.post_image && (*/}
            <Image
              src={firstPost.post_image?.src || IMAGE_PLACEHOLDER}
              blurDataURL={BLUR_PLACEHOLDER}
              alt={firstPost.post_image?.alt || firstPost.title || ""}
              placeholder="blur"
              className="!relative object-cover !h-[300px] sm:!h-[600px] "
              fill
              sizes="800px"
            />
            {/*)}*/}

            <div
              className="absolute top-0 h-full w-full"
              style={{
                background:
                  "linear-gradient(244.35deg, rgba(44, 44, 44, 0.36) 45.5%, #020202 137.01%)",
              }}
            ></div>
            <div className="absolute bottom-6 lg:bottom-[50px] left-5 lg:left-10">
              <h3 className="text-lg sm:text-[30px] font-bold max-w-[300px] sm:max-w-[500px] text-white line-clamp-2 sm:line-clamp-3 sm:leading-[40px]">
                {firstPost?.title}
              </h3>
              <div className="text-sm sm:text-base w-fit relative mt-5 font-manrope-font text-grey-light-own uppercase flex gap-5">
                <div className="flex gap-2 items-center">
                  <TimeIcon className="!size-3" />

                  <time className="after:absolute after:w-1 after:rounded-full after:bg-white after:h-1 after:ml-2 after:top-[50%] after:translate-y-[-50%]">
                    {firstPost?.date}
                  </time>
                </div>

                <span>Befard</span>
              </div>
              <p className="group-hover:text-red-own text-sm uppercase font-bold font-manrope-font text-white pt-5 flex gap-2.5">
                <ArrowIcon className="w-5" /> {t("readNow")}
              </p>
            </div>
          </Link>
          <div className="w-full sm:w-1/3 flex flex-col gap-10 self-center">
            {restPosts?.map((post) => (
              <Link
                href={post.slug || "#"}
                className="border-b-[1px] border-grey-2-own pb-5 group"
                key={post.id}
              >
                <h3 className="font-manrope-font text-white line-clamp-2 font-semibold">
                  {post.title}
                </h3>
                <div className="w-fit relative mt-5 font-manrope-font text-grey-2-own uppercase flex font-bold gap-5 text-sm">
                  <div className="flex gap-2 items-center">
                    <TimeIcon className="!size-3" />

                    <time className="after:absolute after:w-1 after:rounded-full after:bg-white after:h-1 after:ml-2 after:top-[50%] after:translate-y-[-50%]">
                      {firstPost.date}
                    </time>
                  </div>
                  <span>Befard</span>
                </div>
                <p className="group-hover:text-red-own text-sm uppercase font-bold font-manrope-font text-white pt-5 flex gap-2.5">
                  <ArrowIcon className="w-5" /> {t("readNow")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BlogHeader;
