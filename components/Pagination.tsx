import * as React from "react";
import classNames from "classnames";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

import Button from "./Button";

const startPage: number = 1;
const pagesPerRow: number = 5;

interface Pagination {
  className?: string;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (currentPage: number) => void;
}

const Pagination = ({
  className,
  currentPage,
  totalPages,
  setCurrentPage,
}: Pagination) => {
  const [pages, setPages] = React.useState([1]);

  const handleShowNextPages = () => {
    let newPages: number[] = [...pages];
    for (let i = pages[pages.length - 1] + 1; i < totalPages + 1; i++) {
      newPages.push(i);
      if (newPages.length === 10) break;
    }
    setPages(newPages.slice(-pagesPerRow));
  };

  const handleShowPreviousPages = () => {
    let newPages: number[] = [...pages];
    for (let i = pages[0] - 1; i >= startPage; i--) {
      newPages.unshift(i);
      if (newPages.length === 10) break;
    }
    setPages(newPages.slice(0, pagesPerRow));
  };

  React.useEffect(() => {
    if (totalPages >= pagesPerRow) return setPages([1, 2, 3, 4, 5]);
    const newPages: number[] = new Array(totalPages)
      .fill(null)
      .map((_, i) => i + 1);
    setPages(newPages);
  }, [totalPages]);

  return (
    <div className={`text-sm ${className}`}>
      <Button
        variant="pagination"
        className="w-10 h-10"
        disabled={pages.includes(startPage)}
        onClick={handleShowPreviousPages}
      >
        <BsCaretLeftFill />
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          variant="pagination"
          className={classNames("w-12 h-10", {
            "bg-gray-700": page === currentPage,
          })}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="pagination"
        className="w-10 h-10"
        disabled={pages.includes(totalPages)}
        onClick={handleShowNextPages}
      >
        <BsCaretRightFill />
      </Button>
    </div>
  );
};

export default Pagination;
