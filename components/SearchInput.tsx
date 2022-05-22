import { InputHTMLAttributes } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = ({ ...props }: SearchInputProps) => {
  return (
    <div className="pl-3 h-12 border border-gray-700 rounded-lg focus-within:border-white ease-in-out duration-300 flex items-center space-x-2">
      <FiSearch className="text-xl" />
      <input
        placeholder="Search by Name"
        className="bg-transparent focus:outline-none p-3 pl-0"
        {...props}
      />
    </div>
  );
};

export default SearchInput;
