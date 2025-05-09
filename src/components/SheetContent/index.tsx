"use client";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown, X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../Accordion";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";
import ChangeLanguage from "../ChangeLanguage";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-[90] bg-[#363636]/65 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  );
}

const sheetVariants = cva(
  "fixed z-[100] gap-4 bg-black p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left ",
        right:
          "inset-y-0 right-0 h-full w-3/4 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-xl",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

interface SheetContentProps
  extends React.ComponentProps<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

function SheetContent({
  side = "right",
  className,
  children,
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        <SheetPrimitive.Close className="flex items-center justify-center absolute right-4 top-4 transition-opacity disabled:pointer-events-none data-[state=open]:bg-secondary bg-grey-own size-[30px] lg:size-[50px]">
          <X className="h-full w-full text-red-own" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-lg  text-foreground", className)}
      {...props}
    />
  );
}

interface ISheetComponent {
  categories: {
    title: string;
    link: string;
    subcategories: {
      title: string;
      slug: string;
      link: string;
    }[];
  }[];
  locale: string;
}

type MenuItem =
  | {
      path: string;
      label: string;
      component?: undefined;
    }
  | {
      path?: undefined;
      label?: undefined;
      component: typeof Accordion;
    };

export const SheetComponent = ({ categories, locale }: ISheetComponent) => {
  const t = useTranslations("Menu");

  const menuItems: MenuItem[] = [
    { path: "/", label: "homepage" },
    { path: "/rent", label: "rent" },
    { path: "/service", label: "services" },
    { path: "/support", label: "support" },
    { path: "/distributors", label: "distributors" },
    { component: Accordion },
    { path: "/blog", label: "blog" },
    { path: "/contact", label: "contact" },
  ];

  return (
    <SheetContent className="text-white">
      <SheetHeader>
        <SheetTitle></SheetTitle>
      </SheetHeader>
      <div className="flex pt-16 pl-5 lg:pt-[100px] lg:pl-[100px] overflow-auto h-full">
        <ul className="font-manrope-font gap-5 flex flex-col text-sm lg:text-base">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={cn(
                !item.component &&
                  "hover:underline underline-offset-[6px] uppercase"
              )}
            >
              {item.component ? (
                <Accordion type="single" collapsible>
                  <AccordionItem
                    value="item-1"
                    className="border-b-transparent w-fit"
                  >
                    <AccordionTrigger className="font-manrope-font flex gap-2 items-center font-medium justify-start hover:underline underline-offset-[6px] w-fit text-sm lg:text-base py-0 [&>svg]:ml-1 [&>svg]:size-5 uppercase tracking-wide">
                      {t("categories")}
                    </AccordionTrigger>
                    <AccordionContent className="pl-4 flex flex-col gap-3.5 pt-5 pb-6">
                      {categories?.map((category) => (
                        <Accordion
                          type="single"
                          collapsible
                          key={category?.title}
                        >
                          {category?.subcategories?.length > 0 ? (
                            <AccordionItem
                              value="item-2"
                              className="border-b-transparent"
                            >
                              <AccordionTrigger className="flex gap-2 items-center font-manrope-font justify-start hover:underline underline-offset-[6px] w-fit text-sm py-0 [&>svg]:ml-0.5 [&>svg]:size-4 uppercase">
                                <span>{category?.title}</span>
                              </AccordionTrigger>
                              <AccordionContent className="pl-5 flex flex-col gap-2.5 pt-3 pb-4">
                                {category?.subcategories?.map((product) => (
                                  <SheetClose asChild key={product?.link}>
                                    <Link
                                      className="text-gray-own hover:underline underline-offset-4 font-manrope-font"
                                      href={product.link}
                                    >
                                      {product?.title}
                                    </Link>
                                  </SheetClose>
                                ))}
                              </AccordionContent>
                            </AccordionItem>
                          ) : (
                            <AccordionItem
                              value="item-2"
                              className="border-b-transparent w-fit"
                            >
                              <SheetClose asChild>
                                <Link
                                  href={category.link}
                                  className="flex gap-2 items-center font-manrope-font justify-start hover:underline underline-offset-[6px] w-fit text-sm py-0 [&>svg]:ml-0.5 [&>svg]:size-4 uppercase"
                                >
                                  {category.title}
                                </Link>
                              </SheetClose>
                            </AccordionItem>
                          )}
                        </Accordion>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <SheetClose asChild>
                  <Link
                    href={item.path!}
                    className="font-manrope-font flex gap-2 items-center font-medium tracking-wide"
                  >
                    {t(item.label!)}
                  </Link>
                </SheetClose>
              )}
            </li>
          ))}

          <div className="flex gap-3 items-center mt-4">
            <ChangeLanguage />
            {/* <ChangeLanguage locale={locale} /> */}
          </div>
        </ul>
      </div>
    </SheetContent>
  );
};

export { Sheet, SheetTrigger };
