"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/auth/me", { method: "DELETE" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button className="button-secondary" type="button" onClick={handleLogout} disabled={loading}>
      {loading ? "Saindo..." : "Sair"}
    </button>
  );
}
