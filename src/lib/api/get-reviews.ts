import "server-only";

import { cache } from "react";
import { fetcher } from "@/lib/fetcher";
import { REVIEWS_QUERY } from "@/lib/graphql/reviews";

interface Review {
  person: string;
  description: string;
}

interface ReviewResponse extends Review {
  id: number;
}

interface ReviewsQueryResponse {
  reviewsPage: {
    acfReviews: {
      reviews: Review[];
    };
  };
}

interface ReviewsData {
  reviews?: ReviewResponse[];
}

export const getReviews = cache(
  async (locale: string): Promise<ReviewsData | null> => {
    try {
      const data = await fetcher<ReviewsQueryResponse>({
        query: REVIEWS_QUERY,
        variables: {
          language: locale.toUpperCase(),
        },
      });

      const reviews = data?.reviewsPage?.acfReviews?.reviews?.map(
        (review, index) => ({
          id: index + 1,
          ...review,
        }),
      );

      return { reviews };
    } catch (error) {
      console.error("Error")
      return null;
    }
  },
);
