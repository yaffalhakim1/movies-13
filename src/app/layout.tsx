import type { Metadata } from 'next';

import Layout from '@/lib/components/layout';
import { fontSans } from '@/lib/styles/fonts';
import { cn } from '@/lib/utils';

import '@/lib/styles/globals.css';

const APP_NAME = 'Movies';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Next.js + TMDB API + TailwindCSS v3 + TypeScript template',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: '#FFFFFF',
  openGraph: {
    url: 'https://movies-13.vercel.app/',
    title: APP_NAME,
    description: 'Next.js + TMDB API + TailwindCSS v3 + TypeScript template',
    images: {
      url: 'https://og.sznm.dev/api/generate?heading=Movies&text=List+of+movies+using+NextJS+13.4+RSC&template=color&center=true',
      alt: 'movies-13.vercel.app og-image',
    },
  },
  twitter: {
    creator: '@pengenradiant',
    card: 'summary_large_image',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Layout>
          <div className="flex-1">{children}</div>
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
