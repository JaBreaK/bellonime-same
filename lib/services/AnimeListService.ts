//AnimeListServices.ts
import { API_BASE_URL } from '@/lib/config';
import type { ApiResponse, AnimeList } from '@/types/anime';

export async function getAnimeListData(): Promise<AnimeList> {
  const response = await fetch(`${API_BASE_URL}/samehadaku/anime`, {
    next: { revalidate: 86400  },
  });
  
  if (!response.ok) {
    throw new Error('Gagal mengambil data anime list');
  }

  const result: ApiResponse<AnimeList> = await response.json();
  return result.data;
}