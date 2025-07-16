import { API_BASE_URL } from '@/lib/config';
import type { ApiResponse, Recent } from '@/types/anime';

/**
 * Mengambil data anime terbaru, bisa berdasarkan halaman.
 * @param page Nomor halaman yang ingin diambil (opsional).
 */
export async function getRecentData(page?: number): Promise<Recent> {
  // Tambahkan parameter 'page' ke URL jika ada
  const url = new URL(`${API_BASE_URL}/samehadaku/recent`);
    if (page) {
        url.searchParams.append('page', page.toString());
    }

  const response = await fetch(url, {
    next: { revalidate: 300 }, // Revalidasi lebih cepat (5 menit) karena ini data terbaru
  });

  if (!response.ok) {
    throw new Error('Gagal mengambil data anime terbaru');
  }

  const result: ApiResponse<Recent> = await response.json();
  return result.data;
}