import { Copy, Gift } from "lucide-react";
import { useState } from "react";
import { weddingConfig } from "@/config/wedding";
import { useToast } from "@/hooks/useToast";
import { Reveal } from "@/components/UI/Reveal";
import { copyText } from "@/utils/clipboard";

export function DigitalGift() {
  const { bankAccounts, copy } = weddingConfig;
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);

  if (bankAccounts.length === 0) return null;

  async function copyNumber(value: string) {
    const ok = await copyText(value);
    showToast(ok ? copy.copiedAccount : "Tidak dapat menyalin nomor rekening");
  }

  return (
    <section className="px-6 py-14 text-center">
      <Reveal>
        <h2 className="font-script text-[40px] leading-none text-[var(--color-primary)]">
          {copy.digitalGiftTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-[320px] text-[13px] leading-relaxed text-[var(--color-muted)]">
          {copy.digitalGiftBody}
        </p>
        <button
          type="button"
          className="btn-invite mt-6 inline-flex"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          <Gift size={14} strokeWidth={1.8} />
          {copy.sendGift}
        </button>

        <div
          className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-out ${
            open ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-4">
              {bankAccounts.map((account) => (
                <article
                  key={`${account.bank}-${account.accountNumber}`}
                  className="mx-auto max-w-[340px] rounded-[20px] bg-[linear-gradient(135deg,rgba(196,165,116,0.18),transparent_42%),#fffdf8] px-5 py-5 text-left shadow-[0_12px_28px_rgba(63,49,40,0.08)]"
                >
                  <div className="flex items-center justify-between">
                    <img src={account.logo} alt="" className="h-6 w-auto" />
                    <p className="font-heading text-[11px] tracking-[0.22em] text-[var(--color-primary)]">
                      {account.bank}
                    </p>
                  </div>
                  <div className="mt-4 h-5 w-8 rounded-[4px] bg-[linear-gradient(135deg,#d4b56a,#b8923a)]" />
                  <p className="mt-4 font-display text-[22px] tracking-[0.12em] text-[var(--color-secondary)]">
                    {account.accountNumber}
                  </p>
                  <div className="mt-5 flex items-end justify-between gap-3">
                    <p className="text-[11px] tracking-[0.14em] uppercase text-[var(--color-muted)]">
                      {account.accountHolder}
                    </p>
                    <button
                      type="button"
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[rgba(141,98,73,0.2)] bg-white px-3 text-[11px] text-[var(--color-text)]"
                      onClick={() => void copyNumber(account.accountNumber)}
                    >
                      <Copy size={12} />
                      {copy.copy}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
