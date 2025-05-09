export const POST_TYPE_SEO_FRAGMENT = /* GraphQL */ `
  fragment PostTypeSEOFragment on PostTypeSEO {
    title
    metaDesc
    canonical
    metaRobotsNoindex
    metaRobotsNofollow
    breadcrumbs {
      url
      text
    }
    focuskw
    metaKeywords
    schema {
      __typename
    }
    twitterTitle
    twitterDescription
    twitterImage {
      id
      title
      altText
      mediaItemUrl
    }
    opengraphUrl
    opengraphType
    opengraphSiteName
    opengraphPublisher
    opengraphPublishedTime
    opengraphModifiedTime
    opengraphTitle
    opengraphAuthor
    opengraphDescription
    opengraphImage {
      id
      title
      altText
      mediaItemUrl
    }
  }
`;

export const TERM_SEO_FRAGMENT = /* GraphQL */ `
  fragment TermSEOFragment on TaxonomySEO {
    title
    metaDesc
    canonical
    metaRobotsNoindex
    metaRobotsNofollow
    breadcrumbs {
      url
      text
    }
    focuskw
    metaKeywords
    schema {
      __typename
    }
    twitterTitle
    twitterDescription
    twitterImage {
      id
      title
      altText
      mediaItemUrl
    }
    opengraphUrl
    opengraphType
    opengraphSiteName
    opengraphPublisher
    opengraphPublishedTime
    opengraphModifiedTime
    opengraphTitle
    opengraphAuthor
    opengraphDescription
    opengraphImage {
      id
      title
      altText
      mediaItemUrl
    }
  }
`;





