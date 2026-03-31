"use client";

import React, { useState } from 'react';
import NextImage from 'next/image';

const labsApoio = [
  {
    id: 1,
    nome: "Metrologia Óptica",
    imagem: "/Parceiros/Metrologia optica.png",
    categorias: ["Integrar", "Avaliar"]
  },
  {
    id: 2,
    nome: "Laboratório de Materiais (LabMat)",
     imagem: "/Parceiros/Materiais.png",
    categorias: ["Integrar", "Avaliar"]
  },
  {
    id: 3,
    nome: "Laboratório de CAD/CAE/CAM",
    imagem: "/Parceiros/CAD.png",
    categorias: ["Conceber", "Integrar", "Avaliar"]
  },
  {
    id: 4,
    nome: "Metrologia Dimensional",
    imagem: "/Parceiros/Dimensional.png",
    categorias: ["Integrar", "Avaliar"]
  },
  {
    id: 5,
    nome: "Laboratório de Instrumentação",
    imagem: "/Parceiros/Instrumentacao.png",
    categorias: ["Construir", "Integrar", "Avaliar"]
  },
  {
    id: 6,
    nome: "Manufatura Aditivas de Metais",
    imagem: "/Parceiros/Metais.png",
    categorias: ["Construir"]
  },
  {
    id: 7,
    nome: "Laboratório de Integração e Testes de Protótipos",
    imagem: "/Parceiros/Testes.png",
    categorias: ["Construir", "Integrar", "Avaliar"]
  },
  {
    id: 8,
    nome: "Laboratório de Caracterização (Lab Mat)",
    imagem: "/Parceiros/Caracterização.png",
    categorias: ["Integrar", "Avaliar"]
  }
];

export default function LaboratoriosApoioPage() {
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");

  const labsFiltrados = filtroAtivo === "Todos" 
    ? labsApoio 
    : labsApoio.filter(lab => lab.categorias.includes(filtroAtivo));

  return (
    <div className="w-full bg-white pt-[140px] pb-20 px-6">
      
      {/* 1. CABEÇALHO COM FILTRO AJUSTADO */}
      <section className="max-w-[1355px] mx-auto mb-10">
        <div className="w-full bg-[#0077cc] rounded-2xl py-6 px-10 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
          <h1 className="text-white text-[32px] font-black tracking-wide">
            Laboratórios de Apoio
          </h1>
          
          <div className="relative min-w-[260px]">
            {/* Fonte aumentada no select: text-xl */}
            <select 
              className="w-full bg-white text-[#0077cc] font-bold py-4 px-6 rounded-xl appearance-none cursor-pointer outline-none shadow-sm text-xl"
              value={filtroAtivo}
              onChange={(e) => setFiltroAtivo(e.target.value)}
            >
              <option value="Todos">Filtrar por categoria</option>
              <option value="Conceber">Conceber</option>
              <option value="Construir">Construir</option>
              <option value="Integrar">Integrar</option>
              <option value="Avaliar">Avaliar</option>
            </select>
            <div className="absolute right-5 top-5 pointer-events-none text-[#0077cc]">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TEXTO DESCRITIVO */}
      <section className="max-w-[1355px] mx-auto mb-16">
        <p className="text-[#333333] text-[18px] leading-relaxed text-justify max-w-[1200px]">
          Os laboratórios de apoio do InPETU Maker estão localizados no InPETU Hub, formando um ambiente integrado que reúne diferentes competências técnicas em um mesmo espaço. Essa proximidade permite acesso a infraestrutura complementar e suporte especializado ao longo de todas as etapas de desenvolvimento de protótipos.
        </p>
      </section>

      {/* 3. GRID DE CARDS COM BORDA NA IMAGEM */}
      <section className="max-w-[1355px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {labsFiltrados.map((lab) => (
            <div 
              key={lab.id} 
              className="bg-[#191F37] rounded-[35px] overflow-hidden flex flex-col h-full shadow-xl transition-transform duration-300 hover:-translate-y-2 group"
            >
              {/* Imagem com borda azul 0077cc */}
              <div className="relative aspect-[16/11] m-4 rounded-[25px] overflow-hidden border-4 border-[#0077cc]">
                <NextImage 
                  src={lab.imagem} 
                  alt={lab.nome} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                  unoptimized
                />
                
                {/* Badges sem uppercase */}
                <div className="absolute top-3 right-3 flex flex-wrap justify-end gap-1.5 max-w-[80%]">
                  {lab.categorias.map((cat, idx) => (
                    <span 
                      key={idx} 
                      className="bg-[#0077cc] text-white text-[11px] font-bold px-3 py-1.5 rounded-md border border-white/20 shadow-md"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Título sem uppercase ou itálico */}
              <div className="px-6 pb-10 pt-4 flex items-center justify-center text-center flex-grow">
                <h3 className="text-white text-[20px] font-black leading-tight tracking-tight">
                  {lab.nome}
                </h3>
              </div>
            </div>
          ))}
        </div>
        
        {labsFiltrados.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl font-medium">Nenhum laboratório encontrado nesta categoria.</p>
          </div>
        )}
      </section>
    </div>
  );
}