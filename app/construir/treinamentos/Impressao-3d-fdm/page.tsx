"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, CheckCircle2, Calendar as CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import { treinamentoImpressao3DData } from './data';

// 🚀 IMPORTAÇÕES DO FIREBASE (Autenticação e Firestore)
import { auth, db } from '@/lib/firebase'; 
import { collection, addDoc, getDocs } from 'firebase/firestore';

interface Turma3DItem {
  id: string;
  treinamentoId?: string;
  treinamentoNome?: string;
  dataISO: string;
  dataFormatada: string;
  vagasTotais: number;
  status: string;
}

export default function PaginaTreinamentoImpressao3D() {
  const dados = treinamentoImpressao3DData;

  const [itemAberto, setItemAberto] = useState<number | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [inscricaoSucesso, setInscricaoSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  // 🚀 ESTADO DE TURMAS DINÂMICAS CADASTRADAS PELO ADMIN NO FIRESTORE
  const [turmasDisponiveis, setTurmasDisponiveis] = useState<Turma3DItem[]>([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState<Turma3DItem | null>(null);

  const [formDados, setFormDados] = useState({ nome: '', email: '', matricula: '' });

  // 🚀 BUSCA TODAS AS TURMAS DE IMPRESSÃO 3D ABERTAS NO FIRESTORE
  const carregarTurmasDoBanco = async () => {
    try {
      const querySnap = await getDocs(collection(db, "turmas_impressao3d"));
      const lista: Turma3DItem[] = [];

      querySnap.forEach((docSnap) => {
        const d = docSnap.data() as Turma3DItem;
        // Filtra para mostrar turmas da Impressão 3D (ou todas as ativas)
        if (!d.treinamentoId || d.treinamentoId === "impressao-3d") {
          lista.push({ ...d, id: docSnap.id });
        }
      });

      // Ordena pelas datas mais próximas no calendário
      lista.sort((a, b) => new Date(a.dataISO).getTime() - new Date(b.dataISO).getTime());

      setTurmasDisponiveis(lista);
      if (lista.length > 0) {
        setTurmaSelecionada(lista[0]);
      }
    } catch (error) {
      console.error("Erro ao buscar turmas no Firebase:", error);
    }
  };

  useEffect(() => {
    carregarTurmasDoBanco();
  }, []);

  const toggleAcordeao = (index: number) => {
    setItemAberto(itemAberto === index ? null : index);
  };

  const handleScrollParaAgenda = () => {
    const elemento = document.getElementById('secao-agendamento');
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 🚀 DISPARO DA PRÉ-INSCRIÇÃO COM STATUS "PAGAMENTO PENDENTE" E INTEGRAÇÃO À API NATIVA
  const handleFinalizarInscricao = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turmaSelecionada) {
      alert("Por favor, selecione uma turma disponível.");
      return;
    }

    setCarregando(true);

    try {
      const usuarioLogado = auth.currentUser;

      // 1. Salva a solicitação no Firebase Firestore com status de Pagamento Pendente
      await addDoc(collection(db, "inscricoes_treinamentos"), {
        uid_aluno: usuarioLogado ? usuarioLogado.uid : "usuario_visitante",
        nome_aluno: formDados.nome,
        email_aluno: formDados.email,
        matricula_aluno: formDados.matricula || "Não informada",
        treinamento_id: "impressao-3d",
        treinamento_nome: dados.titulo,
        turma_id: turmaSelecionada.id,
        turma_data: turmaSelecionada.dataFormatada,
        data_inscricao: new Date().toISOString(),
        status_participacao: "Pagamento Pendente",
        valor_treinamento: dados.preco
      });

      // 2. 🚀 CHAMA A NOSSA ROTA DE API INTERNA DO NEXT.JS (/api/enviar-email)
      const respostaAPI = await fetch('/api/enviar-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailAluno: formDados.email,
          nomeAluno: formDados.nome,
          treinamentoNome: dados.titulo,
          turmaData: turmaSelecionada.dataFormatada,
          preco: dados.preco
        })
      });

      if (respostaAPI.ok) {
        console.log("✅ Pré-inscrição registrada e enviada para a API interna com sucesso!");
        setInscricaoSucesso(true);
      } else {
        throw new Error("Erro na resposta da API interna.");
      }

    } catch (error: any) {
      console.error("Erro ao processar pré-inscrição:", error);
      alert("Houve um erro ao registrar sua pré-inscrição. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen pt-28 font-sans text-[#191F37]">
      <div className="max-w-6xl mx-auto px-6 space-y-20 pb-20">

        {/* 1. SEÇÃO HERO / BANNER PRINCIPAL */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block bg-[#E5F2FF] text-[#0077CC] text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
              {dados.categoria}
            </span>

            <h1 className="text-3xl md:text-5xl font-black text-[#191F37] leading-tight">
              {dados.titulo}
            </h1>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify">
              {dados.descricao}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={handleScrollParaAgenda}
                className="bg-[#0077CC] hover:bg-[#0066b3] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer"
              >
                Ver turmas abertas
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-[340px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800" 
                alt="Impressão 3D FDM"
                className="w-full h-full object-cover"
              />
            </div>

            {/* CARD FLUTUANTE QUE MOSTRA A PRÓXIMA TURMA CADASTRADA */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/50 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Próxima turma:</p>
                <p className="text-sm md:text-base font-extrabold text-[#191F37]">
                  {turmasDisponiveis.length > 0 ? turmasDisponiveis[0].dataFormatada : "Em breve novas datas"}
                </p>
                <span className="inline-block mt-1 text-[10px] bg-blue-50 text-[#0077CC] font-bold px-2 py-0.5 rounded-md uppercase">
                  {turmasDisponiveis.length > 0 ? `${turmasDisponiveis.length} turma(s) no calendário` : "Aguardando agenda"}
                </span>
              </div>
              <button 
                onClick={handleScrollParaAgenda}
                className="w-10 h-10 rounded-full bg-[#0077CC] text-white flex items-center justify-center hover:bg-[#0066b3] transition-all shadow-sm shrink-0 cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* 2. CONTEÚDO PROGRAMÁTICO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl font-black text-[#0077CC] leading-snug">
              Fazendo o Treinamento você vai:
            </h2>
            <div className="space-y-3">
              {dados.oQueVaiAprender.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#0077CC] shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-gray-700 font-medium leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-black text-[#0077CC] uppercase tracking-wider">Conteúdo Programático</h3>
              <p className="text-xs text-gray-400 font-medium mt-1">Clique nos tópicos abaixo para ver os detalhes</p>
            </div>

            <div className="space-y-3">
              {dados.conteudoProgramatico.map((item, index) => {
                const estaAberto = itemAberto === index;
                return (
                  <div key={index} className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-200">
                    <button onClick={() => toggleAcordeao(index)} className={`w-full p-4 text-left flex items-center justify-between transition-colors cursor-pointer ${
                      estaAberto ? 'bg-blue-50/50 text-[#0077CC]' : 'bg-gray-50/50 text-[#191F37] hover:bg-gray-100/60'
                    }`}>
                      <span className="text-xs md:text-sm font-bold flex items-center gap-2">
                        <span className="text-[10px] bg-[#0077CC]/10 text-[#0077CC] px-2 py-0.5 rounded-md">0{index + 1}</span>
                        {item.topico}
                      </span>
                      <ChevronDown size={18} className={`transition-transform duration-300 ${estaAberto ? 'rotate-180 text-[#0077CC]' : 'text-gray-400'}`} />
                    </button>
                    {estaAberto && (
                      <div className="p-4 bg-white text-xs text-gray-600 leading-relaxed border-t border-gray-100">{item.detalhes}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </div>

      {/* 🚀 3. BLOCO DE AGENDAMENTO COM AS TURMAS DINÂMICAS CADASTRADAS PELO ADMIN */}
      <section id="secao-agendamento" className="w-full bg-[#0077CC] text-white py-24 md:py-32 px-6 shadow-2xl">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="max-w-2xl space-y-4">
            <span className="inline-block bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-widest border border-white/20">
              Inicie sua Habilitação
            </span>
            
            <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
              Agende seu Treinamento
            </h2>
            <p className="text-sm md:text-base text-blue-100 leading-relaxed">
              Aprenda a operar a impressora 3D com segurança e autonomia no InPETU Maker.
              Selecione abaixo a turma e horário que melhor se adapta à sua rotina:
            </p>
          </div>

          {/* 🚀 LISTA DOS BLOCOS DE DATAS CADASTRADOS NO FIRESTORE */}
          {turmasDisponiveis.length === 0 ? (
            <div className="p-6 rounded-2xl bg-white/10 border border-white/20 text-blue-100 text-sm italic">
              Não há turmas abertas no momento. A equipe do InPETU Maker publicará novos horários em breve!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {turmasDisponiveis.map((turma) => (
                <div 
                  key={turma.id}
                  className="bg-white text-[#191F37] p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-4 border border-white/40 hover:scale-[1.02] transition-all"
                >
                  <div className="space-y-2">
                    <span className="inline-block text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md">
                      {turma.status || "Inscrições Abertas"}
                    </span>

                    <div className="flex items-center gap-2 pt-1 text-[#0077CC]">
                      <CalendarIcon size={18} />
                      <h4 className="font-black text-sm md:text-base">{turma.dataFormatada}</h4>
                    </div>

                    <p className="text-xs text-gray-500 font-medium">
                      Vagas da turma: <b>{turma.vagasTotais} vagas</b>
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setTurmaSelecionada(turma);
                      setModalAberto(true);
                    }}
                    className="w-full bg-[#E9D354] hover:bg-[#d8c243] text-[#191F37] font-black text-xs uppercase tracking-wider py-3.5 rounded-xl transition shadow-md cursor-pointer"
                  >
                    Garantir Vaga Nesta Turma
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 🚀 MODAL DE PRÉ-INSCRIÇÃO */}
      {modalAberto && turmaSelecionada && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-6 relative border border-gray-100 text-[#191F37]">
            
            <button 
              onClick={() => { setModalAberto(false); setInscricaoSucesso(false); }} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer"
            >
              ✕
            </button>

            {!inscricaoSucesso ? (
              <>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0077CC] bg-blue-50 px-2.5 py-1 rounded-md">
                    Pré-Inscrição de Treinamento
                  </span>
                  <h3 className="text-xl font-bold text-[#191F37] mt-2">
                    Solicitar Vaga no Treinamento
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Turma selecionada: <strong className="text-[#0077CC]">{turmaSelecionada.dataFormatada}</strong>
                  </p>
                </div>

                <form onSubmit={handleFinalizarInscricao} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nome Completo</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Ex: Ana Silva" 
                      value={formDados.nome} 
                      onChange={(e) => setFormDados({...formDados, nome: e.target.value})} 
                      className="w-full border border-gray-200 rounded-xl p-3 text-xs outline-none focus:border-[#0077CC]" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">E-mail Institucional / Pessoal</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="seu.email@ufsc.br" 
                      value={formDados.email} 
                      onChange={(e) => setFormDados({...formDados, email: e.target.value})} 
                      className="w-full border border-gray-200 rounded-xl p-3 text-xs outline-none focus:border-[#0077CC]" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Matrícula (Opcional)</label>
                    <input 
                      type="text" 
                      placeholder="Ex: 202400123" 
                      value={formDados.matricula} 
                      onChange={(e) => setFormDados({...formDados, matricula: e.target.value})} 
                      className="w-full border border-gray-200 rounded-xl p-3 text-xs outline-none focus:border-[#0077CC]" 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={carregando} 
                    className="w-full bg-[#0077CC] hover:bg-[#0066b3] text-white font-bold text-xs py-4 rounded-xl transition-all shadow-md mt-2 cursor-pointer disabled:opacity-50"
                  >
                    {carregando ? "Enviando instruções de pagamento..." : `Receber Instruções de Pagamento (${dados.preco})`}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-blue-100 text-[#0077CC] rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✉
                </div>
                <h3 className="text-xl font-bold text-[#191F37]">Pré-Inscrição Registrada!</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Enviamos um e-mail para <strong>{formDados.email}</strong> com as instruções para o pagamento. Sua vaga na turma de <strong>{turmaSelecionada.dataFormatada}</strong> será confirmada assim que a equipe validar o PIX/GRU!
                </p>
                <button 
                  onClick={() => { setModalAberto(false); setInscricaoSucesso(false); }} 
                  className="bg-[#191F37] text-white font-bold text-xs px-6 py-3 rounded-xl hover:bg-gray-800 transition-all cursor-pointer"
                >
                  Entendi
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </main>
  );
}