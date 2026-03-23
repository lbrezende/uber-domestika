import { z } from "zod";

export const sendMessageSchema = z.object({
  conversationId: z.string().optional(),
  professionalId: z.string(),
  content: z.string().min(1).max(2000),
});

export const searchProfessionalsSchema = z.object({
  service: z.string().optional(),
  neighborhood: z.string().optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  q: z.string().optional(),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type SearchProfessionalsInput = z.infer<typeof searchProfessionalsSchema>;
