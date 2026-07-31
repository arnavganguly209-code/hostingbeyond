"use client";

import Image from "next/image";

/**
 * Seamless hero stage:
 * 1) Blurred cover fill on the right (kills empty black + hard image frame)
 * 2) Sharp zoomed-out speaker in a safe band (face + cap + gesture clear)
 * 3) Soft feather masks so it never looks “pasted”
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--hb-bg)]" />

      {/* Right stage atmosphere — same photo, blurred & enlarged (no kali empty) */}
      <div className="absolute inset-y-0 right-0 w-[78%] md:w-[70%] lg:w-[66%]">
        <Image
          src="/images/hero-speaker.png"
          alt=""
          fill
          priority
          sizes="70vw"
          className="scale-125 object-cover object-[72%_32%] opacity-60 blur-[36px] saturate-150"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_40%,rgb(10_132_255_/_0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--hb-bg)_0%,rgba(5,8,20,0.55)_18%,transparent_42%)]" />
      </div>

      {/* Stage beams / particles on the right so the side feels alive */}
      <div className="absolute top-[-5%] right-[8%] h-[55%] w-[38%] rotate-[-18deg] bg-[linear-gradient(180deg,rgb(10_132_255_/_0.22),transparent_70%)] opacity-50 blur-2xl" />
      <div className="absolute top-[10%] right-[22%] h-[48%] w-[22%] rotate-[-8deg] bg-[linear-gradient(180deg,rgb(124_196_255_/_0.16),transparent_75%)] opacity-40 blur-xl" />
      <div className="absolute inset-y-0 right-0 w-[58%] [background-image:radial-gradient(circle_at_center,rgb(124_196_255_/_0.7)_0.7px,transparent_0.85px)] [mask-image:radial-gradient(ellipse_at_70%_45%,black_10%,transparent_70%)] [background-size:42px_42px] opacity-30" />
      <div className="absolute inset-y-[12%] right-[4%] w-[50%] [background-image:linear-gradient(rgb(10_132_255_/_0.2)_1px,transparent_1px),linear-gradient(90deg,rgb(10_132_255_/_0.2)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_75%_42%,black_0%,transparent_68%)] [background-size:64px_64px] opacity-20" />

      {/*
        Sharp speaker — vertical safe zone keeps cap + face above the fold
        and above the stats bar. object-contain = zoomed out, no hard crop.
      */}
      <div className="absolute top-[88px] right-0 bottom-[96px] w-full sm:w-[88%] md:w-[74%] lg:w-[66%] xl:w-[62%]">
        <Image
          src="/images/hero-speaker.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 62vw"
          className="[mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.25)_8%,black_20%,black_100%),linear-gradient(180deg,transparent_0%,black_7%,black_90%,transparent_100%)] [mask-composite:intersect] object-contain object-[center_38%] brightness-[1.06] contrast-[1.05] drop-shadow-[0_28px_70px_rgb(10_132_255_/_0.22)] [-webkit-mask-composite:source-in] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.25)_8%,black_20%,black_100%),linear-gradient(180deg,transparent_0%,black_7%,black_90%,transparent_100%)]"
        />
      </div>

      {/* Left copy wash only — right stays open for a clear face */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--hb-bg)_0%,rgba(5,8,20,0.98)_20%,rgba(5,8,20,0.78)_32%,rgba(5,8,20,0.35)_44%,rgba(5,8,20,0.08)_56%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,20,0.5)_0%,transparent_14%,transparent_78%,rgba(5,8,20,0.45)_100%)]" />

      {/* Left network ambience */}
      <div className="absolute top-[-10%] left-[-6%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.18),transparent_68%)] blur-3xl" />
      <div className="absolute bottom-[-16%] left-[4%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(111_60_255_/_0.1),transparent_70%)] blur-3xl" />
      <div className="absolute inset-y-0 left-0 w-[46%] [background-image:linear-gradient(rgb(10_132_255_/_0.14)_1px,transparent_1px),linear-gradient(90deg,rgb(10_132_255_/_0.14)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_20%_45%,black_0%,transparent_72%)] [background-size:56px_56px] opacity-[0.2]" />
      <div className="absolute inset-y-0 left-0 w-[42%] [background-image:radial-gradient(circle_at_center,rgb(124_196_255_/_0.55)_0.65px,transparent_0.75px)] [mask-image:radial-gradient(ellipse_at_24%_48%,black,transparent_65%)] [background-size:44px_44px] opacity-[0.22]" />
      <div className="absolute top-[36%] left-0 h-px w-[34%] bg-gradient-to-r from-transparent via-[var(--hb-blue)]/35 to-transparent" />
      <div className="absolute top-[58%] left-[5%] h-px w-[22%] bg-gradient-to-r from-transparent via-[var(--hb-purple)]/28 to-transparent" />
    </div>
  );
}
