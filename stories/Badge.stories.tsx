import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "@/components/ui/badge";

const meta = {
  title: "Design System/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Faxina" },
};

export const ServiceBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {[
        "Faxina",
        "Cozinha",
        "Passadeira",
        "Babá",
        "Cuidadora de Idosos",
        "Lavadeira",
        "Jardinagem",
        "Organização",
      ].map((service) => (
        <Badge
          key={service}
          variant="secondary"
          className="bg-violet-50 text-violet-700 border-violet-200"
        >
          {service}
        </Badge>
      ))}
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge className="bg-green-100 text-green-700">Disponível</Badge>
      <Badge className="bg-gray-100 text-gray-500">Indisponível</Badge>
      <Badge className="bg-yellow-100 text-yellow-700">Em contrato</Badge>
    </div>
  ),
};
