"use client";

import React from 'react';
import Image from 'next/image';
import { projetosPortfolio } from '../data';
import { useParams } from 'next/navigation';

export default function DetalheProjeto() {
  const params = useParams();
  const projeto = projetosPortfolio.find(p => p.slug === params.slug);

  if (!projeto) return <div>Projeto não encontrado</div>;

  return (
    <div className="w-full bg-white pt-[80px]">
      {/* BANNER GIGANTE */}
      <div className="w-full h-[500px] relative">
        <Image src={projeto.banner} alt={projeto.titulo} fill className="object-cover" />
      </div>

      <section className="max-w-[1100px] mx-auto px-6 py-16">
        {/* CABEÇALHO */}
        <h1 className="text-[#191F37] text-[64px] font-black leading-tight">{projeto.titulo}</h1>
        <p className="text-[#191F37] text-[24px] mb-12 font-medium">{projeto.subtitulo}</p>

        <hr className="border-gray-300 mb-12" />

        {/* DESAFIO E SOLUÇÃO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div>
            <h3 className="font-black text-[#191F37] text-[18px] mb-4">O desafio</h3>
            <p className="text-gray-600 leading-relaxed text-justify">{projeto.desafio}</p>
          </div>
          <div>
            <h3 className="font-black text-[#191F37] text-[18px] mb-4">A solução</h3>
            <p className="text-gray-600 leading-relaxed text-justify">{projeto.solucao}</p>
          </div>
        </div>

        {/* TEXTO LONGO DO PROJETO */}
        <div className="mb-16">
          <h3 className="font-black text-[#191F37] text-[18px] mb-4">O projeto</h3>
          <p className="text-gray-600 leading-relaxed text-justify whitespace-pre-line">{projeto.projetoDetalhe}</p>
        </div>

        {/* GALERIA DE IMAGENS LADO A LADO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {projeto.imagensGaleria.map((img, i) => (
            <div key={i} className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image src={img} alt="Galeria" fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* PARCEIROS */}
        <div className="border-t border-b border-gray-200 py-12 mb-16">
          <h3 className="font-black text-[18px] mb-8">Parceiros</h3>
          <div className="flex flex-wrap gap-12 justify-center items-center opacity-60">
             {projeto.parceiros.map((p, i) => (
               <div key={i} className="text-center">
                 <div className="w-32 h-16 bg-gray-100 relative mb-2 rounded border border-gray-200">
                    {/* <Image src={p.logo} fill className="object-contain p-2" /> */}
                 </div>
                 <span className="text-xs font-bold">{p.nome}</span>
               </div>
             ))}
          </div>
        </div>

        {/* BOX DE DOWNLOADS (AZUL) */}
        <div className="border-2 border-[#0077cc] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[#0077cc] font-black text-[20px] max-w-[300px] leading-tight text-center md:text-left">
            Baixe os arquivos disponibilizados pelos autores do projeto
          </p>
          <div className="flex gap-6">
            {projeto.downloads.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-20 h-24 bg-gray-100 rounded flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <span className="text-gray-400">⬇</span>
                </div>
                <span className="text-[10px] font-bold text-center max-w-[80px] uppercase leading-tight">{d.nome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}