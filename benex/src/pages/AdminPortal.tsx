import { useState, type FormEvent, type ReactNode } from "react";
import { Bell, CheckCheck, Download, LockKeyhole, Trash2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { trpc } from "../providers/trpc";
import { PortalShell } from "../components/PortalShell";
import { expertises, sectors, solutions } from "../content";
import { LEAD_STATUSES } from "@contracts/constants";
import { useAdminOverview, type AdminData, type RefreshAdmin } from "./adminData";

// The administration is an internal tool for the BENEX team and is written in French.

const tabs = [
  ["overview", "Vue d’ensemble"], ["leads", "Demandes"], ["clients", "Clients"], ["projects", "Projets et livrables"],
  ["content", "Contenus"], ["campaigns", "Campagnes"], ["integrations", "Intégrations"],
] as const;
type Tab = (typeof tabs)[number][0];

const modeLabel: Record<string, string> = { contact: "Contact", diagnostic: "Diagnostic", quote: "Soumission", appointment: "Consultation", newsletter: "Infolettre" };
const statusLabel: Record<string, string> = { new: "Nouvelle", in_progress: "En cours", qualified: "Qualifiée", quoted: "Soumission envoyée", scheduled: "Rendez-vous planifié", won: "Gagnée", closed: "Fermée", archived: "Archivée" };
const timeSlotLabel: Record<string, string> = { morning: "Matin", afternoon: "Après-midi", evening: "Fin de journée" };
const engagementLabel: Record<string, string> = { mandate: "Mandat ponctuel", monthly: "Accompagnement mensuel", undecided: "À déterminer" };
const sectorName = (slug?: string | null) => sectors.find((s) => s.slug === slug)?.name.fr ?? slug ?? "—";
const solutionName = (slug?: string | null) => solutions.find((s) => s.slug === slug)?.name ?? "—";
const fmt = (value: string | Date) => new Intl.DateTimeFormat("fr-CA", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="field"><span>{label}</span>{children}</label>;
}

function OverviewPanel({ data, refresh }: { data: AdminData; refresh: RefreshAdmin }) {
  const stats = trpc.admin.stats.useQuery();
  const markRead = trpc.admin.markNotificationsRead.useMutation({ onSuccess: refresh });
  const counts = [
    ["Nouvelles demandes", data.leads.filter((l) => l.status === "new").length],
    ["Demandes des 30 derniers jours", stats.data?.last30 ?? 0],
    ["Consultations à confirmer", data.leads.filter((l) => l.mode === "appointment" && !["scheduled", "closed", "archived"].includes(l.status)).length],
    ["Projets actifs", data.projects.filter((p) => p.status === "active").length],
  ] as const;
  const total = (rows?: { total: number }[]) => (rows ?? []).reduce((sum, r) => sum + r.total, 0) || 1;
  return <>
    <div className="admin-stat-grid">{counts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{String(value).padStart(2, "0")}</strong></div>)}</div>
    <div className="admin-overview-grid">
      <section>
        <div className="portal-section-heading"><h2>Demandes par type</h2></div>
        <div className="admin-bars">{(stats.data?.byMode ?? []).map((row) => <div key={row.mode}><span>{modeLabel[row.mode]}</span><i style={{ width: `${(row.total / total(stats.data?.byMode)) * 100}%` }} /><b>{row.total}</b></div>)}</div>
        <div className="portal-section-heading" style={{ marginTop: 32 }}><h2>Demandes par secteur</h2></div>
        <div className="admin-bars">{(stats.data?.bySector ?? []).map((row) => <div key={row.sector}><span>{sectorName(row.sector)}</span><i style={{ width: `${(row.total / total(stats.data?.bySector)) * 100}%` }} /><b>{row.total}</b></div>)}</div>
        {!stats.data?.byMode.length && <p className="portal-empty">Aucune demande enregistrée pour le moment.</p>}
      </section>
      <section>
        <div className="portal-section-heading"><h2><Bell size={21} />Notifications internes</h2><button type="button" className="icon-button" onClick={() => markRead.mutate()} title="Tout marquer comme lu"><CheckCheck size={18} /></button></div>
        <div className="admin-record-list compact">{data.notifications.map((n) => <article key={n.id}><div><span>{fmt(n.createdAt)}</span><p>{n.message}</p></div>{!n.isRead && <b className="unread-dot" aria-label="Non lu" />}</article>)}</div>
        {!data.notifications.length && <p className="portal-empty">Aucune notification.</p>}
      </section>
    </div>
  </>;
}

function LeadsPanel({ data, refresh }: { data: AdminData; refresh: RefreshAdmin }) {
  const [mode, setMode] = useState("all");
  const [search, setSearch] = useState("");
  const update = trpc.admin.updateLead.useMutation({ onSuccess: refresh });
  const [notes, setNotes] = useState<Record<number, string>>({});
  const filtered = data.leads.filter((l) => (mode === "all" || l.mode === mode) && `${l.reference} ${l.name} ${l.company} ${l.email} ${l.message}`.toLowerCase().includes(search.toLowerCase()));
  return <>
    <div className="admin-panel-heading"><div><h2>Suivi commercial</h2><p>Chaque demande, avec son consentement horodaté et sa référence de suivi.</p></div>
      <div className="admin-filters"><input aria-label="Rechercher" placeholder="Rechercher" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select aria-label="Type" value={mode} onChange={(e) => setMode(e.target.value)}><option value="all">Tous les types</option>{Object.entries(modeLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div></div>
    <div className="lead-list">{filtered.map((lead) => <details key={lead.id} className="lead-record" data-reference={lead.reference}>
      <summary><span className="lead-id">{lead.reference}</span><div><strong>{lead.company ?? lead.name ?? lead.email}</strong><small>{modeLabel[lead.mode]} · {lead.email}</small></div><span className={`status-pill status-${lead.status}`}>{statusLabel[lead.status]}</span><time>{fmt(lead.createdAt)}</time></summary>
      <div className="lead-detail">
        <p><b>Contact</b>{"\n"}{lead.name ?? "—"} · {lead.email}{lead.phone ? ` · ${lead.phone}` : ""}</p>
        {lead.sector && <p><b>Secteur</b>{"\n"}{sectorName(lead.sector)}</p>}
        {lead.solution && <p><b>Solution</b>{"\n"}{solutionName(lead.solution)}</p>}
        {lead.engagementType && <p><b>Accompagnement</b>{"\n"}{engagementLabel[lead.engagementType] ?? lead.engagementType}</p>}
        {lead.budget && <p><b>Budget indicatif</b>{"\n"}{lead.budget}</p>}
        {lead.services?.length ? <p><b>Expertises</b>{"\n"}{lead.services.map((s) => expertises.find((e) => e.slug === s)?.title.fr ?? s).join(", ")}</p> : null}
        {lead.mode === "appointment" && <p><b>Préférence de rendez-vous (à confirmer)</b>{"\n"}{lead.preferredDate} · {timeSlotLabel[lead.timeSlot ?? ""] ?? lead.timeSlot}{lead.confirmedAt ? `\nConfirmé : ${lead.confirmedAt}` : ""}</p>}
        {lead.currentSituation && <p className="lead-message"><b>Situation actuelle</b>{"\n"}{lead.currentSituation}</p>}
        {lead.objectives && <p className="lead-message"><b>Objectifs</b>{"\n"}{lead.objectives}</p>}
        {lead.challenges && <p className="lead-message"><b>Difficultés</b>{"\n"}{lead.challenges}</p>}
        {lead.message && <p className="lead-message"><b>Message</b>{"\n"}{lead.message}</p>}
        <p><b>Consentement</b>{"\n"}{fmt(lead.consentAt)} · version {lead.consentTextVersion} · {lead.locale.toUpperCase()}{lead.unsubscribedAt ? "\nDésabonné" : ""}</p>
        <div className="lead-actions">
          <label className="field"><span>Statut</span><select value={lead.status} onChange={(e) => update.mutate({ id: lead.id, status: e.target.value as (typeof LEAD_STATUSES)[number] })}>{LEAD_STATUSES.map((s) => <option key={s} value={s}>{statusLabel[s]}</option>)}</select></label>
          {lead.mode === "appointment" && <label className="field"><span>Rendez-vous confirmé (date et heure)</span><input defaultValue={lead.confirmedAt ?? ""} placeholder="2026-12-03 10:30" onBlur={(e) => e.target.value !== (lead.confirmedAt ?? "") && update.mutate({ id: lead.id, confirmedAt: e.target.value, status: e.target.value ? "scheduled" : undefined })} /></label>}
          <label className="field lead-message"><span>Notes internes</span><textarea rows={3} value={notes[lead.id] ?? lead.internalNotes ?? ""} onChange={(e) => setNotes({ ...notes, [lead.id]: e.target.value })} onBlur={() => notes[lead.id] !== undefined && update.mutate({ id: lead.id, internalNotes: notes[lead.id] })} /></label>
        </div>
      </div>
    </details>)}</div>
    {!filtered.length && <p className="portal-empty">Aucune demande ne correspond.</p>}
  </>;
}

function ClientsPanel({ data, refresh }: { data: AdminData; refresh: RefreshAdmin }) {
  const [orgName, setOrgName] = useState("");
  const [user, setUser] = useState({ name: "", email: "", organizationId: "", password: "" });
  const [error, setError] = useState("");
  const createOrg = trpc.admin.createOrganization.useMutation({ onSuccess: () => { setOrgName(""); refresh(); } });
  const createUser = trpc.admin.createClientUser.useMutation({ onSuccess: () => { setUser({ name: "", email: "", organizationId: "", password: "" }); setError(""); refresh(); }, onError: (e) => setError(e.message) });
  const setActive = trpc.admin.setUserActive.useMutation({ onSuccess: refresh });
  return <div className="admin-panel">
    <div className="admin-forms">
      <form onSubmit={(e: FormEvent) => { e.preventDefault(); createOrg.mutate({ name: orgName }); }}>
        <h3>Nouvelle organisation cliente</h3>
        <Field label="Nom"><input value={orgName} onChange={(e) => setOrgName(e.target.value)} required minLength={2} /></Field>
        <button className="button-primary" type="submit">Créer l’organisation</button>
      </form>
      <form onSubmit={(e: FormEvent) => { e.preventDefault(); createUser.mutate({ ...user, organizationId: Number(user.organizationId) }); }}>
        <h3>Nouveau compte client</h3>
        <Field label="Nom"><input value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required /></Field>
        <Field label="Courriel"><input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required /></Field>
        <Field label="Organisation"><select value={user.organizationId} onChange={(e) => setUser({ ...user, organizationId: e.target.value })} required><option value="">Sélectionner</option>{data.organizations.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}</select></Field>
        <Field label="Mot de passe initial (12 caractères, lettres et chiffres)"><input type="text" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} required minLength={12} autoComplete="off" /></Field>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button-primary" type="submit">Créer le compte</button>
      </form>
    </div>
    <div className="admin-record-list">{data.users.map((u) => <article key={u.id}><div><span>{u.role === "admin" ? "Administrateur" : data.organizations.find((o) => o.id === u.organizationId)?.name ?? "Sans organisation"}</span><h3>{u.name}</h3><p>{u.email} · {u.lastSignInAt ? `dernière connexion ${fmt(u.lastSignInAt)}` : "jamais connecté"}</p></div>
      <button type="button" className="button-secondary" onClick={() => setActive.mutate({ userId: u.id, active: !u.active })}>{u.active ? "Désactiver" : "Réactiver"}</button></article>)}</div>
  </div>;
}

function ProjectsPanel({ data, refresh }: { data: AdminData; refresh: RefreshAdmin }) {
  const emptyProject = { organizationId: "", name: "", description: "", status: "planning" as const, startDate: "", endDate: "" };
  const emptyItem = { organizationId: "", projectId: "", type: "document" as const, title: "", body: "", status: "", value: "", dueDate: "" };
  const [project, setProject] = useState(emptyProject);
  const [item, setItem] = useState(emptyItem);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const createProject = trpc.admin.createProject.useMutation({ onSuccess: () => { setProject(emptyProject); refresh(); } });
  const setStatus = trpc.admin.updateProjectStatus.useMutation({ onSuccess: refresh });
  const createItem = trpc.admin.createClientItem.useMutation({ onSuccess: () => { setItem(emptyItem); setFile(null); setMessage("Élément publié pour le client."); refresh(); }, onError: (e) => setMessage(e.message) });
  const deleteItem = trpc.admin.deleteClientItem.useMutation({ onSuccess: refresh });
  const orgName = (id: number) => data.organizations.find((o) => o.id === id)?.name ?? "—";
  const projectsOfOrg = data.projects.filter((p) => String(p.organizationId) === item.organizationId);

  const submitItem = async (e: FormEvent) => {
    e.preventDefault(); setMessage("");
    let uploaded;
    if (file) {
      const body = new FormData(); body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body, credentials: "include" });
      if (!res.ok) return setMessage(`Téléversement refusé : ${(await res.json().catch(() => ({}))).error ?? res.status}`);
      uploaded = await res.json();
    }
    createItem.mutate({ organizationId: Number(item.organizationId), projectId: item.projectId ? Number(item.projectId) : undefined, type: item.type, title: item.title, body: item.body, status: item.status, value: item.value, dueDate: item.dueDate, file: uploaded });
  };

  return <div className="admin-panel">
    <div className="admin-forms">
      <form onSubmit={(e: FormEvent) => { e.preventDefault(); createProject.mutate({ ...project, organizationId: Number(project.organizationId) }); }}>
        <h3>Nouveau projet</h3>
        <Field label="Organisation"><select value={project.organizationId} onChange={(e) => setProject({ ...project, organizationId: e.target.value })} required><option value="">Sélectionner</option>{data.organizations.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}</select></Field>
        <Field label="Nom du projet"><input value={project.name} onChange={(e) => setProject({ ...project, name: e.target.value })} required /></Field>
        <Field label="Description"><textarea rows={3} value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} /></Field>
        <div className="form-grid two-columns"><Field label="Début"><input type="date" value={project.startDate} onChange={(e) => setProject({ ...project, startDate: e.target.value })} /></Field><Field label="Fin prévue"><input type="date" value={project.endDate} onChange={(e) => setProject({ ...project, endDate: e.target.value })} /></Field></div>
        <button className="button-primary" type="submit">Créer le projet</button>
      </form>
      <form onSubmit={submitItem}>
        <h3>Publier pour un client</h3>
        <Field label="Organisation"><select value={item.organizationId} onChange={(e) => setItem({ ...item, organizationId: e.target.value, projectId: "" })} required><option value="">Sélectionner</option>{data.organizations.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}</select></Field>
        <div className="form-grid two-columns">
          <Field label="Type"><select value={item.type} onChange={(e) => setItem({ ...item, type: e.target.value as typeof item.type })}>{[["milestone", "Échéancier"], ["proposal", "Proposition"], ["document", "Document"], ["report", "Rapport"], ["kpi", "Indicateur"], ["invoice", "Facture"], ["recommendation", "Recommandation"]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></Field>
          <Field label="Projet"><select value={item.projectId} onChange={(e) => setItem({ ...item, projectId: e.target.value })}><option value="">Aucun</option>{projectsOfOrg.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></Field>
        </div>
        <Field label="Titre"><input value={item.title} onChange={(e) => setItem({ ...item, title: e.target.value })} required /></Field>
        <Field label="Texte"><textarea rows={3} value={item.body} onChange={(e) => setItem({ ...item, body: e.target.value })} /></Field>
        <div className="form-grid two-columns"><Field label="Statut"><input value={item.status} onChange={(e) => setItem({ ...item, status: e.target.value })} /></Field><Field label="Valeur (indicateur, montant)"><input value={item.value} onChange={(e) => setItem({ ...item, value: e.target.value })} /></Field></div>
        <div className="form-grid two-columns"><Field label="Échéance"><input type="date" value={item.dueDate} onChange={(e) => setItem({ ...item, dueDate: e.target.value })} /></Field><Field label="Fichier (PDF, Office, image, CSV)"><input type="file" accept=".pdf,.docx,.xlsx,.pptx,.png,.jpg,.jpeg,.csv,.txt" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /></Field></div>
        {message && <p className="form-status" role="status">{message}</p>}
        <button className="button-primary" type="submit">Publier</button>
      </form>
    </div>
    <h3 className="admin-subheading">Projets</h3>
    <div className="admin-record-list">{data.projects.map((p) => <article key={p.id}><div><span>{orgName(p.organizationId)}</span><h3>{p.name}</h3><p>{p.description}</p></div>
      <select aria-label={`Statut de ${p.name}`} value={p.status} onChange={(e) => setStatus.mutate({ id: p.id, status: e.target.value as typeof p.status })}>{[["planning", "Planification"], ["active", "Actif"], ["on_hold", "En pause"], ["completed", "Terminé"]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></article>)}</div>
    <h3 className="admin-subheading">Éléments publiés</h3>
    <div className="admin-record-list">{data.items.map((i) => <article key={i.id}><div><span>{orgName(i.organizationId)} · {i.type}{i.author === "client" ? " · message du client" : ""}</span><h3>{i.title}</h3><p>{i.body}</p></div>
      <div className="admin-row-actions">{i.hasFile && <a className="icon-button" href={`/api/files/${i.id}`} download title="Télécharger"><Download size={17} /></a>}<button type="button" className="icon-button" title="Supprimer" onClick={() => window.confirm("Supprimer cet élément ?") && deleteItem.mutate({ id: i.id })}><Trash2 size={17} /></button></div></article>)}</div>
  </div>;
}

function ContentPanel({ data, refresh }: { data: AdminData; refresh: RefreshAdmin }) {
  const emptyPost = { slug: "", titleFr: "", titleEn: "", excerptFr: "", excerptEn: "", bodyFr: "", bodyEn: "", status: "draft" as "draft" | "published" };
  const [post, setPost] = useState<typeof emptyPost & { id?: number }>(emptyPost);
  const emptyCase = { slug: "", titleFr: "", titleEn: "", summaryFr: "", summaryEn: "", clientPermission: false, status: "draft" as "draft" | "published" };
  const [study, setStudy] = useState<typeof emptyCase & { id?: number }>(emptyCase);
  const [error, setError] = useState("");
  const upsertPost = trpc.admin.upsertPost.useMutation({ onSuccess: () => { setPost(emptyPost); setError(""); refresh(); }, onError: (e) => setError(e.message) });
  const deletePost = trpc.admin.deletePost.useMutation({ onSuccess: refresh });
  const upsertCase = trpc.admin.upsertCaseStudy.useMutation({ onSuccess: () => { setStudy(emptyCase); setError(""); refresh(); }, onError: (e) => setError(e.message) });
  const deleteCase = trpc.admin.deleteCaseStudy.useMutation({ onSuccess: refresh });
  const updateSolution = trpc.admin.updateSolution.useMutation({ onSuccess: refresh });
  const [solution, setSolution] = useState({ slug: "", nameFr: "", nameEn: "", summaryFr: "", summaryEn: "" });
  const pick = (slug: string) => {
    const base = solutions.find((s) => s.slug === slug); const saved = data.solutions.find((s) => s.slug === slug);
    setSolution(base ? { slug, nameFr: saved?.nameFr ?? base.name, nameEn: saved?.nameEn ?? base.name, summaryFr: saved?.summaryFr ?? base.summary.fr, summaryEn: saved?.summaryEn ?? base.summary.en } : { slug: "", nameFr: "", nameEn: "", summaryFr: "", summaryEn: "" });
  };
  const set = <T extends object>(setter: (v: T) => void, value: T) => (key: keyof T, v: unknown) => setter({ ...value, [key]: v });
  const sp = set(setPost, post), ss = set(setStudy, study);
  return <div className="admin-panel">
    {error && <p className="form-error" role="alert">{error}</p>}
    <div className="admin-forms">
      <form onSubmit={(e: FormEvent) => { e.preventDefault(); upsertPost.mutate(post); }}>
        <h3>Perspective et analyse (bilingue)</h3>
        <Field label="Identifiant d’URL (minuscules et tirets)"><input value={post.slug} onChange={(e) => sp("slug", e.target.value)} pattern="[a-z0-9\-]+" required /></Field>
        <div className="form-grid two-columns"><Field label="Titre (FR)"><input value={post.titleFr} onChange={(e) => sp("titleFr", e.target.value)} required /></Field><Field label="Title (EN)"><input value={post.titleEn} onChange={(e) => sp("titleEn", e.target.value)} required /></Field></div>
        <div className="form-grid two-columns"><Field label="Résumé (FR)"><textarea rows={2} value={post.excerptFr} onChange={(e) => sp("excerptFr", e.target.value)} required /></Field><Field label="Summary (EN)"><textarea rows={2} value={post.excerptEn} onChange={(e) => sp("excerptEn", e.target.value)} required /></Field></div>
        <div className="form-grid two-columns"><Field label="Texte (FR) — paragraphes séparés par une ligne vide"><textarea rows={6} value={post.bodyFr} onChange={(e) => sp("bodyFr", e.target.value)} required minLength={10} /></Field><Field label="Text (EN)"><textarea rows={6} value={post.bodyEn} onChange={(e) => sp("bodyEn", e.target.value)} required minLength={10} /></Field></div>
        <Field label="Statut"><select value={post.status} onChange={(e) => sp("status", e.target.value)}><option value="draft">Brouillon</option><option value="published">Publié</option></select></Field>
        <button className="button-primary" type="submit">{post.id ? "Mettre à jour" : "Enregistrer"}</button>
      </form>
      <form onSubmit={(e: FormEvent) => { e.preventDefault(); upsertCase.mutate(study); }}>
        <h3>Réalisation (étude de cas)</h3>
        <p className="legal-note">Une réalisation ne peut être publiée que si l’autorisation du client est consignée. Aucun résultat ne doit être ajouté sans preuve vérifiée.</p>
        <Field label="Identifiant d’URL"><input value={study.slug} onChange={(e) => ss("slug", e.target.value)} pattern="[a-z0-9\-]+" required /></Field>
        <div className="form-grid two-columns"><Field label="Titre (FR)"><input value={study.titleFr} onChange={(e) => ss("titleFr", e.target.value)} required /></Field><Field label="Title (EN)"><input value={study.titleEn} onChange={(e) => ss("titleEn", e.target.value)} required /></Field></div>
        <div className="form-grid two-columns"><Field label="Résumé vérifié (FR)"><textarea rows={4} value={study.summaryFr} onChange={(e) => ss("summaryFr", e.target.value)} required minLength={10} /></Field><Field label="Verified summary (EN)"><textarea rows={4} value={study.summaryEn} onChange={(e) => ss("summaryEn", e.target.value)} required minLength={10} /></Field></div>
        <label className="consent-row"><input type="checkbox" checked={study.clientPermission} onChange={(e) => ss("clientPermission", e.target.checked)} /><span>L’autorisation écrite du client est consignée.</span></label>
        <Field label="Statut"><select value={study.status} onChange={(e) => ss("status", e.target.value)}><option value="draft">Brouillon</option><option value="published">Publié</option></select></Field>
        <button className="button-primary" type="submit">{study.id ? "Mettre à jour" : "Enregistrer"}</button>
      </form>
    </div>
    <h3 className="admin-subheading">Publications</h3>
    <div className="admin-record-list">{data.posts.map((p) => <article key={p.id}><div><span>{p.status === "published" ? "Publié" : "Brouillon"}</span><h3>{p.titleFr}</h3><p>{p.titleEn}</p></div><div className="admin-row-actions"><button type="button" className="button-secondary" onClick={() => setPost({ id: p.id, slug: p.slug, titleFr: p.titleFr, titleEn: p.titleEn, excerptFr: p.excerptFr, excerptEn: p.excerptEn, bodyFr: p.bodyFr, bodyEn: p.bodyEn, status: p.status })}>Modifier</button><button type="button" className="icon-button" title="Supprimer" onClick={() => window.confirm("Supprimer cette publication ?") && deletePost.mutate({ id: p.id })}><Trash2 size={17} /></button></div></article>)}</div>
    <h3 className="admin-subheading">Réalisations</h3>
    <div className="admin-record-list">{data.caseStudies.map((c) => <article key={c.id}><div><span>{c.status === "published" ? "Publié" : "Brouillon"} · autorisation {c.clientPermission ? "consignée" : "manquante"}</span><h3>{c.titleFr}</h3></div><div className="admin-row-actions"><button type="button" className="button-secondary" onClick={() => setStudy({ id: c.id, slug: c.slug, titleFr: c.titleFr, titleEn: c.titleEn, summaryFr: c.summaryFr, summaryEn: c.summaryEn, clientPermission: c.clientPermission, status: c.status })}>Modifier</button><button type="button" className="icon-button" title="Supprimer" onClick={() => window.confirm("Supprimer cette réalisation ?") && deleteCase.mutate({ id: c.id })}><Trash2 size={17} /></button></div></article>)}</div>
    <h3 className="admin-subheading">Textes des offres (surcharge bilingue)</h3>
    <form className="admin-forms-single" onSubmit={(e: FormEvent) => { e.preventDefault(); updateSolution.mutate(solution); }}>
      <Field label="Offre"><select value={solution.slug} onChange={(e) => pick(e.target.value)}><option value="">Sélectionner</option>{solutions.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}</select></Field>
      {solution.slug && <><div className="form-grid two-columns"><Field label="Nom (FR)"><input value={solution.nameFr} onChange={(e) => setSolution({ ...solution, nameFr: e.target.value })} required /></Field><Field label="Name (EN)"><input value={solution.nameEn} onChange={(e) => setSolution({ ...solution, nameEn: e.target.value })} required /></Field></div>
        <div className="form-grid two-columns"><Field label="Résumé (FR)"><textarea rows={3} value={solution.summaryFr} onChange={(e) => setSolution({ ...solution, summaryFr: e.target.value })} required minLength={10} /></Field><Field label="Summary (EN)"><textarea rows={3} value={solution.summaryEn} onChange={(e) => setSolution({ ...solution, summaryEn: e.target.value })} required minLength={10} /></Field></div>
        <button className="button-primary" type="submit">Enregistrer</button></>}
    </form>
  </div>;
}

function CampaignsPanel({ data, refresh }: { data: AdminData; refresh: RefreshAdmin }) {
  const [form, setForm] = useState({ name: "", channel: "", objective: "" });
  const create = trpc.admin.createCampaign.useMutation({ onSuccess: () => { setForm({ name: "", channel: "", objective: "" }); refresh(); } });
  const setStatus = trpc.admin.updateCampaignStatus.useMutation({ onSuccess: refresh });
  return <div className="admin-panel">
    <div className="admin-forms"><form onSubmit={(e: FormEvent) => { e.preventDefault(); create.mutate(form); }}>
      <h3>Nouvelle campagne</h3>
      <Field label="Nom"><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Field>
      <Field label="Canal"><input value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })} required /></Field>
      <Field label="Objectif"><textarea rows={3} value={form.objective} onChange={(e) => setForm({ ...form, objective: e.target.value })} /></Field>
      <button className="button-primary" type="submit">Créer</button></form></div>
    <div className="admin-record-list">{data.campaigns.map((c) => <article key={c.id}><div><span>{c.channel}</span><h3>{c.name}</h3><p>{c.objective}</p></div>
      <select aria-label={`Statut de ${c.name}`} value={c.status} onChange={(e) => setStatus.mutate({ id: c.id, status: e.target.value as typeof c.status })}>{[["draft", "Brouillon"], ["active", "Active"], ["paused", "En pause"], ["completed", "Terminée"]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></article>)}</div>
  </div>;
}

function IntegrationsPanel({ data }: { data: AdminData }) {
  const i = data.integrations;
  const rows = [
    ["CRM", i.crm, "CRM_WEBHOOK_URL, CRM_WEBHOOK_SECRET", "Reçoit chaque demande (diagnostic, soumission, consultation, contact)."],
    ["Notifications (courriel, Slack…)", i.notify, "NOTIFY_WEBHOOK_URL, NOTIFY_WEBHOOK_SECRET", "Reçoit une alerte à chaque demande et message client."],
    ["Outils marketing (infolettre)", i.marketing, "MARKETING_WEBHOOK_URL, MARKETING_WEBHOOK_SECRET", "Reçoit les inscriptions et désabonnements avec la date du consentement."],
    ["Calendrier", i.calendar, "CALENDAR_BOOKING_URL", "Lien de réservation de l’équipe. Tant qu’il n’est pas raccordé, les rendez-vous restent des demandes à confirmer."],
  ] as const;
  return <div className="admin-panel">
    <div className="admin-record-list">{rows.map(([name, on, vars, help]) => <article key={name}><div><span>{vars}</span><h3>{name}</h3><p>{help}</p></div><span className={`status-pill ${on ? "status-qualified" : "status-new"}`}>{on ? "Configuré" : "À raccorder"}</span></article>)}</div>
    <h3 className="admin-subheading">Derniers envois</h3>
    <div className="admin-record-list compact">{data.integrationEvents.map((e) => <article key={e.id}><div><span>{fmt(e.createdAt)} · {e.channel}</span><p>{e.event} · {e.refId} · {e.status === "not_configured" ? "non configuré (rien n’a été envoyé)" : e.status === "delivered" ? "livré" : `échec ${e.detail ?? ""}`}</p></div></article>)}</div>
    {!data.integrationEvents.length && <p className="portal-empty">Aucun envoi pour le moment.</p>}
  </div>;
}

export default function AdminPortal() {
  const { user, isLoading } = useAuth({ redirectOnUnauthenticated: true });
  const [tab, setTab] = useState<Tab>("overview");
  const utils = trpc.useUtils();
  const query = useAdminOverview(!!user && user.role === "admin");
  const refresh = () => { void utils.admin.overview.invalidate(); void utils.admin.stats.invalidate(); };
  if (isLoading || !user) return <div className="portal-loading">Chargement…</div>;
  if (user.role !== "admin") return <section className="access-denied"><LockKeyhole size={36} strokeWidth={1.2} /><h1>Accès administrateur requis</h1><p>Ce compte peut accéder à l’espace client, mais pas à l’administration.</p><a href="/fr/espace-client" className="button-primary">Espace client</a></section>;
  const data = query.data;
  return <PortalShell title="Administration">
    <div className="admin-heading"><p className="eyebrow">BENEX / OPÉRATIONS</p><h1>Pilotage commercial et opérationnel</h1></div>
    <nav className="admin-tabs" aria-label="Sections de l’administration">{tabs.map(([key, label]) => <button key={key} type="button" className={tab === key ? "active" : ""} aria-current={tab === key} onClick={() => setTab(key)}>{label}{key === "leads" && data ? <span>{data.leads.length}</span> : null}</button>)}</nav>
    {!data ? <p>Chargement…</p> : <>
      {tab === "overview" && <OverviewPanel data={data} refresh={refresh} />}
      {tab === "leads" && <LeadsPanel data={data} refresh={refresh} />}
      {tab === "clients" && <ClientsPanel data={data} refresh={refresh} />}
      {tab === "projects" && <ProjectsPanel data={data} refresh={refresh} />}
      {tab === "content" && <ContentPanel data={data} refresh={refresh} />}
      {tab === "campaigns" && <CampaignsPanel data={data} refresh={refresh} />}
      {tab === "integrations" && <IntegrationsPanel data={data} />}
    </>}
  </PortalShell>;
}
