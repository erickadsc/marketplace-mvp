import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { setSessionCookie, verifyPassword } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Dados invalidos." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email.toLowerCase() }
    });

    if (!user) {
      return NextResponse.json({ error: "Email ou senha invalidos." }, { status: 401 });
    }

    const matches = await verifyPassword(parsed.data.password, user.password);
    if (!matches) {
      return NextResponse.json({ error: "Email ou senha invalidos." }, { status: 401 });
    }

    await setSessionCookie(user);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        score: user.score
      }
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Erro interno." }, { status: 500 });
  }
}
