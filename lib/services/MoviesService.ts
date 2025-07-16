import { API_BASE_URL } from '@/lib/config';
import type { ApiResponse, Movies } from '@/types/anime';

/**
 * Mengambil data film anime, bisa berdasarkan halaman.
 * @param page Nomor halaman yang ingin diambil (opsional).
 */
export async function getMoviesData(page?: number): Promise<Movies> {
  const url = new URL(`${API_BASE_URL}/samehadaku/movies`);

  if (page) {
    url.searchParams.append('page', page.toString());
  }

  const response = await fetch(url.toString(), {
    next: { revalidate: 86400 }, // Revalidasi sekali sehari (24 jam)
  });

  if (!response.ok) {
    throw new Error('Gagal mengambil data film anime');
  }

  const result: ApiResponse<Movies> = await response.json();
  return result.data;
}