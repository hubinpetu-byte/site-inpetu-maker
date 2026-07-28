"use client";
import React, { useState } from "react";
import { Menu, X, User, CalendarDays } from "lucide-react";
import { useAuth, AuthProvider } from "../../contexts/AuthContext";

// 🌟 DEFINIÇÃO DE INTERFACE: Resolve o erro de propriedade "does not exist on type 'never'"
interface PerfilUsuario {
  nome?: string;
  fotoUrl?: string;
  email?: string;
  role?: string;
}

const NavbarContent = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Forçamos a tipagem do useAuth para garantir que o compilador reconheça as propriedades
  const { user, perfil } = useAuth() as { user: any; perfil: PerfilUsuario | null };

  const menuItems = [
    {
      label: "Sobre nós",
      href: "/sobre",
      submenu: [
        { label: "Portfólio", href: "/sobre/portfolio" },
        { label: "Nosso espaço", href: "/sobre/nosso-espaco" },
        { label: "Jornada Maker", href: "/sobre/jornada-maker" },
        { label: "Agenda", href: "/sobre/agenda" },
      ]
    },
    {
      label: "Conceber",
      href: "/conceber",
      submenu: [
        { label: "Simuladores multifísicos", href: "/conceber/simuladores" },
        { label: "Treinamentos", href: "#" },
      ]
    },
    {
      label: "Construir",
      href: "/construir",
      submenu: [
        { label: "Equipamentos", href: "/construir/equipamentos" },
        { label: "Treinamentos", href: "/construir/treinamentos" },
      ]
    },
    {
      label: "Integrar",
      href: "/integrar",
      submenu: []
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
              {/* Submenu Desktop */}
              {item.submenu && item.submenu.length > 0 && (
                <div className="absolute top-[60px] left-[-15px] min-w-[220px] bg-[#EEE39E] rounded-b-[13px] flex-col pt-4 pb-6 px-6 shadow-xl hidden group-hover:flex z-50">
                  <ul className="flex flex-col gap-4 text-[14px] text-black">
                    {item.submenu.map((sub, subIdx) => (
                      <li key={subIdx}>
                        <a href={sub.href} className="hover:font-bold whitespace-nowrap block">
                          {sub.label}  
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {/* 🌟 PERFIL COM DROPDOWN NO HOVER (Desktop) */}
          {user && perfil ? (
            <div className="relative group h-full flex items-center ml-4">
              {/* Bolinha do Avatar */}
              <div className="w-10 h-10 rounded-full bg-[#0077cc] text-white font-semibold flex items-center justify-center shadow-inner cursor-pointer transition transform group-hover:scale-105 border-2 border-transparent group-hover:border-white/50 overflow-hidden">
                {perfil.fotoUrl ? (
                  <img src={perfil.fotoUrl} alt="Perfil" className="w-full h-full object-cover" />
                ) : (
                  <span>{perfil.nome ? perfil.nome.charAt(0).toUpperCase() : "J"}</span>
                )}
              </div>

              {/* MENU SUSPENSO */}
              <div className="absolute top-[60px] right-[-10px] w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 hidden group-hover:block overflow-hidden z-[60]">
                <div className="p-2 flex flex-col">
                  <a href="/perfil" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#0077cc] transition-colors rounded-xl">
                    <User size={18} /> Meu perfil
                  </a>
                  <a href="/atendimento" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#0077cc] transition-colors rounded-xl border-t border-slate-50">
                    <CalendarDays size={18} /> Agendar atendimento
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <a href="/auth" className="bg-white text-black font-bold px-8 py-1 rounded-[10px] hover:bg-gray-100 transition shadow-sm ml-4">
              Login
            </a>
          )}
        </nav>

        {/* BOTÃO MOBILE */}
        <button 
          className="lg:hidden p-3 bg-[#E9D354] rounded-xl shadow-lg text-black z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* OVERLAY MOBILE */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden" onClick={closeMenu} />
      )}

      {/* MENU MOBILE LATERAL */}
      <div className={`fixed top-0 right-0 h-full w-[300px] bg-[#E9D354] z-40 shadow-2xl transition-transform duration-300 ease-in-out transform rounded-l-[30px] p-8 flex flex-col gap-8 lg:hidden overflow-y-auto ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* PERFIL MOBILE */}
        <div className="mt-16">
          {user && perfil ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 w-full bg-white text-black p-3 rounded-2xl shadow-md">
                <div className="w-10 h-10 rounded-full bg-[#0077cc] text-white font-black flex items-center justify-center shrink-0 overflow-hidden">
                  {perfil.fotoUrl ? (
                    <img src={perfil.fotoUrl} alt="Perfil" className="w-full h-full object-cover" />
                  ) : (
                    <span>{perfil.nome ? perfil.nome.charAt(0).toUpperCase() : "J"}</span>
                  )}
                </div>
                <div className="text-left overflow-hidden">
                  <p className="font-bold text-sm truncate text-slate-800">{perfil.nome || "Usuário"}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <a href="/perfil" onClick={closeMenu} className="bg-white/40 text-slate-900 px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-2">
                  <User size={16} /> Meu perfil
                </a>
                <a href="/atendimento" onClick={closeMenu} className="bg-white/40 text-slate-900 px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-2">
                  <CalendarDays size={16} /> Agendar atendimento
                </a>
              </div>
            </div>
          ) : (
            <a href="/auth" onClick={closeMenu} className="block w-full bg-white text-black text-center font-bold py-4 rounded-2xl shadow-md">
              Login
            </a>
          )}
        </div>

        {/* LINKS MOBILE */}
        <div className="flex flex-col gap-8">
          {menuItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-3">
              <a href={item.href} onClick={closeMenu} className="font-bold text-lg text-[#191F37] border-b border-black/10 pb-1">
                {item.label}
              </a>
              <ul className="flex flex-col gap-3 pl-2">
                {item.submenu?.map((sub, sIdx) => (
                  <li key={sIdx}><a href={sub.href} onClick={closeMenu} className="text-black/70 text-sm">{sub.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Navbar() {
  return (
    <AuthProvider>
      <NavbarContent />
    </AuthProvider>
  );
}