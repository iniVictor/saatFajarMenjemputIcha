import { Copy } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { useToast } from "@/hooks/useToast";
import { Reveal } from "@/components/UI/Reveal";
import { copyText } from "@/utils/clipboard";

export function PhysicalGift() {
  const { gift, copy } = weddingConfig;
  const { showToast } = useToast();

  if (!gift.enabled) return null;

  async function copyValue(value: string, success: string) {
    const ok = await copyText(value);
    showToast(ok ? success : "Tidak dapat menyalin");
  }

  return (
    <section className="px-6 pb-14 text-center">
      <Reveal>
        <h2 className="font-script text-[36px] leading-none text-[var(--color-secondary)]">
          {copy.physicalGiftTitle}
        </h2>
        <div className="mx-auto mt-6 max-w-[320px] text-[13px] leading-relaxed text-[var(--color-text)]">
          <p>
            {copy.recipientLabel} : {gift.recipient}
          </p>
          <p className="mt-2">
            {copy.phoneLabel} : {gift.phone}
          </p>
          <p className="mt-2">
            {copy.addressLabel} : {gift.address}
          </p>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-[rgba(141,98,73,0.25)] px-4 text-[11px] tracking-[0.08em] uppercase"
            onClick={() => void copyValue(gift.phone, copy.copiedPhone)}
          >
            <Copy size={12} />
            {copy.phoneLabel}
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-[rgba(141,98,73,0.25)] px-4 text-[11px] tracking-[0.08em] uppercase"
            onClick={() => void copyValue(gift.address, copy.copiedAddress)}
          >
            <Copy size={12} />
            {copy.addressLabel}
          </button>
        </div>
      </Reveal>
    </section>
  );
}
