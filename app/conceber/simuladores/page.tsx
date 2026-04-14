"use client";

import React from 'react';
import Image from 'next/image';

const simuladores = [
  { title: "Modelamento geométrico", img: "/conceber/simuladores/modelamento.png" },
  { title: "Análise de tensões", img: "/conceber/simuladores/tensoes.png" },
  { title: "Mecânica dos fluidos computacional", img: "/conceber/simuladores/fluidos.png" },
  { title: "Projeto óptico", img: "/conceber/simuladores/opticos.png" },
  { title: "Transferência de calor", img: "/conceber/simuladores/calor.png" },
];

export default function SimuladoresPage() {
  return (
    <div className="w-full bg-white pt-[160px] pb-20">
      <div className="max-w-[1355px] mx-auto px-6">
        
        {/* BARRA DE TÍTULO COM FILTRO */}
        <div className="w-full bg-[#0077C8] rounded-lg h-[60px] flex items-center justify-between px-6 mb-12 shadow-md">
          <h1 className="text-white text-[24px] font-bold">Simuladores multifísicos</h1>
          <div className="flex items-center gap-3">
            <span className="text-white text-sm font-medium">Filtrar</span>
            <select className="bg-white text-gray-700 rounded-md px-4 py-1 text-sm outline-none cursor-pointer min-w-[150px]">
              <option>Todos</option>
              <option>Mecânica</option>
              <option>Térmica</option>
              <option>Óptica</option>
            </select>
          </div>
        </div>

        {/* GRID DE SIMULADORES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {simuladores.map((sim, index) => (
            <div 
              key={index} 
              className="relative h-[380px] rounded-[20px] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all"
            >
              {/* Imagem do Simulador */}
              <Image 
                src={sim.img} 
                alt={sim.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Gradiente e Texto na base */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#181F37]/90 via-transparent to-[#D9D9D9]/5 flex items-end p-8">
                <h3 className="text-white text-[28px] font-bold leading-tight max-w-[80%]">
                  {sim.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* LINHA DIVISÓRIA AZUL FINAL */}
        <div className="w-full h-[6px] bg-[#0077C8] mt-24 rounded-full"></div>
      </div>
    </div>
  );
}