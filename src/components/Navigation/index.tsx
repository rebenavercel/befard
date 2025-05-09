import NavigationDesktop from "./NavigationDesktop";
import NavigationMobile from "./NavigationMobile";
import NavigationDesktopClientWrapper from "@/components/Navigation/NavigationDesktopClientWrapper";
import NavigationMobileClientWrapper from "@/components/Navigation/NavigationMobileClientWrapper";
import { Suspense } from "react";

interface INavigation {
  locale: string;
}

const Navigation = ({ locale }: INavigation) => {
  return (
    <header className="z-[70] relative">
      <div className="xl:hidden">
        <Suspense fallback={<div>loading...</div>}>
          <NavigationMobileClientWrapper>
            <NavigationMobile locale={locale} />
          </NavigationMobileClientWrapper>
        </Suspense>
      </div>
      <div className="hidden xl:block">
        <NavigationDesktopClientWrapper>
          <NavigationDesktop locale={locale} />
        </NavigationDesktopClientWrapper>
      </div>
    </header>
  );
};

export default Navigation;
