import ArrowIcon from "@/components/Icons/Arrow";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Heading from "../Heading";

export interface IDiscoverSlide {
  etiquette: string;
  thumbnail?: { alt: string; src: string };
  title: string;
  slug: string;
  link: string;
}

const DiscoverSlide = async (props: IDiscoverSlide) => {
  const { etiquette, thumbnail, title, link } = props;

  const t = await getTranslations("Common");

  return (
    <Link
      href={link}
      className="relative bg-transparent p-0 w-full h-full block group overflow-hidden"
    >
      {thumbnail && (
        <Image
          {...thumbnail}
          className="!relative w-full !h-[330px] lg:!h-[400px] object-cover"
          width={400}
          height={400}
          quality={95}
        />
      )}

      <div className="absolute top-0 h-full w-full bg-black/30 transition-opacity" />

      <div
        className="absolute top-0 h-full w-full opacity-0 "
        style={{
          background: `
            linear-gradient(
              205.35deg,
              rgba(55, 55, 55, 0.08) 58%,
              #020202 134.01%
            ),
            linear-gradient(
              208.35deg,
              rgba(34, 34, 34, 0.12) 75.5%,
              #020202 128.01%
            )
          `,
        }}
      />

      <div className="group absolute top-0 mt-[30px] h-[90%] w-full flex flex-col justify-between left-[30px] max-w-[260px] lg:max-w-[390px] z-[60]">
        <div
          className={cn("px-2.5 py-1 w-fit h-fit", etiquette && "bg-white/65")}
        >
          <span className="text-black uppercase text-sm font-manrope-font font-semibold">
            {etiquette || ""}
          </span>
        </div>

        <div className="w-fit mb-4 text-left">
          <Heading
            tag="h3"
            variant="28"
            className="font-normal text-white mb-5 subpixel-antialiased"
          >
            {title}
          </Heading>

          <p className="flex gap-2.5 font-manrope-font text-white uppercase font-bold transition-colors duration-150 subpixel-antialiased ">
            <ArrowIcon className="w-5 group-hover:translate-x-0.5 transition-transform duration-500" />{" "}
            <span className="group-hover:translate-x-3 group-hover:tracking-[0.3px] transition-all duration-500 gropu-hover:font-extrabold font-bold">
              {t("readNow")}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default DiscoverSlide;
