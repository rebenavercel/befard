import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

// const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// import type { NextRequest } from "next/server";

// export async function GET(request: NextRequest) {
//   const path = request.nextUrl.searchParams.get("path") || "";
//   const decodedPath = decodeURIComponent(path);
//   const replacedPath = decodedPath?.replace(backendUrl, "");
//   let pathWithoutEndedSlash = replacedPath
//     .replace(/\/$/, "")
//     .replace(/-pl$|-en$/, "");

//   if (pathWithoutEndedSlash) {
//     console.log(pathWithoutEndedSlash);
//     if (pathWithoutEndedSlash === "homepage") {
//       pathWithoutEndedSlash = "/";
//       revalidatePath(pathWithoutEndedSlash, "layout");
//       return Response.json({ revalidated: true, now: Date.now() });
//     }
//     console.log(pathWithoutEndedSlash);
//     if (pathWithoutEndedSlash.includes("products")) {
//       revalidatePath("/categories", "page");
//       return Response.json({ revalidated: true, now: Date.now() });
//     }
//     console.log(pathWithoutEndedSlash);
//     revalidatePath("/about-us");
//     return Response.json({ revalidated: true, now: Date.now() });
//   }

//   return Response.json({
//     revalidated: false,
//     now: Date.now(),
//     message: "Missing path to revalidate",
//   });
// }
// const locales = ["pl", "en", "de", "es", "fr", "it"];

// function normalizePath(url: string) {
//   try {
//     let decoded = decodeURIComponent(url);
//     decoded = decoded.replace(/\/+/g, "/"); // Usunięcie podwójnych '/'
//     return decoded;
//   } catch (e) {
//     console.error("Błąd dekodowania URL:", e);
//     return url; // W razie błędu zwróć oryginalny
//   }
// }
// export async function GET(request: NextRequest) {
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "";
  revalidatePath("/", "layout");
  return Response.json({
    revalidated: path,
  });
  // const path = request.nextUrl.searchParams.get("path") || "";
  // const decodedPath = decodeURIComponent(path);

  // revalidatePath(path);
  // if (decodedPath?.includes(`${API_URL}/homepage`)) {
  //   const matchedLocale = locales.find((locale) =>
  //     path.startsWith(`${API_URL}/homepage-${locale}`)
  //   );
  //   if (matchedLocale) {
  //     revalidatePath(`/${matchedLocale}`);
  //     return Response.json({
  //       revalidated: true,
  //       now: Date.now(),
  //       path: `/${matchedLocale}/homepage`,
  //     });
  //   }
  // } else if (decodedPath?.includes(`${API_URL}/about-us`)) {
  //   const matchedLocale = locales.find((locale) =>
  //     path.startsWith(`${API_URL}/about-us-${locale}`)
  //   );
  //   if (matchedLocale) {
  //     const currentPath: any = pathnames[PATHS.aboutUs];

  //     const translatedPath = currentPath[matchedLocale];
  //     const normalizeUrl = normalizePath(
  //       `/${matchedLocale}${translatedPath}`
  //     ).replace(/"/g, "");

  //     revalidatePath("/pl/o-nas");
  //     console.log(normalizeUrl);
  //     // /pl/o-nas

  //     console.log(JSON.stringify(`/${matchedLocale}${translatedPath}`));
  //     return Response.json({
  //       revalidated: true,
  //       now: Date.now(),
  //       path: normalizeUrl,
  //     });
  //   }
  // } else if (decodedPath?.includes(`${API_URL}/product-categories`)) {
  //   console.log("product-categories");
  // } else if (decodedPath?.includes(`${API_URL}/contact`)) {
  //   const matchedLocale = locales.find((locale) =>
  //     path.startsWith(`${API_URL}/contact-${locale}`)
  //   );
  //   if (matchedLocale) {
  //     const currentPath: any = pathnames[PATHS.contact];

  //     const translatedPath = currentPath[matchedLocale];

  //     revalidatePath(`/${matchedLocale}${translatedPath}`);
  //     return Response.json({
  //       revalidated: true,
  //       now: Date.now(),
  //       path: `/${matchedLocale}/contact`,
  //     });
  //   }
  // } else if (decodedPath?.includes(`${API_URL}/distributors`)) {
  //   const matchedLocale = locales.find((locale) =>
  //     path.startsWith(`${API_URL}/distributors-${locale}`)
  //   );
  //   if (matchedLocale) {
  //     const currentPath: any = pathnames[PATHS.distributors];
  //     const translatedPath = currentPath[matchedLocale];

  //     revalidatePath(`/${matchedLocale}${translatedPath}`);
  //     return Response.json({
  //       revalidated: true,
  //       now: Date.now(),
  //       path: `/${matchedLocale}/distributors`,
  //     });
  //   }
  // } else if (decodedPath?.includes(`${API_URL}/news`)) {
  //   console.log("news");
  // } else if (decodedPath?.includes(`${API_URL}/privacy`)) {
  //   const matchedLocale = locales.find((locale) =>
  //     path.startsWith(`${API_URL}/privacy-${locale}`)
  //   );
  //   if (matchedLocale) {
  //     const currentPath: any = pathnames[PATHS.policy];
  //     const translatedPath = currentPath[matchedLocale];

  //     revalidatePath(`/${matchedLocale}${translatedPath}`);
  //     return Response.json({
  //       revalidated: true,
  //       now: Date.now(),
  //       path: `/${matchedLocale}/privacy`,
  //     });
  //   }
  // } else if (decodedPath?.includes(`${API_URL}/rent`)) {
  //   const matchedLocale = locales.find((locale) =>
  //     path.startsWith(`${API_URL}/rent-${locale}`)
  //   );
  //   if (matchedLocale) {
  //     const currentPath: any = pathnames[PATHS.rent];
  //     const translatedPath = currentPath[matchedLocale];
  //     console.log(`/${matchedLocale}${translatedPath}`);
  //     revalidatePath(`/${matchedLocale}${translatedPath}`);
  //     return Response.json({
  //       revalidated: true,
  //       now: Date.now(),
  //       path: `/${matchedLocale}/rent`,
  //     });
  //   }
  // } else if (decodedPath?.includes(`${API_URL}/service`)) {
  //   const matchedLocale = locales.find((locale) =>
  //     path.startsWith(`${API_URL}/service-${locale}`)
  //   );
  //   if (matchedLocale) {
  //     const currentPath: any = pathnames[PATHS.service];
  //     const translatedPath = currentPath[matchedLocale];

  //     revalidatePath(`/${matchedLocale}${translatedPath}`);
  //     return Response.json({
  //       revalidated: true,
  //       now: Date.now(),
  //       path: `/${matchedLocale}/service`,
  //     });
  //   }
  // } else if (decodedPath?.includes(`${API_URL}/support`)) {
  //   const matchedLocale = locales.find((locale) =>
  //     path.startsWith(`${API_URL}/support-${locale}`)
  //   );
  //   if (matchedLocale) {
  //     const currentPath: any = pathnames[PATHS.support];
  //     const translatedPath = currentPath[matchedLocale];

  //     revalidatePath(`/${matchedLocale}${translatedPath}`);
  //     return Response.json({
  //       revalidated: true,
  //       now: Date.now(),
  //       path: `/${matchedLocale}/support`,
  //     });
  //   }
  // } else if (decodedPath?.includes(`${API_URL}/products`)) {
  //   console.log("products");
  // }

  // return Response.json({
  //   revalidated: false,
  // });
}
