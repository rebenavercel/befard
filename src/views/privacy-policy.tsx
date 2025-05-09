import { getPolicy } from "@/api/policy";

import { cn } from "@/lib/utils";
import { Container } from "@/components";

type TProps = {
  slug: string;
  locale: string;
};

export default async function PolicyView({ slug = "privacy", locale }: TProps) {
  const data = await getPolicy(slug, locale);

  if (!data) return null;
  const { text } = data;
  return (
    <div>
      <Container className="mt-20">
        <div
          className={cn(
            "text-white font-manrope-font text-sm md:text-base space-y-6",
            "[&_p]:mb-6",
            "[&_h1]:mb-6 [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mt-8",
            "[&_h2]:mb-6 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-8",
            "[&_h3]:mb-6 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mt-8",
            "[&_p]:mb-4 [&_p]:text-base lg:[&_p]:text-lg/relaxed",
            "[&_ul]:mb-4 [&_ul]:text-base lg:[&_ul]:text-lg/relaxed",
            "[&_ol]:mb-4 [&_ol]:text-base lg:[&_ol]:text-lg/relaxed",
            "[&_li]:mb-4 [&_li]:text-base lg:[&_li]:text-lg",
            "[&_ol]:list-decimal [&_ul]:list-disc",
            "[&_ol]:pl-8",
          )}
          dangerouslySetInnerHTML={{
            __html: text || "",
          }}
        />
      </Container>
    </div>
  );
}
