"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";

import { gsapConfig } from "@/lib/animations/gsap";

/**
 * Full-hero background — exact speaker image, face clear and professional.
 */
export function HeroBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !rootRef.current) return;
    gsap.defaults(gsapConfig.defaults);
    const ctx = gsap.context(() => {
      gsap.to(".hb-glow", {
        opacity: 0.75,
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#050814]" />

      {/* Exact speaker — face framed clearly on the right (Name.com clarity) */}
      <div className="absolute inset-y-0 right-0 w-full sm:w-[62%] lg:w-[58%]">
        <Image
          src="/images/hero-speaker.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover object-[58%_18%] sm:object-[55%_12%] lg:object-[52%_10%]"
        />
      </div>

      {/* Soft left wash for copy — keeps face area clean */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#050814_0%,#050814_36%,rgb(5_8_20_/_0.55)_48%,transparent_62%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(5_8_20_/_0.45)_0%,transparent_18%,transparent_78%,rgb(5_8_20_/_0.7)_100%)]" />

      <div className="hb-glow absolute top-[16%] right-[22%] h-[16rem] w-[16rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.18),transparent_70%)] blur-3xl" />
      <div className="hb-glow absolute right-[10%] bottom-[22%] h-[14rem] w-[14rem] rounded-full bg-[radial-gradient(circle,rgb(111_60_255_/_0.14),transparent_70%)] blur-3xl" />
    </div>
  );
}
