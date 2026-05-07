"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const initialForm = {
  city: "",
  district: "",
  minPrice: "",
  maxPrice: "",
  bedrooms: 1,
  bathrooms: 1,
  parkingSpots: 0
};

export function ClientProfileForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setFeedback(null);

    const response = await fetch("/api/search-profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    if (!response.ok) {
      setFeedback({ type: "error", message: data.error || "Nao foi possivel salvar o perfil." });
      setLoading(false);
      return;
    }

    setFeedback({ type: "success", message: "Perfil de busca salvo com sucesso." });
    setForm(initialForm);
    setLoading(false);
    router.refresh();
  }

  return (
    <form className="stack two" onSubmit={handleSubmit}>
      <label className="field">
        <span>Cidade</span>
        <input
          value={form.city}
          onChange={(event) => setForm({ ...form, city: event.target.value })}
          placeholder="Ex.: Sao Paulo"
          required
        />
      </label>
      <label className="field">
        <span>Bairro</span>
        <input
          value={form.district}
          onChange={(event) => setForm({ ...form, district: event.target.value })}
          placeholder="Ex.: Pinheiros"
          required
        />
      </label>
      <label className="field">
        <span>Preco minimo</span>
        <input type="number" min="0" value={form.minPrice} onChange={(event) => setForm({ ...form, minPrice: event.target.value })} required />
      </label>
      <label className="field">
        <span>Preco maximo</span>
        <input type="number" min="0" value={form.maxPrice} onChange={(event) => setForm({ ...form, maxPrice: event.target.value })} required />
      </label>
      <label className="field">
        <span>Quartos</span>
        <input type="number" min="0" value={form.bedrooms} onChange={(event) => setForm({ ...form, bedrooms: event.target.value })} required />
      </label>
      <label className="field">
        <span>Banheiros</span>
        <input type="number" min="0" value={form.bathrooms} onChange={(event) => setForm({ ...form, bathrooms: event.target.value })} required />
      </label>
      <label className="field">
        <span>Vagas</span>
        <input type="number" min="0" value={form.parkingSpots} onChange={(event) => setForm({ ...form, parkingSpots: event.target.value })} required />
      </label>
      <div className="field">
        <span>Tipo</span>
        <input value="Locacao" disabled />
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        {feedback ? <div className={`feedback ${feedback.type === "error" ? "error" : ""}`}>{feedback.message}</div> : null}
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar perfil de busca"}
        </button>
      </div>
    </form>
  );
}
