"use client";

import { useEffect } from "react";

export function AutoScrollInit() {
  useEffect(() => {
    const scrollers = Array.from(
      document.querySelectorAll<HTMLElement>('[data-auto-scroll="true"]'),
    );

    const pause = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      target.dataset.paused = "true";
    };

    const resume = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      target.dataset.paused = "false";
    };

    scrollers.forEach((scroller) => {
      scroller.dataset.paused = "false";
      scroller.addEventListener("mouseenter", pause);
      scroller.addEventListener("mouseleave", resume);
      scroller.addEventListener("touchstart", pause, { passive: true });
      scroller.addEventListener("touchend", resume);
      scroller.addEventListener("pointerdown", pause);
      scroller.addEventListener("pointerup", resume);
      scroller.addEventListener("focusin", pause);
      scroller.addEventListener("focusout", resume);
    });

    let rafId = 0;
    let lastTs = 0;
    const speedPxPerSecond = 24;
    const carryMap = new WeakMap<HTMLElement, number>();

    const tick = (ts: number) => {
      if (!lastTs) lastTs = ts;
      const delta = ts - lastTs;
      lastTs = ts;

      scrollers.forEach((scroller) => {
        if (scroller.dataset.paused === "true") return;
        if (scroller.scrollWidth <= scroller.clientWidth + 8) return;

        const direction = scroller.dataset.scrollDirection === "left" ? -1 : 1;
        const maxLeft = scroller.scrollWidth - scroller.clientWidth;
        const previousCarry = carryMap.get(scroller) ?? 0;
        const rawMove = (speedPxPerSecond * delta) / 1000 + previousCarry;
        const move = Math.floor(rawMove);
        carryMap.set(scroller, rawMove - move);

        if (move <= 0) return;

        const nextLeft = scroller.scrollLeft + move * direction;

        if (direction > 0) {
          scroller.scrollLeft = nextLeft >= maxLeft - 1 ? 0 : nextLeft;
        } else {
          scroller.scrollLeft = nextLeft <= 1 ? maxLeft : nextLeft;
        }
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      scrollers.forEach((scroller) => {
        scroller.removeEventListener("mouseenter", pause);
        scroller.removeEventListener("mouseleave", resume);
        scroller.removeEventListener("touchstart", pause);
        scroller.removeEventListener("touchend", resume);
        scroller.removeEventListener("pointerdown", pause);
        scroller.removeEventListener("pointerup", resume);
        scroller.removeEventListener("focusin", pause);
        scroller.removeEventListener("focusout", resume);
      });
    };
  }, []);

  return null;
}
