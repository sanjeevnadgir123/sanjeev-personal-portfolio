"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Re-mounts on every /work/* navigation, giving project pages a soft cinematic entrance. */
export default function WorkTemplate({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
