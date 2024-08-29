import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate }) => {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = () => {
        const maxPageNumbersToShow = 5;
        const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);
        let startPage = Math.max(1, currentPage - halfMaxPageNumbersToShow);
        let endPage = Math.min(totalPages, currentPage + halfMaxPageNumbersToShow);

        if (currentPage <= halfMaxPageNumbersToShow) {
            endPage = Math.min(totalPages, maxPageNumbersToShow);
        } else if (currentPage + halfMaxPageNumbersToShow >= totalPages) {
            startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1);
        }

        const pageNumbersToShow = pageNumbers.slice(startPage - 1, endPage);

        return (
            <>
                {startPage > 1 && (
                    <>
                        <button onClick={() => paginate(1)} className="px-4 py-2 mx-1 bg-gray-300 text-gray-600 rounded-md transition hover:bg-blue-700">1</button>
                        {startPage > 2 && <span className="px-4 py-2 mx-1">...</span>}
                    </>
                )}
                {pageNumbersToShow.map(number => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 mx-1 ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'} rounded-md transition hover:bg-blue-700`}
                    >
                        {number}
                    </button>
                ))}
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="px-4 py-2 mx-1">...</span>}
                        <button onClick={() => paginate(totalPages)} className="px-4 py-2 mx-1 bg-gray-300 text-gray-600 rounded-md transition hover:bg-blue-700">{totalPages}</button>
                    </>
                )}
            </>
        );
    };

    return (
        <div className="flex justify-center mt-4">
            {renderPageNumbers()}
        </div>
    );
};

export default Pagination;