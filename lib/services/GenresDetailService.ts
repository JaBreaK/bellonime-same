import { ApiResponse, GenresDetail } from "@/types/anime";
import { API_BASE_URL } from "@/lib/config";
// lib/services/GenresDetailService.ts
export async function getGenresDetailData(genreId: string): Promise<GenresDetail> {
  const response = await fetch(`${API_BASE_URL}/samehadaku/genres/${genreId}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data detail genre");
  }

  const result: ApiResponse<GenresDetail> = await response.json();
  return result.data;
}