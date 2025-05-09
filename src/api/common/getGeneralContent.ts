import { getPageData } from "../api";


export const getGeneralContent = async (locale: string) => {
  const response = await getPageData(locale, locale);

  const generalDataACF = response?.[0]?.acf;

  return {
    telephone_number: generalDataACF?.telephone_number,
    email: generalDataACF?.email,
    street: generalDataACF?.street,
    city: generalDataACF?.city,
    country: generalDataACF?.country,
    open_days: generalDataACF?.open_days,
    open_hours: generalDataACF?.open_hours,
    youtube_link: generalDataACF?.youtube_link,
    facebook_link: generalDataACF?.facebook_link,
  };
};
