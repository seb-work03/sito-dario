import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollToTopOnNav } from "@/components/ScrollToTopOnNav";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_SOCIAL_IMAGE,
  SITE_NAME,
  SITE_URL,
  siteStructuredData,
} from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Dario Tana — Consulente e Docente E-commerce",
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Dario Tana", url: `${SITE_URL}/chi-sono` }],
  creator: "Dario Tana",
  publisher: "Dario Tana",
  category: "E-commerce",
  icons: {
    icon: [{ url: "/favicon-dario-tana-ok.png", type: "image/png" }],
    shortcut: [{ url: "/favicon-dario-tana-ok.png", type: "image/png" }],
    apple: [{ url: "/favicon-dario-tana-ok.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Dario Tana — Consulente e Docente E-commerce",
    description: DEFAULT_DESCRIPTION,
    images: [{ url: DEFAULT_SOCIAL_IMAGE, alt: "Dario Tana" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dario Tana — Consulente e Docente E-commerce",
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${geistMono.variable}`}
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <head>
        <link rel="describedby" href="/llms.txt" type="text/plain" />
      </head>
      <body>
        <JsonLd data={siteStructuredData} />
        <ScrollToTopOnNav />
        {children}
      </body>
    </html>
  );
}
