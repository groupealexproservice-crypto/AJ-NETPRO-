import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useLocation } from "react-router";
import { Link, NavLink } from "./LocaleLink";
import { ArrowRight, Menu, X, UserRound } from "lucide-react";
import Lenis from "lenis";
import { useLanguage } from "../i18n";
import { parseLocalized } from "../routes";
import { expertises, tx } from "../content";
import { trpc } from "../providers/trpc";

export function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={`brand ${inverted ? "brand-inverted" : ""}`} aria-label="BENEX Solutions">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span className="brand-word">BENEX<small>SOLUTIONS</small></span>
    </span>
  );
}

export function Rollover({ children }: { children: string }) {
  return <span className="rollover"><span>{children}</span><span aria-hidden="true">{children}</span></span>;
}

export function ArrowLink({ to, children, light = false }: { to: string; children: string; light?: boolean }) {
  return (
    <Link to={to} className={`arrow-link ${light ? "arrow-link-light" : ""}`}>
      <Rollover>{children}</Rollover><ArrowRight size={18} strokeWidth={1.5} />
    </Link>
  );
}

const nav = [
  { key: "home", to: "/" },
  { key: "about", to: "/a-propos" },
  { key: "expertise", to: "/expertises" },
  { key: "solutions", to: "/solutions" },
  { key: "sectors", to: "/secteurs" },
  { key: "method", to: "/methode" },
  { key: "work", to: "/realisations" },
  { key: "insights", to: "/perspectives" },
  { key: "contact", to: "/contact" },
];

const secondaryNav = [
  { key: "diagnostic", to: "/diagnostic" },
  { key: "quote", to: "/soumission" },
];

export function Layout({ children }: { children: ReactNode }) {
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dark = parseLocalized(location.pathname)?.canonical === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, duration: 1.05 });
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">{lang === "fr" ? "Aller au contenu" : "Skip to content"}</a>
      <header className={`site-header ${dark ? "header-dark" : "header-light"} ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <Link to="/" className="logo-link" aria-label={t("home")}><Brand inverted={dark} /></Link>
          <nav className="desktop-nav" aria-label={t("menu")}>
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === "/"} className={({ isActive }) => isActive ? "nav-active" : ""}>
                <Rollover>{t(item.key)}</Rollover>
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <div className="language-switch" aria-label="Language / Langue">
              <button type="button" onClick={() => setLang("fr")} aria-pressed={lang === "fr"}>FR</button>
              <span>/</span>
              <button type="button" onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button>
            </div>
            <Link to="/espace-client" className="client-link" aria-label={t("client")} title={t("client")}><UserRound size={19} strokeWidth={1.5} /></Link>
            <Link to="/consultation" className="header-cta"><Rollover>{t("consult")}</Rollover><ArrowRight size={16} /></Link>
            <button ref={open ? closeRef : undefined} type="button" className="menu-trigger" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? t("close") : t("menu")}>
              {open ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label={t("menu")}>
          <button ref={closeRef} type="button" className="mobile-close" onClick={() => setOpen(false)} aria-label={t("close")}><X size={28} /></button>
          <nav>
            {[...nav, ...secondaryNav].map((item, index) => (
              <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} style={{ "--nav-index": index } as React.CSSProperties}>
                <span>{String(index + 1).padStart(2, "0")}</span>{t(item.key)}<ArrowRight size={24} strokeWidth={1.2} />
              </NavLink>
            ))}
          </nav>
          <div className="mobile-menu-bottom">
            <p>Strategy. Innovation. Growth.</p>
            <Link to="/espace-client" onClick={() => setOpen(false)}>{t("client")}<ArrowRight size={18} /></Link>
          </div>
        </div>
      )}

      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}

function Footer() {
  const { lang, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const subscribe = trpc.leads.subscribe.useMutation({
    onSuccess: () => {
      setMessage(t("subscribed"));
      setEmail("");
      setConsent(false);
    },
    onError: () => setMessage(t("errorText")),
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setMessage("");
    subscribe.mutate({ email, consent: true, locale: lang, website: honeypot });
  };

  return (
    <footer className="site-footer">
      <div className="footer-top shell">
        <div>
          <p className="footer-signature">Strategy. Innovation. Growth.</p>
          <h2>{lang === "fr" ? "Transformer les ambitions en résultats." : "Turn ambition into results."}</h2>
        </div>
        <ArrowLink to="/consultation" light>{t("consult")}</ArrowLink>
      </div>
      <div className="footer-grid shell">
        <div className="footer-nav-group">
          <p className="footer-label">BENEX Solutions</p>
          <Link to="/a-propos">{t("about")}</Link>
          <Link to="/expertises">{t("expertise")}</Link>
          <Link to="/solutions">{t("solutions")}</Link>
          <Link to="/realisations">{t("work")}</Link>
        </div>
        <div className="footer-nav-group">
          <p className="footer-label">{t("explore")}</p>
          <Link to="/secteurs">{t("sectors")}</Link>
          <Link to="/methode">{t("method")}</Link>
          <Link to="/perspectives">{t("insights")}</Link>
          <Link to="/contact">{t("contact")}</Link>
        </div>
        <div className="footer-nav-group footer-expertises">
          <p className="footer-label">{t("expertise")}</p>
          {expertises.map((e) => <Link key={e.slug} to={`/expertises/${e.slug}`}>{tx(e.title, lang)}</Link>)}
        </div>
        <form className="newsletter" onSubmit={submit}>
          <div className="honeypot" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></label></div>
          <p className="footer-label">{t("newsletter")}</p>
          <p>{t("newsletterText")}</p>
          <label htmlFor="newsletter-email">{t("formEmail")}</label>
          <div className="newsletter-input">
            <input id="newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
            <button type="submit" disabled={subscribe.isPending || !consent} aria-label={t("subscribe")}><ArrowRight size={20} /></button>
          </div>
          <label className="consent-row consent-light">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required />
            <span>{t("newsletterConsent")}</span>
          </label>
          {message && <p className="form-status" role="status">{message}</p>}
        </form>
      </div>
      <div className="footer-wordmark" aria-hidden="true">BENEX</div>
      <div className="footer-legal shell">
        <span>© {new Date().getFullYear()} BENEX Solutions</span>
        <Link to="/confidentialite">{t("privacy")}</Link>
        <a href={`/brochures/benex-solutions-${lang}.pdf`} download>{t("brochure")}</a>
        <Link to="/desabonnement">{t("unsubscribe")}</Link>
        <Link to="/espace-client">{t("client")}</Link>
      </div>
    </footer>
  );
}

export function PageMeta({ title, description }: { title: string; description: string }) {
  const { lang } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const fullTitle = `${title} | BENEX Solutions`;
    const url = `${window.location.origin}${location.pathname}`;
    document.title = fullTitle;
    const setMeta = (selector: string, attribute: "name" | "property", key: string, content: string) => {
      let element = document.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = content;
    };
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:locale"]', "property", "og:locale", lang === "fr" ? "fr_CA" : "en_CA");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, lang, location.pathname]);
  return null;
}
