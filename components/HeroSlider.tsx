"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Ratios = { d: string; t: string; m: string };

const SLIDES: { base: string; tablet: string; portrait: string; alt: string; ratios: Ratios }[] = [
  {
    base: "/img/hero_slider1_1.png",
    tablet: "/img/hero_slider1_2.png",
    portrait: "/img/hero_slider1_3.png",
    alt: "Lanceflows — Software Engineering & AI Services: from idea to architecture, engineering, AI automation, launch, and growth.",
    ratios: { d: "16/9", t: "4/3", m: "9/16" },
  },
  {
    base: "/img/hero_slider2_1.png",
    tablet: "/img/hero_slider2_2.png",
    portrait: "/img/hero_slider2_3.png",
    alt: "Your vision, our engineering, real results — trusted, focused, engineered, scalable. Senior engineers delivering from idea to growth.",
    ratios: { d: "16/9", t: "4/3", m: "9/16" },
  },
  {
    base: "/img/hero_slider3_1.png",
    tablet: "/img/hero_slider3_2.png",
    portrait: "/img/hero_slider3_3.png",
    alt: "Invest your strength, grow through flow — a seamless system that amplifies impact, from your strengths to bigger projects, leadership, and stable opportunity.",
    ratios: { d: "16/9", t: "4/3", m: "9/16" },
  },
];

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const slidesRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // The box adopts the active slide's art-directed ratio per breakpoint (no crop).
  const applyRatio = useCallback(
    (idx: number) => {
      const el = slidesRef.current;
      if (!el) return;
      const w = window.innerWidth;
      const r = w <= 560 ? SLIDES[idx].ratios.m : w <= 900 ? SLIDES[idx].ratios.t : SLIDES[idx].ratios.d;
      el.style.aspectRatio = r;
    },
    []
  );

  const start = useCallback(() => {
    timer.current = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 5500);
  }, []);

  useEffect(() => {
    applyRatio(i);
  }, [i, applyRatio]);

  useEffect(() => {
    start();
    const onResize = () => applyRatio(i);
    window.addEventListener("resize", onResize);
    return () => {
      if (timer.current) clearInterval(timer.current);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (n: number) => {
    setI(((n % SLIDES.length) + SLIDES.length) % SLIDES.length);
    if (timer.current) clearInterval(timer.current);
    start();
  };

  return (
    <div className="slider" aria-roledescription="carousel" aria-label="Lanceflows highlights">
      <div className="slides" ref={slidesRef}>
        {SLIDES.map((s, idx) => (
          <div
            key={idx}
            className={`slide slide-${idx + 1}${idx === i ? " active" : ""}`}
          >
            <picture className="slide-pic">
              <source media="(max-width:560px)" srcSet={s.portrait} />
              <source media="(max-width:900px)" srcSet={s.tablet} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.base} alt={s.alt} />
            </picture>
          </div>
        ))}
      </div>
      <button className="arrow prev" aria-label="Previous slide" onClick={() => go(i - 1)}>
        ‹
      </button>
      <button className="arrow next" aria-label="Next slide" onClick={() => go(i + 1)}>
        ›
      </button>
      <div className="dots" aria-label="Choose slide">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            className={"dot" + (idx === i ? " active" : "")}
            aria-label={"Go to slide " + (idx + 1)}
            onClick={() => go(idx)}
          />
        ))}
      </div>
    </div>
  );
}
