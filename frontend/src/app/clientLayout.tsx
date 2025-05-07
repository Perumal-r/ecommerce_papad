"use client";

import { usePathname } from "next/navigation";

import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = ["/login", "/register"].includes(pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}
      {children}
      {!isAuthPage && <Footer />}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
