import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui/button";
import { MessageCircle, Search, LogOut } from "lucide-react";

const meta = {
  title: "Design System/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Encontrar profissional",
    className: "bg-violet-600 hover:bg-violet-700",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Ver mais",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Como funciona",
    className: "border-violet-200 text-violet-600 hover:bg-violet-50",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Cancelar",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Excluir conta",
  },
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button className="bg-violet-600 hover:bg-violet-700">
        <MessageCircle className="w-4 h-4 mr-2" />
        Enviar mensagem
      </Button>
      <Button variant="outline">
        <Search className="w-4 h-4 mr-2" />
        Buscar
      </Button>
      <Button variant="ghost" className="text-red-600">
        <LogOut className="w-4 h-4 mr-2" />
        Sair
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
        Pequeno
      </Button>
      <Button className="bg-violet-600 hover:bg-violet-700">Normal</Button>
      <Button size="lg" className="bg-violet-600 hover:bg-violet-700">
        Grande
      </Button>
    </div>
  ),
};
