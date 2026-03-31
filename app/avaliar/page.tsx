"use client";

import React from 'react';
import Image from 'next/image';

export default function AvaliarPage() {
  return (
    <div className="w-full bg-[#FAFAFA] pt-[0px] pb-20">
      
      {/* BLOCO 1 – BANNER AVALIAR */}
      <section className="w-full"> 
        <div className="w-full h-[520px] relative"> 
          <Image 
            src="/banners/banner_avaliars.png" 
            alt="Banner Avaliar - InPETU Maker"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/40 to-transparent flex items-end pb-20 px-6">
            <div className="max-w-[1355px] w-full mx-auto">
                <h1 className="text-[#0077cc] text-[64px] font-extrabold leading-tight">
                  Avaliar
                </h1>
                <p className="text-[#0077cc] text-[24px] font-medium max-w-2xl mt-2">
                   Do protótipo à validação. Aqui suas soluções são testadas e aprimoradas.
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 2 – COMO FUNCIONA (Responsivo) */}
      <section className="w-full px-6 py-24 bg-[#FFFFFF]">
        <div className="max-w-[1355px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          
          {/* Lado Esquerdo: Imagens Sobrepostas (Oculto no Mobile) */}
          <div className="relative h-[480px] w-full hidden md:flex items-center">
            <div className="absolute top-0 left-4 w-[340px] h-[400px] bg-[#D9D9D9] rounded-lg shadow-lg border-4 border-white overflow-hidden">
                <Image src="/avaliar/img1.png" alt="Testes técnicos" fill className="object-cover" unoptimized />
            </div>
            <div className="absolute bottom-0 left-[140px] w-[340px] h-[400px] bg-[#D9D9D9] rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-white z-10 overflow-hidden">
                <Image src="/avaliar/img2.png" alt="Aprimoramento" fill className="object-cover" unoptimized />
            </div>
          </div>

          {/* Lado Direito: Texto */}
          <div>
            <h2 className="text-[#0077CC] text-[48px] font-black leading-tight mb-0 ">Como funciona</h2>
            <p className="text-[#0077cc] text-[24px] font-regular mb-6">Validação técnica e refinamento do projeto</p>
            <div className="text-[#333333] text-[18px] md:text-[20px] leading-snug text-justify space-y-4">
              <p>A etapa <b>Avaliar</b> é dedicada à verificação do desempenho, da qualidade e da confiabilidade dos protótipos desenvolvidos.</p>
            <p>
                No InPETU Maker, essa fase envolve atividades de <b>medição, ensaio e caracterização</b>, permitindo validar se o protótipo atende aos requisitos técnicos, funcionais e de segurança do projeto.
</p>
               <p> Por meio de laboratórios próprios e parcerias com laboratórios especializados, é possível realizar análises que apoiam a tomada de decisão, a melhoria do projeto e a preparação para etapas futuras de desenvolvimento ou aplicação.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 3 – SERVIÇOS DISPONÍVEIS */}
      <section className="w-full px-6 py-20 bg-white">
        <div className="max-w-[1355px] mx-auto">
          <div className="flex flex-col items-center mb-16">
            <div className="w-20 h-[3px] bg-[#E9D354] mb-4"></div>
            <h2 className="text-[#0077cc] text-[40px] font-black text-center">Serviços disponíveis nessa etapa</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: "Apoio Técnico", img: "/avaliar/apoiot.png" },
              { t: "Integração em labs", img: "/avaliar/labsa.png" },
              { t: "Suporte em instrumentação", img: "/avaliar/instrumentacao.png" }
            ].map((serv, i) => (
              <div key={i} className="relative h-[480px] rounded-lg overflow-hidden flex flex-col justify-end p-8 text-left group hover:shadow-2xl transition-all">
                <div className="absolute inset-0 z-0 bg-[#D9D9D9]">
                   <Image src={serv.img} alt={serv.t} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                </div>
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#181F37]/20 to-[#181F37]/90" />
                <div className="relative z-20">
                  <h3 className="text-white text-[28px] font-bold leading-tight">{serv.t}</h3>
                  <p className="text-white/90 text-[16px] mt-2">{serv.t}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO 4 – PASSO A PASSO (Com linha pontilhada) */}
      <section className="w-full px-6 py-24 bg-[#FAFAFA]">
        <div className="max-w-[1355px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14">
          <div>
            <h2 className="text-[#0077cc] text-[40px] font-extrabold mb-2">Passo a passo</h2>
            <div className="relative pl-4 mt-12">
              <div className="absolute left-[48px] top-4 bottom-4 w-[2px] border-l-2 border-dotted border-[#0077cc] z-0"></div>
              <div className="flex flex-col gap-10">
                {[
                  "Solicitar avaliação.",
                  "Diagnóstico de necessidades.",
                  "Encaminhamento e execução da avaliação com apoio técnico.",
                  "Protótipo avaliado e finalizado!"
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-8 relative z-10 group">
                    <div className="w-[64px] h-[64px] bg-white border-2 border-[#0077cc] rounded-full flex items-center justify-center text-[#0077cc] font-bold text-[32px] group-hover:bg-[#0077cc] group-hover:text-white transition-colors shrink-0">
                      0{idx + 1}
                    </div>
                    <p className="text-[#333333] text-[20px] font-medium leading-tight">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative h-[500px] w-full hidden md:flex items-center justify-center">
            <div className="absolute top-0 right-5 w-[410px] h-[535px] bg-[#D9D9D9] rounded-lg shadow-lg border-4 border-white overflow-hidden"></div>
            <div className="absolute bottom-4 right-30 w-[410px] h-[535px] bg-[#D9D9D9] rounded-lg shadow-2xl border-4 border-white z-10 overflow-hidden"></div>
          </div>
        </div>
      </section>

      {/* BLOCO 5 – EXEMPLOS DE PROTÓTIPOS AVALIADOS (Grid 2x2 conforme protótipo) */}
      <section className="w-full px-6 py-24 bg-white">
        <div className="max-w-[1355px] mx-auto">
          <div className="flex flex-col mb-16">
             <div className="w-20 h-[3px] bg-[#E9D354] mb-4"></div>
             <h2 className="text-[#0077cc] text-[40px] font-black text-center">Protótipos avaliados</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col md:flex-row h-auto overflow-hidden rounded-lg shadow-lg border border-gray-100">
                <div className="w-full md:w-1/2 relative min-h-[250px] bg-[#D9D9D9]"></div>
                <div className="w-full md:w-1/2 bg-[#E9D354] p-8 flex flex-col justify-center">
                  <h3 className="text-[#191F37] text-[24px] font-extrabold mb-2">Nemo enim ipsam</h3>
                  <p className="text-[#191F37] text-[14px] leading-relaxed mb-4">Descrição curta (ex: peça em 3D, estrutura em madeira, protótipo eletrônico).</p>
                  <a href="#" className="text-[#191F37] font-bold text-xs underline self-end">Saiba mais →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO 6 – FRASE FINAL + CTA */}
      <section className="w-full px-6 py-24 bg-[#0077cc] flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-lg mb-8"></div>
          <h2 className="text-[#191F37] text-[48px] font-black mb-8 leading-tight"> Fale conosco e marque uma avaliação para o seu protótipo</h2>
          <button className="bg-[#F6f6f6] text-white font-bold py-4 px-12 rounded-lg hover:bg-[#0377CC] transition-all shadow-lg">
            Entre em contato
          </button>
      </section>

    </div>
  );
}