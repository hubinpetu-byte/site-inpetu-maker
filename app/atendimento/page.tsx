"use client";

import React, { useState, useEffect } from 'react';
import { Upload, ChevronDown, Calendar as CalendarIcon, Clock, ArrowLeft, Mail, Send } from 'lucide-react';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, getDocs, addDoc, updateDoc, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

// 🚀 IMPORTAÇÃO DA BIBLIOTECA EMAILJS
import emailjs from '@emailjs/browser';

// Banco de dados de orientadores (com os e-mails reais de destino)
const BANCO_MAKERS = [
  { 
    id: "l0yUjLN8KxgIQi6zDHdyVLfbxVA3", 
    nome: "Julia Hanna Okada", 
    email: "julia.okada@gmail.com",
    area: "Impressao3D", 
    especialidade: "Modelagem e Impressão 3D, Corte e Gravação a Laser", 
    avatar: "/makers/julia.png" 
  },
  { 
    id: "ABtlfTNuiRgGhnmo5r26rNKJDKJ2", 
    nome: "Davi Goulart", 
    email: "davi.martins@labmetro.ufsc.br",
    area: "Marcenaria", 
    especialidade: "Marcenaria, Acabamento", 
    avatar: "/makers/davi.png" 
  },
  { 
    id: "m5", 
    nome: "Felipe Ebersbach", 
    email: "felipe.ebersbach@gmail.com",
    area: "Mecanica", 
    especialidade: "Mecânica, Usinagem", 
    avatar: "/makers/felipe.png" 
  }
];

export default function PaginaAtendimentoCompleta() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [etapaAtual, setEtapaAtual] = useState(1);

  // Perfil do Aluno
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');

  // Formulário Etapa 1
  const [etapaProjeto, setEtapaProjeto] = useState('');
  const [areaAjuda, setAreaAjuda] = useState('');
  const [resumoDuvida, setResumoDuvida] = useState('');

  // Formulário Etapa 2
  const [makerSelecionado, setMakerSelecionado] = useState<any>(null);
  const [todasDisponibilidades, setTodasDisponibilidades] = useState<any[]>([]);
  const [datasDisponiveisDoMaker, setDatasDisponiveisDoMaker] = useState<string[]>([]);
  const [horariosFiltrados, setHorariosFiltrados] = useState<any[]>([]);
  
  const [dataAtendimento, setDataAtendimento] = useState('');
  const [slotIdSelecionado, setSlotIdSelecionado] = useState('');
  const [horaAtendimento, setHoraAtendimento] = useState('');

  // Estado para mensagem de contato direto por e-mail
  const [mensagemDireta, setMensagemDireta] = useState('');
  const [modoContatoDireto, setModoContatoDireto] = useState(false);

  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

  const makersFiltrados = BANCO_MAKERS.filter(m => m.area === areaAjuda);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const docRef = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            const dados = snap.data();
            setNomeUsuario(dados.nome || '');
            setEmailUsuario(dados.email || '');
          }
        } catch (error) {
          console.error("Erro ao carregar dados do usuário:", error);
        }
      } else {
        router.push("/auth");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  // Busca disponibilidade no banco e filtra o passado
  const buscarGradeDisponivelDoBanco = async (makerId: string) => {
    try {
      const q = query(
        collection(db, "disponibilidade_maker"),
        where("maker_id", "==", makerId),
        where("status", "==", "disponivel")
      );
      const snap = await getDocs(q);
      const dados: any[] = [];
      snap.forEach(d => dados.push({ id: d.id, ...d.data() }));
      
      setTodasDisponibilidades(dados);

      const hojeStr = new Date().toISOString().split('T')[0];
      const datasFuturas = Array.from(new Set(dados.map(item => item.data)))
        .filter(data => data >= hojeStr)
        .sort();

      setDatasDisponiveisDoMaker(datasFuturas);
      
      // Reseta seleções
      setDataAtendimento('');
      setHorariosFiltrados([]);
      setHoraAtendimento('');
      setSlotIdSelecionado('');
      setModoContatoDireto(false);
    } catch (err) {
      console.error("Erro ao ler agenda:", err);
    }
  };

  useEffect(() => {
    if (makerSelecionado) {
      buscarGradeDisponivelDoBanco(makerSelecionado.id);
    }
  }, [makerSelecionado]);

  const handleMudarData = (dataEscolhida: string) => {
    setDataAtendimento(dataEscolhida);
    setHoraAtendimento('');
    setSlotIdSelecionado('');

    const hojeStr = new Date().toISOString().split('T')[0];
    const horaAtual = new Date().getHours();

    const slotsDoDia = todasDisponibilidades.filter(item => {
      if (item.data !== dataEscolhida) return false;
      if (dataEscolhida === hojeStr) {
        const horaSlot = parseInt(item.horario.split(':')[0]);
        return horaSlot > horaAtual;
      }
      return true;
    });

    setHorariosFiltrados(slotsDoDia);
    
    if (slotsDoDia.length > 0) {
      setHoraAtendimento(slotsDoDia[0].horario);
      setSlotIdSelecionado(slotsDoDia[0].id);
    }
  };

  const handleMudarHorario = (horarioTexto: string) => {
    setHoraAtendimento(horarioTexto);
    const correspondente = horariosFiltrados.find(h => h.horario === horarioTexto);
    if (correspondente) {
      setSlotIdSelecionado(correspondente.id);
    }
  };

  const handleAvancarTriagem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!etapaProjeto || !areaAjuda || !resumoDuvida.trim()) {
      setMensagem({ tipo: 'erro', texto: 'Preencha todos os campos antes de continuar.' });
      return;
    }
    setMensagem({ tipo: '', texto: '' });
    setEtapaAtual(2);
  };

  // Agendamento Padrão
  const handleFinalizarAgendamento = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!makerSelecionado || !slotIdSelecionado) return;

    try {
      if (auth.currentUser) {
        await addDoc(collection(db, "atendimentos_maker"), {
          uidUsuario: auth.currentUser.uid,
          usuario_nome: nomeUsuario,
          usuario_email: emailUsuario,
          etapa_projeto: etapaProjeto,
          area_ajuda: areaAjuda,
          resumo_duvida: resumoDuvida,
          maker_id: makerSelecionado.id,
          maker_nome: makerSelecionado.nome,
          data_atendimento: dataAtendimento,
          horario_atendimento: horaAtendimento,
          data_solicitacao: new Date().toISOString(),
          status: "Agendado"
        });

        await updateDoc(doc(db, "disponibilidade_maker", slotIdSelecionado), { status: "ocupado" });

        setMensagem({ tipo: 'sucesso', texto: `Suporte agendado com sucesso com ${makerSelecionado.nome}!` });
        
        setTimeout(() => {
          setEtapaAtual(1);
          setResumoDuvida('');
          setMakerSelecionado(null);
        }, 2000);
      }
    } catch (err) {
      setMensagem({ tipo: 'erro', texto: 'Falha ao salvar o agendamento.' });
    }
  };

  // 🚀 ENVIO REAL DE MENSAGEM DIRETA AO ORIENTADOR VIA EMAILJS
  const handleEnviarMensagemDireta = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mensagemDireta.trim()) {
      setMensagem({ tipo: 'erro', texto: 'Digite sua mensagem para o orientador.' });
      return;
    }

    try {
      // 1. Salva no banco de dados Firestore
      await addDoc(collection(db, "mensagens_contato"), {
        aluno_nome: nomeUsuario,
        aluno_email: emailUsuario,
        maker_id: makerSelecionado.id,
        maker_nome: makerSelecionado.nome,
        maker_email: makerSelecionado.email || 'contato@inpetu.com.br',
        etapa_projeto: etapaProjeto,
        area_ajuda: areaAjuda,
        duvida_original: resumoDuvida,
        mensagem_extra: mensagemDireta,
        data_envio: new Date().toISOString(),
        status: "Pendente"
      });

      // 2. 🚀 DISPARO REAL DO E-MAIL PARA O MAKER VIA EMAILJS
      const SERVICE_ID = "service_0pxaseu"; 
      const TEMPLATE_ID = "template_jpljiqu"; // Ou crie um template novo no EmailJS
      const PUBLIC_KEY = "-LmJRne5SRUDm0HqL"; 

      const parametrosEmail = {
        nome_maker: makerSelecionado.nome,
        email_maker: makerSelecionado.email, // 👈 E-mail do orientador selecionado
        nome_aluno: nomeUsuario || "Estudante Maker",
        email_aluno: emailUsuario,
        etapa_projeto: etapaProjeto,
        area_ajuda: areaAjuda,
        duvida_original: resumoDuvida,
        mensagem_extra: mensagemDireta
      };

      console.log("🚀 Enviando mensagem direta via EmailJS...", parametrosEmail);

      const resposta = await emailjs.send(SERVICE_ID, TEMPLATE_ID, parametrosEmail, PUBLIC_KEY);
      console.log("✅ E-mail enviado ao orientador:", resposta);

      setMensagem({ 
        tipo: 'sucesso', 
        texto: `Mensagem enviada COM SUCESSO para ${makerSelecionado.nome} (${makerSelecionado.email})! O orientador responderá em breve no seu e-mail.` 
      });

      setTimeout(() => {
        setEtapaAtual(1);
        setMensagemDireta('');
        setMakerSelecionado(null);
        setModoContatoDireto(false);
      }, 3000);

    } catch (err: any) {
      console.error("Erro ao enviar mensagem ou e-mail:", err);
      setMensagem({ 
        tipo: 'erro', 
        texto: `Falha no envio do e-mail: ${err?.text || err?.message || "Tente novamente."}` 
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0077cc]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <main className="w-full bg-[#0077cc] min-h-screen flex items-center justify-center pt-24 pb-16 px-6 font-sans">
      <div className="w-full max-w-[680px] bg-white rounded-[32px] p-10 md:p-12 shadow-xl transition-all duration-300">
        
        {/* ETAPA 1: TRIAGEM */}
        {etapaAtual === 1 && (
          <>
            <h1 className="text-[#191F37] text-[32px] font-black tracking-tight mb-8 text-left">Atendimento</h1>
            <form onSubmit={handleAvancarTriagem} className="space-y-5">
              <div className="relative">
                <select value={etapaProjeto} onChange={(e) => setEtapaProjeto(e.target.value)} required className="w-full bg-white border border-gray-300 rounded-lg py-3.5 px-4 text-gray-700 outline-none focus:border-[#0077cc] appearance-none text-sm font-medium">
                  <option value="" disabled hidden>Etapa do projeto</option>
                  <option value="Conceber">Conceber</option>
                  <option value="Construir">Construir</option>
                  <option value="Integrar">Integrar</option>
                  <option value="Avaliar">Avaliar</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400"><ChevronDown size={18} /></div>
              </div>

              <div className="relative">
                <select value={areaAjuda} onChange={(e) => setAreaAjuda(e.target.value)} required className="w-full bg-white border border-gray-300 rounded-lg py-3.5 px-4 text-gray-700 outline-none focus:border-[#0077cc] appearance-none text-sm font-medium">
                  <option value="" disabled hidden>Área</option>
                  <option value="Eletronica">Eletrônica & Hardware</option>
                  <option value="Impressao3D">Impressão 3D & Modelagem</option>
                  <option value="Software">Software & IoT</option>
                  <option value="Mecanica">Mecânica & Estrutura</option>
                  <option value="Marcenaria">Marcenaria</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400"><ChevronDown size={18} /></div>
              </div>

              <div>
                <textarea value={resumoDuvida} onChange={(e) => setResumoDuvida(e.target.value)} required rows={5} placeholder="Resumo da sua dúvida" className="w-full bg-white border border-gray-300 rounded-lg py-3.5 px-4 text-gray-700 outline-none focus:border-[#0077cc] resize-none text-sm font-medium placeholder-gray-400 leading-relaxed" />
              </div>

              <div className="w-full border border-gray-300 rounded-lg py-3.5 px-4 flex items-center justify-between text-gray-400 text-sm font-medium bg-white cursor-pointer">
                <span>Anexos</span>
                <Upload size={18} className="text-gray-500" />
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-[#0077cc] hover:bg-[#0066b3] text-white font-bold py-4 rounded-xl text-sm transition-all shadow-md cursor-pointer">
                  Escolher maker
                </button>
              </div>
            </form>
          </>
        )}

        {/* ETAPA 2: ESCOLHA DO ORIENTADOR E HORÁRIOS */}
        {etapaAtual === 2 && (
          <>
            <button onClick={() => setEtapaAtual(1)} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-xs font-bold uppercase tracking-wider mb-6 transition-colors cursor-pointer">
              <ArrowLeft size={14} /> Voltar para os dados
            </button>

            <h2 className="text-[#191F37] text-[26px] font-black tracking-tight mb-2">Makers recomendados para você</h2>
            <p className="text-gray-400 text-xs font-medium mb-6">Com base na área selecionada, estes profissionais possuem as melhores qualificações para te apoiar:</p>

            <div className="space-y-6">
              
              {/* LISTA DE MAKERS */}
              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {makersFiltrados.length === 0 ? (
                  <p className="text-sm text-amber-600 font-semibold bg-amber-50 p-4 rounded-xl">Não há orientadores cadastrados especificamente para esta área no momento.</p>
                ) : (
                  makersFiltrados.map((m) => {
                    const escolhido = makerSelecionado?.id === m.id;
                    return (
                      <div key={m.id} onClick={() => setMakerSelecionado(m)} className={`p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all ${escolhido ? 'border-[#0077cc] bg-blue-50/30' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                        <img src={m.avatar} alt={m.nome} className="w-12 h-12 rounded-full object-cover shadow-xs shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-sm text-[#191F37]">{m.nome}</h4>
                          <p className="text-xs text-gray-400 truncate font-medium">{m.especialidade}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* OPÇÃO 1: AGENDAMENTO NORMAL */}
              {makerSelecionado && datasDisponiveisDoMaker.length > 0 && !modoContatoDireto && (
                <form onSubmit={handleFinalizarAgendamento} className="space-y-6 border-t border-gray-100 pt-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-black text-gray-400 mb-1.5 flex items-center gap-1"><CalendarIcon size={12}/>Data do atendimento</label>
                      <select
                        value={dataAtendimento}
                        onChange={(e) => handleMudarData(e.target.value)}
                        required
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-700 outline-none focus:border-[#0077cc]"
                      >
                        <option value="">Selecione uma data disponível</option>
                        {datasDisponiveisDoMaker.map(d => (
                          <option key={d} value={d}>{d.split('-').reverse().join('/')}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-black text-gray-400 mb-1.5 flex items-center gap-1"><Clock size={12}/>Horário disponível</label>
                      <select 
                        value={horaAtendimento} 
                        onChange={(e) => handleMudarHorario(e.target.value)}
                        required
                        disabled={!dataAtendimento || horariosFiltrados.length === 0}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-700 outline-none focus:border-[#0077cc] disabled:bg-gray-50"
                      >
                        <option value="">{!dataAtendimento ? "Escolha a data primeiro" : "Selecione o horário"}</option>
                        {horariosFiltrados.map(slot => (
                          <option key={slot.id} value={slot.horario}>{slot.horario}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={!slotIdSelecionado} 
                    className="w-full bg-[#191F37] hover:bg-[#2c3558] text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Confirmar Mentoria Técnica
                  </button>
                </form>
              )}

              {/* OPÇÃO 2: CARD "ENTRE EM CONTATO POR E-MAIL" */}
              {makerSelecionado && (datasDisponiveisDoMaker.length === 0 || modoContatoDireto) && (
                <form onSubmit={handleEnviarMensagemDireta} className="border-t border-gray-100 pt-5 space-y-4 animate-fade-in">
                  <div className="bg-amber-50 border border-amber-200/60 p-4 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
                    <Mail size={20} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Sem horários livres na agenda</h4>
                      <p className="text-amber-700 font-medium mt-0.5">
                        {makerSelecionado.nome} não possui janelas abertas no momento. Envie uma mensagem direta solicitando um horário especial!
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-black text-gray-400 mb-1">Sua mensagem direta para o orientador:</label>
                    <textarea 
                      value={mensagemDireta}
                      onChange={(e) => setMensagemDireta(e.target.value)}
                      required
                      rows={3}
                      placeholder="Ex: Olá! Tenho urgência para validar meu projeto antes de quinta-feira. Haveria a possibilidade de um atendimento rápido de 15 minutos?"
                      className="w-full border border-gray-200 rounded-xl p-3 text-xs font-medium text-gray-700 outline-none focus:border-[#0077cc] resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#0077cc] hover:bg-[#0066b3] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send size={14} /> Enviar Mensagem por E-mail
                  </button>
                </form>
              )}

              {/* BOTÃO DE TRANSIÇÃO MANUAL */}
              {makerSelecionado && datasDisponiveisDoMaker.length > 0 && !modoContatoDireto && (
                <div className="text-center pt-2">
                  <button 
                    type="button" 
                    onClick={() => setModoContatoDireto(true)}
                    className="text-xs text-gray-400 hover:text-[#0077cc] font-bold underline transition-colors cursor-pointer"
                  >
                    Prefere enviar uma mensagem direta por e-mail?
                  </button>
                </div>
              )}

            </div>
          </>
        )}

        {/* FEEDBACK */}
        {mensagem.texto && (
          <div className={`p-4 rounded-xl text-xs font-bold text-center mt-4 ${mensagem.tipo === 'sucesso' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
            {mensagem.texto}
          </div>
        )}

      </div>
    </main>
  );
}