import { useEffect, useRef } from "react";

/**
 * Decorative field of drifting nodes joined by fine lines, evoking a neural network.
 * Purely ornamental (aria-hidden). Pauses off-screen and in hidden tabs; static when reduced motion is requested.
 */
export function NeuralField({ density = 1, className = "" }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0, height = 0, frame = 0, running = false, visible = true;
    type Node = { x: number; y: number; vx: number; vy: number; r: number; hot: boolean };
    let nodes: Node[] = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth; height = canvas.clientHeight;
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const small = width < 720;
      const count = Math.round(Math.min(small ? 26 : 70, (width * height) / 16000) * density);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        r: 1 + Math.random() * 1.6, hot: Math.random() < 0.12,
      }));
      draw();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const reach = Math.min(170, Math.max(110, width / 7));
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < reach) {
            context.strokeStyle = `rgba(232, 190, 112, ${(1 - d / reach) * 0.3})`;
            context.lineWidth = 0.8;
            context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke();
          }
        }
      }
      for (const n of nodes) {
        context.fillStyle = n.hot ? "rgba(255, 230, 170, 0.95)" : "rgba(222, 196, 140, 0.7)";
        context.beginPath(); context.arc(n.x, n.y, n.hot ? n.r + 0.8 : n.r, 0, Math.PI * 2); context.fill();
        if (n.hot) { context.fillStyle = "rgba(240, 196, 106, 0.14)"; context.beginPath(); context.arc(n.x, n.y, 9, 0, Math.PI * 2); context.fill(); }
      }
    };

    const tick = () => {
      if (!running) return;
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      draw();
      frame = window.requestAnimationFrame(tick);
    };
    const update = () => {
      const should = !reduced && visible && !document.hidden;
      if (should && !running) { running = true; frame = window.requestAnimationFrame(tick); }
      if (!should && running) { running = false; window.cancelAnimationFrame(frame); }
    };

    // Decorative only: wait until the browser is idle so it never competes with the first paint.
    let observer: IntersectionObserver | undefined, resizer: ResizeObserver | undefined;
    const start = () => {
      observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
      resizer = new ResizeObserver(resize);
      observer.observe(canvas); resizer.observe(canvas);
      document.addEventListener("visibilitychange", update);
      resize(); update();
    };
    const timer = window.setTimeout(start, 1200);
    return () => { window.clearTimeout(timer); running = false; window.cancelAnimationFrame(frame); observer?.disconnect(); resizer?.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, [density]);

  return <canvas ref={ref} className={`neural-field ${className}`} aria-hidden="true" />;
}
