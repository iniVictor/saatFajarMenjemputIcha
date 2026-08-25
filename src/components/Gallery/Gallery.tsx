import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { weddingConfig } from "@/config/wedding";
import { Reveal } from "@/components/UI/Reveal";
import { SafeImage } from "@/components/UI/SafeImage";
import { Section } from "@/components/UI/Section";

export function Gallery() {
  const images = weddingConfig.gallery;
  const [index, setIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => {
    setIndex((current) => {
      if (current === null || images.length === 0) return current;
      return (current + images.length - 1) % images.length;
    });
  }, [images.length]);
  const next = useCallback(() => {
    setIndex((current) => {
      if (current === null || images.length === 0) return current;
      return (current + 1) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (index === null) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, index, next, prev]);

  if (images.length === 0) return null;

  const activeSrc = index !== null ? images[index] : null;

  return (
    <Section id="gallery" title={weddingConfig.copy.galleryTitle}>
      <Reveal>
        <div className="columns-2 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className="mb-2 block w-full overflow-hidden rounded-[10px] focus-visible:outline-offset-2"
              onClick={() => setIndex(i)}
              aria-label={`Buka foto ${i + 1}`}
            >
              <SafeImage
                src={src}
                alt={`Galeri ${i + 1}`}
                loading="lazy"
                fetchPriority="low"
                className={`w-full object-cover ${i % 3 === 0 ? "h-52" : "h-40"}`}
              />
            </button>
          ))}
        </div>
      </Reveal>

      {index !== null && activeSrc
        ? createPortal(
            <div
              className="lightbox"
              role="dialog"
              aria-modal="true"
              aria-label="Galeri foto"
              onClick={close}
            >
              <button
                type="button"
                className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white"
                onClick={(event) => {
                  event.stopPropagation();
                  close();
                }}
                aria-label="Tutup galeri"
              >
                <X size={18} />
              </button>
              <button
                type="button"
                className="absolute left-2 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white"
                onClick={(event) => {
                  event.stopPropagation();
                  prev();
                }}
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft size={20} />
              </button>
              <img
                src={activeSrc}
                alt={`Galeri ${index + 1}`}
                className="max-h-[78%] max-w-[86%] object-contain"
                onClick={(event) => event.stopPropagation()}
                onTouchStart={(event) =>
                  setTouchStart(event.changedTouches[0]?.clientX ?? null)
                }
                onTouchEnd={(event) => {
                  const end = event.changedTouches[0]?.clientX;
                  if (touchStart === null || end === undefined) return;
                  const delta = end - touchStart;
                  if (delta > 40) prev();
                  if (delta < -40) next();
                  setTouchStart(null);
                }}
              />
              <button
                type="button"
                className="absolute right-2 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white"
                onClick={(event) => {
                  event.stopPropagation();
                  next();
                }}
                aria-label="Foto berikutnya"
              >
                <ChevronRight size={20} />
              </button>
            </div>,
            document.getElementById("invitation-shell") ?? document.body,
          )
        : null}
    </Section>
  );
}
