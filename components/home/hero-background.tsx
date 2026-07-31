"use client";

import Image from "next/image";

/**
 * Seamless hero stage:
 * - Right: sharp speaker (kept) + soft stage fill
 * - Left: rich ambience (not empty black)
 * - No hard sky-blue edge line on the far right
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--hb-bg)]" />

      {/* Left depth — soft navy → blue wash so copy side is not empty black */}
      <div className="absolute inset-y-0 left-0 w-[58%] bg-[radial-gradient(ellipse_at_18%_42%,rgb(16_36_84_/_0.9)_0%,rgba(5,8,20,0.2)_55%,transparent_75%)]" />
      <div className="absolute top-[-8%] left-[-4%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.28),transparent_68%)] blur-3xl" />
      <div className="absolute top-[28%] left-[6%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgb(111_60_255_/_0.18),transparent_70%)] blur-3xl" />
      <div className="absolute bottom-[-12%] left-[2%] h-[26rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.14),transparent_70%)] blur-3xl" />
      <div className="absolute inset-y-0 left-0 w-[52%] [background-image:linear-gradient(rgb(10_132_255_/_0.16)_1px,transparent_1px),linear-gradient(90deg,rgb(10_132_255_/_0.16)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_22%_44%,black_0%,transparent_72%)] [background-size:56px_56px] opacity-[0.28]" />
      <div className="absolute inset-y-0 left-0 w-[48%] [background-image:radial-gradient(circle_at_center,rgb(124_196_255_/_0.65)_0.7px,transparent_0.85px)] [mask-image:radial-gradient(ellipse_at_26%_48%,black,transparent_68%)] [background-size:40px_40px] opacity-[0.32]" />
      <div className="absolute top-[34%] left-0 h-px w-[38%] bg-gradient-to-r from-transparent via-[var(--hb-blue)]/40 to-transparent" />
      <div className="absolute top-[56%] left-[4%] h-px w-[26%] bg-gradient-to-r from-transparent via-[var(--hb-purple)]/32 to-transparent" />

      {/* Right stage atmosphere — blurred photo fill */}
      <div className="absolute inset-y-0 right-0 w-[78%] overflow-hidden md:w-[70%] lg:w-[66%]">
        <Image
          src="/images/hero-speaker.png"
          alt=""
          fill
          priority
          sizes="70vw"
          className="scale-125 object-cover object-[72%_32%] opacity-55 blur-[36px] saturate-150"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_40%,rgb(10_132_255_/_0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--hb-bg)_0%,rgba(5,8,20,0.55)_18%,transparent_42%)]" />
      </div>

      {/* Soft stage beams — kept away from the extreme right edge */}
      <div className="absolute top-[-5%] right-[12%] h-[52%] w-[34%] rotate-[-18deg] bg-[linear-gradient(180deg,rgb(10_132_255_/_0.18),transparent_70%)] opacity-45 blur-2xl" />
      <div className="absolute top-[12%] right-[24%] h-[44%] w-[20%] rotate-[-8deg] bg-[linear-gradient(180deg,rgb(124_196_255_/_0.12),transparent_75%)] opacity-35 blur-xl" />
      <div className="absolute inset-y-[10%] right-[6%] w-[48%] [background-image:radial-gradient(circle_at_center,rgb(124_196_255_/_0.55)_0.65px,transparent_0.8px)] [mask-image:radial-gradient(ellipse_at_62%_45%,black_8%,transparent_68%)] [background-size:44px_44px] opacity-[0.22]" />

      {/* Sharp speaker */}
      <div className="absolute top-[88px] right-[1%] bottom-[96px] w-full overflow-hidden sm:w-[88%] md:w-[74%] lg:w-[66%] xl:w-[62%]">
        <Image
          src="/images/hero-speaker.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 62vw"
          className="[mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.25)_8%,black_20%,black_100%),linear-gradient(180deg,transparent_0%,black_7%,black_90%,transparent_100%)] [mask-composite:intersect] object-contain object-[center_38%] brightness-[1.06] contrast-[1.05] drop-shadow-[0_28px_70px_rgb(10_132_255_/_0.18)] [-webkit-mask-composite:source-in] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.25)_8%,black_20%,black_100%),linear-gradient(180deg,transparent_0%,black_7%,black_90%,transparent_100%)]"
        />
      </div>

      {/* Left copy wash — lighter so left ambience still reads */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,20,0.82)_0%,rgba(5,8,20,0.72)_18%,rgba(5,8,20,0.45)_34%,rgba(5,8,20,0.12)_50%,transparent_66%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,20,0.45)_0%,transparent_14%,transparent_78%,rgba(5,8,20,0.42)_100%)]" />

      {/* Kill any 1px sky-blue hairline on the extreme right edge */}
      <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-[var(--hb-bg)] via-[var(--hb-bg)]/80 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-px bg-[var(--hb-bg)]" />
    </div>
  );
}
