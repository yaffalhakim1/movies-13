/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import useSWR from 'swr';

type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  status: string;
  revenue: number;
  runtime: number;

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

const fetchDetail = async (id: number) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=317ac2c7a5d96c84f53e8766340f1979`
  );
  return response.data as Movie;
};

export const useDetail = (id: number) => {
  const { data: detail, error } = useSWR<Movie>(`${id}}`, () =>
    fetchDetail(id)
  );

  return {
    detail,
    isLoadingDetail: !detail && !error,
    errorDetail: error,
  };
};
