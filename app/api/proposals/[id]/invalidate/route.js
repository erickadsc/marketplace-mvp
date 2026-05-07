import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { recomputeBrokerScore } from "@/lib/domain";

export async function PATCH(_request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Nao autenticado." }, { status: 401 });
    }

    if (user.type !== "CLIENT") {
      return NextResponse.json({ error: "Apenas clientes podem invalidar propostas." }, { status: 403 });
    }

    const id = Number(params.id);
    const proposal = await prisma.proposal.findUnique({
      where: { id },
      include: {
        profile: {
          select: {
            userId: true
          }
        }
      }
    });

    if (!proposal || proposal.profile.userId !== user.id) {
      return NextResponse.json({ error: "Proposta nao encontrada." }, { status: 404 });
    }

    const updated = await prisma.proposal.update({
      where: { id },
      data: {
        status: "INVALID"
      }
    });

    await recomputeBrokerScore(updated.brokerId);

    return NextResponse.json({ proposal: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Erro interno." }, { status: 500 });
  }
}
