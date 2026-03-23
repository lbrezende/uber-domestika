import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RatingStars } from "@/components/rating-stars";

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  author: {
    name: string;
    image: string | null;
  };
}

interface ReviewCardProps {
  review: Review;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function ReviewCard({ review }: ReviewCardProps) {
  const { rating, comment, createdAt, author } = review;

  const initials = author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={author.image || undefined} alt={author.name} />
            <AvatarFallback className="bg-violet-100 text-violet-700 text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-medium text-foreground">{author.name}</h4>
              <time className="text-xs text-muted-foreground flex-shrink-0">
                {formatDate(createdAt)}
              </time>
            </div>

            <div className="mt-1">
              <RatingStars rating={rating} size="sm" />
            </div>

            <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
              {comment}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
