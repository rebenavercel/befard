import { getProductHeader } from "@/api/product";
import { Container } from "@/components";
import Button from "@/components/Button";
import CompanyText from "@/components/CompanyText";
import ProductsSlide from "@/components/ProductsSlide";
import ArrowIcon from "@/components/Icons/Arrow";
import { getTranslations } from "next-intl/server";
import WhatsAppContact from "./WhatsAppContact";
import Image from "next/image";
import Heading from "@/components/Heading";
import { getTeam } from "@/lib/api/get-team";


interface IHeader {
  locale: string;
  slug: string;
}

const ProductHeader = async ({ locale, slug }: IHeader) => {
  const [t, data, team] = await Promise.all([
    getTranslations("Common"),
    getProductHeader(locale, slug),
    getTeam(locale),
  ]);

  if (!data) return null;

  const { header_prefix, product_title, description, file, gallery } = data;
  return (
    <div className="relative max-w-screen-3xl mx-auto w-full">
      <div className="absolute w-full h-full">
        {/*<BgLines />*/}
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
        className="mt-4 flex flex-col lg:flex-row gap-[5.5%] z-10"
      >
        <div className="w-full lg:w-3/5 xl:w-2/3">
          <ProductsSlide gallery={gallery} />
        </div>
        <div className="w-full lg:w-2/5 xl:w-1/3 mt-5 md:mt-10">
          {header_prefix && (
            <CompanyText
              text={header_prefix}
              classNameText="text-red-own"
              classNameBorder="border-red-own"
            />
          )}

          <Heading tag="h1" variant="50" className="mt-5">
            {product_title}
          </Heading>

          <div
            className="text-sm md:text-base text-white mt-7 space-y-5"
            dangerouslySetInnerHTML={{
              __html: description || "",
            }}
          />
          {file?.url && (
            <Button
              className="mt-5 text-sm lg:text-base inline-flex gap-2.5 items-center"
              download
              href={file?.url}
              target="_blank"
            >
              <ArrowIcon className="w-5" /> {t("downloadSheet")}
            </Button>
          )}

          {team?.persons && (
            <WhatsAppContact
              persons={team.persons.map((person) => ({
                ...person,
                smallImage: null,
              }))}
              product_title={product_title}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProductHeader;
