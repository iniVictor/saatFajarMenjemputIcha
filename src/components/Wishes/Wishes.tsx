import { useEffect, useMemo, useState, type FormEvent } from "react";
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

export function Wishes({ guestName }: WishesProps) {
  const { copy } = weddingConfig;
  const { showToast } = useToast();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState(guestName);
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

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (submitting) return;

    const trimmedName = name.trim();
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
      const wish = await wishService.submitWish({
        name: trimmedName,
        message: trimmedMessage,
        attendance,
      });
      setWishes((current) => [wish, ...current]);
      setMessage("");
      showToast(copy.wishSuccess);
    } catch (cause: unknown) {
      setError(cause instanceof Error ? cause.message : "Gagal menyimpan ucapan.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="wishes" className="px-6 py-14">
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

        <RSVP
          name={name}
          message={message}
          attendance={attendance}
          error={error}
          submitting={submitting}
          onNameChange={setName}
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
          {wishes.map((wish) => (
            <article
              key={wish.id}
              className="rounded-[16px] bg-[rgba(255,253,248,0.7)] px-4 py-3 text-left"
            >
              <p className="text-[14px] font-medium">{wish.name}</p>
              <p className="text-[11px] text-[var(--color-muted)]">
                {formatWishTime(wish.createdAt)}
              </p>
              <p className="mt-1 text-[13px] leading-relaxed">{wish.message}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
