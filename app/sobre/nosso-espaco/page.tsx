"use client";

import React from 'react';
import Image from 'next/image';

export default function NossoEspacoPage() {
  const possibilidades = [
    { titulo: "Simuladores multifísicos", img: "/espaco/simuladores.jpg" },
    { titulo: "Corte", img: "/espaco/corte.jpg" },
    { titulo: "Usinagem", img: "/espaco/usinagem.jpg" },
    { titulo: "Manufatura aditiva", img: "/espaco/manufatura.jpg" },
    { titulo: "Laboratórios de integração", img: "/espaco/integracao.jpg" },
    { titulo: "Facilidades de testes", img: "/espaco/testes.jpg" },
    { titulo: "Contratação de Serviços", img: "/espaco/servicos.jpg" },
    { titulo: "Parceiros", img: "/espaco/parceiros.jpg" },
  ];

  return (
    <div className="w-full bg-white pt-[120px] pb-20">
      
      {/* 1. TÍTULO PRINCIPAL (ESTILO PÍLULA) */}
      <section className="max-w-[1355px] mx-auto px-6 mb-12">
        <div className="w-full bg-[#0077cc] rounded-2xl py-5 px-12 shadow-lg flex items-center">
          <h1 className="text-white text-[32px] font-extrabold">Nosso Espaço</h1>
        </div>
      </section>

      {/* 2. ONDE ESTAMOS (MAPA E TEXTO) */}
      <section className="max-w-[1355px] mx-auto px-6 mb-24">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Fotos e Mapa */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-[250px] rounded-2xl overflow-hidden shadow-md">
                <Image src="/sobre/espaco/sapiens-parque.png" alt="Sapiens Parque" fill className="object-cover" unoptimized />
                <span className="absolute bottom-2 right-4 text-white text-xs font-bold drop-shadow-md">Sapiens Parque</span>
              </div>
              <div className="relative h-[260px] rounded-2xl overflow-hidden shadow-md">
                <Image src="/sobre/espaco/inpetu-hub.png" alt="InPETU Hub" fill className="object-cover" unoptimized />
                <span className="absolute bottom-2 right-4 text-white text-xs font-bold drop-shadow-md">InPETU Hub</span>
              </div>
            </div>
            <div className="relative h-full rounded-2xl overflow-hidden shadow-md border border-gray-100">
              {/* Substitua pelo Iframe do Google Maps se desejar */}
              <div className="relative h-full rounded-2xl overflow-hidden shadow-md border border-gray-100 min-h-[420px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3541.236959122788!2d-48.442897599999995!3d-27.430725000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x952743b3f1a2b6bf%3A0xcdd106387e1354b7!2sInstituto%20de%20Inova%C3%A7%C3%A3o%2C%20Pesquisa%2C%20Empreendedorismo%20e%20Tecnologia%20da%20UFSC%20(InPETU%20hub)!5e0!3m2!1spt-BR!2sbr!4v1769610527751!5m2!1spt-BR!2sbr" 
                     width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização InpeTU Maker"
                    className="absolute inset-0"
                ></iframe>
                </div>
            </div>
          </div>

          {/* Texto Informativo */}
          <div className="flex-1">
            <h2 className="text-[#0077cc] text-[40px] font-black mb-6">Onde estamos</h2>
            <div className="text-[#333333] text-[18px] leading-relaxed space-y-6 text-justify whitespace-pre-line">
              {`O InPETU Maker está localizado no Sapiens Parque, um dos principais polos de inovação tecnológica de Santa Catarina, reconhecido por reunir empresas, centros de pesquisa, universidades e iniciativas voltadas ao desenvolvimento científico, tecnológico e industrial. Essa localização estratégica insere o laboratório em um ambiente que estimula a inovação, a colaboração e a troca constante de conhecimento.

Integrado ao Centro de Inovação, Pesquisa, Empreendedorismo e Tecnologia da Universidade Federal de Santa Catarina (InPETU), o Maker faz parte de um ecossistema que conecta ensino, pesquisa e desenvolvimento tecnológico, aproximando a universidade do mercado e da sociedade. Estar no Sapiens Parque amplia as possibilidades de parcerias, projetos colaborativos e transferência de tecnologia, fortalecendo a atuação do laboratório como um espaço de inovação aplicada.`}
            </div>
          </div>
        </div>
      </section>

      {/* 3. NOSSA INFRAESTRUTURA (CINZA) */}
      <section className="w-full bg-[#F5F5F5] py-20 px-6 mb-24">
        <div className="max-w-[1355px] mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-[#0077cc] text-[36px] font-black mb-6">Nossa infraestrutura</h2>
            <p className="text-[#333333] text-[18px] leading-relaxed mb-8 text-justify">
              O InPETU Maker conta com uma infraestrutura distribuída em dois andares, projetada para atender diferentes etapas do processo de prototipagem, desde a concepção até a construção, integração e avaliação de projetos.

O espaço reúne áreas de fabricação digital, usinagem, montagem, eletrônica e apoio técnico, além de ambientes voltados ao aprendizado e à colaboração. Essa organização permite o uso seguro e eficiente dos equipamentos, promovendo autonomia aos usuários e facilitando o desenvolvimento de projetos de diferentes níveis de complexidade.
            </p>
            <button className="bg-[#0077cc] text-white font-bold py-3 px-10 rounded-lg hover:bg-[#0377CC] transition-all">
              Tour pelo espaço
            </button>
          </div>
          {/* Imagem com Sombra Quadrada */}
          <div className="flex-1 relative h-[400px] flex items-center justify-center">
            <div className="absolute w-[80%] h-[90%] bg-[#D9D9D9] rounded-2xl translate-x-6 -translate-y-6"></div>
            <div className="relative w-[80%] h-[90%] bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex items-center justify-center">
                <Image src="/sobre/espaco/infraestrutura.png" alt="InPETU Hub" fill className="object-cover" unoptimized />
               
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONHEÇA AS POSSIBILIDADES (GRID) */}
      <section className="max-w-[1355px] mx-auto px-6 mb-20">
        <h2 className="text-[#0077cc] text-[36px] font-black mb-2">Conheça as possibilidades</h2>
        <p className="text-[#333333] text-[18px] mb-12">
          Temos um parque de máquinas grande, que favorece a construção de protótipo de engenharia.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {possibilidades.map((item, index) => (
            <div key={index} className="group relative h-[280px] rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-[#0077cc] transition-all">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              {/* Placeholder para imagem */}
              <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                 <span className="text-gray-400 italic">Foto {item.titulo}</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <h3 className="text-white text-[20px] font-black leading-tight group-hover:text-[#E9D354] transition-colors">
                  {item.titulo}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}