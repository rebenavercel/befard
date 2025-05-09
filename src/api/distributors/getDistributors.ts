import { getPageData } from "../api";


export const getDistributors = async (
  slug: string = "distributors",
  locale: string,
) => {
  const response = await getPageData(slug, locale);

  const distributorsPageDataACF = response?.[0]?.acf;

  return {
    header_title: distributorsPageDataACF?.header_title,
    distributors: {
      section_title: distributorsPageDataACF?.distributors?.section_title,
      list:
        distributorsPageDataACF?.distributors?.distributors_list &&
        distributorsPageDataACF?.distributors?.distributors_list?.map(
          (
            item: {
              title: string;
              description: string;
              email: string;
              button: { button_title: string; address_url: string };
              google_map: string;
            },
            index: number,
          ) => ({
            id: index,
            title: item?.title,
            description: item?.description,
            email: item?.email,
            button: item?.button && {
              button_title: item?.button?.button_title,
              address_url: item?.button?.address_url,
            },
            google_map: item?.google_map,
          }),
        ),
    },
  };
};
