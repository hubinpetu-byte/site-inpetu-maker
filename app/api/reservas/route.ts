import { NextResponse } from 'next/server';

// 🌟 URL Corrigida (removido o 'npm ' acidental do final)
const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxk_jrRD3EvTd0SCf7h37LjcQQ0hTXq-g5D6Tx3iGFXwNabv--ZiguA6CHJNr9hTatihw/exec";

// Como não podemos salvar arquivos locais na Vercel, buscamos o histórico direto da planilha 
// ou permitimos o fluxo contínuo de agendamentos.
export async function GET() {
  try {
    if (!GOOGLE_SHEET_WEBAPP_URL) return NextResponse.json([]);

    const resposta = await fetch(GOOGLE_SHEET_WEBAPP_URL);
    if (!resposta.ok) return NextResponse.json([]);
    
    const dados = await resposta.json();
    return NextResponse.json(dados);
  } catch (error) {
    console.error("Erro ao buscar reservas do Sheets:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const { maquina_unidade, usuario_nome, usuario_email, data_reserva, horario_inicio, horario_fim } = await request.json();

    const novaReserva = {
      id: Math.random().toString(36).substring(2, 9),
      maquina_unidade: Number(maquina_unidade),
      usuario_nome,
      usuario_email,
      data_reserva,
      horario_inicio,
      horario_fim,
      created_at: new Date().toISOString()
    };

    // 🔥 REMOVIDO: Toda a parte de 'fs.writeFileSync' que quebrava o servidor da Vercel.

    // 🚀 ENVIA DIRETOR PARA O GOOGLE SHEETS (Banco de dados na nuvem)
    if (GOOGLE_SHEET_WEBAPP_URL) {
      try {
        const controller = new AbortController();
        const idTimeout = setTimeout(() => controller.abort(), 8000); // 8 segundos de limite

        const responseSheet = await fetch(GOOGLE_SHEET_WEBAPP_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(novaReserva),
          signal: controller.signal
        });
        
        clearTimeout(idTimeout);

        if (!responseSheet.ok) {
          throw new Error("Planilha rejeitou a requisição");
        }
      } catch (sheetError) {
        console.error("⚠️ Erro ao sincronizar com Google Sheets:", sheetError);
        return NextResponse.json({ error: 'Erro de comunicação com o banco de dados do Google Sheets.' }, { status: 503 });
      }
    }

    // Retorna sucesso puro!
    return NextResponse.json(novaReserva, { status: 201 });

  } catch (err) {
    console.error("🚨 Erro Crítico no Backend:", err);
    return NextResponse.json({ error: 'Erro interno ao processar a reserva.' }, { status: 500 });
  }
}