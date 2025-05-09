export const GET_DISCOVERED_PRODUCTS = /* GraphQL */ `
  query DiscoveredProducts($language: LanguageCodeFilterEnum!) {
    customProductCategories(first: 100, where: { language: $language }) {
      nodes {
        products {
          nodes {
            title
            uri
            link
            acfProduct {
              kolejnosc
              etiquette
              thumbnail {
                node {
                  id
                  altText
                  mediaItemUrl
                  title
                }
              }
              header {
                productTitle
              }
            }
          }
        }
      }
    }
  }
`;
