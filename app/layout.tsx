import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sharonzhang.dev"),
  title: {
    default: "Sharon Zhang | Robotics Engineer & Healthcare AI",
    template: "%s | Sharon Zhang",
  },
  description:
    "Personal portfolio of Sharon Zhang - MechE turned Robotics Engineer, building at the intersection of AI and healthcare.",
  keywords: [
    "Sharon Zhang",
    "Robotics Engineer",
    "Healthcare AI",
    "Carina AI",
    "Portfolio",
  ],
  authors: [{ name: "Sharon Zhang" }],
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sharon Zhang",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
