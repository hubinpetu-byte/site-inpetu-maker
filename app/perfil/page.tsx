"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { LogOut, ShieldAlert, Star, GraduationCap, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

interface ReservaItem {
  id?: string;
  maquina: string;
  data: string;
  horario?: string;
  status?: string;
  horas?: number;
  estrelas?: number;
}

interface CapacitacaoItem {
  id: string;
  treinamento_nome: string;
  turma_data: string;
  status_participacao: string;
}

interface PerfilData {
  uid: string;
  nome: string;
  email: string;
  cpf: string;
  tipoUsuario: string;
  role: "user" | "admin";
  horasUtilizadas: number;
  habilitacoes: Array<{
    maquina: string;
    dataConclusao: string;
  }> | string[];
  proximasReservas?: ReservaItem[];
  historico?: ReservaItem[];
}

export default function PerfilPage() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<PerfilData | null>(null);
  const [reservasFirebase, setReservasFirebase] = useState<ReservaItem[]>([]);
  const [capacitacoesAluno, setCapacitacoesAluno] = useState<CapacitacaoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // 1. Busca dados do perfil do usuário no Firestore
          const docRef = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(docRef);

          if (snap.exists()) {
            setPerfil(snap.data() as PerfilData);
          }

          if (firebaseUser.email) {
            // 2. Busca agendamentos na coleção 'reservas_maquinas'
            const qReservas = query(
              collection(db, "reservas_maquinas"),
              where("aluno_email", "==", firebaseUser.email)
            );
            
            const querySnapshotReservas = await getDocs(qReservas);
            const listaReservas: ReservaItem[] = [];

            querySnapshotReservas.forEach((documento) => {
              const dataDoc = documento.data();
              listaReservas.push({
                id: documento.id,
                maquina: dataDoc.maquina_nome || dataDoc.maquina_unidade || "Impressora 3D",
                data: dataDoc.data_reserva,
                horario: `${dataDoc.horario_inicio} às ${dataDoc.horario_fim}`,
                status: dataDoc.status || "Agendado",
                estrelas: dataDoc.estrelas || 0
              });
            });

            setReservasFirebase(listaReservas);

            // 3. Busca capacitações/treinamentos na coleção 'inscricoes_treinamentos'
            const qTreinamentos = query(
              collection(db, "inscricoes_treinamentos"),
              where("email_aluno", "==", firebaseUser.email)
            );

            const querySnapshotTreinamentos = await getDocs(qTreinamentos);
            const listaCapacitacoes: CapacitacaoItem[] = [];

            querySnapshotTreinamentos.forEach((docInsc) => {
              const dataInsc = docInsc.data();
              listaCapacitacoes.push({
                id: docInsc.id,
                treinamento_nome: dataInsc.treinamento_nome || "Treinamento Maker",
                turma_data: dataInsc.turma_data || "Data a definir",
                status_participacao: dataInsc.status_participacao || "Pendente"
              });
            });

            setCapacitacoesAluno(listaCapacitacoes);
          }

        } catch (error) {
          console.error("Erro ao buscar dados do Firebase:", error);
        }
      } else {
        router.push("/auth");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  async function handleLogout() {
    try {
      await signOut(auth);
      localStorage.clear();
      router.push("/auth");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  }

  // 🚀 LÓGICA DAS MEDALHAS GAMIFICADAS
  const getEstiloGamificado = (quantidadeUsos: number) => {
    if (quantidadeUsos > 25) {
      return {
        liga: "Ouro",
        borda: "#D8BF3A",
        background: "linear-gradient(180deg, #FFFFFF 0%, rgba(233, 211, 84, 0.6) 100%)",
        corTexto: "text-amber-700",
        filtroIcone: "invert(68%) sepia(85%) saturate(390%) hue-rotate(9deg) brightness(98%) contrast(92%)"
      };
    }

    if (quantidadeUsos >= 16) {
      return {
        liga: "Prata",
        borda: "rgba(206, 206, 206, 0.9)",
        background: "linear-gradient(180deg, #FFFFFF 0%, rgba(206, 206, 206, 0.6) 100%)",
        corTexto: "text-slate-700",
        filtroIcone: "invert(60%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(90%) contrast(85%)"
      };
    }

    return {
      liga: "Bronze",
      borda: "rgba(153, 114, 103, 0.9)",
      background: "linear-gradient(180deg, #FFFFFF 0%, rgba(153, 114, 103, 0.6) 100%)",
      corTexto: "text-[#6b473c]",
      filtroIcone: "invert(45%) sepia(20%) saturate(800%) hue-rotate(345deg) brightness(90%) contrast(88%)"
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0077cc]"></div>
      </div>
    );
  }

  if (!perfil) return null;

  // Unificação e Ordenação do Histórico por Data (Mais recente no topo)
  const perfilHistoricoAntigo = perfil.historico?.map(h => ({
    maquina: h.maquina,
    data: h.data,
    horario: h.horario || `${h.horas || 0}h utilizadas`,
    status: h.status || "Concluído",
    estrelas: h.estrelas
  })) || [];

  const todasAsReservas: ReservaItem[] = [
    ...reservasFirebase,
    ...perfilHistoricoAntigo
  ];

  todasAsReservas.sort((a, b) => {
    const dataA = new Date(a.data).getTime();
    const dataB = new Date(b.data).getTime();
    return dataB - dataA;
  });

  const reservasFiltradas = todasAsReservas.filter(res => {
    if (filtroStatus === "Todos") return true;
    if (filtroStatus === "Concluído") return res.status === "Concluído";
    if (filtroStatus === "Agendado") return res.status === "Agendado" || res.status === "Confirmado";
    if (filtroStatus === "Pendente") return res.status === "Pagamento pendente" || res.status === "Pendente";
    if (filtroStatus === "Falta") return res.status === "Falta" || res.status === "Ausente";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 pt-[120px]">
      <div className="max-w-[1240px] mx-auto px-6 space-y-8">
        
        {/* HEADER DO PERFIL */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="relative w-48 h-48 flex-shrink-0">
            <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-blue-500 bg-blue-50 flex items-center justify-center">
              <span className="text-6xl font-black text-[#0077cc]">
                {perfil.nome ? perfil.nome.charAt(0).toUpperCase() : "A"}
              </span>
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left pt-2">
            <h1 className="text-3xl font-black text-slate-800 mb-1">
              {perfil.nome}
            </h1>
            <p className="text-slate-400 font-medium text-base lowercase">
              {perfil.tipoUsuario || "acadêmico"}
            </p>
          </div>

          <div className="absolute top-6 right-6 flex gap-3">
            {perfil.role === "admin" && (
              <Link href="/admin">
                <button className="bg-slate-100 text-slate-700 p-2.5 rounded-xl hover:bg-slate-200 transition cursor-pointer" title="Painel Admin">
                  <ShieldAlert size={20} />
                </button>
              </Link>
            )}
            <button 
              onClick={handleLogout} 
              className="bg-red-50 text-red-600 p-2.5 rounded-xl hover:bg-red-100 transition cursor-pointer"
              title="Sair da conta"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* 🚀 ESTRUTURA EM GRID: 2 COLUNAS CONFORME O FIGMA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 👈 COLUNA DA ESQUERDA (LG:COL-SPAN-5): CAPACITAÇÕES EM CIMA + ACESSOS EMBAIXO */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* 1. CARD: CAPACITAÇÕES & TREINAMENTOS */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-800 underline decoration-[#0077cc] underline-offset-4">
                  Capacitações & Treinamentos
                </h2>
              </div>

              {capacitacoesAluno.length > 0 ? (
                <div className="space-y-3 pt-2">
                  {capacitacoesAluno.map((cap) => {
                    const ehAprovado = cap.status_participacao === "Confirmado" || cap.status_participacao === "Concluído" || cap.status_participacao === "Inscrito";

                    return (
                      <div key={cap.id} className={`p-4 rounded-2xl border flex items-center gap-3.5 transition-all ${
                        ehAprovado ? 'bg-amber-50/40 border-amber-200/60' : 'bg-amber-50/30 border-amber-200/50'
                      }`}>
                        <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0">
                          <GraduationCap size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="font-extrabold text-xs text-slate-800 truncate">{cap.treinamento_nome}</h4>
                          <p className="text-[11px] text-gray-500 font-medium">Turma: {cap.turma_data}</p>
                          
                          <div className="flex items-center gap-1 mt-1">
                            {ehAprovado ? (
                              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                                <CheckCircle2 size={12} /> HABILITADO / CONFIRMADO
                              </span>
                            ) : (
                              <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider flex items-center gap-1">
                                <Clock size={12} /> PAGAMENTO PENDENTE
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-slate-400 italic py-6 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  Você ainda não possui inscrições de treinamentos ativas.
                </p>
              )}
            </div>

            {/* 2. CARD: ACESSOS DESBLOQUEADOS (INSÍGNIAS/HEXÁGONOS) */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-xl font-black text-slate-800">Acessos desbloqueados</h2>
                <span className="bg-slate-100 text-slate-600 font-bold text-xs px-2.5 py-0.5 rounded-full">
                  {perfil.habilitacoes?.length || 0}
                </span>
              </div>

              {perfil.habilitacoes && perfil.habilitacoes.length > 0 ? (
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
                  {perfil.habilitacoes.map((item, i) => {
                    const nomeMaquina = typeof item === "string" ? item : item.maquina;

                    let caminhoImagem = "/icons/padrao.svg";
                    const nomeNorm = nomeMaquina.toLowerCase();

                    if (nomeNorm.includes("impressão 3d") || nomeNorm.includes("impressora 3d") || nomeNorm.includes("fdm")) {
                      caminhoImagem = "/icons/impressorafdm.svg";
                    } else if (nomeNorm.includes("corte") || nomeNorm.includes("laser")) {
                      caminhoImagem = "/icons/cortelaser.svg";
                    } else if (nomeNorm.includes("router") || nomeNorm.includes("cnc")) {
                      caminhoImagem = "/icons/routercnc.svg";
                    } else if (nomeNorm.includes("marcenaria") || nomeNorm.includes("marcen")) {
                      caminhoImagem = "/icons/marcenaria.svg";
                    } else if (nomeNorm.includes("vacuform") || nomeNorm.includes("vacuo")) {
                      caminhoImagem = "/icons/vacuform.svg";
                    }

                    const usosDaMaquina = todasAsReservas.filter((res) => {
                      const resNome = (res.maquina || "").toLowerCase();
                      const foiConcluido = res.status === "Concluído";
                      
                      if (!foiConcluido) return false;

                      if (nomeNorm.includes("impressão 3d") || nomeNorm.includes("impressora 3d")) {
                        return resNome.includes("impress") || resNome.includes("3d");
                      }
                      if (nomeNorm.includes("corte")) return resNome.includes("corte") || resNome.includes("laser");
                      if (nomeNorm.includes("router")) return resNome.includes("router") || resNome.includes("cnc");
                      if (nomeNorm.includes("marcenaria")) return resNome.includes("marcenaria");
                      return resNome.includes(nomeNorm);
                    });

                    const quantidadeUsos = usosDaMaquina.length;
                    const estilo = getEstiloGamificado(quantidadeUsos);
                    const isHovered = hoverIndex === i;

                    return (
                      <div key={i} className="flex flex-col items-center shrink-0 snap-start text-center">
                        <div 
                          className="w-[95px] h-[110px] mb-2 cursor-pointer relative"
                          style={{ perspective: "1000px" }}
                          onMouseEnter={() => setHoverIndex(i)}
                          onMouseLeave={() => setHoverIndex(null)}
                        >
                          <div 
                            className="w-full h-full relative transition-transform duration-500"
                            style={{
                              transformStyle: "preserve-3d",
                              transform: isHovered ? "rotateY(180deg)" : "rotateY(0deg)"
                            }}
                          >
                            <div 
                              className="absolute inset-0 w-full h-full flex items-center justify-center p-[2px] shadow-xs"
                              style={{ 
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                                backgroundColor: estilo.borda
                              }}
                            >
                              <div 
                                className="w-full h-full flex items-center justify-center p-4"
                                style={{ 
                                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                                  background: estilo.background
                                }}
                              >
                                <img 
                                  src={caminhoImagem} 
                                  alt={nomeMaquina} 
                                  className="max-w-[65%] max-h-[65%] object-contain pointer-events-none transition-all duration-300"
                                  style={{ filter: estilo.filtroIcone }}
                                />
                              </div>
                            </div>

                            <div 
                              className="absolute inset-0 w-full h-full flex items-center justify-center p-[2px] shadow-xs select-none"
                              style={{ 
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                transform: "rotateY(180deg)",
                                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                                backgroundColor: estilo.borda
                              }}
                            >
                              <div 
                                className="w-full h-full flex flex-col items-center justify-center px-1 text-center"
                                style={{ 
                                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                                  background: estilo.background
                                }}
                              >
                                <p className={`text-[8px] font-extrabold uppercase tracking-tight ${estilo.corTexto}`}>
                                  Utilizações
                                </p>
                                
                                <p className={`text-[14px] font-black uppercase leading-none my-1 ${estilo.corTexto}`}>
                                  {quantidadeUsos} {quantidadeUsos === 1 ? "vez" : "vezes"}
                                </p>

                                <span className="text-[8px] font-bold text-slate-500/80 uppercase">
                                  {estilo.liga}
                                </span>
                              </div>
                            </div>

                          </div>
                        </div>

                        <p className="text-[11px] font-bold text-slate-600 tracking-tight max-w-[85px] leading-tight">
                          {nomeMaquina}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-400 italic text-xs">Você não possui permissões ativas.</p>
                </div>
              )}
            </div>

          </div>

          {/* 👉 COLUNA DA DIREITA (LG:COL-SPAN-7): MINHAS RESERVAS */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 lg:col-span-7">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-black text-slate-800">Minhas reservas</h2>
              <select 
                value={filtroStatus} 
                onChange={(e) => setFiltroStatus(e.target.value)} 
                className="bg-slate-50 border border-slate-200 text-slate-600 font-medium text-xs px-4 py-2 rounded-xl outline-none cursor-pointer"
              >
                <option value="Todos">Filtrar: Todos</option>
                <option value="Agendado">Apenas Agendados</option>
                <option value="Concluído">Apenas Concluídos</option>
                <option value="Pendente">Apenas Pendentes</option>
                <option value="Falta">Apenas Faltas</option>
              </select>
            </div>

            {reservasFiltradas.length > 0 ? (
              <div className="space-y-3">
                {reservasFiltradas.map((res, i) => {
                  const ehFalta = res.status === "Falta" || res.status === "Ausente";
                  const ehConcluido = res.status === "Concluído";
                  const ehAgendado = res.status === "Agendado" || res.status === "Confirmado";
                  const qtdEstrelas = res.estrelas || 0;

                  const dataFormatada = res.data ? res.data.split('-').reverse().slice(0, 2).join('/') : "--/--";

                  return (
                    <div 
                      key={res.id || i} 
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        ehFalta 
                          ? "bg-slate-100/70 border-slate-200/80 opacity-60" 
                          : "bg-slate-50 border-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`px-3 py-1.5 rounded-full text-center shadow-xs border min-w-[70px] ${
                          ehFalta ? "bg-slate-200 border-slate-300" : "bg-white border-slate-100"
                        }`}>
                          <p className={`text-[10px] font-bold uppercase tracking-tight ${
                            ehFalta ? "text-slate-500" : "text-slate-400"
                          }`}>
                            {dataFormatada}
                          </p>
                        </div>

                        <div>
                          <p className={`font-black text-xs md:text-sm uppercase tracking-tight ${
                            ehFalta ? "text-slate-500 line-through" : "text-slate-800"
                          }`}>
                            {res.maquina}
                          </p>

                          <p className="text-xs text-slate-400 font-medium">{res.horario}</p>

                          {ehConcluido && qtdEstrelas > 0 && (
                            <div className="flex gap-0.5 mt-0.5">
                              {[...Array(5)].map((_, idx) => (
                                <Star 
                                  key={idx} 
                                  size={11} 
                                  fill={idx < qtdEstrelas ? "#0077cc" : "none"} 
                                  className={idx < qtdEstrelas ? "text-[#0077cc]" : "text-slate-300"}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <span className={`font-black text-[9px] px-3 py-1.5 rounded-md uppercase tracking-wider ${
                          ehFalta 
                            ? "bg-amber-100 text-amber-800" 
                            : ehConcluido 
                            ? "bg-[#E9D354] text-[#191F37]" 
                            : ehAgendado
                            ? "bg-[#0077cc] text-white"
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {res.status === "Confirmado" ? "AGENDADO" : res.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-slate-400 italic py-12 text-sm">Nenhum agendamento encontrado.</p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}