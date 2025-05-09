import Image from "next/image";
import { useCallback, useState } from "react";

type PropType = {
  imgSrc: string;
  inView: boolean;
  index: number;
};

const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`;

export const LazyLoadImage: React.FC<PropType> = (props) => {
  const { imgSrc, inView } = props;
  const [hasLoaded, setHasLoaded] = useState(false);

  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true);
  }, [inView, setHasLoaded]);

  return (
    <>
      {!hasLoaded && <div>xdxd</div>}
      <Image
        className="!relative w-full !h-[640px] lg:!h-[900px] object-cover"
        onLoad={setLoaded}
        src={inView ? imgSrc : PLACEHOLDER_SRC}
        alt="Your alt text"
        data-src={imgSrc}
        fill
        sizes="(max-width: 500px) 500px, (max-width: 767px) 750px, (max-width: 1024px) 950px, 1500px"
      />
    </>
  );
};
