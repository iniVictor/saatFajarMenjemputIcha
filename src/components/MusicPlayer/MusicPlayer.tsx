import { Disc3 } from "lucide-react";

interface MusicPlayerProps {
  playing: boolean;
  onToggle: () => void;
  label: string;
}

export function MusicPlayer({ playing, onToggle, label }: MusicPlayerProps) {
  return (
    <button
      type="button"
      className="music-btn"
      onClick={onToggle}
      aria-label={playing ? `Jeda ${label}` : `Putar ${label}`}
      aria-pressed={playing}
    >
      <span className={playing ? "music-spin" : "opacity-60"}>
        <Disc3 size={20} strokeWidth={1.6} />
      </span>
    </button>
  );
}
