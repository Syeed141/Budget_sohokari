export function formatBDT(amount: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatShortDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getMonthName(month: number) {
  return new Date(2000, month - 1, 1).toLocaleString("en-BD", {
    month: "long",
  });
}
