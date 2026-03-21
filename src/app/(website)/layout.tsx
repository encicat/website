import type { Metadata } from 'next';

import { Header } from '@/src/components/Header';
import { TopBar } from '@/src/components/TopBar/TopBar';
import { Footer } from '@/src/components/Footer';
import { Cookies } from '@/src/components/Cookies';
import { DocumentRenderer } from '@/src/components/DocumentRenderer';
import { getCachedSettings, getCachedSocial } from '@/src/helpers/cached';

import './globals.css';
import { geistMono, geistSans } from './fonts';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getCachedSettings();
  return {
    title: settings.title,
    description: settings.slogan,
  };
}

export default async function Layout ({
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
          socials_networks={social?.socials_networks}
        />
        <Header logo={settings?.logo} title={settings?.title} />
        {children}
        <Footer
          pageTitle={settings?.title}
          logo={settings?.logo}
          socials_networks={social?.socials_networks}
          email={settings?.email}
        />
        <Cookies>
          <DocumentRenderer document={settings.cookies_message} />
        </Cookies>
      </body>
    </html>
  );
}
