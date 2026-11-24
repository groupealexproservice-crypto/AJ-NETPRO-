import { useState, type FormEvent } from "react";
import { ArrowUpRight, FileText, Send } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { trpc } from "../providers/trpc";
import { PortalShell } from "../components/PortalShell";
import { useLanguage } from "../i18n";

const itemTypes = ["all", "milestone", "proposal", "document", "report", "kpi", "invoice", "recommendation", "message"] as const;

export default function ClientPortal() {
  const { lang, t } = useLanguage();
  const { user, isLoading } = useAuth({ redirectOnUnauthenticated: true });
  const [filter, setFilter] = useState<(typeof itemTypes)[number]>("all");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [projectId, setProjectId] = useState<string>("");
  const [sent, setSent] = useState(false);
  const utils = trpc.useUtils();
  const { data, isLoading: dataLoading } = trpc.portal.overview.useQuery(undefined, { enabled: !!user && user.role === "client" });
  const sendMessage = trpc.portal.sendMessage.useMutation({
    onSuccess: () => {
      setTitle(""); setBody(""); setProjectId(""); setSent(true);
      void utils.portal.overview.invalidate();
    },
  });

  if (isLoading || !user) return <div className="portal-loading">{t("loading")}</div>;
  const items = data?.items.filter((item) => filter === "all" || item.type === filter) ?? [];
  const labels: Record<string, string> = lang === "fr" ? {
    all: "Tout", milestone: "Échéanciers", proposal: "Propositions", document: "Documents", report: "Rapports", kpi: "Indicateurs", invoice: "Factures", recommendation: "Recommandations", message: "Messages",
  } : {
    all: "All", milestone: "Schedules", proposal: "Proposals", document: "Documents", report: "Reports", kpi: "KPIs", invoice: "Invoices", recommendation: "Recommendations", message: "Messages",
  };

  const submitMessage = (event: FormEvent) => {
    event.preventDefault();
    setSent(false);
    sendMessage.mutate({ title, body, projectId: projectId ? Number(projectId) : undefined });
  };

  return (
    <PortalShell title={t("client")}>
      <section className="portal-welcome">
        <p className="eyebrow">AUREX / {lang === "fr" ? "ESPACE SÉCURISÉ" : "SECURE PORTAL"}</p>
        <h1>{lang === "fr" ? `Bonjour, ${user.name}.` : `Hello, ${user.name}.`}</h1>
        <p>{lang === "fr" ? `Retrouvez ici les projets, livrables et échanges de ${data?.organization ?? "votre organisation"}.` : `Find the projects, deliverables and exchanges of ${data?.organization ?? "your organization"}.`}</p>
      </section>

      <section className="portal-section">
        <div className="portal-section-heading"><h2>{lang === "fr" ? "Projets en cours" : "Current projects"}</h2><span>{data?.projects.length ?? 0}</span></div>
        {dataLoading ? <p>{t("loading")}</p> : data?.projects.length ? <div className="client-project-grid">{data.projects.map((project) => <article key={project.id}><div><span className={`status-dot status-${project.status}`} />{project.status}</div><h3>{project.name}</h3><p>{project.description || (lang === "fr" ? "Le détail du projet sera complété par votre équipe AUREX." : "Project details will be completed by your AUREX team.")}</p><footer>{project.startDate || "—"} <span>→</span> {project.endDate || (lang === "fr" ? "En cours" : "Ongoing")}</footer></article>)}</div> : <div className="portal-empty"><FileText size={26} strokeWidth={1.2} /><p>{lang === "fr" ? "Aucun projet n’est encore associé à ce compte. Votre équipe AUREX pourra les ajouter après cadrage de la mission." : "No projects are associated with this account yet. Your AUREX team can add them after the mandate is framed."}</p></div>}
      </section>

      <section className="portal-section">
        <div className="portal-section-heading"><h2>{lang === "fr" ? "Suivi et documents" : "Tracking and documents"}</h2></div>
        <div className="portal-tabs" role="tablist" aria-label={lang === "fr" ? "Types de contenu" : "Content types"}>{itemTypes.map((type) => <button type="button" role="tab" aria-selected={filter === type} key={type} onClick={() => setFilter(type)}>{labels[type]}</button>)}</div>
        {items.length ? <div className="client-item-list">{items.map((item) => <article key={item.id}><div className="client-item-type">{labels[item.type]}<time>{new Intl.DateTimeFormat(lang === "fr" ? "fr-CA" : "en-CA").format(new Date(item.createdAt))}</time></div><h3>{item.title}</h3>{item.body && <p>{item.body}</p>}<div className="client-item-meta">{item.status && <span>{item.status}</span>}{item.value && <strong>{item.value}</strong>}{item.dueDate && <time>{item.dueDate}</time>}{item.hasFile && <a href={`/api/files/${item.id}`} download>{lang === "fr" ? "Télécharger le document" : "Download document"}<ArrowUpRight size={16} /></a>}</div></article>)}</div> : <div className="portal-empty"><p>{lang === "fr" ? "Aucun élément dans cette catégorie pour le moment." : "No items in this category yet."}</p></div>}
      </section>

      <section className="portal-section client-message-section">
        <div><p className="eyebrow">AUREX / {lang === "fr" ? "ÉCHANGES" : "EXCHANGES"}</p><h2>{lang === "fr" ? "Écrire à votre équipe" : "Message your team"}</h2><p>{lang === "fr" ? "Votre message sera ajouté à l’historique sécurisé de votre compte et une notification interne sera créée." : "Your message will be added to your account’s secure history and an internal notification will be created."}</p></div>
        <form onSubmit={submitMessage} className="client-message-form">
          <label className="field"><span>{lang === "fr" ? "Projet associé" : "Related project"}</span><select value={projectId} onChange={(event) => setProjectId(event.target.value)}><option value="">{lang === "fr" ? "Aucun projet spécifique" : "No specific project"}</option>{data?.projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select></label>
          <label className="field"><span>{lang === "fr" ? "Objet" : "Subject"}</span><input value={title} onChange={(event) => setTitle(event.target.value)} minLength={2} required /></label>
          <label className="field"><span>Message</span><textarea value={body} onChange={(event) => setBody(event.target.value)} rows={4} minLength={2} required /></label>
          {sent && <p className="form-status" role="status">{lang === "fr" ? "Votre message a été transmis." : "Your message has been sent."}</p>}
          {sendMessage.error && <p className="form-error" role="alert">{t("errorText")}</p>}
          <button type="submit" className="button-primary" disabled={sendMessage.isPending}>{sendMessage.isPending ? t("sending") : (lang === "fr" ? "Envoyer le message" : "Send message")}<Send size={17} /></button>
        </form>
      </section>
      {user.role === "admin" && <a href="/admin" className="admin-shortcut">{t("admin")}<ArrowUpRight size={18} /></a>}
    </PortalShell>
  );
}
