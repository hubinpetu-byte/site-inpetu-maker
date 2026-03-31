// app/components/Pillars.tsx

import Image from "next/image";

interface Pillar {
  title: string;
  description: string;
  icon: string;
  iconHover: string;
}

// CARD -----------------------------------------------------
function PillarCard({ title, description, icon, iconHover }: Pillar) {
  return (
    <div
      className="
        group
        relative
        w-[303px]
        h-[273px]
        bg-[#ECECEC]
        rounded-x0
        p-6
        cursor-pointer
        transition-all
        duration-300
        ease-out
        overflow-hidden
        hover:h-[473px]
        hover:bg-[#0077CC]
        flex
        flex-col
      "
    >
    {/* Ícone (normal + hover) */}
    <div className="w-[40px] h-[40px] relative z-10">
  <Image
    src={icon}
    alt={title}
    width={40}
    height={40}
    className="absolute top-0 left-0 opacity-100 group-hover:opacity-0 transition-opacity duration-200"
  />

  <Image
    src={iconHover}
    alt={title}
    width={40}
    height={40}
    className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
  />
    </div>
    {/* Espaço entre ícone e título (somente sem hover) */}
    <div className="mt-[50px] group-hover:hidden"></div>


      {/* ESPEÇAMENTO 52px */}
      <div className="mt-[52px]"></div>

      {/* Saiba mais – só aparece no hover */}
      <p
        className="
          text-[18px]
          font-light
          text-black
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-300
          group-hover:text-white
        "
      >
        Saiba mais →
      </p>

      {/* ESPAÇAMENTO 52px */}
      <div className="mt-[52px]"></div>

      {/* Título */}
   <h3
  className="
    text-[30px]
    font-bold
    text-black
    group-hover:text-white
    transition-colors
  "
>
  {title}

    </h3>

      {/* Espaçamento 13px */}
      <div className="mt-[13px]"></div>

      {/* Texto extra */}
      <p
        className="
          text-[20px]
          font-light
          text-white
          opacity-0
          transition-all
          duration-300
          group-hover:opacity-100
          max-w-[90%]
        "
      >
        {description}
      </p>
    </div>
  );
}

// LISTA ----------------------------------------------------
export default function Pillars() {
  return (
    <section className="w-full bg-[#191F37] flex justify-center py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        <PillarCard
          title="Conceber"
          description="Levantamento de requisitos, modelagem e simulação para validar ideias antes de construir."
          icon="/icons/icon_conceber.svg"
          iconHover="/icons/icon_conceber_hover.svg"
        />

        <PillarCard
          title="Construir"
          description="Fabricação do protótipo usando impressão 3D, usinagem, corte a laser e processos complementares."
          icon="/icons/icon_construir.svg"
          iconHover="/icons/icon_construir_hover.svg"
        />

        <PillarCard
          title="Integrar"
          description="União de eletrônica, óptica, sensores e software para transformar peças em sistema funcional."
          icon="/icons/icon_integrar.svg"
          iconHover="/icons/icon_integrar_hover.svg"
        />

        <PillarCard
          title="Avaliar"
          description="Caracterização, metrologia e testes que confirmam desempenho."
          icon="/icons/icon_avaliar.svg"
          iconHover="/icons/icon_avaliar_hover.svg"
        />

      </div>
    </section>
  );
}
