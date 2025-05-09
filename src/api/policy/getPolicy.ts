import { getPageData } from "../api";


export const getPolicy = async (slug: string = "privacy", locale: string) => {
  const response = await getPageData(slug, locale);

  const policyPageDataACF = response?.[0]?.acf;

  return {
    text: policyPageDataACF?.tresc,
  };
};
