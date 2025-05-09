"use client";

import React, { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../NavigationMenu";
import { IImage } from "@/types/next.types";
import { IMAGE_PLACEHOLDER, BLUR_PLACEHOLDER } from "@/shared/placeholder";

interface CategoryData {
  name: string;
  slug: string;
  link: string;
}

interface ProductData {
  categorySlug: string;
  slug: string;
  title: string;
  link: string;
}

interface CategoryProps {
  title: string;
  slug: string;
  link: string;
  image: IImage;
  products: ProductData[];
  subcategories: CategoryData[];
}

interface ICategoryNavProps {
  categories: CategoryProps[];
}

const ListItem = ({
  title,
  products,
  link,
  image,
  subcategories,
}: CategoryProps) => (
  <li className="text-white normal-case text-center gap-6">
    <figure className="flex justify-center h-[150px]">
      {image && (
        <Link
          href={link}
          title={title}
          className="flex items-center justify-center"
        >
          <Image
            src={image.src || IMAGE_PLACEHOLDER}
            alt={image.alt || image.caption || title || ""}
            width={120}
            height={120}
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            className="object-contain max-h-[130px]"
          />
        </Link>
      )}
    </figure>
    <span className="mt-5 block">
      <Link
        href={link}
        className="font-manrope-font font-extrabold hover:text-white/70"
      >
        {title}
      </Link>

      {subcategories?.length > 0 && (
        <ul className="flex flex-col mt-2 gap-[3px]">
          {subcategories.map((category) => (
            <li key={category.link}>
              <Link
                href={category.link}
                className="text-sm font-manrope-font  hover:text-white/70"
              >
                {category.name}
              </Link>
            </li>
          ))}
          {products?.map((product) => (
            <li key={product.slug}>
              <Link
                href={product.link}
                className="font-manrope-font whitespace-nowrap text-sm hover:text-white/70"
              >
                {product.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </span>
  </li>
);

const CategoryNav = ({ categories }: ICategoryNavProps) => {
  const t = useTranslations("Menu");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = React.useState<string>("");

  const menuItems = [
    { path: "/", label: "homepage", showOnMobile: true },
    { path: "/products", showOnMobile: true, children: categories },
    { path: "/rent", label: "rent", showOnMobile: true },
    { path: "/service", label: "services", showOnMobile: false },
    { path: "/support", label: "support", showOnMobile: false },
    { path: "/distributors", label: "distributors", showOnMobile: false },
  ];

  useEffect(() => setOpen(""), [pathname]);

  const linkStyle =
    "font-medium font-manrope-font hover:underline underline-offset-[10px] uppercase flex gap-2 items-center";

  return (
    <NavigationMenu value={open} onValueChange={setOpen}>
      <NavigationMenuList className="gap-x-6 flex text-sm xl:text-base">
        {menuItems.map((item) => (
          <NavigationMenuItem
            key={item.path}
            className={item.children ? "x" : ""}
          >
            {!item.children ? (
              <Link href={item.path} className={linkStyle}>
                {t(item.label)}
              </Link>
            ) : (
              <>
                <NavigationMenuTrigger asChild>
                  <Link
                    hrefLang={locale}
                    href={item.path}
                    className={linkStyle}
                  >
                    {t("categories")}
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="z-[100] mr-24" forceMount>
                  <nav>
                    <ul className="grid w-[400px] p-5 md:w-[500px] md:grid-cols-4 lg:w-[800px] xl:w-[900px] gap-3">
                      {categories?.map((category) => (
                        <ListItem key={category.title} {...category} />
                      ))}
                    </ul>
                  </nav>
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default CategoryNav;
