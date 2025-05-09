import { createImageData } from "@/shared/media";
import { getPageData } from "../api";
import { WordpressImage } from "@/types/wordpress.types";


export const getTeam = async (locale: string) => {
  const response = await getPageData("contact", locale);

  const contactPageDataACF = response?.[0]?.acf;

  return {
    title: contactPageDataACF?.team?.title,
    persons:
      contactPageDataACF?.team?.persons &&
      contactPageDataACF?.team?.persons?.map(
        (
          person: {
            name_surname: string;
            telephone: string;
            email: string;
            image: WordpressImage & {
              sizes: { [key: string]: string };
            };
          },
          index: number,
        ) => ({
          id: index,
          name_surname: person?.name_surname,
          telephone: person?.telephone,
          email: person?.email,
          image: person?.image && createImageData(person?.image),
          smallImage: person?.image?.sizes,
        }),
      ),
  };
};
