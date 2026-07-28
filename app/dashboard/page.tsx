"use client";

import React, { useState, useEffect } from 'react';
import { Clock, Monitor, ChevronLeft, ChevronRight, CalendarDays, CheckCircle, Trash2, CheckSquare, Square, X, User, Mail, Layers } from 'lucide-react';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, getDocs, addDoc, deleteDoc, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function DashboardAgendaSemanal() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [temAcesso, setTemAcesso] = useState(false);
  const [userIdLogado, setUserIdLogado] = useState('');
  const [nomeLogado, setNomeLogado] = useState('');
  
  const [painelAtivo, setPainelAtivo] = useState<'agenda' | 'disponibilidade'>('agenda');

  // 🚀 ESTADO PARA O MODAL DE DETALHES
  const [eventoSelecionado, setEventoSelecionado] = useState<any>(null);

  const [inicioSemana, setInicioSemana] = useState<Date>(() => {
    const hoje = new Date();
    const dia = hoje.getDay();
    const diff = hoje.getDate() - dia + (dia === 0 ? -6 : 1);
    return new Date(hoje.setDate(diff));
  });

  const [agendaSemana, setAgendaSemana] = useState<any[]>([]);
  const [maquinasSemana, setMaquinasSemana] = useState<any[]>([]);
  const [horariosLiberados, setHorariosLiberados] = useState<any[]>([]);

  const slotsPadrao = ["09:00", "10:30", "14:00", "15:30", "17:00"];
  const [dataDispo, setDataDispo] = useState('');
  const [horasSelecionadas, setHorasSelecionadas] = useState<string[]>([]);

  const diasDaSemana = Array.from({ length: 7 }).map((_, i) => {
    const data = new Date(inicioSemana);
    data.setDate(inicioSemana.getDate() + i);
    return data;
  });

  const carregarDadosSemana = async (uidResponsavel: string) => {
    try {
      const eventosEspelho: any[] = [];

      const qAtendimentos = query(
        collection(db, "atendimentos_maker"), 
        where("maker_id", "==", uidResponsavel)
      );
      const snapAtendimentos = await getDocs(qAtendimentos);
      snapAtendimentos.forEach((docSnap) => {
        const atend = docSnap.data();
        eventosEspelho.push({
          id: docSnap.id,
          alunoNome: atend.usuario_nome || "Aluno",
          alunoEmail: atend.usuario_email || "Não informado",
          etapaProjeto: atend.etapa_projeto || "Não informada",
          resumoDuvida: atend.resumo_duvida || "Sem resumo anexado.",
          equipamento: `Mentoria: ${atend.area_ajuda || 'Geral'}`, 
          horario: atend.horario_atendimento,
          dataOriginal: atend.data_atendimento, 
          tipo: 'atendimento'
        });
      });

      const qDispo = query(
        collection(db, "disponibilidade_maker"),
        where("maker_id", "==", uidResponsavel)
      );
      const snapDispo = await getDocs(qDispo);
      const listaDispo: any[] = [];
      
      snapDispo.forEach((docSnap) => {
        const d = docSnap.data();
        listaDispo.push({ id: docSnap.id, ...d });

        if (d.status === "disponivel") {
          eventosEspelho.push({
            id: docSnap.id,
            alunoNome: "Horário Disponível",
            equipamento: "Aguardando aluno...",
            horario: d.horario,
            dataOriginal: d.data,
            tipo: 'vazio_liberado'
          });
        }
      });
      
      setHorariosLiberados(listaDispo.sort((a,b) => a.data.localeCompare(b.data) || a.horario.localeCompare(b.horario)));
      setAgendaSemana(eventosEspelho);

      const resMaquinas = await fetch('/api/reservas?t=' + Date.now());
      if (resMaquinas.ok) {
        const dadosMaquinas = await resMaquinas.json();
        if (Array.isArray(dadosMaquinas)) setMaquinasSemana(dadosMaquinas);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(docRef);
        if (snap.exists() && snap.data().role === "admin") {
          setTemAcesso(true);
          setUserIdLogado(firebaseUser.uid);
          setNomeLogado(snap.data().nome || "Orientador");
          await carregarDadosSemana(firebaseUser.uid);
        } else {
          router.push("/perfil");
        }
      } else {
        router.push("/auth");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router, inicioSemana]);

  const toggleHoraCheckbox = (hora: string) => {
    if (horasSelecionadas.includes(hora)) {
      setHorasSelecionadas(horasSelecionadas.filter(h => h !== hora));
    } else {
      setHorasSelecionadas([...horasSelecionadas, hora]);
    }
  };

  const handleLiberarHorariosMultiplos = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataDispo) return;
    if (horasSelecionadas.length === 0) return;

    try {
      const colRef = collection(db, "disponibilidade_maker");
      const promessas = horasSelecionadas.map(async (hora) => {
        const jaExiste = horariosLiberados.some(h => h.data === dataDispo && h.horario === hora);
        if (!jaExiste) {
          await addDoc(colRef, {
            maker_id: userIdLogado,
            maker_nome: nomeLogado,
            data: dataDispo,
            horario: hora,
            status: "disponivel"
          });
        }
      });

      await Promise.all(promessas);
      alert("Horários atualizados com sucesso!");
      setHorasSelecionadas([]);
      await carregarDadosSemana(userIdLogado);
    } catch (e) {
      alert("Erro ao salvar lote de horários.");
    }
  };

  const handleRemoverDispo = async (id: string) => {
    if (!confirm("Retirar esse horário de circulação?")) return;
    try {
      await deleteDoc(doc(db, "disponibilidade_maker", id));
      setEventoSelecionado(null); // Fecha o modal se tiver aberto
      await carregarDadosSemana(userIdLogado);
    } catch (e) {
      alert("Erro ao remover.");
    }
  };

  const obterEventosDoDia = (dataDia: Date) => {
    const isoData = dataDia.toISOString().split('T')[0];
    return {
      mentorias: agendaSemana.filter(m => m.dataOriginal === isoData).sort((a,b) => a.horario.localeCompare(b.horario)),
      maquinas: maquinasSemana.filter(maq => String(maq.data_reserva) === isoData).sort((a,b) => a.horario_inicio.localeCompare(b.horario_inicio))
    };
  };

  if (loading || !temAcesso) return <div className="p-12 text-center font-bold">Carregando painel...</div>;

  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen pt-24 pb-20 font-sans text-[#191F37] relative">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* TOPO */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black flex items-center gap-2">
              <CalendarDays className="text-[#0077cc]" size={28} /> Agenda de {nomeLogado}
            </h1>
            <p className="text-gray-400 text-sm">Gerencie seus horários de mentoria técnica por aqui.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-white p-1 rounded-xl border text-xs font-bold uppercase">
              <button onClick={() => setPainelAtivo('agenda')} className={`px-4 py-2 rounded-lg ${painelAtivo === 'agenda' ? 'bg-[#191F37] text-white' : 'text-gray-400'}`}>Ver Grade</button>
              <button onClick={() => setPainelAtivo('disponibilidade')} className={`px-4 py-2 rounded-lg ${painelAtivo === 'disponibilidade' ? 'bg-[#191F37] text-white' : 'text-gray-400'}`}>Liberar Horários</button>
            </div>

            {painelAtivo === 'agenda' && (
              <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border text-xs font-black">
                <button onClick={() => setInicioSemana(new Date(inicioSemana.setDate(inicioSemana.getDate() - 7)))} className="p-1 hover:bg-gray-100 rounded"><ChevronLeft size={16} /></button>
                <span className="px-2">Semana de {inicioSemana.toLocaleDateString('pt-BR', {day:'numeric', month:'short'})}</span>
                <button onClick={() => setInicioSemana(new Date(inicioSemana.setDate(inicioSemana.getDate() + 7)))} className="p-1 hover:bg-gray-100 rounded"><ChevronRight size={16} /></button>
              </div>
            )}
          </div>
        </div>

        {/* COMPONENTE 1: GRADE SEMANAL COM EVENTO DE CLICK */}
        {painelAtivo === 'agenda' && (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {diasDaSemana.map((dia, idx) => {
              const { mentorias, maquinas } = obterEventosDoDia(dia);
              return (
                <div key={idx} className="bg-white rounded-2xl border border-gray-100 min-h-[400px] overflow-hidden shadow-xs">
                  <div className="p-3 text-center bg-slate-50 border-b">
                    <p className="text-[10px] uppercase font-black text-gray-400">{dia.toLocaleDateString('pt-BR', { weekday: 'short' })}</p>
                    <p className="text-lg font-black">{dia.getDate()}</p>
                  </div>
                  <div className="p-2 space-y-2">
                    {mentorias.map(m => (
                      <div 
                        key={m.id} 
                        onClick={() => setEventoSelecionado(m)} // 🚀 DISPARA O MODAL COM DETALHES
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer active:scale-[0.98] transition-all ${
                          m.tipo === 'vazio_liberado' 
                            ? 'bg-emerald-50/50 border-emerald-100 text-emerald-800 border-dashed hover:bg-emerald-50' 
                            : 'bg-blue-50/60 border-blue-100 hover:bg-blue-100/50'
                        }`}
                      >
                        <span className="block font-black text-[9px] uppercase">{m.horario}</span>
                        <h4 className="font-bold truncate">{m.alunoNome}</h4>
                        <p className="text-[9px] text-gray-400 truncate">{m.equipamento}</p>
                      </div>
                    ))}
                    {maquinas.map(maq => (
                      <div key={maq.id} className="p-2.5 rounded-xl bg-amber-50/40 border border-amber-100/40 text-xs">
                        <span className="block text-amber-700 font-black text-[9px]"><Monitor size={8} className="inline mr-1"/>{maq.horario_inicio}</span>
                        <p className="font-medium text-slate-600 truncate">Bambu Lab U{maq.maquina_unidade}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* COMPONENTE 2: DISPONIBILIDADE */}
        {painelAtivo === 'disponibilidade' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <form onSubmit={handleLiberarHorariosMultiplos} className="md:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-5">
              <h3 className="font-black text-sm uppercase tracking-wider flex items-center gap-1.5 text-emerald-600"><CheckCircle size={16}/> Liberar Turno de Trabalho</h3>
              <div>
                <label className="block text-[10px] uppercase font-black text-gray-400 mb-1">1. Escolha a Data</label>
                <input type="date" required value={dataDispo} onChange={(e)=>setDataDispo(e.target.value)} className="w-full border rounded-xl p-3 text-sm font-bold bg-slate-50 outline-none" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black text-gray-400 mb-2.5">2. Marque os Horários Disponíveis</label>
                <div className="space-y-2">
                  {slotsPadrao.map((h) => {
                    const isChecked = horasSelecionadas.includes(h);
                    return (
                      <div key={h} onClick={() => toggleHoraCheckbox(h)} className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${isChecked ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-xs' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                        <span className="flex items-center gap-2"><Clock size={14} className={isChecked ? "text-emerald-600" : "text-gray-400"} />Turno das {h}</span>
                        {isChecked ? <CheckSquare size={18} className="text-emerald-600" /> : <Square size={18} className="text-gray-300" />}
                      </div>
                    );
                  })}
                </div>
              </div>
              <button type="submit" disabled={!dataDispo || horasSelecionadas.length === 0} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all disabled:opacity-40 shadow-md">Injetar Horários no Site</button>
            </form>

            <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
              <h3 className="font-black text-sm uppercase tracking-wider text-gray-400 mb-4">Sua Grade de Horários Ativa</h3>
              <div className="divide-y text-xs font-semibold max-h-[480px] overflow-y-auto pr-2">
                {horariosLiberados.length === 0 ? (
                  <p className="text-xs text-gray-400 italic py-4">Nenhum horário oferecido cadastrado.</p>
                ) : (
                  horariosLiberados.map(h => (
                    <div key={h.id} className="py-3 flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${h.status === 'disponivel' ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
                        Dia {h.data.split('-').reverse().slice(0,2).join('/')} às {h.horario} — <b className="uppercase text-[10px] tracking-wide">{h.status}</b>
                      </span>
                      {h.status === 'disponivel' && (
                        <button onClick={()=>handleRemoverDispo(h.id)} className="text-gray-400 hover:text-red-600 p-1"><Trash2 size={14}/></button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* 🚀 MODAL FLUTUANTE DE DETALHES (SÓ ABRE SE SELECIONADO) */}
        {eventoSelecionado && (
          <div className="fixed inset-0 bg-[#191F37]/60 backdrop-blur-xs flex items-center justify-center z-50 p-6 animate-fade-in">
            <div className="bg-white w-full max-w-[500px] rounded-3xl p-8 shadow-2xl border border-gray-100 relative space-y-6">
              
              {/* Botão Fechar */}
              <button 
                onClick={() => setEventoSelecionado(null)} 
                className="absolute right-6 top-6 p-1.5 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X size={16} />
              </button>

              {/* Cabeçalho do Modal */}
              <div>
                <span className={`text-[10px] uppercase font-black px-3 py-1 rounded-full ${
                  eventoSelecionado.tipo === 'vazio_liberado' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {eventoSelecionado.tipo === 'vazio_liberado' ? 'Janela Livre' : 'Compromisso Agendado'}
                </span>
                <h3 className="text-xl font-black mt-3 text-slate-800">{eventoSelecionado.alunoNome}</h3>
                <p className="text-xs text-gray-400 font-semibold flex items-center gap-1 mt-1">
                  <Clock size={12} /> Dia {eventoSelecionado.dataOriginal.split('-').reverse().join('/')} às {eventoSelecionado.horario}
                </p>
              </div>

              {/* Corpo condicional do Modal */}
              {eventoSelecionado.tipo === 'vazio_liberado' ? (
                <div className="bg-slate-50 p-4 rounded-2xl border border-dashed text-center space-y-4">
                  <p className="text-xs text-gray-500 font-medium">Este bloco de horário está ativo na vitrine do site. Alunos da UFSC podem localizá-lo e reservá-lo a qualquer momento.</p>
                  <button 
                    onClick={() => handleRemoverDispo(eventoSelecionado.id)}
                    className="flex items-center justify-center gap-2 w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs uppercase py-3 rounded-xl border border-red-200/50 transition-colors"
                  >
                    <Trash2 size={14} /> Retirar Horário do Site
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2.5 text-xs font-semibold text-slate-700 bg-slate-50/50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-2"><Mail size={14} className="text-gray-400"/> <span>{eventoSelecionado.alunoEmail}</span></div>
                    <div className="flex items-center gap-2"><Layers size={14} className="text-gray-400"/> <span>Etapa do Projeto: <b>{eventoSelecionado.etapaProjeto}</b></span></div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="block text-[10px] uppercase font-black text-gray-400 tracking-wider">Resumo Técnico da Dúvida:</label>
                    <p className="text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-gray-100 leading-relaxed font-medium">
                      "{eventoSelecionado.resumoDuvida}"
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </main>
  );
}