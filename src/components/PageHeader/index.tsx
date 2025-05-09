import Breadcrumbs, { BreadcrumbItems } from "@/components/Breadcrumbs";
import CompanyText from "@/components/CompanyText";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { cn } from "@/lib/utils";
import React from "react";

interface PageHeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbItems;
  badge?: string;
  badgeHref?: string;
  className?: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  breadcrumbs,
  badge = "",
  badgeHref,
  description,
  className = "",
}) => {
  return (
    <>
      {breadcrumbs && (
        <Container variant="2xl" className="mt-5 z-10">
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      )}
      <div
        className={cn(
          `relative bg-dark-grey-own mt-7 py-[50px] md:py-[100px]`,
          className,
        )}
        style={{
          backgroundImage: `url('/images/bg-line-1.svg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container
          variant="2xl"
          className="flex md:flex-row gap-10 flex-col w-full justify-between z-10"
        >
          <div className="w-full md:w-1/2">
            <CompanyText
              text={badge}
              {...(badgeHref && { href: badgeHref })}
              classNameText="text-red-own"
              classNameBorder="border-red-own"
            />

            <Heading tag="h1" variant="50" className="mt-5">
              {title}
            </Heading>
          </div>

          {description && (
            <div
              className="w-full md:w-1/2 text-lg text-white self-center font-manrope-font [&>*]:font-manrope-font [&>*]:text-white font-semibold antialiased"
              dangerouslySetInnerHTML={{
                __html: description || "",
              }}
            />
          )}
        </Container>
      </div>
    </>
  );
};

export default PageHeader;
