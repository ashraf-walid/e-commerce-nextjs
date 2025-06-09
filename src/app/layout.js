import { Inter } from 'next/font/google';
import "./globals.css";
import dynamic from 'next/dynamic';
import StoreInitializer from '@/store/StoreInitializer';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
});

// Dynamically import Header to reduce initial bundle size
const Header = dynamic(() => import('@/components/Header/Header'), {
  ssr: true,
  loading: () => <div className="h-16 bg-white shadow-sm" />
});

export const metadata = {
  title: 'Techno',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <StoreInitializer />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
