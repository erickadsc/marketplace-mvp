"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const emptyByMode = {
  login: { email: "", password: "", type: "CLIENT", name: "" },
  register: { email: "", password: "", type: "CLIENT", name: "" }
};

export function AuthForm({ mode }) {
  const router = useRouter();
  const [form, setForm] = useState(emptyByMode[mode]);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setFeedback(null);

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const payload =
      mode === "login"
        ? { email: form.email, password: form.password }
        : {
            name: form.name,
            email: form.email,
            password: form.password,
            type: form.type
          };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      setFeedback({ type: "error", message: data.error || "Nao foi possivel continuar." });
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form className="stack" onSubmit={handleSubmit}>
      {mode === "register" ? (
        <>
          <label className="field">
            <span>Nome</span>
            <input
              required
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Seu nome"
            />
          </label>
          <label className="field">
            <span>Tipo de conta</span>
            <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>
              <option value="CLIENT">Cliente</option>
              <option value="BROKER">Corretor</option>
            </select>
          </label>
        </>
      ) : null}

      <label className="field">
        <span>Email</span>
        <input
          required
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          placeholder="voce@email.com"
        />
      </label>

      <label className="field">
        <span>Senha</span>
        <input
          required
          type="password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          placeholder="Minimo de 6 caracteres"
        />
      </label>

      {feedback ? <div className={`feedback ${feedback.type === "error" ? "error" : ""}`}>{feedback.message}</div> : null}

      <button className="button" type="submit" disabled={loading}>
        {loading ? "Enviando..." : mode === "login" ? "Entrar" : "Criar conta"}
      </button>
    </form>
  );
}
