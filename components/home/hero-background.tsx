"use client";

import Image from "next/image";

/**
 * Full-bleed hero stage — speaker fills the entire section.
 * Soft left mask for copy; right side stays bright so face + gesture read clearly.
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--hb-bg)]" />

      {/* Full hero photo — edge-to-edge, no boxed / pasted look */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-speaker.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-[1.08] object-cover object-[68%_30%] sm:object-[64%_28%] lg:scale-100 lg:object-[62%_32%] xl:object-[58%_30%]"
        />
      </div>

      {/* Soft left dissolve into brand navy (no hard rectangle edge) */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--hb-bg)_0%,rgba(5,8,20,0.97)_22%,rgba(5,8,20,0.72)_38%,rgba(5,8,20,0.28)_52%,rgba(5,8,20,0.06)_68%,transparent_82%)]" />

      {/* Top / bottom vignette — keeps header + stats readable without hiding face */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,20,0.55)_0%,transparent_18%,transparent_72%,rgba(5,8,20,0.62)_100%)]" />

      {/* Left-only network ambience (does not sit over the speaker) */}
      <div className="absolute top-[-10%] left-[-6%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.2),transparent_68%)] blur-3xl" />
      <div className="absolute bottom-[-16%] left-[4%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(111_60_255_/_0.12),transparent_70%)] blur-3xl" />
      <div className="absolute inset-y-0 left-0 w-[48%] [background-image:linear-gradient(rgb(10_132_255_/_0.14)_1px,transparent_1px),linear-gradient(90deg,rgb(10_132_255_/_0.14)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_20%_45%,black_0%,transparent_72%)] [background-size:56px_56px] opacity-[0.22]" />
      <div className="absolute inset-y-0 left-0 w-[45%] [background-image:radial-gradient(circle_at_center,rgb(124_196_255_/_0.55)_0.65px,transparent_0.75px)] [mask-image:radial-gradient(ellipse_at_24%_48%,black,transparent_65%)] [background-size:44px_44px] opacity-25" />
      <div className="absolute top-[36%] left-0 h-px w-[36%] bg-gradient-to-r from-transparent via-[var(--hb-blue)]/35 to-transparent" />
      <div className="absolute top-[58%] left-[5%] h-px w-[24%] bg-gradient-to-r from-transparent via-[var(--hb-purple)]/28 to-transparent" />

      {/* Subtle right glow so stage feels lit, not empty */}
      <div className="absolute top-[20%] right-[8%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.14),transparent_70%)] blur-3xl" />
    </div>
  );
}
