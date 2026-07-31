"use client";

import Image from "next/image";

/**
 * Hero stage — left side keeps the earlier clean network look.
 * Right speaker dissolves into the stage (no visible photo frame).
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--hb-bg)]" />

      {/* Left — previous clean ambience (network + soft glow) */}
      <div className="absolute top-[-12%] left-[-8%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.18),transparent_68%)] blur-3xl" />
      <div className="absolute bottom-[-18%] left-[8%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgb(111_60_255_/_0.12),transparent_70%)] blur-3xl" />
      <div className="absolute top-[18%] right-[28%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.1),transparent_70%)] blur-3xl" />
      <div className="absolute inset-0 [background-image:linear-gradient(rgb(10_132_255_/_0.14)_1px,transparent_1px),linear-gradient(90deg,rgb(10_132_255_/_0.14)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_18%_42%,black_0%,transparent_70%)] [background-size:56px_56px] opacity-[0.2]" />
      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,rgb(124_196_255_/_0.5)_0.65px,transparent_0.75px)] [mask-image:radial-gradient(ellipse_at_22%_48%,black,transparent_62%)] [background-size:44px_44px] opacity-25" />
      <div className="absolute top-[34%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-[var(--hb-blue)]/40 to-transparent" />
      <div className="absolute top-[62%] left-[6%] h-px w-[26%] bg-gradient-to-r from-transparent via-[var(--hb-purple)]/30 to-transparent" />

      {/* Right — blurred stage fill (matches photo tones, kills hard box) */}
      <div className="absolute inset-y-0 right-0 w-[72%] overflow-hidden md:w-[68%] lg:w-[64%]">
        <Image
          src="/images/hero-speaker.png"
          alt=""
          fill
          priority
          sizes="68vw"
          className="scale-[1.2] object-cover object-[70%_34%] opacity-70 blur-[42px] saturate-125"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgb(10_132_255_/_0.2),transparent_60%)]" />
      </div>

      {/* Soft beams (not at extreme right edge) */}
      <div className="absolute top-[-4%] right-[14%] h-[50%] w-[32%] rotate-[-16deg] bg-[linear-gradient(180deg,rgb(10_132_255_/_0.16),transparent_72%)] opacity-40 blur-2xl" />
      <div className="absolute inset-y-[12%] right-[8%] w-[46%] [background-image:radial-gradient(circle_at_center,rgb(124_196_255_/_0.55)_0.65px,transparent_0.8px)] [mask-image:radial-gradient(ellipse_at_60%_42%,black_5%,transparent_70%)] [background-size:46px_46px] opacity-[0.18]" />

      {/*
        Sharp speaker with heavy feather on ALL edges —
        radial + side fades so the photo rectangle disappears.
      */}
      <div className="absolute top-[72px] right-0 bottom-[80px] w-full sm:w-[90%] md:w-[78%] lg:w-[68%] xl:w-[64%]">
        <Image
          src="/images/hero-speaker.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 65vw"
          className="[mask-image:radial-gradient(ellipse_72%_78%_at_58%_46%,black_42%,rgba(0,0,0,0.55)_62%,transparent_78%),linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.35)_12%,black_28%,black_88%,rgba(0,0,0,0.4)_96%,transparent_100%)] [mask-composite:intersect] object-contain object-[center_40%] brightness-[1.04] contrast-[1.04] [-webkit-mask-composite:source-in] [-webkit-mask-image:radial-gradient(ellipse_72%_78%_at_58%_46%,black_42%,rgba(0,0,0,0.55)_62%,transparent_78%),linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.35)_12%,black_28%,black_88%,rgba(0,0,0,0.4)_96%,transparent_100%)]"
        />
      </div>

      {/* Soft left→right dissolve into copy (no hard vertical frame) */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--hb-bg)_0%,rgba(5,8,20,0.94)_22%,rgba(5,8,20,0.55)_38%,rgba(5,8,20,0.18)_52%,transparent_68%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,20,0.42)_0%,transparent_14%,transparent_78%,rgba(5,8,20,0.48)_100%)]" />

      {/* Hide far-right hairline */}
      <div className="absolute inset-y-0 right-0 w-5 bg-gradient-to-l from-[var(--hb-bg)] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-px bg-[var(--hb-bg)]" />
    </div>
  );
}
