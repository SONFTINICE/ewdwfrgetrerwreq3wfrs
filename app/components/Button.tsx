import { Link } from "@remix-run/react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import React from "react";

import LoadingSpinner from "./icons/LoadingSpinner";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "contained" | "outlined";
  size?: "small" | "medium" | "large";
  type?: "submit" | "reset" | "button";
  loading?: boolean;
  to?: string;
  target?: string;
  disabled?: boolean;
  onClick?: VoidFunction;
  children?: ReactNode;
}

const baseStyles =
  "group inline-flex items-center justify-center gap-1 text-sm/5 tracking-wide rounded-md transition focus:outline-none";

const variantStyles = {
  contained: "bg-cyan-500 text-white hover:bg-cyan-500/90",
  outlined: "bg-transparent text-cyan-600 ring ring-cyan-300 hover:bg-cyan-50",
};

const sizeStyles = {
  small: "py-2 px-3",
  medium: "py-2 px-4",
  large: "py-3 px-6",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "contained",
      size = "medium",
      children,
      className,
      loading = false,
      disabled = false,
      type,
      target,
      to,
      onClick,
      ...rest
    },
    ref
  ) => {
    return (
      <>
        {to ? (
          <Link
            to={to}
            className={[
              baseStyles,
              sizeStyles[size],
              variantStyles[variant],
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            target={target}
          >
            {children}
          </Link>
        ) : (
          <button
            ref={ref}
            disabled={disabled}
            onClick={onClick}
            className={[
              baseStyles,
              sizeStyles[size],
              disabled || loading
                ? "opacity-50 bg-slate-700 text-white hover:bg-slate-700 hover:text-white"
                : variantStyles[variant],
              "cursor-pointer relative",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...rest}
          >
            {loading && (
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <LoadingSpinner />
              </span>
            )}
            <span className={loading ? "invisible" : undefined}>
              {children}
            </span>
          </button>
        )}
      </>
    );
  }
);

export default Button;
