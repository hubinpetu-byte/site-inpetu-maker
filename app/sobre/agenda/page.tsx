"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 1. IMPORTAÇÃO DA BASE DE DADOS CENTRALIZADA E INTERFACE
import { LISTA_DE_EVENTOS, Evento } from '../../constants/eventos';

// 🚀 IMPORTAÇÃO DO FIRESTORE PARA CONECTAR AS TURMAS DINÂMICAS
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function AgendaPageGrande() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  // 🚀 ESTADO QUE ARMAZENA A UNIÃO DOS EVENTOS ESTÁTICOS COM OS DO FIREBASE
  const [eventosCombinados, setEventosCombinados] = useState<Evento[]>(LISTA_DE_EVENTOS);

  const ano = dataSelecionada.getFullYear();
  const mes = dataSelecionada.getMonth();
  const nomeMes = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(dataSelecionada);

  const mudarMes = (direcao: number) => {
    setDataSelecionada(new Date(ano, mes + direcao, 1));
  };

  // 🚀 BUSCA DINÂMICA DE TURMAS NO FIRESTORE
  useEffect(() => {
    const buscarTurmasDoFirebase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "turmas_impressao3d"));
        const eventosBanco: Evento[] = [];

        querySnapshot.forEach((docSnap) => {
          const d = docSnap.data();
          if (d.dataISO) {
            const dataObj = new Date(d.dataISO);
            
            eventosBanco.push({
              id: docSnap.id,
              dia: dataObj.getDate(),
              mes: dataObj.getMonth() + 1, // No JavaScript, os meses vão de 0 (Jan) a 11 (Dez)
              ano: dataObj.getFullYear(),
              nome: `${d.treinamentoNome || 'Treinamento Impressão 3D'} (${dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })})`,
              tipo: 'treinamento',
              href: '/construir/treinamentos/Impressao-3d-fdm'
            });
          }
        });

        // Junta os eventos padrões locais com as novas turmas publicadas no banco
        setEventosCombinados([...LISTA_DE_EVENTOS, ...eventosBanco]);
      } catch (error) {
        console.error("Erro ao carregar eventos da agenda no Firebase:", error);
      }
    };

    buscarTurmasDoFirebase();
  }, []);

  const getCorEvento = (tipo: string) => {
    switch (tipo) {
      case 'workshop': return 'bg-orange-500';
      case 'treinamento': return 'bg-blue-500';
      case 'evento': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <main className="w-full bg-[#f4f4f4] min-h-screen pt-[100px] pb-20 px-6 font-sans">
      <div className="max-w-[1355px] mx-auto">
        
        {/* CABEÇALHO */}
        <div className="mb-12">
          <div className="w-20 h-[3px] bg-[#E9D354] mb-4"></div>
          <h1 className="text-[#0077cc] text-[48px] font-black tracking-tight">Agenda de Atividades</h1>
        </div>

        {/* --- CALENDÁRIO GIGANTE DINÂMICO --- */}
        <section className="bg-[#181F37] rounded-[40px] shadow-2xl overflow-hidden mb-20">
          
          {/* NAVEGAÇÃO DE MESES */}
          <div className="flex items-center justify-between p-10 border-b border-white/10 bg-[#1d2542]">
            <button onClick={() => mudarMes(-1)} className="p-4 hover:bg-white/10 rounded-full text-white transition cursor-pointer">
              <ChevronLeft size={32} />
            </button>
            <h2 className="text-white text-3xl md:text-4xl font-black uppercase tracking-[0.3em]">
              {nomeMes} <span className="opacity-30 ml-2">{ano}</span>
            </h2>
            <button onClick={() => mudarMes(1)} className="p-4 hover:bg-white/10 rounded-full text-white transition cursor-pointer">
              <ChevronRight size={32} />
            </button>
          </div>

          {/* GRID DOS DIAS DA SEMANA E DIAS DO MÊS */}
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

                // Espaços vazios antes do primeiro dia do mês
                for (let x = 0; x < primeiroDiaSemana; x++) {
                  celulas.push(<div key={`empty-${x}`} className="aspect-square md:aspect-video bg-white/5 rounded-2xl opacity-10"></div>);
                }

                // Renderiza cada dia do mês
                for (let dia = 1; dia <= diasNoMes; dia++) {
                  const hoje = new Date();
                  const ehHoje = dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear();
                  
                  // 🚀 PROCURA O EVENTO NA LISTA COMBINADA (LOCAL + FIREBASE)
                  const evento = eventosCombinados.find(e => e.dia === dia && e.mes === (mes + 1) && e.ano === ano);

                  celulas.push(
                    <div key={`day-${dia}`} className="group relative aspect-square md:aspect-video">
                      {evento ? (
                        /* DIA COM EVENTO (LINK COM CARD DESTACADO + DETALHES) */
                        <Link href={evento.href} className="w-full h-full block">
                          <div className={`w-full h-full rounded-2xl p-2 md:p-4 border-b-8 transition-all cursor-pointer flex flex-col justify-between
                            ${getCorEvento(evento.tipo)} ${ehHoje ? 'ring-4 ring-white shadow-xl scale-105' : 'hover:scale-[1.02] shadow-lg'}
                          `}>
                            <span className="text-white font-black text-xl md:text-2xl">{dia}</span>
                            <span className="text-white text-[10px] md:text-xs font-bold leading-tight hidden sm:block truncate">
                              {evento.nome}
                            </span>
                          </div>
                        </Link>
                      ) : (
                        /* DIA NORMAL SEM EVENTOS */
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

          {/* LEGENDA DE CORES */}
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