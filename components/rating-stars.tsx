"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const sizeMap = {
  sm: "h-3.5 w-3.5",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export function RatingStars({
  rating,
  size = "md",
  interactive = false,
  onChange,
}: RatingStarsProps) {
  const starSize = sizeMap[size];

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;

        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(star)}
            className={cn(
              "relative p-0 border-0 bg-transparent",
              interactive
                ? "cursor-pointer hover:scale-110 transition-transform"
                : "cursor-default"
            )}
            aria-label={`${star} estrela${star > 1 ? "s" : ""}`}
          >
            {half ? (
              <div className="relative">
                <Star
                  className={cn(starSize, "text-gray-300")}
                  strokeWidth={1.5}
                />
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <Star
                    className={cn(starSize, "text-yellow-400 fill-yellow-400")}
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            ) : (
              <Star
                className={cn(
                  starSize,
                  filled
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                )}
                strokeWidth={1.5}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
