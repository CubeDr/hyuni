import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import type { Metadata } from 'next'
import { PT_Mono } from 'next/font/google'
import './globals.css'

const ptMono = PT_Mono({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Hyuni Kim - Software Engineer',
  description: '"좋은 코드가 좋은 제품을 만든다"를 믿는 개발자입니다.',
  authors: [{ name: '김현이', url: 'https://www.hyuni.dev' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ptMono.className}>
        <div className='main-column'>{children}</div>
      </body>
    </html>
  )
};
