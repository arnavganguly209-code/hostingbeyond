/**
 * Shared TypeScript types for HostingBeyond.
 */

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type ApiResponse<T> =
  { success: true; data: T } | { success: false; error: string };

export type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};
