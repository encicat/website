import type { MetadataRoute } from 'next';

import { siteUrl as baseUrl } from '@/src/helpers/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/keystatic', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
