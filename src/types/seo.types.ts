import { ImageWPGraphQL } from '@/types/next.types';

interface SEOBreadcrumb {
  url: string;
  text: string;
}

export interface BaseSEO {
  title: string;
  metaDesc: string;
  canonical: string;
  metaRobotsNoindex: string;
  metaRobotsNofollow: string;
  breadcrumbs: SEOBreadcrumb[];
  focuskw: string;
  metaKeywords: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: ImageWPGraphQL;
  opengraphUrl: string;
  opengraphType: string;
  opengraphSiteName: string;
  opengraphPublisher: string;
  opengraphPublishedTime: string;
  opengraphModifiedTime: string;
  opengraphTitle: string;
  opengraphAuthor: string;
  opengraphDescription: string;
  opengraphImage: ImageWPGraphQL;
}

// Post type specific
export interface PostTypeSEO extends BaseSEO {
  cornerstone: boolean;
  readingTime: number;
  schema: {
    __typename: string;
    pageType: string;
    articleType: string;
  };
}



// Term specific
export interface TermSEO extends BaseSEO {
  schema: {
    __typename: string;
  };
}
