"use client";

import React from 'react';
import Image from 'next/image';

export default function ConstruirPage() {
  return (
    <div className="w-full bg-[#FAFAFA] pt-[0px] pb-20">
      
      {/* BLOCO 1 – BANNER LARGURA TOTAL COM FADE */}
      <section className="w-full"> 
        <div className="w-full h-[520px] relative"> 
          <Image 
            src="/banners/banner_construir.png" 
            alt="Banner Construir"
            fill
            className="object-cover"
            priority
            quality={100}
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/40 to-transparent flex items-end pb-20 px-6">
            <div className="max-w-[1355px] w-full mx-auto">
                <h1 className="text-[#0077cc] text-[64px] font-extrabold leading-tight">
                  Construir
                </h1>
                <p className="text-[#0077CC] text-[24px] font-medium max-w-2xl mt-2">
                   Espaço para colocar a mão na massa e transformar projetos em realidade.
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 2 – COMO FUNCIONA (TEXTO À ESQUERDA / IMAGENS À DIREITA) */}
      <section className="w-full px-6 py-20 bg-[#FFFFFF]">
        <div className="max-w-[1355px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          
          <div>
            <h2 className="text-[#0377CC] text-[48px] font-extrabold leading-tight mb-4">
              Como funciona
            </h2>
            <p className="text-[#00A0E4] text-[24px] font-bold mb-6">
              Sua ideia ganha forma física
            </p>
            <div className="text-[#333333] text-[20px] leading-relaxed text-justify space-y-4">
              <p>
                A etapa <b>Construir</b> é o momento em que o projeto deixa o ambiente digital e passa a existir de forma física.
              </p>
              <p> No InPETU Maker, essa fase envolve a fabricação de protótipos por meio de diferentes <b>equipamentos e processos produtivos</b>, como impressão 3D, corte a laser, usinagem, conformação e acabamentos.
              Os usuários podem utilizar os equipamentos de forma autônoma, desde que tenham realizado os <b>treinamentos obrigatórios</b> e estejam em conformidade com as <b>políticas de uso e segurança</b> do laboratório.</p>
              <p> Durante a construção, é possível contar com <b>orientações técnicas</b> pontuais, além da opção de contratação de serviços quando o projeto exigir maior complexidade ou suporte especializado.</p>

            </div>
          </div>

          {/* Lado Direito: Layout de Imagens (1 grande e 2 pequenas empilhadas) */}
          <div className="grid grid-cols-2 gap-4 h-[450px]">
             <div className="bg-[#D9D9D9] rounded-lg shadow-lg relative overflow-hidden">
                {/* Imagem Grande */}
             </div>
             <div className="grid grid-rows-2 gap-4">
                <div className="bg-[#D9D9D9] rounded-lg shadow-lg relative overflow-hidden"></div>
                <div className="bg-[#D9D9D9] rounded-lg shadow-lg relative overflow-hidden"></div>
             </div>
          </div>
        </div>
      </section>

{/* BLOCO 3 – SERVIÇOS DISPONÍVEIS NESSA ETAPA */}
      <section className="w-full px-6 py-20 bg-[#F6F6F6]">
        <div className="max-w-[1355px] mx-auto">
          
          {/* TÍTULO COM LINHA AMARELA CENTRALIZADA */}
          <div className="flex flex-col items-center mb-16">
            <div className="w-20 h-[3px] bg-[#E9D354] mb-4"></div>
            <h2 className="text-[#0077cc] text-[40px] font-extrabold text-center">
              Serviços disponíveis nessa etapa
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* CARD 1: TREINAMENTO TÉCNICO */}
            <div className="relative h-[480px] rounded-lg overflow-hidden flex flex-col justify-end p-8 text-left group hover:shadow-2xl transition-all">
              <div className="absolute inset-0 z-0">
                <Image 
                  src="/construir/treinamento.jpg" 
                  alt="Treinamento Técnico" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#181F37]/20 to-[#181F37]/90" />
              <div className="relative z-20">
                <h3 className="text-white text-[28px] font-bold leading-tight">Treinamento Técnico</h3>
                <p className="text-white/90 text-[16px] mt-2">Capacitação para operação segura de máquinas e ferramentas.</p>
              </div>
            </div>

            {/* CARD 2: AGENDAMENTO DE USO */}
            <div className="relative h-[480px] rounded-lg overflow-hidden flex flex-col justify-end p-8 text-left group hover:shadow-2xl transition-all">
              <div className="absolute inset-0 z-0">
                <Image 
                  src="/construir/agendamento.jpg" 
                  alt="Agendamento" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#181F37]/20 to-[#181F37]/90" />
              <div className="relative z-20">
                <h3 className="text-white text-[28px] font-bold leading-tight">Agendamento de uso</h3>
                <p className="text-white/90 text-[16px] mt-2">Reserve horários nas máquinas para desenvolver seu protótipo.</p>
              </div>
            </div>

            {/* CARD 3: APOIO TÉCNICO */}
            <div className="relative h-[480px] rounded-lg overflow-hidden flex flex-col justify-end p-8 text-left group hover:shadow-2xl transition-all">
              <div className="absolute inset-0 z-0">
                <Image 
                  src="/construir/apoio.jpg" 
                  alt="Apoio Técnico" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#181F37]/20 to-[#181F37]/90" />
              <div className="relative z-20">
                <h3 className="text-white text-[28px] font-bold leading-tight">Apoio técnico</h3>
                <p className="text-white/90 text-[16px] mt-2">Suporte especializado durante o processo de fabricação.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

{/* BLOCO 4 – EQUIPAMENTOS DISPONÍVEIS */}
      <section className="w-full px-6 py-20 bg-[#FFFFFF]">
        <div className="max-w-[1355px] mx-auto">
          
          {/* TÍTULO DA SEÇÃO */}
          <h2 className="text-[#0077cc] text-[36px] font-extrabold mb-12">
            Equipamentos disponíveis
          </h2>

          {/* GRID DE EQUIPAMENTOS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            
            {/* CARD EQUIPAMENTO 1 */}
            <div className="bg-white rounded-[20px] p-6 shadow-md flex items-center gap-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-[180px] h-[180px] bg-[#F2F2F2] rounded-lg flex-shrink-0 relative overflow-hidden">
                <Image 
                  src="/equipamentos/impressora-3d.png" 
                  alt="Impressora 3D" 
                  fill 
                  className="object-contain p-4" 
                />
              </div>
              <div className="flex flex-col flex-grow">
                <h3 className="text-[#0077cc] text-[24px] font-bold leading-tight">
                  Impressora 3D X1 Carbon
                </h3>
                <p className="text-[#333333] text-[14px] mt-2 mb-6">
                  Impressora de alta performance para prototipagem rápida.
                </p>
                <button className="bg-[#0077Cc] text-white font-bold py-2 px-6 rounded-lg self-start hover:bg-[#005FA3] transition-colors text-sm">
                  Saiba mais
                </button>
              </div>
            </div>

            {/* CARD EQUIPAMENTO 2 (Placeholder) */}
            <div className="bg-white rounded-[20px] p-6 shadow-md flex items-center gap-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-[180px] h-[180px] bg-[#F2F2F2] rounded-lg flex-shrink-0 flex items-center justify-center">
                 <div className="text-gray-400 text-xs">Imagem do equipamento</div>
              </div>
              <div className="flex flex-col flex-grow">
                <h3 className="text-[#0077cc] text-[24px] font-bold leading-tight">
                  Cortadora Laser
                </h3>
                <p className="text-[#333333] text-[14px] mt-2 mb-6">
                  Descrição curta sobre as especificações técnicas da máquina.
                </p>
                <button className="bg-[#0077Cc] text-white font-bold py-2 px-6 rounded-lg self-start hover:bg-[#005FA3] transition-colors text-sm">
                  Saiba mais
                </button>
              </div>
            </div>

            {/* CARD EQUIPAMENTO 3 (Placeholder) */}
            <div className="bg-white rounded-[20px] p-6 shadow-md flex items-center gap-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-[180px] h-[180px] bg-[#F2F2F2] rounded-lg flex-shrink-0 flex items-center justify-center">
                 <div className="text-gray-400 text-xs">Imagem do equipamento</div>
              </div>
              <div className="flex flex-col flex-grow">
                <h3 className="text-[#0077cc] text-[24px] font-bold leading-tight">
                  Nome do equipamento
                </h3>
                <p className="text-[#333333] text-[14px] mt-2 mb-6">
                  Descrição curta sobre as especificações técnicas da máquina.
                </p>
                <button className="bg-[#0077Cc] text-white font-bold py-2 px-6 rounded-lg self-start hover:bg-[#005FA3] transition-colors text-sm">
                  Saiba mais
                </button>
              </div>
            </div>

            {/* CARD EQUIPAMENTO 4 (Placeholder) */}
            <div className="bg-white rounded-[20px] p-6 shadow-md flex items-center gap-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-[180px] h-[180px] bg-[#F2F2F2] rounded-lg flex-shrink-0 flex items-center justify-center">
                 <div className="text-gray-400 text-xs">Imagem do equipamento</div>
              </div>
              <div className="flex flex-col flex-grow">
                <h3 className="text-[#00A0E4] text-[24px] font-bold leading-tight">
                  Nome do equipamento
                </h3>
                <p className="text-[#333333] text-[14px] mt-2 mb-6">
                  Descrição curta sobre as especificações técnicas da máquina.
                </p>
                <button className="bg-[#0077C8] text-white font-bold py-2 px-6 rounded-lg self-start hover:bg-[#005FA3] transition-colors text-sm">
                  Saiba mais
                </button>
              </div>
            </div>

          </div>

        {/* BOTÃO VER TODOS ATUALIZADO */}
        <div className="mt-16 flex justify-center">
          <a 
            href="/construir/equipamentos" 
            className="bg-[#E9D354] text-[#191F37] font-extrabold py-3 px-12 rounded-lg hover:bg-[#d6c14b] transition-all shadow-md uppercase tracking-wider text-sm">
            Ver todos
          </a>
        </div>
        </div>
      </section>

{/* BLOCO 5 – PASSO A PASSO HORIZONTAL */}
      <section className="w-full px-6 py-24 bg-[#F6F6F6]">
        <div className="max-w-[1355px] mx-auto">
          
          {/* TÍTULO COM LINHA AMARELA CENTRALIZADA */}
          <div className="flex flex-col items-center mb-16">
            <div className="w-20 h-[3px] bg-[#E9D354] mb-4"></div>
            <h2 className="text-[#0077cc] text-[40px] font-black text-center uppercase tracking-tight">
              Passo a passo
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
            
            {/* ETAPA 01 */}
            <div className="flex flex-col items-center text-center max-w-[280px]">
              <div className="w-[80px] h-[80px] rounded-full border-4 border-[#00A0E4] flex items-center justify-center text-[#00A0E4] text-[32px] font-bold mb-6 bg-white shadow-sm">
                01
              </div>
              <p className="text-[#191F37] text-[20px] font-bold leading-tight px-4">
                Concluir treinamento específico
              </p>
            </div>

            {/* SETA CONECTORA 1 */}
            <div className="hidden md:block text-[#00A0E4] opacity-40 mb-12">
               <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12H58M58 12L48 2M58 12L48 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>

            {/* ETAPA 02 */}
            <div className="flex flex-col items-center text-center max-w-[280px]">
              <div className="w-[80px] h-[80px] rounded-full border-4 border-[#00A0E4] flex items-center justify-center text-[#00A0E4] text-[32px] font-bold mb-6 bg-white shadow-sm">
                02
              </div>
              <p className="text-[#191F37] text-[20px] font-bold leading-tight px-4">
                Agendar uso da máquina
              </p>
            </div>

            {/* SETA CONECTORA 2 */}
            <div className="hidden md:block text-[#00A0E4] opacity-40 mb-12">
               <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12H58M58 12L48 2M58 12L48 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>

            {/* ETAPA 03 */}
            <div className="flex flex-col items-center text-center max-w-[280px]">
              <div className="w-[80px] h-[80px] rounded-full border-4 border-[#00A0E4] flex items-center justify-center text-[#00A0E4] text-[32px] font-bold mb-6 bg-white shadow-sm">
                03
              </div>
              <p className="text-[#191F37] text-[20px] font-bold leading-tight px-4">
                Prototipar com apoio técnico
              </p>
            </div>

          </div>
        </div>
      </section>
{/* BLOCO 6 – EXEMPLOS DE PROTÓTIPOS CONSTRUÍDOS (ZIGUE-ZAGUE) */}
      <section className="w-full px-6 py-20 bg-[#FAFAFA]">
        <div className="max-w-[1355px] mx-auto">
          <div className="flex flex-col items-center mb-16">
            <div className="w-20 h-[3px] bg-[#E9D354] mb-4"></div>
            <h2 className="text-[#0077cc] text-[40px] font-extrabold uppercase">Protótipos construídos no Maker</h2>
          </div>

          <div className="space-y-12">
            {/* Protótipo 1 - Imagem Direita */}
            <div className="flex flex-col md:flex-row items-center gap-0 rounded-2xl overflow-hidden shadow-xl bg-white h-[400px]">
              <div className="flex-1 p-12 space-y-4">
                <h3 className="text-[#191F37] text-[32px] font-extrabold">Braço Robótico FDM</h3>
                <p className="text-gray-600 text-lg">Projeto desenvolvido utilizando impressão 3D e corte a laser para validação de movimentos mecânicos e eletrônica embarcada.</p>
              </div>
              <div className="flex-1 h-full relative bg-[#E9D354]">
                {/* Substitua pelo caminho da sua imagem real */}
                <div className="absolute inset-0 bg-gray-300"></div> 
                <div className="absolute bottom-0 left-0 w-full h-20 bg-[#E9D354]/80 backdrop-blur-sm flex items-center px-8">
                  <span className="text-[#191F37] font-bold">Protótipo Funcional #01</span>
                </div>
              </div>
            </div>

            {/* Protótipo 2 - Imagem Esquerda */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-0 rounded-2xl overflow-hidden shadow-xl bg-white h-[400px]">
              <div className="flex-1 p-12 space-y-4 text-right">
                <h3 className="text-[#191F37] text-[32px] font-extrabold">Mobiliário Paramétrico</h3>
                <p className="text-gray-600 text-lg">Estrutura complexa cortada em CNC de marcenaria, explorando encaixes precisos sem o uso de parafusos ou cola.</p>
              </div>
              <div className="flex-1 h-full relative bg-[#E9D354]">
                <div className="absolute inset-0 bg-gray-400"></div>
                <div className="absolute bottom-0 left-0 w-full h-20 bg-[#E9D354]/80 backdrop-blur-sm flex items-center px-8">
                  <span className="text-[#191F37] font-bold">Projeto Especial #02</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 7 – FRASE FINAL E CTA */}
      <section className="w-full bg-[#191F37] shadow-xl rounded-2x1 py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-white text-[48px] font-black leading-tight">
            Pronto para transformar sua ideia em algo real?
          </h2>
          <p className="text-[#00A0E4] text-[24px] font-bold">
            A jornada maker começa agora.
          </p>
          <button className="bg-[#E9D354] text-[#191F37] text-[20px] font-black py-5 px-16 rounded-full hover:scale-105 transition-transform shadow-2xl">
            AGENDAR TREINAMENTO
          </button>
        </div>
      </section>


    </div>
  );
}