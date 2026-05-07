import { prisma } from "@/lib/db";

export const HOURS_TO_EXPIRE = 72;

export function isProposalExpired(proposal) {
  const expiresAt = proposal.expiresAt || new Date(proposal.createdAt.getTime() + HOURS_TO_EXPIRE * 60 * 60 * 1000);
  return expiresAt.getTime() <= Date.now();
}

export async function expireStaleProposals() {
  const now = new Date();
  await prisma.proposal.updateMany({
    where: {
      status: "ACTIVE",
      expiresAt: {
        lte: now
      }
    },
    data: {
      status: "EXPIRED"
    }
  });
}

export async function ensureBrokerCanSendProposal(brokerId) {
  const broker = await prisma.user.findUnique({
    where: { id: brokerId },
    select: {
      id: true,
      type: true,
      score: true
    }
  });

  if (!broker || broker.type !== "BROKER") {
    throw new Error("Corretor nao encontrado.");
  }

  if (Number(broker.score) < 3) {
    throw new Error("Corretor com score abaixo de 3 nao pode enviar propostas.");
  }

  return broker;
}

export async function recomputeBrokerScore(brokerId) {
  const [invalidCount, positiveCount] = await Promise.all([
    prisma.proposal.count({
      where: {
        brokerId,
        status: "INVALID"
      }
    }),
    prisma.review.count({
      where: {
        brokerId,
        rating: {
          gte: 4
        }
      }
    })
  ]);

  const score = Math.max(0, 5 - invalidCount + positiveCount * 0.1);

  return prisma.user.update({
    where: { id: brokerId },
    data: { score },
    select: {
      id: true,
      score: true
    }
  });
}
