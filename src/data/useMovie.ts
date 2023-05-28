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
  popularity: number;
  profile_path: string;
  name: string;
  tagline: string;
  file_path: string;

  // Add more properties as needed
};

const fetchMovies = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
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
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
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
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
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

const fetchCredit = async (id: number) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  return response.data.cast as Movie[];
};

export const useCredit = (id: number) => {
  const { data: credit, error } = useSWR<Movie[]>(`${id}`, () =>
    fetchCredit(id)
  );

  return {
    credit,
    isLoadingCredit: !credit && !error,
    errorCredit: error,
  };
};

const fetchSimiliar = async (id: number) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  return response.data.results as Movie[];
};

export const useSimiliar = (id: number) => {
  const { data: similiar, error } = useSWR<Movie[]>('similiar', () =>
    fetchSimiliar(id)
  );

  return {
    similiar,
    isLoadingSimiliar: !similiar && !error,
    errorSimiliar: error,
  };
};

const fetchBackdrop = async (id: number) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  return response.data.backdrops as Movie[];
};

export const useBackdrop = (id: number) => {
  const { data: backdrop, error } = useSWR<Movie[]>('images', () =>
    fetchBackdrop(id)
  );

  return {
    backdrop,
    isLoadingBackdrop: !backdrop && !error,
    errorBackdrop: error,
  };
};
