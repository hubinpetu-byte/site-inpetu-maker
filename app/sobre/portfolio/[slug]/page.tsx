"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { projetosPortfolio } from '../data'; 
import { Download, Building2, Layers3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function DetalheProjetoPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const item = projetosPortfolio.find(p => p.slug === slug);

  if (!item) return <div className="pt-32 text-center text-xl font-black text-gray-500 min-h-screen">Conteúdo não encontrado</div>;

  return (
    <main className="w-full bg-[#FAFAFA] pt-[0px] min-h-screen font-sans">
      {item.tipo === "workshop" ? <LayoutWorkshop item={item} /> : <LayoutProjeto item={item} />}
      
      {/* Botão de Voltar Centralizado no Final de Ambos */}
      <div className="flex justify-center mt-12 mb-20">
        <Link href="/sobre/portfolio">
          <button className="text-gray-400 font-bold hover:text-[#0077cc] active:scale-95 transition-all text-sm uppercase tracking-wider">
            ← Voltar para o Portfólio
          </button>
        </Link>
      </div>
    </main>
  );
}

// --- LAYOUT DE WORKSHOPS (Visual Clean) ---
function LayoutWorkshop({ item }: { item: any }) {
  return (
    <div className="w-full bg-white pb-20">
      {/* 1. BANNER */}
      <div className="w-full h-[500px] md:h-[600px] relative">
        <Image src={item.banner} alt={item.titulo} fill priority className="object-cover" />
          className="absolute inset-0 bg-gradient-to-t from-[#181F37] via-[#181F37]/90 to-transparent z-10" 
           
      </div>

      {/* 2. TÍTULO E SUBTÍTULO */}
      <div className="max-w-[1100px] mx-auto px-6 mt-12 mb-16">
        <div className="border-b border-gray-400 pb-8">
          <h1 className="text-[#191F37] text-[32px] md:text-[42px] font-black leading-none mb-4">{item.titulo}</h1>
          <p className="text-[#333333] text-[18px] md:text-[16px] font-medium tracking-wide">{item.subtitulo}</p>
        </div>
      </div>

      {/* 3. CONTEÚDO */}
      <section className="max-w-[1100px] mx-auto px-6">
        <div className="prose prose-lg prose-gray max-w-none mb-16">
          <p className="whitespace-pre-line leading-relaxed text-justify">
  {item.projetoDetalhe}</p>
        </div>

        <GaleriaCarousel imagens={item.imagensGaleria} />
        
        <div className="mt-20 border-t border-gray-100 pt-16">
          <SecaoParceiros parceiros={item.parceiros} />
          <SecaoProjetosRelacionados projetosRelacionados={item.projetosRelacionados} />
        </div>
      </section>
    </div>
  );
}

// --- LAYOUT DE PROJETOS (Completo) ---
function LayoutProjeto({ item }: { item: any }) {
  return (
    <div className="w-full">
      <div className="w-full h-[550px] md:h-[650px] relative bg-[#191F37] flex flex-col justify-end">
        <Image src={item.banner} alt={item.titulo} fill className="object-cover opacity-90" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <div className="relative z-20 max-w-[1100px] mx-auto w-full px-6 pb-16">
          <h1 className="text-white text-[42px] md:text-[72px] font-black leading-tight drop-shadow-2xl">{item.titulo}</h1>
          <p className="text-white text-[18px] md:text-[24px] font-medium max-w-3xl drop-shadow-lg opacity-90">{item.subtitulo}</p>
        </div>
      </div>

      <section className="max-w-[1100px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16 border-b border-gray-100 pb-16">
          <div><h3 className="font-black text-[#2A2A2A] text-[16px] mb-4 uppercase tracking-widest">O desafio</h3><p className="text-gray-600 leading-relaxed text-[17px]">{item.desafio}</p></div>
          <div><h3 className="font-black text-[#2A2A2A] text-[16px] mb-4 uppercase tracking-widest">A solução</h3><p className="text-gray-600 leading-relaxed text-[17px]">{item.solucao}</p></div>
        </div>

        <div className="mb-20 space-y-12">
          <div><h3 className="text-[22px] font-black text-[#2A2A2A] mb-6 border-l-4 border-[#E9D354] pl-4">O projeto em detalhes</h3><p className="text-gray-600 leading-relaxed text-[17px]">{item.projetoDetalhe}</p></div>
          <div><h3 className="text-[22px] font-black text-[#2A2A2A] mb-6 border-l-4 border-[#0077cc] pl-4">Como contribuímos</h3><p className="text-gray-600 leading-relaxed text-[17px]">{item.comoContribuimos}</p></div>
          <GaleriaCarousel imagens={item.imagensGaleria} />
        </div>

        <div className="border-t border-gray-100 pt-16">
          <SecaoParceiros parceiros={item.parceiros} />
          <SecaoDownloads downloads={item.downloads} />
          <SecaoProjetosRelacionados projetosRelacionados={item.projetosRelacionados} />
        </div>
      </section>
    </div>
  );
}

// --- SUBCOMPONENTES (Ficaram iguais aos anteriores) ---
function SecaoDownloads({ downloads }: { downloads: any[] }) { if (!downloads?.length) return null; return <div className="bg-[#191F37] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 mb-20 text-white"><div className="text-center md:text-left"><p className="font-black text-[24px] uppercase tracking-widest mb-2 flex items-center gap-3 justify-center md:justify-start"><Layers3 size={24} className="text-[#E9D354]" /> Baixe os arquivos técnicos</p><p className="opacity-70 text-base">Documentação oficial e arquivos para download.</p></div><div className="flex gap-6">{downloads.map((d, i) => <Link href={d.arquivo} key={i} className="flex flex-col items-center gap-3"><div className="w-16 h-20 bg-white/5 rounded-xl flex items-center justify-center border border-white/10"><Download size={28} className="text-[#E9D354]" /></div><span className="text-[10px] font-black text-center text-white max-w-[90px] uppercase">{d.nome}</span></Link>)}</div></div>; }
function SecaoProjetosRelacionados({ projetosRelacionados }: { projetosRelacionados: any }) { if (!projetosRelacionados) return null; return <div className="mt-20 border-t border-gray-100 pt-16"><h3 className="text-[32px] font-black text-[#191F37] mb-12">Projetos Relacionados</h3></div>; }
function SecaoParceiros({ parceiros }: { parceiros: any[] }) {
  if (!parceiros || parceiros.length === 0) return null;

  return (
    <div className="border-t border-b border-gray-100 py-12 mb-20 bg-gray-50/50 rounded-2xl px-8">
      <h3 className="font-black text-[18px] mb-10 text-center text-[#0077cc] uppercase tracking-widest">
        Parceiros
      </h3>
      <div className="flex flex-wrap gap-12 justify-center items-center">
        {parceiros.map((p, i) => (
          <div key={i} className="text-center group">
            <div className="w-32 h-16 relative mb-2">
              <Image 
                src={p.logo} 
                alt={p.nome} 
                fill 
                className="object-contain grayscale hover:grayscale-0 transition-all duration-500" 
              />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">
              {p.nome}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
function GaleriaCarousel({ imagens }: { imagens: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calcula quantas "páginas" de 2 imagens existem
  const totalPages = Math.ceil(imagens.length / 2);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Container das Imagens */}
      <div className="flex gap-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex w-full gap-6"
          >
            {imagens.slice(currentIndex * 2, currentIndex * 2 + 2).map((img, i) => (
              <div key={i} className="relative w-1/2 h-[400px] rounded-3xl overflow-hidden shadow-lg">
                <Image src={img} alt="Galeria" fill className="object-cover" />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Setas de Navegação */}
      {imagens.length > 2 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all z-20"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
}