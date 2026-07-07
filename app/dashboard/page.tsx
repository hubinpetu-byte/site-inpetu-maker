"use client";

import React, { useState, useEffect } from 'react';
import { Clock, User, Monitor, ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { auth, db } from '../../lib/firebase'; // Ajuste o caminho se necessário
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function DashboardAgendaSemanal() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [temAcesso, setTemAcesso] = useState(false);
  
  // Segunda-feira da semana ativa que o admin está visualizando
  const [inicioSemana, setInicioSemana] = useState<Date>(() => {
    const hoje = new Date();
    const dia = hoje.getDay();
    const diff = hoje.getDate() - dia + (dia === 0 ? -6 : 1); // Ajusta para segunda-feira
    return new Date(hoje.setDate(diff));
  });

  // Estado unificado com todos os dados da semana
  const [atendimentosSemana, setAtendimentosSemana] = useState<any[]>([]);
  const [maquinasSemana, setMaquinasSemana] = useState<any[]>([]);

  // Gera os 7 dias da semana a partir da data de início
  const diasDaSemana = Array.from({ length: 7 }).map((_, i) => {
    const data = new Date(inicioSemana);
    data.setDate(inicioSemana.getDate() + i);
    return data;
  });

  const carregarDadosSemana = async () => {
  try {
    const listasMescladas: any[] = [];

    // 1. BUSCA MENTORIAS DO FIREBASE (Coleção users antigo)
    const querySnapshotUsers = await getDocs(collection(db, "users"));
    querySnapshotUsers.forEach((docSnap) => {
      const usuario = docSnap.data();
      if (usuario.proximasReservas && Array.isArray(usuario.proximasReservas)) {
        usuario.proximasReservas.forEach((reserva: any, index: number) => {
          listasMescladas.push({
            // 🚀 ID ÚNICO BLINDADO: Usamos um sufixo aleatório + index para evitar colisões
            id: `user-${docSnap.id}-${index}-${Math.random().toString(36).substring(2, 5)}`,
            alunoNome: usuario.nome,
            alunoEmail: usuario.email,
            equipamento: reserva.maquina,
            horario: reserva.horario,
            dataOriginal: reserva.data, 
            status: reserva.status || "Confirmado"
          });
        });
      }
    });

    // 2. BUSCA DIRETAMENTE DA SUITE DE ATENDIMENTOS_MAKER
    const querySnapshotAtendimentos = await getDocs(collection(db, "atendimentos_maker"));
    querySnapshotAtendimentos.forEach((docSnap) => {
      const atend = docSnap.data();
      listasMescladas.push({
        // 🚀 Se o docSnap.id falhar ou colidir por algum motivo, blindamos também
        id: `atend-${docSnap.id}-${Math.random().toString(36).substring(2, 5)}`,
        alunoNome: atend.usuario_nome || "Aluno Maker",
        alunoEmail: atend.usuario_email || "",
        equipamento: `Mentoria com ${atend.maker_nome || "Orientador"}`, 
        horario: atend.horario_atendimento || "09:00",
        dataOriginal: atend.data_atendimento, 
        status: atend.status || "Agendado"
      });
    });

    setAtendimentosSemana(listasMescladas);

    // 3. BUSCA MAQUINÁRIO DO GOOGLE SHEETS
    const resMaquinas = await fetch('/api/reservas?t=' + Date.now());
    if (resMaquinas.ok) {
      const dadosMaquinas = await resMaquinas.json();
      if (Array.isArray(dadosMaquinas)) {
        setMaquinasSemana(dadosMaquinas);
      }
    }
  } catch (err) {
    console.error("Erro ao carregar cronograma semanal:", err);
  }
};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const docRef = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(docRef);

          if (snap.exists() && snap.data().role === "admin") {
            setTemAcesso(true);
            await carregarDadosSemana();
          } else {
            router.push("/perfil");
          }
        } catch (error) {
          router.push("/auth");
        }
      } else {
        router.push("/auth");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router, inicioSemana]);

  // Navegação de Semanas (anterior/próxima)
  const mudarSemana = (direcao: 'voltar' | 'avancar') => {
    const novaData = new Date(inicioSemana);
    novaData.setDate(inicioSemana.getDate() + (direcao === 'avancar' ? 7 : -7));
    setInicioSemana(novaData);
  };

  // Auxiliar para filtrar o que pertence a um dia específico da semana
  const obterEventosDoDia = (dataDia: Date) => {
    const isoData = dataDia.toISOString().split('T')[0]; // "AAAA-MM-DD"
    const [ano, mes, dia] = isoData.split('-');
    const formatoBr = `${dia}/${mes}`; // "DD/MM"

    // Filtra Mentorias unificadas (tanto do array user quanto da coleção nova)
    const mentoriasDoDia = atendimentosSemana.filter(m => m.dataOriginal === isoData || m.dataOriginal === formatoBr);
    
    // Filtra Máquinas do Sheets
    const maquinasDoDia = maquinasSemana.filter(maq => String(maq.data_reserva) === isoData);

    return {
      mentorias: mentoriasDoDia.sort((a,b) => a.horario.localeCompare(b.horario)),
      maquinas: maquinasDoDia.sort((a,b) => a.horario_inicio.localeCompare(b.horario_inicio))
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0077cc]"></div>
      </div>
    );
  }

  if (!temAcesso) return null;

  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen pt-24 pb-20 font-sans text-[#191F37]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* TOPO COM CONTROLES DA SEMANA */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
              <CalendarDays className="text-[#0077cc]" size={28} /> Agenda Semanal Maker
            </h1>
            <p className="text-gray-400 text-sm font-medium">Visão macro de mentorias presenciais e ocupação de maquinário.</p>
          </div>
          
          {/* Paginador de Semanas */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-gray-200 shadow-xs">
            <button onClick={() => mudarSemana('voltar')} className="p-2 hover:bg-gray-50 rounded-lg text-gray-500 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs font-black text-gray-700 px-3 uppercase tracking-wider">
              Semana de {inicioSemana.toLocaleDateString('pt-BR', {day: 'numeric', month: 'short'})}
            </span>
            <button onClick={() => mudarSemana('avancar')} className="p-2 hover:bg-gray-50 rounded-lg text-gray-500 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* GRADE DE 7 COLUNAS (Layout Dinâmico) */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4 items-start">
          {diasDaSemana.map((dia, index) => {
            const { mentorias, maquinas } = obterEventosDoDia(dia);
            const ehHoje = dia.toDateString() === new Date().toDateString();

            return (
              <div 
                key={index} 
                className={`bg-white rounded-2xl border min-h-[500px] flex flex-col shadow-xs overflow-hidden ${
                  ehHoje ? 'border-[#0077cc] ring-2 ring-blue-100' : 'border-gray-100'
                }`}
              >
                {/* Cabeçalho do Dia da Coluna */}
                <div className={`p-4 text-center border-b ${ehHoje ? 'bg-blue-50/50 border-blue-100' : 'bg-slate-50/50 border-slate-100'}`}>
                  <p className={`text-[10px] uppercase font-black ${ehHoje ? 'text-[#0077cc]' : 'text-gray-400'}`}>
                    {dia.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')}
                  </p>
                  <p className="text-xl font-black text-slate-800 mt-0.5">
                    {dia.getDate()}
                  </p>
                </div>

                {/* Lista de Atividades Internas */}
                <div className="p-3 flex-1 space-y-3 max-h-[450px] overflow-y-auto">
                  
                  {/* Se o dia estiver 100% limpo */}
                  {mentorias.length === 0 && maquinas.length === 0 && (
                    <p className="text-[11px] text-gray-300 italic text-center pt-8">Sem agendamentos</p>
                  )}

                  {/* Renderiza Mentorias do Dia */}
                  {mentorias.map((m) => (
                    <div key={m.id} className="p-3 rounded-xl bg-blue-50/40 border border-blue-100/50 space-y-1">
                      <div className="flex items-center gap-1 text-[9px] text-[#0077cc] font-black uppercase">
                        <Clock size={10} /> {m.horario}
                      </div>
                      <h4 className="font-bold text-xs text-slate-800 truncate">{m.alunoNome}</h4>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight truncate">{m.equipamento}</p>
                    </div>
                  ))}

                  {/* Renderiza Máquinas do Dia (Google Sheets) */}
                  {maquinas.map((maq) => (
                    <div key={maq.id} className="p-3 rounded-xl bg-amber-50/40 border border-amber-100/50 space-y-1">
                      <div className="flex items-center gap-1 text-[9px] text-amber-700 font-black uppercase">
                        <Monitor size={10} /> {maq.horario_inicio} - {maq.horario_fim}
                      </div>
                      <h4 className="font-bold text-xs text-slate-700">Bambu Lab U{maq.maquina_unidade}</h4>
                      <p className="text-[9px] text-amber-600 font-medium">Equipamento Reservado</p>
                    </div>
                  ))}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}