import type { Metadata } from "next";
import { Didact_Gothic, Inter } from "next/font/google";
import { getSiteOrigin, SITE_SEO_DESCRIPTION, SITE_TAB_TITLE } from "@/lib/site";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const display = Didact_Gothic({ weight: "400", subsets: ["latin"], variable: "--font-display" });

const siteOrigin = getSiteOrigin();

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: SITE_TAB_TITLE,
  description: SITE_SEO_DESCRIPTION,
  applicationName: "LightRain",
  keywords: [
    "LightRain",
    "Bitcoin payments",
    "Bitcoin",
    "self-custody",
    "ledger",
    "federation address",
    "settlement",
    "discretionary ledger",
    "LightRain vault",
  ],
  authors: [{ name: "Hated By Many LLC", url: siteOrigin }],
  creator: "Hated By Many LLC",
  publisher: "Hated By Many LLC",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteOrigin.endsWith("/") ? siteOrigin : `${siteOrigin}/`,
    siteName: "LightRain",
    title: SITE_TAB_TITLE,
    description: SITE_SEO_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TAB_TITLE,
    description: SITE_SEO_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "LightRain",
  url: siteOrigin.endsWith("/") ? siteOrigin.slice(0, -1) : siteOrigin,
  description: SITE_SEO_DESCRIPTION,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`} suppressHydrationWarning>
      <body>
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
