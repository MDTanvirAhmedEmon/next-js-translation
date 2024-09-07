import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "en";

  console.log("Selected language:", lang);
  return {
    locale: lang,
    messages: (await import(`../../messages/${lang}.json`)).default,
  };
});