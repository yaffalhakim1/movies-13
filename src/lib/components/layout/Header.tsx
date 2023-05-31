import { Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ThemeToggle } from '@/lib/components/theme-toggle';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 w-full bg-base-100/80 backdrop-blur-md">
      <section className="wrapper mx-auto flex items-center justify-between py-2">
        <Link href="/">
          <p className="font-semibold">Movies</p>
        </Link>
        <div className="flex justify-between ml-auto items-center">
          <a href="https://www.themoviedb.org">
            <Image
              src="/tmdb.svg"
              alt="logo"
              width={40}
              height={40}
              className="object-cover mr-4"
            />
          </a>
          <Link href="https://github.com/yaffalhakim1/movies-13">
            <Github width="24px" height="24px" />
          </Link>

          <ThemeToggle />
        </div>
      </section>
    </header>
  );
};

export default Header;
