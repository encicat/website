import { compareDesc } from 'date-fns';
import type { Metadata } from 'next';

import { AdoptionItem } from '@/src/components/AdoptionItem';
import { Grid } from '@/src/components/Grid/Grid';
import { Section } from '@/src/components/Section';
import { SectionTitle } from '@/src/components/SectionTitle';
import { reader } from '@/src/helpers/reader';

export const metadata: Metadata = {
  title: 'Adopciones',
  description: 'Encuentra a tu nuevo compañero y dale un hogar.',
  alternates: { canonical: '/adopciones' },
};

export default async function AdoptionsPage() {
  const adoptions = (await reader.collections.adoptions.all())
    .filter(({ entry }) => !entry.adoptedAt)
    .sort((a, b) =>
      compareDesc(a?.entry?.publishedAt ?? '', b?.entry?.publishedAt ?? ''),
    );

  return (
    <Section>
      <SectionTitle
        as="h1"
        title="Adopciones"
        subtitle="Encuentra a tu nuevo compañero"
      />
      <Grid>
        {adoptions.map(({ slug, entry: adoption }, index) => (
          <AdoptionItem
            key={slug}
            name={adoption.name}
            birthdate={String(adoption.birthdate)}
            gender={adoption.gender}
            img={adoption?.image ?? ''}
            slug={slug}
            priority={index === 0}
          />
        ))}
      </Grid>
    </Section>
  );
}
