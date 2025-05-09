import Image from "next/image";
import Button from "../Button";
import { IImage } from "@/types/next.types";
import { getTranslations } from "next-intl/server";
import ArrowIcon from "@/components/Icons/Arrow";

interface INewsSlide {
  thumbnail?: IImage;
  date: string;
  title: string;
  slug: string;
}

const NewsSlide = async ({ thumbnail, date, title, slug }: INewsSlide) => {
  const t = await getTranslations("Common");

  return (
    <Button
      className="relative bg-transparent w-full h-full hover:bg-transparent hover:text-red-own normal-case p-0"
      href={`/blog/${slug}`}
    >
      {thumbnail && (
        <Image
          {...thumbnail}
          fill
          className="!relative w-full !h-[330px] lg:!h-[380px] object-cover"
          sizes="400px"
        />
      )}

      <div className="w-fit mt-5 text-left">
        <p className="text-grey-2-own uppercase text-sm font-manrope-font font-semibold">
          {date} BEFARD
        </p>
        <p className="text-xl md:text-xl mt-5 font-normal font-manrope-font text-white line-clamp-3">
          {title}
        </p>

        <p className="font-manrope-font uppercase font-bold inline-flex mt-5 gap-2.5">
          <ArrowIcon className="w-5" />
          {t("readNow")}
        </p>
      </div>
    </Button>
  );
};

export default NewsSlide;
