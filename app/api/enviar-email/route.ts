import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// 🚀 Inicializa o Resend. No futuro você pode usar uma chave própria cadastrada no site do Resend.
const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

export async function POST(request: Request) {
  try {
    // 1. Recebe os dados enviados pelo formulário do site
    const body = await request.json();
    const { emailAluno, nomeAluno, turmaData, treinamentoNome } = body;

    // 2. Dispara o e-mail com layout formatado
    const data = await resend.emails.send({
      from: 'InPETU Maker <onboarding@resend.dev>', // E-mail de testes padrão do Resend
      to: [emailAluno],
      subject: `Inscrição Confirmada: ${treinamentoNome} - InPETU Maker`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #191F37; padding: 24px; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 16px;">
          <h2 style="color: #0077CC; font-size: 20px; margin-bottom: 8px;">Olá, ${nomeAluno}! 👋</h2>
          <p style="font-size: 14px; color: #475569; leading-height: 1.6;">
            Sua vaga no treinamento técnico <strong>${treinamentoNome}</strong> foi confirmada com sucesso no <strong>InPETU Maker</strong>!
          </p>
          
          <div style="background-color: #F8FAFC; border-left: 4px solid #0077CC; padding: 16px; margin: 20px 0; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #191F37;"><strong>Turma Agendada:</strong> ${turmaData}</p>
            <p style="margin: 6px 0 0 0; font-size: 14px; color: #191F37;"><strong>Local:</strong> Laboratório InPETU Maker</p>
          </div>

          <p style="font-size: 12px; color: #94A3B8; margin-top: 24px; line-height: 1.5;">
            * Lembre-se de comparecer no horário marcado. Após a realização da aula, a sua permissão de uso da máquina será liberada automaticamente no seu perfil!
          </p>
        </div>
      `
    });

    return NextResponse.json({ sucesso: true, data });
  } catch (error) {
    console.error("Erro ao enviar e-mail de confirmação:", error);
    return NextResponse.json({ erro: "Falha ao enviar e-mail" }, { status: 500 });
  }
}