"use client";

import React from 'react';
import Link from 'next/link';
import { Construction, ArrowLeft, BellRing } from 'lucide-react';

export default function TreinamentosPage() {
  return (
    <main className="w-full min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-6 py-20 font-sans">
      
      {/* CARD DE AVISO */}
      <div className="max-w-3xl w-full bg-white rounded-[40px] p-10 md:p-20 shadow-xl border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
        
        {/* ELEMENTO DECORATIVO DE FUNDO */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0077cc]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#E9D354]/10 rounded-full blur-3xl"></div>

        {/* ÍCONE CENTRAL */}
        <div className="w-24 h-24 bg-[#f0f7ff] rounded-3xl flex items-center justify-center text-[#0077cc] mb-8 animate-pulse">
          <Construction size={48} strokeWidth={1.5} />
        </div>

        {/* TEXTOS */}
        <div className="w-20 h-[3px] bg-[#E9D354] mb-6 mx-auto"></div>
        <h1 className="text-[#191F37] text-[36px] md:text-[48px] font-black leading-tight mb-6">
          Treinamentos em breve disponíveis
        </h1>
        
        <p className="text-[#333333] text-[18px] md:text-[20px] leading-relaxed max-w-xl mb-12">
          Estamos preparando uma trilha de aprendizado completa para você dominar nossos equipamentos com segurança e autonomia.
        </p>

        {/* BOTÕES DE AÇÃO */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/">
            <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 border-2 border-[#191F37] text-[#191F37] font-bold rounded-xl hover:bg-[#191F37] hover:text-white transition-all">
              <ArrowLeft size={20} />
              Voltar para a Home
            </button>
          </Link>

          <Link href="/contato">
            <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-[#0077cc] text-white font-bold rounded-xl hover:bg-[#005FA3] shadow-lg shadow-[#0077cc]/20 transition-all active:scale-95">
              <BellRing size={20} />
              Quero ser avisado
            </button>
          </Link>
        </div>

        {/* RODAPÉ DO CARD */}
        <p className="mt-12 text-gray-400 text-sm font-medium">
          InPETU Maker • 2026
        </p>
      </div>

    </main>
  );
}