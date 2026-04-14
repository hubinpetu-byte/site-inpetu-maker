"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projetosPortfolio } from './data';

export default function PortfolioPage() {
  const [filtro, setFiltro] = useState("Todos");

  const projetosFiltrados = filtro === "Todos" 
    ? projetosPortfolio 
    : projetosPortfolio.filter(p => p.categoria === filtro);

  return (
    // Alterado pt-[120px] para pt-0 para o conteúdo encostar no topo
    <div className="w-full bg-white pt-0 pb-20">
      
      {/* HEADER FULL WIDTH - BANNER NO TOPO ABSOLUTO */}
      <section className="w-full relative z-0"> 
        {/* Removemos o mt- negativo e arredondamentos para cobrir a tela toda */}
        <div className="relative overflow-hidden min-h-[600px] flex flex-col justify-end bg-black">
          
          {/* 1. IMAGEM DE FUNDO */}
          <Image 
            src="/banners/banner_portfolio.png" 
            alt="Banner Portfólio InPETU"
            fill 
            priority
            unoptimized
            className="object-cover opacity-70"
            style={{ zIndex: 0 }}
          />

          {/* 2. OVERLAY PARA CONTRASTE ESTILO 'ROBOARM' */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60"
            style={{ zIndex: 1, pointerEvents: 'none' }} 
          /> 

          {/* 3. CONTEÚDO DO TEXTO (Alinhado com o container de 1355px) */}
          <div className="relative z-20 w-full max-w-[1355px] mx-auto px-6 mb-16" style={{ zIndex: 10 }}>
            <h1 className="text-white text-[56px] md:text-[84px] font-black leading-tight drop-shadow-2xl">
              Portfólio
            </h1>
            <p className="text-white text-[20px] md:text-[28px] font-medium max-w-2xl drop-shadow-lg">
              Ideias que viraram realidade no InPETU Maker
            </p>
          </div>
        </div>
      </section>

      {/* SISTEMA DE FILTROS (Espaçamento superior adicionado aqui) */}
      <section className="max-w-[1355px] mx-auto px-6 mb-16 mt-16">
        <div className="flex flex-wrap gap-4">
          {["Todos", "Protótipos", "Workshops", "Programas", "Eventos"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`px-8 py-3 rounded-lg font-bold transition-all border-2 ${
                filtro === cat 
                ? "bg-[#0077cc] text-white border-[#0077cc]" 
                : "bg-white text-[#0077cc] border-[#0077cc] hover:bg-[#0077cc] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* GRID DE PROJETOS */}
      <section className="max-w-[1355px] mx-auto px-6">
        <h2 className="text-[#0077cc] text-[32px] font-black mb-8 border-b-4 border-[#E9D354] inline-block">
          {filtro}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {projetosFiltrados.map((item) => (
            <div key={item.slug} className="group border-2 border-gray-100 rounded-2xl overflow-hidden flex flex-col bg-white hover:border-[#0077cc] transition-all hover:shadow-2xl">
              
              <div className="relative h-[280px] bg-gray-100 overflow-hidden">
                <Image 
                  src={item.banner} 
                  alt={item.titulo} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  unoptimized
                />
                <span className="absolute top-4 right-4 bg-[#0077cc] text-white text-[11px] font-black py-1 px-4 rounded-full uppercase tracking-widest shadow-lg z-10">
                  {item.categoria}
                </span>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-[#191F37] text-[24px] font-black mb-1 group-hover:text-[#0077cc] transition-colors">
                  {item.titulo}
                </h3>
                <p className="text-gray-400 text-[13px] font-bold uppercase mb-4 tracking-tighter">
                  {item.autor}
                </p>
                <p className="text-[#555555] text-[15px] leading-relaxed mb-8 flex-grow line-clamp-4">
                  {item.resumo}
                </p>
                
                <Link href={`/sobre/portfolio/${item.slug}`}>
                  <button className="bg-[#E9D354] text-[#191F37] font-extrabold py-3 px-8 rounded-lg w-full hover:bg-[#d4c04d] transition-all active:scale-95 shadow-md">
                    Saiba mais
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-24">
          <button className="bg-white text-[#0077cc] border-2 border-[#0077cc] font-black py-4 px-16 rounded-xl hover:bg-[#0077cc] hover:text-white transition-all shadow-lg active:scale-95">
            Carregar mais
          </button>
        </div>
      </section>
    </div>
  );
}