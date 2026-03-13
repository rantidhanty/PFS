"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
  target: number;
  suffix?: string;
  duration?: number; // ms
};

export function CountUp({ target, suffix = "", duration = 1800 }: Props) {
  // Initial value = target → SSR & Google baca angka akhir yang benar
  const [display, setDisplay] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const animatedRef = useRef(false);

  // Reset ke 0 saat mount (client-only), sebelum user scroll ke elemen ini
  useEffect(() => {
    setDisplay(0);
  }, []);

  useEffect(() => {
    if (!isInView) {
      // Izinkan animasi ulang kalau scroll keluar lalu masuk lagi
      animatedRef.current = false;
      return;
    }
    if (animatedRef.current) return;
    animatedRef.current = true;

    let rafId: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic — awalnya cepat, melambat di akhir
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, duration]);

  return (
    // aria-label menjamin screen reader & Google baca nilai akhir yang benar
    <span ref={ref} aria-label={`${target}${suffix}`}>
      {display}
      {suffix}
    </span>
  );
}
