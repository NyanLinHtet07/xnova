import React from "react";

import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";

interface PaginateComponentProps {
    currentPage:number;
    totalPages:number;
    onPageChange: (page: number) => void;
}

const PaginateComponent: React.FC<PaginateComponentProps> = ({
    currentPage,
    totalPages,
    onPageChange
}) => {
    const renderPagination = () =>{
        const pages = [];
        const maxVisiblePages = 5;
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        if(currentPage > 3){
            pages.push(
                <button
                    key={1}
                    onClick={() =>onPageChange(1)}
                    className={`px-4 py-2 mx-1 rounded-2xl text-sm ${currentPage === 1 ? "bg-blue-500 text-white": "bg-gray-50 text-blue-950 hover:bg-gray-200"}`}>
                    1
                </button>
            );

            if(startPage > 2){
                pages.push(
                    <span  key="start-ellipsis" className="px-2 py-2 mx-1 text-white">...</span>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++){
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-4 py-2 mx-1 rounded-2xl text-sm ${currentPage === i ? "bg-cyan-600 text-white": "bg-gray-50 text-cyan-950 hover:bg-gray-200"}`}>
                    {i}
                </button>
            );
        }

        if(currentPage < totalPages - 2){
            if(endPage < totalPages - 1){
                pages.push(
                    <span key="end-ellipsis" className="px-2 py-2 mx-1 text-white"> ... </span>
                );
            }

            pages.push(
                <button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    className={`px-4 py-2 mx-1 rounded-2xl text-sm ${currentPage === totalPages ? "bg-cyan-600 text-white" : "bg-gray-50 text-cyan-950 hover:bg-gray-200"}`}>
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return(
        <div className="flex justify-center mt-8 ">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 text-sm text-white bg-cyan-800 rounded-2xl hover:bg-cyan-600 disabled:bg-gray-50 disabled:text-blue-950">
                <IconChevronsLeft />
            </button>

            {renderPagination()}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 text-sm text-white bg-cyan-800 rounded-2xl hover:bg-cyan-600 disabled:bg-gray-50 disabled:text-blue-950"
            >
                <IconChevronsRight />
            </button>
        </div>
    )
}

export default PaginateComponent;