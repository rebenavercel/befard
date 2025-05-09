export const GET_TEAM_QUERY = /* GraphQL */ `
  query Team {
    team {
      id
      menuTitle
      pageTitle
      parentId
      acfTeam {
        osoby {
          name_surname
          email
          phone
          image {
            node {
              id
              altText
              mediaItemUrl
              title
              caption
            }
          }
        }
      }
    }
  }
`;
