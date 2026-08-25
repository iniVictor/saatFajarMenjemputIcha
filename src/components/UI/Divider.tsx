export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`ornament-line ${className}`} aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 1.2c.4 1.8 1.6 3 3.4 3.4C8.6 5 7.4 6.2 7 8 6.6 6.2 5.4 5 3.6 4.6 5.4 4.2 6.6 3 7 1.2Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
