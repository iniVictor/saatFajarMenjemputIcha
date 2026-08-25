import { useMemo, useState, type FormEvent } from "react";
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
  const [wishes, setWishes] = useState<Wish[]>(() => wishService.getWishes());
  const [name, setName] = useState(guestName);
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("attending");
  const [error, setError] = useState("");

  const stats = useMemo(() => wishService.getAttendanceStats(wishes), [wishes]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
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

    const wish = wishService.submitWish({
      name: trimmedName,
      message: trimmedMessage,
      attendance,
    });
    setWishes((current) => [wish, ...current]);
    setMessage("");
    setError("");
    showToast(copy.wishSuccess);
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
          onNameChange={setName}
          onMessageChange={setMessage}
          onAttendanceChange={setAttendance}
          onSubmit={onSubmit}
        />

        <div className="wish-scroll mt-5 space-y-3">
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
