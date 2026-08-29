import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist_Mono, Outfit } from "next/font/google";

import { LocaleProvider } from "@/components/locale/locale-provider";
import { LOCALE_COOKIE, parsePreferencesCookie } from "@/lib/i18n/preferences";
import { buildMetadata } from "@/lib/metadata";

import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialPreferences = parsePreferencesCookie(
    cookieStore.get(LOCALE_COOKIE)?.value,
  );

  return (
    <html
      lang={initialPreferences.language}
      className="dark"
      suppressHydrationWarning
    >
      <body
        className={`${outfit.variable} ${geistMono.variable} min-h-dvh bg-black font-sans text-white antialiased`}
      >
        <LocaleProvider initialPreferences={initialPreferences}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
