'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';

import type { Movie } from '@/data/useMovie';
import { Button } from '@/lib/components/ui/button';

function NowPlayings() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetcher = async (url: string) => {
    setIsLoading(true);
    const response = await axios.get(url);
    setIsLoading(false);
    return response.data.results as Movie[];
  };

  const { data, error } = useSWR<Movie[]>(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`,
    fetcher
  );

  if (error) {
    return <div className="text-center">Error: {error.message}</div>;
  }

  if (!data) {
    return <div className="text-center">Loading...</div>;
  }

  const allNowPlaying = data;

  const goToNextPage = () => {
    setPage((currentPage) => currentPage + 1);
  };

  const goToPrevPage = () => {
    setPage((currentPage) => currentPage - 1);
  };

  return (
    <div className="wrapper">
      <h1 className="text-2xl font-bold mb-5">Now Playing</h1>
      <div className="flex justify-between mb-4">
        {page > 1 ? (
          <Button onClick={goToPrevPage} className="">
            prev
          </Button>
        ) : (
          <Button className="" disabled>
            prev
          </Button>
        )}

        {isLoading ?? <div className="text-center">Loading...</div>}
        <div>
          Page <span className="font-semibold">{page}</span>
        </div>

        {page < 20 ? (
          <Button onClick={() => goToNextPage()} className="">
            next
          </Button>
        ) : (
          <Button className="" disabled>
            next
          </Button>
        )}
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2">
        {allNowPlaying?.map((movie) => (
          <div
            key={movie.id}
            className={`relative ${
              isLoading ? 'opacity-0' : 'opacity-100 animate-fade-in'
            }`}
          >
            <div className="w-40 h-60 ">
              <Link href={`/movies/${movie.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={160}
                  height={240}
                  className="object-cover rounded-md hover:scale-105 hover:opacity-75 transition ease-in-out duration-150"
                  blurDataURL={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  placeholder="blur"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        {page > 1 ? (
          <Button onClick={() => goToPrevPage()} className="">
            prev
          </Button>
        ) : (
          <Button className="" disabled>
            prev
          </Button>
        )}
        <div>
          Page <span className="font-semibold">{page}</span>
        </div>

        {page < 20 ? (
          <Button onClick={() => goToNextPage()} className="">
            next
          </Button>
        ) : (
          <Button className="" disabled>
            next
          </Button>
        )}
      </div>
    </div>
  );
}

export default NowPlayings;
