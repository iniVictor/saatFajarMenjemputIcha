export function pad2(value: number): string {
  return String(Math.max(0, value)).padStart(2, "0");
}

export function formatWishTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  const day = pad2(date.getDate());
  const month = pad2(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad2(date.getHours());
  const minutes = pad2(date.getMinutes());
  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

export function coupleNames(bride: string, groom: string, joiner = "&"): string {
  return `${bride} ${joiner} ${groom}`;
}
