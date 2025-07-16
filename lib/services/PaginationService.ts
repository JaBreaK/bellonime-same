import type { Pagination } from '@/types/anime';

/**
 * Menghasilkan daftar nomor halaman untuk ditampilkan di komponen pagination.
 *
 * @param {Pagination | null} pagination - Objek pagination yang diterima dari API.
 * @returns {Array<number | string>} - Array yang berisi nomor halaman,
 * misalnya: [1, 2, 3, '...', 10]
 */
export function generatePaginationNumbers(
  pagination: Pagination | null
): Array<number | string> {
  // Jika tidak ada data pagination, kembalikan array kosong
  if (!pagination || pagination.totalPages <= 1) {
    return [];
  }

  const currentPage = pagination.currentPage;
  const totalPages = pagination.totalPages;
  const pagesToShow = 5; // Jumlah nomor halaman yang ingin ditampilkan sekaligus

  // Jika total halaman kurang dari atau sama dengan yang ingin ditampilkan,
  // tampilkan semua nomor halaman.
  if (totalPages <= pagesToShow) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: Array<number | string> = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  // Selalu tambahkan halaman pertama
  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push('...'); // Tambahkan elipsis jika ada jeda
    }
  }

  // Tambahkan nomor halaman di sekitar halaman saat ini
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Selalu tambahkan halaman terakhir
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push('...'); // Tambahkan elipsis jika ada jeda
    }
    pages.push(totalPages);
  }

  return pages;
}