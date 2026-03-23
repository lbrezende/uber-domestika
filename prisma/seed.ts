import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data in reverse dependency order
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.review.deleteMany();
  await prisma.professional.deleteMany();
  await prisma.user.deleteMany();

  // ── 1. Mock client user ──────────────────────────────────────────────
  const clientUser = await prisma.user.create({
    data: {
      id: "user-1",
      name: "Maria Silva",
      email: "maria@example.com",
      role: UserRole.CLIENT,
    },
  });

  // ── 2. Professional data ─────────────────────────────────────────────
  const professionals = [
    {
      userId: "user-pro-1",
      name: "Ana Souza",
      email: "ana.souza@example.com",
      bio: "Trabalho com faxina residencial há mais de 10 anos. Sou detalhista, organizada e tenho experiência com todos os tipos de residência. Atendo casas e apartamentos na zona oeste de São Paulo.",
      services: ["Faxina", "Organização", "Passadeira"],
      hourlyRate: 55,
      neighborhood: "Pinheiros",
      rating: 4.8,
      reviewCount: 3,
      photo: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      userId: "user-pro-2",
      name: "Cláudia Oliveira",
      email: "claudia.oliveira@example.com",
      bio: "Cozinheira profissional com formação em gastronomia. Preparo refeições saudáveis, marmitas congeladas e cardápios personalizados para famílias. Experiência de 8 anos em residências de alto padrão.",
      services: ["Cozinha", "Organização"],
      hourlyRate: 70,
      neighborhood: "Vila Mariana",
      rating: 4.9,
      reviewCount: 4,
      photo: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      userId: "user-pro-3",
      name: "Fernanda Costa",
      email: "fernanda.costa@example.com",
      bio: "Babá experiente com curso de primeiros socorros e pedagogia infantil. Cuido de crianças de todas as idades com muito carinho e responsabilidade. Referências disponíveis.",
      services: ["Babá", "Cuidadora de Idosos", "Cozinha"],
      hourlyRate: 50,
      neighborhood: "Moema",
      rating: 4.7,
      reviewCount: 3,
      photo: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      userId: "user-pro-4",
      name: "Juliana Pereira",
      email: "juliana.pereira@example.com",
      bio: "Profissional de limpeza e organização com especialização em método KonMari. Transformo ambientes bagunçados em espaços funcionais e acolhedores. Atendo zona sul e centro.",
      services: ["Faxina", "Organização", "Lavadeira", "Passadeira"],
      hourlyRate: 60,
      neighborhood: "Jardins",
      rating: 4.5,
      reviewCount: 3,
      photo: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      userId: "user-pro-5",
      name: "Luciana Santos",
      email: "luciana.santos@example.com",
      bio: "Cuidadora de idosos com experiência em acompanhamento hospitalar e domiciliar. Formação técnica em enfermagem e muita paciência para lidar com pessoas da terceira idade.",
      services: ["Cuidadora de Idosos", "Cozinha"],
      hourlyRate: 65,
      neighborhood: "Itaim Bibi",
      rating: 5.0,
      reviewCount: 2,
      photo: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      userId: "user-pro-6",
      name: "Patricia Lima",
      email: "patricia.lima@example.com",
      bio: "Passadeira profissional há 12 anos. Trabalho com todos os tipos de tecido, incluindo roupas sociais e peças delicadas. Também faço pequenos reparos em costuras.",
      services: ["Passadeira", "Lavadeira", "Faxina"],
      hourlyRate: 40,
      neighborhood: "Perdizes",
      rating: 4.3,
      reviewCount: 3,
      photo: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      userId: "user-pro-7",
      name: "Renata Almeida",
      email: "renata.almeida@example.com",
      bio: "Diarista dedicada e pontual. Faço faxina completa, lavo e passo roupas. Tenho disponibilidade para atender de segunda a sábado na região da Consolação e arredores.",
      services: ["Faxina", "Lavadeira", "Passadeira"],
      hourlyRate: 45,
      neighborhood: "Consolação",
      rating: 4.1,
      reviewCount: 3,
      photo: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      userId: "user-pro-8",
      name: "Sandra Rodrigues",
      email: "sandra.rodrigues@example.com",
      bio: "Jardineira com conhecimento em plantas ornamentais, hortas urbanas e manutenção de jardins. Faço podas, plantio e cuidados gerais com áreas verdes residenciais.",
      services: ["Jardinagem", "Organização"],
      hourlyRate: 55,
      neighborhood: "Santana",
      rating: 4.6,
      reviewCount: 3,
      photo: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      userId: "user-pro-9",
      name: "Tatiane Ferreira",
      email: "tatiane.ferreira@example.com",
      bio: "Lavadeira e passadeira profissional. Trabalho com lavagem à mão de peças delicadas e tenho experiência com enxovais e roupas de cama de alta qualidade.",
      services: ["Lavadeira", "Passadeira"],
      hourlyRate: 35,
      neighborhood: "Tatuapé",
      rating: 3.8,
      reviewCount: 2,
      photo: "https://randomuser.me/api/portraits/women/9.jpg",
    },
    {
      userId: "user-pro-10",
      name: "Vanessa Martins",
      email: "vanessa.martins@example.com",
      bio: "Profissional multifuncional com experiência em faxina, cozinha e cuidado de crianças. Sou proativa, organizada e adoro deixar a casa impecável. Atendo a região da Lapa.",
      services: ["Faxina", "Cozinha", "Babá", "Organização"],
      hourlyRate: 50,
      neighborhood: "Lapa",
      rating: 4.4,
      reviewCount: 3,
      photo: "https://randomuser.me/api/portraits/women/10.jpg",
    },
    {
      userId: "user-pro-11",
      name: "Débora Nascimento",
      email: "debora.nascimento@example.com",
      bio: "Cozinheira e organizadora de eventos pequenos. Preparo refeições para o dia a dia e também para ocasiões especiais. Tenho experiência com culinária brasileira e internacional.",
      services: ["Cozinha", "Organização", "Faxina"],
      hourlyRate: 75,
      neighborhood: "Butantã",
      rating: 4.7,
      reviewCount: 4,
      photo: "https://randomuser.me/api/portraits/women/11.jpg",
    },
    {
      userId: "user-pro-12",
      name: "Gabriela Ribeiro",
      email: "gabriela.ribeiro@example.com",
      bio: "Babá e cuidadora com mais de 6 anos de experiência. Tenho formação em pedagogia e adoro criar atividades educativas para as crianças. Disponível para período integral.",
      services: ["Babá", "Cuidadora de Idosos", "Cozinha", "Organização"],
      hourlyRate: 55,
      neighborhood: "Vila Madalena",
      rating: 3.5,
      reviewCount: 2,
      photo: "https://randomuser.me/api/portraits/women/12.jpg",
    },
  ];

  // Create all professional users + profiles in a transaction
  const createdProfessionals = await prisma.$transaction(
    professionals.map((p) =>
      prisma.user.create({
        data: {
          id: p.userId,
          name: p.name,
          email: p.email,
          image: p.photo,
          role: UserRole.PROFESSIONAL,
          professional: {
            create: {
              bio: p.bio,
              services: p.services,
              hourlyRate: p.hourlyRate,
              city: "São Paulo",
              neighborhood: p.neighborhood,
              rating: p.rating,
              reviewCount: p.reviewCount,
              photo: p.photo,
              available: true,
            },
          },
        },
        include: { professional: true },
      })
    )
  );

  // ── 3. Reviews ───────────────────────────────────────────────────────
  // Helper to generate ratings close to the professional's average
  function ratingsForPro(avg: number, count: number): number[] {
    const base = Math.round(avg);
    const ratings: number[] = [];
    for (let i = 0; i < count; i++) {
      // Alternate between base and base-1 / base to stay near the average
      if (i % 2 === 0) {
        ratings.push(Math.min(5, base));
      } else {
        ratings.push(Math.max(1, base - 1));
      }
    }
    return ratings;
  }

  const reviewComments: string[][] = [
    [
      "Excelente profissional! A casa ficou impecável, super recomendo.",
      "Muito pontual e caprichosa. Fez um trabalho maravilhoso na limpeza.",
      "Adorei o serviço, voltarei a contratar com certeza.",
    ],
    [
      "A comida ficou deliciosa! Preparou tudo com muito carinho e organização.",
      "Profissional incrível, fez um cardápio semanal perfeito para minha família.",
      "Cozinha muito bem e é super higiênica. Nota máxima!",
      "As marmitas ficaram excelentes. Variedade e sabor incomparáveis.",
    ],
    [
      "Meus filhos adoraram a Fernanda. Muito carinhosa e responsável.",
      "Cuidou da minha mãe com muita dedicação. Profissional de confiança.",
      "Super atenciosa e paciente com as crianças. Recomendo muito!",
    ],
    [
      "Organizou minha casa inteira em um dia! Resultado impressionante.",
      "Ótima profissional, a casa ficou brilhando depois da faxina.",
      "Fez um excelente trabalho com as roupas. Tudo bem passado e organizado.",
    ],
    [
      "Cuidou do meu pai com muita paciência e carinho. Profissional exemplar.",
      "Muito dedicada e atenta às necessidades do idoso. Super recomendo.",
    ],
    [
      "Minhas roupas nunca ficaram tão bem passadas. Excelente trabalho!",
      "Boa profissional, mas poderia ser um pouco mais pontual.",
      "Trabalho satisfatório, roupas bem cuidadas e limpas.",
    ],
    [
      "Fez a faxina direitinho, mas faltou um pouco de atenção nos detalhes.",
      "Boa profissional, chegou no horário e fez tudo que foi combinado.",
      "Serviço ok, poderia melhorar na organização dos armários.",
    ],
    [
      "Meu jardim ficou lindo! A Sandra entende muito de plantas.",
      "Fez a poda e o plantio com muito cuidado. Profissional competente.",
      "Montou uma horta incrível na minha varanda. Super recomendo!",
    ],
    [
      "Bom serviço de lavagem, roupas bem cuidadas.",
      "Trabalho razoável, mas o preço é justo.",
    ],
    [
      "Muito versátil! Fez faxina e ainda preparou o almoço. Adorei.",
      "Cuidou das crianças e da casa ao mesmo tempo. Super eficiente.",
      "Profissional dedicada e muito simpática. Recomendo.",
    ],
    [
      "A comida da Débora é espetacular! Preparou um jantar incrível.",
      "Organizou minha cozinha inteira e ainda fez várias marmitas.",
      "Profissional de primeira! A faxina ficou perfeita.",
      "Contratei para um jantar especial e todos os convidados elogiaram.",
    ],
    [
      "Gabriela é carinhosa mas ainda está aprendendo em algumas áreas.",
      "Cuidou das crianças com atenção, mas a experiência poderia ser maior.",
    ],
  ];

  const reviewData: {
    professionalId: string;
    authorId: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }[] = [];

  createdProfessionals.forEach((user, index) => {
    const prof = user.professional!;
    const proData = professionals[index];
    const ratings = ratingsForPro(proData.rating, proData.reviewCount);
    const comments = reviewComments[index];

    ratings.forEach((rating, rIdx) => {
      reviewData.push({
        professionalId: prof.id,
        authorId: clientUser.id,
        rating,
        comment: comments[rIdx],
        createdAt: new Date(
          Date.now() - (30 - rIdx) * 24 * 60 * 60 * 1000
        ),
      });
    });
  });

  await prisma.$transaction(
    reviewData.map((r) => prisma.review.create({ data: r }))
  );

  // ── 4. Conversations & Messages ──────────────────────────────────────
  const pro1 = createdProfessionals[0]; // Ana Souza
  const pro2 = createdProfessionals[1]; // Cláudia Oliveira

  const [conv1, conv2] = await prisma.$transaction([
    prisma.conversation.create({
      data: {
        clientId: clientUser.id,
        professionalId: pro1.professional!.id,
      },
    }),
    prisma.conversation.create({
      data: {
        clientId: clientUser.id,
        professionalId: pro2.professional!.id,
      },
    }),
  ]);

  const now = Date.now();

  await prisma.$transaction([
    // Conversation 1: Maria <-> Ana (faxina)
    prisma.message.create({
      data: {
        conversationId: conv1.id,
        senderId: clientUser.id,
        content:
          "Olá Ana! Vi seu perfil e gostaria de agendar uma faxina para o próximo sábado. Você teria disponibilidade?",
        createdAt: new Date(now - 4 * 60 * 60 * 1000),
      },
    }),
    prisma.message.create({
      data: {
        conversationId: conv1.id,
        senderId: pro1.id,
        content:
          "Oi Maria! Tudo bem? Tenho sim disponibilidade no sábado. Qual o tamanho do apartamento e o horário que você prefere?",
        createdAt: new Date(now - 3.5 * 60 * 60 * 1000),
      },
    }),
    prisma.message.create({
      data: {
        conversationId: conv1.id,
        senderId: clientUser.id,
        content:
          "É um apartamento de 80m² em Pinheiros, 2 quartos e 2 banheiros. Pode ser a partir das 9h?",
        createdAt: new Date(now - 3 * 60 * 60 * 1000),
      },
    }),
    prisma.message.create({
      data: {
        conversationId: conv1.id,
        senderId: pro1.id,
        content:
          "Perfeito! Consigo chegar às 9h sim. O valor seria R$55/hora e geralmente levo umas 4 horas para um apê desse tamanho. Te confirmo na sexta!",
        createdAt: new Date(now - 2.5 * 60 * 60 * 1000),
      },
    }),
    prisma.message.create({
      data: {
        conversationId: conv1.id,
        senderId: clientUser.id,
        content: "Ótimo, combinado! Aguardo sua confirmação. Obrigada! 😊",
        createdAt: new Date(now - 2 * 60 * 60 * 1000),
      },
    }),

    // Conversation 2: Maria <-> Cláudia (cozinha)
    prisma.message.create({
      data: {
        conversationId: conv2.id,
        senderId: clientUser.id,
        content:
          "Boa tarde Cláudia! Estou procurando alguém para preparar marmitas semanais para minha família. Você faz esse tipo de serviço?",
        createdAt: new Date(now - 48 * 60 * 60 * 1000),
      },
    }),
    prisma.message.create({
      data: {
        conversationId: conv2.id,
        senderId: pro2.id,
        content:
          "Boa tarde Maria! Faço sim! Trabalho com marmitas congeladas, preparo em média 20 marmitas por sessão. Posso montar um cardápio personalizado com base nas preferências da sua família.",
        createdAt: new Date(now - 47 * 60 * 60 * 1000),
      },
    }),
    prisma.message.create({
      data: {
        conversationId: conv2.id,
        senderId: clientUser.id,
        content:
          "Que maravilha! Somos 4 pessoas, incluindo 2 crianças. Temos restrição com frutos do mar. Quanto ficaria?",
        createdAt: new Date(now - 46 * 60 * 60 * 1000),
      },
    }),
    prisma.message.create({
      data: {
        conversationId: conv2.id,
        senderId: pro2.id,
        content:
          "Sem problema! Para 20 marmitas variadas, faço por R$70/hora e levo cerca de 5 horas, já incluindo compra dos ingredientes. Os ingredientes ficam por sua conta. Posso ir na terça-feira que vem?",
        createdAt: new Date(now - 45 * 60 * 60 * 1000),
      },
    }),
    prisma.message.create({
      data: {
        conversationId: conv2.id,
        senderId: clientUser.id,
        content:
          "Fechado! Terça-feira está ótimo. Me passa a lista de ingredientes que eu já faço as compras no fim de semana.",
        createdAt: new Date(now - 44 * 60 * 60 * 1000),
      },
    }),
    prisma.message.create({
      data: {
        conversationId: conv2.id,
        senderId: pro2.id,
        content:
          "Perfeito! Vou preparar o cardápio e te mando a lista até amanhã. Vai adorar! Até terça! 🍳",
        createdAt: new Date(now - 43 * 60 * 60 * 1000),
      },
    }),
  ]);

  console.log("Seed completed successfully!");
  console.log(`  - 1 client user`);
  console.log(`  - 12 professional users with profiles`);
  console.log(`  - ${reviewData.length} reviews`);
  console.log(`  - 2 conversations with messages`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
