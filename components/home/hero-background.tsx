"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import { gsapConfig } from "@/lib/animations/gsap";

/**
 * Dark luxury atmosphere + exact uploaded speaker image on the right.
 */
export function HeroBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !rootRef.current) return;
    gsap.defaults(gsapConfig.defaults);
    const ctx = gsap.context(() => {
      gsap.to(".hb-beam", {
        opacity: 0.85,
        duration: 4.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(".hb-orb", {
        scale: 1.08,
        opacity: 0.9,
        duration: 5.2,
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

      {/* Soft datacenter / stage ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgb(10_132_255_/_0.18),transparent_42%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_35%,rgb(111_60_255_/_0.22),transparent_48%)]" />
      <div className="hb-orb absolute top-[10%] right-[8%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.22),transparent_70%)] blur-3xl" />
      <div className="hb-orb absolute right-[18%] bottom-[5%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgb(111_60_255_/_0.2),transparent_70%)] blur-3xl" />

      {/* Exact uploaded speaker — right composition */}
      <div className="absolute top-[8%] right-[-4%] hidden h-[92%] w-[58%] md:block lg:right-[0%] xl:right-[2%]">
        <div className="relative h-full w-full">
          <Image
            src="/images/hero-speaker.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 55vw, 640px"
            className="object-contain object-bottom drop-shadow-[0_30px_80px_rgb(10_132_255_/_0.25)]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(5_8_20_/_0.35)_72%,rgb(5_8_20_/_0.85)_100%)]" />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#050814] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#050814] to-transparent" />
        </div>
      </div>

      <div className="hb-beam absolute top-[18%] left-[35%] h-[2px] w-[40%] rotate-[-10deg] bg-gradient-to-r from-transparent via-[#0A84FF] to-transparent opacity-60 blur-[1px]" />
      <div className="hb-beam absolute top-[42%] right-[10%] h-[2px] w-[35%] rotate-[14deg] bg-gradient-to-r from-transparent via-[#6F3CFF] to-transparent opacity-55 blur-[1px]" />

      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,rgb(255_255_255_/_0.45)_0.55px,transparent_0.7px)] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)] [background-size:40px_40px] opacity-25" />

      <motion.div
        className="absolute top-[22%] right-[22%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.35),transparent_70%)] blur-2xl"
        animate={reduceMotion ? undefined : { opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
