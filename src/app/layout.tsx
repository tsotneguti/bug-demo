import "./globals.css";
import type { ReactNode } from "react";
import Providers from "./providers";

// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin", "cyrillic-ext"], variable: "--font-inter" });

export const metadata = {
  title: "Green Zone Permits",
  description: "Multi-step permit application",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ka">
      <body>{children}</body>
    </html>
  );
}
