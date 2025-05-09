import FooterDesktop from "./FooterDesktop";
import FooterMobile from "./FooterMobile";
import { getCategories } from "@/api/category";
import { getFeaturedProducts } from "@/lib/api/get-featured-products";
import { getGlobalSettings } from "@/lib/api/get-general-settings";

interface IFooter {
  locale: string;
}

const Footer = async ({ locale }: IFooter) => {
  const [generalContent, categories, popular] = await Promise.all([
    getGlobalSettings(locale),
    getCategories(locale),
    getFeaturedProducts(locale),
  ]);

  return (
    <footer>
      <div className="lg:hidden">
        <FooterMobile
          general={generalContent}
          categories={categories}
          popular={popular?.products?.slice(0, 10) || []}
        />
      </div>
      <div className="hidden lg:block">
        <FooterDesktop
          general={generalContent}
          categories={categories}
          popular={popular?.products?.slice(0, 10) || []}
        />
      </div>
    </footer>
  );
};

export default Footer;
