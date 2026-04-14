// constants/eventos.ts

export type Evento = {
  dia: number;
  mes: number; // 1 a 12
  ano: number;
  nome: string;
  tipo: 'workshop' | 'treinamento' | 'evento';
  href: string;
  descricao?: string;
};

export const LISTA_DE_EVENTOS: Evento[] = [
   { 
    dia: 12, mes: 6, ano: 2026, 
    nome: "Workshop - Modelos de Impressão 3D com uso de IA", 
    tipo: "workshop", 
    href: "/contato",
    descricao: "Workshop ministrado para a turma de Medologia de Projeto do Curso de Design de Produto na UFSC"
  },
    { 
    dia: 30, mes: 3, ano: 2026, 
    nome: "Workshop Desafio de um Maker Space", 
    tipo: "workshop", 
    href: "https://www.sympla.com.br/evento/dia-mundial-da-criatividade-sapiens-parque-connect/3386181",
    descricao: "Programação completa no Passeio Sapiens, com Roda de conversa maker e workshops"
  },
  { 
    dia: 21, mes: 4, ano: 2026, 
    nome: "World Creativity Day", 
    tipo: "evento", 
    href: "/contato",
    descricao: "Programação completa no Passeio Sapiens, com Roda de conversa maker e workshops"
  },
];