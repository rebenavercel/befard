export interface IACFData<T> {
  id: number;
  slug: string;
  link: string;
  status: string;
  name: string;
  acf: T;
  lang: string;
  date: string;
  description?: string;
  title: {
    rendered: string;
  };
  yoast_head_json: {
    title: string;
    description: string;
    og_locale: string;
  };
}

export interface WordpressImage {
  id: number;
  title: string;
  url: string;
  alt: string;
}

export interface WordpressVideo {
  id: number;
  title: string;
  url: string;
  alt: string;
  mime_type: string;
  sizes: {
    medium: string;
    large: string;
  };
}
