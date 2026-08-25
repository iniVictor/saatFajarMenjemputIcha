import { weddingConfig } from "@/config/wedding";
import { Divider } from "@/components/UI/Divider";
import { Reveal } from "@/components/UI/Reveal";

export function QuoteSection() {
  const { quote } = weddingConfig;

  return (
    <section className="relative px-8 py-12 text-center">
      <Reveal>
        <Divider />
        <blockquote className="font-display mx-auto mt-6 max-w-[340px] text-[17px] italic leading-relaxed text-[var(--color-text)]">
          “{quote.text}”
        </blockquote>
        <p className="mt-4 font-heading text-[11px] tracking-[0.16em] text-[var(--color-primary)]">
          {quote.source}
        </p>
      </Reveal>
    </section>
  );
}
