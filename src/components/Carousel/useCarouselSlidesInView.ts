import { useCallback, useEffect, useState } from "react";

import type { CarouselApi } from "@/components/Carousel";

export const useCarouselSlidesInView = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  const updateSlidesInView = useCallback((emblaApi: CarouselApi) => {
    setSlidesInView((slidesInView) => {
      if (!emblaApi) return [];
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off("slidesInView", updateSlidesInView);
      }
      const inView = emblaApi
        .slidesInView()
        .filter((index) => !slidesInView.includes(index));
      return slidesInView.concat(inView);
    });
  }, []);

  useEffect(() => {
    if (!api) return;

    updateSlidesInView(api);
    api.on("slidesInView", updateSlidesInView);
    api.on("reInit", updateSlidesInView);
  }, [api, updateSlidesInView]);

  return {
    api,
    setApi,
    slidesInView,
  };
};
