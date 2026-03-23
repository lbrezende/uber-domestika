import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const professional = await prisma.professional.findUnique({
      where: { id },
      include: {
        user: {
          select: { name: true, image: true },
        },
        reviews: {
          include: {
            author: {
              select: { name: true, image: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: { reviews: true },
        },
      },
    });

    if (!professional) {
      return NextResponse.json(
        { error: "Professional not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(professional);
  } catch (error) {
    console.error("Error fetching professional:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
