import { Sheet, SheetTrigger } from "../SheetContent";
import HamburgerIcon from "@/components/Icons/Burger";
import DesktopSheetContent from "./DesktopSheetContent";
import { IImage } from "@/types/next.types";

interface ISheetHamburger {
  categories: {
    title: string;
    slug: string;
    link: string;
    image: IImage;
    subcategories: {
      title: string;
      slug: string;
      link: string;
    }[];
  }[];
  locale: string;
}

const SheetHamburger = ({ categories, locale }: ISheetHamburger) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <HamburgerIcon className="!size-[40px] lg:!size-[50px] cursor-pointer" />
      </SheetTrigger>

      <DesktopSheetContent categories={categories} locale={locale} />
    </Sheet>
  );
};

export default SheetHamburger;
