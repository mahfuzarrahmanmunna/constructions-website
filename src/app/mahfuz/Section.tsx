"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

const Section = () => {
  useEffect(() => {
    const lenis = new Lenis();

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      1
    </section>
  );
};

export default Section;
