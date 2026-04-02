"use client";

import React from 'react';
import Image from 'next/image';
import NextImage from 'next/image'; // O nome aqui deve ser NextImage
import Link from "next/link";

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
      

       {/* 1. TÍTULO PRINCIPAL*/}
<section className="relative w-full pt-[40px] pb-20 px-6 c">
      <div className="max-w-[1355px] mx-auto flex flex-col md:flex-row items-stretch gap-0 overflow-hidden rounded-[40px] shadow-lg">
        
        {/* LADO ESQUERDO: TEXTOS E BOTÕES (Retângulo Branco) */}
        <div className="flex-1 bg-white p-10 lg:p-20 flex flex-col justify-center">
          <span className="text-[#191F37] font-medium text-[16px] mb-2 block lowercase">
            conheça
          </span>
          <h1 className="text-[#191F37] text-[48px] md:text-[64px] font-black leading-tight mb-8">
            Nosso Espaço
          </h1>
          <p className="text-[#191F37] text-[18px] md:text-[20px] leading-relaxed mb-12 max-w-[500px]">
            O InPETU Maker é um laboratório de prototipagem voltado ao desenvolvimento de projetos, reunindo infraestrutura, equipamentos e suporte técnico para transformar ideias em protótipos funcionais.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/construir/equipamentos">
              <button className="bg-[#D9D9D9] text-[#191F37] font-bold py-3 px-8 rounded-lg text-sm hover:bg-gray-300 transition-colors">
                Conhecer equipamentos
              </button>
            </Link>
            <button className="bg-[#0077cc] text-white font-bold py-3 px-8 rounded-lg text-sm shadow-md hover:bg-[#005fa3] transition-colors">
              Agendar visita
            </button>
          </div>
        </div>

        {/* LADO DIREITO: IMAGEM (Retângulo com Imagem) */}
        <div className="flex-1 relative min-h-[400px] md:min-h-full bg-[#f4f4f4]">
          <Image 
            src="/sobre/principal.png" 
            alt="Ambiente InPETU Maker" 
            fill 
            className="object-cover"
            unoptimized
          />
          {/* Overlay sutil para manter o padrão visual */}
          <div className="absolute inset-0 border-l-4 border-white hidden md:block"></div>
        </div>

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
              {`O InPETU Maker está localizado no Sapiens Parque, um dos principais polos de inovação tecnológica de Santa Catarina, que reúne empresas, centros de pesquisa, universidades e iniciativas voltadas ao desenvolvimento científico e tecnológico.

Integrado ao Centro de Inovação, Pesquisa, Empreendedorismo e Tecnologia da Universidade Federal de Santa Catarina, o laboratório faz parte de um ecossistema que conecta ensino, pesquisa e mercado. Essa localização estratégica amplia oportunidades de colaboração, projetos conjuntos e transferência de tecnologia.`}
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
             O laboratório conta com uma infraestrutura distribuída em dois andares, projetada para atender às diferentes etapas do processo de prototipagem, da concepção à construção, integração e avaliação de projetos.
</p>
<p className="text-[#333333] text-[18px] leading-relaxed mb-8 text-justify">O espaço reúne áreas de fabricação digital, usinagem,montagem, eletrônica, metrologia, caracterização de materiais, visão computacional e suporte técnico, além de ambientes dedicados ao
aprendizado e à colaboração.
</p>
<p className="text-[#333333] text-[18px] leading-relaxed mb-8 text-justify">Essa organização permite o uso seguro e eficiente dos equipamentos, promovendo autonomia aos usuários e viabilizando o desenvolvimento de projetos de diferentes níveis de complexidade.
            </p>
            {/* <button className="bg-[#0077cc] text-white font-bold py-3 px-10 rounded-lg hover:bg-[#0377CC] transition-all"> */}
              {/* Tour pelo espaço */}
            {/* </button> */}
          </div>
          {/* Imagem com Sombra Quadrada */}
          <div className="flex-1 relative h-[400px] flex items-center justify-center">
            <div className="absolute w-[80%] h-[90%] bg-[#D9D9D9] rounded-2xl translate-x-6 -translate-y-6"></div>
            <div className="relative w-[90%] h-[90%] bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex items-center justify-center">
                <Image src="/sobre/espaco/infraestrutura.png" alt="InPETU hub" fill className="object-cover" unoptimized />
               
            </div>
          </div>
        </div>
      </section>
{/* 4. Reserva de espaços */}
      <section className="w-full py-16 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto bg-white rounded-[40px] shadow-xl p-4 md:p-16 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        {/* Lado Esquerdo: Imagem com Moldura Cinza */}
        <div className="relative w-full md:w-1/2 aspect-[4/3]">
          {/* Quadro Cinza de Fundo (Efeito Decorativo) */}
          <div className="absolute top-0 left-0 w-[90%] h-[90%] bg-[#D9D9D9] rounded-[20px] z-0"></div>
          
          {/* Imagem Frontal com Borda Azul */}
          <div className="absolute bottom-0 right-0 w-[92%] h-[92%] rounded-[20px] overflow-hidden border-4 border-[#0077cc] shadow-xl z-10">
            <Image
              src="/sobre/espacos.png" // Substitua pelo caminho da sua imagem
              alt="Espaços reservados para prototipagem"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* Lado Direito: Texto e Botão */}
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <h2 className="text-[#0077cc] text-[32px] md:text-[40px] font-black leading-tight mb-6">
            Espaços reservados para prototipagem
          </h2>
          
          <div className="text-[#333333] text-[16px] md:text-[18px] leading-relaxed space-y-6 text-justify">
            <p>
              O InPETU Maker também disponibiliza salas reservadas para equipes,
              startups e pesquisadores que precisam desenvolver projetos em um
              ambiente (reservado). Esses espaços são ideais para protótipos que
              exigem maior foco, organização e continuidade de testes.
            </p>
            <p>
              As salas podem ser utilizadas por período determinado e ficam
              integradas à infraestrutura do laboratório, contando também com
              áreas de montagem reservadas para projetos que necessitam de maior
              privacidade.
            </p>
          </div>

          <button className="mt-10 px-10 py-3 border-2 border-[#0077cc] text-[#0077cc] font-bold rounded-lg hover:bg-[#0077cc] hover:text-white transition-all duration-300">
            Reservar Espaço
          </button>
        </div>
      </div>
    </section>

{/* 5. CONHEÇA AS POSSIBILIDADES (GRID) */}
<section className="max-w-[1355px] mx-auto px-6 mb-20">
  <h2 className="text-[#0077cc] text-[36px] font-black mb-2">Conheça as possibilidades</h2>
  <p className="text-[#333333] text-[18px] mb-12">
    Temos um parque de máquinas grande, que favorece a construção de protótipos de engenharia.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {[
      { titulo: "Simuladores multifísicos", img: "manufatura.png", href: "/conceber/simuladores" },
      { titulo: "Corte", img: "corte.png", href: "/construir/equipamentos" },
      { titulo: "Usinagem", img: "usinagem.png", href: "/construir/equipamentos" },
      { titulo: "Manufatura Aditiva", img: "aditiva.png", href: "/construir/equipamentos" },
      { titulo: "Laboratório de Integração", img: "integracao.png", href: "/integrar" },
      { titulo: "Facilidades de testes", img: "testes.png", href: "/avaliar" },
      { titulo: "Contratação de Serviços", img: "contratação.png", href: "/servicos/sob-demanda" },
      { titulo: "Parceiros", img: "parceiros.png", href: "/sobre-nos" },
    ].map((item, index) => (
      <Link 
        key={index} 
        href={item.href}
        className="group relative h-[280px] rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-[#0077cc] transition-all cursor-pointer block"
      >
        {/* Camada de Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
        
        {/* A IMAGEM REAL */}
        <div className="absolute inset-0">
          <NextImage 
            src={`/possibilidades/${item.img}`} 
            alt={item.titulo}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized 
          />
        </div>

        {/* TÍTULO SOBRE A IMAGEM */}
        <div className="absolute bottom-6 left-6 right-6 z-20">
          <h3 className="text-white text-[20px] font-black leading-tight group-hover:text-[#E9D354] transition-colors">
            {item.titulo}
          </h3>
          {/* Opcional: Pequeno indicador visual de "clique" */}
          <span className="text-[10px] text-[#E9D354] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            Acessar página →
          </span>
        </div>
      </Link>
    ))}
  </div>
</section>

    </div>
  );
}