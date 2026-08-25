import { useEffect, useState, type RefObject } from "react";

export function useScrollSpy(
  ids: readonly string[],
  rootRef: RefObject<HTMLElement | null>,
  enabled: boolean,
): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    if (!enabled || ids.length === 0) return;

    const root = rootRef.current;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0]?.target.id;
        if (top) setActive(top);
      },
      {
        root: root ?? null,
        threshold: [0.18, 0.32, 0.5],
        rootMargin: "-12% 0px -48% 0px",
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, ids, rootRef]);

  return active;
}
