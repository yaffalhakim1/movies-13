'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import type { SetStateAction } from 'react';
import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ProgressBar } from 'react-loader-spinner';
import useSWR from 'swr';

import { Button } from '@/lib/components/ui/button';
import { Input } from '@/lib/components/ui/input';

function SearchPage() {
  const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data.results;
  };

  const [searchQuery, setSearchQuery] = useState('');
  const { data, error } = useSWR(
    searchQuery
      ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${searchQuery}`
      : null,
    fetcher
  );

  const handleSearchInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    setSearchQuery(searchQuery);
  };

  return (
    <div className="wrapper">
      <h3 className="text-center">Search</h3>

      <div className="flex justify-center items-center space-x-2 mt-4">
        <Input
          type="text"
          placeholder="type a movie name..."
          onChange={handleSearchInputChange}
        />
        <Button onClick={handleSearch} type="submit">
          Search
        </Button>{' '}
      </div>

      {searchQuery && !error && !data && (
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

      {searchQuery && error && (
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
      )}

      {searchQuery && data && (
        <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2 mt-8">
          {data.map((movie: any) => (
            <div key={movie.id}>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
