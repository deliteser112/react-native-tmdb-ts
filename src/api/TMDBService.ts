import axios from 'axios';
import { API_KEY, BASE_URL } from '@env';

export const getTrendingTVShows = async (): Promise<any[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
        return response.data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getPopularMovies = async (): Promise<any[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        return response.data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getPopularTVShows = async (): Promise<any[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
        return response.data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export default {
    getTrendingTVShows,
    getPopularMovies,
    getPopularTVShows,
};