import { weddingConfig } from "@/config/wedding";
import { FloralCorners } from "@/components/Decor/FloralCorners";
import { Reveal } from "@/components/UI/Reveal";
import { SafeImage } from "@/components/UI/SafeImage";
import { coupleNames } from "@/utils/format";

export function ClosingSection() {
  const { couple, copy, cover } = weddingConfig;
  const names = coupleNames(couple.bride.name, couple.groom.name, couple.ampersand);

  return (
    <section className="relative overflow-hidden pb-[7.5rem] text-center">
      <div className="bg-[var(--color-nav)] px-8 pb-8 pt-10">
        <div className="circle-frame border-[3px] border-[#f7efe4]">
          <SafeImage src={cover.heroImage} alt={names} />
        </div>
      </div>
      <svg
        className="block h-12 w-full"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path fill="#9a7b64" d="M0,40 C240,90 480,10 720,40 C960,70 1200,10 1440,45 L1440,90 L0,90 Z" />
        <path fill="#fff8ee" d="M0,58 C260,98 500,18 740,50 C980,82 1200,28 1440,62 L1440,90 L0,90 Z" />
      </svg>
      <div className="relative px-8 pt-4">
        <FloralCorners density="soft" />
        <Reveal className="relative z-10">
          <p className="font-heading text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
            {copy.thankYou}
          </p>
          <p className="mt-4 text-[13px] leading-relaxed text-[var(--color-muted)]">
            {copy.closingThanks}
          </p>
          <p className="font-heading mt-5 whitespace-nowrap text-[clamp(16px,5vw,20px)] font-medium leading-none tracking-[0.02em] text-[var(--color-secondary)]">
            {copy.closingSalam}
          </p>
          <p className="font-script mt-3 text-[44px] leading-none text-[var(--color-secondary)]">
            {names}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
