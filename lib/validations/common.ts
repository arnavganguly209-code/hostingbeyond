import { z } from "zod";

/**
 * Shared Zod primitives — extend as forms and APIs are added.
 */

export const emailSchema = z.string().trim().email();

export const nonEmptyStringSchema = z.string().trim().min(1);

export const slugSchema = z
  .string()
  .trim()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format");
