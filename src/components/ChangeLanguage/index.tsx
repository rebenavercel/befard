import Image from "next/image";
import React from "react";

import Link from "next/link";

// interface IChangeLanguage {
//   locale: string;
// }

// const ChangeLanguage = ({ locale }: IChangeLanguage) => {

const ChangeLanguage = () => {
  // const [open, setOpen] = useState(false);
  // const t = useTranslations("Common");

  // const { translationLinks } = useTranslationLinks();

  // const translations = useMemo(() => {
  //   return translationLinks.filter((link) => link.locale !== locale) || [];
  // }, [translationLinks, locale]);

  return (
    <>
      <Link
        className="group border-0 p-0 h-fit w-fit flex items-center gap-x-3"
        href="https://befard.com/en/"
      >
        <span className="underline-offset-[6px] tracking-wide group-hover:underline text-sm lg:text-base font-manrope-font uppercase">
          ENGLISH
        </span>
        <Image
          src="/icons/locale/en.svg"
          alt="en-icon"
          height={24}
          width={36}
          className="h-5 w-7 lg:h-4 lg:w-6 group-hover:opacity-80 opacity-100"
          unoptimized
        />
      </Link>
      {/* <Popover modal open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="group border-0 p-0 h-fit w-fit flex items-center gap-x-3">
          <span className="underline-offset-[6px] tracking-wide group-hover:underline text-sm lg:text-base font-manrope-font uppercase">
            {locale && t(locale)}
          </span>
          <Image
            src={`/icons/locale/${locale}.svg`}
            alt={`${locale}-icon`}
            height={24}
            width={36}
            className="h-5 w-7 lg:h-4 lg:w-6 group-hover:opacity-80 opacity-100"
            unoptimized
          />
        </PopoverTrigger>
        <PopoverContent
          alignOffset={-10}
          align="end"
          side="bottom"
          sideOffset={8}
          className="bg-black w-16 transform-x-8 lg:w-12 ml-2.5 left-2.5 flex flex-col items-center gap-5 lg:gap-4 py-4 px-3 lg:px-2 shadow-[0px_0px_23px_9px_rgba(0_0_0_/_0.34)] rounded-lg justify-center border-0 !z-[150]"
        >
          {translations.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="flex justify-start cursor-pointer p-0 hover:opacity-80 opacity-100"
            >
              <Image
                src={`/icons/locale/${link.locale}.svg`}
                alt={`${link.locale}-icon`}
                height={16}
                width={24}
                className="h-5 w-8 lg:h-4 lg:w-6"
                unoptimized
              />
            </Link>
          ))}
        </PopoverContent>
      </Popover> */}
    </>
  );
};

export default ChangeLanguage;
