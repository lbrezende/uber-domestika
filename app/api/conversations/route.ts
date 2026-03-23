import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function getUserId(request: Request): string | null {
  const cookie = request.headers.get("cookie");
  if (cookie?.includes("ud-auth=")) return "user-1";
  return null;
}

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
          include: {
            user: {
              select: { name: true, image: true },
            },
          },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        _count: {
          select: { messages: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("Error listing conversations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { professionalId } = body;

    if (!professionalId || typeof professionalId !== "string") {
      return NextResponse.json(
        { error: "professionalId is required" },
        { status: 400 }
      );
    }

    // Check if the professional exists
    const professional = await prisma.professional.findUnique({
      where: { id: professionalId },
    });

    if (!professional) {
      return NextResponse.json(
        { error: "Professional not found" },
        { status: 404 }
      );
    }

    // Check if conversation already exists between this client and professional
    const existing = await prisma.conversation.findUnique({
      where: {
        clientId_professionalId: {
          clientId: userId,
          professionalId,
        },
      },
      include: {
        professional: {
          include: {
            user: {
              select: { name: true, image: true },
            },
          },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (existing) {
      return NextResponse.json(existing);
    }

    // Create new conversation
    const conversation = await prisma.conversation.create({
      data: {
        clientId: userId,
        professionalId,
      },
      include: {
        professional: {
          include: {
            user: {
              select: { name: true, image: true },
            },
          },
        },
        messages: true,
      },
    });

    return NextResponse.json(conversation, { status: 201 });
  } catch (error) {
    console.error("Error creating conversation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
