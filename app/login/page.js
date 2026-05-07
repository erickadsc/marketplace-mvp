import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AuthForm } from "@/components/auth-form";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="auth-layout">
      <section className="auth-card">
        <p className="eyebrow">Entrar</p>
        <h1>Acesse seu painel.</h1>
        <p>Cliente acompanha propostas. Corretor recebe leads e envia opcoes disponiveis.</p>
        <AuthForm mode="login" />
        <p>
          Ainda nao tem conta? <Link href="/register">Cadastre-se aqui</Link>
        </p>
      </section>
    </main>
  );
}
