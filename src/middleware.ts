import { NextRequest } from "next/server";
import { intlMiddleware } from "./middlewares/";

export default function middleware(req: NextRequest) {
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
