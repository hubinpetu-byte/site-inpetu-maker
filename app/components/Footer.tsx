import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#E9D354] py-12 px-6 mt-auto">
      <div className="max-w-[1355px] mx-auto">
        
        {/* Parte Superior: Logos à Esquerda e Links à Direita */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-10">
          
          {/* Coluna de Logos (Esquerda) */}
          <div className="flex flex-col gap-6 mb-8 md:mb-0">
            <img src="/logo.svg" alt="InPETU Maker" className="h-14 w-fit" />
        
          </div>

          {/* Colunas de Links (Mais à Direita e com fonte menor) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-[14px]">
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-[#191F37] uppercase">Info</h4>
              <nav className="flex flex-col gap-1 text-[#191F37]/80">
                <a href="/sobre" className="hover:underline">Sobre</a>
                <a href="#">Princípios</a>
                <a href="#">Parceiros</a>
                <a href="#">Notícias e eventos</a>
              </nav>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-[#191F37] uppercase">Serviços</h4>
              <nav className="flex flex-col gap-1 text-[#191F37]/80">
                <a href="/servicos/uso-livre">Uso livre</a>
                <a href="#">Prototipagem sob demanda</a>
                <a href="#">Workshop</a>
              </nav>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-[#191F37] uppercase">Contato</h4>
              <nav className="flex flex-col gap-1 text-[#191F37]/80">
                <a href="/contato">Formulário de contato</a>
                <a href="https://www.google.com/maps?ll=-27.430725,-48.442898&z=16&t=m&hl=pt-BR&gl=BR&mapclient=embed&cid=14830641887610885303">Localização</a>
              </nav>
            </div>
          </div>
        </div>

        {/* LINHA DIVISÓRIA */}
        <div className="w-full h-[2px] bg-[#191F37]/20 my-6"></div>

        {/* Parte Inferior: Redes Sociais */}
        <div className="flex justify-end gap-4">
          <div className="w-9 h-9 bg-[#191F37] rounded-full flex items-center justify-center text-white text-[12px] cursor-pointer hover:opacity-80">IG</div>
          <div className="w-9 h-9 bg-[#191F37] rounded-full flex items-center justify-center text-white text-[12px] cursor-pointer hover:opacity-80">YT</div>
          <div className="w-9 h-9 bg-[#191F37] rounded-full flex items-center justify-center text-white text-[12px] cursor-pointer hover:opacity-80">IN</div>
        </div>
        
        <div className="flex justify-initial gap-4 pt-0">
            <a href="http://www.finep.gov.br/" target="_blank" rel="noopener noreferrer">
              <img src="/Finep.png" alt="Finep" className="h-18 w-fit" />
            </a> </div>
      </div>
    </footer>
  );
};

export default Footer;