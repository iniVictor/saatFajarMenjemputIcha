import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={`relative px-6 py-[4.25rem] text-center ${className}`}
    >
      {eyebrow ? (
        <p className="font-heading text-[10px] tracking-[0.34em] text-[var(--color-muted)] uppercase">
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h2 className="font-script mt-1 text-[42px] leading-none text-[var(--color-secondary)]">
          {title}
        </h2>
      ) : null}
      {subtitle ? (
        <p className="mx-auto mt-3 max-w-[320px] text-[13px] leading-relaxed text-[var(--color-muted)]">
          {subtitle}
        </p>
      ) : null}
      <div className={title || eyebrow ? "mt-8" : ""}>{children}</div>
    </Tag>
  );
}
