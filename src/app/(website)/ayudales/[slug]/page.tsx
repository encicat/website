import type { Node } from '@markdoc/markdoc';
import { compareDesc } from 'date-fns';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { AdoptionItem } from '@/src/components/AdoptionItem';
import { Button } from '@/src/components/Button';
import { DocumentRenderer } from '@/src/components/DocumentRenderer';
import { render } from '@/src/components/DocumentRenderer/render';
import { DonationItem } from '@/src/components/DonationItem';
import { Grid } from '@/src/components/Grid/Grid';
import { Hero } from '@/src/components/Hero';
import { Section } from '@/src/components/Section';
import { TextCard } from '@/src/components/TextCard';
import { getHelpIcon } from '@/src/helpers/help';
import { reader } from '@/src/helpers/reader';

const ADOPTIONS_HEADING = 'Gatos disponibles';
const PAYMENTS_HEADING = '¿Cómo puedo hacerlo?';
const CTA_HEADING = '¿Quieres ser casa de acogida?';

const getNodeText = (node: Node): string =>
  typeof node.attributes?.content === 'string'
    ? node.attributes.content
    : node.children.map(getNodeText).join('');

const findHeading = (children: Node[], marker: string): number =>
  children.findIndex(
    (child) => child.type === 'heading' && getNodeText(child).includes(marker),
  );

const sectionEnd = (children: Node[], headingIndex: number): number => {
  let end = headingIndex + 1;
  if (end < children.length && children[end].type === 'paragraph') {
    end += 1;
  }
  return end;
};

const MarkdocBlock: React.FC<{ nodes: Node[] }> = ({ nodes }) => {
  if (nodes.length === 0) {
    return null;
  }
  return (
    <div className="px-6 lg:px-0">
      <div className="markdoc">
        <div dangerouslySetInnerHTML={{ __html: nodes.map(render).join('') }} />
      </div>
    </div>
  );
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

  const children = content.node.children;
  const adoptionsHeading = page.adoptions_list
    ? findHeading(children, ADOPTIONS_HEADING)
    : -1;
  const paymentsHeading =
    page.payment_options.length > 0
      ? findHeading(children, PAYMENTS_HEADING)
      : -1;
  const ctaHeading =
    page.cta?.label && page.cta?.url ? findHeading(children, CTA_HEADING) : -1;

  const insertions: { index: number; node: React.ReactNode }[] = [];

  if (adoptionsHeading !== -1 && adoptions.length > 0) {
    insertions.push({
      index: sectionEnd(children, adoptionsHeading),
      node: (
        <div className="my-8 px-6 lg:px-0">
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
      ),
    });
  }

  if (paymentsHeading !== -1) {
    insertions.push({
      index: sectionEnd(children, paymentsHeading),
      node: (
        <div className="my-8 px-6 lg:px-0">
          <Grid>
            {page.payment_options.map((option) => (
              <DonationItem
                key={option.name}
                name={option.name}
                code={option.code}
              >
                {option.description}
              </DonationItem>
            ))}
          </Grid>
        </div>
      ),
    });
  }

  if (page.cta?.label && page.cta?.url) {
    insertions.push({
      index:
        ctaHeading === -1 ? children.length : sectionEnd(children, ctaHeading),
      node: (
        <div className="my-8 flex justify-center px-6 lg:px-0">
          <Button href={page.cta.url}>{page.cta.label}</Button>
        </div>
      ),
    });
  }

  insertions.sort((a, b) => a.index - b.index);

  const blocks: React.ReactNode[] = [];
  let cursor = 0;
  insertions.forEach((insertion, index) => {
    blocks.push(
      <MarkdocBlock
        key={`markdoc-${index}`}
        nodes={children.slice(cursor, insertion.index)}
      />,
    );
    blocks.push(<Fragment key={`block-${index}`}>{insertion.node}</Fragment>);
    cursor = insertion.index;
  });
  blocks.push(
    <MarkdocBlock key="markdoc-end" nodes={children.slice(cursor)} />,
  );

  return (
    <>
      <Hero bgImgSrc="/images/bg.png">
        <h1 className="text-4xl uppercase">{page.title}</h1>
      </Hero>
      <Section>
        {insertions.length > 0 ? (
          blocks
        ) : (
          <div className="px-6 lg:px-0">
            <DocumentRenderer document={content} />
          </div>
        )}
        {page.cards.length > 0 && (
          <div className="my-8 px-6 lg:px-0">
            <Grid>
              {page.cards.map((card) => {
                const Icon = getHelpIcon(card.icon);
                return (
                  <TextCard key={card.title} icon={<Icon />} title={card.title}>
                    {card.description}
                  </TextCard>
                );
              })}
            </Grid>
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
