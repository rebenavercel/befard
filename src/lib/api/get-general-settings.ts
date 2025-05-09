import "server-only";

import { cache } from "react";
import { fetcher } from "@/lib/fetcher";
import { GET_GLOBAL_SETTINGS_QUERY } from "@/lib/graphql/global-settings";
import { GlobalSettingsData } from "@/types/global.types";

interface GlobalSettingsResponse {
  globalsettings: {
    acfSettings: {
      dniOtwarcia: string;
      email: string;
      facebookLink: string;
      godzinyOtwarcia: string;
      kraj: string;
      miejscowosc: string;
      telefon: string;
      ulica: string;
      youtubeLink: string;
    };
  };
}

export const getGlobalSettings = cache(
  async (locale: string): Promise<GlobalSettingsData> => {
    const response = await fetcher<GlobalSettingsResponse>({
      query: GET_GLOBAL_SETTINGS_QUERY,
      variables: {
        language: locale.toUpperCase(),
      },
    });

    const settingsData = response?.globalsettings?.acfSettings;

    return {
      telephone_number: settingsData.telefon,
      email: settingsData.email,
      street: settingsData.ulica,
      city: settingsData.miejscowosc,
      country: settingsData.kraj,
      open_days: settingsData.dniOtwarcia,
      open_hours: settingsData.godzinyOtwarcia,
      youtube_link: settingsData.youtubeLink,
      facebook_link: settingsData.facebookLink,
    };
  },
);
