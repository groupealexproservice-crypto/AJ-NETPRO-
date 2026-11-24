import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "./LocaleLink";
import { ArrowLeft, LogOut } from "lucide-react";
import { Brand, PageMeta } from "./Layout";
import { useLanguage } from "../i18n";
import { useAuth } from "../hooks/useAuth";
import { trpc } from "../providers/trpc";

function PasswordChange() {
  const { lang } = useLanguage();
  const fr = lang === "fr";
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const change = trpc.auth.changePassword.useMutation({
    onSuccess: () => { setCurrent(""); setNext(""); setMessage({ ok: true, text: fr ? "Mot de passe modifié." : "Password changed." }); },
    onError: (e) => setMessage({ ok: false, text: e.message }),
  });
  const submit = (event: FormEvent) => { event.preventDefault(); setMessage(null); change.mutate({ current, next }); };
  return (
    <details className="password-change">
      <summary>{fr ? "Mot de passe" : "Password"}</summary>
      <form onSubmit={submit}>
        <label className="field"><span>{fr ? "Mot de passe actuel" : "Current password"}</span><input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} autoComplete="current-password" required /></label>
        <label className="field"><span>{fr ? "Nouveau (12 caractères min., lettres et chiffres)" : "New (12+ characters, letters and digits)"}</span><input type="password" value={next} onChange={(e) => setNext(e.target.value)} autoComplete="new-password" minLength={12} required /></label>
        {message && <p className={message.ok ? "form-status" : "form-error"} role={message.ok ? "status" : "alert"}>{message.text}</p>}
        <button type="submit" className="button-primary" disabled={change.isPending}>{fr ? "Modifier" : "Change"}</button>
      </form>
    </details>
  );
}

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
          <PasswordChange />
          <button type="button" className="portal-logout" onClick={logout}><LogOut size={17} />{t("logout")}</button>
        </div>
      </header>
      <main className="portal-main">{children}</main>
    </div>
  );
}
