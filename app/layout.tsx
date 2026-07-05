import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { TopNav } from '@/components/layout/top-nav'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: "Emma's Math — Middle School Prep",
  description: 'Math practice and learning portal for Emma',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="min-h-screen font-[family-name:var(--font-nunito)]">
        <TopNav />
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          {children}
        </main>
      </body>
    </html>
  )
}
