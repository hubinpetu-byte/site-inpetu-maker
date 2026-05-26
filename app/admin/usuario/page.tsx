"use client";

import React, { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase'; // Ajuste a quantidade de ../ de acordo com a pasta
import { collection, getDocs } from 'firebase/firestore';
import { User, Calendar, Clock, CheckCircle, Search } from 'lucide-react';

export default function PainelAdminUsuarios() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<any>(null);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);

  // Carrega todos os usuários do Firebase
  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const listaUsuarios: any[] = [];
        
        querySnapshot.forEach((doc) => {
          listaUsuarios.push({ id: doc.id, ...doc.data() });
        });

        setUsuarios(listaUsuarios);
        // Deixa o primeiro usuário selecionado por padrão, se houver
        if (listaUsuarios.length > 0) setUsuarioSelecionado(listaUsuarios[0]);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarUsuarios();
  }, []);

  // Filtra os usuários pela barra de pesquisa (por nome ou email)
  const usuariosFiltrados = usuarios.filter(u => 
    u.nome?.toLowerCase().includes(busca.toLowerCase()) || 
    u.email?.toLowerCase().includes(busca.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0077cc]"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-24 pb-20 font-sans px-6 max-w-[1200px] mx-auto">
      <h1 className="text-[#191F37] text-[36px] font-black mb-2">Controle de Usuários</h1>
      <p className="text-gray-600 mb-8">Visualize o perfil, reservas ativas e histórico dos Makers cadastrados.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* COLUNA 1: Lista de Usuários + Pesquisa */}
        <div className="md:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col h-[600px]">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nome ou e-mail..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-[#0077cc]"
            />
          </div>

          <div className="overflow-y-auto space-y-2 flex-1 pr-1">
            {usuariosFiltrados.map((usuario) => (
              <button
                key={usuario.id}
                onClick={() => setUsuarioSelecionado(usuario)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${
                  usuarioSelecionado?.id === usuario.id
                    ? 'border-[#0077cc] bg-blue-50/30'
                    : 'border-transparent hover:bg-gray-50'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold shrink-0">
                  {usuario.nome ? usuario.nome.charAt(0).toUpperCase() : <User size={18} />}
                </div>
                <div className="truncate">
                  <h4 className="font-bold text-sm text-[#191F37] truncate">{usuario.nome || 'Sem nome'}</h4>
                  <p className="text-xs text-gray-400 truncate">{usuario.email}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* COLUNA 2 e 3: Histórico e Detalhes do Usuário Selecionado */}
        <div className="md:col-span-2 space-y-6">
          {usuarioSelecionado ? (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-md min-h-[600px]">
              {/* Cabeçalho do Perfil */}
              <div className="border-b border-gray-100 pb-6 mb-6">
                <h2 className="text-2xl font-black text-[#191F37]">{usuarioSelecionado.nome}</h2>
                <p className="text-sm text-gray-500 font-medium">{usuarioSelecionado.email}</p>
                <span className="inline-block text-[10px] bg-blue-100 text-[#0077cc] font-black uppercase px-3 py-1 rounded-full mt-2">
                  UID: {usuarioSelecionado.id}
                </span>
              </div>

              {/* Seção de Reservas Ativas / Próximas */}
              <div className="mb-8">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-4">Próximas Reservas Agendadas</h3>
                {!usuarioSelecionado.proximasReservas || usuarioSelecionado.proximasReservas.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">Nenhum agendamento futuro encontrado para este usuário.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {usuarioSelecionado.proximasReservas.map((reserva: any, index: number) => (
                      <div key={index} className="p-4 rounded-2xl border border-gray-100 bg-slate-50/50 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-[#191F37] mb-1">{reserva.maquina}</h4>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                            <Calendar size={13} /> <span>{reserva.data}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Clock size={13} /> <span>{reserva.horario}</span>
                          </div>
                        </div>
                        <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded-full mt-3 self-start bg-green-100 text-green-700">
                          {reserva.status || "Confirmado"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Seção de Histórico de Uso (Reservas Passadas) */}
              <div>
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-4">Histórico de Uso Anterior</h3>
                {!usuarioSelecionado.historico || usuarioSelecionado.historico.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">Nenhum registro no histórico passado.</p>
                ) : (
                  <div className="space-y-3">
                    {usuarioSelecionado.historico.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-xl border border-dashed border-gray-100 text-sm">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="text-gray-400" size={16} />
                          <div>
                            <span className="font-bold text-[#191F37]">{item.maquina}</span>
                            <span className="text-gray-400 text-xs ml-2">({item.data} - {item.horario})</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-gray-500">{item.status || "Concluído"}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-md flex items-center justify-center h-[600px] text-gray-400 italic">
              Selecione um usuário na barra lateral para ver o histórico.
            </div>
          )}
        </div>

      </div>
    </main>
  );
}