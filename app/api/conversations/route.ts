import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { MOCK_PROFESSIONALS } from "@/lib/mock-data";

function getUserId(request: Request): string | null {
  const cookie = request.headers.get("cookie");
  if (cookie?.includes("ud-auth=")) return "user-1";
  return null;
}

// In-memory mock conversations (when DB is unavailable)
const mockConversations: Record<string, {
  id: string;
  clientId: string;
  professionalId: string;
  professional: { id: string; photo: string; user: { name: string } };
  messages: Array<{ content: string; createdAt: string; senderId: string; id: string }>;
  _count: { messages: number };
  updatedAt: string;
}> = {};

export async function GET(request: Request) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const conversations = await prisma.conversation.findMany({
      where: { clientId: userId },
      include: {
        professional: {
          include: { user: { select: { name: true, image: true } } },
        },
        messages: { orderBy: { createdAt: "desc" }, take: 1 },
        _count: { select: { messages: true } },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(conversations);
  } catch {
    // DB unavailable — return mock conversations
    return NextResponse.json(Object.values(mockConversations));
  }
}

export async function POST(request: Request) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { professionalId } = body;

  if (!professionalId || typeof professionalId !== "string") {
    return NextResponse.json({ error: "professionalId is required" }, { status: 400 });
  }

  try {
    const professional = await prisma.professional.findUnique({ where: { id: professionalId } });
    if (!professional) {
      return NextResponse.json({ error: "Professional not found" }, { status: 404 });
    }

    const existing = await prisma.conversation.findUnique({
      where: { clientId_professionalId: { clientId: userId, professionalId } },
      include: {
        professional: { include: { user: { select: { name: true, image: true } } } },
        messages: { orderBy: { createdAt: "desc" }, take: 1 },
      },
    });

    if (existing) return NextResponse.json(existing);

    const conversation = await prisma.conversation.create({
      data: { clientId: userId, professionalId },
      include: {
        professional: { include: { user: { select: { name: true, image: true } } } },
        messages: true,
      },
    });

    return NextResponse.json(conversation, { status: 201 });
  } catch {
    // DB unavailable — create mock conversation
    const pro = MOCK_PROFESSIONALS.find((p) => p.id === professionalId);
    if (!pro) {
      return NextResponse.json({ error: "Professional not found" }, { status: 404 });
    }

    const key = `${userId}-${professionalId}`;
    if (mockConversations[key]) {
      return NextResponse.json(mockConversations[key]);
    }

    const conv = {
      id: `mock-conv-${Date.now()}`,
      clientId: userId,
      professionalId,
      professional: { id: pro.id, photo: pro.photo, user: { name: pro.user.name } },
      messages: [],
      _count: { messages: 0 },
      updatedAt: new Date().toISOString(),
    };
    mockConversations[key] = conv;

    return NextResponse.json(conv, { status: 201 });
  }
}
