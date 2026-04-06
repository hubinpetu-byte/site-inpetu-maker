"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// 1. IMPORTAÇÃO DA BASE DE DADOS CENTRALIZADA
import { LISTA_DE_EVENTOS } from '../constants/eventos'; 

export default function AgendaBloco7() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  const ano = dataSelecionada.getFullYear();
  const mes = dataSelecionada.getMonth();
  const nomeMes = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(dataSelecionada);

  const mudarMes = (direcao: number) => {
    setDataSelecionada(new Date(ano, mes + direcao, 1));
  };

  // Função para definir a cor baseada no tipo (Centralizada aqui para facilitar)
  const getCorEvento = (tipo: string) => {
    switch (tipo) {
      case 'workshop': return 'bg-orange-500';
      case 'treinamento': return 'bg-blue-500';
      case 'evento': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <section className="w-full bg-[#181F37] py-20 border-t border-gray-800 text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16 items-start">
        
        {/* LADO ESQUERDO: Títulos e Legendas */}
        <div className="flex-1">
          <h2 className="text-[40px] font-black mb-8">Agenda</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-10 h-1 bg-orange-500 rounded-full"></span> 
              <span className="text-xl font-medium text-gray-300">Workshops</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-10 h-1 bg-blue-500 rounded-full"></span> 
              <span className="text-xl font-medium text-gray-300">Treinamentos</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-10 h-1 bg-yellow-500 rounded-full"></span> 
              <span className="text-xl font-medium text-gray-300">Eventos</span>
            </div>
          </div>
        </div>

        {/* LADO DIREITO: O Calendário Dinâmico */}
        <div className="flex-1 bg-[#252B45] p-8 md:p-10 rounded-[32px] shadow-2xl w-full max-w-md mx-auto">
          
          {/* Navegação de Meses */}
          <div className="flex items-center justify-between mb-10">
            <button onClick={() => mudarMes(-1)} className="p-2 hover:bg-white/10 rounded-full transition text-white">
              <ChevronLeft size={24} />
            </button>
            <div className="text-center font-black text-xl uppercase tracking-[0.2em] text-white">
              {nomeMes} <span className="text-white/30 ml-2">{ano}</span>
            </div>
            <button onClick={() => mudarMes(1)} className="p-2 hover:bg-white/10 rounded-full transition text-white">
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center">
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((diaSemana, i) => (
              <div key={`head-${i}`} className="text-gray-500 font-bold text-xs mb-2">
                {diaSemana}
              </div>
            ))}

            {(() => {
              const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
              const diasNoMes = new Date(ano, mes + 1, 0).getDate();
              const celulas = [];

              for (let x = 0; x < primeiroDiaSemana; x++) {
                celulas.push(<div key={`empty-${x}`}></div>);
              }

              for (let dia = 1; dia <= diasNoMes; dia++) {
                const hoje = new Date();
                const ehHoje = dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear();
                
                // 2. BUSCA O EVENTO NA LISTA IMPORTADA
                const evento = LISTA_DE_EVENTOS.find(
                  e => e.dia === dia && e.mes === (mes + 1) && e.ano === ano
                );

                celulas.push(
                  <div key={`day-${dia}`} className="relative group flex items-center justify-center">
                    {evento ? (
                      /* DIA COM EVENTO (Link + Tooltip) */
                      <Link href={evento.href} className="relative z-20">
                        <div className={`
                          w-10 h-10 flex items-center justify-center rounded-xl transition-all cursor-pointer text-sm font-black
                          ${ehHoje ? 'bg-[#0377CC] text-white ring-2 ring-white/20' : 'bg-white/5 text-white hover:bg-white/20'}
                          border-b-4 ${getCorEvento(evento.tipo)}
                        `}>
                          {dia}
                        </div>

                        {/* Tooltip (Aparece no Hover) */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-3 bg-white rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-50 transform group-hover:-translate-y-1">
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full text-white ${getCorEvento(evento.tipo)}`}>
                            {evento.tipo}
                          </span>
                          <p className="text-black text-xs font-bold mt-2 leading-tight">
                            {evento.nome}
                          </p>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                        </div>
                      </Link>
                    ) : (
                      /* DIA NORMAL */
                      <div className={`
                        w-10 h-10 flex items-center justify-center rounded-xl text-sm font-semibold
                        ${ehHoje ? 'bg-[#0377CC] text-white shadow-lg' : 'text-gray-400'}
                      `}>
                        {dia}
                      </div>
                    )}
                  </div>
                );
              }
              return celulas;
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}