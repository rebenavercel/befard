import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BaseBreadcrumbItem {
  label: string;
}

interface LinkBreadcrumbItem extends BaseBreadcrumbItem {
  href: string;
}

interface LastBreadcrumbItem extends BaseBreadcrumbItem {
  href?: string;
}

export type BreadcrumbItems = [...LinkBreadcrumbItem[], LastBreadcrumbItem];

interface BreadcrumbsProps {
  items: BreadcrumbItems;
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": item.href || "",
        name: item.label,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbList, null, 2),
        }}
      />

      <nav aria-label="Breadcrumb">
        <ol className="overflow-x-auto flex items-center space-x-2 text-sm/[18px] font-semibold subpixel-antialiased whitespace-nowrap">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight
                    strokeWidth={isLast ? 3.5 : 3}
                    className={cn(
                      "mx-2 mt-0.5",
                      isLast
                        ? "text-red-own size-[11px]"
                        : "text-grey-own h-2.5 w-2.5",
                    )}
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span
                    className="text-red-own font-bold cursor-default"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={(item as LinkBreadcrumbItem).href}
                    className="text-grey-own hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
