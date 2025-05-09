import { Container } from "@/components";
import CompanyText from "@/components/CompanyText";
import { getLocale, getTranslations } from "next-intl/server";

import PhoneIcon from "@/components/Icons/Contact";
import MessageIcon from "@/components/Icons/Message";
import { IImage } from "@/types/next.types";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/shared/placeholder";
import Heading from "@/components/Heading";
import { getTeam } from "@/lib/api/get-team";

const Team = async () => {
  const locale = await getLocale();
  const [t, data] = await Promise.all([
    getTranslations("Contact"),
    getTeam(locale),
  ]);

  if (!data) return null;

  const { persons } = data;

  return (
    <Container variant="2xl" className="mt-[100px]">
      <CompanyText
        text={t("contact")}
        classNameText="text-red-own"
        classNameBorder="border-red-own"
      />

      <Heading tag="h2" variant="44" className="mt-5">
        {t("ourTeam")}
      </Heading>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-[30px]">
        {persons &&
          persons?.map(
            (person: {
              name_surname: string;
              id: number;
              telephone: string;
              email: string;
              image: IImage;
            }) => (
              <div
                className="bg-dark-grey-own py-5 px-10 border-b-[1px] text-white border-black font-manrope-font flex flex-col sm:flex-row gap-6"
                key={person.id}
              >
                <div className="flex justify-center">
                  <Image
                    alt={person?.name_surname}
                    src={person?.image.src}
                    width={150}
                    height={224}
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                    className="!relative !w-[150px] object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm md:text-base relative font-bold ">
                    {person?.name_surname}
                  </p>
                  <div className="flex flex-col gap-5 mt-3">
                    <a
                      href={`mailto:${person?.email}`}
                      className="flex gap-2.5 text-white items-center font-manrope-font hover:underline underline-offset-[6px]"
                    >
                      <div>
                        <MessageIcon className="!size-4" />
                      </div>
                      {person?.email}
                    </a>
                    <a
                      href={`tel:${person?.telephone}`}
                      className="flex gap-2.5 text-white items-center font-manrope-font hover:underline underline-offset-[6px]"
                    >
                      <div>
                        <PhoneIcon className="!size-4 text-white" />
                      </div>
                      {person?.telephone}
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send/?phone=${person?.telephone}&text=${t(
                        "initialLinkMessage",
                      )}`}
                      className="flex gap-2.5 text-white items-center font-manrope-font font-bold hover:text-green-500"
                      target="_blank"
                    >
                      {t("contactWithWhatsApp")}
                    </a>
                  </div>
                </div>
              </div>
            ),
          )}
      </div>
    </Container>
  );
};

export default Team;
