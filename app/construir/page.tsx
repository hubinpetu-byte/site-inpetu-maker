"use client";

import React from 'react';
import Link from 'next/link';
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
                <p className="text-[#0077CC] text-[20px] font-medium max-w-2xl mt-2">
                   Do conceito à prática. 
Aqui suas ideias se materializam em protótipos.
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO CONSTRUIR - ESTILO JORNADA */}
<section className="max-w-[1355px] mx-auto px-6 py-20 bg-[#fafafa]">
  <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
    
    {/* LADO ESQUERDO: IMAGEM COM FUNDO CINZA */}
    <div className="flex-1 w-full max-w-[600px] relative">
      {/* Quadro Cinza de Fundo */}
      <div className="absolute top-4 left-4 w-full h-full bg-[#D9D9D9] rounded-[20px] -z-10"></div>
      
      {/* Moldura da Imagem */}
      <div className="relative aspect-[4/3] w-full bg-white rounded-[20px] border-4 border-white shadow-xl overflow-hidden">
        <Image 
          src="/foto-construir.png" // Substitua pelo caminho da sua imagem
          alt="Etapa Construir"
          fill
          className="object-cover"
        />
      </div>
    </div>

    {/* LADO DIREITO: TEXTO */}
    <div className="flex-1 max-w-[550px]">
      <div className="w-16 h-[3px] bg-[#E9D354] mb-6"></div>
      <h2 className="text-[#0077cc] text-[40px] font-black mb-8 leading-tight">
        Construir
      </h2>
      
      <div className="space-y-6 text-[#333333] text-[18px] leading-relaxed text-justify">
        <p>
          A etapa <strong>Construir</strong> corresponde ao momento em que o projeto deixa o ambiente digital e passa a existir de forma física.
        </p>
        
        <p>
          No InPETU Maker, essa fase envolve a fabricação de protótipos por meio de diferentes equipamentos e processos produtivos, como impressão 3D, corte a laser, usinagem, conformação e acabamentos.
        </p>

        <p>
          Os usuários podem utilizar os equipamentos de forma <strong>autônoma</strong>, desde que tenham concluído os treinamentos obrigatórios e estejam em conformidade com as políticas de uso e segurança do laboratório.
        </p>

        <p>
          Durante a construção é possível contar com orientações técnicas pontuais dos colaboradores do maker ou optar pela contratação de prestadores de serviços especializados quando o projeto envolver maior complexidade.
        </p>
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
                  src="/construir/treinamento.png" 
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
                  src="/construir/apoio.png" 
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
          <div className="mb-12">
            <div className="w-20 h-[3px] bg-[#E9D354] mb-4"></div>
            <h2 className="text-[#0077cc] text-[32px] md:text-[40px] font-black leading-tight">
              Equipamentos disponíveis
            </h2>
          </div>

          {/* GRID DE EQUIPAMENTOS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* CARD EQUIPAMENTO 1 - Impressora 3D */}
            <div className="bg-white rounded-[20px] p-6 shadow-md flex flex-col md:flex-row items-center gap-6 border border-gray-100 hover:shadow-xl transition-all group">
              {/* Container da Imagem - Ocupa 100% no mobile e 180px no desktop */}
              <div className="w-full md:w-[180px] h-[180px] bg-[#F2F2F2] rounded-lg flex-shrink-0 relative overflow-hidden border border-gray-100">
                <Image 
                  src="/equipamentos/impressora.png" 
                  alt="Impressora 3D X1 Carbon" 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  sizes="(max-width: 768px) 100vw, 180px"
                />
              </div>
              <div className="flex flex-col flex-grow text-center md:text-left">
                <h3 className="text-[#191F37] text-[24px] font-bold leading-tight group-hover:text-[#0077cc] transition-colors">
                  Impressora 3D X1 Carbon
                </h3>
                <p className="text-[#333333] text-[15px] mt-2 mb-6 leading-relaxed">
                  Alta performance e precisão para prototipagem rápida e peças funcionais.
                </p>
                <button className="bg-[#0077Cc] text-white font-bold py-2.5 px-6 rounded-lg self-center md:self-start hover:bg-[#005FA3] active:scale-95 transition-all text-sm">
                  Saiba mais
                </button>
              </div>
            </div>

            {/* CARD EQUIPAMENTO 2 - Cortadora Laser */}
            <div className="bg-white rounded-[20px] p-6 shadow-md flex flex-col md:flex-row items-center gap-6 border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-full md:w-[180px] h-[180px] bg-[#F2F2F2] rounded-lg flex-shrink-0 relative overflow-hidden border border-gray-100">
                <Image 
                  src="/equipamentos/laser.png" 
                  alt="Cortadora Laser" 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 180px"
                />
              </div>
              <div className="flex flex-col flex-grow text-center md:text-left">
                <h3 className="text-[#191F37] text-[24px] font-bold leading-tight group-hover:text-[#0077cc] transition-colors">
                  Cortadora Laser CNC
                </h3>
                <p className="text-[#333333] text-[15px] mt-2 mb-6 leading-relaxed">
                  Corte e gravação precisos em diversos materiais como acrílico, MDF e madeira.
                </p>
            <Link href="/construir/equipamentos/impressora-3d">
              <button className="bg-[#0077Cc] text-white font-bold py-2.5 px-6 rounded-lg self-center md:self-start hover:bg-[#005FA3] active:scale-95 transition-all text-sm">
                Saiba mais
              </button>
            </Link>
              </div>
            </div>

            {/* CARD EQUIPAMENTO 3 - Gravação Laser */}
            <div className="bg-white rounded-[20px] p-6 shadow-md flex flex-col md:flex-row items-center gap-6 border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-full md:w-[180px] h-[180px] bg-[#F2F2F2] rounded-lg flex-shrink-0 relative overflow-hidden border border-gray-100">
                <Image 
                  src="/equipamentos/gravacaolaser.png" 
                  alt="Gravação a Laser por Fibra" 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 180px"
                />
              </div>
              <div className="flex flex-col flex-grow text-center md:text-left">
                <h3 className="text-[#191F37] text-[24px] font-bold leading-tight group-hover:text-[#0077cc] transition-colors">
                  DUE Pulsa - Gravação a laser
                </h3>
                <p className="text-[#333333] text-[15px] mt-2 mb-6 leading-relaxed">
                 Utilizada para a gravação permanente de textos, imagens e marcações técnicas em superfícies
                </p>
                <button className="bg-[#0077Cc] text-white font-bold py-2.5 px-6 rounded-lg self-center md:self-start hover:bg-[#005FA3] active:scale-95 transition-all text-sm">
                  Saiba mais
                </button>
              </div>
            </div>

            {/* CARD EQUIPAMENTO 4 - Serra Policorte */}
            <div className="bg-white rounded-[20px] p-6 shadow-md flex flex-col md:flex-row items-center gap-6 border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-full md:w-[180px] h-[180px] bg-[#F2F2F2] rounded-lg flex-shrink-0 relative overflow-hidden border border-gray-100">
                <Image 
                  src="/equipamentos/spolicorte.png" 
                  alt="Serra Policorte" 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 180px"
                />
              </div>
              <div className="flex flex-col flex-grow text-center md:text-left">
                <h3 className="text-[#191F37] text-[24px] font-bold leading-tight group-hover:text-[#0077cc] transition-colors">
                  Plotter de Recorte
                </h3>
                <p className="text-[#333333] text-[15px] mt-2 mb-6 leading-relaxed">
                  Corte preciso de vinil adesivo para sinalização, decalques e personalização.
                </p>
                <button className="bg-[#0077Cc] text-white font-bold py-2.5 px-6 rounded-lg self-center md:self-start hover:bg-[#005FA3] active:scale-95 transition-all text-sm">
                  Saiba mais
                </button>
              </div>
            </div>

          </div>

          {/* BOTÃO VER TODOS */}
          <div className="mt-16 flex justify-center">
            <Link 
              href="/construir/equipamentos" 
              className="bg-[#E9D354] text-[#191F37] font-extrabold py-3 px-12 rounded-lg hover:bg-[#d6c14b] transition-all shadow-md uppercase tracking-wider text-sm text-center">
              Ver todos
            </Link>
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
                Desenvolver o protótipo
              </p>
            </div>

          </div>
        </div>
      </section>
{/* BLOCO 6 – EXEMPLOS DE PROTÓTIPOS CONSTRUÍDOS (ZIGUE-ZAGUE) */}
      {/* <section className="w-full px-6 py-20 bg-[#FAFAFA]">
        <div className="max-w-[1355px] mx-auto">
          <div className="flex flex-col items-center mb-16">
            <div className="w-20 h-[3px] bg-[#E9D354] mb-4"></div>
            <h2 className="text-[#0077cc] text-[40px] font-extrabold uppercase">Protótipos construídos no Maker</h2>
          </div>

          <div className="space-y-12"> */}
            {/* Protótipo 1 - Imagem Direita */}
            {/* <div className="flex flex-col md:flex-row items-center gap-0 rounded-2xl overflow-hidden shadow-xl bg-white h-[400px]">
              <div className="flex-1 p-12 space-y-4">
                <h3 className="text-[#191F37] text-[32px] font-extrabold">Braço Robótico FDM</h3>
                <p className="text-gray-600 text-lg">Projeto desenvolvido utilizando impressão 3D e corte a laser para validação de movimentos mecânicos e eletrônica embarcada.</p>
              </div>
              <div className="flex-1 h-full relative bg-[#E9D354]"> */}
                {/* Substitua pelo caminho da sua imagem real */}
                {/* <div className="absolute inset-0 bg-gray-300"></div> 
                <div className="absolute bottom-0 left-0 w-full h-20 bg-[#E9D354]/80 backdrop-blur-sm flex items-center px-8">
                  <span className="text-[#191F37] font-bold">Protótipo Funcional #01</span>
                </div>
              </div> */}
            {/* </div> */}

            {/* Protótipo 2 - Imagem Esquerda */}
            {/* <div className="flex flex-col md:flex-row-reverse items-center gap-0 rounded-2xl overflow-hidden shadow-xl bg-white h-[400px]">
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
      </section> */}

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