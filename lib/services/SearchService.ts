import { API_BASE_URL } from '@/lib/config';
import type { ApiResponse, Search } from '@/types/anime';

/**
 * Mengambil data hasil pencarian berdasarkan query dan halaman.
 * @param query Kata kunci pencarian.
 * @param page Nomor halaman yang ingin diambil (opsional).
 */
export async function getSearchData(query: string, page?: number): Promise<Search> {
  // Gabungkan query dan page ke dalam URL
  const url = new URL(`${API_BASE_URL}/samehadaku/search/${encodeURIComponent(query)}`);
  
  if (page) {
    url.searchParams.append('page', page.toString());
  }

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error('Gagal mengambil data pencarian');
  }

  const result: ApiResponse<Search> = await response.json();
  return result.data;
}