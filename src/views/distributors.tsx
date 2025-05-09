import { getDistributors } from "@/api/distributors";
import { Container } from "@/components";
import CompanyText from "@/components/CompanyText";
import { getLocale, getTranslations } from "next-intl/server";
//import BgLines from "@/components/Icons/images/BgLines";
import Button from "@/components/Button";
import ArrowIcon from "@/components/Icons/Arrow";
import GPSIcon from "@/components/Icons/Gps";
import MessageIcon from "@/components/Icons/Message";
import PageHeader from "@/components/PageHeader";
import Heading from "@/components/Heading";


export default async function DistributorsView() {
  const locale = await getLocale();
  const [t, data] = await Promise.all([
    getTranslations("Common"),
    getDistributors("distributors", locale),
  ]);

  if (!data) return null;

  return (
    <div>
      <PageHeader
        title={data?.header_title}
        badge="Befard"
        breadcrumbs={[
          {
            label: t("homepage"),
            href: "/",
          },
          {
            label: t("distributors"),
            href: "/distributors",
          },
        ]}
      />
      <Container className="mt-[50px]" variant="2xl">
        <h2 className="text-[30px] text-white mt-5">
          {data?.distributors?.section_title}
        </h2>

        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {data?.distributors?.list &&
              data?.distributors?.list?.map(
                (item: {
                  id: number;
                  title: string;
                  description: string;
                  email: string;
                  button: {
                    button_title: string;
                    address_url: string;
                  };
                  google_map: string;
                }) => (
                  <div key={item.id}>
                    {/*<GoogleMapsEmbed*/}
                    {/*  loading="lazy"*/}
                    {/*  allowfullscreen*/}
                    {/*  mode="place"*/}
                    {/*  apiKey={process.env.GOOGLE_MAPS_EMBED_API_KEY as string}*/}
                    {/*  width={"100%"}*/}
                    {/*  height={"315px"}*/}
                    {/*  center=""*/}
                    {/*  zoom="14"*/}
                    {/*  q={item.description}*/}
                    {/*/>*/}

                    <iframe
                      src={item.google_map}
                      loading="lazy"
                      className="w-full h-[315px]"
                    ></iframe>

                    <div className="mt-[30px]">
                      <CompanyText
                        text={t("distributors")}
                        classNameText="text-red-own"
                        classNameBorder="border-red-own"
                      />
                      <div className="flex flex-col gap-6">
                        <Heading
                          tag="h3"
                          variant="30"
                          className="mt-5 font-normal"
                        >
                          {item?.title}
                        </Heading>

                        {/*<h3 className="mt-5 text-white text-[20px] lg:text-[30px]/[35px]">*/}
                        {/*  {item?.title}*/}
                        {/*</h3>*/}

                        {item?.description && (
                          <div className="flex gap-2">
                            <div>
                              <GPSIcon className="size-4 mt-1" />
                            </div>
                            <div
                              className="text-white text-sm/[18px] font-manrope-font md:text-base/[20px] antialiased"
                              dangerouslySetInnerHTML={{
                                __html: item?.description || "",
                              }}
                            />
                          </div>
                        )}

                        {item?.email && (
                          <div className="flex gap-3 text-white items-center">
                            <MessageIcon className="size-4" />
                            <a href={`mailto:${item?.email}`}>{item?.email}</a>
                          </div>
                        )}

                        {item?.button?.button_title && (
                          <Button
                            href={item?.button?.address_url}
                            className="inline-flex mt-5 lg:mt-[30px] gap-2.5 w-fit"
                          >
                            <ArrowIcon className="w-5" />
                            {item?.button?.button_title}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ),
              )}
          </div>
        </div>
      </Container>
    </div>
  );
}
