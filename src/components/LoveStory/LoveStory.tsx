import { weddingConfig } from "@/config/wedding";
import { Reveal } from "@/components/UI/Reveal";
import { SafeImage } from "@/components/UI/SafeImage";
import { Section } from "@/components/UI/Section";
import { fadeUp } from "@/utils/motion";

export function LoveStory() {
  const { loveStory, copy } = weddingConfig;
  if (!loveStory.enabled || loveStory.items.length === 0) return null;

  return (
    <Section title={copy.loveStoryTitle}>
      <div className="relative mx-auto max-w-[340px] pl-2 text-left">
        <div className="timeline-line" aria-hidden="true" />
        <div className="space-y-10">
          {loveStory.items.map((item, index) => (
            <Reveal key={`${item.date}-${item.title}`} variants={fadeUp} delay={index * 0.08}>
              <article className="relative pl-8">
                <span
                  className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border border-[var(--color-accent)] bg-[var(--color-cream)]"
                  aria-hidden="true"
                />
                <p className="font-heading text-[11px] tracking-[0.22em] text-[var(--color-primary)]">
                  {item.date}
                </p>
                <h3 className="font-display mt-1 text-[22px] text-[var(--color-secondary)]">
                  {item.title}
                </h3>
                {item.image ? (
                  <div className="mt-3 overflow-hidden rounded-[18px]">
                    <SafeImage
                      src={item.image}
                      alt={item.title}
                      className="h-40 w-full object-cover"
                    />
                  </div>
                ) : null}
                <p className="mt-3 text-[13px] leading-relaxed text-[var(--color-muted)]">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
