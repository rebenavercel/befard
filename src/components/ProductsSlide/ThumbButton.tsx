import { cn } from "@/lib/utils";
import { IImage } from "@/types/next.types";
import Image from "next/image";
import React from "react";

type PropType = {
  selected: boolean;

  onClick: () => void;
  image: IImage;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, onClick, image } = props;

  return (
    <div
      className={cn(
        "embla-thumbs__slide !h-[70px] !w-[70px] md:!h-[100px] md:!w-[100px]",
        selected ? " embla-thumbs__slide--selected" : "",
      )}
      onClick={onClick}
    >
      <button
        type="button"
        className="embla-thumbs__slide__number !h-[70px] !w-[70px] md:!h-[100px] md:!w-[100px]"
      >
        <Image
          {...image}
          className={cn(
            "!relative object-cover  opacity-60",
            selected && "opacity-100",
          )}
          fill
          sizes="200px"
        />
      </button>
    </div>
  );
};
