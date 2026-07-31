"use client";

import { Cloud, Server } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Premium right-side hosting visual — full visible globe (not cropped),
 * cloud + server infrastructure accents. No offer cards.
 */
export function HeroShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 flex h-full w-full items-center justify-center lg:justify-end">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-square w-[min(100%,420px)] lg:w-[min(100%,440px)]"
      >
        {/* Soft glow behind globe — reduced vs previous oversized orbs */}
        <div className="absolute top-1/2 left-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.28),rgb(111_60_255_/_0.1)_45%,transparent_70%)] blur-2xl" />

        {/* Full wireframe globe — completely visible, ~30% less zoom than full-bleed crop */}
        <svg
          viewBox="0 0 420 420"
          className="relative z-10 h-full w-full drop-shadow-[0_0_40px_rgb(10_132_255_/_0.25)]"
          aria-hidden
        >
          <defs>
            <linearGradient id="hbGlobeStroke" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#0A84FF" />
              <stop offset="1" stopColor="#6F3CFF" />
            </linearGradient>
            <radialGradient id="hbGlobeFill" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="rgb(10 132 255 / 0.18)" />
              <stop offset="55%" stopColor="rgb(111 60 255 / 0.08)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          <circle cx="210" cy="210" r="148" fill="url(#hbGlobeFill)" />
          <circle
            cx="210"
            cy="210"
            r="148"
            fill="none"
            stroke="url(#hbGlobeStroke)"
            strokeWidth="1.4"
            opacity="0.85"
          />

          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ellipse
              key={`lat-${i}`}
              cx="210"
              cy="210"
              rx="148"
              ry={28 + i * 24}
              fill="none"
              stroke="#0A84FF"
              strokeWidth="0.7"
              opacity={0.28}
            />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse
              key={`lon-${i}`}
              cx="210"
              cy="210"
              rx={32 + i * 29}
              ry="148"
              fill="none"
              stroke="#6F3CFF"
              strokeWidth="0.7"
              opacity={0.24}
            />
          ))}

          {/* Orbit rings — full visible */}
          <ellipse
            cx="210"
            cy="210"
            rx="178"
            ry="62"
            fill="none"
            stroke="url(#hbGlobeStroke)"
            strokeWidth="1.1"
            opacity="0.45"
            transform="rotate(-18 210 210)"
          />
          <ellipse
            cx="210"
            cy="210"
            rx="168"
            ry="54"
            fill="none"
            stroke="#0A84FF"
            strokeWidth="0.8"
            opacity="0.3"
            transform="rotate(28 210 210)"
          />

          {/* Connection nodes */}
          {[
            [118, 150],
            [290, 130],
            [320, 230],
            [140, 280],
            [250, 300],
          ].map(([x, y], i) => (
            <g key={`node-${i}`}>
              <circle cx={x} cy={y} r="3.5" fill="#7CC4FF" opacity="0.9" />
              <circle
                cx={x}
                cy={y}
                r="8"
                fill="none"
                stroke="#0A84FF"
                strokeWidth="0.8"
                opacity="0.35"
              />
            </g>
          ))}
        </svg>

        {/* Cloud + server accents — small, premium, not covering globe */}
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[6%] left-[4%] flex items-center gap-2 rounded-xl border border-white/10 bg-[rgba(10,16,35,0.72)] px-3 py-2 backdrop-blur-md"
        >
          <Cloud className="size-4 text-[#7CC4FF]" strokeWidth={1.7} />
          <span className="text-[11px] font-semibold tracking-wide text-white/90">
            Cloud Edge
          </span>
        </motion.div>

        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{
            duration: 5.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
          className="absolute right-[2%] bottom-[10%] flex items-center gap-2 rounded-xl border border-white/10 bg-[rgba(10,16,35,0.72)] px-3 py-2 backdrop-blur-md"
        >
          <Server className="size-4 text-[#C4B5FF]" strokeWidth={1.7} />
          <span className="text-[11px] font-semibold tracking-wide text-white/90">
            Global Nodes
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
