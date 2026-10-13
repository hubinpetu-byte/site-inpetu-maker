"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, getDocs, updateDoc, deleteDoc, addDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { 
  ShieldCheck, Users, Search, Check, X, 
  BarChart3, Award, Calendar, Clock, CheckCircle2,
  CheckSquare, AlertOctagon, Star, DollarSign, Mail, GraduationCap, PlusCircle, UserCheck
} from "lucide-react";

import emailjs from '@emailjs/browser';

interface ReservaData {
  id?: string;
  maquina: string;
  data: string;
  horario: string;
  status?: string;
  valorTotal?: number;
}

interface Turma3DItem {
  id: string;
  treinamentoId?: string;
  treinamentoNome?: string;
  dataISO: string;
  dataFormatada: string;
  vagasTotais: number;
  status: string;
}

interface InscricaoTreinamento {
  id: string;
  uid_aluno: string;
  nome_aluno: string;
  email_aluno: string;
  matricula_aluno: string;
  treinamento_id: string;
  treinamento_nome: string;
  turma_data: string;
  data_inscricao: string;
  status_participacao: string;
  valor_treinamento?: string;
}

interface AlunoData {
  uid: string;
  nome: string;
  email: string;
  tipoUsuario: string;
  role: string;
  habilitacoes: string[];
  proximasReservas?: ReservaData[];
  historico?: Array<{ maquina: string; data: string; horas: number; avaliacao?: number; status?: string; valorTotal?: number }>;
}

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alunos, setAlunos] = useState<AlunoData[]>([]);
  const [turmas3D, setTurmas3D] = useState<Turma3DItem[]>([]);
  const [inscricoesTreinamento, setInscricoesTreinamento] = useState<InscricaoTreinamento[]>([]);
  const [busca, setBusca] = useState("");
  
  const [abaAtiva, setAbaAtiva] = useState<"habilitacoes" | "historico" | "treinamentos">("habilitacoes");
  const [alunoSelecionadoHistorico, setAlunoSelecionadoHistorico] = useState<AlunoData | null>(null);

  // 🚀 ESTADO PARA O MODAL DA LISTA DE ALUNOS DA TURMA CLICADA
  const [turmaSelecionadaModal, setTurmaSelecionadaModal] = useState<Turma3DItem | null>(null);

  // ESTADOS PARA O CADASTRO DE NOVA TURMA
  const [treinamentoSelecionadoId, setTreinamentoSelecionadoId] = useState("impressao-3d");
  const [novaDataHorario, setNovaDataHorario] = useState("");
  const [vagasNovaTurma, setVagasNovaTurma] = useState(10);

  const listaTreinamentosDisponiveis = [
    { id: "impressao-3d", nome: "Introdução à Impressão 3D FDM", disponivel: true },
    { id: "corte-laser", nome: "Cortadora Laser - Segurança e Básicos", disponivel: false },
    { id: "router-cnc", nome: "Fundamentos da Router CNC", disponivel: false },
    { id: "marcenaria", nome: "Marcenaria e Ferramentas Manuais", disponivel: false },
    { id: "vacuform", nome: "Moldagem Vacuform", disponivel: false }
  ];

  const listaMaquinas = [
    "Impressão 3D FDM",
    "Corte à laser",
    "Router CNC",
    "Marcenaria",
    "Vacuform"
  ];

  const carregarDadosDoBanco = async () => {
    try {
      const querySnapshotUsers = await getDocs(collection(db, "users"));
      const listaAlunos: AlunoData[] = [];

      const querySnapshotReservas = await getDocs(collection(db, "reservas_maquinas"));
      const todasReservasDoBanco: Array<{ id: string; aluno_email: string; data: ReservaData }> = [];

      querySnapshotReservas.forEach((docRes) => {
        const d = docRes.data();
        todasReservasDoBanco.push({
          id: docRes.id,
          aluno_email: d.aluno_email,
          data: {
            id: docRes.id,
            maquina: d.maquina_nome || d.maquina_unidade || "Equipamento",
            data: d.data_reserva,
            horario: `${d.horario_inicio} às ${d.horario_fim}`,
            status: d.status || "Agendado",
            valorTotal: d.valor_total || 0
          }
        });
      });

      querySnapshotUsers.forEach((docUser) => {
        const aluno = docUser.data() as AlunoData;
        const reservasDoAluno = todasReservasDoBanco.filter(r => r.aluno_email === aluno.email).map(r => r.data);
        const proximasCombinadas = [...reservasDoAluno, ...(aluno.proximasReservas || [])];

        listaAlunos.push({
          ...aluno,
          proximasReservas: proximasCombinadas
        });
      });

      setAlunos(listaAlunos);

      const querySnapshotTurmas = await getDocs(collection(db, "turmas_impressao3d"));
      const listaTurmas: Turma3DItem[] = [];
      querySnapshotTurmas.forEach((docT) => {
        listaTurmas.push({ id: docT.id, ...docT.data() } as Turma3DItem);
      });
      listaTurmas.sort((a, b) => new Date(a.dataISO).getTime() - new Date(b.dataISO).getTime());
      setTurmas3D(listaTurmas);

      const querySnapshotTreinamentos = await getDocs(collection(db, "inscricoes_treinamentos"));
      const listaTreinamentos: InscricaoTreinamento[] = [];
      querySnapshotTreinamentos.forEach((docInsc) => {
        listaTreinamentos.push({ id: docInsc.id, ...docInsc.data() } as InscricaoTreinamento);
      });
      setInscricoesTreinamento(listaTreinamentos);

      if (alunoSelecionadoHistorico) {
        const updated = listaAlunos.find(a => a.uid === alunoSelecionadoHistorico.uid);
        if (updated) setAlunoSelecionadoHistorico(updated);
      } else if (listaAlunos.length > 0) {
        setAlunoSelecionadoHistorico(listaAlunos[0]);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do banco:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const docRef = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(docRef);

          if (snap.exists() && snap.data().role === "admin") {
            setIsAdmin(true);
            await carregarDadosDoBanco();
          } else {
            router.push("/perfil");
          }
        } catch (error) {
          console.error("Erro ao carregar dados do admin:", error);
        }
      } else {
        router.push("/auth");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, alunoSelecionadoHistorico?.uid]);

  async function handleCadastrarNovaTurma(e: React.FormEvent) {
    e.preventDefault();

    if (!novaDataHorario) {
      alert("Por favor, selecione uma data e horário no calendário.");
      return;
    }

    try {
      const cursoEncontrado = listaTreinamentosDisponiveis.find(c => c.id === treinamentoSelecionadoId);

      const dataObj = new Date(novaDataHorario);
      const dataFormatada = dataObj.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }) + " às " + dataObj.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

      await addDoc(collection(db, "turmas_impressao3d"), {
        treinamentoId: treinamentoSelecionadoId,
        treinamentoNome: cursoEncontrado?.nome || "Impressão 3D FDM",
        dataISO: novaDataHorario,
        dataFormatada: dataFormatada,
        vagasTotais: vagasNovaTurma,
        status: "Inscrições Abertas",
        criadoEm: new Date().toISOString()
      });

      alert(`Nova turma de '${cursoEncontrado?.nome}' publicada com sucesso para ${dataFormatada}!`);
      setNovaDataHorario("");
      await carregarDadosDoBanco();
    } catch (error) {
      console.error("Erro ao cadastrar nova turma:", error);
      alert("Erro ao salvar no banco de dados.");
    }
  }

  async function aprovarInscricaoTreinamento(inscricao: InscricaoTreinamento) {
    try {
      const inscRef = doc(db, "inscricoes_treinamentos", inscricao.id);
      await updateDoc(inscRef, { status_participacao: "Confirmado" });

      alert(`Pagamento de ${inscricao.nome_aluno} CONFIRMADO! A vaga foi garantida para a turma.`);
      await carregarDadosDoBanco();
    } catch (error) {
      console.error("Erro ao aprovar inscrição:", error);
      alert("Erro ao conectar com o banco de dados.");
    }
  }

  async function toggleHabilitacao(alunoUid: string, maquina: string, jaHabilitado: boolean) {
    try {
      const alunoRef = doc(db, "users", alunoUid);
      if (jaHabilitado) {
        await updateDoc(alunoRef, { habilitacoes: arrayRemove(maquina) });
      } else {
        await updateDoc(alunoRef, { habilitacoes: arrayUnion(maquina) });
      }
      await carregarDadosDoBanco();
    } catch (error) {
      console.error("Erro ao atualizar habilitação:", error);
    }
  }

  async function concluirReservaDoAluno(alunoUid: string, reserva: ReservaData, marcarComoFalta = false) {
    try {
      const alunoRef = doc(db, "users", alunoUid);

      await updateDoc(alunoRef, {
        proximasReservas: arrayRemove(reserva)
      });

      if (reserva.id) {
        await deleteDoc(doc(db, "reservas_maquinas", reserva.id));
      }

      if (!marcarComoFalta) {
        const inputHoras = prompt(`[Passo 1/2] Quantas horas o aluno utilizou a máquina?\nReserva original: ${reserva.horario}`, "1");
        const horasEfetivas = parseInt(inputHoras || "1") || 1;

        const inputNota = prompt(`[Passo 2/2] Avalie o comportamento do aluno e o cuidado com a máquina (1 a 5 estrelas):`, "5");
        let notaAvaliacao = parseInt(inputNota || "5") || 5;
        if (notaAvaliacao < 1) notaAvaliacao = 1;
        if (notaAvaliacao > 5) notaAvaliacao = 5;

        await updateDoc(alunoRef, {
          historico: arrayUnion({
            maquina: reserva.maquina,
            data: reserva.data,
            horas: horasEfetivas,
            avaliacao: notaAvaliacao,
            valorTotal: reserva.valorTotal || 0,
            status: "Concluído (Pagamento Pendente)"
          })
        });
        alert(`Uso concluído com sucesso!\n${horasEfetivas}h computadas • Nota ${notaAvaliacao}/5.`);
      } else {
        await updateDoc(alunoRef, {
          historico: arrayUnion({
            maquina: reserva.maquina,
            data: reserva.data,
            horas: 0,
            avaliacao: 0,
            valorTotal: 0,
            status: "Não Compareceu (Falta)"
          })
        });
        alert("Falta registrada.");
      }

      await carregarDadosDoBanco();
    } catch (error) {
      console.error("Erro ao validar e concluir atendimento:", error);
      alert("Erro ao conectar com o banco de dados.");
    }
  }

  async function atualizarStatusFinanceiro(alunoUid: string, itemHist: any, novoStatus: string) {
    try {
      const alunoRef = doc(db, "users", alunoUid);

      if (novoStatus === "E-mail de Cobrança Enviado") {
        const emailDestinatario = alunoSelecionadoHistorico?.email;
        if (!emailDestinatario) {
          alert("Erro: O usuário selecionado não possui um e-mail válido cadastrado no sistema.");
          return;
        }

        const SERVICE_ID = "service_0pxaseu"; 
        const TEMPLATE_ID = "template_uzgktq6"; 
        const PUBLIC_KEY = "-LmJRne5SRUDm0HqL"; 

        const parametrosEmail = {
          nome_aluno: alunoSelecionadoHistorico?.nome || "Usuário Maker",
          email_aluno: emailDestinatario,
          nome_maquina: itemHist.maquina || "Máquina InPETU",
          data_uso: itemHist.data || "Data não informada",
          valor_total: (itemHist.valorTotal || 0).toFixed(2).replace('.', ',')
        };

        const resposta = await emailjs.send(SERVICE_ID, TEMPLATE_ID, parametrosEmail, PUBLIC_KEY);
        alert(`E-mail de cobrança enviado COM SUCESSO para: ${emailDestinatario}!`);
      } else if (novoStatus === "Pago") {
        alert("Status atualizado para: PAGO com sucesso!");
      }

      await updateDoc(alunoRef, {
        historico: arrayRemove(itemHist)
      });

      await updateDoc(alunoRef, {
        historico: arrayUnion({
          ...itemHist,
          status: novoStatus
        })
      });

      await carregarDadosDoBanco();
    } catch (error: any) {
      console.error("❌ Erro no envio do e-mail via EmailJS:", error);
      alert(`Ocorreu um erro no envio do e-mail.`);
    }
  }

  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    aluno.email?.toLowerCase().includes(busca.toLowerCase())
  );

  const totalUsuarios = alunos.length;
  const totalDeUsosGerais = alunos.reduce((acc, aluno) => acc + (aluno.historico?.length || 0), 0);
  const totalReservasAgendadas = alunos.reduce((acc, aluno) => acc + (aluno.proximasReservas?.length || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0077cc]"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 pt-[120px] font-sans">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* CABEÇALHO */}
        <div className="bg-[#191F37] rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">Painel de Controle Maker</h1>
              <p className="opacity-80 font-medium text-xs md:text-sm mt-0.5">Gerenciamento operacional, permissões e treinamentos</p>
            </div>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 bg-[#0077cc] hover:bg-[#0066b3] text-white font-black text-xs uppercase tracking-widest py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-[0.98] shrink-0 cursor-pointer"
          >
            <Calendar size={16} />
            Ver Agenda Semanal
          </button>
        </div>

        {/* MÉTRICAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0077cc] flex items-center justify-center shrink-0">
              <Users size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Makers Cadastrados</p>
              <p className="text-2xl font-black text-slate-800">{totalUsuarios}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Reservas Agendadas</p>
              <p className="text-2xl font-black text-slate-800">{totalReservasAgendadas}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
              <Award size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Habilitados</p>
              <p className="text-2xl font-black text-slate-800">
                {alunos.reduce((acc, aluno) => acc + (aluno.habilitacoes?.length || 0), 0)}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <GraduationCap size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Inscrições Cursos</p>
              <p className="text-2xl font-black text-slate-800">{inscricoesTreinamento.length}</p>
            </div>
          </div>
        </div>

        {/* SUBABAS */}
        <div className="flex border-b border-gray-200 mb-8 gap-6 overflow-x-auto">
          <button
            onClick={() => setAbaAtiva("habilitacoes")}
            className={`pb-3 font-bold text-sm uppercase tracking-wider border-b-2 transition-all shrink-0 cursor-pointer ${
              abaAtiva === "habilitacoes" ? "border-b-2 border-[#0077cc] text-[#0077cc]" : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Controle de Habilitações
          </button>

          <button
            onClick={() => setAbaAtiva("historico")}
            className={`pb-3 font-bold text-sm uppercase tracking-wider border-b-2 transition-all shrink-0 cursor-pointer ${
              abaAtiva === "historico" ? "border-b-2 border-[#0077cc] text-[#0077cc]" : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Validação, Histórico e Cobrança
          </button>

          <button
            onClick={() => setAbaAtiva("treinamentos")}
            className={`pb-3 font-bold text-sm uppercase tracking-wider border-b-2 transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
              abaAtiva === "treinamentos" ? "border-b-2 border-[#0077cc] text-[#0077cc]" : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            <GraduationCap size={16} /> Gestão de Treinamentos
          </button>
        </div>

        {/* SUBABA 1: HABILITAÇÕES */}
        {abaAtiva === "habilitacoes" && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4 items-center">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">
                Resultados filtrados: {alunosFiltrados.length} usuários
              </div>
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Pesquisar maker por nome ou e-mail..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs pl-9 pr-4 py-2.5 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-xs text-slate-400 font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Estudante / Vínculo</th>
                    <th className="px-6 py-4">Controle de Habilitações (Clique para Alternar)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {alunosFiltrados.map((aluno) => (
                    <tr key={aluno.uid} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-black text-slate-800">{aluno.nome}</div>
                        <div className="text-xs text-slate-400 font-medium">
                          {aluno.email} • <span className="lowercase">{aluno.tipoUsuario || "acadêmico"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {listaMaquinas.map((maq) => {
                            const jaHabilitado = aluno.habilitacoes?.includes(maq);
                            return (
                              <button
                                key={maq}
                                onClick={() => toggleHabilitacao(aluno.uid, maq, jaHabilitado)}
                                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all border cursor-pointer ${
                                  jaHabilitado ? "bg-green-50 border-green-200 text-green-700 shadow-sm" : "bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100"
                                }`}
                              >
                                {jaHabilitado ? <Check size={12} strokeWidth={3} /> : <X size={12} />}
                                {maq}
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBABA 2: HISTÓRICO, VALIDAÇÃO E COBRANÇA */}
        {abaAtiva === "historico" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm max-h-[550px] overflow-y-auto space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">Selecione o Aluno</p>
              {alunosFiltrados.map((aluno) => (
                <button
                  key={aluno.uid}
                  onClick={() => setAlunoSelecionadoHistorico(aluno)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
                    alunoSelecionadoHistorico?.uid === aluno.uid ? "border-[#0077cc] bg-blue-50/40" : "border-transparent hover:bg-slate-50"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs shrink-0">
                    {aluno.nome ? aluno.nome.charAt(0).toUpperCase() : "M"}
                  </div>
                  <div className="truncate">
                    <h4 className="font-bold text-xs text-slate-800 truncate">{aluno.nome}</h4>
                    <p className="text-[11px] text-gray-400 truncate">{aluno.email}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 space-y-6">
              {alunoSelecionadoHistorico ? (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm min-h-[550px]">
                  <div className="border-b border-gray-100 pb-5 mb-6 flex justify-between items-start flex-wrap gap-4">
                    <div>
                      <h2 className="text-xl font-black text-slate-800">{alunoSelecionadoHistorico.nome}</h2>
                      <p className="text-xs text-gray-400 font-medium">{alunoSelecionadoHistorico.email}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Calendar size={14} className="text-[#0077cc]" /> Agendamentos Futuros
                    </h3>
                    {!alunoSelecionadoHistorico.proximasReservas || alunoSelecionadoHistorico.proximasReservas.length === 0 ? (
                      <p className="text-xs text-gray-400 italic bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">Nenhum agendamento futuro ativo no perfil deste aluno.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {alunoSelecionadoHistorico.proximasReservas.map((res, index) => (
                          <div key={index} className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between min-h-[160px]">
                            <div>
                              <h4 className="font-bold text-xs text-slate-800 mb-2 uppercase tracking-tight">{res.maquina}</h4>
                              <p className="text-[11px] text-gray-500">Data: {res.data}</p>
                              <p className="text-[11px] text-gray-500">Horário: {res.horario}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4 border-t border-slate-50 pt-3">
                              <button onClick={() => concluirReservaDoAluno(alunoSelecionadoHistorico.uid, res, false)} className="bg-[#0077cc] text-white font-bold text-[10px] uppercase py-2 rounded-lg cursor-pointer">Concluir Uso</button>
                              <button onClick={() => concluirReservaDoAluno(alunoSelecionadoHistorico.uid, res, true)} className="bg-red-50 text-red-600 border border-red-100 font-bold text-[10px] uppercase py-2 rounded-lg cursor-pointer">Dar Falta</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-green-600" /> Histórico de Uso & Cobrança
                    </h3>
                    {!alunoSelecionadoHistorico.historico || alunoSelecionadoHistorico.historico.length === 0 ? (
                      <p className="text-xs text-gray-400 italic bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">Sem registros no histórico.</p>
                    ) : (
                      <div className="space-y-3">
                        {alunoSelecionadoHistorico.historico.map((hist, index) => (
                          <div key={index} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs">
                            <div>
                              <span className="font-bold text-slate-800">{hist.maquina}</span>
                              <span className="text-gray-400 ml-2">({hist.data})</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-slate-700">R$ {(hist.valorTotal || 0).toFixed(2).replace('.', ',')}</span>
                              {!hist.status?.includes("Falta") && hist.status !== "Pago" && (
                                <button onClick={() => atualizarStatusFinanceiro(alunoSelecionadoHistorico.uid, hist, "Pago")} className="bg-emerald-600 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg cursor-pointer">Marcar como Pago</button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-center h-[550px] text-gray-400 italic text-xs">
                  Nenhum aluno selecionado.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 🚀 SUBABA 3: GESTÃO E CRIAÇÃO DE TURMAS COM CARDS CLICÁVEIS */}
        {abaAtiva === "treinamentos" && (
          <div className="space-y-8">
            
            {/* 1. FORMULÁRIO COM SELETOR DE CURSO E CALENDÁRIO */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-1">
                <PlusCircle className="text-[#0077cc]" size={22} /> Abrir Nova Turma de Treinamento
              </h2>
              <p className="text-xs text-gray-400 mb-6">
                Selecione o curso, escolha a data no calendário e defina as vagas. A turma ficará disponível imediatamente no site para inscrição dos alunos!
              </p>

              <form onSubmit={handleCadastrarNovaTurma} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">
                    Selecione o Treinamento:
                  </label>
                  <select
                    value={treinamentoSelecionadoId}
                    onChange={(e) => setTreinamentoSelecionadoId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-700 outline-none focus:border-[#0077cc] cursor-pointer"
                  >
                    {listaTreinamentosDisponiveis.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nome} {!t.disponivel && "(Página em Breve)"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">
                    Data e Horário no Calendário:
                  </label>
                  <input 
                    type="datetime-local" 
                    required 
                    value={novaDataHorario}
                    onChange={(e) => setNovaDataHorario(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-700 outline-none focus:border-[#0077cc] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">
                    Vagas Disponíveis:
                  </label>
                  <input 
                    type="number" 
                    required 
                    min={1}
                    value={vagasNovaTurma}
                    onChange={(e) => setVagasNovaTurma(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-700 outline-none focus:border-[#0077cc]"
                  />
                </div>

                <div className="flex items-end">
                  <button 
                    type="submit" 
                    className="w-full bg-[#0077cc] hover:bg-[#0066b3] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <PlusCircle size={16} /> Publicar Turma
                  </button>
                </div>
              </form>
            </div>

            {/* 🚀 2. LISTA DAS TURMAS PUBLICADAS (CARDS CLICÁVEIS DE CHAMADA DE TURMA) */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <Calendar size={18} className="text-[#0077cc]" /> Turmas Ativas no Banco de Dados
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Clique sobre o card de qualquer turma abaixo para ver a lista de alunos inscritos nela!
                </p>
              </div>

              {turmas3D.length === 0 ? (
                <p className="text-xs text-gray-400 italic bg-slate-50 p-4 rounded-xl border border-dashed text-center">
                  Nenhuma turma cadastrada no calendário ainda. Use o formulário acima para abrir a primeira turma!
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {turmas3D.map((turma) => {
                    // Conta quantos alunos estão inscritos para esta turma específica
                    const inscritosDestaTurma = inscricoesTreinamento.filter(
                      (i) => i.turma_data === turma.dataFormatada
                    );

                    return (
                      <div 
                        key={turma.id} 
                        onClick={() => setTurmaSelecionadaModal(turma)}
                        className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/30 hover:border-[#0077cc]/40 transition-all cursor-pointer flex flex-col justify-between shadow-xs group"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black uppercase px-2.5 py-1 rounded-md bg-blue-50 text-[#0077cc] group-hover:bg-[#0077cc] group-hover:text-white transition">
                              {turma.treinamentoNome || "Impressão 3D FDM"}
                            </span>
                            <span className="text-[9px] font-black uppercase px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {turma.status}
                            </span>
                          </div>

                          <h4 className="font-bold text-xs text-slate-800 mt-3 group-hover:text-[#0077cc] transition">
                            {turma.dataFormatada}
                          </h4>

                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200/50 text-[11px] font-medium text-gray-500">
                            <span>Vagas da Turma: <b>{turma.vagasTotais}</b></span>
                            <span className="text-[#0077cc] font-black flex items-center gap-1">
                              <UserCheck size={14} /> {inscritosDestaTurma.length} Inscrito(s)
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 text-center">
                          <span className="text-[10px] font-bold text-[#0077cc] underline group-hover:no-underline">
                            Clique para abrir a chamada da turma →
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. LISTA GERAL DE TODAS AS PRÉ-INSCRIÇÕES */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <GraduationCap className="text-[#0077cc]" size={24} /> Todas as Pré-Inscrições Registradas
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Visão geral de todas as solicitações recebidas.
                </p>
              </div>

              {inscricoesTreinamento.length === 0 ? (
                <p className="text-xs text-gray-400 italic bg-slate-50 p-6 rounded-2xl text-center border border-dashed">
                  Nenhuma solicitação de vaga registrada até o momento.
                </p>
              ) : (
                <div className="space-y-3">
                  {inscricoesTreinamento.map((insc) => {
                    const ehConfirmado = insc.status_participacao === "Confirmado" || insc.status_participacao === "Pago" || insc.status_participacao === "Inscrito";

                    return (
                      <div key={insc.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${ehConfirmado ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                            <h4 className="font-bold text-sm text-slate-800">{insc.nome_aluno}</h4>
                            <span className="text-xs text-gray-400">({insc.email_aluno})</span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium">
                            Treinamento: <b>{insc.treinamento_nome}</b> • Turma: <b>{insc.turma_data}</b>
                          </p>
                          {insc.matricula_aluno && (
                            <p className="text-[11px] text-gray-400">Matrícula: {insc.matricula_aluno}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`font-black text-xs px-3 py-1.5 rounded-xl border uppercase ${
                            ehConfirmado 
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                              : 'bg-amber-50 border-amber-200 text-amber-800'
                          }`}>
                            {ehConfirmado ? "Vaga Confirmada" : insc.status_participacao}
                          </span>

                          {!ehConfirmado && (
                            <button
                              onClick={() => aprovarInscricaoTreinamento(insc)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
                            >
                              <CheckCircle2 size={14} /> Confirmar Pagamento
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* 🚀 MODAL / JANELA FLUTUANTE DA CHAMADA DA TURMA CLICADA */}
      {turmaSelecionadaModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl space-y-6 relative border border-gray-100 max-h-[85vh] overflow-y-auto">
            
            <button 
              onClick={() => setTurmaSelecionadaModal(null)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer"
            >
              ✕
            </button>

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0077cc] bg-blue-50 px-2.5 py-1 rounded-md">
                Lista de Chamada da Turma
              </span>
              <h3 className="text-xl font-bold text-slate-800 mt-2">
                {turmaSelecionadaModal.treinamentoNome || "Treinamento Técnico"}
              </h3>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                <Calendar size={14} className="text-[#0077cc]" />
                <strong className="text-slate-700">{turmaSelecionadaModal.dataFormatada}</strong>
              </p>
            </div>

            {/* LISTA FILTRADA DE ALUNOS DA TURMA */}
            {(() => {
              const alunosDaTurma = inscricoesTreinamento.filter(
                (i) => i.turma_data === turmaSelecionadaModal.dataFormatada
              );

              if (alunosDaTurma.length === 0) {
                return (
                  <p className="text-xs text-gray-400 italic bg-slate-50 p-6 rounded-2xl text-center border border-dashed">
                    Nenhum aluno se inscreveu para esta turma até o momento.
                  </p>
                );
              }

              return (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Inscritos ({alunosDaTurma.length} de {turmaSelecionadaModal.vagasTotais} vagas):
                  </p>

                  {alunosDaTurma.map((aluno, index) => {
                    const ehConfirmado = aluno.status_participacao === "Confirmado" || aluno.status_participacao === "Pago" || aluno.status_participacao === "Inscrito";

                    return (
                      <div key={aluno.id || index} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#0077cc]/10 text-[#0077cc] text-[10px] font-black flex items-center justify-center shrink-0">
                              {index + 1}
                            </span>
                            <h4 className="font-bold text-xs text-slate-800">{aluno.nome_aluno}</h4>
                          </div>
                          <p className="text-[11px] text-gray-400 mt-0.5 pl-7">{aluno.email_aluno} • Matrícula: {aluno.matricula_aluno}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border ${
                            ehConfirmado ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}>
                            {ehConfirmado ? "Vaga Confirmada" : "Pagamento Pendente"}
                          </span>

                          {!ehConfirmado && (
                            <button
                              onClick={() => {
                                aprovarInscricaoTreinamento(aluno);
                              }}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase px-3 py-1.5 rounded-lg transition cursor-pointer"
                            >
                              Aprovar
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            <div className="pt-4 border-t border-slate-100 text-right">
              <button 
                onClick={() => setTurmaSelecionadaModal(null)} 
                className="bg-slate-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl hover:bg-slate-900 transition cursor-pointer"
              >
                Fechar Chamada
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}