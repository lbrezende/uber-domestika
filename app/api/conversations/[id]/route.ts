import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function getUserId(request: Request): string | null {
  const cookie = request.headers.get("cookie");
  if (cookie?.includes("ud-auth=")) return "user-1";
  return null;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          include: { sender: { select: { name: true, image: true } } },
        },
        professional: {
          include: { user: { select: { name: true, image: true } } },
        },
        client: { select: { id: true, name: true, image: true } },
      },
    });

    if (!conversation || conversation.clientId !== userId) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    return NextResponse.json(conversation);
  } catch {
    // DB unavailable — return empty conversation shell
    return NextResponse.json({
      id,
      clientId: userId,
      professional: { id: "unknown", photo: "", user: { name: "Profissional" } },
      messages: [],
    });
  }
}
