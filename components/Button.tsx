import * as React from "react";

const button: string = "p-2 rounded-lg flex justify-center items-center";
const variants: { [variant: string]: string } = {
  solid: `${button} w-full bg-white bg-opacity-10 hover:bg-opacity-20`,
  highlight: `${button} h-12 shadow-2xl shadow-apricot bg-apricot hover:bg-apricot`,
  link: "underline text-xs text-tower-gray",
  pagination: `${button} bg-steel-gray border border-gray-700 hover:bg-gray-700`,
};

const disabledClasses: { [variant: string]: string } = {
  solid: "cursor-not-allowed hover:bg-opacity-10 opacity-30",
  highlight: "cursor-not-allowed",
  link: "cursor-not-allowed",
  pagination: "cursor-not-allowed hover:bg-steel-gray opacity-30",
};

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant: "solid" | "highlight" | "link" | "pagination";
  disabled?: boolean;
}

const Button = ({
  children,
  className,
  variant,
  disabled,
  ...rest
}: ButtonProps) => {
  const disabledClass: string = disabled ? disabledClasses[variant] : "";

  return (
    <button
      className={`ease-in-out duration-300 ${variants[variant]} ${disabledClass} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
