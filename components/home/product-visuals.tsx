"use client";

import { motion } from "framer-motion";

/** Premium card visuals matching the HostingBeyond products mockup. */

export function DomainVisual() {
  return (
    <div className="relative flex h-full min-h-[168px] w-full items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.35),transparent_65%)] blur-2xl" />
      <motion.div
        className="relative"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative size-[132px]">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,#5eb7ff_0%,#0a84ff_38%,#063a7a_72%,#020814_100%)] shadow-[0_0_50px_rgb(10_132_255_/_0.55),inset_-12px_-18px_28px_rgb(0_0_0_/_0.45),inset_10px_12px_24px_rgb(255_255_255_/_0.18)]" />
          <div className="absolute inset-[10%] rounded-full border border-white/20" />
          <div className="absolute inset-y-[12%] left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/35 to-transparent" />
          <div className="absolute inset-x-[12%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
          <div className="absolute inset-[18%] [transform:rotateX(66deg)] rounded-full border border-[#7cc4ff]/25" />
          <div className="absolute inset-[28%] [transform:rotateX(66deg)] rounded-full border border-[#7cc4ff]/20" />
          <div className="absolute top-[18%] left-[22%] size-8 rounded-full bg-white/25 blur-md" />
        </div>
      </motion.div>

      {[
        { label: ".com", className: "-left-1 top-3" },
        { label: ".net", className: "-right-2 top-12" },
        { label: ".org", className: "bottom-2 left-2" },
      ].map((chip, i) => (
        <motion.span
          key={chip.label}
          animate={{ y: [0, i % 2 ? 5 : -5, 0] }}
          transition={{
            duration: 3.2 + i * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute rounded-full border border-[#3da9ff]/55 bg-[#071428]/90 px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#9ad0ff] shadow-[0_0_18px_rgb(10_132_255_/_0.35)] backdrop-blur-md ${chip.className}`}
        >
          {chip.label}
        </motion.span>
      ))}
    </div>
  );
}

export function EmailVisual() {
  return (
    <div className="relative flex h-full min-h-[168px] w-full items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgb(168_85_247_/_0.4),transparent_65%)] blur-2xl" />
      <motion.div
        className="relative"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative flex h-[108px] w-[128px] items-end justify-center">
          <div className="absolute bottom-0 h-[72px] w-[118px] rounded-2xl border border-[#c084fc]/50 bg-[linear-gradient(160deg,#1a0b33_0%,#3b1d6e_45%,#0b1228_100%)] shadow-[0_0_40px_rgb(168_85_247_/_0.45),inset_0_1px_0_rgb(255_255_255_/_0.2)]" />
          <div className="absolute bottom-[34px] h-0 w-0 border-x-[59px] border-b-[42px] border-x-transparent border-b-[#7c3aed]/80 drop-shadow-[0_0_16px_rgb(168_85_247_/_0.55)]" />
          <div className="absolute bottom-2 h-[46px] w-[96px] rounded-xl border border-white/15 bg-[#0b1024]/95 shadow-[0_10px_30px_rgb(0_0_0_/_0.45)]" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-3, 2, -3] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1 right-0 max-w-[132px] rounded-xl border border-[#c084fc]/45 bg-[#0d1024]/95 px-3 py-2.5 shadow-[0_0_28px_rgb(168_85_247_/_0.4)] backdrop-blur-md"
      >
        <div className="mb-1.5 flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#a855f7]" />
          <span className="text-[8px] font-semibold tracking-wide text-[#d8b4fe] uppercase">
            New mail
          </span>
        </div>
        <p className="truncate text-[10px] font-bold text-white">
          hello@yourbusiness.com
        </p>
        <p className="mt-0.5 text-[8px] text-[var(--hb-muted)]">
          Professional inbox ready
        </p>
      </motion.div>
    </div>
  );
}

export function HostingVisual() {
  return (
    <div className="relative flex h-full min-h-[168px] w-full items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgb(34_211_238_/_0.28),transparent_65%)] blur-2xl" />
      <motion.div
        className="relative"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          aria-hidden
          viewBox="0 0 120 70"
          className="absolute -top-8 left-1/2 h-16 w-28 -translate-x-1/2 text-[#22d3ee]/70 drop-shadow-[0_0_18px_rgb(34_211_238_/_0.55)]"
          fill="none"
        >
          <path
            d="M30 42c0-14 10-24 24-24 3 0 6.5.7 9.5 2C67 12 76 8 86 12c10 4 14 14 12 24 8 1 14 8 14 16H20c0-8 4-14 10-14z"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="rgb(34 211 238 / 0.12)"
          />
        </svg>

        <div className="relative z-10 mt-4 flex items-end gap-2.5">
          {[
            { h: 54, lights: 3 },
            { h: 72, lights: 4 },
            { h: 60, lights: 3 },
          ].map((rack, i) => (
            <div
              key={i}
              className="w-11 rounded-lg border border-[#22d3ee]/40 bg-[linear-gradient(180deg,#103247_0%,#071018_100%)] shadow-[0_0_24px_rgb(34_211_238_/_0.28),inset_0_1px_0_rgb(255_255_255_/_0.12)]"
              style={{ height: rack.h }}
            >
              <div className="flex h-full flex-col justify-between p-1.5">
                {Array.from({ length: rack.lights }).map((_, row) => (
                  <div
                    key={row}
                    className="flex items-center gap-1 rounded-sm bg-black/35 px-1 py-1"
                  >
                    <span className="size-1.5 rounded-full bg-[#22d3ee] shadow-[0_0_8px_#22d3ee]" />
                    <span className="h-1 flex-1 rounded-full bg-[#22d3ee]/35" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute -bottom-3 left-1/2 h-6 w-28 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(34_211_238_/_0.55),transparent_70%)] blur-md" />
      </motion.div>
    </div>
  );
}
