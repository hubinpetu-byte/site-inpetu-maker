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
    <main className="w-full bg-[#FAFAFA] pt-32 pb-24 px-6 min-h-screen font-sans text-[#191F37]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* GRID PRINCIPAL CONFIGURADO PARA IGUALAR A ALTURA AUTOMATICAMENTE (items-stretch) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          
          {/* LADO ESQUERDO: TEXTOS, INFOS E MAPA (6 colunas) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
            
            {/* Bloco Superior: Cabeçalho e Dados */}
            <div className="space-y-8">
              <div>
                <div className="w-12 h-[3px] bg-[#E9D354] mb-4"></div>
                <h1 className="text-[#0077cc] text-[48px] font-black tracking-tight leading-none mb-4">
                  Contato
                </h1>
                <p className="text-gray-500 text-base font-medium leading-relaxed">
                  Dúvidas, sugestões ou orçamentos? Nossa equipe especializada está pronta para atender sua demanda.
                </p>
              </div>

              {/* Lista limpa de informações */}
              <div className="space-y-6 pt-6 border-t border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0077cc] flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-black tracking-widest text-gray-400 mb-0.5">E-mail</span>
                    <a href="mailto:contato@inpetu.com.br" className="font-bold text-base hover:text-[#0077cc] transition-colors">contato@inpetu.com.br</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0077cc] flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-black tracking-widest text-gray-400 mb-0.5">Telefone</span>
                    <span className="font-bold text-base">+55 (48) 3239-2030</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0077cc] flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-black tracking-widest text-gray-400 mb-0.5">Localização</span>
                    <span className="font-bold text-sm text-gray-700 leading-relaxed block">
                      Av. Luiz Boiteux Piazza, 1302 <br /> Canasvieiras, Florianópolis - SC
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* MAPA PREENCHENDO O ESPAÇO RESTANTE ATÉ A BASE EM ACORDO COM O FORMULÁRIO */}
            <div className="flex-1 w-full min-h-[240px] bg-gray-100 rounded-3xl overflow-hidden shadow-sm border border-gray-100 relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.3228308873094!2d-48.498877523733074!3d-27.428059915570024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x952743906325be1b%3A0xcb1b5906ef45f22e!2sAv.%20Luiz%20Boiteux%20Piazza%2C%201302%20-%20Canasvieiras%2C%20Florian%C3%B3polis%20-%20SC%2C%2088056-000!5e0!3m2!1spt-BR!2sbr!4v1715712345678!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
              />
            </div>
          </div>

          {/* LADO DIREITO: FORMULÁRIO (7 colunas) configurado com h-full e flex-col */}
          <div className="lg:col-span-7 bg-white p-10 md:p-12 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-[#191F37] text-2xl font-black mb-1">Envie uma mensagem</h3>
              <p className="text-gray-400 text-xs mb-8">Campos marcados com * são obrigatórios</p>
              
              <form onSubmit={handleSubmit} className="space-y-6 flex flex-col justify-between">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[#191F37] text-xs mb-1.5 block font-black uppercase tracking-wider opacity-60">Nome completo *</label>
                    <input type="text" name="name" required className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl py-3.5 px-4 text-[#191F37] outline-none focus:border-[#0077cc] focus:bg-white transition-all text-sm" placeholder="Seu nome" />
                  </div>
                  <div>
                    <label className="text-[#191F37] text-xs mb-1.5 block font-black uppercase tracking-wider opacity-60">E-mail *</label>
                    <input type="email" name="email" required className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl py-3.5 px-4 text-[#191F37] outline-none focus:border-[#0077cc] focus:bg-white transition-all text-sm" placeholder="exemplo@email.com" />
                  </div>
                </div>

                <div>
                  <label className="text-[#191F37] text-xs mb-1.5 block font-black uppercase tracking-wider opacity-60">Assunto</label>
                  <div className="relative">
                    <select name="subject" className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl py-3.5 px-4 text-[#191F37] outline-none focus:border-[#0077cc] focus:bg-white transition-all text-sm appearance-none cursor-pointer font-medium">
                      <option value="Geral">Dúvida geral</option>
                      <option value="Orcamento">Orçamento</option>
                      <option value="Visita">Agendar Visita</option>
                      <option value="Parceria">Parcerias</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                      <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[#191F37] text-xs mb-1.5 block font-black uppercase tracking-wider opacity-60">Mensagem *</label>
                  <textarea name="message" required rows={5} className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl py-3.5 px-4 text-[#191F37] outline-none focus:border-[#0077cc] focus:bg-white transition-all text-sm resize-none" placeholder="Como podemos ajudar?" />
                </div>

                <button 
                  type="submit" 
                  disabled={status === "sending" || status === "success"}
                  className={`w-full font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all uppercase text-xs tracking-widest mt-4 ${
                    status === "success" 
                      ? "bg-green-600 text-white" 
                      : "bg-[#0077cc] text-white hover:bg-[#005fa3] active:scale-[0.99] disabled:opacity-50 shadow-md shadow-blue-500/10"
                  }`}
                >
                  {status === "idle" && <><Send size={14} /> Enviar mensagem</>}
                  {status === "sending" && "Processando..."}
                  {status === "success" && <><CheckCircle2 size={16} /> Mensagem enviada!</>}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}