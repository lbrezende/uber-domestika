import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfessionalCard } from "@/components/professional-card";

const meta = {
  title: "Components/ProfessionalCard",
  component: ProfessionalCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 380 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProfessionalCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    professional: {
      id: "1",
      name: "Ana Oliveira",
      photo: "https://randomuser.me/api/portraits/women/1.jpg",
      services: ["Faxina", "Cozinha", "Passadeira"],
      hourlyRate: 45,
      rating: 4.8,
      reviewCount: 32,
      neighborhood: "Pinheiros",
      available: true,
    },
  },
};

export const ManyServices: Story = {
  args: {
    professional: {
      id: "2",
      name: "Claudia Santos",
      photo: "https://randomuser.me/api/portraits/women/2.jpg",
      services: ["Faxina", "Cozinha", "Passadeira", "Babá", "Lavadeira"],
      hourlyRate: 60,
      rating: 4.5,
      reviewCount: 18,
      neighborhood: "Vila Mariana",
      available: true,
    },
  },
};

export const Unavailable: Story = {
  args: {
    professional: {
      id: "3",
      name: "Fernanda Lima",
      photo: "https://randomuser.me/api/portraits/women/3.jpg",
      services: ["Babá", "Cuidadora de Idosos"],
      hourlyRate: 55,
      rating: 4.9,
      reviewCount: 45,
      neighborhood: "Moema",
      available: false,
    },
  },
};

export const HighRating: Story = {
  args: {
    professional: {
      id: "4",
      name: "Juliana Costa",
      photo: "https://randomuser.me/api/portraits/women/4.jpg",
      services: ["Faxina", "Organização"],
      hourlyRate: 70,
      rating: 5.0,
      reviewCount: 67,
      neighborhood: "Jardins",
      available: true,
    },
  },
};

export const LowRating: Story = {
  args: {
    professional: {
      id: "5",
      name: "Luciana Pereira",
      photo: "https://randomuser.me/api/portraits/women/5.jpg",
      services: ["Faxina"],
      hourlyRate: 30,
      rating: 3.5,
      reviewCount: 4,
      neighborhood: "Tatuapé",
      available: true,
    },
  },
};
