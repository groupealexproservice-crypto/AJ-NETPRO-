import { useEffect, useRef, useState } from "react";

/**
 * Interactive 3D sculpture (public/models/sculpture-aurex.glb).
 * The still image is the first paint; the 3D engine is downloaded only once the section is about to be seen,
 * and the still stays if WebGL or the download fails. Rotation never starts by itself when reduced motion is requested.
 */
export function Sculpture3D({ alt, hint }: { alt: string; hint: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    let cancelled = false;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      import("@google/model-viewer").then(() => { if (!cancelled) setReady(true); }).catch(() => { if (!cancelled) setFailed(true); });
    }, { rootMargin: "300px" });
    observer.observe(node);
    return () => { cancelled = true; observer.disconnect(); };
  }, []);

  return (
    <div className="sculpture" ref={host} data-state={failed ? "still" : ready ? "3d" : "loading"}>
      <img className="sculpture-still" src="/images/sculpture-aurex.webp" alt={ready && !failed ? "" : alt} width={1000} height={1000} loading="lazy" decoding="async" />
      {ready && !failed && (
        <model-viewer
          src="/models/sculpture-aurex.glb"
          alt={alt}
          poster="/images/sculpture-aurex.webp"
          camera-controls=""
          {...(reducedMotion ? {} : { "auto-rotate": "", "auto-rotate-delay": "2500", "rotation-per-second": "14deg" })}
          disable-zoom=""
          disable-pan=""
          interaction-prompt="none"
          shadow-intensity="0.9"
          shadow-softness="1"
          exposure="1"
          environment-image="legacy"
          camera-orbit="20deg 68deg auto"
          field-of-view="26deg"
          min-polar-angle="50deg"
          max-polar-angle="88deg"
          touch-action="pan-y"
          reveal="auto"
          onError={() => setFailed(true)}
        />
      )}
      <p className="sculpture-hint">{hint}</p>
    </div>
  );
}
