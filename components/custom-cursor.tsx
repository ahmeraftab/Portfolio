"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Tasteful custom cursor: a small dot with a trailing ring that expands
 * on interactive elements. Desktop (fine pointer) only — bails out
 * entirely on touch devices so mobile is untouched.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 300, mass: 0.4 });
  const ringY = useSpring(y, { damping: 28, stiffness: 300, mass: 0.4 });

  React.useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine || reduceMotion) return;
    // One-time client capability check gating a purely cosmetic overlay —
    // not derivable state, so the effect-setState rule doesn't apply here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor-hover]"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s ease" }}
    >
      <motion.div
        className="fixed left-0 top-0 rounded-full bg-primary"
        style={{ x, y, width: 6, height: 6, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="fixed left-0 top-0 rounded-full border border-primary/60"
        animate={{ width: hovering ? 52 : 28, height: hovering ? 52 : 28, opacity: hovering ? 0.9 : 0.5 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </div>
  );
}
