"use client";

import Image from "next/image";

/**
 * Soft hosting ambience + stage image.
 * Subject is zoomed out ~15% and rendered sharp so the speaker is fully readable.
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

      {/* Soft color wash (blurred) — no hard rectangle */}
      <div className="absolute inset-y-[-6%] right-[-10%] w-[88%] sm:w-[78%] lg:w-[70%]">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          quality={75}
          sizes="70vw"
          className="scale-[1.12] object-cover object-[70%_28%] opacity-40 blur-[48px] saturate-140"
        />
      </div>

      <div className="absolute top-[-6%] right-[10%] h-[50%] w-[36%] rotate-[-14deg] bg-[linear-gradient(180deg,rgb(10_132_255_/_0.14),transparent_75%)] opacity-35 blur-3xl" />

      {/*
        Main subject — ~15% less zoom than before (was ~1.08 cover crop).
        object-contain + lower scale keeps head/shoulders fully visible & sharp.
      */}
      <div className="absolute inset-0 hidden sm:block">
        <div className="hb-hero-photo-wrap absolute top-[2%] right-0 bottom-[6%] left-[26%] md:left-[30%] lg:left-[34%] xl:left-[36%]">
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            quality={95}
            sizes="(max-width: 1280px) 55vw, 640px"
            className="hb-hero-photo scale-[0.92] object-contain object-[center_12%] brightness-[1.04] contrast-[1.05] saturate-[1.04]"
          />
        </div>
      </div>

      {/* Mobile ambient */}
      <div className="absolute inset-y-[8%] right-[-18%] left-[30%] opacity-65 sm:hidden">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          quality={80}
          sizes="70vw"
          className="scale-110 object-cover object-[72%_22%] opacity-45 blur-[22px] saturate-125"
        />
      </div>

      {/* Edge dissolve into brand bg */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#050814_0%,rgba(5,8,20,0.96)_18%,rgba(5,8,20,0.55)_34%,rgba(5,8,20,0.15)_50%,transparent_64%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,20,0.55)_0%,transparent_10%,transparent_74%,rgba(5,8,20,0.9)_100%)]" />
      <div className="absolute inset-y-0 right-0 w-[12%] bg-gradient-to-l from-[#050814] via-[#050814]/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#050814] via-[#050814]/75 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#050814]/85 to-transparent" />
    </div>
  );
}
