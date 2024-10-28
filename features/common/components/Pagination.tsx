import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginateUrl: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginateUrl,
}) => {
  const pageNumbers = [];
  const maxPageNumbersToShow = 4;
  const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);
  let startPage = Math.max(1, currentPage - halfMaxPageNumbersToShow);
  let endPage = Math.min(totalPages, currentPage + halfMaxPageNumbersToShow);

  if (currentPage <= halfMaxPageNumbersToShow) {
    endPage = Math.min(totalPages, maxPageNumbersToShow);
  } else if (currentPage + halfMaxPageNumbersToShow >= totalPages) {
    startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1);
  }

  // 1ページ目を常に表示
  if (startPage > 1) {
    pageNumbers.push(1);
    if (startPage > 2) {
      pageNumbers.push("...");
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // 最終ページを常に表示
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }
    pageNumbers.push(totalPages);
  }

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        {currentPage > 1 && (
          <Link
            href={`${paginateUrl}/${currentPage - 1}`}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon
              aria-hidden="true"
              className="mr-3 h-5 w-5 text-gray-400"
            />
            Previous
          </Link>
        )}
      </div>
      <div className="md:hidden -mt-px flex justify-center">
        <span className="inline-flex items-center border-t-2 border-gray-500 px-4 pt-4 text-sm font-medium text-gray-700">
          {currentPage}
        </span>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {pageNumbers.map((number, index) =>
          typeof number === "number" ? (
            <Link
              key={index}
              href={`${paginateUrl}/${number}`}
              className={`inline-flex items-center border-t-2 ${
                currentPage === number
                  ? "border-gray-500 text-gray-700"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } px-4 pt-4 text-sm font-medium`}
            >
              {number}
            </Link>
          ) : (
            <span
              key={index}
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
            >
              {number}
            </span>
          )
        )}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        {currentPage < totalPages && (
          <Link
            href={`${paginateUrl}/${currentPage + 1}`}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon
              aria-hidden="true"
              className="ml-3 h-5 w-5 text-gray-400"
            />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
