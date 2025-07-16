'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { Pagination } from '@/types/anime';
import { generatePaginationNumbers } from '@/lib/services/PaginationService';

interface PaginationControlsProps {
  pagination: Pagination | null;
}

const PaginationControls: FC<PaginationControlsProps> = ({ pagination }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!pagination || pagination.totalPages <= 1) {
    return null; // Jangan tampilkan apa-apa jika hanya ada 1 halaman atau kurang
  }

  const { currentPage, hasNextPage, hasPreviousPage } = pagination;
  const pageNumbers = generatePaginationNumbers(pagination);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center space-x-2 my-8">
      {/* Tombol Previous */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {/* Nomor Halaman */}
      {pageNumbers.map((page, index) =>
        typeof page === 'string' ? (
          <span key={index} className="px-4 py-2 text-gray-400">...</span>
        ) : (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentPage === page
                ? 'bg-pink-500 text-white' // Diubah
                : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700'
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Tombol Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;