import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const intlMiddleware = createMiddleware(routing);

  const intlResponse = intlMiddleware(req);

  return intlResponse || NextResponse.next();
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
