import { reader } from '@/src/helpers/reader';

import { Section } from '@/src/components/Section';
import { Hero } from '@/src/components/Hero';
import { DocumentRenderer } from '@/src/components/DocumentRenderer';

export default async function TermsPage() {
  const terms_page = await reader.singletons.terms_page.read();
  const content = await terms_page?.content();
  return (
    <>
      <Hero bgImgSrc="/images/bg.png">
        <h2 className="text-4xl uppercase">{terms_page?.title}</h2>
      </Hero>
      <Section>
        <div className="mt-0 mb-8 px-4 lg:px-0">
          {content && <DocumentRenderer document={content} />}
        </div>
      </Section>
    </>
  );
}
