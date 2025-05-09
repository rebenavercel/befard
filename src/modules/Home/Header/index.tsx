import { getHeader } from "@/api/homepage";
import HeaderSlider from "./HeaderSlider";
import { getLocale } from "next-intl/server";
import { PreloadHeroResources } from "./PreloadHeroResources";

const Header = async () => {
  const locale = await getLocale();
  const data = await getHeader(locale, locale);

  if (!data) return null;

  return (
    <div className="relative">
      <PreloadHeroResources
        poster={
          data?.header?.images &&
          (data?.header?.images[0]?.image?.src as string)
        }
      />
      <HeaderSlider images={data?.header?.images || []} />
    </div>
  );
};

export default Header;
