import * as React from "react";

const button: string = "p-2 rounded-lg flex justify-center items-center";
const variants: { [variant: string]: string } = {
  solid: `${button} w-full bg-white bg-opacity-10 hover:bg-opacity-20`,
  highlight: `${button} h-12 shadow-2xl shadow-apricot bg-apricot hover:bg-apricot`,
  link: "underline text-xs text-tower-gray",
};

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant: "solid" | "highlight" | "link";
}

const Button = ({ children, className, variant, ...rest }: ButtonProps) => {
  return (
    <button
      className={`ease-in-out duration-300 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
