import { compareDesc } from 'date-fns';
import type { Metadata } from 'next';

import { Card } from '@/src/components/Card';
import { Grid } from '@/src/components/Grid/Grid';
import { Section } from '@/src/components/Section';
import { SectionTitle } from '@/src/components/SectionTitle';
import { reader } from '@/src/helpers/reader';

export const metadata: Metadata = {
  title: 'Noticias',
  description: 'Mantente al día de las novedades de EnciCat.',
};

export default async function PostsPage() {
  const posts = (await reader.collections.posts.all()).sort((a, b) =>
    compareDesc(a?.entry?.publishedAt ?? '', b?.entry?.publishedAt ?? ''),
  );
  return (
    <Section>
      <SectionTitle title="Noticias" subtitle="Mantente actualizado" />
      <Grid>
        {posts.map(({ slug, entry: post }) => (
          <Card
            key={post.title}
            title={post.title}
            imgSrc={post?.image ?? ''}
            date={String(post.publishedAt)}
            url={`/noticias/${slug}`}
          />
        ))}
      </Grid>
    </Section>
  );
}
