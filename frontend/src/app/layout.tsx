import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// pages/_app.tsx or your root layout
import "keen-slider/keen-slider.min.css";
import ReduxProvider from "@/app/ReduxProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sri Priya Papad",
  description: "Ecommerce website for Sri Priya Papad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <ReduxProvider>
          <Toaster
            position="top-right"
            reverseOrder={false}
            // toastOptions={{
            //   style: {
            //     background: "#000", // Black background
            //     color: "#fff", // White text
            //   },
            // }}
          />
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
