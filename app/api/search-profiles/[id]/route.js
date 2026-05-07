import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function DELETE(_request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Nao autenticado." }, { status: 401 });
    }

    if (user.type !== "CLIENT") {
      return NextResponse.json({ error: "Apenas clientes podem excluir perfis." }, { status: 403 });
    }

    const id = Number(params.id);
    const profile = await prisma.searchProfile.findUnique({
      where: { id },
      select: { id: true, userId: true }
    });

    if (!profile || profile.userId !== user.id) {
      return NextResponse.json({ error: "Perfil nao encontrado." }, { status: 404 });
    }

    await prisma.searchProfile.delete({
      where: { id }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Erro interno." }, { status: 500 });
  }
}
