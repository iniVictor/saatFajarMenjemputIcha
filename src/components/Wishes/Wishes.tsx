import { useEffect, useLayoutEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { RSVP } from "@/components/RSVP/RSVP";
import { Reveal } from "@/components/UI/Reveal";
import { weddingConfig } from "@/config/wedding";
import { useToast } from "@/hooks/useToast";
import { wishService } from "@/services/wishService";
import type { Attendance, Wish } from "@/types/wedding";
import { formatWishTime } from "@/utils/format";

interface WishesProps {
  guestName: string;
}

function invitationScroller(): HTMLElement | null {
  const node = document.querySelector(".phone-scroll");
  return node instanceof HTMLElement ? node : null;
}

export function Wishes({ guestName }: WishesProps) {
  const { copy } = weddingConfig;
  const { showToast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedScroll = useRef<number | null>(null);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("attending");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const stats = useMemo(() => wishService.getAttendanceStats(wishes), [wishes]);

  useEffect(() => {
    let cancelled = false;

    void wishService
      .getWishes()
      .then((next) => {
        if (!cancelled) setWishes(next);
      })
      .catch((cause: unknown) => {
        if (cancelled) return;
        setError(cause instanceof Error ? cause.message : "Gagal memuat ucapan.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useLayoutEffect(() => {
    if (pinnedScroll.current === null) return;
    const scroller = invitationScroller();
    if (scroller) scroller.scrollTop = pinnedScroll.current;
    pinnedScroll.current = null;
    sectionRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [wishes]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (submitting) return;

    const trimmedName = guestName.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setError("Mohon isi nama Anda.");
      return;
    }
    if (trimmedMessage.length < 3) {
      setError("Mohon tulis ucapan Anda.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await wishService.submitWish({
        name: trimmedName,
        message: trimmedMessage,
        attendance,
      });
      const latest = await wishService.getWishes();
      pinnedScroll.current = invitationScroller()?.scrollTop ?? 0;
      setWishes(latest);
      setMessage("");
      showToast(copy.wishSuccess);
    } catch (cause: unknown) {
      setError(cause instanceof Error ? cause.message : "Gagal menyimpan ucapan.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section ref={sectionRef} id="wishes" className="px-6 py-14">
      <Reveal>
        <h2 className="font-script text-center text-[40px] leading-none text-[var(--color-secondary)]">
          {copy.wishesTitle}
        </h2>
        <p className="mt-2 text-center text-[13px] text-[var(--color-muted)]">
          {copy.wishesSubtitle}
        </p>
        <div className="mt-5 flex justify-center gap-8 text-[13px]">
          <p>
            <span className="font-medium">{stats.attending}</span> {copy.attendingLabel}
          </p>
          <p>
            <span className="font-medium">{stats.notAttending}</span> {copy.notAttendingLabel}
          </p>
        </div>
      </Reveal>

      <RSVP
        name={guestName}
        message={message}
        attendance={attendance}
        error={error}
        submitting={submitting}
        onMessageChange={setMessage}
        onAttendanceChange={setAttendance}
        onSubmit={onSubmit}
      />

      <div className="wish-scroll mt-5 space-y-3">
        {loading ? (
          <p className="text-center text-[13px] text-[var(--color-muted)]">Memuat ucapan...</p>
        ) : null}
        {!loading && wishes.length === 0 ? (
          <p className="text-center text-[13px] text-[var(--color-muted)]">Belum ada ucapan.</p>
        ) : null}
        {wishes.map((wish) => {
          const attending = wish.attendance === "attending";
          return (
            <article
              key={wish.id}
              className="flex items-start gap-3 rounded-[16px] bg-[rgba(255,253,248,0.7)] px-4 py-3 text-left"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-medium">{wish.name}</p>
                <p className="text-[11px] text-[var(--color-muted)]">
                  {formatWishTime(wish.createdAt)}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed">{wish.message}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] leading-none ${
                  attending
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[#f4eee6] text-[var(--color-muted)]"
                }`}
              >
                {attending ? copy.attendingLabel : copy.notAttendingLabel}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
