import { getPageData } from "../api";

export const getReviews = async (slug: string, locale: string) => {
  const response = await getPageData(slug, locale);

  const reviewsDataACF = response[0]?.acf?.reviews;

  return {
    reviews:
      reviewsDataACF &&
      reviewsDataACF?.map(
        (review: { person: string; description: string }, index: number) => ({
          id: index,
          person: review?.person,
          description: review?.description,
        })
      ),
  };
};
