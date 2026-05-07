"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteSearchProfileButton({ profileId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm("Excluir este perfil de busca e as propostas vinculadas?");
    if (!confirmed) {
      return;
    }

    setLoading(true);
    const response = await fetch(`/api/search-profiles/${profileId}`, { method: "DELETE" });
    setLoading(false);

    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <button className="button-ghost" type="button" onClick={handleDelete} disabled={loading}>
      {loading ? "Excluindo..." : "Excluir perfil"}
    </button>
  );
}
