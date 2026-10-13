"use client";

import React, { useEffect, useState } from 'react';
import { Clock, BarChart, History, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { treinamentosData, Treinamento } from './data';

// 🚀 IMPORTAÇÃO DO FIRESTORE PARA CARREGAMENTO DINÂMICO
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function PaginaTreinamentosTecnicos() {
  const [listaTreinamentos, setListaTreinamentos] = useState<Treinamento[]>(treinamentosData);
  const [carregando, setCarregando] = useState(true);

  // 🚀 BUSCA TREINAMENTOS PUBLICADOS NO FIREBASE FIRESTORE
  useEffect(() => {
    const buscarTreinamentosDoBanco = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "treinamentos_catalog"));
        
        if (!querySnapshot.empty) {
          const dadosBanco: Treinamento[] = [];
          querySnapshot.forEach((docSnap) => {
            const d = docSnap.data();
            dadosBanco.push({
              id: docSnap.id,
              titulo: d.titulo || "Treinamento Técnico",
              categoria: d.categoria || "Fabricação Digital",
              status: d.status || "Inscrições Abertas",
              descricao: d.descricao || "Capacitação técnica para operação de máquinas no InPETU Maker.",
              duracao: d.duracao || "2h 0m",
              nivel: d.nivel || "Iniciante",
              imagem: d.imagem || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600",
              linkAgendamento: d.linkAgendamento || "/construir/treinamentos/Impressao-3d-fdm",
              dataRealizacao: d.dataTurma || d.dataRealizacao,
              ativo: d.ativo !== undefined ? d.ativo : true
            });
          });

          // Unifica turmas do banco com dados padrão locais
          setListaTreinamentos(dadosBanco);
        }
      } catch (error) {
        console.error("Erro ao carregar treinamentos do Firebase:", error);
      } finally {
        setCarregando(false);
      }
    };

    buscarTreinamentosDoBanco();
  }, []);

  // 🚀 SEPARAÇÃO ENTRE TURMAS ATIVAS E HISTÓRICO
  const treinamentosVisiveis = listaTreinamentos.filter(item => item.ativo);

  const turmasAtivas = treinamentosVisiveis.filter(item => item.status !== "Concluído");
  const turmasAnteriores = treinamentosVisiveis.filter(item => item.status === "Concluído");

  // 🎨 FUNÇÃO AUXILIAR: Cor do Badge de Status
  const getCorStatus = (status: string) => {
    switch (status) {
      case "Inscrições Abertas":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Não iniciado":
      case "Em Breve":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Vagas Esgotadas":
      case "Em Andamento":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Concluído":
        return "bg-blue-50 text-[#0077CC] border-blue-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen pt-28 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* 1. TÍTULO PRINCIPAL (Pílula Azul) */}
        <div className="w-full bg-[#0077CC] text-white py-5 px-8 rounded-2xl shadow-md flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Treinamentos Técnicos & Capacitações
            </h1>
            <p className="text-xs md:text-sm text-blue-100 mt-1 font-medium">
              Obtenha habilitação oficial para operar equipamentos no formato Uso Livre.
            </p>
          </div>
        </div>

        {/* 2. SEÇÃO: PRÓXIMAS TURMAS / TURMAS ATIVAS */}
        <section className="space-y-6">
          <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
            <h2 className="text-xl font-black text-[#191F37] uppercase tracking-wider flex items-center gap-2">
              <Clock size={20} className="text-[#0077CC]" /> Turmas Disponíveis & Em Breve
            </h2>
            <span className="text-xs font-bold text-gray-400">
              {turmasAtivas.length} {turmasAtivas.length === 1 ? 'curso' : 'cursos'}
            </span>
          </div>

          {carregando ? (
            <div className="py-12 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0077CC] mx-auto"></div>
              <p className="text-xs text-gray-400 mt-3 font-medium">Carregando catálogo de treinamentos...</p>
            </div>
          ) : turmasAtivas.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 shadow-xs">
              <p className="text-gray-500 font-medium text-sm">Não há novas turmas abertas no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {turmasAtivas.map((item: Treinamento) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100/80 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
                >
                  <div>
                    {/* Imagem do Card */}
                    <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                      <img 
                        src={item.imagem} 
                        alt={item.titulo} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Conteúdo Interno do Card */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-[#0077CC] uppercase tracking-wider">
                          {item.categoria}
                        </span>

                        <span className={`px-2.5 py-1 rounded-full border ${getCorStatus(item.status)}`}>
                          {item.status}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#191F37] leading-snug">
                        {item.titulo}
                      </h3>

                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                        {item.descricao}
                      </p>

                      <div className="flex items-center gap-6 pt-2 text-xs font-semibold text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-gray-400" />
                          <span>{item.duracao}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <BarChart size={14} className="text-gray-400" />
                          <span>{item.nivel}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botão de Agendamento */}
                  <div className="p-6 pt-0">
                    <Link href={item.linkAgendamento}>
                      <button 
                        disabled={item.status === "Vagas Esgotadas"}
                        className="w-full bg-[#0077CC] hover:bg-[#0066b3] text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-xs active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {item.status === "Vagas Esgotadas" ? "Turma Cheia" : "Agendar Habilitação"}
                      </button>
                    </Link>
                  </div>

                </div>
              ))}
            </div>
          )}
        </section>

        {/* 3. 🚀 SEÇÃO: HISTÓRICO DE TURMAS CONCLUÍDAS */}
        {turmasAnteriores.length > 0 && (
          <section className="space-y-6 pt-8">
            <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <History size={20} className="text-gray-500" /> Histórico de Turmas Anteriores
              </h2>
              <span className="text-xs font-bold text-gray-400">
                {turmasAnteriores.length} {turmasAnteriores.length === 1 ? 'turma realizada' : 'turmas realizadas'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {turmasAnteriores.map((item: Treinamento) => (
                <div 
                  key={item.id}
                  className="bg-white/80 rounded-2xl p-5 border border-gray-200/80 shadow-xs flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0077CC] flex items-center justify-center shrink-0 font-bold">
                    <CheckCircle2 size={22} />
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md uppercase">
                      Realizado
                    </span>
                    <h4 className="font-bold text-sm text-slate-800 truncate">{item.titulo}</h4>
                    {item.dataRealizacao && (
                      <p className="text-xs text-gray-400 font-medium">Data: {item.dataRealizacao}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}