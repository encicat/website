import type { Metadata } from 'next';

import { Cookies } from '@/src/components/Cookies';
import { DocumentRenderer } from '@/src/components/DocumentRenderer';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';
import { TopBar } from '@/src/components/TopBar/TopBar';
import { getCachedSettings, getCachedSocial } from '@/src/helpers/cached';
import { siteUrl } from '@/src/helpers/site';

import './globals.css';
import { geistMono, geistSans } from './fonts';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getCachedSettings();
  const title = settings.title ?? 'EnciCat';
  return {
    metadataBase: new URL(siteUrl),
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AnimalShelter',
    name: settings.title ?? 'EnciCat',
    url: siteUrl,
    logo: `${siteUrl}${settings.logo ?? ''}`,
    email: settings.email,
    description: settings.slogan,
    sameAs: social?.socials_networks.map((network) => network.url),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Villa del Prado',
      addressRegion: 'Madrid',
      addressCountry: 'ES',
    },
  };

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-green-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido
        </a>
        <header>
          <TopBar
            email={String(settings?.email)}
            phone={settings?.phone}
            socials_networks={social?.socials_networks}
          />
          <Header logo={settings?.logo} title={settings?.title} />
        </header>
        <main id="contenido">{children}</main>
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
      </body>
    </html>
  );
}
