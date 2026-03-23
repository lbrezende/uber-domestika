import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EmptyState } from "@/components/empty-state";
import { Users, MessageCircle, Search, Star } from "lucide-react";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoProfessionals: Story = {
  args: {
    icon: Users,
    title: "Nenhuma profissional encontrada",
    description: "Tente buscar com outros termos ou remova os filtros.",
  },
};

export const NoMessages: Story = {
  args: {
    icon: MessageCircle,
    title: "Nenhuma conversa ainda",
    description:
      "Quando você enviar uma mensagem para uma profissional, a conversa aparecerá aqui.",
    action: { label: "Encontrar profissional", href: "/dashboard" },
  },
};

export const NoResults: Story = {
  args: {
    icon: Search,
    title: "Nenhum resultado",
    description: "Não encontramos nada para essa busca.",
  },
};

export const NoReviews: Story = {
  args: {
    icon: Star,
    title: "Sem avaliações",
    description: "Esta profissional ainda não recebeu avaliações.",
  },
};
