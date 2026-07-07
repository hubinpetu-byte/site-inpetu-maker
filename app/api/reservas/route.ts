import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxk_jrRD3EvTd0SCf7h37LjcQQ0hTXq-g5D6Tx3iGFXwNabv--ZiguA6CHJNr9hTatihw/exec";

// Cache local na memória do servidor Node/Next para garantir que as reservas fiquem salvas instantaneamente
// mesmo que o Google Sheets demore 10 segundos para responder.
let cacheTemporarioReservas: any[] = [];

// 📅 GET: Retorna as reservas buscando do Sheets + Memória Local
export async function GET() {
  try {
    let reservasSheets: any[] = [];

    if (GOOGLE_SHEET_WEBAPP_URL) {
      try {
        const resposta = await fetch(GOOGLE_SHEET_WEBAPP_URL, { 
          redirect: 'follow',
          cache: 'no-store',
          headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' }
        });
        
        if (resposta.ok) {
          const dadosBrutos = await resposta.json();
          if (Array.isArray(dadosBrutos)) {
            reservasSheets = dadosBrutos.map((r: any) => {
              let d = String(r.data_reserva || '').trim();
              if (d.includes('/')) {
                const p = d.split('/');
                if (p.length === 3) d = `${p[2]}-${p[1].padStart(2, '0')}-${p[0].padStart(2, '0')}`;
              } else if (d.includes('T')) {
                d = d.split('T')[0];
              }
              return {
                id: String(r.id || ''),
                maquina_unidade: Number(r.maquina_unidade),
                data_reserva: d,
                horario_inicio: String(r.horario_inicio || '').trim(),
                horario_fim: String(r.horario_fim || '').trim()
              };
            });
          }
        }
      } catch (e) {
        console.error("Aviso: Falha ao ler do Sheets, usando cache local temporário.", e);
      }
    }

    // Une as reservas do Sheets com as criadas localmente nesta sessão (removendo duplicados por ID)
    const todas = [...cacheTemporarioReservas, ...reservasSheets];
    const unicas = todas.filter((item, index, self) =>
      index === self.findIndex((t) => t.id === item.id)
    );

    return NextResponse.json(unicas);
  } catch (error) {
    return NextResponse.json([]);
  }
}

// 💾 POST: Bloqueia na hora se houver sobreposição e salva no banco
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { maquina_unidade, data_reserva, horario_inicio, horario_fim, usuario_nome, usuario_email } = body;

    // 1. Puxa a lista atualizada para garantir a checagem em tempo real
    let listaParaComparar = [...cacheTemporarioReservas];
    if (GOOGLE_SHEET_WEBAPP_URL) {
      try {
        const res = await fetch(GOOGLE_SHEET_WEBAPP_URL, { redirect: 'follow', cache: 'no-store' });
        if (res.ok) {
          const brutos = await res.json();
          if (Array.isArray(brutos)) {
            const limpos = brutos.map((r: any) => {
              let d = String(r.data_reserva || '').trim();
              if (d.includes('/')) {
                const p = d.split('/');
                if (p.length === 3) d = `${p[2]}-${p[1].padStart(2, '0')}-${p[0].padStart(2, '0')}`;
              } else if (d.includes('T')) {
                d = d.split('T')[0];
              }
              return { ...r, maquina_unidade: Number(r.maquina_unidade), data_reserva: d };
            });
            listaParaComparar = [...listaParaComparar, ...limpos];
          }
        }
      } catch (e) {}
    }

    // 2. Validação matemática estrita de colisão de horários
    const temConflito = listaParaComparar.some((r: any) => 
      Number(r.maquina_unidade) === Number(maquina_unidade) &&
      String(r.data_reserva) === String(data_reserva) &&
      ((horario_inicio >= r.horario_inicio && horario_inicio < r.horario_fim) ||
       (horario_fim > r.horario_inicio && horario_fim <= r.horario_fim) ||
       (horario_inicio <= r.horario_inicio && horario_fim >= r.horario_fim))
    );

    if (temConflito) {
      return NextResponse.json({ error: 'Este horário já foi reservado por outra pessoa!' }, { status: 400 });
    }

    // 3. Cria o registro definitivo da nova reserva
    const novaReserva = {
      id: "res_" + Math.random().toString(36).substring(2, 11),
      maquina_unidade: Number(maquina_unidade),
      usuario_nome,
      usuario_email,
      data_reserva,
      horario_inicio,
      horario_fim,
      created_at: new Date().toISOString()
    };

    // Alimenta o cache de memória local imediatamente para travar o próximo GET
    cacheTemporarioReservas.push(novaReserva);

    // 4. Sincroniza em segundo plano com o Google Sheets
    if (GOOGLE_SHEET_WEBAPP_URL) {
      fetch(GOOGLE_SHEET_WEBAPP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(novaReserva),
        redirect: 'follow'
      }).catch(err => console.error("Erro assíncrono ao gravar no Sheets:", err));
    }

    return NextResponse.json(novaReserva, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}