import { MailOpen } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { FloralCorners } from "@/components/Decor/FloralCorners";
import { Grain } from "@/components/Decor/Grain";
import { Divider } from "@/components/UI/Divider";
import { SafeImage } from "@/components/UI/SafeImage";
import { coupleNames } from "@/utils/format";
import { imageCropStyle } from "@/utils/imageCrop";

interface OpeningScreenProps {
  guestName: string;
  leaving: boolean;
  onOpen: () => void;
}

export function OpeningScreen({ guestName, leaving, onOpen }: OpeningScreenProps) {
  const { couple, copy, cover } = weddingConfig;
  const names = coupleNames(couple.bride.name, couple.groom.name, couple.ampersand);

  return (
    <section
      className={`absolute inset-0 z-50 overflow-hidden transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        leaving ? "-translate-y-[110%] opacity-0" : "translate-y-0 opacity-100"
      }`}
      aria-label="Pembuka undangan"
    >
      <SafeImage
        src={cover.image}
        alt=""
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        style={imageCropStyle(cover.positionX, cover.positionY)}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(63,49,40,0.28)_0%,rgba(63,49,40,0.18)_28%,rgba(251,246,238,0.55)_58%,#fff8ee_100%)]" />
      <Grain />
      <FloralCorners />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-8 pb-[calc(4.5rem+env(safe-area-inset-bottom))] pt-16 text-center">
        <p className="font-heading text-[11px] tracking-[0.38em] text-[var(--color-secondary)] uppercase">
          {copy.openingEyebrow}
        </p>
        <h1 className="font-script mt-3 text-[clamp(44px,16vw,58px)] leading-[0.9] text-[var(--color-secondary)]">
          {names}
        </h1>
        <Divider className="mt-5" />
        <p className="mt-8 text-[12px] tracking-[0.04em] text-[var(--color-muted)]">
          {copy.addressedTo}
        </p>
        <p className="mt-1 text-[12px] text-[var(--color-muted)]">{copy.addressedHonorific}</p>
        <p className="font-display mt-2 max-w-[300px] break-words text-[clamp(20px,5.8vw,26px)] font-medium italic leading-snug tracking-[0.03em] text-[var(--color-primary)]">
          {guestName}
        </p>
        <button type="button" className="btn-invite mt-8" onClick={onOpen}>
          <MailOpen size={15} strokeWidth={1.7} />
          {copy.openButton}
        </button>
      </div>
    </section>
  );
}
