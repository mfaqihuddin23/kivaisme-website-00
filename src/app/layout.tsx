import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

const title = "Kivaisme — Webflow & Shopify Liquid Developer";
const description =
  "Frontend, Webflow, and Shopify Liquid developer building high-converting, pixel-perfect custom web experiences.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kivaisme.lovable.app"),
  title: {
    default: title,
    template: "%s — Kivaisme",
  },
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Kivaisme",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;700&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
