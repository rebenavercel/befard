import "server-only";
import { cache } from "react";
import { fetcher } from "@/lib/fetcher";
import { GET_TEAM_QUERY } from "@/lib/graphql/team";

interface TeamQueryResponse {
  team: {
    id: string;
    menuTitle: string;
    pageTitle: string;
    parentId: string;
    acfTeam: {
      osoby: Array<{
        name_surname: string;
        email: string;
        phone: string;
        image: {
          node: {
            id: string;
            altText: string;
            mediaItemUrl: string;
            title: string;
            caption: string;
          };
        };
      }>;
    };
  };
}

interface TeamPerson {
  id: number;
  name_surname: string;
  telephone: string;
  email: string;
  image: any;
}

interface TeamData {
  persons: TeamPerson[];
}

export const getTeam = cache(async (locale: string): Promise<TeamData> => {
  const data = await fetcher<TeamQueryResponse>({
    query: GET_TEAM_QUERY,
    variables: {
      language: locale.toUpperCase()
    }
  });

  return {
    persons: data.team.acfTeam.osoby.map((person, index) => ({
      id: index,
      name_surname: person.name_surname || "",
      telephone: person.phone || "",
      email: person.email || "",
      image: {
        id: person.image?.node.id,
        src: person.image?.node?.mediaItemUrl,
        alt: person.image?.node?.altText,
        caption: person.image?.node?.title
      }
    }))
  };
});
