interface ButtonProps {
  children: string;
  className: string;
  onChange(e: any): void;
}

const Button = ({ children, className, onChange }: ButtonProps) => {
  return (
    <button
      className={`p-2 w-full bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg ease-in-out duration-300 ${className}`}
      onChange={onChange}
    >
      {children}
    </button>
  );
};

export default Button;
