import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost";
  size?: "default" | "icon";
};

export function buttonClasses(
    variant: "default" | "ghost" = "default",
    size: "default" | "icon" = "default",
    className = ""
) {
  const base =
      "inline-flex min-h-[44px] items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-200/40 active:scale-[0.98] disabled:opacity-50";

  const variants = {
    default: "bg-pink-200 text-[#24141d] hover:bg-pink-100",
    ghost: "border border-white/12 bg-white/[0.07] text-white hover:bg-white/[0.11]",
  };

  const sizes = {
    default: "px-5 py-2.5",
    icon: "h-10 w-10",
  };

  return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
}

export function Button({
                         children,
                         className = "",
                         variant = "default",
                         size = "default",
                         ...props
                       }: ButtonProps) {
  return (
      <button className={buttonClasses(variant, size, className)} {...props}>
        {children}
      </button>
  );
}

export function Card({
                       children,
                       className = "",
                       style,
                     }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
      <div className={className} style={style}>
        {children}
      </div>
  );
}

export function CardContent({
                              children,
                              className = "",
                            }: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}