import React from "react";
import Button from "@/components/button";

interface IPagination {
    handleLoadNextPage: (x: string) => void;
    handleLoadPrevPage: (x: string) => void;
    handleLoadPage: (x: number) => void;
    totalPages: number;
    currentPage: number;
}

const Pagination = ({
                        handleLoadPrevPage,
                        handleLoadPage,
                        handleLoadNextPage,
                        totalPages,
                        currentPage,
                    }: IPagination) => {
    return (
        <div className="px-8 py-2 mobile:pb-9 w-full flex items-center justify-between mobile:flex-col-reverse gap-7">
            <span className="text-14_16 text-grey-seccondary">
                Showing page {currentPage} of {totalPages} entries
            </span>
            <div className="flex items-center gap-2">
                <Button
                    request={handleLoadPrevPage}
                    className={`btnSec btnArrow ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""}`}
                    icon={"arrowLeft"}
                    disabled={currentPage === 1}
                />
                <div className="flex items-center gap-0.5">
                    {Array.from({length: totalPages}, (_, i) => (
                        <div
                            key={i}
                            className={`flex items-center py-2 px-4 cursor-pointer text-12 ${currentPage === i + 1 ? "text-blue-600" : "text-grey-tertiary"} lg:hover:text-default transition duration-300`}
                            onClick={() => handleLoadPage(i + 1)}
                        >
                            <span>{i + 1}</span>
                        </div>
                    ))}
                </div>
                <Button
                    className={`btnSec btnArrow ${currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}`}
                    icon={"arrowRight"}
                    request={handleLoadNextPage}
                    disabled={currentPage === totalPages}
                />
            </div>
        </div>
    );
};

export default Pagination;
