import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RatingStars } from "@/components/rating-stars";
import { useState } from "react";

const meta = {
  title: "Design System/RatingStars",
  component: RatingStars,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof RatingStars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FiveStars: Story = {
  args: { rating: 5, size: "md" },
};

export const FourAndHalf: Story = {
  args: { rating: 4.5, size: "md" },
};

export const ThreeStars: Story = {
  args: { rating: 3, size: "md" },
};

export const Small: Story = {
  args: { rating: 4.8, size: "sm" },
};

export const Large: Story = {
  args: { rating: 4.2, size: "lg" },
};

export const Interactive: Story = {
  render: function InteractiveStars() {
    const [rating, setRating] = useState(0);
    return (
      <div className="space-y-2">
        <RatingStars
          rating={rating}
          size="lg"
          interactive
          onChange={setRating}
        />
        <p className="text-sm text-gray-500">
          Selecionado: {rating} estrela{rating !== 1 ? "s" : ""}
        </p>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500 w-8">SM</span>
        <RatingStars rating={4.5} size="sm" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500 w-8">MD</span>
        <RatingStars rating={4.5} size="md" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500 w-8">LG</span>
        <RatingStars rating={4.5} size="lg" />
      </div>
    </div>
  ),
};
