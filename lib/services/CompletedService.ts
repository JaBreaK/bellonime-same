import { API_BASE_URL } from '@/lib/config';
import type { ApiResponse, Completed } from '@/types/anime';

/**
 * Mengambil data anime yang telah selesai, bisa berdasarkan halaman.
 * @param page Nomor halaman yang ingin diambil (opsional).
 */
export async function getCompletedData(page?: number): Promise<Completed> {
  const url = new URL(`${API_BASE_URL}/samehadaku/completed`);

  if (page) {
    url.searchParams.append('page', page.toString());
  }

  const response = await fetch(url.toString(), {
    next: { revalidate: 86400 }, // Cukup revalidasi sekali sehari
  });

  if (!response.ok) {
    throw new Error('Gagal mengambil data anime yang telah selesai');
  }

  const result: ApiResponse<Completed> = await response.json();
  return result.data;
}