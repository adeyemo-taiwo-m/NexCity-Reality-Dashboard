import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-between items-center bg-[#e5f6fb] p-3 rounded-b-2xl text-[--color-normal]">
      {/* Prev Button */}
      <button
        className="flex items-center gap-1 text-[--color-normal] hover:text-[--color-dark]"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <HiChevronLeft className="w-4 h-4" />
        <span className="font-medium cursor-pointer">Prev</span>
      </button>

      {/* Page Numbers */}
      <div className="flex gap-6">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-full font-medium transition-all
              ${
                currentPage === page
                  ? "bg-[--color-dark] text-[--color-white]"
                  : "text-[--color-normal] hover:text-[--color-dark]"
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        className="flex items-center gap-1 text-[--color-normal] hover:text-[--color-dark]"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className="font-medium cursor-pointer">Next</span>
        <HiChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
