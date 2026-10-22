"use client";

import { useEffect, type RefObject } from "react";

/**
 * Applies a vertical scroll parallax to the given element using GSAP
 * ScrollTrigger. Loaded dynamically (client-only) so it never ships to or
 * runs on the server. Disabled on small screens and for reduced-motion users.
 */
export function useGsapParallax(
  ref: RefObject<HTMLElement | null>,
  { from = -40, to = 40, scrub = 1.2 }: { from?: number; to?: number; scrub?: number } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        const tween = gsap.fromTo(
          el,
          { y: from },
          {
            y: to,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub,
            },
          }
        );
        cleanup = () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }
    );

    return () => cleanup?.();
  }, [ref, from, to, scrub]);
}
