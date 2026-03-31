"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      label: "Sobre nós",
      href: "/sobre",
      submenu: [
        { label: "Portfólio", href: "/sobre/portfolio" },
        { label: "Nosso espaço", href: "/sobre/nosso-espaco" },
        { label: "Jornada Maker", href: "/sobre/jornada-maker" },
        // { label: "Políticas de uso", href: "#" },
        // { label: "Rede FabLab", href: "#" }
      ]
    },
    {
      label: "Conceber",
      href: "/conceber",
      submenu: [
        { label: "Simuladores multifísicos", href: "/conceber/simuladores" },
        { label: "Treinamentos", href: "#" },
        // { label: "Contratação de Serviços", href: "#" }
      ]
    },
    {
      label: "Construir",
      href: "/construir",
      submenu: [
        { label: "Equipamentos", href: "/construir/equipamentos" },
        // { label: "Processos", href: "#" },
        { label: "Treinamentos", href: "/construir/treinamentos" },
        // { label: "Contratação de serviço", href: "#" }
      ]
    },
    {
      label: "Integrar",
      href: "/integrar",
      submenu: [
        // { label: "Contratação de serviço", href: "#" }
      ]
    },
    {
      label: "Avaliar",
      href: "/avaliar",
    },
    {
      label: "Laboratórios",
      href: "/laboratorios",
      submenu: [
        { label: "Laboratórios de apoio", href: "/laboratorios/laboratorios-apoio" },
        { label: "Laboratórios parceiros", href: "/avaliar/laboratorios-parceiros" },
      ]
    }
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <header className="max-w-[1355px] mx-auto flex items-center justify-between mt-6 px-6">
        
        {/* LOGO */}
        <a href="/" className="flex items-center p-3 rounded-xl bg-white/20 backdrop-blur-md shadow-sm border border-white/30 transition hover:bg-white/40">
          <img src="/logo.svg" alt="Logo InPETU" className="h-10 w-auto cursor-pointer" />
        </a>

        {/* MENU DESKTOP */}
        <nav className="hidden lg:flex h-[60px] bg-[#E9D354] rounded-[13px] items-center gap-4 px-10 shadow-lg relative">
          {menuItems.map((item, index) => (
            <div key={index} className="group relative h-full flex items-center">
              <a href={item.href} className="text-black font-semibold hover:opacity-70 h-full flex items-center px-2">
                {item.label}
              </a>
              {/* Ajuste no Submenu Desktop */}
              <div className="absolute top-[60px] left-[-15px] min-w-[220px] bg-[#EEE39E] rounded-b-[13px] flex-col pt-4 pb-6 px-6 shadow-xl hidden group-hover:flex z-50">
                <ul className="flex flex-col gap-4 text-[14px] text-black">
                  {item.submenu?.map((sub, subIdx) => (
                    <li key={subIdx}>
                      <a href={sub.href} className="hover:font-bold whitespace-nowrap block">
                        {sub.label}  
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <a href="/auth" className="bg-white text-black font-bold px-8 py-1 rounded-[10px] hover:bg-gray-100 transition shadow-sm ml-4">
            Login
          </a>
        </nav>

        {/* BOTÃO HAMBÚRGUER */}
        <button 
          className="lg:hidden p-3 bg-[#E9D354] rounded-xl shadow-lg text-black z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* MENU MOBILE LATERAL */}
      <div className={`fixed top-0 right-0 h-full w-[300px] bg-[#E9D354] z-40 shadow-2xl transition-transform duration-300 ease-in-out transform rounded-l-[30px] p-8 flex flex-col gap-8 lg:hidden overflow-y-auto ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* LOGIN */}
        <div className="mt-16">
          <a href="/auth" onClick={closeMenu} className="block w-full bg-white text-black text-center font-bold py-4 rounded-2xl shadow-md hover:bg-gray-100 transition">
            Login
          </a>
        </div>

        {/* LINKS DO MENU MOBILE */}
        <div className="flex flex-col gap-8">
          {menuItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-3">
              <a 
                href={item.href} 
                onClick={closeMenu}
                className="font-bold text-lg text-[#191F37] border-b border-black/10 pb-1 hover:opacity-60 transition-opacity"
              >
                {item.label}
              </a>
              <ul className="flex flex-col gap-3 pl-2">
                {item.submenu?.map((sub, sIdx) => (
                  <li key={sIdx}>
                    <a 
                      href={sub.href} 
                      onClick={closeMenu}
                      className="text-black/70 text-sm hover:text-black hover:font-medium transition"
                    >
                      {sub.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;