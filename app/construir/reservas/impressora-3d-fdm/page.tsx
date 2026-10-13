"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, CheckCircle2, AlertTriangle } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

// 🚀 IMPORTA O MÓDULO DE PRECIFICAÇÃO DINÂMICA
import { calcularPrecoReserva } from '@/lib/precificacao';

// 1. Dados das máquinas disponíveis do protótipo
const MAQUINAS_3D = [
  { id: 1, nome: "Bambu Lab X1 Carbon", unidade: "Unidade 1", status: "Livre" },
  { id: 2, nome: "Bambu Lab X1 Carbon", unidade: "Unidade 2", status: "Livre" },
  { id: 3, nome: "Bambu Lab X1 Carbon", unidade: "Unidade 3", status: "Livre" },
  { id: 4, nome: "Bambu Lab X1 Carbon", unidade: "Unidade 4", status: "Manutenção" },
];

// Grade de horas disponíveis para o agendamento
const HORARIOS_DIA = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export default function ReservaImpressora3DPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Estados de seleção do usuário
  const [maquinaSelecionada, setMaquinaSelecionada] = useState(MAQUINAS_3D[0]);
  const [dataReserva, setDataReserva] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [horarioInicio, setHorarioInicio] = useState('');
  const [horarioFim, setHorarioFim] = useState('');
  
  // Dados do aluno e perfil logado
  const [nomeAluno, setNomeAluno] = useState('');
  const [emailAluno, setEmailAluno] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('Aluno UFSC'); // Categoria do usuário no banco

  // Reservas puxadas do Firebase
  const [reservasExistentes, setReservasExistentes] = useState<any[]>([]);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

  // Preço base calculado por hora (Tarifa Padrão sem desconto)
  const PRECO_BASE_POR_HORA = 79.63; 

  // 2. Verifica autenticação e carrega os dados do perfil no Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setNomeAluno(user.displayName || '');
        setEmailAluno(user.email || '');

        // 🚀 Busca a categoria do usuário no documento 'users'
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const dadosUser = userDoc.data();
            setTipoUsuario(dadosUser.tipoUsuario || 'Aluno UFSC');
          }
        } catch (err) {
          console.error("Erro ao buscar perfil do usuário:", err);
        }
      } else {
        router.push('/auth');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  // 3. BUSCA NO FIREBASE: Puxa os agendamentos já salvos da máquina selecionada
  const carregarReservasDoFirebase = async () => {
    try {
      const q = query(
        collection(db, "reservas_maquinas"),
        where("maquina_id", "==", maquinaSelecionada.id),
        where("data_reserva", "==", dataReserva)
      );
      
      const querySnapshot = await getDocs(q);
      const lista: any[] = [];
      querySnapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setReservasExistentes(lista);
    } catch (err) {
      console.error("Erro ao carregar reservas existentes:", err);
    }
  };

  useEffect(() => {
    if (maquinaSelecionada && dataReserva) {
      carregarReservasDoFirebase();
    }
  }, [maquinaSelecionada, dataReserva]);

  // Total de horas selecionadas
  const totalHoras = () => {
    if (!horarioInicio || !horarioFim) return 0;
    const hInicio = parseInt(horarioInicio.split(':')[0]);
    const hFim = parseInt(horarioFim.split(':')[0]);
    return Math.max(0, hFim - hInicio);
  };

  // 4. 🚀 CÁLCULO DE VALOR COM A REGRA DO INPETU MAKER
  const precificacaoCalculada = calcularPrecoReserva(PRECO_BASE_POR_HORA, tipoUsuario);
  const valorTotalFinal = totalHoras() * precificacaoCalculada.precoFinal;

  // 5. ENVIO PARA O FIREBASE: Salva a nova reserva no Firestore
  const handleConfirmarReserva = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!horarioInicio || !horarioFim) {
      setMensagem({ tipo: 'erro', texto: 'Selecione os horários de início e término.' });
      return;
    }

    if (totalHoras() <= 0) {
      setMensagem({ tipo: 'erro', texto: 'O horário final precisa ser posterior ao de início.' });
      return;
    }

    try {
      await addDoc(collection(db, "reservas_maquinas"), {
        maquina_id: maquinaSelecionada.id,
        maquina_nome: maquinaSelecionada.nome,
        maquina_unidade: maquinaSelecionada.unidade,
        aluno_nome: nomeAluno,
        aluno_email: emailAluno,
        aluno_categoria: tipoUsuario,
        data_reserva: dataReserva,
        horario_inicio: horarioInicio,
        horario_fim: horarioFim,
        horas_reservadas: totalHoras(),
        valor_hora_aplicado: precificacaoCalculada.precoFinal,
        valor_total: valorTotalFinal,
        criado_em: new Date().toISOString(),
        status: "Confirmado"
      });

      setMensagem({ tipo: 'sucesso', texto: 'Reserva realizada com sucesso!' });
      await carregarReservasDoFirebase();
      setHorarioInicio('');
      setHorarioFim('');
    } catch (err) {
      setMensagem({ tipo: 'erro', texto: 'Erro ao salvar reserva no banco de dados.' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0077cc]"></div>
      </div>
    );
  }

  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen pt-28 pb-20 font-sans text-[#191F37]">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* CABEÇALHO */}
        <div className="mb-8">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Fabricação Digital</p>
          <h1 className="text-3xl font-black text-[#191F37] tracking-tight">Reserva Impressoras 3D</h1>
        </div>

        {/* CONTAINER PRINCIPAL (GRID 2 COLUNAS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUNA ESQUERDA: LISTA DE MÁQUINAS (Cards 1 a 4) */}
          <div className="lg:col-span-4 space-y-4">
            {MAQUINAS_3D.map((maq) => {
              const estaSelecionada = maquinaSelecionada.id === maq.id;
              const emManutencao = maq.status === "Manutenção";

              return (
                <div
                  key={maq.id}
                  onClick={() => !emManutencao && setMaquinaSelecionada(maq)}
                  className={`p-5 rounded-3xl border transition-all flex items-center gap-4 bg-white shadow-xs ${
                    emManutencao 
                      ? 'opacity-60 cursor-not-allowed border-gray-100' 
                      : estaSelecionada 
                      ? 'border-[#0077cc] ring-2 ring-blue-100 cursor-pointer' 
                      : 'border-gray-100 hover:border-gray-200 cursor-pointer'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#0077cc] text-white font-black text-xl flex items-center justify-center shrink-0">
                    {maq.id}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-[#191F37] truncate">{maq.nome}</h3>
                    <p className="text-xs text-gray-400 font-medium">{maq.unidade}</p>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    emManutencao ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {maq.status}
                  </span>
                </div>
              );
            })}
          </div>

          {/* COLUNA DIREITA: FORMULÁRIO + RÉGUA DE HORÁRIOS */}
          <div className="lg:col-span-8 bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
            
            {/* LADO DO FORMULÁRIO */}
            <form onSubmit={handleConfirmarReserva} className="md:col-span-8 p-8 md:p-10 space-y-6">
              <h2 className="text-base font-black text-[#191F37]">
                Grade de Horários da {maquinaSelecionada.unidade}
              </h2>

              <div className="space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Seus dados para a Reserva:</p>
                
                <div>
                  <input
                    type="text"
                    placeholder="Nome Completo"
                    value={nomeAluno}
                    onChange={(e) => setNomeAluno(e.target.value)}
                    required
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#0077cc]"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={emailAluno}
                    onChange={(e) => setEmailAluno(e.target.value)}
                    required
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#0077cc]"
                  />
                </div>
              </div>

              {/* SELEÇÃO DE HORÁRIOS (INÍCIO - FIM) */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Horário da Reserva:</p>
                <div className="grid grid-cols-2 gap-3 items-center">
                  <div className="relative">
                    <select
                      value={horarioInicio}
                      onChange={(e) => setHorarioInicio(e.target.value)}
                      required
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none focus:border-[#0077cc] appearance-none cursor-pointer"
                    >
                      <option value="">Início</option>
                      {HORARIOS_DIA.slice(0, -1).map(h => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select
                      value={horarioFim}
                      onChange={(e) => setHorarioFim(e.target.value)}
                      required
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none focus:border-[#0077cc] appearance-none cursor-pointer"
                    >
                      <option value="">Fim</option>
                      {HORARIOS_DIA.slice(1).map(h => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* 🚀 PRÉVIA DO VALOR COM A TAG DO PERFIL */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Prévia do Valor da reserva</p>
                  <span className="text-[10px] font-bold text-[#0077cc] bg-blue-50 px-2.5 py-1 rounded-md">
                    {precificacaoCalculada.tagStatus}
                  </span>
                </div>

                <div className="w-full border border-gray-200 rounded-2xl p-4 flex justify-between items-center bg-white">
                  <span className="text-xs font-bold text-gray-400">
                    x{totalHoras()} {totalHoras() === 1 ? 'Hora' : 'Horas'} =
                  </span>
                  
                  <span className="text-2xl font-black text-[#0077cc]">
                    {valorTotalFinal === 0 
                      ? "R$ 0,00" 
                      : `R$ ${valorTotalFinal.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 italic">*O preço total será enviado para o seu email após a finalização do uso</p>
              </div>

              {/* MENSAGENS FEEDBACK */}
              {mensagem.texto && (
                <div className={`p-3 rounded-xl text-xs font-bold text-center ${
                  mensagem.tipo === 'sucesso' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {mensagem.texto}
                </div>
              )}

              {/* BOTÃO CONFIRMAR */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#E9D354] hover:bg-[#d4be43] text-slate-900 font-black text-sm uppercase tracking-wider py-4 rounded-2xl transition-all shadow-md active:scale-[0.98] cursor-pointer"
                >
                  Confirmar
                </button>
              </div>
            </form>

            {/* LADO DIREITO: COLUNA AZUL DE HORÁRIOS */}
            <div className="md:col-span-4 bg-[#0077cc] p-6 text-white flex flex-col justify-between">
              <div>
                {/* SELETOR DE DATA SIMPLIFICADO */}
                <div className="bg-white text-slate-800 rounded-2xl p-2.5 flex items-center gap-2 font-bold text-xs mb-8 shadow-xs">
                  <Calendar size={16} className="text-[#0077cc]" />
                  <input
                    type="date"
                    value={dataReserva}
                    onChange={(e) => setDataReserva(e.target.value)}
                    className="bg-transparent font-bold outline-none cursor-pointer w-full"
                  />
                </div>

                {/* TIMELINE DE HORÁRIOS DO DIA */}
                <div className="space-y-4 relative pl-2">
                  {HORARIOS_DIA.map((hora, idx) => {
                    const reservaNoHorario = reservasExistentes.find(r => {
                      const hIni = parseInt(r.horario_inicio.split(':')[0]);
                      const hFim = parseInt(r.horario_fim.split(':')[0]);
                      const hAtual = parseInt(hora.split(':')[0]);
                      return hAtual >= hIni && hAtual < hFim;
                    });

                    return (
                      <div key={idx} className="relative flex items-center justify-between text-xs font-semibold py-1">
                        <span className="opacity-80">{hora}</span>
                        <div className="w-20 border-b border-white/20"></div>

                        {reservaNoHorario && (
                          <div className="absolute right-0 top-0 bottom-0 bg-[#E9D354] text-slate-900 font-bold text-[10px] uppercase px-3 rounded-lg flex items-center justify-center shadow-md">
                            Reservado
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}