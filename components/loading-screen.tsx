"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/constants";

const SESSION_KEY = "portfolio-visited";

export function LoadingScreen() {
  const [show, setShow] = React.useState(false);
  const [hasChecked, setHasChecked] = React.useState(false);

  React.useEffect(() => {
    const alreadyVisited = sessionStorage.getItem(SESSION_KEY);
    if (alreadyVisited) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasChecked(true);
      return;
    }
    setShow(true);
    setHasChecked(true);
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  if (!hasChecked) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
              {SITE.name.toUpperCase()}
            </span>
            <div className="relative h-px w-40 overflow-hidden bg-border">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
                className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
