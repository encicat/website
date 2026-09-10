import type { Metadata } from 'next';

import { DocumentRenderer } from '@/src/components/DocumentRenderer';
import { Hero } from '@/src/components/Hero';
import { Section } from '@/src/components/Section';
import { reader } from '@/src/helpers/reader';

export async function generateMetadata(): Promise<Metadata> {
  const about_page = await reader.singletons.about_page.read();
  return {
    title: about_page?.title ?? 'Quiénes somos',
  };
}

export default async function AboutPage() {
  const about_page = await reader.singletons.about_page.read();
  const content = await about_page?.content();
  return (
    <>
      <Hero bgImgSrc="/images/bg.png">
        <h2 className="text-4xl uppercase">{about_page?.title}</h2>
      </Hero>
      <Section>
        <div className="mt-0 mb-8 px-6 lg:px-0">
          {content && <DocumentRenderer document={content} />}
        </div>
      </Section>
    </>
  );
}
