import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MessageBubble } from "@/components/message-bubble";

const meta = {
  title: "Components/MessageBubble",
  component: MessageBubble,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MessageBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OwnMessage: Story = {
  args: {
    message: {
      content: "Olá! Gostaria de saber se você tem disponibilidade para uma faxina na sexta-feira?",
      createdAt: "2024-12-20T10:30:00Z",
      isOwn: true,
    },
  },
};

export const OtherMessage: Story = {
  args: {
    message: {
      content: "Olá! Sim, tenho disponibilidade na sexta. Qual o tamanho do apartamento?",
      createdAt: "2024-12-20T10:32:00Z",
      isOwn: false,
    },
  },
};

export const Conversation: Story = {
  render: () => (
    <div className="space-y-3">
      <MessageBubble
        message={{
          content: "Olá! Vi seu perfil e gostaria de contratar uma faxina.",
          createdAt: "2024-12-20T10:30:00Z",
          isOwn: true,
        }}
      />
      <MessageBubble
        message={{
          content: "Olá! Claro, fico feliz com seu interesse. Qual seria o dia?",
          createdAt: "2024-12-20T10:32:00Z",
          isOwn: false,
        }}
      />
      <MessageBubble
        message={{
          content: "Pode ser sexta-feira pela manhã? Apartamento de 2 quartos na Vila Mariana.",
          createdAt: "2024-12-20T10:33:00Z",
          isOwn: true,
        }}
      />
      <MessageBubble
        message={{
          content: "Perfeito! Sexta às 8h funciona para você? O valor seria R$180 pela faxina completa.",
          createdAt: "2024-12-20T10:35:00Z",
          isOwn: false,
        }}
      />
    </div>
  ),
};
