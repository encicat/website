import { unstable_cache } from 'next/cache';
import { Node } from '@markdoc/markdoc';

import { reader } from './reader';

export const getCachedSettings = unstable_cache(
  async () => {
    const params = await reader.singletons.settings.read();
    return {
      ...params,
      cookies_message: (await params?.cookies_message()) as { node: Node },
    };
  },
  ['settings'],
  {
    tags: ['settings'],
    revalidate: 60,
  },
);

export const getCachedSocial = unstable_cache(
  async () => reader.singletons.social.read(),
  ['social'],
  {
    tags: ['social'],
    revalidate: 60,
  },
);
