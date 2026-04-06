"use client";

import { useRef } from 'react'; 
import Carousel from "./components/Carousel";
import Pillars from "./components/Pillars";
import Services from "./components/Service";
import ProjectCard from "./components/ProjectCard";
import Link from 'next/link';
import Image from 'next/image';
import AgendaBloco7 from './components/Agenda';

export default function Home() {
  // Referência para controlar o scroll do carrossel de projetos
  const scrollRef = useRef<HTMLDivElement>(null);

  // Função para mover o carrossel
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollToTarget = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      
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
      {/* <section className="w-full bg-[#181F37] py-20">
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
      </section> */}

      {/* BLOCO 7 - AGENDA DINÂMICA */}
      <AgendaBloco7 />

    </div>
  );
}