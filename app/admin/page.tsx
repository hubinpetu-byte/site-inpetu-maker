"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, getDocs, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { 
  ShieldCheck, Users, Search, Check, X, 
  BarChart3, Award, Calendar, Clock, CheckCircle2,
  CheckSquare, AlertOctagon, Star
} from "lucide-react";

interface ReservaData {
  maquina: string;
  data: string;
  horario: string;
  status?: string;
}

interface AlunoData {
  uid: string;
  nome: string;
  email: string;
  tipoUsuario: string;
  role: string;
  habilitacoes: string[];
  proximasReservas?: ReservaData[];
  historico?: Array<{ maquina: string; data: string; horas: number; avaliacao?: number; status?: string }>;
}

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alunos, setAlunos] = useState<AlunoData[]>([]);
  const [busca, setBusca] = useState("");
  
  const [abaAtiva, setAbaAtiva] = useState<"habilitacoes" | "historico">("habilitacoes");
  const [alunoSelecionadoHistorico, setAlunoSelecionadoHistorico] = useState<AlunoData | null>(null);

  const listaMaquinas = [
    "Impressão 3D FDM",
    "Corte à laser",
    "Router CNC",
    "Marcenaria",
    "Vacuform"
  ];

  const carregarDadosDoBanco = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const lista: AlunoData[] = [];
      querySnapshot.forEach((doc) => {
        lista.push(doc.data() as AlunoData);
      });
      setAlunos(lista);
      
      if (alunoSelecionadoHistorico) {
        const updated = lista.find(a => a.uid === alunoSelecionadoHistorico.uid);
        if (updated) setAlunoSelecionadoHistorico(updated);
      } else if (lista.length > 0) {
        setAlunoSelecionadoHistorico(lista[0]);
      }
    } catch (error) {
      console.error("Erro ao carregar dados dos usuários:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const docRef = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(docRef);

          if (snap.exists() && snap.data().role === "admin") {
            setIsAdmin(true);
            await carregarDadosDoBanco();
          } else {
            router.push("/perfil");
          }
        } catch (error) {
          console.error("Erro ao carregar dados do admin:", error);
        }
      } else {
        router.push("/auth");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, alunoSelecionadoHistorico?.uid]);

  async function toggleHabilitacao(alunoUid: string, maquina: string, jaHabilitado: boolean) {
    try {
      const alunoRef = doc(db, "users", alunoUid);
      if (jaHabilitado) {
        await updateDoc(alunoRef, { habilitacoes: arrayRemove(maquina) });
      } else {
        await updateDoc(alunoRef, { habilitacoes: arrayUnion(maquina) });
      }
      await carregarDadosDoBanco();
    } catch (error) {
      console.error("Erro ao atualizar habilitação:", error);
    }
  }

  async function concluirReservaDoAluno(alunoUid: string, reserva: ReservaData, marcarComoFalta = false) {
    try {
      const alunoRef = doc(db, "users", alunoUid);

      await updateDoc(alunoRef, {
        proximasReservas: arrayRemove(reserva)
      });

      if (!marcarComoFalta) {
        const inputHoras = prompt(`[Passo 1/2] Quantas horas o aluno utilizou a máquina?\nReserva original: ${reserva.horario}`, "1");
        const horasEfetivas = parseInt(inputHoras || "1") || 1;

        const inputNota = prompt(`[Passo 2/2] Avalie o comportamento do aluno e o cuidado com a máquina:\nDigite uma nota de 1 a 5 estrelas:`, "5");
        let notaAvaliacao = parseInt(inputNota || "5") || 5;
        
        if (notaAvaliacao < 1) notaAvaliacao = 1;
        if (notaAvaliacao > 5) notaAvaliacao = 5;

        await updateDoc(alunoRef, {
          historico: arrayUnion({
            maquina: reserva.maquina,
            data: reserva.data,
            horas: horasEfetivas,
            avaliacao: notaAvaliacao,
            status: "Concluído"
          })
        });
        alert(`Atendimento concluído!\n${horasEfetivas}h computadas • Nota ${notaAvaliacao}/5 enviada.`);
      } else {
        await updateDoc(alunoRef, {
          historico: arrayUnion({
            maquina: reserva.maquina,
            data: reserva.data,
            horas: 0,
            avaliacao: 0,
            status: "Não Compareceu (Falta)"
          })
        });
        alert("Falta registrada no sistema.");
      }

      await carregarDadosDoBanco();
    } catch (error) {
      console.error("Erro ao validar e concluir atendimento:", error);
      alert("Erro ao conectar com o banco de dados.");
    }
  }

  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    aluno.email?.toLowerCase().includes(busca.toLowerCase())
  );

  const totalUsuarios = alunos.length;
  const totalDeUsosGerais = alunos.reduce((acc, aluno) => acc + (aluno.historico?.length || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0077cc]"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 pt-[120px] font-sans">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* CABEÇALHO COM BOTÃO DA AGENDA SEMANAL */}
        <div className="bg-[#191F37] rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">Painel de Controle Maker</h1>
              <p className="opacity-80 font-medium text-xs md:text-sm mt-0.5">Gerenciamento operacional, permissões e histórico analítico</p>
            </div>
          </div>

          {/* 🚀 BOTÃO DA AGENDA SEMANAL */}
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 bg-[#0077cc] hover:bg-[#0066b3] text-white font-black text-xs uppercase tracking-widest py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-[0.98] shrink-0"
          >
            <Calendar size={16} />
            Ver Agenda Semanal
          </button>
        </div>

        {/* MÉTRICAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0077cc] flex items-center justify-center shrink-0">
              <Users size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Makers Cadastrados</p>
              <p className="text-2xl font-black text-slate-800">{totalUsuarios}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
              <Award size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Habilitados</p>
              <p className="text-2xl font-black text-slate-800">
                {alunos.reduce((acc, aluno) => acc + (aluno.habilitacoes?.length || 0), 0)}
              </p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <BarChart3 size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Usos Totais do Maker</p>
              <p className="text-2xl font-black text-slate-800">{totalDeUsosGerais}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Média de Usos/Aluno</p>
              <p className="text-2xl font-black text-slate-800">
                {totalUsuarios > 0 ? (totalDeUsosGerais / totalUsuarios).toFixed(1) : 0}
              </p>
            </div>
          </div>
        </div>

        {/* SUBABAS */}
        <div className="flex border-b border-gray-200 mb-8 gap-6">
          <button
            onClick={() => setAbaAtiva("habilitacoes")}
            className={`pb-3 font-bold text-sm uppercase tracking-wider border-b-2 transition-all ${
              abaAtiva === "habilitacoes" ? "border-b-2 border-[#0077cc] text-[#0077cc]" : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Controle de Habilitações
          </button>
          <button
            onClick={() => setAbaAtiva("historico")}
            className={`pb-3 font-bold text-sm uppercase tracking-wider border-b-2 transition-all ${
              abaAtiva === "historico" ? "border-b-2 border-[#0077cc] text-[#0077cc]" : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Métricas e Histórico por Aluno
          </button>
        </div>

        {/* FILTRO DE BUSCA */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row justify-between gap-4 items-center">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">
            Resultados filtrados: {alunosFiltrados.length} usuários
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Pesquisar maker..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs pl-9 pr-4 py-2.5 rounded-xl focus:outline-none"
            />
          </div>
        </div>

        {/* SUBABA 1: HABILITAÇÕES */}
        {abaAtiva === "habilitacoes" && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-xs text-slate-400 font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Estudante / Vínculo</th>
                    <th className="px-6 py-4">Controle de Habilitações (Clique para Alternar)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {alunosFiltrados.map((aluno) => (
                    <tr key={aluno.uid} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-black text-slate-800">{aluno.nome}</div>
                        <div className="text-xs text-slate-400 font-medium">{aluno.email} • <span className="lowercase">{aluno.tipoUsuario || "acadêmico"}</span></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {listaMaquinas.map((maq) => {
                            const jaHabilitado = aluno.habilitacoes?.includes(maq);
                            return (
                              <button
                                key={maq}
                                onClick={() => toggleHabilitacao(aluno.uid, maq, jaHabilitado)}
                                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all border ${
                                  jaHabilitado ? "bg-green-50 border-green-200 text-green-700 shadow-sm" : "bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100"
                                }`}
                              >
                                {jaHabilitado ? <Check size={12} strokeWidth={3} /> : <X size={12} />}
                                {maq}
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBABA 2: HISTÓRICO E VALIDAÇÃO */}
        {abaAtiva === "historico" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Lateral Alunos */}
            <div className="lg:col-span-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm max-h-[550px] overflow-y-auto space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">Selecione o Aluno</p>
              {alunosFiltrados.map((aluno) => (
                <button
                  key={aluno.uid}
                  onClick={() => setAlunoSelecionadoHistorico(aluno)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${
                    alunoSelecionadoHistorico?.uid === aluno.uid ? "border-[#0077cc] bg-blue-50/40" : "border-transparent hover:bg-slate-50"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs shrink-0">
                    {aluno.nome ? aluno.nome.charAt(0).toUpperCase() : "M"}
                  </div>
                  <div className="truncate">
                    <h4 className="font-bold text-xs text-slate-800 truncate">{aluno.nome}</h4>
                    <p className="text-[11px] text-gray-400 truncate">{aluno.email}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Painel Analítico */}
            <div className="lg:col-span-8 space-y-6">
              {alunoSelecionadoHistorico ? (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm min-h-[550px]">
                  
                  {/* Perfil Topo */}
                  <div className="border-b border-gray-100 pb-5 mb-6 flex justify-between items-start flex-wrap gap-4">
                    <div>
                      <h2 className="text-xl font-black text-slate-800">{alunoSelecionadoHistorico.nome}</h2>
                      <p className="text-xs text-gray-400 font-medium">{alunoSelecionadoHistorico.email} • <span className="lowercase">{alunoSelecionadoHistorico.tipoUsuario}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Máquinas Liberadas</p>
                      <p className="text-lg font-black text-[#0077cc]">{alunoSelecionadoHistorico.habilitacoes?.length || 0} / {listaMaquinas.length}</p>
                    </div>
                  </div>

                  {/* Agendamentos Pendentes */}
                  <div className="mb-8">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Calendar size={14} className="text-[#0077cc]" /> Agendamentos Pendentes de Validação
                    </h3>
                    {!alunoSelecionadoHistorico.proximasReservas || alunoSelecionadoHistorico.proximasReservas.length === 0 ? (
                      <p className="text-xs text-gray-400 italic bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">Nenhum agendamento futuro ativo no perfil deste aluno.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {alunoSelecionadoHistorico.proximasReservas.map((res, index) => (
                          <div key={index} className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between min-h-[160px]">
                            <div>
                              <h4 className="font-bold text-xs text-slate-800 mb-2 uppercase tracking-tight">{res.maquina}</h4>
                              <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-0.5">
                                <Calendar size={12} /> <span>Data: {res.data}</span>
                              </div>
                              <div className="flex items-center gap-1 text-[11px] text-gray-500">
                                <Clock size={12} /> <span>Horário: {res.horario}</span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mt-4 border-t border-slate-50 pt-3">
                              <button
                                onClick={() => concluirReservaDoAluno(alunoSelecionadoHistorico.uid, res, false)}
                                className="flex items-center justify-center gap-1 bg-[#0077cc] text-white font-bold text-[10px] uppercase py-2 rounded-lg hover:bg-[#005fa3] transition active:scale-95"
                              >
                                <CheckSquare size={12} /> Concluir Uso
                              </button>
                              <button
                                onClick={() => concluirReservaDoAluno(alunoSelecionadoHistorico.uid, res, true)}
                                className="flex items-center justify-center gap-1 bg-red-50 text-red-600 border border-red-100 font-bold text-[10px] uppercase py-2 rounded-lg hover:bg-red-100 transition active:scale-95"
                              >
                                <AlertOctagon size={12} /> Dar Falta
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* HISTÓRICO DE UTILIZAÇÃO COM EXIBIÇÃO DAS ESTRELAS */}
                  <div>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-green-600" /> Histórico de Utilização Concluído
                    </h3>
                    {!alunoSelecionadoHistorico.historico || alunoSelecionadoHistorico.historico.length === 0 ? (
                      <p className="text-xs text-gray-400 italic bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">Este usuário ainda não possui registros computados no histórico.</p>
                    ) : (
                      <div className="space-y-2">
                        {alunoSelecionadoHistorico.historico.map((hist, index) => (
                          <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/30 text-xs gap-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${hist.status?.includes("Falta") ? "bg-red-500" : "bg-green-500"}`}></div>
                              <span className="font-bold text-slate-700 uppercase tracking-tight">{hist.maquina}</span>
                              <span className="text-gray-400">({hist.data})</span>
                              
                              {!hist.status?.includes("Falta") && hist.avaliacao && (
                                <div className="flex gap-0.5 ml-2 bg-white px-1.5 py-0.5 rounded border border-gray-100">
                                  {[...Array(5)].map((_, idx) => (
                                    <Star 
                                      key={idx} 
                                      size={10} 
                                      className={idx < (hist.avaliacao || 0) ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} 
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                            <span className={`font-bold px-2.5 py-0.5 rounded-lg border text-center self-start sm:self-center ${
                              hist.status?.includes("Falta") 
                                ? "bg-red-50 border-red-200 text-red-700" 
                                : "bg-white border-slate-200 text-slate-500"
                            }`}>
                              {hist.status?.includes("Falta") ? "Falta registrada" : `${hist.horas}h utilizadas`}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              ) : (
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-center h-[550px] text-gray-400 italic text-xs">
                  Nenhum aluno disponível para análise.
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}