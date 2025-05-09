import { IACFData, WordpressImage, WordpressVideo } from "./wordpress.types";

export type THomePage = IACFData<{
  header: {
    images: {
      header_title: string;
      description: string;
      button: {
        button_text: string;
        url_address: string;
      };
      image: WordpressImage;
      video: WordpressVideo;
    }[];
  };
  about_us: {
    header: string;
    header_title: string;
    image: WordpressImage;
    description: string;
    button: {
      button_title: string;
      address_url: string;
    };
    tiles: {
      title: string;
      description: string;
    }[];
  };
  describe_section: {
    header: string;
    header_title: string;
    description: string;
    button: {
      button_title: string;
      address_url: string;
    };
    image: WordpressImage;
  };
}>;
