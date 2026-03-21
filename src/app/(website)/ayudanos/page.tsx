import { reader } from '@/src/helpers/reader';

import { Section } from '@/src/components/Section';
import { Hero } from '@/src/components/Hero';
import { DonationItem } from '@/src/components/DonationItem';
import { DocumentRenderer } from '@/src/components/DocumentRenderer';
import { Grid } from '@/src/components/Grid/Grid';

export default async function HelpPage() {
  const donation_methods = await reader.singletons.donation_methods.read();
  const help_page = await reader.singletons.help_page.read();
  const content = await help_page?.content();
  return (
    <>
      <Hero bgImgSrc="/images/bg-256.png">
        <h2 className="text-4xl uppercase">Ayudanos</h2>
      </Hero>
      <Section>
        <Grid>
          {donation_methods?.platforms.map(async (platform) => (
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
        <div className="mt-24 mb-8 px-4 lg:px-0">
          {content && <DocumentRenderer document={content} />}
        </div>
      </Section>
    </>
  );
}
