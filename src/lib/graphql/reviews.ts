export const REVIEWS_QUERY = /* GraphQL */ `
  query Reviews($language: LanguageCodeFilterEnum!) {
    reviewsPage(language: $language) {
      acfReviews {
        reviews {
          person
          description
        }
      }
    }
  }
`;
