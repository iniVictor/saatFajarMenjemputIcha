import { weddingConfig } from "@/config/wedding";
import { FloralCorners } from "@/components/Decor/FloralCorners";
import { Divider } from "@/components/UI/Divider";
import { Reveal } from "@/components/UI/Reveal";
import { SafeImage } from "@/components/UI/SafeImage";
import { coupleNames } from "@/utils/format";
import { fadeScale } from "@/utils/motion";

export function Hero() {
  const { couple, wedding, copy, cover } = weddingConfig;
  const names = coupleNames(couple.bride.name, couple.groom.name, couple.ampersand);

  return (
    <section id="home" className="relative overflow-hidden px-6 pb-16 pt-14 text-center">
      <FloralCorners density="soft" />
      <Reveal className="relative z-10">
        <p className="font-heading text-[10px] tracking-[0.38em] text-[var(--color-muted)] uppercase">
          {copy.openingEyebrow}
        </p>
        <Reveal variants={fadeScale} className="mt-6">
          <div className="relative mx-auto w-[230px]">
            <img
              src="/images/decor-wreath.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -inset-7"
            />
            <div className="circle-frame">
              <SafeImage
                src={cover.heroImage}
                alt={names}
                loading="eager"
              />
            </div>
          </div>
        </Reveal>
        <h2 className="font-script mt-5 text-[clamp(42px,14vw,52px)] leading-none text-[var(--color-secondary)]">
          {names}
        </h2>
        <p className="mx-auto mt-3 max-w-[280px] text-[13px] leading-relaxed text-[var(--color-muted)]">
          {copy.heroIntro}
        </p>
        <Divider className="mt-5" />
        <p className="mt-4 font-display text-[17px] tracking-[0.04em] text-[var(--color-text)]">
          {wedding.dateLabel}
        </p>
        <a href="#event" className="btn-invite mt-6 inline-flex">
          {copy.saveTheDate}
        </a>
      </Reveal>
    </section>
  );
}
