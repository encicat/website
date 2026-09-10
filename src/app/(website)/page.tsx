import { compareDesc } from 'date-fns';

import { AdoptionItem } from '@/src/components/AdoptionItem';
import { Button } from '@/src/components/Button';
import { DonationItem } from '@/src/components/DonationItem';
import { Section } from '@/src/components/Section';
import { SectionTitle } from '@/src/components/SectionTitle';
import { reader } from '@/src/helpers/reader';

export default async function HomePage() {
  const adoptions = (await reader.collections.adoptions.all())
    .filter(({ entry }) => !entry.adoptedAt)
    .sort((a, b) =>
      compareDesc(a?.entry?.publishedAt ?? '', b?.entry?.publishedAt ?? ''),
    )
    .slice(0, 3);
  const adopted = (await reader.collections.adoptions.all())
    .filter(({ entry }) => entry.adoptedAt)
    .sort((a, b) =>
      compareDesc(a?.entry?.adoptedAt ?? '', b?.entry?.adoptedAt ?? ''),
    )
    .slice(0, 3);
  const donation_methods = await reader.singletons.donation_methods.read();
  const home_page = await reader.singletons.home_page.read();

  return (
    <main>
      {home_page?.adoption_show === 'yes' && (
        <Section>
          <SectionTitle
            title={home_page?.adoption_title}
            subtitle={home_page?.adoption_subtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-0">
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
          </div>
          <div className="flex justify-center mt-16">
            <Button href="/adopciones">Ver todas las adopciones</Button>
          </div>
        </Section>
      )}
      {home_page?.donation_methods_show === 'yes' && (
        <Section>
          <SectionTitle
            title={home_page?.donation_methods_title}
            subtitle={home_page?.donation_methods_subtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-0">
            {donation_methods?.platforms.slice(0, 3).map(async (platform) => (
              <DonationItem
                key={platform.name}
                name={platform.name}
                url={platform.url}
                code={platform.code}
              >
                {platform.description}
              </DonationItem>
            ))}
          </div>
          <div className="flex justify-center mt-16 px-4 lg:px-0">
            <Button href="/ayudales" className="text-center">
              Descubre todas las formas en las que puedes ayudarnos
            </Button>
          </div>
        </Section>
      )}
      {adopted.length > 0 && (
        <Section>
          <SectionTitle
            title="Adoptados"
            subtitle="Finales felices de EnciCat"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-0">
            {adopted.map(({ slug, entry: adoption }) => (
              <AdoptionItem
                key={slug}
                name={adoption.name}
                birthdate={String(adoption.birthdate)}
                gender={adoption.gender}
                img={adoption?.image ?? ''}
                slug={slug}
              />
            ))}
          </div>
          <div className="flex justify-center mt-16">
            <Button href="/adoptados">Ver todos los adoptados</Button>
          </div>
        </Section>
      )}
    </main>
  );
}
