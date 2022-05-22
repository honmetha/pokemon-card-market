import * as React from "react";

const variants: { [variant: string]: string } = {
  solid: "w-full bg-white bg-opacity-10 hover:bg-opacity-20",
  outline: "",
  highlight: "",
};

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant: "solid" | "outline" | "highlight";
}

const Button = ({ children, className, variant, ...rest }: ButtonProps) => {
  return (
    <button
      className={`p-2 rounded-lg ease-in-out duration-300 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
