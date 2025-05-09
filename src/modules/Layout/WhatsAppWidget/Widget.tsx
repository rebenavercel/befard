"use client";

import { IImage } from "@/types/next.types";
import "./Widget.css";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const FloatingWhatsApp = dynamic(
  () =>
    import("react-floating-whatsapp").then((mod) => ({
      default: mod.FloatingWhatsApp,
    })),
  {
    ssr: false,
    loading: () => null,
  }
);

interface IWidget {
  persons: {
    name_surname: string;
    telephone: string;
    image: IImage;
    smallImage: {
      thumbnail: string;
    };
  }[];
}

const Widget = ({ persons }: IWidget) => {
  const [selectedPerson, setSelectedPerson] = useState(persons?.[0]); // Default to the first person

  useEffect(() => {
    if (persons?.length > 0) {
      const randomIndex = Math.floor(Math.random() * persons.length);
      setSelectedPerson(persons[randomIndex]);
    }
  }, [persons]);

  const t = useTranslations("Contact");

  return (
    <div>
      <FloatingWhatsApp
        phoneNumber={selectedPerson?.telephone?.replace(/ /g, "")}
        avatar={selectedPerson?.image?.src as any}
        accountName={selectedPerson?.name_surname}
        statusMessage={t("writeUsWhatsApp")}
        placeholder={t("writeMessageWhatsApp")}
        chatMessage={t("initialMessageWhatsApp")}
        //className="[&>*]:!w-12 [&>*]:!h-12 [&>*]:!right-1 [&>*]:!bottom-1"
        buttonClassName="w-12 h-12 right-1 bottom-1"
      />
    </div>
  );
};
export default Widget;
