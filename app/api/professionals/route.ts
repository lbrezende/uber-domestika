import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { searchProfessionalsSchema } from "@/lib/validations";
import { filterMockProfessionals } from "@/lib/mock-data";
import type { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const parsed = searchProfessionalsSchema.safeParse({
    service: searchParams.get("service") || undefined,
    neighborhood: searchParams.get("neighborhood") || undefined,
    minRating: searchParams.get("minRating") || undefined,
    q: searchParams.get("q") || undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { service, neighborhood, minRating, q } = parsed.data;

  // Try database first, fallback to mock data
  try {
    const where: Prisma.ProfessionalWhereInput = { available: true };

    if (service) where.services = { has: service };
    if (neighborhood) where.neighborhood = { equals: neighborhood, mode: "insensitive" };
    if (minRating !== undefined) where.rating = { gte: minRating };
    if (q) {
      where.OR = [
        { bio: { contains: q, mode: "insensitive" } },
        { user: { name: { contains: q, mode: "insensitive" } } },
      ];
    }

    const professionals = await prisma.professional.findMany({
      where,
      include: { user: { select: { name: true, image: true } } },
      orderBy: { rating: "desc" },
    });

    return NextResponse.json(professionals);
  } catch {
    // Database not available — return mock data
    const results = filterMockProfessionals({ service, neighborhood, minRating, q });
    return NextResponse.json(results);
  }
}
