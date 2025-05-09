import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { ElementType } from "react";


interface ICompanyText {
  tag?: ElementType;
  text: string;
  classNameText?: string;
  className?: string;
  classNameBorder?: string;
  href?: string;
}

const CompanyText = ({
  tag = "span",
  text,
  classNameText,
  className,
  classNameBorder,
  href,
}: ICompanyText) => {
  const Tag = href ? (Link as any) : tag;

  return (
    <div className={cn("relative flex items-center", className)}>
      <Tag
        {...(href ? { href } : {})}
        className={cn(
          "text-white font-manrope-font uppercase font-medium",
          classNameText,
        )}
      >
        {text}
      </Tag>
      <span
        className={cn("border-t border-white w-[20px] ml-2.5", classNameBorder)}
      />
    </div>
  );
};

export default CompanyText;
