"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, MessageCircle } from "lucide-react";
import { RatingStars } from "@/components/rating-stars";
import { ReviewCard } from "@/components/review-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/empty-state";
import { Star } from "lucide-react";

type ProfessionalDetail = {
  id: string;
  photo: string;
  bio: string;
  services: string[];
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  neighborhood: string;
  city: string;
  available: boolean;
  user: { name: string; image: string | null };
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    author: { name: string; image: string | null };
  }>;
};

export default function ProfessionalProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: professional, isLoading } = useQuery<ProfessionalDetail>({
    queryKey: ["professional", id],
    queryFn: async () => {
      const res = await fetch(`/api/professionals/${id}`);
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
  });

  const startConversation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ professionalId: id }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      router.push(`/messages/${data.id}`);
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-24 mb-8" />
        <div className="flex gap-6 mb-8">
          <div className="w-32 h-32 bg-gray-200 rounded-xl" />
          <div className="flex-1">
            <div className="h-6 bg-gray-200 rounded w-48 mb-3" />
            <div className="h-4 bg-gray-200 rounded w-32 mb-3" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
        </div>
      </div>
    );
  }

  if (!professional) {
    return (
      <EmptyState
        icon={Star}
        title="Profissional não encontrada"
        description="A profissional que você está procurando não foi encontrada."
        action={{ label: "Voltar ao dashboard", href: "/dashboard" }}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Link>

      {/* Profile Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <Image
            src={professional.photo}
            alt={professional.user.name}
            width={128}
            height={128}
            className="w-32 h-32 rounded-xl object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {professional.user.name}
                </h1>
                <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                  <MapPin className="w-4 h-4" />
                  {professional.neighborhood}, {professional.city}
                </div>
              </div>
              {!professional.available && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-500">
                  Indisponível
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2 mt-3">
              <RatingStars rating={professional.rating} size="md" />
              <span className="text-sm text-gray-500">
                ({professional.reviewCount} avaliações)
              </span>
            </div>

            <div className="flex items-center gap-1 text-lg font-semibold text-violet-600 mt-3">
              <Clock className="w-4 h-4" />
              R$ {professional.hourlyRate.toFixed(0)}/hora
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {professional.services.map((s) => (
                <Badge
                  key={s}
                  variant="secondary"
                  className="bg-violet-50 text-violet-700 border-violet-200"
                >
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div>
          <h2 className="font-semibold text-gray-900 mb-2">Sobre</h2>
          <p className="text-gray-600 leading-relaxed">{professional.bio}</p>
        </div>

        <Button
          className="w-full mt-6 bg-violet-600 hover:bg-violet-700 text-white"
          size="lg"
          onClick={() => startConversation.mutate()}
          disabled={startConversation.isPending}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          {startConversation.isPending
            ? "Abrindo conversa..."
            : "Enviar mensagem"}
        </Button>
      </div>

      {/* Reviews */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Avaliações ({professional.reviewCount})
        </h2>
        {professional.reviews.length === 0 ? (
          <p className="text-gray-500">Ainda não há avaliações.</p>
        ) : (
          <div className="space-y-4">
            {professional.reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={{
                  ...review,
                  createdAt: review.createdAt,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
