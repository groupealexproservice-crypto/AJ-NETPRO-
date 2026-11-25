import { Component, useEffect, type ErrorInfo, type ReactNode } from "react";
import { useLocation } from "react-router";

/**
 * Safety net against blank screens. Without it, a page that fails to load (network hiccup, a new deployment
 * replacing the files an open tab still points to) or throws while rendering unmounts the whole React tree and
 * leaves an empty page. Here the visitor always sees a message, a way to retry and a way home.
 */
const CHUNK_ERROR = /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|ChunkLoadError|Loading chunk .* failed|Unable to preload CSS/i;
const RELOAD_FLAG = "aurex_chunk_reload";

export function isChunkError(error: unknown): boolean {
  const message = error instanceof Error ? `${error.name} ${error.message}` : String(error ?? "");
  return CHUNK_ERROR.test(message);
}

/** After a deployment, old file names disappear: reload once to fetch the current ones, never in a loop. */
export function reloadOnce(): boolean {
  try {
    if (sessionStorage.getItem(RELOAD_FLAG)) return false;
    sessionStorage.setItem(RELOAD_FLAG, String(Date.now()));
  } catch { /* storage unavailable: fall through to the manual message */ return false; }
  window.location.reload();
  return true;
}

const text = (en: boolean) => en
  ? { title: "This page could not be displayed.", body: "A temporary problem prevented the page from loading. Your information has not been lost. Try again, or return to the home page.", retry: "Reload the page", home: "Back to the home page" }
  : { title: "Cette page n’a pas pu s’afficher.", body: "Un problème temporaire a empêché le chargement de la page. Vos renseignements n’ont pas été perdus. Réessayez, ou retournez à l’accueil.", retry: "Recharger la page", home: "Retour à l’accueil" };

function Fallback({ en }: { en: boolean }) {
  const t = text(en);
  return (
    <section className="route-error shell" role="alert">
      <p className="eyebrow">AUREX</p>
      <h1>{t.title}</h1>
      <p>{t.body}</p>
      <div className="route-error-actions">
        <button type="button" className="button-primary" onClick={() => window.location.reload()}>{t.retry}</button>
        <a className="button-light" href={en ? "/en" : "/fr"}>{t.home}</a>
      </div>
    </section>
  );
}

type Props = { children: ReactNode; en: boolean; path: string };
type State = { failed: boolean };

class Boundary extends Component<Props, State> {
  state: State = { failed: false };
  static getDerivedStateFromError(): State { return { failed: true }; }
  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error("Page failed to render", error, info.componentStack);
    if (isChunkError(error)) reloadOnce();
  }
  componentDidUpdate(prev: Props) { if (this.state.failed && prev.path !== this.props.path) this.setState({ failed: false }); }
  render() { return this.state.failed ? <Fallback en={this.props.en} /> : this.props.children; }
}

/** Resets itself on every navigation, so one failing page never blocks the others. */
export function RouteBoundary({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  useEffect(() => {
    // A page that loaded properly clears the one-reload guard.
    const timer = window.setTimeout(() => { try { sessionStorage.removeItem(RELOAD_FLAG); } catch { /* ignore */ } }, 4000);
    return () => window.clearTimeout(timer);
  }, [pathname]);
  return <Boundary path={pathname} en={pathname.startsWith("/en")}>{children}</Boundary>;
}

/** Visible loading state while a page's code is fetched. */
export function RouteLoading() {
  const { pathname } = useLocation();
  const en = pathname.startsWith("/en");
  return <div className="route-loading" role="status" aria-live="polite"><span className="route-spinner" aria-hidden="true" /><span className="route-loading-text">{en ? "Loading…" : "Chargement…"}</span></div>;
}
