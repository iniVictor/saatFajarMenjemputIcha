import { MapPin } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import type { WeddingEvent } from "@/types/wedding";
import { Reveal } from "@/components/UI/Reveal";

function EventBlock({ event }: { event: WeddingEvent }) {
  if (!event.enabled) return null;

  const hasMap = Boolean(event.mapsUrl);

  return (
    <article className="py-8">
      <p className="font-heading text-[11px] tracking-[0.28em] text-[var(--color-primary)] uppercase">
        {event.title}
      </p>
      <div className="mx-auto mt-4 h-px w-16 bg-[var(--color-accent)]" aria-hidden="true" />
      <p className="mt-4 font-display text-[18px] text-[var(--color-text)]">{event.dateLabel}</p>
      <p className="mt-1 text-[13px] text-[var(--color-muted)]">Pukul {event.time}</p>
      <p className="mt-4 text-[14px] font-medium text-[var(--color-secondary)]">{event.location}</p>
      <p className="mx-auto mt-1 max-w-[280px] text-[12px] leading-relaxed text-[var(--color-muted)]">
        {event.address}
      </p>
      {hasMap ? (
        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-invite mt-5 inline-flex"
        >
          <MapPin size={14} strokeWidth={1.8} />
          {weddingConfig.copy.viewLocation}
        </a>
      ) : null}
    </article>
  );
}

export function EventSection() {
  const { events } = weddingConfig;
  const visible = [events.akad, events.reception].filter((event) => event.enabled);
  if (visible.length === 0) return null;

  return (
    <section id="event" className="px-6 py-12 text-center">
      <Reveal>
        {visible.map((event, index) => (
          <div key={event.title}>
            {index > 0 ? (
              <div className="mx-auto h-px w-24 bg-[rgba(196,165,116,0.35)]" aria-hidden="true" />
            ) : null}
            <EventBlock event={event} />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
