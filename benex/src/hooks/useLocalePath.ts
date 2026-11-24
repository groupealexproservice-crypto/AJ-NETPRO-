import { localizePath } from "../routes";
import { useLanguage } from "../i18n";

/** Turns a canonical (French) path into the current language's public URL; /admin is left as is. */
export function useLocalePath() {
  const { lang } = useLanguage();
  return (to: string) => (to.startsWith("/") && !to.startsWith("/admin") ? localizePath(to, lang) : to);
}
