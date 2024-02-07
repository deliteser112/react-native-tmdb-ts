export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
}

export interface TVShow {
    id: number;
    name: string;
    poster_path: string;
    overview: string;
    first_air_date: string;
}