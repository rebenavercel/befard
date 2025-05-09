import { SheetComponent } from "../SheetContent";

interface IDesktopSheetContent {
  categories: {
    title: string;
    link: string;
    subcategories: {
      title: string;
      slug: string;
      link: string;
    }[];
  }[];
  locale: string;
}

const DesktopSheetContent = ({ categories, locale }: IDesktopSheetContent) => {
  return <SheetComponent categories={categories} locale={locale} />;
};

export default DesktopSheetContent;
