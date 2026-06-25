import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase"; // Verifique se o caminho até o seu arquivo do Firebase está certinho
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// 📅 1. FUNÇÃO PARA BUSCAR AS RESERVAS DIRETO DO FIREBASE (Evita arquivos locais)
export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "agendamentos_gerais"));
    const listaReservas: any[] = [];
    
    querySnapshot.forEach((doc) => {
      listaReservas.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json(listaReservas, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar agendamentos na nuvem:", error);
    return NextResponse.json({ error: "Falha ao ler agenda." }, { status: 500 });
  }
}

// 💾 2. FUNÇÃO PARA SALVAR A RESERVA NA NUVEM (Resolve o Erro 500 da Vercel)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { maquina_unidade, usuario_nome, usuario_email, data_reserva, horario_inicio, horario_fim } = body;

    // Validação básica de segurança
    if (!usuario_email || !data_reserva || !horario_inicio || !horario_fim) {
      return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
    }

    // 💡 REGRA DE CONFLITO: Verifica na nuvem se a mesma máquina já está ocupada no mesmo horário
    const q = query(
      collection(db, "agendamentos_gerais"),
      where("maquina_unidade", "==", maquina_unidade),
      where("data_reserva", "==", data_reserva),
      where("horario_inicio", "==", horario_inicio)
    );
    
    const checagemOcupado = await getDocs(q);
    if (!checagemOcupado.empty) {
      return NextResponse.json({ error: "Este horário já foi reservado por outro Maker." }, { status: 400 });
    }

    // 🌟 Salva na coleção global de agendamentos no Firestore
    const novoAgendamento = {
      maquina_unidade,
      usuario_nome,
      usuario_email,
      data_reserva,
      horario_inicio,
      horario_fim,
      criado_em: new Date().toISOString()
    };

    await addDoc(collection(db, "agendamentos_gerais"), novoAgendamento);

    return NextResponse.json({ message: "Agendamento registrado com sucesso!" }, { status: 201 });
  } catch (error) {
    console.error("Erro interno do servidor da Vercel:", error);
    return NextResponse.json({ error: "Erro interno ao processar a reserva." }, { status: 500 });
  }
}