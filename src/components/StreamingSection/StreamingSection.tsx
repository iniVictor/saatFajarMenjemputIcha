import { Radio } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { Reveal } from "@/components/UI/Reveal";

export function StreamingSection() {
  const { streaming, copy } = weddingConfig;
  if (!streaming.enabled || !streaming.url) return null;

  return (
    <section className="px-6 py-12 text-center">
      <Reveal>
        <h2 className="font-script text-[38px] leading-none text-[var(--color-secondary)]">
          {streaming.title || copy.streamingTitle}
        </h2>
        <p className="mt-4 font-display text-[17px]">{streaming.dateLabel}</p>
        <p className="mt-1 text-[13px] text-[var(--color-muted)]">Pukul {streaming.time}</p>
        <a
          href={streaming.url}
          target="_blank"
          rel="noreferrer"
          className="btn-invite mt-6 inline-flex"
        >
          <Radio size={14} strokeWidth={1.8} />
          {copy.watchLive}
        </a>
      </Reveal>
    </section>
  );
}
