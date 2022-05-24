import * as React from "react";
import classNames from "classnames";
import { IoIosArrowDown } from "react-icons/io";

import { IOptions } from "../types/interfaces";

interface SelectProps {
  placeholder: string;
  options: IOptions[];
  setParentState: (value: string) => void;
}

const Select = ({ placeholder, options, setParentState }: SelectProps) => {
  const [selected, setSelected] = React.useState(placeholder);
  const [expanded, setExpanded] = React.useState(false);
  const display: string = expanded ? "block" : "hidden";

  const toggleExpand = () => setExpanded(!expanded);
  const close = () => setExpanded(false);

  const handleClickOption = (label: string, value: string) => {
    setSelected(label);
    setParentState(value);
    close();
  };

  return (
    <div className="relative text-white text-sm" tabIndex={0} onBlur={close}>
      <div
        className="h-10 px-4 py-2 cursor-pointer flex items-center justify-center bg-steel-gray border border-gray-700 rounded-lg ease-in-out duration-300 hover:bg-gray-700"
        onClick={toggleExpand}
      >
        {selected} <IoIosArrowDown className="text-lg ml-3" />
      </div>
      <ul
        className={`absolute z-10 ease-in-out duration-300 cursor-pointer bg-steel-gray rounded-lg w-40 mt-1 left-0 sm:right-0 ${display}`}
      >
        {options.map((option, index) => (
          <li
            key={option.value}
            className={classNames(
              "min-h-10 px-4 py-2 border border-b-0 border-gray-700 hover:bg-gray-700",
              { "rounded-t-lg": index === 0 },
              { "rounded-b-lg border-b": index === options.length - 1 }
            )}
            onClick={() => handleClickOption(option.label, option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
