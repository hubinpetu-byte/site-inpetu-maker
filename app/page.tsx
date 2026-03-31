"use client";

import { useRef } from 'react'; 
import Carousel from "./components/Carousel";
import Pillars from "./components/Pillars";
import Services from "./components/Service";
import ProjectCard from "./components/ProjectCard";
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  // Referência para controlar o scroll do carrossel de projetos
const scrollRef = useRef<HTMLDivElement>(null);

  // Função para mover o carrossel (pode ser ligada a botões no futuro)
  const scroll = (direction: string) => {
  if (scrollRef.current) {
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollToTarget = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
    
    // O scrollTo agora vai funcionar porque o TS sabe que é uma DIV
    scrollRef.current.scrollTo({ 
      left: scrollToTarget, 
      behavior: 'smooth' 
    });
  }
};

  return (
    <div className="w-full bg-[#FAFAFA]">
      
      {/* BLOCO 1 – CARROSSEL TOPO */}
      <Carousel />

      {/* BLOCO 2 – FRASE DO CONCEITO */}
      <section className="w-full bg-[#191F37] min-h-[80vh] flex flex-col items-center justify-center px-6 py-1">
        <p className="text-white text-[48px] font-semibold leading-tight text-center max-w-7xl">
          Transforme suas ideias em protótipos reais.
        </p>

        <div className="flex flex-wrap gap-10 mt-20 justify-center">
          <Link
            href="/construir/equipamentos"
            className="px-10 py-4 border-[3px] border-[#0377CC] text-white font-bold text-[24px] rounded-lg hover:bg-[#0377CC]/10 transition text-center"
          >
            Agendar uso
          </Link>

          <Link
            href="/orcamento"
            className="px-10 py-4 border-[3px] border-[#0377CC] text-white font-bold text-[24px] rounded-lg hover:bg-[#0377CC]/10 transition text-center"
          >
            Solicitar orçamento
          </Link>
        </div>
      </section>

{/* BLOCO 3 – PILARES */}
      <section className="w-full bg-[#191F37] pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-white text-[32px] md:text-[40px] font-extrabold mb-10">
            Pilares InPETU Maker
          </h2>
          <Pillars />
        </div>
      </section>

      {/* BLOCO 4 – SERVIÇOS */}
      <section className="w-full bg-[#FAFAFA] px-6 pt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#000000] text-[40px] font-extrabold text-left mb-8">
            Serviços
          </h2>
          <Services />
        </div>
      </section>

      {/* BLOCO 5 – COMO FUNCIONA */}
      <section className="max-w-[1355px] mx-auto px-6 py-24 bg-[#fafafa]">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 w-full max-w-[650px]">
            <div className="relative aspect-[16/9] md:aspect-square lg:aspect-[1.5/1]">
              <Image 
                src="/como_funciona.png"
                alt="Diagrama Como Funciona"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>

          <div className="flex-1 max-w-[450px]">
            <h2 className="text-[#191F37] text-[40px] font-black mb-8 leading-tight">
              Como funciona
            </h2>
            <p className="text-[#333333] text-[18px] leading-relaxed mb-10 text-justify">
              O InPETU Maker oferece um processo estruturado para transformar ideias em soluções reais. 
              Da orientação inicial ao uso dos equipamentos, cada etapa garante segurança, autonomia e 
              eficiência no desenvolvimento dos projetos.
            </p>
            <Link href="/sobre/jornada-maker">
              <button className="bg-[#E9D354] text-[#191F37] font-bold py-4 px-10 rounded-lg hover:bg-[#d4c04d] transition-all shadow-sm">
                Conheça a Jornada Maker
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* BLOCO 6 - NOVOS PROJETOS (Carrossel) */}
      <section className="w-full bg-[#181F37] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[40px] font-extrabold mb-10 text-[#FAFAFA]">Novos Projetos</h2>
          
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-8 no-scrollbar"
          >
            <ProjectCard image="/projetos/projeto-braco-robotico.png" title="Braço Robótico" description="Protótipo funcional" filters={["Robótica"]} />
            <ProjectCard image="/projetos/carro-autonomo.jpg" title="Carrinho Autônomo" description="IA aplicada" filters={["IA"]} />
            <ProjectCard image="/projetos/projeto2.jpg" title="Novo Projeto" description="Marcenaria moderna" filters={["Marcenaria"]} />
            <ProjectCard image="/projetos/projeto2.jpg" title="Novo Projeto" description="Marcenaria moderna" filters={["Marcenaria"]} />
          </div>
        </div>
      </section>

     {/* BLOCO 7 - AGENDA DINÂMICA (VERSÃO FINAL CORRIGIDA) */}
<section className="w-full bg-[#181F37] py-20 border-t border-gray-800 text-white">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16 items-start">
    
    {/* LADO ESQUERDO: Títulos e Legendas */}
    <div className="flex-1">
      <h2 className="text-[40px] font-extrabold mb-8">Agenda</h2>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <span className="w-10 h-1 bg-orange-500 rounded-full"></span> 
          <span className="text-xl font-medium text-gray-300">Workshops</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-10 h-1 bg-blue-500 rounded-full"></span> 
          <span className="text-xl font-medium text-gray-300">Treinamentos</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-10 h-1 bg-yellow-500 rounded-full"></span> 
          <span className="text-xl font-medium text-gray-300">Eventos</span>
        </div>
      </div>
    </div>

    {/* LADO DIREITO: O Calendário Real */}
    <div className="flex-1 bg-[#252B45] p-10 rounded-[32px] shadow-2xl w-full max-w-4xl mx-auto">
  
  {/* Mês atual dinâmico */}
  <div className="text-center font-bold text-2xl mb-10 uppercase tracking-[0.3em] text-white">
    {new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date())}
  </div>

  {/* Grid: Aqui NÃO pode ter nada escrito manualmente antes do .map */}
  <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center">
    
    {/* 1. Único cabeçalho permitido: D S T Q Q S S */}
    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((dia, i) => (
      <div key={`weekday-${i}`} className="text-gray-500 font-bold text-sm mb-2">
        {dia}
      </div>
    ))}

    {/* 2. Lógica dos dias (sem letras manuais aqui dentro) */}
    {(() => {
      const hoje = new Date(); 
      const ano = hoje.getFullYear();
      const mes = hoje.getMonth();
      
      const primeiroDiaSemana = new Date(ano, mes, 1).getDay(); // Março/26 começa no Domingo (0)
      const diasNoMes = new Date(ano, mes + 1, 0).getDate();

      const celulas = [];

      // Espaços vazios
      for (let x = 0; x < primeiroDiaSemana; x++) {
        celulas.push(<div key={`empty-${x}`}></div>);
      }

      // Dias numéricos
      for (let dia = 1; dia <= diasNoMes; dia++) {
        const ehHoje = dia === hoje.getDate();

        celulas.push(
          <div
            key={`day-${dia}`}
            className={`
              relative py-3 rounded-xl transition-all cursor-pointer text-sm font-semibold flex items-center justify-center mx-auto w-10 h-10
              ${ehHoje ? 'bg-[#0377CC] text-white shadow-lg scale-110 z-10' : 'text-gray-300 hover:bg-white/10'}
              ${dia === 12 ? 'border-b-2 border-orange-500' : ''}
              ${dia === 21 ? 'border-b-2 border-yellow-500' : ''}
            `}
          >
            {dia}
            {ehHoje && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full"></span>
            )}
          </div>
        );
      }
      return celulas;
    })()}
  </div>
</div>
  </div>
</section>

    </div>
  );
}