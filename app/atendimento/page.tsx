"use client";

import React, { useState, useEffect } from 'react';
import { Upload, ChevronDown, Calendar as CalendarIcon, Clock, ArrowLeft } from 'lucide-react';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, getDocs, addDoc, updateDoc, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

// Banco de dados estático de orientadores (Sincronizado com os perfis)
const BANCO_MAKERS = [
  { id: "l0yUjLN8KxgIQi6zDHdyVLfbxVA3", nome: "Julia Hanna Okada", area: "Impressao3D", especialidade: "Modelagem e Impressão 3D, Corte e Gravação a Laser", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200" },
  { id: "m2", nome: "Davi Goulart", area: "Marcenaria", especialidade: "IoT, Sensores e Placas de Circuito", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" },
  { id: "m5", nome: "Felipe Ebersbach", area: "Mecanica", especialidade: "Estruturas Metálicas, Cortes e CNC", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200" },
];

export default function PaginaAtendimentoCompleta() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [etapaAtual, setEtapaAtual] = useState(1); // 1 = Triagem, 2 = Escolha do Maker

  // Perfil do Aluno logado
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');

  // Etapa 1: Triagem do Projeto
  const [etapaProjeto, setEtapaProjeto] = useState('');
  const [areaAjuda, setAreaAjuda] = useState('');
  const [resumoDuvida, setResumoDuvida] = useState('');

  // Etapa 2: Seleção e Disponibilidade Real
  const [makerSelecionado, setMakerSelecionado] = useState<any>(null);
  const [todasDisponibilidades, setTodasDisponibilidades] = useState<any[]>([]);
  const [datasDisponiveisDoMaker, setDatasDisponiveisDoMaker] = useState<string[]>([]);
  const [horariosFiltrados, setHorariosFiltrados] = useState<any[]>([]);
  
  const [dataAtendimento, setDataAtendimento] = useState('');
  const [slotIdSelecionado, setSlotIdSelecionado] = useState(''); // Armazena a chave primária do horário aberto
  const [horaAtendimento, setHoraAtendimento] = useState('');
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
        } catch (error) {}
      } else {
        router.push("/auth");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  // Carrega a agenda dinâmica de horários vagos que a equipe ofereceu
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

      // Isola as datas únicas disponíveis (remove duplicadas do array)
      const datasUnicas = Array.from(new Set(dados.map(item => item.data))).sort();
      setDatasDisponiveisDoMaker(datasUnicas);
      
      // Reseta seleções antigas de outro consultor
      setDataAtendimento('');
      setHorariosFiltrados([]);
      setHoraAtendimento('');
      setSlotIdSelecionado('');
    } catch (err) {
      console.error("Erro ao ler agenda do orientador:", err);
    }
  };

  useEffect(() => {
    if (makerSelecionado) {
      buscarGradeDisponivelDoBanco(makerSelecionado.id);
    }
  }, [makerSelecionado]);

  // Executa o filtro de horários assim que o aluno escolhe um dia válido do seletor
  const handleMudarData = (dataEscolhida: string) => {
    setDataAtendimento(dataEscolhida);
    setHoraAtendimento('');
    setSlotIdSelecionado('');

    // Filtra apenas os blocos de horários abertos para este dia específico
    const slotsDoDia = todasDisponibilidades.filter(item => item.data === dataEscolhida);
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

  const handleFinalizarAgendamento = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!makerSelecionado) {
      setMensagem({ tipo: 'erro', texto: 'Por favor, selecione um orientador da lista.' });
      return;
    }
    if (!slotIdSelecionado) {
      setMensagem({ tipo: 'erro', texto: 'Selecione um dia e horário que possuam vagas liberadas.' });
      return;
    }

    try {
      if (auth.currentUser) {
        // 1. Grava o atendimento na tabela oficial
        const atendimentosRef = collection(db, "atendimentos_maker");
        await addDoc(atendimentosRef, {
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

        // 2. 🔥 ALTERA O SLOT NO BANCO PARA "ocupado" PARA SUMIR DO SITE NA HORA!
        const docRefSlot = doc(db, "disponibilidade_maker", slotIdSelecionado);
        await updateDoc(docRefSlot, { status: "ocupado" });

        setMensagem({ tipo: 'sucesso', texto: `Suporte agendado com sucesso com ${makerSelecionado.nome}!` });
        
        setTimeout(() => {
          setEtapaAtual(1);
          setResumoDuvida('');
          setMakerSelecionado(null);
          setDataAtendimento('');
          setHoraAtendimento('');
          setSlotIdSelecionado('');
        }, 2000);
      }
    } catch (err) {
      setMensagem({ tipo: 'erro', texto: 'Falha ao salvar o agendamento.' });
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
                <button type="submit" className="w-full bg-[#007cc] hover:bg-[#0066b3] text-white font-bold py-4 rounded-xl text-sm transition-all shadow-md">Escolher maker</button>
              </div>
            </form>
          </>
        )}

        {etapaAtual === 2 && (
          <>
            <button onClick={() => setEtapaAtual(1)} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-xs font-bold uppercase tracking-wider mb-6 transition-colors">
              <ArrowLeft size={14} /> Voltar para os dados
            </button>

            <h2 className="text-[#191F37] text-[26px] font-black tracking-tight mb-2">Makers recomendados para você</h2>
            <p className="text-gray-400 text-xs font-medium mb-6">Com base na área selecionada, estes profissionais possuem as melhores qualificações para te apoiar:</p>

            <form onSubmit={handleFinalizarAgendamento} className="space-y-6">
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

              {/* CONTROLES DE DATA E HORA BASEADOS NA DISPONIBILIDADE DO BANCO */}
              <div className="border-t border-gray-100 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-black text-gray-400 mb-1.5 flex items-center gap-1"><CalendarIcon size={12}/>Data do atendimento</label>
                  <select
                    value={dataAtendimento}
                    onChange={(e) => handleMudarData(e.target.value)}
                    required
                    disabled={!makerSelecionado || datasDisponiveisDoMaker.length === 0}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-700 outline-none focus:border-[#0077cc] disabled:bg-gray-50"
                  >
                    <option value="">{makerSelecionado ? "Selecione um dia disponível" : "Escolha um orientador primeiro"}</option>
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
                    <option value="">{dataAtendimento ? "Selecione um horário" : "Escolha uma data primeiro"}</option>
                    {horariosFiltrados.map(slot => (
                      <option key={slot.id} value={slot.horario}>{slot.horario}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" disabled={!slotIdSelecionado} className="w-full bg-[#191F37] hover:bg-[#2c3558] text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed">
                  Confirmar Mentoria Técnica
                </button>
              </div>
            </form>
          </>
        )}

        {mensagem.texto && (
          <div className={`p-4 rounded-xl text-xs font-bold text-center mt-4 ${mensagem.tipo === 'sucesso' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
            {mensagem.texto}
          </div>
        )}

      </div>
    </main>
  );
}