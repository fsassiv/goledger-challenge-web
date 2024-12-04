import { defaultLocale, locales } from "@/i18n";
import createMiddleware from "next-intl/middleware";

export const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "never",
  // localeDetection: true,
});
