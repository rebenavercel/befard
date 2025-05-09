import { getPageData } from "../api";
import { getGlobalSettings } from "@/lib/api/get-general-settings";


export const getHeader = async (locale: string) => {
  const response = await getPageData("contact", locale);
  const general = await getGlobalSettings(locale);
  const contactPageDataACF = response?.[0]?.acf;

  return {
    general: {
      street: general?.street,
      city: general?.city,
      country: general?.country,
      open_days: general?.open_days,
      open_hours: general?.open_hours,
      telephone_number: general?.telephone_number,
      email: general?.email,
    },
    title: contactPageDataACF?.title,
    description: contactPageDataACF?.opis,
  };
};
