import { getContactDetails } from "@/api/common";
import { Container } from "@/components";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";

type Props = {
  endpoint: string;
  locale: string;
};

export default async function SupportView({ endpoint, locale }: Props) {
  const data = await getContactDetails(endpoint, locale);

  if (!data) return null;

  const { image, text } = data;

  return (
    <div>
      <Container>
        <div
          className="text-white mt-[50px]"
          dangerouslySetInnerHTML={{
            __html: text || "",
          }}
        />
      </Container>

      <Container variant="2xl" className="mt-[50px] flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2">
          {image && (
            <Image
              {...image}
              fill
              className="!relative object-cover"
              sizes="650px"
            />
          )}
        </div>
        <div className="w-full lg:w-1/2">
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
