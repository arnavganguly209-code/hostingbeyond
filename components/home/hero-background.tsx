"use client";

import Image from "next/image";

/**
 * Soft hosting ambience + stage image with heavy edge feathering
 * so the photo frame disappears into the hero background.
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

      {/* Ambient glows */}
      <div className="absolute top-[-12%] left-[-8%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.18),transparent_68%)] blur-3xl" />
      <div className="absolute bottom-[-18%] left-[8%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgb(111_60_255_/_0.12),transparent_70%)] blur-3xl" />
      <div className="absolute top-[18%] right-[28%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.1),transparent_70%)] blur-3xl" />
      <div className="absolute inset-0 [background-image:linear-gradient(rgb(10_132_255_/_0.14)_1px,transparent_1px),linear-gradient(90deg,rgb(10_132_255_/_0.14)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_18%_42%,black_0%,transparent_70%)] [background-size:56px_56px] opacity-[0.2]" />
      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,rgb(124_196_255_/_0.5)_0.65px,transparent_0.75px)] [mask-image:radial-gradient(ellipse_at_22%_48%,black,transparent_62%)] [background-size:44px_44px] opacity-25" />
      <div className="absolute top-[34%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-[var(--hb-blue)]/40 to-transparent" />
      <div className="absolute top-[62%] left-[6%] h-px w-[26%] bg-gradient-to-r from-transparent via-[var(--hb-purple)]/30 to-transparent" />

      {/* Soft blurred fill — no hard box */}
      <div className="absolute inset-y-0 right-0 w-[78%] overflow-hidden md:w-[72%] lg:w-[68%]">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="70vw"
          className="scale-[1.28] object-cover object-[72%_36%] opacity-55 blur-[48px] saturate-125"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_62%_42%,rgb(10_132_255_/_0.18),transparent_62%)]" />
      </div>

      <div className="absolute top-[-4%] right-[14%] h-[50%] w-[32%] rotate-[-16deg] bg-[linear-gradient(180deg,rgb(10_132_255_/_0.14),transparent_72%)] opacity-35 blur-2xl" />

      {/*
        Sharp subject with aggressive multi-edge fade (L/R/T/B)
        so the rectangular frame is invisible.
      */}
      <div className="absolute inset-y-[4%] right-[-2%] w-[92%] sm:w-[84%] md:w-[74%] lg:w-[66%] xl:w-[62%]">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 62vw"
          className="hb-hero-photo object-contain object-[center_42%] brightness-[1.03] contrast-[1.03]"
        />
      </div>

      {/* Readability dissolve into copy + edge bleed into bg */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--hb-bg)_0%,rgba(5,8,20,0.94)_18%,rgba(5,8,20,0.55)_34%,rgba(5,8,20,0.18)_48%,transparent_62%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,20,0.55)_0%,transparent_14%,transparent_78%,rgba(5,8,20,0.72)_100%)]" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--hb-bg)] via-[var(--hb-bg)]/70 to-transparent sm:w-24" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--hb-bg)] to-transparent" />
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[var(--hb-bg)]/80 to-transparent" />
    </div>
  );
}
