import { useEffect, useState, type FormEvent } from "react";
import { FloralCorners } from "@/components/Decor/FloralCorners";
import { Grain } from "@/components/Decor/Grain";
import { Divider } from "@/components/UI/Divider";
import { Toast } from "@/components/UI/Toast";
import { weddingConfig } from "@/config/wedding";
import { useToast } from "@/hooks/useToast";
import { copyText } from "@/utils/clipboard";
import { createGuest } from "@/services/guestService";
import {
  buildGuestInviteMessage,
  buildGuestInviteUrl,
  buildWhatsAppShareUrl,
} from "@/utils/inviteLink";
import { coupleNames } from "@/utils/format";

export function KirimUndangan() {
  const { couple } = weddingConfig;
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const names = coupleNames(couple.bride.name, couple.groom.name, couple.ampersand);

  useEffect(() => {
    document.title = `Kirim Undangan — ${names}`;
  }, [names]);

  async function onGenerate(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const guest = await createGuest(name);
      const generatedUrl = buildGuestInviteUrl(guest.token);
      const generatedMessage = buildGuestInviteMessage(guest.name, guest.token);
      if (!generatedUrl || !generatedMessage) {
        setUrl("");
        setPreviewUrl("");
        setMessage("");
        setError("Mohon isi nama tamu undangan.");
        return;
      }
      setUrl(generatedUrl);
      setPreviewUrl(buildGuestInviteUrl(guest.token, window.location.origin));
      setMessage(generatedMessage);
    } catch (err) {
      setUrl("");
      setPreviewUrl("");
      setMessage("");
      setError(err instanceof Error ? err.message : "Gagal menyimpan nama tamu.");
    } finally {
      setSaving(false);
    }
  }

  async function onCopy() {
    if (!message) return;
    const ok = await copyText(message);
    showToast(ok ? "Pesan undangan berhasil disalin" : "Tidak dapat menyalin pesan");
  }

  return (
    <div className="shell">
      <div className="phone" id="invitation-shell">
        <Grain />
        <div className="phone-scroll relative overflow-x-hidden px-6 py-12">
          <FloralCorners density="soft" />
          <div className="relative z-10 text-center">
            <p className="font-heading text-[10px] tracking-[0.34em] text-[var(--color-muted)] uppercase">
              The Wedding of
            </p>
            <h1 className="font-script mt-2 text-[44px] leading-none text-[var(--color-secondary)]">
              {names}
            </h1>
            <Divider className="mt-5" />
            <h2 className="font-display mt-8 text-[26px] text-[var(--color-secondary)]">
              Kirim Undangan
            </h2>
            <p className="mx-auto mt-2 max-w-[300px] text-[13px] leading-relaxed text-[var(--color-muted)]">
              Masukkan nama tamu, lalu generate pesan WhatsApp. Nama disimpan di database,
              link hanya berisi kode tamu.
            </p>

            <form className="mt-8 space-y-4 text-left" onSubmit={onGenerate} noValidate>
              <label className="block text-[12px] text-[var(--color-muted)]">
                Nama tamu undangan
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Contoh: Bapak & Ibu Sari"
                  maxLength={80}
                  autoComplete="name"
                  className="mt-1.5 w-full rounded-xl border border-[rgba(141,98,73,0.18)] bg-white px-3 py-3 text-[15px] text-[var(--color-text)] outline-none"
                />
              </label>
              {error ? <p className="text-[12px] text-[#9a3b32]">{error}</p> : null}
              <button type="submit" className="btn-invite w-full" disabled={saving}>
                {saving ? "Menyimpan..." : "Generate"}
              </button>
            </form>

            {message ? (
              <div className="mt-8 rounded-[18px] bg-[rgba(255,253,248,0.78)] px-4 py-5 text-left">
                <p className="text-[11px] tracking-[0.16em] text-[var(--color-muted)] uppercase">
                  Pesan WhatsApp
                </p>
                <pre className="mt-3 whitespace-pre-wrap font-[inherit] text-[13px] leading-relaxed text-[var(--color-text)]">
                  {message}
                </pre>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" className="btn-invite" onClick={() => void onCopy()}>
                    Salin pesan
                  </button>
                  <a
                    href={buildWhatsAppShareUrl(message)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center rounded-full border border-[rgba(141,98,73,0.25)] px-4 text-[11px] tracking-[0.12em] uppercase text-[var(--color-text)]"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={previewUrl || url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center rounded-full border border-[rgba(141,98,73,0.25)] px-4 text-[11px] tracking-[0.12em] uppercase text-[var(--color-text)]"
                  >
                    Buka
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <Toast />
      </div>
    </div>
  );
}
