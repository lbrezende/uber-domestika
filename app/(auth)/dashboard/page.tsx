"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ProfessionalCard } from "@/components/professional-card";
import { SearchBar } from "@/components/search-bar";
import { EmptyState } from "@/components/empty-state";
import { Users } from "lucide-react";

type Professional = {
  id: string;
  photo: string;
  services: string[];
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  neighborhood: string;
  available: boolean;
  user: { name: string };
};

const ALL_SERVICES = [
  "Faxina",
  "Cozinha",
  "Passadeira",
  "Babá",
  "Cuidadora de Idosos",
  "Lavadeira",
  "Jardinagem",
  "Organização",
];

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string | null>(null);

  const { data: professionals = [], isLoading } = useQuery<Professional[]>({
    queryKey: ["professionals", search, serviceFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.set("q", search);
      if (serviceFilter) params.set("service", serviceFilter);
      const res = await fetch(`/api/professionals?${params}`);
      return res.json();
    },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Profissionais na sua região
        </h1>
        <p className="text-gray-500">São Paulo, SP</p>
      </div>

      <SearchBar
        onSearch={setSearch}
        onFilterService={setServiceFilter}
        services={ALL_SERVICES}
      />

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-24" />
                </div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : professionals.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            icon={Users}
            title="Nenhuma profissional encontrada"
            description="Tente buscar com outros termos ou remova os filtros."
          />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {professionals.map((pro) => (
            <ProfessionalCard
              key={pro.id}
              professional={{
                id: pro.id,
                name: pro.user.name,
                photo: pro.photo,
                services: pro.services,
                hourlyRate: pro.hourlyRate,
                rating: pro.rating,
                reviewCount: pro.reviewCount,
                neighborhood: pro.neighborhood,
                available: pro.available,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
