import { useLocation, useParams } from "react-router";
import { useState } from "react";
import { Link } from "../components/LocaleLink";
import { ArrowRight, CalendarDays, FileText, LockKeyhole } from "lucide-react";
import { insights, methodSteps, principles, tx } from "../content";
import { useLanguage } from "../i18n";
import { ArrowLink, PageMeta } from "../components/Layout";
import { CtaBand, PageHero, SectionHeading } from "../components/Sections";
import { Commitments, VisionBand, WhyAurex } from "../components/Vision";
import { TrustSection } from "../components/TrustSection";
import { Skyline } from "../components/Skyline";
import { LeadForm, type LeadMode } from "../components/LeadForm";
import { OrientationAssistant } from "../components/OrientationAssistant";
import { trpc } from "../providers/trpc";

export function AboutPage() {
  const { lang, t } = useLanguage();
  return <>
    <PageMeta title={t("about")} description={lang === "fr" ? "Découvrez la mission et l’approche multidisciplinaire d’AUREX Solutions." : "Discover AUREX Solutions’ mission and multidisciplinary approach."} />
    <PageHero eyebrow="AUREX / CABINET" title={lang === "fr" ? "Un partenaire stratégique pour toute la trajectoire de l’entreprise." : "A strategic partner for the entire business journey."} text={lang === "fr" ? "AUREX Solutions réunit le conseil, la technologie, le marketing et l’excellence opérationnelle pour aider les entrepreneurs, les PME et les organisations à se structurer, se transformer et croître." : "AUREX Solutions brings together consulting, technology, marketing and operational excellence to help entrepreneurs, SMEs and organizations structure, transform and grow."} />
    <section className="about-image shell"><img src="/images/architecture.webp" alt={lang === "fr" ? "Architecture contemporaine, symbole de structure et de précision" : "Contemporary architecture representing structure and precision"} /></section>
    <section className="about-manifesto shell section">
      <p className="eyebrow">{lang === "fr" ? "Notre mission" : "Our mission"}</p>
      <h2>{lang === "fr" ? "Transformer les ambitions en résultats, sans perdre de vue la réalité de l’exécution." : "Turn ambition into results without losing sight of execution realities."}</h2>
      <div className="about-copy"><p>{lang === "fr" ? "Nous intervenons à chaque étape du développement : création de l’identité, structuration de l’offre, acquisition de nouveaux clients, amélioration des opérations et expansion commerciale. Cette continuité réduit les angles morts entre les décisions stratégiques et leur mise en œuvre." : "We support every development stage: identity creation, offer structuring, new customer acquisition, operational improvement and commercial expansion. This continuity reduces blind spots between strategic decisions and implementation."}</p><p>{lang === "fr" ? "Notre rôle n’est pas d’ajouter des initiatives. Il est de relier les bonnes initiatives, de clarifier les responsabilités et de définir les indicateurs qui permettront d’apprendre et d’ajuster." : "Our role is not to add initiatives. It is to connect the right initiatives, clarify responsibilities and define the indicators that support learning and adjustment."}</p></div>
    </section>
    <section className="principles-section section"><div className="shell"><SectionHeading eyebrow={lang === "fr" ? "Nos quatre principes" : "Our four principles"} title={lang === "fr" ? "Une discipline commune à chaque mission." : "A shared discipline for every mandate."} /><div className="principles-grid">{principles.map((principle, index) => <div key={principle.fr}><span>0{index + 1}</span><h3>{tx(principle, lang)}</h3></div>)}</div></div></section>
    <WhyAurex />
    <VisionBand />
    <Commitments />
    <section className="about-city shell section" aria-labelledby="about-city-title">
      <p className="eyebrow">{lang === "fr" ? "Ancrés à Montréal" : "Rooted in Montréal"}</p>
      <h2 id="about-city-title">{lang === "fr" ? "Une entreprise d’ici, avec l’ambition de servir au-delà." : "A local firm with the ambition to serve beyond."}</h2>
      <p>{lang === "fr" ? "AUREX Solutions est basée à Montréal. Le français est notre langue principale ; l’anglais est disponible sur l’ensemble du site. Nous travaillons dans le respect des exigences du Québec et du Canada en matière de protection des renseignements personnels." : "AUREX Solutions is based in Montréal. French is our primary language; English is available across the whole site. We work in line with Quebec and Canadian requirements on the protection of personal information."}</p>
      <Skyline />
    </section>
    <TrustSection />
    <CtaBand />
  </>;
}

export function MethodPage() {
  const { lang, t } = useLanguage();
  return <>
    <PageMeta title={t("method")} description={lang === "fr" ? "Une méthodologie en six étapes, du diagnostic à l’optimisation continue." : "A six-step methodology from diagnosis to continuous optimization."} />
    <PageHero eyebrow="AUREX / MÉTHODE" title={lang === "fr" ? "Comprendre juste. Concevoir clair. Déployer pour de vrai." : "Understand accurately. Design clearly. Deploy for real."} text={lang === "fr" ? "Notre méthode crée une ligne de responsabilité continue entre les enjeux de départ, les solutions choisies et les résultats suivis." : "Our method creates a continuous line of accountability between initial challenges, chosen solutions and tracked outcomes."} />
    <section className="method-detail shell section">{methodSteps.map((step) => <div key={step.number} className="method-detail-row"><span>{step.number}</span><h2>{tx(step.title, lang)}</h2><p>{tx(step.text, lang)}</p><div className="method-output">{lang === "fr" ? "Validation avec les parties prenantes" : "Validation with stakeholders"}</div></div>)}</section>
    <section className="method-commitment section"><div className="shell"><p className="eyebrow">{lang === "fr" ? "Notre engagement" : "Our commitment"}</p><h2>{lang === "fr" ? "Pas de solution avant la compréhension. Pas de indicateur sans décision associée." : "No solution before understanding. No indicator without an associated decision."}</h2><ArrowLink to="/diagnostic" light>{t("diagnostic")}</ArrowLink></div></section>
  </>;
}

export function WorkPage() {
  const { lang, t } = useLanguage();
  const { data: studies = [] } = trpc.content.publishedCaseStudies.useQuery();
  return <>
    <PageMeta title={t("work")} description={lang === "fr" ? "Réalisations et études de cas vérifiées d’AUREX Solutions." : "Verified projects and case studies from AUREX Solutions."} />
    <PageHero eyebrow="AUREX / RÉALISATIONS" title={studies.length ? (lang === "fr" ? "Des réalisations documentées, avec l’autorisation des clients." : "Documented work, published with client permission.") : t("noCaseTitle")} text={studies.length ? (lang === "fr" ? "Chaque étude de cas publiée ici a été vérifiée et autorisée par le client concerné." : "Every case study published here has been verified and approved by the client concerned.") : t("noCaseText")} />
    {studies.length > 0 && <section className="insights-directory shell section">{studies.map((study) => <article key={study.id} className="insight-directory-row"><div><p className="eyebrow">AUREX / {lang === "fr" ? "RÉALISATION" : "CASE STUDY"}</p><h2>{lang === "fr" ? study.titleFr : study.titleEn}</h2></div><p>{lang === "fr" ? study.summaryFr : study.summaryEn}</p></article>)}</section>}
    <section className="work-policy shell section"><FileText size={32} strokeWidth={1.1} /><h2>{lang === "fr" ? "Un espace prêt à documenter les résultats réels." : "A space ready to document real results."}</h2><p>{lang === "fr" ? "Chaque étude de cas précisera le contexte, le périmètre de l’intervention, les livrables et les résultats vérifiables. Les données confidentielles ne seront jamais publiées sans autorisation." : "Each case study will describe context, mandate scope, deliverables and verifiable outcomes. Confidential data will never be published without permission."}</p><ArrowLink to="/contact">{t("contactTeam")}</ArrowLink></section>
  </>;
}

export function UnsubscribePage() {
  const { lang } = useLanguage();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const unsubscribe = trpc.leads.unsubscribe.useMutation({ onSuccess: () => setDone(true) });
  return <section className="lead-page section"><PageMeta title={lang === "fr" ? "Désabonnement" : "Unsubscribe"} description={lang === "fr" ? "Se désabonner de l’infolettre AUREX." : "Unsubscribe from the AUREX newsletter."} />
    <div className="shell lead-page-grid"><div className="lead-page-copy"><p className="eyebrow">AUREX / {lang === "fr" ? "INFOLETTRE" : "NEWSLETTER"}</p><h1>{lang === "fr" ? "Se désabonner de l’infolettre." : "Unsubscribe from the newsletter."}</h1><p>{lang === "fr" ? "Entrez l’adresse utilisée lors de l’inscription. Le retrait est immédiat." : "Enter the address used when you subscribed. Withdrawal is immediate."}</p></div>
      <form className="lead-form" onSubmit={(e) => { e.preventDefault(); unsubscribe.mutate({ email }); }}>
        {done ? <p className="form-status" role="status">{lang === "fr" ? "Votre désabonnement est enregistré." : "Your unsubscription is recorded."}</p> : <>
          <label className="field"><span>{lang === "fr" ? "Courriel" : "E-mail"}</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" /></label>
          <div className="form-actions"><button type="submit" className="button-primary" disabled={unsubscribe.isPending}>{lang === "fr" ? "Me désabonner" : "Unsubscribe me"}<ArrowRight size={17} /></button></div></>}
      </form></div></section>;
}

export function InsightsPage() {
  const { lang, t } = useLanguage();
  const { data: posts = [] } = trpc.content.publishedPosts.useQuery();
  return <>
    <PageMeta title={t("allInsights")} description={lang === "fr" ? "Analyses AUREX sur la stratégie, la transformation numérique et la performance." : "AUREX analysis on strategy, digital transformation and performance."} />
    <PageHero eyebrow="AUREX / RESSOURCES" title={lang === "fr" ? "Des analyses pour éclairer les décisions, pas pour suivre les modes." : "Analysis to inform decisions, not follow trends."} text={lang === "fr" ? "Nos perspectives explorent les choix de structuration, de transformation et de développement qui façonnent une croissance durable." : "Our perspectives explore the structuring, transformation and development choices that shape sustainable growth."} />
    <section className="insights-directory shell section">
      {posts.map((post) => <Link to={`/ressources/${post.slug}`} key={`db-${post.id}`} className="insight-directory-row"><div><p className="eyebrow">AUREX / ANALYSE</p><h2>{lang === "fr" ? post.titleFr : post.titleEn}</h2></div><p>{lang === "fr" ? post.excerptFr : post.excerptEn}</p><ArrowRight size={24} strokeWidth={1.1} /></Link>)}
      {insights.map((insight, index) => <Link to={`/ressources/${insight.slug}`} key={insight.slug} className="insight-directory-row"><div><p className="eyebrow">0{posts.length + index + 1} / {tx(insight.category, lang)}</p><h2>{tx(insight.title, lang)}</h2></div><div><p>{tx(insight.excerpt, lang)}</p><span>{tx(insight.readingTime, lang)}</span></div><ArrowRight size={24} strokeWidth={1.1} /></Link>)}
    </section>
  </>;
}

export function InsightDetail() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const { data: posts = [] } = trpc.content.publishedPosts.useQuery();
  const insight = insights.find((item) => item.slug === slug);
  const post = posts.find((item) => item.slug === slug);
  if (!insight && !post) return <NotFound />;
  const title = insight ? tx(insight.title, lang) : (lang === "fr" ? post!.titleFr : post!.titleEn);
  const category = insight ? tx(insight.category, lang) : "AUREX / ANALYSE";
  const body = insight ? insight.body[lang] : (lang === "fr" ? post!.bodyFr : post!.bodyEn).split(/\n\n+/).map((text, index) => ({ heading: `${String(index + 1).padStart(2, "0")}`, text }));
  return <>
    <PageMeta title={title} description={insight ? tx(insight.excerpt, lang) : (lang === "fr" ? post!.excerptFr : post!.excerptEn)} />
    <article className="article-page">
      <header className="article-header shell"><Link to="/ressources" className="back-link">{t("back")} — {t("insights")}</Link><p className="eyebrow">{category}</p><h1>{title}</h1><p>{insight ? tx(insight.excerpt, lang) : (lang === "fr" ? post!.excerptFr : post!.excerptEn)}</p></header>
      <div className="article-body shell">{body.map((section) => <section key={`${section.heading}-${section.text}`}><h2>{section.heading}</h2><p>{section.text}</p></section>)}</div>
    </article>
    <CtaBand />
  </>;
}

const leadCopy: Record<LeadMode, { fr: { title: string; text: string; eyebrow: string }; en: { title: string; text: string; eyebrow: string } }> = {
  contact: { fr: { eyebrow: "AUREX / CONTACT", title: "Commençons par ce qui compte pour votre entreprise.", text: "Décrivez votre contexte et vos objectifs, avec vos mots. Chaque demande est enregistrée dans notre suivi sécurisé et examinée par l’équipe AUREX, qui vous indique la prochaine étape." }, en: { eyebrow: "AUREX / CONTACT", title: "Let’s start with what matters to your business.", text: "Describe your context and objectives. Your request will be recorded in our secure follow-up system to guide the next step." } },
  diagnostic: { fr: { eyebrow: "AUREX / DIAGNOSTIC INITIAL", title: "Trois étapes pour clarifier votre situation.", text: "Ce formulaire nous aide à comprendre votre organisation, vos difficultés et vos objectifs avant un premier échange. Il ne constitue pas un audit complet." }, en: { eyebrow: "AUREX / INITIAL DIAGNOSTIC", title: "Three steps to clarify your situation.", text: "This form helps us understand your organization, challenges and objectives before an initial conversation. It is not a full audit." } },
  quote: { fr: { eyebrow: "AUREX / SOUMISSION", title: "Une proposition construite autour de votre périmètre réel.", text: "Précisez les expertises recherchées et votre contexte. Nous pourrons ensuite définir les livrables, les étapes et les conditions d’une proposition personnalisée." }, en: { eyebrow: "AUREX / PROPOSAL", title: "A proposal built around your actual scope.", text: "Specify the expertise required and your context. We can then define deliverables, stages and terms for a tailored proposal." } },
  appointment: { fr: { eyebrow: "AUREX / CONSULTATION", title: "Planifions un premier échange structuré.", text: "Indiquez vos disponibilités et les sujets à aborder. La demande sera enregistrée immédiatement; la confirmation du rendez-vous demeure une étape distincte." }, en: { eyebrow: "AUREX / CONSULTATION", title: "Let’s schedule a structured first conversation.", text: "Share your availability and discussion topics. The request is recorded immediately; appointment confirmation remains a separate step." } },
};

export function LeadPage({ mode }: { mode: LeadMode }) {
  const { lang } = useLanguage();
  const { search } = useLocation();
  const copy = leadCopy[mode][lang];
  return <>
    <PageMeta title={copy.eyebrow.replace("AUREX / ", "")} description={copy.text} />
    <section className="lead-page section"><div className="shell lead-page-grid"><div className="lead-page-copy"><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.text}</p><div className="lead-assurance"><LockKeyhole size={22} strokeWidth={1.3} /><p>{lang === "fr" ? "Vos renseignements sont transmis à un espace de suivi protégé et ne sont pas revendus." : "Your information is sent to a protected follow-up space and is never sold."}</p></div></div><LeadForm key={`${mode}${search}`} mode={mode} /></div></section>
    {mode === "contact" && <ContactDetails />}
    {mode === "appointment" && <section className="integration-note shell"><CalendarDays size={26} strokeWidth={1.2} /><div><h2>{lang === "fr" ? "Confirmation du rendez-vous" : "Appointment confirmation"}</h2><p>{lang === "fr" ? "Votre demande est enregistrée comme une demande à confirmer : la date et la plage horaire choisies expriment votre préférence. L’équipe AUREX vous écrira pour confirmer le rendez-vous. Aucune disponibilité en temps réel n’est affichée tant qu’un calendrier n’est pas raccordé." : "Your request is recorded as a request to confirm: the date and time slot you choose express a preference. The AUREX team will write to you to confirm the appointment. No real-time availability is shown until a calendar is connected."}</p></div></section>}
    {mode === "diagnostic" && <OrientationAssistant />}
  </>;
}

function ContactDetails() {
  const { lang } = useLanguage();
  const fr = lang === "fr";
  const { data: c } = trpc.content.company.useQuery();
  const address = [c?.street, c?.postalCode].filter(Boolean).join(", ");
  return (
    <section className="contact-details shell section" aria-labelledby="contact-city">
      <div>
        <p className="eyebrow">{fr ? "Depuis Montréal" : "From Montréal"}</p>
        <h2 id="contact-city">{fr ? "Basés à Montréal, au service d’entreprises ambitieuses." : "Based in Montréal, serving ambitious businesses."}</h2>
        <p>{fr ? "AUREX Solutions accompagne les entrepreneurs, les PME et les organisations du Québec et du Canada, en français et en anglais. Nous répondons à chaque demande envoyée par le formulaire." : "AUREX Solutions supports entrepreneurs, SMEs and organizations in Quebec and Canada, in French and in English. We respond to every request sent through the form."}</p>
      </div>
      <dl>
        <div><dt>{fr ? "Ville" : "City"}</dt><dd>Montréal, Québec, Canada</dd></div>
        {c?.legalName && <div><dt>{fr ? "Entreprise" : "Company"}</dt><dd>{c.legalName}{c.neq ? ` · NEQ ${c.neq}` : ""}</dd></div>}
        {address && <div><dt>{fr ? "Adresse" : "Address"}</dt><dd>{address}, Montréal (QC)</dd></div>}
        {c?.email && <div><dt>{fr ? "Courriel" : "E-mail"}</dt><dd><a href={`mailto:${c.email}`}>{c.email}</a></dd></div>}
        {c?.phone && <div><dt>{fr ? "Téléphone" : "Phone"}</dt><dd><a href={`tel:${c.phone.replace(/[^+\d]/g, "")}`}>{c.phone}</a></dd></div>}
        <div><dt>{fr ? "Langues" : "Languages"}</dt><dd>{fr ? "Français · English" : "English · Français"}</dd></div>
      </dl>
      <Skyline className="contact-skyline" />
    </section>
  );
}

export function ContactPage() {
  return <LeadPage mode="contact" />;
}

export function PrivacyPage() {
  const { lang, t } = useLanguage();
  const sections: string[][] = lang === "fr" ? [
    ["Renseignements recueillis", "Nous recueillons les renseignements que vous transmettez volontairement dans les formulaires : coordonnées, entreprise, secteur, objectifs, budget indicatif, préférences de rendez-vous et consentements. L’espace client conserve également les projets, documents et échanges associés à votre compte."],
    ["Utilisation", "Ces renseignements servent à répondre aux demandes, préparer des propositions, gérer le suivi commercial, fournir les services du portail et respecter les préférences de communication. Ils ne sont pas vendus."],
    ["Consentement et infolettre", "L’inscription à l’infolettre exige un consentement explicite. Chaque inscription comporte un consentement distinct, consigné avec sa date. Vous pouvez vous désabonner en tout temps depuis la page de désabonnement ou en nous écrivant par la page Contact."],
    ["Conservation et sécurité", "L’accès aux espaces client et administratif est protégé par authentification et autorisations. Les demandes sont conservées pendant la durée nécessaire au suivi et aux obligations applicables, puis supprimées ou anonymisées selon les procédures de l’organisation."],
    ["Vos demandes", "Vous pouvez demander l’accès, la rectification ou la suppression de vos renseignements, dans les limites prévues par les lois applicables. Utilisez la page Contact et précisez l’objet de votre demande."],
    ["Témoins et services externes", "Le site conserve votre préférence linguistique dans le navigateur et, lors d’une connexion à l’espace client, un témoin de session nécessaire au fonctionnement. Il n’active aucun outil publicitaire ou d’analyse externe. Toute future intégration nécessitant des témoins non essentiels devra faire l’objet d’un mécanisme de consentement préalable."],
    ["Cadre applicable", "AUREX Solutions vise à adapter ses pratiques aux exigences de protection des renseignements personnels applicables au Québec, notamment la Loi 25, et aux règles canadiennes de prospection électronique. Cette politique ne constitue pas un avis juridique."],
  ] : [
    ["Information collected", "We collect information you voluntarily submit through forms: contact details, company, industry, objectives, indicative budget, appointment preferences and consent. The client portal also retains projects, documents and exchanges associated with your account."],
    ["Use", "This information is used to respond to requests, prepare proposals, manage commercial follow-up, provide portal services and respect communication preferences. It is not sold."],
    ["Consent and newsletter", "Newsletter subscription requires explicit consent. Each subscription carries a separate consent, recorded with its date. You may unsubscribe at any time from the unsubscribe page or by writing to us through the Contact page."],
    ["Retention and security", "Access to client and administration areas is protected by authentication and permissions. Requests are retained for as long as needed for follow-up and applicable obligations, then deleted or anonymized according to organizational procedures."],
    ["Your requests", "You may request access, correction or deletion of your information within the limits of applicable laws. Use the Contact page and specify the purpose of your request."],
    ["Cookies and external services", "The site stores your language preference in the browser and, when you sign in to the client portal, a session cookie required for it to work. It activates no external advertising or analytics tools. Any future integration requiring non-essential cookies must include a prior consent mechanism."],
    ["Applicable framework", "AUREX Solutions aims to adapt its practices to applicable Quebec personal information protection requirements, including Law 25, and Canadian electronic outreach rules. This policy does not constitute legal advice."],
  ];
  const { data: company } = trpc.content.company.useQuery();
  const { data: assistant } = trpc.assistant.status.useQuery();
  const fr = lang === "fr";
  if (company?.privacyOfficerName || company?.privacyOfficerEmail) sections.push([fr ? "Responsable de la protection des renseignements personnels" : "Person in charge of personal information protection", `${[company.privacyOfficerName, company.privacyOfficerEmail].filter(Boolean).join(" · ")}. ${fr ? "Adressez-lui toute demande d’accès, de rectification ou de retrait de consentement." : "Send any request for access, correction or withdrawal of consent to this person."}`]);
  sections.push([fr ? "Conseiller IA et mesures anonymes" : "AI advisor and anonymous measurements", fr
    ? `Le conseiller IA ne conserve pas le contenu des conversations ; les courriels et numéros de téléphone sont masqués avant tout traitement. ${assistant?.mode === "ai" ? "Pour produire ses réponses, le texte de vos questions est transmis à un fournisseur de modèle de langage (Anthropic), qui peut traiter ces données hors du Québec. Ne saisissez aucun renseignement personnel." : "Dans sa configuration actuelle, il répond à partir du contenu publié par AUREX, sans transmettre vos questions à un tiers."} Nous mesurons aussi la fréquentation de façon anonyme (page, langue, type d’action), sans témoin ni adresse IP.`
    : `The AI advisor does not store conversation content; e-mail addresses and phone numbers are masked before any processing. ${assistant?.mode === "ai" ? "To produce answers, the text of your questions is sent to a language-model provider (Anthropic), which may process it outside Quebec. Do not enter personal information." : "In its current configuration it answers from content published by AUREX, without sending your questions to a third party."} We also measure traffic anonymously (page, language, type of action), without cookies or IP addresses.`]);
  return <><PageMeta title={t("privacy")} description={lang === "fr" ? "Politique de confidentialité d’AUREX Solutions." : "AUREX Solutions privacy policy."} /><PageHero eyebrow="AUREX / CONFIDENTIALITÉ" title={lang === "fr" ? "Vos renseignements méritent une gestion claire." : "Your information deserves clear management."} text={lang === "fr" ? "Version du 24 novembre 2026. Cette page explique les pratiques de la plateforme AUREX Solutions." : "Version dated November 24, 2026. This page explains the practices of the AUREX Solutions platform."} /><section className="privacy-sections shell section">{sections.map(([title, text], index) => <section key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{text}</p></section>)}</section></>;
}

export function NotFound() {
  const { t } = useLanguage();
  return <section className="not-found shell"><span>404</span><h1>{t("notFound")}</h1><ArrowLink to="/">{t("returnHome")}</ArrowLink></section>;
}
