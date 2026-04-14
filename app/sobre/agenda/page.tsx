"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// TENTE ESTE IMPORT AGORA:
import { LISTA_DE_EVENTOS } from '../../constants/eventos';

export default function AgendaPageGrande() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  const ano = dataSelecionada.getFullYear();
  const mes = dataSelecionada.getMonth();
  const nomeMes = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(dataSelecionada);

  const mudarMes = (direcao: number) => {
    setDataSelecionada(new Date(ano, mes + direcao, 1));
  };

  const getCorEvento = (tipo: string) => {
    switch (tipo) {
      case 'workshop': return 'bg-orange-500';
      case 'treinamento': return 'bg-blue-500';
      case 'evento': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <main className="w-full bg-[#f4f4f4] min-h-screen pt-[100px] pb-20 px-6">
      <div className="max-w-[1355px] mx-auto">
        
        <div className="mb-12">
          <div className="w-20 h-[3px] bg-[#E9D354] mb-4"></div>
          <h1 className="text-[#0077cc] text-[48px] font-black">Agenda de Atividades</h1>
        </div>

        {/* --- CALENDÁRIO GIGANTE --- */}
        <section className="bg-[#181F37] rounded-[40px] shadow-2xl overflow-hidden mb-20">
          
          <div className="flex items-center justify-between p-10 border-b border-white/10 bg-[#1d2542]">
            <button onClick={() => mudarMes(-1)} className="p-4 hover:bg-white/10 rounded-full text-white transition">
              <ChevronLeft size={32} />
            </button>
            <h2 className="text-white text-3xl md:text-4xl font-black uppercase tracking-[0.3em]">
              {nomeMes} <span className="opacity-30">{ano}</span>
            </h2>
            <button onClick={() => mudarMes(1)} className="p-4 hover:bg-white/10 rounded-full text-white transition">
              <ChevronRight size={32} />
            </button>
          </div>

          <div className="p-4 md:p-10">
            <div className="grid grid-cols-7 mb-4">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d) => (
                <div key={d} className="text-[#0077cc] font-bold text-center py-4 text-sm uppercase tracking-widest">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 md:gap-4">
              {(() => {
                const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
                const diasNoMes = new Date(ano, mes + 1, 0).getDate();
                const celulas = [];

                for (let x = 0; x < primeiroDiaSemana; x++) {
                  celulas.push(<div key={`empty-${x}`} className="aspect-square md:aspect-video bg-white/5 rounded-2xl opacity-10"></div>);
                }

                for (let dia = 1; dia <= diasNoMes; dia++) {
                  const hoje = new Date();
                  const ehHoje = dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear();
                  
                  // Procura o evento na lista centralizada
                  const evento = LISTA_DE_EVENTOS.find(e => e.dia === dia && e.mes === (mes + 1) && e.ano === ano);

                  celulas.push(
                    <div key={`day-${dia}`} className="group relative aspect-square md:aspect-video">
                      {evento ? (
                        <Link href={evento.href} className="w-full h-full block">
                          <div className={`w-full h-full rounded-2xl p-2 md:p-4 border-b-8 transition-all cursor-pointer flex flex-col justify-between
                            ${getCorEvento(evento.tipo)} ${ehHoje ? 'ring-4 ring-white shadow-xl scale-105' : 'hover:scale-[1.02] shadow-lg'}
                          `}>
                            <span className="text-white font-black text-xl md:text-2xl">{dia}</span>
                            <span className="text-white text-[10px] md:text-xs font-bold leading-tight hidden sm:block">
                              {evento.nome}
                            </span>
                          </div>
                        </Link>
                      ) : (
                        <div className={`w-full h-full rounded-2xl p-2 md:p-4 flex items-start transition-all
                          ${ehHoje ? 'bg-[#0377CC] text-white shadow-lg' : 'bg-white/5 text-gray-500 hover:bg-white/10'}
                        `}>
                          <span className="font-black text-xl md:text-2xl">{dia}</span>
                        </div>
                      )}
                    </div>
                  );
                }
                return celulas;
              })()}
            </div>
          </div>

          <div className="bg-[#1d2542] p-6 flex flex-wrap justify-center gap-8 border-t border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-orange-500"></span>
              <span className="text-sm font-bold text-gray-300">Workshops</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-blue-500"></span>
              <span className="text-sm font-bold text-gray-300">Treinamentos</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
              <span className="text-sm font-bold text-gray-300">Eventos</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}