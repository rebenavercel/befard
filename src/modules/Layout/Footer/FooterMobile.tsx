import { Container } from "@/components";

import BefardLogo from "@/components/Icons/BefardLogo";

import PhoneIcon from "@/components/Icons/Contact";
import MessageIcon from "@/components/Icons/Message";
import TimeIcon from "@/components/Icons/Time";
import GPSIcon from "@/components/Icons/Gps";
import FbIcon from "@/components/Icons/Facebook";
import YTIcon from "@/components/Icons/Youtube";
import RebenaIcon from "@/components/Icons/Rebena";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import FooterLineMobile from "@/components/Icons/footer-line-mobile";
import { GlobalSettingsData } from "@/types/global.types";


interface IFooterMobile {
  general: GlobalSettingsData;
  categories: {
    title: string;
    link: string;
  }[];
  popular: {
    title: string;
    link: string;
  }[];
}

const FooterMobile = ({ general, categories, popular }: IFooterMobile) => {
  const t = useTranslations("Common");

  return (
    <div className="bg-red-own relative">
      <div className="absolute h-full left-[50%] translate-x-[-50%] w-full">
        <FooterLineMobile className="w-full h-full" />
      </div>
      <Container variant="2xl" className="py-10 px-4 z-10">
        <div>
          <Link href="/">
            <BefardLogo className="w-[103px]" />
          </Link>
        </div>
        <div className="grid grid-cols-2 mt-8 gap-y-5 gap-x-4 text-sm">
          <div>
            <div className="flex gap-1.5">
              <div>
                <GPSIcon className="!size-[18px] mt-1" />
              </div>
              <div className="text-white flex flex-col [&>p]:font-manrope-font">
                <p>{general?.street}</p>
                <p>{general?.city}</p>
                <p>{general?.country}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <a
              href={`tel:${general?.telephone_number}`}
              className="flex gap-2.5 text-white items-center"
            >
              <PhoneIcon className="!size-[18px] text-white" />
              <span className="font-manrope-font">
                {general?.telephone_number}
              </span>
            </a>
            <a
              href={`mailto:${general?.email}`}
              className="flex gap-2.5 text-white items-center"
            >
              <MessageIcon className="!size-[18px]" />
              <span className="font-manrope-font">{general?.email}</span>
            </a>
          </div>

          <div className="flex gap-1.5 mt-4">
            <div>
              <TimeIcon className="!size-[18px] mt-1" />
            </div>
            <div className="text-white [&>p]:font-manrope-font">
              <p>{general?.open_days}</p>
              <p>{general?.open_hours}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href={general?.youtube_link || "#"}>
              <YTIcon className="size-12" />
            </Link>
            <Link href={general?.facebook_link || "#"}>
              <FbIcon className="size-12" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-8 gap-x-4 gap-y-5">
          <div className="text-sm">
            <h4 className="text-white uppercase text-lg">{t("categories")}</h4>
            <div className="flex flex-col gap-1.5 mt-4">
              {categories?.map((category) => (
                <Link
                  className="font-manrope-font text-white uppercase"
                  href={category?.link}
                  key={category?.link}
                >
                  {category?.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-sm">
            <h4 className="text-white uppercase text-lg">{t("sitemap")}</h4>
            <div className="flex flex-col gap-1.5 mt-4">
              <Link
                href="/"
                className="font-manrope-font flex gap-2 items-center text-white uppercase hover:underline"
              >
                {t("homepage")}
              </Link>
              <Link
                href="/rent"
                className="font-manrope-font flex items-center text-white uppercase"
              >
                {t("rent")}
              </Link>
              <Link
                href="/about-us"
                className="font-manrope-font flex gap-2 items-center text-white uppercase hover:underline"
              >
                {t("aboutUs")}
              </Link>
              <Link
                href="/service"
                className="font-manrope-font flex gap-2 items-center text-white uppercase hover:underline"
              >
                {t("services")}
              </Link>
              <Link
                href="/support"
                className="font-manrope-font flex gap-2 items-center text-white uppercase hover:underline"
              >
                {t("support")}
              </Link>
              <Link
                href="/distributors"
                className="font-manrope-font flex gap-2 items-center text-white uppercase hover:underline"
              >
                {t("distributors")}
              </Link>
              <Link
                href="/blog"
                className="font-manrope-font flex gap-2 items-center text-white uppercase hover:underline"
              >
                {t("blog")}
              </Link>
              <Link
                href="/contact"
                className="font-manrope-font flex gap-2 items-center text-white uppercase hover:underline"
              >
                {t("contact")}
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-8 gap-x-4 gap-y-5">
          <div className="text-sm">
            <p className="text-white uppercase text-lg">{t("popular")}</p>
            <div className="flex flex-col gap-2.5 mt-3">
              {popular?.map((item) => (
                <Link
                  className="text-white uppercase"
                  href={item?.link}
                  key={item?.link}
                >
                  {item?.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-sm">
            <Link
              href="/policy"
              className="font-manrope-font text-white uppercase"
            >
              {t("privacyAndCookies")}
            </Link>
          </div>
        </div>
        <div className="font-manrope-font text-sm text-white uppercase mt-8">
          {t("copyright")}
        </div>
        <div className="flex text-sm font-manrope-font text-white items-center uppercase mt-8 gap-x-4">
          <span>{t("createdBy")}</span>
          <RebenaIcon className="w-[80px] h-[42px] filter invert" />
        </div>
      </Container>
    </div>
  );
};

export default FooterMobile;
