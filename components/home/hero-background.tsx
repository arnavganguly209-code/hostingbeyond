"use client";

import Image from "next/image";

/**
 * Hero ambience + speaker — soft vignette so the photo never reads as a framed box.
 * Head stays fully visible with breathing room under the header.
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

      {/* Left network ambience */}
      <div className="absolute top-[-14%] left-[-10%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.2),transparent_68%)] blur-3xl" />
      <div className="absolute bottom-[-20%] left-[6%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgb(111_60_255_/_0.14),transparent_70%)] blur-3xl" />
      <div className="absolute inset-0 [background-image:linear-gradient(rgb(10_132_255_/_0.12)_1px,transparent_1px),linear-gradient(90deg,rgb(10_132_255_/_0.12)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_18%_42%,black_0%,transparent_68%)] [background-size:56px_56px] opacity-[0.18]" />
      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,rgb(124_196_255_/_0.45)_0.65px,transparent_0.75px)] [mask-image:radial-gradient(ellipse_at_20%_48%,black,transparent_60%)] [background-size:44px_44px] opacity-20" />

      {/* Soft color bleed from photo (blurred, never rectangular) */}
      <div className="absolute top-[8%] right-[-8%] bottom-[-4%] w-[75%] md:w-[68%] lg:w-[62%]">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          quality={70}
          sizes="65vw"
          className="scale-110 object-cover object-[68%_18%] opacity-35 blur-[64px] saturate-150"
        />
      </div>

      <div className="absolute top-[4%] right-[8%] h-[42%] w-[34%] rotate-[-12deg] bg-[linear-gradient(180deg,rgb(10_132_255_/_0.12),transparent_80%)] opacity-40 blur-3xl" />

      {/*
        Sharp subject — slightly zoomed out, pushed down from header,
        heavy soft mask so edges dissolve into #050814 (no photo frame).
      */}
      <div className="absolute inset-0 hidden sm:block">
        <div className="hb-hero-subject absolute top-[10%] right-[-4%] bottom-[4%] left-[28%] md:left-[32%] lg:left-[36%] xl:left-[38%]">
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            quality={95}
            sizes="(max-width: 1280px) 52vw, 620px"
            className="scale-[0.86] object-cover object-[62%_8%] brightness-[1.03] contrast-[1.04]"
          />
        </div>
      </div>

      {/* Mobile soft presence only */}
      <div className="absolute inset-y-[12%] right-[-16%] left-[28%] sm:hidden">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          quality={75}
          sizes="70vw"
          className="scale-105 object-cover object-[70%_12%] opacity-40 blur-[26px] saturate-125"
        />
      </div>

      {/* Brand dissolve layers — kill any remaining hard edges */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#050814_0%,#050814_14%,rgba(5,8,20,0.88)_28%,rgba(5,8,20,0.35)_42%,rgba(5,8,20,0.08)_54%,transparent_66%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050814_0%,rgba(5,8,20,0.75)_8%,transparent_18%,transparent_78%,rgba(5,8,20,0.7)_92%,#050814_100%)]" />
      <div className="absolute inset-y-0 right-0 w-[14%] bg-gradient-to-l from-[#050814] via-[#050814]/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050814] via-[#050814]/85 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-[88px] bg-gradient-to-b from-[#050814] via-[#050814]/70 to-transparent sm:h-[100px]" />
    </div>
  );
}
