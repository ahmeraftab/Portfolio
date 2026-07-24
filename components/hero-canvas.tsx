"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => null,
});

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Lazily mounts the R3F scene on the client only, after first paint, so it
 * never blocks initial load. Falls back to a soft static gradient for
 * reduced-motion users, browsers without WebGL, or while the scene is
 * still loading.
 */
export function HeroCanvas() {
  const [ready, setReady] = React.useState(false);
  const [skip3d, setSkip3d] = React.useState(false);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !supportsWebGL()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSkip3d(true);
      return;
    }
    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200));
    idle(() => setReady(true));
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_35%,color-mix(in_oklch,var(--brand-teal),transparent_88%),transparent)]"
      />
      {ready && !skip3d && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <HeroScene />
        </motion.div>
      )}
    </div>
  );
}
