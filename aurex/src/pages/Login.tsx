import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { useLanguage } from "../i18n";
import { trpc } from "../providers/trpc";
import { PageMeta } from "../components/Layout";
import { useLocalePath } from "../hooks/useLocalePath";

export default function Login() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const localize = useLocalePath();
  const utils = trpc.useUtils();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = trpc.auth.login.useMutation({
    onSuccess: async (result) => {
      await utils.auth.me.invalidate();
      navigate(result.role === "admin" ? "/admin" : localize("/espace-client"));
    },
    onError: (e) => setError(e.data?.code === "TOO_MANY_REQUESTS"
      ? (lang === "fr" ? "Trop de tentatives. Réessayez dans quelques minutes." : "Too many attempts. Try again in a few minutes.")
      : (lang === "fr" ? "Courriel ou mot de passe incorrect." : "Incorrect e-mail or password.")),
  });
  const submit = (event: FormEvent) => { event.preventDefault(); setError(""); login.mutate({ email, password }); };

  return (
    <section className="lead-page section">
      <PageMeta title={lang === "fr" ? "Connexion" : "Sign in"} description={lang === "fr" ? "Connexion à l’espace client AUREX." : "Sign in to the AUREX client portal."} />
      <div className="shell lead-page-grid">
        <div className="lead-page-copy">
          <p className="eyebrow">{lang === "fr" ? "AUREX / ESPACE CLIENT" : "AUREX / CLIENT PORTAL"}</p>
          <h1>{lang === "fr" ? "Accédez à vos projets et livrables." : "Access your projects and deliverables."}</h1>
          <p>{lang === "fr" ? "Les comptes sont créés par l’équipe AUREX pour chaque organisation cliente. Vous ne verrez que les informations de votre organisation." : "Accounts are created by the AUREX team for each client organization. You will only see your own organization’s information."}</p>
          <div className="lead-assurance"><LockKeyhole size={20} strokeWidth={1.4} /><span>{lang === "fr" ? "Accès protégé par authentification et contrôlé côté serveur." : "Access protected by authentication and verified on the server."}</span></div>
        </div>
        <form className="lead-form" onSubmit={submit}>
          <label className="field"><span>{lang === "fr" ? "Courriel" : "E-mail"}</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required /></label>
          <label className="field"><span>{lang === "fr" ? "Mot de passe" : "Password"}</span><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="form-actions"><button type="submit" className="button-primary" disabled={login.isPending}>{login.isPending ? (lang === "fr" ? "Connexion…" : "Signing in…") : (lang === "fr" ? "Se connecter" : "Sign in")}<ArrowRight size={17} /></button></div>
        </form>
      </div>
    </section>
  );
}
