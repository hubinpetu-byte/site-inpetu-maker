"use client";

import React from 'react';
import NextImage from 'next/image';
import Link from 'next/link';

export default function PrototipagemSobDemandaPage() {
  const requisitos = [
    "Cadastro ativo no sistema do InPETU Maker",
    "Envio das especificações do projeto",
    "Arquivo digital (quando aplicável)",
    "Definição clara de objetivo e uso do protótipo",
    "Aprovação do orçamento"
  ];

  return (
    <div className="w-full bg-[#f4f4f4] min-h-screen pb-20">
      
      {/* --- SEÇÃO HERO COM DEGRAU --- */}
      <section className="relative pt-[100px] mb-24 px-10">
        <div className="max-w-[1355px] mx-auto flex flex-col md:flex-row items-stretch">
          
          {/* Lado Esquerdo: Texto */}
          <div className="flex-1 bg-white p-12 lg:p-20 rounded-t-[40px] rounded-bl-[40px] relative z-10">
            <span className="text-[#191F37] font-medium text-[16px] mb-2 block lowercase">serviço</span>
            <h1 className="text-[#191F37] text-[56px] font-black leading-tight mb-6">
              Prototipagem <br/> sob demanda
            </h1>
            <p className="text-[#191F37] text-[20px] leading-tight mb-12 max-w-[450px]">
              Desenvolvimento técnico de protótipos realizado pela equipe do InPETU Maker, ideal para quem precisa transformar uma ideia em modelo físico com apoio especializado.
            </p>
            
            <div className="flex gap-4">
              <button className="bg-[#D9D9D9] text-[#191F37] font-bold py-3 px-10 rounded-lg text-sm">
                Conhecer o espaço
              </button>
              <button className="bg-[#0077cc] text-white font-bold py-3 px-10 rounded-lg text-sm shadow-md">
                Solicitar orçamento
              </button>
            </div>

            {/* O DEGRAU (Curva Invertida) */}
            <div className="absolute -bottom-[60px] right-0 w-[60px] h-[60px] bg-white hidden md:block">
              <div className="w-full h-full bg-[#f4f4f4] rounded-tr-[60px]"></div>
            </div>
          </div>

          {/* Lado Direito: Imagem Hero */}
          <div className="flex-1 relative bg-white md:rounded-tr-[40px] md:rounded-br-[40px] p-10 lg:p-14">
            <div className="relative w-full h-full min-h-[450px] bg-[#D9D9D9] rounded-[40px] overflow-hidden border-2 border-[#0077cc]">
               <NextImage 
                src="/servicos/prototipagem-hero.jpg" 
                alt="Prototipagem sob demanda" 
                fill 
                className="object-cover opacity-60" 
                unoptimized 
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO COMO FUNCIONA --- */}
      <section className="max-w-[1355px] mx-auto px-10 mb-32 flex flex-col md:flex-row gap-20 items-center">
        <div className="flex-1 relative aspect-square max-w-[450px] bg-[#D9D9D9] rounded-[40px] overflow-hidden border-2 border-[#0077cc]">
          <NextImage src="/servicos/como-funciona-prototipagem.jpg" alt="Processo de prototipagem" fill className="object-cover" unoptimized />
        </div>
        <div className="flex-1">
          <h2 className="text-[#0077cc] text-[48px] font-black mb-6">Como funciona</h2>
          <div className="text-[#191F37] text-[18px] space-y-6 text-justify leading-relaxed">
            <p>A Prototipagem sob Demanda é destinada a usuários que desejam desenvolver um protótipo, mas não possuem capacitação técnica ou disponibilidade para operar os equipamentos do laboratório.</p>
            <p>Após o envio das informações do projeto, a equipe técnica realiza a análise de viabilidade, define os processos de fabricação mais adequados e executa a produção utilizando a infraestrutura do InPETU Maker.</p>
          </div>
        </div>
      </section>

      {/* --- CARDS INCLUSO / NÃO INCLUSO --- */}
      <section className="max-w-[1355px] mx-auto px-10 mb-32 relative">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Incluso */}
          <div className="flex-1 bg-white p-16 rounded-[40px] shadow-2xl z-10 border border-gray-100">
            <h3 className="text-[#191F37] text-[36px] font-black mb-8">Inclusos</h3>
            <p className="text-[#191F37] font-bold mb-6 text-sm">Ao utilizar o serviço, estão disponíveis:</p>
            <ul className="space-y-4 text-[#191F37] text-[16px] mb-12">
              <li>• Análise técnica do projeto</li>
              <li>• Avaliação de viabilidade de fabricação</li>
              <li>• Sugestão de processos e materiais adequados</li>
              <li>• Ajustes simples para adequação à fabricação</li>
              <li>• Operação das máquinas pela equipe técnica</li>
              <li>• Produção do protótipo conforme especificações aprovadas</li>
              <li>• Orientações básicas sobre acabamento e montagem</li>
            </ul>
            <button className="w-full bg-[#0077cc] text-white font-black py-4 rounded-xl">Solicitar orçamento</button>
          </div>
          {/* Não Incluso */}
          <div className="flex-1 bg-white p-16 rounded-[40px] shadow-sm mt-12 border border-gray-50">
            <h3 className="text-[#191F37] text-[32px] font-black mb-8">Não inclusos</h3>
            <p className="text-[#191F37] font-bold mb-6 text-sm">O serviço não contempla:</p>
            <ul className="space-y-4 text-[#191F37] text-[15px] opacity-70">
              <li>• Desenvolvimento completo sem participação do contratante</li>
              <li>• Projetos de engenharia detalhados</li>
              <li>• Produção em larga escala</li>
              <li>• Fornecimento ilimitado de materiais</li>
              <li>• Consultoria estratégica de negócios</li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- PRÉ-REQUISITOS --- */}
      <section className="max-w-[1355px] mx-auto px-10 mb-32 flex flex-col md:flex-row gap-16">
        <div className="flex-1">
          <h2 className="text-[#0077cc] text-[40px] font-black leading-tight mb-8">Pré-requisitos para utilização</h2>
          <p className="text-[#191F37] text-[18px] mb-10 max-w-[400px]">Para dar início ao processo, é necessário:</p>
          <div className="flex gap-4">
            <button className="bg-[#0077cc] text-white font-bold py-3 px-8 rounded-lg text-xs">Cadastrar-se</button>
            <button className="bg-white text-[#0077cc] border-2 border-[#0077cc] font-bold py-3 px-8 rounded-lg text-xs">Enviar projeto</button>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          {requisitos.map((req, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm font-bold text-[#191F37] text-[18px]">
              {req}
            </div>
          ))}
          <p className="text-[11px] text-gray-400 font-medium">
            * Orçamentos variam conforme complexidade do projeto e disponibilidade do laboratório.
          </p>
        </div>
      </section>

      {/* --- OUTROS SERVIÇOS --- */}
      <section className="max-w-[1355px] mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/servicos/uso-livre" className="group bg-white p-16 rounded-[40px] shadow-sm border border-transparent hover:border-[#0077cc]/30 transition-all text-center">
          <h3 className="text-[#191F37] text-[32px] font-black mb-4">Uso Livre</h3>
          <p className="text-gray-500 mb-8 max-w-[350px] mx-auto">Acesso aos equipamentos e espaços para quem deseja desenvolver projetos de forma autônoma.</p>
        </Link>
        <Link href="servicos/workshops" className="group bg-white p-16 rounded-[40px] shadow-sm border border-transparent hover:border-[#0077cc]/30 transition-all text-center">
          <h3 className="text-[#191F37] text-[32px] font-black mb-4">Workshops</h3>
          <p className="text-gray-500 mb-8 max-w-[350px] mx-auto">Atividades formativas para aprendizado de técnicas, ferramentas e processos de fabricação.</p>
        </Link>
      </section>

    </div>
  );
}