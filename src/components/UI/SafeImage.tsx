import type { CSSProperties } from "react";
import { useState } from "react";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
}

export function SafeImage({
  src,
  alt,
  className = "",
  style,
  loading = "lazy",
  fetchPriority,
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`bg-[linear-gradient(160deg,#ead9c6,#d7c1a8)] ${className}`}
        style={style}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      onError={() => setFailed(true)}
    />
  );
}
