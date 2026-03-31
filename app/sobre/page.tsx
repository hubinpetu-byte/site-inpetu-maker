"use client";

import React from 'react';
import Image from 'next/image'; // Importamos o componente de imagem do Next.js

export default function SobreNos() {
  return (
    <div className="w-full bg-[#FFFFFF] pt-[0px] pb-20">
      
      {/* BLOCO 1 – BANNER LARGURA TOTAL COM IMAGEM EM ALTA QUALIDADE */}
      <section className="w-full"> 
       <div className="w-full h-[520px] relative"> 
         <Image 
          src="/banners/banner_sobree.png" 
          alt="Banner Sobre o InPETU Maker"
          fill
          className="object-cover"
          priority
          quality={100}      // Força a qualidade máxima (0 a 100)
          unoptimized={true} // Desativa a compressão automática do Next.js
            />
        </div>
      </section>

      {/* BLOCO 2 – CONTEÚDO CENTRALIZADO */}
      <section className="w-full px-6 py-24 pt-[60px]">
        <div className="max-w-[1355px] mx-auto">
          <div className="mb-10">
            <h2 className="text-[#0377CC] text-[48px] font-extrabold">
              Quem somos
            </h2>
            <p className="text-[#0077cc] text-[24px] font-regular mt-[-1]">
              Um espaço de prototipagem, aprendizado e inovação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-[#333333] text-[18px] leading-normal text-justify">
            <p>
              O InPETU Maker é um ambiente de inovação e prototipagem que integra ensino, pesquisa e desenvolvimento tecnológico. Atuamos como um espaço aberto e colaborativo, voltado ao apoio de estudantes, pesquisadores, startups e à comunidade em geral no desenvolvimento de projetos e soluções inovadoras.
            <br /><br />
              Nossa atuação está baseada na cultura maker e na aprendizagem prática, oferecendo condições para que ideias possam ser testadas, construídas e aprimoradas de forma estruturada e segura.
            </p>
            <p>
              O laboratório reúne infraestrutura, equipamentos e apoio técnico que permitem transformar conceitos em protótipos funcionais, incentivando a experimentação e a interdisciplinaridade.

              Além do acesso aos recursos físicos, o InPETU Maker promove conexões entre pessoas, áreas do conhecimento e instituições, fortalecendo parcerias e estimulando a inovação aplicada. Mais do que um espaço físico, somos um ambiente que impulsiona a criação, o compartilhamento de conhecimento e o desenvolvimento de soluções com impacto real.
            </p>
            
          </div>
        </div>
      </section>

      {/* BLOCO 3 – RELAÇÃO COM A INOVAÇÃO */}
      <section className="w-full px-6 py-12 bg-[#F6F6F6]">
        <div className="max-w-[1355px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          
          {/* Lado Esquerdo: Texto */}
          <div>
            <h2 className="text-[#0377CC] text-[48px] font-extrabold leading-tight mb-6">
              Inovação no InPETU Maker
            </h2>
            <p className="text-[#333333] text-[18px] leading-normal text-justify">
              O InPETU Maker integra o hub de inovação do <b>InPETU</b>, atuando como um espaço dedicado à prototipagem. 
              Sua função é aproximar conhecimento técnico, experimentação prática e desenvolvimento de soluções voltadas a desafios reais.<br/>
              <br/> Inserido no contexto da <b>UFSC</b>, o InPETU Maker contribui para a formação acadêmica e científica, oferecendo um ambiente onde estudantes,
              pesquisadores e projetos institucionais podem experimentar, prototipar e validar ideias de forma integrada ao ensino e à pesquisa. <br/>
              <br/>Localizado no <b>Sapiens Parque</b>, o InPETU Maker também se conecta a empresas, startups e iniciativas do
              ecossistema regional, fortalecendo parcerias e ampliando as oportunidades de colaboração e desenvolvimento de soluções inovadoras.
            </p>
          </div>

          {/* Lado Direito: Imagens Sobrepostas */}
          <div className="relative h-[500px] w-full flex items-center justify-center">
            {/* Imagem de Fundo (mais para trás e para a esquerda) */}
            <div className="absolute top-10 left-10 w-[300px] h-[350px] bg-[#D9D9D9] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border-4 border-white">
              <Image 
                src="/sobre/inovacao_2.jpg" 
                alt="Inovação 1"
                fill
                className="object-cover"
              />
            </div>

            {/* Imagem de Frente (mais para frente e para a direita) */}
            <div className="absolute bottom-10 right-10 w-[300px] h-[350px] bg-[#D9D9D9] rounded-lg shadow-[0_20px_50px_rgba(0,10,0,0.5)] overflow-hidden border-4 border-white z-10">
              <Image 
                src="/sobre/inovacao_1.jpg" 
                alt="Inovação 2"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* BLOCO 4 – NOSSOS EXPERTS */}
      {/* <section className="w-full px-6 py-20 bg-[#FAFAFA]"> */}
        {/* <div className="max-w-[1355px] mx-auto"> */}
          
          {/* Cabeçalho da Seção */}
          {/* <div className="mb-12"> */}
            {/* <h2 className="text-[#0377CC] text-[48px] font-extrabold leading-tight"> */}
              {/* Nossos Experts */}
            {/* </h2> */}
            {/* <p className="text-[#333333] text-[20px] mt-4 max-w-4xl"> */}
              {/* Se precisar de assistência na execução do projeto, conte com nosso time de experts maker.  */}
            {/* </p> */}
          {/* </div> */}

          {/* Grade de Cards */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"> */}
            {/* Simulando 4 experts. Depois você pode substituir por dados reais */}
            {/* {[1, 2, 3, 4].map((expert) => ( */}
              {/* <div key={expert} className="flex flex-col"> */}
                {/* Card de Foto */}
                {/* <div className="relative w-full h-[450px] bg-gradient-to-b from-gray-200 to-gray-400 rounded-lg overflow-hidden group"> */}
                  {/* Placeholder da imagem - quando tiver as fotos, use o componente Image aqui */}
                  {/* <div className="absolute inset-0 flex items-center justify-center opacity-30"> */}
                     {/* <span className="text-4xl">👤</span> */}
                  {/* </div> */}
                  
                  {/* Overlay de texto (Nome e Área) que fica na parte inferior do card */}
                  {/* <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#181F37]/50 to-transparent text-white"> */}
                    {/* <h3 className="text-[24px] font-bold">Nome</h3> */}
                    {/* <p className="text-[16px] opacity-90">Área maker que domina / ID lattes</p> */}
                  {/* </div> */}
                {/* </div> */}
              {/* </div> */}
            {/* ))} */}
          {/* </div> */}

        {/* </div> */}
      {/* </section> */}

{/* BLOCO 5 – NOSSOS PARCEIROS */}
<section className="w-full px-6 py-20 bg-white">
  <div className="max-w-[1355px] mx-auto">
    
    {/* Linha Decorativa e Título conforme protótipo */}
    <div className="flex flex-col items-center mb-16">
      <div className="w-40 h-1 bg-[#F1D24B] mb-8"></div> 
      <h2 className="text-[#0377CC] text-[40px] font-extrabold text-center">
        Nossos parceiros
      </h2>
    </div>

    {/* Grade de Logos - Mapeamento com nomes e caminhos reais */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-8 items-start justify-items-center">
      {[
    
        { nome: "Sapiens Parque", slug: "sapiens" },
        { nome: "FEESC", slug: "feesc" },
        { nome: "UFSC", slug: "ufsc" },
        { nome: "FAPESC", slug: "fapesc" },
        { nome: "FINEP", slug: "finep" },
        { nome: "ESSS", slug: "esss" },
        { nome: "Mitutoyo Sul Americana", slug: "mitutoyo" },
      ].map((parceiro) => (
        <div key={parceiro.slug} className="group flex flex-col items-center">
          {/* Box da Logo com borda e fundo claro */}
          <div className="w-[180px] h-[100px] border border-gray-200 bg-gray-50 flex items-center justify-center rounded-sm transition-all duration-300 group-hover:shadow-md relative overflow-hidden">
            <Image 
              src={`/Parceiros/logo_${parceiro.slug}.png`} 
              alt={`Logo ${parceiro.nome}`}
              width={140}
              height={70}
              className="object-contain transition-all duration-300 grayscale group-hover:grayscale-0"
              unoptimized={true}
            />
          </div>
          {/* Nome do parceiro alinhado abaixo da box */}
          <p className="text-center text-[#191F37] mt-3 font-bold text-sm max-w-[160px] leading-tight transition-colors group-hover:text-[#0377CC]">
            {parceiro.nome}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>

    </div>
  );
}