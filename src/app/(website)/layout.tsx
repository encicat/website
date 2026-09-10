import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';

import { Cookies } from '@/src/components/Cookies';
import { DocumentRenderer } from '@/src/components/DocumentRenderer';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';
import { TopBar } from '@/src/components/TopBar/TopBar';
import { getCachedSettings, getCachedSocial } from '@/src/helpers/cached';

import './globals.css';
import { geistMono, geistSans } from './fonts';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getCachedSettings();
  const title = settings.title ?? 'EnciCat';
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? 'https://encicat.org',
    ),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: settings.slogan,
    openGraph: {
      type: 'website',
      siteName: title,
      title,
      description: settings.slogan,
      locale: 'es_ES',
      images: settings.logo ? [settings.logo] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getCachedSettings();
  const social = await getCachedSocial();
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TopBar
          email={String(settings?.email)}
          phone={settings?.phone}
          socials_networks={social?.socials_networks}
        />
        <Header logo={settings?.logo} title={settings?.title} />
        {children}
        <Footer
          pageTitle={settings?.title}
          logo={settings?.logo}
          socials_networks={social?.socials_networks}
          email={settings?.email}
          phone={settings?.phone}
        />
        <Cookies>
          <DocumentRenderer document={settings.cookies_message} />
        </Cookies>
        <SpeedInsights />
      </body>
    </html>
  );
}
