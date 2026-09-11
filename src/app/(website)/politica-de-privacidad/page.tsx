import type { Metadata } from 'next';

import { DocumentRenderer } from '@/src/components/DocumentRenderer';
import { Hero } from '@/src/components/Hero';
import { Section } from '@/src/components/Section';
import { reader } from '@/src/helpers/reader';

export async function generateMetadata(): Promise<Metadata> {
  const privacy_page = await reader.singletons.privacy_page.read();
  return {
    title: privacy_page?.title ?? 'Política de privacidad',
    description: 'Cómo tratamos y protegemos tus datos personales en EnciCat.',
    alternates: { canonical: '/politica-de-privacidad' },
  };
}

export default async function PrivacyPage() {
  const privacy_page = await reader.singletons.privacy_page.read();
  const content = await privacy_page?.content();
  return (
    <>
      <Hero bgImgSrc="/images/bg.png">
        <h1 className="text-4xl uppercase">{privacy_page?.title}</h1>
      </Hero>
      <Section>
        <div className="mt-0 mb-8 px-6 lg:px-0">
          {content && <DocumentRenderer document={content} />}
        </div>
      </Section>
    </>
  );
}
