import { API_BASE_URL } from '@/lib/config';
import type { ApiResponse, Recent } from '@/types/anime';

// Ubah tipe kembalian menjadi seluruh ApiResponse
export async function getRecentData(page?: number): Promise<ApiResponse<Recent>> {
  const url = new URL(`${API_BASE_URL}/samehadaku/recent`);
  if (page) {
    url.searchParams.append('page', page.toString());
  }

  const response = await fetch(url.toString(), {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error('Gagal mengambil data anime terbaru');
  }

  // Langsung kembalikan seluruh hasil JSON
  return response.json(); 
}