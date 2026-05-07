"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProposalForm({ profileId, clientName }) {
  const router = useRouter();
  const [form, setForm] = useState({
    propertyLink: "",
    price: "",
    note: "",
    availabilityConfirmed: false
  });
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setFeedback(null);

    const response = await fetch("/api/proposals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        profileId,
        ...form
      })
    });

    const data = await response.json();
    if (!response.ok) {
      setFeedback({ type: "error", message: data.error || "Nao foi possivel enviar a proposta." });
      setLoading(false);
      return;
    }

    setForm({
      propertyLink: "",
      price: "",
      note: "",
      availabilityConfirmed: false
    });
    setFeedback({ type: "success", message: `Proposta enviada para ${clientName}.` });
    setLoading(false);
    router.refresh();
  }

  return (
    <form className="stack" onSubmit={handleSubmit}>
      <label className="field">
        <span>Link do imovel</span>
        <input
          value={form.propertyLink}
          onChange={(event) => setForm({ ...form, propertyLink: event.target.value })}
          placeholder="https://..."
          required
        />
      </label>
      <label className="field">
        <span>Preco</span>
        <input type="number" min="1" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} required />
      </label>
      <label className="field">
        <span>Observacao</span>
        <textarea
          value={form.note}
          onChange={(event) => setForm({ ...form, note: event.target.value })}
          placeholder="Ex.: unidade revisada hoje, pronta para visita."
          required
        />
      </label>
      <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <input
          type="checkbox"
          checked={form.availabilityConfirmed}
          onChange={(event) => setForm({ ...form, availabilityConfirmed: event.target.checked })}
        />
        <span>Confirmo que esta disponivel</span>
      </label>
      {feedback ? <div className={`feedback ${feedback.type === "error" ? "error" : ""}`}>{feedback.message}</div> : null}
      <button className="button" type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar proposta"}
      </button>
    </form>
  );
}
