import { Fragment } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ClientPortal from "./pages/ClientPortal";
import AdminPortal from "./pages/AdminPortal";
import { AboutPage, ContactPage, InsightDetail, InsightsPage, LeadPage, MethodPage, NotFound, PrivacyPage, UnsubscribePage, WorkPage } from "./pages/CompanyPages";
import { ExpertiseDetail, ExpertiseIndex, SectorDetail, SectorsPage, SolutionsPage } from "./pages/DirectoryPages";
import { AIPage, PricingPage, SimulatorPage } from "./pages/ProductPages";
import { localizePath } from "./routes";
import type { Lang } from "./content";

function PublicSite() {
  return <Layout><Outlet /></Layout>;
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
  );
}
