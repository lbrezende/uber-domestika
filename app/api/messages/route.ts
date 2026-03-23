import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

function getUserId(request: Request): string | null {
  const cookie = request.headers.get("cookie");
  if (cookie?.includes("ud-auth=")) return "user-1";
  return null;
}

const createMessageSchema = z.object({
  conversationId: z.string().min(1),
  content: z.string().min(1).max(2000),
});

export async function POST(request: Request) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createMessageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request body", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { conversationId, content } = parsed.data;

  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation || conversation.clientId !== userId) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    const message = await prisma.$transaction(async (tx) => {
      const newMessage = await tx.message.create({
        data: { conversationId, senderId: userId, content },
        include: { sender: { select: { name: true, image: true } } },
      });
      await tx.conversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() },
      });
      return newMessage;
    });

    return NextResponse.json(message, { status: 201 });
  } catch {
    // DB unavailable — return mock message
    return NextResponse.json(
      {
        id: `mock-msg-${Date.now()}`,
        conversationId,
        senderId: userId,
        content,
        createdAt: new Date().toISOString(),
        sender: { name: "Maria Silva", image: null },
      },
      { status: 201 }
    );
  }
}
