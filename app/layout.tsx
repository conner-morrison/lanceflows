import type { Metadata } from "next";
import "./globals.css";
import HumanVerify from "@/components/HumanVerify";

export const metadata: Metadata = {
  title: "Lanceflows — Software Engineering & AI Services",
  description:
    "Lanceflows is a senior software engineering and AI team that turns your idea into a reliable, scalable product — with clear architecture, disciplined delivery, and zero chaos.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HumanVerify />
        {children}
      </body>
    </html>
  );
}
