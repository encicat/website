import type { Node } from '@markdoc/markdoc';
import { compareDesc } from 'date-fns';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AdoptionItem } from '@/src/components/AdoptionItem';
import { DocumentRenderer } from '@/src/components/DocumentRenderer';
import { render } from '@/src/components/DocumentRenderer/render';
import { DonationItem } from '@/src/components/DonationItem';
import { Grid } from '@/src/components/Grid/Grid';
import { Hero } from '@/src/components/Hero';
import { Section } from '@/src/components/Section';
import { reader } from '@/src/helpers/reader';

const ADOPTIONS_HEADING = 'Gatos disponibles';

const getNodeText = (node: Node): string =>
  typeof node.attributes?.content === 'string'
    ? node.attributes.content
    : node.children.map(getNodeText).join('');

const splitAtAdoptions = (node: Node) => {
  const index = node.children.findIndex(
    (child) =>
      child.type === 'heading' &&
      getNodeText(child).includes(ADOPTIONS_HEADING),
  );
  if (index === -1) {
    return { before: node.children, after: [] };
  }
  return {
    before: node.children.slice(0, index + 1),
    after: node.children.slice(index + 1),
  };
};

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

  const content = (await page.content()) as { node: Node };

  const donation_methods = page.donation_methods
    ? await reader.singletons.donation_methods.read()
    : null;

  const adoptions = page.adoptions_list
    ? (await reader.collections.adoptions.all())
        .filter(({ entry }) => !entry.adoptedAt)
        .sort((a, b) =>
          compareDesc(a?.entry?.publishedAt ?? '', b?.entry?.publishedAt ?? ''),
        )
    : [];

  const { before, after } = page.adoptions_list
    ? splitAtAdoptions(content.node)
    : { before: [], after: [] };

  return (
    <>
      <Hero bgImgSrc="/images/bg.png">
        <h1 className="text-4xl uppercase">{page.title}</h1>
      </Hero>
      <Section>
        {page.adoptions_list ? (
          <>
            <div className="max-w-3xl px-6 lg:px-0">
              <div className="markdoc">
                <div
                  dangerouslySetInnerHTML={{
                    __html: before.map(render).join(''),
                  }}
                />
              </div>
            </div>
            {adoptions.length > 0 && (
              <div className="mt-8 px-6 lg:px-0">
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
              </div>
            )}
            {after.length > 0 && (
              <div className="max-w-3xl px-6 lg:px-0">
                <div className="markdoc mt-8">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: after.map(render).join(''),
                    }}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="max-w-3xl px-6 lg:px-0">
            <DocumentRenderer document={content} />
          </div>
        )}
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
