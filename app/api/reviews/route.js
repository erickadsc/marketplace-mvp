import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { recomputeBrokerScore } from "@/lib/domain";
import { reviewSchema } from "@/lib/validation";

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Nao autenticado." }, { status: 401 });
    }

    if (user.type !== "CLIENT") {
      return NextResponse.json({ error: "Apenas clientes podem avaliar." }, { status: 403 });
    }

    const body = await request.json();
    const parsed = reviewSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Dados invalidos." }, { status: 400 });
    }

    const proposal = await prisma.proposal.findUnique({
      where: { id: parsed.data.proposalId },
      include: {
        profile: true,
        review: true
      }
    });

    if (!proposal || proposal.profile.userId !== user.id) {
      return NextResponse.json({ error: "Proposta nao encontrada." }, { status: 404 });
    }

    if (proposal.review) {
      return NextResponse.json({ error: "Esta proposta ja foi avaliada." }, { status: 409 });
    }

    const review = await prisma.review.create({
      data: {
        proposalId: proposal.id,
        clientId: user.id,
        brokerId: proposal.brokerId,
        rating: parsed.data.rating,
        comment: parsed.data.comment
      }
    });

    await recomputeBrokerScore(proposal.brokerId);

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Erro interno." }, { status: 500 });
  }
}
