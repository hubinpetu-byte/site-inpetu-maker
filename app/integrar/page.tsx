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
                   Conectando tecnologias e componentes. 
                   Aqui seu protótipo passa a funcionar como um sistema completo.</p>
            </div>
          </div>
        </div>
      </section>

{/* BLOCO 2 – O QUE É INTEGRAR (Imagens Sobrepostas) */}
<section className="w-full px-6 py-24 bg-[#FFFFFF]">
  <div className="max-w-[1355px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
    
    <div className="relative h-[480px] w-full flex items-center">
      {/* Imagem de Fundo - Verifique se o arquivo é .png ou .jpg */}
       <div className="absolute top-10 right-50 w-[365px] h-[471px] bg-[#D9D9D9] rounded-lg shadow-lg border-4 border-white overflow-hidden"></div>
      
      {/* Imagem de Frente */}
      <div className="absolute bottom-0 left-[140px] w-[365px] h-[471px] rounded-lg shadow-2xl border-4 border-white z-10 overflow-hidden bg-gray-200">
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
      <h2 className="text-[#0377CC] text-[48px] font-extrabold leading-tight mb-4">Como funciona</h2>
      <p className="text-[#0077CC] text-[24px] font-medium mb-6">Integração de componentes e sistemas ao protótipo.</p>
      <div className="text-[#333333] text-[20px] leading-relaxed text-justify space-y-4">
        <p>Na etapa de Integração, o protótipo passa a se tornar um sistema funcional. Essa fase envolve agregar componentes, sensores, softwares e subsistemas ao que você já construiu, garantindo que todas as partes trabalhem de forma coordenada. Para isso, o InPETU Maker oferece laboratórios especializados em instrumentação, visão computacional, digitalização 3D, metrologia e tratamento de materiais.</p>
        <p>Além disso, cabines privativas estão disponíveis para projetos que necessitam de maior privacidade durante o desenvolvimento e a integração.</p>
      </div>
    </div>
    
  </div>
</section>

{/* BLOCO 3 – SERVIÇOS DISPONÍVEIS (Cards com Imagem e Etapas) */}
      <section className="w-full px-6 py-20 bg-white">
        <div className="max-w-[1355px] mx-auto">
          
          {/* Alinhamento ajustado para a esquerda conforme o protótipo */}
          <div className="mb-12 text-left">
            <h2 className="text-[#0077cc] text-[36px] font-black tracking-tight">
              Serviços disponíveis nessa etapa
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: "Apoio técnico", desc: "Consultoria especializada em hardware e software para integração.", img: "/integrar/apoio.png" },
              { t: "Integração em labs parceiros", desc: "Encaminhamento para ambientes técnicos adequados às necessidades do projeto.", img: "/integrar/labs.png" },
              { t: "Suporte em instrumentação", desc: "Auxílio na configuração e utilização de instrumentos para análise e validação.", img: "/integrar/instru.png" }
            ].map((serv, i) => (
              <div key={i} className="relative h-[480px] rounded-[32px] overflow-hidden flex flex-col justify-end p-8 text-left group hover:shadow-xl transition-all duration-300">
                
                {/* CONTAINER DA IMAGEM ATIVADO (Substitui o bloco cinza antigo) */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={serv.img} 
                    alt={serv.t}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => {
                      // Se a imagem falhar ou não existir na pasta pública, mantém o fundo cinza de segurança
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.style.backgroundColor = '#D9D9D9';
                    }}
                  />
                </div>
                
                {/* GRADIENTE (Fundo branco/esfumaçado de baixo para cima para destacar os textos pretos do modelo) */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#181F37] via-[#181F37]/40 to-transparent pt-[40%]" />
                
                {/* TEXTOS (Mudados para preto/grafite conforme a nova imagem de referência) */}
                <div className="relative z-20">
                  <h3 className="text-[white] text-[26px] font-black leading-tight mb-2">{serv.t}</h3>
                  <p className="text-[#FAFAFA] text-sm font-medium leading-relaxed">{serv.desc}</p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO 4 – PASSO A PASSO (Vertical com Imagens) */}
      <section className="w-full px-6 py-24 bg-[#F6F6F6]">
        <div className="max-w-[1355px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14">
          <div>
            <h2 className="text-[#0077cc] text-[40px] font-black mb-2 ">Etapas de integração</h2>
            <p className="text-[#333333] text-[22px] mb-12 font-bold tracking-tight">Integração e preparação do protótipo para validação.</p>
            <div className="relative pl-4">
              <div className="absolute left-[48px] top-4 bottom-4 w-[2px] border-l-2 border-dotted border-[#0077cc] z-0"></div>
              <div className="flex flex-col gap-10">
                {[
                  "Seleção e obtenção de componentes e acessórios complementares.",
                  "Montagem e integração dos elementos do protótipo nos laboratórios especializados.",
                  "Testes, ajustes e otimização do protótipo.",
                  "Protótipo pronto para avaliação final."
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
            <div className="absolute bottom-0 left-[180px] w-[410px] h-[535px] rounded-lg shadow-2xl border-4 border-white z-10 overflow-hidden bg-gray-200">
        <Image 
          src="/integrar/img5.png" 
          alt="Protótipo sendo testado" 
          fill 
          className="object-cover"
          unoptimized={true}
        />
      </div>
          </div>
        </div>
      </section>

      {/* BLOCO 5 – EXEMPLOS DE PROTÓTIPOS INTEGRADOS (Zigue-Zague) */}
     {/*  <section className="w-full px-6 py-24 bg-white">
        <div className="max-w-[1355px] mx-auto">
          <div className="flex flex-col mb-16">
             <div className="w-20 h-[3px] bg-[#E9D354] mb-4"></div>
             <h2 className="text-[#0077cc] text-[40px] font-black "> Protótipos Integrados no Maker</h2>
          </div>
          <div className="flex flex-col gap-12"> */}
            {/* Projeto 1 */}
           {/*  <div className="flex flex-col md:flex-row h-auto md:h-[350px] overflow-hidden rounded-lg shadow-lg">
              <div className="w-full md:w-1/2 relative min-h-[250px] bg-[#D9D9D9]"></div>
              <div className="w-full md:w-1/2 bg-[#E9D354] p-10 flex flex-col justify-center">
                <h3 className="text-[#191F37] text-[32px] font-extrabold mb-4">Nome enim Ipsum</h3>
                <p className="text-[#191F37] text-[16px] leading-relaxed mb-6">Integração de sensores avançados em laboratório de eletrônica para validação de sinais em tempo real.</p>
                <a href="#" className="text-[#191F37] font-bold underline self-end">Ver mais</a>
              </div>
            </div> */}
            {/* Projeto 2 */}
        {/*     <div className="flex flex-col md:flex-row-reverse h-auto md:h-[350px] overflow-hidden rounded-lg shadow-lg">
              <div className="w-full md:w-1/2 relative min-h-[250px] bg-[#D9D9D9]"></div>
              <div className="w-full md:w-1/2 bg-[#E9D354] p-10 flex flex-col justify-center">
                <h3 className="text-[#191F37] text-[32px] font-extrabold mb-4">Nome enim Ipsum</h3>
                <p className="text-[#191F37] text-[16px] leading-relaxed mb-6">Análise estrutural realizada em parceria com o laboratório de mecânica fina.</p>
                <a href="#" className="text-[#191F37] font-bold underline self-end">Ver mais</a>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* BLOCO 6 – LABORATÓRIOS PARCEIROS (Grades de Logos) */}
      {/* BLOCO 6 – LABORATÓRIOS AUXILIARES (Cards Verticais) */}
      <section className="w-full bg-white px-6 py-24">
        <div className="max-w-[1355px] mx-auto">
          
          {/* Alinhamento à esquerda conforme a imagem */}
          <div className="mb-10 text-left">
            <h2 className="text-[#0077cc] text-[32px] font-black tracking-tight mb-2">
              Laboratórios Auxiliares
            </h2>
            <p className="text-gray-700 text-base font-medium">
              Conheça alguns dos laboratórios auxiliares a integração no InPETU hub
            </p>
          </div>

          {/* Grid com a proporção vertical exata da imagem (aspect-[3/4]) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="relative aspect-[3/4] w-full bg-[#D9D9D9] rounded-[24px] flex items-center justify-center overflow-hidden group transition-all duration-300 cursor-pointer"
              >
                {/* Ícone discreto de placeholder ou texto se preferir */}
                <div className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center opacity-40 group-hover:opacity-60 transition-opacity">
                  <span className="text-gray-500 font-bold text-xs">{i}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    {/* BLOCO 4 – ESPAÇOS DEDICADOS (Cole apenas a partir daqui) */}
      <section className="w-full bg-white px-6 py-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="relative pl-6 pb-6 w-full max-w-[540px] mx-auto lg:mx-0">
              <div className="absolute top-0 left-0 w-[92%] h-[92%] bg-[#D9D9D9] rounded-[24px] z-0" />
              <div className="relative z-10 translate-x-4 translate-y-4 aspect-[4/3] w-full rounded-[24px] overflow-hidden shadow-md">
                <img 
                  src="/integrar/espaco.png"
                  alt="Espaços dedicados para integração"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1000";
                  }}
                />
              </div>
            </div>

            <div className="space-y-6 text-left">
              <h2 className="text-[#0077cc] text-[32px] sm:text-[38px] font-black tracking-tight leading-tight">
                Espaços dedicados para integração de protótipos
              </h2>
              <div className="space-y-4 text-gray-600 text-sm sm:text-base font-medium leading-relaxed">
                <p>
                  O InPETU Maker também disponibiliza salas e áreas de montagem reservadas para projetos 
                  que estão na etapa de integração e validação técnica. Esses espaços permitem que equipes 
                  realizem testes, ajustes e montagem de sistemas com maior organização, continuidade 
                  de trabalho e controle do ambiente.
                </p>
                <p>
                  As salas podem ser utilizadas por período determinado e são especialmente indicadas para 
                  quem necessita de maior privacidade durante o processo de desenvolvimento e validação.
                </p>
              </div>
              <div className="pt-4">
                <button 
                  onClick={() => alert("Navegar para agendamento de espaço")}
                  className="border-2 border-[#0077cc] text-[#0077cc] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl hover:bg-blue-50/50 active:scale-[0.98] transition-all duration-200 tracking-medium shadow-sm"
                >
                  Reservar Espaço
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
  
    </div>
  );
}