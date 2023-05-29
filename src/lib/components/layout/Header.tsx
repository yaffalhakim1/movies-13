import Image from 'next/image';

import { ThemeToggle } from '@/lib/components/theme-toggle';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 w-full bg-base-100/80 backdrop-blur-md">
      <section className="wrapper mx-auto flex items-center justify-between py-2">
        <p>
          <span className="font-bold">Movie</span>DB
        </p>
        <div className="flex justify-between ml-auto items-center">
          <Image
            src="/tmdb.svg"
            alt="logo"
            width={40}
            height={40}
            className="object-cover"
          />
          <ThemeToggle />
        </div>
      </section>
    </header>
  );
};

export default Header;
