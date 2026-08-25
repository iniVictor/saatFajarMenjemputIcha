import { weddingConfig } from "@/config/wedding";
import type { Person } from "@/types/wedding";
import { Reveal } from "@/components/UI/Reveal";
import { SafeImage } from "@/components/UI/SafeImage";
import type { Variants } from "framer-motion";
import { slideLeft, slideRight } from "@/utils/motion";
import { imageCropStyle } from "@/utils/imageCrop";

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </svg>
  );
}

function PersonBlock({
  person,
  label,
  parentPrefix,
  variants,
}: {
  person: Person;
  label: string;
  parentPrefix: string;
  variants: Variants;
}) {
  const hasInstagram = Boolean(person.instagram);

  return (
    <Reveal variants={variants} className="px-4">
      <p className="font-heading text-[10px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
        {label}
      </p>
      <div className="oval-frame mt-4">
        <div className="oval-frame-clip">
          <SafeImage
            src={person.image}
            alt={person.imageAlt || person.fullName}
            style={imageCropStyle(person.positionX, person.positionY, person.zoom)}
          />
        </div>
      </div>
      <h3 className="font-script mt-4 text-[34px] leading-none text-[var(--color-primary)]">
        {person.fullName}
      </h3>
      <p className="mt-3 text-[13px] leading-relaxed text-[var(--color-muted)]">
        {person.orderLabel} {parentPrefix}
        <br />
        {person.father}
        <br />
        {person.mother}
      </p>
      {hasInstagram ? (
        <a
          href={person.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label={`Instagram ${person.name}`}
          className="mt-4 inline-grid h-11 w-11 place-items-center rounded-full border border-[rgba(196,165,116,0.55)] text-[var(--color-primary)]"
        >
          <InstagramIcon />
        </a>
      ) : null}
    </Reveal>
  );
}

export function CoupleSection() {
  const { couple, copy } = weddingConfig;

  return (
    <section id="couple" className="relative overflow-hidden px-6 py-16 text-center">
      <Reveal>
        <h2 className="font-heading whitespace-nowrap text-[clamp(16px,5vw,20px)] font-medium leading-none tracking-[0.02em] text-[var(--color-secondary)]">
          {copy.coupleSalam}
        </h2>
        <p className="mx-auto mt-4 max-w-[320px] text-[13px] leading-relaxed text-[var(--color-muted)]">
          {copy.coupleInvite}
        </p>
      </Reveal>

      <div className="mt-12 space-y-10">
        <PersonBlock
          person={couple.bride}
          label={copy.brideLabel}
          parentPrefix={copy.daughterOf}
          variants={slideRight}
        />
        <p className="font-script text-[40px] leading-none text-[var(--color-accent)]">
          {couple.ampersand}
        </p>
        <PersonBlock
          person={couple.groom}
          label={copy.groomLabel}
          parentPrefix={copy.sonOf}
          variants={slideLeft}
        />
      </div>
    </section>
  );
}
