import { Plus_Jakarta_Sans } from "next/font/google";
import React from "react";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "InPETU Maker",
  description: "Projeto do InPETU Maker",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${jakarta.className} bg-[#FAFAFA] text-black min-h-screen flex flex-col`}>
        <Navbar />
        <main className="relative z-10 w-full flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}