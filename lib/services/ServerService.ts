import { ApiResponse, Server } from "@/types/anime";
import { API_BASE_URL } from "@/lib/config";
// lib/services/ServerService.ts
export async function getServerData(): Promise<Server> {
  const response = await fetch(`${API_BASE_URL}/samehadaku/server`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data server");
  }

  const result: ApiResponse<Server> = await response.json();
  return result.data;
}