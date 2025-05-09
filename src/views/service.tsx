import { getService } from "@/api/service";
import { Container } from "@/components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import ProductsSlide from "@/components/ProductsSlide";
import { getLocale } from "next-intl/server";

export default async function ServiceView() {
  const locale = await getLocale();
  const data = await getService("service", locale);

  if (!data) return null;

  const { faq, text, gallery } = data;
  return (
    <div>
      <Container className="mt-20">
        <div className="w-full text-white">
          <div
            className="text-base lg:text-lg"
            dangerouslySetInnerHTML={{
              __html: text || "",
            }}
          />
        </div>
      </Container>
      <Container
        variant="2xl"
        className="mt-[50px] flex flex-col lg:flex-row gap-[50px]"
      >
        <div className="w-full lg:w-2/3">
          <ProductsSlide gallery={gallery} />
        </div>
        <div className="w-full lg:w-1/3 text-white">
          <Accordion type="single" collapsible key="klucz">
            {faq &&
              faq?.map(
                (item: { id: number; question: string; answer: string }) => (
                  <AccordionItem value={`${item.id}`} key={item.id}>
                    <AccordionTrigger>{item?.question}</AccordionTrigger>
                    <AccordionContent>{item?.answer}</AccordionContent>
                  </AccordionItem>
                ),
              )}
          </Accordion>
        </div>
      </Container>
    </div>
  );
}
