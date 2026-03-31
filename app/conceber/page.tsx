"use client";

import React from 'react';
import Image from 'next/image';

export default function ConceberPage() {
  return (
    <div className="w-full bg-[#FAFAFA] pt-[0px] pb-20">
      
      {/* BLOCO 1 – BANNER COM TEXTO ALINHADO À ESQUERDA */}
      <section className="w-full"> 
        <div className="w-full h-[520px] relative"> 
          <Image 
            src="/banners/banner_conceber.png " 
            alt="Banner Conceber - InPETU Maker"
            fill
            className="object-cover"
            priority
            quality={100}
            unoptimized={true}
          />
          
          {/* FADE E ALINHAMENTO: max-w-[1355px] centralizado garante o alinhamento com o restante do site */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/40 to-transparent flex items-end pb-20 px-6">
            <div className="max-w-[1355px] w-full mx-auto">
                <h1 className="text-[#0077cc] text-[64px] font-extrabold leading-tight">
                  Conceber
                </h1>
                <p className="text-[#0077cc] text-[24px] font-medium max-w-2xl mt-2">
                   Fase inicial para transformar ideias em protótipos consistentes.
                </p>
            </div>
          </div>
        </div>
      </section>

     {/* BLOCO 2 – COMO FUNCIONA (RESPONSIVO) */}
      <section className="w-full px-6 py-20 md:py-25 bg-[#FFFFFF]">
        <div className="max-w-[1355px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          
          {/* Lado Esquerdo: Quadro Cinza + Imagem Sobreposta */}
          <div className="relative h-[480px] w-full hidden md:flex items-center">
            {/* Quadro Cinza de Fundo (Substituindo a imagem traseira) */}
            <div className="absolute top-0 left-4 w-[340px] h-[400px] bg-[#D9D9D9] rounded-[20px] shadow-lg border-4 border-white flex items-center justify-center">
              {/* Ícone de placeholder opcional ou apenas o fundo sólido */}
              <div className="w-18 h-12 border-2 border-gray-400 rounded-full opacity-20"></div>
            </div>
            
            {/* Imagem de Frente (Mantida) */}
            <div className="absolute bottom-0 left-[140px] w-[340px] h-[400px] bg-white rounded-[20px] shadow-2xl border-4 border-white z-10 overflow-hidden">
                <Image 
                  src="/conceber/img2.png" 
                  alt="Conceito em destaque" 
                  fill 
                  className="object-cover" 
                  unoptimized 
                />
            </div>
          </div>

          {/* Lado Direito: Texto Institucional */}
          <div className="w-full">
            <h2 className="text-[#0377CC] text-[36px] md:text-[48px] font-extrabold leading-tight mb-4 text-center md:text-left">
              Como funciona
            </h2>
            <p className="text-[#00A0E4] text-[20px] md:text-[24px] font-bold mb-6 text-center md:text-left">
              Sua ideia ganha forma e viabilidade técnica
            </p>
            <div className="text-[#333333] text-[18px] md:text-[20px] leading-relaxed text-justify space-y-4">
              <p>
                A etapa <b>Conceber</b> é onde as ideias ganham forma antes da construção física do protótipo. 
              </p>
              <p>
                Nessa fase, o InPETU Maker oferece ferramentas de <b>modelagem geométrica, simulação e análise técnica</b> que permitem avaliar conceitos, testar soluções e tomar decisões com mais segurança.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* BLOCO 3 – SERVIÇOS DISPONÍVEIS NESSA ETAPA */}
      <section className="w-full px-6 py-20 bg-white">
        <div className="max-w-[1355px] mx-auto">
          
          {/* TÍTULO COM LINHA AMARELA */}
          <div className="flex flex-col items-center mb-16">
            <div className="w-20 h-[3px] bg-[#E9D354] mb-4"></div>
            <h2 className="text-[#0077cc] text-[40px] font-extrabold text-center">
              Serviços disponíveis nessa etapa
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* CARD 1: MENTORIA TÉCNICA */}
            <div className="relative h-[480px] rounded-lg overflow-hidden flex flex-col justify-end p-8 text-left group hover:shadow-2xl transition-all">
              <div className="absolute inset-0 z-0">
                <Image 
                  src="/conceber/Mentorias.png" 
                  alt="Mentoria" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#181F37]/20 to-[#181F37]/90" />
              <div className="relative z-20">
                <h3 className="text-white text-[28px] font-bold leading-tight">Mentoria técnica</h3>
                <p className="text-white/90 text-[16px] mt-2">Apoio especializado para validar a viabilidade do seu projeto.</p>
              </div>
            </div>

            {/* CARD 2: SOFTWARES DE MODELAGEM - CLICÁVEL */}
<a 
  href="/conceber/simuladores" 
  className="relative h-[480px] rounded-lg overflow-hidden flex flex-col justify-end p-8 text-left group hover:shadow-2xl transition-all cursor-pointer"
>
  <div className="absolute inset-0 z-0">
    <Image 
      src="/conceber/Softwares.png" 
      alt="Softwares" 
      fill 
      className="object-cover group-hover:scale-110 transition-transform duration-500" 
    />
  </div>
  
  {/* Gradiente para garantir a leitura do texto branco sobre a imagem */}
  <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#181F37]/20 to-[#181F37]/90" />
  
  <div className="relative z-20">
    <h3 className="text-white text-[28px] font-bold leading-tight">Softwares de modelagem</h3>
    <p className="text-white/90 text-[16px] mt-2">Acesso a ferramentas avançadas de CAD e simulação física.</p>
    
    {/* Indicador visual de ação para o usuário */}
    <span className="text-[#E9D354] text-[12px] font-bold uppercase mt-4 block opacity-0 group-hover:opacity-100 transition-opacity">
      Ver softwares disponíveis →
    </span>
  </div>
</a>

            {/* CARD 3: COWORKING E TROCA */}
            <div className="relative h-[480px] rounded-lg overflow-hidden flex flex-col justify-end p-8 text-left group hover:shadow-2xl transition-all">
              <div className="absolute inset-0 z-0">
                <Image 
                  src="/conceber/Coworking.png" 
                  alt="Coworking" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#181F37]/20 to-[#181F37]/90" />
              <div className="relative z-20">
                <h3 className="text-white text-[28px] font-bold leading-tight">Coworking e troca</h3>
                <p className="text-white/90 text-[16px] mt-2">Espaço colaborativo para networking com outros makers.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

{/* BLOCO 4 – PASSO A PASSO */}
      <section className="w-full px-6 py-24 bg-[#FAFAFA]">
        <div className="max-w-[1355px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14">
          
          {/* LADO ESQUERDO: LINHA DO TEMPO */}
          <div className="relative">
            <h2 className="text-[#0077cc] text-[40px] font-extrabold mb-2">Passo a passo</h2>
            <p className="text-[#333333] text-[22px] mb-12 font-bold">Um guia para sua jornada maker</p>

            <div className="relative pl-4">
              {/* LINHA PONTILHADA AZUL */}
              <div className="absolute left-[48px] top-4 bottom-4 w-[2px] border-l-2 border-dotted border-[#0077cc] z-0"></div>

              {/* ITENS DA LINHA DO TEMPO */}
              <div className="flex flex-col gap-10 text-[#0077cc] text-[32px] font-medium" >
                {[
                  { n: "01", t: "Cadastro na plataforma Maker" },
                  { n: "02", t: "Treinamento obrigatório (segurança + visita guiada)" },
                  { n: "03", t: "Mentoria técnica inicial" },
                  { n: "04", t: "Liberação para a fase de construção" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-8 relative z-10 group">
                    {/* CÍRCULO COM NÚMERO AJUSTADO PARA 32px */}
                    <div className="w-[64px] h-[64px] bg-white border-2 border-[#0077cc] rounded-full flex items-center justify-center text-[#0077cc] font-bold text-[32px] group-hover:bg-[#0077cc] group-hover:text-white transition-colors shrink-0">
                      {item.n}
                    </div>               
                    {/* TEXTO DO PASSO */}
                    <p className="text-[#333333] text-[20px] font-medium leading-tight">
                      {item.t}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LADO DIREITO: IMAGENS SOBREPOSTAS (Padrão InPETU) */}
          {/* LADO DIREITO: Quadro Cinza + Imagem Sobreposta */}
            <div className="relative h-[550px] w-full hidden md:flex items-center justify-center">
              {/* Quadro Cinza Superior (Substituindo a imagem traseira) */}
              <div className="absolute top-0 right-5 w-[410px] h-[535px] bg-[#D9D9D9] rounded-[20px] shadow-lg  flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-gray-400 rounded-full opacity-20"></div>
              </div>
              
              {/* Imagem de Frente Inferior (Mantida) */}
              <div className="absolute bottom-[-40px] right-20 w-[410px] h-[535px] bg-white rounded-[20px] shadow-2xl  z-10 overflow-hidden">
                  <Image 
                    src="/conceber/passo-img2.png" 
                    alt="Jornada Maker" 
                    fill 
                    className="object-cover" 
                    unoptimized 
                  />
              </div>
            </div>

        </div>
      </section>

{/* BLOCO 5 – EXEMPLOS DE PROJETOS CONCEBIDOS */}
      {/* <section className="w-full px-6 py-24 bg-white">
        <div className="max-w-[1355px] mx-auto">
           */}
          {/* TÍTULO DA SEÇÃO */}
          {/* <div className="flex flex-col mb-16">
             <div className="w-20 h-[3px] bg-[#E9D354] mb-4"></div>
             <div className="flex items-baseline gap-4">
               <h2 className="text-[#0077cc] text-[40px] font-extrabold">Exemplos de projetos concebidos</h2>
               <a href="#" className="text-[#00A0E4] hover:underline text-sm font-medium">Veja nosso Portfólio Completo</a>
             </div>
          </div>

          <div className="flex flex-col gap-8"> */}
            
            {/* PROJETO 1: IMAGEM ESQUERDA / TEXTO DIREITA */}
            {/* <div className="flex flex-col md:flex-row h-auto md:h-[350px] overflow-hidden rounded-lg shadow-lg">
              <div className="w-full md:w-1/2 relative min-h-[250px] bg-[#D9D9D9]">
             */}
                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-400">Imagem do Projeto</span>
                </div>
              </div>
              <div className="w-full md:w-1/2 bg-[#E9D354] p-10 flex flex-col justify-center relative">
                <h3 className="text-[#191F37] text-[32px] font-extrabold leading-tight mb-4">
                  Nome enim Ipsum
                </h3>
                <p className="text-[#191F37] text-[16px] leading-relaxed mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget accumsan orci, in efficitur ipsum.
                </p>
                <a href="#" className="text-[#191F37] font-bold underline self-end">Ver mais</a>
              </div>
            </div> */}

            {/* PROJETO 2: TEXTO ESQUERDA / IMAGEM DIREITA */}
            {/* <div className="flex flex-col md:flex-row-reverse h-auto md:h-[350px] overflow-hidden rounded-lg shadow-lg">
              <div className="w-full md:w-1/2 relative min-h-[250px] bg-[#D9D9D9]"> */}
                {/* <Image src="/conceber/projeto2.jpg" fill className="object-cover" /> */}
                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-400">Imagem do Projeto</span>
                </div>
              </div>
              <div className="w-full md:w-1/2 bg-[#E9D354] p-10 flex flex-col justify-center relative">
                <h3 className="text-[#191F37] text-[32px] font-extrabold leading-tight mb-4">
                  Nome enim Ipsum
                </h3>
                <p className="text-[#191F37] text-[16px] leading-relaxed mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget accumsan orci, in efficitur ipsum.
                </p>
                <a href="#" className="text-[#191F37] font-bold underline self-end">Ver mais</a>
              </div>
            </div>

          </div>
        </div>
      </section> */}


            
            {/* BLOCO 5 – NOSSOS PARCEIROS */}
        <section className="w-full px-6 py-24  bg-[#fafafa]">
          <div className="max-w-[1355px] mx-auto">
            
            {/* Título Centralizado */}
            <div className="flex flex-col items-center mb-16">
              <div className="w-20 h-[3px] bg-[#E9D354] mb-4"></div>
              <h2 className="text-[#0077cc] text-[40px] font-extrabold text-center">
                Nossos Parceiros
              </h2>
            </div>

            {/* GRID CENTRALIZADO: justify-center garante que se houver menos de 5 logos, elas fiquem no meio da tela */}
            <div className="flex flex-wrap justify-center gap-12 items-start">
              
              {/* PARCEIRO 1: ESSS */}
              <a 
                href="http://esss.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center gap-4 group cursor-pointer transition-all hover:scale-105"
              >
                <div className="w-[180px] h-[100px] border border-gray-300 flex items-center justify-center relative bg-white rounded-sm overflow-hidden p-4 shadow-sm group-hover:shadow-md transition-shadow">
                  <Image 
                    src="/Parceiros/logo_esss.png" 
                    alt="Logo ESSS" 
                    width={150} 
                    height={60} 
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <p className="text-[#191F37] font-bold text-sm tracking-widest uppercase group-hover:text-[#0077cc] transition-colors">
                  ESSS
                </p>
              </a>

              {/* Repita a estrutura acima para os outros parceiros... */}

            </div>
          </div>
        </section>

    </div>
  );
}