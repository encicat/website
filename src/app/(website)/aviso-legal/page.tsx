import type { Metadata } from 'next';

import { DocumentRenderer } from '@/src/components/DocumentRenderer';
import { Hero } from '@/src/components/Hero';
import { Section } from '@/src/components/Section';
import { reader } from '@/src/helpers/reader';

export async function generateMetadata(): Promise<Metadata> {
  const legal_page = await reader.singletons.legal_page.read();
  return {
    title: legal_page?.title ?? 'Aviso legal',
    description:
      'Datos identificativos y condiciones de uso del sitio web de EnciCat.',
    alternates: { canonical: '/aviso-legal' },
  };
}

export default async function LegalPage() {
  const legal_page = await reader.singletons.legal_page.read();
  const content = await legal_page?.content();
  return (
    <>
      <Hero bgImgSrc="/images/bg.png">
        <h1 className="text-4xl uppercase">{legal_page?.title}</h1>
      </Hero>
      <Section>
        <div className="mt-0 mb-8 px-6 lg:px-0">
          {content && <DocumentRenderer document={content} />}
        </div>
      </Section>
    </>
  );
}
