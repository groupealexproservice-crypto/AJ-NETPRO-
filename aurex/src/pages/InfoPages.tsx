import { Link } from "../components/LocaleLink";
import { expertises, sectors, tx } from "../content";
import { useLanguage } from "../i18n";
import { trpc } from "../providers/trpc";
import { PageMeta } from "../components/Layout";
import { CtaBand, PageHero } from "../components/Sections";

type Block = { title: string; paragraphs: string[] };

function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <section className="shell section legal-sections">
      {blocks.map((b) => (
        <article key={b.title} className="legal-block">
          <h2>{b.title}</h2>
          {b.paragraphs.map((p) => <p key={p}>{p}</p>)}
        </article>
      ))}
    </section>
  );
}

/* ───────────────────────────── FAQ ───────────────────────────── */

const faqFr: Block[] = [
  { title: "Qui est AUREX Solutions ?", paragraphs: ["AUREX Solutions est une entreprise de services établie à Montréal. Elle aide les entreprises à mieux se présenter, à attirer des clients et à améliorer leurs opérations grâce au Web, au marketing, au conseil et à l’intelligence artificielle. Elle peut servir des clients au Québec, ailleurs au Canada et, à distance, à l’international."] },
  { title: "Quelle est la différence entre un service ponctuel, un forfait mensuel et un pack ?", paragraphs: ["Un service ponctuel est acheté une fois, à prix fixe, avec une portée définie. Un forfait mensuel confie à AUREX, chaque mois, un travail défini (par exemple l’entretien du site, des publications ou le référencement local). Un pack réunit plusieurs services autour d’un objectif, comme le lancement ou l’acquisition de clients. Aucun ne donne accès à une quantité illimitée de travail."] },
  { title: "Les prix affichés sont-ils définitifs ?", paragraphs: ["Ce sont des prix de départ, en dollars canadiens, taxes en sus. Le prix ferme, la portée, les livrables et les délais figurent dans votre proposition écrite avant le début du mandat. Le budget publicitaire, les noms de domaine, l’hébergement, les licences et les frais de tiers sont séparés et facturés au coût réel."] },
  { title: "Y a-t-il un engagement pour les forfaits mensuels ?", paragraphs: ["Les forfaits comportent un engagement minimum de 6 mois, puis se poursuivent chaque mois avec un préavis de 30 jours. Un engagement de 12 mois donne droit à un rabais d’environ 5 %. Les conditions détaillées figurent dans votre proposition et dans les conditions de service."] },
  { title: "Comment fonctionne le site Web offert avec 12 mois ?", paragraphs: ["Pour un engagement de 12 mois à CROISSANCE, DÉVELOPPEMENT ou PARTENAIRE, la création d’un site Web de base (3 pages, ou jusqu’à 5 pages avec PARTENAIRE) est offerte. Vous fournissez les contenus. Le nom de domaine, l’hébergement, les extensions payantes et les fonctions avancées restent à votre charge. En cas d’annulation avant la fin des 12 mois, la valeur du site est due au prorata des mois restants."] },
  { title: "Garantissez-vous des ventes, des clients ou un classement Google ?", paragraphs: ["Non. Personne ne peut honnêtement garantir ces résultats. Nous définissons des indicateurs avec vous, nous établissons une mesure de départ et nous vous remettons un rapport régulier pour constater ce qui change."] },
  { title: "Comment utilisez-vous l’intelligence artificielle ?", paragraphs: ["De façon pratique et supervisée : pour préparer des brouillons, automatiser des tâches répétitives et assister certaines réponses. Un employé valide ce qui compte, et une personne prend le relais pour toute demande complexe, sensible ou incertaine. Nous n’envoyons pas de renseignements personnels à un outil que vous n’avez pas approuvé."] },
  { title: "Que faites-vous des renseignements que je vous transmets ?", paragraphs: ["Ils servent à répondre à votre demande et à préparer une proposition. Le consentement est demandé explicitement avant tout envoi, et vous pouvez vous désabonner en tout temps. Consultez la politique de confidentialité pour le détail."] },
  { title: "Puis-je acheter un seul service ?", paragraphs: ["Oui. Vous n’avez pas besoin d’acheter tous les services d’AUREX. Vous pouvez commencer par un diagnostic, un site, une campagne ou une automatisation, puis choisir la suite si elle vous est utile."] },
  { title: "Comment commencer ?", paragraphs: ["Demandez une consultation ou remplissez le diagnostic d’entreprise : en quelques minutes, vous décrivez votre situation et vos priorités. L’équipe vous répond avec une proposition claire et un prix ferme."] },
];

const faqEn: Block[] = [
  { title: "Who is AUREX Solutions?", paragraphs: ["AUREX Solutions is a services company based in Montréal. It helps businesses present themselves better, attract customers and improve their operations through the web, marketing, consulting and artificial intelligence. It can serve clients in Quebec, elsewhere in Canada and, remotely, internationally."] },
  { title: "What is the difference between a one-off service, a monthly plan and a pack?", paragraphs: ["A one-off service is bought once, at a fixed price, with a defined scope. A monthly plan entrusts AUREX with defined work every month (for example website upkeep, posts or local SEO). A pack combines several services around one goal, such as launch or customer acquisition. None gives access to unlimited work."] },
  { title: "Are the published prices final?", paragraphs: ["They are starting prices, in Canadian dollars, taxes extra. The firm price, scope, deliverables and timelines appear in your written proposal before the mandate begins. Ad budget, domain names, hosting, licences and third-party fees are separate and billed at cost."] },
  { title: "Is there a commitment for monthly plans?", paragraphs: ["Plans have a 6-month minimum commitment, then continue monthly with 30 days’ notice. A 12-month commitment earns about 5% off. Detailed terms appear in your proposal and in the terms of service."] },
  { title: "How does the website offered with 12 months work?", paragraphs: ["For a 12-month commitment to CROISSANCE, DÉVELOPPEMENT or PARTENAIRE, the creation of a basic website (3 pages, or up to 5 pages with PARTENAIRE) is offered. You provide the content. Domain name, hosting, paid extensions and advanced features remain your responsibility. If you cancel before the end of the 12 months, the site’s value is due pro rata for the remaining months."] },
  { title: "Do you guarantee sales, customers or a Google ranking?", paragraphs: ["No. No one can honestly guarantee these results. We define indicators with you, set a baseline and give you a regular report to see what changes."] },
  { title: "How do you use artificial intelligence?", paragraphs: ["In a practical, supervised way: to prepare drafts, automate repetitive tasks and assist some answers. An employee validates what matters, and a person takes over any complex, sensitive or uncertain request. We do not send personal information to a tool you have not approved."] },
  { title: "What do you do with the information I send you?", paragraphs: ["It is used to answer your request and prepare a proposal. Consent is requested explicitly before anything is sent, and you can unsubscribe at any time. See the privacy policy for details."] },
  { title: "Can I buy just one service?", paragraphs: ["Yes. You do not need to buy all of AUREX’s services. You can start with a diagnostic, a website, a campaign or an automation, then choose what comes next if it is useful to you."] },
  { title: "How do I get started?", paragraphs: ["Request a consultation or fill in the business diagnostic: in a few minutes you describe your situation and priorities. The team replies with a clear proposal and a firm price."] },
];

export function FaqPage() {
  const { lang } = useLanguage();
  const fr = lang === "fr";
  return <>
    <PageMeta title={fr ? "Questions fréquentes" : "Frequently asked questions"} description={fr ? "Prix, forfaits, engagement, site Web offert, intelligence artificielle et confidentialité : les réponses aux questions les plus fréquentes." : "Pricing, plans, commitment, the offered website, artificial intelligence and privacy: answers to the most frequent questions."} />
    <PageHero eyebrow="AUREX / FAQ" title={fr ? "Vos questions, nos réponses." : "Your questions, our answers."} text={fr ? "Les réponses claires aux questions que les dirigeants nous posent le plus." : "Clear answers to the questions business owners ask us most."} />
    <Prose blocks={fr ? faqFr : faqEn} />
    <CtaBand />
  </>;
}

/* ───────────────────────── Terms of service ───────────────────────── */

const termsFr: Block[] = [
  { title: "Portée de ces conditions", paragraphs: ["Ces conditions encadrent les services offerts par AUREX Solutions (« AUREX »). Chaque mandat est précisé par une proposition écrite qui indique la portée, les livrables, les délais, le prix et les exclusions. En cas de divergence, la proposition acceptée prévaut sur ces conditions générales."] },
  { title: "Prix et facturation", paragraphs: ["Les prix publiés sont des prix de départ en dollars canadiens, taxes en sus. Le prix ferme figure dans la proposition. Le budget publicitaire, les noms de domaine, l’hébergement, les licences logicielles, les coûts de téléphonie et les autres frais de tiers ne sont pas compris : ils sont facturés au coût réel ou payés directement par le client à son fournisseur. Les modalités de paiement sont précisées dans la proposition."] },
  { title: "Forfaits mensuels", paragraphs: ["Les forfaits mensuels comportent un engagement minimum de 6 mois, puis se poursuivent chaque mois avec un préavis écrit de 30 jours. Un engagement de 12 mois peut donner droit à un tarif réduit. Le périmètre de chaque forfait est fixé à la signature ; tout travail additionnel est soumis à l’approbation préalable du client."] },
  { title: "Offre « site Web de base offert »", paragraphs: ["L’offre est réservée aux forfaits désignés et à un engagement de 12 mois. Le site de base utilise un gabarit, comprend le nombre de pages et de rondes de révisions indiqués, et repose sur les contenus fournis par le client. En cas de résiliation avant la fin des 12 mois, la valeur du site est due au prorata des mois restants, après quoi le site appartient au client."] },
  { title: "Collaboration et approbations", paragraphs: ["Le client fournit à temps les contenus, les accès et les approbations nécessaires. Les délais indiqués sont des cibles qui dépendent de ces éléments. Les publications, courriels, campagnes et automatisations sont approuvés par le client avant leur mise en service lorsque la proposition le prévoit."] },
  { title: "Résultats", paragraphs: ["AUREX s’engage à fournir un travail professionnel selon la portée convenue. Aucun résultat de vente, de clientèle, de classement ou d’économie n’est garanti. Les calculateurs et simulations du site sont des estimations fondées sur les données saisies."] },
  { title: "Propriété intellectuelle", paragraphs: ["Les livrables créés pour le client lui appartiennent une fois le paiement complet reçu, sous réserve des droits de tiers (polices, images sous licence, logiciels). AUREX conserve ses méthodes, gabarits et outils, et peut y recourir pour d’autres clients."] },
  { title: "Confidentialité et renseignements personnels", paragraphs: ["Chaque partie protège les renseignements confidentiels de l’autre. Les renseignements personnels sont traités conformément à la politique de confidentialité. Pour les agents IA, la prospection ou l’enregistrement d’appels, les règles applicables et les consentements sont validés avec le client avant tout lancement."] },
  { title: "Limitation de responsabilité", paragraphs: ["Dans les limites permises par la loi, la responsabilité d’AUREX est limitée aux sommes payées pour le mandat concerné. AUREX n’est pas responsable des interruptions de services de tiers (plateformes publicitaires, hébergeurs, fournisseurs de téléphonie ou de modèles d’IA) ni des conséquences d’informations inexactes fournies par le client."] },
  { title: "Droit applicable", paragraphs: ["Ces conditions sont régies par les lois applicables au Québec et les lois fédérales du Canada qui s’y appliquent. Les litiges relèvent des tribunaux compétents du district de Montréal."] },
];

const termsEn: Block[] = [
  { title: "Scope of these terms", paragraphs: ["These terms govern the services offered by AUREX Solutions (“AUREX”). Each mandate is set out in a written proposal stating the scope, deliverables, timelines, price and exclusions. In case of discrepancy, the accepted proposal prevails over these general terms."] },
  { title: "Pricing and billing", paragraphs: ["Published prices are starting prices in Canadian dollars, taxes extra. The firm price appears in the proposal. Ad budget, domain names, hosting, software licences, telephony costs and other third-party fees are not included: they are billed at cost or paid directly by the client to their provider. Payment terms are set out in the proposal."] },
  { title: "Monthly plans", paragraphs: ["Monthly plans have a 6-month minimum commitment, then continue monthly with 30 days’ written notice. A 12-month commitment may earn a reduced rate. The scope of each plan is set at signing; any additional work requires the client’s prior approval."] },
  { title: "“Basic website offered” offer", paragraphs: ["The offer is reserved for the designated plans and a 12-month commitment. The basic site uses a template, includes the stated number of pages and revision rounds, and relies on content supplied by the client. If the client cancels before the end of the 12 months, the value of the site is due pro rata for the remaining months, after which the site belongs to the client."] },
  { title: "Collaboration and approvals", paragraphs: ["The client provides content, access and approvals on time. Stated timelines are targets that depend on these. Posts, e-mails, campaigns and automations are approved by the client before going live where the proposal so provides."] },
  { title: "Results", paragraphs: ["AUREX undertakes to deliver professional work within the agreed scope. No sales, customer, ranking or savings result is guaranteed. The site’s calculators and simulations are estimates based on the data entered."] },
  { title: "Intellectual property", paragraphs: ["Deliverables created for the client belong to the client once full payment is received, subject to third-party rights (fonts, licensed images, software). AUREX keeps its methods, templates and tools and may use them for other clients."] },
  { title: "Confidentiality and personal information", paragraphs: ["Each party protects the other’s confidential information. Personal information is handled in accordance with the privacy policy. For AI agents, prospecting or call recording, applicable rules and consents are validated with the client before any launch."] },
  { title: "Limitation of liability", paragraphs: ["To the extent permitted by law, AUREX’s liability is limited to the amounts paid for the mandate concerned. AUREX is not responsible for outages of third-party services (ad platforms, hosts, telephony or AI model providers) or for the consequences of inaccurate information supplied by the client."] },
  { title: "Governing law", paragraphs: ["These terms are governed by the laws applicable in Quebec and the federal laws of Canada that apply there. Disputes fall under the competent courts of the district of Montréal."] },
];

export function TermsPage() {
  const { lang } = useLanguage();
  const fr = lang === "fr";
  return <>
    <PageMeta title={fr ? "Conditions de service" : "Terms of service"} description={fr ? "Prix, forfaits mensuels, engagement, site Web offert, propriété des livrables et responsabilité : les conditions générales de service d’AUREX Solutions." : "Pricing, monthly plans, commitment, the offered website, ownership of deliverables and liability: AUREX Solutions’ general terms of service."} />
    <PageHero eyebrow="AUREX / CONDITIONS" title={fr ? "Des conditions claires, avant de commencer." : "Clear terms, before we begin."} text={fr ? "Ces conditions générales complètent votre proposition écrite, qui précise la portée et le prix de chaque mandat." : "These general terms supplement your written proposal, which sets out the scope and price of each mandate."} />
    <Prose blocks={fr ? termsFr : termsEn} />
    <CtaBand />
  </>;
}

/* ───────────────────────── Legal notice ───────────────────────── */

export function LegalNoticePage() {
  const { lang } = useLanguage();
  const fr = lang === "fr";
  const { data: c } = trpc.content.company.useQuery();
  const identity = [c?.legalName, c?.neq ? `NEQ ${c.neq}` : "", c?.email, c?.phone, [c?.street, c?.postalCode].filter(Boolean).join(" ")].filter(Boolean).join(" · ");
  const blocks: Block[] = fr ? [
    { title: "Éditeur du site", paragraphs: [`AUREX Solutions, Montréal (Québec), Canada.${identity ? ` ${identity}.` : ""}`, "Les coordonnées complètes (raison sociale, numéro d’entreprise du Québec, adresse) sont publiées sur cette page et sur la page Contact."] },
    { title: "Hébergement", paragraphs: ["L’hébergeur et les sous-traitants techniques sont indiqués dans la politique de confidentialité lorsqu’ils traitent des renseignements personnels."] },
    { title: "Propriété intellectuelle", paragraphs: ["Le nom AUREX Solutions, le logo, la pyramide, les textes, les images et les outils de ce site sont protégés. Toute reproduction sans autorisation écrite est interdite, sauf citation courte avec mention de la source."] },
    { title: "Information générale", paragraphs: ["Le contenu du site est fourni à titre d’information. Il ne constitue ni un avis juridique, ni un avis financier, ni une promesse de résultat. Les calculateurs et simulateurs fournissent des estimations fondées sur les données que vous saisissez."] },
    { title: "Liens externes", paragraphs: ["Le site peut renvoyer à des sites tiers. AUREX n’est pas responsable de leur contenu. Les mentions de technologies ou de plateformes (par exemple des outils d’automatisation) décrivent des possibilités d’intégration et n’indiquent aucun partenariat officiel."] },
    { title: "Droit applicable", paragraphs: ["Les lois applicables au Québec et les lois fédérales du Canada qui s’y appliquent régissent ce site."] },
  ] : [
    { title: "Site publisher", paragraphs: [`AUREX Solutions, Montréal (Quebec), Canada.${identity ? ` ${identity}.` : ""}`, "Full contact details (legal name, Quebec business number, address) are published on this page and on the Contact page."] },
    { title: "Hosting", paragraphs: ["The host and technical subcontractors are listed in the privacy policy where they process personal information."] },
    { title: "Intellectual property", paragraphs: ["The AUREX Solutions name, logo, pyramid, texts, images and tools on this site are protected. Any reproduction without written permission is prohibited, except for a short quotation with the source."] },
    { title: "General information", paragraphs: ["The site’s content is provided for information. It is neither legal advice, financial advice nor a promise of results. Calculators and simulators give estimates based on the data you enter."] },
    { title: "External links", paragraphs: ["The site may link to third-party sites. AUREX is not responsible for their content. Mentions of technologies or platforms (for example automation tools) describe integration possibilities and do not indicate any official partnership."] },
    { title: "Governing law", paragraphs: ["The laws applicable in Quebec and the federal laws of Canada that apply there govern this site."] },
  ];
  return <>
    <PageMeta title={fr ? "Mentions légales" : "Legal notice"} description={fr ? "Éditeur, propriété intellectuelle, information générale et droit applicable du site AUREX Solutions." : "Publisher, intellectual property, general information and governing law of the AUREX Solutions website."} />
    <PageHero eyebrow="AUREX / MENTIONS LÉGALES" title={fr ? "Mentions légales." : "Legal notice."} text={fr ? "Qui édite ce site, ce qu’il contient et ce qui le régit." : "Who publishes this site, what it contains and what governs it."} />
    <Prose blocks={blocks} />
  </>;
}

/* ───────────────────────── Accessibility ───────────────────────── */

export function AccessibilityPage() {
  const { lang } = useLanguage();
  const fr = lang === "fr";
  const blocks: Block[] = fr ? [
    { title: "Notre engagement", paragraphs: ["AUREX Solutions vise à rendre son site utilisable par le plus grand nombre : navigation au clavier, structure de titres claire, contrastes suffisants, textes alternatifs pour les images, formulaires étiquetés, respect de la préférence « réduire les animations » et mises en page adaptées aux mobiles."] },
    { title: "Ce que nous vérifions", paragraphs: ["Chaque page est contrôlée par un audit automatisé d’accessibilité (outil axe-core) qui ne signale aucun défaut au moment de la livraison, et par des essais de navigation au clavier. Un audit automatisé ne détecte qu’une partie des problèmes : il ne remplace pas un essai avec des technologues d’assistance."] },
    { title: "Limites connues", paragraphs: ["Aucune certification de conformité n’est revendiquée. Certains contenus ajoutés plus tard, des documents PDF ou des outils tiers peuvent ne pas respecter pleinement les critères visés (WCAG 2.2, niveau AA)."] },
    { title: "Nous signaler un obstacle", paragraphs: ["Si vous rencontrez une difficulté d’accès à une page ou à un service, écrivez-nous depuis la page Contact en indiquant la page et le problème. Nous répondrons et proposerons une solution de rechange."] },
  ] : [
    { title: "Our commitment", paragraphs: ["AUREX Solutions aims to make its site usable by as many people as possible: keyboard navigation, a clear heading structure, sufficient contrast, alternative text for images, labelled forms, respect for the “reduce motion” preference and mobile-friendly layouts."] },
    { title: "What we check", paragraphs: ["Each page is checked by an automated accessibility audit (axe-core) that reports no defects at delivery, and by keyboard navigation tests. An automated audit detects only part of the issues: it does not replace testing with assistive-technology users."] },
    { title: "Known limits", paragraphs: ["No compliance certification is claimed. Some content added later, PDF documents or third-party tools may not fully meet the targeted criteria (WCAG 2.2, level AA)."] },
    { title: "Report a barrier", paragraphs: ["If you have difficulty accessing a page or service, write to us from the Contact page, naming the page and the problem. We will reply and offer an alternative."] },
  ];
  return <>
    <PageMeta title={fr ? "Accessibilité" : "Accessibility"} description={fr ? "Notre engagement d’accessibilité, ce que nous vérifions, les limites connues et comment nous signaler un obstacle." : "Our accessibility commitment, what we check, known limits and how to report a barrier."} />
    <PageHero eyebrow="AUREX / ACCESSIBILITÉ" title={fr ? "Un site pour tout le monde." : "A site for everyone."} text={fr ? "Notre engagement, nos vérifications et leurs limites, sans promesse excessive." : "Our commitment, our checks and their limits, with no overstatement."} />
    <Prose blocks={blocks} />
  </>;
}

/* ───────────────────────── Site map ───────────────────────── */

export function SitemapPage() {
  const { lang } = useLanguage();
  const fr = lang === "fr";
  const groups: Array<{ title: string; links: Array<[string, string]> }> = [
    { title: fr ? "Services" : "Services", links: [["/expertises", fr ? "Nos expertises" : "Our expertise"], ["/solutions", fr ? "Solutions d’affaires" : "Business solutions"], ["/intelligence-artificielle", "AUREX AI & Automation"], ["/automatisation", fr ? "Automatisation et agents IA" : "Automation and AI agents"], ["/secteurs", fr ? "Secteurs d’activité" : "Industries"], ["/innovations", "Innovations"]] },
    { title: fr ? "Offres et outils" : "Offers and tools", links: [["/tarifs", fr ? "Tarifs et offres" : "Pricing and offers"], ["/calculateurs", fr ? "Calculateurs d’affaires" : "Business calculators"], ["/simulateur", fr ? "Simulateur de rentabilité" : "Profitability simulator"], ["/diagnostic", fr ? "Diagnostic d’entreprise" : "Business diagnostic"], ["/soumission", fr ? "Demander une soumission" : "Request a proposal"], ["/consultation", fr ? "Obtenir une consultation" : "Request a consultation"]] },
    { title: fr ? "Entreprise" : "Company", links: [["/a-propos", fr ? "À propos" : "About"], ["/methode", fr ? "Notre méthode" : "Our method"], ["/etudes-de-cas", fr ? "Études de cas" : "Case studies"], ["/ressources", fr ? "Ressources et analyses" : "Resources and insights"], ["/contact", "Contact"], ["/faq", fr ? "Questions fréquentes" : "FAQ"]] },
    { title: fr ? "Information légale" : "Legal information", links: [["/confidentialite", fr ? "Confidentialité" : "Privacy"], ["/conditions", fr ? "Conditions de service" : "Terms of service"], ["/mentions-legales", fr ? "Mentions légales" : "Legal notice"], ["/accessibilite", fr ? "Accessibilité" : "Accessibility"], ["/desabonnement", fr ? "Désabonnement" : "Unsubscribe"]] },
  ];
  return <>
    <PageMeta title={fr ? "Plan du site" : "Site map"} description={fr ? "Toutes les pages du site AUREX Solutions, par thème." : "All pages of the AUREX Solutions site, by theme."} />
    <PageHero eyebrow="AUREX / PLAN DU SITE" title={fr ? "Toutes les pages, au même endroit." : "All pages, in one place."} text={fr ? "Un accès direct à chaque section du site." : "Direct access to every section of the site."} />
    <section className="shell section sitemap-groups">
      {groups.map((g) => <div key={g.title}><h2>{g.title}</h2><ul>{g.links.map(([to, label]) => <li key={to}><Link to={to}>{label}</Link></li>)}</ul></div>)}
      <div><h2>{fr ? "Expertises" : "Expertise"}</h2><ul>{expertises.map((e) => <li key={e.slug}><Link to={`/expertises/${e.slug}`}>{tx(e.title, lang)}</Link></li>)}</ul></div>
      <div><h2>{fr ? "Secteurs" : "Industries"}</h2><ul>{sectors.map((s) => <li key={s.slug}><Link to={`/secteurs/${s.slug}`}>{tx(s.name, lang)}</Link></li>)}</ul></div>
    </section>
  </>;
}
