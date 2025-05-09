import { IImage } from "@/types/next.types";
import Image from "next/image";

import ArrowIcon from "@/components/Icons/Arrow";
import { Link } from "@/i18n/routing";
import { ClockIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { IMAGE_PLACEHOLDER, BLUR_PLACEHOLDER } from "@/shared/placeholder";


interface IBlogPostCard {
  thumbnail?: IImage;
  title?: string;
  date?: string;
  slug?: string;
  link?: string;
}

export default async function BlogPostCard(props: IBlogPostCard) {
  const { thumbnail, title, date, link } = props;
  const t = await getTranslations("Common");

  return (
    <Link
      className="relative group bg-transparent w-full h-full hover:bg-transparent hover:text-red-own normal-case p-0"
      href={link || "#"}
    >
      <div className="max-h-[260px] aspect-[330/260] lg:max-h-[346px] h-auto lg:aspect-[380/360] overflow-hidden relative">
        {/* <div className="absolute inset-0 w-full h-full bg-dark-grey-own opacity-0 group-hover:opacity-35 z-10 rounded-full transition-all duration-1000 scale-0 group-hover:scale-100" /> */}
        <Image
          src={thumbnail?.src || IMAGE_PLACEHOLDER}
          blurDataURL={BLUR_PLACEHOLDER}
          placeholder="blur"
          alt={thumbnail?.alt || title || ""}
          width={400}
          height={380}
          className="object-cover h-full scale-105 group-hover:scale-100 500 transition-all"
        />
      </div>
      <div className="mt-5 flex flex-col gap-4">
        <div className="text-sm md:text-base/[20px] items-center relative text-grey-2-own uppercase flex gap-x-1.5">
          <ClockIcon className="h-4 w-5" />
          <div className="flex gap-x-5 antialiased">
            <time
              dateTime={date}
              className="font-manrope-font font-bold after:absolute after:w-1 after:rounded-full after:bg-grey-2-own after:h-1 after:ml-2 after:top-[50%] after:translate-y-[-50%]"
            >
              {date}
            </time>
            <span className="font-manrope-font font-bold">Befard</span>
          </div>
        </div>
        <h3 className="text-base/[22px] lg:text-xl/[26px] font-semibold font-manrope-font text-white line-clamp-2">
          {title}
        </h3>
        <div className="mt-2 group hover:text-red-own uppercase font-manrope-font font-bold text-white flex gap-2.5">
          <ArrowIcon className="w-[18px] mt-px transition-all" />
          <span className="text-sm md:text-[15px] transition-all group-hover:translate-x-2 font-manrope-font group-hover:tracking-wide">
            {t("readNow")}
          </span>
        </div>
      </div>
    </Link>
  );
}
