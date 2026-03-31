"use client";

import React from 'react';
import Image from 'next/image';

export default function IntegrarPage() {
  return (
    <div className="w-full bg-[#FAFAFA] pt-[0px] pb-20">
      
      {/* BLOCO 1 – BANNER INTEGRAR */}
      <section className="w-full"> 
        <div className="w-full h-[520px] relative"> 
          <Image 
            src="/banners/banner_integrar.png" 
            alt="Banner Integrar"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/40 to-transparent flex items-end pb-20 px-6">
            <div className="max-w-[1355px] w-full mx-auto">
                <h1 className="text-[#0077cc] text-[64px] font-extrabold leading-tight">
                  Integrar
                </h1>
                <p className="text-[#0077cc] text-[24px] font-medium max-w-2xl mt-2">
                   Conecte seu protótipo com tecnologias e laboratórios parceiros.
                </p>
            </div>
          </div>
        </div>
      </section>

{/* BLOCO 2 – O QUE É INTEGRAR (Imagens Sobrepostas) */}
<section className="w-full px-6 py-24 bg-[#FFFFFF]">
  <div className="max-w-[1355px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
    
    <div className="relative h-[480px] w-full flex items-center">
      {/* Imagem de Fundo - Verifique se o arquivo é .png ou .jpg */}
      <div className="absolute top-0 left-4 w-[340px] h-[400px] rounded-lg shadow-lg border-4 border-white overflow-hidden bg-gray-200">
        <Image 
          src="/integrar/img2.png" 
          alt="Estudantes colaborando no laboratório" 
          fill 
          className="object-cover"
          unoptimized={true} 
        />
      </div>
      
      {/* Imagem de Frente */}
      <div className="absolute bottom-0 left-[140px] w-[340px] h-[400px] rounded-lg shadow-2xl border-4 border-white z-10 overflow-hidden bg-gray-200">
        <Image 
          src="/integrar/img1.png" 
          alt="Protótipo sendo testado" 
          fill 
          className="object-cover"
          unoptimized={true}
        />
      </div>
    </div>

    <div>
      <h2 className="text-[#0377CC] text-[48px] font-extrabold leading-tight mb-4">O que é integrar</h2>
      <p className="text-[#00A0E4] text-[24px] font-bold mb-6">Viabilize o seu protótipo de forma ampla</p>
      <div className="text-[#333333] text-[20px] leading-relaxed text-justify space-y-4">
        <p>Nesta etapa, o foco é a <b>conexão</b>. Buscamos integrar os projetos desenvolvidos no InPETU Maker com laboratórios parceiros e especialistas para validações técnicas complexas.</p>
        <p>O objetivo é garantir que o protótipo não seja apenas uma peça isolada, mas sim parte de um sistema funcional capaz de ser testado em ambientes reais e específicos.</p>
      </div>
    </div>
    
  </div>
</section>

      {/* BLOCO 3 – SERVIÇOS DISPONÍVEIS (Cards com Gradiente) */}
      <section className="w-full px-6 py-20 bg-white">
        <div className="max-w-[1355px] mx-auto">
          <div className="flex flex-col items-center mb-16">
            <div className="w-20 h-[3px] bg-[#E9D354] mb-4"></div>
            <h2 className="text-[#0077cc] text-[40px] font-extrabold text-center ">Serviços disponíveis nessa etapa</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: "Apoio técnico", desc: "Consultoria especializada em hardware e software para integração.", img: "/integrar/apoio.png" },
              { t: "Integração em labs parceiros", desc: "Acesso a infraestruturas e laboratórios especializados.", img: "/integrar/labs.png" },
              { t: "Suporte em instrumentação", desc: "Uso de equipamentos de medição e análise de alta precisão.", img: "/integrar/instrumentacao.png" }
            ].map((serv, i) => (
              <div key={i} className="relative h-[480px] rounded-lg overflow-hidden flex flex-col justify-end p-8 text-left group hover:shadow-2xl transition-all">
                <div className="absolute inset-0 z-0 bg-[#D9D9D9]">
                   {/* <Image src={serv.img} fill className="object-cover group-hover:scale-110 transition-transform duration-500" /> */}
                </div>
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#181F37]/20 to-[#181F37]/90" />
                <div className="relative z-20">
                  <h3 className="text-white text-[28px] font-bold leading-tight">{serv.t}</h3>
                  <p className="text-white/90 text-[16px] mt-2">{serv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO 4 – PASSO A PASSO (Vertical com Imagens) */}
      <section className="w-full px-6 py-24 bg-[#FAFAFA]">
        <div className="max-w-[1355px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14">
          <div>
            <h2 className="text-[#0077cc] text-[40px] font-black mb-2 ">Passo a passo</h2>
            <p className="text-[#333333] text-[22px] mb-12 font-bold tracking-tight">Um guia para sua integração</p>
            <div className="relative pl-4">
              <div className="absolute left-[48px] top-4 bottom-4 w-[2px] border-l-2 border-dotted border-[#0077cc] z-0"></div>
              <div className="flex flex-col gap-10">
                {[
                  "Solicitação de integração via sistema",
                  "Avaliação de compatibilidade técnica",
                  "Agendamento com laboratório parceiro",
                  "Protótipo pronto para avaliação final"
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

      {/* BLOCO 5 – EXEMPLOS DE PROTÓTIPOS INTEGRADOS (Zigue-Zague) */}
      <section className="w-full px-6 py-24 bg-white">
        <div className="max-w-[1355px] mx-auto">
          <div className="flex flex-col mb-16">
             <div className="w-20 h-[3px] bg-[#E9D354] mb-4"></div>
             <h2 className="text-[#0077cc] text-[40px] font-black "> Protótipos Integrados no Maker</h2>
          </div>
          <div className="flex flex-col gap-12">
            {/* Projeto 1 */}
            <div className="flex flex-col md:flex-row h-auto md:h-[350px] overflow-hidden rounded-lg shadow-lg">
              <div className="w-full md:w-1/2 relative min-h-[250px] bg-[#D9D9D9]"></div>
              <div className="w-full md:w-1/2 bg-[#E9D354] p-10 flex flex-col justify-center">
                <h3 className="text-[#191F37] text-[32px] font-extrabold mb-4">Nome enim Ipsum</h3>
                <p className="text-[#191F37] text-[16px] leading-relaxed mb-6">Integração de sensores avançados em laboratório de eletrônica para validação de sinais em tempo real.</p>
                <a href="#" className="text-[#191F37] font-bold underline self-end">Ver mais</a>
              </div>
            </div>
            {/* Projeto 2 */}
            <div className="flex flex-col md:flex-row-reverse h-auto md:h-[350px] overflow-hidden rounded-lg shadow-lg">
              <div className="w-full md:w-1/2 relative min-h-[250px] bg-[#D9D9D9]"></div>
              <div className="w-full md:w-1/2 bg-[#E9D354] p-10 flex flex-col justify-center">
                <h3 className="text-[#191F37] text-[32px] font-extrabold mb-4">Nome enim Ipsum</h3>
                <p className="text-[#191F37] text-[16px] leading-relaxed mb-6">Análise estrutural realizada em parceria com o laboratório de mecânica fina.</p>
                <a href="#" className="text-[#191F37] font-bold underline self-end">Ver mais</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 6 – LABORATÓRIOS PARCEIROS (Grades de Logos) */}
      <section className="w-full px-6 py-24 bg-[#FAFAFA]">
        <div className="max-w-[1355px] mx-auto text-center">
          <div className="flex flex-col items-center mb-16">
            <div className="w-20 h-[3px] bg-[#E9D354] mb-4"></div>
            <h2 className="text-[#0077cc] text-[40px] font-black">Laboratórios parceiros</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[280px] bg-white rounded-3xl shadow-md border border-gray-100 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                 <span className="text-gray-300 font-bold uppercase tracking-widest italic">Logo Lab {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}