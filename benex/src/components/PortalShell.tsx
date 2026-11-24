import type { ReactNode } from "react";
import { Link } from "./LocaleLink";
import { ArrowLeft, LogOut } from "lucide-react";
import { Brand, PageMeta } from "./Layout";
import { useLanguage } from "../i18n";
import { useAuth } from "../hooks/useAuth";

export function PortalShell({ title, children }: { title: string; children: ReactNode }) {
  const { lang, setLang, t } = useLanguage();
  const { user, logout } = useAuth();
  return (
    <div className="portal-app">
      <PageMeta title={title} description={title} />
      <header className="portal-header">
        <Link to="/" aria-label={t("home")}><Brand /></Link>
        <div className="portal-header-title"><span>{title}</span><small>{user?.email}</small></div>
        <div className="portal-header-actions">
          <Link to="/" className="portal-back"><ArrowLeft size={17} />{lang === "fr" ? "Site public" : "Public site"}</Link>
          <div className="language-switch"><button type="button" onClick={() => setLang("fr")} aria-pressed={lang === "fr"}>FR</button><span>/</span><button type="button" onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button></div>
          <button type="button" className="portal-logout" onClick={logout}><LogOut size={17} />{t("logout")}</button>
        </div>
      </header>
      <main className="portal-main">{children}</main>
    </div>
  );
}
