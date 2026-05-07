export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(Number(value || 0));
}

export function formatDateTime(value) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date(value));
}

export function formatUserType(type) {
  return type === "BROKER" ? "Corretor" : "Cliente";
}

export function formatProposalStatus(status) {
  const labels = {
    ACTIVE: "Ativa",
    EXPIRED: "Expirada",
    INVALID: "Invalida"
  };
  return labels[status] || status;
}

export function formatCompactLocation(city, district) {
  return [city, district].filter(Boolean).join(" - ");
}
