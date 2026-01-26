import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "OneWayTaxi.ai - Premium Drop Taxi Service in South India",
  description: "Book affordable one-way drop taxis in Chennai, Bangalore, Coimbatore, and across South India. Pay only for the distance traveled. 24/7 reliable service.",
  keywords: ["onewaytaxi", "drop taxi", "outstation cab", "chennai taxi", "bangalore taxi", "airport taxi"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased selection:bg-teal-900 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
