// src/app/construir/equipamentos/data.ts

export const detalhesEquipamentos: Record<string, any> = {
  "Impressora 3D FDM": {
    tags: ["Mesanino", "Necessário treinamento"],
    descricao: "Utilizada para a fabricação de protótipos por meio da deposição de filamento termoplástico, permitindo rápida materialização de modelos tridimensionais.",
    marca: "Bambu lab",
    modelo: "X1-Carbon",
    volume: "256 x 256 x 256 (mm)",
    softwares: "Bambu Studio",
    materiais: ["PLA", "ABS", "PETG", "TPU"],
    uso: "Este dispositivo pode ser utilizado de forma autônoma; para isso, é necessário concluir o treinamento de segurança 'Impressora 3D: Impressora de Filamento' e a duração é de aproximadamente 30 a 60 minutos.",
    risco: "A cabeça de impressão pode atingir temperaturas de até 280°C durante a operação ou na fase de aquecimento/resfriamento, e a cama de impressão pode atingir temperaturas de até 140°C. Portanto, nunca coloque a mão na área de construção.",
    nivelRisco: 1
  },
  "Serra fita de bancada": {
    tags: ["Marcenaria", "Treinamento de Segurança"],
    descricao: "Utilizada para o corte de materiais como madeira, plásticos e chapas, permitindo cortes retos ou curvos com maior controle e precisão.",
    marca: "Makita",
    modelo: "Serra de Fita LB1200F",
    volume: "560 mm x 400 mm",
    softwares: "Não necessário",
    materiais: ["Madeiras", "MDF", "Compensados", "Plásticos"],
    uso: "A utilização pode ser realizada de forma autônoma apenas por usuários que tenham concluído o treinamento específico e estejam familiarizados com os procedimentos de segurança e operação do equipamento..",
    risco: "A operação da serra fita envolve uma lâmina de corte contínua em movimento, apresentando risco de cortes graves em caso de contato direto. Há também risco de projeção de partículas, aprisionamento de mãos ou roupas e ruído durante a operação, sendo obrigatório o uso de EPIs e o cumprimento rigoroso dos procedimentos de segurança.",
    nivelRisco: 5},

  "Torno Mecânico": {
    tags: ["Oficina", "Uso Supervisionado"],
    descricao: "Utilizado para a fabricação e acabamento de peças cilíndricas por meio da rotação do material e do uso de ferramentas de corte.",
    marca: "Marca Exemplo",
    modelo: "Modelo XYZ",
    volume: "N/A",
    softwares: "N/A",
    materiais: ["Aço", "Alumínio", "Latão"],
    uso: "O uso do torno requer obrigatoriamente o acompanhamento de um técnico responsável e uso de EPIs completos.",
    risco: "Risco de estilhaços e partes móveis. Mantenha o cabelo preso e não utilize roupas folgadas ou acessórios como anéis.",
    nivelRisco: 3
  },

  "Gravação Laser por Fibra": {
    tags: ["Mesanino", "Necessário treinamento"],
    descricao: "Utilizada para a gravação permanente de textos, imagens e marcações técnicas em superfícies metálicas e alguns plásticos, por meio de feixe de laser de alta precisão.",
    marca: "DUE",
    modelo: "DUE Pulsa",
    volume: "N/A",
    softwares: "N/A",
    materiais: ["Aço", "Alumínio", "Latão", "Verificar Plásticos Compatíveis"],
    uso: "A utilização pode ser realizada de forma autônoma apenas por usuários que tenham concluído o treinamento específico e estejam familiarizados com os procedimentos de segurança.",
    risco: "A operação do laser de fibra envolve emissão de feixe laser de alta intensidade e luz intensa, com risco de danos à visão e à pele em caso de exposição inadequada. Também podem ser gerados vapores durante a gravação dos materiais, sendo obrigatório o uso de EPIs e a adoção de medidas de proteção e ventilação adequadas.",
    nivelRisco: 4
  },

    "Serra Esquadria": {
    tags: ["Marcenaria"],
    descricao: "Utilizada para o corte preciso de materiais em ângulos retos ou inclinados, sendo ideal para acabamento e montagem de estruturas e componentes.",
    marca: "Bosch",
    modelo: "GCM254D",
    volume: "N/A",
    softwares: "N/A",
    materiais: ["Madeiras", "MDF", "Compensados", "Plásticos"],
    uso: "A utilização pode ser realizada de forma autônoma apenas por usuários que tenham concluído o treinamento específico e sigam rigorosamente os procedimentos de segurança.",
    risco: "A serra esquadria possui disco de corte em alta rotação, apresentando risco de cortes graves em caso de contato direto. Há também risco de projeção de partículas e ruído elevado durante a operação, sendo obrigatório o uso de EPIs e atenção total ao manuseio.",
    nivelRisco: 5   },

  "Cortadora Laser": {
    tags: ["Mesanino", "Necessário treinamento"],
    descricao: "Utilizada para o corte e a gravação de materiais por meio de laser, permitindo a produção precisa de peças, componentes e elementos gráficos a partir de arquivos digitais.",
    marca: "DUE",
    modelo: "DUE Max",
    volume: "960 x 1530 x 305 (mm)",
    softwares: "DUE Studio",
    materiais: ["Madeiras", "Tecido e Couro", "Acrílico", "Papéis"],
    uso: "Este dispositivo pode ser utilizado de forma autônoma; para isso, é necessário concluir o treinamento de segurança 'Corte a Laser' e a duração é de aproximadamente 60 minutos.",
    risco: "O equipamento opera com feixe de laser de alta potência e temperaturas elevadas, podendo gerar gases e vapores durante o corte dos materiais. A luz intensa e o calor representam risco de queimaduras e danos à visão, exigindo o uso de EPIs e ventilação adequada.",
    nivelRisco: 4}
    
    
};