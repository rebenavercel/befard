import { Container } from "@/components";

import BefardLogo from "@/components/Icons/BefardLogo";
import { Link } from "@/i18n/routing";
import SheetHamburger from "./SheetHamburger";
import { getMenu } from "@/lib/api/get-menu";

interface INavigationMobile {
  //categories: {
  //  title: string;
  //  slug: string;
  //  link: string;
  //  image: IImage;
  //  products: {
  //    categorySlug: string;
  //    slug: string;
  //    link: string;
  //    title: string;
  //  }[];
  //}[];
  locale: string;
}

const NavigationMobile = async ({ locale }: INavigationMobile) => {
  const data = await getMenu(locale);

  const categories = data.categories;

  return (
    <Container className="flex justify-between" variant="2xl">
      <div className="flex items-center">
        <Link href="/">
          <BefardLogo className="w-[103px]" />
        </Link>
      </div>
      <div className="flex gap-11 items-center">
        <SheetHamburger categories={categories} locale={locale} />
      </div>
    </Container>
  );
};

export default NavigationMobile;
