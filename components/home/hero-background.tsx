"use client";

/**
 * Soft hosting ambience behind content — network grid + neon accents.
 * Speaker image lives in the right visual column (not cropped here).
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--hb-bg)]" />

      <div className="absolute top-[-12%] left-[-8%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.18),transparent_68%)] blur-3xl" />
      <div className="absolute bottom-[-18%] left-[8%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgb(111_60_255_/_0.12),transparent_70%)] blur-3xl" />
      <div className="absolute top-[18%] right-[28%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.1),transparent_70%)] blur-3xl" />

      <div className="absolute inset-0 [background-image:linear-gradient(rgb(10_132_255_/_0.14)_1px,transparent_1px),linear-gradient(90deg,rgb(10_132_255_/_0.14)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_18%_42%,black_0%,transparent_70%)] [background-size:56px_56px] opacity-[0.2]" />

      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,rgb(124_196_255_/_0.5)_0.65px,transparent_0.75px)] [mask-image:radial-gradient(ellipse_at_22%_48%,black,transparent_62%)] [background-size:44px_44px] opacity-25" />

      <div className="absolute top-[34%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-[var(--hb-blue)]/40 to-transparent" />
      <div className="absolute top-[62%] left-[6%] h-px w-[26%] bg-gradient-to-r from-transparent via-[var(--hb-purple)]/30 to-transparent" />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(5_8_20_/_0.4)_0%,transparent_18%,transparent_78%,rgb(5_8_20_/_0.55)_100%)]" />
    </div>
  );
}
