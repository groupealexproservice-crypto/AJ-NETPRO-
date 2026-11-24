import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

const shapes = [
  "M300 64 L506 182 L506 418 L300 536 L94 418 L94 182 Z",
  "M300 70 L490 300 L300 530 L110 300 Z",
  "M150 490 L150 300 L270 300 L270 170 L450 170 L450 490 Z",
  "M110 430 L210 330 L310 390 L490 170 L520 210 L320 470 L210 400 L140 470 Z",
  "M120 450 L120 150 L180 150 L180 330 L300 210 L420 330 L420 110 L480 110 L480 450 Z",
  "M300 90 C430 90 510 190 510 300 C510 430 420 510 300 510 C170 510 90 420 90 300 C90 180 180 90 300 90 Z",
];

export function GrowthMorph() {
  const root = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      const path = MorphSVGPlugin.convertToPath("#benex-morph-origin");
      const timeline = gsap.timeline({ repeat: -1 });
      shapes.slice(1).forEach((_, index) => {
        timeline.to(path, {
          duration: 2,
          morphSVG: `#benex-morph-${index + 1}`,
          ease: "expo.out",
        }, "+=1");
      });
      timeline.to(path, { duration: 2, morphSVG: shapes[0], ease: "expo.out" }, "+=1");
      gsap.to(".benex-data-node", {
        opacity: 0.25,
        duration: 1.8,
        stagger: { each: 0.3, repeat: -1, yoyo: true },
        ease: "sine.inOut",
      });
    }, root);
    return () => context.revert();
  }, []);

  return (
    <svg ref={root} className="growth-morph" viewBox="0 0 600 600" aria-hidden="true">
      <g className="morph-network" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M28 108H180M420 492H572M64 520L188 396M412 196L548 60" />
        <path d="M50 80V160M550 440V520" strokeDasharray="3 7" />
      </g>
      <g fill="currentColor" className="morph-nodes">
        <circle className="benex-data-node" cx="28" cy="108" r="4" />
        <circle className="benex-data-node" cx="572" cy="492" r="4" />
        <circle className="benex-data-node" cx="548" cy="60" r="4" />
        <circle className="benex-data-node" cx="64" cy="520" r="4" />
      </g>
      <path id="benex-morph-origin" d={shapes[0]} fill="none" stroke="currentColor" strokeWidth="2" />
      {shapes.map((shape, index) => (
        <path key={shape} id={`benex-morph-${index}`} d={shape} fill="none" stroke="currentColor" strokeWidth="2" visibility="hidden" />
      ))}
      <text x="300" y="310" textAnchor="middle" fill="currentColor" className="morph-monogram">B</text>
    </svg>
  );
}
