import type { CSSProperties } from "react";

export function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 50;
  return Math.min(100, Math.max(0, value));
}

export function imageCropStyle(
  positionX: number,
  positionY: number,
  zoom = 1,
): CSSProperties {
  const x = clampPercent(positionX);
  const y = clampPercent(positionY);
  const scale = Number.isFinite(zoom) ? Math.min(20, Math.max(1, zoom)) : 1;

  return {
    objectPosition: `${x}% ${y}%`,
    transform: scale === 1 ? undefined : `scale(${scale})`,
    transformOrigin: `${x}% ${y}%`,
  };
}
