import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { Skeleton } from "@/components/Skeleton";
import { AboutUsHero } from "@/modules/AboutUs";
import {
  AboutUsSection,
  ImageTextBlock,
  Reviews,
  ContactSection,
} from "@/modules/Common";

type Params = {
  params: { locale: string; slug: string };
};

const AboutUs = async ({ params }: Params) => {
  const { locale, slug } = params;
  setRequestLocale(locale);

  return (
    <div className="pt-[60px] pb-12 lg:pt-[110px] lg:pb-24 bg-black">
      <Suspense
        fallback={<Skeleton className="w-full h-[730px] lg:h-[640px]" />}
      >
        <AboutUsHero slug={slug} />
      </Suspense>

      <Suspense
        fallback={<Skeleton className="w-full h-[1152px] lg:h-[746px]" />}
      >
        <AboutUsSection slug={slug} />
      </Suspense>
      <Suspense
        fallback={<Skeleton className="w-full h-[1114x] lg:h-[1083px]" />}
      >
        <ImageTextBlock slug={locale} locale={locale} />
      </Suspense>
      <Suspense fallback={<Skeleton className="w-full h-[450px]" />}>
        <Reviews />
      </Suspense>
      <ContactSection />
    </div>
  );
};

export default AboutUs;
