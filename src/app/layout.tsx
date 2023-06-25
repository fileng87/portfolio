import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LIFeng87',
  description: "LIFeng87's website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="flex w-screen h-screen justify-center bg-neutral-900 overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
