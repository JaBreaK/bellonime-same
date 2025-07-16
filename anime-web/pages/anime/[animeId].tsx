import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AnimeDetail, ApiResponse } from '@/types/anime';
import { API_BASE_URL } from '@/lib/config';

const AnimeDetailPage = () => {
  const router = useRouter();
  const { animeId } = router.query;
  const [anime, setAnime] = useState<AnimeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (animeId) {
      const fetchAnimeDetail = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/samehadaku/anime/${animeId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch anime details');
          }
          const result: ApiResponse<AnimeDetail> = await response.json();
          setAnime(result.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAnimeDetail();
    }
  }, [animeId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {anime && (
        <>
          <h1>{anime.title}</h1>
          <img src={anime.poster} alt={anime.title} />
          <p>{anime.synopsis.paragraphs}</p>
          <p>Score: {anime.score.value} ({anime.score.users} users)</p>
          <p>Status: {anime.status}</p>
          <p>Episodes: {anime.episodes}</p>
          <p>Genres: {anime.genreList.map(genre => genre.title).join(', ')}</p>
        </>
      )}
    </div>
  );
};

export default AnimeDetailPage;