import BefardLogo from "@/components/Icons/BefardLogo";
import { Link } from "@/i18n/routing";

import React, { lazy, Suspense } from "react";

import CategoryNav from "./CategoryNav";
import SheetHamburger from "./SheetHamburger";
import { getMenu } from "@/lib/api/get-menu";
import { Container } from "@/components";

const ChangeLanguage = lazy(() => import("@/components/ChangeLanguage"));

interface INavigationDesktop {
  locale: string;
}

const NavigationDesktop = async ({ locale }: INavigationDesktop) => {
  const data = await getMenu(locale);

  const categories = data.categories;

  return (
    <Container className="flex justify-between" variant="2xl">
      <div className="flex items-center gap-[80px]">
        <Link href="/">
          <BefardLogo className="w-[174px]" />
        </Link>
        <div className="flex gap-3 items-center">
          {/* <Suspense fallback={null}>
            <ChangeLanguage locale={locale} />
          </Suspense> */}
          <Suspense fallback={null}>
            <ChangeLanguage />
          </Suspense>
        </div>
      </div>
      <div className="flex gap-11 items-center">
        <CategoryNav categories={categories} />
        <SheetHamburger categories={categories} locale={locale} />
      </div>
    </Container>
  );
};

export default NavigationDesktop;
