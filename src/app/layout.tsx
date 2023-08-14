import Header from '@/components/Header/Header';
import '@/styles/globals.css';
import '@/styles/prism-one-dark.css';
import '@/styles/prism-plus.css';
import { Inter } from 'next/font/google';
import Provider from './provider';
import PageWapper from '@/components/Layout/PageWapper';
import Backgrand from '@/components/Layout/Backgrand';

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider>
          <Backgrand />
          <Header />
          <main className="h-full w-full">
            <PageWapper>{children}</PageWapper>
          </main>
        </Provider>
      </body>
    </html>
  );
}
