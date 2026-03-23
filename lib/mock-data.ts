// Mock data used as fallback when the database is not yet configured
export const MOCK_PROFESSIONALS = [
  {
    id: "mock-1",
    userId: "pro-user-1",
    bio: "Profissional com mais de 10 anos de experiência em limpeza residencial. Trabalho com dedicação e atenção aos detalhes, garantindo que cada ambiente fique impecável.",
    services: ["Faxina", "Passadeira", "Organização"],
    hourlyRate: 45,
    city: "São Paulo",
    neighborhood: "Pinheiros",
    rating: 4.8,
    reviewCount: 32,
    available: true,
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
    createdAt: "2024-01-15T10:00:00Z",
    user: { name: "Ana Souza", image: null },
  },
  {
    id: "mock-2",
    userId: "pro-user-2",
    bio: "Cozinheira profissional especializada em culinária brasileira e internacional. Preparo refeições saudáveis e saborosas para toda a família.",
    services: ["Cozinha", "Faxina"],
    hourlyRate: 60,
    city: "São Paulo",
    neighborhood: "Vila Mariana",
    rating: 4.9,
    reviewCount: 45,
    available: true,
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    createdAt: "2024-02-10T10:00:00Z",
    user: { name: "Cláudia Oliveira", image: null },
  },
  {
    id: "mock-3",
    userId: "pro-user-3",
    bio: "Babá experiente e carinhosa. Formada em pedagogia, cuido de crianças de todas as idades com muito amor e responsabilidade.",
    services: ["Babá", "Cuidadora de Idosos"],
    hourlyRate: 55,
    city: "São Paulo",
    neighborhood: "Moema",
    rating: 5.0,
    reviewCount: 28,
    available: true,
    photo: "https://randomuser.me/api/portraits/women/3.jpg",
    createdAt: "2024-03-05T10:00:00Z",
    user: { name: "Fernanda Costa", image: null },
  },
  {
    id: "mock-4",
    userId: "pro-user-4",
    bio: "Especialista em organização de ambientes e personal organizer. Transformo espaços caóticos em ambientes funcionais e harmoniosos.",
    services: ["Organização", "Faxina", "Lavadeira"],
    hourlyRate: 70,
    city: "São Paulo",
    neighborhood: "Jardins",
    rating: 4.7,
    reviewCount: 19,
    available: true,
    photo: "https://randomuser.me/api/portraits/women/4.jpg",
    createdAt: "2024-04-12T10:00:00Z",
    user: { name: "Juliana Mendes", image: null },
  },
  {
    id: "mock-5",
    userId: "pro-user-5",
    bio: "Passadeira profissional com experiência em todos os tipos de tecidos. Trabalho com ferro e máquinas industriais.",
    services: ["Passadeira", "Lavadeira"],
    hourlyRate: 40,
    city: "São Paulo",
    neighborhood: "Itaim Bibi",
    rating: 4.6,
    reviewCount: 22,
    available: true,
    photo: "https://randomuser.me/api/portraits/women/5.jpg",
    createdAt: "2024-05-20T10:00:00Z",
    user: { name: "Luciana Pereira", image: null },
  },
  {
    id: "mock-6",
    userId: "pro-user-6",
    bio: "Faxineira dedicada e pontual. Trabalho com produtos de qualidade e tenho experiência em apartamentos e casas grandes.",
    services: ["Faxina", "Cozinha", "Passadeira", "Lavadeira"],
    hourlyRate: 50,
    city: "São Paulo",
    neighborhood: "Perdizes",
    rating: 4.5,
    reviewCount: 37,
    available: true,
    photo: "https://randomuser.me/api/portraits/women/6.jpg",
    createdAt: "2024-06-08T10:00:00Z",
    user: { name: "Mariana Alves", image: null },
  },
  {
    id: "mock-7",
    userId: "pro-user-7",
    bio: "Jardineira apaixonada por plantas. Cuido de jardins, varandas e hortas urbanas com técnicas sustentáveis.",
    services: ["Jardinagem", "Organização"],
    hourlyRate: 50,
    city: "São Paulo",
    neighborhood: "Vila Madalena",
    rating: 4.9,
    reviewCount: 15,
    available: true,
    photo: "https://randomuser.me/api/portraits/women/7.jpg",
    createdAt: "2024-07-14T10:00:00Z",
    user: { name: "Patricia Rocha", image: null },
  },
  {
    id: "mock-8",
    userId: "pro-user-8",
    bio: "Cuidadora de idosos com formação em enfermagem. Ofereço companhia, auxílio em atividades diárias e acompanhamento a consultas.",
    services: ["Cuidadora de Idosos", "Cozinha"],
    hourlyRate: 65,
    city: "São Paulo",
    neighborhood: "Consolação",
    rating: 4.8,
    reviewCount: 41,
    available: true,
    photo: "https://randomuser.me/api/portraits/women/8.jpg",
    createdAt: "2024-08-22T10:00:00Z",
    user: { name: "Regina Santos", image: null },
  },
  {
    id: "mock-9",
    userId: "pro-user-9",
    bio: "Profissional multitarefas com experiência em faxina, cozinha e organização. Atendo famílias na zona norte de SP.",
    services: ["Faxina", "Cozinha", "Organização"],
    hourlyRate: 45,
    city: "São Paulo",
    neighborhood: "Santana",
    rating: 4.3,
    reviewCount: 12,
    available: true,
    photo: "https://randomuser.me/api/portraits/women/9.jpg",
    createdAt: "2024-09-10T10:00:00Z",
    user: { name: "Sandra Lima", image: null },
  },
  {
    id: "mock-10",
    userId: "pro-user-10",
    bio: "Lavadeira profissional com lavanderia própria. Busco e entrego as roupas no seu endereço. Cuidado especial com peças delicadas.",
    services: ["Lavadeira", "Passadeira"],
    hourlyRate: 35,
    city: "São Paulo",
    neighborhood: "Tatuapé",
    rating: 4.4,
    reviewCount: 27,
    available: true,
    photo: "https://randomuser.me/api/portraits/women/10.jpg",
    createdAt: "2024-10-03T10:00:00Z",
    user: { name: "Teresa Ribeiro", image: null },
  },
  {
    id: "mock-11",
    userId: "pro-user-11",
    bio: "Babá e cozinheira. Cuido das crianças e preparo as refeições da família. Experiência de 8 anos com famílias na zona oeste.",
    services: ["Babá", "Cozinha"],
    hourlyRate: 55,
    city: "São Paulo",
    neighborhood: "Lapa",
    rating: 4.7,
    reviewCount: 33,
    available: false,
    photo: "https://randomuser.me/api/portraits/women/11.jpg",
    createdAt: "2024-11-18T10:00:00Z",
    user: { name: "Vera Nascimento", image: null },
  },
  {
    id: "mock-12",
    userId: "pro-user-12",
    bio: "Profissional completa com experiência em faxina pesada e limpeza pós-obra. Trabalho rápido e eficiente.",
    services: ["Faxina", "Jardinagem"],
    hourlyRate: 48,
    city: "São Paulo",
    neighborhood: "Butantã",
    rating: 4.6,
    reviewCount: 20,
    available: true,
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    createdAt: "2024-12-01T10:00:00Z",
    user: { name: "Zilda Ferreira", image: null },
  },
];

export const MOCK_REVIEWS: Record<string, Array<{
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  author: { name: string; image: string | null };
}>> = {
  "mock-1": [
    { id: "r1", rating: 5, comment: "Ana é maravilhosa! Minha casa ficou brilhando. Super pontual e cuidadosa.", createdAt: "2024-11-10T14:00:00Z", author: { name: "Maria Silva", image: "https://randomuser.me/api/portraits/women/44.jpg" } },
    { id: "r2", rating: 5, comment: "Excelente profissional, muito organizada e atenciosa com todos os detalhes.", createdAt: "2024-10-20T10:00:00Z", author: { name: "João Santos", image: null } },
    { id: "r3", rating: 4, comment: "Muito boa! Só demorou um pouquinho mais que o combinado, mas o resultado ficou ótimo.", createdAt: "2024-09-15T16:00:00Z", author: { name: "Carla Mendes", image: null } },
  ],
  "mock-2": [
    { id: "r4", rating: 5, comment: "A comida da Cláudia é divina! Preparou um almoço incrível para minha família.", createdAt: "2024-12-01T12:00:00Z", author: { name: "Maria Silva", image: "https://randomuser.me/api/portraits/women/44.jpg" } },
    { id: "r5", rating: 5, comment: "Melhor cozinheira que já contratei. Tudo muito saboroso e bem apresentado.", createdAt: "2024-11-15T09:00:00Z", author: { name: "Ana Paula", image: null } },
  ],
  "mock-3": [
    { id: "r6", rating: 5, comment: "Fernanda é incrível com as crianças! Meu filho adora quando ela vem.", createdAt: "2024-12-05T15:00:00Z", author: { name: "Maria Silva", image: "https://randomuser.me/api/portraits/women/44.jpg" } },
    { id: "r7", rating: 5, comment: "Muito responsável e carinhosa. Me sinto segura deixando meus filhos com ela.", createdAt: "2024-11-28T11:00:00Z", author: { name: "Luciana Costa", image: null } },
  ],
};

export function getMockProfessionalById(id: string) {
  const pro = MOCK_PROFESSIONALS.find((p) => p.id === id);
  if (!pro) return null;
  return {
    ...pro,
    reviewCount: MOCK_REVIEWS[id]?.length ?? pro.reviewCount,
    reviews: MOCK_REVIEWS[id] ?? [],
    _count: { reviews: MOCK_REVIEWS[id]?.length ?? 0 },
  };
}

export function filterMockProfessionals(params: {
  service?: string;
  neighborhood?: string;
  minRating?: number;
  q?: string;
}) {
  let results = MOCK_PROFESSIONALS.filter((p) => p.available);

  if (params.service) {
    results = results.filter((p) => p.services.includes(params.service!));
  }
  if (params.neighborhood) {
    results = results.filter(
      (p) => p.neighborhood.toLowerCase() === params.neighborhood!.toLowerCase()
    );
  }
  if (params.minRating !== undefined) {
    results = results.filter((p) => p.rating >= params.minRating!);
  }
  if (params.q) {
    const q = params.q.toLowerCase();
    results = results.filter(
      (p) =>
        p.user.name.toLowerCase().includes(q) ||
        p.bio.toLowerCase().includes(q)
    );
  }

  return results.sort((a, b) => b.rating - a.rating);
}
