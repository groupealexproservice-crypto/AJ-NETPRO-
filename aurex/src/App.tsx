import { Fragment, Suspense, lazy } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = React.ComponentType<any>;
const named = <T extends Record<string, unknown>>(loader: () => Promise<T>, key: keyof T) => lazy(() => loader().then((m) => ({ default: m[key] as AnyComponent })));
const Login = lazy(() => import("./pages/Login"));
const ClientPortal = lazy(() => import("./pages/ClientPortal"));
const AdminPortal = lazy(() => import("./pages/AdminPortal"));
const company = () => import("./pages/CompanyPages");
const directory = () => import("./pages/DirectoryPages");
const product = () => import("./pages/ProductPages");
const AboutPage = named(company, "AboutPage"), ContactPage = named(company, "ContactPage"), InsightDetail = named(company, "InsightDetail"), InsightsPage = named(company, "InsightsPage");
const LeadPage = named(company, "LeadPage"), MethodPage = named(company, "MethodPage"), NotFound = named(company, "NotFound"), PrivacyPage = named(company, "PrivacyPage");
const UnsubscribePage = named(company, "UnsubscribePage"), WorkPage = named(company, "WorkPage");
const ExpertiseDetail = named(directory, "ExpertiseDetail"), ExpertiseIndex = named(directory, "ExpertiseIndex"), SectorDetail = named(directory, "SectorDetail"), SectorsPage = named(directory, "SectorsPage"), SolutionsPage = named(directory, "SolutionsPage");
const AIPage = named(product, "AIPage"), PricingPage = named(product, "PricingPage"), SimulatorPage = named(product, "SimulatorPage");
import { localizePath } from "./routes";
import type { Lang } from "./content";

function PublicSite() {
  return <Layout><Suspense fallback={<div className="route-loading" role="status" aria-label="Chargement" />}><Outlet /></Suspense></Layout>;
}

function RedirectToLanguage() {
  return <Navigate to="/fr" replace />;
}

const pages: Array<[canonical: string, element: React.ReactElement]> = [
  ["/", <Home />],
  ["/a-propos", <AboutPage />],
  ["/expertises", <ExpertiseIndex />],
  ["/expertises/:slug", <ExpertiseDetail />],
  ["/solutions", <SolutionsPage />],
  ["/secteurs", <SectorsPage />],
  ["/secteurs/:slug", <SectorDetail />],
  ["/tarifs", <PricingPage />],
  ["/etudes-de-cas", <WorkPage />],
  ["/ressources", <InsightsPage />],
  ["/ressources/:slug", <InsightDetail />],
  ["/methode", <MethodPage />],
  ["/simulateur", <SimulatorPage />],
  ["/intelligence-artificielle", <AIPage />],
  ["/contact", <ContactPage />],
  ["/diagnostic", <LeadPage mode="diagnostic" />],
  ["/soumission", <LeadPage mode="quote" />],
  ["/consultation", <LeadPage mode="appointment" />],
  ["/confidentialite", <PrivacyPage />],
  ["/desabonnement", <UnsubscribePage />],
  ["/connexion", <Login />],
];

export default function App() {
  return (
    <Suspense fallback={<div className="route-loading" role="status" aria-label="Chargement" />}>
    <Routes>
      <Route path="/" element={<RedirectToLanguage />} />
      <Route element={<PublicSite />}>
        {(["fr", "en"] as Lang[]).map((lang) => (
          <Fragment key={lang}>
            {pages.map(([canonical, element]) => <Route key={`${lang}${canonical}`} path={localizePath(canonical, lang)} element={element} />)}
          </Fragment>
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/fr/espace-client" element={<ClientPortal />} />
      <Route path="/en/client-portal" element={<ClientPortal />} />
      <Route path="/admin" element={<AdminPortal />} />
    </Routes>
    </Suspense>
  );
}
