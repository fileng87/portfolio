import Header from '@/components/Header/Header';
import '@/styles/globals.css';
import '@/styles/prism-one-dark.css';
import '@/styles/prism-plus.css';
import { Inter } from 'next/font/google';
import Provider from '../components/Layout/Provider';
import PageWapper from '@/components/Layout/PageWapper';
import NextTopLoader from 'nextjs-toploader';
import { Provider as ReactWrapBalancerProvider } from 'react-wrap-balancer';

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
        <ReactWrapBalancerProvider>
          <Provider>
            <NextTopLoader
              showSpinner={false}
              color="#22d3ee"
              shadow="0 0 10px #22d3ee,0 0 5px #22d3ee"
              height={2}
            />
            <Header />
            <main className="h-full w-full">
              <PageWapper>{children}</PageWapper>
            </main>
          </Provider>
        </ReactWrapBalancerProvider>
      </body>
    </html>
  );
}
