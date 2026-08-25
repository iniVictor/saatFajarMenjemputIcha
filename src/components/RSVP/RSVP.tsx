import type { FormEvent } from "react";
import type { Attendance } from "@/types/wedding";
import { weddingConfig } from "@/config/wedding";

interface RSVPProps {
  name: string;
  message: string;
  attendance: Attendance;
  error: string;
  onNameChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onAttendanceChange: (value: Attendance) => void;
  onSubmit: (event: FormEvent) => void;
}

export function RSVP({
  name,
  message,
  attendance,
  error,
  onNameChange,
  onMessageChange,
  onAttendanceChange,
  onSubmit,
}: RSVPProps) {
  const { copy } = weddingConfig;

  return (
    <form
      className="mt-6 space-y-3 rounded-[18px] bg-[rgba(255,253,248,0.72)] p-4 text-left"
      onSubmit={onSubmit}
      noValidate
    >
      <label className="block text-[12px] text-[var(--color-muted)]">
        {copy.namePlaceholder}
        <input
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          className="mt-1 w-full rounded-xl border border-[rgba(141,98,73,0.18)] bg-white px-3 py-2.5 text-[14px] outline-none"
          autoComplete="name"
          maxLength={80}
        />
      </label>
      <p className="text-[12px] text-[var(--color-muted)]">{copy.attendancePrompt}</p>
      <div className="flex gap-2">
        {(
          [
            ["attending", copy.attendingLabel],
            ["not_attending", copy.notAttendingLabel],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => onAttendanceChange(value)}
            className={`min-h-11 rounded-full px-4 text-[12px] ${
              attendance === value
                ? "bg-[var(--color-primary)] text-white"
                : "bg-[#f4eee6] text-[var(--color-text)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <label className="block text-[12px] text-[var(--color-muted)]">
        Ucapan
        <textarea
          value={message}
          onChange={(event) => onMessageChange(event.target.value)}
          placeholder={copy.messagePlaceholder}
          rows={3}
          maxLength={500}
          className="mt-1 w-full rounded-xl border border-[rgba(141,98,73,0.18)] bg-white px-3 py-2.5 text-[14px] outline-none"
        />
      </label>
      {error ? <p className="text-[12px] text-[#9a3b32]">{error}</p> : null}
      <button type="submit" className="btn-invite">
        {copy.sendWish}
      </button>
    </form>
  );
}
