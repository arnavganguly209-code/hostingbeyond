"use client";

import Image from "next/image";

/**
 * Full hero visual — speaker image uncropped (face + gesture fully visible).
 * Soft left ambience for typography contrast.
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--hb-bg)]" />

      {/* Soft left network ambience */}
      <div className="absolute top-[-12%] left-[-8%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.18),transparent_68%)] blur-3xl" />
      <div className="absolute bottom-[-18%] left-[8%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgb(111_60_255_/_0.12),transparent_70%)] blur-3xl" />
      <div className="absolute inset-0 [background-image:linear-gradient(rgb(10_132_255_/_0.14)_1px,transparent_1px),linear-gradient(90deg,rgb(10_132_255_/_0.14)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_18%_42%,black_0%,transparent_70%)] [background-size:56px_56px] opacity-[0.18]" />
      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,rgb(124_196_255_/_0.5)_0.65px,transparent_0.75px)] [mask-image:radial-gradient(ellipse_at_22%_48%,black,transparent_62%)] [background-size:44px_44px] opacity-20" />
      <div className="absolute top-[34%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-[var(--hb-blue)]/40 to-transparent" />
      <div className="absolute top-[62%] left-[6%] h-px w-[26%] bg-gradient-to-r from-transparent via-[var(--hb-purple)]/30 to-transparent" />

      {/* Full hero speaker — object-contain so nothing is zoom-cropped */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
        <div className="absolute top-1/2 left-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.2),transparent_68%)] blur-3xl" />
        <Image
          src="/images/hero-speaker.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-contain object-[center_42%] drop-shadow-[0_24px_60px_rgb(10_132_255_/_0.18)]"
        />
      </div>

      {/* Readable left wash — keeps face visible on the right */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--hb-bg)_0%,rgba(5,8,20,0.92)_34%,rgba(5,8,20,0.35)_58%,rgba(5,8,20,0.15)_100%)] lg:bg-[linear-gradient(90deg,var(--hb-bg)_0%,rgba(5,8,20,0.94)_28%,rgba(5,8,20,0.45)_48%,rgba(5,8,20,0.08)_72%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(5_8_20_/_0.35)_0%,transparent_16%,transparent_78%,rgb(5_8_20_/_0.55)_100%)]" />
    </div>
  );
}
