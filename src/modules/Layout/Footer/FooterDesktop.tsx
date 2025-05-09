import { Container } from "@/components";
//import Cookies from "./Cookies";
import BefardLogo from "@/components/Icons/BefardLogo";

import PhoneIcon from "@/components/Icons/Contact";
import FbIcon from "@/components/Icons/Facebook";
import GPSIcon from "@/components/Icons/Gps";
import MessageIcon from "@/components/Icons/Message";
import RebenaIcon from "@/components/Icons/Rebena";
import TimeIcon from "@/components/Icons/Time";
import YTIcon from "@/components/Icons/Youtube";
//import FooterLine from "@/public/images/footer-line.svg";
import FooterLine from "@/components/Icons/footer-line";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { GlobalSettingsData } from "@/types/global.types";

interface IFooterDesktop {
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

const FooterDesktop = async ({
  general,
  categories,
  popular,
}: IFooterDesktop) => {
  const t = await getTranslations("Common");

  const menuItems = [
    { path: "/", label: "homepage" },
    { path: "/rent", label: "rent" },
    { path: "/about-us", label: "aboutUs" },
    { path: "/service", label: "services" },
    { path: "/support", label: "support" },
    { path: "/distributors", label: "distributors" },
    // { path: "/blog", label: "blog" },
    { path: "/contact", label: "contact" },
  ];

  return (
    <div className="bg-red-own text-white relative">
      <div className="absolute h-full left-[50%] translate-x-[-50%] w-full">
        <FooterLine className="w-full h-full" />
      </div>
      <Container variant="2xl" className="py-10 z-10">
        <div className="flex justify-between items-center">
          <Link href="/">
            <BefardLogo className="w-[103px]" />
          </Link>
          <div className="flex gap-5">
            <Link
              href={`tel:${general?.telephone_number}`}
              className="flex gap-2.5 items-center font-manrope-font hover:underline underline-offset-[6px]"
            >
              <PhoneIcon className="!size-4 text-white" />
              {general?.telephone_number}
            </Link>
            <Link
              href={`mailto:${general?.email}`}
              className="flex gap-2.5 items-center font-manrope-font hover:underline underline-offset-[6px]"
            >
              <MessageIcon className="!size-4" /> {general?.email}
            </Link>
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
        <div className="mt-[50px] flex justify-between">
          <div>
            <h3 className="text-lg/[22px] md:text-xl/[24px] xl:text-[25px]/[30px] text-white uppercase font-rubik-font">
              Befard
            </h3>
            <div className="flex flex-col gap-[30px] mt-8">
              <div className="flex gap-3">
                <div>
                  <GPSIcon className="!size-4 mt-1" />
                </div>
                <div className="text-white flex flex-col">
                  <p>{general?.street}</p>
                  <p>{general?.city}</p>
                  <p>{general?.country}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div>
                  <TimeIcon className="!size-4 mt-1" />
                </div>
                <div className="text-white">
                  <p>{general?.open_days}</p>
                  <p>{general?.open_hours}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg/[22px] md:text-xl/[24px] xl:text-2xl text-white uppercase font-rubik-font">
              {t("categories")}
            </h3>
            <div className="font-medium uppercase flex flex-col gap-2 mt-7">
              {categories?.map((category) => (
                <Link
                  className="hover:underline underline-offset-[6px]"
                  href={category.link}
                  key={category?.link}
                >
                  {category?.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg/[22px] md:text-xl/[24px] xl:text-2xl text-white uppercase font-rubik-font">
              {t("sitemap")}
            </h3>
            <div className="flex font-medium uppercase flex-col gap-2 mt-7">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="hover:underline underline-offset-[6px]"
                >
                  {t(item.label)}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg/[22px] md:text-xl/[24px] xl:text-2xl text-white uppercase font-rubik-font">
              {t("popular")}
            </h3>
            <div className="font-medium uppercase flex flex-col gap-2 mt-7">
              {popular?.map((item) => (
                <Link
                  className="hover:underline underline-offset-[6px]"
                  href={item.link}
                  key={item.link}
                >
                  {item?.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-32 flex justify-between items-center">
          <div className="font-manrope-font text-white uppercase">
            {t("copyright")}
          </div>
          <div>
            <Link
              href="/policy"
              className="font-manrope-font text-white uppercase hover:underline underline-offset-[6px]"
            >
              {t("privacyAndCookies")}
            </Link>
          </div>
          <div className="flex font-manrope-font text-white items-center uppercase">
            {t("createdBy")} <RebenaIcon className="w-[159px] h-[59px]" />
          </div>
        </div>
      </Container>
      {/*<Cookies />*/}
    </div>
  );
};

export default FooterDesktop;
