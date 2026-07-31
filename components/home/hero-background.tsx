"use client";

import Image from "next/image";

/**
 * Hero stage — zoomed OUT so face, body, and gesture stay fully readable.
 * Soft left dissolve (no hard crop box). Right side stays bright and clear.
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--hb-bg)]" />

      {/* Soft stage glow behind speaker */}
      <div className="absolute top-[12%] right-[4%] h-[70%] w-[55%] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(10_132_255_/_0.22),transparent_68%)] blur-3xl" />
      <div className="absolute top-[30%] right-[18%] h-[40%] w-[35%] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(111_60_255_/_0.12),transparent_70%)] blur-3xl" />

      {/*
        Zoomed-out speaker: object-contain = no head/hand crop.
        Tall right stage so the full keynote frame reads professionally.
      */}
      <div className="absolute inset-y-0 right-0 w-full sm:w-[92%] md:w-[80%] lg:w-[72%] xl:w-[68%]">
        <div className="absolute inset-0 top-[2%] right-0 bottom-[6%] left-0 lg:top-[1%] lg:bottom-[5%] lg:left-[-2%]">
          <Image
            src="/images/hero-speaker.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 75vw, 68vw"
            className="[mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.4)_10%,black_24%,black_100%)] object-contain object-[center_42%] drop-shadow-[0_30px_80px_rgb(10_132_255_/_0.18)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.4)_10%,black_24%,black_100%)]"
          />
        </div>
      </div>

      {/* Left copy wash — stops before the face so speech reads clearly */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--hb-bg)_0%,rgba(5,8,20,0.97)_24%,rgba(5,8,20,0.7)_36%,rgba(5,8,20,0.28)_48%,rgba(5,8,20,0.06)_60%,transparent_74%)]" />

      {/* Soft header / stats vignette — light enough not to hide the face */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,20,0.4)_0%,transparent_12%,transparent_80%,rgba(5,8,20,0.5)_100%)]" />

      {/* Left network ambience only */}
      <div className="absolute top-[-10%] left-[-6%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.18),transparent_68%)] blur-3xl" />
      <div className="absolute bottom-[-16%] left-[4%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(111_60_255_/_0.1),transparent_70%)] blur-3xl" />
      <div className="absolute inset-y-0 left-0 w-[46%] [background-image:linear-gradient(rgb(10_132_255_/_0.14)_1px,transparent_1px),linear-gradient(90deg,rgb(10_132_255_/_0.14)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_20%_45%,black_0%,transparent_72%)] [background-size:56px_56px] opacity-[0.2]" />
      <div className="absolute inset-y-0 left-0 w-[42%] [background-image:radial-gradient(circle_at_center,rgb(124_196_255_/_0.55)_0.65px,transparent_0.75px)] [mask-image:radial-gradient(ellipse_at_24%_48%,black,transparent_65%)] [background-size:44px_44px] opacity-[0.22]" />
      <div className="absolute top-[36%] left-0 h-px w-[34%] bg-gradient-to-r from-transparent via-[var(--hb-blue)]/35 to-transparent" />
      <div className="absolute top-[58%] left-[5%] h-px w-[22%] bg-gradient-to-r from-transparent via-[var(--hb-purple)]/28 to-transparent" />
    </div>
  );
}
