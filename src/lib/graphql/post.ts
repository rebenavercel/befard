import { POST_TYPE_SEO_FRAGMENT } from "@/lib/graphql/fragments/seo";

export const GET_POST_QUERY = /* GraphQL */ `
  query GetPostSEO($uri: ID!) {
    post(id: $uri, idType: URI) {
      id
      title
      slug
      uri
      acfPost {
        thumbnail {
          node {
            mediaItemUrl
          }
        }
        postImage {
          node {
            mediaItemUrl
          }
        }
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
      seo {
        ...PostTypeSEOFragment
      }
    }
  }
  ${POST_TYPE_SEO_FRAGMENT}
`;
