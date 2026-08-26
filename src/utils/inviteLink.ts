import { coupleNames } from "@/utils/format";
import { weddingConfig } from "@/config/wedding";

const KIRIM_UNDANGAN_PATH = "/kirimUndangan";
export const PUBLIC_INVITE_ORIGIN = "https://saatfajarmenjemputicha.vercel.app";

export function isKirimUndanganPath(pathname = window.location.pathname): boolean {
  return pathname.replace(/\/+$/, "") === KIRIM_UNDANGAN_PATH;
}

export function guestNameFromInput(name: string): string {
  return name.replace(/\s+/g, " ").trim();
}

export function buildGuestInviteUrl(name: string, origin = PUBLIC_INVITE_ORIGIN): string {
  const trimmed = guestNameFromInput(name);
  if (!trimmed) return "";
  return `${origin}/?to=${encodeURIComponent(trimmed)}`;
}

export function buildGuestInviteMessage(name: string, origin = PUBLIC_INVITE_ORIGIN): string {
  const trimmed = guestNameFromInput(name);
  const url = buildGuestInviteUrl(trimmed, origin);
  if (!url) return "";

  const { couple } = weddingConfig;
  const fullNames = coupleNames(couple.bride.fullName, couple.groom.fullName, couple.ampersand);
  const shortNames = coupleNames(couple.bride.name, couple.groom.name, couple.ampersand);

  return `*Wedding Invitation*

Kepada Yth. *${trimmed}*,

Assalamualaikum Warahmatullahi Wabarakatuh

Dengan memohon Rahmat dan Ridho Allah SWT, tanpa mengurangi rasa hormat melalui pesan ini kami mengundang Bapak/Ibu/Saudara/I untuk menghadiri acara pernikahan kami :

*${fullNames}*

Berikut link undangan kami :
${url}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Mohon maaf perihal undangan hanya dibagikan melalui pesan ini

Terima kasih banyak atas perhatiannya.
Wassalamualaikum Warahmatullahi Wabarakatuh

Hormat kami,
*${shortNames}*`;
}

export function buildWhatsAppShareUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
