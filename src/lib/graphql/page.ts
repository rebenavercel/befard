import { POST_TYPE_SEO_FRAGMENT } from "@/lib/graphql/fragments/seo";

export const GET_PAGE_QUERY = /* GraphQL */ `
  query GetPageSEO($uri: ID!) {
    page(id: $uri, idType: URI) {
      id
      title
      slug
      uri
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
      seo {
        ...PostTypeSEOFragment
      }
    }
  }
  ${POST_TYPE_SEO_FRAGMENT}
`;
