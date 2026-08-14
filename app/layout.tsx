import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Mr. Saju Chacko | Chairman, Jeevadhara Foundation",
  description:
    "Official website of Mr. Saju Chacko — Chairman of Jeevadhara Foundation, philanthropist, social leader, and former Y's Men International leader. Over 49,000 free dialysis sessions completed for kidney patients.",
  keywords: [
    "Saju Chacko",
    "Jeevadhara Foundation",
    "Jeevadhara Renal Care",
    "Angamaly",
    "Free Dialysis Kerala",
    "Y's Men International",
    "Philanthropist Kerala",
    "Social Service Angamaly",
  ],
  authors: [{ name: "Mr. Saju Chacko" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans scroll-smooth`}>
      <body className="flex flex-col min-h-screen bg-white text-stone-900 font-sans antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
