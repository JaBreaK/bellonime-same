import Image from "next/image";
import Link from "next/link";
import type { Anime } from "../types/anime";

type LinkType = "detail" | "latest-episode";

interface AnimeCardProps {
  anime: Partial<Anime>; // opsional semua field
  linkTo?: LinkType;
}

export default function AnimeCard({ anime, linkTo = "detail" }: AnimeCardProps) {
  if (!anime?.animeId) return null;

  const href =
    linkTo === "latest-episode"
      ? `/anime/${anime.animeId}/latest`
      : `/anime/${anime.animeId}`;

  return (
    <Link href={href} className="group relative block">
      <div
        className="
          aspect-[2/3] relative overflow-hidden rounded-lg 
          shadow-lg transition-all duration-300
          group-hover:shadow-2xl group-hover:shadow-primary/20
        "
      >
        {/* Skor Bintang di pojok kanan atas */}
        {anime.score && (
          <div
            className="
              absolute top-2.5 right-2.5
              bg-black/60 backdrop-blur-sm
              text-yellow-400 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 z-10
            "
          >
            <span>⭐</span>
            <span>{anime.score}</span>
          </div>
        )}

        {anime.poster ? (
          <Image
            src={anime.poster}
            alt={anime.title ?? "Anime Poster"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            quality={85}
          />
        ) : (
          <div className="bg-gray-800 w-full h-full flex items-center justify-center text-white text-sm">
            No Image
          </div>
        )}

        {anime.episodes && (
          <div
            className="
              absolute top-2.5 left-2.5 
              bg-black/50 backdrop-blur-sm 
              text-white text-xs font-bold px-2 py-1 rounded-md
            "
          >
            Ep {anime.episodes}
          </div>
        )}
      </div>

      {/* Judul */}
      <h3
        className="
          mt-2 font-semibold text-sm line-clamp-2 
          text-foreground transition-colors
          group-hover:text-primary
        "
      >
        {anime.title ?? "No Title"}
      </h3>

      {/* Detail Tambahan */}
      <div className="mt-1 text-xs text-muted-foreground space-y-0.5">
        {anime.releasedOn && <p> {anime.releasedOn}</p>}
        {anime.status && <p>{anime.status}</p>}
        {anime.estimation && <p>Durasi: {anime.estimation}</p>}
        
      </div>
    </Link>
  );
}
