import { IImage } from "@/types/next.types";
import Image from "next/image";

import ArrowIcon from "@/components/Icons/Arrow";
import { Link } from "@/i18n/routing";

interface ITile {
  thumbnail?: IImage;
  title?: string;
  date?: string;
  slug?: string;
}

const Tile = (props: ITile) => {
  const { thumbnail, title, date, slug } = props;
  return (
    <Link className="flex flex-col group" href={`/blog/${slug}` || "#"}>
      {thumbnail && (
        <Image
          {...thumbnail}
          className="!relative !h-[280px] md:!h-[340px] object-cover"
          fill
          sizes="330px"
        />
      )}
      <div className="mt-5 flex flex-col gap-4">
        <p className="text-sm md:text-base w-fit relative font-manrope-font text-grey-2-own uppercase flex font-bold gap-5">
          <span className="after:absolute after:w-1 after:rounded-full after:bg-grey-2-own after:h-1 after:ml-2 after:top-[50%] after:translate-y-[-50%]">
            {date}
          </span>
          <span>Befard</span>
        </p>
        <p className="font-manrope-font font-semibold text-lg sm:text-xl text-white line-clamp-2">
          {title}
        </p>
        <p className="text-sm md:text-base group-hover:text-red-own uppercase font-manrope-font font-bold text-white flex gap-2.5">
          <ArrowIcon className="w-5" /> Read now
        </p>
      </div>
    </Link>
  );
};

export default Tile;
