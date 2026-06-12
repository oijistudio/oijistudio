import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { StudioProvider } from '@/context/StudioContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Splash from '@/components/Splash';
import MusicPlayer from '@/components/MusicPlayer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://oijistudio.my.id'),
  title: {
    default: 'OIJI Studio - Website Kreatif, Portfolio, Yearbook & Sistem Sekolah',
    template: '%s | OIJI Studio',
  },
  description: 'OIJI Studio membangun website kreatif premium untuk portfolio, buku tahunan digital, profil sekolah, dan sistem web kustom dengan desain imersif serta checkout transparan.',
  applicationName: 'OIJI Studio',
  manifest: '/manifest.webmanifest',
  themeColor: '#07080f',
  icons: {
    icon: [
      { url: '/assets/logo/logo.png', type: 'image/png', sizes: 'any' },
    ],
    shortcut: ['/assets/logo/logo.png'],
    apple: [
      { url: '/assets/logo/logo.png', type: 'image/png', sizes: 'any' },
    ],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'OIJI Studio - Build Beyond Ordinary',
    description: 'Studio web kreatif Indonesia untuk portfolio premium, yearbook digital interaktif, website sekolah, dan sistem kustom yang responsif.',
    url: '/',
    type: 'website',
    locale: 'id_ID',
    siteName: 'OIJI Studio',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1734,
        height: 907,
        alt: 'OIJI Studio preview thumbnail',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OIJI Studio - Build Beyond Ordinary',
    description: 'Website kreatif premium untuk portfolio, yearbook digital, sekolah, dan sistem kustom.',
    images: ['/assets/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="min-h-screen relative font-sans overflow-x-hidden antialiased selection:bg-violet-500/30 selection:text-violet-200 transition-colors duration-500">
        <StudioProvider>
          {/* Main Cinematic Grid Overlay */}
          <div className="fixed inset-0 theme-bg-fixed -z-50 transition-colors duration-500" />
          {/* Neon soft purplish/blue orbs */}
          <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none -z-40" />
          <div className="fixed bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none -z-40" />

          {/* Fine cyber grid backdrop */}
          <div className="fixed inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-40" />

          {/* Core interactive loading screens */}
          <Splash />

          <div className="relative flex flex-col min-h-screen">
            {/* Navigational portal */}
            <Header />

            {/* Dynamic client canvas pages */}
            <main className="flex-grow">
              {children}
            </main>

            {/* Cinematic footer lines */}
            <Footer />
          </div>

          {/* Floating contextual controls */}
          <MusicPlayer />
        </StudioProvider>
      </body>
    </html>
  );
}
