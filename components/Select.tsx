import * as React from "react";
import classNames from "classnames";
import { IoIosArrowDown } from "react-icons/io";

interface SelectProps {
  placeholder: string;
  options: IOptions[];
}

interface IOptions {
  value: string;
  label: string;
}

const Select = ({ placeholder, options }: SelectProps) => {
  const [selected, setSelected] = React.useState(placeholder);
  const [expanded, setExpanded] = React.useState(false);
  const display: string = expanded ? "block" : "hidden";

  const expand = () => setExpanded(true);
  const close = () => setExpanded(false);

  const handleClickOption = (label: string, value: string) => {
    setSelected(label);
    console.log(value);
    close();
  };

  return (
    <div
      className="relative text-white text-sm"
      tabIndex={0}
      onFocus={expand}
      onBlur={close}
    >
      <div className="h-10 px-4 py-2 cursor-pointer flex items-center justify-center bg-steel-gray border border-gray-700 rounded-lg ease-in-out duration-300 hover:bg-gray-700">
        {selected} <IoIosArrowDown className="text-lg ml-3" />
      </div>
      <ul
        className={`absolute z-10 cursor-pointer bg-steel-gray rounded-lg w-40 mt-1 right-0 ease-in-out duration-300 ${display}`}
      >
        {options.map((option, index) => (
          <li
            key={option.value}
            className={classNames(
              "h-10 px-4 py-2 border border-b-0 border-gray-700 hover:bg-gray-700",
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
