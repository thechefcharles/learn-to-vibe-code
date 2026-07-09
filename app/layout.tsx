import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./globals-theme.css";
import { ThemeProvider } from "@/lib/ThemeContext";
import { VersionProvider } from "@/lib/VersionContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Learn To Vibe Code",
  description: "Master AI-powered full-stack development. Free, accredited, gamified.",
  openGraph: {
    title: "Learn to Vibe Code",
    description: "Free Vibe Coding Course",
    type: "website",
    url: "https://www.learntovibecode.io",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Learn to Vibe Code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn to Vibe Code",
    description: "Free Vibe Coding Course",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <VersionProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </VersionProvider>
      </body>
    </html>
  );
}
