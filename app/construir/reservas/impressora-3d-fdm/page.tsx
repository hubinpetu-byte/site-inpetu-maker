"use client";

import React from 'react';
import { Calendar, Monitor, AlertCircle } from 'lucide-react';

export default function PaginaReservas() {
  const maquinas = [
    { id: 1, nome: "Impressora Ender 3", status: "Livre" },
    { id: 2, nome: "Impressora Bambu Lab", status: "Em Manutenção" },
    { id: 3, nome: "Scanner 3D", status: "Livre" },
  ];

  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen pt-24 pb-20">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Cabeçalho */}
        <h1 className="text-[#191F37] text-[42px] font-black mb-2">Reserva de Impressora 3D</h1>
        <p className="text-gray-600 mb-12">Selecione o equipamento e agende seu horário no calendário ao lado. Máquinas com uso responsável, opere apenas após ter concluído o treinamento</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Lista de Impressoras */}
            <div className="lg:col-span-1 space-y-4">
            <h3 className="font-black text-lg mb-4 text-[#191F37]">Unidades Disponíveis</h3>
            
            {[1, 2, 3, 4].map((num) => (
                <div key={num} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center hover:border-[#0077cc] transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#191F37] rounded-lg flex items-center justify-center text-white font-black">
                    {num}
                    </div>
                    <div>
                    <h4 className="font-bold text-sm">Bambu Lab X1 Carbon</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Unidade {num}</p>
                    </div>
                </div>
                <span className="text-[10px] uppercase font-black px-3 py-1 rounded-full bg-green-100 text-green-700">
                    Livre
                </span>
                </div>
            ))}
                        
            {/* Box de Instrução Mantido */}
            <div className="mt-8 p-6 bg-[#E9D354]/10 rounded-2xl border border-[#E9D354]/30 flex gap-4">
                <AlertCircle className="text-[#191F37] shrink-0" />
                <p className="text-sm font-medium text-[#191F37]">
                <strong>Atenção:</strong> Verifique se a mesa está limpa e se o filamento é compatível antes de iniciar.
                </p>
            </div>
            </div>

          {/* Calendário de Agendamento */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3">
              <Calendar className="text-[#0077cc]" />
              <h2 className="font-black text-[18px]">Agenda de Reservas</h2>
            </div>
            
            {/* Seu Iframe aqui */}
            <iframe 
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0X95iKKc8pVRwDRyefBx_DArVmwaTejwJrlM2kB_Ns6sHNVI7jzGFTdkXst1dwbSiBzwqhbWlk?gv=true" 
              className="w-full h-[600px]"
            
            />
          </div>
        </div>
      </div>
    </main>
  );
}