"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projetosPortfolio } from './data'; // Importando os dados centralizados

export default function PortfolioPage() {
  const [filtro, setFiltro] = useState("Todos");

  // Filtra os projetos com base na categoria selecionada
  const projetosFiltrados = filtro === "Todos" 
    ? projetosPortfolio 
    : projetosPortfolio.filter(p => p.categoria === filtro);

  return (
    <div className="w-full bg-white pt-[120px] pb-20">
      
{/* HEADER DO PORTFÓLIO COM IMAGEM DE FUNDO */}
<section className="max-w-[1355px] mx-auto px-6 mb-12">
  {/* Adicionamos 'relative' para a <Image fill /> funcionar */}
  <div className="bg-[#D9D9D9] rounded-xl p-16 relative overflow-hidden min-h-[350px] flex flex-col justify-end shadow-inner">
    <Image 
      src="/banners/banner_portfolio.png" // O caminho correto dentro da pasta banner
      alt="Fundo Banner Portfólio InPETU Maker"
      fill // Preenche todo o container pai
      className="object-cover z-0" // object-cover garante que a imagem não distorça
      unoptimized // Adicione se for SVG ou PNG simples, para o Next não processar
    />
   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-1" /> 
    <div className="relative z-10 flex flex-col gap-2">
      <h1 className="text-white text-[48px] md:text-[64px] font-black leading-tight drop-shadow-lg">
        Portfólio
      </h1>
      <p className="text-white text-[18px] md:text-[24px] font-medium max-w-2xl drop-shadow-md">
        Ideias que viraram realidade no InPETU maker
      </p>
    </div>

  </div>
</section>

      {/* SISTEMA DE FILTROS */}
      <section className="max-w-[1355px] mx-auto px-6 mb-16">
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
              
              {/* Imagem com Badge de Categoria */}
              <div className="relative h-[280px] bg-gray-100 overflow-hidden">
                <Image 
                  src={item.banner} 
                  alt={item.titulo} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  unoptimized
                />
                <span className="absolute top-4 right-4 bg-[#0077cc] text-white text-[11px] font-black py-1 px-4 rounded-full uppercase tracking-widest shadow-lg z-10">
                  {item.categoria}
                </span>
              </div>
              
              {/* Conteúdo Informativo */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-[#191F37] text-[24px] font-black mb-1 group-hover:text-[#0077cc] transition-colors">
                  {item.titulo}
                </h3>
                <p className="text-gray-400 text-[13px] font-bold uppercase mb-4 tracking-tighter">
                  {item.autor}
                </p>
                <p className="text-[#555555] text-[15px] leading-relaxed mb-8 flex-grow line-clamp-4">
                  {item.resumo} {/* Usando um campo de resumo para o card */}
                </p>
                
                {/* Link Dinâmico para a página do projeto */}
                <Link href={`/sobre/portfolio/${item.slug}`}>
                  <button className="bg-[#E9D354] text-[#191F37] font-extrabold py-3 px-8 rounded-lg w-full hover:bg-[#d4c04d] transition-all active:scale-95 shadow-md">
                    Saiba mais
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* PAGINAÇÃO / CARREGAR MAIS */}
        <div className="flex justify-center mt-24">
          <button className="bg-white text-[#0077cc] border-2 border-[#0077cc] font-black py-4 px-16 rounded-xl hover:bg-[#0077cc] hover:text-white transition-all shadow-lg active:scale-95">
            Carregar mais
          </button>
        </div>
      </section>
    </div>
  );
}