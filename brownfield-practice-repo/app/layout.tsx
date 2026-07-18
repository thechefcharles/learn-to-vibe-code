import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reading List",
  description: "A small reading-list app for brownfield practice.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
