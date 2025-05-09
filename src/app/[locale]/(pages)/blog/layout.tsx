import { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <div className="py-20 lg:py-[110px] bg-black">{children}</div>;
}
