"use client";

import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, AlertCircle, Clock, ShieldAlert, Zap, HelpCircle } from 'lucide-react';
import { auth, db } from '../../../../lib/firebase'; // Sobe 4 níveis de pasta certinho
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function PaginaReservasCortadora() {
  const router = useRouter();
  const [dataSelecionada, setDataSelecionada] = useState(new Date().toISOString().split('T')[0]);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados automáticos sincronizados com a conta do Maker
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  
  // Estados para o formulário
  const [horaInicio, setHoraInicio] = useState('09:00');
  const [horaFim, setHoraFim] = useState('10:00');
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

  // Lista de horários operacionais do laboratório
  const slotsHorarios = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  // 💡 Como só temos uma cortadora, o status dela é controlado por este booleano de manutenção
  const estaEmManutencao = false; 

  // Função para buscar os dados da nossa API local
  const carregarReservas = async () => {
    try {
      const res = await fetch('/api/reservas');
      const dados = await res.json();
      setReservas(dados);
    } catch (err) {
      console.error("Erro ao carregar reservas locais da cortadora");
    }
  };

  // Monitora o estado de autenticação e puxa os dados reais da conta do Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const docRef = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(docRef);

          if (snap.exists()) {
            const dadosUsuario = snap.data();
            setNome(dadosUsuario.nome || '');
            setEmail(dadosUsuario.email || '');
          }
        } catch (error) {
          console.error("Erro ao buscar dados do perfil autenticado:", error);
        }
      } else {
        router.push("/auth");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    carregarReservas();
    setMensagem({ tipo: '', texto: '' });
  }, [dataSelecionada]);

  // Manipula o envio do formulário de agendamento
  const lidarComAgendamento = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem({ tipo: '', texto: '' });

    if (estaEmManutencao) {
      setMensagem({ tipo: 'erro', texto: 'A cortadora a laser está temporariamente indisponível para manutenção.' });
      return;
    }

    if (!nome || !email) {
      setMensagem({ tipo: 'erro', texto: 'Sua conta não possui Nome ou E-mail válidos vinculados.' });
      return;
    }

    if (horaInicio >= horaFim) {
      setMensagem({ tipo: 'erro', texto: 'O horário de término deve ser maior que o horário de início.' });
      return;
    }

    try {
      // 1. Envia para a API do backend local para registrar o horário na grade
      const resposta = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          maquina_unidade: 99, // Usamos um ID fixo (99) para identificar a única Cortadora Laser na API
          usuario_nome: nome,
          usuario_email: email,
          data_reserva: dataSelecionada,
          horario_inicio: horaInicio,
          horario_fim: horaFim
        })
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        setMensagem({ tipo: 'erro', texto: resultado.error });
      } else {
        
        // 🌟 2. SALVA NO FIREBASE: Adiciona a reserva na lista do perfil do usuário logado
        if (auth.currentUser) {
          const userRef = doc(db, "users", auth.currentUser.uid);
          
          const [ano, mes, dia] = dataSelecionada.split('-');
          const dataFormatada = `${dia}/${mes}`;

          await updateDoc(userRef, {
            proximasReservas: arrayUnion({
              maquina: "Cortadora Laser CO2", // Ajustado o nome do ativo para o Firebase
              data: dataFormatada,
              horario: `${horaInicio} às ${horaFim}`,
              status: "Confirmado"
            })
          });
        }

        setMensagem({ tipo: 'sucesso', texto: `Cortadora Laser reservada com sucesso para ${nome}!` });
        carregarReservas(); 
      }
    } catch (err) {
      console.error(err);
      setMensagem({ tipo: 'erro', texto: 'Erro de conexão com o servidor do laboratório.' });
    }
  };

  // Filtra as reservas feitas especificamente para a Cortadora (ID 99) no dia selecionado
  const reservasDoDia = reservas.filter((r: any) => 
    r.maquina_unidade === 99 && r.data_reserva === dataSelecionada
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0077cc]"></div>
      </div>
    );
  }

  return (
    <main className={`${plusJakartaSans.className} w-full bg-[#FAFAFA] min-h-screen pt-24 pb-20 antialiased text-black`}>
      <div className="max-w-[1100px] mx-auto px-6">
        
        <h1 className="text-[#191F37] text-[42px] font-black mb-2 tracking-tight">Reserva Cortadora Laser</h1>
        <p className="text-gray-600 mb-12 font-medium">Agende seu horário operacional para utilizar a nossa Cortadora CO2.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* COLUNA 1: Especificações da Máquina Única (Substitui o seletor de unidades) */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="font-black text-lg text-[#191F37] mb-2">Equipamento Único</h3>
            
            <div className={`w-full p-5 rounded-2xl border bg-white flex flex-col gap-4 ${estaEmManutencao ? 'border-red-200 bg-red-50/10' : 'border-gray-200/80'}`}>
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#191F37] text-white flex items-center justify-center font-black">
                    CO2
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#191F37]">Cortadora Laser</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Área Útil: 90x60cm</p>
                  </div>
                </div>
                {estaEmManutencao ? (
                  <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded bg-red-100 text-red-700">Manutenção</span>
                ) : (
                  <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded bg-green-100 text-green-700">Operacional</span>
                )}
              </div>

              {/* Dica Maker Pedagógica */}
              <div className="space-y-2 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <Zap size={14} className="text-[#0077cc]" />
                  <span>Materiais Permitidos:</span>
                </div>
                <p className="pl-6 text-slate-500 leading-relaxed">MDF (até 6mm), Acrílico, Couro, Papel Paraná e E.V.A. <span className="text-red-600 font-bold">Proibido o corte de PVC (altamente tóxico).</span></p>
              </div>
            </div>

            <div className="p-5 bg-[#E9D354]/10 rounded-2xl border border-[#E9D354]/30 flex gap-3">
              <AlertCircle className="text-[#191F37] shrink-0" size={20} />
              <p className="text-xs font-medium text-[#191F37] leading-relaxed">Certifique-se de ligar o exaustor de gases e o sistema de refrigeração (chiller) antes de iniciar o corte.</p>
            </div>
          </div>

          {/* COLUNA 2 E 3: Grade de Horários e Formulário */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm">
              
              {/* Calendário da Grade */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-6 mb-6 gap-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="text-[#0077cc]" size={22} />
                  <h2 className="font-black text-lg text-[#191F37]">Agenda de Ocupação</h2>
                </div>
                <input 
                  type="date" 
                  value={dataSelecionada}
                  onChange={(e) => setDataSelecionada(e.target.value)}
                  disabled={estaEmManutencao}
                  className="border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold text-gray-700 outline-none focus:border-[#0077cc] disabled:opacity-50"
                />
              </div>

              {estaEmManutencao ? (
                <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-red-50/30 border border-dashed border-red-200 rounded-2xl">
                  <ShieldAlert className="text-red-600 mb-3" size={48} />
                  <h3 className="text-red-700 font-black text-lg mb-1">Equipamento Fora de Serviço</h3>
                  <p className="text-red-600/80 text-sm max-w-sm">
                    A cortadora laser está passando por alinhamento de espelhos ópticos e troca de tubo CO2. Retornará em breve.
                  </p>
                </div>
              ) : (
                <>
                  {/* Status Ocupado do Dia */}
                  <div className="mb-8">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Horários reservados nesta data:</h4>
                    {reservasDoDia.length === 0 ? (
                      <p className="text-sm text-green-600 font-bold bg-green-50 px-4 py-2 rounded-xl inline-block">Livre! Nenhum agendamento para este dia.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {reservasDoDia.map((r: any) => (
                          <span key={r.id} className="text-xs bg-red-50 text-red-700 font-bold border border-red-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                            <Clock size={12} /> {r.horario_inicio} até {r.horario_fim}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Formulário de Reserva */}
                  <form onSubmit={lidarComAgendamento} className="space-y-4">
                    <h4 className="text-xs font-black text-[#191F37] uppercase tracking-widest border-b border-gray-50 pb-2">Identificação Maker:</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <input 
                          type="text" 
                          disabled
                          value={nome}
                          className="w-full border border-gray-100 bg-gray-50 text-gray-500 rounded-xl p-3 text-sm outline-none font-medium cursor-not-allowed"
                        />
                        <span className="absolute right-3 top-3 text-[10px] bg-slate-200/70 text-slate-500 px-2 py-0.5 rounded font-bold uppercase">Operador</span>
                      </div>
                      <div className="relative">
                        <input 
                          type="email" 
                          disabled
                          value={email}
                          className="w-full border border-gray-100 bg-gray-50 text-gray-500 rounded-xl p-3 text-sm outline-none font-medium cursor-not-allowed"
                        />
                        <span className="absolute right-3 top-3 text-[10px] bg-slate-200/70 text-slate-500 px-2 py-0.5 rounded font-bold uppercase">E-mail</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-black text-gray-400 mb-1">Horário de Entrada</label>
                        <select value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none bg-white font-bold">
                          {slotsHorarios.map(h => <option key={h} value={h}>{h}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-black text-gray-400 mb-1">Horário de Saída</label>
                        <select value={horaFim} onChange={(e) => setHoraFim(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none bg-white font-bold">
                          {slotsHorarios.map(h => <option key={h} value={h}>{h}</option>)}
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-[#0077cc] text-white py-3.5 rounded-xl font-black text-sm uppercase hover:bg-[#005fa3] transition-colors mt-2 shadow-sm">
                      Confirmar Reserva da Cortadora
                    </button>

                    {mensagem.texto && (
                      <div className={`p-4 rounded-xl text-xs font-bold text-center mt-4 ${
                        mensagem.tipo === 'sucesso' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                      }`}>
                        {mensagem.texto}
                      </div>
                    )}
                  </form>
                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}