import { useEffect, useState, type FormEvent } from "react";
import { FloralCorners } from "@/components/Decor/FloralCorners";
import { Grain } from "@/components/Decor/Grain";
import { Divider } from "@/components/UI/Divider";
import { Toast } from "@/components/UI/Toast";
import { weddingConfig } from "@/config/wedding";
import { useToast } from "@/hooks/useToast";
import { copyText } from "@/utils/clipboard";
import { buildGuestInviteUrl } from "@/utils/inviteLink";
import { coupleNames } from "@/utils/format";

export function KirimUndangan() {
  const { couple } = weddingConfig;
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const names = coupleNames(couple.bride.name, couple.groom.name, couple.ampersand);

  useEffect(() => {
    document.title = `Kirim Undangan — ${names}`;
  }, [names]);

  function onGenerate(event: FormEvent) {
    event.preventDefault();
    const generated = buildGuestInviteUrl(name);
    if (!generated) {
      setUrl("");
      setError("Mohon isi nama tamu undangan.");
      return;
    }
    setError("");
    setUrl(generated);
  }

  async function onCopy() {
    if (!url) return;
    const ok = await copyText(url);
    showToast(ok ? "Tautan undangan berhasil disalin" : "Tidak dapat menyalin tautan");
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
              Masukkan nama tamu, lalu generate tautan personal. Spasi dan simbol &amp; akan
              ikut tersimpan di URL.
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
              <button type="submit" className="btn-invite w-full">
                Generate
              </button>
            </form>

            {url ? (
              <div className="mt-8 rounded-[18px] bg-[rgba(255,253,248,0.78)] px-4 py-5 text-left">
                <p className="text-[11px] tracking-[0.16em] text-[var(--color-muted)] uppercase">
                  Tautan undangan
                </p>
                <p className="mt-2 break-all font-display text-[15px] leading-relaxed text-[var(--color-secondary)]">
                  {url}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" className="btn-invite" onClick={() => void onCopy()}>
                    Salin tautan
                  </button>
                  <a
                    href={url}
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
