"use client";

import * as React from "react";
import { motion } from "framer-motion";

export function TypingRole({ words }: { words: readonly string[] }) {
  const [wordIndex, setWordIndex] = React.useState(0);
  const [text, setText] = React.useState("");
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const current = words[wordIndex % words.length];
    const speed = deleting ? 28 : 55;
    const pause = 1400;

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      // Typewriter state machine advancing to the next word.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
      );
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, words]);

  return (
    <span className="inline-flex items-center font-mono text-sm text-primary sm:text-base">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="ml-0.5 inline-block h-[1em] w-[2px] bg-primary align-middle"
        aria-hidden="true"
      />
    </span>
  );
}
