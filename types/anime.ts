
// types/anime.ts
// Definisikan tipe data untuk Anime sesuai dengan struktur API Bellonime



export interface ApiResponse<T> {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: T;
  pagination: Pagination | null;
}
 
export interface Pagination {
  currentPage: number;
  hasPrevPage: boolean;
  prevPage: number | null;
  hasNextPage: boolean;
  nextPage: number | null;
  totalPages: number;
}

export interface Anime {
    title: string;
    poster: string;
    episodes: string;
    releasedOn: string;
    animeId: string;
    href: string;
    samehadakuUrl: string;
    genreList: Genres [];
    type: string;
    score: string;
    estimation: string;
    genres:string [];
    status: string;

}


export interface Home {
    recent: {
        href: string;
        samehadakuUrl: string;
        animeList: Anime [];
    };
    batch: {
        href: string;
        samehadakuUrl: string;
        batchList: {

        }[];
    }
    movie: {
        href: string;
        samehadakuUrl: string;
        animeList: Anime[];
    }
}

export interface Genres {
    genreList: {
        title: string;
        genreId: string;
        href: string;
        samehadakuUrl: string;
    }[];
}

export interface GenresLink {
        title: string;
        genreId: string;
        href: string;
        samehadakuUrl: string;
}

export interface AnimeList {
    list: {
        startwith: string;
        animeList: Anime [];
    } [];
}

export interface Schedule {
    days: {
        day: string;
        animeList: Anime[];
    }[];
}

export interface Recent {
    animeList: Anime [];
}

export interface Ongoing {
    animeList: Anime [] ;
}

export interface Completed {
    animeList: Anime [];
}

export interface Popular {
    animeList: Anime [] ;
}

export interface Movies {
    animeList: Anime [] ;
}

export interface Batch {
    batchList: {
        title: string;
        poster: string;
        type: string;
        score: string;
        status: string;
        batchId: string;
        href: string;
        samehadakuUrl: string;
        genreList: {
            title: string;
            genreId: string;
            href: string;
            samehadakuUrl: string;
        }[];
    }[];
    pagination: Pagination | null;
}

export interface Search {
    animeList: {
        title: string;
        poster: string;
        type: string;
        score: string;
        status: string;
        animeId: string;
        href: string;
        samehadakuUrl: string;
        genreList: {
            title: string;
            genreId: string;
            href: string;
            samehadakuUrl: string;
        }[];
    }[];
    pagination: Pagination | null;
}

export interface GenresDetail {
    animeList: {
        title: string;
        poster: string;
        type: string; 
        score: string;
        status: string;
        animeId: string;
        href: string;
        samehadakuUrl: string;
        genreList: {
            title: string;
            genreId: string;
            href: string;
            samehadakuUrl: string;
        }[];
    }[];
    pagination: Pagination | null;
}

export interface AnimeDetail {
    title: string;
    poster: string;
    score: {
        value: string;
        users: string;
    }
    japanese: string;
    synonyms: string[];
    english: string;
    status: string;
    type: string;
    source: string;
    duration: string;
    episodes: string;
    season: string;
    studios: string[];
    producers: string[];
    aired: string;
    trailer: string;
    synopsis: {
        paragraphs: string;
        connections: string[];
    }
    genreList: {
        title: string;
        genreId: string;
        href: string;
        samehadakuUrl: string;
    }[];
    batchList: {
        title: string;
        batchId: string;
        href: string;
        samehadakuUrl: string;
    } [];
    episodeList: {
        title: string;
        episodeId: string;
        href: string;
        samehadakuUrl: string;
    }[];
}

export interface Episode {
    title: string;
    animeId: string;
    poster: string;
    releasedOn: string;
    defaultStreamingUrl: string;
    hasPrevEpisode: boolean;
    prevEpisode: {
        title: string;
        episodeId: string;
        href: string;
        samehadakuUrl: string;
    } | null;
    hasNextEpisode: boolean;
    nextEpisode: {
        title: string;
        episodeId: string;
        href: string;
        samehadakuUrl: string;
    } | null;
    synopsis: {
        paragraphs: string;
        connections: string[];
    }
    genreList: {
        title: string;
        genreId: string;
        href: string;
        samehadakuUrl: string;
    }[];
    server: {
        qualities: {
            title: string;
            serverList: {
                title: string;
                serverId: string;
                href: string;
            }[];
        }
    };
    downloadUrl: {
        formats: {
            title: string;
            qualities: {
                title: string;
                urls: {
                    title: string;
                    url: string;
                }[];
            }[];
        }[];
    }
    recomendedEpisodeList: {
        title: string;
        poster: string;
        releaseDate: string;
        episodeId: string;
        href: string;
        samehadakuUrl: string;
    } [];
    movie: {
        href: string;
        samehadakuUrl: string;
        animeList: {
            title: string;
            poster: string;
            releaseDate: string;
            animeId: string;
            href: string;
            samehadakuUrl: string;
            genreList: {
                title: string;
                genreId: string;
                href: string;
                samehadakuUrl: string;
            } [];
        }[];
    };
}
export interface Server {
    url: string;
}

export interface Batchdetail {
    title: string;
    animeId: string;
    poster: string;
    japanese: string;
    synonyms: string[];
    english: string;
    status: string;
    type: string;
    source: string;
    score: string;
    duration: string;
    episodes: string;
    season: string;
    studios: string[];
    producers: string[];
    aired: string;
    releasedOn: string;
    synopsis: {
        paragraphs: string;
        connections: string[];
    }
    genreList: {
        title: string;
        genreId: string;
        href: string;
        samehadakuUrl: string;
    }[];
    downloadUrl: {
        formats: {
            title: string;
            qualities: {
                title: string;
                urls: {
                    title: string;
                    url: string;
                }[];
            }[];
        }[];
    };
    recommendedAnimeList: {
        title: string;
        poster: string;
        animeId: string;
        href: string;
        samehadakuUrl: string;
    }[];
}