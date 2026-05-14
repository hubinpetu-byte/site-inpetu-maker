import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'reservas.json');

// COLE AQUI A URL QUE VOCÊ COPIOU DO GOOGLE APPS SCRIPT
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

    // 1. Salva local no JSON para a interface React continuar rápida
    reservasExistentes.push(novaReserva);
    fs.writeFileSync(filePath, JSON.stringify(reservasExistentes, null, 2));

    // 2. Envia em segundo plano para a Planilha Google + Dispara Notificação por E-mail
    if (GOOGLE_SHEET_WEBAPP_URL && GOOGLE_SHEET_WEBAPP_URL !== "https://script.google.com/macros/s/AKfycbxk_jrRD3EvTd0SCf7h37LjcQQ0hTXq-g5D6Tx3iGFXwNabv--ZiguA6CHJNr9hTatihw/exec") {
      try {
        await fetch(GOOGLE_SHEET_WEBAPP_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(novaReserva)
        });
      } catch (sheetError) {
        console.error("Erro ao sincronizar com o Google Sheets:", sheetError);
      }
    }

    return NextResponse.json(novaReserva, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Erro ao processar reserva.' }, { status: 500 });
  }
}