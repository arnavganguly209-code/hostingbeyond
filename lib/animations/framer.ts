/**
 * Framer Motion — shared configuration only.
 * Do not add page animations here until design assets are approved.
 */

export const motionConfig = {
  reducedMotion: "user" as const,
  transition: {
    duration: 0.3,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  },
} as const;

export type MotionConfig = typeof motionConfig;
