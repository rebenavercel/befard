import { Container } from "@/components";

import { IImage } from "@/types/next.types";
import Image from "next/image";
import { IMAGE_PLACEHOLDER } from "@/shared/placeholder";

interface IHeader {
  title: string;
  date: string;
  post_image?: IImage;
}

const Header = ({ title, date, post_image }: IHeader) => {
  return (
    <div className="relative mt-7">
      {/*{post_image && (*/}
        <Image
          fill
          className="!relative w-full !h-[300px] md:!h-[640px] lg:!h-[700px] object-cover"
          src={post_image?.src || IMAGE_PLACEHOLDER}
          alt={post_image?.alt || title}
          sizes="(max-width: 500px) 500px, (max-width: 767px) 750px, (max-width: 1024px) 950px, 1500px"
        />
      {/*)}*/}

      <div
        className="absolute top-0 h-full w-full"
        style={{
          background:
            "linear-gradient(244.35deg, rgba(44, 44, 44, 0.36) 45.5%, #020202 137.01%)",
        }}
      ></div>
      <Container
        className="relative"
        variant="2xl"
        containerStyle="h-full absolute w-full top-0"
      >
        <div className="absolute bottom-10 md:bottom-20 xl:bottom-28 max-w-[300px] md:max-w-[600px] xl:max-w-[900px]">
          <div
            className="font-light text-white text-lg md:text-4xl lg:text-5xl md:leading-[60px] lg:leading-[90px] pt-5 line-clamp-5"
            dangerouslySetInnerHTML={{
              __html: title || "",
            }}
          />
          <p className="mt-2 md:mt-10 w-fit relative font-manrope-font text-grey-light-own uppercase flex font-bold gap-5">
            <span className="after:absolute after:w-1 after:rounded-full after:bg-grey-2-own after:h-1 after:ml-2 after:top-[50%] after:translate-y-[-50%]">
              {date}
            </span>
            <span>Befard</span>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Header;
