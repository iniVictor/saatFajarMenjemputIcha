import { CalendarDays, Heart, Home, Images, MessageCircle } from "lucide-react";

const ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "couple", label: "Mempelai", icon: Heart },
  { id: "event", label: "Acara", icon: CalendarDays },
  { id: "gallery", label: "Galeri", icon: Images },
  { id: "wishes", label: "Ucapan", icon: MessageCircle },
] as const;

interface FloatingNavigationProps {
  activeId: string;
  onNavigate: (id: string) => void;
}

export function FloatingNavigation({ activeId, onNavigate }: FloatingNavigationProps) {
  return (
    <nav className="nav-dock" aria-label="Navigasi undangan">
      <div className="nav-bar">
        {ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={`nav-btn ${activeId === id ? "is-active" : ""}`}
            aria-label={label}
            aria-current={activeId === id ? "true" : undefined}
            onClick={() => onNavigate(id)}
          >
            <Icon size={18} strokeWidth={1.7} />
          </button>
        ))}
      </div>
    </nav>
  );
}
