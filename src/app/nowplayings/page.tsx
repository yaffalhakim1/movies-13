'use client';

import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ProgressBar } from 'react-loader-spinner';
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
    return (
      <div className="grid gap-2 p-12 text-center">
        <Image
          src="/assets/404 Error-amico.svg"
          width={320}
          height={320}
          alt="404 Illustration"
        />
        <Button variant="link" asChild>
          <a href="https://storyset.com/web" className="text-xs">
            Web illustrations by Storyset
          </a>
        </Button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center mx-auto text-center">
        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#eff6ff"
          barColor="#2563eb"
        />
      </div>
    );
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

        {isLoading ?? (
          <div className="flex justify-center items-center mx-auto text-center">
            <ProgressBar
              height="80"
              width="80"
              ariaLabel="progress-bar-loading"
              wrapperStyle={{}}
              wrapperClass="progress-bar-wrapper"
              borderColor="#eff6ff"
              barColor="#2563eb"
            />
          </div>
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
      <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2">
        {allNowPlaying?.map((movie) => (
          <motion.div
            key={movie.id}
            className={`relative ${
              isLoading ? 'opacity-0' : 'opacity-100 animate-fade-in'
            }`}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-40 h-60 ">
              <Link href={`/movies/${movie.id}`}>
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                      : '/assets/fallbackimage.png'
                  }
                  alt={movie.title}
                  width={160}
                  height={240}
                  className="object-cover rounded-md hover:scale-105 hover:opacity-75 transition ease-in-out duration-150"
                  blurDataURL={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  placeholder="blur"
                />
              </Link>
            </div>
          </motion.div>
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
