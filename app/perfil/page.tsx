"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { LogOut, ShieldAlert, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";

interface PerfilData {
  uid: string;
  nome: string;
  email: string;
  cpf: string;
  tipoUsuario: string;
  role: "user" | "admin";
  horasUtilizadas: number;
  habilitacoes: string[];
  proximasReservas: Array<{ maquina: string; data: string; horario: string; status?: string }>;
  historico: Array<{ maquina: string; data: string; horas: number; status?: string }>;
  usuarioExemplar?: boolean;
  facilitadorMaker?: boolean;
  incentivadorBoasPraticas?: boolean;
}

export default function PerfilPage() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<PerfilData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("Todos");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const docRef = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(docRef);

          if (snap.exists()) {
            setPerfil(snap.data() as PerfilData);
          }
        } catch (error) {
          console.error("Erro ao buscar perfil:", error);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0077cc]"></div>
      </div>
    );
  }

  if (!perfil) return null;

  const todasAsReservas = [
    ...(perfil.proximasReservas?.map(r => ({ ...r, status: r.status || "Pagamento pendente" })) || []),
    ...(perfil.historico?.map(h => ({ maquina: h.maquina, data: h.data, horario: `${h.horas}h utilizadas`, status: "Concluído" })) || [])
  ];

  const reservasFiltradas = todasAsReservas.filter(res => {
    if (filtroStatus === "Todos") return true;
    if (filtroStatus === "Concluído") return res.status === "Concluído";
    if (filtroStatus === "Pendente") return res.status === "Pagamento pendente";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 pt-[120px]">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* HEADER DO PERFIL */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="relative w-48 h-48 flex-shrink-0">
            <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-blue-500 bg-blue-50 flex items-center justify-center">
              <span className="text-6xl font-black text-[#0077cc]">{perfil.nome.charAt(0).toUpperCase()}</span>
            </div>
            {perfil.usuarioExemplar && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#0077cc] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md whitespace-nowrap">
                <Star size={10} fill="white" /> Usuário exemplar
              </div>
            )}
          </div>

          <div className="flex-1 text-center lg:text-left pt-2">
            <h1 className="text-3xl font-black text-slate-800 flex items-center justify-center lg:justify-start gap-2 mb-1">
              {perfil.nome}
              <CheckCircle2 size={24} className="text-blue-500 fill-blue-500" />
            </h1>
            <p className="text-slate-400 font-medium text-base mb-4 lowercase">{perfil.tipoUsuario || "acadêmico"}</p>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
              {perfil.facilitadorMaker && (
                <span className="bg-[#0077cc] text-white font-bold text-xs px-4 py-1.5 rounded-full shadow-sm">
                  facilitador maker
                </span>
              )}
              {perfil.incentivadorBoasPraticas && (
                <span className="bg-[#E9D354] text-slate-800 font-bold text-xs px-4 py-1.5 rounded-full shadow-sm">
                  incentivador de boas práticas
                </span>
              )}
            </div>
          </div>

          <div className="absolute top-6 right-6 flex gap-3">
            {perfil.role === "admin" && (
              <Link href="/admin">
                <button className="bg-slate-100 text-slate-700 p-2.5 rounded-xl hover:bg-slate-200 transition">
                  <ShieldAlert size={20} />
                </button>
              </Link>
            )}
            <button onClick={handleLogout} className="bg-red-50 text-red-600 p-2.5 rounded-xl hover:bg-red-100 transition">
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* ACESSOS E RESERVAS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CARD: ACESSOS DESBLOQUEADOS COM GIRO 3D HORIZONTAL */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 lg:col-span-5 overflow-hidden">
            <div className="flex items-center gap-2 mb-8">
              <h2 className="text-xl font-black text-slate-800">Acessos desbloqueados</h2>
              <span className="bg-slate-100 text-slate-600 font-bold text-xs px-2.5 py-0.5 rounded-full">
                {perfil.habilitacoes?.length || 0}
              </span>
            </div>

            {perfil.habilitacoes && perfil.habilitacoes.length > 0 ? (
              <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x">
                {perfil.habilitacoes.map((maq, i) => {
                  
                  // 1. Mapeia a imagem correspondente de cada máquina
                  let caminhoImagem = "/icones/padrao.png";
                  if (maq === "Impressão 3D FDM") caminhoImagem = "/icons/impressorafdm.svg";
                  if (maq === "Corte à laser")     caminhoImagem = "/icones/cortelaser.png";
                  if (maq === "Router CNC")        caminhoImagem = "/icones/routercnc.png";
                  if (maq === "Marcenaria")        caminhoImagem = "/icones/marcenaria.png";
                  if (maq === "Vacuform")          caminhoImagem = "/icones/vacuform.png";

                  // 2. CONTAGEM DINÂMICA: Filtra os registros no histórico para essa máquina específica
                  const usosDaMaquina = perfil.historico?.filter((h) => h.maquina === maq) || [];
                  const quantidadeVezes = usosDaMaquina.length;
                  const totalHoras = usosDaMaquina.reduce((acc, curr) => acc + (curr.horas || 0), 0);

                  return (
                    <div key={i} className="flex flex-col items-center shrink-0 snap-start text-center">
                      
                      {/* Container da Perspectiva 3D */}
                      <div className="w-[100px] h-[115px] perspective group mb-3 cursor-pointer">
                        
                        {/* Corpo da Carta (Gira no Hover do container) */}
                        <div 
                          className="w-full h-full relative transition-transform duration-500 transform-style-3d group-hover:rotate-y-180"
                        >
                          
                          {/* 🟡 LADO DA FRENTE (Mostra sua Imagem) */}
                          <div 
                            className="absolute inset-0 w-full h-full bg-slate-100 flex items-center justify-center backface-hidden"
                            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                          >
                            <img 
                              src={caminhoImagem} 
                              alt={maq} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                              }}
                            />
                          </div>

                          {/* ⚪ LADO DE TRÁS (Mostra as Utilizações - Igual ao exemplo gerado) */}
                          <div 
                            className="absolute inset-0 w-full h-full bg-slate-200 border-2 border-slate-300 flex flex-col items-center justify-center rotate-y-180 backface-hidden px-1 select-none"
                            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                          >
                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight leading-none">Utilizações</p>
                            <p className="text-[12px] font-black text-slate-800 uppercase leading-tight my-0.5">{quantidadeVezes} vezes</p>
                            
                            <div className="w-8 border-t border-slate-300 my-0.5"></div>
                            
                            <p className="text-[7px] font-bold text-slate-400 uppercase tracking-tight leading-none">Total Horas</p>
                            <p className="text-[10px] font-black text-slate-700 leading-tight">{totalHoras} Horas</p>
                          </div>

                        </div>
                      </div>

                      {/* Texto fixo embaixo do Hexágono */}
                      <p className="text-[12px] font-bold text-slate-600 tracking-tight max-w-[90px] leading-tight mt-1">
                        {maq}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400 italic text-sm">Você não possui permissões ativas.</p>
                <p className="text-xs text-slate-300 mt-1">Realize os treinamentos com os orientadores.</p>
              </div>
            )}
          </div>

          {/* CARD MINHAS RESERVAS */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 lg:col-span-7">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-black text-slate-800">Minhas reservas</h2>
              <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} className="bg-slate-50 border border-slate-200 text-slate-600 font-medium text-xs px-4 py-2 rounded-xl">
                <option value="Todos">Filtrar: Todos</option>
                <option value="Pendente">Apenas Pendentes</option>
                <option value="Concluído">Apenas Concluídos</option>
              </select>
            </div>

            {reservasFiltradas.length > 0 ? (
              <div className="space-y-3">
                {reservasFiltradas.map((res, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="bg-white px-3 py-1.5 rounded-full text-center shadow-sm border border-slate-100 min-w-[75px]">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{res.data.substring(0, 5)}</p>
                      </div>
                      <div>
                        <p className="font-black text-slate-800 text-sm uppercase tracking-tight">{res.maquina}</p>
                        {res.status !== "Concluído" && <p className="text-xs text-slate-400 font-medium">{res.horario}</p>}
                        {res.status === "Concluído" && (
                          <div className="flex gap-0.5 mt-0.5 text-slate-300">
                            {[...Array(5)].map((_, idx) => <Star key={idx} size={11} fill={idx < 4 ? "#94a3b8" : "none"} />)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className={`font-black text-[9px] px-3 py-1.5 rounded-md uppercase tracking-wider ${res.status === "Concluído" ? "bg-blue-500 text-white" : "bg-yellow-100 text-yellow-700"}`}>
                        {res.status}
                      </span>
                    </div>
                  </div>
                ))}
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