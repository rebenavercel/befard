import "server-only";

import { cache } from "react";
import { fetcher } from "@/lib/fetcher";
import { getWordpPressUri } from "@/lib/uri";
import {
  getAlternatesLinks,
  getNavigationLinks,
  NavigationLink,
  AlternateLink,
} from "@/lib/translations";
import { GET_PAGE_QUERY } from "@/lib/graphql/page";
import { Language, Translation } from "@/types/wp-graphql.types";
import { PostTypeSEO } from "@/types/seo.types";

type Page = {
  id: string;
  title: string;
  slug: string;
  uri: string;
  contentTypeName: string;
  language: Language;
  seo: PostTypeSEO;
};

type WPGraphQLPage = {
  page: Page & {
    translations: Translation[];
  };
};

type PageResponse = Page & {
  translations: NavigationLink[];
  alternateLinks: AlternateLink[];
};

export const getPage = cache(
  async (slug: string, locale: string): Promise<PageResponse> => {
    const uri = getWordpPressUri(locale, [slug], "");

    const data = await fetcher<WPGraphQLPage>({
      query: GET_PAGE_QUERY,
      variables: {
        uri,
      },
    });

    let pagePath: string;
    
    if (slug === locale || slug === "") {
      pagePath = "home";
    } else {
      pagePath = slug;
    }

    const alternateLinks = getAlternatesLinks(pagePath);
    const navigationLinks = getNavigationLinks(pagePath);

    return {
      ...data?.page,
      alternateLinks,
      translations: navigationLinks,
    };
  },
);
