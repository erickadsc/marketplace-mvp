"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ReviewForm({ proposalId, disabled }) {
  const router = useRouter();
  const [form, setForm] = useState({
    rating: 5,
    comment: ""
  });
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setFeedback(null);

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proposalId, ...form })
    });

    const data = await response.json();
    if (!response.ok) {
      setFeedback({ type: "error", message: data.error || "Nao foi possivel registrar a avaliacao." });
      setLoading(false);
      return;
    }

    setFeedback({ type: "success", message: "Avaliacao registrada." });
    setLoading(false);
    router.refresh();
  }

  async function markInvalid() {
    setLoading(true);
    setFeedback(null);
    const response = await fetch(`/api/proposals/${proposalId}/invalidate`, { method: "PATCH" });
    const data = await response.json();
    if (!response.ok) {
      setFeedback({ type: "error", message: data.error || "Nao foi possivel marcar como invalida." });
      setLoading(false);
      return;
    }
    setFeedback({ type: "success", message: "Proposta marcada como invalida." });
    setLoading(false);
    router.refresh();
  }

  if (disabled) {
    return <p className="empty">Avaliacao ja registrada para esta proposta.</p>;
  }

  return (
    <div className="stack">
      <form className="stack" onSubmit={handleSubmit}>
        <div className="stack two">
          <label className="field">
            <span>Nota</span>
            <select value={form.rating} onChange={(event) => setForm({ ...form, rating: Number(event.target.value) })}>
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Comentario</span>
            <input value={form.comment} onChange={(event) => setForm({ ...form, comment: event.target.value })} required />
          </label>
        </div>
        {feedback ? <div className={`feedback ${feedback.type === "error" ? "error" : ""}`}>{feedback.message}</div> : null}
        <div className="button-row">
          <button className="button" type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Avaliar corretor"}
          </button>
          <button className="button-danger" type="button" onClick={markInvalid} disabled={loading}>
            Marcar proposta invalida
          </button>
        </div>
      </form>
    </div>
  );
}
