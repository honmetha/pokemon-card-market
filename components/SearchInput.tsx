import { InputHTMLAttributes } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  SearchInputClassName?: string;
  inputClassName?: string;
}

const SearchInput = ({
  SearchInputClassName,
  inputClassName,
  ...props
}: SearchInputProps) => {
  return (
    <div
      className={`pl-3 h-12 border border-gray-700 rounded-lg ease-in-out duration-300 flex items-center space-x-2 w-full sm:w-56 focus-within:border-white ${SearchInputClassName}`}
    >
      <FiSearch className="text-xl" />
      <input
        placeholder="Search by Name"
        className={`bg-transparent w-full p-3 pl-0 focus:outline-none ${inputClassName}`}
        {...props}
      />
    </div>
  );
};

export default SearchInput;
