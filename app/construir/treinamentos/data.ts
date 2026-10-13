// Interface para garantir que todo treinamento siga o mesmo padrão no TypeScript
export interface Treinamento {
  id: string;
  titulo: string;
  categoria: string;
  status: "Inscrições Abertas" | "Não iniciado" | "Em Breve" | "Vagas Esgotadas" | "Em Andamento" | "Concluído";
  descricao: string;
  duracao: string;
  nivel: string;
  imagem: string;
  linkAgendamento: string;
  dataRealizacao?: string; // Ex: "Fevereiro / 2026"
  ativo: boolean; // Controla se o treinamento aparece ou não na lista pública!
}

// 🚀 Lista Padrão de Treinamentos Técnicos do InPETU Maker (Fallback local)
export const treinamentosData: Treinamento[] = [
  {
    id: "impressao-3d",
    titulo: "Introdução à Impressão 3D",
    categoria: "Fabricação Digital",
    status: "Inscrições Abertas",
    descricao: "Aprenda os fundamentos da impressão 3D FDM. Nesse treinamento você aprende a preparar o arquivo para impressão e como operar a máquina, tornando-se autônomo no uso.",
    duracao: "2h 0m",
    nivel: "Iniciante",
    imagem: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600",
    linkAgendamento: "/construir/treinamentos/Impressao-3d-fdm",
    ativo: true
  },
  {
    id: "cortadora-laser",
    titulo: "Cortadora Laser Segurança e Básicos",
    categoria: "Fabricação Digital",
    status: "Não iniciado",
    descricao: "Treinamento de segurança inicial para operar a máquina cortadora a laser. Os tópicos incluem materiais, riscos, pré-uso e pós-uso do equipamento.",
    duracao: "1h 30m",
    nivel: "Iniciante",
    imagem: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600",
    linkAgendamento: "/construir/corte-laser",
    ativo: true
  },
  {
    id: "router-cnc",
    titulo: "Fundamentos da Router CNC",
    categoria: "Fabricação Digital",
    status: "Não iniciado",
    descricao: "Um treinamento mão na massa para aprender na prática como operar a máquina e preparar o arquivo no sistema próprio. Vamos visitar questões de segurança e regras do laboratório.",
    duracao: "3h 0m",
    nivel: "Iniciante",
    imagem: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=600",
    linkAgendamento: "/construir/router-cnc",
    ativo: true
  },

  // 🚀 EXEMPLO DE TURMA CONCLUÍDA NO HISTÓRICO
  {
    id: "impressao-3d-turma-jan26",
    titulo: "Introdução à Impressão 3D (Turma Jan/26)",
    categoria: "Fabricação Digital",
    status: "Concluído",
    descricao: "Turma de capacitação inicial realizada com sucesso para estudantes e pesquisadores da UFSC.",
    duracao: "2h 0m",
    nivel: "Iniciante",
    imagem: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600",
    linkAgendamento: "#",
    dataRealizacao: "28 de Janeiro de 2026",
    ativo: true
  }
];