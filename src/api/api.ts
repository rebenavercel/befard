export const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "Missing environment variables. API_URL is not defined in .env file"
  );
}

export const getPageData = async (
  slug: string,
  locale: string,
  params?: string
) => {
  return await fetch(
    `${API_URL}/pages?acf_format=standard&slug=${slug}&lang=${locale}${
      params ? `&${params}` : ""
    }`,
    {
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    }
  ).then((response) => response.json());
};

export const getBlogData = async (
  slug: string,
  locale: string,
  params?: string
) => {
  return await fetch(
    `${API_URL}/posts?acf_format=standard&slug=${slug}&lang=${locale}${
      params ? `&${params}` : ""
    }`,
    {
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    }
  ).then((response) => response.json());
};

/**
 * Get root categories (with no parent)
 */
export const getTopLevelCategories = async (locale: string) => {
  return await fetch(
    `${API_URL}/custom-product-category?parent=0&acf_format=standard&lang=${locale}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    }
  ).then((response) => response.json());
};

/**
 * Get single category by slug
 */
export const getSingleCategoryData = async (locale: string, slug: string) => {
  return await fetch(
    `${API_URL}/custom-product-category?acf_format=standard&lang=${locale}&slug=${slug}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    }
  ).then((response) => response.json());
};

/**
 * Get subcategories for a given parent category ID
 */
export const getSubCategoriesFromCategory = async (id: number) => {
  return await fetch(
    `${API_URL}/custom-product-category?parent=${id}&acf_format=standard`,
    {
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    }
  ).then((response) => response.json());
};

/**
 * Get single product by slug
 */
export const getSingleProduct = async (locale: string, slug: string) => {
  return await fetch(
    `${API_URL}/products?acf_format=standard&lang=${locale}&slug=${slug}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    }
  ).then((response) => response.json());
};

/**
 * Get products from a specific category
 */
export const getProductsFromCustomProductCategory = async (
  id: number,
  perPage?: number
) => {
  const baseUrl = `${API_URL}/products?acf_format=standard&custom-product-category=${id}`;
  const perPageParam = perPage ? `&per_page=${perPage}` : "";

  return await fetch(`${baseUrl}${perPageParam}`, {
    cache: "force-cache",
    next: {
      revalidate: 3600,
    },
  }).then((response) => response.json());
};

export const getSubCategoryParent = async (id: number) => {
  return await fetch(`${API_URL}/custom-product-category/${id}`, {
    cache: "force-cache",
    next: {
      revalidate: 3600,
    },
  }).then((response) => response.json());
};

/**
 * Get category data with products
 */
export const getCategoryProductData = async (locale: string, slug?: string) => {
  return await fetch(
    `${API_URL}/custom-product-category?acf_format=standard&lang=${locale}&slug=${slug}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    }
  ).then((response) => response.json());
};

export const getAllBlogData = async (
  locale: string,
  page: number,
  exclude?: string
) => {
  const baseUrl = `${API_URL}/posts?acf_format=standard&lang=${locale}&per_page=8&page=${page}`;
  const excludeParam = exclude ? `&exclude=${exclude}` : "";

  return await fetch(`${baseUrl}${excludeParam}`, {}).then(async (response) => {
    const responseJson = await response.json();

    return {
      total: response?.headers?.get("X-WP-Total") || "0",
      result: responseJson,
    };
  });
};

type TParams = Record<string, string | null>;

export const TAGS = {
  aboutUs: (params: TParams) => ["aboutUs", JSON.stringify(params)],
  categories: (params: TParams) => ["categories", JSON.stringify(params)],
};
