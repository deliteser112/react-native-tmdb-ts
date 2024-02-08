import React, { createContext, useState, useEffect } from 'react';
import { Movie, TVShow } from './types'; // Import the types
import {
  getTrendingTVShows,
  getPopularMovies,
  getPopularTVShows,
} from '../api/TMDBService';

// Define the shape of your context state using specific types
interface AppContextState {
  trendingTVShows: TVShow[];
  popularMovies: Movie[];
  popularTVShows: TVShow[];
  loading: boolean;
  error: string | null;
  fetchTrendingTVShows: () => void;
  fetchPopularMovies: () => void;
  fetchPopularTVShows: () => void;
}

// Create the context with a default value
export const AppContext = createContext<AppContextState>({
  trendingTVShows: [],
  popularMovies: [],
  popularTVShows: [],
  loading: false,
  error: null,
  fetchTrendingTVShows: () => {},
  fetchPopularMovies: () => {},
  fetchPopularTVShows: () => {},
});

interface AppProviderProps {
  children: React.ReactNode;
}

// Create a provider component
export const AppProvider = ({ children }: AppProviderProps) => {
  const [trendingTVShows, setTrendingTVShows] = useState<TVShow[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async <T,>(
    fetchFunction: () => Promise<T[]>,
    setStateFunction: React.Dispatch<React.SetStateAction<T[]>>,
  ) => {
    setLoading(true);
    try {
      const data = await fetchFunction();
      setStateFunction(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingTVShows = () =>
    fetchData<TVShow>(getTrendingTVShows, setTrendingTVShows);
  const fetchPopularMovies = () =>
    fetchData<Movie>(getPopularMovies, setPopularMovies);
  const fetchPopularTVShows = () =>
    fetchData<TVShow>(getPopularTVShows, setPopularTVShows);

  useEffect(() => {
    fetchTrendingTVShows();
    fetchPopularMovies();
    fetchPopularTVShows();
  }, []);

  return (
    <AppContext.Provider
      value={{
        trendingTVShows,
        popularMovies,
        popularTVShows,
        loading,
        error,
        fetchTrendingTVShows,
        fetchPopularMovies,
        fetchPopularTVShows,
      }}>
      {children}
    </AppContext.Provider>
  );
};
