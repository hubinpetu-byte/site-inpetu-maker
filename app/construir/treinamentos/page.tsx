"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { treinamentosData } from './data';

export default function TreinamentosPage() {
  // Estado para controlar qual treinamento está aberto no modal
  const [modalTreinamento, setModalTreinamento] = useState<any>(null);

  return (
    <div className="w-full bg-white pt-[160px] pb-20">
      
      {/* 1. TÍTULO PRINCIPAL (ESTILO PÍLULA) */}
      <section className="max-w-[1355px] mx-auto px-6 mb-12">
        <div className="w-full bg-[#0077cc] rounded-full py-5 px-12 shadow-lg flex items-center">
          <h1 className="text-white text-[32px] font-extrabold uppercase tracking-wide">
            Treinamento técnico
          </h1>
        </div>
      </section>

      {/* 2. GRID DE CARDS DE TREINAMENTOS */}
      <section className="max-w-[1355px] mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {treinamentosData.map((t) => (
            <div 
              key={t.id} 
              onClick={() => setModalTreinamento(t)}
              className="group relative h-[320px] rounded-2xl overflow-hidden shadow-lg cursor-pointer border-2 border-transparent hover:border-[#0077cc] transition-all"
            >
              {/* Imagem de Fundo com Gradiente para legibilidade do texto */}
              <div className="absolute inset-0 bg-gray-200">
                <Image 
                  src={t.imagem} 
                  alt={t.nome} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  unoptimized 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#191F37] via-transparent to-transparent opacity-90"></div>
              </div>
              
              {/* Texto do Card (Inferior) */}
              <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                <h3 className="text-[24px] font-black leading-tight mb-1">{t.nome}:</h3>
                <p className="text-[14px] font-medium opacity-90 italic">{t.especificacao}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MODAL DE DETALHES (POP-UP) */}
      {modalTreinamento && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[1100px] rounded-[20px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row min-h-[650px] animate-in zoom-in duration-300">
            
            {/* Botão para fechar o Modal */}
            <button 
              onClick={() => setModalTreinamento(null)} 
              className="absolute top-8 right-8 text-gray-400 hover:text-black z-20 text-2xl font-bold"
            >
              ✕
            </button>

            {/* COLUNA DA ESQUERDA: Informações e Agendamento */}
            <div className="flex-1 p-12 overflow-y-auto max-h-[90vh]">
              <h2 className="text-[#191F37] text-[32px] font-black leading-tight">
                {modalTreinamento.nome}:
              </h2>
              <p className="text-[#191F37] text-[22px] font-bold mb-8">
                {modalTreinamento.especificacao}
              </p>

              <div className="text-[#333333] mb-8">
                <p className="font-bold mb-4">{modalTreinamento.descricaoLonga}</p>
                <ul className="list-disc pl-6 mb-6 font-bold space-y-1">
                  {modalTreinamento.equipamentos?.map((eq: string, i: number) => (
                    <li key={i}>{eq}</li>
                  ))}
                </ul>
                <p className="text-[15px] leading-relaxed text-justify whitespace-pre-line">
                  {modalTreinamento.textoAdicional}
                </p>
              </div>

              {/* Seção de Datas Estilizada */}
              <h4 className="text-[#191F37] font-black text-[20px] mb-6">
                Próximas datas disponíveis
              </h4>
              <div className="flex flex-wrap gap-4 mb-10">
                {modalTreinamento.proximasDatas?.map((data: any, i: number) => (
                  <div key={i} className="w-[160px] border-2 border-[#0077cc] rounded-2xl p-4 flex flex-col items-center justify-between min-h-[190px] shadow-sm">
                    <span className="text-gray-500 text-[14px] font-bold ">{data.semana}</span>
                    <div className="text-center">
                      <span className="block text-[48px] font-black text-[#191F37] leading-none">{data.dia}</span>
                      <span className="text-[24px] font-black text-[#191F37]">{data.mes}</span>
                    </div>
                    <button className="w-full bg-[#0077cc] text-white font-bold py-2 rounded-lg text-xs hover:bg-[#0377CC] transition-colors">
                      Agendar
                    </button>
                  </div>
                ))}
              </div>

              <button className="bg-[#E9D354] text-[#191F37] font-black py-4 px-12 rounded-xl w-full md:w-auto hover:bg-[#d4c04d] transition-all shadow-md">
                Entre em contato
              </button>
            </div>

            {/* COLUNA DA DIREITA: Lembretes (Fundo Azul Claro) */}
            <div className="md:w-[360px] bg-[#E1EEF7] p-12 flex flex-col">
              <h3 className="text-[#191F37] font-black text-[22px] mb-8">
                Lembretes:
              </h3>
              <ul className="space-y-8">
                {modalTreinamento.lembretes?.map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 text-[#191F37] text-[15px] leading-relaxed font-medium">
                    <span className="text-2xl leading-none">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}