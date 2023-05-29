'use client';

/* eslint-disable react-hooks/rules-of-hooks */

import Image from 'next/image';
import Link from 'next/link';

import { useDetail, useCredit, useBackdrop } from '@/data/useMovie';
import { Avatar, AvatarImage } from '@/lib/components/ui/avatar';
import { Badge } from '@/lib/components/ui/badge';
import { Button } from '@/lib/components/ui/button';

function DetailMovie({ params }: { params: { id: number } }) {
  const { id } = params;

  const { detail, isLoadingDetail, errorDetail } = useDetail(id);
  const { credit, isLoadingCredit, errorCredit } = useCredit(id);
  const { backdrop, isLoadingBackdrop, errorBackdrop } = useBackdrop(id);

  if (isLoadingDetail) {
    return <div className="text-center">Loading...</div>;
  }
  if (errorDetail) {
    return <div>Error: {errorDetail.message}</div>;
  }

  if (isLoadingCredit) {
    return <div className="text-center">Loading...</div>;
  }
  if (errorCredit) {
    return <div className="text-center">Error: {errorCredit.message}</div>;
  }

  if (isLoadingBackdrop) {
    return <div className="text-center">Loading...</div>;
  }
  if (errorBackdrop) {
    return <div className="text-center">Error: {errorBackdrop.message}</div>;
  }

  return (
    <div>
      <div className="justify-center mt-10 mx-auto md:px-24 px-5">
        <Link href="/">
          <Button className="mb-4 ml-5 md:ml-0">Back</Button>
        </Link>
        <div className="md:flex">
          <Image
            src={`https://image.tmdb.org/t/p/original${detail?.poster_path}`}
            alt={detail?.title as string}
            width={300}
            height={450}
            className="object-cover rounded-md md:ml-auto"
          />

          <div className="flex flex-col ml-5">
            <h1 className="text-2xl font-bold mb-2">{detail?.title}</h1>
            <h6 className="text-sm font-medium mb-8 leading-relaxed">
              {detail?.tagline}
            </h6>
            <div className="md:flex ">
              <Badge
                variant="green"
                className="text-sm font-semibold uppercase leading-relaxed text-white"
              >
                {detail?.status}
              </Badge>
            </div>
            <div className="text-sm mt-2 space-x-2 flex ">
              {detail?.genres.map((genre) => (
                <Badge
                  className="font-semibold uppercase leading-relaxed"
                  variant="outline"
                  key={genre.id}
                >
                  {genre.name}{' '}
                </Badge>
              ))}
            </div>
            <p className="text-md mt-2 text-justify">{detail?.overview}</p>
            <h5 className="mt-5">Achievements</h5>
            <div className="space-y-1 mt-2">
              {/* <p>{detail?.homepage}</p> */}
              <p>
                Revenue:{' '}
                <span className="font-semibold">${detail?.revenue}</span>{' '}
              </p>
              <p>
                Popularity:{' '}
                <span className="font-semibold">{detail?.popularity}</span>{' '}
              </p>
            </div>
            <h5 className="mt-14">Casts</h5>

            <div className="flex flex-row space-x-2 mt-2">
              {credit?.slice(0, 8).map((cast) => (
                <Avatar>
                  <AvatarImage
                    src={`https://image.tmdb.org/t/p/w500${cast?.profile_path}`}
                    alt={cast?.name as string}
                    width={100}
                    height={100}
                    className="object-cover rounded-md md:ml-auto mx-auto"
                  />
                </Avatar>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="justify-center mt-10 mx-auto md:px-24 px-5 ml-5">
        <h3>Gallery</h3>
        <div className="flex w-full overflow-x-scroll space-x-2 py-3 ">
          {backdrop?.slice(0, 8).map((sim) => (
            <div key={sim.id}>
              <div className="w-[160px] h-auto">
                <Image
                  src={`https://image.tmdb.org/t/p/original${sim.file_path}`}
                  alt={sim.title as string}
                  width={160}
                  height={240}
                  className="object-cover rounded-md hover:scale-105 transition ease-in-out duration-150"
                  blurDataURL={`https://image.tmdb.org/t/p/original${sim.file_path}`}
                  placeholder="blur"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailMovie;
