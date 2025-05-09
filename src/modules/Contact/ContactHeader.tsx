import { getHeader } from "@/api/contact";
import { Container } from "@/components";
import { getLocale, getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import CompanyText from "@/components/CompanyText";
import TimeIcon from "@/components/Icons/Time";
import GPSIcon from "@/components/Icons/Gps";
import PhoneIcon from "@/components/Icons/Contact";
import MessageIcon from "@/components/Icons/Message";
import { Link } from "@/i18n/routing";
import Image from "next/image";


const ContactHeader = async () => {
  const locale = await getLocale();
  const [t, data] = await Promise.all([
    getTranslations("Contact"),
    getHeader(locale),
  ]);

  if (!data) return null;

  const { title, description, general } = data;

  return (
    <div className="relative">
      <div className="absolute w-full h-full">
        <Image
          src={`/images/bg-line.svg`}
          alt=""
          fill
          unoptimized
          className="w-full"
        />
      </div>
      <Container
        variant="2xl"
        className="flex flex-col lg:flex-row mt-16 z-10 gap-[50px]"
      >
        <div className="w-full lg:w-1/2">
          <div className="max-w-[500px] pt-[50px]">
            <CompanyText
              text={t("contact")}
              classNameText="text-red-own"
              classNameBorder="border-red-own"
            />
            <p className="text-2xl md:text-4xl text-white mt-5">{title}</p>
            <div
              className="text-sm md:text-xl text-white mt-[30px]"
              dangerouslySetInnerHTML={{
                __html: description || "",
              }}
            />
            <div className="grid grid-cols-2 mt-[50px] gap-3 text-sm md:text-base">
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
                  <p>{t(general?.open_days)}</p>
                  <p>{general?.open_hours}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`tel:${general?.telephone_number}`}
                  className="flex gap-2.5 text-white items-center font-manrope-font hover:underline underline-offset-[6px]"
                >
                  <PhoneIcon className="!size-4 text-white" />
                  {general?.telephone_number}
                </Link>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`mailto:${general?.email}`}
                  className="flex gap-2.5 text-white items-center font-manrope-font hover:underline underline-offset-[6px]"
                >
                  <MessageIcon className="!size-4" /> {general?.email}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <ContactForm />
        </div>
      </Container>
    </div>
  );
};

export default ContactHeader;
