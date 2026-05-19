"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
                   Do protótipo à validação. Aqui as soluções são testadas e aprimoradas.
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 2 – COMO FUNCIONA (Responsivo) */}
      <section className="w-full px-6 py-24 bg-[#FFFFFF]">
        <div className="max-w-[1355px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
          
          {/* Lado Esquerdo: Imagens Sobrepostas (Oculto no Mobile) */}
          <div className="relative h-[480px] w-full hidden md:flex items-center">
              <div className="absolute top-15 right-34 w-[365px] h-[471px] bg-[#D9D9D9] rounded-lg shadow-lg border-4 border-white overflow-hidden">
            </div>
            <div className="absolute bottom-0 left-[89px] w-[365px] h-[471px] bg-[#D9D9D9] rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-white z-10 overflow-hidden">
                <Image src="/avaliar/img2.png" alt="Aprimoramento" fill className="object-cover" unoptimized />
            </div>
          </div>

          {/* Lado Direito: Texto */}
          <div>
            <h2 className="text-[#0077CC] text-[48px] font-black leading-tight mb-0 ">Como funciona</h2>
            <p className="text-[#0077cc] text-[24px] font-regular mb-6">Validação técnica e aprimoramento do projeto</p>
            <div className="text-[#333333] text-[18px] md:text-[20px] leading-snug text-justify space-y-4">
              <p>A etapa Avaliar verifica o desempenho, a qualidade e a confiabilidade dos protótipos desenvolvidos. Nessa fase, são realizadas medições, ensaios e processos de caracterização para confirmar se o protótipo atende aos requisitos técnicos, funcionais e de segurança.</p>

<p>Parte dessas avaliações podem ser realizadas nos laboratórios de integração. Testes mais especializados podem ser conduzidos por laboratórios parceiros da UFSC e de outras instituições colaboradoras.</p>

<p>Os resultados podem indicar ajustes e otimizações no protótipo ou confirmar que ele está pronto para a etapa de validação com clientes, que pode ser realizada no Living Lab do InPETU hub. </p> </div>
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
      <section className="w-full px-6 py-24 bg-[#F6F6F6]">
        <div className="max-w-[1355px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14">
          <div>
            <h2 className="text-[#0077cc] text-[40px] font-black mb-2 ">Etapas de Avaliação</h2>
            <p className="text-[#333333] text-[22px] mb-12 font-medium tracking-tight">Fluxo de verificação técnica e validação do protótipo</p>
            <div className="relative pl-4 mt-12">
              <div className="absolute left-[48px] top-4 bottom-4 w-[2px] border-l-2 border-dotted border-[#0077cc] z-0"></div>
              <div className="flex flex-col gap-10">
                {[
                  "Estabelecer os requisitos e capacidades técnicas do aparto experimental necessário para validar o protótipo",
                  "Confirmar capacidade nos laboratórios de integração do InPETU ou identificar laboratório parceiro capacitado.",
                  "Orçamentação e agendamento",
                  "Realização dos ensaios e testes de avaliação.",
                  "Analisar resultados dos testes e decidir pelo retrabalho para otimizações ou iniciar a validação pelo cliente.",
                  "Se necessário, a validação pelo cliente pode ser contratada do Living Lab do InPETU hub."
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-8 relative z-10 group">
                    <div className="w-[64px] h-[64px] bg-white border-2 border-[#0077cc] rounded-full flex items-center justify-center text-[#0077cc] font-bold text-[32px] group-hover:bg-[#0077cc] group-hover:text-white transition-colors shrink-0">
                      0{idx + 1}
                    </div>
                    <p className="text-[#696969] text-[20px] font-regular leading-tight">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative h-[500px] w-full hidden md:flex items-center justify-center">
            <div className="absolute top-60 right-5 w-[410px] h-[535px] bg-[#D9D9D9] rounded-lg shadow-lg border-4 border-white overflow-hidden"></div>
           <div className="absolute top-40 left-[130px] w-[410px] h-[535px] bg-[#D9D9D9] rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-white z-10 overflow-hidden">
                <Image src="/avaliar/img3.png" alt="Aprimoramento" fill className="object-cover" unoptimized />
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 5 – EXEMPLOS DE PROTÓTIPOS AVALIADOS (Grid 2x2 conforme protótipo) */}
{/*       <section className="w-full px-6 py-24 bg-white">
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
      </section> */}

{/* BLOCO 7 – SUBMISSÃO DE PROTÓTIPO (Banner Azul com Faixa Amarela) */}
      <section className="w-full bg-[#F6F6F6] pb-0 relative overflow-hidden">
        <div className="max-w-[1355px] mx-auto px-6 relative z-10">
          
          {/* BANNER PRINCIPAL AZUL COM OS CANTOS ARREDONDADOS CONFORME A IMAGEM */}
          <div className="w-full bg-[#0077cc] rounded-[40px] py-20 px-8 text-center shadow-lg flex flex-col items-center justify-center">
            
            {/* TÍTULO CORRIGIDO PARA BRANCO */}
            <h2 className="text-white text-[32px] sm:text-[42px] font-black tracking-tight max-w-3xl leading-tight mb-10">
              Submeta seu protótipo para validação técnica!
            </h2>

            {/* BOTÃO CORRIGIDO PARA LINK DO NEXT.JS */}
            <Link 
              href="/contato" // Certifique-se de que a sua rota de contato tenha esse nome de pasta
              className="bg-[#191F37] text-white font-bold text-sm uppercase px-10 py-4 rounded-xl hover:bg-[#252e4e] transition-all duration-300 shadow-md tracking-wider text-center inline-block"
            >
              Solicitar avaliação
            </Link>

          </div>
        </div>
      </section>

    </div>
  );
}