"use client";

import { motion } from "framer-motion";

type Stat = {
  value: string;
  label: string;
  accent: string;
  bg: string;
};

export function ProjectStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
          className={`rounded-2xl border px-2.5 py-3.5 text-center sm:px-4 sm:py-5 ${stat.bg}`}
        >
          <p
            className={`text-base font-extrabold leading-tight tracking-tight sm:text-2xl ${stat.accent}`}
          >
            {stat.value}
          </p>
          <p className="mt-1 text-[10px] leading-snug text-zinc-500 sm:text-xs">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
