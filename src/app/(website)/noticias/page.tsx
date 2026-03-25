import { compareDesc } from 'date-fns';

import { reader } from '@/src/helpers/reader';
import { Section } from '@/src/components/Section';
import { SectionTitle } from '@/src/components/SectionTitle';
import { Card } from '@/src/components/Card';
import { Grid } from '@/src/components/Grid/Grid';

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
