"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Premium card visuals — match the HostingBeyond products mockup 1:1. */

export function DomainVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto flex h-[190px] w-full max-w-[200px] items-center justify-center">
      {/* Floor glow */}
      <div className="absolute bottom-2 left-1/2 h-10 w-36 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(10_132_255_/_0.55),transparent_70%)] blur-xl" />
      <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.28),transparent_68%)] blur-2xl" />

      <motion.div
        className="relative z-10"
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          aria-hidden
          viewBox="0 0 200 200"
          className="size-[158px] drop-shadow-[0_0_42px_rgb(10_132_255_/_0.55)]"
        >
          <defs>
            <radialGradient id="hb-earth-sphere" cx="32%" cy="28%" r="78%">
              <stop offset="0%" stopColor="#7ec8ff" />
              <stop offset="28%" stopColor="#1a9fff" />
              <stop offset="62%" stopColor="#0a5fbf" />
              <stop offset="100%" stopColor="#031830" />
            </radialGradient>
            <radialGradient id="hb-earth-shine" cx="30%" cy="24%" r="45%">
              <stop offset="0%" stopColor="rgb(255 255 255 / 0.55)" />
              <stop offset="100%" stopColor="rgb(255 255 255 / 0)" />
            </radialGradient>
            <linearGradient
              id="hb-earth-rim"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#9ad8ff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0a84ff" stopOpacity="0.2" />
            </linearGradient>
            <filter
              id="hb-earth-glow"
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Atmosphere ring */}
          <circle
            cx="100"
            cy="100"
            r="86"
            fill="none"
            stroke="url(#hb-earth-rim)"
            strokeWidth="3"
            opacity="0.85"
            filter="url(#hb-earth-glow)"
          />

          {/* Globe body */}
          <circle cx="100" cy="100" r="78" fill="url(#hb-earth-sphere)" />

          {/* Longitude / latitude wireframe */}
          <ellipse
            cx="100"
            cy="100"
            rx="78"
            ry="28"
            fill="none"
            stroke="#b8e4ff"
            strokeWidth="1.2"
            opacity="0.35"
          />
          <ellipse
            cx="100"
            cy="100"
            rx="78"
            ry="52"
            fill="none"
            stroke="#b8e4ff"
            strokeWidth="1"
            opacity="0.22"
          />
          <ellipse
            cx="100"
            cy="100"
            rx="28"
            ry="78"
            fill="none"
            stroke="#b8e4ff"
            strokeWidth="1.1"
            opacity="0.28"
          />
          <ellipse
            cx="100"
            cy="100"
            rx="55"
            ry="78"
            fill="none"
            stroke="#b8e4ff"
            strokeWidth="1"
            opacity="0.2"
          />
          <line
            x1="100"
            y1="22"
            x2="100"
            y2="178"
            stroke="#b8e4ff"
            strokeWidth="1.1"
            opacity="0.28"
          />
          <line
            x1="22"
            y1="100"
            x2="178"
            y2="100"
            stroke="#b8e4ff"
            strokeWidth="1.1"
            opacity="0.28"
          />

          {/* Continents (stylized landmasses) */}
          <g fill="#d7f0ff" opacity="0.55" filter="url(#hb-earth-glow)">
            <path d="M58 62c8-10 22-14 34-10 8 3 12 10 10 18-3 10-14 14-24 12-12-2-20-10-20-20z" />
            <path d="M108 54c10-6 24-4 32 6 6 8 4 18-4 24-10 8-24 6-32-2-8-8-6-20 4-28z" />
            <path d="M72 108c12-4 26 0 34 10 6 8 4 20-6 26-12 8-28 4-36-8-6-10-4-22 8-28z" />
            <path d="M128 118c8-2 16 4 18 12 2 10-4 18-14 20-10 2-18-4-20-12-2-10 4-18 16-20z" />
            <path d="M54 130c6-2 12 2 14 8 2 8-2 14-10 16-8 2-14-2-16-10-2-6 4-12 12-14z" />
          </g>

          {/* Specular highlight */}
          <ellipse
            cx="72"
            cy="68"
            rx="34"
            ry="26"
            fill="url(#hb-earth-shine)"
          />
        </svg>
      </motion.div>

      {[
        { label: ".com", className: "left-0 top-3", delay: 0 },
        { label: ".net", className: "right-0 top-10", delay: 0.4 },
        { label: ".org", className: "bottom-4 left-3", delay: 0.8 },
      ].map((chip) => (
        <motion.span
          key={chip.label}
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={{
            duration: 3.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: chip.delay,
          }}
          className={`absolute z-20 rounded-full border border-[#4db5ff]/70 bg-[#061428]/92 px-3 py-1 text-[11px] font-extrabold tracking-wide text-[#9ad8ff] shadow-[0_0_22px_rgb(10_132_255_/_0.45)] backdrop-blur-md ${chip.className}`}
        >
          {chip.label}
        </motion.span>
      ))}
    </div>
  );
}

export function EmailVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto flex h-[190px] w-full max-w-[200px] items-center justify-center">
      <div className="absolute bottom-1 left-1/2 h-12 w-40 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(168_85_247_/_0.55),transparent_70%)] blur-xl" />
      <div className="absolute inset-2 rounded-full bg-[radial-gradient(circle,rgb(168_85_247_/_0.32),transparent_68%)] blur-2xl" />

      {[
        { className: "-left-1 top-8", delay: 0, rot: -18 },
        { className: "right-0 top-4", delay: 0.45, rot: 14 },
        { className: "bottom-10 -right-1", delay: 0.9, rot: -10 },
      ].map((item, i) => (
        <motion.div
          key={i}
          animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{
            duration: 3.5 + i * 0.25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
          style={{ rotate: item.rot }}
          className={`absolute z-0 flex size-8 items-center justify-center rounded-lg border border-[#c084fc]/55 bg-[#3b1d6e]/85 shadow-[0_0_18px_rgb(168_85_247_/_0.4)] ${item.className}`}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4 text-[#e9d5ff]"
            fill="none"
          >
            <rect
              x="3"
              y="6"
              width="18"
              height="12"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M4 8l8 6 8-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      ))}

      <motion.div
        className="relative z-10"
        animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative h-[148px] w-[168px]">
          {/* Letter card rising from envelope */}
          <div className="absolute top-2 left-1/2 z-20 w-[112px] -translate-x-1/2 rounded-xl border border-white/80 bg-gradient-to-b from-white to-[#eee8ff] px-3 py-3 shadow-[0_12px_28px_rgb(88_28_135_/_0.35)]">
            <p className="truncate text-center text-[9px] font-extrabold tracking-tight text-[#5b21b6]">
              hello@yourbusiness.com
            </p>
            <div className="mx-auto mt-2 h-1 w-14 rounded-full bg-[#c4b5fd]" />
            <div className="mx-auto mt-1.5 h-1 w-10 rounded-full bg-[#ddd6fe]" />
          </div>

          {/* Envelope body */}
          <div className="absolute inset-x-2 bottom-0 z-10 h-[92px] overflow-hidden rounded-2xl border border-[#d8b4fe]/60 bg-[linear-gradient(165deg,#6d28d9_0%,#4c1d95_40%,#1e0b3a_100%)] shadow-[0_0_36px_rgb(168_85_247_/_0.45),inset_0_1px_0_rgb(255_255_255_/_0.2)]">
            <div className="absolute inset-x-0 top-0 h-0 border-x-[82px] border-t-[42px] border-x-transparent border-t-[#a855f7]/55" />
            <div className="absolute inset-x-[18%] bottom-3 h-px bg-white/20" />
          </div>

          {/* Open flap */}
          <div className="absolute top-[46px] left-1/2 z-0 h-0 w-0 -translate-x-1/2 border-x-[84px] border-b-[48px] border-x-transparent border-b-[#c084fc]/85 drop-shadow-[0_0_18px_rgb(168_85_247_/_0.55)]" />
        </div>
      </motion.div>
    </div>
  );
}

export function HostingVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto flex h-[200px] w-full max-w-[210px] items-end justify-center pb-1">
      {/* Soft ambient bloom */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_70%,rgb(0_170_255_/_0.28),transparent_62%)] blur-2xl" />

      {/* Neon circular floor platform */}
      <div className="absolute bottom-0 left-1/2 z-0 h-[52px] w-[168px] -translate-x-1/2">
        <div className="absolute inset-x-[8%] bottom-2 h-[18px] rounded-[100%] bg-[radial-gradient(ellipse,rgb(0_170_255_/_0.75),rgb(0_120_255_/_0.15)_55%,transparent_72%)] blur-[2px]" />
        <div className="absolute inset-x-[4%] bottom-3 h-[22px] rounded-[100%] border border-[#3db8ff]/70 shadow-[0_0_28px_rgb(0_170_255_/_0.55),inset_0_0_18px_rgb(0_170_255_/_0.35)]" />
        <div className="absolute inset-x-[18%] bottom-4 h-[10px] rounded-[100%] bg-[radial-gradient(ellipse,rgb(120_210_255_/_0.85),transparent_70%)] blur-md" />
      </div>

      <motion.div
        className="relative z-10 mb-7"
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Neon cloud outline behind racks */}
        <svg
          aria-hidden
          viewBox="0 0 200 90"
          className="absolute -top-9 left-1/2 h-[68px] w-[168px] -translate-x-1/2 drop-shadow-[0_0_18px_rgb(0_170_255_/_0.85)]"
          fill="none"
        >
          <defs>
            <linearGradient
              id="hb-host-cloud"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#7dd3ff" />
              <stop offset="50%" stopColor="#2f9bff" />
              <stop offset="100%" stopColor="#00aaff" />
            </linearGradient>
            <filter
              id="hb-host-cloud-glow"
              x="-20%"
              y="-40%"
              width="140%"
              height="180%"
            >
              <feGaussianBlur stdDeviation="2.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M46 62c-12 0-22-9-22-21 0-11 8-20 18-21C46 8 58 2 72 2c14 0 26 8 30 20 4-3 9-5 15-5 16 0 28 12 28 28 0 1.5-.1 3-.4 4.5H46z"
            stroke="url(#hb-host-cloud)"
            strokeWidth="3.5"
            fill="rgb(0 140 255 / 0.08)"
            strokeLinejoin="round"
            filter="url(#hb-host-cloud-glow)"
          />
        </svg>

        {/* Three premium dark server racks */}
        <div className="relative z-10 flex items-end justify-center gap-[7px] [perspective:520px]">
          {[
            { h: 92, rows: 7, skew: -4, delay: 0 },
            { h: 118, rows: 9, skew: 0, delay: 0.12 },
            { h: 100, rows: 8, skew: 4, delay: 0.24 },
          ].map((rack, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-[8px] border border-[#2f9bff]/50 bg-[linear-gradient(180deg,#121a2e_0%,#070b14_45%,#03060c_100%)] shadow-[0_10px_28px_rgb(0_0_0_/_0.55),0_0_22px_rgb(0_140_255_/_0.28),inset_0_1px_0_rgb(255_255_255_/_0.12)]"
              style={{
                width: i === 1 ? 48 : 42,
                height: rack.h,
                transform: `rotateY(${rack.skew}deg)`,
              }}
            >
              {/* Top bezel */}
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-white/15 to-transparent" />
              <div className="absolute inset-x-[18%] top-[5px] h-[2px] rounded-full bg-[#5ec8ff]/70 shadow-[0_0_8px_#2f9bff]" />

              {/* Drive / LED rows */}
              <div className="flex h-full flex-col justify-end gap-[3px] px-[5px] pt-3 pb-[6px]">
                {Array.from({ length: rack.rows }).map((_, row) => (
                  <div
                    key={row}
                    className="flex items-center gap-[3px] rounded-[2px] bg-black/55 px-[3px] py-[2px] shadow-[inset_0_0_0_1px_rgb(47_155_255_/_0.12)]"
                  >
                    <motion.span
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              opacity: [0.45, 1, 0.55, 1],
                              boxShadow: [
                                "0 0 4px #2f9bff",
                                "0 0 10px #5ec8ff",
                                "0 0 4px #2f9bff",
                                "0 0 10px #5ec8ff",
                              ],
                            }
                      }
                      transition={{
                        duration: 1.8 + (row % 3) * 0.25,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: rack.delay + row * 0.08,
                      }}
                      className="size-[4px] shrink-0 rounded-full bg-[#5ec8ff]"
                    />
                    <span className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-[#1a8fff] via-[#5ec8ff] to-[#1a8fff]/40 opacity-90 shadow-[0_0_6px_rgb(47_155_255_/_0.55)]" />
                  </div>
                ))}
              </div>

              {/* Side edge highlight */}
              <div className="absolute inset-y-2 left-0 w-px bg-gradient-to-b from-transparent via-[#5ec8ff]/35 to-transparent" />
              <div className="absolute inset-y-2 right-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
