'use client';

type User = {
  name: string;
  role: string;
  avatarUrl: string;
  tags: { label: string; type: string }[];
  stats: {
    visits: number;
    workshops: number;
    hours: number;
  };
  access: {
    name: string;
    icon: string;
    enabled: boolean;
  }[];
  reservations: {
    date: string;
    machine: string;
    status: 'pendente' | 'concluido';
  }[];
};

export default function PerfilPage() {
  const user: User = {
    name: 'Armando Albertazzi',
    role: 'perfil acadêmico',
    avatarUrl: '/avatar.png',

    tags: [
      { label: 'facilitador maker', type: 'azul' },
      { label: 'incentivador de boas práticas', type: 'amarelo' }
    ],

    stats: {
      visits: 13,
      workshops: 2,
      hours: 52
    },

    access: [
      { name: 'Impressão 3D FDM', icon: '/icons/3d.png', enabled: true },
      { name: 'Corte à laser', icon: '/icons/laser.png', enabled: false },
      { name: 'Router CNC', icon: '/icons/cnc.png', enabled: true }
    ],

    reservations: [
      {
        date: '30/10/25',
        machine: 'Corte à laser',
        status: 'pendente'
      },
      {
        date: '31/08/25',
        machine: 'Impressora 3D FDM',
        status: 'concluido'
      }
    ]
  };

  return (
    <main className="perfil-container">
      <section className="perfil-topo">
        <div className="perfil-avatar">
          <img src={user.avatarUrl} alt="Avatar" />
          <span className="badge-exemplar">⭐ Usuário exemplar</span>
        </div>

        <div className="perfil-info">
          <h1>{user.name}</h1>
          <p>{user.role}</p>

          <div className="perfil-tags">
            {user.tags.map((tag, i) => (
              <span key={i} className={`tag ${tag.type}`}>
                {tag.label}
              </span>
            ))}
          </div>

          <div className="perfil-stats">
            <div>{user.stats.visits} visitas</div>
            <div>{user.stats.workshops} workshops</div>
            <div>{user.stats.hours} horas</div>
          </div>
        </div>
      </section>
    </main>
  );
}
