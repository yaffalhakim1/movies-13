'use client';

/* eslint-disable react-hooks/rules-of-hooks */

import Image from 'next/image';

import { useDetail } from '@/data/useMovie';
import { Button } from '@/lib/components/ui/button';

function DetailMovie({ params }: { params: { id: number } }) {
  const { id } = params;

  const { detail, isLoadingDetail, errorDetail } = useDetail(id);

  if (isLoadingDetail) {
    return <div className="text-center">Loading...</div>;
  }
  if (errorDetail) {
    return <div>Error: {errorDetail.message}</div>;
  }

  return (
    <div>
      <div className=" justify-center mt-10 mx-auto md:px-24 px-5">
        <Button className="mb-4 ">Back</Button>

        <div className="md:flex  bg-black/30">
          <Image
            src={`https://image.tmdb.org/t/p/w500${detail?.poster_path}`}
            alt={detail?.title as string}
            width={300}
            height={450}
            className="object-cover rounded-md md:ml-auto mx-auto"
          />

          <div className="flex flex-col ml-5">
            <h1 className="text-2xl font-bold mb-5">{detail?.title}</h1>
            <div className="flex">
              <p className="text-sm bg-green-600 px-1 py-1 mr-2">
                {detail?.status}
              </p>
              <p className="text-sm py-1"> {detail?.release_date}</p>
            </div>
            <p className="text-sm mt-2">
              {detail?.genres.map((genre) => (
                <span className="font-semibold space-y-3" key={genre.id}>
                  {genre.name}{' '}
                </span>
              ))}
            </p>
            <p className="text-md mt-2 text-justify">{detail?.overview}</p>
            <div className="flex space-x-2">
              <p>{detail?.homepage}</p>
              <p>{detail?.revenue}</p>
              <p>{detail?.runtime} mins</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailMovie;
