// src/app/components/ModalDetalhes.tsx
"use client";
import Image from 'next/image';

export default function ModalDetalhes({ isOpen, onClose, dados }: any) {
  if (!isOpen || !dados) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose} // Fecha ao clicar no fundo escuro
    >
      <div 
        className="bg-white w-full max-w-[950px] rounded-3xl p-16 overflow-y-auto max-h-[95vh] relative shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar dentro do conteúdo
      >
        
        {/* CABEÇALHO */}
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-[42px] font-extrabold text-[#191F37]">{dados.nome}</h2>
          <div className="flex gap-2">
            {dados.infoTecnica?.tags?.map((tag: string) => (
              <span key={tag} className="bg-[#0077C8] text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
          {/* Botão de Fechar X */}
          <button 
            onClick={onClose} 
            className="ml-auto text-3xl font-bold hover:text-red-500 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* IMAGEM + ESPECIFICAÇÕES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="border-[3px] border-[#00A0E4] rounded-3xl p-6 flex items-center justify-center bg-white min-h-[400px] relative">
            <Image 
              src={dados.img} 
              alt={dados.nome} 
              width={350} 
              height={350} 
              className="object-contain" 
            />
          </div>

          <div className="border-[3px] border-[#00A0E4] rounded-3xl p-10 relative flex flex-col justify-between">
            <div className="space-y-3 text-[18px] text-[#191F37]">
              <p><strong>Descrição:</strong> {dados.infoTecnica?.descricao}</p>
              <p><strong>Marca:</strong> {dados.infoTecnica?.marca}</p>
              <p><strong>Modelo:</strong> {dados.infoTecnica?.modelo}</p>
              <p><strong>Volume:</strong> {dados.infoTecnica?.volume}</p>
              <p><strong>Materiais:</strong> {dados.infoTecnica?.materiais?.join(", ")}</p>
            </div>
            <button className="bg-[#E9D354] text-[#191F37] font-extrabold py-4 px-12 rounded-xl self-end shadow-lg hover:scale-105 transition-all">
              RESERVAR
            </button>
          </div>
        </div>

        {/* USO E RISCO */}
        <div className="bg-[#EAEAEA] rounded-2xl p-8 mb-6">
          <h4 className="font-bold text-xl mb-3 text-[#191F37]">Uso do equipamento</h4>
          <p className="text-[#191F37] leading-relaxed">{dados.infoTecnica?.uso}</p>
        </div>

        {/* ALERTA DE RISCO - VERSÃO SVG (FIXA E LEGÍVEL) */}
        <div className="bg-[#F8EFA0] rounded-2xl p-8 flex gap-8 items-center border-l-[12px] border-[#E9D354]">
          <div className="relative shrink-0 w-24 h-24 flex items-center justify-center">
            {/* TRIÂNGULO SVG */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-sm">
              <path 
                d="M50 10 L90 85 L10 85 Z" 
                fill="#E9D354" 
                stroke="#191F37" 
                strokeWidth="3" 
                strokeLinejoin="round" 
              />
            </svg>
            {/* NÚMERO E TEXTO */}
            <div className="relative z-10 flex flex-col items-center pt-4">
              <span className="text-[#191F37] text-3xl font-black leading-none">
                {dados.infoTecnica?.nivelRisco}
              </span>
              <span className="text-[#191F37] text-[7px] font-bold uppercase mt-1">
                nível de risco
              </span>
            </div>
          </div>
          <p className="text-[#191F37] font-medium leading-snug">
            {dados.infoTecnica?.risco}
          </p>
        </div>
      </div>
    </div>
  );
}