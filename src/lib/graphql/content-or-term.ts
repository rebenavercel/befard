import {
  POST_TYPE_SEO_FRAGMENT,
  TERM_SEO_FRAGMENT,
} from "@/lib/graphql/fragments/seo";

export const GET_CATEGORY_OR_PRODUCT_QUERY = /* GraphQL */ `
  query GetCategoryOrProduct($productUri: String!, $categoryUri: String!) {
    product: nodeByUri(uri: $productUri) {
      isContentNode
      isTermNode
      ... on Product {
        id
        title
        slug
        uri
        acfProduct {
          thumbnail {
            node {
              mediaItemUrl
            }
          }
        }
        seo {
          ...PostTypeSEOFragment
        }
        contentTypeName
        language {
          slug
        }
        translations {
          uri
          language {
            slug
          }
        }
        customProductCategories(
          where: { orderby: TERM_GROUP, hierarchical: true }
        ) {
          nodes {
            id
            name
            slug
            uri
          }
        }
      }
    }
    category: nodeByUri(uri: $categoryUri) {
      isContentNode
      isTermNode
      ... on CustomProductCategory {
        id
        name
        slug
        uri
        parentDatabaseId
        acfKategorieProduktow {
          image {
            node {
              mediaItemUrl
            }
          }
        }
        seo {
          ...TermSEOFragment
        }
        taxonomyName
        language {
          slug
        }
        translations {
          uri
          language {
            slug
          }
        }
      }
    }
  }

  ${POST_TYPE_SEO_FRAGMENT}
  ${TERM_SEO_FRAGMENT}
`;
