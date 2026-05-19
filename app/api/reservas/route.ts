import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'reservas.json');

// URL gerada pelo seu Google Apps Script
const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxk_jrRD3EvTd0SCf7h37LjcQQ0hTXq-g5D6Tx3iGFXwNabv--ZiguA6CHJNr9hTatihw/exec";

function lerReservas() {
  try {
    if (!fs.existsSync(filePath)) {
      const dirPath = path.dirname(filePath);
      if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function GET() {
  return NextResponse.json(lerReservas());
}

export async function POST(request: Request) {
  try {
    const { maquina_unidade, usuario_nome, usuario_email, data_reserva, horario_inicio, horario_fim } = await request.json();
    const reservasExistentes = lerReservas();

    const conflito = reservasExistentes.some((r: any) => 
      r.maquina_unidade === Number(maquina_unidade) &&
      r.data_reserva === data_reserva &&
      ((horario_inicio >= r.horario_inicio && horario_inicio < r.horario_fim) ||
       (horario_fim > r.horario_inicio && horario_fim <= r.horario_fim) ||
       (horario_inicio <= r.horario_inicio && horario_fim >= r.horario_fim))
    );

    if (conflito) {
      return NextResponse.json({ error: 'Horário indisponível para esta unidade.' }, { status: 400 });
    }

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

    // 1. SALVA LOCALMENTE PRIMEIRO (Garante o funcionamento básico do app)
    reservasExistentes.push(novaReserva);
    fs.writeFileSync(filePath, JSON.stringify(reservasExistentes, null, 2));

    // 2. ENVIA PARA O GOOGLE SHEETS COM BLOCO DE ISOLAMENTO TOTAL
    if (GOOGLE_SHEET_WEBAPP_URL) {
      try {
        // timeout de segurança para a requisição não travar o Next.js se a rede estiver lenta
        const controller = new AbortController();
        const idTimeout = setTimeout(() => controller.abort(), 5000);

        await fetch(GOOGLE_SHEET_WEBAPP_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(novaReserva),
          signal: controller.signal
        });
        
        clearTimeout(idTimeout);
      } catch (sheetError) {
        // Se a rede da faculdade travar a conexão com o Google, o erro aparece AQUI no terminal
        console.error("⚠️ Erro de rede/permissão ao sincronizar com Google Sheets:", sheetError);
      }
    }

    // Retorna sucesso 201 porque a reserva local foi gravada com sucesso!
    return NextResponse.json(novaReserva, { status: 201 });

  } catch (err) {
    // Esse console.log vai te cuspir o erro real no terminal do VS Code caso algo quebre na leitura do arquivo
    console.error("🚨 Erro Crítico no Backend:", err);
    return NextResponse.json({ error: 'Erro interno ao processar a reserva.' }, { status: 500 });
  }
}