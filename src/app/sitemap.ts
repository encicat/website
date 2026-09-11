import type { MetadataRoute } from 'next';

import { reader } from '@/src/helpers/reader';
import { siteUrl as baseUrl } from '@/src/helpers/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/adopciones`, priority: 0.9 },
    { url: `${baseUrl}/adoptados`, priority: 0.7 },
    { url: `${baseUrl}/ayudales`, priority: 0.8 },
    { url: `${baseUrl}/quienes-somos`, priority: 0.7 },
    { url: `${baseUrl}/contacto`, priority: 0.6 },
    { url: `${baseUrl}/politica-de-privacidad`, priority: 0.3 },
    { url: `${baseUrl}/terminos-y-condiciones`, priority: 0.3 },
    { url: `${baseUrl}/aviso-legal`, priority: 0.3 },
  ];

  const adoptions = await reader.collections.adoptions.all();
  const adoptionRoutes: MetadataRoute.Sitemap = adoptions.map(
    ({ slug, entry }) => ({
      url: `${baseUrl}/adopciones/${slug}`,
      lastModified: entry.publishedAt ? new Date(entry.publishedAt) : undefined,
      priority: 0.6,
    }),
  );

  const helpPages = await reader.collections.help.all();
  const helpRoutes: MetadataRoute.Sitemap = helpPages.map(({ slug }) => ({
    url: `${baseUrl}/ayudales/${slug}`,
    priority: 0.6,
  }));

  return [...staticRoutes, ...adoptionRoutes, ...helpRoutes];
}
