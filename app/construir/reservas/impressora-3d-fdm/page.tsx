"use client";

import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Monitor, AlertCircle, Clock, User, ShieldAlert } from 'lucide-react';

export default function PaginaReservasLocal() {
  const [unidadeAtiva, setUnidadeAtiva] = useState(1);
  const [dataSelecionada, setDataSelecionada] = useState(new Date().toISOString().split('T')[0]);
  const [reservas, setReservas] = useState([]);
  
  // Estados para o formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [horaInicio, setHoraInicio] = useState('09:00');
  const [horaFim, setHoraFim] = useState('10:00');
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

  // Lista de horários sugestivos para o laboratório
  const slotsHorarios = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  // Mapeamento das máquinas indisponíveis (Impressoras 3 e 4)
  const maquinasIndisponiveis = [3, 4];
  const estaIndisponivel = maquinasIndisponiveis.includes(unidadeAtiva);

  // Função para buscar os dados da nossa API local
  const carregarReservas = async () => {
    try {
      const res = await fetch('/api/reservas');
      const dados = await res.json();
      setReservas(dados);
    } catch (err) {
      console.error("Erro ao carregar reservas locais");
    }
  };

  useEffect(() => {
    carregarReservas();
    // Limpa mensagens de erro ao trocar de máquina
    setMensagem({ tipo: '', texto: '' });
  }, [unidadeAtiva, dataSelecionada]);

  // Manipula o envio do formulário de agendamento
  const lidarComAgendamento = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem({ tipo: '', texto: '' });

    // Bloqueio extra de segurança no envio do formulário
    if (estaIndisponivel) {
      setMensagem({ tipo: 'erro', texto: 'Esta unidade está temporariamente indisponível para novos agendamentos.' });
      return;
    }

    if (!nome || !email) {
      setMensagem({ tipo: 'erro', texto: 'Preencha o seu nome e e-mail' });
      return;
    }

    if (horaInicio >= horaFim) {
      setMensagem({ tipo: 'erro', texto: 'O horário de fim deve ser maior que o horário de início.' });
      return;
    }

    try {
      const resposta = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          maquina_unidade: unidadeAtiva,
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
        setMensagem({ tipo: 'sucesso', texto: `Unidade ${unidadeAtiva} reservada com sucesso!` });
        setNome('');
        setEmail('');
        carregarReservas(); // Atualiza a grade instantaneamente
      }
    } catch (err) {
      setMensagem({ tipo: 'erro', texto: 'Erro de conexão com o servidor local.' });
    }
  };

  // Filtra as reservas feitas para a máquina ativa no dia selecionado
  const reservasDoDia = reservas.filter((r: any) => 
    r.maquina_unidade === unidadeAtiva && r.data_reserva === dataSelecionada
  );

  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen pt-24 pb-20 font-sans">
      <div className="max-w-[1100px] mx-auto px-6">
        
        <h1 className="text-[#191F37] text-[42px] font-black mb-2">Reserva Impressoras 3D</h1>
        <p className="text-gray-600 mb-12">Agende seu horário para utilizar as Impressoras 3D do InPETU Maker</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* COLUNA 1: Seleção de Unidades das Impressoras */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="font-black text-lg text-[#191F37] mb-2">Selecione a Máquina</h3>
            {[1, 2, 3, 4].map((num) => {
              const quebrou = maquinasIndisponiveis.includes(num);
              return (
                <button
                  key={num}
                  onClick={() => { setUnidadeAtiva(num); }}
                  className={`w-full p-5 rounded-2xl border text-left flex justify-between items-center transition-all ${
                    unidadeAtiva === num 
                      ? quebrou 
                        ? 'border-red-500 bg-red-50/40 shadow-sm' 
                        : 'border-[#0077cc] bg-blue-50/40 shadow-sm' 
                      : 'bg-white border-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black ${
                      unidadeAtiva === num 
                        ? quebrou ? 'bg-red-600 text-white' : 'bg-[#0077cc] text-white' 
                        : 'bg-[#191F37] text-white'
                    }`}>
                      {num}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#191F37]">Bambu Lab X1 Carbon</h4>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Unidade {num}</p>
                    </div>
                  </div>
                  
                  {/* TAG DINÂMICA: Muda de cor se a máquina for a 3 ou 4 */}
                  {quebrou ? (
                    <span className="text-[10px] uppercase font-black px-3 py-1 rounded-full bg-red-100 text-red-700">
                      Manutenção
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-black px-3 py-1 rounded-full bg-green-100 text-green-700">
                      Livre
                    </span>
                  )}
                </button>
              );
            })}

            <div className="mt-6 p-5 bg-[#E9D354]/10 rounded-2xl border border-[#E9D354]/30 flex gap-3">
              <AlertCircle className="text-[#191F37] shrink-0" size={20} />
              <p className="text-xs font-medium text-[#191F37]">O uso inadequado suspenderá suas credenciais no laboratório.</p>
            </div>
          </div>

          {/* COLUNA 2 E 3: Painel de Controle de Horários e Formulário */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-md">
              
              {/* Filtro por Data */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-6 mb-6 gap-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="text-[#0077cc]" size={22} />
                  <h2 className="font-black text-lg text-[#191F37]">Grade da Unidade {unidadeAtiva}</h2>
                </div>
                <input 
                  type="date" 
                  value={dataSelecionada}
                  onChange={(e) => setDataSelecionada(e.target.value)}
                  disabled={estaIndisponivel}
                  className="border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold text-gray-700 outline-none focus:border-[#0077cc] disabled:opacity-50"
                />
              </div>

              {/* Se a máquina estiver indisponível, mostra um bloqueio visual em vez do formulário e horários */}
              {estaIndisponivel ? (
                <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-red-50/30 border border-dashed border-red-200 rounded-2xl">
                  <ShieldAlert className="text-red-600 mb-3" size={48} />
                  <h3 className="text-red-700 font-black text-lg mb-1">Unidade Fora de Serviço</h3>
                  <p className="text-red-600/80 text-sm max-w-sm">
                    Esta Bambu Lab está fora de uso. Utilize as outras unidades.
                  </p>
                </div>
              ) : (
                <>
                  {/* Status Ocupado do Dia */}
                  <div className="mb-8">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Horários ocupados hoje:</h4>
                    {reservasDoDia.length === 0 ? (
                      <p className="text-sm text-green-600 font-medium bg-green-50 px-4 py-2 rounded-xl inline-block">Sem reservas para este dia!</p>
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

                  {/* Formulário de Reserva direta */}
                  <form onSubmit={lidarComAgendamento} className="space-y-4">
                    <h4 className="text-xs font-black text-[#191F37] uppercase tracking-widest border-b border-gray-50 pb-2">Preencha para Reservar:</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Seu Nome Completo"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-[#0077cc]"
                      />
                      <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-[#0077cc]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-black text-gray-400 mb-1">Início</label>
                        <select value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none bg-white font-bold">
                          {slotsHorarios.map(h => <option key={h} value={h}>{h}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-black text-gray-400 mb-1">Término</label>
                        <select value={horaFim} onChange={(e) => setHoraFim(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none bg-white font-bold">
                          {slotsHorarios.map(h => <option key={h} value={h}>{h}</option>)}
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-[#0077cc] text-white py-3 rounded-xl font-black text-sm uppercase hover:bg-[#005fa3] transition-colors mt-2">
                      Confirmar Reserva Local
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