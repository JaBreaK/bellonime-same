
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
  hasPreviousPage: boolean;
  prevPage: number | null;
  hasNextPage: boolean;
  nextPage: number | null;
  totalPages: number;
}

export interface Home {
    recent: {
        href: string;
        samehadakuUrl: string;
        animeList: {
            title: string;
            poster: string;
            episodes: string;
            releasedOn: string;
            animeId: string;
            href: string;
            samehadakuUrl: string;
        }[];
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
        animeList: {
            title: string;
            poster: string;
            releasedOn: string;
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

export interface Anime {
    list: {
        startwith: string;
        animeList: {
            title: string;
            animeId: string;
            href: string;
            samehadakuUrl: string;
        } [];
    } [];
}

export interface Schedule {
    days: {
        day: string;
        animeList: {
            title: string;
            poster: string;
            type: string;
            score: string;
            estimation: string;
            genres:string [];
            animeId: string;
            href: string;
            samehadakuUrl: string;
        }[];
    }[];
}

export interface Recent {
    animeList: {
        title: string;
        poster: string;
        episodes: string;
        releasedOn: string;
        animeId: string;
        href: string;
        samehadakuUrl: string;
        pagination: Pagination | null;
    }[];
}

export interface Ongoing {
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

export interface Completed {
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

export interface Popular {
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

export interface Movies {
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