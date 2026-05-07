import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AuthForm } from "@/components/auth-form";

export default async function RegisterPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="auth-layout">
      <section className="auth-card">
        <p className="eyebrow">Cadastro</p>
        <h1>Crie sua conta no MVP.</h1>
        <p>Comecamos simples: cliente publica a busca e corretor responde com opcao confirmada.</p>
        <AuthForm mode="register" />
        <p>
          Ja tem conta? <Link href="/login">Entrar</Link>
        </p>
      </section>
    </main>
  );
}
