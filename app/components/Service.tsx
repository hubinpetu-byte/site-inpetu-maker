"use client";

import React from 'react';
import NextImage from 'next/image';
import Link from 'next/link';

export default function ServicosHomeSection() {
  const servicos = [
    {
      titulo: "Uso aberto",
      descricao: "Tenha acesso às ferramentas e equipamentos do laboratório para criar seus próprios projetos de forma independente.",
      imagem: "uso-aberto.png",
      link: "/servicos/uso-livre"
    },
    {
      titulo: "Prototipagem sob demanda",
      descricao: "Nossa equipe transforma sua ideia em um protótipo funcional, com qualidade e precisão.",
      imagem: "/prototipagem.png",
      link: "/servicos/sob-demanda"
    },
    {
      titulo: "Workshops",
      descricao: "Aprenda novas habilidades e técnicas, descubra o potencial das ferramentas do laboratório e mergulhe na cultura maker.",
      imagem: "/workshops.png",
      link: "/servicos/workshops"
    }
  ];

  return (
    <section className="max-w-[1355px] mx-auto px-6 py-6 bg-[#FAFAFA]">
  
        {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {servicos.map((servico, index) => (
          <div 
            key={index} 
            className="border border-[#0077cc]/30 rounded-lg p-8 flex flex-col h-full hover:shadow-lg transition-shadow"
          >
            {/* Placeholder da Imagem (Cinza conforme o design) */}
            <div className="relative w-full aspect-[4/3] bg-[#D9D9D9] rounded-sm mb-8 flex items-center justify-center">
              <NextImage 
                src={servico.imagem} 
                alt={servico.titulo} 
                fill 
                className="object-cover opacity-100" // Mantém o tom cinza do protótipo
                unoptimized 
              />
              {/* Ícone de imagem centralizado caso a foto não carregue */}
              <div className="text-gray-400">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </div>
            </div>

            {/* Conteúdo do Card */}
            <h3 className="text-[#191F37] text-[28px] font-black mb-4 leading-tight">
              {servico.titulo}
            </h3>
            
            <p className="text-[#333333] text-[16px] leading-relaxed mb-10 flex-grow text-justify">
              {servico.descricao}
            </p>

            {/* Botão Azul Arredondado */}
            <Link href={servico.link}>
              <button className="w-full bg-[#0077cc] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#0377CC] transition-all active:scale-95">
                Saiba mais
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}