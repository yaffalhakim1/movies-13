/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import useSWR from 'swr';

export type Movie = {
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
  total_pages: number;

  // Add more properties as needed
};

export type Results = {
  results: Movie[];
  total_pages: number;
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

// const fetchAllUpcoming = async (page: number) => {
//   const response = await axios.get(
//     `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}}`
//   );
//   return response.data.results as Movie[];
// };

// export const useAllUpcoming = () => {
//   const { data: allUpcoming, error } = useSWR<Movie[]>(
//     'upcoming',
//     fetchAllUpcoming
//   );

//   return {
//     allUpcoming,
//     isLoadingAllUpcoming: !allUpcoming && !error,
//     errorAllUpcoming: error,
//   };
// };

// const fetchAllUpcoming = async (page: number) => {
//   const response = await axios.get(
//     `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
//   );
//   return response.data.results as Movie[];
// };

// export const useAllUpcoming = (initialPage = 1) => {
//   const {
//     data: allUpcoming,
//     error,
//     mutate,
//   } = useSWR<Movie[]>(`upcoming-${initialPage}`, () =>
//     fetchAllUpcoming(initialPage)
//   );

//   const loadMore = async () => {
//     // eslint-disable-next-line no-unsafe-optional-chaining
//     const nextPage = allUpcoming?.length / 20 + 1;
//     const nextPageData = await fetchAllUpcoming(nextPage);

//     // Update the SWR cache and trigger re-render
//     mutate([...allUpcoming, ...nextPageData], false);
//   };

//   return {
//     allUpcoming,
//     isLoadingAllUpcoming: !allUpcoming && !error,
//     errorAllUpcoming: error,
//     loadMore,
//   };
// };
