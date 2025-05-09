export const GET_GLOBAL_SETTINGS_QUERY = /* GraphQL */ `
  query GetGlobalSettings($language: LanguageCodeFilterEnum! = ALL) {
    globalsettings(language: $language) {
      id
      menuTitle
      pageTitle
      parentId
      acfSettings {
        dniOtwarcia
        email
        facebookLink
        godzinyOtwarcia
        kraj
        miejscowosc
        telefon
        ulica
        youtubeLink
      }
    }
  }
`;
