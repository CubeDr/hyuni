import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import AuthProvider from '@/firebase/AuthContext';
import { GoogleAnalytics } from '@next/third-parties/google';
import 'hyuni-style';
import type { Metadata } from 'next';
import { PT_Mono } from 'next/font/google';
import Footer from './Footer';
import './globals.css';

const ptMono = PT_Mono({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: '현이의 개발 이야기',
  description: '"좋은 코드가 좋은 제품을 만든다"를 믿는 개발자입니다.',
  authors: [{ name: '김현이 (Hyuni Kim)', url: 'https://hyuni.dev' }],
  creator: '김현이 (Hyuni Kim)',
  openGraph: {
    url: 'https://www.hyuni.dev/',
    type: 'website',
    images: {
      url: 'https://www.hyuni.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhyuni-compressed.2bc011b3.jpg&w=384&q=75',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ptMono.className}>
        <AuthProvider>
          <div className="main-column">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
      <GoogleAnalytics gaId="G-MBKK9D6FVJ" />
    </html>
  )
};
