"use client";

import React from 'react';
import NextImage from 'next/image';

const laboratorios = [
  {
    id: 1,
    nome: "LabMetro – Laboratório de Metrologia",
    logo: "/Parceiros/labmetro.png",
    url: "https://labmetroufsc.wixsite.com/labmetro",
    descricao: "Medições e análises de alta precisão para validação de protótipos e componentes.",
    topicos: [
      "Medição de tensões e deformações",
      "Inspeção óptica",
      "Medição 3D de grandes estruturas",
      "Avaliação de danos e corrosão em peças"
    ]
  },
  {
    id: 2,
    nome: "LMP – Laboratório de Mecânica de Precisão",
    logo: "/Parceiros/lmp.png",
    url: "https://lmp.ufsc.br/",
    descricao: "Fabricação e análise de componentes com alto nível de precisão.",
    topicos: [
      "Usinagem de peças metálicas e não metálicas",
      "Análise metalográfica de materiais",
      "Processos a laser (solda, gravação e tratamento)",
      "Manufatura aditiva de metais"
    ]
  },
  {
    id: 3,
    nome: "LISHA – Laboratório de Integração de Hardware e Software",
    logo: "/Parceiros/lisha.png",
    url: "https://lisha.ufsc.br/",
    descricao: "Desenvolvimento de sistemas embarcados e integração entre hardware e software.",
    topicos: [
      "Sistemas embarcados e IoT",
      "Telecomunicações e sistemas digitais",
      "Arquitetura de sistemas e redes",
      "Aplicações em Indústria 4.0"
    ]
  },
   {
    id: 4,
    nome: "LabMat – Laboratório de Materiais",
    logo: "/Parceiros/LabMat.png",
    url: "https://labmat.ufsc.br/",
    descricao: "Pesquisa e desenvolvimento de materiais e superfícies para aplicações avançadas.",
    topicos: [
      "Desenvolvimento de ligas, compósitos e materiais especiais",
      "Tratamentos de superfície e revestimentos",
      "Caracterização e análise de materiais",
      "Estudos de desgaste, atrito e desempenho"
    ]
  },
   {
    id: 5,
    nome: "Lab Solda – Laboratório de Soldagem",
    logo: "/Parceiros/LabSolda.png",
    url: "https://labmat.ufsc.br/",
    descricao: "Desenvolvimento, análise e inspeção de processos de soldagem e união de materiais.",
    topicos: [
      "Ensaios não destrutivos e inspeção de soldas",
      "Desenvolvimento de processos de soldagem",
      "Análise de materiais (espectrometria)",
      "Técnicas avançadas: raio-X, termografia e alta velocidade",
    ]
  },
   {
    id: 6,
    nome: " LVA – Laboratório de Vibrações e Acústica",
    logo: "/Parceiros/LVA.png",
    url: "https://lva.ufsc.br/",
    descricao: "Análise e controle de vibrações e ruído em sistemas e protótipos.",
    topicos: [
      "Diagnóstico de vibrações e ruído",
      "Ensaios experimentais e análise modal",
      "Simulações vibro-acústicas (FEM, BEM)",
      "Consultorias e testes em acústica",
    ]
  }
];

export default function LaboratoriosParceirosPage() {
  return (
    <div className="w-full bg-[#f4f4f4] pt-[140px] pb-20 px-6">
      
      {/* 1. CABEÇALHO AZUL (ESTILO PÍLULA) */}
      <section className="max-w-[1355px] mx-auto mb-16">
        <div className="w-full bg-[#0077cc] rounded-2xl py-6 px-12 shadow-lg flex items-center">
          <h1 className="text-white text-[32px] font-black tracking-wide">
            Laboratórios Parceiros
          </h1>
        </div>
      </section>

      {/* 2. LISTA DE CARDS */}
      <section className="max-w-[1355px] mx-auto space-y-10">
        {laboratorios.map((lab) => (
          <div 
            key={lab.id} 
            className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-12 items-center border border-gray-100 transition-all duration-300 hover:shadow-md"
          >
            {/* LADO ESQUERDO: LOGO CLICÁVEL */}
            <a 
              href={lab.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block w-full md:w-[350px] shrink-0"
              title={`Visitar site do ${lab.nome}`}
            >
              <div className="relative h-[220px] border-2 border-[#0077cc] rounded-[30px] flex items-center justify-center p-10 bg-white transition-all duration-300 group-hover:border-[#E9D354] group-hover:scale-[1.03] group-hover:shadow-xl">
                <div className="relative w-full h-full">
                  <NextImage 
                    src={lab.logo} 
                    alt={lab.nome} 
                    fill 
                    className="object-contain" 
                    unoptimized 
                  />
                </div>
                {/* Indicador visual de link no hover */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#E9D354]">
                   <span className="text-[12px] font-black">Visitar ↗</span>
                </div>
              </div>
            </a>

           {/* LADO DIREITO: TEXTO E TÓPICOS (ESTILO BADGE) */}
            <div className="flex-1">
              <h2 className="text-[#191F37] text-[28px] font-black mb-4 leading-tight">
                {lab.nome}
              </h2>
              <p className="text-[#333333] text-[18px] mb-8 font-medium leading-relaxed opacity-90 text-justify">
                {lab.descricao}
              </p>
              
              {/* Tópicos em estilo "Nuvem de Tags / Badges" */}
              <div className="flex flex-wrap gap-3 mt-6">
                {lab.topicos.map((topico, index) => (
                  <span 
                    key={index} 
                    className="bg-[#f0f0f0] text-[#191F37] text-[14px] font-semibold px-5 py-2.5 rounded-full border border-gray-200 transition-colors hover:bg-[#E1EEF7] hover:border-[#0077cc]/30"
                  >
                    {topico}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}