"use client";

import Image from "next/image";

/**
 * Soft hosting ambience + stage image.
 * Soft cover + multi-edge feather so no rectangular photo frame is visible.
 */
export function HeroBackground({
  imageSrc = "/images/hero-speaker.png",
}: {
  imageSrc?: string;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--hb-bg)]" />

      {/* Ambient network glow (left) */}
      <div className="absolute top-[-12%] left-[-8%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.18),transparent_68%)] blur-3xl" />
      <div className="absolute bottom-[-18%] left-[8%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgb(111_60_255_/_0.12),transparent_70%)] blur-3xl" />
      <div className="absolute top-[18%] right-[28%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.1),transparent_70%)] blur-3xl" />
      <div className="absolute inset-0 [background-image:linear-gradient(rgb(10_132_255_/_0.14)_1px,transparent_1px),linear-gradient(90deg,rgb(10_132_255_/_0.14)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_18%_42%,black_0%,transparent_70%)] [background-size:56px_56px] opacity-[0.2]" />
      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,rgb(124_196_255_/_0.5)_0.65px,transparent_0.75px)] [mask-image:radial-gradient(ellipse_at_22%_48%,black,transparent_62%)] [background-size:44px_44px] opacity-25" />

      {/* Deep blurred color wash — never shows a hard rectangle */}
      <div className="absolute inset-y-[-8%] right-[-12%] w-[90%] sm:w-[80%] lg:w-[72%]">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="75vw"
          className="scale-[1.35] object-cover object-[68%_38%] opacity-45 blur-[56px] saturate-150"
        />
      </div>

      {/* Soft light beam */}
      <div className="absolute top-[-6%] right-[10%] h-[55%] w-[38%] rotate-[-14deg] bg-[linear-gradient(180deg,rgb(10_132_255_/_0.16),transparent_75%)] opacity-40 blur-3xl" />

      {/*
        Main subject: object-cover (no letterbox frame) + heavy CSS mask.
        Edges dissolve into --hb-bg so the photo never looks boxed.
      */}
      <div className="absolute inset-0 hidden sm:block">
        <div className="hb-hero-photo-wrap absolute top-[6%] right-[-6%] bottom-[2%] left-[22%] md:left-[28%] lg:left-[32%]">
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 70vw, 58vw"
            className="hb-hero-photo scale-[1.08] object-cover object-[62%_40%] brightness-[1.02] contrast-[1.02]"
          />
        </div>
      </div>

      {/* Mobile: softer ambient only — no framed photo crop */}
      <div className="absolute inset-y-[10%] right-[-20%] left-[35%] opacity-70 sm:hidden">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="80vw"
          className="scale-125 object-cover object-[70%_40%] opacity-40 blur-[28px] saturate-125"
        />
      </div>

      {/* Match to brand bg — kill any remaining hard edges */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#050814_0%,rgba(5,8,20,0.96)_16%,rgba(5,8,20,0.62)_32%,rgba(5,8,20,0.22)_46%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,20,0.65)_0%,transparent_12%,transparent_72%,rgba(5,8,20,0.88)_100%)]" />
      <div className="absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-[#050814] via-[#050814]/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050814] via-[#050814]/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050814]/90 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-[8%] bg-gradient-to-r from-[#050814] to-transparent" />
    </div>
  );
}
