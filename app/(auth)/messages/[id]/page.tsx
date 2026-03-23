"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { MessageBubble } from "@/components/message-bubble";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ConversationDetail = {
  id: string;
  clientId: string;
  professional: {
    id: string;
    photo: string;
    user: { name: string };
  };
  messages: Array<{
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
  }>;
};

const CURRENT_USER_ID = "user-1";

export default function ConversationPage() {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: conversation, isLoading } = useQuery<ConversationDetail>({
    queryKey: ["conversation", id],
    queryFn: async () => {
      const res = await fetch(`/api/conversations/${id}`);
      return res.json();
    },
  });

  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: id, content }),
      });
      return res.json();
    },
    onSuccess: () => {
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["conversation", id] });
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    sendMessage.mutate(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="h-6 bg-gray-200 rounded w-24 mb-6 animate-pulse" />
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div className="h-12 bg-gray-200 rounded-xl w-48 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!conversation) return null;

  return (
    <div className="max-w-3xl mx-auto flex flex-col" style={{ height: "calc(100vh - 140px)" }}>
      {/* Header */}
      <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
        <Link
          href="/messages"
          className="text-gray-400 hover:text-violet-600 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <Image
          src={conversation.professional.photo}
          alt={conversation.professional.user.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold text-gray-900">
            {conversation.professional.user.name}
          </h2>
          <Link
            href={`/professionals/${conversation.professional.id}`}
            className="text-xs text-violet-600 hover:underline"
          >
            Ver perfil
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3">
        {conversation.messages.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">
            Nenhuma mensagem ainda. Diga olá!
          </p>
        )}
        {conversation.messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={{
              content: msg.content,
              createdAt: msg.createdAt,
              isOwn: msg.senderId === CURRENT_USER_ID,
            }}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 pt-4">
        <div className="flex gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem..."
            className="resize-none min-h-[44px] max-h-32"
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim() || sendMessage.isPending}
            className="bg-violet-600 hover:bg-violet-700 text-white px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
