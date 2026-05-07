import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { searchProfileSchema } from "@/lib/validation";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Nao autenticado." }, { status: 401 });
  }

  if (user.type !== "CLIENT") {
    return NextResponse.json({ error: "Apenas clientes acessam esta rota." }, { status: 403 });
  }

  const profiles = await prisma.searchProfile.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ profiles });
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Nao autenticado." }, { status: 401 });
    }

    if (user.type !== "CLIENT") {
      return NextResponse.json({ error: "Apenas clientes podem criar perfis." }, { status: 403 });
    }

    const body = await request.json();
    const parsed = searchProfileSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Dados invalidos." }, { status: 400 });
    }

    const profile = await prisma.searchProfile.create({
      data: {
        userId: user.id,
        city: parsed.data.city,
        district: parsed.data.district,
        minPrice: parsed.data.minPrice,
        maxPrice: parsed.data.maxPrice,
        bedrooms: parsed.data.bedrooms,
        bathrooms: parsed.data.bathrooms,
        parkingSpots: parsed.data.parkingSpots
      }
    });

    return NextResponse.json({ profile }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Erro interno." }, { status: 500 });
  }
}
