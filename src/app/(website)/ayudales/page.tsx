import type { Metadata } from 'next';
import Link from 'next/link';

import { DocumentRenderer } from '@/src/components/DocumentRenderer';
import { Grid } from '@/src/components/Grid/Grid';
import { Hero } from '@/src/components/Hero';
import { Section } from '@/src/components/Section';
import { getHelpIcon } from '@/src/helpers/help';
import { reader } from '@/src/helpers/reader';

export const metadata: Metadata = {
  title: 'Ayúdanos',
  description: 'Descubre todas las formas en las que puedes ayudarnos.',
};

export default async function HelpPage() {
  const help_page = await reader.singletons.help_page.read();
  const content = await help_page?.content();
  const helpPages = (await reader.collections.help.all()).sort(
    (a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0),
  );

  return (
    <>
      <Hero bgImgSrc="/images/bg.png">
        <h2 className="text-4xl uppercase">Ayúdanos</h2>
      </Hero>
      <Section>
        {content && (
          <div className="mb-16 px-4 lg:px-0">
            <DocumentRenderer document={content} />
          </div>
        )}
        <Grid>
          {helpPages.map(({ slug, entry }) => {
            const Icon = getHelpIcon(entry.icon);
            return (
              <Link
                key={slug}
                href={`/ayudales/${slug}`}
                className="bg-neutral-50 rounded-2xl p-8 flex flex-col items-center text-center transition-all hover:shadow-md"
              >
                <div className="bg-green-800 w-10 h-10 rounded-full text-white flex items-center justify-center">
                  <Icon />
                </div>
                <div className="m-4 text-2xl font-bold">{entry.title}</div>
                <div className="text-gray-600">{entry.summary}</div>
              </Link>
            );
          })}
        </Grid>
      </Section>
    </>
  );
}
