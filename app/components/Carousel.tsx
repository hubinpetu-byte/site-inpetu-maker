"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Carousel() {
  const slides = [
    {
      id: 1,
      tag: "Sobre nós",
      title: "Projeto realizado com apoio financeiro da FINEP e do Ministério da Ciência, Tecnologia e Inovações (MCTI)",
      img: "/Banner Finep e mcti.png",
      link: "/sobre"
    },
    {
      id: 2,
      tag: "Sobre nós",
      title: "Conheça nosso espaço e fique por dentro de todas as novidades!",
      img: "/BANNER_Conheça nosso espaço.png",
      link: "/sobre/nosso-espaco"
    }
  ];

  return (
    <div className="relative w-full h-screen">
      {/* Estilo dos pontinhos amarelos (bullets) */}
      <style jsx global>{`
        .swiper-pagination {
          text-align: left !important;
          padding-left: 3rem !important;
          bottom: 40px !important;
        }
        .swiper-pagination-bullet {
          background: #E9D354 !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Imagem de Fundo */}
              <img src={slide.img} className="w-full h-full object-cover" alt="Slide" />
              
              {/* Overlay Escuro para dar contraste ao texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#191F37]/100 via-[#191F37]/20 to-transparent" />

              {/* CONTEÚDO: Inferior Esquerdo */}
              <div className="absolute inset-0 flex flex-col justify-end items-start p-12 md:p-24 pb-32">
                
                {/* Tag com contorno branco */}
                <span className="px-6 py-1 border border-white text-white text-[14px] font-medium uppercase tracking-[0.2em] mb-6 rounded-full bg-white/10 backdrop-blur-sm">
                  {slide.tag}
                </span>

                {/* Título: Agora com max-w-7xl (muito largo) e tracking-tight (letras mais juntas) */}
                <h1 className="text-white text-[32px] md:text-[52px] font-extrabold max-w-7xl leading-[1.1] tracking-tight mb-8 drop-shadow-2xl">
                  {slide.title}
                </h1>

                {/* Botão invisível ou área clicável (opcional: se quiser que o slide todo leve ao link) */}
                <a href={slide.link} className="text-[#E9D354] font-bold flex items-center gap-2 hover:underline">
                  Saiba mais <span>→</span>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}