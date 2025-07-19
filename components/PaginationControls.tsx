'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { Pagination } from '@/types/anime';
import { generatePaginationNumbers } from '@/lib/services/PaginationService';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Impor ikon

interface PaginationControlsProps {
  pagination: Pagination | null;
}

const PaginationControls: FC<PaginationControlsProps> = ({ pagination }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const { currentPage, hasNextPage, hasPrevPage } = pagination;
  const pageNumbers = generatePaginationNumbers(pagination);

const handlePageChange = (page: number) => {
  if (page < 1 || page > pagination.totalPages) return;

  const params = new URLSearchParams(searchParams);
  params.set('page', page.toString());

  // 1. Ganti halaman TANPA scroll otomatis
  router.push(`${pathname}?${params.toString()}`, { scroll: false });

  // 2. Lakukan scroll manual dengan animasi smooth
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

  const baseButtonClass = "flex items-center justify-center h-10 w-10 rounded-lg transition-colors duration-200";
  const disabledClass = "disabled:opacity-50 disabled:cursor-not-allowed";
  const activeClass = "bg-pink-500 text-white font-bold shadow-lg";
  const inactiveClass = "bg-white/10 dark:bg-black/70 hover:bg-pink-500";

  return (
    <div className="flex justify-center items-center space-x-2 my-8">
      {/* Tombol Previous */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className={`${baseButtonClass} ${inactiveClass} ${disabledClass}`}
        aria-label="Halaman Sebelumnya"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Nomor Halaman */}
      {pageNumbers.map((page, index) =>
        typeof page === 'string' ? (
          <span key={`ellipsis-${index}`} className="flex items-center justify-center h-10 w-10 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`${baseButtonClass} ${currentPage === page ? activeClass : inactiveClass}`}
          >
            {page}
          </button>
        )
      )}

      {/* Tombol Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className={`${baseButtonClass} ${inactiveClass} ${disabledClass}`}
        aria-label="Halaman Selanjutnya"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default PaginationControls;