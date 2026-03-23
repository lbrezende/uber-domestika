import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RatingStars } from "@/components/rating-stars";
import { cn } from "@/lib/utils";

export interface Professional {
  id: string;
  name: string;
  photo: string;
  services: string[];
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  neighborhood: string;
  available: boolean;
}

interface ProfessionalCardProps {
  professional: Professional;
}

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
  const {
    id,
    name,
    photo,
    services,
    hourlyRate,
    rating,
    reviewCount,
    neighborhood,
    available,
  } = professional;

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link href={`/professionals/${id}`} className="block group">
      <Card
        className={cn(
          "overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5",
          !available && "opacity-75"
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 rounded-xl flex-shrink-0">
              <AvatarImage src={photo} alt={name} />
              <AvatarFallback className="bg-violet-100 text-violet-700 text-lg rounded-xl">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-foreground truncate group-hover:text-violet-700 transition-colors">
                  {name}
                </h3>
                {!available && (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-500 flex-shrink-0">
                    Indisponível
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>{neighborhood}</span>
              </div>

              <div className="flex items-center gap-2 mt-1.5">
                <RatingStars rating={rating} size="sm" />
                <span className="text-sm text-muted-foreground">
                  ({reviewCount})
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2">
                {services.slice(0, 3).map((service) => (
                  <Badge
                    key={service}
                    variant="secondary"
                    className="bg-violet-50 text-violet-700 hover:bg-violet-100 text-xs"
                  >
                    {service}
                  </Badge>
                ))}
                {services.length > 3 && (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-500 text-xs">
                    +{services.length - 3}
                  </Badge>
                )}
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <p className="text-lg font-bold text-violet-600">
                R${hourlyRate}
              </p>
              <p className="text-xs text-muted-foreground">/hora</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
