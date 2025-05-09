import Image from "next/image";

import { IImage } from "@/types/next.types";
import { Link } from "@/i18n/routing";
import Heading from "../Heading";
import { BLUR_PLACEHOLDER, IMAGE_PLACEHOLDER } from "@/shared/placeholder";
import { getTranslations } from "next-intl/server";

export interface ICategorySlide {
  title: string;
  description?: string;
  image: IImage;
  link: string;
}

const CategorySlide = async ({
  title,
  description,
  image,
  link,
}: ICategorySlide) => {
  const t = await getTranslations("Common");

  return (
    <Link
      href={link}
      className="group relative flex flex-col text-center items-center pt-[30px] md:pb-10 px-3 pb-[30px] md:px-10 bg-white h-full xl:!text-grey-2-own transition-all !text-red-own hover:opacity-90"
    >
      <div className="h-[180px] w-[180px] md:h-[260px] md:w-[250px] flex items-center bg-white justify-center ">
        <Image
          alt={image.alt || image.caption || ""}
          src={image.src || IMAGE_PLACEHOLDER}
          width={250}
          height={260}
          quality={100}
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          className="bg-white h-full object-contain w-auto"
        />
      </div>

      <div className="pt-[30px] space-y-2.5 md:space-y-3.5 lg:space-y-5">
        <Heading
          tag="h3"
          variant="28"
          className="text-red-own font-normal subpixel-antialiased"
        >
          {title}
        </Heading>

        {description && (
          <p className="text-sm md:text-base leading-tight text-black font-manrope-font line-clamp-2 font-medium">
            {description}
          </p>
        )}

        <p className="uppercase font-bold font-manrope-font text-red-own ">
          {t("checkNow")}
        </p>
      </div>
    </Link>
  );
};

export default CategorySlide;
