import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DocumentRenderer } from '@/src/components/DocumentRenderer';
import { DonationItem } from '@/src/components/DonationItem';
import { Grid } from '@/src/components/Grid/Grid';
import { Hero } from '@/src/components/Hero';
import { Section } from '@/src/components/Section';
import { reader } from '@/src/helpers/reader';

export async function generateStaticParams() {
  const helpPages = await reader.collections.help.all();
  return helpPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await reader.collections.help.read(slug);
  if (!page) {
    return {};
  }
  return {
    title: page.title,
    description: page.summary,
  };
}

export default async function HelpDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await reader.collections.help.read(slug);

  if (!page) {
    notFound();
  }

  const donation_methods = page.donation_methods
    ? await reader.singletons.donation_methods.read()
    : null;

  return (
    <>
      <Hero bgImgSrc="/images/bg.png">
        <h1 className="text-4xl uppercase">{page.title}</h1>
      </Hero>
      <Section>
        <div className="px-6 lg:px-0">
          <DocumentRenderer document={await page.content()} />
        </div>
        {donation_methods && (
          <div className="mt-12">
            <Grid>
              {donation_methods.platforms.map((platform) => (
                <DonationItem
                  key={platform.name}
                  name={platform.name}
                  url={platform.url}
                  code={platform.code}
                >
                  {platform.description}
                </DonationItem>
              ))}
            </Grid>
          </div>
        )}
      </Section>
    </>
  );
}
