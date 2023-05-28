/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import useSWR from 'swr';

type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  // Add more properties as needed
};

const fetchMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/movie/upcoming?api_key=317ac2c7a5d96c84f53e8766340f1979'
  );
  return response.data.results as Movie[];
};

export const useUpcomingMovies = () => {
  const { data: upcoming, error } = useSWR<Movie[]>('upcoming', fetchMovies);

  return {
    upcoming,
    isLoading: !upcoming && !error,
    error,
  };
};

const fetchNowPlayingMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/movie/now_playing?api_key=317ac2c7a5d96c84f53e8766340f1979'
  );
  return response.data.results as Movie[];
};

export const useNowPlayingMovies = () => {
  const { data: nowplaying, error } = useSWR<Movie[]>(
    'now_playing',
    fetchNowPlayingMovies
  );

  return {
    nowplaying,
    isLoadingNowPlaying: !nowplaying && !error,
    errorNowPlaying: error,
  };
};
