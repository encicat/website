import type { Metadata } from 'next';

import { DocumentRenderer } from '@/src/components/DocumentRenderer';
import { Hero } from '@/src/components/Hero';
import { Section } from '@/src/components/Section';
import { reader } from '@/src/helpers/reader';

export async function generateMetadata(): Promise<Metadata> {
  const accessibility_page = await reader.singletons.accessibility_page.read();
  return {
    title: accessibility_page?.title ?? 'Accesibilidad',
    description:
      'Declaración de accesibilidad del sitio web de EnciCat y cómo reportar barreras.',
    alternates: { canonical: '/accesibilidad' },
  };
}

export default async function AccessibilityPage() {
  const accessibility_page = await reader.singletons.accessibility_page.read();
  const content = await accessibility_page?.content();
  return (
    <>
      <Hero bgImgSrc="/images/bg.png">
        <h1 className="text-4xl uppercase">{accessibility_page?.title}</h1>
      </Hero>
      <Section>
        <div className="mt-0 mb-8 px-6 lg:px-0">
          {content && <DocumentRenderer document={content} />}
        </div>
      </Section>
    </>
  );
}
