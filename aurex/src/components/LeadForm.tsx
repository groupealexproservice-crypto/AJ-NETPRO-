import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { aiTiers, expertises, sectors, tiers, tx } from "../content";
import { track } from "../lib/track";
import { useLanguage } from "../i18n";
import { trpc } from "../providers/trpc";

export type LeadMode = "contact" | "diagnostic" | "quote" | "appointment";

type FormState = {
  name: string; email: string; company: string; phone: string; sector: string; budget: string;
  currentSituation: string; objectives: string; challenges: string; message: string;
  services: string[]; solution: string; engagementType: string;
  preferredDate: string; timeSlot: string; consent: boolean; website: string;
};

const initialState: FormState = {
  name: "", email: "", company: "", phone: "", sector: "", budget: "",
  currentSituation: "", objectives: "", challenges: "", message: "",
  services: [], solution: "", engagementType: "", preferredDate: "", timeSlot: "", consent: false, website: "",
};

const today = () => new Date().toISOString().split("T")[0];

export function LeadForm({ mode }: { mode: LeadMode }) {
  const { lang, t } = useLanguage();
  const [params] = useSearchParams();
  const allTiers = [...tiers, ...aiTiers];
  const presetSolution = allTiers.some((s) => s.slug === params.get("solution")) ? params.get("solution")! : "";
  const presetSector = sectors.some((s) => s.slug === params.get("sector")) ? params.get("sector")! : "";
  const [form, setForm] = useState<FormState>({ ...initialState, solution: presetSolution, sector: presetSector });
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ reference: string; status: "received" | "to_confirm" } | null>(null);
  const create = trpc.leads.create.useMutation({
    onSuccess: (result) => { setDone(result); setForm(initialState); setStep(0); },
    onError: () => setError(t("errorText")),
  });

  const [started, setStarted] = useState(false);
  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    if (!started) { setStarted(true); track("form_started"); }
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const fr = lang === "fr";
  const needsSolutionChoice = mode === "quote" || mode === "appointment";
  const isDiagnostic = mode === "diagnostic";

  // Same rules as the server (api/leadsRouter.ts); the server remains the authority.
  const validate = (scope: "organization" | "priorities" | "consent" | "all") => {
    const all = scope === "all";
    if (all || scope === "organization") {
      if (form.name.trim().length < 2 || !form.company.trim()) return t("required");
      if (!/^\S+@\S+\.\S+$/.test(form.email)) return t("invalidEmail");
      if ((isDiagnostic || needsSolutionChoice) && !form.sector) return t("required");
    }
    if (all || scope === "priorities") {
      if (isDiagnostic && (form.currentSituation.trim().length < 10 || form.objectives.trim().length < 10 || form.challenges.trim().length < 10 || !form.services.length)) return t("required");
      if ((mode === "contact" || needsSolutionChoice) && form.message.trim().length < 10) return t("required");
      if (needsSolutionChoice && !form.engagementType) return t("required");
      if (mode === "appointment" && (!form.preferredDate || form.preferredDate < today() || !form.timeSlot)) return t("required");
    }
    if ((all || scope === "consent") && !form.consent) return fr ? "Le consentement est requis pour envoyer la demande." : "Consent is required to submit the request.";
    return "";
  };

  const stepScopes = ["organization", "priorities", "consent"] as const;
  const nextStep = () => {
    const message = validate(stepScopes[step]);
    if (message) return setError(message);
    setStep((current) => Math.min(2, current + 1));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const message = validate("all");
    if (message) return setError(message);
    const { consent: _consent, ...rest } = form;
    void _consent;
    create.mutate({ ...rest, consent: true, mode, locale: lang });
  };

  if (done) {
    return (
      <div className="form-success" role="status">
        <span className="success-icon"><Check size={28} /></span>
        <h3>{done.status === "to_confirm" ? (fr ? "Votre demande de consultation est enregistrée." : "Your consultation request is recorded.") : t("successTitle")}</h3>
        <p>{done.status === "to_confirm"
          ? (fr ? "Il s’agit d’une demande : le rendez-vous n’est pas confirmé. L’équipe AUREX vous écrira pour confirmer la date et l’heure." : "This is a request: the appointment is not yet confirmed. The AUREX team will write to you to confirm the date and time.")
          : t("successText")}</p>
        <p className="reference">{t("reference")} <strong data-testid="lead-reference">{done.reference}</strong></p>
        <button type="button" className="text-button" onClick={() => setDone(null)}>{fr ? "Envoyer une autre demande" : "Submit another request"}<ArrowRight size={17} /></button>
      </div>
    );
  }

  const contactFields = (
    <>
      <div className="form-grid two-columns">
        <label className="field"><span>{t("formName")} *</span><input value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" required /></label>
        <label className="field"><span>{t("formEmail")} *</span><input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" required /></label>
      </div>
      <div className="form-grid two-columns">
        <label className="field"><span>{t("formCompany")} *</span><input value={form.company} onChange={(e) => update("company", e.target.value)} autoComplete="organization" required /></label>
        <label className="field"><span>{t("formPhone")}</span><input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" /></label>
      </div>
      {(isDiagnostic || needsSolutionChoice) && (
        <label className="field"><span>{t("formSector")} *</span><select value={form.sector} onChange={(e) => update("sector", e.target.value)} required><option value="">{t("select")}</option>{sectors.map((sector) => <option key={sector.slug} value={sector.slug}>{tx(sector.name, lang)}</option>)}</select></label>
      )}
    </>
  );

  const budgetField = (
    <label className="field"><span>{t("formBudget")}</span><select value={form.budget} onChange={(e) => update("budget", e.target.value)}><option value="">{t("select")}</option><option value="a-definir">{fr ? "À définir" : "To be defined"}</option><option value="moins-10000">{fr ? "Moins de 10 000 $ CAD" : "Under CAD $10,000"}</option><option value="10000-25000">10 000–25 000 $ CAD</option><option value="25000-50000">25 000–50 000 $ CAD</option><option value="50000-plus">{fr ? "50 000 $ CAD et plus" : "CAD $50,000 and above"}</option></select></label>
  );

  const servicesFieldset = (
    <fieldset className="expertise-selector"><legend>{t("formServices")}{isDiagnostic ? " *" : ""}</legend><div>{expertises.map((expertise) => <label key={expertise.slug} className={form.services.includes(expertise.slug) ? "selected" : ""}><input type="checkbox" checked={form.services.includes(expertise.slug)} onChange={(e) => update("services", e.target.checked ? [...form.services, expertise.slug] : form.services.filter((slug) => slug !== expertise.slug))} /><span>{tx(expertise.title, lang)}</span></label>)}</div></fieldset>
  );

  const textArea = (key: "currentSituation" | "objectives" | "challenges" | "message", label: string, placeholder: string, rows = 4) => (
    <label className="field"><span>{label} *</span><textarea value={form[key]} onChange={(e) => update(key, e.target.value)} rows={rows} required minLength={10} placeholder={placeholder} /></label>
  );

  const engagementFields = needsSolutionChoice && (
    <div className="form-grid two-columns">
      <label className="field"><span>{fr ? "Offre envisagée" : "Offer of interest"}</span><select value={form.solution} onChange={(e) => update("solution", e.target.value)}><option value="">{fr ? "À déterminer avec vous" : "To be defined with you"}</option>{allTiers.map((s) => <option key={s.slug} value={s.slug}>{s.name} — {tx(s.verb, lang)}</option>)}</select></label>
      <label className="field"><span>{fr ? "Type d’accompagnement" : "Type of engagement"} *</span><select value={form.engagementType} onChange={(e) => update("engagementType", e.target.value)} required><option value="">{t("select")}</option><option value="mandate">{fr ? "Mandat ponctuel (sur devis)" : "One-off mandate (quoted)"}</option><option value="monthly">{fr ? "Accompagnement mensuel (sur devis)" : "Monthly support (quoted)"}</option><option value="undecided">{fr ? "Je ne sais pas encore" : "Not sure yet"}</option></select></label>
    </div>
  );

  const stepTitles = fr ? ["Votre organisation", "Vos priorités", "Validation et consentement"] : ["Your organization", "Your priorities", "Review and consent"];

  const consentBlock = (
    <>
      <label className="consent-row"><input type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} required /><span>{t("consent")}</span></label>
      <p className="legal-note">{t("legalNote")}</p>
    </>
  );

  return (
    <form className="lead-form" onSubmit={submit} noValidate>
      {isDiagnostic && (
        <div className="form-progress" role="group" aria-label={fr ? `Étape ${step + 1} sur 3 : ${stepTitles[step]}` : `Step ${step + 1} of 3: ${stepTitles[step]}`}>
          {[0, 1, 2].map((index) => <span key={index} className={index <= step ? "active" : ""} />)}
          <p>0{step + 1} / 03 — {stepTitles[step]}</p>
        </div>
      )}
      <div className="honeypot" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label></div>

      {isDiagnostic ? (
        <>
          {step === 0 && <div className="form-step"><h2>{stepTitles[0]}</h2>{contactFields}</div>}
          {step === 1 && <div className="form-step"><h2>{stepTitles[1]}</h2>
            {textArea("currentSituation", fr ? "Situation actuelle" : "Current situation", fr ? "Où en est l’organisation aujourd’hui ?" : "Where does the organization stand today?")}
            {textArea("objectives", fr ? "Objectifs" : "Objectives", fr ? "Que souhaitez-vous accomplir et à quel horizon ?" : "What do you want to achieve, and by when?")}
            {textArea("challenges", fr ? "Difficultés rencontrées" : "Challenges", fr ? "Qu’est-ce qui freine la progression ?" : "What is holding progress back?")}
            {servicesFieldset}{budgetField}</div>}
          {step === 2 && <div className="form-step"><h2>{stepTitles[2]}</h2>
            <p>{fr ? "Vérifiez le résumé, puis confirmez votre consentement pour transmettre le diagnostic." : "Check the summary, then confirm your consent to submit the diagnostic."}</p>
            <div className="diagnostic-review">
              <p><strong>{form.name}</strong> · {form.email}</p>
              <p>{form.company} · {tx(sectors.find((s) => s.slug === form.sector)?.name ?? { fr: "—", en: "—" }, lang)}</p>
              <p>{form.services.map((slug) => tx(expertises.find((e) => e.slug === slug)!.title, lang)).join(" · ")}</p>
            </div>
            {consentBlock}</div>}
        </>
      ) : (
        <>
          {contactFields}
          {engagementFields}
          {mode === "contact" ? textArea("message", t("formMessage"), fr ? "Décrivez votre contexte et vos objectifs." : "Describe your context and objectives.", 5)
            : textArea("message", t("formMessage"), fr ? "Décrivez la situation actuelle, les difficultés rencontrées et les objectifs prioritaires." : "Describe the current situation, challenges and priority objectives.", 5)}
          {needsSolutionChoice && <>{servicesFieldset}{budgetField}</>}
          {mode === "appointment" && (
            <div className="form-grid two-columns">
              <label className="field"><span>{t("formDate")} *</span><input type="date" min={today()} value={form.preferredDate} onChange={(e) => update("preferredDate", e.target.value)} required /></label>
              <label className="field"><span>{t("formTime")} *</span><select value={form.timeSlot} onChange={(e) => update("timeSlot", e.target.value)} required><option value="">{t("select")}</option><option value="morning">{t("morning")}</option><option value="afternoon">{t("afternoon")}</option><option value="evening">{t("evening")}</option></select></label>
            </div>
          )}
          {consentBlock}
        </>
      )}

      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="form-actions">
        {isDiagnostic && step > 0 && <button type="button" className="button-secondary" onClick={() => { setStep(step - 1); setError(""); }}><ArrowLeft size={17} />{t("back")}</button>}
        {isDiagnostic && step < 2
          ? <button type="button" className="button-primary" onClick={nextStep}>{t("next")}<ArrowRight size={17} /></button>
          : <button type="submit" className="button-primary" disabled={create.isPending}>{create.isPending ? t("sending") : mode === "appointment" ? (fr ? "Envoyer la demande de consultation" : "Send consultation request") : t("submit")}<ArrowRight size={17} /></button>}
      </div>
    </form>
  );
}
