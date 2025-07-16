import { ApiResponse, Genres } from "@/types/anime";
import { API_BASE_URL } from "@/lib/config";

export async function getGenresData(): Promise<Genres> {
  const response = await fetch(`${API_BASE_URL}/samehadaku/genres`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data genres");
  }

  const result: ApiResponse<Genres> = await response.json();
  return result.data;
}