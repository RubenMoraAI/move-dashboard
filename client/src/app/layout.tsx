import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "../context/dashboardWrapper";
import { ConfettiProvider } from "../context/ConfettiContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: "/favicon.svg",
  title: "Move App | Ecommerce Dashboard & AI Analytics",
  description: "Monitor your business with Move App, an advanced ecommerce analytics platform powered by AI. Gain actionable insights and dynamic visualizations to improve your decisions.",
  keywords: ["Move App", "Ecommerce Dashboard", "AI Analytics", "Business Insights", "Data Visualization"],
  authors: [{ name: "Ruben Mora Vargas" }],
  robots: "index, follow",
  openGraph: {
    title: "Move App | Ecommerce Dashboard & AI Analytics",
    description: "Empower your business with Move App, the all-in-one solution for ecommerce analytics and AI-powered tools.",
    url: "https://rubenmora.dev",
    type: "website",
    images: [
      {
        url: "https://rubenmora.dev/moveapp/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Move App Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Move App | Ecommerce Dashboard & AI Analytics",
    description: "The ultimate platform to analyze and enhance your online business with AI-powered insights.",
    images: "https://rubenmora.dev/moveapp/twitter-card.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"> 
      <body className={inter.className}>
        <DashboardWrapper> <ConfettiProvider>{children}</ConfettiProvider></DashboardWrapper>
      </body>
    </html>
  );
}
