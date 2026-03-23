import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReviewCard } from "@/components/review-card";

const meta = {
  title: "Components/ReviewCard",
  component: ReviewCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Positive: Story = {
  args: {
    review: {
      id: "1",
      rating: 5,
      comment:
        "Excelente profissional! Muito atenciosa e cuidadosa com cada detalhe da limpeza. A casa ficou impecável. Super recomendo!",
      createdAt: "2024-12-15T10:30:00Z",
      author: {
        name: "Maria Silva",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
      },
    },
  },
};

export const Average: Story = {
  args: {
    review: {
      id: "2",
      rating: 3,
      comment:
        "Fez o trabalho, mas poderia ter sido mais atenciosa com os cantos. No geral, ok.",
      createdAt: "2024-11-20T14:00:00Z",
      author: {
        name: "João Santos",
        image: null,
      },
    },
  },
};

export const Detailed: Story = {
  args: {
    review: {
      id: "3",
      rating: 4,
      comment:
        "Muito boa na cozinha! Preparou almoço para 6 pessoas com muita qualidade. Chegou no horário e foi super organizada. Só não dou 5 estrelas porque atrasou um pouco na segunda vez.",
      createdAt: "2024-10-05T09:15:00Z",
      author: {
        name: "Ana Paula Ferreira",
        image: "https://randomuser.me/api/portraits/women/32.jpg",
      },
    },
  },
};
