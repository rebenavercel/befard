import Breadcrumbs from "@/components/Breadcrumbs";
import { Skeleton } from "@/components/Skeleton";
import { ContactSection, Reviews } from "@/modules/Common";
import { Action, Draws, Header, Specification } from "@/modules/Product";
import { Suspense } from "react";
import { Container } from "@/components";

type Props = {
  breadcrumbs: any;
  locale: string;
  product: string;
};

export default async function ProductView({
  locale,
  breadcrumbs,
  product,
}: Props) {
  return (
    <div className="lg:pt-5">
      <Container variant="2xl">
        <Breadcrumbs items={breadcrumbs} />
      </Container>
      <Suspense
        fallback={<Skeleton className="w-full h-[890px]  md:h-[715px]" />}
      >
        <Header locale={locale} slug={product} />
      </Suspense>
      <Suspense
        fallback={<Skeleton className="w-full h-[1900px] md:h-[979px]" />}
      >
        <Specification locale={locale} slug={product} />
      </Suspense>
      <Suspense
        fallback={<Skeleton className="w-full h-[306px] md:h-[384px]" />}
      >
        <Draws locale={locale} slug={product} />
      </Suspense>
      <Suspense fallback={<Skeleton className="w-full h-[1000px]" />}>
        <Action locale={locale} slug={product} />
      </Suspense>
      <Suspense fallback={<Skeleton className="w-full h-[450px]" />}>
        <Reviews />
      </Suspense>
      <ContactSection />
    </div>
  );
}
