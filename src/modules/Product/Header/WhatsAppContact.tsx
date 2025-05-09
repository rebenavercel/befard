import { IImage } from "@/types/next.types";
import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from "@/components/Icons/Whatsapp";
import { getTranslations } from "next-intl/server";

interface WhatsAppContact {
  persons: {
    name_surname: string;
    telephone: string;
    image: IImage;
  }[];
  product_title: string;
}

const WhatsAppContact = async ({ persons, product_title }: WhatsAppContact) => {
  const randomItem = persons?.[Math.floor(Math.random() * persons?.length)];
  const t = await getTranslations("Common");

  const whatsappLink = `https://api.whatsapp.com/send/?phone=${randomItem?.telephone}&text=${
    t("initialProductMessage") + product_title
  }`;

  return (
    <div className="text-white mt-6">
      <div className="bg-dark-grey-own py-5 px-5  border-b-[1px] text-white border-black font-manrope-font flex flex-col sm:flex-row gap-6">
        <div className="flex ">
          <Image
            alt={randomItem?.image.alt}
            src={randomItem?.image.src}
            width={150}
            height={224}
            className="!relative !w-[80px] object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm md:text-base relative font-bold">
            {randomItem?.name_surname}
          </p>
          <div className="flex flex-col gap-5 mt-3">
            <Link
              href={whatsappLink}
              className="flex gap-2.5 text-white items-center font-manrope-font font-bold hover:text-green-500"
              target="_blank"
            >
              <WhatsAppIcon className="size-6" />
              {t("contactWithWhatsApp")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppContact;
