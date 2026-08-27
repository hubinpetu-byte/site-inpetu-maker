"use client";

import React from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function PaginaWorkshops() {
  return (
    <main className={`${plusJakartaSans.className} min-h-screen bg-white pt-32 pb-20 px-10 text-black`}>
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-extrabold text-[#0077cc] mb-4">Workshops InPETU Maker</h1>
        <p className="text-slate-600 font-medium">Em breve você poderá se inscrever nas oficinas práticas do laboratório por aqui!</p>
      </div>
    </main>
  );
}