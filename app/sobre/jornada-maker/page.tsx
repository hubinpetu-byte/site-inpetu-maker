"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function JornadaMakerPage() {
  return (
    <div className="w-full bg-[#F5F5F5] pt-[120px] pb-20">
      
      {/* BLOCO 1 – INTRODUÇÃO COM DESTAQUE (CINZA) */}
      <section className="w-full bg-[#F5F5F5] py-20 px-20 mb-20">
        <div className="max-w-[1355px] mx-auto">
          {/* Título Jornada Maker */}
          <div className="w-full bg-[#0077cc] rounded-xl py-5 px-12 shadow-lg mb-12 flex items-center">
            <h1 className="text-white text-[32px] font-extrabold">
              Jornada Maker
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
               <h2 className="text-[#191F37] text-[48px] font-black mb-6 leading-tight">Fluxo de Trabalho</h2>
               <p className="text-[#333333] text-[20px] leading-relaxed text-justify">
                 Para que sua ideia se transforme em um protótipo de sucesso, o InPETU Maker estabeleceu um fluxo dividido em quatro etapas fundamentais. 
                 Cada fase oferece ferramentas e suportes específicos para garantir a viabilidade técnica e a excelência do seu projeto.
               </p>
            </div>
            {/* Ilustração / Vídeo - AJUSTADO */}
            <div className="flex-1 w-full h-[200px]  relative overflow-hidden">
               <Image 
                  src="/sobre/fluxo_completo.png" 
                  alt="Ilustração do Fluxo Completo" 
                  fill 
                  className="object-cover"
                  unoptimized
                />
            </div>
          </div>
        </div>
      </section>

      {/* LINHA AMARELA DE SEPARAÇÃO */}
      <div className="max-w-[1355px] mx-auto px-6 mb-0">
        <div className="w-full h-[6px] bg-[#E9D354] rounded-full"></div>
      </div>

      {/* BLOCO 3 – ETAPAS ALTERNADAS */}
      <div className="space-y-0">
        
        {/* 01. CONCEBER (BRANCO) */}
        <section className="w-full bg-white py-24 px-6">
          <div className="max-w-[1355px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
              <span className="text-[#0077cc] font-black text-2xl mb-2 block">01</span>
              <h3 className="text-[#0377CC] text-[40px] font-black mb-4">Conceber</h3>
              <p className="text-[#333333] text-[18px] leading-relaxed mb-8">
                É a fase inicial onde as ideias ganham forma através de ferramentas de modelagem e simulação. 
                O foco é validar a viabilidade técnica antes de gastar recursos na construção física.
              </p>
              <Link href="/conceber">
                <button className="text-[#0077cc] font-bold border-b-2 border-[#0077cc] hover:text-[#E9D354] hover:border-[#E9D354] transition-all cursor-pointer">
                  Explorar ferramentas de Conceber →
                </button>
              </Link>
            </div>
            <div className="relative h-[400px] flex items-center justify-center order-1 md:order-2">
              <div className="absolute w-[85%] h-[90%] bg-[#EAEAEA] rounded-2xl translate-x-4 -translate-y-4"></div>
              <div className="relative w-[85%] h-[90%] rounded-2xl shadow-2xl border-4 border-white overflow-hidden z-10">
                <Image src="/sobre/conceber.png" alt="Conceber" fill className="object-cover" unoptimized />
              </div>
            </div>
          </div>
        </section>

        {/* 02. CONSTRUIR (CINZA) */}
        <section className="w-full bg-[#F5F5F5] py-24 px-6">
          <div className="max-w-[1355px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative h-[400px] flex items-center justify-center">
              <div className="absolute w-[85%] h-[90%] bg-[#D9D9D9] rounded-2xl -translate-x-4 translate-y-4"></div>
              <div className="relative w-[85%] h-[90%] rounded-2xl shadow-2xl border-4 border-white overflow-hidden z-10">
                <Image src="/sobre/construir.png" alt="Construir" fill className="object-cover" unoptimized />
              </div>
            </div>
            <div>
              <span className="text-[#0077cc] font-black text-2xl mb-2 block">02</span>
              <h3 className="text-[#0377CC] text-[40px] font-black mb-4">Construir</h3>
              <p className="text-[#333333] text-[18px] leading-relaxed mb-8">
                Com o parque de máquinas do InpeTU Maker, você dá vida ao seu projeto. 
                Contamos com dois andares equipados com máquinas industriais e suporte técnico especializado.
              </p>
              <Link href="/construir/equipamentos">
                <button className="text-[#0077cc] font-bold border-b-2 border-[#0077cc] hover:text-[#E9D354] hover:border-[#E9D354] transition-all cursor-pointer">
                  Conhecer as Máquinas e equipamentos →
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* 03. INTEGRAR (BRANCO) */}
        <section className="w-full bg-white py-24 px-6">
          <div className="max-w-[1355px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
              <span className="text-[#0077cc] font-black text-2xl mb-2 block">03</span>
              <h3 className="text-[#0377CC] text-[40px] font-black mb-4">Integrar</h3>
              <p className="text-[#333333] text-[18px] leading-relaxed mb-8">
                Conectamos seu projeto a laboratórios parceiros para validações complexas, 
                garantindo que ele funcione como parte de um sistema maior.
              </p>
              <Link href="/integrar">
                <button className="text-[#0077cc] font-bold border-b-2 border-[#0077cc] hover:text-[#E9D354] hover:border-[#E9D354] transition-all cursor-pointer">
                  Ver Laboratórios Parceiros →
                </button>
              </Link>
            </div>
            <div className="relative h-[400px] flex items-center justify-center order-1 md:order-2">
              <div className="absolute w-[85%] h-[90%] bg-[#EAEAEA] rounded-2xl translate-x-4 -translate-y-4"></div>
              <div className="relative w-[85%] h-[90%] rounded-2xl shadow-2xl border-4 border-white overflow-hidden z-10">
                <Image src="/sobre/integrar.png" alt="Integrar" fill className="object-cover" unoptimized />
              </div>
            </div>
          </div>
        </section>

        {/* 04. AVALIAR (CINZA) */}
        <section className="w-full bg-[#F5F5F5] py-24 px-6">
          <div className="max-w-[1355px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative h-[400px] flex items-center justify-center">
              <div className="absolute w-[85%] h-[90%] bg-[#D9D9D9] rounded-2xl -translate-x-4 translate-y-4"></div>
              <div className="relative w-[85%] h-[90%] rounded-2xl shadow-2xl border-4 border-white overflow-hidden z-10">
                <Image src="/sobre/avaliar.png" alt="Avaliar" fill className="object-cover" unoptimized />
              </div>
            </div>
            <div>
              <span className="text-[#0077cc] font-black text-2xl mb-2 block">04</span>
              <h3 className="text-[#0377CC] text-[40px] font-black mb-4">Avaliar</h3>
              <p className="text-[#333333] text-[18px] leading-relaxed mb-8">
                A fase final de testes e refinamento. Aqui, seu protótipo passa por avaliações rigorosas 
                para garantir que atende a todos os requisitos do projeto inicial.
              </p>
              <Link href="/avaliar">
                <button className="text-[#0077cc] font-bold border-b-2 border-[#0077cc] hover:text-[#E9D354] hover:border-[#E9D354] transition-all cursor-pointer">
                  Saiba como Validar →
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}