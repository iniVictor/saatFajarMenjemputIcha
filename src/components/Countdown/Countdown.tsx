import { weddingConfig } from "@/config/wedding";
import { useCountdown } from "@/hooks/useCountdown";
import { Reveal } from "@/components/UI/Reveal";
import { pad2 } from "@/utils/format";

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="cd-box">
      <p className="font-display text-[22px] leading-none">{pad2(value)}</p>
      <p className="mt-1.5 text-[9px] tracking-[0.16em] uppercase">{label}</p>
    </div>
  );
}

export function Countdown() {
  const { copy, wedding } = weddingConfig;
  const time = useCountdown(wedding.countdownDate);

  if (!time.isValid) return null;

  return (
    <section className="px-6 py-12 text-center">
      <Reveal>
        <h2 className="font-script text-[38px] leading-none text-[var(--color-secondary)]">
          {copy.countdownTitle}
        </h2>
        {time.isComplete ? (
          <p className="mx-auto mt-6 max-w-[280px] font-display text-[18px] italic text-[var(--color-primary)]">
            {copy.countdownComplete}
          </p>
        ) : (
          <div className="mt-7 flex justify-center gap-2">
            <Unit value={time.days} label={copy.days} />
            <Unit value={time.hours} label={copy.hours} />
            <Unit value={time.minutes} label={copy.minutes} />
            <Unit value={time.seconds} label={copy.seconds} />
          </div>
        )}
      </Reveal>
    </section>
  );
}
