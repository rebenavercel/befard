import "server-only";

import { cache } from "react";
import { fetcher } from "@/lib/fetcher";
import { GET_POST_QUERY } from "@/lib/graphql/post";
import { getWordpPressUri } from "@/lib/uri";
import {
  generateAlternateLinks,
  generateNavigationLinks,
  NavigationLink,
  AlternateLink,
} from "@/lib/translations";
import { Language, Translation } from "@/types/wp-graphql.types";
import { PostTypeSEO } from "@/types/seo.types";

type Post = {
  id: string;
  title: string;
  slug: string;
  uri: string;
  acfPost: {
    thumbnail: {
      node: {
        mediaItemUrl: string;
      };
    };
    postImage: {
      node: {
        mediaItemUrl: string;
      };
    };
  };
  contentTypeName: string;
  language: Language;
  seo: PostTypeSEO;
};

type WPGraphQLPost = {
  post: Post & {
    translations: Translation[];
  };
};

type PostResponse = Post & {
  translations: NavigationLink[];
  alternateLinks: AlternateLink[];
};

export const getPost = cache(
  async (slug: string, locale: string): Promise<PostResponse> => {
    const uri = getWordpPressUri(locale, [slug], "");

    const data = await fetcher<WPGraphQLPost>({
      query: GET_POST_QUERY,
      variables: {
        uri,
      },
    });

    const alternateLinks = generateAlternateLinks(data?.post, "post");
    const navigationLinks = generateNavigationLinks(data?.post, "post");

    return {
      ...data?.post,
      alternateLinks,
      translations: navigationLinks,
    };
  },
);
