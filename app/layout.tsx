"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; 
import { AuthProvider } from "../contexts/AuthContext"; // 1. Certifique-se de importar o Provider

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-[#FAFAFA] text-black min-h-screen flex flex-col`}>
        
        {/* 2. O AuthProvider PRECISA envelopar a Navbar e o main */}
        <AuthProvider>
          
          <Navbar />
          
          <main className="relative z-10 w-full flex-grow">
            {children}
          </main>
          
        </AuthProvider>

      </body>
    </html>
  );
}