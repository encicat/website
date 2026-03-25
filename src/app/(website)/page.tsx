import { compareDesc } from 'date-fns';

import { reader } from '@/src/helpers/reader';
import { Section } from '@/src/components/Section';
import { SectionTitle } from '@/src/components/SectionTitle';
import { Card } from '@/src/components/Card';
import { Slider } from '@/src/components/Slider';
import { AdoptionItem } from '@/src/components/AdoptionItem';
import { Button } from '@/src/components/Button';
import { DonationItem } from '@/src/components/DonationItem';

export default async function HomePage() {
  const posts = (await reader.collections.posts.all()).slice(0, 2);
  const adoptions = (await reader.collections.adoptions.all())
    .sort((a, b) =>
      compareDesc(a?.entry?.publishedAt ?? '', b?.entry?.publishedAt ?? ''),
    )
    .slice(0, 3);
  const donation_methods = await reader.singletons.donation_methods.read();
  const home_page = await reader.singletons.home_page.read();

  return (
    <main>
      {/* <Slider videoId="2mLRTwBk9TU" /> */}
      <Slider />
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
          <div className="flex justify-center mt-16">
            <Button href="/ayudanos">
              Descubre todas las formas en las que puedes ayudarnos
            </Button>
          </div>
        </Section>
      )}
      <Section>
        <SectionTitle title={'Noticias'} subtitle="No te pierdas nada" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
          {posts.map(async ({ slug, entry: post }) => (
            <Card
              key={post.title}
              title={post.title}
              imgSrc={post?.image ?? ''}
              date={String(post.publishedAt)}
              url={`/noticias/${slug}`}
            >
              {/* <DocumentRenderer document={await post.content()} /> */}
              test
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-16">
          <Button href="/noticias">Ver todas las noticias</Button>
        </div>
      </Section>
    </main>
  );
}
