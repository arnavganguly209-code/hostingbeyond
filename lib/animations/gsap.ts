/**
 * GSAP — shared configuration only.
 * Register defaults/plugins from client components when animations are added.
 */

export const gsapConfig = {
  defaults: {
    duration: 0.6,
    ease: "power2.out",
  },
} as const;

export type GsapConfig = typeof gsapConfig;
