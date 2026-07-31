"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Coding-style offer blocks — stacked on the right, never over the speaker face.
 */
export function HeroShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 flex h-full w-full items-center justify-end lg:pr-2">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[300px] space-y-3"
      >
        <CodeOffer
          accent="blue"
          filename="business-email.offer"
          lines={[
            { tone: "comment", text: "// BUSINESS EMAIL" },
            { tone: "key", text: "plan", sep: true, value: '"START JUST"' },
            {
              tone: "price",
              text: "price",
              sep: true,
              value: '"$5 / 12 MONTH"',
            },
            { tone: "ok", text: "charges", sep: true, value: '"NO HIDDEN"' },
          ]}
        />
        <CodeOffer
          accent="purple"
          filename="domain-bundle.offer"
          lines={[
            { tone: "comment", text: "// DOMAIN .COM + 1 BUSINESS MAIL" },
            { tone: "key", text: "term", sep: true, value: '"1 YEAR JUST"' },
            { tone: "price", text: "price", sep: true, value: '"$15"' },
            { tone: "warn", text: "offer", sep: true, value: '"LIMITED TIME"' },
          ]}
        />
      </motion.div>
    </div>
  );
}

type CodeLine = {
  tone: "comment" | "key" | "price" | "ok" | "warn";
  text: string;
  sep?: boolean;
  value?: string;
};

function CodeOffer({
  accent,
  filename,
  lines,
}: {
  accent: "blue" | "purple";
  filename: string;
  lines: CodeLine[];
}) {
  const isBlue = accent === "blue";

  return (
    <article
      className={
        isBlue
          ? "overflow-hidden rounded-xl border border-[#0A84FF]/35 bg-[rgba(8,12,28,0.88)] shadow-[0_12px_40px_rgb(0_0_0_/_0.35),0_0_24px_rgb(10_132_255_/_0.12)] backdrop-blur-md"
          : "overflow-hidden rounded-xl border border-[#6F3CFF]/35 bg-[rgba(8,12,28,0.88)] shadow-[0_12px_40px_rgb(0_0_0_/_0.35),0_0_24px_rgb(111_60_255_/_0.12)] backdrop-blur-md"
      }
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-3 py-2">
        <span className="size-2 rounded-full bg-[#FF5F57]" />
        <span className="size-2 rounded-full bg-[#FEBC2E]" />
        <span className="size-2 rounded-full bg-[#28C840]" />
        <span className="ml-2 font-mono text-[11px] text-[#AAB2C5]">
          {filename}
        </span>
      </div>
      <div className="space-y-1 px-3.5 py-3 font-mono text-[12px] leading-relaxed sm:text-[13px]">
        {lines.map((line) => (
          <p key={line.text + (line.value ?? "")} className="truncate">
            {line.tone === "comment" ? (
              <span className="text-[#6B7A99]">{line.text}</span>
            ) : (
              <>
                <span className="text-[#7CC4FF]">{line.text}</span>
                {line.sep ? <span className="text-white/50">: </span> : null}
                <span
                  className={
                    line.tone === "price"
                      ? "font-semibold text-[#E879F9]"
                      : line.tone === "ok"
                        ? "text-[#4ADE80]"
                        : line.tone === "warn"
                          ? "text-[#FBBF24]"
                          : "text-[#E2E8F0]"
                  }
                >
                  {line.value}
                </span>
                <span className="text-white/40">,</span>
              </>
            )}
          </p>
        ))}
        <p>
          <span className="text-[#6B7A99]">{"// ready to launch"}</span>
        </p>
      </div>
    </article>
  );
}
