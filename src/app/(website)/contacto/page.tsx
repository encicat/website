import { SiInstagram, SiTiktok } from '@icons-pack/react-simple-icons';
import { Mail } from 'lucide-react';

import { Grid } from '@/src/components/Grid/Grid';
import { Hero } from '@/src/components/Hero';
import { Section } from '@/src/components/Section';
import { TextCard } from '@/src/components/TextCard';
import { reader } from '@/src/helpers/reader';

export default async function ContactPage() {
  const settings = await reader.singletons.settings.read();
  const social = await reader.singletons.social.read();
  return (
    <>
      <Hero bgImgSrc="/images/bg.png">
        <h2 className="text-4xl uppercase">Contacto</h2>
      </Hero>
      <Section>
        <Grid>
          <TextCard icon={<Mail />} title={'Escribenos'}>
            <a href={`mailto:${settings?.email}`}>{settings?.email}</a>
          </TextCard>
          <TextCard icon={<SiInstagram />} title={'Instagram'}>
            <a
              href={social?.socials_networks[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social?.socials_networks[0].name}
            </a>
          </TextCard>
          <TextCard icon={<SiTiktok />} title={'TikTok'}>
            <a
              href={social?.socials_networks[1].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social?.socials_networks[1].name}
            </a>
          </TextCard>
        </Grid>
      </Section>
    </>
  );
}
