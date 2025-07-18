import { ApiResponse, Episode } from "@/types/anime";
import { API_BASE_URL } from "@/lib/config";
// lib/services/EpisodeService.ts
export async function getEpisodeData(episodeId: string): Promise<Episode> {
  const response = await fetch(`${API_BASE_URL}/samehadaku/episode/${episodeId}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data episode anime");
  }

  const result: ApiResponse<Episode> = await response.json();
  return result.data;
}
export async function getServerUrl(serverId: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/samehadaku/server/${serverId}`);
  if (!response.ok) {
    throw new Error('Gagal mengambil URL server');
  }
  const result = await response.json();
  return result.data.url; // Asumsi API mengembalikan { data: { url: '...' } }
}