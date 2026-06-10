"use client";

import React from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ArrowRight } from "lucide-react";

// Configurando a nossa fonte oficial
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

interface Etapa {
  numero: string;
  texto: string;
}

interface ServicoPremium {
  id: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  etapas: Etapa[];
  linkAction: string;
}

export default function ServicosPage() {
  const servicos: ServicoPremium[] = [
    {
      id: "Faça Você Mesmo",
      titulo: "Uso livre",
      subtitulo: "Ninguém materializa sua ideia melhor do que você.",
      descricao: "Tenha acesso autônomo e gratuito às ferramentas e equipamentos do laboratório para criar seus próprios projetos de forma independente.",
      linkAction: "/servicos/uso-livre",
      etapas: [
        { numero: "1", texto: "Cadastre-se no site do InPETU Maker" },
        { numero: "2", texto: "Faça a capacitação e seja habilitado" },
        { numero: "3", texto: "Reserve um horário e venha utilizar" }
      ]
    },
    {
      id: "Deixa com a gente",
      titulo: "Prototipagem sob demanda",
      subtitulo: "Se você tem a ideia, mas não tem tempo para executar.",
      descricao: "Nossa equipe de técnicos e bolsistas transforma o seu projeto digital em um protótipo físico real, com máxima qualidade e precisão.",
      linkAction: "/servicos/sob-demanda",
      etapas: [
        { numero: "1", texto: "Envie os arquivos e detalhes da sua ideia" },
        { numero: "2", texto: "Nós fabricamos com as melhores tecnologias" },
        { numero: "3", texto: "Pronto! Retire seu protótipo" }
      ]
    },
    {
      id: "Experiência Prática",
      titulo: "Workshops",
      subtitulo: "Oficinas dinâmicas para colocar a mão na massa.",
      descricao: "Aprenda novas habilidades técnicas, descubra o potencial das máquinas do ecossistema e mergulhe de cabeça na cultura maker.",
      linkAction: "/auth",
      etapas: [
        { numero: "1", texto: "Desenvolva o Pensamento Crítico e Fora da Caixa" },
        { numero: "2", texto: "Aprenda na Prática em Oficinas fora do Convencional" },
        { numero: "3", texto: "Conquiste sua Certificação e Novas Habilitações" }
      ]
    }
  ];

  return (
    <div className={`${plusJakartaSans.className} min-h-screen bg-white pb-32 pt-[160px] antialiased text-black`}>
      <div className="max-w-[1300px] mx-auto px-10">


          {/* 🌟 TÍTULO DA PÁGINA: Agora puxando o azul #0077cc no final do gradiente */}
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-950 to-[#0077cc] bg-clip-text text-transparent">
            Nossos Serviços
          </h1>

        {/* ESTRUTURA HORIZONTAL E COMPARATIVA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-slate-200 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {servicos.map((servico, index) => (
            <div 
              key={index} 
              className="pt-10 pb-12 lg:px-8 flex flex-col justify-between min-h-[520px] transition-all duration-300 hover:bg-slate-50/30 group"
            >
              <div>
                {/* TAG SUPERIOR */}
                <div className="inline-block bg-[#0077cc] text-white text-[10px] font-bold px-3 py-1 mb-4 rounded-sm tracking-wider">
                  {servico.id}
                </div>

                {/* TÍTULO DO CARD */}
                <h2 className="text-2xl font-extrabold text-[#0077cc] tracking-tight mb-2">
                  {servico.titulo}
                </h2>
                
                {/* 🌟 SUBTÍTULO REFORMULADO: Mesma cor/tamanho da descrição, mas Negrito (font-bold) e com mais espaçamento (tracking-wide) */}
                <p className="text-slate-600 text-sm font-bold leading-relaxed mb-6">
                  {servico.subtitulo}
                </p>

                {/* DESCRIÇÃO */}
                <p className="text-slate-600 text-sm font-medium leading-relaxed mb-8">
                  {servico.descricao}
                </p>

                {/* ETAPAS 1, 2, 3 COMPARATIVAS */}
                <div className="space-y-5">
                  {servico.etapas.map((etapa, eIdx) => (
                    <div key={eIdx} className="flex items-center gap-4">
                      {/* Quadrado do número */}
                      <span className="w-5 h-5 bg-blue-100 text-[#0077cc] text-[10px] font-bold flex items-center justify-center shrink-0 rounded-sm">
                        {etapa.numero}
                      </span>
                      
                      {/* 🌟 TEXTO DA ETAPA REFORMULADO: Agora usa a mesma cor (text-slate-600), tamanho (text-sm) e peso regular/médio (font-medium) da descrição */}
                      <span className="text-slate-600 font-medium text-sm leading-tight">
                        {etapa.texto}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BOTÃO DISCRETO DE DESCOBRIR MAIS */}
              <div className="mt-12 pt-6 border-t border-slate-100">
                <a 
                  href={servico.linkAction}
                  className="inline-flex items-center gap-2 border border-[#0077cc] text-[#0077cc] px-5 py-2 text-xs font-bold tracking-wider hover:bg-[#0077cc] hover:text-white transition-all duration-200 rounded-md"
                >
                  Descobrir mais <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}