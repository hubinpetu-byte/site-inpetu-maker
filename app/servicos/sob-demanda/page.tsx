"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";

export default function SobDemandaPage() {
  return (
    <main className="w-full bg-[#F8F9FA] font-sans text-[#191F37]">

      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-18">
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex flex-col md:flex-row items-center gap-12">
          
          {/* Lado Esquerdo: Texto e Botões */}
          <div className="flex-1">
            <span className="text-sm font-semibold text-gray-500 mb-2 block lowercase">
              serviço
            </span>
            <h1 className="text-[40px] md:text-[52px] font-black text-[#191F37] leading-tight mb-4">
              Prototipagem <br /> sob demanda
            </h1>
            <p className="text-base text-gray-600 mb-8 max-w-md leading-relaxed">
              Desenvolvimento técnico de protótipos realizado pela equipe do InPETU Maker, ideal para quem precisa transformar uma ideia em modelo físico com apoio especializado.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#E5E7EB] text-[#191F37] font-semibold rounded-md hover:bg-gray-300 transition text-sm">
                Conhecer o espaço
              </button>
              <button className="px-6 py-3 bg-[#0377CC] text-white font-semibold rounded-md hover:bg-[#025da3] transition text-sm">
                Solicitar orçamento
              </button>
            </div>
          </div>

          {/* Lado Direito: Placeholder da Imagem */}
          <div className="flex-1 w-full flex flex-col items-center">
            <div className="w-full aspect-[4/3] bg-[#D9D9D9] rounded-[24px] flex items-center justify-center relative overflow-hidden">
              <Image 
                src="/icons/placeholder-img.svg" 
                alt="Prototipagem sob demanda" 
                width={80} 
                height={80} 
                className="opacity-30" 
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. COMO FUNCIONA */}
      <section className="bg-[#F8F9FA] py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 aspect-square md:aspect-video bg-[#D9D9D9] rounded-[32px] flex items-center justify-center">
            <Image 
              src="/icons/placeholder-img.svg" 
              alt="Como funciona" 
              width={80} 
              height={80} 
              className="opacity-30" 
            />
          </div>

          <div className="flex-1">
            <h2 className="text-[40px] font-black mb-6 text-[#0377CC]">
              Como funciona
            </h2>
            <div className="space-y-4 text-base text-gray-700 leading-relaxed">
              <p>
                A Prototipagem sob Demanda é destinada a usuários que desejam desenvolver um protótipo, mas não possuem capacitação técnica ou disponibilidade para operar os equipamentos do laboratório.
              </p>
              <p>
                Após o envio das informações do projeto, a equipe técnica realiza a análise de viabilidade, define os processos de fabricação mais adequados e executa a produção utilizando a infraestrutura do InPETU Maker. O serviço pode incluir orientação técnica, ajustes no arquivo e acompanhamento das etapas de fabricação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INCLUSOS / NÃO INCLUSOS */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-0 relative">
          
          {/* Card: Inclusos */}
          <div className="bg-white p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-10 border border-gray-100">
            <h3 className="text-3xl font-black mb-6">Inclusos</h3>
            <p className="text-gray-500 mb-8 font-medium">
              Ao utilizar o serviço, estão disponíveis:
            </p>
            <ul className="space-y-4">
              {[
                "Análise técnica do projeto",
                "Avaliação de viabilidade de fabricação",
                "Sugestão de processos e materiais adequados",
                "Ajustes simples para adequação à fabricação",
                "Operação das máquinas pela equipe técnica",
                "Produção do protótipo conforme especificações aprovadas",
                "Orientações básicas sobre acabamento e montagem",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                  <div className="mt-1">
                    <Check size={18} className="text-[#0377CC]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button className="w-full mt-12 py-4 bg-[#0377CC] text-white font-bold rounded-xl hover:bg-[#025da3] transition text-sm">
              Solicitar orçamento
            </button>
          </div>

          {/* Card: Não Inclusos */}
          <div className="bg-white p-12 rounded-[32px] shadow-sm border border-gray-100 md:-ml-8 md:my-8 md:pl-20 self-center">
            <h3 className="text-2xl font-black mb-6">Não inclusos</h3>
            <p className="text-gray-500 mb-8 text-sm">O serviço não contempla:</p>
            <ul className="space-y-4">
              {[
                "Desenvolvimento completo sem participação do contratante",
                "Projetos de engenharia detalhados",
                "Produção em larga escala",
                "Fornecimento ilimitado de materiais",
                "Consultoria estratégica de negócios",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-500 text-sm">
                  <div className="mt-1">
                    <X size={18} className="text-red-400" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* 4. PRÉ-REQUISITOS */}
      <section className="bg-[#F8F9FA] py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-[32px] md:text-[40px] font-black text-[#0377CC] leading-tight mb-6">
              Pré-requisitos para utilização
            </h2>
            <p className="text-gray-600 mb-8 text-sm">
              Para dar início ao processo, é necessário:
            </p>
            <div className="flex gap-4">
              <Link href="/cadastro">
                <button className="px-6 py-2.5 bg-[#0377CC] text-white font-bold rounded-md text-xs hover:bg-[#025da3] transition-colors">
                  Cadastre-se
                </button>
              </Link>
              <Link href="/enviar-projeto">
                <button className="px-6 py-2.5 border border-[#0377CC] text-[#0377CC] font-bold rounded-md text-xs hover:bg-blue-50 transition-colors">
                  Enviar projeto
                </button>
              </Link>
            </div>
          </div>

          <div className="lg:w-2/3 space-y-3">
            {[
              "Cadastro ativo no sistema do InPETU Maker",
              "Envio das especificações do projeto",
              "Arquivo digital (quando aplicável)",
              "Definição clara de objetivo e uso do protótipo",
              "Aprovação do orçamento",
            ].map((text, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-lg shadow-sm flex justify-between items-center group hover:shadow-md transition"
              >
                <span className="font-bold text-gray-800 text-sm">{text}</span>
              </div>
            ))}
            <p className="text-xs text-gray-400 mt-4 italic">
              *Os prazos variam conforme a complexidade do projeto e a disponibilidade do laboratório.
            </p>
          </div>
        </div>
      </section>

      {/* 5. OUTROS SERVIÇOS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-[40px] font-black mb-12 text-[#0377CC]">
          Outros Serviços
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Uso Livre */}
          <Link
            href="/servicos/uso-livre"
            className="bg-white p-12 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition text-center flex flex-col items-center justify-center min-h-[280px] block group cursor-pointer"
          >
            <h3 className="text-[28px] font-black mb-4 text-[#191F37] group-hover:text-[#0377CC] transition-colors">
              Uso Livre
            </h3>
            <p className="text-gray-500 text-[15px] leading-relaxed max-w-[80%]">
              Acesso aos equipamentos e espaços para quem deseja desenvolver projetos de forma autônoma.
            </p>
          </Link>

          {/* Card 2: Workshops */}
          <Link
            href="/workshop"
            className="bg-white p-12 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition text-center flex flex-col items-center justify-center min-h-[280px] block group cursor-pointer"
          >
            <h3 className="text-[28px] font-black mb-4 text-[#191F37] group-hover:text-[#0377CC] transition-colors">
              Workshops
            </h3>
            <p className="text-gray-500 text-[15px] leading-relaxed max-w-[80%]">
              Atividades formativas para aprendizado de técnicas, ferramentas e processos de fabricação.
            </p>
          </Link>
        </div>
      </section>

    </main>
  );
}