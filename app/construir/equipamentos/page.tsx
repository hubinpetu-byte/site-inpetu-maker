"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { detalhesEquipamentos } from './data';
import ModalDetalhes from '@/app/components/ModalDetalhes';

// 1. Definição da lista de equipamentos (certifique-se de que os nomes batam com o data.ts)
const listaEquipamentos = [
  { nome: "Impressora 3D FDM", categorias: ["Fabricação Digital"], img: "/equipamentos/impressora.png" },
  { nome: "Torno Mecânico", categorias: ["Metal Mecânica", "Marcenaria"], img: "/equipamentos/torno.png" },
  { nome: "Serra fita de bancada", categorias: ["Marcenaria"], img: "/equipamentos/serrafita.png" },
  { nome: "Cortadora Laser", categorias: ["Fabricação Digital"], img: "/equipamentos/laser.png" },
  { nome: "Serra Esquadria", categorias: ["Metal Mecânica", "Marcenaria"], img: "/equipamentos/esquadria.png" },
  { nome: "Gravação Laser por Fibra", categorias: ["Fabricação Digital"], img: "/equipamentos/gravacaolaser.png" },
  { nome: "Impressora 3D SLA", categorias: ["Fabricação Digital"], img: "/equipamentos/sla.png" },
  { nome: "Serra Policorte", categorias: ["Metal Mecânica", "Marcenaria"], img: "/equipamentos/spolicorte.png" },
];

// 2. Função auxiliar para definir as cores dos selos conforme o protótipo
const getCorCategoria = (cat: string) => {
  switch (cat) {
    case "Fabricação Digital": return "bg-[#E9D354]"; // Amarelo
    case "Metal Mecânica": return "bg-[#191F37]";    // Azul Escuro
    case "Marcenaria": return "bg-[#0077C8]";        // Azul Royal
    default: return "bg-gray-500";
  }
};

export default function EquipamentosPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [modalAberto, setModalAberto] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  // 3. Função para abrir o modal buscando os dados técnicos
  const abrirDetalhes = (eq: any) => {
    const infoCompleta = { 
      ...eq, 
      infoTecnica: detalhesEquipamentos[eq.nome] 
    };
    setItemSelecionado(infoCompleta);
    setModalAberto(true);
  };

  // 4. Lógica de filtro para múltiplos selos
  const equipamentosFiltrados = listaEquipamentos.filter(eq => 
    categoriaAtiva === "Todos" ? true : eq.categorias.includes(categoriaAtiva)
  );

  return (
    <div className="w-full bg-white pt-[160px] pb-20">
      <div className="max-w-[1355px] mx-auto px-6">
        
        {/* BARRA DE FILTRO */}
        <div className="w-full bg-[#0077C8] rounded-lg h-[60px] flex items-center justify-between px-6 mb-12 shadow-md">
          <h1 className="text-[white] text-[24px] font-bold uppercase tracking-tight">Equipamentos</h1>
          <div className="flex items-center gap-3">
            <span className="text-[#0077cc] text-sm font-medium">Filtrar</span>
            <select 
              onChange={(e) => setCategoriaAtiva(e.target.value)}
              className="bg-white rounded-md px-4 py-1 text-sm font-bold outline-none text-[#0077cc] cursor-pointer"
            >
              <option value="Todos">Todos</option>
              <option value="Fabricação Digital">Fabricação Digital</option>
              <option value="Metal Mecânica">Metal Mecânica</option>
              <option value="Marcenaria">Marcenaria</option>
            </select>
          </div>
        </div>

        {/* GRID DE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[500px]">
          {equipamentosFiltrados.map((eq, idx) => (
            <div key={idx} className="relative h-[420px] rounded-lg overflow-hidden group shadow-lg flex flex-col justify-end border border-gray-100">
              
              {/* NOVO: CONTAINER DE SELOS (TOP RIGHT) */}
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
                {eq.categorias.map((cat, i) => (
                  <span 
                    key={i} 
                    className={`px-3 py-1 rounded-sm text-[10px] font-bold text-white uppercase shadow-sm ${getCorCategoria(cat)}`}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* IMAGEM DE FUNDO */}
              <div className="absolute inset-0 z-0">
                <Image src={eq.img} alt={eq.nome} fill className="object-cover group-hover:scale-105 transition-all duration-500" />
              </div>

              {/* DEGRADÊ PARA LEGIBILIDADE */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#191F37] via-[#191F37]/20 to-transparent" />
              
              {/* CONTEÚDO DO CARD */}
              <div className="relative z-20 p-6">
                <h3 className="text-white text-[22px] font-bold mb-4 min-h-[54px]">{eq.nome}</h3>
                <div className="flex gap-2">
                   <button className="flex-1 bg-white text-black py-2 rounded font-bold text-xs uppercase hover:bg-gray-100 transition-colors">
                     Reservar
                   </button>
                   <button 
                     onClick={() => abrirDetalhes(eq)}
                     className="flex-1 bg-white text-black py-2 rounded font-bold text-xs uppercase hover:bg-gray-100 transition-colors"
                   >
                     Ver mais
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LINHA DE FECHAMENTO AZUL */}
        <div className="w-full h-[6px] bg-[#0077C8] mt-24 rounded-full"></div>
      </div>

      {/* MODAL DETALHES */}
      <ModalDetalhes 
        isOpen={modalAberto} 
        onClose={() => setModalAberto(false)} 
        dados={itemSelecionado} 
      />
    </div>
  );
}