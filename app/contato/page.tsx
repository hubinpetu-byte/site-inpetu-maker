"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContatoPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.currentTarget);
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxJvPh5LbYNWx-6OpGNElPCxkdr7zmPljcDzaveoWuIG-oHqjCFC0gZ3Hdsr0yVng5P/exec";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors"
      });

      setStatus("success");
      (event.target as HTMLFormElement).reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <main className="w-full bg-[#f4f4f4] pt-[100px] pb-20 px-6 min-h-screen font-sans">
      <div className="max-w-[1355px] mx-auto">
        
        {/* CABEÇALHO */}
        <div className="flex flex-col mb-16">
          <div className="w-20 h-[3px] bg-[#E9D354] mb-4"></div>
          <h1 className="text-[#0077cc] text-[48px] font-black leading-tight">
            Contato
          </h1>
          <p className="text-[#333333] text-[18px] max-w-xl">
            Dúvidas, sugestões ou orçamentos? Nossa equipe está pronta para atender você.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LADO ESQUERDO: INFORMAÇÕES E MAPA */}
          <div className="space-y-8">
            <div className="bg-white p-10 rounded-[35px] shadow-sm border-l-[10px] border-[#0077cc]">
              <h2 className="text-[#191F37] text-[26px] font-black mb-8">Informações</h2>
              
              <div className="space-y-8">
                <div className="flex items-center gap-5 text-[#333333]">
                  <div className="w-14 h-14 bg-[#f0f7ff] rounded-full flex items-center justify-center text-[#0077cc] shrink-0">
                    <Mail size={28} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">E-mail</span>
                    <span className="font-bold text-lg">contato@inpetu.com.br</span>
                  </div>
                </div>

                <div className="flex items-center gap-5 text-[#333333]">
                  <div className="w-14 h-14 bg-[#f0f7ff] rounded-full flex items-center justify-center text-[#0077cc] shrink-0">
                    <Phone size={28} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Telefone</span>
                    <span className="font-bold text-lg">+55 (48) 3239-2030</span>
                  </div>
                </div>

                <div className="flex items-center gap-5 text-[#333333]">
                  <div className="w-14 h-14 bg-[#f0f7ff] rounded-full flex items-center justify-center text-[#0077cc] shrink-0">
                    <MapPin size={28} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Localização</span>
                    <span className="font-bold text-base leading-tight">Av. Luiz Boiteux Piazza, 1302 - Canasvieiras, Florianópolis - SC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MAPA REAL CORRIGIDO - SEM DUPLICIDADE DE ATRIBUTOS */}
            <div className="w-full h-[400px] bg-white rounded-[35px] border-4 border-white shadow-md overflow-hidden relative group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.354670275811!2d-48.44856012411684!3d-27.458213815809756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9527415f95412795%3A0x6315801380631580!2sInPETU%20Hub!5e0!3m2!1spt-BR!2sbr!4v1712415123456!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen // <--- AQUI: Certifique-se que o S está maiúsculo
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
            ></iframe>
            </div>
          </div>

          {/* LADO DIREITO: FORMULÁRIO */}
          <div className="bg-[#191F37] p-10 md:p-14 rounded-[45px] shadow-2xl">
            <h3 className="text-white text-[32px] font-black mb-2">Envie uma mensagem</h3>
            <p className="text-white/50 mb-10 text-sm">Campos com * são obrigatórios</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-white/70 text-xs mb-2 block font-bold">Nome completo *</label>
                  <input type="text" name="name" required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white outline-none focus:border-[#0077cc] transition-all" placeholder="Seu nome" />
                </div>
                <div>
                  <label className="text-white/70 text-xs mb-2 block font-bold">E-mail *</label>
                  <input type="email" name="email" required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white outline-none focus:border-[#0077cc] transition-all" placeholder="exemplo@email.com" />
                </div>
              </div>

              <div>
                <label className="text-white/70 text-xs mb-2 block font-bold">Assunto</label>
                <select name="subject" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white outline-none focus:border-[#0077cc] transition-all appearance-none cursor-pointer">
                  <option className="text-black" value="Geral">Dúvida geral</option>
                  <option className="text-black" value="Orcamento">Orçamento</option>
                  <option className="text-black" value="Visita">Agendar Visita</option>
                  <option className="text-black" value="Parceria">Parcerias</option>
                </select>
              </div>

              <div>
                <label className="text-white/70 text-xs mb-2 block font-bold">Mensagem *</label>
                <textarea name="message" required rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white outline-none focus:border-[#0077cc] transition-all resize-none" placeholder="Como podemos ajudar?" />
              </div>

              <button 
                type="submit" 
                disabled={status === "sending" || status === "success"}
                className={`w-full font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl ${status === "success" ? "bg-green-500 text-white" : "bg-[#0077cc] text-white hover:bg-[#005fa3] disabled:opacity-50"}`}
              >
                {status === "idle" && <><Send size={20} /> Enviar agora</>}
                {status === "sending" && "Processando..."}
                {status === "success" && <><CheckCircle2 size={22} /> Enviado!</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}