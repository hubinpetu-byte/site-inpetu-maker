"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, X, ChevronRight } from "lucide-react";

export default function UsoLivrePage() {
  return (
    <main className="w-full bg-[#F8F9FA] font-sans text-[#191F37]">
      
      {/* 1. HERO SECTION (Header do Serviço) */}
      <section className="max-w-7xl mx-auto px-6 py-18 md:py-32">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-2 block">serviço</span>
            <h1 className="text-[48px] md:text-[64px] font-black leading-tight mb-4">Uso Livre</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Acesso aos equipamentos e espaços para quem quer aprender na prática.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition">
                Conhecer o espaço
              </button>
              <button className="px-8 py-3 bg-[#0377CC] text-white font-bold rounded-lg hover:bg-[#025da3] transition shadow-lg">
                Agendar Uso Livre
              </button>
            </div>
          </div>
          <div className="flex-1 w-full aspect-video bg-[#D9D9D9] rounded-[32px] relative overflow-hidden flex items-center justify-center">
             <Image src="/servicos/head-img.png" alt="Preview" width={80} height={80} className="opacity-30" />
             {/* Quando tiver a foto real: <Image src="/uso-livre-hero.jpg" fill className="object-cover" /> */}
          </div>
        </div>
      </section>

      {/* 2. COMO FUNCIONA */}
      <section className="bg-[#F8F9FA] py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 aspect-square md:aspect-video bg-[#D9D9D9] rounded-[32px] flex items-center justify-center">
             <Image src="/icons/placeholder-img.svg" alt="Funciona" width={60} height={60} className="opacity-30" />
          </div>
          <div className="flex-1">
            <h2 className="text-[40px] font-black mb-6 text-[#0377CC]">Como funciona</h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>O serviço Uso Livre é destinado a usuários que desejam desenvolver projetos próprios utilizando, de forma autônoma, os equipamentos e a infraestrutura do InPETU Maker.</p>
              <p>O espaço oferece um ambiente estruturado, seguro e colaborativo com suporte técnico disponível para orientações pontuais quando necessário.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INCLUSO / NÃO INCLUSO (Cards Flutuantes) */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-0 relative">
          
          {/* Card: Incluso (O que sobrepõe) */}
          <div className="bg-white p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-10 border border-gray-100">
            <h3 className="text-3xl font-black mb-6">Incluso no Uso Livre</h3>
            <p className="text-gray-500 mb-8 font-medium">Ao utilizar o serviço, estão disponíveis:</p>
            <ul className="space-y-4">
              {[
                "Uso de equipamentos durante o horário agendado",
                "Acesso ao espaço físico e ferramentas de apoio à prototipagem",
                "Infraestrutura básica de laboratório",
                "Suporte rápido para dúvidas operacionais",
                "Equipamentos de Proteção Individual (EPIs)"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <div className="mt-1"><Check size={20} className="text-[#0377CC]" /></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button className="w-full mt-12 py-4 bg-[#0377CC] text-white font-bold rounded-xl hover:bg-[#025da3] transition">
              Agendar Uso Livre
            </button>
          </div>

          {/* Card: Não Incluso (Recuado) */}
          <div className="bg-white p-12 rounded-[32px] shadow-sm border border-gray-100 md:-ml-8 md:my-8 md:pl-20 self-center">
            <h3 className="text-2xl font-black mb-6">Não inclusos</h3>
            <p className="text-gray-500 mb-8">O serviço não contempla:</p>
            <ul className="space-y-4">
              {[
                "Desenvolvimento ou modificação de projetos",
                "Operação de máquinas pela equipe técnica",
                "Consultorias técnicas ou criativas",
                "Modelagem ou preparação de arquivos",
                "Fornecimento de materiais, salvo quando especificado"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-500">
                  <div className="mt-1"><X size={18} className="text-red-400" /></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. PRÉ-REQUISITOS (Lista de Acordeão/Status) */}
      <section className="bg-[#F8F9FA] py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-[32px] md:text-[40px] font-black text-[#0377CC] leading-tight mb-6">
              Pré-requisitos para utilização
            </h2>
            <p className="text-gray-600 mb-8">Para acesso ao laboratório, é necessário cumprir todos os requisitos:</p>
            <div className="flex gap-4">
             <Link href="/cadastro">
                <button className="px-6 py-2 bg-[#0377CC] text-white font-bold rounded-md text-sm hover:bg-[#025da3] transition-colors">
                  Cadastre-se
                </button>
              </Link>
               <Link href="/construir/equipamentos">
              <button className="px-6 py-2 border border-[#0377CC] text-[#0377CC] font-bold rounded-md text-sm">Equipamentos disponíveis</button>
              </Link>
            </div>
          </div>
          <div className="lg:w-2/3 space-y-3">
            {[
              "Cadastro ativo no sistema do InPETU Maker",
              "Capacitação concluída no equipamento desejado",
              "Aceite dos termos de uso e responsabilidade",
              "Utilização obrigatória dos EPIs indicados",
              "Cumprimento das normas de segurança"
            ].map((text, i) => (
              <div key={i} className="bg-white p-5 rounded-lg shadow-sm flex justify-between items-center group hover:shadow-md transition">
                <span className="font-bold text-gray-800">{text}</span>
                
              </div>
            ))}
            <p className="text-xs text-gray-400 mt-4 italic">
              * O uso poderá ser interrompido pela equipe em caso de risco ou descumprimento das diretrizes.
            </p>
          </div>
        </div>
      </section>

{/* 5. OUTROS SERVIÇOS (Ajustado: Título em linha única e texto compacto) */}
<section className="py-24 px-6 max-w-7xl mx-auto">
  <h2 className="text-[40px] font-black mb-12 text-[#0377CC]">Outros Serviços</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Card 1 */}
    <div className="bg-white p-12 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition text-center flex flex-col items-center justify-center min-h-[320px]">
      {/* whitespace-nowrap garante que o título não quebre linha */}
      <h3 className="text-[28px] font-black mb-4 text-[#191F37] whitespace-nowrap">
        Prototipagem sob demanda
      </h3>
      {/* leading-tight e max-w-[80%] deixam o texto "esmagadinho" */}
      <p className="text-gray-500 text-[16px] leading-tight max-w-[85%]">
        Desenvolvimento de protótipos pela equipe técnica, conforme especificações do projeto.
      </p>
    </div>
    {/* Card 2 */}
    <div className="bg-white p-12 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition text-center flex flex-col items-center justify-center min-h-[320px]">
      <h3 className="text-[28px] font-black mb-4 text-[#191F37] whitespace-nowrap">
        Workshops
      </h3>
      <p className="text-gray-500 text-[16px] leading-tight max-w-[85%]">
        Atividades formativas para aprendizado de técnicas, ferramentas e processos de fabricação.
      </p>
    </div>
  </div>
</section>
    </main>
  );
}