import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import type { Metadata } from 'next'
import { PT_Mono } from 'next/font/google'
import './globals.css'

const ptMono = PT_Mono({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Hyuni - Software Engineer',
  description: 'Hyuni is a software engineer believing: a good code makes a good product',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ptMono.className}>{children}</body>
    </html>
  )
};
