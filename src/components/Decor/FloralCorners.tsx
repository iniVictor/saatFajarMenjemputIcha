export function FloralCorners({ density = "full" }: { density?: "full" | "soft" }) {
  const size = density === "full" ? "w-[168px]" : "w-[128px]";
  const opacity = density === "full" ? "opacity-90" : "opacity-70";

  return (
    <div className={`pointer-events-none absolute inset-0 z-[3] ${opacity}`} aria-hidden="true">
      <img
        src="/images/decor-floral-01.svg"
        alt=""
        className={`flora-l absolute -left-8 -top-6 ${size}`}
      />
      <img
        src="/images/decor-floral-02.svg"
        alt=""
        className={`flora-r absolute -right-8 -top-6 ${size}`}
      />
      <img
        src="/images/decor-floral-01.svg"
        alt=""
        className={`flora-l absolute -bottom-8 -left-8 ${size} rotate-180`}
      />
      <img
        src="/images/decor-floral-02.svg"
        alt=""
        className={`flora-r absolute -bottom-8 -right-8 ${size} -scale-x-100 rotate-180`}
      />
    </div>
  );
}
