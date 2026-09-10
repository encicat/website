import {
  SiInstagram,
  SiTelegram,
  SiTiktok,
  SiWhatsapp,
} from '@icons-pack/react-simple-icons';
import { Mail, Phone } from 'lucide-react';
import type { Metadata } from 'next';

import { Grid } from '@/src/components/Grid/Grid';
import { Hero } from '@/src/components/Hero';
import { Section } from '@/src/components/Section';
import { TextCard } from '@/src/components/TextCard';
import { toTelegramHref, toTelHref, toWhatsAppHref } from '@/src/helpers/phone';
import { reader } from '@/src/helpers/reader';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Ponte en contacto con EnciCat.',
};

export default async function ContactPage() {
  const settings = await reader.singletons.settings.read();
  const social = await reader.singletons.social.read();
  const phone = settings?.phone ?? '';
  return (
    <>
      <Hero bgImgSrc="/images/bg.png">
        <h1 className="text-4xl uppercase">Contacto</h1>
      </Hero>
      <Section>
        <Grid>
          <TextCard icon={<Mail />} title={'Escríbenos'}>
            <a href={`mailto:${settings?.email}`}>{settings?.email}</a>
          </TextCard>
          {phone !== '' && (
            <TextCard icon={<Phone />} title={'Llámanos'}>
              <a href={toTelHref(phone)}>{phone}</a>
            </TextCard>
          )}
          {phone !== '' && (
            <TextCard icon={<SiWhatsapp />} title={'WhatsApp'}>
              <a
                href={toWhatsAppHref(phone)}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </TextCard>
          )}
          {phone !== '' && (
            <TextCard icon={<SiTelegram />} title={'Telegram'}>
              <a
                href={toTelegramHref(phone)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>
            </TextCard>
          )}
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
