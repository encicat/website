import type { Metadata } from 'next';

import { DocumentRenderer } from '@/src/components/DocumentRenderer';
import { Hero } from '@/src/components/Hero';
import { Section } from '@/src/components/Section';
import { reader } from '@/src/helpers/reader';

export async function generateMetadata(): Promise<Metadata> {
  const terms_page = await reader.singletons.terms_page.read();
  return {
    title: terms_page?.title ?? 'Términos y condiciones',
    alternates: { canonical: '/terminos-y-condiciones' },
  };
}

export default async function TermsPage() {
  const terms_page = await reader.singletons.terms_page.read();
  const content = await terms_page?.content();
  return (
    <>
      <Hero bgImgSrc="/images/bg.png">
        <h1 className="text-4xl uppercase">{terms_page?.title}</h1>
      </Hero>
      <Section>
        <div className="mt-0 mb-8 px-6 lg:px-0">
          {content && <DocumentRenderer document={content} />}
        </div>
      </Section>
    </>
  );
}
