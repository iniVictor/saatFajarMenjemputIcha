import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, className = "", type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={`btn-invite ${className}`} {...props}>
      {children}
    </button>
  );
}
