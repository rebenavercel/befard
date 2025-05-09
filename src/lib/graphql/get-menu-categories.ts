export const GET_MENU_CATEGORIES_QUERY = /* GraphQL */ `
  query GetMenuCategories($language: LanguageCodeFilterEnum!) {
    customProductCategories(where: { parent: 0, language: $language }) {
      nodes {
        id
        name
        slug
        link
        acfKategorieProduktow {
          kolejnosc
          image {
            node {
              id
              title
              att: altText
              src: mediaItemUrl
            }
          }
        }
        children {
          nodes {
            id
            name
            slug
            link
            acfKategorieProduktow {
              kolejnosc
              image {
                node {
                  id
                  title
                  alt: altText
                  src: mediaItemUrl
                }
              }
            }
          }
        }
        products {
          nodes {
            id
            title
            slug
            link
            acfProduct {
              thumbnail {
                node {
                  id
                  title
                  alt: altText
                  src: sourceUrl
                }
              }
            }
          }
        }
      }
    }
  }
`;
