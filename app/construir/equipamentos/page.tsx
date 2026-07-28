"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { detalhesEquipamentos } from './data';
import ModalDetalhes from '@/app/components/ModalDetalhes';
import Link from 'next/link';

const criarSlug = (nome: string) => {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, '-');
};
    
// 1. Definição da lista de equipamentos oficiais integrada exatamente com as chaves do seu data.ts
const listaEquipamentos = [
  // --- MÁQUINAS INDUSTRIAIS E BANCADAS ---
  { nome: "Impressora 3D FDM", categorias: ["Fabricação Digital"], img: "/equipamentos/impressora.png" },
  { nome: "Impressora 3D SLA", categorias: ["Fabricação Digital"], img: "/equipamentos/sla.png" },
  { nome: "Cortadora a Laser CO2", categorias: ["Fabricação Digital"], img: "/equipamentos/laser.png" },
  { nome: "Gravadora Laser de Fibra", categorias: ["Fabricação Digital"], img: "/equipamentos/gravacaolaser.png" },
  { nome: "Router CNC", categorias: ["Fabricação Digital"], img: "/equipamentos/routercnc.png" },
  { nome: "Vacuum Forming", categorias: ["Fabricação Digital"], img: "/equipamentos/vacuum.png" },
  { nome: "Torno Convencional", categorias: ["Metal Mecânica"], img: "/equipamentos/torno.png" },
  { nome: "Fresadora Ferramenteira", categorias: ["Metal Mecânica"], img: "/equipamentos/fresadora.png" },
  { nome: "Serra Esquadria", categorias: ["Marcenaria", "Metal Mecânica"], img: "/equipamentos/esquadria.png" },
  { nome: "Serra Fita de Bancada", categorias: ["Marcenaria"], img: "/equipamentos/serrafita.png" },
  { nome: "Serra Fita Horizontal", categorias: ["Metal Mecânica"], img: "/equipamentos/fita-horizontal.png" },
  { nome: "Furadeira de Bancada", categorias: ["Metal Mecânica"], img: "/equipamentos/furadeira-bancada.png" },
  { nome: "Furadeira de Bancada com Rosqueadeira", categorias: ["Metal Mecânica"], img: "/equipamentos/furadeira-rosqueadeira.png" },
  { nome: "Furadeira de Bancada - Marcenaria", categorias: ["Marcenaria"], img: "/equipamentos/furadeira-marcenaria.png" },
  { nome: "Moto Esmeril de Bancada", categorias: ["Metal Mecânica"], img: "/equipamentos/moto-esmeril.png" },
  { nome: "Lixadeira Cinta/Disco", categorias: ["Marcenaria", "Metal Mecânica"], img: "/equipamentos/spolicorte.png" },
  { nome: "Afiadora Universal de Ferramentas", categorias: ["Metal Mecânica"], img: "/equipamentos/afiadora.png" },

  // --- FERRAMENTAS ELÉTRICAS PORTÁTEIS ---
  { nome: "Furadeira de Impacto", categorias: ["Ferramentas Elétricas"], img: "/equipamentos/furadeira-impacto.png" },
  { nome: "Serra Tico-Tico", categorias: ["Ferramentas Elétricas", "Marcenaria"], img: "/equipamentos/tico-tico.png" },
  { nome: "Lixadeira Orbital", categorias: ["Ferramentas Elétricas", "Marcenaria"], img: "/equipamentos/lixadeira-orbital.png" },
  { nome: "Lixadeira Roto-Orbital", categorias: ["Ferramentas Elétricas", "Marcenaria"], img: "/equipamentos/roto-orbital.png" },
  { nome: "Esmerilhadeira Angular 4½\"", categorias: ["Ferramentas Elétricas", "Metal Mecânica"], img: "/equipamentos/esmerilhadeira-pequena.png" },
  { nome: "Esmerilhadeira Angular 9\"", categorias: ["Ferramentas Elétricas", "Metal Mecânica"], img: "/equipamentos/esmerilhadeira-grande.png" },
  { nome: "Serra Rápida", categorias: ["Ferramentas Elétricas", "Metal Mecânica"], img: "/equipamentos/serra-rapida.png" },
  { nome: "Serra Circular Portátil", categorias: ["Ferramentas Elétricas", "Marcenaria"], img: "/equipamentos/circular-portatil.png" },
  { nome: "Serra de Mármore", categorias: ["Ferramentas Elétricas"], img: "/equipamentos/serra-marmore.png" },
  { nome: "Micro Retífica", categorias: ["Ferramentas Elétricas"], img: "/equipamentos/micro-retifica.png" },
  { nome: "Lixadeira/Politriz Angular", categorias: ["Ferramentas Elétricas", "Metal Mecânica"], img: "/equipamentos/politriz.png" },
];

// 2. Mapeamento de cores conforme o padrão visual estabelecido
const getCorCategoria = (cat: string) => {
  switch (cat) {
    case "Fabricação Digital": return "bg-[#E9D354] text-slate-900";
    case "Metal Mecânica": return "bg-[#191F37] text-white";
    case "Marcenaria": return "bg-[#0077C8] text-white";
    case "Ferramentas Elétricas": return "bg-[#FF6B35] text-white";
    default: return "bg-slate-500 text-white";
  }
};

export default function EquipamentosPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [modalAberto, setModalAberto] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  // 3. Cruzamento dinâmico entre o clique e o objeto de metadados técnicos
  const abrirDetalhes = (eq: any) => {
    const infoCompleta = { 
      ...eq, 
      infoTecnica: detalhesEquipamentos[eq.nome] 
    };

    console.log("DADOS ENCONTRADOS PARA O MODAL:", infoCompleta);

    setItemSelecionado(infoCompleta);
    setModalAberto(true);
  };

  // 4. Lógica do seletor de filtros múltiplos
  const equipamentosFiltrados = listaEquipamentos.filter(eq => 
    categoriaAtiva === "Todos" ? true : eq.categorias.includes(categoriaAtiva)
  );

  return (
    <div className="w-full bg-white pt-[160px] pb-20">
      <div className="max-w-[1355px] mx-auto px-6">
        
        {/* BARRA DE FILTRO INTEGRADA */}
        <div className="w-full bg-[#0077C8] rounded-xl h-[65px] flex items-center justify-between px-6 mb-12 shadow-sm border border-[#0066b3]">
          <h1 className="text-white text-[22px] font-black uppercase tracking-wider">Equipamentos</h1>
          <div className="flex items-center gap-3">
            <span className="text-white text-xs font-black uppercase tracking-widest">Filtrar por setor:</span>
            <select 
              value={categoriaAtiva}
              onChange={(e) => setCategoriaAtiva(e.target.value)}
              className="bg-white rounded-lg px-4 py-2 text-xs font-bold outline-none text-[#0077C8] cursor-pointer shadow-xs"
            >
              <option value="Todos">Exibir Tudo</option>
              <option value="Fabricação Digital">Fabricação Digital</option>
              <option value="Metal Mecânica">Metal Mecânica</option>
              <option value="Marcenaria">Marcenaria</option>
              <option value="Ferramentas Elétricas">Ferramentas Elétricas</option>
            </select>
          </div>
        </div>

        {/* CONTAINER DO GRID COMPACTO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[500px]">
          {equipamentosFiltrados.map((eq, idx) => (
            <div key={idx} className="relative h-[420px] rounded-2xl overflow-hidden group shadow-md flex flex-col justify-end border border-slate-100 transition-all duration-300 hover:shadow-xl">
              
              {/* COMPONENTE DE SELOS DA MÁQUINA */}
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 items-end">
                {eq.categorias.map((cat, i) => (
                  <span 
                    key={i} 
                    className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider shadow-xs ${getCorCategoria(cat)}`}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* RENDERIZADOR DA IMAGEM DE COMPONENTE */}
              <div className="absolute inset-0 z-0 bg-slate-50">
                <Image 
                  src={eq.img} 
                  alt={eq.nome} 
                  fill 
                  sizes="(max-w-7xl) 25vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-all duration-500" 
                />
              </div>

              {/* CAMADA DE DEGRADÊ ESCURO */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#191F37] via-[#191F37]/40 to-transparent opacity-90" />
              
              {/* ÁREA DE CONTEÚDO E RE-ROTEAMENTO */}
              <div className="relative z-20 p-6 w-full">
                <h3 className="text-white text-xl font-black mb-4 min-h-[56px] flex items-end leading-tight tracking-tight">{eq.nome}</h3>
                
                <div className="grid grid-cols-2 gap-2">
                  <Link 
                    href={`/construir/reservas/${criarSlug(eq.nome)}`}
                    className="bg-white text-[#191F37] py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-wider hover:bg-slate-100 transition-colors text-center flex items-center justify-center shadow-xs active:scale-[0.97]"
                  >
                    Reservar
                  </Link>
                  <button 
                    onClick={() => abrirDetalhes(eq)}
                    className="bg-transparent text-white border border-white/40 backdrop-blur-xs py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-wider hover:bg-white hover:text-[#191F37] hover:border-transparent transition-all shadow-xs active:scale-[0.97]"
                  >
                    Ver mais
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* MOCKUP FOOTER LINE */}
        <div className="w-full h-[4px] bg-[#0077C8] mt-24 rounded-full opacity-30"></div>
      </div>

      {/* COMPONENTE DO MODAL INJETADO */}
      <ModalDetalhes 
        isOpen={modalAberto} 
        onClose={() => setModalAberto(false)} 
        dados={itemSelecionado} 
      />
    </div>
  );
}