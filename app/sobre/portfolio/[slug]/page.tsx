"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // <--- ADICIONE ESTA LINHA AQUI!
import { projetosPortfolio } from '../data';
import { useParams } from 'next/navigation';

export default function DetalheProjeto() {
  const params = useParams();
  const projeto = projetosPortfolio.find(p => p.slug === params.slug);

  if (!projeto) return <div className="pt-32 text-center font-bold">Projeto não encontrado</div>;

  return (
    // pt-0 para o banner encostar no topo absoluto da tela
    <div className="w-full bg-white pt-0">
      
      {/* BANNER HERO - OCUPA O TOPO */}
      <div className="w-full h-[550px] md:h-[650px] relative overflow-hidden bg-[#191F37] flex flex-col justify-end">
        
        {/* 1. IMAGEM DO BANNER */}
        <Image 
          src={projeto.banner} 
          alt={projeto.titulo} 
          fill 
          priority
          unoptimized
          className="object-cover opacity-90" 
          style={{ zIndex: 0 }}
        />

        {/* 2. OVERLAY DE DEGRADÊ SUAVE (AJUSTADO) */}
        {/* from-black/30: Suave no topo para a Navbar */}
        {/* via-transparent: Limpo no meio para a foto aparecer */}
        {/* to-black/70: Mais escuro na base para ler o título */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent via-50% to-black/70"
          style={{ zIndex: 1 }}
        />

        {/* 3. CONTEÚDO DENTRO DO BANNER */}
        <div className="relative z-10 max-w-[1100px] mx-auto w-full px-6 pb-16" style={{ zIndex: 10 }}>
                       <h1 className="text-white text-[42px] md:text-[72px] font-black leading-tight drop-shadow-2xl">
                {projeto.titulo}
            </h1>
            <p className="text-white text-[18px] md:text-[24px] font-medium max-w-3xl drop-shadow-lg opacity-90">
                {projeto.subtitulo}
            </p>
        </div>
      </div>

      {/* CONTEÚDO DA PÁGINA */}
      <section className="max-w-[1100px] mx-auto px-6 py-16">
        
        {/* GRID: DESAFIO E SOLUÇÃO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16 border-b border-gray-100 pb-16">
          <div>
            <h3 className="font-black text-[#2A2A2A] text-[16px] mb-4 tracking-widest">O desafio</h3>
            <p className="text-gray-600 leading-relaxed text-justify text-[17px]">{projeto.desafio}</p>
          </div>
          <div>
            <h3 className="font-black text-[#2A2A2Ac] text-[16px] mb-4 uppercase tracking-widest">A solução</h3>
            <p className="text-gray-600 leading-relaxed text-justify text-[17px]">{projeto.solucao}</p>
          </div>
        </div>

        {/* DETALHAMENTO DO PROJETO */}
        <div className="mb-16">
          <h3 className="font-black text-[#2A2A2A] text-[22px] mb-6 border-l-4 border-[#E9D354] pl-4">O projeto em detalhes</h3>
          <p className="text-gray-600 leading-relaxed text-justify whitespace-pre-line text-[17px]">{projeto.projetoDetalhe}</p>
        </div>

        {/* GALERIA DE IMAGENS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {projeto.imagensGaleria.map((img, i) => (
            <div key={i} className="relative h-[450px] rounded-2xl overflow-hidden shadow-xl group">
              <Image 
                src={img} 
                alt={`Galeria ${i}`} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
          ))}
        </div>

        {/* PARCEIROS (SE EXISTIREM) */}
        {projeto.parceiros && projeto.parceiros.length > 0 && (
            <div className="border-t border-b border-gray-100 py-12 mb-20 bg-gray-50/50 rounded-2xl px-8">
              <h3 className="font-black text-[18px] mb-10 text-center text[#0077cc]">Parceiros</h3>
              <div className="flex flex-wrap gap-12 justify-center items-center">
                 {projeto.parceiros.map((p, i) => (
                   <div key={i} className="text-center group">
                     <div className="w-32 h-16 relative mb-2">
                        <Image src={p.logo} alt={p.nome} fill className="object-contain grayscale hover:grayscale-0 transition-all duration-500" />
                     </div>
                     <span className="text-[10px] font-bold text-gray-400 uppercase">{p.nome}</span>
                   </div>
                 ))}
              </div>
            </div>
        )}

        {/* BOX DE DOWNLOADS */}
        {projeto.downloads && projeto.downloads.length > 0 && (
            <div className="bg-[#0077cc] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-200/50">
              <div className="text-white text-center md:text-left">
                <p className="font-black text-[24px] leading-tight mb-2 uppercase tracking-tight">Arquivos do Projeto</p>
                <p className="opacity-80 text-sm font-medium">Documentação e arquivos técnicos para download.</p>
              </div>
              <div className="flex gap-6">
                {projeto.downloads.map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer">
                    <div className="w-16 h-20 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/20 shadow-inner">
                      <span className="text-white text-2xl">↓</span>
                    </div>
                    <span className="text-[10px] font-black text-center text-white max-w-[80px] uppercase leading-tight tracking-tighter">
                        {d.nome}
                    </span>
                  </div>
                ))}
              </div>
            </div>
        )}
        
        {/* BOTÃO VOLTAR */}
        <div className="mt-20 flex justify-center">
            <Link href="/sobre/portfolio">
                <button className="text-gray-400 font-bold hover:text-[#0077cc] transition-colors flex items-center gap-2">
                    ← Voltar para o Portfólio
                </button>
            </Link>
        </div>
      </section>
    </div>
  );
}