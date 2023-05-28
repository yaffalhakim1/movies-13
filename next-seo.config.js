/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: 'Movies',
  titleTemplate: 'Movies',
  defaultTitle: 'Movies',
  description: 'Next.js + TMDB API + TailwindCSS v3 + TypeScript template',
  canonical: 'https://movies-13.vercel.app/',
  openGraph: {
    url: 'https://movies-13.vercel.app/',
    title: 'Movies',
    description: 'Next.js + TMDB API + TailwindCSS v3 + TypeScript template',
    images: [
      {
        url: 'https://og.sznm.dev/api/generate?heading=Movies&text=List+of+movies+using+NextJS+13.4+RSC&template=color&center=true',
        alt: 'Movies og-image',
      },
    ],
    site_name: 'Movies',
  },
  twitter: {
    handle: '@pengenradiant',
    cardType: 'summary_large_image',
  },
};

export default defaultSEOConfig;
