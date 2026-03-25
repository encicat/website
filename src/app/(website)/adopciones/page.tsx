import { reader } from '@/src/helpers/reader';
import { compareDesc } from 'date-fns';

import { Section } from '@/src/components/Section';
import { SectionTitle } from '@/src/components/SectionTitle';
import { AdoptionItem } from '@/src/components/AdoptionItem';
import { Grid } from '@/src/components/Grid/Grid';

export default async function AdoptionsPage() {
  const adoptions = (await reader.collections.adoptions.all()).sort((a, b) =>
    compareDesc(a?.entry?.publishedAt ?? '', b?.entry?.publishedAt ?? ''),
  );
  return (
    <Section>
      <SectionTitle
        title="Adopciones"
        subtitle="Encuentra a tu nuevo companero"
      />
      <Grid>
        {adoptions.map(({ slug, entry: adoption }) => (
          <AdoptionItem
            key={slug}
            name={adoption.name}
            birthdate={String(adoption.birthdate)}
            gender={adoption.gender}
            img={adoption?.image ?? ''}
            slug={slug}
          />
        ))}
      </Grid>
    </Section>
  );
}
