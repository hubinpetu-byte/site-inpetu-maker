// 📁 Arquivo: site_inpetumaker_v2/lib/precificacao.ts

export interface ResultadoPrecificacao {
  precoFinal: number;
  porcentagemDesconto: number;
  tagStatus: string;
}

export function calcularPrecoReserva(
  precoBase: number, 
  tipoUsuario: string, 
  complexidadeAlta: boolean = false
): ResultadoPrecificacao {
  // Padroniza para caixa baixa evitando divergências de digitação
  const tipo = (tipoUsuario || "").toLowerCase();

  let fator = 1.0;
  let tagStatus = "";

  if (tipo.includes("aluno")) {
    // 🎓 Aluno UFSC: Fixado sempre em 50% do preço base (Subsidiado)
    fator = 0.5; 
    tagStatus = "50% de Desconto (Aluno UFSC)";
  } 
  else if (tipo.includes("professor") || tipo.includes("pesquisador")) {
    // 🔬 Professor / Pesquisador: Projeto Financiado (60% a 100%)
    fator = complexidadeAlta ? 1.0 : 0.6;
    tagStatus = "Tarifa Projeto/Pesquisa";
  } 
  else if (tipo.includes("empresa")) {
    // 🏢 Empresa / Sapiens Parque: (60% a 100%)
    fator = complexidadeAlta ? 1.0 : 0.8;
    tagStatus = "Tarifa Empresa / Sapiens";
  } 
  else {
    // 🌐 Comunidade / Usuários Externos: (100% a 120%)
    fator = complexidadeAlta ? 1.2 : 1.0;
    tagStatus = complexidadeAlta ? "Tarifa Externa (+20% Complexidade)" : "Tarifa Comunidade";
  }

  const precoFinal = precoBase * fator;
  const porcentagemDesconto = Math.round((1 - fator) * 100);

  return {
    precoFinal,
    porcentagemDesconto,
    tagStatus
  };
}