import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ensureBrokerCanSendProposal, expireStaleProposals } from "@/lib/domain";
import { proposalSchema } from "@/lib/validation";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Nao autenticado." }, { status: 401 });
  }

  await expireStaleProposals();

  const where =
    user.type === "CLIENT"
      ? {
          profile: {
            userId: user.id
          }
        }
      : {
          brokerId: user.id
        };

  const proposals = await prisma.proposal.findMany({
    where,
    include: {
      broker: {
        select: { id: true, name: true, score: true }
      },
      profile: true,
      review: true
    },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ proposals });
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Nao autenticado." }, { status: 401 });
    }

    if (user.type !== "BROKER") {
      return NextResponse.json({ error: "Apenas corretores podem enviar propostas." }, { status: 403 });
    }

    await expireStaleProposals();
    await ensureBrokerCanSendProposal(user.id);

    const body = await request.json();
    const parsed = proposalSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Dados invalidos." }, { status: 400 });
    }

    const profile = await prisma.searchProfile.findUnique({
      where: { id: parsed.data.profileId },
      include: {
        user: {
          select: { id: true, type: true }
        }
      }
    });

    if (!profile || profile.user.type !== "CLIENT") {
      return NextResponse.json({ error: "Lead nao encontrado." }, { status: 404 });
    }

    const proposal = await prisma.proposal.create({
      data: {
        brokerId: user.id,
        profileId: parsed.data.profileId,
        propertyLink: parsed.data.propertyLink,
        price: parsed.data.price,
        note: parsed.data.note,
        availabilityConfirmed: parsed.data.availabilityConfirmed,
        expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000)
      }
    });

    return NextResponse.json({ proposal }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Erro interno." }, { status: 500 });
  }
}
