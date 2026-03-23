import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getMockProfessionalById } from "@/lib/mock-data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Try database first, fallback to mock data
  try {
    const professional = await prisma.professional.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, image: true } },
        reviews: {
          include: { author: { select: { name: true, image: true } } },
          orderBy: { createdAt: "desc" },
        },
        _count: { select: { reviews: true } },
      },
    });

    if (!professional) {
      return NextResponse.json({ error: "Professional not found" }, { status: 404 });
    }

    return NextResponse.json(professional);
  } catch {
    // Database not available — return mock data
    const mock = getMockProfessionalById(id);
    if (!mock) {
      return NextResponse.json({ error: "Professional not found" }, { status: 404 });
    }
    return NextResponse.json(mock);
  }
}
