import { API_BASE_URL } from '@/lib/config'; // <-- Impor dari file config
import type { ApiResponse, Home } from '@/types/anime';

export async function getHomeData(): Promise<Home> {
  // Langsung pakai tanpa perlu deklarasi ulang
  const response = await fetch(`${API_BASE_URL}/samehadaku/home`, {
    next: { revalidate: 300 },
  });
  
  if (!response.ok) {
    throw new Error('Gagal mengambil data home');
  }

  const result: ApiResponse<Home> = await response.json();
  return result.data;
}