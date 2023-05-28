import { ThemeToggle } from '@/lib/components/theme-toggle';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 w-full bg-base-100/80 backdrop-blur-md">
      <section className="wrapper mx-auto flex items-center justify-between py-2">
        <div className="flex justify-between ml-auto items-center">
          <p className="mr-1">Movies NextJS 13</p>
          <ThemeToggle />
        </div>
      </section>
    </header>
  );
};

export default Header;
