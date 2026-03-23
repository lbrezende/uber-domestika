"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { EmptyState } from "@/components/empty-state";

type Conversation = {
  id: string;
  professional: {
    id: string;
    photo: string;
    user: { name: string };
  };
  messages: Array<{ content: string; createdAt: string }>;
  _count: { messages: number };
  updatedAt: string;
};

export default function MessagesPage() {
  const { data: conversations = [], isLoading } = useQuery<Conversation[]>({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await fetch("/api/conversations");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Mensagens</h1>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-48" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Mensagens</h1>

      {conversations.length === 0 ? (
        <EmptyState
          icon={MessageCircle}
          title="Nenhuma conversa ainda"
          description="Quando você enviar uma mensagem para uma profissional, a conversa aparecerá aqui."
          action={{ label: "Encontrar profissional", href: "/dashboard" }}
        />
      ) : (
        <div className="space-y-3">
          {conversations.map((conv) => {
            const lastMessage = conv.messages[0];
            return (
              <Link
                key={conv.id}
                href={`/messages/${conv.id}`}
                className="block bg-white rounded-xl border border-gray-100 p-4 hover:border-violet-200 hover:shadow-sm transition"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={conv.professional.photo}
                    alt={conv.professional.user.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        {conv.professional.user.name}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {lastMessage
                          ? new Date(lastMessage.createdAt).toLocaleDateString(
                              "pt-BR"
                            )
                          : ""}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate mt-0.5">
                      {lastMessage?.content || "Nenhuma mensagem ainda"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
