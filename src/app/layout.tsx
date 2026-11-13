import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Inter_Tight({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jamesschofield.com"),
  title: "James Schofield · Senior Full Stack Engineer, Co-founder",
  description:
    "Twenty-three. Leads engineering on an AI platform for U.S. Special Operations, with 20+ production apps shipped and two companies co-founded.",
  openGraph: {
    title: "James Schofield · Twenty-three",
    description: "Senior Full Stack Engineer. Technical lead. Co-founder of two companies. Not close to done.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#f6f6f2" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
