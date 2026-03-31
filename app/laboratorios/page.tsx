"use client";

import React from 'react';
import NextImage from 'next/image';
import Link from 'next/link';

export default function LaboratoriosSelecaoPage() {
  const categorias = [
    {
      titulo: "Laboratórios de Apoio",
      descricao: "Laboratórios nas dependências do InPETU hub que auxiliam nas etapas de conceber, construir, integrar e avaliar",
      imagem: "/laboratorios/apoio-capa.jpg", // Certifique-se de ter esta imagem
      href: "/laboratorios/laboratorios-apoio"
    },
    {
      titulo: "Laboratórios Parceiros",
      descricao: "Laboratórios parceiros do InPETU Maker, que podem apoiar em demandas específicas, com conhecimento técnico ou equipamentos.",
      imagem: "/laboratorios/parceiros-capa.jpg", // Certifique-se de ter esta imagem
      href: "/sobre-nos/parceiros/laboratorios"
    }
  ];

  return (
    <div className="w-full bg-[#f4f4f4] pt-[140px] pb-20 px-6 min-h-screen">
      
      {/* 1. CABEÇALHO AZUL */}
      <section className="max-w-[1355px] mx-auto mb-12">
        <div className="w-full bg-[#0077cc] rounded-xl py-5 px-10 shadow-md">
          <h1 className="text-white text-[28px] font-bold">
            Laboratórios
          </h1>
        </div>
      </section>

      {/* 2. GRID DE SELEÇÃO */}
      <section className="max-w-[1355px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {categorias.map((item, index) => (
          <Link 
            key={index} 
            href={item.href}
            className="group block bg-white rounded-[40px] p-8 shadow-sm border border-transparent transition-all duration-300 hover:shadow-xl hover:border-[#0077cc]/30"
          >
            <div className="flex flex-col h-full">
              
              {/* Container da Imagem com Borda Azul */}
              <div className="relative w-full aspect-[16/9] rounded-[25px] overflow-hidden border-2 border-[#0077cc] mb-8">
                <NextImage 
                  src={item.imagem} 
                  alt={item.titulo} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>

              {/* Textos */}
              <div className="px-2">
                <h2 className="text-[#191F37] text-[32px] font-black mb-4 leading-tight">
                  {item.titulo}
                </h2>
                <p className="text-[#666666] text-[18px] leading-relaxed">
                  {item.descricao}
                </p>
              </div>

              {/* Indicador visual de clique (Opcional) */}
              <div className="mt-8 px-2">
                <span className="text-[#0077cc] font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  Acessar laboratórios →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

    </div>
  );
}