'use client';

import { SearchIcon } from 'lucide-react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { useUpcomingMovies, useNowPlayingMovies } from '@/data/useMovie';
import { Button } from '@/lib/components/ui/button';

const Home: NextPage = () => {
  const { upcoming, isLoading, error } = useUpcomingMovies();
  const { nowplaying, isLoadingNowPlaying, errorNowPlaying } =
    useNowPlayingMovies();

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoadingNowPlaying) {
    return <div className="text-center">Loading...</div>;
  }
  if (errorNowPlaying) {
    return <div>Error: {errorNowPlaying.message}</div>;
  }

  return (
    <div className="flex flex-col  mt-6 ">
      <SearchIcon className="w-6 h-6 md:ml-36 ml-8 mb-6" />
      <div className="flex justify-between md:px-36 px-8">
        <h1 className="text-2xl font-bold text-center">Upcoming Movies</h1>
        <Link href="/upcomings">
          <Button className="ml-4">See All</Button>
        </Link>
      </div>
      <div className="flex w-full overflow-x-scroll space-x-2 py-3 md:ml-36 md:mr-36 ml-10 items-center">
        {upcoming?.map((upcomingMovie) => (
          <div key={upcomingMovie.id} className="relative">
            <div className="w-40 h-60 ">
              <Link href={`/movies/${upcomingMovie.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${upcomingMovie.poster_path}`}
                  alt={upcomingMovie.title}
                  width={160}
                  height={240}
                  className="object-cover rounded-md hover:scale-105 hover:opacity-75 transition ease-in-out duration-150"
                  blurDataURL={`https://image.tmdb.org/t/p/original${upcomingMovie.poster_path}`}
                  placeholder="blur"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <div className="flex justify-between md:px-36 px-8">
          <h1 className="text-2xl font-bold text-center">Now Playing</h1>
          <Link href="/nowplayings">
            <Button className="ml-4">See All</Button>
          </Link>
        </div>{' '}
        <div className="flex w-full overflow-x-scroll space-x-2 py-3 md:ml-36 ml-10">
          {nowplaying?.map((now) => (
            <div key={now.id} className="relative">
              <div className="w-40 h-60 ">
                <Link href={`/movies/${now.id}`}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${now.poster_path}`}
                    alt={now.title}
                    width={160}
                    height={240}
                    className="object-cover rounded-md hover:scale-105 hover:opacity-75 transition ease-in-out duration-150"
                    blurDataURL={`https://image.tmdb.org/t/p/original${now.poster_path}`}
                    placeholder="blur"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
