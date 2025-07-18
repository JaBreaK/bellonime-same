import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import BackgroundImage from '@/components/BackgroundImage';


// Choose Inter for body text and Poppins for headings/navigation
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
});
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['600', '700'],
});

export const metadata: Metadata = {
  title: 'AniWeb',
  description: 'Platform untuk streaming anime favoritmu',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${inter.variable} ${poppins.variable}`} lang="en" suppressHydrationWarning >
      <body className="antialiased">

<div className="fixed inset-0 -z-10 bg-cover bg-center transition-all duration-500 before:absolute before:inset-0 before:bg-black/40" />

<Navbar />

        <ThemeProvider
        
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundImage />


              


          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
